(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.DAPjs = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DEFAULT_RUNCODE_TIMEOUT = 10000 /* ms */;
exports.CPUID_IMPLEMENTER_MASK = 0xff000000;
exports.CPUID_IMPLEMENTER_POS = 24;
exports.CPUID_VARIANT_MASK = 0x00f00000;
exports.CPUID_VARIANT_POS = 20;
exports.CPUID_ARCHITECTURE_MASK = 0x000f0000;
exports.CPUID_ARCHITECTURE_POS = 16;
exports.CPUID_PARTNO_MASK = 0x0000fff0;
exports.CPUID_PARTNO_POS = 4;
exports.CPUID_REVISION_MASK = 0x0000000f;
exports.CPUID_REVISION_POS = 0;
exports.ISANames = new Map();
exports.ISANames.set(12 /* ARMv6M */, "ARMv6M");
exports.ISANames.set(15 /* ARMv7M */, "ARMv7M");
exports.CoreNames = new Map();
exports.CoreNames.set(3104 /* CortexM0 */, "Cortex-M0");
exports.CoreNames.set(3105 /* CortexM1 */, "Cortex-M1");
exports.CoreNames.set(3107 /* CortexM3 */, "Cortex-M3");
exports.CoreNames.set(3108 /* CortexM4 */, "Cortex-M4");
exports.CoreNames.set(3168 /* CortexM0p */, "Cortex-M0+");

},{}],2:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const debug_1 = require("../debug/debug");
const memory_1 = require("../memory/memory");
const prepared_1 = require("../memory/prepared");
const util_1 = require("../util");
const constants_1 = require("./constants");
const prepared_2 = require("./prepared");
/**
 * # Cortex M
 *
 * Manages access to a CPU core, and its associated memory and debug functionality.
 *
 * > **NOTE:** all of the methods that involve interaction with the CPU core
 * > are asynchronous, so must be `await`ed, or explicitly handled as a Promise.
 *
 * ## Usage
 *
 * First, let's create an instance of `CortexM`, using an associated _Debug Access
 * Port_ (DAP) instance that we created earlier.
 *
 * ```typescript
 * const core = new CortexM(dap);
 * ```
 *
 * Now, we can halt and resume the core just like this:
 *
 * > **NOTE:** If you're not using ES2017, you can replace the use of `async` and
 * > `await` with direct use of Promises. These examples also need to be run within
 * > an `async` function for `async` to be used.
 *
 * ```typescript
 * await core.halt();
 * await core.resume();
 * ```
 *
 * Resetting the core is just as easy:
 *
 * ```typescript
 * await core.reset();
 * ```
 *
 * You can even halt immediately after reset:
 *
 * ```typescript
 * await core.reset(true);
 * ```
 *
 * We can also read and write 32-bit values to/from core registers:
 *
 * ```typescript
 * const sp = await core.readCoreRegister(CortexReg.SP);
 *
 * await core.writeCoreRegister(CortexReg.R0, 0x1000);
 * await core.writeCoreRegister(CortexReg.PC, 0x1234);
 * ```
 *
 * ### See also
 *
 * For details on debugging and memory features, see the documentation for
 * `Debug` and `Memory`.
 */
class CortexM {
    constructor(device) {
        this.dev = device;
        this.memory = new memory_1.Memory(device);
        this.debug = new debug_1.Debug(this);
    }
    /**
     * Initialise the debug access port on the device, and read the device type.
     */
    async init() {
        await this.dev.init();
        // FIXME: don't run this if security is enabled on the K64F
        await this.debug.init();
        await this.readCoreType();
    }
    /**
     * Read the current state of the CPU.
     *
     * @returns A member of the `CoreState` enum corresponding to the current status of the CPU.
     */
    async getState() {
        const dhcsr = await this.memory.read32(3758157296 /* DHCSR */);
        if (dhcsr & 33554432 /* S_RESET_ST */) {
            const newDHCSR = await this.memory.read32(3758157296 /* DHCSR */);
            if (newDHCSR & 33554432 /* S_RESET_ST */ && !(newDHCSR & 16777216 /* S_RETIRE_ST */)) {
                return 0 /* TARGET_RESET */;
            }
        }
        if (dhcsr & 524288 /* S_LOCKUP */) {
            return 1 /* TARGET_LOCKUP */;
        }
        else if (dhcsr & 262144 /* S_SLEEP */) {
            return 2 /* TARGET_SLEEPING */;
        }
        else if (dhcsr & 131072 /* S_HALT */) {
            return 3 /* TARGET_HALTED */;
        }
        else {
            return 4 /* TARGET_RUNNING */;
        }
    }
    /**
     * Read the CPUID register from the CPU, and interpret its meaning in terms of implementer,
     * architecture and core type.
     */
    async readCoreType() {
        const cpuid = await this.memory.read32(3758157056 /* CPUID */);
        const implementer = ((cpuid & constants_1.CPUID_IMPLEMENTER_MASK) >> constants_1.CPUID_IMPLEMENTER_POS);
        const arch = ((cpuid & constants_1.CPUID_ARCHITECTURE_MASK) >> constants_1.CPUID_ARCHITECTURE_POS);
        const coreType = ((cpuid & constants_1.CPUID_PARTNO_MASK) >> constants_1.CPUID_PARTNO_POS);
        return [implementer, arch, coreType];
    }
    prepareCommand() {
        return new prepared_2.PreparedCortexMCommand(this.dev);
    }
    /**
     * Read a core register from the CPU (e.g. r0...r15, pc, sp, lr, s0...)
     *
     * @param no Member of the `CortexReg` enum - an ARM Cortex CPU general-purpose register.
     */
    async readCoreRegister(no) {
        await this.memory.write32(3758157300 /* DCRSR */, no);
        const v = await this.memory.read32(3758157296 /* DHCSR */);
        util_1.assert(v & 65536 /* S_REGRDY */);
        return await this.memory.read32(3758157304 /* DCRDR */);
    }
    /**
     * Write a 32-bit word to the specified CPU general-purpose register.
     *
     * @param no Member of the `CortexReg` enum - an ARM Cortex CPU general-purpose register.
     * @param val Value to be written.
     */
    async writeCoreRegister(no, val) {
        const prep = new prepared_1.PreparedMemoryCommand(this.dev);
        prep.write32(3758157304 /* DCRDR */, val);
        prep.write32(3758157300 /* DCRSR */, no | 65536 /* DCRSR_REGWnR */);
        prep.read32(3758157296 /* DHCSR */);
        const v = (await prep.go())[0];
        util_1.assert(v & 65536 /* S_REGRDY */);
    }
    /**
     * Halt the CPU core.
     */
    async halt() {
        return this.memory.write32(3758157296 /* DHCSR */, -1604386816 /* DBGKEY */ | 1 /* C_DEBUGEN */ | 2 /* C_HALT */);
    }
    /**
     * Resume the CPU core.
     */
    async resume() {
        if (await this.isHalted()) {
            await this.memory.write32(3758157104 /* DFSR */, 4 /* DFSR_DWTTRAP */ | 2 /* DFSR_BKPT */ | 1 /* DFSR_HALTED */);
            await this.debug.enable();
        }
    }
    /**
     * Find out whether the CPU is halted.
     */
    async isHalted() {
        const s = await this.status();
        return s.isHalted;
    }
    /**
     * Read the current status of the CPU.
     *
     * @returns Object containing the contents of the `DHCSR` register, the `DFSR` register, and a boolean value
     * stating the current halted state of the CPU.
     */
    async status() {
        const prep = new prepared_1.PreparedMemoryCommand(this.dev);
        prep.read32(3758157296 /* DHCSR */);
        prep.read32(3758157104 /* DFSR */);
        const results = await prep.go();
        const dhcsr = results[0];
        const dfsr = results[1];
        return {
            dfsr,
            dhscr: dhcsr,
            isHalted: !!(dhcsr & 131072 /* S_HALT */),
        };
    }
    /**
     * Reset the CPU core. This currently does a software reset - it is also technically possible to perform a 'hard'
     * reset using the reset pin from the debugger.
     */
    async reset(halt = false) {
        if (halt) {
            await this.halt();
            // VC_CORERESET causes the core to halt on reset.
            const demcr = await this.memory.read32(3758157308 /* DEMCR */);
            await this.memory.write32(3758157308 /* DEMCR */, demcr | 1 /* DEMCR_VC_CORERESET */);
            await this.softwareReset();
            await this.waitForHalt();
            // Unset the VC_CORERESET bit
            await this.memory.write32(3758157308 /* DEMCR */, demcr);
        }
        else {
            await this.softwareReset();
        }
    }
    /**
     * Run specified machine code natively on the device. Assumes usual C calling conventions
     * - returns the value of r0 once the program has terminated. The program _must_ terminate
     * in order for this function to return. This can be achieved by placing a `bkpt`
     * instruction at the end of the function.
     *
     * @param code array containing the machine code (32-bit words).
     * @param address memory address at which to place the code.
     * @param pc initial value of the program counter.
     * @param lr initial value of the link register.
     * @param sp initial value of the stack pointer.
     * @param upload should we upload the code before running it.
     * @param args set registers r0...rn before running code
     *
     * @returns A promise for the value of r0 on completion of the function call.
     */
    async runCode(code, address, pc, lr, sp, upload, ...args) {
        // await this.halt();
        const cmd = this.prepareCommand();
        cmd.halt();
        // Point the program counter to the start of the program
        cmd.writeCoreRegister(15 /* PC */, pc);
        cmd.writeCoreRegister(14 /* LR */, lr);
        cmd.writeCoreRegister(13 /* SP */, sp);
        for (let i = 0; i < args.length; i++) {
            cmd.writeCoreRegister(i, args[i]);
        }
        await cmd.go();
        // Write the program to memory at the specified address
        if (upload) {
            await this.memory.writeBlock(address, code);
        }
        // Run the program and wait for halt
        await this.resume();
        await this.waitForHalt(constants_1.DEFAULT_RUNCODE_TIMEOUT); // timeout after 10s
        return await this.readCoreRegister(0 /* R0 */);
    }
    /**
     * Spin until the chip has halted.
     */
    async waitForHalt(timeout = 0) {
        return new Promise(async (resolve, reject) => {
            let running = true;
            if (timeout > 0) {
                setTimeout(() => {
                    reject("waitForHalt timed out.");
                    running = false;
                }, timeout);
            }
            while (running && !(await this.isHalted())) {
                /* empty */
            }
            if (running) {
                resolve();
            }
        });
    }
    async softwareReset() {
        await this.memory.write32(3758157068 /* NVIC_AIRCR */, 100270080 /* NVIC_AIRCR_VECTKEY */ | 4 /* NVIC_AIRCR_SYSRESETREQ */);
        // wait for the system to come out of reset
        let dhcsr = await this.memory.read32(3758157296 /* DHCSR */);
        while ((dhcsr & 33554432 /* S_RESET_ST */) !== 0) {
            dhcsr = await this.memory.read32(3758157296 /* DHCSR */);
        }
    }
}
exports.CortexM = CortexM;

},{"../debug/debug":7,"../memory/memory":9,"../memory/prepared":10,"../util":18,"./constants":1,"./prepared":3}],3:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const prepared_1 = require("../memory/prepared");
/**
 * # Cortex M: Prepared Command
 *
 * Allows batching of Cortex M-related commands, such as writing to a register,
 * halting and resuming the core.
 *
 * ## Example
 *
 * When preparing the sequence of commands, we can use the same API to prepare
 * a command as we would to execute them immediately.
 *
 * ```typescript
 * // Note that only the .go method is asynchronous.
 *
 * const prep = core.prepareCommand();
 * prep.writeCoreRegister(CortexReg.R0, 0x1000);
 * prep.writeCoreRegister(CortexReg.R1, 0x0);
 * prep.writeCoreRegister(CortexReg.PC, 0x2000000);
 * prep.resume();
 * ```
 *
 * We can then execute them as efficiently as possible by combining them together
 * and executing them like so.
 *
 * ```typescript
 * await prep.go();
 * ```
 *
 * The code above is equivalent to the following _non-prepared_ command:
 *
 * ```typescript
 * await core.writeCoreRegister(CortexReg.R0, 0x1000);
 * await core.writeCoreRegister(CortexReg.R1, 0x0);
 * await core.writeCoreRegister(CortexReg.PC, 0x2000000);
 * await core.resume();
 * ```
 *
 * Since the batched version of this code avoids making three round-trips to the
 * target, we are able to significantly improve performance. This is especially
 * noticable when uploading a binary to flash memory, where are large number of
 * repetetive commands are being used.
 *
 * ## Explanation
 *
 * For a detailed explanation of why prepared commands are used in DAP.js, see the
 * documentation for `PreparedDapCommand`.
 */
