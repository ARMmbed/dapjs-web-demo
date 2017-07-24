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
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
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
var arrToString = function (arr) {
    var r = "";
    for (var i = 0; i < arr.length; ++i) {
        r += ("0000" + i).slice(-4) + ": " + ("00000000" + (arr[i] >>> 0).toString(16)).slice(-8);
        if (i != arr.length - 1) {
            r += "\n";
        }
    }
    return r;
};
exports.machineStateToString = function (s) {
    return "REGS:\n" + arrToString(s.registers);
};
//# sourceMappingURL=util.js.map

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var cortex_m_1 = __webpack_require__(3);
exports.CortexM = cortex_m_1.CortexM;
exports.CoreNames = cortex_m_1.CoreNames;
exports.ISANames = cortex_m_1.ISANames;
var device_1 = __webpack_require__(5);
exports.Device = device_1.Device;
var util_1 = __webpack_require__(0);
exports.machineStateToString = util_1.machineStateToString;
//# sourceMappingURL=main.js.map

/***/ }),
/* 2 */
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
var dapjs_1 = __webpack_require__(1);
var webhid_1 = __webpack_require__(7);
var targets_1 = __webpack_require__(8);
var logger_1 = __webpack_require__(11);
var device_selector_1 = __webpack_require__(12);
var DAPDemo = (function () {
    function DAPDemo() {
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
                        // open hid device
                        return [4 /*yield*/, this.hid.open()];
                    case 1:
                        // open hid device
                        _b.sent();
                        this.dapDevice = new dapjs_1.Device(this.hid);
                        this.target = new targets_1.MbedTarget(this.dapDevice, targets_1.FlashAlgos.get(this.deviceCode));
                        return [4 /*yield*/, this.target.init()];
                    case 2:
                        _b.sent();
                        return [4 /*yield*/, this.target.halt()];
                    case 3:
                        _b.sent();
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
        this.flash = function () { return __awaiter(_this, void 0, void 0, function () {
            var _this = this;
            var xhr;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.clearLog();
                        this.log("Preparing to flash device.");
                        return [4 /*yield*/, this.target.halt()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.target.init()];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, this.target.flashInit()];
                    case 3:
                        _a.sent();
                        this.log("Halted and initialised device.");
                        xhr = new XMLHttpRequest();
                        xhr.open("GET", "blinky-red.bin", true);
                        xhr.responseType = "arraybuffer";
                        xhr.onload = function (e) { return __awaiter(_this, void 0, void 0, function () {
                            var array;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        array = Array.from(new Uint32Array(xhr.response));
                                        this.log("Binary file " + array.length + " words long");
                                        // Push binary to board
                                        return [4 /*yield*/, this.target.flash(array)];
                                    case 1:
                                        // Push binary to board
                                        _a.sent();
                                        this.log("Successfully flashed binary.");
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
        this.erase = function () { return __awaiter(_this, void 0, void 0, function () {
            var r0, r1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        // Erase flash
                        this.clearLog();
                        return [4 /*yield*/, this.target.halt()];
                    case 1:
                        _a.sent();
                        this.log("Running flashInit");
                        return [4 /*yield*/, this.target.flashInit()];
                    case 2:
                        r0 = _a.sent();
                        this.log("flashInit returned 0x" + r0.toString(16));
                        return [4 /*yield*/, this.target.eraseChip()];
                    case 3:
                        r1 = _a.sent();
                        this.log("flashErase returned 0x" + r1.toString(16));
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
                        return [4 /*yield*/, this.target.snapshotMachineState()];
                    case 2:
                        st = _a.sent();
                        this.clearLog();
                        this.log(dapjs_1.machineStateToString(st));
                        return [2 /*return*/];
                }
            });
        }); };
        this.step = function () { return __awaiter(_this, void 0, void 0, function () {
            var st;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.target.step()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.target.snapshotMachineState()];
                    case 2:
                        st = _a.sent();
                        this.clearLog();
                        this.log(dapjs_1.machineStateToString(st));
                        return [2 /*return*/];
                }
            });
        }); };
        this.selector = new device_selector_1.PlatformSelector("platform-chooser", "platform-detected");
        this.chooseButton = document.getElementById("choose");
        this.connectButton = document.getElementById("connect");
        this.flashButton = document.getElementById("flash");
        this.eraseButton = document.getElementById("flash-erase");
        this.printRegistersButton = document.getElementById("registers");
        this.stepButton = document.getElementById("registers");
        this.haltButton = document.getElementById("halt");
        this.resumeButton = document.getElementById("halt");
        this.chooseButton.onclick = this.choose;
        this.connectButton.onclick = this.connect;
        this.flashButton.onclick = this.flash;
        this.eraseButton.onclick = this.erase;
        this.printRegistersButton.onclick = this.printRegisters;
        this.haltButton.onclick = this.halt;
        this.resumeButton.onclick = this.resume;
        this.logger = new logger_1.default("#trace");
    }
    DAPDemo.prototype.log = function (s) {
        this.logger.log("[demo] " + s);
    };
    DAPDemo.prototype.clearLog = function () {
        this.logger.clear();
    };
    return DAPDemo;
}());
window.onload = function () {
    var demo = new DAPDemo();
};


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
var debug_1 = __webpack_require__(4);
var util_1 = __webpack_require__(0);
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
                        return [4 /*yield*/, this.setupFpb()];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, this.readCoreType()];
                    case 3:
                        _a.sent();
                        console.debug("Initialized.");
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
                    case 0: return [4 /*yield*/, this.readMem(3758157296 /* DHCSR */)];
                    case 1:
                        dhcsr = _a.sent();
                        if (!(dhcsr & 33554432 /* S_RESET_ST */)) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.readMem(3758157296 /* DHCSR */)];
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
                    case 0: return [4 /*yield*/, this.readMem(3758157056 /* CPUID */)];
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
     * Set up (and disable) the Flash Patch & Breakpoint unit. It will be enabled when
     * the first breakpoint is set.
     *
     * Also reads the number of available hardware breakpoints.
     */
    CortexM.prototype.setupFpb = function () {
        return __awaiter(this, void 0, void 0, function () {
            var fpcr, nbCode, nbLit, i, b;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.readMem(3758104576 /* FP_CTRL */)];
                    case 1:
                        fpcr = _a.sent();
                        nbCode = ((fpcr >> 8) & 0x70) | ((fpcr >> 4) & 0xf);
                        nbLit = (fpcr >> 7) & 0xf;
                        console.debug(nbCode + " hardware breakpoints, " + nbLit + " literal comparators");
                        this.breakpoints = [];
                        i = 0;
                        _a.label = 2;
                    case 2:
                        if (!(i < nbCode)) return [3 /*break*/, 5];
                        b = new debug_1.Breakpoint(this, i);
                        b.write(0);
                        return [4 /*yield*/, this.breakpoints.push(b)];
                    case 3:
                        _a.sent();
                        _a.label = 4;
                    case 4:
                        i++;
                        return [3 /*break*/, 2];
                    case 5: return [4 /*yield*/, this.setFpbEnabled(false)];
                    case 6:
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
    CortexM.prototype.setBreakpoints = function (addrs) {
        return __awaiter(this, void 0, void 0, function () {
            var mapAddr, i;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        mapAddr = function (addr) {
                            if (addr === null) {
                                return 0;
                            }
                            else if ((addr & 3) === 2) {
                                return 0x80000001 | (addr & ~3);
                            }
                            else if ((addr & 3) === 0) {
                                return 0x40000001 | (addr & ~3);
                            }
                            else {
                                console.error("uneven address");
                            }
                        };
                        if (addrs.length > this.breakpoints.length) {
                            console.error("not enough hw breakpoints");
                        }
                        return [4 /*yield*/, this.debugEnable()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.setFpbEnabled(true)];
                    case 2:
                        _a.sent();
                        while (addrs.length < this.breakpoints.length) {
                            addrs.push(null);
                        }
                        i = 0;
                        _a.label = 3;
                    case 3:
                        if (!(i < addrs.length)) return [3 /*break*/, 6];
                        return [4 /*yield*/, this.breakpoints[i].write(mapAddr(addrs[i]))];
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
    CortexM.prototype.setFpbEnabled = function (enabled) {
        if (enabled === void 0) { enabled = true; }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.writeMem(3758104576 /* FP_CTRL */, 2 /* FP_CTRL_KEY */ | (enabled ? 1 : 0))];
            });
        });
    };
    /**
     * Write a 32-bit word to the specified (word-aligned) memory address.
     *
     * @param addr Memory address to write to
     * @param data Data to write (values above 2**32 will be truncated)
     */
    CortexM.prototype.writeMem = function (addr, data) {
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
     * Read a 32-bit word from the specified (word-aligned) memory address.
     *
     * @param addr Memory address to read from.
     */
    CortexM.prototype.readMem = function (addr) {
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
                        return [4 /*yield*/, this.readMem(addr)];
                    case 7: return [2 /*return*/, _a.sent()];
                    case 8: return [2 /*return*/];
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
    CortexM.prototype.readBlock = function (addr, words, pageSize) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var funs, bufs, end, ptr, _loop_1, _i, funs_1, f;
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
                    case 5: return [2 /*return*/, _a.sent()];
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
    CortexM.prototype.writeBlock = function (addr, words) {
        return __awaiter(this, void 0, void 0, function () {
            var blSz, i;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (words.length === 0) {
                            return [2 /*return*/];
                        }
                        console.debug("write block: 0x" + addr.toString(16) + " " + words.length + " len");
                        if (!(1 > 0)) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.writeBlockCore(addr, words)];
                    case 1:
                        _a.sent();
                        console.debug("written");
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
                    case 6:
                        console.debug("written");
                        return [2 /*return*/];
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
                    case 0: return [4 /*yield*/, this.writeMem(3758157300 /* DCRSR */, no)];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.readMem(3758157296 /* DHCSR */)];
                    case 2:
                        v = _a.sent();
                        util_1.assert(v & 65536 /* S_REGRDY */);
                        return [4 /*yield*/, this.readMem(3758157304 /* DCRDR */)];
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
                    case 0: return [4 /*yield*/, this.writeMem(3758157304 /* DCRDR */, val)];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.writeMem(3758157300 /* DCRSR */, no | 65536 /* DCRSR_REGWnR */)];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, this.readMem(3758157296 /* DHCSR */)];
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
                return [2 /*return*/, this.writeMem(3758157296 /* DHCSR */, -1604386816 /* DBGKEY */ | 1 /* C_DEBUGEN */ | 2 /* C_HALT */)];
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
                        return [4 /*yield*/, this.writeMem(3758157104 /* DFSR */, 4 /* DFSR_DWTTRAP */ | 2 /* DFSR_BKPT */ | 1 /* DFSR_HALTED */)];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, this.debugEnable()];
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
                    case 0: return [4 /*yield*/, this.readMem(3758157296 /* DHCSR */)];
                    case 1:
                        dhcsr = _a.sent();
                        return [4 /*yield*/, this.readMem(3758157104 /* DFSR */)];
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
     * Enable debugging on the target CPU.
     */
    CortexM.prototype.debugEnable = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.writeMem(3758157296 /* DHCSR */, -1604386816 /* DBGKEY */ | 1 /* C_DEBUGEN */)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Reset the CPU core. This currently does a software reset - it is also technically possible to perform a 'hard'
     * reset using the reset pin from the debugger.
     */
    CortexM.prototype.reset = function () {
        return __awaiter(this, void 0, void 0, function () {
            var dhcsr;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.writeMem(3758157068 /* NVIC_AIRCR */, 100270080 /* NVIC_AIRCR_VECTKEY */ | 4 /* NVIC_AIRCR_SYSRESETREQ */)];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.readMem(3758157296 /* DHCSR */)];
                    case 2:
                        dhcsr = _a.sent();
                        _a.label = 3;
                    case 3:
                        if (!((dhcsr & 33554432 /* S_RESET_ST */) !== 0)) return [3 /*break*/, 5];
                        return [4 /*yield*/, this.readMem(3758157296 /* DHCSR */)];
                    case 4:
                        dhcsr = _a.sent();
                        return [3 /*break*/, 3];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Snapshot the current state of the CPU. Reads all general-purpose registers, and returns them in an array. This
     * should also snapshot the current stack state, but given that the stack location varies between individual CPUs,
     * this functionality should be moved somewhere else.
     *
     * **TODO**: remove the code about the stack.
     */
    CortexM.prototype.snapshotMachineState = function () {
        return __awaiter(this, void 0, void 0, function () {
            var state, i, _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        state = {
                            registers: [],
                            stack: [],
                        };
                        i = 0;
                        _c.label = 1;
                    case 1:
                        if (!(i < 16)) return [3 /*break*/, 4];
                        _a = state.registers;
                        _b = i;
                        return [4 /*yield*/, this.readCoreRegister(i)];
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
     * @param sp initial value of the stack pointer.
     * @param lr initial value of the link register.
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
                        return [4 /*yield*/, this.writeBlock(address, code)];
                    case 9:
                        _a.sent();
                        _a.label = 10;
                    case 10: 
                    // Run the program
                    return [4 /*yield*/, this.resume()];
                    case 11:
                        // Run the program
                        _a.sent();
                        _a.label = 12;
                    case 12: return [4 /*yield*/, this.isHalted()];
                    case 13:
                        if (!!(_a.sent())) return [3 /*break*/, 14];
                        return [3 /*break*/, 12];
                    case 14: return [4 /*yield*/, this.readCoreRegister(0 /* R0 */)];
                    case 15: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * Step the processor forward by one instruction.
     */
    CortexM.prototype.step = function () {
        return __awaiter(this, void 0, void 0, function () {
            var dhcsr, interrupts_masked;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.readMem(3758157296 /* DHCSR */)];
                    case 1:
                        dhcsr = _a.sent();
                        if (!(dhcsr & (4 /* C_STEP */ | 2 /* C_HALT */))) {
                            console.error("Target is not halted.");
                            return [2 /*return*/];
                        }
                        interrupts_masked = (8 /* C_MASKINTS */ & dhcsr) !== 0;
                        if (!!interrupts_masked) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.writeMem(3758157296 /* DHCSR */, -1604386816 /* DBGKEY */ | 1 /* C_DEBUGEN */ | 2 /* C_HALT */ | 8 /* C_MASKINTS */)];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3: return [4 /*yield*/, this.writeMem(3758157296 /* DHCSR */, -1604386816 /* DBGKEY */ | 1 /* C_DEBUGEN */ | 8 /* C_MASKINTS */ | 4 /* C_STEP */)];
                    case 4:
                        _a.sent();
                        _a.label = 5;
                    case 5: return [4 /*yield*/, this.readMem(3758157296 /* DHCSR */)];
                    case 6:
                        if (!!((_a.sent()) & 2 /* C_HALT */)) return [3 /*break*/, 7];
                        return [3 /*break*/, 5];
                    case 7:
                        this.writeMem(3758157296 /* DHCSR */, -1604386816 /* DBGKEY */ | 1 /* C_DEBUGEN */ | 2 /* C_HALT */);
                        return [2 /*return*/];
                }
            });
        });
    };
    CortexM.prototype.readBlockCore = function (addr, words) {
        return __awaiter(this, void 0, void 0, function () {
            var lastSize, bufs, blocks, i, b;
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
                        bufs = [];
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
    CortexM.prototype.writeBlockCore = function (addr, words) {
        return __awaiter(this, void 0, void 0, function () {
            var blSz, reg, i, e_2;
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
                        e_2 = _a.sent();
                        if (!e_2.dapWait) return [3 /*break*/, 10];
                        console.debug("transfer wait, write block");
                        return [4 /*yield*/, util_1.delay(100)];
                    case 8:
                        _a.sent();
                        return [4 /*yield*/, this.writeBlockCore(addr, words)];
                    case 9: return [2 /*return*/, _a.sent()];
                    case 10: throw e_2;
                    case 11: return [3 /*break*/, 12];
                    case 12: return [2 /*return*/];
                }
            });
        });
    };
    return CortexM;
}());
exports.CortexM = CortexM;
//# sourceMappingURL=cortex_m.js.map

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
var Breakpoint = (function () {
    function Breakpoint(parent, index) {
        this.parent = parent;
        this.index = index;
    }
    Breakpoint.prototype.read = function () {
        return __awaiter(this, void 0, void 0, function () {
            var n;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.parent.readMem(3758104584 /* FP_COMP0 */ + this.index * 4)];
                    case 1:
                        n = _a.sent();
                        console.log("idx=" + this.index + ", CURR=" + n + ", LAST=" + this.lastWritten);
                        return [2 /*return*/];
                }
            });
        });
    };
    Breakpoint.prototype.write = function (num) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.lastWritten = num;
                return [2 /*return*/, this.parent.writeMem(3758104584 /* FP_COMP0 */ + this.index * 4, num)];
            });
        });
    };
    return Breakpoint;
}());
exports.Breakpoint = Breakpoint;
//# sourceMappingURL=debug.js.map

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
var dap_1 = __webpack_require__(6);
var util_1 = __webpack_require__(0);
var Device = (function () {
    function Device(device) {
        this.device = device;
        this.dap = new dap_1.Dap(device);
    }
    Device.prototype.reconnect = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.clearCaches();
                        return [4 /*yield*/, this.dap.disconnect()];
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
    Device.prototype.init = function () {
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
    Device.prototype.writeReg = function (regId, val) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.regOp(regId, val)];
            });
        });
    };
    Device.prototype.readReg = function (regId) {
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
    Device.prototype.readDp = function (addr) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.readReg(addr)];
            });
        });
    };
    Device.prototype.readAp = function (addr) {
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
    Device.prototype.writeDp = function (addr, data) {
        if (addr === 2 /* SELECT */) {
            if (data === this.dpSelect) {
                return Promise.resolve();
            }
            this.dpSelect = data;
        }
        return this.writeReg(addr, data);
    };
    Device.prototype.writeAp = function (addr, data) {
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
    Device.prototype.close = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.device.close()];
            });
        });
    };
    Device.prototype.readRegRepeat = function (regId, cnt) {
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
    Device.prototype.writeRegRepeat = function (regId, data) {
        return __awaiter(this, void 0, void 0, function () {
            var request, sendargs, _i, data_1, d, buf;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        util_1.assert(data.length <= 15);
                        request = util_1.regRequest(regId, true);
                        sendargs = [0, data.length];
                        for (_i = 0, data_1 = data; _i < data_1.length; _i++) {
                            d = data_1[_i];
                            sendargs.push(request);
                            util_1.addInt32(sendargs, d);
                        }
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
    Device.prototype.clearCaches = function () {
        delete this.dpSelect;
        delete this.csw;
        for (var _i = 0, _a = this.breakpoints; _i < _a.length; _i++) {
            var b = _a[_i];
            delete b.lastWritten;
        }
    };
    Device.prototype.regOp = function (regId, val) {
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
    return Device;
}());
exports.Device = Device;
//# sourceMappingURL=device.js.map

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
var util_1 = __webpack_require__(0);
var Dap = (function () {
    function Dap(hid) {
        this.sent = [];
        this.waiting = [];
        this.maxSent = 1;
        this.hid = hid;
    }
    Dap.prototype.resetTarget = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.cmdNums(10 /* DAP_RESET_TARGET */, [])];
            });
        });
    };
    Dap.prototype.disconnect = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.cmdNums(3 /* DAP_DISCONNECT */, [])];
            });
        });
    };
    Dap.prototype.cmdNums = function (op, data) {
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
    Dap.prototype.connect = function () {
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
    Dap.prototype.sendNums = function (lst) {
        lst.unshift(0);
        while (lst.length < 64) {
            lst.push(0);
        }
        this.send(lst);
    };
    Dap.prototype.jtagToSwd = function () {
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
    Dap.prototype.swjSequence = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.cmdNums(18 /* DAP_SWJ_SEQUENCE */, data)];
            });
        });
    };
    Dap.prototype.info = function (id) {
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
    Dap.prototype.send = function (command) {
        return __awaiter(this, void 0, void 0, function () {
            var array, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        array = Uint8Array.from(command);
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
    return Dap;
}());
exports.Dap = Dap;
//# sourceMappingURL=dap.js.map

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
/* 8 */
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
var flash_target_1 = __webpack_require__(10);
var k64f_flash_1 = __webpack_require__(9);
var microbit_flash_1 = __webpack_require__(13);
var MbedTarget = (function (_super) {
    __extends(MbedTarget, _super);
    function MbedTarget(device, flashAlgo) {
        var _this = _super.call(this, device) || this;
        _this.flashAlgo = flashAlgo;
        return _this;
    }
    /**
     * Initialise the flash driver on the chip. Must be called before any of the other
     * flash-related methods.
     *
     * **TODO**: check that this has been called before calling other flash methods.
     */
    MbedTarget.prototype.flashInit = function () {
        return __awaiter(this, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.halt()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.writeCoreRegister(9 /* R9 */, this.flashAlgo.staticBase)];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, this.runCode(this.flashAlgo.instructions, this.flashAlgo.loadAddress, this.flashAlgo.pcInit + this.flashAlgo.loadAddress + 0x20, this.flashAlgo.breakpointLocation, this.flashAlgo.stackPointer, true, 0, 0, 0)];
                    case 3:
                        result = _a.sent();
                        // the board should be reset etc. afterwards
                        // we should also probably run the flash unInit routine
                        return [2 /*return*/, result];
                }
            });
        });
    };
    /**
     * Erase _all_ data stored in flash on the chip.
     */
    MbedTarget.prototype.eraseChip = function () {
        return __awaiter(this, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.halt()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.writeCoreRegister(9 /* R9 */, this.flashAlgo.staticBase)];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, this.runCode(this.flashAlgo.instructions, this.flashAlgo.loadAddress, this.flashAlgo.pcEraseAll + this.flashAlgo.loadAddress + 0x20, this.flashAlgo.breakpointLocation, this.flashAlgo.stackPointer, false, 0, 0, 0)];
                    case 3:
                        result = _a.sent();
                        return [2 /*return*/, result];
                }
            });
        });
    };
    /**
     * Upload a program to flash memory on the chip.
     *
     * @param data Array of 32-bit integers to write to flash.
     */
    MbedTarget.prototype.flash = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            var ptr, writeLength, startAddress, bufferAddress, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.halt()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.writeCoreRegister(9 /* R9 */, this.flashAlgo.staticBase)];
                    case 2:
                        _a.sent();
                        ptr = 0;
                        _a.label = 3;
                    case 3:
                        if (!(ptr < data.length)) return [3 /*break*/, 7];
                        writeLength = Math.min(data.length - ptr, this.flashAlgo.pageSize);
                        startAddress = this.flashAlgo.flashStart + ptr;
                        bufferAddress = this.flashAlgo.staticBase;
                        console.log("Writing program to memory: " + bufferAddress + " " + data.length);
                        return [4 /*yield*/, this.writeBlock(bufferAddress, data.slice(ptr, ptr + this.flashAlgo.pageSize))];
                    case 4:
                        _a.sent();
                        console.log("Running flashing algorithm");
                        return [4 /*yield*/, this.runCode(this.flashAlgo.instructions, this.flashAlgo.loadAddress, this.flashAlgo.pcProgramPage + this.flashAlgo.loadAddress + 0x20, // pc
                            this.flashAlgo.breakpointLocation, // lr
                            this.flashAlgo.stackPointer, // sp
                            /* upload? */
                            ptr === 0, 
                            /* args */
                            startAddress, writeLength, bufferAddress)];
                    case 5:
                        result = _a.sent();
                        console.log("Flashed first block.");
                        _a.label = 6;
                    case 6:
                        ptr += this.flashAlgo.pageSize;
                        return [3 /*break*/, 3];
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    MbedTarget.prototype.resetStopOnReset = function () {
        return __awaiter(this, void 0, void 0, function () {
            var demcr;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log("reset stop on Reset");
                        return [4 /*yield*/, this.halt()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.readMem(3758157308 /* DEMCR */)];
                    case 2:
                        demcr = _a.sent();
                        return [4 /*yield*/, this.writeMem(3758157308 /* DEMCR */, demcr | 1 /* DEMCR_VC_CORERESET */)];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, this.reset()];
                    case 4:
                        _a.sent();
                        _a.label = 5;
                    case 5: return [4 /*yield*/, this.isHalted()];
                    case 6:
                        if (!!(_a.sent())) return [3 /*break*/, 7];
                        return [3 /*break*/, 5];
                    case 7: return [4 /*yield*/, this.writeMem(3758157308 /* DEMCR */, demcr)];
                    case 8:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    return MbedTarget;
}(flash_target_1.FlashTarget));
exports.MbedTarget = MbedTarget;
exports.FlashAlgos = new Map();
exports.FlashAlgos.set('0240', k64f_flash_1.K64F_FLASH_ALGO);
exports.FlashAlgos.set('9900', microbit_flash_1.MICROBIT_FLASH_ALGO);


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/*
 Flash OS Routines (Automagically Generated)
 Copyright (c) 2017-2017 ARM Limited

 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

     http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
*/
Object.defineProperty(exports, "__esModule", { value: true });
exports.K64F_FLASH_ALGO = {
    // Flash algorithm as a hex string
    instructions: [
        0xb510483e, 0x5120f24c, 0xf64d81c1, 0x81c11128, 0xf0218801, 0x80010101, 0x78414839, 0x0160f001,
        0xbf0c2940, 0x21002101, 0x444a4a36, 0xb1397011, 0xf0217841, 0x70410160, 0xf0117841, 0xd1fb0f60,
        0x44484831, 0xf864f000, 0xbf182800, 0xbd102001, 0x4448482c, 0xb1587800, 0x78414829, 0x0160f021,
        0x0140f041, 0x78417041, 0x0160f001, 0xd1fa2940, 0x47702000, 0xb5104824, 0x44484924, 0xf891f000,
        0xbf182800, 0x2100bd10, 0xe8bd481f, 0x44484010, 0xb958f000, 0x4c1cb570, 0x444c4605, 0x4b1b4601,
        0x68e24620, 0xf8b6f000, 0xbf182800, 0x2300bd70, 0x68e24629, 0x4070e8bd, 0x44484813, 0xb94cf000,
        0x460cb570, 0x4606460b, 0x480f4601, 0x4615b084, 0xf0004448, 0x2800f8eb, 0xb004bf1c, 0x2000bd70,
        0xe9cd2101, 0x90021000, 0x462b4807, 0x46314622, 0xf0004448, 0xb004f97f, 0x0000bd70, 0x40052000,
        0x4007e000, 0x00000004, 0x00000008, 0x6b65666b, 0xbf042800, 0x47702004, 0x6cc949ea, 0x6103f3c1,
        0xbf08290f, 0x1180f44f, 0x4ae7bf1f, 0xf832447a, 0x02891011, 0xe9c02200, 0x21022100, 0x61426081,
        0x618202c9, 0x1203e9c0, 0x52a0f04f, 0x2108e9c0, 0x47702000, 0xbf0e2800, 0x61012004, 0x47702000,
        0x48da4602, 0x49d96840, 0x0070f440, 0x47706048, 0x217048d7, 0x21807001, 0x78017001, 0x0f80f011,
        0x7800d0fb, 0x0f20f010, 0x2067bf1c, 0xf0104770, 0xbf1c0f10, 0x47702068, 0x0001f010, 0x2069bf18,
        0x28004770, 0x2004bf04, 0xb5104770, 0x4ac84604, 0x403bf06f, 0x48c76050, 0xbf144281, 0x2000206b,
        0xbf182800, 0x4620bd10, 0xffd2f7ff, 0x46204603, 0xffc6f7ff, 0xbd104618, 0xbf042800, 0x47702004,
        0x60532300, 0x60d36093, 0x61536113, 0x61d36193, 0x68c16011, 0xe9d06051, 0xfbb11001, 0x6090f0f0,
        0x21102008, 0x0103e9c2, 0x1005e9c2, 0x61d02004, 0x47702000, 0x4df0e92d, 0x4615b088, 0x460c4698,
        0x466a4682, 0xffd8f7ff, 0x4621462a, 0x9b044650, 0xf931f000, 0xbf1c0007, 0xe8bdb008, 0xe9dd8df0,
        0x19604600, 0xfbb51e45, 0xfb06f0f6, 0xb1205010, 0xf0f6fbb5, 0x43701c40, 0x42ac1e45, 0xf8dfbf98,
        0xd81cb270, 0x407ff024, 0x6010f040, 0x0004f8cb, 0x45804898, 0x206bbf14, 0x28002000, 0xb008bf1c,
        0x8df0e8bd, 0xf7ff4650, 0x4607ff73, 0x0010f8da, 0xbf182800, 0xb9174780, 0x42ac4434, 0x4650d9e2,
        0xff5ef7ff, 0x4638b008, 0x8df0e8bd, 0xbf042a00, 0x47702004, 0x45f0e92d, 0x4614b089, 0x460d461e,
        0x466a4680, 0xff88f7ff, 0x46294632, 0x9b034640, 0xf8e1f000, 0xbf1c0007, 0xe8bdb009, 0x9d0085f0,
        0xbf182e00, 0xa1e8f8df, 0xf854d025, 0xf8ca0b04, 0x98030008, 0xbf042804, 0x407ff025, 0x60c0f040,
        0x2808d009, 0xf854d109, 0xf8ca0b04, 0xf025000c, 0xf040407f, 0xf8ca60e0, 0x46400004, 0xff28f7ff,
        0x1010f8d8, 0x29004607, 0x4788bf18, 0x9803b91f, 0x1a364405, 0x4640d1d9, 0xff12f7ff, 0x4638b009,
        0x85f0e8bd, 0xbf042800, 0x47702004, 0xea424a62, 0x4a5f4101, 0xe70b6051, 0x4dffe92d, 0x4614b088,
        0x460d469a, 0x9808466a, 0xff36f7ff, 0x46294622, 0x98089b05, 0xf88ff000, 0xbf1c2800, 0xe8bdb00c,
        0x466a8df0, 0x98084629, 0xff26f7ff, 0xf8dd9e00, 0x42708008, 0x0100f1c8, 0x42474008, 0xbf0842b7,
        0x2c004447, 0xf8dfbf18, 0xd01fb128, 0x42a51bbd, 0x4625bf88, 0xf0269805, 0xfbb5417f, 0xf041f0f0,
        0xf8cb7180, 0x04001004, 0x200aea40, 0x00fff040, 0x0008f8cb, 0xf7ff9808, 0x2800fecb, 0xb00cbf1c,
        0x8df0e8bd, 0x442e1b64, 0xd1df4447, 0x2000b00c, 0x8df0e8bd, 0xbf042b00, 0x47702004, 0x4dffe92d,
        0x4616b088, 0x7a14e9dd, 0x460c461d, 0xf8dd466a, 0x98088058, 0xfee0f7ff, 0x3007e9dd, 0x46214632,
        0xf839f000, 0xbf1c2800, 0xe8bdb00c, 0x9c008df0, 0xbf042e00, 0xe8bdb00c, 0xf8df8df0, 0xf06fb094,
        0xea40407f, 0xf0246707, 0xf040407f, 0xf8cb7000, 0xf8cb0004, 0x68287008, 0x000cf8cb, 0xf7ff9808,
        0xb168fe87, 0x0f00f1ba, 0xf8cabf18, 0xf1b84000, 0xbf1c0f00, 0xf8c82100, 0xb00c1000, 0x8df0e8bd,
        0x1a769907, 0x0103f021, 0x9907440d, 0xd1da440c, 0xe8bdb00c, 0x28008df0, 0x2004bf04, 0xf1a34770,
        0x42190301, 0x421abf0e, 0x47702065, 0x428b6803, 0x6840d806, 0x44184411, 0xbf244288, 0x47702000,
        0x47702066, 0x40048000, 0x000003b4, 0x4001f000, 0x40020000, 0x6b65666b, 0x4000ffff, 0x40020004,
        0x40020010, 0x00100008, 0x00200018, 0x00400030, 0x00800060, 0x010000c0, 0x02000180, 0x04000300,
        0x00000600, 0x00000000, 0x00000000, 0x00000000, 0x00000000, 0x00000000, 0x00000000, 0x00000000,
        0x00000000, 0x00000000, 0x00000000, 0x00000000, 0x00000000, 0x00000000, 0x00000000, 0x00000000,
    ],
    // Relative function addresses
    pcInit: 0x1,
    pcUnInit: 0x51,
    pcProgramPage: 0xc1,
    pcEraseSector: 0x95,
    pcEraseAll: 0x75,
    // Relative region addresses and sizes
    roStart: 0x0,
    roSize: 0x504,
    rwStart: 0x504,
    rwSize: 0x8,
    ziStart: 0x50c,
    ziSize: 0x34,
    // Flash information
    flashStart: 0x0,
    flashSize: 0x0,
    pageSize: 0x400,
    sectorSizes: [
        [0x0, 0x400],
    ],
    breakpointLocation: 0x20000001,
    staticBase: 0x20000524,
    stackPointer: 0x20000800,
    loadAddress: 0x20000000,
};


