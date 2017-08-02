/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 4);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
exports.readUInt32LE = function (b, idx) {
    return (b[idx] |
        (b[idx + 1] << 8) |
        (b[idx + 2] << 16) |
        (b[idx + 3] << 24)) >>> 0;
};
exports.bufferConcat = function (bufs) {
    var len = 0;
    for (var _i = 0, bufs_1 = bufs; _i < bufs_1.length; _i++) {
        var b = bufs_1[_i];
        len += b.length;
    }
    var r = new Uint8Array(len);
    len = 0;
    for (var _a = 0, bufs_2 = bufs; _a < bufs_2.length; _a++) {
        var b = bufs_2[_a];
        r.set(b, len);
        len += b.length;
    }
    return r;
};
exports.delay = function (t) { return __awaiter(_this, void 0, void 0, function () {
    return __generator(this, function (_a) {
        return [2 /*return*/, new Promise(function (resolve) {
                setTimeout(resolve, t);
            })];
    });
}); };
exports.addInt32 = function (arr, val) {
    if (!arr) {
        arr = [];
    }
    arr.push(val & 0xff, (val >> 8) & 0xff, (val >> 16) & 0xff, (val >> 24) & 0xff);
    return arr;
};
exports.hex = function (v) {
    return "0x" + v.toString(16);
};
exports.rid = function (v) {
    var m = [
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
exports.bank = function (addr) {
    var APBANKSEL = 0x000000f0;
    return (addr & APBANKSEL) | (addr & 0xff000000);
};
exports.apReg = function (r, mode) {
    var v = r | mode | 1 /* AP_ACC */;
    return (4 + ((v & 0x0c) >> 2));
};
exports.bufToUint32Array = function (buf) {
    exports.assert((buf.length & 3) === 0);
    var r = [];
    if (!buf.length) {
        return r;
    }
    r[buf.length / 4 - 1] = 0;
    for (var i = 0; i < r.length; ++i) {
        r[i] = exports.readUInt32LE(buf, i << 2);
    }
    return r;
};
exports.assert = function (cond) {
    if (!cond) {
        throw new Error("assertion failed");
    }
};
exports.regRequest = function (regId, isWrite) {
    if (isWrite === void 0) { isWrite = false; }
    var request = !isWrite ? 2 /* READ */ : 0 /* WRITE */;
    if (regId < 4) {
        request |= 0 /* DP_ACC */;
    }
    else {
        request |= 1 /* AP_ACC */;
    }
    request |= (regId & 3) << 2;
    return request;
};
exports.hexBytes = function (bytes) {
    var chk = 0;
    var r = ":";
    bytes.forEach(function (b) { return chk += b; });
    bytes.push((-chk) & 0xff);
    bytes.forEach(function (b) { return r += ("0" + b.toString(16)).slice(-2); });
    return r.toUpperCase();
};
//# sourceMappingURL=util.js.map

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var debug_1 = __webpack_require__(5);
var util_1 = __webpack_require__(0);
var memory_1 = __webpack_require__(7);
var DEFAULT_RUNCODE_TIMEOUT = 10000 /* ms */;
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
/**
 * Abstraction of an ARM Cortex M CPU from a programmer's perspective. Provides functionality
 * for setting breakpoints, reading general-purpose registers, reading from memory and stopping
 * and starting the CPU.
 */
var CortexM = (function () {
    function CortexM(device) {
        this.dev = device;
        this.memory = new memory_1.Memory(device);
        this.debug = new debug_1.Debug(this);
    }
    /**
     * Initialise the debug access port on the device, and read the device type.
     */
    CortexM.prototype.init = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.dev.init()];
                    case 1:
                        _a.sent();
                        // FIXME: don't run this if security is enabled on the K64F
                        return [4 /*yield*/, this.debug.setupFpb()];
                    case 2:
                        // FIXME: don't run this if security is enabled on the K64F
                        _a.sent();
                        return [4 /*yield*/, this.readCoreType()];
                    case 3:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Read the current state of the CPU.
     *
     * @returns A member of the `CoreState` enum corresponding to the current status of the CPU.
     */
    CortexM.prototype.getState = function () {
        return __awaiter(this, void 0, void 0, function () {
            var dhcsr, newDHCSR;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.memory.read32(3758157296 /* DHCSR */)];
                    case 1:
                        dhcsr = _a.sent();
                        if (!(dhcsr & 33554432 /* S_RESET_ST */)) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.memory.read32(3758157296 /* DHCSR */)];
                    case 2:
                        newDHCSR = _a.sent();
                        if (newDHCSR & 33554432 /* S_RESET_ST */ && !(newDHCSR & 16777216 /* S_RETIRE_ST */)) {
                            return [2 /*return*/, 0 /* TARGET_RESET */];
                        }
                        _a.label = 3;
                    case 3:
                        if (dhcsr & 524288 /* S_LOCKUP */) {
                            return [2 /*return*/, 1 /* TARGET_LOCKUP */];
                        }
                        else if (dhcsr & 262144 /* S_SLEEP */) {
                            return [2 /*return*/, 2 /* TARGET_SLEEPING */];
                        }
                        else if (dhcsr & 131072 /* S_HALT */) {
                            return [2 /*return*/, 3 /* TARGET_HALTED */];
                        }
                        else {
                            return [2 /*return*/, 4 /* TARGET_RUNNING */];
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Read the CPUID register from the CPU, and interpret its meaning in terms of implementer,
     * architecture and core type.
     */
    CortexM.prototype.readCoreType = function () {
        return __awaiter(this, void 0, void 0, function () {
            var cpuid, implementer, arch, coreType;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.memory.read32(3758157056 /* CPUID */)];
                    case 1:
                        cpuid = _a.sent();
                        implementer = ((cpuid & exports.CPUID_IMPLEMENTER_MASK) >> exports.CPUID_IMPLEMENTER_POS);
                        arch = ((cpuid & exports.CPUID_ARCHITECTURE_MASK) >> exports.CPUID_ARCHITECTURE_POS);
                        coreType = ((cpuid & exports.CPUID_PARTNO_MASK) >> exports.CPUID_PARTNO_POS);
                        console.debug("Found an ARM " + exports.CoreNames.get(coreType));
                        return [2 /*return*/, [implementer, arch, coreType]];
                }
            });
        });
    };
    /**
     * Read a core register from the CPU (e.g. r0...r15, pc, sp, lr, s0...)
     *
     * @param no Member of the `CortexReg` enum - an ARM Cortex CPU general-purpose register.
     */
    CortexM.prototype.readCoreRegister = function (no) {
        return __awaiter(this, void 0, void 0, function () {
            var v;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.memory.write32(3758157300 /* DCRSR */, no)];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.memory.read32(3758157296 /* DHCSR */)];
                    case 2:
                        v = _a.sent();
                        util_1.assert(v & 65536 /* S_REGRDY */);
                        return [4 /*yield*/, this.memory.read32(3758157304 /* DCRDR */)];
                    case 3: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * Write a 32-bit word to the specified CPU general-purpose register.
     *
     * @param no Member of the `CortexReg` enum - an ARM Cortex CPU general-purpose register.
     * @param val Value to be written.
     */
    CortexM.prototype.writeCoreRegister = function (no, val) {
        return __awaiter(this, void 0, void 0, function () {
            var v;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.memory.write32(3758157304 /* DCRDR */, val)];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.memory.write32(3758157300 /* DCRSR */, no | 65536 /* DCRSR_REGWnR */)];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, this.memory.read32(3758157296 /* DHCSR */)];
                    case 3:
                        v = _a.sent();
                        util_1.assert(v & 65536 /* S_REGRDY */);
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Halt the CPU core.
     */
    CortexM.prototype.halt = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.memory.write32(3758157296 /* DHCSR */, -1604386816 /* DBGKEY */ | 1 /* C_DEBUGEN */ | 2 /* C_HALT */)];
            });
        });
    };
    /**
     * Resume the CPU core.
     */
    CortexM.prototype.resume = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.isHalted()];
                    case 1:
                        if (!_a.sent()) return [3 /*break*/, 4];
                        return [4 /*yield*/, this.memory.write32(3758157104 /* DFSR */, 4 /* DFSR_DWTTRAP */ | 2 /* DFSR_BKPT */ | 1 /* DFSR_HALTED */)];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, this.debug.enable()];
                    case 3:
                        _a.sent();
                        _a.label = 4;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Find out whether the CPU is halted.
     */
    CortexM.prototype.isHalted = function () {
        return __awaiter(this, void 0, void 0, function () {
            var s;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.status()];
                    case 1:
                        s = _a.sent();
                        return [2 /*return*/, s.isHalted];
                }
            });
        });
    };
    /**
     * Read the current status of the CPU.
     *
     * @returns Object containing the contents of the `DHCSR` register, the `DFSR` register, and a boolean value
     * stating the current halted state of the CPU.
     */
    CortexM.prototype.status = function () {
        return __awaiter(this, void 0, void 0, function () {
            var dhcsr, dfsr;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.memory.read32(3758157296 /* DHCSR */)];
                    case 1:
                        dhcsr = _a.sent();
                        return [4 /*yield*/, this.memory.read32(3758157104 /* DFSR */)];
                    case 2:
                        dfsr = _a.sent();
                        return [2 /*return*/, {
                                dfsr: dfsr,
                                dhscr: dhcsr,
                                isHalted: !!(dhcsr & 131072 /* S_HALT */),
                            }];
                }
            });
        });
    };
    /**
     * Reset the CPU core. This currently does a software reset - it is also technically possible to perform a 'hard'
     * reset using the reset pin from the debugger.
     */
    CortexM.prototype.reset = function (halt) {
        if (halt === void 0) { halt = false; }
        return __awaiter(this, void 0, void 0, function () {
            var demcr;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!halt) return [3 /*break*/, 7];
                        return [4 /*yield*/, this.halt()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.memory.read32(3758157308 /* DEMCR */)];
                    case 2:
                        demcr = _a.sent();
                        return [4 /*yield*/, this.memory.write32(3758157308 /* DEMCR */, demcr | 1 /* DEMCR_VC_CORERESET */)];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, this.softwareReset()];
                    case 4:
                        _a.sent();
                        return [4 /*yield*/, this.waitForHalt()];
                    case 5:
                        _a.sent();
                        // Unset the VC_CORERESET bit
                        return [4 /*yield*/, this.memory.write32(3758157308 /* DEMCR */, demcr)];
                    case 6:
                        // Unset the VC_CORERESET bit
                        _a.sent();
                        return [3 /*break*/, 9];
                    case 7: return [4 /*yield*/, this.softwareReset()];
                    case 8:
                        _a.sent();
                        _a.label = 9;
                    case 9: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Run specified machine code natively on the device. Assumes usual C calling conventions
     * - returns the value of r0 once the program has terminated. The program _must_ terminate
     * in order for this function to return. This can be achieved by placing a `bkpt`
     * instruction at the end of the function.
     *
     * **FIXME**: currently causes a hard fault when the core is resumed after successfully uploading
     * the blob to memory and setting core registers.
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
    CortexM.prototype.runCode = function (code, address, pc, lr, sp, upload) {
        var args = [];
        for (var _i = 6; _i < arguments.length; _i++) {
            args[_i - 6] = arguments[_i];
        }
        return __awaiter(this, void 0, void 0, function () {
            var i;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: 
                    // Halt the core
                    return [4 /*yield*/, this.halt()];
                    case 1:
                        // Halt the core
                        _a.sent();
                        // Point the program counter to the start of the program
                        return [4 /*yield*/, this.writeCoreRegister(15 /* PC */, pc)];
                    case 2:
                        // Point the program counter to the start of the program
                        _a.sent();
                        return [4 /*yield*/, this.writeCoreRegister(14 /* LR */, lr)];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, this.writeCoreRegister(13 /* SP */, sp)];
                    case 4:
                        _a.sent();
                        i = 0;
                        _a.label = 5;
                    case 5:
                        if (!(i < args.length)) return [3 /*break*/, 8];
                        return [4 /*yield*/, this.writeCoreRegister(i, args[i])];
                    case 6:
                        _a.sent();
                        _a.label = 7;
                    case 7:
                        i++;
                        return [3 /*break*/, 5];
                    case 8:
                        if (!upload) return [3 /*break*/, 10];
                        return [4 /*yield*/, this.memory.writeBlock(address, code)];
                    case 9:
                        _a.sent();
                        _a.label = 10;
                    case 10: 
                    // Run the program and wait for halt
                    return [4 /*yield*/, this.resume()];
                    case 11:
                        // Run the program and wait for halt
                        _a.sent();
                        return [4 /*yield*/, this.waitForHalt(DEFAULT_RUNCODE_TIMEOUT)];
                    case 12:
                        _a.sent(); // timeout after 10s
                        return [4 /*yield*/, this.readCoreRegister(0 /* R0 */)];
                    case 13: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * Spin until the chip has halted.
     */
    CortexM.prototype.waitForHalt = function (timeout) {
        if (timeout === void 0) { timeout = 0; }
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                        var running, _a;
                        return __generator(this, function (_b) {
                            switch (_b.label) {
                                case 0:
                                    running = true;
                                    if (timeout > 0) {
                                        setTimeout(function () {
                                            reject("waitForHalt timed out.");
                                            running = false;
                                        }, timeout);
                                    }
                                    _b.label = 1;
                                case 1:
                                    _a = running;
                                    if (!_a) return [3 /*break*/, 3];
                                    return [4 /*yield*/, this.isHalted()];
                                case 2:
                                    _a = !(_b.sent());
                                    _b.label = 3;
                                case 3:
                                    if (!_a) return [3 /*break*/, 4];
                                    return [3 /*break*/, 1];
                                case 4:
                                    if (running) {
                                        resolve();
                                    }
                                    return [2 /*return*/];
                            }
                        });
                    }); })];
            });
        });
    };
    CortexM.prototype.softwareReset = function () {
        return __awaiter(this, void 0, void 0, function () {
            var dhcsr;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.memory.write32(3758157068 /* NVIC_AIRCR */, 100270080 /* NVIC_AIRCR_VECTKEY */ | 4 /* NVIC_AIRCR_SYSRESETREQ */)];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.memory.read32(3758157296 /* DHCSR */)];
                    case 2:
                        dhcsr = _a.sent();
                        _a.label = 3;
                    case 3:
                        if (!((dhcsr & 33554432 /* S_RESET_ST */) !== 0)) return [3 /*break*/, 5];
                        return [4 /*yield*/, this.memory.read32(3758157296 /* DHCSR */)];
                    case 4:
                        dhcsr = _a.sent();
                        return [3 /*break*/, 3];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    return CortexM;
}());
exports.CortexM = CortexM;
//# sourceMappingURL=cortex_m.js.map

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var cortex_m_1 = __webpack_require__(1);
exports.CortexM = cortex_m_1.CortexM;
exports.CoreNames = cortex_m_1.CoreNames;
exports.ISANames = cortex_m_1.ISANames;
var dap_1 = __webpack_require__(3);
exports.DAP = dap_1.DAP;
var FlashTarget_1 = __webpack_require__(9);
exports.FlashTargets = FlashTarget_1.FlashTargets;
exports.FlashTarget = FlashTarget_1.FlashTarget;
//# sourceMappingURL=main.js.map

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var cmsis_dap_1 = __webpack_require__(8);
var util_1 = __webpack_require__(0);
var DAP = (function () {
    function DAP(device) {
        this.device = device;
        this.dap = new cmsis_dap_1.CMSISDAP(device);
    }
    DAP.prototype.reconnect = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.dap.disconnect()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, util_1.delay(100)];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, this.init()];
                    case 3:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    DAP.prototype.init = function () {
        return __awaiter(this, void 0, void 0, function () {
            var n, m, v;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.dap.connect()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.readDp(0 /* IDCODE */)];
                    case 2:
                        n = _a.sent();
                        this.idcode = n;
                        return [4 /*yield*/, this.writeReg(0 /* DP_0x0 */, 1 << 2)];
                    case 3:
                        _a.sent(); // clear sticky error
                        return [4 /*yield*/, this.writeDp(2 /* SELECT */, 0)];
                    case 4:
                        _a.sent();
                        return [4 /*yield*/, this.writeDp(1 /* CTRL_STAT */, 1073741824 /* CSYSPWRUPREQ */ | 268435456 /* CDBGPWRUPREQ */)];
                    case 5:
                        _a.sent();
                        m = 536870912 /* CDBGPWRUPACK */ | 2147483648 /* CSYSPWRUPACK */;
                        return [4 /*yield*/, this.readDp(1 /* CTRL_STAT */)];
                    case 6:
                        v = _a.sent();
                        _a.label = 7;
                    case 7:
                        if (!((v & m) !== m)) return [3 /*break*/, 9];
                        return [4 /*yield*/, this.readDp(1 /* CTRL_STAT */)];
                    case 8:
                        v = _a.sent();
                        return [3 /*break*/, 7];
                    case 9: return [4 /*yield*/, this.writeDp(1 /* CTRL_STAT */, (1073741824 /* CSYSPWRUPREQ */ |
                            268435456 /* CDBGPWRUPREQ */ |
                            0 /* TRNNORMAL */ |
                            3840 /* MASKLANE */))];
                    case 10:
                        _a.sent();
                        return [4 /*yield*/, this.writeDp(2 /* SELECT */, 0)];
                    case 11:
                        _a.sent();
                        return [4 /*yield*/, this.readAp(252 /* IDR */)];
                    case 12:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    DAP.prototype.writeReg = function (regId, val) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.regOp(regId, val)];
            });
        });
    };
    DAP.prototype.readReg = function (regId) {
        return __awaiter(this, void 0, void 0, function () {
            var buf, v;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.regOp(regId, null)];
                    case 1:
                        buf = _a.sent();
                        v = util_1.readUInt32LE(buf, 3);
                        return [2 /*return*/, v];
                }
            });
        });
    };
    DAP.prototype.readDp = function (addr) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.readReg(addr)];
            });
        });
    };
    DAP.prototype.readAp = function (addr) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.writeDp(2 /* SELECT */, util_1.bank(addr))];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.readReg(util_1.apReg(addr, 2 /* READ */))];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    DAP.prototype.writeDp = function (addr, data) {
        if (addr === 2 /* SELECT */) {
            if (data === this.dpSelect) {
                return Promise.resolve();
            }
            this.dpSelect = data;
        }
        return this.writeReg(addr, data);
    };
    DAP.prototype.writeAp = function (addr, data) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.writeDp(2 /* SELECT */, util_1.bank(addr))];
                    case 1:
                        _a.sent();
                        if (addr === 0 /* CSW */) {
                            if (data === this.csw) {
                                return [2 /*return*/, Promise.resolve()];
                            }
                            this.csw = data;
                        }
                        return [4 /*yield*/, this.writeReg(util_1.apReg(addr, 0 /* WRITE */), data)];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    DAP.prototype.close = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.device.close()];
            });
        });
    };
    DAP.prototype.readRegRepeat = function (regId, cnt) {
        return __awaiter(this, void 0, void 0, function () {
            var request, sendargs, i, buf;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        util_1.assert(cnt <= 15);
                        request = util_1.regRequest(regId);
                        sendargs = [0, cnt];
                        for (i = 0; i < cnt; ++i) {
                            sendargs.push(request);
                        }
                        return [4 /*yield*/, this.dap.cmdNums(5 /* DAP_TRANSFER */, sendargs)];
                    case 1:
                        buf = _a.sent();
                        if (buf[1] !== cnt) {
                            throw new Error(("(many) Bad #trans " + buf[1]));
                        }
                        else if (buf[2] !== 1) {
                            throw new Error(("(many) Bad transfer status " + buf[2]));
                        }
                        return [2 /*return*/, buf.slice(3, 3 + cnt * 4)];
                }
            });
        });
    };
    DAP.prototype.writeRegRepeat = function (regId, data) {
        return __awaiter(this, void 0, void 0, function () {
            var request, sendargs, buf;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        util_1.assert(data.length <= 15);
                        request = util_1.regRequest(regId, true);
                        sendargs = [0, data.length];
                        data.forEach(function (d) {
                            sendargs.push(request);
                            util_1.addInt32(sendargs, d);
                        });
                        return [4 /*yield*/, this.dap.cmdNums(5 /* DAP_TRANSFER */, sendargs)];
                    case 1:
                        buf = _a.sent();
                        if (buf[2] !== 1) {
                            throw new Error(("(many-wr) Bad transfer status " + buf[2]));
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    DAP.prototype.regOp = function (regId, val) {
        return __awaiter(this, void 0, void 0, function () {
            var request, sendargs, buf;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        request = util_1.regRequest(regId, val !== null);
                        sendargs = [0, 1, request];
                        if (val !== null) {
                            util_1.addInt32(sendargs, val);
                        }
                        return [4 /*yield*/, this.dap.cmdNums(5 /* DAP_TRANSFER */, sendargs)];
                    case 1:
                        buf = _a.sent();
                        if (buf[1] !== 1) {
                            console.error("Make sure you have initialised the DAP connection.");
                            throw new Error(("Bad #trans " + buf[1]));
                        }
                        else if (buf[2] !== 1) {
                            if (buf[2] === 2) {
                                throw new Error(("Transfer wait"));
                            }
                            throw new Error(("Bad transfer status " + buf[2]));
                        }
                        return [2 /*return*/, buf];
                }
            });
        });
    };
    return DAP;
}());
exports.DAP = DAP;
//# sourceMappingURL=dap.js.map

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var dapjs_1 = __webpack_require__(2);
var dapjs_2 = __webpack_require__(2);
var webhid_1 = __webpack_require__(12);
var device_selector_1 = __webpack_require__(13);
var logger_1 = __webpack_require__(14);
var arrToString = function (arr) {
    var r = "";
    for (var i = 0; i < arr.length; ++i) {
        r += ("0000" + i).slice(-4) + ": " + ("00000000" + (arr[i] >>> 0).toString(16)).slice(-8);
        if (i !== arr.length - 1) {
            r += "\n";
        }
    }
    return r;
};
var machineStateToString = function (s) {
    return "REGS:\n" + arrToString(s.registers);
};
var DAPDemo = (function () {
    function DAPDemo(logger) {
        var _this = this;
        /**
         * Define `choose` as ES6 arrow function so that `this` is bound to the instance of DAPDemo, rather than bound to
         * the source of the click event.
         */
        this.choose = function () { return __awaiter(_this, void 0, void 0, function () {
            var _a, info;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this;
                        return [4 /*yield*/, navigator.usb.requestDevice({ filters: [{ vendorId: 0x0d28 }] })];
                    case 1:
                        _a.device = _b.sent();
                        this.deviceCode = this.device.serialNumber.slice(0, 4);
                        return [4 /*yield*/, this.selector.lookupDevice(this.deviceCode)];
                    case 2:
                        info = _b.sent();
                        this.selector.show(info);
                        this.selector.enable();
                        this.chooseButton.disabled = true;
                        this.connectButton.disabled = false;
                        return [2 /*return*/];
                }
            });
        }); };
        /**
         * Define `connect` as ES6 arrow function so that `this` is bound to the instance of DAPDemo, rather than bound to
         * the source of the click event.
         */
        this.connect = function () { return __awaiter(_this, void 0, void 0, function () {
            var _a, imp, isa, type, elements, _i, elements_1, elem;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        this.hid = new webhid_1.default(this.device);
                        this.log("Opening device.");
                        // open hid device
                        return [4 /*yield*/, this.hid.open()];
                    case 1:
                        // open hid device
                        _b.sent();
                        this.log("Device opened.");
                        this.dapDevice = new dapjs_1.DAP(this.hid);
                        this.target = new dapjs_2.FlashTarget(this.dapDevice, dapjs_2.FlashTargets.get(this.deviceCode));
                        this.log("Initialising device.");
                        return [4 /*yield*/, this.target.init()];
                    case 2:
                        _b.sent();
                        this.log("Halting target.");
                        return [4 /*yield*/, this.target.halt()];
                    case 3:
                        _b.sent();
                        this.log("Target halted.");
                        return [4 /*yield*/, this.target.readCoreType()];
                    case 4:
                        _a = _b.sent(), imp = _a[0], isa = _a[1], type = _a[2];
                        this.log("Connected to an ARM " + dapjs_1.CoreNames.get(type) + " (" + dapjs_1.ISANames.get(isa) + ")");
                        this.selector.disable();
                        this.connectButton.disabled = true;
                        elements = Array.from(document.querySelectorAll(".when-connected"));
                        for (_i = 0, elements_1 = elements; _i < elements_1.length; _i++) {
                            elem = elements_1[_i];
                            elem.disabled = false;
                        }
                        return [2 /*return*/];
                }
            });
        }); };
        this.flash = function (f) { return __awaiter(_this, void 0, void 0, function () {
            var _this = this;
            var xhr;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: 
                    // Erase flash
                    return [4 /*yield*/, this.target.halt()];
                    case 1:
                        // Erase flash
                        _a.sent();
                        return [4 /*yield*/, this.target.flashInit()];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, this.target.eraseChip()];
                    case 3:
                        _a.sent();
                        this.flashProgressBarContainer.style.display = "block";
                        xhr = new XMLHttpRequest();
                        xhr.open("GET", f, true);
                        xhr.responseType = "arraybuffer";
                        xhr.onload = function (e) { return __awaiter(_this, void 0, void 0, function () {
                            var _this = this;
                            var array;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        array = new Uint32Array(xhr.response);
                                        this.log("Binary file " + array.length + " words long");
                                        // Push binary to board
                                        return [4 /*yield*/, this.target.flash(array, null, function (progress) {
                                                _this.flashProgressBar.style.width = progress * 100 + "%";
                                            })];
                                    case 1:
                                        // Push binary to board
                                        _a.sent();
                                        this.log("Successfully flashed binary.");
                                        this.log("Done.");
                                        return [4 /*yield*/, this.target.reset()];
                                    case 2:
                                        _a.sent();
                                        // make sure we don't have any issues flashing twice in the same session.
                                        this.target.flashUnInit();
                                        return [2 /*return*/];
                                }
                            });
                        }); };
                        xhr.send();
                        return [2 /*return*/];
                }
            });
        }); };
        this.halt = function () { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.target.halt()];
                    case 1:
                        _a.sent();
                        this.log("Halted.");
                        return [2 /*return*/];
                }
            });
        }); };
        this.resume = function () { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.target.resume()];
                    case 1:
                        _a.sent();
                        this.log("Resumed.");
                        return [2 /*return*/];
                }
            });
        }); };
        this.printRegisters = function () { return __awaiter(_this, void 0, void 0, function () {
            var halt, st;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        halt = false;
                        return [4 /*yield*/, this.target.halt()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.snapshotMachineState()];
                    case 2:
                        st = _a.sent();
                        this.clearLog();
                        this.log(machineStateToString(st));
                        return [2 /*return*/];
                }
            });
        }); };
        this.step = function () { return __awaiter(_this, void 0, void 0, function () {
            var st;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.target.debug.step()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.snapshotMachineState()];
                    case 2:
                        st = _a.sent();
                        this.clearLog();
                        this.log(machineStateToString(st));
                        return [2 /*return*/];
                }
            });
        }); };
        this.selector = new device_selector_1.PlatformSelector("platform-chooser", "platform-detected");
        this.chooseButton = document.getElementById("choose");
        this.connectButton = document.getElementById("connect");
        this.flashRedButton = document.getElementById("flash-red");
        this.flashGreenButton = document.getElementById("flash-green");
        this.printRegistersButton = document.getElementById("registers");
        this.stepButton = document.getElementById("step-instruction");
        this.haltButton = document.getElementById("halt");
        this.resumeButton = document.getElementById("resume");
        this.flashProgressBarContainer = document.getElementById("progress-container");
        this.flashProgressBar = document.getElementById("flash-progress");
        this.chooseButton.onclick = this.choose;
        this.connectButton.onclick = this.connect;
        this.printRegistersButton.onclick = this.printRegisters;
        this.stepButton.onclick = this.step;
        this.haltButton.onclick = this.halt;
        this.resumeButton.onclick = this.resume;
        this.flashRedButton.onclick = function () { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.flashProgressBar.style.width = "0%";
                        this.flashProgressBar.className = "progress-bar progress-bar-danger";
                        return [4 /*yield*/, this.flash("blinky-red.bin")];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); };
        this.flashGreenButton.onclick = function () { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.flashProgressBar.style.width = "0%";
                        this.flashProgressBar.className = "progress-bar progress-bar-success";
                        return [4 /*yield*/, this.flash("blinky-green.bin")];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); };
        this.logger = logger;
    }
    DAPDemo.prototype.log = function (s) {
        this.logger.log("[demo] " + s);
    };
    DAPDemo.prototype.clearLog = function () {
        this.logger.clear();
    };
    /**
     * Snapshot the current state of the CPU. Reads all general-purpose registers, and returns them in an array.
     */
    DAPDemo.prototype.snapshotMachineState = function () {
        return __awaiter(this, void 0, void 0, function () {
            var state, i, _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        state = {
                            registers: [],
                        };
                        i = 0;
                        _c.label = 1;
                    case 1:
                        if (!(i < 16)) return [3 /*break*/, 4];
                        _a = state.registers;
                        _b = i;
                        return [4 /*yield*/, this.target.readCoreRegister(i)];
                    case 2:
                        _a[_b] = _c.sent();
                        _c.label = 3;
                    case 3:
                        i++;
                        return [3 /*break*/, 1];
                    case 4: return [2 /*return*/, state];
                }
            });
        });
    };
    return DAPDemo;
}());
window.onload = function () {
    var logger = new logger_1.default("#trace");
    var demo = new DAPDemo(logger);
};


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var breakpoint_1 = __webpack_require__(6);
var Debug = (function () {
    function Debug(core) {
        this.core = core;
        this.enabled = false;
        this.availableHWBreakpoints = [];
        this.breakpoints = new Map();
    }
    /**
     * Set up (and disable) the Flash Patch & Breakpoint unit. It will be enabled when
     * the first breakpoint is set.
     *
     * Also reads the number of available hardware breakpoints.
     */
    Debug.prototype.setupFpb = function () {
        return __awaiter(this, void 0, void 0, function () {
            var fpcr, nbCode, nbLit, i;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.core.memory.read32(3758104576 /* FP_CTRL */)];
                    case 1:
                        fpcr = _a.sent();
                        nbCode = ((fpcr >> 8) & 0x70) | ((fpcr >> 4) & 0xf);
                        nbLit = (fpcr >> 7) & 0xf;
                        this.totalHWBreakpoints = nbCode;
                        console.debug(nbCode + " hardware breakpoints, " + nbLit + " literal comparators");
                        return [4 /*yield*/, this.setFpbEnabled(false)];
                    case 2:
                        _a.sent();
                        i = 0;
                        _a.label = 3;
                    case 3:
                        if (!(i < nbCode)) return [3 /*break*/, 6];
                        this.availableHWBreakpoints.push(3758104584 /* FP_COMP0 */ + (4 * i));
                        return [4 /*yield*/, this.core.memory.write32(3758104584 /* FP_COMP0 */ + (i * 4), 0)];
                    case 4:
                        _a.sent();
                        _a.label = 5;
                    case 5:
                        i++;
                        return [3 /*break*/, 3];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Enable or disable the Flash Patch and Breakpoint unit (FPB).
     *
     * @param enabled
     */
    Debug.prototype.setFpbEnabled = function (enabled) {
        if (enabled === void 0) { enabled = true; }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.enabled = enabled;
                        return [4 /*yield*/, this.core.memory.write32(3758104576 /* FP_CTRL */, 2 /* FP_CTRL_KEY */ | (enabled ? 1 : 0))];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Enable debugging on the target CPU
     */
    Debug.prototype.enable = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.core.memory.write32(3758157296 /* DHCSR */, -1604386816 /* DBGKEY */ | 1 /* C_DEBUGEN */)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Set breakpoints at specified memory addresses.
     *
     * @param addrs An array of memory addresses at which to set breakpoints.
     */
    Debug.prototype.setBreakpoint = function (addr) {
        return __awaiter(this, void 0, void 0, function () {
            var breakpoint, bkpt, regAddr;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (this.breakpoints.has(addr)) {
                            breakpoint = this.breakpoints.get(addr);
                            if (typeof breakpoint !== "number") {
                                // already enabled
                                console.warn("Breakpoint at " + addr.toString(16) + " already enabled.");
                                return [2 /*return*/];
                            }
                        }
                        if (!(addr < 0x20000000)) return [3 /*break*/, 5];
                        if (!(this.availableHWBreakpoints.length > 0)) return [3 /*break*/, 3];
                        if (!!this.enabled) return [3 /*break*/, 2];
                        console.log("enabling fpb");
                        return [4 /*yield*/, this.setFpbEnabled(true)];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2:
                        regAddr = this.availableHWBreakpoints.pop();
                        console.log("using regAddr=" + regAddr.toString(16));
                        bkpt = new breakpoint_1.HWBreakpoint(regAddr, this.core, addr);
                        return [3 /*break*/, 4];
                    case 3:
                        bkpt = new breakpoint_1.SWBreakpoint(this.core, addr);
                        _a.label = 4;
                    case 4: return [3 /*break*/, 6];
                    case 5:
                        bkpt = new breakpoint_1.SWBreakpoint(this.core, addr);
                        _a.label = 6;
                    case 6: return [4 /*yield*/, bkpt.set()];
                    case 7:
                        _a.sent();
                        this.breakpoints.set(addr, bkpt);
                        return [2 /*return*/];
                }
            });
        });
    };
    Debug.prototype.deleteBreakpoint = function (addr) {
        return __awaiter(this, void 0, void 0, function () {
            var bkpt;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.breakpoints.has(addr)) return [3 /*break*/, 3];
                        bkpt = this.breakpoints.get(addr);
                        if (!(typeof bkpt !== "number")) return [3 /*break*/, 2];
                        return [4 /*yield*/, bkpt.clear()];
                    case 1:
                        _a.sent();
                        if (bkpt instanceof breakpoint_1.HWBreakpoint) {
                            // return the register address to the pool
                            this.availableHWBreakpoints.push(bkpt.regAddr);
                        }
                        _a.label = 2;
                    case 2:
                        this.breakpoints.delete(addr);
                        return [3 /*break*/, 4];
                    case 3:
                        console.warn("Breakpoint at " + addr.toString(16) + " does not exist.");
                        _a.label = 4;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Step the processor forward by one instruction.
     */
    Debug.prototype.step = function () {
        return __awaiter(this, void 0, void 0, function () {
            var dhcsr, interruptsMasked;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.core.memory.read32(3758157296 /* DHCSR */)];
                    case 1:
                        dhcsr = _a.sent();
                        if (!(dhcsr & (4 /* C_STEP */ | 2 /* C_HALT */))) {
                            console.error("Target is not halted.");
                            return [2 /*return*/];
                        }
                        interruptsMasked = (8 /* C_MASKINTS */ & dhcsr) !== 0;
                        if (!!interruptsMasked) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.core.memory.write32(3758157296 /* DHCSR */, -1604386816 /* DBGKEY */ |
                                1 /* C_DEBUGEN */ |
                                2 /* C_HALT */ |
                                8 /* C_MASKINTS */)];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3: return [4 /*yield*/, this.core.memory.write32(3758157296 /* DHCSR */, -1604386816 /* DBGKEY */ |
                            1 /* C_DEBUGEN */ |
                            8 /* C_MASKINTS */ |
                            4 /* C_STEP */)];
                    case 4:
                        _a.sent();
                        return [4 /*yield*/, this.core.waitForHalt()];
                    case 5:
                        _a.sent();
                        return [4 /*yield*/, this.core.memory.write32(3758157296 /* DHCSR */, -1604386816 /* DBGKEY */ |
                                1 /* C_DEBUGEN */ |
                                2 /* C_HALT */)];
                    case 6:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    return Debug;
}());
exports.Debug = Debug;
//# sourceMappingURL=debug.js.map

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var HWBreakpoint = (function () {
    function HWBreakpoint(regAddr, parent, addr) {
        this.regAddr = regAddr;
        this.parent = parent;
        this.addr = addr;
    }
    HWBreakpoint.prototype.set = function () {
        return __awaiter(this, void 0, void 0, function () {
            var bpMatch;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        bpMatch = ((this.addr & 0x2) ? 2 : 1) << 30;
                        return [4 /*yield*/, this.parent.memory.write32(this.regAddr, this.addr & 0x1ffffffc | bpMatch | 1)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    HWBreakpoint.prototype.clear = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: 
                    /* clear hardware breakpoint */
                    return [4 /*yield*/, this.parent.memory.write32(this.regAddr, 0)];
                    case 1:
                        /* clear hardware breakpoint */
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    return HWBreakpoint;
}());
exports.HWBreakpoint = HWBreakpoint;
var SWBreakpoint = (function () {
    function SWBreakpoint(parent, addr) {
        this.parent = parent;
        this.addr = addr;
    }
    SWBreakpoint.prototype.set = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        // read the instruction from the CPU... pleeeeease be in thumb mode
                        _a = this;
                        return [4 /*yield*/, this.parent.memory.read16(this.addr)];
                    case 1:
                        // read the instruction from the CPU... pleeeeease be in thumb mode
                        _a.instruction = _b.sent();
                        return [4 /*yield*/, this.parent.memory.write16(this.addr, SWBreakpoint.BKPT_INSTRUCTION)];
                    case 2:
                        _b.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    SWBreakpoint.prototype.clear = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: 
                    /* clear hardware breakpoint */
                    return [4 /*yield*/, this.parent.memory.write16(this.addr, this.instruction)];
                    case 1:
                        /* clear hardware breakpoint */
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    SWBreakpoint.BKPT_INSTRUCTION = 0xbe00;
    return SWBreakpoint;
}());
exports.SWBreakpoint = SWBreakpoint;
//# sourceMappingURL=breakpoint.js.map

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var util_1 = __webpack_require__(0);
var Memory = (function () {
    function Memory(dev) {
        this.dev = dev;
    }
    /**
     * Write a 32-bit word to the specified (word-aligned) memory address.
     *
     * @param addr Memory address to write to
     * @param data Data to write (values above 2**32 will be truncated)
     */
    Memory.prototype.write32 = function (addr, data) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.dev.writeAp(0 /* CSW */, 587202640 /* CSW_VALUE */ | 2 /* CSW_SIZE32 */)];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.dev.writeAp(4 /* TAR */, addr)];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, this.dev.writeAp(12 /* DRW */, data)];
                    case 3:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Write a 16-bit word to the specified (half word-aligned) memory address.
     *
     * @param addr Memory address to write to
     * @param data Data to write (values above 2**16 will be truncated)
     */
    Memory.prototype.write16 = function (addr, data) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.dev.writeAp(0 /* CSW */, 587202640 /* CSW_VALUE */ | 1 /* CSW_SIZE16 */)];
                    case 1:
                        _a.sent();
                        data = data << ((addr & 0x02) << 3);
                        return [4 /*yield*/, this.dev.writeAp(4 /* TAR */, addr)];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, this.dev.writeAp(12 /* DRW */, data)];
                    case 3:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Read a 32-bit word from the specified (word-aligned) memory address.
     *
     * @param addr Memory address to read from.
     */
    Memory.prototype.read32 = function (addr) {
        return __awaiter(this, void 0, void 0, function () {
            var e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.dev.writeAp(0 /* CSW */, 587202640 /* CSW_VALUE */ | 2 /* CSW_SIZE32 */)];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.dev.writeAp(4 /* TAR */, addr)];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3:
                        _a.trys.push([3, 5, , 8]);
                        return [4 /*yield*/, this.dev.readAp(12 /* DRW */)];
                    case 4: return [2 /*return*/, _a.sent()];
                    case 5:
                        e_1 = _a.sent();
                        // transfer wait, try again.
                        return [4 /*yield*/, util_1.delay(100)];
                    case 6:
                        // transfer wait, try again.
                        _a.sent();
                        return [4 /*yield*/, this.read32(addr)];
                    case 7: return [2 /*return*/, _a.sent()];
                    case 8: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Read a 16-bit word from the specified (half word-aligned) memory address.
     *
     * @param addr Memory address to read from.
     */
    Memory.prototype.read16 = function (addr) {
        return __awaiter(this, void 0, void 0, function () {
            var val, e_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.dev.writeAp(0 /* CSW */, 587202640 /* CSW_VALUE */ | 1 /* CSW_SIZE16 */)];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.dev.writeAp(4 /* TAR */, addr)];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3:
                        _a.trys.push([3, 5, , 8]);
                        return [4 /*yield*/, this.dev.readAp(12 /* DRW */)];
                    case 4:
                        val = _a.sent();
                        return [3 /*break*/, 8];
                    case 5:
                        e_2 = _a.sent();
                        // transfer wait, try again.
                        return [4 /*yield*/, util_1.delay(100)];
                    case 6:
                        // transfer wait, try again.
                        _a.sent();
                        return [4 /*yield*/, this.read16(addr)];
                    case 7:
                        val = _a.sent();
                        return [3 /*break*/, 8];
                    case 8:
                        val = (val >> ((addr & 0x02) << 3) & 0xffff);
                        return [2 /*return*/, val];
                }
            });
        });
    };
    /**
     * Reads a block of memory from the specified memory address.
     *
     * @param addr Address to read from
     * @param words Number of words to read
     * @param pageSize Memory page size
     */
    Memory.prototype.readBlock = function (addr, words, pageSize) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var funs, bufs, end, ptr, _loop_1, _i, funs_1, f, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        funs = [function () { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
                                return [2 /*return*/, Promise.resolve()];
                            }); }); }];
                        bufs = [];
                        end = addr + words * 4;
                        ptr = addr;
                        _loop_1 = function () {
                            var nextptr = ptr + pageSize;
                            if (ptr === addr) {
                                nextptr &= ~(pageSize - 1);
                            }
                            var len = Math.min(nextptr - ptr, end - ptr);
                            var ptr0 = ptr;
                            util_1.assert((len & 3) === 0);
                            funs.push(function () { return __awaiter(_this, void 0, void 0, function () {
                                var _a, _b;
                                return __generator(this, function (_c) {
                                    switch (_c.label) {
                                        case 0:
                                            _b = (_a = bufs).push;
                                            return [4 /*yield*/, this.readBlockCore(ptr0, len >> 2)];
                                        case 1:
                                            _b.apply(_a, [_c.sent()]);
                                            return [2 /*return*/];
                                    }
                                });
                            }); });
                            ptr = nextptr;
                        };
                        while (ptr < end) {
                            _loop_1();
                        }
                        _i = 0, funs_1 = funs;
                        _a.label = 1;
                    case 1:
                        if (!(_i < funs_1.length)) return [3 /*break*/, 4];
                        f = funs_1[_i];
                        return [4 /*yield*/, f()];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3:
                        _i++;
                        return [3 /*break*/, 1];
                    case 4: return [4 /*yield*/, util_1.bufferConcat(bufs)];
                    case 5:
                        result = _a.sent();
                        return [2 /*return*/, result.slice(0, words * 4)];
                }
            });
        });
    };
    /**
     * Write a block of memory to the specified memory address.
     *
     * @param addr Memory address to write to.
     * @param words Array of 32-bit words to write to memory.
     */
    Memory.prototype.writeBlock = function (addr, words) {
        return __awaiter(this, void 0, void 0, function () {
            var blSz, i;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (words.length === 0) {
                            return [2 /*return*/];
                        }
                        if (!(1 > 0)) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.writeBlockCore(addr, words)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                    case 2:
                        blSz = 10;
                        i = 0;
                        _a.label = 3;
                    case 3:
                        if (!(i < Math.ceil(words.length / blSz))) return [3 /*break*/, 6];
                        return [4 /*yield*/, this.writeBlockCore(addr + i * blSz * 4, words.slice(i * blSz, i * blSz + blSz))];
                    case 4:
                        _a.sent();
                        _a.label = 5;
                    case 5:
                        i++;
                        return [3 /*break*/, 3];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    Memory.prototype.readBlockCore = function (addr, words) {
        return __awaiter(this, void 0, void 0, function () {
            var lastSize, blocks, i, b;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.dev.writeAp(0 /* CSW */, 587202640 /* CSW_VALUE */ | 2 /* CSW_SIZE32 */)];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.dev.writeAp(4 /* TAR */, addr)];
                    case 2:
                        _a.sent();
                        lastSize = words % 15;
                        if (lastSize === 0) {
                            lastSize = 15;
                        }
                        blocks = [];
                        i = 0;
                        _a.label = 3;
                    case 3:
                        if (!(i < Math.ceil(words / 15))) return [3 /*break*/, 6];
                        return [4 /*yield*/, this.dev.readRegRepeat(util_1.apReg(12 /* DRW */, 2 /* READ */), i === blocks.length - 1 ? lastSize : 15)];
                    case 4:
                        b = _a.sent();
                        blocks.push(b);
                        _a.label = 5;
                    case 5:
                        i++;
                        return [3 /*break*/, 3];
                    case 6: return [2 /*return*/, util_1.bufferConcat(blocks)];
                }
            });
        });
    };
    Memory.prototype.writeBlockCore = function (addr, words) {
        return __awaiter(this, void 0, void 0, function () {
            var blSz, reg, i, e_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 7, , 12]);
                        return [4 /*yield*/, this.dev.writeAp(0 /* CSW */, 587202640 /* CSW_VALUE */ | 2 /* CSW_SIZE32 */)];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.dev.writeAp(4 /* TAR */, addr)];
                    case 2:
                        _a.sent();
                        blSz = 12;
                        reg = util_1.apReg(12 /* DRW */, 0 /* WRITE */);
                        i = 0;
                        _a.label = 3;
                    case 3:
                        if (!(i < Math.ceil(words.length / blSz))) return [3 /*break*/, 6];
                        return [4 /*yield*/, this.dev.writeRegRepeat(reg, words.slice(i * blSz, i * blSz + blSz))];
                    case 4:
                        _a.sent();
                        _a.label = 5;
                    case 5:
                        i++;
                        return [3 /*break*/, 3];
                    case 6: return [3 /*break*/, 12];
                    case 7:
                        e_3 = _a.sent();
                        if (!e_3.dapWait) return [3 /*break*/, 10];
                        console.debug("transfer wait, write block");
                        return [4 /*yield*/, util_1.delay(100)];
                    case 8:
                        _a.sent();
                        return [4 /*yield*/, this.writeBlockCore(addr, words)];
                    case 9: return [2 /*return*/, _a.sent()];
                    case 10: throw e_3;
                    case 11: return [3 /*break*/, 12];
                    case 12: return [2 /*return*/];
                }
            });
        });
    };
    return Memory;
}());
exports.Memory = Memory;
//# sourceMappingURL=memory.js.map

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var util_1 = __webpack_require__(0);
var CMSISDAP = (function () {
    function CMSISDAP(hid) {
        this.maxSent = 1;
        this.hid = hid;
    }
    CMSISDAP.prototype.resetTarget = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.cmdNums(10 /* DAP_RESET_TARGET */, [])];
            });
        });
    };
    CMSISDAP.prototype.disconnect = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.cmdNums(3 /* DAP_DISCONNECT */, [])];
            });
        });
    };
    CMSISDAP.prototype.cmdNums = function (op, data) {
        return __awaiter(this, void 0, void 0, function () {
            var buf;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        data.unshift(op);
                        return [4 /*yield*/, this.send(data)];
                    case 1:
                        buf = _a.sent();
                        if (buf[0] !== op) {
                            throw new Error("Bad response for " + op + " -> " + buf[0]);
                        }
                        switch (op) {
                            case 2 /* DAP_CONNECT */:
                            case 0 /* DAP_INFO */:
                            case 5 /* DAP_TRANSFER */:
                                break;
                            default:
                                if (buf[1] !== 0) {
                                    throw new Error("Bad status for " + op + " -> " + buf[1]);
                                }
                        }
                        return [2 /*return*/, buf];
                }
            });
        });
    };
    CMSISDAP.prototype.connect = function () {
        return __awaiter(this, void 0, void 0, function () {
            var v, buf;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log("Connecting...");
                        return [4 /*yield*/, this.info(254 /* PACKET_COUNT */)];
                    case 1:
                        v = _a.sent();
                        if (v) {
                            this.maxSent = v;
                        }
                        else {
                            throw new Error("DAP_INFO returned invalid packet count.");
                        }
                        return [4 /*yield*/, this.cmdNums(17 /* DAP_SWJ_CLOCK */, util_1.addInt32(null, 1000000))];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, this.cmdNums(2 /* DAP_CONNECT */, [0])];
                    case 3:
                        buf = _a.sent();
                        if (buf[1] !== 1) {
                            throw new Error("SWD mode not enabled.");
                        }
                        return [4 /*yield*/, this.cmdNums(17 /* DAP_SWJ_CLOCK */, util_1.addInt32(null, 1000000))];
                    case 4:
                        _a.sent();
                        return [4 /*yield*/, this.cmdNums(4 /* DAP_TRANSFER_CONFIGURE */, [0, 0x50, 0, 0, 0])];
                    case 5:
                        _a.sent();
                        return [4 /*yield*/, this.cmdNums(19 /* DAP_SWD_CONFIGURE */, [0])];
                    case 6:
                        _a.sent();
                        return [4 /*yield*/, this.jtagToSwd()];
                    case 7:
                        _a.sent();
                        console.log("Connected");
                        return [2 /*return*/];
                }
            });
        });
    };
    CMSISDAP.prototype.jtagToSwd = function () {
        return __awaiter(this, void 0, void 0, function () {
            var arrs, _i, arrs_1, arr;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        arrs = [
                            [56, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff],
                            [16, 0x9e, 0xe7],
                            [56, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff],
                            [8, 0x00],
                        ];
                        _i = 0, arrs_1 = arrs;
                        _a.label = 1;
                    case 1:
                        if (!(_i < arrs_1.length)) return [3 /*break*/, 4];
                        arr = arrs_1[_i];
                        return [4 /*yield*/, this.swjSequence(arr)];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3:
                        _i++;
                        return [3 /*break*/, 1];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    CMSISDAP.prototype.swjSequence = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.cmdNums(18 /* DAP_SWJ_SEQUENCE */, data)];
            });
        });
    };
    CMSISDAP.prototype.info = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var buf;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.cmdNums(0 /* DAP_INFO */, [id])];
                    case 1:
                        buf = _a.sent();
                        if (buf[1] === 0) {
                            return [2 /*return*/, null];
                        }
                        switch (id) {
                            case 240 /* CAPABILITIES */:
                            case 254 /* PACKET_COUNT */:
                            case 255 /* PACKET_SIZE */:
                                if (buf[1] === 1) {
                                    return [2 /*return*/, buf[2]];
                                }
                                else if (buf[1] === 2) {
                                    return [2 /*return*/, buf[3] << 8 | buf[2]];
                                }
                        }
                        return [2 /*return*/, buf.slice(2, buf[1] + 2 - 1)]; // .toString("utf8")
                }
            });
        });
    };
    CMSISDAP.prototype.send = function (command) {
        return __awaiter(this, void 0, void 0, function () {
            var array, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        array = Uint8Array.from(command);
                        console.log(array);
                        return [4 /*yield*/, this.hid.write(array.buffer)];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.hid.read()];
                    case 2:
                        response = _a.sent();
                        return [2 /*return*/, new Uint8Array(response.buffer)];
                }
            });
        });
    };
    return CMSISDAP;
}());
exports.CMSISDAP = CMSISDAP;
//# sourceMappingURL=cmsis_dap.js.map

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var cortex_m_1 = __webpack_require__(1);
var K64F_1 = __webpack_require__(10);
var NRF51_1 = __webpack_require__(11);
var analyzer = new Uint32Array([
    0x2180468c, 0x2600b5f0, 0x4f2c2501, 0x447f4c2c, 0x1c2b0049, 0x425b4033, 0x40230872, 0x085a4053,
    0x425b402b, 0x40534023, 0x402b085a, 0x4023425b, 0x085a4053, 0x425b402b, 0x40534023, 0x402b085a,
    0x4023425b, 0x085a4053, 0x425b402b, 0x40534023, 0x402b085a, 0x4023425b, 0x085a4053, 0x425b402b,
    0x40534023, 0xc7083601, 0xd1d2428e, 0x2b004663, 0x4663d01f, 0x46b4009e, 0x24ff2701, 0x44844d11,
    0x1c3a447d, 0x88418803, 0x4351409a, 0xd0122a00, 0x22011856, 0x780b4252, 0x40533101, 0x009b4023,
    0x0a12595b, 0x42b1405a, 0x43d2d1f5, 0x4560c004, 0x2000d1e7, 0x2200bdf0, 0x46c0e7f8, 0x000000b6,
    0xedb88320, 0x00000044,
]);
var FlashTarget = (function (_super) {
    __extends(FlashTarget, _super);
    function FlashTarget(device, platform) {
        var _this = _super.call(this, device) || this;
        _this.platform = platform;
        _this.inited = false;
        return _this;
    }
    /**
     * Initialise the flash driver on the chip. Must be called before any of the other
     * flash-related methods.
     */
    FlashTarget.prototype.flashInit = function () {
        return __awaiter(this, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (this.inited) {
                            return [2 /*return*/];
                        }
                        // reset and halt
                        return [4 /*yield*/, this.reset(true)];
                    case 1:
                        // reset and halt
                        _a.sent();
                        // make sure we're in Thumb mode.
                        return [4 /*yield*/, this.writeCoreRegister(16 /* XPSR */, 1 << 24)];
                    case 2:
                        // make sure we're in Thumb mode.
                        _a.sent();
                        return [4 /*yield*/, this.writeCoreRegister(9 /* R9 */, this.platform.flashAlgo.staticBase)];
                    case 3:
                        _a.sent();
                        if (!this.platform.flashAlgo.analyzerSupported) return [3 /*break*/, 5];
                        return [4 /*yield*/, this.memory.writeBlock(this.platform.flashAlgo.analyzerAddress, analyzer)];
                    case 4:
                        _a.sent();
                        _a.label = 5;
                    case 5: return [4 /*yield*/, this.runCode(this.platform.flashAlgo.instructions, this.platform.flashAlgo.loadAddress, this.platform.flashAlgo.pcInit, this.platform.flashAlgo.loadAddress + 1, this.platform.flashAlgo.stackPointer, true, 0, 0, 0, 0)];
                    case 6:
                        result = _a.sent();
                        this.inited = true;
                        return [2 /*return*/, result];
                }
            });
        });
    };
    /**
     * Erase _all_ data stored in flash on the chip.
     */
    FlashTarget.prototype.eraseChip = function () {
        return __awaiter(this, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!!this.inited) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.flashInit()];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2: return [4 /*yield*/, this.runCode(this.platform.flashAlgo.instructions, this.platform.flashAlgo.loadAddress, this.platform.flashAlgo.pcEraseAll, this.platform.flashAlgo.loadAddress + 1, this.platform.flashAlgo.stackPointer, false, 0, 0, 0)];
                    case 3:
                        result = _a.sent();
                        return [2 /*return*/, result];
                }
            });
        });
    };
    /**
     * Upload a program to flash memory on the chip.
     * TODO: add a callback to provide progress data
     *
     * @param data Array of 32-bit integers to write to flash.
     */
    FlashTarget.prototype.flash = function (data, address, progressCb) {
        return __awaiter(this, void 0, void 0, function () {
            var pageSizeWords, bufferAddress, flashStart, ptr, wordPtr, pageData, flashAddress;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!!this.inited) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.flashInit()];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2: return [4 /*yield*/, this.halt()];
                    case 3:
                        _a.sent();
                        pageSizeWords = this.platform.flashAlgo.pageSize / 4;
                        bufferAddress = this.platform.flashAlgo.pageBuffers[0];
                        flashStart = address || this.platform.flashAlgo.flashStart;
                        ptr = 0;
                        _a.label = 4;
                    case 4:
                        if (!(ptr < data.byteLength)) return [3 /*break*/, 7];
                        wordPtr = ptr / 4;
                        pageData = data.slice(wordPtr, wordPtr + pageSizeWords);
                        flashAddress = flashStart + ptr;
                        this.platform.overrideSecurityBits(flashAddress, pageData);
                        return [4 /*yield*/, this.memory.writeBlock(bufferAddress, pageData)];
                    case 5:
                        _a.sent();
                        return [4 /*yield*/, this.runCode(this.platform.flashAlgo.instructions, this.platform.flashAlgo.loadAddress, this.platform.flashAlgo.pcProgramPage, // pc
                            this.platform.flashAlgo.loadAddress + 1, // lr
                            this.platform.flashAlgo.stackPointer, // sp
                            /* upload? */
                            ptr === 0, 
                            /* args */
                            flashAddress, this.platform.flashAlgo.pageSize, bufferAddress)];
                    case 6:
                        _a.sent();
                        if (progressCb) {
                            progressCb(ptr / data.byteLength);
                        }
                        ptr += pageData.byteLength;
                        return [3 /*break*/, 4];
                    case 7:
                        if (progressCb) {
                            progressCb(1.0);
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    FlashTarget.prototype.program = function (program, progressCb) {
        return __awaiter(this, void 0, void 0, function () {
            var totalBytes, cumulativeBytes, _loop_1, this_1, _i, _a, section;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        totalBytes = program.totalByteLength();
                        cumulativeBytes = 0;
                        _loop_1 = function (section) {
                            var sectionBytes;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        sectionBytes = 0;
                                        return [4 /*yield*/, this_1.flash(section.data, section.address, function (progress) {
                                                sectionBytes += section.data.length * progress;
                                                progressCb((cumulativeBytes + sectionBytes) / totalBytes);
                                            })];
                                    case 1:
                                        _a.sent();
                                        cumulativeBytes += sectionBytes;
                                        return [2 /*return*/];
                                }
                            });
                        };
                        this_1 = this;
                        _i = 0, _a = program.sections;
                        _b.label = 1;
                    case 1:
                        if (!(_i < _a.length)) return [3 /*break*/, 4];
                        section = _a[_i];
                        return [5 /*yield**/, _loop_1(section)];
                    case 2:
                        _b.sent();
                        _b.label = 3;
                    case 3:
                        _i++;
                        return [3 /*break*/, 1];
                    case 4:
                        progressCb(1.0);
                        return [2 /*return*/];
                }
            });
        });
    };
    FlashTarget.prototype.flashUnInit = function () {
        this.inited = false;
    };
    return FlashTarget;
}(cortex_m_1.CortexM));
exports.FlashTarget = FlashTarget;
exports.FlashTargets = new Map();
exports.FlashTargets.set("0240", new K64F_1.K64F());
exports.FlashTargets.set("9900", new NRF51_1.NRF51());
//# sourceMappingURL=FlashTarget.js.map

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var K64F_FLASH_ALGO = {
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
var K64F = (function () {
    function K64F() {
        this.flashAlgo = K64F_FLASH_ALGO;
    }
    K64F.prototype.overrideSecurityBits = function (address, data) {
        var u8data = new Uint8Array(data.buffer);
        // Kinetis security values and addresses
        var SECURITY_START = 0x400;
        var SECURITY_SIZE = 16;
        var FPROT_ADDR = 0x408;
        var FPROT_ADDR_END = 0x40c;
        var FPROT_SIZE = 4;
        var FSEC_ADDR = 0x40c;
        var FSEC_VAL = 0xFE;
        var FOPT_ADDR = 0x40d;
        var FOPT_VAL = 0xFF;
        var FEPROT_ADDR = 0x40e;
        var FEPROT_VAL = 0xFF;
        var FDPROT_ADDR = 0x40f;
        var FDPROT_VAL = 0xFF;
        if (address <= SECURITY_START && address + u8data.byteLength > SECURITY_START + SECURITY_SIZE) {
            for (var i = FPROT_ADDR; i < FPROT_ADDR_END; i++) {
                if (u8data[i - address] !== 0xff) {
                    u8data[i - address] = 0xff;
                    console.debug("FCF[" + (i - FPROT_ADDR) + "] at addr " + i + " changed to " + u8data[i - address]);
                }
            }
            if (u8data[FSEC_ADDR - address] !== FSEC_VAL) {
                u8data[FSEC_ADDR - address] = FSEC_VAL;
                console.debug("FSEC at addr " + FSEC_ADDR + " changed to " + FSEC_VAL);
            }
            if (u8data[FOPT_ADDR - address] === 0x00) {
                console.debug("FOPT set to restricted value 0x00");
            }
            if (u8data[FEPROT_ADDR - address] !== FEPROT_VAL) {
                u8data[FEPROT_ADDR - address] = FEPROT_VAL;
                console.debug("FEPROT at addr " + FEPROT_ADDR + " changed to " + FEPROT_VAL);
            }
            if (u8data[FDPROT_ADDR - address] !== FDPROT_VAL) {
                u8data[FDPROT_ADDR - address] = FDPROT_VAL;
                console.debug("FDPROT at addr " + FDPROT_ADDR + " changed to " + FDPROT_VAL);
            }
        }
    };
    return K64F;
}());
exports.K64F = K64F;
//# sourceMappingURL=K64F.js.map

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var NRF51_FLASH_ALGO = {
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
var NRF51 = (function () {
    function NRF51() {
        this.flashAlgo = NRF51_FLASH_ALGO;
    }
    NRF51.prototype.overrideSecurityBits = function (address, data) {
        /* empty */
    };
    return NRF51;
}());
exports.NRF51 = NRF51;
//# sourceMappingURL=NRF51.js.map

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
function bufferExtend(source, length) {
    var sarr = new Uint8Array(source);
    var dest = new ArrayBuffer(length);
    var darr = new Uint8Array(dest);
    for (var i = 0; i < Math.min(source.byteLength, length); i++) {
        darr[i] = sarr[i];
    }
    return dest;
}
var HID = (function () {
    function HID(device) {
        this.device = device;
    }
    HID.prototype.open = function () {
        return __awaiter(this, void 0, void 0, function () {
            var hids, _i, _a, endpoint;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.device.open()];
                    case 1:
                        _b.sent();
                        return [4 /*yield*/, this.device.selectConfiguration(1)];
                    case 2:
                        _b.sent();
                        hids = this.device.configuration.interfaces.filter(function (intf) { return intf.alternates[0].interfaceClass == 0x03; });
                        if (hids.length == 0) {
                            throw 'No HID interfaces found.';
                        }
                        this.interfaces = hids;
                        if (this.interfaces.length == 1) {
                            this.interface = this.interfaces[0];
                        }
                        return [4 /*yield*/, this.device.claimInterface(this.interface.interfaceNumber)];
                    case 3:
                        _b.sent();
                        this.endpoints = this.interface.alternates[0].endpoints;
                        this.ep_in = null;
                        this.ep_out = null;
                        for (_i = 0, _a = this.endpoints; _i < _a.length; _i++) {
                            endpoint = _a[_i];
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
                        return [2 /*return*/];
                }
            });
        });
    };
    HID.prototype.close = function () {
        return this.device.close();
    };
    HID.prototype.write = function (data) {
        var report_size = this.ep_out.packetSize;
        var buffer = bufferExtend(data, report_size);
        return this.device.transferOut(this.ep_out.endpointNumber, buffer);
    };
    HID.prototype.read = function () {
        var report_size = this.ep_in.packetSize;
        return this.device.transferIn(this.ep_in.endpointNumber, report_size)
            .then(function (res) { return res.data; });
    };
    return HID;
}());
exports.default = HID;
//# sourceMappingURL=hid.js.map

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var PlatformSelector = (function () {
    function PlatformSelector(id, devices) {
        var elem = document.getElementById(id);
        this.deviceElement = document.getElementById(devices);
        if (elem.nodeName === "SELECT") {
            this.element = elem;
        }
        else {
            console.log(elem.nodeName);
            throw new Error("select element must be chosen");
        }
        this.deviceCache = new Map();
    }
    PlatformSelector.prototype.show = function (platform) {
        this.deviceElement.innerHTML =
            "<option value='" + platform.productCode + "' id='" + platform.productCode + "'>" + platform.name + "</option>";
        this.element.value = platform.productCode;
    };
    PlatformSelector.prototype.enable = function () {
        this.element.disabled = false;
    };
    PlatformSelector.prototype.disable = function () {
        this.element.disabled = true;
    };
    PlatformSelector.prototype.lookupDevice = function (code) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var xhr;
            return __generator(this, function (_a) {
                if (this.deviceCache.has(code)) {
                    return [2 /*return*/, this.deviceCache.get(code)];
                }
                xhr = new XMLHttpRequest();
                xhr.open("get", "https://developer.mbed.org/api/v3/platforms/" + code, true);
                xhr.responseType = "json";
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        xhr.onload = function (e) {
                            var device = {
                                name: xhr.response.name,
                                productCode: xhr.response.productcode,
                            };
                            _this.deviceCache.set(code, device);
                            resolve(device);
                        };
                        xhr.send();
                    })];
            });
        });
    };
    return PlatformSelector;
}());
exports.PlatformSelector = PlatformSelector;


/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var HTMLLogger = (function () {
    function HTMLLogger(selector) {
        this.element = document.querySelector(selector);
    }
    HTMLLogger.prototype.log = function (data) {
        this.element.innerHTML = this.element.innerHTML + data + "\n";
    };
    HTMLLogger.prototype.clear = function () {
        this.element.innerHTML = "";
    };
    return HTMLLogger;
}());
exports.default = HTMLLogger;


/***/ })
/******/ ]);
//# sourceMappingURL=dap.bundle.js.map