class PreparedCortexMCommand {
    constructor(dap) {
        this.cmd = new prepared_1.PreparedMemoryCommand(dap);
    }
    /**
     * Schedule a 32-bit integer to be written to a core register.
     *
     * @param no Core register to be written.
     * @param val Value to write.
     */
    writeCoreRegister(no, val) {
        this.cmd.write32(3758157304 /* DCRDR */, val);
        this.cmd.write32(3758157300 /* DCRSR */, no | 65536 /* DCRSR_REGWnR */);
    }
    /**
     * Schedule a halt command to be written to the CPU.
     */
    halt() {
        this.cmd.write32(3758157296 /* DHCSR */, -1604386816 /* DBGKEY */ | 1 /* C_DEBUGEN */ | 2 /* C_HALT */);
    }
    /**
     * Schedule a resume command to be written to the CPU.
     */
    resume() {
        this.cmd.write32(3758157104 /* DFSR */, 4 /* DFSR_DWTTRAP */ | 2 /* DFSR_BKPT */ | 1 /* DFSR_HALTED */);
    }
    /**
     * Execute all scheduled commands.
     */
    async go() {
        const v = await this.cmd.go();
    }
}
exports.PreparedCortexMCommand = PreparedCortexMCommand;

},{"../memory/prepared":10}],4:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const prepared_1 = require("./prepared");
const cmsis_dap_1 = require("../transport/cmsis_dap");
const util_1 = require("../util");
class DAP {
    constructor(device) {
        this.device = device;
        this.dap = new cmsis_dap_1.CMSISDAP(device);
    }
    async reconnect() {
        await this.dap.disconnect();
        await util_1.delay(100);
        await this.init();
    }
    async init() {
        await this.dap.connect();
        const n = await this.readDp(0 /* IDCODE */);
        this.idcode = n;
        let prep = this.prepareCommand();
        prep.writeReg(0 /* DP_0x0 */, 1 << 2); // clear sticky error
        prep.writeDp(2 /* SELECT */, 0);
        prep.writeDp(1 /* CTRL_STAT */, 1073741824 /* CSYSPWRUPREQ */ | 268435456 /* CDBGPWRUPREQ */);
        const m = 536870912 /* CDBGPWRUPACK */ | 2147483648 /* CSYSPWRUPACK */;
        prep.readDp(1 /* CTRL_STAT */);
        let v = (await prep.go())[0];
        while ((v & m) !== m) {
            v = await this.readDp(1 /* CTRL_STAT */);
        }
        prep = this.prepareCommand();
        prep.writeDp(1 /* CTRL_STAT */, (1073741824 /* CSYSPWRUPREQ */ |
            268435456 /* CDBGPWRUPREQ */ |
            0 /* TRNNORMAL */ |
            3840 /* MASKLANE */));
        prep.writeDp(2 /* SELECT */, 0);
        prep.readAp(252 /* IDR */);
        await prep.go();
    }
    async writeReg(regId, val) {
        return this.regOp(regId, val);
    }
    async readReg(regId) {
        const buf = await this.regOp(regId, null);
        const v = util_1.readUInt32LE(buf, 3);
        return v;
    }
    prepareCommand() {
        return new prepared_1.PreparedDapCommand(this.dap);
    }
    async readDp(addr) {
        return this.readReg(addr);
    }
    async readAp(addr) {
        const prep = this.prepareCommand();
        prep.writeDp(2 /* SELECT */, util_1.bank(addr));
        prep.readReg(util_1.apReg(addr, 2 /* READ */));
        return (await prep.go())[0];
    }
    writeDp(addr, data) {
        if (addr === 2 /* SELECT */) {
            if (data === this.dpSelect) {
                return Promise.resolve();
            }
            this.dpSelect = data;
        }
        return this.writeReg(addr, data);
    }
    async writeAp(addr, data) {
        if (addr === 0 /* CSW */) {
            if (data === this.csw) {
                return Promise.resolve();
            }
            this.csw = data;
        }
        const prep = this.prepareCommand();
        prep.writeDp(2 /* SELECT */, util_1.bank(addr));
        prep.writeReg(util_1.apReg(addr, 0 /* WRITE */), data);
        await prep.go();
    }
    async close() {
        return this.device.close();
    }
    async readRegRepeat(regId, cnt) {
        util_1.assert(cnt <= 15);
        const request = util_1.regRequest(regId);
        const sendargs = [0, cnt];
        for (let i = 0; i < cnt; ++i) {
            sendargs.push(request);
        }
        const buf = await this.dap.cmdNums(5 /* DAP_TRANSFER */, sendargs);
        if (buf[1] !== cnt) {
            throw new Error(("(many) Bad #trans " + buf[1]));
        }
        else if (buf[2] !== 1) {
            throw new Error(("(many) Bad transfer status " + buf[2]));
        }
        return buf.subarray(3, 3 + cnt * 4);
    }
    async writeRegRepeat(regId, data) {
        const remainingLength = 64 - 1 - 1 - 2 - 1; // 14
        util_1.assert(data.length <= remainingLength / 4);
        /*
            BYTE | BYTE *****| SHORT**********| BYTE *************| WORD *********|
          > 0x06 | DAP Index | Transfer Count | Transfer Request  | Transfer Data |
                 |***********|****************|*******************|+++++++++++++++|
        */
        const request = util_1.regRequest(regId, true);
        const sendargs = [0, data.length, 0, request];
        data.forEach((d) => {
            // separate d into bytes
            util_1.addInt32(sendargs, d);
        });
        const buf = await this.dap.cmdNums(6 /* DAP_TRANSFER_BLOCK */, sendargs);
        if (buf[3] !== 1) {
            throw new Error(("(many-wr) Bad transfer status " + buf[2]));
        }
    }
    async regOp(regId, val) {
        const request = util_1.regRequest(regId, val !== null);
        const sendargs = [0, 1, request];
        if (val !== null) {
            util_1.addInt32(sendargs, val);
        }
        const buf = await this.dap.cmdNums(5 /* DAP_TRANSFER */, sendargs);
        if (buf[1] !== 1) {
            throw new Error(("Bad #trans " + buf[1]));
        }
        else if (buf[2] !== 1) {
            if (buf[2] === 2) {
                throw new Error(("Transfer wait"));
            }
            throw new Error(("Bad transfer status " + buf[2]));
        }
        return buf;
    }
}
exports.DAP = DAP;

},{"../transport/cmsis_dap":16,"../util":18,"./prepared":5}],5:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const util_1 = require("../util");
/**
 * # Prepared DAP Command
 *
 * Batches together multiple Debug Access Port (DAP) commands into one (or more)
 * CMSIS-DAP Transfers that can be written together to improve link utilisation.
 *
 * > **NOTE:** this will not normally need to be used by applications or libraries
 * > depending on DAP.js.
 *
 * ## Architecture
 *
 * - `PreparedDapCommand` keeps a list of CMSIS-DAP `Transfer` commands.
 * - Every time an action is scheduled (writing to or reading from a DP or AP register),
 * we check to see if there is any remaining room in the current batch, starting a new
 * batch if none is available.
 * - When `go` is called, the batches are executed sequentially (so DAP commands are
 * executed in the order they were added).
 *
 * ### Reading Values
 *
 * Writing values to registers is relatively straight forward, however mixing register
 * reads and writes together requires us to keep track of how many commands in
 * each batch are read commands.
 *
 * Once data has successfully been read back from the target, the values read are assembled
 * into an array, and returned in the order they requested. This allows `PreparedDapCommand`s
 * to be used higher up the stack in places where multiple independent read operations take
 * place sequentially.
 *
 * ### Constructing CMSIS-DAP Commands
 *
 * We keep track of the number of commands in each batch, so that we can fill in the command
 * count field of the `DAP_Transfer`.
 */