/***/ }),
/* 10 */
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
Object.defineProperty(exports, "__esModule", { value: true });
var dapjs_1 = __webpack_require__(1);
var FlashTarget = (function (_super) {
    __extends(FlashTarget, _super);
    function FlashTarget() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return FlashTarget;
}(dapjs_1.CortexM));
exports.FlashTarget = FlashTarget;


/***/ }),
/* 11 */
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
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/*
 Flash OS Routines (Automagically Generated)
 Copyright (c) 2017-2017 ARM Limited

 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

     http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
*/
Object.defineProperty(exports, "__esModule", { value: true });
exports.MICROBIT_FLASH_ALGO = {
    // Flash algorithm as a hex string
    instructions: [
        0x47702000, 0x47702000, 0x4c34b4f0, 0x60602002, 0x60e02001, 0x4e334d32, 0x4b344f33, 0x07c06828,
        0x2000d003, 0xbcf06060, 0x68704770, 0x0e000600, 0x6879d0f4, 0xd0f12900, 0x07c2492d, 0x600bd000,
        0x08401d09, 0xe7e9d1f9, 0x4c24b4f0, 0x60612102, 0x42884928, 0x2001d302, 0xe0006160, 0x4e2160a0,
        0x4d234f21, 0x68704b21, 0x0e000600, 0x6879d009, 0xd0062900, 0x07c24629, 0x600bd000, 0x08401d09,
        0x4817d1f9, 0x07c06800, 0x2000d0ed, 0xbcf06060, 0xb4f04770, 0x4911088e, 0x604b2301, 0x4d134f11,
        0xc002ca02, 0x6809490e, 0xd00707c9, 0xd1f71e76, 0x2100480a, 0xbcf06041, 0x47704608, 0x06096879,
        0xd0ef0e09, 0x685b4b08, 0xd0eb2b00, 0x07cc4b08, 0x601dd000, 0x08491d1b, 0xe7e3d1f9, 0x4001e500,
        0x4001e400, 0x40010400, 0x40010500, 0x6e524635, 0x40010600, 0x10001000, 0x00000000
    ],
    // Relative function addresses
    pcInit: 0x1,
    pcUnInit: 0x5,
    pcProgramPage: 0x93,
    pcEraseSector: 0x49,
    pcEraseAll: 0x9,
    // Relative region addresses and sizes
    roStart: 0x0,
    roSize: 0xf8,
    rwStart: 0xf8,
    rwSize: 0x4,
    ziStart: 0xfc,
    ziSize: 0x0,
    // Flash information
    flashStart: 0x0,
    flashSize: 0x40000,
    pageSize: 0x4,
    sectorSizes: [
        [0x0, 0x400],
    ],
    breakpointLocation: 0x20000001,
    staticBase: 0x20000118,
    stackPointer: 0x20000800,
    loadAddress: 0x20000000
};


/***/ })
/******/ ]);
//# sourceMappingURL=dap.bundle.js.map