class PreparedDapCommand {
    constructor(dap) {
        this.dap = dap;
        this.commands = [[0, 1]];
        this.commandCounts = [0];
        this.currentCommand = 0;
        this.readCounts = [0];
    }
    /**
     * Schedule a value to be written to an AP or DP register.
     *
     * @param regId register ID to be written to
     * @param value value to be written
     */
    writeReg(regId, value) {
        const request = util_1.regRequest(regId, true);
        if (this.commands[this.currentCommand].length + 5 > 64) {
            // start a new command
            this.commands.push([0, 1]);
            this.commandCounts.push(0);
            this.readCounts.push(0);
            this.currentCommand++;
        }
        this.commands[this.currentCommand].push(request);
        util_1.addInt32(this.commands[this.currentCommand], value);
        this.commandCounts[this.currentCommand]++;
    }
    /**
     * Schedule a value to be read from an AP or DP register.
     * @param regId register to read from
     */
    readReg(regId) {
        const request = util_1.regRequest(regId, false);
        if (this.commands[this.currentCommand].length + 1 > 64) {
            // start a new command
            this.commands.push([0, 1]);
            this.commandCounts.push(0);
            this.readCounts.push(0);
            this.currentCommand++;
        }
        this.commands[this.currentCommand].push(request);
        this.commandCounts[this.currentCommand]++;
        this.readCounts[this.currentCommand]++;
    }
    /**
     * Schedule multiple values to be written to the same register.
     *
     * **TODO:** figure out dynamically whether it's better to use DAP_TransferBlock vs
     * DAP_Transfer. We should be able to fill up the remaining space in a Transfer
     * and then start a TransferBlock _if_ we can fit in _13 or more_ values into the
     * TransferBlock. However, the gains from this are marginal unless we're using much
     * larger packet sizes than 64 bytes.
     *
     * @param regId register to write to repeatedly
     * @param data array of 32-bit values to be written
     */
    writeRegRepeat(regId, data) {
        // fill up the rest of the command we have left
        data.forEach((cmd) => {
            this.writeReg(regId, cmd);
        });
    }
    /**
     * Asynchronously execute the commands scheduled.
     */
    async go() {
        const v = [];
        for (let i = 0; i < this.commands.length; i++) {
            const command = this.commands[i];
            command[1] = this.commandCounts[i];
            const result = await this.dap.cmdNums(5 /* DAP_TRANSFER */, command);
            for (let j = 0; j < this.readCounts[i]; j++) {
                v.push(util_1.readUInt32LE(result, 3 + 4 * j));
            }
        }
        return v;
    }
    /**
     * Schedule a value to be written to a DP register
     *
     * @param addr Address to write to
     * @param data Data to be written
     */
    writeDp(addr, data) {
        if (addr === 2 /* SELECT */) {
            if (data === this.dpSelect) {
                return Promise.resolve();
            }
            this.dpSelect = data;
        }
        return this.writeReg(addr, data);
    }
    /**
     * Schedule a value to be written to an AP register
     *
     * @param addr Address to write to
     * @param data Data to be written
     */
    writeAp(addr, data) {
        this.writeDp(2 /* SELECT */, util_1.bank(addr));
        if (addr === 0 /* CSW */) {
            if (data === this.csw) {
                return Promise.resolve();
            }
            this.csw = data;
        }
        this.writeReg(util_1.apReg(addr, 0 /* WRITE */), data);
    }
    /**
     * Schedule a DP register to read from
     *
     * @param addr Address to read from
     */
    readDp(addr) {
        return this.readReg(addr);
    }
    /**
     * Schedule an AP register to read from
     *
     * @param addr Address to read from
     */
    readAp(addr) {
        this.writeDp(2 /* SELECT */, util_1.bank(addr));
        return this.readReg(util_1.apReg(addr, 2 /* READ */));
    }
}
exports.PreparedDapCommand = PreparedDapCommand;

},{"../util":18}],6:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class HWBreakpoint {
    constructor(regAddr, parent, addr) {
        this.regAddr = regAddr;
        this.parent = parent;
        this.addr = addr;
    }
    async set() {
        /* set hardware breakpoint */
        const bpMatch = ((this.addr & 0x2) ? 2 : 1) << 30;
        await this.parent.memory.write32(this.regAddr, this.addr & 0x1ffffffc | bpMatch | 1);
    }
    async clear() {
        /* clear hardware breakpoint */
        await this.parent.memory.write32(this.regAddr, 0);
    }
}
exports.HWBreakpoint = HWBreakpoint;
class SWBreakpoint {
    constructor(parent, addr) {
        this.parent = parent;
        this.addr = addr;
    }
    async set() {
        // read the instruction from the CPU...
        this.instruction = await this.parent.memory.read16(this.addr);
        await this.parent.memory.write16(this.addr, SWBreakpoint.BKPT_INSTRUCTION);
    }
    async clear() {
        /* clear hardware breakpoint */
        await this.parent.memory.write16(this.addr, this.instruction);
    }
}
SWBreakpoint.BKPT_INSTRUCTION = 0xbe00;
exports.SWBreakpoint = SWBreakpoint;

},{}],7:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const breakpoint_1 = require("./breakpoint");
/**
 * # Debug Interface
 *
 * Keeps track of breakpoints set on the target, as well as deciding whether to
 * use a hardware breakpoint or a software breakpoint.
 *
 * ## Usage
 *
 * ```typescript
 * const dbg = core.debug;
 *
 * await dbg.setBreakpoint(0x123456);
 *
 * // resume the core and wait for the breakpoint
 * await core.resume();
 * await core.waitForHalt();
 *
 * // step forward one instruction
 * await dbg.step();
 *
 * // remove the breakpoint
 * await dbg.deleteBreakpoint(0x123456);
 * ```
 */
class Debug {
    constructor(core) {
        this.core = core;
        this.enabled = false;
        this.availableHWBreakpoints = [];
        this.breakpoints = new Map();
    }
    async init() {
        this.setupFpb();
    }
    /**
     * Enable debugging on the target CPU
     */
    async enable() {
        await this.core.memory.write32(3758157296 /* DHCSR */, -1604386816 /* DBGKEY */ | 1 /* C_DEBUGEN */);
    }
    /**
     * Set breakpoints at specified memory addresses.
     *
     * @param addrs An array of memory addresses at which to set breakpoints.
     */
    async setBreakpoint(addr) {
        if (this.breakpoints.has(addr)) {
            // we already have a breakpoint there.
            const breakpoint = this.breakpoints.get(addr);
            if (typeof breakpoint !== "number") {
                // already enabled
                console.warn(`Breakpoint at ${addr.toString(16)} already enabled.`);
                return;
            }
        }
        let bkpt;
        // choose where best to place a breakpoint
        if (addr < 0x20000000) {
            // we can use a HWBreakpoint
            if (this.availableHWBreakpoints.length > 0) {
                if (!this.enabled) {
                    await this.setFpbEnabled(true);
                }
                const regAddr = this.availableHWBreakpoints.pop();
                bkpt = new breakpoint_1.HWBreakpoint(regAddr, this.core, addr);
            }
            else {
                bkpt = new breakpoint_1.SWBreakpoint(this.core, addr);
            }
        }
        else {
            bkpt = new breakpoint_1.SWBreakpoint(this.core, addr);
        }
        await bkpt.set();
        this.breakpoints.set(addr, bkpt);
    }
    async deleteBreakpoint(addr) {
        if (this.breakpoints.has(addr)) {
            const bkpt = this.breakpoints.get(addr);
            if (typeof bkpt !== "number") {
                await bkpt.clear();
                if (bkpt instanceof breakpoint_1.HWBreakpoint) {
                    // return the register address to the pool
                    this.availableHWBreakpoints.push(bkpt.regAddr);
                }
            }
            this.breakpoints.delete(addr);
        }
        else {
            //console.warn(`Breakpoint at ${addr.toString(16)} does not exist.`);
        }
    }
    /**
     * Step the processor forward by one instruction.
     */
    async step() {
        const dhcsr = await this.core.memory.read32(3758157296 /* DHCSR */);
        if (!(dhcsr & (4 /* C_STEP */ | 2 /* C_HALT */))) {
            //console.error("Target is not halted.");
            return;
        }
        const interruptsMasked = (8 /* C_MASKINTS */ & dhcsr) !== 0;
        if (!interruptsMasked) {
            await this.core.memory.write32(3758157296 /* DHCSR */, -1604386816 /* DBGKEY */ |
                1 /* C_DEBUGEN */ |
                2 /* C_HALT */ |
                8 /* C_MASKINTS */);
        }
        await this.core.memory.write32(3758157296 /* DHCSR */, -1604386816 /* DBGKEY */ |
            1 /* C_DEBUGEN */ |
            8 /* C_MASKINTS */ |
            4 /* C_STEP */);
        await this.core.waitForHalt();
        await this.core.memory.write32(3758157296 /* DHCSR */, -1604386816 /* DBGKEY */ |
            1 /* C_DEBUGEN */ |
            2 /* C_HALT */);
    }
    /**
     * Set up (and disable) the Flash Patch & Breakpoint unit. It will be enabled when
     * the first breakpoint is set.
     *
     * Also reads the number of available hardware breakpoints.
     */
    async setupFpb() {
        // setup FPB (breakpoint)
        const fpcr = await this.core.memory.read32(3758104576 /* FP_CTRL */);
        const nbCode = ((fpcr >> 8) & 0x70) | ((fpcr >> 4) & 0xf);
        const nbLit = (fpcr >> 7) & 0xf;
        this.totalHWBreakpoints = nbCode;
        await this.setFpbEnabled(false);
        for (let i = 0; i < nbCode; i++) {
            this.availableHWBreakpoints.push(3758104584 /* FP_COMP0 */ + (4 * i));
            await this.core.memory.write32(3758104584 /* FP_COMP0 */ + (i * 4), 0);
        }
    }
    /**
     * Enable or disable the Flash Patch and Breakpoint unit (FPB).
     *
     * @param enabled
     */
    async setFpbEnabled(enabled = true) {
        this.enabled = enabled;
        await this.core.memory.write32(3758104576 /* FP_CTRL */, 2 /* FP_CTRL_KEY */ | (enabled ? 1 : 0));
    }
}
exports.Debug = Debug;

},{"./breakpoint":6}],8:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var cortex_1 = require("./cortex/cortex");
exports.CortexM = cortex_1.CortexM;
var constants_1 = require("./cortex/constants");
exports.CoreNames = constants_1.CoreNames;
exports.ISANames = constants_1.ISANames;
var dap_1 = require("./dap/dap");
exports.DAP = dap_1.DAP;
var FlashTarget_1 = require("./targets/FlashTarget");
exports.FlashTargets = FlashTarget_1.FlashTargets;
exports.FlashTarget = FlashTarget_1.FlashTarget;
var FlashProgram_1 = require("./targets/FlashProgram");
exports.FlashProgram = FlashProgram_1.FlashProgram;
var PlatformSelector_1 = require("./targets/PlatformSelector");
exports.PlatformSelector = PlatformSelector_1.PlatformSelector;
var hid_1 = require("./transport/hid");
exports.HID = hid_1.HID;

},{"./cortex/constants":1,"./cortex/cortex":2,"./dap/dap":4,"./targets/FlashProgram":11,"./targets/FlashTarget":12,"./targets/PlatformSelector":15,"./transport/hid":17}],9:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const util_1 = require("../util");
const prepared_1 = require("./prepared");
/**
 * # Memory Interface
 *
 * Controls access to the target's memory.
 *
 * ## Usage
 *
 * Using an instance of `CortexM`, as described before, we can simply read and
 * write numbers to memory as follows:
 *
 * ```typescript
 * const mem = core.memory;
 *
 * // NOTE: the address parameter must be word (4-byte) aligned.
 * await mem.write32(0x200000, 12345);
 * const val = await mem.read32(0x200000);
 *
 * // val === 12345
 *
 * // NOTE: the address parameter must be half-word (2-byte) aligned
 * await mem.write16(0x2000002, 65534);
 * const val16 = await mem.read16(0x2000002);
 *
 * // val16 === 65534
 * ```
 *
 * To write a larger block of memory, we can use `readBlock` and `writeBlock`. Again,
 * these blocks must be written to word-aligned addresses in memory.
 *
 * ```typescript
 * const data = new Uint32Array([0x1234, 0x5678, 0x9ABC, 0xDEF0]);
 * await mem.writeBlock(0x200000, data);
 *
 * const readData = await mem.readBlock(0x200000, data.length, 0x100);
 * ```
 *
 * ## See also
 *
 * `PreparedMemoryCommand` provides an equivalent API with better performance (in some
 * cases) by enabling batched memory operations.
 */
class Memory {
    constructor(dev) {
        this.dev = dev;
    }
    /**
     * Write a 32-bit word to the specified (word-aligned) memory address.
     *
     * @param addr Memory address to write to
     * @param data Data to write (values above 2**32 will be truncated)
     */
    async write32(addr, data) {
        const prep = this.dev.prepareCommand();
        prep.writeAp(0 /* CSW */, 587202640 /* CSW_VALUE */ | 2 /* CSW_SIZE32 */);
        prep.writeAp(4 /* TAR */, addr);
        prep.writeAp(12 /* DRW */, data);
        await prep.go();
    }
    /**
     * Write a 16-bit word to the specified (half word-aligned) memory address.
     *
     * @param addr Memory address to write to
     * @param data Data to write (values above 2**16 will be truncated)
     */
    async write16(addr, data) {
        data = data << ((addr & 0x02) << 3);
        const prep = this.dev.prepareCommand();
        prep.writeAp(0 /* CSW */, 587202640 /* CSW_VALUE */ | 1 /* CSW_SIZE16 */);
        prep.writeAp(4 /* TAR */, addr);
        prep.writeAp(12 /* DRW */, data);
        await prep.go();
    }
    /**
     * Read a 32-bit word from the specified (word-aligned) memory address.
     *
     * @param addr Memory address to read from.
     */
    async read32(addr) {
        const prep = this.dev.prepareCommand();
        prep.writeAp(0 /* CSW */, 587202640 /* CSW_VALUE */ | 2 /* CSW_SIZE32 */);
        prep.writeAp(4 /* TAR */, addr);
        prep.readAp(12 /* DRW */);
        try {
            return (await prep.go())[0];
        }
        catch (e) {
            // transfer wait, try again.
            await util_1.delay(100);
            return await this.read32(addr);
        }
    }
    /**
     * Read a 16-bit word from the specified (half word-aligned) memory address.
     *
     * @param addr Memory address to read from.
     */
    async read16(addr) {
        const prep = this.dev.prepareCommand();
        prep.writeAp(0 /* CSW */, 587202640 /* CSW_VALUE */ | 1 /* CSW_SIZE16 */);
        prep.writeAp(4 /* TAR */, addr);
        prep.readAp(12 /* DRW */);
        let val;
        try {
            val = (await prep.go())[0];
        }
        catch (e) {
            // transfer wait, try again.
            await util_1.delay(100);
            val = await this.read16(addr);
        }
        val = (val >> ((addr & 0x02) << 3) & 0xffff);
        return val;
    }
    /**
     * Reads a block of memory from the specified memory address.
     *
     * @param addr Address to read from
     * @param words Number of words to read
     * @param pageSize Memory page size
     */
    async readBlock(addr, words, pageSize) {
        const funs = [async () => Promise.resolve()];
        const bufs = [];
        const end = addr + words * 4;
        let ptr = addr;
        while (ptr < end) {
            let nextptr = ptr + pageSize;
            if (ptr === addr) {
                nextptr &= ~(pageSize - 1);
            }
            const len = Math.min(nextptr - ptr, end - ptr);
            const ptr0 = ptr;
            util_1.assert((len & 3) === 0);
            funs.push(async () => {
                bufs.push(await this.readBlockCore(ptr0, len >> 2));
            });
            ptr = nextptr;
        }
        for (const f of funs) {
            await f();
        }
        const result = await util_1.bufferConcat(bufs);
        return result.subarray(0, words * 4);
    }
    /**
     * Write a block of memory to the specified memory address.
     *
     * @param addr Memory address to write to.
     * @param words Array of 32-bit words to write to memory.
     */
    async writeBlock(addr, words) {
        if (words.length === 0) {
            return;
        }
        return this.writeBlockCore(addr, words);
    }
    prepareCommand() {
        return new prepared_1.PreparedMemoryCommand(this.dev);
    }
    async readBlockCore(addr, words) {
        const prep = this.dev.prepareCommand();
        prep.writeAp(0 /* CSW */, 587202640 /* CSW_VALUE */ | 2 /* CSW_SIZE32 */);
        prep.writeAp(4 /* TAR */, addr);
        await prep.go();
        let lastSize = words % 15;
        if (lastSize === 0) {
            lastSize = 15;
        }
        const blocks = [];
        for (let i = 0; i < Math.ceil(words / 15); i++) {
            const b = await this.dev.readRegRepeat(util_1.apReg(12 /* DRW */, 2 /* READ */), i === blocks.length - 1 ? lastSize : 15);
            blocks.push(b);
        }
        return util_1.bufferConcat(blocks);
    }
    async writeBlockCore(addr, words) {
        try {
            const blSz = 14;
            const reg = util_1.apReg(12 /* DRW */, 0 /* WRITE */);
            const prep = this.dev.prepareCommand();
            prep.writeAp(0 /* CSW */, 587202640 /* CSW_VALUE */ | 2 /* CSW_SIZE32 */);
            prep.writeAp(4 /* TAR */, addr);
            for (let i = 0; i < Math.ceil(words.length / blSz); i++) {
                prep.writeRegRepeat(reg, words.subarray(i * blSz, i * blSz + blSz));
            }
            await prep.go();
        }
        catch (e) {
            if (e.dapWait) {
                await util_1.delay(100);
                return await this.writeBlockCore(addr, words);
            }
            else {
                throw e;
            }
        }
    }
}
exports.Memory = Memory;

},{"../util":18,"./prepared":10}],10:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * # Prepared Memory Command
 *
 * Allows multiple memory operations to be batched together to improve HID
 * interface utilisation.
 *
 * ## Usage
 *
 * Similarly to `CortexMPreparedCommand` and `DapPreparedCommand`, a convenience
 * function exists to quickly create a prepared memory command:
 *
 * ```typescript
 * const prep = core.memory.prepareCommand();
 * ```
 *
 * You can then construct the sequence of commands using the same API as `Memory`.
 *
 * ```typescript
 * prep.write32(0x20000, 1234);
 * prep.write32(0x12344, 5678);
 * prep.write16(0x12346, 123);
 * ```
 *
 * And then dispatch the prepared commands asynchronously:
 *
 * ```typescript
 * await prep.go();
 * ```
 */
class PreparedMemoryCommand {
    constructor(dap) {
        this.cmd = dap.prepareCommand();
    }
    /**
     * Schedule a 32-bit memory write operation.
     *
     * @param addr Word-aligned memory address to write to.
     * @param data Number to be written.
     */
    write32(addr, data) {
        this.cmd.writeAp(0 /* CSW */, 587202640 /* CSW_VALUE */ | 2 /* CSW_SIZE32 */);
        this.cmd.writeAp(4 /* TAR */, addr);
        this.cmd.writeAp(12 /* DRW */, data);
    }
    /**
     * Schedule a 16-bit memory write operation.
     *
     * @param addr Half word-aligned memory address to write to.
     * @param data Number to be written.
     */
    write16(addr, data) {
        data = data << ((addr & 0x02) << 3);
        this.cmd.writeAp(0 /* CSW */, 587202640 /* CSW_VALUE */ | 1 /* CSW_SIZE16 */);
        this.cmd.writeAp(4 /* TAR */, addr);
        this.cmd.writeAp(12 /* DRW */, data);
    }
    /**
     * Schedule a 32-bit memory read operation.
     *
     * @param addr Word-aligned memory address to read from.
     */
    read32(addr) {
        this.cmd.writeAp(0 /* CSW */, 587202640 /* CSW_VALUE */ | 2 /* CSW_SIZE32 */);
        this.cmd.writeAp(4 /* TAR */, addr);
        this.cmd.readAp(12 /* DRW */);
    }
    /**
     * Schedule a 16-bit memory read operation.
     *
     * FIXME: the values need to be shifted after being read.
     *
     * @param addr Half word-aligned memory address to read from.
     */
    read16(addr) {
        this.cmd.writeAp(0 /* CSW */, 587202640 /* CSW_VALUE */ | 1 /* CSW_SIZE16 */);
        this.cmd.writeAp(4 /* TAR */, addr);
        this.cmd.readAp(12 /* DRW */);
    }
    /**
     * Execute all commands asynchronously.
     */
    async go() {
        return this.cmd.go();
    }
}
exports.PreparedMemoryCommand = PreparedMemoryCommand;

},{}],11:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const util_1 = require("../util");
class FlashSection {
    constructor(address, data) {
        this.address = address;
        this.data = data;
        /* empty */
    }
    toString() {
        return `${this.data.byteLength} bytes @ ${this.address.toString(16)}`;
    }
}
exports.FlashSection = FlashSection;
/**
 * # Flash Program
 *
 * Represents a program to be flashed to memory as a series of disjoint sections
 * in memory/flash.
 *
 * ## Usage
 *
 * Use with a hex file is as simple as loading it from disk, and calling `fromIntelHex`.
 *
 * ```typescript
 * const hexFile = "microbit.hex";
 * const hexData = fs.readFileSync(hexFile, { encoding: 'utf-8' });
 *
 * const program = FlashProgram.fromIntelHex(hexData);
 * core.program(program, (progress) => {
 *     console.log(`Flash progress: ${progress * 100}%`);
 * });
 * ```
 *
 * When used with a binary file, you must make sure that the file is stored in a
 * Uint32Array, and you must provide a base address for the binary to be written to.
 * The base address is commonly zero.
 */
class FlashProgram {
    constructor(sections) {
        this.sections = sections;
    }
    static fromIntelHex(hex) {
        const lines = hex.split(/\n/);
        let upperAddr = 0;
        let startAddr = 0;
        let current = null;
        const chunks = [];
        for (let i = 0; i < lines.length; i++) {
            const line = lines[i];
            if (line.substr(0, 1) !== ":") {
                throw new Error(`Invaild line in hex file: ${i + 1}`);
            }
            else {
                const length = parseInt(line.substr(1, 2), 16);
                const addr = upperAddr + parseInt(line.substr(3, 4), 16);
                const fieldType = parseInt(line.substr(7, 2), 16);
                const data = line.substr(9, length * 2);
                if (fieldType === 0x00) {
                    if (current && addr !== startAddr + (current.length / 2)) {
                        // non-contiguous
                        const sectionData = util_1.hex2bin(current);
                        chunks.push(new FlashSection(startAddr, new Uint32Array(sectionData.buffer)));
                        current = "";
                        startAddr = addr;
                    }
                    else if (!current) {
                        startAddr = addr;
                        current = "";
                    }
                    current += data;
                }
                else if (fieldType === 0x01) {
                    // EOF
                    break;
                }
                else if (fieldType === 0x02) {
                    // extended segment address record
                    upperAddr = parseInt(data, 16) << 4;
                }
                else if (fieldType === 0x04) {
                    // extended linear address record
                    upperAddr = parseInt(data, 16) << 16;
                }
            }
        }
        return new FlashProgram(chunks);
    }
    static fromBinary(addr, bin) {
        return new FlashProgram([new FlashSection(addr, bin)]);
    }
    totalByteLength() {
        return this.sections.map((s) => s.data.byteLength).reduce((x, y) => x + y);
    }
    toString() {
        return this.sections.toString();
    }
}
exports.FlashProgram = FlashProgram;

},{"../util":18}],12:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cortex_1 = require("../cortex/cortex");
const K64F_1 = require("./K64F");
const NRF51_1 = require("./NRF51");
/**
 * Analyzer code blob, from PyOCD. This can be used to compute a table of CRC
 * values. See https://github.com/mbedmicro/pyOCD/tree/master/src/analyzer.
 */
const analyzer = new Uint32Array([
    0x2180468c, 0x2600b5f0, 0x4f2c2501, 0x447f4c2c, 0x1c2b0049, 0x425b4033, 0x40230872, 0x085a4053,
    0x425b402b, 0x40534023, 0x402b085a, 0x4023425b, 0x085a4053, 0x425b402b, 0x40534023, 0x402b085a,
    0x4023425b, 0x085a4053, 0x425b402b, 0x40534023, 0x402b085a, 0x4023425b, 0x085a4053, 0x425b402b,
    0x40534023, 0xc7083601, 0xd1d2428e, 0x2b004663, 0x4663d01f, 0x46b4009e, 0x24ff2701, 0x44844d11,
    0x1c3a447d, 0x88418803, 0x4351409a, 0xd0122a00, 0x22011856, 0x780b4252, 0x40533101, 0x009b4023,
    0x0a12595b, 0x42b1405a, 0x43d2d1f5, 0x4560c004, 0x2000d1e7, 0x2200bdf0, 0x46c0e7f8, 0x000000b6,
    0xedb88320, 0x00000044,
]);
/**
 * # Flash Target
 *
 * Represents a target device containing a flash region. In rare cases that a
 * target chip only has RAM, uploading a program is as simple as writing a
 * block of data to memory.
 *
 * ## Usage
 *
 * Initialising the `FlashTarget` object is the same as configuring a Cortex-M
 * object, but with an additional parameter for the platform (contains the
 * flashing algorithm and memory layout).
 *
 * ```typescript
 * import {K64F, DAP, FlashTarget} from "dapjs";
 *
 * // make sure hid is an object implementing the `IHID` interface.
 * const dap = new DAP(hid);
 * const device = new FlashTarget(dap, K64F);
 * ```
 *
 * Now, we can do all of the operations you'd expect. As usual, these examples
 * work in a function marked `async`. Alternatively, they can be implemented
 * using Promises directly.
 *
 * ```typescript
 * await device.eraseChip();
 *
 * // flash a hex program
 *
 * ```
 */
class FlashTarget extends cortex_1.CortexM {
    constructor(device, platform) {
        super(device);
        this.platform = platform;
        this.inited = false;
    }
    /**
     * Initialise the flash driver on the chip. Must be called before any of the other
     * flash-related methods.
     */
    async flashInit() {
        if (this.inited) {
            return;
        }
        // reset and halt
        await this.reset(true);
        // make sure we're in Thumb mode.
        await this.writeCoreRegister(16 /* XPSR */, 1 << 24);
        await this.writeCoreRegister(9 /* R9 */, this.platform.flashAlgo.staticBase);
        // upload analyzer
        if (this.platform.flashAlgo.analyzerSupported) {
            await this.memory.writeBlock(this.platform.flashAlgo.analyzerAddress, analyzer);
        }
        const result = await this.runCode(this.platform.flashAlgo.instructions, this.platform.flashAlgo.loadAddress, this.platform.flashAlgo.pcInit, this.platform.flashAlgo.loadAddress + 1, this.platform.flashAlgo.stackPointer, true, 0, 0, 0, 0);
        this.inited = true;
        return result;
    }
    /**
     * Erase _all_ data stored in flash on the chip.
     */
    async eraseChip() {
        if (!this.inited) {
            await this.flashInit();
        }
        const result = await this.runCode(this.platform.flashAlgo.instructions, this.platform.flashAlgo.loadAddress, this.platform.flashAlgo.pcEraseAll, this.platform.flashAlgo.loadAddress + 1, this.platform.flashAlgo.stackPointer, false, 0, 0, 0);
        return result;
    }
    /**
     * Flash a contiguous block of data to flash at a specified address.
     *
     * @param data Array of 32-bit integers to write to flash.
     * @param address Memory address in flash to write to.
     * @param progressCb Callback to keep track of progress through upload (from 0.0 to 1.0)
     */
    async flash(data, address, progressCb) {
        if (!this.inited) {
            await this.flashInit();
        }
        const pageSizeWords = this.platform.flashAlgo.pageSize / 4;
        const bufferAddress = this.platform.flashAlgo.pageBuffers[0];
        const flashStart = address || this.platform.flashAlgo.flashStart;
        // How far through `data` are we (in bytes)
        let ptr = 0;
        while (ptr < data.byteLength) {
            const wordPtr = ptr / 4;
            const pageData = data.subarray(wordPtr, wordPtr + pageSizeWords);
            const flashAddress = flashStart + ptr;
            await this.memory.writeBlock(bufferAddress, pageData);
            await this.runCode(this.platform.flashAlgo.instructions, this.platform.flashAlgo.loadAddress, this.platform.flashAlgo.pcProgramPage, // pc
            this.platform.flashAlgo.loadAddress + 1, // lr
            this.platform.flashAlgo.stackPointer, // sp
            /* upload? */
            false, 
            /* args */
            flashAddress, this.platform.flashAlgo.pageSize, bufferAddress);
            if (progressCb) {
                progressCb(ptr / data.byteLength);
            }
            ptr += pageData.byteLength;
        }
        if (progressCb) {
            progressCb(1.0);
        }
    }
    /**
     * Upload a program consisting of one or more disjoint sections to flash.
     *
     * @param program Program to be uploaded
     * @param progressCb Callback to receive progress updates (from 0.0 to 1.0)
     */
    async program(program, progressCb) {
        await this.flashInit();
        await this.eraseChip();
        const totalBytes = program.totalByteLength();
        let cumulativeBytes = 0;
        const startTime = Date.now();
        for (const section of program.sections) {
            await this.flash(section.data, section.address, (progress) => {
                const sectionBytes = section.data.byteLength * progress;
                progressCb((cumulativeBytes + sectionBytes) / totalBytes);
            });
            cumulativeBytes += section.data.byteLength;
        }
        const endTime = Date.now();
        const elapsedTime = endTime - startTime;
        const transferRate = totalBytes / elapsedTime; // B/ms == kB/s
        await this.flashUnInit();
        progressCb(1.0);
    }
    /**
     * Un-init the flash algorithm. Commonly, we use this to ensure that the flashing
     * algorithms are re-uploaded after resets.
     */
    flashUnInit() {
        this.inited = false;
    }
}
exports.FlashTarget = FlashTarget;
/**
 * Map of mbed device codes to platform objects. Can be used by applications
 * to dynamically select flashing algorithm based on the devices connected to
 * the computer.
 *
 * > *TODO:* extend the mbed devices API to include data stored here, so that we can
 * > expand to cover all devices without needing to update DAP.js.
 */
exports.FlashTargets = new Map();
exports.FlashTargets.set("0240", new K64F_1.K64F());
exports.FlashTargets.set("9900", new NRF51_1.NRF51());

},{"../cortex/cortex":2,"./K64F":13,"./NRF51":14}],13:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const K64F_FLASH_ALGO = {
    analyzerAddress: 0x1ffff000,
    analyzerSupported: true,
    flashSize: 0x100000,
    flashStart: 0x0,
    // Flash algorithm as a hex string
    instructions: new Uint32Array([
        0xE00ABE00, 0x062D780D, 0x24084068, 0xD3000040, 0x1E644058, 0x1C49D1FA, 0x2A001E52, 0x4770D1F2,
        0x4604b570, 0x4616460d, 0x5020f24c, 0x81c84932, 0x1028f64d, 0x460881c8, 0xf0208800, 0x80080001,
        0x4448482e, 0xf8dcf000, 0x2001b108, 0x2000bd70, 0x4601e7fc, 0x47702000, 0x4929b510, 0x44484827,
        0xf8b8f000, 0xb92c4604, 0x48242100, 0xf0004448, 0x4604f9a9, 0xf837f000, 0xbd104620, 0x4604b570,
        0x4448481e, 0x46214b1e, 0xf00068c2, 0x4605f85d, 0x481ab93d, 0x23004448, 0x68c24621, 0xf946f000,
        0xf0004605, 0x4628f820, 0xb5febd70, 0x460c4605, 0x46234616, 0x46294632, 0x44484810, 0xf8f8f000,
        0xb9674607, 0x22012000, 0x2000e9cd, 0x46224633, 0x90024629, 0x44484809, 0xf984f000, 0xf0004607,
        0x4638f802, 0x4807bdfe, 0xf4206840, 0xf5000070, 0x49040070, 0x47706048, 0x40052000, 0x00000004,
        0x6b65666b, 0x4001f000, 0x4a0e2070, 0x20807010, 0xbf007010, 0x7800480b, 0x280009c0, 0x4809d0fa,
        0xf0017801, 0xb1080020, 0x47702067, 0x0010f001, 0x2068b108, 0xf001e7f9, 0xb1080001, 0xe7f42069,
        0xe7f22000, 0x40020000, 0x4df0e92d, 0x460d4604, 0x469a4690, 0xf0004650, 0x4606f891, 0x4630b116,
        0x8df0e8bd, 0x46422310, 0x46204629, 0xf86cf000, 0xb10e4606, 0xe7f34630, 0x0008eb05, 0x68e01e47,
        0xf1f0fbb7, 0x7011fb00, 0x68e0b140, 0xf0f0fbb7, 0x0b01f100, 0xfb0068e0, 0x1e47f00b, 0x480be011,
        0x68004478, 0x20096005, 0x71c84909, 0xffacf7ff, 0x69a04606, 0x69a0b108, 0xb1064780, 0x68e0e003,
        0x42bd4405, 0xbf00d9eb, 0xe7c94630, 0x000002ec, 0x40020000, 0x4604b570, 0x4628460d, 0xf84ef000,
        0xb10e4606, 0xbd704630, 0x2004b90c, 0x2044e7fb, 0x71c84902, 0xff88f7ff, 0x0000e7f5, 0x40020000,
        0xb9094601, 0x47702004, 0x6cc04826, 0x6003f3c0, 0x447b4b25, 0x0010f833, 0xb90a0302, 0xe7f22064,
        0x60082000, 0x2002604a, 0x02c06088, 0x200060c8, 0x61486108, 0xbf006188, 0x4602e7e5, 0x2004b90a,
        0x61914770, 0xe7fb2000, 0x4604b530, 0x2004b90c, 0x1e58bd30, 0xb9104008, 0x40101e58, 0x2065b108,
        0x6820e7f6, 0xd8054288, 0x0500e9d4, 0x188d4428, 0xd20142a8, 0xe7eb2066, 0xe7e92000, 0x480b4601,
        0xd0014281, 0x4770206b, 0xe7fc2000, 0xb90b4603, 0x47702004, 0xd801290f, 0xd0012a04, 0xe7f82004,
        0xe7f62000, 0x40048000, 0x0000025a, 0x6b65666b, 0x41f0e92d, 0x46884607, 0x461d4614, 0x2004b914,
        0x81f0e8bd, 0x462a2308, 0x46384641, 0xffbcf7ff, 0xb10e4606, 0xe7f34630, 0x4812e01f, 0x68004478,
        0x8000f8c0, 0x490fcc01, 0x390c4479, 0x60486809, 0x490ccc01, 0x39184479, 0x60886809, 0x490a2007,
        0xf7ff71c8, 0x4606ff01, 0xb10869b8, 0x478069b8, 0xe004b106, 0x0808f108, 0x2d003d08, 0xbf00d1dd,
        0xe7cd4630, 0x000001b0, 0x40020000, 0x4dffe92d, 0x4682b082, 0x2310460c, 0x46504621, 0xf7ff9a04,
        0x4683ff83, 0x0f00f1bb, 0x4658d003, 0xe8bdb006, 0xe9da8df0, 0xfbb00101, 0x4260f7f1, 0x40084279,
        0x42a54245, 0x443dd100, 0xe0229e04, 0x0804eba5, 0xd90045b0, 0xea4f46b0, 0x90011018, 0x4478480f,
        0x60046800, 0x490e2001, 0x980171c8, 0x72c80a00, 0x72889801, 0x72489805, 0xfeb6f7ff, 0xf1bb4683,
        0xd0010f00, 0xe7d14658, 0x0608eba6, 0x443d4444, 0x2e00bf00, 0x2000d1da, 0x0000e7c8, 0x0000010e,
        0x40020000, 0x4604b570, 0xb90c460d, 0xbd702004, 0x49032040, 0x460871c8, 0xf7ff7185, 0xe7f6fe95,
        0x40020000, 0x4dffe92d, 0x4617460c, 0xe9dd461d, 0xf8ddb80c, 0xb91da038, 0xb0042004, 0x8df0e8bd,
        0x463a2304, 0x98004621, 0xff1ef7ff, 0xb10e4606, 0xe7f24630, 0x4814e022, 0x68004478, 0x20026004,
        0x71c84912, 0xf8804608, 0x490fb00b, 0x39144479, 0x68096828, 0xf7ff6088, 0x4606fe67, 0xf1b8b15e,
        0xd0010f00, 0x4000f8c8, 0x0f00f1ba, 0x2000d002, 0x0000f8ca, 0x1f3fe004, 0x1d241d2d, 0xd1da2f00,
        0x4630bf00, 0x0000e7c9, 0x00000074, 0x40020000, 0x00000000, 0x00080000, 0x00100000, 0x00200000,
        0x00400000, 0x00800000, 0x01000000, 0x01000000, 0x40020004, 0x00000000,
    ]),
    loadAddress: 0x20000000,
    pageBuffers: [0x20003000, 0x20004000],
    pageSize: 0x1000,
    // Relative function addresses
    pcEraseAll: 0x20000059,
    pcEraseSector: 0x2000007D,
    pcInit: 0x20000021,
    // pcUnInit: 0x49,
    pcProgramPage: 0x200000AB,
    stackPointer: 0x20001000,
    staticBase: 0x20000000 + 0x20 + 0x474,
};
class K64F {
    constructor() {
        this.flashAlgo = K64F_FLASH_ALGO;
    }
    overrideSecurityBits(address, data) {
        const u8data = new Uint8Array(data.buffer);
        // Kinetis security values and addresses
        const SECURITY_START = 0x400;
        const SECURITY_SIZE = 16;
        const FPROT_ADDR = 0x408;
        const FPROT_ADDR_END = 0x40c;
        const FPROT_SIZE = 4;
        const FSEC_ADDR = 0x40c;
        const FSEC_VAL = 0xFE;
        const FOPT_ADDR = 0x40d;
        const FOPT_VAL = 0xFF;
        const FEPROT_ADDR = 0x40e;
        const FEPROT_VAL = 0xFF;
        const FDPROT_ADDR = 0x40f;
        const FDPROT_VAL = 0xFF;
        if (address <= SECURITY_START && address + u8data.byteLength > SECURITY_START + SECURITY_SIZE) {
            for (let i = FPROT_ADDR; i < FPROT_ADDR_END; i++) {
                if (u8data[i - address] !== 0xff) {
                    u8data[i - address] = 0xff;
                }
            }
            if (u8data[FSEC_ADDR - address] !== FSEC_VAL) {
                u8data[FSEC_ADDR - address] = FSEC_VAL;
            }
            if (u8data[FOPT_ADDR - address] === 0x00) {
            }
            if (u8data[FEPROT_ADDR - address] !== FEPROT_VAL) {
                u8data[FEPROT_ADDR - address] = FEPROT_VAL;
            }
            if (u8data[FDPROT_ADDR - address] !== FDPROT_VAL) {
                u8data[FDPROT_ADDR - address] = FDPROT_VAL;
            }
        }
    }
}
exports.K64F = K64F;

},{}],14:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const NRF51_FLASH_ALGO = {
    analyzerAddress: 0x20003000,
    analyzerSupported: true,
    beginData: 0x20002000,
    flashSize: 0x40000,
    flashStart: 0x0,
    instructions: new Uint32Array([
        0xE00ABE00, 0x062D780D, 0x24084068, 0xD3000040, 0x1E644058, 0x1C49D1FA, 0x2A001E52, 0x4770D1F2,
        0x47702000, 0x47702000, 0x4c26b570, 0x60602002, 0x60e02001, 0x68284d24, 0xd00207c0, 0x60602000,
        0xf000bd70, 0xe7f6f82c, 0x4c1eb570, 0x60612102, 0x4288491e, 0x2001d302, 0xe0006160, 0x4d1a60a0,
        0xf81df000, 0x07c06828, 0x2000d0fa, 0xbd706060, 0x4605b5f8, 0x4813088e, 0x46142101, 0x4f126041,
        0xc501cc01, 0x07c06838, 0x1e76d006, 0x480dd1f8, 0x60412100, 0xbdf84608, 0xf801f000, 0x480ce7f2,
        0x06006840, 0xd00b0e00, 0x6849490a, 0xd0072900, 0x4a0a4909, 0xd00007c3, 0x1d09600a, 0xd1f90840,
        0x00004770, 0x4001e500, 0x4001e400, 0x10001000, 0x40010400, 0x40010500, 0x40010600, 0x6e524635,
        0x00000000,
    ]),
    loadAddress: 0x20000000,
    minProgramLength: 4,
    pageBuffers: [0x20002000, 0x20002400],
    pageSize: 0x400,
    pcEraseAll: 0x20000029,
    pcEraseSector: 0x20000049,
    pcInit: 0x20000021,
    pcProgramPage: 0x20000071,
    stackPointer: 0x20001000,
    staticBase: 0x20000170,
};
class NRF51 {
    constructor() {
        this.flashAlgo = NRF51_FLASH_ALGO;
    }
    overrideSecurityBits(address, data) {
        /* empty */
    }
}
exports.NRF51 = NRF51;

},{}],15:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class PlatformSelector {
    constructor() {
        this.deviceCache = new Map();
    }
    async lookupDevice(code) {
        if (this.deviceCache.has(code)) {
            return this.deviceCache.get(code);
        }
        const xhr = new XMLHttpRequest();
        xhr.open("get", `https://os.mbed.com/api/v3/platforms/${code}/`, true);
        xhr.responseType = "json";
        return new Promise((resolve, reject) => {
            xhr.onload = (e) => {
                const device = {
                    name: xhr.response.name,
                    productCode: xhr.response.productcode,
                };
                this.deviceCache.set(code, device);
                resolve(device);
            };
            xhr.send();
        });
    }
}
exports.PlatformSelector = PlatformSelector;

},{}],16:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const util_1 = require("../util");
class CMSISDAP {
    constructor(hid) {
        this.maxSent = 1;
        this.hid = hid;
    }
    async resetTarget() {
        return this.cmdNums(10 /* DAP_RESET_TARGET */, []);
    }
    async disconnect() {
        return this.cmdNums(3 /* DAP_DISCONNECT */, []);
    }
    async cmdNums(op, data) {
        data.unshift(op);
        const buf = await this.send(data);
        if (buf[0] !== op) {
            throw new Error(`Bad response for ${op} -> ${buf[0]}`);
        }
        switch (op) {
            case 2 /* DAP_CONNECT */:
            case 0 /* DAP_INFO */:
            case 5 /* DAP_TRANSFER */:
            case 6 /* DAP_TRANSFER_BLOCK */:
                break;
            default:
                if (buf[1] !== 0) {
                    throw new Error(`Bad status for ${op} -> ${buf[1]}`);
                }
        }
        return buf;
    }
    async connect() {
        const v = await this.info(254 /* PACKET_COUNT */);
        if (v) {
            this.maxSent = v;
        }
        else {
            throw new Error("DAP_INFO returned invalid packet count.");
        }
        await this.cmdNums(17 /* DAP_SWJ_CLOCK */, util_1.addInt32(null, 10000000));
        const buf = await this.cmdNums(2 /* DAP_CONNECT */, [0]);
        if (buf[1] !== 1) {
            throw new Error("SWD mode not enabled.");
        }
        await this.cmdNums(17 /* DAP_SWJ_CLOCK */, util_1.addInt32(null, 10000000));
        await this.cmdNums(4 /* DAP_TRANSFER_CONFIGURE */, [0, 0x50, 0, 0, 0]);
        await this.cmdNums(19 /* DAP_SWD_CONFIGURE */, [0]);
        await this.jtagToSwd();
    }
    async jtagToSwd() {
        const arrs = [
            [56, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff],
            [16, 0x9e, 0xe7],
            [56, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff],
            [8, 0x00],
        ];
        for (const arr of arrs) {
            await this.swjSequence(arr);
        }
    }
    async swjSequence(data) {
        return this.cmdNums(18 /* DAP_SWJ_SEQUENCE */, data);
    }
    async info(id) {
        const buf = await this.cmdNums(0 /* DAP_INFO */, [id]);
        if (buf[1] === 0) {
            return null;
        }
        switch (id) {
            case 240 /* CAPABILITIES */:
            case 254 /* PACKET_COUNT */:
            case 255 /* PACKET_SIZE */:
                if (buf[1] === 1) {
                    return buf[2];
                }
                else if (buf[1] === 2) {
                    return buf[3] << 8 | buf[2];
                }
        }
        return buf.subarray(2, buf[1] + 2 - 1); // .toString("utf8")
    }
    async send(command) {
        const array = Uint8Array.from(command);
        await this.hid.write(array.buffer);
        const response = await this.hid.read();
        return new Uint8Array(response.buffer);
    }
}
exports.CMSISDAP = CMSISDAP;

},{"../util":18}],17:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function bufferExtend(source, length) {
    let sarr = new Uint8Array(source);
    let dest = new ArrayBuffer(length);
    let darr = new Uint8Array(dest);
    for (let i = 0; i < Math.min(source.byteLength, length); i++) {
        darr[i] = sarr[i];
    }
    return dest;
}
class HID {
    constructor(device) {
        this.device = device;
    }
    async open() {
        await this.device.open();
        await this.device.selectConfiguration(1);
        let hids = this.device.configuration.interfaces.filter((intf) => intf.alternates[0].interfaceClass == 0xFF);
        if (hids.length == 0) {
            throw 'No HID interfaces found.';
        }
        this.interfaces = hids;
        if (this.interfaces.length == 1) {
            this.interface = this.interfaces[0];
        }
        await this.device.claimInterface(this.interface.interfaceNumber);
        this.endpoints = this.interface.alternates[0].endpoints;
        this.ep_in = null;
        this.ep_out = null;
        for (let endpoint of this.endpoints) {
            if (endpoint.direction == 'in') {
                this.ep_in = endpoint;
            }
            else {
                this.ep_out = endpoint;
            }
        }
        if (this.ep_in == null || this.ep_out == null) {
            console.log('Unable to find an in and an out endpoint.');
        }
    }
    close() {
        return this.device.close();
    }
    write(data) {
        let report_size = this.ep_out.packetSize;
        let buffer = bufferExtend(data, report_size);
        return this.device.transferOut(this.ep_out.endpointNumber, buffer);
    }
    read() {
        let report_size = this.ep_in.packetSize;
        return this.device.transferIn(this.ep_in.endpointNumber, report_size)
            .then(res => res.data);
    }
}
exports.HID = HID;

},{}],18:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.readUInt32LE = (b, idx) => {
    return (b[idx] |
        (b[idx + 1] << 8) |
        (b[idx + 2] << 16) |
        (b[idx + 3] << 24)) >>> 0;
};
exports.bufferConcat = (bufs) => {
    let len = 0;
    for (const b of bufs) {
        len += b.length;
    }
    const r = new Uint8Array(len);
    len = 0;
    for (const b of bufs) {
        r.set(b, len);
        len += b.length;
    }
    return r;
};
exports.delay = async (t) => {
    return new Promise((resolve) => {
        setTimeout(resolve, t);
    });
};
exports.addInt32 = (arr, val) => {
    if (!arr) {
        arr = [];
    }
    arr.push(val & 0xff, (val >> 8) & 0xff, (val >> 16) & 0xff, (val >> 24) & 0xff);
    return arr;
};
exports.hex = (v) => {
    return "0x" + v.toString(16);
};
exports.rid = (v) => {
    const m = [
        "DP_0x0",
        "DP_0x4",
        "DP_0x8",
        "DP_0xC",
        "AP_0x0",
        "AP_0x4",
        "AP_0x8",
        "AP_0xC",
    ];
    return m[v] || "?";
};
exports.bank = (addr) => {
    const APBANKSEL = 0x000000f0;
    return (addr & APBANKSEL) | (addr & 0xff000000);
};
exports.apReg = (r, mode) => {
    const v = r | mode | 1 /* AP_ACC */;
    return (4 + ((v & 0x0c) >> 2));
};
exports.bufToUint32Array = (buf) => {
    exports.assert((buf.length & 3) === 0);
    const r = [];
    if (!buf.length) {
        return r;
    }
    r[buf.length / 4 - 1] = 0;
    for (let i = 0; i < r.length; ++i) {
        r[i] = exports.readUInt32LE(buf, i << 2);
    }
    return r;
};
exports.assert = (cond) => {
    if (!cond) {
        throw new Error("assertion failed");
    }
};
exports.regRequest = (regId, isWrite = false) => {
    let request = !isWrite ? 2 /* READ */ : 0 /* WRITE */;
    if (regId < 4) {
        request |= 0 /* DP_ACC */;
    }
    else {
        request |= 1 /* AP_ACC */;
    }
    request |= (regId & 3) << 2;
    return request;
};
exports.hexBytes = (bytes) => {
    let chk = 0;
    let r = ":";
    bytes.forEach((b) => chk += b);
    bytes.push((-chk) & 0xff);
    bytes.forEach((b) => r += ("0" + b.toString(16)).slice(-2));
    return r.toUpperCase();
};
exports.hex2bin = (hexstr) => {
    const array = new Uint8Array(hexstr.length / 2);
    for (let i = 0; i < hexstr.length / 2; i++) {
        array[i] = parseInt(hexstr.substr(2 * i, 2), 16);
    }
    return array;
};

},{}]},{},[8])(8)
});