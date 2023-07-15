/*
▄▄▄         ▄· ▄▌ ▄▄▄· ▄▄▌
▀▄ █·▪     ▐█▪██▌▐█ ▀█ ██•
▐▀▀▄  ▄█▀▄ ▐█▌▐█▪▄█▀▀█ ██▪
▐█•█▌▐█▌.▐▌ ▐█▀·.▐█ ▪▐▌▐█▌▐▌
.▀  ▀ ▀█▄▀▪  ▀ •  ▀  ▀ .▀▀▀
 */
(async () => {
  const { spawn } = require("child_process");
  const { existsSync } = require("fs");
  const { join } = require("path");
  if (!existsSync(join(process.cwd(), "node_modules"))) {
    await new Promise((resolve) => {
      console.log("Installing deps:", process.cwd());
      const pnpm = spawn("pnpm", ["i"], { stdio: "inherit", shell: true });
      pnpm.on("exit", resolve);
    });
  }
(() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __require = /* @__PURE__ */ ((x) => typeof require !== "undefined" ? require : typeof Proxy !== "undefined" ? new Proxy(x, {
    get: (a, b) => (typeof require !== "undefined" ? require : a)[b]
  }) : x)(function(x) {
    if (typeof require !== "undefined")
      return require.apply(this, arguments);
    throw Error('Dynamic require of "' + x + '" is not supported');
  });
  var __commonJS = (cb, mod) => function __require2() {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
    // If the importer is in node compatibility mode or this is not an ESM
    // file that has been converted to a CommonJS file using a Babel-
    // compatible transform (i.e. "__esModule" has not been set), then set
    // "default" to the CommonJS "module.exports" for node compatibility.
    isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
    mod
  ));

  // node_modules/.pnpm/human-signals@2.1.0/node_modules/human-signals/build/src/core.js
  var require_core = __commonJS({
    "node_modules/.pnpm/human-signals@2.1.0/node_modules/human-signals/build/src/core.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.SIGNALS = void 0;
      var SIGNALS = [
        {
          name: "SIGHUP",
          number: 1,
          action: "terminate",
          description: "Terminal closed",
          standard: "posix"
        },
        {
          name: "SIGINT",
          number: 2,
          action: "terminate",
          description: "User interruption with CTRL-C",
          standard: "ansi"
        },
        {
          name: "SIGQUIT",
          number: 3,
          action: "core",
          description: "User interruption with CTRL-\\",
          standard: "posix"
        },
        {
          name: "SIGILL",
          number: 4,
          action: "core",
          description: "Invalid machine instruction",
          standard: "ansi"
        },
        {
          name: "SIGTRAP",
          number: 5,
          action: "core",
          description: "Debugger breakpoint",
          standard: "posix"
        },
        {
          name: "SIGABRT",
          number: 6,
          action: "core",
          description: "Aborted",
          standard: "ansi"
        },
        {
          name: "SIGIOT",
          number: 6,
          action: "core",
          description: "Aborted",
          standard: "bsd"
        },
        {
          name: "SIGBUS",
          number: 7,
          action: "core",
          description: "Bus error due to misaligned, non-existing address or paging error",
          standard: "bsd"
        },
        {
          name: "SIGEMT",
          number: 7,
          action: "terminate",
          description: "Command should be emulated but is not implemented",
          standard: "other"
        },
        {
          name: "SIGFPE",
          number: 8,
          action: "core",
          description: "Floating point arithmetic error",
          standard: "ansi"
        },
        {
          name: "SIGKILL",
          number: 9,
          action: "terminate",
          description: "Forced termination",
          standard: "posix",
          forced: true
        },
        {
          name: "SIGUSR1",
          number: 10,
          action: "terminate",
          description: "Application-specific signal",
          standard: "posix"
        },
        {
          name: "SIGSEGV",
          number: 11,
          action: "core",
          description: "Segmentation fault",
          standard: "ansi"
        },
        {
          name: "SIGUSR2",
          number: 12,
          action: "terminate",
          description: "Application-specific signal",
          standard: "posix"
        },
        {
          name: "SIGPIPE",
          number: 13,
          action: "terminate",
          description: "Broken pipe or socket",
          standard: "posix"
        },
        {
          name: "SIGALRM",
          number: 14,
          action: "terminate",
          description: "Timeout or timer",
          standard: "posix"
        },
        {
          name: "SIGTERM",
          number: 15,
          action: "terminate",
          description: "Termination",
          standard: "ansi"
        },
        {
          name: "SIGSTKFLT",
          number: 16,
          action: "terminate",
          description: "Stack is empty or overflowed",
          standard: "other"
        },
        {
          name: "SIGCHLD",
          number: 17,
          action: "ignore",
          description: "Child process terminated, paused or unpaused",
          standard: "posix"
        },
        {
          name: "SIGCLD",
          number: 17,
          action: "ignore",
          description: "Child process terminated, paused or unpaused",
          standard: "other"
        },
        {
          name: "SIGCONT",
          number: 18,
          action: "unpause",
          description: "Unpaused",
          standard: "posix",
          forced: true
        },
        {
          name: "SIGSTOP",
          number: 19,
          action: "pause",
          description: "Paused",
          standard: "posix",
          forced: true
        },
        {
          name: "SIGTSTP",
          number: 20,
          action: "pause",
          description: 'Paused using CTRL-Z or "suspend"',
          standard: "posix"
        },
        {
          name: "SIGTTIN",
          number: 21,
          action: "pause",
          description: "Background process cannot read terminal input",
          standard: "posix"
        },
        {
          name: "SIGBREAK",
          number: 21,
          action: "terminate",
          description: "User interruption with CTRL-BREAK",
          standard: "other"
        },
        {
          name: "SIGTTOU",
          number: 22,
          action: "pause",
          description: "Background process cannot write to terminal output",
          standard: "posix"
        },
        {
          name: "SIGURG",
          number: 23,
          action: "ignore",
          description: "Socket received out-of-band data",
          standard: "bsd"
        },
        {
          name: "SIGXCPU",
          number: 24,
          action: "core",
          description: "Process timed out",
          standard: "bsd"
        },
        {
          name: "SIGXFSZ",
          number: 25,
          action: "core",
          description: "File too big",
          standard: "bsd"
        },
        {
          name: "SIGVTALRM",
          number: 26,
          action: "terminate",
          description: "Timeout or timer",
          standard: "bsd"
        },
        {
          name: "SIGPROF",
          number: 27,
          action: "terminate",
          description: "Timeout or timer",
          standard: "bsd"
        },
        {
          name: "SIGWINCH",
          number: 28,
          action: "ignore",
          description: "Terminal window size changed",
          standard: "bsd"
        },
        {
          name: "SIGIO",
          number: 29,
          action: "terminate",
          description: "I/O is available",
          standard: "other"
        },
        {
          name: "SIGPOLL",
          number: 29,
          action: "terminate",
          description: "Watched event",
          standard: "other"
        },
        {
          name: "SIGINFO",
          number: 29,
          action: "ignore",
          description: "Request for process information",
          standard: "other"
        },
        {
          name: "SIGPWR",
          number: 30,
          action: "terminate",
          description: "Device running out of power",
          standard: "systemv"
        },
        {
          name: "SIGSYS",
          number: 31,
          action: "core",
          description: "Invalid system call",
          standard: "other"
        },
        {
          name: "SIGUNUSED",
          number: 31,
          action: "terminate",
          description: "Invalid system call",
          standard: "other"
        }
      ];
      exports.SIGNALS = SIGNALS;
    }
  });

  // node_modules/.pnpm/human-signals@2.1.0/node_modules/human-signals/build/src/realtime.js
  var require_realtime = __commonJS({
    "node_modules/.pnpm/human-signals@2.1.0/node_modules/human-signals/build/src/realtime.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.SIGRTMAX = exports.getRealtimeSignals = void 0;
      var getRealtimeSignals = function() {
        const length = SIGRTMAX - SIGRTMIN + 1;
        return Array.from({ length }, getRealtimeSignal);
      };
      exports.getRealtimeSignals = getRealtimeSignals;
      var getRealtimeSignal = function(value, index) {
        return {
          name: `SIGRT${index + 1}`,
          number: SIGRTMIN + index,
          action: "terminate",
          description: "Application-specific signal (realtime)",
          standard: "posix"
        };
      };
      var SIGRTMIN = 34;
      var SIGRTMAX = 64;
      exports.SIGRTMAX = SIGRTMAX;
    }
  });

  // node_modules/.pnpm/human-signals@2.1.0/node_modules/human-signals/build/src/signals.js
  var require_signals = __commonJS({
    "node_modules/.pnpm/human-signals@2.1.0/node_modules/human-signals/build/src/signals.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.getSignals = void 0;
      var _os = __require("os");
      var _core = require_core();
      var _realtime = require_realtime();
      var getSignals = function() {
        const realtimeSignals = (0, _realtime.getRealtimeSignals)();
        const signals = [..._core.SIGNALS, ...realtimeSignals].map(normalizeSignal);
        return signals;
      };
      exports.getSignals = getSignals;
      var normalizeSignal = function({
        name,
        number: defaultNumber,
        description,
        action,
        forced = false,
        standard
      }) {
        const {
          signals: { [name]: constantSignal }
        } = _os.constants;
        const supported = constantSignal !== void 0;
        const number = supported ? constantSignal : defaultNumber;
        return { name, number, description, supported, action, forced, standard };
      };
    }
  });

  // node_modules/.pnpm/human-signals@2.1.0/node_modules/human-signals/build/src/main.js
  var require_main = __commonJS({
    "node_modules/.pnpm/human-signals@2.1.0/node_modules/human-signals/build/src/main.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.signalsByNumber = exports.signalsByName = void 0;
      var _os = __require("os");
      var _signals = require_signals();
      var _realtime = require_realtime();
      var getSignalsByName = function() {
        const signals = (0, _signals.getSignals)();
        return signals.reduce(getSignalByName, {});
      };
      var getSignalByName = function(signalByNameMemo, { name, number, description, supported, action, forced, standard }) {
        return {
          ...signalByNameMemo,
          [name]: { name, number, description, supported, action, forced, standard }
        };
      };
      var signalsByName = getSignalsByName();
      exports.signalsByName = signalsByName;
      var getSignalsByNumber = function() {
        const signals = (0, _signals.getSignals)();
        const length = _realtime.SIGRTMAX + 1;
        const signalsA = Array.from({ length }, (value, number) => getSignalByNumber(number, signals));
        return Object.assign({}, ...signalsA);
      };
      var getSignalByNumber = function(number, signals) {
        const signal = findSignalByNumber(number, signals);
        if (signal === void 0) {
          return {};
        }
        const { name, description, supported, action, forced, standard } = signal;
        return {
          [number]: {
            name,
            number,
            description,
            supported,
            action,
            forced,
            standard
          }
        };
      };
      var findSignalByNumber = function(number, signals) {
        const signal = signals.find(({ name }) => _os.constants.signals[name] === number);
        if (signal !== void 0) {
          return signal;
        }
        return signals.find((signalA) => signalA.number === number);
      };
      var signalsByNumber = getSignalsByNumber();
      exports.signalsByNumber = signalsByNumber;
    }
  });

  // node_modules/.pnpm/catch-exit@1.2.2/node_modules/catch-exit/dist/index.js
  var require_dist = __commonJS({
    "node_modules/.pnpm/catch-exit@1.2.2/node_modules/catch-exit/dist/index.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.enableLogging = exports.setupCatchExit = exports.registerStringifyError = exports.catchSignalStrings = exports.removeExitCallback = exports.addExitCallback = void 0;
      var async_hooks_1 = __require("async_hooks");
      var fs_1 = __require("fs");
      var human_signals_1 = require_main();
      function addExitCallback2(callback) {
        setupProcessExitHandling();
        callbacks.push(callback);
        return callback;
      }
      exports.addExitCallback = addExitCallback2;
      function removeExitCallback(callback) {
        setupProcessExitHandling();
        const index = callbacks.indexOf(callback);
        return index > -1 ? callbacks.splice(index, 1)[0] : void 0;
      }
      exports.removeExitCallback = removeExitCallback;
      var signals = [
        "SIGHUP",
        // catches ctrl+c event
        "SIGINT",
        // catches "kill pid"
        "SIGTERM",
        "SIGQUIT"
      ];
      exports.catchSignalStrings = [...signals, "exit", "uncaughtException"];
      function stringifyError(error) {
        if (customStringifyError) {
          return customStringifyError(error);
        }
        if (error instanceof Error) {
          return (error.stack || error.toString()) + "\n";
        } else {
          return String(error);
        }
      }
      function registerStringifyError(errorStringifyFunction) {
        setupProcessExitHandling();
        customStringifyError = errorStringifyFunction;
      }
      exports.registerStringifyError = registerStringifyError;
      var customStringifyError;
      function setupCatchExit(options) {
        setupProcessExitHandling();
        if (options) {
          const { loggingEnabled: loggingEnabled2, customErrorStringify } = options;
          if (customErrorStringify) {
            registerStringifyError(customErrorStringify);
          }
          if (loggingEnabled2) {
            enableLogging();
          }
        }
      }
      exports.setupCatchExit = setupCatchExit;
      var loggingEnabled = false;
      function enableLogging(enable = true) {
        setupProcessExitHandling();
        loggingEnabled = enable;
        return enable;
      }
      exports.enableLogging = enableLogging;
      function log(value) {
        if (loggingEnabled) {
          (0, fs_1.writeSync)(1, value + "\n");
        }
      }
      function logError(value) {
        (0, fs_1.writeSync)(2, value);
      }
      var callbacks = [];
      var ignoredAsyncTypes = ["TTYWRAP", "SIGNALWRAP", "PIPEWRAP"];
      var asyncHook = (0, async_hooks_1.createHook)({
        init(id, type) {
          if (!ignoredAsyncTypes.includes(type)) {
            (0, fs_1.writeSync)(2, `
ERROR: Async operation of type "${type}" was created in "process.exit" callback. This will not run to completion as "process.exit" will not complete async tasks.
`);
          }
        }
      });
      var alreadySetup = false;
      var alreadyExiting = false;
      function setupProcessExitHandling() {
        if (alreadySetup) {
          return;
        }
        function exitHandler(signal, exitCode, inputError) {
          log(`handling signal: ${signal} with code ${exitCode}`);
          if (!alreadyExiting) {
            log("setting alreadyExiting");
            alreadyExiting = true;
            try {
              log(`Firing ${callbacks.length} callbacks`);
              if (signal === "exit") {
                asyncHook.enable();
              }
              callbacks.forEach((callback) => callback(signal, exitCode, inputError));
              asyncHook.disable();
            } catch (callbackError) {
              log("Error in callback");
              exitWithError(callbackError, 7);
            }
            if (inputError instanceof Error) {
              exitWithError(inputError, exitCode);
            } else {
              process.exit(exitCode);
            }
          } else {
            log("Already exiting, not doing anything");
            return;
          }
        }
        function exitWithError(error, code) {
          log(`Exiting with error and code ${code}`);
          logError(stringifyError(error));
          process.exit(code);
        }
        signals.forEach((signal) => process.on(signal, () => {
          var _a;
          const signalNumber = (_a = human_signals_1.signalsByName[signal]) === null || _a === void 0 ? void 0 : _a.number;
          if (signalNumber == void 0) {
            throw new Error(`Failed to find number for signal "${signal}"`);
          }
          exitHandler(signal, 128 + signalNumber);
        }));
        process.on("exit", (code) => {
          log(`exit listener with code ${code}`);
          exitHandler("exit", code);
        });
        process.on("unhandledRejection", (reason) => {
          log("unhandledRejection listener");
          const error = reason instanceof Error ? reason : new Error(reason ? `${reason}` : "");
          error.name = "UnhandledRejection";
          throw error;
        });
        process.on("uncaughtException", (error) => {
          log("uncaughtException listener");
          exitHandler("uncaughtException", 1, error);
        });
        alreadySetup = true;
      }
    }
  });

  // node_modules/.pnpm/color-name@1.1.4/node_modules/color-name/index.js
  var require_color_name = __commonJS({
    "node_modules/.pnpm/color-name@1.1.4/node_modules/color-name/index.js"(exports, module) {
      "use strict";
      module.exports = {
        "aliceblue": [240, 248, 255],
        "antiquewhite": [250, 235, 215],
        "aqua": [0, 255, 255],
        "aquamarine": [127, 255, 212],
        "azure": [240, 255, 255],
        "beige": [245, 245, 220],
        "bisque": [255, 228, 196],
        "black": [0, 0, 0],
        "blanchedalmond": [255, 235, 205],
        "blue": [0, 0, 255],
        "blueviolet": [138, 43, 226],
        "brown": [165, 42, 42],
        "burlywood": [222, 184, 135],
        "cadetblue": [95, 158, 160],
        "chartreuse": [127, 255, 0],
        "chocolate": [210, 105, 30],
        "coral": [255, 127, 80],
        "cornflowerblue": [100, 149, 237],
        "cornsilk": [255, 248, 220],
        "crimson": [220, 20, 60],
        "cyan": [0, 255, 255],
        "darkblue": [0, 0, 139],
        "darkcyan": [0, 139, 139],
        "darkgoldenrod": [184, 134, 11],
        "darkgray": [169, 169, 169],
        "darkgreen": [0, 100, 0],
        "darkgrey": [169, 169, 169],
        "darkkhaki": [189, 183, 107],
        "darkmagenta": [139, 0, 139],
        "darkolivegreen": [85, 107, 47],
        "darkorange": [255, 140, 0],
        "darkorchid": [153, 50, 204],
        "darkred": [139, 0, 0],
        "darksalmon": [233, 150, 122],
        "darkseagreen": [143, 188, 143],
        "darkslateblue": [72, 61, 139],
        "darkslategray": [47, 79, 79],
        "darkslategrey": [47, 79, 79],
        "darkturquoise": [0, 206, 209],
        "darkviolet": [148, 0, 211],
        "deeppink": [255, 20, 147],
        "deepskyblue": [0, 191, 255],
        "dimgray": [105, 105, 105],
        "dimgrey": [105, 105, 105],
        "dodgerblue": [30, 144, 255],
        "firebrick": [178, 34, 34],
        "floralwhite": [255, 250, 240],
        "forestgreen": [34, 139, 34],
        "fuchsia": [255, 0, 255],
        "gainsboro": [220, 220, 220],
        "ghostwhite": [248, 248, 255],
        "gold": [255, 215, 0],
        "goldenrod": [218, 165, 32],
        "gray": [128, 128, 128],
        "green": [0, 128, 0],
        "greenyellow": [173, 255, 47],
        "grey": [128, 128, 128],
        "honeydew": [240, 255, 240],
        "hotpink": [255, 105, 180],
        "indianred": [205, 92, 92],
        "indigo": [75, 0, 130],
        "ivory": [255, 255, 240],
        "khaki": [240, 230, 140],
        "lavender": [230, 230, 250],
        "lavenderblush": [255, 240, 245],
        "lawngreen": [124, 252, 0],
        "lemonchiffon": [255, 250, 205],
        "lightblue": [173, 216, 230],
        "lightcoral": [240, 128, 128],
        "lightcyan": [224, 255, 255],
        "lightgoldenrodyellow": [250, 250, 210],
        "lightgray": [211, 211, 211],
        "lightgreen": [144, 238, 144],
        "lightgrey": [211, 211, 211],
        "lightpink": [255, 182, 193],
        "lightsalmon": [255, 160, 122],
        "lightseagreen": [32, 178, 170],
        "lightskyblue": [135, 206, 250],
        "lightslategray": [119, 136, 153],
        "lightslategrey": [119, 136, 153],
        "lightsteelblue": [176, 196, 222],
        "lightyellow": [255, 255, 224],
        "lime": [0, 255, 0],
        "limegreen": [50, 205, 50],
        "linen": [250, 240, 230],
        "magenta": [255, 0, 255],
        "maroon": [128, 0, 0],
        "mediumaquamarine": [102, 205, 170],
        "mediumblue": [0, 0, 205],
        "mediumorchid": [186, 85, 211],
        "mediumpurple": [147, 112, 219],
        "mediumseagreen": [60, 179, 113],
        "mediumslateblue": [123, 104, 238],
        "mediumspringgreen": [0, 250, 154],
        "mediumturquoise": [72, 209, 204],
        "mediumvioletred": [199, 21, 133],
        "midnightblue": [25, 25, 112],
        "mintcream": [245, 255, 250],
        "mistyrose": [255, 228, 225],
        "moccasin": [255, 228, 181],
        "navajowhite": [255, 222, 173],
        "navy": [0, 0, 128],
        "oldlace": [253, 245, 230],
        "olive": [128, 128, 0],
        "olivedrab": [107, 142, 35],
        "orange": [255, 165, 0],
        "orangered": [255, 69, 0],
        "orchid": [218, 112, 214],
        "palegoldenrod": [238, 232, 170],
        "palegreen": [152, 251, 152],
        "paleturquoise": [175, 238, 238],
        "palevioletred": [219, 112, 147],
        "papayawhip": [255, 239, 213],
        "peachpuff": [255, 218, 185],
        "peru": [205, 133, 63],
        "pink": [255, 192, 203],
        "plum": [221, 160, 221],
        "powderblue": [176, 224, 230],
        "purple": [128, 0, 128],
        "rebeccapurple": [102, 51, 153],
        "red": [255, 0, 0],
        "rosybrown": [188, 143, 143],
        "royalblue": [65, 105, 225],
        "saddlebrown": [139, 69, 19],
        "salmon": [250, 128, 114],
        "sandybrown": [244, 164, 96],
        "seagreen": [46, 139, 87],
        "seashell": [255, 245, 238],
        "sienna": [160, 82, 45],
        "silver": [192, 192, 192],
        "skyblue": [135, 206, 235],
        "slateblue": [106, 90, 205],
        "slategray": [112, 128, 144],
        "slategrey": [112, 128, 144],
        "snow": [255, 250, 250],
        "springgreen": [0, 255, 127],
        "steelblue": [70, 130, 180],
        "tan": [210, 180, 140],
        "teal": [0, 128, 128],
        "thistle": [216, 191, 216],
        "tomato": [255, 99, 71],
        "turquoise": [64, 224, 208],
        "violet": [238, 130, 238],
        "wheat": [245, 222, 179],
        "white": [255, 255, 255],
        "whitesmoke": [245, 245, 245],
        "yellow": [255, 255, 0],
        "yellowgreen": [154, 205, 50]
      };
    }
  });

  // node_modules/.pnpm/color-convert@2.0.1/node_modules/color-convert/conversions.js
  var require_conversions = __commonJS({
    "node_modules/.pnpm/color-convert@2.0.1/node_modules/color-convert/conversions.js"(exports, module) {
      var cssKeywords = require_color_name();
      var reverseKeywords = {};
      for (const key of Object.keys(cssKeywords)) {
        reverseKeywords[cssKeywords[key]] = key;
      }
      var convert = {
        rgb: { channels: 3, labels: "rgb" },
        hsl: { channels: 3, labels: "hsl" },
        hsv: { channels: 3, labels: "hsv" },
        hwb: { channels: 3, labels: "hwb" },
        cmyk: { channels: 4, labels: "cmyk" },
        xyz: { channels: 3, labels: "xyz" },
        lab: { channels: 3, labels: "lab" },
        lch: { channels: 3, labels: "lch" },
        hex: { channels: 1, labels: ["hex"] },
        keyword: { channels: 1, labels: ["keyword"] },
        ansi16: { channels: 1, labels: ["ansi16"] },
        ansi256: { channels: 1, labels: ["ansi256"] },
        hcg: { channels: 3, labels: ["h", "c", "g"] },
        apple: { channels: 3, labels: ["r16", "g16", "b16"] },
        gray: { channels: 1, labels: ["gray"] }
      };
      module.exports = convert;
      for (const model of Object.keys(convert)) {
        if (!("channels" in convert[model])) {
          throw new Error("missing channels property: " + model);
        }
        if (!("labels" in convert[model])) {
          throw new Error("missing channel labels property: " + model);
        }
        if (convert[model].labels.length !== convert[model].channels) {
          throw new Error("channel and label counts mismatch: " + model);
        }
        const { channels, labels } = convert[model];
        delete convert[model].channels;
        delete convert[model].labels;
        Object.defineProperty(convert[model], "channels", { value: channels });
        Object.defineProperty(convert[model], "labels", { value: labels });
      }
      convert.rgb.hsl = function(rgb) {
        const r = rgb[0] / 255;
        const g2 = rgb[1] / 255;
        const b = rgb[2] / 255;
        const min = Math.min(r, g2, b);
        const max = Math.max(r, g2, b);
        const delta = max - min;
        let h;
        let s;
        if (max === min) {
          h = 0;
        } else if (r === max) {
          h = (g2 - b) / delta;
        } else if (g2 === max) {
          h = 2 + (b - r) / delta;
        } else if (b === max) {
          h = 4 + (r - g2) / delta;
        }
        h = Math.min(h * 60, 360);
        if (h < 0) {
          h += 360;
        }
        const l = (min + max) / 2;
        if (max === min) {
          s = 0;
        } else if (l <= 0.5) {
          s = delta / (max + min);
        } else {
          s = delta / (2 - max - min);
        }
        return [h, s * 100, l * 100];
      };
      convert.rgb.hsv = function(rgb) {
        let rdif;
        let gdif;
        let bdif;
        let h;
        let s;
        const r = rgb[0] / 255;
        const g2 = rgb[1] / 255;
        const b = rgb[2] / 255;
        const v = Math.max(r, g2, b);
        const diff = v - Math.min(r, g2, b);
        const diffc = function(c) {
          return (v - c) / 6 / diff + 1 / 2;
        };
        if (diff === 0) {
          h = 0;
          s = 0;
        } else {
          s = diff / v;
          rdif = diffc(r);
          gdif = diffc(g2);
          bdif = diffc(b);
          if (r === v) {
            h = bdif - gdif;
          } else if (g2 === v) {
            h = 1 / 3 + rdif - bdif;
          } else if (b === v) {
            h = 2 / 3 + gdif - rdif;
          }
          if (h < 0) {
            h += 1;
          } else if (h > 1) {
            h -= 1;
          }
        }
        return [
          h * 360,
          s * 100,
          v * 100
        ];
      };
      convert.rgb.hwb = function(rgb) {
        const r = rgb[0];
        const g2 = rgb[1];
        let b = rgb[2];
        const h = convert.rgb.hsl(rgb)[0];
        const w = 1 / 255 * Math.min(r, Math.min(g2, b));
        b = 1 - 1 / 255 * Math.max(r, Math.max(g2, b));
        return [h, w * 100, b * 100];
      };
      convert.rgb.cmyk = function(rgb) {
        const r = rgb[0] / 255;
        const g2 = rgb[1] / 255;
        const b = rgb[2] / 255;
        const k = Math.min(1 - r, 1 - g2, 1 - b);
        const c = (1 - r - k) / (1 - k) || 0;
        const m = (1 - g2 - k) / (1 - k) || 0;
        const y = (1 - b - k) / (1 - k) || 0;
        return [c * 100, m * 100, y * 100, k * 100];
      };
      function comparativeDistance(x, y) {
        return (x[0] - y[0]) ** 2 + (x[1] - y[1]) ** 2 + (x[2] - y[2]) ** 2;
      }
      convert.rgb.keyword = function(rgb) {
        const reversed = reverseKeywords[rgb];
        if (reversed) {
          return reversed;
        }
        let currentClosestDistance = Infinity;
        let currentClosestKeyword;
        for (const keyword of Object.keys(cssKeywords)) {
          const value = cssKeywords[keyword];
          const distance = comparativeDistance(rgb, value);
          if (distance < currentClosestDistance) {
            currentClosestDistance = distance;
            currentClosestKeyword = keyword;
          }
        }
        return currentClosestKeyword;
      };
      convert.keyword.rgb = function(keyword) {
        return cssKeywords[keyword];
      };
      convert.rgb.xyz = function(rgb) {
        let r = rgb[0] / 255;
        let g2 = rgb[1] / 255;
        let b = rgb[2] / 255;
        r = r > 0.04045 ? ((r + 0.055) / 1.055) ** 2.4 : r / 12.92;
        g2 = g2 > 0.04045 ? ((g2 + 0.055) / 1.055) ** 2.4 : g2 / 12.92;
        b = b > 0.04045 ? ((b + 0.055) / 1.055) ** 2.4 : b / 12.92;
        const x = r * 0.4124 + g2 * 0.3576 + b * 0.1805;
        const y = r * 0.2126 + g2 * 0.7152 + b * 0.0722;
        const z = r * 0.0193 + g2 * 0.1192 + b * 0.9505;
        return [x * 100, y * 100, z * 100];
      };
      convert.rgb.lab = function(rgb) {
        const xyz = convert.rgb.xyz(rgb);
        let x = xyz[0];
        let y = xyz[1];
        let z = xyz[2];
        x /= 95.047;
        y /= 100;
        z /= 108.883;
        x = x > 8856e-6 ? x ** (1 / 3) : 7.787 * x + 16 / 116;
        y = y > 8856e-6 ? y ** (1 / 3) : 7.787 * y + 16 / 116;
        z = z > 8856e-6 ? z ** (1 / 3) : 7.787 * z + 16 / 116;
        const l = 116 * y - 16;
        const a = 500 * (x - y);
        const b = 200 * (y - z);
        return [l, a, b];
      };
      convert.hsl.rgb = function(hsl) {
        const h = hsl[0] / 360;
        const s = hsl[1] / 100;
        const l = hsl[2] / 100;
        let t2;
        let t3;
        let val;
        if (s === 0) {
          val = l * 255;
          return [val, val, val];
        }
        if (l < 0.5) {
          t2 = l * (1 + s);
        } else {
          t2 = l + s - l * s;
        }
        const t1 = 2 * l - t2;
        const rgb = [0, 0, 0];
        for (let i = 0; i < 3; i++) {
          t3 = h + 1 / 3 * -(i - 1);
          if (t3 < 0) {
            t3++;
          }
          if (t3 > 1) {
            t3--;
          }
          if (6 * t3 < 1) {
            val = t1 + (t2 - t1) * 6 * t3;
          } else if (2 * t3 < 1) {
            val = t2;
          } else if (3 * t3 < 2) {
            val = t1 + (t2 - t1) * (2 / 3 - t3) * 6;
          } else {
            val = t1;
          }
          rgb[i] = val * 255;
        }
        return rgb;
      };
      convert.hsl.hsv = function(hsl) {
        const h = hsl[0];
        let s = hsl[1] / 100;
        let l = hsl[2] / 100;
        let smin = s;
        const lmin = Math.max(l, 0.01);
        l *= 2;
        s *= l <= 1 ? l : 2 - l;
        smin *= lmin <= 1 ? lmin : 2 - lmin;
        const v = (l + s) / 2;
        const sv = l === 0 ? 2 * smin / (lmin + smin) : 2 * s / (l + s);
        return [h, sv * 100, v * 100];
      };
      convert.hsv.rgb = function(hsv) {
        const h = hsv[0] / 60;
        const s = hsv[1] / 100;
        let v = hsv[2] / 100;
        const hi = Math.floor(h) % 6;
        const f = h - Math.floor(h);
        const p = 255 * v * (1 - s);
        const q = 255 * v * (1 - s * f);
        const t = 255 * v * (1 - s * (1 - f));
        v *= 255;
        switch (hi) {
          case 0:
            return [v, t, p];
          case 1:
            return [q, v, p];
          case 2:
            return [p, v, t];
          case 3:
            return [p, q, v];
          case 4:
            return [t, p, v];
          case 5:
            return [v, p, q];
        }
      };
      convert.hsv.hsl = function(hsv) {
        const h = hsv[0];
        const s = hsv[1] / 100;
        const v = hsv[2] / 100;
        const vmin = Math.max(v, 0.01);
        let sl;
        let l;
        l = (2 - s) * v;
        const lmin = (2 - s) * vmin;
        sl = s * vmin;
        sl /= lmin <= 1 ? lmin : 2 - lmin;
        sl = sl || 0;
        l /= 2;
        return [h, sl * 100, l * 100];
      };
      convert.hwb.rgb = function(hwb) {
        const h = hwb[0] / 360;
        let wh = hwb[1] / 100;
        let bl = hwb[2] / 100;
        const ratio = wh + bl;
        let f;
        if (ratio > 1) {
          wh /= ratio;
          bl /= ratio;
        }
        const i = Math.floor(6 * h);
        const v = 1 - bl;
        f = 6 * h - i;
        if ((i & 1) !== 0) {
          f = 1 - f;
        }
        const n = wh + f * (v - wh);
        let r;
        let g2;
        let b;
        switch (i) {
          default:
          case 6:
          case 0:
            r = v;
            g2 = n;
            b = wh;
            break;
          case 1:
            r = n;
            g2 = v;
            b = wh;
            break;
          case 2:
            r = wh;
            g2 = v;
            b = n;
            break;
          case 3:
            r = wh;
            g2 = n;
            b = v;
            break;
          case 4:
            r = n;
            g2 = wh;
            b = v;
            break;
          case 5:
            r = v;
            g2 = wh;
            b = n;
            break;
        }
        return [r * 255, g2 * 255, b * 255];
      };
      convert.cmyk.rgb = function(cmyk) {
        const c = cmyk[0] / 100;
        const m = cmyk[1] / 100;
        const y = cmyk[2] / 100;
        const k = cmyk[3] / 100;
        const r = 1 - Math.min(1, c * (1 - k) + k);
        const g2 = 1 - Math.min(1, m * (1 - k) + k);
        const b = 1 - Math.min(1, y * (1 - k) + k);
        return [r * 255, g2 * 255, b * 255];
      };
      convert.xyz.rgb = function(xyz) {
        const x = xyz[0] / 100;
        const y = xyz[1] / 100;
        const z = xyz[2] / 100;
        let r;
        let g2;
        let b;
        r = x * 3.2406 + y * -1.5372 + z * -0.4986;
        g2 = x * -0.9689 + y * 1.8758 + z * 0.0415;
        b = x * 0.0557 + y * -0.204 + z * 1.057;
        r = r > 31308e-7 ? 1.055 * r ** (1 / 2.4) - 0.055 : r * 12.92;
        g2 = g2 > 31308e-7 ? 1.055 * g2 ** (1 / 2.4) - 0.055 : g2 * 12.92;
        b = b > 31308e-7 ? 1.055 * b ** (1 / 2.4) - 0.055 : b * 12.92;
        r = Math.min(Math.max(0, r), 1);
        g2 = Math.min(Math.max(0, g2), 1);
        b = Math.min(Math.max(0, b), 1);
        return [r * 255, g2 * 255, b * 255];
      };
      convert.xyz.lab = function(xyz) {
        let x = xyz[0];
        let y = xyz[1];
        let z = xyz[2];
        x /= 95.047;
        y /= 100;
        z /= 108.883;
        x = x > 8856e-6 ? x ** (1 / 3) : 7.787 * x + 16 / 116;
        y = y > 8856e-6 ? y ** (1 / 3) : 7.787 * y + 16 / 116;
        z = z > 8856e-6 ? z ** (1 / 3) : 7.787 * z + 16 / 116;
        const l = 116 * y - 16;
        const a = 500 * (x - y);
        const b = 200 * (y - z);
        return [l, a, b];
      };
      convert.lab.xyz = function(lab) {
        const l = lab[0];
        const a = lab[1];
        const b = lab[2];
        let x;
        let y;
        let z;
        y = (l + 16) / 116;
        x = a / 500 + y;
        z = y - b / 200;
        const y2 = y ** 3;
        const x2 = x ** 3;
        const z2 = z ** 3;
        y = y2 > 8856e-6 ? y2 : (y - 16 / 116) / 7.787;
        x = x2 > 8856e-6 ? x2 : (x - 16 / 116) / 7.787;
        z = z2 > 8856e-6 ? z2 : (z - 16 / 116) / 7.787;
        x *= 95.047;
        y *= 100;
        z *= 108.883;
        return [x, y, z];
      };
      convert.lab.lch = function(lab) {
        const l = lab[0];
        const a = lab[1];
        const b = lab[2];
        let h;
        const hr = Math.atan2(b, a);
        h = hr * 360 / 2 / Math.PI;
        if (h < 0) {
          h += 360;
        }
        const c = Math.sqrt(a * a + b * b);
        return [l, c, h];
      };
      convert.lch.lab = function(lch) {
        const l = lch[0];
        const c = lch[1];
        const h = lch[2];
        const hr = h / 360 * 2 * Math.PI;
        const a = c * Math.cos(hr);
        const b = c * Math.sin(hr);
        return [l, a, b];
      };
      convert.rgb.ansi16 = function(args, saturation = null) {
        const [r, g2, b] = args;
        let value = saturation === null ? convert.rgb.hsv(args)[2] : saturation;
        value = Math.round(value / 50);
        if (value === 0) {
          return 30;
        }
        let ansi = 30 + (Math.round(b / 255) << 2 | Math.round(g2 / 255) << 1 | Math.round(r / 255));
        if (value === 2) {
          ansi += 60;
        }
        return ansi;
      };
      convert.hsv.ansi16 = function(args) {
        return convert.rgb.ansi16(convert.hsv.rgb(args), args[2]);
      };
      convert.rgb.ansi256 = function(args) {
        const r = args[0];
        const g2 = args[1];
        const b = args[2];
        if (r === g2 && g2 === b) {
          if (r < 8) {
            return 16;
          }
          if (r > 248) {
            return 231;
          }
          return Math.round((r - 8) / 247 * 24) + 232;
        }
        const ansi = 16 + 36 * Math.round(r / 255 * 5) + 6 * Math.round(g2 / 255 * 5) + Math.round(b / 255 * 5);
        return ansi;
      };
      convert.ansi16.rgb = function(args) {
        let color = args % 10;
        if (color === 0 || color === 7) {
          if (args > 50) {
            color += 3.5;
          }
          color = color / 10.5 * 255;
          return [color, color, color];
        }
        const mult = (~~(args > 50) + 1) * 0.5;
        const r = (color & 1) * mult * 255;
        const g2 = (color >> 1 & 1) * mult * 255;
        const b = (color >> 2 & 1) * mult * 255;
        return [r, g2, b];
      };
      convert.ansi256.rgb = function(args) {
        if (args >= 232) {
          const c = (args - 232) * 10 + 8;
          return [c, c, c];
        }
        args -= 16;
        let rem;
        const r = Math.floor(args / 36) / 5 * 255;
        const g2 = Math.floor((rem = args % 36) / 6) / 5 * 255;
        const b = rem % 6 / 5 * 255;
        return [r, g2, b];
      };
      convert.rgb.hex = function(args) {
        const integer = ((Math.round(args[0]) & 255) << 16) + ((Math.round(args[1]) & 255) << 8) + (Math.round(args[2]) & 255);
        const string = integer.toString(16).toUpperCase();
        return "000000".substring(string.length) + string;
      };
      convert.hex.rgb = function(args) {
        const match = args.toString(16).match(/[a-f0-9]{6}|[a-f0-9]{3}/i);
        if (!match) {
          return [0, 0, 0];
        }
        let colorString = match[0];
        if (match[0].length === 3) {
          colorString = colorString.split("").map((char) => {
            return char + char;
          }).join("");
        }
        const integer = parseInt(colorString, 16);
        const r = integer >> 16 & 255;
        const g2 = integer >> 8 & 255;
        const b = integer & 255;
        return [r, g2, b];
      };
      convert.rgb.hcg = function(rgb) {
        const r = rgb[0] / 255;
        const g2 = rgb[1] / 255;
        const b = rgb[2] / 255;
        const max = Math.max(Math.max(r, g2), b);
        const min = Math.min(Math.min(r, g2), b);
        const chroma = max - min;
        let grayscale;
        let hue;
        if (chroma < 1) {
          grayscale = min / (1 - chroma);
        } else {
          grayscale = 0;
        }
        if (chroma <= 0) {
          hue = 0;
        } else if (max === r) {
          hue = (g2 - b) / chroma % 6;
        } else if (max === g2) {
          hue = 2 + (b - r) / chroma;
        } else {
          hue = 4 + (r - g2) / chroma;
        }
        hue /= 6;
        hue %= 1;
        return [hue * 360, chroma * 100, grayscale * 100];
      };
      convert.hsl.hcg = function(hsl) {
        const s = hsl[1] / 100;
        const l = hsl[2] / 100;
        const c = l < 0.5 ? 2 * s * l : 2 * s * (1 - l);
        let f = 0;
        if (c < 1) {
          f = (l - 0.5 * c) / (1 - c);
        }
        return [hsl[0], c * 100, f * 100];
      };
      convert.hsv.hcg = function(hsv) {
        const s = hsv[1] / 100;
        const v = hsv[2] / 100;
        const c = s * v;
        let f = 0;
        if (c < 1) {
          f = (v - c) / (1 - c);
        }
        return [hsv[0], c * 100, f * 100];
      };
      convert.hcg.rgb = function(hcg) {
        const h = hcg[0] / 360;
        const c = hcg[1] / 100;
        const g2 = hcg[2] / 100;
        if (c === 0) {
          return [g2 * 255, g2 * 255, g2 * 255];
        }
        const pure = [0, 0, 0];
        const hi = h % 1 * 6;
        const v = hi % 1;
        const w = 1 - v;
        let mg = 0;
        switch (Math.floor(hi)) {
          case 0:
            pure[0] = 1;
            pure[1] = v;
            pure[2] = 0;
            break;
          case 1:
            pure[0] = w;
            pure[1] = 1;
            pure[2] = 0;
            break;
          case 2:
            pure[0] = 0;
            pure[1] = 1;
            pure[2] = v;
            break;
          case 3:
            pure[0] = 0;
            pure[1] = w;
            pure[2] = 1;
            break;
          case 4:
            pure[0] = v;
            pure[1] = 0;
            pure[2] = 1;
            break;
          default:
            pure[0] = 1;
            pure[1] = 0;
            pure[2] = w;
        }
        mg = (1 - c) * g2;
        return [
          (c * pure[0] + mg) * 255,
          (c * pure[1] + mg) * 255,
          (c * pure[2] + mg) * 255
        ];
      };
      convert.hcg.hsv = function(hcg) {
        const c = hcg[1] / 100;
        const g2 = hcg[2] / 100;
        const v = c + g2 * (1 - c);
        let f = 0;
        if (v > 0) {
          f = c / v;
        }
        return [hcg[0], f * 100, v * 100];
      };
      convert.hcg.hsl = function(hcg) {
        const c = hcg[1] / 100;
        const g2 = hcg[2] / 100;
        const l = g2 * (1 - c) + 0.5 * c;
        let s = 0;
        if (l > 0 && l < 0.5) {
          s = c / (2 * l);
        } else if (l >= 0.5 && l < 1) {
          s = c / (2 * (1 - l));
        }
        return [hcg[0], s * 100, l * 100];
      };
      convert.hcg.hwb = function(hcg) {
        const c = hcg[1] / 100;
        const g2 = hcg[2] / 100;
        const v = c + g2 * (1 - c);
        return [hcg[0], (v - c) * 100, (1 - v) * 100];
      };
      convert.hwb.hcg = function(hwb) {
        const w = hwb[1] / 100;
        const b = hwb[2] / 100;
        const v = 1 - b;
        const c = v - w;
        let g2 = 0;
        if (c < 1) {
          g2 = (v - c) / (1 - c);
        }
        return [hwb[0], c * 100, g2 * 100];
      };
      convert.apple.rgb = function(apple) {
        return [apple[0] / 65535 * 255, apple[1] / 65535 * 255, apple[2] / 65535 * 255];
      };
      convert.rgb.apple = function(rgb) {
        return [rgb[0] / 255 * 65535, rgb[1] / 255 * 65535, rgb[2] / 255 * 65535];
      };
      convert.gray.rgb = function(args) {
        return [args[0] / 100 * 255, args[0] / 100 * 255, args[0] / 100 * 255];
      };
      convert.gray.hsl = function(args) {
        return [0, 0, args[0]];
      };
      convert.gray.hsv = convert.gray.hsl;
      convert.gray.hwb = function(gray) {
        return [0, 100, gray[0]];
      };
      convert.gray.cmyk = function(gray) {
        return [0, 0, 0, gray[0]];
      };
      convert.gray.lab = function(gray) {
        return [gray[0], 0, 0];
      };
      convert.gray.hex = function(gray) {
        const val = Math.round(gray[0] / 100 * 255) & 255;
        const integer = (val << 16) + (val << 8) + val;
        const string = integer.toString(16).toUpperCase();
        return "000000".substring(string.length) + string;
      };
      convert.rgb.gray = function(rgb) {
        const val = (rgb[0] + rgb[1] + rgb[2]) / 3;
        return [val / 255 * 100];
      };
    }
  });

  // node_modules/.pnpm/color-convert@2.0.1/node_modules/color-convert/route.js
  var require_route = __commonJS({
    "node_modules/.pnpm/color-convert@2.0.1/node_modules/color-convert/route.js"(exports, module) {
      var conversions = require_conversions();
      function buildGraph() {
        const graph = {};
        const models = Object.keys(conversions);
        for (let len = models.length, i = 0; i < len; i++) {
          graph[models[i]] = {
            // http://jsperf.com/1-vs-infinity
            // micro-opt, but this is simple.
            distance: -1,
            parent: null
          };
        }
        return graph;
      }
      function deriveBFS(fromModel) {
        const graph = buildGraph();
        const queue = [fromModel];
        graph[fromModel].distance = 0;
        while (queue.length) {
          const current = queue.pop();
          const adjacents = Object.keys(conversions[current]);
          for (let len = adjacents.length, i = 0; i < len; i++) {
            const adjacent = adjacents[i];
            const node = graph[adjacent];
            if (node.distance === -1) {
              node.distance = graph[current].distance + 1;
              node.parent = current;
              queue.unshift(adjacent);
            }
          }
        }
        return graph;
      }
      function link(from, to) {
        return function(args) {
          return to(from(args));
        };
      }
      function wrapConversion(toModel, graph) {
        const path2 = [graph[toModel].parent, toModel];
        let fn = conversions[graph[toModel].parent][toModel];
        let cur = graph[toModel].parent;
        while (graph[cur].parent) {
          path2.unshift(graph[cur].parent);
          fn = link(conversions[graph[cur].parent][cur], fn);
          cur = graph[cur].parent;
        }
        fn.conversion = path2;
        return fn;
      }
      module.exports = function(fromModel) {
        const graph = deriveBFS(fromModel);
        const conversion = {};
        const models = Object.keys(graph);
        for (let len = models.length, i = 0; i < len; i++) {
          const toModel = models[i];
          const node = graph[toModel];
          if (node.parent === null) {
            continue;
          }
          conversion[toModel] = wrapConversion(toModel, graph);
        }
        return conversion;
      };
    }
  });

  // node_modules/.pnpm/color-convert@2.0.1/node_modules/color-convert/index.js
  var require_color_convert = __commonJS({
    "node_modules/.pnpm/color-convert@2.0.1/node_modules/color-convert/index.js"(exports, module) {
      var conversions = require_conversions();
      var route = require_route();
      var convert = {};
      var models = Object.keys(conversions);
      function wrapRaw(fn) {
        const wrappedFn = function(...args) {
          const arg0 = args[0];
          if (arg0 === void 0 || arg0 === null) {
            return arg0;
          }
          if (arg0.length > 1) {
            args = arg0;
          }
          return fn(args);
        };
        if ("conversion" in fn) {
          wrappedFn.conversion = fn.conversion;
        }
        return wrappedFn;
      }
      function wrapRounded(fn) {
        const wrappedFn = function(...args) {
          const arg0 = args[0];
          if (arg0 === void 0 || arg0 === null) {
            return arg0;
          }
          if (arg0.length > 1) {
            args = arg0;
          }
          const result = fn(args);
          if (typeof result === "object") {
            for (let len = result.length, i = 0; i < len; i++) {
              result[i] = Math.round(result[i]);
            }
          }
          return result;
        };
        if ("conversion" in fn) {
          wrappedFn.conversion = fn.conversion;
        }
        return wrappedFn;
      }
      models.forEach((fromModel) => {
        convert[fromModel] = {};
        Object.defineProperty(convert[fromModel], "channels", { value: conversions[fromModel].channels });
        Object.defineProperty(convert[fromModel], "labels", { value: conversions[fromModel].labels });
        const routes = route(fromModel);
        const routeModels = Object.keys(routes);
        routeModels.forEach((toModel) => {
          const fn = routes[toModel];
          convert[fromModel][toModel] = wrapRounded(fn);
          convert[fromModel][toModel].raw = wrapRaw(fn);
        });
      });
      module.exports = convert;
    }
  });

  // node_modules/.pnpm/ansi-styles@4.3.0/node_modules/ansi-styles/index.js
  var require_ansi_styles = __commonJS({
    "node_modules/.pnpm/ansi-styles@4.3.0/node_modules/ansi-styles/index.js"(exports, module) {
      "use strict";
      var wrapAnsi162 = (fn, offset) => (...args) => {
        const code = fn(...args);
        return `\x1B[${code + offset}m`;
      };
      var wrapAnsi2562 = (fn, offset) => (...args) => {
        const code = fn(...args);
        return `\x1B[${38 + offset};5;${code}m`;
      };
      var wrapAnsi16m2 = (fn, offset) => (...args) => {
        const rgb = fn(...args);
        return `\x1B[${38 + offset};2;${rgb[0]};${rgb[1]};${rgb[2]}m`;
      };
      var ansi2ansi = (n) => n;
      var rgb2rgb = (r, g2, b) => [r, g2, b];
      var setLazyProperty = (object, property, get4) => {
        Object.defineProperty(object, property, {
          get: () => {
            const value = get4();
            Object.defineProperty(object, property, {
              value,
              enumerable: true,
              configurable: true
            });
            return value;
          },
          enumerable: true,
          configurable: true
        });
      };
      var colorConvert;
      var makeDynamicStyles = (wrap, targetSpace, identity, isBackground) => {
        if (colorConvert === void 0) {
          colorConvert = require_color_convert();
        }
        const offset = isBackground ? 10 : 0;
        const styles3 = {};
        for (const [sourceSpace, suite] of Object.entries(colorConvert)) {
          const name = sourceSpace === "ansi16" ? "ansi" : sourceSpace;
          if (sourceSpace === targetSpace) {
            styles3[name] = wrap(identity, offset);
          } else if (typeof suite === "object") {
            styles3[name] = wrap(suite[targetSpace], offset);
          }
        }
        return styles3;
      };
      function assembleStyles2() {
        const codes = /* @__PURE__ */ new Map();
        const styles3 = {
          modifier: {
            reset: [0, 0],
            // 21 isn't widely supported and 22 does the same thing
            bold: [1, 22],
            dim: [2, 22],
            italic: [3, 23],
            underline: [4, 24],
            inverse: [7, 27],
            hidden: [8, 28],
            strikethrough: [9, 29]
          },
          color: {
            black: [30, 39],
            red: [31, 39],
            green: [32, 39],
            yellow: [33, 39],
            blue: [34, 39],
            magenta: [35, 39],
            cyan: [36, 39],
            white: [37, 39],
            // Bright color
            blackBright: [90, 39],
            redBright: [91, 39],
            greenBright: [92, 39],
            yellowBright: [93, 39],
            blueBright: [94, 39],
            magentaBright: [95, 39],
            cyanBright: [96, 39],
            whiteBright: [97, 39]
          },
          bgColor: {
            bgBlack: [40, 49],
            bgRed: [41, 49],
            bgGreen: [42, 49],
            bgYellow: [43, 49],
            bgBlue: [44, 49],
            bgMagenta: [45, 49],
            bgCyan: [46, 49],
            bgWhite: [47, 49],
            // Bright color
            bgBlackBright: [100, 49],
            bgRedBright: [101, 49],
            bgGreenBright: [102, 49],
            bgYellowBright: [103, 49],
            bgBlueBright: [104, 49],
            bgMagentaBright: [105, 49],
            bgCyanBright: [106, 49],
            bgWhiteBright: [107, 49]
          }
        };
        styles3.color.gray = styles3.color.blackBright;
        styles3.bgColor.bgGray = styles3.bgColor.bgBlackBright;
        styles3.color.grey = styles3.color.blackBright;
        styles3.bgColor.bgGrey = styles3.bgColor.bgBlackBright;
        for (const [groupName, group] of Object.entries(styles3)) {
          for (const [styleName, style] of Object.entries(group)) {
            styles3[styleName] = {
              open: `\x1B[${style[0]}m`,
              close: `\x1B[${style[1]}m`
            };
            group[styleName] = styles3[styleName];
            codes.set(style[0], style[1]);
          }
          Object.defineProperty(styles3, groupName, {
            value: group,
            enumerable: false
          });
        }
        Object.defineProperty(styles3, "codes", {
          value: codes,
          enumerable: false
        });
        styles3.color.close = "\x1B[39m";
        styles3.bgColor.close = "\x1B[49m";
        setLazyProperty(styles3.color, "ansi", () => makeDynamicStyles(wrapAnsi162, "ansi16", ansi2ansi, false));
        setLazyProperty(styles3.color, "ansi256", () => makeDynamicStyles(wrapAnsi2562, "ansi256", ansi2ansi, false));
        setLazyProperty(styles3.color, "ansi16m", () => makeDynamicStyles(wrapAnsi16m2, "rgb", rgb2rgb, false));
        setLazyProperty(styles3.bgColor, "ansi", () => makeDynamicStyles(wrapAnsi162, "ansi16", ansi2ansi, true));
        setLazyProperty(styles3.bgColor, "ansi256", () => makeDynamicStyles(wrapAnsi2562, "ansi256", ansi2ansi, true));
        setLazyProperty(styles3.bgColor, "ansi16m", () => makeDynamicStyles(wrapAnsi16m2, "rgb", rgb2rgb, true));
        return styles3;
      }
      Object.defineProperty(module, "exports", {
        enumerable: true,
        get: assembleStyles2
      });
    }
  });

  // node_modules/.pnpm/has-flag@4.0.0/node_modules/has-flag/index.js
  var require_has_flag = __commonJS({
    "node_modules/.pnpm/has-flag@4.0.0/node_modules/has-flag/index.js"(exports, module) {
      "use strict";
      module.exports = (flag, argv = process.argv) => {
        const prefix = flag.startsWith("-") ? "" : flag.length === 1 ? "-" : "--";
        const position = argv.indexOf(prefix + flag);
        const terminatorPosition = argv.indexOf("--");
        return position !== -1 && (terminatorPosition === -1 || position < terminatorPosition);
      };
    }
  });

  // node_modules/.pnpm/supports-color@7.2.0/node_modules/supports-color/index.js
  var require_supports_color = __commonJS({
    "node_modules/.pnpm/supports-color@7.2.0/node_modules/supports-color/index.js"(exports, module) {
      "use strict";
      var os3 = __require("os");
      var tty2 = __require("tty");
      var hasFlag2 = require_has_flag();
      var { env: env2 } = process;
      var forceColor;
      if (hasFlag2("no-color") || hasFlag2("no-colors") || hasFlag2("color=false") || hasFlag2("color=never")) {
        forceColor = 0;
      } else if (hasFlag2("color") || hasFlag2("colors") || hasFlag2("color=true") || hasFlag2("color=always")) {
        forceColor = 1;
      }
      if ("FORCE_COLOR" in env2) {
        if (env2.FORCE_COLOR === "true") {
          forceColor = 1;
        } else if (env2.FORCE_COLOR === "false") {
          forceColor = 0;
        } else {
          forceColor = env2.FORCE_COLOR.length === 0 ? 1 : Math.min(parseInt(env2.FORCE_COLOR, 10), 3);
        }
      }
      function translateLevel2(level) {
        if (level === 0) {
          return false;
        }
        return {
          level,
          hasBasic: true,
          has256: level >= 2,
          has16m: level >= 3
        };
      }
      function supportsColor2(haveStream, streamIsTTY) {
        if (forceColor === 0) {
          return 0;
        }
        if (hasFlag2("color=16m") || hasFlag2("color=full") || hasFlag2("color=truecolor")) {
          return 3;
        }
        if (hasFlag2("color=256")) {
          return 2;
        }
        if (haveStream && !streamIsTTY && forceColor === void 0) {
          return 0;
        }
        const min = forceColor || 0;
        if (env2.TERM === "dumb") {
          return min;
        }
        if (process.platform === "win32") {
          const osRelease = os3.release().split(".");
          if (Number(osRelease[0]) >= 10 && Number(osRelease[2]) >= 10586) {
            return Number(osRelease[2]) >= 14931 ? 3 : 2;
          }
          return 1;
        }
        if ("CI" in env2) {
          if (["TRAVIS", "CIRCLECI", "APPVEYOR", "GITLAB_CI", "GITHUB_ACTIONS", "BUILDKITE"].some((sign) => sign in env2) || env2.CI_NAME === "codeship") {
            return 1;
          }
          return min;
        }
        if ("TEAMCITY_VERSION" in env2) {
          return /^(9\.(0*[1-9]\d*)\.|\d{2,}\.)/.test(env2.TEAMCITY_VERSION) ? 1 : 0;
        }
        if (env2.COLORTERM === "truecolor") {
          return 3;
        }
        if ("TERM_PROGRAM" in env2) {
          const version = parseInt((env2.TERM_PROGRAM_VERSION || "").split(".")[0], 10);
          switch (env2.TERM_PROGRAM) {
            case "iTerm.app":
              return version >= 3 ? 3 : 2;
            case "Apple_Terminal":
              return 2;
          }
        }
        if (/-256(color)?$/i.test(env2.TERM)) {
          return 2;
        }
        if (/^screen|^xterm|^vt100|^vt220|^rxvt|color|ansi|cygwin|linux/i.test(env2.TERM)) {
          return 1;
        }
        if ("COLORTERM" in env2) {
          return 1;
        }
        return min;
      }
      function getSupportLevel(stream) {
        const level = supportsColor2(stream, stream && stream.isTTY);
        return translateLevel2(level);
      }
      module.exports = {
        supportsColor: getSupportLevel,
        stdout: translateLevel2(supportsColor2(true, tty2.isatty(1))),
        stderr: translateLevel2(supportsColor2(true, tty2.isatty(2)))
      };
    }
  });

  // node_modules/.pnpm/chalk@4.0.0/node_modules/chalk/source/util.js
  var require_util = __commonJS({
    "node_modules/.pnpm/chalk@4.0.0/node_modules/chalk/source/util.js"(exports, module) {
      "use strict";
      var stringReplaceAll2 = (string, substring, replacer) => {
        let index = string.indexOf(substring);
        if (index === -1) {
          return string;
        }
        const substringLength = substring.length;
        let endIndex = 0;
        let returnValue = "";
        do {
          returnValue += string.substr(endIndex, index - endIndex) + substring + replacer;
          endIndex = index + substringLength;
          index = string.indexOf(substring, endIndex);
        } while (index !== -1);
        returnValue += string.substr(endIndex);
        return returnValue;
      };
      var stringEncaseCRLFWithFirstIndex2 = (string, prefix, postfix, index) => {
        let endIndex = 0;
        let returnValue = "";
        do {
          const gotCR = string[index - 1] === "\r";
          returnValue += string.substr(endIndex, (gotCR ? index - 1 : index) - endIndex) + prefix + (gotCR ? "\r\n" : "\n") + postfix;
          endIndex = index + 1;
          index = string.indexOf("\n", endIndex);
        } while (index !== -1);
        returnValue += string.substr(endIndex);
        return returnValue;
      };
      module.exports = {
        stringReplaceAll: stringReplaceAll2,
        stringEncaseCRLFWithFirstIndex: stringEncaseCRLFWithFirstIndex2
      };
    }
  });

  // node_modules/.pnpm/chalk@4.0.0/node_modules/chalk/source/templates.js
  var require_templates = __commonJS({
    "node_modules/.pnpm/chalk@4.0.0/node_modules/chalk/source/templates.js"(exports, module) {
      "use strict";
      var TEMPLATE_REGEX = /(?:\\(u(?:[a-f\d]{4}|\{[a-f\d]{1,6}\})|x[a-f\d]{2}|.))|(?:\{(~)?(\w+(?:\([^)]*\))?(?:\.\w+(?:\([^)]*\))?)*)(?:[ \t]|(?=\r?\n)))|(\})|((?:.|[\r\n\f])+?)/gi;
      var STYLE_REGEX = /(?:^|\.)(\w+)(?:\(([^)]*)\))?/g;
      var STRING_REGEX = /^(['"])((?:\\.|(?!\1)[^\\])*)\1$/;
      var ESCAPE_REGEX = /\\(u(?:[a-f\d]{4}|{[a-f\d]{1,6}})|x[a-f\d]{2}|.)|([^\\])/gi;
      var ESCAPES = /* @__PURE__ */ new Map([
        ["n", "\n"],
        ["r", "\r"],
        ["t", "	"],
        ["b", "\b"],
        ["f", "\f"],
        ["v", "\v"],
        ["0", "\0"],
        ["\\", "\\"],
        ["e", "\x1B"],
        ["a", "\x07"]
      ]);
      function unescape(c) {
        const u = c[0] === "u";
        const bracket = c[1] === "{";
        if (u && !bracket && c.length === 5 || c[0] === "x" && c.length === 3) {
          return String.fromCharCode(parseInt(c.slice(1), 16));
        }
        if (u && bracket) {
          return String.fromCodePoint(parseInt(c.slice(2, -1), 16));
        }
        return ESCAPES.get(c) || c;
      }
      function parseArguments(name, arguments_) {
        const results = [];
        const chunks = arguments_.trim().split(/\s*,\s*/g);
        let matches;
        for (const chunk of chunks) {
          const number = Number(chunk);
          if (!Number.isNaN(number)) {
            results.push(number);
          } else if (matches = chunk.match(STRING_REGEX)) {
            results.push(matches[2].replace(ESCAPE_REGEX, (m, escape, character) => escape ? unescape(escape) : character));
          } else {
            throw new Error(`Invalid Chalk template style argument: ${chunk} (in style '${name}')`);
          }
        }
        return results;
      }
      function parseStyle(style) {
        STYLE_REGEX.lastIndex = 0;
        const results = [];
        let matches;
        while ((matches = STYLE_REGEX.exec(style)) !== null) {
          const name = matches[1];
          if (matches[2]) {
            const args = parseArguments(name, matches[2]);
            results.push([name].concat(args));
          } else {
            results.push([name]);
          }
        }
        return results;
      }
      function buildStyle(chalk4, styles3) {
        const enabled = {};
        for (const layer of styles3) {
          for (const style of layer.styles) {
            enabled[style[0]] = layer.inverse ? null : style.slice(1);
          }
        }
        let current = chalk4;
        for (const [styleName, styles4] of Object.entries(enabled)) {
          if (!Array.isArray(styles4)) {
            continue;
          }
          if (!(styleName in current)) {
            throw new Error(`Unknown Chalk style: ${styleName}`);
          }
          current = styles4.length > 0 ? current[styleName](...styles4) : current[styleName];
        }
        return current;
      }
      module.exports = (chalk4, temporary) => {
        const styles3 = [];
        const chunks = [];
        let chunk = [];
        temporary.replace(TEMPLATE_REGEX, (m, escapeCharacter, inverse, style, close, character) => {
          if (escapeCharacter) {
            chunk.push(unescape(escapeCharacter));
          } else if (style) {
            const string = chunk.join("");
            chunk = [];
            chunks.push(styles3.length === 0 ? string : buildStyle(chalk4, styles3)(string));
            styles3.push({ inverse, styles: parseStyle(style) });
          } else if (close) {
            if (styles3.length === 0) {
              throw new Error("Found extraneous } in Chalk template literal");
            }
            chunks.push(buildStyle(chalk4, styles3)(chunk.join("")));
            chunk = [];
            styles3.pop();
          } else {
            chunk.push(character);
          }
        });
        chunks.push(chunk.join(""));
        if (styles3.length > 0) {
          const errMessage = `Chalk template literal is missing ${styles3.length} closing bracket${styles3.length === 1 ? "" : "s"} (\`}\`)`;
          throw new Error(errMessage);
        }
        return chunks.join("");
      };
    }
  });

  // node_modules/.pnpm/chalk@4.0.0/node_modules/chalk/source/index.js
  var require_source = __commonJS({
    "node_modules/.pnpm/chalk@4.0.0/node_modules/chalk/source/index.js"(exports, module) {
      "use strict";
      var ansiStyles2 = require_ansi_styles();
      var { stdout: stdoutColor2, stderr: stderrColor2 } = require_supports_color();
      var {
        stringReplaceAll: stringReplaceAll2,
        stringEncaseCRLFWithFirstIndex: stringEncaseCRLFWithFirstIndex2
      } = require_util();
      var levelMapping2 = [
        "ansi",
        "ansi",
        "ansi256",
        "ansi16m"
      ];
      var styles3 = /* @__PURE__ */ Object.create(null);
      var applyOptions2 = (object, options = {}) => {
        if (options.level && !(Number.isInteger(options.level) && options.level >= 0 && options.level <= 3)) {
          throw new Error("The `level` option should be an integer from 0 to 3");
        }
        const colorLevel = stdoutColor2 ? stdoutColor2.level : 0;
        object.level = options.level === void 0 ? colorLevel : options.level;
      };
      var ChalkClass = class {
        constructor(options) {
          return chalkFactory2(options);
        }
      };
      var chalkFactory2 = (options) => {
        const chalk5 = {};
        applyOptions2(chalk5, options);
        chalk5.template = (...arguments_) => chalkTag(chalk5.template, ...arguments_);
        Object.setPrototypeOf(chalk5, Chalk.prototype);
        Object.setPrototypeOf(chalk5.template, chalk5);
        chalk5.template.constructor = () => {
          throw new Error("`chalk.constructor()` is deprecated. Use `new chalk.Instance()` instead.");
        };
        chalk5.template.Instance = ChalkClass;
        return chalk5.template;
      };
      function Chalk(options) {
        return chalkFactory2(options);
      }
      for (const [styleName, style] of Object.entries(ansiStyles2)) {
        styles3[styleName] = {
          get() {
            const builder = createBuilder2(this, createStyler2(style.open, style.close, this._styler), this._isEmpty);
            Object.defineProperty(this, styleName, { value: builder });
            return builder;
          }
        };
      }
      styles3.visible = {
        get() {
          const builder = createBuilder2(this, this._styler, true);
          Object.defineProperty(this, "visible", { value: builder });
          return builder;
        }
      };
      var usedModels2 = ["rgb", "hex", "keyword", "hsl", "hsv", "hwb", "ansi", "ansi256"];
      for (const model of usedModels2) {
        styles3[model] = {
          get() {
            const { level } = this;
            return function(...arguments_) {
              const styler = createStyler2(ansiStyles2.color[levelMapping2[level]][model](...arguments_), ansiStyles2.color.close, this._styler);
              return createBuilder2(this, styler, this._isEmpty);
            };
          }
        };
      }
      for (const model of usedModels2) {
        const bgModel = "bg" + model[0].toUpperCase() + model.slice(1);
        styles3[bgModel] = {
          get() {
            const { level } = this;
            return function(...arguments_) {
              const styler = createStyler2(ansiStyles2.bgColor[levelMapping2[level]][model](...arguments_), ansiStyles2.bgColor.close, this._styler);
              return createBuilder2(this, styler, this._isEmpty);
            };
          }
        };
      }
      var proto2 = Object.defineProperties(() => {
      }, {
        ...styles3,
        level: {
          enumerable: true,
          get() {
            return this._generator.level;
          },
          set(level) {
            this._generator.level = level;
          }
        }
      });
      var createStyler2 = (open, close, parent) => {
        let openAll;
        let closeAll;
        if (parent === void 0) {
          openAll = open;
          closeAll = close;
        } else {
          openAll = parent.openAll + open;
          closeAll = close + parent.closeAll;
        }
        return {
          open,
          close,
          openAll,
          closeAll,
          parent
        };
      };
      var createBuilder2 = (self2, _styler, _isEmpty) => {
        const builder = (...arguments_) => {
          return applyStyle2(builder, arguments_.length === 1 ? "" + arguments_[0] : arguments_.join(" "));
        };
        Object.setPrototypeOf(builder, proto2);
        builder._generator = self2;
        builder._styler = _styler;
        builder._isEmpty = _isEmpty;
        return builder;
      };
      var applyStyle2 = (self2, string) => {
        if (self2.level <= 0 || !string) {
          return self2._isEmpty ? "" : string;
        }
        let styler = self2._styler;
        if (styler === void 0) {
          return string;
        }
        const { openAll, closeAll } = styler;
        if (string.indexOf("\x1B") !== -1) {
          while (styler !== void 0) {
            string = stringReplaceAll2(string, styler.close, styler.open);
            styler = styler.parent;
          }
        }
        const lfIndex = string.indexOf("\n");
        if (lfIndex !== -1) {
          string = stringEncaseCRLFWithFirstIndex2(string, closeAll, openAll, lfIndex);
        }
        return openAll + string + closeAll;
      };
      var template;
      var chalkTag = (chalk5, ...strings) => {
        const [firstString] = strings;
        if (!Array.isArray(firstString)) {
          return strings.join(" ");
        }
        const arguments_ = strings.slice(1);
        const parts = [firstString.raw[0]];
        for (let i = 1; i < firstString.length; i++) {
          parts.push(
            String(arguments_[i - 1]).replace(/[{}\\]/g, "\\$&"),
            String(firstString.raw[i])
          );
        }
        if (template === void 0) {
          template = require_templates();
        }
        return template(chalk5, parts.join(""));
      };
      Object.defineProperties(Chalk.prototype, styles3);
      var chalk4 = Chalk();
      chalk4.supportsColor = stdoutColor2;
      chalk4.stderr = Chalk({ level: stderrColor2 ? stderrColor2.level : 0 });
      chalk4.stderr.supportsColor = stderrColor2;
      module.exports = chalk4;
    }
  });

  // node_modules/.pnpm/fs-jetpack@5.1.0/node_modules/fs-jetpack/lib/utils/promisify.js
  var require_promisify = __commonJS({
    "node_modules/.pnpm/fs-jetpack@5.1.0/node_modules/fs-jetpack/lib/utils/promisify.js"(exports, module) {
      "use strict";
      module.exports = (fn) => {
        return function() {
          const length = arguments.length;
          const args = new Array(length);
          for (let i = 0; i < length; i += 1) {
            args[i] = arguments[i];
          }
          return new Promise((resolve, reject) => {
            args.push((err, data) => {
              if (err) {
                reject(err);
              } else {
                resolve(data);
              }
            });
            fn.apply(null, args);
          });
        };
      };
    }
  });

  // node_modules/.pnpm/fs-jetpack@5.1.0/node_modules/fs-jetpack/lib/utils/fs.js
  var require_fs = __commonJS({
    "node_modules/.pnpm/fs-jetpack@5.1.0/node_modules/fs-jetpack/lib/utils/fs.js"(exports, module) {
      "use strict";
      var fs2 = __require("fs");
      var promisify = require_promisify();
      var isCallbackMethod = (key) => {
        return [
          typeof fs2[key] === "function",
          !key.match(/Sync$/),
          !key.match(/^[A-Z]/),
          !key.match(/^create/),
          !key.match(/^(un)?watch/)
        ].every(Boolean);
      };
      var adaptMethod = (name) => {
        const original = fs2[name];
        return promisify(original);
      };
      var adaptAllMethods = () => {
        const adapted = {};
        Object.keys(fs2).forEach((key) => {
          if (isCallbackMethod(key)) {
            if (key === "exists") {
              adapted.exists = () => {
                throw new Error("fs.exists() is deprecated");
              };
            } else {
              adapted[key] = adaptMethod(key);
            }
          } else {
            adapted[key] = fs2[key];
          }
        });
        return adapted;
      };
      module.exports = adaptAllMethods();
    }
  });

  // node_modules/.pnpm/fs-jetpack@5.1.0/node_modules/fs-jetpack/lib/utils/validate.js
  var require_validate = __commonJS({
    "node_modules/.pnpm/fs-jetpack@5.1.0/node_modules/fs-jetpack/lib/utils/validate.js"(exports, module) {
      "use strict";
      var prettyPrintTypes = (types) => {
        const addArticle = (str) => {
          const vowels = ["a", "e", "i", "o", "u"];
          if (vowels.indexOf(str[0]) !== -1) {
            return `an ${str}`;
          }
          return `a ${str}`;
        };
        return types.map(addArticle).join(" or ");
      };
      var isArrayOfNotation = (typeDefinition) => {
        return /array of /.test(typeDefinition);
      };
      var extractTypeFromArrayOfNotation = (typeDefinition) => {
        return typeDefinition.split(" of ")[1];
      };
      var isValidTypeDefinition = (typeStr) => {
        if (isArrayOfNotation(typeStr)) {
          return isValidTypeDefinition(extractTypeFromArrayOfNotation(typeStr));
        }
        return [
          "string",
          "number",
          "boolean",
          "array",
          "object",
          "buffer",
          "null",
          "undefined",
          "function"
        ].some((validType) => {
          return validType === typeStr;
        });
      };
      var detectType = (value) => {
        if (value === null) {
          return "null";
        }
        if (Array.isArray(value)) {
          return "array";
        }
        if (Buffer.isBuffer(value)) {
          return "buffer";
        }
        return typeof value;
      };
      var onlyUniqueValuesInArrayFilter = (value, index, self2) => {
        return self2.indexOf(value) === index;
      };
      var detectTypeDeep = (value) => {
        let type = detectType(value);
        let typesInArray;
        if (type === "array") {
          typesInArray = value.map((element) => {
            return detectType(element);
          }).filter(onlyUniqueValuesInArrayFilter);
          type += ` of ${typesInArray.join(", ")}`;
        }
        return type;
      };
      var validateArray = (argumentValue, typeToCheck) => {
        const allowedTypeInArray = extractTypeFromArrayOfNotation(typeToCheck);
        if (detectType(argumentValue) !== "array") {
          return false;
        }
        return argumentValue.every((element) => {
          return detectType(element) === allowedTypeInArray;
        });
      };
      var validateArgument = (methodName, argumentName, argumentValue, argumentMustBe) => {
        const isOneOfAllowedTypes = argumentMustBe.some((type) => {
          if (!isValidTypeDefinition(type)) {
            throw new Error(`Unknown type "${type}"`);
          }
          if (isArrayOfNotation(type)) {
            return validateArray(argumentValue, type);
          }
          return type === detectType(argumentValue);
        });
        if (!isOneOfAllowedTypes) {
          throw new Error(
            `Argument "${argumentName}" passed to ${methodName} must be ${prettyPrintTypes(
              argumentMustBe
            )}. Received ${detectTypeDeep(argumentValue)}`
          );
        }
      };
      var validateOptions = (methodName, optionsObjName, obj, allowedOptions) => {
        if (obj !== void 0) {
          validateArgument(methodName, optionsObjName, obj, ["object"]);
          Object.keys(obj).forEach((key) => {
            const argName = `${optionsObjName}.${key}`;
            if (allowedOptions[key] !== void 0) {
              validateArgument(methodName, argName, obj[key], allowedOptions[key]);
            } else {
              throw new Error(
                `Unknown argument "${argName}" passed to ${methodName}`
              );
            }
          });
        }
      };
      module.exports = {
        argument: validateArgument,
        options: validateOptions
      };
    }
  });

  // node_modules/.pnpm/fs-jetpack@5.1.0/node_modules/fs-jetpack/lib/utils/mode.js
  var require_mode = __commonJS({
    "node_modules/.pnpm/fs-jetpack@5.1.0/node_modules/fs-jetpack/lib/utils/mode.js"(exports) {
      "use strict";
      exports.normalizeFileMode = (mode) => {
        let modeAsString;
        if (typeof mode === "number") {
          modeAsString = mode.toString(8);
        } else {
          modeAsString = mode;
        }
        return modeAsString.substring(modeAsString.length - 3);
      };
    }
  });

  // node_modules/.pnpm/fs-jetpack@5.1.0/node_modules/fs-jetpack/lib/remove.js
  var require_remove = __commonJS({
    "node_modules/.pnpm/fs-jetpack@5.1.0/node_modules/fs-jetpack/lib/remove.js"(exports) {
      "use strict";
      var fs2 = require_fs();
      var validate = require_validate();
      var validateInput = (methodName, path2) => {
        const methodSignature = `${methodName}([path])`;
        validate.argument(methodSignature, "path", path2, ["string", "undefined"]);
      };
      var removeSync = (path2) => {
        fs2.rmSync(path2, {
          recursive: true,
          force: true,
          maxRetries: 3
        });
      };
      var removeAsync = (path2) => {
        return fs2.rm(path2, {
          recursive: true,
          force: true,
          maxRetries: 3
        });
      };
      exports.validateInput = validateInput;
      exports.sync = removeSync;
      exports.async = removeAsync;
    }
  });

  // node_modules/.pnpm/fs-jetpack@5.1.0/node_modules/fs-jetpack/lib/dir.js
  var require_dir = __commonJS({
    "node_modules/.pnpm/fs-jetpack@5.1.0/node_modules/fs-jetpack/lib/dir.js"(exports) {
      "use strict";
      var pathUtil = __require("path");
      var fs2 = require_fs();
      var modeUtil = require_mode();
      var validate = require_validate();
      var remove = require_remove();
      var validateInput = (methodName, path2, criteria) => {
        const methodSignature = `${methodName}(path, [criteria])`;
        validate.argument(methodSignature, "path", path2, ["string"]);
        validate.options(methodSignature, "criteria", criteria, {
          empty: ["boolean"],
          mode: ["string", "number"]
        });
      };
      var getCriteriaDefaults = (passedCriteria) => {
        const criteria = passedCriteria || {};
        if (typeof criteria.empty !== "boolean") {
          criteria.empty = false;
        }
        if (criteria.mode !== void 0) {
          criteria.mode = modeUtil.normalizeFileMode(criteria.mode);
        }
        return criteria;
      };
      var generatePathOccupiedByNotDirectoryError = (path2) => {
        return new Error(
          `Path ${path2} exists but is not a directory. Halting jetpack.dir() call for safety reasons.`
        );
      };
      var checkWhatAlreadyOccupiesPathSync = (path2) => {
        let stat;
        try {
          stat = fs2.statSync(path2);
        } catch (err) {
          if (err.code !== "ENOENT") {
            throw err;
          }
        }
        if (stat && !stat.isDirectory()) {
          throw generatePathOccupiedByNotDirectoryError(path2);
        }
        return stat;
      };
      var createBrandNewDirectorySync = (path2, opts) => {
        const options = opts || {};
        try {
          fs2.mkdirSync(path2, options.mode);
        } catch (err) {
          if (err.code === "ENOENT") {
            createBrandNewDirectorySync(pathUtil.dirname(path2), options);
            fs2.mkdirSync(path2, options.mode);
          } else if (err.code === "EEXIST") {
          } else {
            throw err;
          }
        }
      };
      var checkExistingDirectoryFulfillsCriteriaSync = (path2, stat, criteria) => {
        const checkMode = () => {
          const mode = modeUtil.normalizeFileMode(stat.mode);
          if (criteria.mode !== void 0 && criteria.mode !== mode) {
            fs2.chmodSync(path2, criteria.mode);
          }
        };
        const checkEmptiness = () => {
          if (criteria.empty) {
            const list = fs2.readdirSync(path2);
            list.forEach((filename) => {
              remove.sync(pathUtil.resolve(path2, filename));
            });
          }
        };
        checkMode();
        checkEmptiness();
      };
      var dirSync = (path2, passedCriteria) => {
        const criteria = getCriteriaDefaults(passedCriteria);
        const stat = checkWhatAlreadyOccupiesPathSync(path2);
        if (stat) {
          checkExistingDirectoryFulfillsCriteriaSync(path2, stat, criteria);
        } else {
          createBrandNewDirectorySync(path2, criteria);
        }
      };
      var checkWhatAlreadyOccupiesPathAsync = (path2) => {
        return new Promise((resolve, reject) => {
          fs2.stat(path2).then((stat) => {
            if (stat.isDirectory()) {
              resolve(stat);
            } else {
              reject(generatePathOccupiedByNotDirectoryError(path2));
            }
          }).catch((err) => {
            if (err.code === "ENOENT") {
              resolve(void 0);
            } else {
              reject(err);
            }
          });
        });
      };
      var emptyAsync = (path2) => {
        return new Promise((resolve, reject) => {
          fs2.readdir(path2).then((list) => {
            const doOne = (index) => {
              if (index === list.length) {
                resolve();
              } else {
                const subPath = pathUtil.resolve(path2, list[index]);
                remove.async(subPath).then(() => {
                  doOne(index + 1);
                });
              }
            };
            doOne(0);
          }).catch(reject);
        });
      };
      var checkExistingDirectoryFulfillsCriteriaAsync = (path2, stat, criteria) => {
        return new Promise((resolve, reject) => {
          const checkMode = () => {
            const mode = modeUtil.normalizeFileMode(stat.mode);
            if (criteria.mode !== void 0 && criteria.mode !== mode) {
              return fs2.chmod(path2, criteria.mode);
            }
            return Promise.resolve();
          };
          const checkEmptiness = () => {
            if (criteria.empty) {
              return emptyAsync(path2);
            }
            return Promise.resolve();
          };
          checkMode().then(checkEmptiness).then(resolve, reject);
        });
      };
      var createBrandNewDirectoryAsync = (path2, opts) => {
        const options = opts || {};
        return new Promise((resolve, reject) => {
          fs2.mkdir(path2, options.mode).then(resolve).catch((err) => {
            if (err.code === "ENOENT") {
              createBrandNewDirectoryAsync(pathUtil.dirname(path2), options).then(() => {
                return fs2.mkdir(path2, options.mode);
              }).then(resolve).catch((err2) => {
                if (err2.code === "EEXIST") {
                  resolve();
                } else {
                  reject(err2);
                }
              });
            } else if (err.code === "EEXIST") {
              resolve();
            } else {
              reject(err);
            }
          });
        });
      };
      var dirAsync = (path2, passedCriteria) => {
        return new Promise((resolve, reject) => {
          const criteria = getCriteriaDefaults(passedCriteria);
          checkWhatAlreadyOccupiesPathAsync(path2).then((stat) => {
            if (stat !== void 0) {
              return checkExistingDirectoryFulfillsCriteriaAsync(
                path2,
                stat,
                criteria
              );
            }
            return createBrandNewDirectoryAsync(path2, criteria);
          }).then(resolve, reject);
        });
      };
      exports.validateInput = validateInput;
      exports.sync = dirSync;
      exports.createSync = createBrandNewDirectorySync;
      exports.async = dirAsync;
      exports.createAsync = createBrandNewDirectoryAsync;
    }
  });

  // node_modules/.pnpm/fs-jetpack@5.1.0/node_modules/fs-jetpack/lib/write.js
  var require_write = __commonJS({
    "node_modules/.pnpm/fs-jetpack@5.1.0/node_modules/fs-jetpack/lib/write.js"(exports) {
      "use strict";
      var pathUtil = __require("path");
      var fs2 = require_fs();
      var validate = require_validate();
      var dir2 = require_dir();
      var validateInput = (methodName, path2, data, options) => {
        const methodSignature = `${methodName}(path, data, [options])`;
        validate.argument(methodSignature, "path", path2, ["string"]);
        validate.argument(methodSignature, "data", data, [
          "string",
          "buffer",
          "object",
          "array"
        ]);
        validate.options(methodSignature, "options", options, {
          mode: ["string", "number"],
          atomic: ["boolean"],
          jsonIndent: ["number"]
        });
      };
      var newExt = ".__new__";
      var serializeToJsonMaybe = (data, jsonIndent) => {
        let indent = jsonIndent;
        if (typeof indent !== "number") {
          indent = 2;
        }
        if (typeof data === "object" && !Buffer.isBuffer(data) && data !== null) {
          return JSON.stringify(data, null, indent);
        }
        return data;
      };
      var writeFileSync2 = (path2, data, options) => {
        try {
          fs2.writeFileSync(path2, data, options);
        } catch (err) {
          if (err.code === "ENOENT") {
            dir2.createSync(pathUtil.dirname(path2));
            fs2.writeFileSync(path2, data, options);
          } else {
            throw err;
          }
        }
      };
      var writeAtomicSync = (path2, data, options) => {
        writeFileSync2(path2 + newExt, data, options);
        fs2.renameSync(path2 + newExt, path2);
      };
      var writeSync = (path2, data, options) => {
        const opts = options || {};
        const processedData = serializeToJsonMaybe(data, opts.jsonIndent);
        let writeStrategy = writeFileSync2;
        if (opts.atomic) {
          writeStrategy = writeAtomicSync;
        }
        writeStrategy(path2, processedData, { mode: opts.mode });
      };
      var writeFileAsync = (path2, data, options) => {
        return new Promise((resolve, reject) => {
          fs2.writeFile(path2, data, options).then(resolve).catch((err) => {
            if (err.code === "ENOENT") {
              dir2.createAsync(pathUtil.dirname(path2)).then(() => {
                return fs2.writeFile(path2, data, options);
              }).then(resolve, reject);
            } else {
              reject(err);
            }
          });
        });
      };
      var writeAtomicAsync = (path2, data, options) => {
        return new Promise((resolve, reject) => {
          writeFileAsync(path2 + newExt, data, options).then(() => {
            return fs2.rename(path2 + newExt, path2);
          }).then(resolve, reject);
        });
      };
      var writeAsync2 = (path2, data, options) => {
        const opts = options || {};
        const processedData = serializeToJsonMaybe(data, opts.jsonIndent);
        let writeStrategy = writeFileAsync;
        if (opts.atomic) {
          writeStrategy = writeAtomicAsync;
        }
        return writeStrategy(path2, processedData, { mode: opts.mode });
      };
      exports.validateInput = validateInput;
      exports.sync = writeSync;
      exports.async = writeAsync2;
    }
  });

  // node_modules/.pnpm/fs-jetpack@5.1.0/node_modules/fs-jetpack/lib/append.js
  var require_append = __commonJS({
    "node_modules/.pnpm/fs-jetpack@5.1.0/node_modules/fs-jetpack/lib/append.js"(exports) {
      "use strict";
      var fs2 = require_fs();
      var write = require_write();
      var validate = require_validate();
      var validateInput = (methodName, path2, data, options) => {
        const methodSignature = `${methodName}(path, data, [options])`;
        validate.argument(methodSignature, "path", path2, ["string"]);
        validate.argument(methodSignature, "data", data, ["string", "buffer"]);
        validate.options(methodSignature, "options", options, {
          mode: ["string", "number"]
        });
      };
      var appendSync = (path2, data, options) => {
        try {
          fs2.appendFileSync(path2, data, options);
        } catch (err) {
          if (err.code === "ENOENT") {
            write.sync(path2, data, options);
          } else {
            throw err;
          }
        }
      };
      var appendAsync = (path2, data, options) => {
        return new Promise((resolve, reject) => {
          fs2.appendFile(path2, data, options).then(resolve).catch((err) => {
            if (err.code === "ENOENT") {
              write.async(path2, data, options).then(resolve, reject);
            } else {
              reject(err);
            }
          });
        });
      };
      exports.validateInput = validateInput;
      exports.sync = appendSync;
      exports.async = appendAsync;
    }
  });

  // node_modules/.pnpm/fs-jetpack@5.1.0/node_modules/fs-jetpack/lib/file.js
  var require_file = __commonJS({
    "node_modules/.pnpm/fs-jetpack@5.1.0/node_modules/fs-jetpack/lib/file.js"(exports) {
      "use strict";
      var fs2 = require_fs();
      var modeUtil = require_mode();
      var validate = require_validate();
      var write = require_write();
      var validateInput = (methodName, path2, criteria) => {
        const methodSignature = `${methodName}(path, [criteria])`;
        validate.argument(methodSignature, "path", path2, ["string"]);
        validate.options(methodSignature, "criteria", criteria, {
          content: ["string", "buffer", "object", "array"],
          jsonIndent: ["number"],
          mode: ["string", "number"]
        });
      };
      var getCriteriaDefaults = (passedCriteria) => {
        const criteria = passedCriteria || {};
        if (criteria.mode !== void 0) {
          criteria.mode = modeUtil.normalizeFileMode(criteria.mode);
        }
        return criteria;
      };
      var generatePathOccupiedByNotFileError = (path2) => {
        return new Error(
          `Path ${path2} exists but is not a file. Halting jetpack.file() call for safety reasons.`
        );
      };
      var checkWhatAlreadyOccupiesPathSync = (path2) => {
        let stat;
        try {
          stat = fs2.statSync(path2);
        } catch (err) {
          if (err.code !== "ENOENT") {
            throw err;
          }
        }
        if (stat && !stat.isFile()) {
          throw generatePathOccupiedByNotFileError(path2);
        }
        return stat;
      };
      var checkExistingFileFulfillsCriteriaSync = (path2, stat, criteria) => {
        const mode = modeUtil.normalizeFileMode(stat.mode);
        const checkContent = () => {
          if (criteria.content !== void 0) {
            write.sync(path2, criteria.content, {
              mode,
              jsonIndent: criteria.jsonIndent
            });
            return true;
          }
          return false;
        };
        const checkMode = () => {
          if (criteria.mode !== void 0 && criteria.mode !== mode) {
            fs2.chmodSync(path2, criteria.mode);
          }
        };
        const contentReplaced = checkContent();
        if (!contentReplaced) {
          checkMode();
        }
      };
      var createBrandNewFileSync = (path2, criteria) => {
        let content = "";
        if (criteria.content !== void 0) {
          content = criteria.content;
        }
        write.sync(path2, content, {
          mode: criteria.mode,
          jsonIndent: criteria.jsonIndent
        });
      };
      var fileSync = (path2, passedCriteria) => {
        const criteria = getCriteriaDefaults(passedCriteria);
        const stat = checkWhatAlreadyOccupiesPathSync(path2);
        if (stat !== void 0) {
          checkExistingFileFulfillsCriteriaSync(path2, stat, criteria);
        } else {
          createBrandNewFileSync(path2, criteria);
        }
      };
      var checkWhatAlreadyOccupiesPathAsync = (path2) => {
        return new Promise((resolve, reject) => {
          fs2.stat(path2).then((stat) => {
            if (stat.isFile()) {
              resolve(stat);
            } else {
              reject(generatePathOccupiedByNotFileError(path2));
            }
          }).catch((err) => {
            if (err.code === "ENOENT") {
              resolve(void 0);
            } else {
              reject(err);
            }
          });
        });
      };
      var checkExistingFileFulfillsCriteriaAsync = (path2, stat, criteria) => {
        const mode = modeUtil.normalizeFileMode(stat.mode);
        const checkContent = () => {
          return new Promise((resolve, reject) => {
            if (criteria.content !== void 0) {
              write.async(path2, criteria.content, {
                mode,
                jsonIndent: criteria.jsonIndent
              }).then(() => {
                resolve(true);
              }).catch(reject);
            } else {
              resolve(false);
            }
          });
        };
        const checkMode = () => {
          if (criteria.mode !== void 0 && criteria.mode !== mode) {
            return fs2.chmod(path2, criteria.mode);
          }
          return void 0;
        };
        return checkContent().then((contentReplaced) => {
          if (!contentReplaced) {
            return checkMode();
          }
          return void 0;
        });
      };
      var createBrandNewFileAsync = (path2, criteria) => {
        let content = "";
        if (criteria.content !== void 0) {
          content = criteria.content;
        }
        return write.async(path2, content, {
          mode: criteria.mode,
          jsonIndent: criteria.jsonIndent
        });
      };
      var fileAsync = (path2, passedCriteria) => {
        return new Promise((resolve, reject) => {
          const criteria = getCriteriaDefaults(passedCriteria);
          checkWhatAlreadyOccupiesPathAsync(path2).then((stat) => {
            if (stat !== void 0) {
              return checkExistingFileFulfillsCriteriaAsync(path2, stat, criteria);
            }
            return createBrandNewFileAsync(path2, criteria);
          }).then(resolve, reject);
        });
      };
      exports.validateInput = validateInput;
      exports.sync = fileSync;
      exports.async = fileAsync;
    }
  });

  // node_modules/.pnpm/fs-jetpack@5.1.0/node_modules/fs-jetpack/lib/inspect.js
  var require_inspect = __commonJS({
    "node_modules/.pnpm/fs-jetpack@5.1.0/node_modules/fs-jetpack/lib/inspect.js"(exports) {
      "use strict";
      var crypto = __require("crypto");
      var pathUtil = __require("path");
      var fs2 = require_fs();
      var validate = require_validate();
      var supportedChecksumAlgorithms = ["md5", "sha1", "sha256", "sha512"];
      var symlinkOptions = ["report", "follow"];
      var validateInput = (methodName, path2, options) => {
        const methodSignature = `${methodName}(path, [options])`;
        validate.argument(methodSignature, "path", path2, ["string"]);
        validate.options(methodSignature, "options", options, {
          checksum: ["string"],
          mode: ["boolean"],
          times: ["boolean"],
          absolutePath: ["boolean"],
          symlinks: ["string"]
        });
        if (options && options.checksum !== void 0 && supportedChecksumAlgorithms.indexOf(options.checksum) === -1) {
          throw new Error(
            `Argument "options.checksum" passed to ${methodSignature} must have one of values: ${supportedChecksumAlgorithms.join(
              ", "
            )}`
          );
        }
        if (options && options.symlinks !== void 0 && symlinkOptions.indexOf(options.symlinks) === -1) {
          throw new Error(
            `Argument "options.symlinks" passed to ${methodSignature} must have one of values: ${symlinkOptions.join(
              ", "
            )}`
          );
        }
      };
      var createInspectObj = (path2, options, stat) => {
        const obj = {};
        obj.name = pathUtil.basename(path2);
        if (stat.isFile()) {
          obj.type = "file";
          obj.size = stat.size;
        } else if (stat.isDirectory()) {
          obj.type = "dir";
        } else if (stat.isSymbolicLink()) {
          obj.type = "symlink";
        } else {
          obj.type = "other";
        }
        if (options.mode) {
          obj.mode = stat.mode;
        }
        if (options.times) {
          obj.accessTime = stat.atime;
          obj.modifyTime = stat.mtime;
          obj.changeTime = stat.ctime;
          obj.birthTime = stat.birthtime;
        }
        if (options.absolutePath) {
          obj.absolutePath = path2;
        }
        return obj;
      };
      var fileChecksum = (path2, algo) => {
        const hash = crypto.createHash(algo);
        const data = fs2.readFileSync(path2);
        hash.update(data);
        return hash.digest("hex");
      };
      var addExtraFieldsSync = (path2, inspectObj, options) => {
        if (inspectObj.type === "file" && options.checksum) {
          inspectObj[options.checksum] = fileChecksum(path2, options.checksum);
        } else if (inspectObj.type === "symlink") {
          inspectObj.pointsAt = fs2.readlinkSync(path2);
        }
      };
      var inspectSync = (path2, options) => {
        let statOperation = fs2.lstatSync;
        let stat;
        const opts = options || {};
        if (opts.symlinks === "follow") {
          statOperation = fs2.statSync;
        }
        try {
          stat = statOperation(path2);
        } catch (err) {
          if (err.code === "ENOENT") {
            return void 0;
          }
          throw err;
        }
        const inspectObj = createInspectObj(path2, opts, stat);
        addExtraFieldsSync(path2, inspectObj, opts);
        return inspectObj;
      };
      var fileChecksumAsync = (path2, algo) => {
        return new Promise((resolve, reject) => {
          const hash = crypto.createHash(algo);
          const s = fs2.createReadStream(path2);
          s.on("data", (data) => {
            hash.update(data);
          });
          s.on("end", () => {
            resolve(hash.digest("hex"));
          });
          s.on("error", reject);
        });
      };
      var addExtraFieldsAsync = (path2, inspectObj, options) => {
        if (inspectObj.type === "file" && options.checksum) {
          return fileChecksumAsync(path2, options.checksum).then((checksum) => {
            inspectObj[options.checksum] = checksum;
            return inspectObj;
          });
        } else if (inspectObj.type === "symlink") {
          return fs2.readlink(path2).then((linkPath) => {
            inspectObj.pointsAt = linkPath;
            return inspectObj;
          });
        }
        return Promise.resolve(inspectObj);
      };
      var inspectAsync = (path2, options) => {
        return new Promise((resolve, reject) => {
          let statOperation = fs2.lstat;
          const opts = options || {};
          if (opts.symlinks === "follow") {
            statOperation = fs2.stat;
          }
          statOperation(path2).then((stat) => {
            const inspectObj = createInspectObj(path2, opts, stat);
            addExtraFieldsAsync(path2, inspectObj, opts).then(resolve, reject);
          }).catch((err) => {
            if (err.code === "ENOENT") {
              resolve(void 0);
            } else {
              reject(err);
            }
          });
        });
      };
      exports.supportedChecksumAlgorithms = supportedChecksumAlgorithms;
      exports.symlinkOptions = symlinkOptions;
      exports.validateInput = validateInput;
      exports.sync = inspectSync;
      exports.async = inspectAsync;
    }
  });

  // node_modules/.pnpm/fs-jetpack@5.1.0/node_modules/fs-jetpack/lib/list.js
  var require_list = __commonJS({
    "node_modules/.pnpm/fs-jetpack@5.1.0/node_modules/fs-jetpack/lib/list.js"(exports) {
      "use strict";
      var fs2 = require_fs();
      var validate = require_validate();
      var validateInput = (methodName, path2) => {
        const methodSignature = `${methodName}(path)`;
        validate.argument(methodSignature, "path", path2, ["string", "undefined"]);
      };
      var listSync = (path2) => {
        try {
          return fs2.readdirSync(path2);
        } catch (err) {
          if (err.code === "ENOENT") {
            return void 0;
          }
          throw err;
        }
      };
      var listAsync = (path2) => {
        return new Promise((resolve, reject) => {
          fs2.readdir(path2).then((list) => {
            resolve(list);
          }).catch((err) => {
            if (err.code === "ENOENT") {
              resolve(void 0);
            } else {
              reject(err);
            }
          });
        });
      };
      exports.validateInput = validateInput;
      exports.sync = listSync;
      exports.async = listAsync;
    }
  });

  // node_modules/.pnpm/fs-jetpack@5.1.0/node_modules/fs-jetpack/lib/utils/tree_walker.js
  var require_tree_walker = __commonJS({
    "node_modules/.pnpm/fs-jetpack@5.1.0/node_modules/fs-jetpack/lib/utils/tree_walker.js"(exports) {
      "use strict";
      var fs2 = __require("fs");
      var pathUtil = __require("path");
      var inspect2 = require_inspect();
      var list = require_list();
      var fileType = (dirent) => {
        if (dirent.isDirectory()) {
          return "dir";
        }
        if (dirent.isFile()) {
          return "file";
        }
        if (dirent.isSymbolicLink()) {
          return "symlink";
        }
        return "other";
      };
      var initialWalkSync = (path2, options, callback) => {
        if (options.maxLevelsDeep === void 0) {
          options.maxLevelsDeep = Infinity;
        }
        const performInspectOnEachNode = options.inspectOptions !== void 0;
        if (options.symlinks) {
          if (options.inspectOptions === void 0) {
            options.inspectOptions = { symlinks: options.symlinks };
          } else {
            options.inspectOptions.symlinks = options.symlinks;
          }
        }
        const walkSync = (path3, currentLevel) => {
          fs2.readdirSync(path3, { withFileTypes: true }).forEach((direntItem) => {
            const withFileTypesNotSupported = typeof direntItem === "string";
            let fileItemPath;
            if (withFileTypesNotSupported) {
              fileItemPath = pathUtil.join(path3, direntItem);
            } else {
              fileItemPath = pathUtil.join(path3, direntItem.name);
            }
            let fileItem;
            if (performInspectOnEachNode) {
              fileItem = inspect2.sync(fileItemPath, options.inspectOptions);
            } else if (withFileTypesNotSupported) {
              const inspectObject = inspect2.sync(
                fileItemPath,
                options.inspectOptions
              );
              fileItem = { name: inspectObject.name, type: inspectObject.type };
            } else {
              const type = fileType(direntItem);
              if (type === "symlink" && options.symlinks === "follow") {
                const symlinkPointsTo = fs2.statSync(fileItemPath);
                fileItem = { name: direntItem.name, type: fileType(symlinkPointsTo) };
              } else {
                fileItem = { name: direntItem.name, type };
              }
            }
            if (fileItem !== void 0) {
              callback(fileItemPath, fileItem);
              if (fileItem.type === "dir" && currentLevel < options.maxLevelsDeep) {
                walkSync(fileItemPath, currentLevel + 1);
              }
            }
          });
        };
        const item = inspect2.sync(path2, options.inspectOptions);
        if (item) {
          if (performInspectOnEachNode) {
            callback(path2, item);
          } else {
            callback(path2, { name: item.name, type: item.type });
          }
          if (item.type === "dir") {
            walkSync(path2, 1);
          }
        } else {
          callback(path2, void 0);
        }
      };
      var maxConcurrentOperations = 5;
      var initialWalkAsync = (path2, options, callback, doneCallback) => {
        if (options.maxLevelsDeep === void 0) {
          options.maxLevelsDeep = Infinity;
        }
        const performInspectOnEachNode = options.inspectOptions !== void 0;
        if (options.symlinks) {
          if (options.inspectOptions === void 0) {
            options.inspectOptions = { symlinks: options.symlinks };
          } else {
            options.inspectOptions.symlinks = options.symlinks;
          }
        }
        const concurrentOperationsQueue = [];
        let nowDoingConcurrentOperations = 0;
        const checkConcurrentOperations = () => {
          if (concurrentOperationsQueue.length === 0 && nowDoingConcurrentOperations === 0) {
            doneCallback();
          } else if (concurrentOperationsQueue.length > 0 && nowDoingConcurrentOperations < maxConcurrentOperations) {
            const operation = concurrentOperationsQueue.pop();
            nowDoingConcurrentOperations += 1;
            operation();
          }
        };
        const whenConcurrencySlotAvailable = (operation) => {
          concurrentOperationsQueue.push(operation);
          checkConcurrentOperations();
        };
        const concurrentOperationDone = () => {
          nowDoingConcurrentOperations -= 1;
          checkConcurrentOperations();
        };
        const walkAsync = (path3, currentLevel) => {
          const goDeeperIfDir = (fileItemPath, fileItem) => {
            if (fileItem.type === "dir" && currentLevel < options.maxLevelsDeep) {
              walkAsync(fileItemPath, currentLevel + 1);
            }
          };
          whenConcurrencySlotAvailable(() => {
            fs2.readdir(path3, { withFileTypes: true }, (err, files) => {
              if (err) {
                doneCallback(err);
              } else {
                files.forEach((direntItem) => {
                  const withFileTypesNotSupported = typeof direntItem === "string";
                  let fileItemPath;
                  if (withFileTypesNotSupported) {
                    fileItemPath = pathUtil.join(path3, direntItem);
                  } else {
                    fileItemPath = pathUtil.join(path3, direntItem.name);
                  }
                  if (performInspectOnEachNode || withFileTypesNotSupported) {
                    whenConcurrencySlotAvailable(() => {
                      inspect2.async(fileItemPath, options.inspectOptions).then((fileItem) => {
                        if (fileItem !== void 0) {
                          if (performInspectOnEachNode) {
                            callback(fileItemPath, fileItem);
                          } else {
                            callback(fileItemPath, {
                              name: fileItem.name,
                              type: fileItem.type
                            });
                          }
                          goDeeperIfDir(fileItemPath, fileItem);
                        }
                        concurrentOperationDone();
                      }).catch((err2) => {
                        doneCallback(err2);
                      });
                    });
                  } else {
                    const type = fileType(direntItem);
                    if (type === "symlink" && options.symlinks === "follow") {
                      whenConcurrencySlotAvailable(() => {
                        fs2.stat(fileItemPath, (err2, symlinkPointsTo) => {
                          if (err2) {
                            doneCallback(err2);
                          } else {
                            const fileItem = {
                              name: direntItem.name,
                              type: fileType(symlinkPointsTo)
                            };
                            callback(fileItemPath, fileItem);
                            goDeeperIfDir(fileItemPath, fileItem);
                            concurrentOperationDone();
                          }
                        });
                      });
                    } else {
                      const fileItem = { name: direntItem.name, type };
                      callback(fileItemPath, fileItem);
                      goDeeperIfDir(fileItemPath, fileItem);
                    }
                  }
                });
                concurrentOperationDone();
              }
            });
          });
        };
        inspect2.async(path2, options.inspectOptions).then((item) => {
          if (item) {
            if (performInspectOnEachNode) {
              callback(path2, item);
            } else {
              callback(path2, { name: item.name, type: item.type });
            }
            if (item.type === "dir") {
              walkAsync(path2, 1);
            } else {
              doneCallback();
            }
          } else {
            callback(path2, void 0);
            doneCallback();
          }
        }).catch((err) => {
          doneCallback(err);
        });
      };
      exports.sync = initialWalkSync;
      exports.async = initialWalkAsync;
    }
  });

  // node_modules/.pnpm/minimatch@5.1.6/node_modules/minimatch/lib/path.js
  var require_path = __commonJS({
    "node_modules/.pnpm/minimatch@5.1.6/node_modules/minimatch/lib/path.js"(exports, module) {
      var isWindows = typeof process === "object" && process && process.platform === "win32";
      module.exports = isWindows ? { sep: "\\" } : { sep: "/" };
    }
  });

  // node_modules/.pnpm/balanced-match@1.0.2/node_modules/balanced-match/index.js
  var require_balanced_match = __commonJS({
    "node_modules/.pnpm/balanced-match@1.0.2/node_modules/balanced-match/index.js"(exports, module) {
      "use strict";
      module.exports = balanced;
      function balanced(a, b, str) {
        if (a instanceof RegExp)
          a = maybeMatch(a, str);
        if (b instanceof RegExp)
          b = maybeMatch(b, str);
        var r = range(a, b, str);
        return r && {
          start: r[0],
          end: r[1],
          pre: str.slice(0, r[0]),
          body: str.slice(r[0] + a.length, r[1]),
          post: str.slice(r[1] + b.length)
        };
      }
      function maybeMatch(reg, str) {
        var m = str.match(reg);
        return m ? m[0] : null;
      }
      balanced.range = range;
      function range(a, b, str) {
        var begs, beg, left, right, result;
        var ai = str.indexOf(a);
        var bi = str.indexOf(b, ai + 1);
        var i = ai;
        if (ai >= 0 && bi > 0) {
          if (a === b) {
            return [ai, bi];
          }
          begs = [];
          left = str.length;
          while (i >= 0 && !result) {
            if (i == ai) {
              begs.push(i);
              ai = str.indexOf(a, i + 1);
            } else if (begs.length == 1) {
              result = [begs.pop(), bi];
            } else {
              beg = begs.pop();
              if (beg < left) {
                left = beg;
                right = bi;
              }
              bi = str.indexOf(b, i + 1);
            }
            i = ai < bi && ai >= 0 ? ai : bi;
          }
          if (begs.length) {
            result = [left, right];
          }
        }
        return result;
      }
    }
  });

  // node_modules/.pnpm/brace-expansion@2.0.1/node_modules/brace-expansion/index.js
  var require_brace_expansion = __commonJS({
    "node_modules/.pnpm/brace-expansion@2.0.1/node_modules/brace-expansion/index.js"(exports, module) {
      var balanced = require_balanced_match();
      module.exports = expandTop;
      var escSlash = "\0SLASH" + Math.random() + "\0";
      var escOpen = "\0OPEN" + Math.random() + "\0";
      var escClose = "\0CLOSE" + Math.random() + "\0";
      var escComma = "\0COMMA" + Math.random() + "\0";
      var escPeriod = "\0PERIOD" + Math.random() + "\0";
      function numeric(str) {
        return parseInt(str, 10) == str ? parseInt(str, 10) : str.charCodeAt(0);
      }
      function escapeBraces(str) {
        return str.split("\\\\").join(escSlash).split("\\{").join(escOpen).split("\\}").join(escClose).split("\\,").join(escComma).split("\\.").join(escPeriod);
      }
      function unescapeBraces(str) {
        return str.split(escSlash).join("\\").split(escOpen).join("{").split(escClose).join("}").split(escComma).join(",").split(escPeriod).join(".");
      }
      function parseCommaParts(str) {
        if (!str)
          return [""];
        var parts = [];
        var m = balanced("{", "}", str);
        if (!m)
          return str.split(",");
        var pre = m.pre;
        var body = m.body;
        var post = m.post;
        var p = pre.split(",");
        p[p.length - 1] += "{" + body + "}";
        var postParts = parseCommaParts(post);
        if (post.length) {
          p[p.length - 1] += postParts.shift();
          p.push.apply(p, postParts);
        }
        parts.push.apply(parts, p);
        return parts;
      }
      function expandTop(str) {
        if (!str)
          return [];
        if (str.substr(0, 2) === "{}") {
          str = "\\{\\}" + str.substr(2);
        }
        return expand(escapeBraces(str), true).map(unescapeBraces);
      }
      function embrace(str) {
        return "{" + str + "}";
      }
      function isPadded(el) {
        return /^-?0\d/.test(el);
      }
      function lte(i, y) {
        return i <= y;
      }
      function gte(i, y) {
        return i >= y;
      }
      function expand(str, isTop) {
        var expansions = [];
        var m = balanced("{", "}", str);
        if (!m)
          return [str];
        var pre = m.pre;
        var post = m.post.length ? expand(m.post, false) : [""];
        if (/\$$/.test(m.pre)) {
          for (var k = 0; k < post.length; k++) {
            var expansion = pre + "{" + m.body + "}" + post[k];
            expansions.push(expansion);
          }
        } else {
          var isNumericSequence = /^-?\d+\.\.-?\d+(?:\.\.-?\d+)?$/.test(m.body);
          var isAlphaSequence = /^[a-zA-Z]\.\.[a-zA-Z](?:\.\.-?\d+)?$/.test(m.body);
          var isSequence = isNumericSequence || isAlphaSequence;
          var isOptions = m.body.indexOf(",") >= 0;
          if (!isSequence && !isOptions) {
            if (m.post.match(/,.*\}/)) {
              str = m.pre + "{" + m.body + escClose + m.post;
              return expand(str);
            }
            return [str];
          }
          var n;
          if (isSequence) {
            n = m.body.split(/\.\./);
          } else {
            n = parseCommaParts(m.body);
            if (n.length === 1) {
              n = expand(n[0], false).map(embrace);
              if (n.length === 1) {
                return post.map(function(p) {
                  return m.pre + n[0] + p;
                });
              }
            }
          }
          var N;
          if (isSequence) {
            var x = numeric(n[0]);
            var y = numeric(n[1]);
            var width = Math.max(n[0].length, n[1].length);
            var incr = n.length == 3 ? Math.abs(numeric(n[2])) : 1;
            var test = lte;
            var reverse = y < x;
            if (reverse) {
              incr *= -1;
              test = gte;
            }
            var pad = n.some(isPadded);
            N = [];
            for (var i = x; test(i, y); i += incr) {
              var c;
              if (isAlphaSequence) {
                c = String.fromCharCode(i);
                if (c === "\\")
                  c = "";
              } else {
                c = String(i);
                if (pad) {
                  var need = width - c.length;
                  if (need > 0) {
                    var z = new Array(need + 1).join("0");
                    if (i < 0)
                      c = "-" + z + c.slice(1);
                    else
                      c = z + c;
                  }
                }
              }
              N.push(c);
            }
          } else {
            N = [];
            for (var j = 0; j < n.length; j++) {
              N.push.apply(N, expand(n[j], false));
            }
          }
          for (var j = 0; j < N.length; j++) {
            for (var k = 0; k < post.length; k++) {
              var expansion = pre + N[j] + post[k];
              if (!isTop || isSequence || expansion)
                expansions.push(expansion);
            }
          }
        }
        return expansions;
      }
    }
  });

  // node_modules/.pnpm/minimatch@5.1.6/node_modules/minimatch/minimatch.js
  var require_minimatch = __commonJS({
    "node_modules/.pnpm/minimatch@5.1.6/node_modules/minimatch/minimatch.js"(exports, module) {
      var minimatch = module.exports = (p, pattern, options = {}) => {
        assertValidPattern(pattern);
        if (!options.nocomment && pattern.charAt(0) === "#") {
          return false;
        }
        return new Minimatch(pattern, options).match(p);
      };
      module.exports = minimatch;
      var path2 = require_path();
      minimatch.sep = path2.sep;
      var GLOBSTAR = Symbol("globstar **");
      minimatch.GLOBSTAR = GLOBSTAR;
      var expand = require_brace_expansion();
      var plTypes = {
        "!": { open: "(?:(?!(?:", close: "))[^/]*?)" },
        "?": { open: "(?:", close: ")?" },
        "+": { open: "(?:", close: ")+" },
        "*": { open: "(?:", close: ")*" },
        "@": { open: "(?:", close: ")" }
      };
      var qmark = "[^/]";
      var star = qmark + "*?";
      var twoStarDot = "(?:(?!(?:\\/|^)(?:\\.{1,2})($|\\/)).)*?";
      var twoStarNoDot = "(?:(?!(?:\\/|^)\\.).)*?";
      var charSet = (s) => s.split("").reduce((set, c) => {
        set[c] = true;
        return set;
      }, {});
      var reSpecials = charSet("().*{}+?[]^$\\!");
      var addPatternStartSet = charSet("[.(");
      var slashSplit = /\/+/;
      minimatch.filter = (pattern, options = {}) => (p, i, list) => minimatch(p, pattern, options);
      var ext = (a, b = {}) => {
        const t = {};
        Object.keys(a).forEach((k) => t[k] = a[k]);
        Object.keys(b).forEach((k) => t[k] = b[k]);
        return t;
      };
      minimatch.defaults = (def) => {
        if (!def || typeof def !== "object" || !Object.keys(def).length) {
          return minimatch;
        }
        const orig = minimatch;
        const m = (p, pattern, options) => orig(p, pattern, ext(def, options));
        m.Minimatch = class Minimatch extends orig.Minimatch {
          constructor(pattern, options) {
            super(pattern, ext(def, options));
          }
        };
        m.Minimatch.defaults = (options) => orig.defaults(ext(def, options)).Minimatch;
        m.filter = (pattern, options) => orig.filter(pattern, ext(def, options));
        m.defaults = (options) => orig.defaults(ext(def, options));
        m.makeRe = (pattern, options) => orig.makeRe(pattern, ext(def, options));
        m.braceExpand = (pattern, options) => orig.braceExpand(pattern, ext(def, options));
        m.match = (list, pattern, options) => orig.match(list, pattern, ext(def, options));
        return m;
      };
      minimatch.braceExpand = (pattern, options) => braceExpand(pattern, options);
      var braceExpand = (pattern, options = {}) => {
        assertValidPattern(pattern);
        if (options.nobrace || !/\{(?:(?!\{).)*\}/.test(pattern)) {
          return [pattern];
        }
        return expand(pattern);
      };
      var MAX_PATTERN_LENGTH = 1024 * 64;
      var assertValidPattern = (pattern) => {
        if (typeof pattern !== "string") {
          throw new TypeError("invalid pattern");
        }
        if (pattern.length > MAX_PATTERN_LENGTH) {
          throw new TypeError("pattern is too long");
        }
      };
      var SUBPARSE = Symbol("subparse");
      minimatch.makeRe = (pattern, options) => new Minimatch(pattern, options || {}).makeRe();
      minimatch.match = (list, pattern, options = {}) => {
        const mm = new Minimatch(pattern, options);
        list = list.filter((f) => mm.match(f));
        if (mm.options.nonull && !list.length) {
          list.push(pattern);
        }
        return list;
      };
      var globUnescape = (s) => s.replace(/\\(.)/g, "$1");
      var charUnescape = (s) => s.replace(/\\([^-\]])/g, "$1");
      var regExpEscape = (s) => s.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
      var braExpEscape = (s) => s.replace(/[[\]\\]/g, "\\$&");
      var Minimatch = class {
        constructor(pattern, options) {
          assertValidPattern(pattern);
          if (!options)
            options = {};
          this.options = options;
          this.set = [];
          this.pattern = pattern;
          this.windowsPathsNoEscape = !!options.windowsPathsNoEscape || options.allowWindowsEscape === false;
          if (this.windowsPathsNoEscape) {
            this.pattern = this.pattern.replace(/\\/g, "/");
          }
          this.regexp = null;
          this.negate = false;
          this.comment = false;
          this.empty = false;
          this.partial = !!options.partial;
          this.make();
        }
        debug() {
        }
        make() {
          const pattern = this.pattern;
          const options = this.options;
          if (!options.nocomment && pattern.charAt(0) === "#") {
            this.comment = true;
            return;
          }
          if (!pattern) {
            this.empty = true;
            return;
          }
          this.parseNegate();
          let set = this.globSet = this.braceExpand();
          if (options.debug)
            this.debug = (...args) => console.error(...args);
          this.debug(this.pattern, set);
          set = this.globParts = set.map((s) => s.split(slashSplit));
          this.debug(this.pattern, set);
          set = set.map((s, si, set2) => s.map(this.parse, this));
          this.debug(this.pattern, set);
          set = set.filter((s) => s.indexOf(false) === -1);
          this.debug(this.pattern, set);
          this.set = set;
        }
        parseNegate() {
          if (this.options.nonegate)
            return;
          const pattern = this.pattern;
          let negate = false;
          let negateOffset = 0;
          for (let i = 0; i < pattern.length && pattern.charAt(i) === "!"; i++) {
            negate = !negate;
            negateOffset++;
          }
          if (negateOffset)
            this.pattern = pattern.slice(negateOffset);
          this.negate = negate;
        }
        // set partial to true to test if, for example,
        // "/a/b" matches the start of "/*/b/*/d"
        // Partial means, if you run out of file before you run
        // out of pattern, then that's fine, as long as all
        // the parts match.
        matchOne(file, pattern, partial) {
          var options = this.options;
          this.debug(
            "matchOne",
            { "this": this, file, pattern }
          );
          this.debug("matchOne", file.length, pattern.length);
          for (var fi = 0, pi = 0, fl = file.length, pl = pattern.length; fi < fl && pi < pl; fi++, pi++) {
            this.debug("matchOne loop");
            var p = pattern[pi];
            var f = file[fi];
            this.debug(pattern, p, f);
            if (p === false)
              return false;
            if (p === GLOBSTAR) {
              this.debug("GLOBSTAR", [pattern, p, f]);
              var fr = fi;
              var pr = pi + 1;
              if (pr === pl) {
                this.debug("** at the end");
                for (; fi < fl; fi++) {
                  if (file[fi] === "." || file[fi] === ".." || !options.dot && file[fi].charAt(0) === ".")
                    return false;
                }
                return true;
              }
              while (fr < fl) {
                var swallowee = file[fr];
                this.debug("\nglobstar while", file, fr, pattern, pr, swallowee);
                if (this.matchOne(file.slice(fr), pattern.slice(pr), partial)) {
                  this.debug("globstar found match!", fr, fl, swallowee);
                  return true;
                } else {
                  if (swallowee === "." || swallowee === ".." || !options.dot && swallowee.charAt(0) === ".") {
                    this.debug("dot detected!", file, fr, pattern, pr);
                    break;
                  }
                  this.debug("globstar swallow a segment, and continue");
                  fr++;
                }
              }
              if (partial) {
                this.debug("\n>>> no match, partial?", file, fr, pattern, pr);
                if (fr === fl)
                  return true;
              }
              return false;
            }
            var hit;
            if (typeof p === "string") {
              hit = f === p;
              this.debug("string match", p, f, hit);
            } else {
              hit = f.match(p);
              this.debug("pattern match", p, f, hit);
            }
            if (!hit)
              return false;
          }
          if (fi === fl && pi === pl) {
            return true;
          } else if (fi === fl) {
            return partial;
          } else if (pi === pl) {
            return fi === fl - 1 && file[fi] === "";
          }
          throw new Error("wtf?");
        }
        braceExpand() {
          return braceExpand(this.pattern, this.options);
        }
        parse(pattern, isSub) {
          assertValidPattern(pattern);
          const options = this.options;
          if (pattern === "**") {
            if (!options.noglobstar)
              return GLOBSTAR;
            else
              pattern = "*";
          }
          if (pattern === "")
            return "";
          let re = "";
          let hasMagic = false;
          let escaping = false;
          const patternListStack = [];
          const negativeLists = [];
          let stateChar;
          let inClass = false;
          let reClassStart = -1;
          let classStart = -1;
          let cs;
          let pl;
          let sp;
          let dotTravAllowed = pattern.charAt(0) === ".";
          let dotFileAllowed = options.dot || dotTravAllowed;
          const patternStart = () => dotTravAllowed ? "" : dotFileAllowed ? "(?!(?:^|\\/)\\.{1,2}(?:$|\\/))" : "(?!\\.)";
          const subPatternStart = (p) => p.charAt(0) === "." ? "" : options.dot ? "(?!(?:^|\\/)\\.{1,2}(?:$|\\/))" : "(?!\\.)";
          const clearStateChar = () => {
            if (stateChar) {
              switch (stateChar) {
                case "*":
                  re += star;
                  hasMagic = true;
                  break;
                case "?":
                  re += qmark;
                  hasMagic = true;
                  break;
                default:
                  re += "\\" + stateChar;
                  break;
              }
              this.debug("clearStateChar %j %j", stateChar, re);
              stateChar = false;
            }
          };
          for (let i = 0, c; i < pattern.length && (c = pattern.charAt(i)); i++) {
            this.debug("%s	%s %s %j", pattern, i, re, c);
            if (escaping) {
              if (c === "/") {
                return false;
              }
              if (reSpecials[c]) {
                re += "\\";
              }
              re += c;
              escaping = false;
              continue;
            }
            switch (c) {
              case "/": {
                return false;
              }
              case "\\":
                if (inClass && pattern.charAt(i + 1) === "-") {
                  re += c;
                  continue;
                }
                clearStateChar();
                escaping = true;
                continue;
              case "?":
              case "*":
              case "+":
              case "@":
              case "!":
                this.debug("%s	%s %s %j <-- stateChar", pattern, i, re, c);
                if (inClass) {
                  this.debug("  in class");
                  if (c === "!" && i === classStart + 1)
                    c = "^";
                  re += c;
                  continue;
                }
                this.debug("call clearStateChar %j", stateChar);
                clearStateChar();
                stateChar = c;
                if (options.noext)
                  clearStateChar();
                continue;
              case "(": {
                if (inClass) {
                  re += "(";
                  continue;
                }
                if (!stateChar) {
                  re += "\\(";
                  continue;
                }
                const plEntry = {
                  type: stateChar,
                  start: i - 1,
                  reStart: re.length,
                  open: plTypes[stateChar].open,
                  close: plTypes[stateChar].close
                };
                this.debug(this.pattern, "	", plEntry);
                patternListStack.push(plEntry);
                re += plEntry.open;
                if (plEntry.start === 0 && plEntry.type !== "!") {
                  dotTravAllowed = true;
                  re += subPatternStart(pattern.slice(i + 1));
                }
                this.debug("plType %j %j", stateChar, re);
                stateChar = false;
                continue;
              }
              case ")": {
                const plEntry = patternListStack[patternListStack.length - 1];
                if (inClass || !plEntry) {
                  re += "\\)";
                  continue;
                }
                patternListStack.pop();
                clearStateChar();
                hasMagic = true;
                pl = plEntry;
                re += pl.close;
                if (pl.type === "!") {
                  negativeLists.push(Object.assign(pl, { reEnd: re.length }));
                }
                continue;
              }
              case "|": {
                const plEntry = patternListStack[patternListStack.length - 1];
                if (inClass || !plEntry) {
                  re += "\\|";
                  continue;
                }
                clearStateChar();
                re += "|";
                if (plEntry.start === 0 && plEntry.type !== "!") {
                  dotTravAllowed = true;
                  re += subPatternStart(pattern.slice(i + 1));
                }
                continue;
              }
              case "[":
                clearStateChar();
                if (inClass) {
                  re += "\\" + c;
                  continue;
                }
                inClass = true;
                classStart = i;
                reClassStart = re.length;
                re += c;
                continue;
              case "]":
                if (i === classStart + 1 || !inClass) {
                  re += "\\" + c;
                  continue;
                }
                cs = pattern.substring(classStart + 1, i);
                try {
                  RegExp("[" + braExpEscape(charUnescape(cs)) + "]");
                  re += c;
                } catch (er) {
                  re = re.substring(0, reClassStart) + "(?:$.)";
                }
                hasMagic = true;
                inClass = false;
                continue;
              default:
                clearStateChar();
                if (reSpecials[c] && !(c === "^" && inClass)) {
                  re += "\\";
                }
                re += c;
                break;
            }
          }
          if (inClass) {
            cs = pattern.slice(classStart + 1);
            sp = this.parse(cs, SUBPARSE);
            re = re.substring(0, reClassStart) + "\\[" + sp[0];
            hasMagic = hasMagic || sp[1];
          }
          for (pl = patternListStack.pop(); pl; pl = patternListStack.pop()) {
            let tail;
            tail = re.slice(pl.reStart + pl.open.length);
            this.debug("setting tail", re, pl);
            tail = tail.replace(/((?:\\{2}){0,64})(\\?)\|/g, (_, $1, $2) => {
              if (!$2) {
                $2 = "\\";
              }
              return $1 + $1 + $2 + "|";
            });
            this.debug("tail=%j\n   %s", tail, tail, pl, re);
            const t = pl.type === "*" ? star : pl.type === "?" ? qmark : "\\" + pl.type;
            hasMagic = true;
            re = re.slice(0, pl.reStart) + t + "\\(" + tail;
          }
          clearStateChar();
          if (escaping) {
            re += "\\\\";
          }
          const addPatternStart = addPatternStartSet[re.charAt(0)];
          for (let n = negativeLists.length - 1; n > -1; n--) {
            const nl = negativeLists[n];
            const nlBefore = re.slice(0, nl.reStart);
            const nlFirst = re.slice(nl.reStart, nl.reEnd - 8);
            let nlAfter = re.slice(nl.reEnd);
            const nlLast = re.slice(nl.reEnd - 8, nl.reEnd) + nlAfter;
            const closeParensBefore = nlBefore.split(")").length;
            const openParensBefore = nlBefore.split("(").length - closeParensBefore;
            let cleanAfter = nlAfter;
            for (let i = 0; i < openParensBefore; i++) {
              cleanAfter = cleanAfter.replace(/\)[+*?]?/, "");
            }
            nlAfter = cleanAfter;
            const dollar = nlAfter === "" && isSub !== SUBPARSE ? "(?:$|\\/)" : "";
            re = nlBefore + nlFirst + nlAfter + dollar + nlLast;
          }
          if (re !== "" && hasMagic) {
            re = "(?=.)" + re;
          }
          if (addPatternStart) {
            re = patternStart() + re;
          }
          if (isSub === SUBPARSE) {
            return [re, hasMagic];
          }
          if (options.nocase && !hasMagic) {
            hasMagic = pattern.toUpperCase() !== pattern.toLowerCase();
          }
          if (!hasMagic) {
            return globUnescape(pattern);
          }
          const flags = options.nocase ? "i" : "";
          try {
            return Object.assign(new RegExp("^" + re + "$", flags), {
              _glob: pattern,
              _src: re
            });
          } catch (er) {
            return new RegExp("$.");
          }
        }
        makeRe() {
          if (this.regexp || this.regexp === false)
            return this.regexp;
          const set = this.set;
          if (!set.length) {
            this.regexp = false;
            return this.regexp;
          }
          const options = this.options;
          const twoStar = options.noglobstar ? star : options.dot ? twoStarDot : twoStarNoDot;
          const flags = options.nocase ? "i" : "";
          let re = set.map((pattern) => {
            pattern = pattern.map(
              (p) => typeof p === "string" ? regExpEscape(p) : p === GLOBSTAR ? GLOBSTAR : p._src
            ).reduce((set2, p) => {
              if (!(set2[set2.length - 1] === GLOBSTAR && p === GLOBSTAR)) {
                set2.push(p);
              }
              return set2;
            }, []);
            pattern.forEach((p, i) => {
              if (p !== GLOBSTAR || pattern[i - 1] === GLOBSTAR) {
                return;
              }
              if (i === 0) {
                if (pattern.length > 1) {
                  pattern[i + 1] = "(?:\\/|" + twoStar + "\\/)?" + pattern[i + 1];
                } else {
                  pattern[i] = twoStar;
                }
              } else if (i === pattern.length - 1) {
                pattern[i - 1] += "(?:\\/|" + twoStar + ")?";
              } else {
                pattern[i - 1] += "(?:\\/|\\/" + twoStar + "\\/)" + pattern[i + 1];
                pattern[i + 1] = GLOBSTAR;
              }
            });
            return pattern.filter((p) => p !== GLOBSTAR).join("/");
          }).join("|");
          re = "^(?:" + re + ")$";
          if (this.negate)
            re = "^(?!" + re + ").*$";
          try {
            this.regexp = new RegExp(re, flags);
          } catch (ex) {
            this.regexp = false;
          }
          return this.regexp;
        }
        match(f, partial = this.partial) {
          this.debug("match", f, this.pattern);
          if (this.comment)
            return false;
          if (this.empty)
            return f === "";
          if (f === "/" && partial)
            return true;
          const options = this.options;
          if (path2.sep !== "/") {
            f = f.split(path2.sep).join("/");
          }
          f = f.split(slashSplit);
          this.debug(this.pattern, "split", f);
          const set = this.set;
          this.debug(this.pattern, "set", set);
          let filename;
          for (let i = f.length - 1; i >= 0; i--) {
            filename = f[i];
            if (filename)
              break;
          }
          for (let i = 0; i < set.length; i++) {
            const pattern = set[i];
            let file = f;
            if (options.matchBase && pattern.length === 1) {
              file = [filename];
            }
            const hit = this.matchOne(file, pattern, partial);
            if (hit) {
              if (options.flipNegate)
                return true;
              return !this.negate;
            }
          }
          if (options.flipNegate)
            return false;
          return this.negate;
        }
        static defaults(def) {
          return minimatch.defaults(def).Minimatch;
        }
      };
      minimatch.Minimatch = Minimatch;
    }
  });

  // node_modules/.pnpm/fs-jetpack@5.1.0/node_modules/fs-jetpack/lib/utils/matcher.js
  var require_matcher = __commonJS({
    "node_modules/.pnpm/fs-jetpack@5.1.0/node_modules/fs-jetpack/lib/utils/matcher.js"(exports) {
      "use strict";
      var Minimatch = require_minimatch().Minimatch;
      var convertPatternToAbsolutePath = (basePath, pattern) => {
        const hasSlash = pattern.indexOf("/") !== -1;
        const isAbsolute = /^!?\//.test(pattern);
        const isNegated = /^!/.test(pattern);
        let separator;
        if (!isAbsolute && hasSlash) {
          const patternWithoutFirstCharacters = pattern.replace(/^!/, "").replace(/^\.\//, "");
          if (/\/$/.test(basePath)) {
            separator = "";
          } else {
            separator = "/";
          }
          if (isNegated) {
            return `!${basePath}${separator}${patternWithoutFirstCharacters}`;
          }
          return `${basePath}${separator}${patternWithoutFirstCharacters}`;
        }
        return pattern;
      };
      exports.create = (basePath, patterns, ignoreCase) => {
        let normalizedPatterns;
        if (typeof patterns === "string") {
          normalizedPatterns = [patterns];
        } else {
          normalizedPatterns = patterns;
        }
        const matchers = normalizedPatterns.map((pattern) => {
          return convertPatternToAbsolutePath(basePath, pattern);
        }).map((pattern) => {
          return new Minimatch(pattern, {
            matchBase: true,
            nocomment: true,
            nocase: ignoreCase || false,
            dot: true,
            windowsPathsNoEscape: true
          });
        });
        const performMatch = (absolutePath) => {
          let mode = "matching";
          let weHaveMatch = false;
          let currentMatcher;
          let i;
          for (i = 0; i < matchers.length; i += 1) {
            currentMatcher = matchers[i];
            if (currentMatcher.negate) {
              mode = "negation";
              if (i === 0) {
                weHaveMatch = true;
              }
            }
            if (mode === "negation" && weHaveMatch && !currentMatcher.match(absolutePath)) {
              return false;
            }
            if (mode === "matching" && !weHaveMatch) {
              weHaveMatch = currentMatcher.match(absolutePath);
            }
          }
          return weHaveMatch;
        };
        return performMatch;
      };
    }
  });

  // node_modules/.pnpm/fs-jetpack@5.1.0/node_modules/fs-jetpack/lib/find.js
  var require_find = __commonJS({
    "node_modules/.pnpm/fs-jetpack@5.1.0/node_modules/fs-jetpack/lib/find.js"(exports) {
      "use strict";
      var pathUtil = __require("path");
      var treeWalker = require_tree_walker();
      var inspect2 = require_inspect();
      var matcher = require_matcher();
      var validate = require_validate();
      var validateInput = (methodName, path2, options) => {
        const methodSignature = `${methodName}([path], options)`;
        validate.argument(methodSignature, "path", path2, ["string"]);
        validate.options(methodSignature, "options", options, {
          matching: ["string", "array of string"],
          filter: ["function"],
          files: ["boolean"],
          directories: ["boolean"],
          recursive: ["boolean"],
          ignoreCase: ["boolean"]
        });
      };
      var normalizeOptions = (options) => {
        const opts = options || {};
        if (opts.matching === void 0) {
          opts.matching = "*";
        }
        if (opts.files === void 0) {
          opts.files = true;
        }
        if (opts.ignoreCase === void 0) {
          opts.ignoreCase = false;
        }
        if (opts.directories === void 0) {
          opts.directories = false;
        }
        if (opts.recursive === void 0) {
          opts.recursive = true;
        }
        return opts;
      };
      var processFoundPaths = (foundPaths, cwd2) => {
        return foundPaths.map((path2) => {
          return pathUtil.relative(cwd2, path2);
        });
      };
      var generatePathDoesntExistError = (path2) => {
        const err = new Error(`Path you want to find stuff in doesn't exist ${path2}`);
        err.code = "ENOENT";
        return err;
      };
      var generatePathNotDirectoryError = (path2) => {
        const err = new Error(
          `Path you want to find stuff in must be a directory ${path2}`
        );
        err.code = "ENOTDIR";
        return err;
      };
      var findSync = (path2, options) => {
        const foundAbsolutePaths = [];
        const matchesAnyOfGlobs = matcher.create(
          path2,
          options.matching,
          options.ignoreCase
        );
        let maxLevelsDeep = Infinity;
        if (options.recursive === false) {
          maxLevelsDeep = 1;
        }
        treeWalker.sync(
          path2,
          {
            maxLevelsDeep,
            symlinks: "follow",
            inspectOptions: { times: true, absolutePath: true }
          },
          (itemPath, item) => {
            if (item && itemPath !== path2 && matchesAnyOfGlobs(itemPath)) {
              const weHaveMatch = item.type === "file" && options.files === true || item.type === "dir" && options.directories === true;
              if (weHaveMatch) {
                if (options.filter) {
                  const passedThroughFilter = options.filter(item);
                  if (passedThroughFilter) {
                    foundAbsolutePaths.push(itemPath);
                  }
                } else {
                  foundAbsolutePaths.push(itemPath);
                }
              }
            }
          }
        );
        foundAbsolutePaths.sort();
        return processFoundPaths(foundAbsolutePaths, options.cwd);
      };
      var findSyncInit = (path2, options) => {
        const entryPointInspect = inspect2.sync(path2, { symlinks: "follow" });
        if (entryPointInspect === void 0) {
          throw generatePathDoesntExistError(path2);
        } else if (entryPointInspect.type !== "dir") {
          throw generatePathNotDirectoryError(path2);
        }
        return findSync(path2, normalizeOptions(options));
      };
      var findAsync = (path2, options) => {
        return new Promise((resolve, reject) => {
          const foundAbsolutePaths = [];
          const matchesAnyOfGlobs = matcher.create(
            path2,
            options.matching,
            options.ignoreCase
          );
          let maxLevelsDeep = Infinity;
          if (options.recursive === false) {
            maxLevelsDeep = 1;
          }
          let waitingForFiltersToFinish = 0;
          let treeWalkerDone = false;
          const maybeDone = () => {
            if (treeWalkerDone && waitingForFiltersToFinish === 0) {
              foundAbsolutePaths.sort();
              resolve(processFoundPaths(foundAbsolutePaths, options.cwd));
            }
          };
          treeWalker.async(
            path2,
            {
              maxLevelsDeep,
              symlinks: "follow",
              inspectOptions: { times: true, absolutePath: true }
            },
            (itemPath, item) => {
              if (item && itemPath !== path2 && matchesAnyOfGlobs(itemPath)) {
                const weHaveMatch = item.type === "file" && options.files === true || item.type === "dir" && options.directories === true;
                if (weHaveMatch) {
                  if (options.filter) {
                    const passedThroughFilter = options.filter(item);
                    const isPromise = typeof passedThroughFilter.then === "function";
                    if (isPromise) {
                      waitingForFiltersToFinish += 1;
                      passedThroughFilter.then((passedThroughFilterResult) => {
                        if (passedThroughFilterResult) {
                          foundAbsolutePaths.push(itemPath);
                        }
                        waitingForFiltersToFinish -= 1;
                        maybeDone();
                      }).catch((err) => {
                        reject(err);
                      });
                    } else if (passedThroughFilter) {
                      foundAbsolutePaths.push(itemPath);
                    }
                  } else {
                    foundAbsolutePaths.push(itemPath);
                  }
                }
              }
            },
            (err) => {
              if (err) {
                reject(err);
              } else {
                treeWalkerDone = true;
                maybeDone();
              }
            }
          );
        });
      };
      var findAsyncInit = (path2, options) => {
        return inspect2.async(path2, { symlinks: "follow" }).then((entryPointInspect) => {
          if (entryPointInspect === void 0) {
            throw generatePathDoesntExistError(path2);
          } else if (entryPointInspect.type !== "dir") {
            throw generatePathNotDirectoryError(path2);
          }
          return findAsync(path2, normalizeOptions(options));
        });
      };
      exports.validateInput = validateInput;
      exports.sync = findSyncInit;
      exports.async = findAsyncInit;
    }
  });

  // node_modules/.pnpm/fs-jetpack@5.1.0/node_modules/fs-jetpack/lib/inspect_tree.js
  var require_inspect_tree = __commonJS({
    "node_modules/.pnpm/fs-jetpack@5.1.0/node_modules/fs-jetpack/lib/inspect_tree.js"(exports) {
      "use strict";
      var crypto = __require("crypto");
      var pathUtil = __require("path");
      var inspect2 = require_inspect();
      var list = require_list();
      var validate = require_validate();
      var treeWalker = require_tree_walker();
      var validateInput = (methodName, path2, options) => {
        const methodSignature = `${methodName}(path, [options])`;
        validate.argument(methodSignature, "path", path2, ["string"]);
        validate.options(methodSignature, "options", options, {
          checksum: ["string"],
          relativePath: ["boolean"],
          times: ["boolean"],
          symlinks: ["string"]
        });
        if (options && options.checksum !== void 0 && inspect2.supportedChecksumAlgorithms.indexOf(options.checksum) === -1) {
          throw new Error(
            `Argument "options.checksum" passed to ${methodSignature} must have one of values: ${inspect2.supportedChecksumAlgorithms.join(
              ", "
            )}`
          );
        }
        if (options && options.symlinks !== void 0 && inspect2.symlinkOptions.indexOf(options.symlinks) === -1) {
          throw new Error(
            `Argument "options.symlinks" passed to ${methodSignature} must have one of values: ${inspect2.symlinkOptions.join(
              ", "
            )}`
          );
        }
      };
      var relativePathInTree = (parentInspectObj, inspectObj) => {
        if (parentInspectObj === void 0) {
          return ".";
        }
        return parentInspectObj.relativePath + "/" + inspectObj.name;
      };
      var checksumOfDir = (inspectList, algo) => {
        const hash = crypto.createHash(algo);
        inspectList.forEach((inspectObj) => {
          hash.update(inspectObj.name + inspectObj[algo]);
        });
        return hash.digest("hex");
      };
      var calculateTreeDependentProperties = (parentInspectObj, inspectObj, options) => {
        if (options.relativePath) {
          inspectObj.relativePath = relativePathInTree(parentInspectObj, inspectObj);
        }
        if (inspectObj.type === "dir") {
          inspectObj.children.forEach((childInspectObj) => {
            calculateTreeDependentProperties(inspectObj, childInspectObj, options);
          });
          inspectObj.size = 0;
          inspectObj.children.sort((a, b) => {
            if (a.type === "dir" && b.type === "file") {
              return -1;
            }
            if (a.type === "file" && b.type === "dir") {
              return 1;
            }
            return a.name.localeCompare(b.name);
          });
          inspectObj.children.forEach((child) => {
            inspectObj.size += child.size || 0;
          });
          if (options.checksum) {
            inspectObj[options.checksum] = checksumOfDir(
              inspectObj.children,
              options.checksum
            );
          }
        }
      };
      var findParentInTree = (treeNode, pathChain, item) => {
        const name = pathChain[0];
        if (pathChain.length > 1) {
          const itemInTreeForPathChain = treeNode.children.find((child) => {
            return child.name === name;
          });
          return findParentInTree(itemInTreeForPathChain, pathChain.slice(1), item);
        }
        return treeNode;
      };
      var inspectTreeSync = (path2, opts) => {
        const options = opts || {};
        let tree;
        treeWalker.sync(path2, { inspectOptions: options }, (itemPath, item) => {
          if (item) {
            if (item.type === "dir") {
              item.children = [];
            }
            const relativePath = pathUtil.relative(path2, itemPath);
            if (relativePath === "") {
              tree = item;
            } else {
              const parentItem = findParentInTree(
                tree,
                relativePath.split(pathUtil.sep),
                item
              );
              parentItem.children.push(item);
            }
          }
        });
        if (tree) {
          calculateTreeDependentProperties(void 0, tree, options);
        }
        return tree;
      };
      var inspectTreeAsync = (path2, opts) => {
        const options = opts || {};
        let tree;
        return new Promise((resolve, reject) => {
          treeWalker.async(
            path2,
            { inspectOptions: options },
            (itemPath, item) => {
              if (item) {
                if (item.type === "dir") {
                  item.children = [];
                }
                const relativePath = pathUtil.relative(path2, itemPath);
                if (relativePath === "") {
                  tree = item;
                } else {
                  const parentItem = findParentInTree(
                    tree,
                    relativePath.split(pathUtil.sep),
                    item
                  );
                  parentItem.children.push(item);
                }
              }
            },
            (err) => {
              if (err) {
                reject(err);
              } else {
                if (tree) {
                  calculateTreeDependentProperties(void 0, tree, options);
                }
                resolve(tree);
              }
            }
          );
        });
      };
      exports.validateInput = validateInput;
      exports.sync = inspectTreeSync;
      exports.async = inspectTreeAsync;
    }
  });

  // node_modules/.pnpm/fs-jetpack@5.1.0/node_modules/fs-jetpack/lib/exists.js
  var require_exists = __commonJS({
    "node_modules/.pnpm/fs-jetpack@5.1.0/node_modules/fs-jetpack/lib/exists.js"(exports) {
      "use strict";
      var fs2 = require_fs();
      var validate = require_validate();
      var validateInput = (methodName, path2) => {
        const methodSignature = `${methodName}(path)`;
        validate.argument(methodSignature, "path", path2, ["string"]);
      };
      var existsSync4 = (path2) => {
        try {
          const stat = fs2.statSync(path2);
          if (stat.isDirectory()) {
            return "dir";
          } else if (stat.isFile()) {
            return "file";
          }
          return "other";
        } catch (err) {
          if (err.code !== "ENOENT") {
            throw err;
          }
        }
        return false;
      };
      var existsAsync4 = (path2) => {
        return new Promise((resolve, reject) => {
          fs2.stat(path2).then((stat) => {
            if (stat.isDirectory()) {
              resolve("dir");
            } else if (stat.isFile()) {
              resolve("file");
            } else {
              resolve("other");
            }
          }).catch((err) => {
            if (err.code === "ENOENT") {
              resolve(false);
            } else {
              reject(err);
            }
          });
        });
      };
      exports.validateInput = validateInput;
      exports.sync = existsSync4;
      exports.async = existsAsync4;
    }
  });

  // node_modules/.pnpm/fs-jetpack@5.1.0/node_modules/fs-jetpack/lib/copy.js
  var require_copy = __commonJS({
    "node_modules/.pnpm/fs-jetpack@5.1.0/node_modules/fs-jetpack/lib/copy.js"(exports) {
      "use strict";
      var pathUtil = __require("path");
      var fs2 = require_fs();
      var dir2 = require_dir();
      var exists = require_exists();
      var inspect2 = require_inspect();
      var write = require_write();
      var matcher = require_matcher();
      var fileMode = require_mode();
      var treeWalker = require_tree_walker();
      var validate = require_validate();
      var validateInput = (methodName, from, to, options) => {
        const methodSignature = `${methodName}(from, to, [options])`;
        validate.argument(methodSignature, "from", from, ["string"]);
        validate.argument(methodSignature, "to", to, ["string"]);
        validate.options(methodSignature, "options", options, {
          overwrite: ["boolean", "function"],
          matching: ["string", "array of string"],
          ignoreCase: ["boolean"]
        });
      };
      var parseOptions = (options, from) => {
        const opts = options || {};
        const parsedOptions = {};
        if (opts.ignoreCase === void 0) {
          opts.ignoreCase = false;
        }
        parsedOptions.overwrite = opts.overwrite;
        if (opts.matching) {
          parsedOptions.allowedToCopy = matcher.create(
            from,
            opts.matching,
            opts.ignoreCase
          );
        } else {
          parsedOptions.allowedToCopy = () => {
            return true;
          };
        }
        return parsedOptions;
      };
      var generateNoSourceError = (path2) => {
        const err = new Error(`Path to copy doesn't exist ${path2}`);
        err.code = "ENOENT";
        return err;
      };
      var generateDestinationExistsError = (path2) => {
        const err = new Error(`Destination path already exists ${path2}`);
        err.code = "EEXIST";
        return err;
      };
      var inspectOptions = {
        mode: true,
        symlinks: "report",
        times: true,
        absolutePath: true
      };
      var shouldThrowDestinationExistsError = (context) => {
        return typeof context.opts.overwrite !== "function" && context.opts.overwrite !== true;
      };
      var checksBeforeCopyingSync = (from, to, opts) => {
        if (!exists.sync(from)) {
          throw generateNoSourceError(from);
        }
        if (exists.sync(to) && !opts.overwrite) {
          throw generateDestinationExistsError(to);
        }
      };
      var canOverwriteItSync = (context) => {
        if (typeof context.opts.overwrite === "function") {
          const destInspectData = inspect2.sync(context.destPath, inspectOptions);
          return context.opts.overwrite(context.srcInspectData, destInspectData);
        }
        return context.opts.overwrite === true;
      };
      var copyFileSync = (srcPath, destPath, mode, context) => {
        const data = fs2.readFileSync(srcPath);
        try {
          fs2.writeFileSync(destPath, data, { mode, flag: "wx" });
        } catch (err) {
          if (err.code === "ENOENT") {
            write.sync(destPath, data, { mode });
          } else if (err.code === "EEXIST") {
            if (canOverwriteItSync(context)) {
              fs2.writeFileSync(destPath, data, { mode });
            } else if (shouldThrowDestinationExistsError(context)) {
              throw generateDestinationExistsError(context.destPath);
            }
          } else {
            throw err;
          }
        }
      };
      var copySymlinkSync = (from, to) => {
        const symlinkPointsAt = fs2.readlinkSync(from);
        try {
          fs2.symlinkSync(symlinkPointsAt, to);
        } catch (err) {
          if (err.code === "EEXIST") {
            fs2.unlinkSync(to);
            fs2.symlinkSync(symlinkPointsAt, to);
          } else {
            throw err;
          }
        }
      };
      var copyItemSync = (srcPath, srcInspectData, destPath, opts) => {
        const context = { srcPath, destPath, srcInspectData, opts };
        const mode = fileMode.normalizeFileMode(srcInspectData.mode);
        if (srcInspectData.type === "dir") {
          dir2.createSync(destPath, { mode });
        } else if (srcInspectData.type === "file") {
          copyFileSync(srcPath, destPath, mode, context);
        } else if (srcInspectData.type === "symlink") {
          copySymlinkSync(srcPath, destPath);
        }
      };
      var copySync = (from, to, options) => {
        const opts = parseOptions(options, from);
        checksBeforeCopyingSync(from, to, opts);
        treeWalker.sync(from, { inspectOptions }, (srcPath, srcInspectData) => {
          const rel = pathUtil.relative(from, srcPath);
          const destPath = pathUtil.resolve(to, rel);
          if (opts.allowedToCopy(srcPath, destPath, srcInspectData)) {
            copyItemSync(srcPath, srcInspectData, destPath, opts);
          }
        });
      };
      var checksBeforeCopyingAsync = (from, to, opts) => {
        return exists.async(from).then((srcPathExists) => {
          if (!srcPathExists) {
            throw generateNoSourceError(from);
          } else {
            return exists.async(to);
          }
        }).then((destPathExists) => {
          if (destPathExists && !opts.overwrite) {
            throw generateDestinationExistsError(to);
          }
        });
      };
      var canOverwriteItAsync = (context) => {
        return new Promise((resolve, reject) => {
          if (typeof context.opts.overwrite === "function") {
            inspect2.async(context.destPath, inspectOptions).then((destInspectData) => {
              resolve(
                context.opts.overwrite(context.srcInspectData, destInspectData)
              );
            }).catch(reject);
          } else {
            resolve(context.opts.overwrite === true);
          }
        });
      };
      var copyFileAsync = (srcPath, destPath, mode, context, runOptions) => {
        return new Promise((resolve, reject) => {
          const runOpts = runOptions || {};
          let flags = "wx";
          if (runOpts.overwrite) {
            flags = "w";
          }
          const readStream = fs2.createReadStream(srcPath);
          const writeStream = fs2.createWriteStream(destPath, { mode, flags });
          readStream.on("error", reject);
          writeStream.on("error", (err) => {
            readStream.resume();
            if (err.code === "ENOENT") {
              dir2.createAsync(pathUtil.dirname(destPath)).then(() => {
                copyFileAsync(srcPath, destPath, mode, context).then(
                  resolve,
                  reject
                );
              }).catch(reject);
            } else if (err.code === "EEXIST") {
              canOverwriteItAsync(context).then((canOverwite) => {
                if (canOverwite) {
                  copyFileAsync(srcPath, destPath, mode, context, {
                    overwrite: true
                  }).then(resolve, reject);
                } else if (shouldThrowDestinationExistsError(context)) {
                  reject(generateDestinationExistsError(destPath));
                } else {
                  resolve();
                }
              }).catch(reject);
            } else {
              reject(err);
            }
          });
          writeStream.on("finish", resolve);
          readStream.pipe(writeStream);
        });
      };
      var copySymlinkAsync = (from, to) => {
        return fs2.readlink(from).then((symlinkPointsAt) => {
          return new Promise((resolve, reject) => {
            fs2.symlink(symlinkPointsAt, to).then(resolve).catch((err) => {
              if (err.code === "EEXIST") {
                fs2.unlink(to).then(() => {
                  return fs2.symlink(symlinkPointsAt, to);
                }).then(resolve, reject);
              } else {
                reject(err);
              }
            });
          });
        });
      };
      var copyItemAsync = (srcPath, srcInspectData, destPath, opts) => {
        const context = { srcPath, destPath, srcInspectData, opts };
        const mode = fileMode.normalizeFileMode(srcInspectData.mode);
        if (srcInspectData.type === "dir") {
          return dir2.createAsync(destPath, { mode });
        } else if (srcInspectData.type === "file") {
          return copyFileAsync(srcPath, destPath, mode, context);
        } else if (srcInspectData.type === "symlink") {
          return copySymlinkAsync(srcPath, destPath);
        }
        return Promise.resolve();
      };
      var copyAsync = (from, to, options) => {
        return new Promise((resolve, reject) => {
          const opts = parseOptions(options, from);
          checksBeforeCopyingAsync(from, to, opts).then(() => {
            let allFilesDelivered = false;
            let filesInProgress = 0;
            treeWalker.async(
              from,
              { inspectOptions },
              (srcPath, item) => {
                if (item) {
                  const rel = pathUtil.relative(from, srcPath);
                  const destPath = pathUtil.resolve(to, rel);
                  if (opts.allowedToCopy(srcPath, item, destPath)) {
                    filesInProgress += 1;
                    copyItemAsync(srcPath, item, destPath, opts).then(() => {
                      filesInProgress -= 1;
                      if (allFilesDelivered && filesInProgress === 0) {
                        resolve();
                      }
                    }).catch(reject);
                  }
                }
              },
              (err) => {
                if (err) {
                  reject(err);
                } else {
                  allFilesDelivered = true;
                  if (allFilesDelivered && filesInProgress === 0) {
                    resolve();
                  }
                }
              }
            );
          }).catch(reject);
        });
      };
      exports.validateInput = validateInput;
      exports.sync = copySync;
      exports.async = copyAsync;
    }
  });

  // node_modules/.pnpm/fs-jetpack@5.1.0/node_modules/fs-jetpack/lib/move.js
  var require_move = __commonJS({
    "node_modules/.pnpm/fs-jetpack@5.1.0/node_modules/fs-jetpack/lib/move.js"(exports) {
      "use strict";
      var pathUtil = __require("path");
      var fs2 = require_fs();
      var validate = require_validate();
      var copy = require_copy();
      var dir2 = require_dir();
      var exists = require_exists();
      var remove = require_remove();
      var validateInput = (methodName, from, to, options) => {
        const methodSignature = `${methodName}(from, to, [options])`;
        validate.argument(methodSignature, "from", from, ["string"]);
        validate.argument(methodSignature, "to", to, ["string"]);
        validate.options(methodSignature, "options", options, {
          overwrite: ["boolean"]
        });
      };
      var parseOptions = (options) => {
        const opts = options || {};
        return opts;
      };
      var generateDestinationExistsError = (path2) => {
        const err = new Error(`Destination path already exists ${path2}`);
        err.code = "EEXIST";
        return err;
      };
      var generateSourceDoesntExistError = (path2) => {
        const err = new Error(`Path to move doesn't exist ${path2}`);
        err.code = "ENOENT";
        return err;
      };
      var moveSync = (from, to, options) => {
        const opts = parseOptions(options);
        if (exists.sync(to) !== false && opts.overwrite !== true) {
          throw generateDestinationExistsError(to);
        }
        try {
          fs2.renameSync(from, to);
        } catch (err) {
          if (err.code === "EISDIR" || err.code === "EPERM") {
            remove.sync(to);
            fs2.renameSync(from, to);
          } else if (err.code === "EXDEV") {
            copy.sync(from, to, { overwrite: true });
            remove.sync(from);
          } else if (err.code === "ENOENT") {
            if (!exists.sync(from)) {
              throw generateSourceDoesntExistError(from);
            }
            dir2.createSync(pathUtil.dirname(to));
            fs2.renameSync(from, to);
          } else {
            throw err;
          }
        }
      };
      var ensureDestinationPathExistsAsync = (to) => {
        return new Promise((resolve, reject) => {
          const destDir = pathUtil.dirname(to);
          exists.async(destDir).then((dstExists) => {
            if (!dstExists) {
              dir2.createAsync(destDir).then(resolve, reject);
            } else {
              reject();
            }
          }).catch(reject);
        });
      };
      var moveAsync = (from, to, options) => {
        const opts = parseOptions(options);
        return new Promise((resolve, reject) => {
          exists.async(to).then((destinationExists) => {
            if (destinationExists !== false && opts.overwrite !== true) {
              reject(generateDestinationExistsError(to));
            } else {
              fs2.rename(from, to).then(resolve).catch((err) => {
                if (err.code === "EISDIR" || err.code === "EPERM") {
                  remove.async(to).then(() => fs2.rename(from, to)).then(resolve, reject);
                } else if (err.code === "EXDEV") {
                  copy.async(from, to, { overwrite: true }).then(() => remove.async(from)).then(resolve, reject);
                } else if (err.code === "ENOENT") {
                  exists.async(from).then((srcExists) => {
                    if (!srcExists) {
                      reject(generateSourceDoesntExistError(from));
                    } else {
                      ensureDestinationPathExistsAsync(to).then(() => {
                        return fs2.rename(from, to);
                      }).then(resolve, reject);
                    }
                  }).catch(reject);
                } else {
                  reject(err);
                }
              });
            }
          });
        });
      };
      exports.validateInput = validateInput;
      exports.sync = moveSync;
      exports.async = moveAsync;
    }
  });

  // node_modules/.pnpm/fs-jetpack@5.1.0/node_modules/fs-jetpack/lib/read.js
  var require_read = __commonJS({
    "node_modules/.pnpm/fs-jetpack@5.1.0/node_modules/fs-jetpack/lib/read.js"(exports) {
      "use strict";
      var fs2 = require_fs();
      var validate = require_validate();
      var supportedReturnAs = ["utf8", "buffer", "json", "jsonWithDates"];
      var validateInput = (methodName, path2, returnAs) => {
        const methodSignature = `${methodName}(path, returnAs)`;
        validate.argument(methodSignature, "path", path2, ["string"]);
        validate.argument(methodSignature, "returnAs", returnAs, [
          "string",
          "undefined"
        ]);
        if (returnAs && supportedReturnAs.indexOf(returnAs) === -1) {
          throw new Error(
            `Argument "returnAs" passed to ${methodSignature} must have one of values: ${supportedReturnAs.join(
              ", "
            )}`
          );
        }
      };
      var jsonDateParser = (key, value) => {
        const reISO = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2}(?:\.\d*))(?:Z|(\+|-)([\d|:]*))?$/;
        if (typeof value === "string") {
          if (reISO.exec(value)) {
            return new Date(value);
          }
        }
        return value;
      };
      var makeNicerJsonParsingError = (path2, err) => {
        const nicerError = new Error(
          `JSON parsing failed while reading ${path2} [${err}]`
        );
        nicerError.originalError = err;
        return nicerError;
      };
      var readSync = (path2, returnAs) => {
        const retAs = returnAs || "utf8";
        let data;
        let encoding = "utf8";
        if (retAs === "buffer") {
          encoding = null;
        }
        try {
          data = fs2.readFileSync(path2, { encoding });
        } catch (err) {
          if (err.code === "ENOENT") {
            return void 0;
          }
          throw err;
        }
        try {
          if (retAs === "json") {
            data = JSON.parse(data);
          } else if (retAs === "jsonWithDates") {
            data = JSON.parse(data, jsonDateParser);
          }
        } catch (err) {
          throw makeNicerJsonParsingError(path2, err);
        }
        return data;
      };
      var readAsync3 = (path2, returnAs) => {
        return new Promise((resolve, reject) => {
          const retAs = returnAs || "utf8";
          let encoding = "utf8";
          if (retAs === "buffer") {
            encoding = null;
          }
          fs2.readFile(path2, { encoding }).then((data) => {
            try {
              if (retAs === "json") {
                resolve(JSON.parse(data));
              } else if (retAs === "jsonWithDates") {
                resolve(JSON.parse(data, jsonDateParser));
              } else {
                resolve(data);
              }
            } catch (err) {
              reject(makeNicerJsonParsingError(path2, err));
            }
          }).catch((err) => {
            if (err.code === "ENOENT") {
              resolve(void 0);
            } else {
              reject(err);
            }
          });
        });
      };
      exports.validateInput = validateInput;
      exports.sync = readSync;
      exports.async = readAsync3;
    }
  });

  // node_modules/.pnpm/fs-jetpack@5.1.0/node_modules/fs-jetpack/lib/rename.js
  var require_rename = __commonJS({
    "node_modules/.pnpm/fs-jetpack@5.1.0/node_modules/fs-jetpack/lib/rename.js"(exports) {
      "use strict";
      var pathUtil = __require("path");
      var move = require_move();
      var validate = require_validate();
      var validateInput = (methodName, path2, newName, options) => {
        const methodSignature = `${methodName}(path, newName, [options])`;
        validate.argument(methodSignature, "path", path2, ["string"]);
        validate.argument(methodSignature, "newName", newName, ["string"]);
        validate.options(methodSignature, "options", options, {
          overwrite: ["boolean"]
        });
        if (pathUtil.basename(newName) !== newName) {
          throw new Error(
            `Argument "newName" passed to ${methodSignature} should be a filename, not a path. Received "${newName}"`
          );
        }
      };
      var renameSync = (path2, newName, options) => {
        const newPath = pathUtil.join(pathUtil.dirname(path2), newName);
        move.sync(path2, newPath, options);
      };
      var renameAsync = (path2, newName, options) => {
        const newPath = pathUtil.join(pathUtil.dirname(path2), newName);
        return move.async(path2, newPath, options);
      };
      exports.validateInput = validateInput;
      exports.sync = renameSync;
      exports.async = renameAsync;
    }
  });

  // node_modules/.pnpm/fs-jetpack@5.1.0/node_modules/fs-jetpack/lib/symlink.js
  var require_symlink = __commonJS({
    "node_modules/.pnpm/fs-jetpack@5.1.0/node_modules/fs-jetpack/lib/symlink.js"(exports) {
      "use strict";
      var pathUtil = __require("path");
      var fs2 = require_fs();
      var validate = require_validate();
      var dir2 = require_dir();
      var validateInput = (methodName, symlinkValue, path2) => {
        const methodSignature = `${methodName}(symlinkValue, path)`;
        validate.argument(methodSignature, "symlinkValue", symlinkValue, ["string"]);
        validate.argument(methodSignature, "path", path2, ["string"]);
      };
      var symlinkSync = (symlinkValue, path2) => {
        try {
          fs2.symlinkSync(symlinkValue, path2);
        } catch (err) {
          if (err.code === "ENOENT") {
            dir2.createSync(pathUtil.dirname(path2));
            fs2.symlinkSync(symlinkValue, path2);
          } else {
            throw err;
          }
        }
      };
      var symlinkAsync = (symlinkValue, path2) => {
        return new Promise((resolve, reject) => {
          fs2.symlink(symlinkValue, path2).then(resolve).catch((err) => {
            if (err.code === "ENOENT") {
              dir2.createAsync(pathUtil.dirname(path2)).then(() => {
                return fs2.symlink(symlinkValue, path2);
              }).then(resolve, reject);
            } else {
              reject(err);
            }
          });
        });
      };
      exports.validateInput = validateInput;
      exports.sync = symlinkSync;
      exports.async = symlinkAsync;
    }
  });

  // node_modules/.pnpm/fs-jetpack@5.1.0/node_modules/fs-jetpack/lib/streams.js
  var require_streams = __commonJS({
    "node_modules/.pnpm/fs-jetpack@5.1.0/node_modules/fs-jetpack/lib/streams.js"(exports) {
      "use strict";
      var fs2 = __require("fs");
      exports.createWriteStream = fs2.createWriteStream;
      exports.createReadStream = fs2.createReadStream;
    }
  });

  // node_modules/.pnpm/fs-jetpack@5.1.0/node_modules/fs-jetpack/lib/tmp_dir.js
  var require_tmp_dir = __commonJS({
    "node_modules/.pnpm/fs-jetpack@5.1.0/node_modules/fs-jetpack/lib/tmp_dir.js"(exports) {
      "use strict";
      var pathUtil = __require("path");
      var os3 = __require("os");
      var crypto = __require("crypto");
      var dir2 = require_dir();
      var fs2 = require_fs();
      var validate = require_validate();
      var validateInput = (methodName, options) => {
        const methodSignature = `${methodName}([options])`;
        validate.options(methodSignature, "options", options, {
          prefix: ["string"],
          basePath: ["string"]
        });
      };
      var getOptionsDefaults = (passedOptions, cwdPath) => {
        passedOptions = passedOptions || {};
        const options = {};
        if (typeof passedOptions.prefix !== "string") {
          options.prefix = "";
        } else {
          options.prefix = passedOptions.prefix;
        }
        if (typeof passedOptions.basePath === "string") {
          options.basePath = pathUtil.resolve(cwdPath, passedOptions.basePath);
        } else {
          options.basePath = os3.tmpdir();
        }
        return options;
      };
      var randomStringLength = 32;
      var tmpDirSync = (cwdPath, passedOptions) => {
        const options = getOptionsDefaults(passedOptions, cwdPath);
        const randomString = crypto.randomBytes(randomStringLength / 2).toString("hex");
        const dirPath = pathUtil.join(
          options.basePath,
          options.prefix + randomString
        );
        try {
          fs2.mkdirSync(dirPath);
        } catch (err) {
          if (err.code === "ENOENT") {
            dir2.sync(dirPath);
          } else {
            throw err;
          }
        }
        return dirPath;
      };
      var tmpDirAsync = (cwdPath, passedOptions) => {
        return new Promise((resolve, reject) => {
          const options = getOptionsDefaults(passedOptions, cwdPath);
          crypto.randomBytes(randomStringLength / 2, (err, bytes) => {
            if (err) {
              reject(err);
            } else {
              const randomString = bytes.toString("hex");
              const dirPath = pathUtil.join(
                options.basePath,
                options.prefix + randomString
              );
              fs2.mkdir(dirPath, (err2) => {
                if (err2) {
                  if (err2.code === "ENOENT") {
                    dir2.async(dirPath).then(() => {
                      resolve(dirPath);
                    }, reject);
                  } else {
                    reject(err2);
                  }
                } else {
                  resolve(dirPath);
                }
              });
            }
          });
        });
      };
      exports.validateInput = validateInput;
      exports.sync = tmpDirSync;
      exports.async = tmpDirAsync;
    }
  });

  // node_modules/.pnpm/fs-jetpack@5.1.0/node_modules/fs-jetpack/lib/jetpack.js
  var require_jetpack = __commonJS({
    "node_modules/.pnpm/fs-jetpack@5.1.0/node_modules/fs-jetpack/lib/jetpack.js"(exports, module) {
      "use strict";
      var util = __require("util");
      var pathUtil = __require("path");
      var append = require_append();
      var dir2 = require_dir();
      var file = require_file();
      var find = require_find();
      var inspect2 = require_inspect();
      var inspectTree = require_inspect_tree();
      var copy = require_copy();
      var exists = require_exists();
      var list = require_list();
      var move = require_move();
      var read = require_read();
      var remove = require_remove();
      var rename = require_rename();
      var symlink = require_symlink();
      var streams = require_streams();
      var tmpDir = require_tmp_dir();
      var write = require_write();
      var jetpackContext = (cwdPath) => {
        const getCwdPath = () => {
          return cwdPath || process.cwd();
        };
        const cwd2 = function() {
          if (arguments.length === 0) {
            return getCwdPath();
          }
          const args = Array.prototype.slice.call(arguments);
          const pathParts = [getCwdPath()].concat(args);
          return jetpackContext(pathUtil.resolve.apply(null, pathParts));
        };
        const resolvePath = (path2) => {
          return pathUtil.resolve(getCwdPath(), path2);
        };
        const getPath = function() {
          Array.prototype.unshift.call(arguments, getCwdPath());
          return pathUtil.resolve.apply(null, arguments);
        };
        const normalizeOptions = (options) => {
          const opts = options || {};
          opts.cwd = getCwdPath();
          return opts;
        };
        const api = {
          cwd: cwd2,
          path: getPath,
          append: (path2, data, options) => {
            append.validateInput("append", path2, data, options);
            append.sync(resolvePath(path2), data, options);
          },
          appendAsync: (path2, data, options) => {
            append.validateInput("appendAsync", path2, data, options);
            return append.async(resolvePath(path2), data, options);
          },
          copy: (from, to, options) => {
            copy.validateInput("copy", from, to, options);
            copy.sync(resolvePath(from), resolvePath(to), options);
          },
          copyAsync: (from, to, options) => {
            copy.validateInput("copyAsync", from, to, options);
            return copy.async(resolvePath(from), resolvePath(to), options);
          },
          createWriteStream: (path2, options) => {
            return streams.createWriteStream(resolvePath(path2), options);
          },
          createReadStream: (path2, options) => {
            return streams.createReadStream(resolvePath(path2), options);
          },
          dir: (path2, criteria) => {
            dir2.validateInput("dir", path2, criteria);
            const normalizedPath = resolvePath(path2);
            dir2.sync(normalizedPath, criteria);
            return cwd2(normalizedPath);
          },
          dirAsync: (path2, criteria) => {
            dir2.validateInput("dirAsync", path2, criteria);
            return new Promise((resolve, reject) => {
              const normalizedPath = resolvePath(path2);
              dir2.async(normalizedPath, criteria).then(() => {
                resolve(cwd2(normalizedPath));
              }, reject);
            });
          },
          exists: (path2) => {
            exists.validateInput("exists", path2);
            return exists.sync(resolvePath(path2));
          },
          existsAsync: (path2) => {
            exists.validateInput("existsAsync", path2);
            return exists.async(resolvePath(path2));
          },
          file: (path2, criteria) => {
            file.validateInput("file", path2, criteria);
            file.sync(resolvePath(path2), criteria);
            return api;
          },
          fileAsync: (path2, criteria) => {
            file.validateInput("fileAsync", path2, criteria);
            return new Promise((resolve, reject) => {
              file.async(resolvePath(path2), criteria).then(() => {
                resolve(api);
              }, reject);
            });
          },
          find: (startPath, options) => {
            if (typeof options === "undefined" && typeof startPath === "object") {
              options = startPath;
              startPath = ".";
            }
            find.validateInput("find", startPath, options);
            return find.sync(resolvePath(startPath), normalizeOptions(options));
          },
          findAsync: (startPath, options) => {
            if (typeof options === "undefined" && typeof startPath === "object") {
              options = startPath;
              startPath = ".";
            }
            find.validateInput("findAsync", startPath, options);
            return find.async(resolvePath(startPath), normalizeOptions(options));
          },
          inspect: (path2, fieldsToInclude) => {
            inspect2.validateInput("inspect", path2, fieldsToInclude);
            return inspect2.sync(resolvePath(path2), fieldsToInclude);
          },
          inspectAsync: (path2, fieldsToInclude) => {
            inspect2.validateInput("inspectAsync", path2, fieldsToInclude);
            return inspect2.async(resolvePath(path2), fieldsToInclude);
          },
          inspectTree: (path2, options) => {
            inspectTree.validateInput("inspectTree", path2, options);
            return inspectTree.sync(resolvePath(path2), options);
          },
          inspectTreeAsync: (path2, options) => {
            inspectTree.validateInput("inspectTreeAsync", path2, options);
            return inspectTree.async(resolvePath(path2), options);
          },
          list: (path2) => {
            list.validateInput("list", path2);
            return list.sync(resolvePath(path2 || "."));
          },
          listAsync: (path2) => {
            list.validateInput("listAsync", path2);
            return list.async(resolvePath(path2 || "."));
          },
          move: (from, to, options) => {
            move.validateInput("move", from, to, options);
            move.sync(resolvePath(from), resolvePath(to), options);
          },
          moveAsync: (from, to, options) => {
            move.validateInput("moveAsync", from, to, options);
            return move.async(resolvePath(from), resolvePath(to), options);
          },
          read: (path2, returnAs) => {
            read.validateInput("read", path2, returnAs);
            return read.sync(resolvePath(path2), returnAs);
          },
          readAsync: (path2, returnAs) => {
            read.validateInput("readAsync", path2, returnAs);
            return read.async(resolvePath(path2), returnAs);
          },
          remove: (path2) => {
            remove.validateInput("remove", path2);
            remove.sync(resolvePath(path2 || "."));
          },
          removeAsync: (path2) => {
            remove.validateInput("removeAsync", path2);
            return remove.async(resolvePath(path2 || "."));
          },
          rename: (path2, newName, options) => {
            rename.validateInput("rename", path2, newName, options);
            rename.sync(resolvePath(path2), newName, options);
          },
          renameAsync: (path2, newName, options) => {
            rename.validateInput("renameAsync", path2, newName, options);
            return rename.async(resolvePath(path2), newName, options);
          },
          symlink: (symlinkValue, path2) => {
            symlink.validateInput("symlink", symlinkValue, path2);
            symlink.sync(symlinkValue, resolvePath(path2));
          },
          symlinkAsync: (symlinkValue, path2) => {
            symlink.validateInput("symlinkAsync", symlinkValue, path2);
            return symlink.async(symlinkValue, resolvePath(path2));
          },
          tmpDir: (options) => {
            tmpDir.validateInput("tmpDir", options);
            const pathOfCreatedDirectory = tmpDir.sync(getCwdPath(), options);
            return cwd2(pathOfCreatedDirectory);
          },
          tmpDirAsync: (options) => {
            tmpDir.validateInput("tmpDirAsync", options);
            return new Promise((resolve, reject) => {
              tmpDir.async(getCwdPath(), options).then((pathOfCreatedDirectory) => {
                resolve(cwd2(pathOfCreatedDirectory));
              }, reject);
            });
          },
          write: (path2, data, options) => {
            write.validateInput("write", path2, data, options);
            write.sync(resolvePath(path2), data, options);
          },
          writeAsync: (path2, data, options) => {
            write.validateInput("writeAsync", path2, data, options);
            return write.async(resolvePath(path2), data, options);
          }
        };
        if (util.inspect.custom !== void 0) {
          api[util.inspect.custom] = () => {
            return `[fs-jetpack CWD: ${getCwdPath()}]`;
          };
        }
        return api;
      };
      module.exports = jetpackContext;
    }
  });

  // node_modules/.pnpm/fs-jetpack@5.1.0/node_modules/fs-jetpack/main.js
  var require_main2 = __commonJS({
    "node_modules/.pnpm/fs-jetpack@5.1.0/node_modules/fs-jetpack/main.js"(exports, module) {
      "use strict";
      var jetpack = require_jetpack();
      module.exports = jetpack();
    }
  });

  // node_modules/.pnpm/@noble+hashes@1.3.1/node_modules/@noble/hashes/_assert.js
  var require_assert = __commonJS({
    "node_modules/.pnpm/@noble+hashes@1.3.1/node_modules/@noble/hashes/_assert.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.output = exports.exists = exports.hash = exports.bytes = exports.bool = exports.number = void 0;
      function number(n) {
        if (!Number.isSafeInteger(n) || n < 0)
          throw new Error(`Wrong positive integer: ${n}`);
      }
      exports.number = number;
      function bool(b) {
        if (typeof b !== "boolean")
          throw new Error(`Expected boolean, not ${b}`);
      }
      exports.bool = bool;
      function bytes(b, ...lengths) {
        if (!(b instanceof Uint8Array))
          throw new Error("Expected Uint8Array");
        if (lengths.length > 0 && !lengths.includes(b.length))
          throw new Error(`Expected Uint8Array of length ${lengths}, not of length=${b.length}`);
      }
      exports.bytes = bytes;
      function hash(hash2) {
        if (typeof hash2 !== "function" || typeof hash2.create !== "function")
          throw new Error("Hash should be wrapped by utils.wrapConstructor");
        number(hash2.outputLen);
        number(hash2.blockLen);
      }
      exports.hash = hash;
      function exists(instance, checkFinished = true) {
        if (instance.destroyed)
          throw new Error("Hash instance has been destroyed");
        if (checkFinished && instance.finished)
          throw new Error("Hash#digest() has already been called");
      }
      exports.exists = exists;
      function output(out, instance) {
        bytes(out);
        const min = instance.outputLen;
        if (out.length < min) {
          throw new Error(`digestInto() expects output buffer of length at least ${min}`);
        }
      }
      exports.output = output;
      var assert = {
        number,
        bool,
        bytes,
        hash,
        exists,
        output
      };
      exports.default = assert;
    }
  });

  // node_modules/.pnpm/@noble+hashes@1.3.1/node_modules/@noble/hashes/_u64.js
  var require_u64 = __commonJS({
    "node_modules/.pnpm/@noble+hashes@1.3.1/node_modules/@noble/hashes/_u64.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.add = exports.toBig = exports.split = exports.fromBig = void 0;
      var U32_MASK64 = BigInt(2 ** 32 - 1);
      var _32n = BigInt(32);
      function fromBig(n, le = false) {
        if (le)
          return { h: Number(n & U32_MASK64), l: Number(n >> _32n & U32_MASK64) };
        return { h: Number(n >> _32n & U32_MASK64) | 0, l: Number(n & U32_MASK64) | 0 };
      }
      exports.fromBig = fromBig;
      function split(lst, le = false) {
        let Ah = new Uint32Array(lst.length);
        let Al = new Uint32Array(lst.length);
        for (let i = 0; i < lst.length; i++) {
          const { h, l } = fromBig(lst[i], le);
          [Ah[i], Al[i]] = [h, l];
        }
        return [Ah, Al];
      }
      exports.split = split;
      var toBig = (h, l) => BigInt(h >>> 0) << _32n | BigInt(l >>> 0);
      exports.toBig = toBig;
      var shrSH = (h, l, s) => h >>> s;
      var shrSL = (h, l, s) => h << 32 - s | l >>> s;
      var rotrSH = (h, l, s) => h >>> s | l << 32 - s;
      var rotrSL = (h, l, s) => h << 32 - s | l >>> s;
      var rotrBH = (h, l, s) => h << 64 - s | l >>> s - 32;
      var rotrBL = (h, l, s) => h >>> s - 32 | l << 64 - s;
      var rotr32H = (h, l) => l;
      var rotr32L = (h, l) => h;
      var rotlSH = (h, l, s) => h << s | l >>> 32 - s;
      var rotlSL = (h, l, s) => l << s | h >>> 32 - s;
      var rotlBH = (h, l, s) => l << s - 32 | h >>> 64 - s;
      var rotlBL = (h, l, s) => h << s - 32 | l >>> 64 - s;
      function add(Ah, Al, Bh, Bl) {
        const l = (Al >>> 0) + (Bl >>> 0);
        return { h: Ah + Bh + (l / 2 ** 32 | 0) | 0, l: l | 0 };
      }
      exports.add = add;
      var add3L = (Al, Bl, Cl) => (Al >>> 0) + (Bl >>> 0) + (Cl >>> 0);
      var add3H = (low, Ah, Bh, Ch) => Ah + Bh + Ch + (low / 2 ** 32 | 0) | 0;
      var add4L = (Al, Bl, Cl, Dl) => (Al >>> 0) + (Bl >>> 0) + (Cl >>> 0) + (Dl >>> 0);
      var add4H = (low, Ah, Bh, Ch, Dh) => Ah + Bh + Ch + Dh + (low / 2 ** 32 | 0) | 0;
      var add5L = (Al, Bl, Cl, Dl, El) => (Al >>> 0) + (Bl >>> 0) + (Cl >>> 0) + (Dl >>> 0) + (El >>> 0);
      var add5H = (low, Ah, Bh, Ch, Dh, Eh) => Ah + Bh + Ch + Dh + Eh + (low / 2 ** 32 | 0) | 0;
      var u64 = {
        fromBig,
        split,
        toBig: exports.toBig,
        shrSH,
        shrSL,
        rotrSH,
        rotrSL,
        rotrBH,
        rotrBL,
        rotr32H,
        rotr32L,
        rotlSH,
        rotlSL,
        rotlBH,
        rotlBL,
        add,
        add3L,
        add3H,
        add4L,
        add4H,
        add5H,
        add5L
      };
      exports.default = u64;
    }
  });

  // node_modules/.pnpm/@noble+hashes@1.3.1/node_modules/@noble/hashes/cryptoNode.js
  var require_cryptoNode = __commonJS({
    "node_modules/.pnpm/@noble+hashes@1.3.1/node_modules/@noble/hashes/cryptoNode.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.crypto = void 0;
      var nc = __require("node:crypto");
      exports.crypto = nc && typeof nc === "object" && "webcrypto" in nc ? nc.webcrypto : void 0;
    }
  });

  // node_modules/.pnpm/@noble+hashes@1.3.1/node_modules/@noble/hashes/utils.js
  var require_utils = __commonJS({
    "node_modules/.pnpm/@noble+hashes@1.3.1/node_modules/@noble/hashes/utils.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.randomBytes = exports.wrapXOFConstructorWithOpts = exports.wrapConstructorWithOpts = exports.wrapConstructor = exports.checkOpts = exports.Hash = exports.concatBytes = exports.toBytes = exports.utf8ToBytes = exports.asyncLoop = exports.nextTick = exports.hexToBytes = exports.bytesToHex = exports.isLE = exports.rotr = exports.createView = exports.u32 = exports.u8 = void 0;
      var crypto_1 = require_cryptoNode();
      var u8a = (a) => a instanceof Uint8Array;
      var u8 = (arr) => new Uint8Array(arr.buffer, arr.byteOffset, arr.byteLength);
      exports.u8 = u8;
      var u32 = (arr) => new Uint32Array(arr.buffer, arr.byteOffset, Math.floor(arr.byteLength / 4));
      exports.u32 = u32;
      var createView = (arr) => new DataView(arr.buffer, arr.byteOffset, arr.byteLength);
      exports.createView = createView;
      var rotr = (word, shift) => word << 32 - shift | word >>> shift;
      exports.rotr = rotr;
      exports.isLE = new Uint8Array(new Uint32Array([287454020]).buffer)[0] === 68;
      if (!exports.isLE)
        throw new Error("Non little-endian hardware is not supported");
      var hexes = Array.from({ length: 256 }, (v, i) => i.toString(16).padStart(2, "0"));
      function bytesToHex(bytes) {
        if (!u8a(bytes))
          throw new Error("Uint8Array expected");
        let hex = "";
        for (let i = 0; i < bytes.length; i++) {
          hex += hexes[bytes[i]];
        }
        return hex;
      }
      exports.bytesToHex = bytesToHex;
      function hexToBytes(hex) {
        if (typeof hex !== "string")
          throw new Error("hex string expected, got " + typeof hex);
        const len = hex.length;
        if (len % 2)
          throw new Error("padded hex string expected, got unpadded hex of length " + len);
        const array = new Uint8Array(len / 2);
        for (let i = 0; i < array.length; i++) {
          const j = i * 2;
          const hexByte = hex.slice(j, j + 2);
          const byte = Number.parseInt(hexByte, 16);
          if (Number.isNaN(byte) || byte < 0)
            throw new Error("Invalid byte sequence");
          array[i] = byte;
        }
        return array;
      }
      exports.hexToBytes = hexToBytes;
      var nextTick = async () => {
      };
      exports.nextTick = nextTick;
      async function asyncLoop(iters, tick, cb) {
        let ts = Date.now();
        for (let i = 0; i < iters; i++) {
          cb(i);
          const diff = Date.now() - ts;
          if (diff >= 0 && diff < tick)
            continue;
          await (0, exports.nextTick)();
          ts += diff;
        }
      }
      exports.asyncLoop = asyncLoop;
      function utf8ToBytes(str) {
        if (typeof str !== "string")
          throw new Error(`utf8ToBytes expected string, got ${typeof str}`);
        return new Uint8Array(new TextEncoder().encode(str));
      }
      exports.utf8ToBytes = utf8ToBytes;
      function toBytes(data) {
        if (typeof data === "string")
          data = utf8ToBytes(data);
        if (!u8a(data))
          throw new Error(`expected Uint8Array, got ${typeof data}`);
        return data;
      }
      exports.toBytes = toBytes;
      function concatBytes(...arrays) {
        const r = new Uint8Array(arrays.reduce((sum, a) => sum + a.length, 0));
        let pad = 0;
        arrays.forEach((a) => {
          if (!u8a(a))
            throw new Error("Uint8Array expected");
          r.set(a, pad);
          pad += a.length;
        });
        return r;
      }
      exports.concatBytes = concatBytes;
      var Hash = class {
        // Safe version that clones internal state
        clone() {
          return this._cloneInto();
        }
      };
      exports.Hash = Hash;
      var isPlainObject = (obj) => Object.prototype.toString.call(obj) === "[object Object]" && obj.constructor === Object;
      function checkOpts(defaults, opts) {
        if (opts !== void 0 && (typeof opts !== "object" || !isPlainObject(opts)))
          throw new Error("Options should be object or undefined");
        const merged = Object.assign(defaults, opts);
        return merged;
      }
      exports.checkOpts = checkOpts;
      function wrapConstructor(hashCons) {
        const hashC = (msg) => hashCons().update(toBytes(msg)).digest();
        const tmp = hashCons();
        hashC.outputLen = tmp.outputLen;
        hashC.blockLen = tmp.blockLen;
        hashC.create = () => hashCons();
        return hashC;
      }
      exports.wrapConstructor = wrapConstructor;
      function wrapConstructorWithOpts(hashCons) {
        const hashC = (msg, opts) => hashCons(opts).update(toBytes(msg)).digest();
        const tmp = hashCons({});
        hashC.outputLen = tmp.outputLen;
        hashC.blockLen = tmp.blockLen;
        hashC.create = (opts) => hashCons(opts);
        return hashC;
      }
      exports.wrapConstructorWithOpts = wrapConstructorWithOpts;
      function wrapXOFConstructorWithOpts(hashCons) {
        const hashC = (msg, opts) => hashCons(opts).update(toBytes(msg)).digest();
        const tmp = hashCons({});
        hashC.outputLen = tmp.outputLen;
        hashC.blockLen = tmp.blockLen;
        hashC.create = (opts) => hashCons(opts);
        return hashC;
      }
      exports.wrapXOFConstructorWithOpts = wrapXOFConstructorWithOpts;
      function randomBytes(bytesLength = 32) {
        if (crypto_1.crypto && typeof crypto_1.crypto.getRandomValues === "function") {
          return crypto_1.crypto.getRandomValues(new Uint8Array(bytesLength));
        }
        throw new Error("crypto.getRandomValues must be defined");
      }
      exports.randomBytes = randomBytes;
    }
  });

  // node_modules/.pnpm/@noble+hashes@1.3.1/node_modules/@noble/hashes/sha3.js
  var require_sha3 = __commonJS({
    "node_modules/.pnpm/@noble+hashes@1.3.1/node_modules/@noble/hashes/sha3.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.shake256 = exports.shake128 = exports.keccak_512 = exports.keccak_384 = exports.keccak_256 = exports.keccak_224 = exports.sha3_512 = exports.sha3_384 = exports.sha3_256 = exports.sha3_224 = exports.Keccak = exports.keccakP = void 0;
      var _assert_js_1 = require_assert();
      var _u64_js_1 = require_u64();
      var utils_js_1 = require_utils();
      var [SHA3_PI, SHA3_ROTL, _SHA3_IOTA] = [[], [], []];
      var _0n = BigInt(0);
      var _1n = BigInt(1);
      var _2n = BigInt(2);
      var _7n = BigInt(7);
      var _256n = BigInt(256);
      var _0x71n = BigInt(113);
      for (let round = 0, R = _1n, x = 1, y = 0; round < 24; round++) {
        [x, y] = [y, (2 * x + 3 * y) % 5];
        SHA3_PI.push(2 * (5 * y + x));
        SHA3_ROTL.push((round + 1) * (round + 2) / 2 % 64);
        let t = _0n;
        for (let j = 0; j < 7; j++) {
          R = (R << _1n ^ (R >> _7n) * _0x71n) % _256n;
          if (R & _2n)
            t ^= _1n << (_1n << BigInt(j)) - _1n;
        }
        _SHA3_IOTA.push(t);
      }
      var [SHA3_IOTA_H, SHA3_IOTA_L] = _u64_js_1.default.split(_SHA3_IOTA, true);
      var rotlH = (h, l, s) => s > 32 ? _u64_js_1.default.rotlBH(h, l, s) : _u64_js_1.default.rotlSH(h, l, s);
      var rotlL = (h, l, s) => s > 32 ? _u64_js_1.default.rotlBL(h, l, s) : _u64_js_1.default.rotlSL(h, l, s);
      function keccakP(s, rounds = 24) {
        const B = new Uint32Array(5 * 2);
        for (let round = 24 - rounds; round < 24; round++) {
          for (let x = 0; x < 10; x++)
            B[x] = s[x] ^ s[x + 10] ^ s[x + 20] ^ s[x + 30] ^ s[x + 40];
          for (let x = 0; x < 10; x += 2) {
            const idx1 = (x + 8) % 10;
            const idx0 = (x + 2) % 10;
            const B0 = B[idx0];
            const B1 = B[idx0 + 1];
            const Th = rotlH(B0, B1, 1) ^ B[idx1];
            const Tl = rotlL(B0, B1, 1) ^ B[idx1 + 1];
            for (let y = 0; y < 50; y += 10) {
              s[x + y] ^= Th;
              s[x + y + 1] ^= Tl;
            }
          }
          let curH = s[2];
          let curL = s[3];
          for (let t = 0; t < 24; t++) {
            const shift = SHA3_ROTL[t];
            const Th = rotlH(curH, curL, shift);
            const Tl = rotlL(curH, curL, shift);
            const PI = SHA3_PI[t];
            curH = s[PI];
            curL = s[PI + 1];
            s[PI] = Th;
            s[PI + 1] = Tl;
          }
          for (let y = 0; y < 50; y += 10) {
            for (let x = 0; x < 10; x++)
              B[x] = s[y + x];
            for (let x = 0; x < 10; x++)
              s[y + x] ^= ~B[(x + 2) % 10] & B[(x + 4) % 10];
          }
          s[0] ^= SHA3_IOTA_H[round];
          s[1] ^= SHA3_IOTA_L[round];
        }
        B.fill(0);
      }
      exports.keccakP = keccakP;
      var Keccak = class _Keccak extends utils_js_1.Hash {
        // NOTE: we accept arguments in bytes instead of bits here.
        constructor(blockLen, suffix, outputLen, enableXOF = false, rounds = 24) {
          super();
          this.blockLen = blockLen;
          this.suffix = suffix;
          this.outputLen = outputLen;
          this.enableXOF = enableXOF;
          this.rounds = rounds;
          this.pos = 0;
          this.posOut = 0;
          this.finished = false;
          this.destroyed = false;
          _assert_js_1.default.number(outputLen);
          if (0 >= this.blockLen || this.blockLen >= 200)
            throw new Error("Sha3 supports only keccak-f1600 function");
          this.state = new Uint8Array(200);
          this.state32 = (0, utils_js_1.u32)(this.state);
        }
        keccak() {
          keccakP(this.state32, this.rounds);
          this.posOut = 0;
          this.pos = 0;
        }
        update(data) {
          _assert_js_1.default.exists(this);
          const { blockLen, state } = this;
          data = (0, utils_js_1.toBytes)(data);
          const len = data.length;
          for (let pos = 0; pos < len; ) {
            const take = Math.min(blockLen - this.pos, len - pos);
            for (let i = 0; i < take; i++)
              state[this.pos++] ^= data[pos++];
            if (this.pos === blockLen)
              this.keccak();
          }
          return this;
        }
        finish() {
          if (this.finished)
            return;
          this.finished = true;
          const { state, suffix, pos, blockLen } = this;
          state[pos] ^= suffix;
          if ((suffix & 128) !== 0 && pos === blockLen - 1)
            this.keccak();
          state[blockLen - 1] ^= 128;
          this.keccak();
        }
        writeInto(out) {
          _assert_js_1.default.exists(this, false);
          _assert_js_1.default.bytes(out);
          this.finish();
          const bufferOut = this.state;
          const { blockLen } = this;
          for (let pos = 0, len = out.length; pos < len; ) {
            if (this.posOut >= blockLen)
              this.keccak();
            const take = Math.min(blockLen - this.posOut, len - pos);
            out.set(bufferOut.subarray(this.posOut, this.posOut + take), pos);
            this.posOut += take;
            pos += take;
          }
          return out;
        }
        xofInto(out) {
          if (!this.enableXOF)
            throw new Error("XOF is not possible for this instance");
          return this.writeInto(out);
        }
        xof(bytes) {
          _assert_js_1.default.number(bytes);
          return this.xofInto(new Uint8Array(bytes));
        }
        digestInto(out) {
          _assert_js_1.default.output(out, this);
          if (this.finished)
            throw new Error("digest() was already called");
          this.writeInto(out);
          this.destroy();
          return out;
        }
        digest() {
          return this.digestInto(new Uint8Array(this.outputLen));
        }
        destroy() {
          this.destroyed = true;
          this.state.fill(0);
        }
        _cloneInto(to) {
          const { blockLen, suffix, outputLen, rounds, enableXOF } = this;
          to || (to = new _Keccak(blockLen, suffix, outputLen, enableXOF, rounds));
          to.state32.set(this.state32);
          to.pos = this.pos;
          to.posOut = this.posOut;
          to.finished = this.finished;
          to.rounds = rounds;
          to.suffix = suffix;
          to.outputLen = outputLen;
          to.enableXOF = enableXOF;
          to.destroyed = this.destroyed;
          return to;
        }
      };
      exports.Keccak = Keccak;
      var gen = (suffix, blockLen, outputLen) => (0, utils_js_1.wrapConstructor)(() => new Keccak(blockLen, suffix, outputLen));
      exports.sha3_224 = gen(6, 144, 224 / 8);
      exports.sha3_256 = gen(6, 136, 256 / 8);
      exports.sha3_384 = gen(6, 104, 384 / 8);
      exports.sha3_512 = gen(6, 72, 512 / 8);
      exports.keccak_224 = gen(1, 144, 224 / 8);
      exports.keccak_256 = gen(1, 136, 256 / 8);
      exports.keccak_384 = gen(1, 104, 384 / 8);
      exports.keccak_512 = gen(1, 72, 512 / 8);
      var genShake = (suffix, blockLen, outputLen) => (0, utils_js_1.wrapXOFConstructorWithOpts)((opts = {}) => new Keccak(blockLen, suffix, opts.dkLen === void 0 ? outputLen : opts.dkLen, true));
      exports.shake128 = genShake(31, 168, 128 / 8);
      exports.shake256 = genShake(31, 136, 256 / 8);
    }
  });

  // node_modules/.pnpm/@paralleldrive+cuid2@2.0.1/node_modules/@paralleldrive/cuid2/src/index.js
  var require_src = __commonJS({
    "node_modules/.pnpm/@paralleldrive+cuid2@2.0.1/node_modules/@paralleldrive/cuid2/src/index.js"(exports, module) {
      var { sha3_512: sha3 } = require_sha3();
      var defaultLength = 24;
      var bigLength = 32;
      var globalObj = typeof global !== "undefined" ? global : typeof window !== "undefined" ? window : [];
      var primes = [
        109717,
        109721,
        109741,
        109751,
        109789,
        109793,
        109807,
        109819,
        109829,
        109831
      ];
      var createEntropy = (length = 4, random = Math.random) => {
        let entropy = "";
        while (entropy.length < length) {
          const randomPrime = primes[Math.floor(random() * primes.length)];
          entropy = entropy + Math.floor(random() * randomPrime).toString(36);
        }
        return entropy.slice(0, length);
      };
      function bufToBigInt(buf) {
        let bits = 8n;
        let value = 0n;
        for (const i of buf.values()) {
          const bi = BigInt(i);
          value = (value << bits) + bi;
        }
        return value;
      }
      var hash = (input = "", length = bigLength) => {
        const salt = createEntropy(length);
        const text = input + salt;
        return bufToBigInt(sha3(text)).toString(36).slice(1);
      };
      var alphabet = Array.from(
        { length: 26 },
        (x, i) => String.fromCharCode(i + 97)
      );
      var randomLetter = (random) => alphabet[Math.floor(random() * alphabet.length)];
      var createFingerprint = (random) => hash(Math.floor((random() + 1) * 2063) + Object.keys(globalObj).toString());
      var createCounter = (count) => () => {
        return count++;
      };
      var init = ({
        random = Math.random,
        counter = createCounter(Math.floor(random() * 2057)),
        length = defaultLength,
        fingerprint = createFingerprint(random)
      } = {}) => {
        return function cuid2() {
          const time = Date.now().toString(36);
          const randomEntropy = createEntropy(length, random);
          const count = counter().toString(36);
          const firstLetter = randomLetter(random);
          const hashInput = `${time + randomEntropy + count + fingerprint}`;
          return `${firstLetter + hash(hashInput, length).substring(1, length)}`;
        };
      };
      var createId3 = init();
      module.exports.getConstants = () => ({ defaultLength, bigLength });
      module.exports.init = init;
      module.exports.createId = createId3;
      module.exports.bufToBigInt = bufToBigInt;
      module.exports.createCounter = createCounter;
    }
  });

  // node_modules/.pnpm/@paralleldrive+cuid2@2.0.1/node_modules/@paralleldrive/cuid2/index.js
  var require_cuid2 = __commonJS({
    "node_modules/.pnpm/@paralleldrive+cuid2@2.0.1/node_modules/@paralleldrive/cuid2/index.js"(exports, module) {
      var { createId: createId3, init, getConstants } = require_src();
      module.exports.createId = createId3;
      module.exports.init = init;
      module.exports.getConstants = getConstants;
    }
  });

  // node_modules/.pnpm/lodash.get@4.4.2/node_modules/lodash.get/index.js
  var require_lodash = __commonJS({
    "node_modules/.pnpm/lodash.get@4.4.2/node_modules/lodash.get/index.js"(exports, module) {
      var FUNC_ERROR_TEXT = "Expected a function";
      var HASH_UNDEFINED = "__lodash_hash_undefined__";
      var INFINITY = 1 / 0;
      var funcTag = "[object Function]";
      var genTag = "[object GeneratorFunction]";
      var symbolTag = "[object Symbol]";
      var reIsDeepProp = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/;
      var reIsPlainProp = /^\w*$/;
      var reLeadingDot = /^\./;
      var rePropName = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g;
      var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;
      var reEscapeChar = /\\(\\)?/g;
      var reIsHostCtor = /^\[object .+?Constructor\]$/;
      var freeGlobal = typeof global == "object" && global && global.Object === Object && global;
      var freeSelf = typeof self == "object" && self && self.Object === Object && self;
      var root = freeGlobal || freeSelf || Function("return this")();
      function getValue(object, key) {
        return object == null ? void 0 : object[key];
      }
      function isHostObject(value) {
        var result = false;
        if (value != null && typeof value.toString != "function") {
          try {
            result = !!(value + "");
          } catch (e) {
          }
        }
        return result;
      }
      var arrayProto = Array.prototype;
      var funcProto = Function.prototype;
      var objectProto = Object.prototype;
      var coreJsData = root["__core-js_shared__"];
      var maskSrcKey = function() {
        var uid = /[^.]+$/.exec(coreJsData && coreJsData.keys && coreJsData.keys.IE_PROTO || "");
        return uid ? "Symbol(src)_1." + uid : "";
      }();
      var funcToString = funcProto.toString;
      var hasOwnProperty = objectProto.hasOwnProperty;
      var objectToString = objectProto.toString;
      var reIsNative = RegExp(
        "^" + funcToString.call(hasOwnProperty).replace(reRegExpChar, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
      );
      var Symbol2 = root.Symbol;
      var splice = arrayProto.splice;
      var Map2 = getNative(root, "Map");
      var nativeCreate = getNative(Object, "create");
      var symbolProto = Symbol2 ? Symbol2.prototype : void 0;
      var symbolToString = symbolProto ? symbolProto.toString : void 0;
      function Hash(entries) {
        var index = -1, length = entries ? entries.length : 0;
        this.clear();
        while (++index < length) {
          var entry = entries[index];
          this.set(entry[0], entry[1]);
        }
      }
      function hashClear() {
        this.__data__ = nativeCreate ? nativeCreate(null) : {};
      }
      function hashDelete(key) {
        return this.has(key) && delete this.__data__[key];
      }
      function hashGet(key) {
        var data = this.__data__;
        if (nativeCreate) {
          var result = data[key];
          return result === HASH_UNDEFINED ? void 0 : result;
        }
        return hasOwnProperty.call(data, key) ? data[key] : void 0;
      }
      function hashHas(key) {
        var data = this.__data__;
        return nativeCreate ? data[key] !== void 0 : hasOwnProperty.call(data, key);
      }
      function hashSet(key, value) {
        var data = this.__data__;
        data[key] = nativeCreate && value === void 0 ? HASH_UNDEFINED : value;
        return this;
      }
      Hash.prototype.clear = hashClear;
      Hash.prototype["delete"] = hashDelete;
      Hash.prototype.get = hashGet;
      Hash.prototype.has = hashHas;
      Hash.prototype.set = hashSet;
      function ListCache(entries) {
        var index = -1, length = entries ? entries.length : 0;
        this.clear();
        while (++index < length) {
          var entry = entries[index];
          this.set(entry[0], entry[1]);
        }
      }
      function listCacheClear() {
        this.__data__ = [];
      }
      function listCacheDelete(key) {
        var data = this.__data__, index = assocIndexOf(data, key);
        if (index < 0) {
          return false;
        }
        var lastIndex = data.length - 1;
        if (index == lastIndex) {
          data.pop();
        } else {
          splice.call(data, index, 1);
        }
        return true;
      }
      function listCacheGet(key) {
        var data = this.__data__, index = assocIndexOf(data, key);
        return index < 0 ? void 0 : data[index][1];
      }
      function listCacheHas(key) {
        return assocIndexOf(this.__data__, key) > -1;
      }
      function listCacheSet(key, value) {
        var data = this.__data__, index = assocIndexOf(data, key);
        if (index < 0) {
          data.push([key, value]);
        } else {
          data[index][1] = value;
        }
        return this;
      }
      ListCache.prototype.clear = listCacheClear;
      ListCache.prototype["delete"] = listCacheDelete;
      ListCache.prototype.get = listCacheGet;
      ListCache.prototype.has = listCacheHas;
      ListCache.prototype.set = listCacheSet;
      function MapCache(entries) {
        var index = -1, length = entries ? entries.length : 0;
        this.clear();
        while (++index < length) {
          var entry = entries[index];
          this.set(entry[0], entry[1]);
        }
      }
      function mapCacheClear() {
        this.__data__ = {
          "hash": new Hash(),
          "map": new (Map2 || ListCache)(),
          "string": new Hash()
        };
      }
      function mapCacheDelete(key) {
        return getMapData(this, key)["delete"](key);
      }
      function mapCacheGet(key) {
        return getMapData(this, key).get(key);
      }
      function mapCacheHas(key) {
        return getMapData(this, key).has(key);
      }
      function mapCacheSet(key, value) {
        getMapData(this, key).set(key, value);
        return this;
      }
      MapCache.prototype.clear = mapCacheClear;
      MapCache.prototype["delete"] = mapCacheDelete;
      MapCache.prototype.get = mapCacheGet;
      MapCache.prototype.has = mapCacheHas;
      MapCache.prototype.set = mapCacheSet;
      function assocIndexOf(array, key) {
        var length = array.length;
        while (length--) {
          if (eq(array[length][0], key)) {
            return length;
          }
        }
        return -1;
      }
      function baseGet(object, path2) {
        path2 = isKey(path2, object) ? [path2] : castPath(path2);
        var index = 0, length = path2.length;
        while (object != null && index < length) {
          object = object[toKey(path2[index++])];
        }
        return index && index == length ? object : void 0;
      }
      function baseIsNative(value) {
        if (!isObject(value) || isMasked(value)) {
          return false;
        }
        var pattern = isFunction(value) || isHostObject(value) ? reIsNative : reIsHostCtor;
        return pattern.test(toSource(value));
      }
      function baseToString(value) {
        if (typeof value == "string") {
          return value;
        }
        if (isSymbol(value)) {
          return symbolToString ? symbolToString.call(value) : "";
        }
        var result = value + "";
        return result == "0" && 1 / value == -INFINITY ? "-0" : result;
      }
      function castPath(value) {
        return isArray(value) ? value : stringToPath(value);
      }
      function getMapData(map, key) {
        var data = map.__data__;
        return isKeyable(key) ? data[typeof key == "string" ? "string" : "hash"] : data.map;
      }
      function getNative(object, key) {
        var value = getValue(object, key);
        return baseIsNative(value) ? value : void 0;
      }
      function isKey(value, object) {
        if (isArray(value)) {
          return false;
        }
        var type = typeof value;
        if (type == "number" || type == "symbol" || type == "boolean" || value == null || isSymbol(value)) {
          return true;
        }
        return reIsPlainProp.test(value) || !reIsDeepProp.test(value) || object != null && value in Object(object);
      }
      function isKeyable(value) {
        var type = typeof value;
        return type == "string" || type == "number" || type == "symbol" || type == "boolean" ? value !== "__proto__" : value === null;
      }
      function isMasked(func) {
        return !!maskSrcKey && maskSrcKey in func;
      }
      var stringToPath = memoize(function(string) {
        string = toString(string);
        var result = [];
        if (reLeadingDot.test(string)) {
          result.push("");
        }
        string.replace(rePropName, function(match, number, quote, string2) {
          result.push(quote ? string2.replace(reEscapeChar, "$1") : number || match);
        });
        return result;
      });
      function toKey(value) {
        if (typeof value == "string" || isSymbol(value)) {
          return value;
        }
        var result = value + "";
        return result == "0" && 1 / value == -INFINITY ? "-0" : result;
      }
      function toSource(func) {
        if (func != null) {
          try {
            return funcToString.call(func);
          } catch (e) {
          }
          try {
            return func + "";
          } catch (e) {
          }
        }
        return "";
      }
      function memoize(func, resolver) {
        if (typeof func != "function" || resolver && typeof resolver != "function") {
          throw new TypeError(FUNC_ERROR_TEXT);
        }
        var memoized = function() {
          var args = arguments, key = resolver ? resolver.apply(this, args) : args[0], cache2 = memoized.cache;
          if (cache2.has(key)) {
            return cache2.get(key);
          }
          var result = func.apply(this, args);
          memoized.cache = cache2.set(key, result);
          return result;
        };
        memoized.cache = new (memoize.Cache || MapCache)();
        return memoized;
      }
      memoize.Cache = MapCache;
      function eq(value, other) {
        return value === other || value !== value && other !== other;
      }
      var isArray = Array.isArray;
      function isFunction(value) {
        var tag = isObject(value) ? objectToString.call(value) : "";
        return tag == funcTag || tag == genTag;
      }
      function isObject(value) {
        var type = typeof value;
        return !!value && (type == "object" || type == "function");
      }
      function isObjectLike(value) {
        return !!value && typeof value == "object";
      }
      function isSymbol(value) {
        return typeof value == "symbol" || isObjectLike(value) && objectToString.call(value) == symbolTag;
      }
      function toString(value) {
        return value == null ? "" : baseToString(value);
      }
      function get4(object, path2, defaultValue) {
        var result = object == null ? void 0 : baseGet(object, path2);
        return result === void 0 ? defaultValue : result;
      }
      module.exports = get4;
    }
  });

  // node_modules/.pnpm/ws@8.12.1/node_modules/ws/lib/stream.js
  var require_stream = __commonJS({
    "node_modules/.pnpm/ws@8.12.1/node_modules/ws/lib/stream.js"(exports, module) {
      "use strict";
      var { Duplex } = __require("stream");
      function emitClose(stream) {
        stream.emit("close");
      }
      function duplexOnEnd() {
        if (!this.destroyed && this._writableState.finished) {
          this.destroy();
        }
      }
      function duplexOnError(err) {
        this.removeListener("error", duplexOnError);
        this.destroy();
        if (this.listenerCount("error") === 0) {
          this.emit("error", err);
        }
      }
      function createWebSocketStream2(ws, options) {
        let terminateOnDestroy = true;
        const duplex = new Duplex({
          ...options,
          autoDestroy: false,
          emitClose: false,
          objectMode: false,
          writableObjectMode: false
        });
        ws.on("message", function message(msg, isBinary) {
          const data = !isBinary && duplex._readableState.objectMode ? msg.toString() : msg;
          if (!duplex.push(data))
            ws.pause();
        });
        ws.once("error", function error(err) {
          if (duplex.destroyed)
            return;
          terminateOnDestroy = false;
          duplex.destroy(err);
        });
        ws.once("close", function close() {
          if (duplex.destroyed)
            return;
          duplex.push(null);
        });
        duplex._destroy = function(err, callback) {
          if (ws.readyState === ws.CLOSED) {
            callback(err);
            process.nextTick(emitClose, duplex);
            return;
          }
          let called = false;
          ws.once("error", function error(err2) {
            called = true;
            callback(err2);
          });
          ws.once("close", function close() {
            if (!called)
              callback(err);
            process.nextTick(emitClose, duplex);
          });
          if (terminateOnDestroy)
            ws.terminate();
        };
        duplex._final = function(callback) {
          if (ws.readyState === ws.CONNECTING) {
            ws.once("open", function open() {
              duplex._final(callback);
            });
            return;
          }
          if (ws._socket === null)
            return;
          if (ws._socket._writableState.finished) {
            callback();
            if (duplex._readableState.endEmitted)
              duplex.destroy();
          } else {
            ws._socket.once("finish", function finish() {
              callback();
            });
            ws.close();
          }
        };
        duplex._read = function() {
          if (ws.isPaused)
            ws.resume();
        };
        duplex._write = function(chunk, encoding, callback) {
          if (ws.readyState === ws.CONNECTING) {
            ws.once("open", function open() {
              duplex._write(chunk, encoding, callback);
            });
            return;
          }
          ws.send(chunk, callback);
        };
        duplex.on("end", duplexOnEnd);
        duplex.on("error", duplexOnError);
        return duplex;
      }
      module.exports = createWebSocketStream2;
    }
  });

  // node_modules/.pnpm/ws@8.12.1/node_modules/ws/lib/constants.js
  var require_constants = __commonJS({
    "node_modules/.pnpm/ws@8.12.1/node_modules/ws/lib/constants.js"(exports, module) {
      "use strict";
      module.exports = {
        BINARY_TYPES: ["nodebuffer", "arraybuffer", "fragments"],
        EMPTY_BUFFER: Buffer.alloc(0),
        GUID: "258EAFA5-E914-47DA-95CA-C5AB0DC85B11",
        kForOnEventAttribute: Symbol("kIsForOnEventAttribute"),
        kListener: Symbol("kListener"),
        kStatusCode: Symbol("status-code"),
        kWebSocket: Symbol("websocket"),
        NOOP: () => {
        }
      };
    }
  });

  // node_modules/.pnpm/ws@8.12.1/node_modules/ws/lib/buffer-util.js
  var require_buffer_util = __commonJS({
    "node_modules/.pnpm/ws@8.12.1/node_modules/ws/lib/buffer-util.js"(exports, module) {
      "use strict";
      var { EMPTY_BUFFER } = require_constants();
      var FastBuffer = Buffer[Symbol.species];
      function concat(list, totalLength) {
        if (list.length === 0)
          return EMPTY_BUFFER;
        if (list.length === 1)
          return list[0];
        const target = Buffer.allocUnsafe(totalLength);
        let offset = 0;
        for (let i = 0; i < list.length; i++) {
          const buf = list[i];
          target.set(buf, offset);
          offset += buf.length;
        }
        if (offset < totalLength) {
          return new FastBuffer(target.buffer, target.byteOffset, offset);
        }
        return target;
      }
      function _mask(source, mask, output, offset, length) {
        for (let i = 0; i < length; i++) {
          output[offset + i] = source[i] ^ mask[i & 3];
        }
      }
      function _unmask(buffer, mask) {
        for (let i = 0; i < buffer.length; i++) {
          buffer[i] ^= mask[i & 3];
        }
      }
      function toArrayBuffer(buf) {
        if (buf.length === buf.buffer.byteLength) {
          return buf.buffer;
        }
        return buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.length);
      }
      function toBuffer(data) {
        toBuffer.readOnly = true;
        if (Buffer.isBuffer(data))
          return data;
        let buf;
        if (data instanceof ArrayBuffer) {
          buf = new FastBuffer(data);
        } else if (ArrayBuffer.isView(data)) {
          buf = new FastBuffer(data.buffer, data.byteOffset, data.byteLength);
        } else {
          buf = Buffer.from(data);
          toBuffer.readOnly = false;
        }
        return buf;
      }
      module.exports = {
        concat,
        mask: _mask,
        toArrayBuffer,
        toBuffer,
        unmask: _unmask
      };
      if (!process.env.WS_NO_BUFFER_UTIL) {
        try {
          const bufferUtil = __require("bufferutil");
          module.exports.mask = function(source, mask, output, offset, length) {
            if (length < 48)
              _mask(source, mask, output, offset, length);
            else
              bufferUtil.mask(source, mask, output, offset, length);
          };
          module.exports.unmask = function(buffer, mask) {
            if (buffer.length < 32)
              _unmask(buffer, mask);
            else
              bufferUtil.unmask(buffer, mask);
          };
        } catch (e) {
        }
      }
    }
  });

  // node_modules/.pnpm/ws@8.12.1/node_modules/ws/lib/limiter.js
  var require_limiter = __commonJS({
    "node_modules/.pnpm/ws@8.12.1/node_modules/ws/lib/limiter.js"(exports, module) {
      "use strict";
      var kDone = Symbol("kDone");
      var kRun = Symbol("kRun");
      var Limiter = class {
        /**
         * Creates a new `Limiter`.
         *
         * @param {Number} [concurrency=Infinity] The maximum number of jobs allowed
         *     to run concurrently
         */
        constructor(concurrency) {
          this[kDone] = () => {
            this.pending--;
            this[kRun]();
          };
          this.concurrency = concurrency || Infinity;
          this.jobs = [];
          this.pending = 0;
        }
        /**
         * Adds a job to the queue.
         *
         * @param {Function} job The job to run
         * @public
         */
        add(job) {
          this.jobs.push(job);
          this[kRun]();
        }
        /**
         * Removes a job from the queue and runs it if possible.
         *
         * @private
         */
        [kRun]() {
          if (this.pending === this.concurrency)
            return;
          if (this.jobs.length) {
            const job = this.jobs.shift();
            this.pending++;
            job(this[kDone]);
          }
        }
      };
      module.exports = Limiter;
    }
  });

  // node_modules/.pnpm/ws@8.12.1/node_modules/ws/lib/permessage-deflate.js
  var require_permessage_deflate = __commonJS({
    "node_modules/.pnpm/ws@8.12.1/node_modules/ws/lib/permessage-deflate.js"(exports, module) {
      "use strict";
      var zlib = __require("zlib");
      var bufferUtil = require_buffer_util();
      var Limiter = require_limiter();
      var { kStatusCode } = require_constants();
      var FastBuffer = Buffer[Symbol.species];
      var TRAILER = Buffer.from([0, 0, 255, 255]);
      var kPerMessageDeflate = Symbol("permessage-deflate");
      var kTotalLength = Symbol("total-length");
      var kCallback = Symbol("callback");
      var kBuffers = Symbol("buffers");
      var kError = Symbol("error");
      var zlibLimiter;
      var PerMessageDeflate = class {
        /**
         * Creates a PerMessageDeflate instance.
         *
         * @param {Object} [options] Configuration options
         * @param {(Boolean|Number)} [options.clientMaxWindowBits] Advertise support
         *     for, or request, a custom client window size
         * @param {Boolean} [options.clientNoContextTakeover=false] Advertise/
         *     acknowledge disabling of client context takeover
         * @param {Number} [options.concurrencyLimit=10] The number of concurrent
         *     calls to zlib
         * @param {(Boolean|Number)} [options.serverMaxWindowBits] Request/confirm the
         *     use of a custom server window size
         * @param {Boolean} [options.serverNoContextTakeover=false] Request/accept
         *     disabling of server context takeover
         * @param {Number} [options.threshold=1024] Size (in bytes) below which
         *     messages should not be compressed if context takeover is disabled
         * @param {Object} [options.zlibDeflateOptions] Options to pass to zlib on
         *     deflate
         * @param {Object} [options.zlibInflateOptions] Options to pass to zlib on
         *     inflate
         * @param {Boolean} [isServer=false] Create the instance in either server or
         *     client mode
         * @param {Number} [maxPayload=0] The maximum allowed message length
         */
        constructor(options, isServer, maxPayload) {
          this._maxPayload = maxPayload | 0;
          this._options = options || {};
          this._threshold = this._options.threshold !== void 0 ? this._options.threshold : 1024;
          this._isServer = !!isServer;
          this._deflate = null;
          this._inflate = null;
          this.params = null;
          if (!zlibLimiter) {
            const concurrency = this._options.concurrencyLimit !== void 0 ? this._options.concurrencyLimit : 10;
            zlibLimiter = new Limiter(concurrency);
          }
        }
        /**
         * @type {String}
         */
        static get extensionName() {
          return "permessage-deflate";
        }
        /**
         * Create an extension negotiation offer.
         *
         * @return {Object} Extension parameters
         * @public
         */
        offer() {
          const params = {};
          if (this._options.serverNoContextTakeover) {
            params.server_no_context_takeover = true;
          }
          if (this._options.clientNoContextTakeover) {
            params.client_no_context_takeover = true;
          }
          if (this._options.serverMaxWindowBits) {
            params.server_max_window_bits = this._options.serverMaxWindowBits;
          }
          if (this._options.clientMaxWindowBits) {
            params.client_max_window_bits = this._options.clientMaxWindowBits;
          } else if (this._options.clientMaxWindowBits == null) {
            params.client_max_window_bits = true;
          }
          return params;
        }
        /**
         * Accept an extension negotiation offer/response.
         *
         * @param {Array} configurations The extension negotiation offers/reponse
         * @return {Object} Accepted configuration
         * @public
         */
        accept(configurations) {
          configurations = this.normalizeParams(configurations);
          this.params = this._isServer ? this.acceptAsServer(configurations) : this.acceptAsClient(configurations);
          return this.params;
        }
        /**
         * Releases all resources used by the extension.
         *
         * @public
         */
        cleanup() {
          if (this._inflate) {
            this._inflate.close();
            this._inflate = null;
          }
          if (this._deflate) {
            const callback = this._deflate[kCallback];
            this._deflate.close();
            this._deflate = null;
            if (callback) {
              callback(
                new Error(
                  "The deflate stream was closed while data was being processed"
                )
              );
            }
          }
        }
        /**
         *  Accept an extension negotiation offer.
         *
         * @param {Array} offers The extension negotiation offers
         * @return {Object} Accepted configuration
         * @private
         */
        acceptAsServer(offers) {
          const opts = this._options;
          const accepted = offers.find((params) => {
            if (opts.serverNoContextTakeover === false && params.server_no_context_takeover || params.server_max_window_bits && (opts.serverMaxWindowBits === false || typeof opts.serverMaxWindowBits === "number" && opts.serverMaxWindowBits > params.server_max_window_bits) || typeof opts.clientMaxWindowBits === "number" && !params.client_max_window_bits) {
              return false;
            }
            return true;
          });
          if (!accepted) {
            throw new Error("None of the extension offers can be accepted");
          }
          if (opts.serverNoContextTakeover) {
            accepted.server_no_context_takeover = true;
          }
          if (opts.clientNoContextTakeover) {
            accepted.client_no_context_takeover = true;
          }
          if (typeof opts.serverMaxWindowBits === "number") {
            accepted.server_max_window_bits = opts.serverMaxWindowBits;
          }
          if (typeof opts.clientMaxWindowBits === "number") {
            accepted.client_max_window_bits = opts.clientMaxWindowBits;
          } else if (accepted.client_max_window_bits === true || opts.clientMaxWindowBits === false) {
            delete accepted.client_max_window_bits;
          }
          return accepted;
        }
        /**
         * Accept the extension negotiation response.
         *
         * @param {Array} response The extension negotiation response
         * @return {Object} Accepted configuration
         * @private
         */
        acceptAsClient(response) {
          const params = response[0];
          if (this._options.clientNoContextTakeover === false && params.client_no_context_takeover) {
            throw new Error('Unexpected parameter "client_no_context_takeover"');
          }
          if (!params.client_max_window_bits) {
            if (typeof this._options.clientMaxWindowBits === "number") {
              params.client_max_window_bits = this._options.clientMaxWindowBits;
            }
          } else if (this._options.clientMaxWindowBits === false || typeof this._options.clientMaxWindowBits === "number" && params.client_max_window_bits > this._options.clientMaxWindowBits) {
            throw new Error(
              'Unexpected or invalid parameter "client_max_window_bits"'
            );
          }
          return params;
        }
        /**
         * Normalize parameters.
         *
         * @param {Array} configurations The extension negotiation offers/reponse
         * @return {Array} The offers/response with normalized parameters
         * @private
         */
        normalizeParams(configurations) {
          configurations.forEach((params) => {
            Object.keys(params).forEach((key) => {
              let value = params[key];
              if (value.length > 1) {
                throw new Error(`Parameter "${key}" must have only a single value`);
              }
              value = value[0];
              if (key === "client_max_window_bits") {
                if (value !== true) {
                  const num = +value;
                  if (!Number.isInteger(num) || num < 8 || num > 15) {
                    throw new TypeError(
                      `Invalid value for parameter "${key}": ${value}`
                    );
                  }
                  value = num;
                } else if (!this._isServer) {
                  throw new TypeError(
                    `Invalid value for parameter "${key}": ${value}`
                  );
                }
              } else if (key === "server_max_window_bits") {
                const num = +value;
                if (!Number.isInteger(num) || num < 8 || num > 15) {
                  throw new TypeError(
                    `Invalid value for parameter "${key}": ${value}`
                  );
                }
                value = num;
              } else if (key === "client_no_context_takeover" || key === "server_no_context_takeover") {
                if (value !== true) {
                  throw new TypeError(
                    `Invalid value for parameter "${key}": ${value}`
                  );
                }
              } else {
                throw new Error(`Unknown parameter "${key}"`);
              }
              params[key] = value;
            });
          });
          return configurations;
        }
        /**
         * Decompress data. Concurrency limited.
         *
         * @param {Buffer} data Compressed data
         * @param {Boolean} fin Specifies whether or not this is the last fragment
         * @param {Function} callback Callback
         * @public
         */
        decompress(data, fin, callback) {
          zlibLimiter.add((done) => {
            this._decompress(data, fin, (err, result) => {
              done();
              callback(err, result);
            });
          });
        }
        /**
         * Compress data. Concurrency limited.
         *
         * @param {(Buffer|String)} data Data to compress
         * @param {Boolean} fin Specifies whether or not this is the last fragment
         * @param {Function} callback Callback
         * @public
         */
        compress(data, fin, callback) {
          zlibLimiter.add((done) => {
            this._compress(data, fin, (err, result) => {
              done();
              callback(err, result);
            });
          });
        }
        /**
         * Decompress data.
         *
         * @param {Buffer} data Compressed data
         * @param {Boolean} fin Specifies whether or not this is the last fragment
         * @param {Function} callback Callback
         * @private
         */
        _decompress(data, fin, callback) {
          const endpoint = this._isServer ? "client" : "server";
          if (!this._inflate) {
            const key = `${endpoint}_max_window_bits`;
            const windowBits = typeof this.params[key] !== "number" ? zlib.Z_DEFAULT_WINDOWBITS : this.params[key];
            this._inflate = zlib.createInflateRaw({
              ...this._options.zlibInflateOptions,
              windowBits
            });
            this._inflate[kPerMessageDeflate] = this;
            this._inflate[kTotalLength] = 0;
            this._inflate[kBuffers] = [];
            this._inflate.on("error", inflateOnError);
            this._inflate.on("data", inflateOnData);
          }
          this._inflate[kCallback] = callback;
          this._inflate.write(data);
          if (fin)
            this._inflate.write(TRAILER);
          this._inflate.flush(() => {
            const err = this._inflate[kError];
            if (err) {
              this._inflate.close();
              this._inflate = null;
              callback(err);
              return;
            }
            const data2 = bufferUtil.concat(
              this._inflate[kBuffers],
              this._inflate[kTotalLength]
            );
            if (this._inflate._readableState.endEmitted) {
              this._inflate.close();
              this._inflate = null;
            } else {
              this._inflate[kTotalLength] = 0;
              this._inflate[kBuffers] = [];
              if (fin && this.params[`${endpoint}_no_context_takeover`]) {
                this._inflate.reset();
              }
            }
            callback(null, data2);
          });
        }
        /**
         * Compress data.
         *
         * @param {(Buffer|String)} data Data to compress
         * @param {Boolean} fin Specifies whether or not this is the last fragment
         * @param {Function} callback Callback
         * @private
         */
        _compress(data, fin, callback) {
          const endpoint = this._isServer ? "server" : "client";
          if (!this._deflate) {
            const key = `${endpoint}_max_window_bits`;
            const windowBits = typeof this.params[key] !== "number" ? zlib.Z_DEFAULT_WINDOWBITS : this.params[key];
            this._deflate = zlib.createDeflateRaw({
              ...this._options.zlibDeflateOptions,
              windowBits
            });
            this._deflate[kTotalLength] = 0;
            this._deflate[kBuffers] = [];
            this._deflate.on("data", deflateOnData);
          }
          this._deflate[kCallback] = callback;
          this._deflate.write(data);
          this._deflate.flush(zlib.Z_SYNC_FLUSH, () => {
            if (!this._deflate) {
              return;
            }
            let data2 = bufferUtil.concat(
              this._deflate[kBuffers],
              this._deflate[kTotalLength]
            );
            if (fin) {
              data2 = new FastBuffer(data2.buffer, data2.byteOffset, data2.length - 4);
            }
            this._deflate[kCallback] = null;
            this._deflate[kTotalLength] = 0;
            this._deflate[kBuffers] = [];
            if (fin && this.params[`${endpoint}_no_context_takeover`]) {
              this._deflate.reset();
            }
            callback(null, data2);
          });
        }
      };
      module.exports = PerMessageDeflate;
      function deflateOnData(chunk) {
        this[kBuffers].push(chunk);
        this[kTotalLength] += chunk.length;
      }
      function inflateOnData(chunk) {
        this[kTotalLength] += chunk.length;
        if (this[kPerMessageDeflate]._maxPayload < 1 || this[kTotalLength] <= this[kPerMessageDeflate]._maxPayload) {
          this[kBuffers].push(chunk);
          return;
        }
        this[kError] = new RangeError("Max payload size exceeded");
        this[kError].code = "WS_ERR_UNSUPPORTED_MESSAGE_LENGTH";
        this[kError][kStatusCode] = 1009;
        this.removeListener("data", inflateOnData);
        this.reset();
      }
      function inflateOnError(err) {
        this[kPerMessageDeflate]._inflate = null;
        err[kStatusCode] = 1007;
        this[kCallback](err);
      }
    }
  });

  // node_modules/.pnpm/ws@8.12.1/node_modules/ws/lib/validation.js
  var require_validation = __commonJS({
    "node_modules/.pnpm/ws@8.12.1/node_modules/ws/lib/validation.js"(exports, module) {
      "use strict";
      var { isUtf8 } = __require("buffer");
      var tokenChars = [
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        // 0 - 15
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        // 16 - 31
        0,
        1,
        0,
        1,
        1,
        1,
        1,
        1,
        0,
        0,
        1,
        1,
        0,
        1,
        1,
        0,
        // 32 - 47
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        0,
        0,
        0,
        0,
        0,
        0,
        // 48 - 63
        0,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        // 64 - 79
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        0,
        0,
        0,
        1,
        1,
        // 80 - 95
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        // 96 - 111
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        0,
        1,
        0,
        1,
        0
        // 112 - 127
      ];
      function isValidStatusCode(code) {
        return code >= 1e3 && code <= 1014 && code !== 1004 && code !== 1005 && code !== 1006 || code >= 3e3 && code <= 4999;
      }
      function _isValidUTF8(buf) {
        const len = buf.length;
        let i = 0;
        while (i < len) {
          if ((buf[i] & 128) === 0) {
            i++;
          } else if ((buf[i] & 224) === 192) {
            if (i + 1 === len || (buf[i + 1] & 192) !== 128 || (buf[i] & 254) === 192) {
              return false;
            }
            i += 2;
          } else if ((buf[i] & 240) === 224) {
            if (i + 2 >= len || (buf[i + 1] & 192) !== 128 || (buf[i + 2] & 192) !== 128 || buf[i] === 224 && (buf[i + 1] & 224) === 128 || // Overlong
            buf[i] === 237 && (buf[i + 1] & 224) === 160) {
              return false;
            }
            i += 3;
          } else if ((buf[i] & 248) === 240) {
            if (i + 3 >= len || (buf[i + 1] & 192) !== 128 || (buf[i + 2] & 192) !== 128 || (buf[i + 3] & 192) !== 128 || buf[i] === 240 && (buf[i + 1] & 240) === 128 || // Overlong
            buf[i] === 244 && buf[i + 1] > 143 || buf[i] > 244) {
              return false;
            }
            i += 4;
          } else {
            return false;
          }
        }
        return true;
      }
      module.exports = {
        isValidStatusCode,
        isValidUTF8: _isValidUTF8,
        tokenChars
      };
      if (isUtf8) {
        module.exports.isValidUTF8 = function(buf) {
          return buf.length < 24 ? _isValidUTF8(buf) : isUtf8(buf);
        };
      } else if (!process.env.WS_NO_UTF_8_VALIDATE) {
        try {
          const isValidUTF8 = __require("utf-8-validate");
          module.exports.isValidUTF8 = function(buf) {
            return buf.length < 32 ? _isValidUTF8(buf) : isValidUTF8(buf);
          };
        } catch (e) {
        }
      }
    }
  });

  // node_modules/.pnpm/ws@8.12.1/node_modules/ws/lib/receiver.js
  var require_receiver = __commonJS({
    "node_modules/.pnpm/ws@8.12.1/node_modules/ws/lib/receiver.js"(exports, module) {
      "use strict";
      var { Writable } = __require("stream");
      var PerMessageDeflate = require_permessage_deflate();
      var {
        BINARY_TYPES,
        EMPTY_BUFFER,
        kStatusCode,
        kWebSocket
      } = require_constants();
      var { concat, toArrayBuffer, unmask } = require_buffer_util();
      var { isValidStatusCode, isValidUTF8 } = require_validation();
      var FastBuffer = Buffer[Symbol.species];
      var GET_INFO = 0;
      var GET_PAYLOAD_LENGTH_16 = 1;
      var GET_PAYLOAD_LENGTH_64 = 2;
      var GET_MASK = 3;
      var GET_DATA = 4;
      var INFLATING = 5;
      var Receiver2 = class extends Writable {
        /**
         * Creates a Receiver instance.
         *
         * @param {Object} [options] Options object
         * @param {String} [options.binaryType=nodebuffer] The type for binary data
         * @param {Object} [options.extensions] An object containing the negotiated
         *     extensions
         * @param {Boolean} [options.isServer=false] Specifies whether to operate in
         *     client or server mode
         * @param {Number} [options.maxPayload=0] The maximum allowed message length
         * @param {Boolean} [options.skipUTF8Validation=false] Specifies whether or
         *     not to skip UTF-8 validation for text and close messages
         */
        constructor(options = {}) {
          super();
          this._binaryType = options.binaryType || BINARY_TYPES[0];
          this._extensions = options.extensions || {};
          this._isServer = !!options.isServer;
          this._maxPayload = options.maxPayload | 0;
          this._skipUTF8Validation = !!options.skipUTF8Validation;
          this[kWebSocket] = void 0;
          this._bufferedBytes = 0;
          this._buffers = [];
          this._compressed = false;
          this._payloadLength = 0;
          this._mask = void 0;
          this._fragmented = 0;
          this._masked = false;
          this._fin = false;
          this._opcode = 0;
          this._totalPayloadLength = 0;
          this._messageLength = 0;
          this._fragments = [];
          this._state = GET_INFO;
          this._loop = false;
        }
        /**
         * Implements `Writable.prototype._write()`.
         *
         * @param {Buffer} chunk The chunk of data to write
         * @param {String} encoding The character encoding of `chunk`
         * @param {Function} cb Callback
         * @private
         */
        _write(chunk, encoding, cb) {
          if (this._opcode === 8 && this._state == GET_INFO)
            return cb();
          this._bufferedBytes += chunk.length;
          this._buffers.push(chunk);
          this.startLoop(cb);
        }
        /**
         * Consumes `n` bytes from the buffered data.
         *
         * @param {Number} n The number of bytes to consume
         * @return {Buffer} The consumed bytes
         * @private
         */
        consume(n) {
          this._bufferedBytes -= n;
          if (n === this._buffers[0].length)
            return this._buffers.shift();
          if (n < this._buffers[0].length) {
            const buf = this._buffers[0];
            this._buffers[0] = new FastBuffer(
              buf.buffer,
              buf.byteOffset + n,
              buf.length - n
            );
            return new FastBuffer(buf.buffer, buf.byteOffset, n);
          }
          const dst = Buffer.allocUnsafe(n);
          do {
            const buf = this._buffers[0];
            const offset = dst.length - n;
            if (n >= buf.length) {
              dst.set(this._buffers.shift(), offset);
            } else {
              dst.set(new Uint8Array(buf.buffer, buf.byteOffset, n), offset);
              this._buffers[0] = new FastBuffer(
                buf.buffer,
                buf.byteOffset + n,
                buf.length - n
              );
            }
            n -= buf.length;
          } while (n > 0);
          return dst;
        }
        /**
         * Starts the parsing loop.
         *
         * @param {Function} cb Callback
         * @private
         */
        startLoop(cb) {
          let err;
          this._loop = true;
          do {
            switch (this._state) {
              case GET_INFO:
                err = this.getInfo();
                break;
              case GET_PAYLOAD_LENGTH_16:
                err = this.getPayloadLength16();
                break;
              case GET_PAYLOAD_LENGTH_64:
                err = this.getPayloadLength64();
                break;
              case GET_MASK:
                this.getMask();
                break;
              case GET_DATA:
                err = this.getData(cb);
                break;
              default:
                this._loop = false;
                return;
            }
          } while (this._loop);
          cb(err);
        }
        /**
         * Reads the first two bytes of a frame.
         *
         * @return {(RangeError|undefined)} A possible error
         * @private
         */
        getInfo() {
          if (this._bufferedBytes < 2) {
            this._loop = false;
            return;
          }
          const buf = this.consume(2);
          if ((buf[0] & 48) !== 0) {
            this._loop = false;
            return error(
              RangeError,
              "RSV2 and RSV3 must be clear",
              true,
              1002,
              "WS_ERR_UNEXPECTED_RSV_2_3"
            );
          }
          const compressed = (buf[0] & 64) === 64;
          if (compressed && !this._extensions[PerMessageDeflate.extensionName]) {
            this._loop = false;
            return error(
              RangeError,
              "RSV1 must be clear",
              true,
              1002,
              "WS_ERR_UNEXPECTED_RSV_1"
            );
          }
          this._fin = (buf[0] & 128) === 128;
          this._opcode = buf[0] & 15;
          this._payloadLength = buf[1] & 127;
          if (this._opcode === 0) {
            if (compressed) {
              this._loop = false;
              return error(
                RangeError,
                "RSV1 must be clear",
                true,
                1002,
                "WS_ERR_UNEXPECTED_RSV_1"
              );
            }
            if (!this._fragmented) {
              this._loop = false;
              return error(
                RangeError,
                "invalid opcode 0",
                true,
                1002,
                "WS_ERR_INVALID_OPCODE"
              );
            }
            this._opcode = this._fragmented;
          } else if (this._opcode === 1 || this._opcode === 2) {
            if (this._fragmented) {
              this._loop = false;
              return error(
                RangeError,
                `invalid opcode ${this._opcode}`,
                true,
                1002,
                "WS_ERR_INVALID_OPCODE"
              );
            }
            this._compressed = compressed;
          } else if (this._opcode > 7 && this._opcode < 11) {
            if (!this._fin) {
              this._loop = false;
              return error(
                RangeError,
                "FIN must be set",
                true,
                1002,
                "WS_ERR_EXPECTED_FIN"
              );
            }
            if (compressed) {
              this._loop = false;
              return error(
                RangeError,
                "RSV1 must be clear",
                true,
                1002,
                "WS_ERR_UNEXPECTED_RSV_1"
              );
            }
            if (this._payloadLength > 125 || this._opcode === 8 && this._payloadLength === 1) {
              this._loop = false;
              return error(
                RangeError,
                `invalid payload length ${this._payloadLength}`,
                true,
                1002,
                "WS_ERR_INVALID_CONTROL_PAYLOAD_LENGTH"
              );
            }
          } else {
            this._loop = false;
            return error(
              RangeError,
              `invalid opcode ${this._opcode}`,
              true,
              1002,
              "WS_ERR_INVALID_OPCODE"
            );
          }
          if (!this._fin && !this._fragmented)
            this._fragmented = this._opcode;
          this._masked = (buf[1] & 128) === 128;
          if (this._isServer) {
            if (!this._masked) {
              this._loop = false;
              return error(
                RangeError,
                "MASK must be set",
                true,
                1002,
                "WS_ERR_EXPECTED_MASK"
              );
            }
          } else if (this._masked) {
            this._loop = false;
            return error(
              RangeError,
              "MASK must be clear",
              true,
              1002,
              "WS_ERR_UNEXPECTED_MASK"
            );
          }
          if (this._payloadLength === 126)
            this._state = GET_PAYLOAD_LENGTH_16;
          else if (this._payloadLength === 127)
            this._state = GET_PAYLOAD_LENGTH_64;
          else
            return this.haveLength();
        }
        /**
         * Gets extended payload length (7+16).
         *
         * @return {(RangeError|undefined)} A possible error
         * @private
         */
        getPayloadLength16() {
          if (this._bufferedBytes < 2) {
            this._loop = false;
            return;
          }
          this._payloadLength = this.consume(2).readUInt16BE(0);
          return this.haveLength();
        }
        /**
         * Gets extended payload length (7+64).
         *
         * @return {(RangeError|undefined)} A possible error
         * @private
         */
        getPayloadLength64() {
          if (this._bufferedBytes < 8) {
            this._loop = false;
            return;
          }
          const buf = this.consume(8);
          const num = buf.readUInt32BE(0);
          if (num > Math.pow(2, 53 - 32) - 1) {
            this._loop = false;
            return error(
              RangeError,
              "Unsupported WebSocket frame: payload length > 2^53 - 1",
              false,
              1009,
              "WS_ERR_UNSUPPORTED_DATA_PAYLOAD_LENGTH"
            );
          }
          this._payloadLength = num * Math.pow(2, 32) + buf.readUInt32BE(4);
          return this.haveLength();
        }
        /**
         * Payload length has been read.
         *
         * @return {(RangeError|undefined)} A possible error
         * @private
         */
        haveLength() {
          if (this._payloadLength && this._opcode < 8) {
            this._totalPayloadLength += this._payloadLength;
            if (this._totalPayloadLength > this._maxPayload && this._maxPayload > 0) {
              this._loop = false;
              return error(
                RangeError,
                "Max payload size exceeded",
                false,
                1009,
                "WS_ERR_UNSUPPORTED_MESSAGE_LENGTH"
              );
            }
          }
          if (this._masked)
            this._state = GET_MASK;
          else
            this._state = GET_DATA;
        }
        /**
         * Reads mask bytes.
         *
         * @private
         */
        getMask() {
          if (this._bufferedBytes < 4) {
            this._loop = false;
            return;
          }
          this._mask = this.consume(4);
          this._state = GET_DATA;
        }
        /**
         * Reads data bytes.
         *
         * @param {Function} cb Callback
         * @return {(Error|RangeError|undefined)} A possible error
         * @private
         */
        getData(cb) {
          let data = EMPTY_BUFFER;
          if (this._payloadLength) {
            if (this._bufferedBytes < this._payloadLength) {
              this._loop = false;
              return;
            }
            data = this.consume(this._payloadLength);
            if (this._masked && (this._mask[0] | this._mask[1] | this._mask[2] | this._mask[3]) !== 0) {
              unmask(data, this._mask);
            }
          }
          if (this._opcode > 7)
            return this.controlMessage(data);
          if (this._compressed) {
            this._state = INFLATING;
            this.decompress(data, cb);
            return;
          }
          if (data.length) {
            this._messageLength = this._totalPayloadLength;
            this._fragments.push(data);
          }
          return this.dataMessage();
        }
        /**
         * Decompresses data.
         *
         * @param {Buffer} data Compressed data
         * @param {Function} cb Callback
         * @private
         */
        decompress(data, cb) {
          const perMessageDeflate = this._extensions[PerMessageDeflate.extensionName];
          perMessageDeflate.decompress(data, this._fin, (err, buf) => {
            if (err)
              return cb(err);
            if (buf.length) {
              this._messageLength += buf.length;
              if (this._messageLength > this._maxPayload && this._maxPayload > 0) {
                return cb(
                  error(
                    RangeError,
                    "Max payload size exceeded",
                    false,
                    1009,
                    "WS_ERR_UNSUPPORTED_MESSAGE_LENGTH"
                  )
                );
              }
              this._fragments.push(buf);
            }
            const er = this.dataMessage();
            if (er)
              return cb(er);
            this.startLoop(cb);
          });
        }
        /**
         * Handles a data message.
         *
         * @return {(Error|undefined)} A possible error
         * @private
         */
        dataMessage() {
          if (this._fin) {
            const messageLength = this._messageLength;
            const fragments = this._fragments;
            this._totalPayloadLength = 0;
            this._messageLength = 0;
            this._fragmented = 0;
            this._fragments = [];
            if (this._opcode === 2) {
              let data;
              if (this._binaryType === "nodebuffer") {
                data = concat(fragments, messageLength);
              } else if (this._binaryType === "arraybuffer") {
                data = toArrayBuffer(concat(fragments, messageLength));
              } else {
                data = fragments;
              }
              this.emit("message", data, true);
            } else {
              const buf = concat(fragments, messageLength);
              if (!this._skipUTF8Validation && !isValidUTF8(buf)) {
                this._loop = false;
                return error(
                  Error,
                  "invalid UTF-8 sequence",
                  true,
                  1007,
                  "WS_ERR_INVALID_UTF8"
                );
              }
              this.emit("message", buf, false);
            }
          }
          this._state = GET_INFO;
        }
        /**
         * Handles a control message.
         *
         * @param {Buffer} data Data to handle
         * @return {(Error|RangeError|undefined)} A possible error
         * @private
         */
        controlMessage(data) {
          if (this._opcode === 8) {
            this._loop = false;
            if (data.length === 0) {
              this.emit("conclude", 1005, EMPTY_BUFFER);
              this.end();
            } else {
              const code = data.readUInt16BE(0);
              if (!isValidStatusCode(code)) {
                return error(
                  RangeError,
                  `invalid status code ${code}`,
                  true,
                  1002,
                  "WS_ERR_INVALID_CLOSE_CODE"
                );
              }
              const buf = new FastBuffer(
                data.buffer,
                data.byteOffset + 2,
                data.length - 2
              );
              if (!this._skipUTF8Validation && !isValidUTF8(buf)) {
                return error(
                  Error,
                  "invalid UTF-8 sequence",
                  true,
                  1007,
                  "WS_ERR_INVALID_UTF8"
                );
              }
              this.emit("conclude", code, buf);
              this.end();
            }
          } else if (this._opcode === 9) {
            this.emit("ping", data);
          } else {
            this.emit("pong", data);
          }
          this._state = GET_INFO;
        }
      };
      module.exports = Receiver2;
      function error(ErrorCtor, message, prefix, statusCode, errorCode) {
        const err = new ErrorCtor(
          prefix ? `Invalid WebSocket frame: ${message}` : message
        );
        Error.captureStackTrace(err, error);
        err.code = errorCode;
        err[kStatusCode] = statusCode;
        return err;
      }
    }
  });

  // node_modules/.pnpm/ws@8.12.1/node_modules/ws/lib/sender.js
  var require_sender = __commonJS({
    "node_modules/.pnpm/ws@8.12.1/node_modules/ws/lib/sender.js"(exports, module) {
      "use strict";
      var net2 = __require("net");
      var tls = __require("tls");
      var { randomFillSync } = __require("crypto");
      var PerMessageDeflate = require_permessage_deflate();
      var { EMPTY_BUFFER } = require_constants();
      var { isValidStatusCode } = require_validation();
      var { mask: applyMask, toBuffer } = require_buffer_util();
      var kByteLength = Symbol("kByteLength");
      var maskBuffer = Buffer.alloc(4);
      var Sender2 = class _Sender {
        /**
         * Creates a Sender instance.
         *
         * @param {(net.Socket|tls.Socket)} socket The connection socket
         * @param {Object} [extensions] An object containing the negotiated extensions
         * @param {Function} [generateMask] The function used to generate the masking
         *     key
         */
        constructor(socket, extensions, generateMask) {
          this._extensions = extensions || {};
          if (generateMask) {
            this._generateMask = generateMask;
            this._maskBuffer = Buffer.alloc(4);
          }
          this._socket = socket;
          this._firstFragment = true;
          this._compress = false;
          this._bufferedBytes = 0;
          this._deflating = false;
          this._queue = [];
        }
        /**
         * Frames a piece of data according to the HyBi WebSocket protocol.
         *
         * @param {(Buffer|String)} data The data to frame
         * @param {Object} options Options object
         * @param {Boolean} [options.fin=false] Specifies whether or not to set the
         *     FIN bit
         * @param {Function} [options.generateMask] The function used to generate the
         *     masking key
         * @param {Boolean} [options.mask=false] Specifies whether or not to mask
         *     `data`
         * @param {Buffer} [options.maskBuffer] The buffer used to store the masking
         *     key
         * @param {Number} options.opcode The opcode
         * @param {Boolean} [options.readOnly=false] Specifies whether `data` can be
         *     modified
         * @param {Boolean} [options.rsv1=false] Specifies whether or not to set the
         *     RSV1 bit
         * @return {(Buffer|String)[]} The framed data
         * @public
         */
        static frame(data, options) {
          let mask;
          let merge = false;
          let offset = 2;
          let skipMasking = false;
          if (options.mask) {
            mask = options.maskBuffer || maskBuffer;
            if (options.generateMask) {
              options.generateMask(mask);
            } else {
              randomFillSync(mask, 0, 4);
            }
            skipMasking = (mask[0] | mask[1] | mask[2] | mask[3]) === 0;
            offset = 6;
          }
          let dataLength;
          if (typeof data === "string") {
            if ((!options.mask || skipMasking) && options[kByteLength] !== void 0) {
              dataLength = options[kByteLength];
            } else {
              data = Buffer.from(data);
              dataLength = data.length;
            }
          } else {
            dataLength = data.length;
            merge = options.mask && options.readOnly && !skipMasking;
          }
          let payloadLength = dataLength;
          if (dataLength >= 65536) {
            offset += 8;
            payloadLength = 127;
          } else if (dataLength > 125) {
            offset += 2;
            payloadLength = 126;
          }
          const target = Buffer.allocUnsafe(merge ? dataLength + offset : offset);
          target[0] = options.fin ? options.opcode | 128 : options.opcode;
          if (options.rsv1)
            target[0] |= 64;
          target[1] = payloadLength;
          if (payloadLength === 126) {
            target.writeUInt16BE(dataLength, 2);
          } else if (payloadLength === 127) {
            target[2] = target[3] = 0;
            target.writeUIntBE(dataLength, 4, 6);
          }
          if (!options.mask)
            return [target, data];
          target[1] |= 128;
          target[offset - 4] = mask[0];
          target[offset - 3] = mask[1];
          target[offset - 2] = mask[2];
          target[offset - 1] = mask[3];
          if (skipMasking)
            return [target, data];
          if (merge) {
            applyMask(data, mask, target, offset, dataLength);
            return [target];
          }
          applyMask(data, mask, data, 0, dataLength);
          return [target, data];
        }
        /**
         * Sends a close message to the other peer.
         *
         * @param {Number} [code] The status code component of the body
         * @param {(String|Buffer)} [data] The message component of the body
         * @param {Boolean} [mask=false] Specifies whether or not to mask the message
         * @param {Function} [cb] Callback
         * @public
         */
        close(code, data, mask, cb) {
          let buf;
          if (code === void 0) {
            buf = EMPTY_BUFFER;
          } else if (typeof code !== "number" || !isValidStatusCode(code)) {
            throw new TypeError("First argument must be a valid error code number");
          } else if (data === void 0 || !data.length) {
            buf = Buffer.allocUnsafe(2);
            buf.writeUInt16BE(code, 0);
          } else {
            const length = Buffer.byteLength(data);
            if (length > 123) {
              throw new RangeError("The message must not be greater than 123 bytes");
            }
            buf = Buffer.allocUnsafe(2 + length);
            buf.writeUInt16BE(code, 0);
            if (typeof data === "string") {
              buf.write(data, 2);
            } else {
              buf.set(data, 2);
            }
          }
          const options = {
            [kByteLength]: buf.length,
            fin: true,
            generateMask: this._generateMask,
            mask,
            maskBuffer: this._maskBuffer,
            opcode: 8,
            readOnly: false,
            rsv1: false
          };
          if (this._deflating) {
            this.enqueue([this.dispatch, buf, false, options, cb]);
          } else {
            this.sendFrame(_Sender.frame(buf, options), cb);
          }
        }
        /**
         * Sends a ping message to the other peer.
         *
         * @param {*} data The message to send
         * @param {Boolean} [mask=false] Specifies whether or not to mask `data`
         * @param {Function} [cb] Callback
         * @public
         */
        ping(data, mask, cb) {
          let byteLength;
          let readOnly;
          if (typeof data === "string") {
            byteLength = Buffer.byteLength(data);
            readOnly = false;
          } else {
            data = toBuffer(data);
            byteLength = data.length;
            readOnly = toBuffer.readOnly;
          }
          if (byteLength > 125) {
            throw new RangeError("The data size must not be greater than 125 bytes");
          }
          const options = {
            [kByteLength]: byteLength,
            fin: true,
            generateMask: this._generateMask,
            mask,
            maskBuffer: this._maskBuffer,
            opcode: 9,
            readOnly,
            rsv1: false
          };
          if (this._deflating) {
            this.enqueue([this.dispatch, data, false, options, cb]);
          } else {
            this.sendFrame(_Sender.frame(data, options), cb);
          }
        }
        /**
         * Sends a pong message to the other peer.
         *
         * @param {*} data The message to send
         * @param {Boolean} [mask=false] Specifies whether or not to mask `data`
         * @param {Function} [cb] Callback
         * @public
         */
        pong(data, mask, cb) {
          let byteLength;
          let readOnly;
          if (typeof data === "string") {
            byteLength = Buffer.byteLength(data);
            readOnly = false;
          } else {
            data = toBuffer(data);
            byteLength = data.length;
            readOnly = toBuffer.readOnly;
          }
          if (byteLength > 125) {
            throw new RangeError("The data size must not be greater than 125 bytes");
          }
          const options = {
            [kByteLength]: byteLength,
            fin: true,
            generateMask: this._generateMask,
            mask,
            maskBuffer: this._maskBuffer,
            opcode: 10,
            readOnly,
            rsv1: false
          };
          if (this._deflating) {
            this.enqueue([this.dispatch, data, false, options, cb]);
          } else {
            this.sendFrame(_Sender.frame(data, options), cb);
          }
        }
        /**
         * Sends a data message to the other peer.
         *
         * @param {*} data The message to send
         * @param {Object} options Options object
         * @param {Boolean} [options.binary=false] Specifies whether `data` is binary
         *     or text
         * @param {Boolean} [options.compress=false] Specifies whether or not to
         *     compress `data`
         * @param {Boolean} [options.fin=false] Specifies whether the fragment is the
         *     last one
         * @param {Boolean} [options.mask=false] Specifies whether or not to mask
         *     `data`
         * @param {Function} [cb] Callback
         * @public
         */
        send(data, options, cb) {
          const perMessageDeflate = this._extensions[PerMessageDeflate.extensionName];
          let opcode = options.binary ? 2 : 1;
          let rsv1 = options.compress;
          let byteLength;
          let readOnly;
          if (typeof data === "string") {
            byteLength = Buffer.byteLength(data);
            readOnly = false;
          } else {
            data = toBuffer(data);
            byteLength = data.length;
            readOnly = toBuffer.readOnly;
          }
          if (this._firstFragment) {
            this._firstFragment = false;
            if (rsv1 && perMessageDeflate && perMessageDeflate.params[perMessageDeflate._isServer ? "server_no_context_takeover" : "client_no_context_takeover"]) {
              rsv1 = byteLength >= perMessageDeflate._threshold;
            }
            this._compress = rsv1;
          } else {
            rsv1 = false;
            opcode = 0;
          }
          if (options.fin)
            this._firstFragment = true;
          if (perMessageDeflate) {
            const opts = {
              [kByteLength]: byteLength,
              fin: options.fin,
              generateMask: this._generateMask,
              mask: options.mask,
              maskBuffer: this._maskBuffer,
              opcode,
              readOnly,
              rsv1
            };
            if (this._deflating) {
              this.enqueue([this.dispatch, data, this._compress, opts, cb]);
            } else {
              this.dispatch(data, this._compress, opts, cb);
            }
          } else {
            this.sendFrame(
              _Sender.frame(data, {
                [kByteLength]: byteLength,
                fin: options.fin,
                generateMask: this._generateMask,
                mask: options.mask,
                maskBuffer: this._maskBuffer,
                opcode,
                readOnly,
                rsv1: false
              }),
              cb
            );
          }
        }
        /**
         * Dispatches a message.
         *
         * @param {(Buffer|String)} data The message to send
         * @param {Boolean} [compress=false] Specifies whether or not to compress
         *     `data`
         * @param {Object} options Options object
         * @param {Boolean} [options.fin=false] Specifies whether or not to set the
         *     FIN bit
         * @param {Function} [options.generateMask] The function used to generate the
         *     masking key
         * @param {Boolean} [options.mask=false] Specifies whether or not to mask
         *     `data`
         * @param {Buffer} [options.maskBuffer] The buffer used to store the masking
         *     key
         * @param {Number} options.opcode The opcode
         * @param {Boolean} [options.readOnly=false] Specifies whether `data` can be
         *     modified
         * @param {Boolean} [options.rsv1=false] Specifies whether or not to set the
         *     RSV1 bit
         * @param {Function} [cb] Callback
         * @private
         */
        dispatch(data, compress, options, cb) {
          if (!compress) {
            this.sendFrame(_Sender.frame(data, options), cb);
            return;
          }
          const perMessageDeflate = this._extensions[PerMessageDeflate.extensionName];
          this._bufferedBytes += options[kByteLength];
          this._deflating = true;
          perMessageDeflate.compress(data, options.fin, (_, buf) => {
            if (this._socket.destroyed) {
              const err = new Error(
                "The socket was closed while data was being compressed"
              );
              if (typeof cb === "function")
                cb(err);
              for (let i = 0; i < this._queue.length; i++) {
                const params = this._queue[i];
                const callback = params[params.length - 1];
                if (typeof callback === "function")
                  callback(err);
              }
              return;
            }
            this._bufferedBytes -= options[kByteLength];
            this._deflating = false;
            options.readOnly = false;
            this.sendFrame(_Sender.frame(buf, options), cb);
            this.dequeue();
          });
        }
        /**
         * Executes queued send operations.
         *
         * @private
         */
        dequeue() {
          while (!this._deflating && this._queue.length) {
            const params = this._queue.shift();
            this._bufferedBytes -= params[3][kByteLength];
            Reflect.apply(params[0], this, params.slice(1));
          }
        }
        /**
         * Enqueues a send operation.
         *
         * @param {Array} params Send operation parameters.
         * @private
         */
        enqueue(params) {
          this._bufferedBytes += params[3][kByteLength];
          this._queue.push(params);
        }
        /**
         * Sends a frame.
         *
         * @param {Buffer[]} list The frame to send
         * @param {Function} [cb] Callback
         * @private
         */
        sendFrame(list, cb) {
          if (list.length === 2) {
            this._socket.cork();
            this._socket.write(list[0]);
            this._socket.write(list[1], cb);
            this._socket.uncork();
          } else {
            this._socket.write(list[0], cb);
          }
        }
      };
      module.exports = Sender2;
    }
  });

  // node_modules/.pnpm/ws@8.12.1/node_modules/ws/lib/event-target.js
  var require_event_target = __commonJS({
    "node_modules/.pnpm/ws@8.12.1/node_modules/ws/lib/event-target.js"(exports, module) {
      "use strict";
      var { kForOnEventAttribute, kListener } = require_constants();
      var kCode = Symbol("kCode");
      var kData = Symbol("kData");
      var kError = Symbol("kError");
      var kMessage = Symbol("kMessage");
      var kReason = Symbol("kReason");
      var kTarget = Symbol("kTarget");
      var kType = Symbol("kType");
      var kWasClean = Symbol("kWasClean");
      var Event = class {
        /**
         * Create a new `Event`.
         *
         * @param {String} type The name of the event
         * @throws {TypeError} If the `type` argument is not specified
         */
        constructor(type) {
          this[kTarget] = null;
          this[kType] = type;
        }
        /**
         * @type {*}
         */
        get target() {
          return this[kTarget];
        }
        /**
         * @type {String}
         */
        get type() {
          return this[kType];
        }
      };
      Object.defineProperty(Event.prototype, "target", { enumerable: true });
      Object.defineProperty(Event.prototype, "type", { enumerable: true });
      var CloseEvent = class extends Event {
        /**
         * Create a new `CloseEvent`.
         *
         * @param {String} type The name of the event
         * @param {Object} [options] A dictionary object that allows for setting
         *     attributes via object members of the same name
         * @param {Number} [options.code=0] The status code explaining why the
         *     connection was closed
         * @param {String} [options.reason=''] A human-readable string explaining why
         *     the connection was closed
         * @param {Boolean} [options.wasClean=false] Indicates whether or not the
         *     connection was cleanly closed
         */
        constructor(type, options = {}) {
          super(type);
          this[kCode] = options.code === void 0 ? 0 : options.code;
          this[kReason] = options.reason === void 0 ? "" : options.reason;
          this[kWasClean] = options.wasClean === void 0 ? false : options.wasClean;
        }
        /**
         * @type {Number}
         */
        get code() {
          return this[kCode];
        }
        /**
         * @type {String}
         */
        get reason() {
          return this[kReason];
        }
        /**
         * @type {Boolean}
         */
        get wasClean() {
          return this[kWasClean];
        }
      };
      Object.defineProperty(CloseEvent.prototype, "code", { enumerable: true });
      Object.defineProperty(CloseEvent.prototype, "reason", { enumerable: true });
      Object.defineProperty(CloseEvent.prototype, "wasClean", { enumerable: true });
      var ErrorEvent = class extends Event {
        /**
         * Create a new `ErrorEvent`.
         *
         * @param {String} type The name of the event
         * @param {Object} [options] A dictionary object that allows for setting
         *     attributes via object members of the same name
         * @param {*} [options.error=null] The error that generated this event
         * @param {String} [options.message=''] The error message
         */
        constructor(type, options = {}) {
          super(type);
          this[kError] = options.error === void 0 ? null : options.error;
          this[kMessage] = options.message === void 0 ? "" : options.message;
        }
        /**
         * @type {*}
         */
        get error() {
          return this[kError];
        }
        /**
         * @type {String}
         */
        get message() {
          return this[kMessage];
        }
      };
      Object.defineProperty(ErrorEvent.prototype, "error", { enumerable: true });
      Object.defineProperty(ErrorEvent.prototype, "message", { enumerable: true });
      var MessageEvent = class extends Event {
        /**
         * Create a new `MessageEvent`.
         *
         * @param {String} type The name of the event
         * @param {Object} [options] A dictionary object that allows for setting
         *     attributes via object members of the same name
         * @param {*} [options.data=null] The message content
         */
        constructor(type, options = {}) {
          super(type);
          this[kData] = options.data === void 0 ? null : options.data;
        }
        /**
         * @type {*}
         */
        get data() {
          return this[kData];
        }
      };
      Object.defineProperty(MessageEvent.prototype, "data", { enumerable: true });
      var EventTarget = {
        /**
         * Register an event listener.
         *
         * @param {String} type A string representing the event type to listen for
         * @param {(Function|Object)} handler The listener to add
         * @param {Object} [options] An options object specifies characteristics about
         *     the event listener
         * @param {Boolean} [options.once=false] A `Boolean` indicating that the
         *     listener should be invoked at most once after being added. If `true`,
         *     the listener would be automatically removed when invoked.
         * @public
         */
        addEventListener(type, handler, options = {}) {
          for (const listener of this.listeners(type)) {
            if (!options[kForOnEventAttribute] && listener[kListener] === handler && !listener[kForOnEventAttribute]) {
              return;
            }
          }
          let wrapper;
          if (type === "message") {
            wrapper = function onMessage(data, isBinary) {
              const event = new MessageEvent("message", {
                data: isBinary ? data : data.toString()
              });
              event[kTarget] = this;
              callListener(handler, this, event);
            };
          } else if (type === "close") {
            wrapper = function onClose(code, message) {
              const event = new CloseEvent("close", {
                code,
                reason: message.toString(),
                wasClean: this._closeFrameReceived && this._closeFrameSent
              });
              event[kTarget] = this;
              callListener(handler, this, event);
            };
          } else if (type === "error") {
            wrapper = function onError(error) {
              const event = new ErrorEvent("error", {
                error,
                message: error.message
              });
              event[kTarget] = this;
              callListener(handler, this, event);
            };
          } else if (type === "open") {
            wrapper = function onOpen() {
              const event = new Event("open");
              event[kTarget] = this;
              callListener(handler, this, event);
            };
          } else {
            return;
          }
          wrapper[kForOnEventAttribute] = !!options[kForOnEventAttribute];
          wrapper[kListener] = handler;
          if (options.once) {
            this.once(type, wrapper);
          } else {
            this.on(type, wrapper);
          }
        },
        /**
         * Remove an event listener.
         *
         * @param {String} type A string representing the event type to remove
         * @param {(Function|Object)} handler The listener to remove
         * @public
         */
        removeEventListener(type, handler) {
          for (const listener of this.listeners(type)) {
            if (listener[kListener] === handler && !listener[kForOnEventAttribute]) {
              this.removeListener(type, listener);
              break;
            }
          }
        }
      };
      module.exports = {
        CloseEvent,
        ErrorEvent,
        Event,
        EventTarget,
        MessageEvent
      };
      function callListener(listener, thisArg, event) {
        if (typeof listener === "object" && listener.handleEvent) {
          listener.handleEvent.call(listener, event);
        } else {
          listener.call(thisArg, event);
        }
      }
    }
  });

  // node_modules/.pnpm/ws@8.12.1/node_modules/ws/lib/extension.js
  var require_extension = __commonJS({
    "node_modules/.pnpm/ws@8.12.1/node_modules/ws/lib/extension.js"(exports, module) {
      "use strict";
      var { tokenChars } = require_validation();
      function push(dest, name, elem) {
        if (dest[name] === void 0)
          dest[name] = [elem];
        else
          dest[name].push(elem);
      }
      function parse(header) {
        const offers = /* @__PURE__ */ Object.create(null);
        let params = /* @__PURE__ */ Object.create(null);
        let mustUnescape = false;
        let isEscaping = false;
        let inQuotes = false;
        let extensionName;
        let paramName;
        let start = -1;
        let code = -1;
        let end = -1;
        let i = 0;
        for (; i < header.length; i++) {
          code = header.charCodeAt(i);
          if (extensionName === void 0) {
            if (end === -1 && tokenChars[code] === 1) {
              if (start === -1)
                start = i;
            } else if (i !== 0 && (code === 32 || code === 9)) {
              if (end === -1 && start !== -1)
                end = i;
            } else if (code === 59 || code === 44) {
              if (start === -1) {
                throw new SyntaxError(`Unexpected character at index ${i}`);
              }
              if (end === -1)
                end = i;
              const name = header.slice(start, end);
              if (code === 44) {
                push(offers, name, params);
                params = /* @__PURE__ */ Object.create(null);
              } else {
                extensionName = name;
              }
              start = end = -1;
            } else {
              throw new SyntaxError(`Unexpected character at index ${i}`);
            }
          } else if (paramName === void 0) {
            if (end === -1 && tokenChars[code] === 1) {
              if (start === -1)
                start = i;
            } else if (code === 32 || code === 9) {
              if (end === -1 && start !== -1)
                end = i;
            } else if (code === 59 || code === 44) {
              if (start === -1) {
                throw new SyntaxError(`Unexpected character at index ${i}`);
              }
              if (end === -1)
                end = i;
              push(params, header.slice(start, end), true);
              if (code === 44) {
                push(offers, extensionName, params);
                params = /* @__PURE__ */ Object.create(null);
                extensionName = void 0;
              }
              start = end = -1;
            } else if (code === 61 && start !== -1 && end === -1) {
              paramName = header.slice(start, i);
              start = end = -1;
            } else {
              throw new SyntaxError(`Unexpected character at index ${i}`);
            }
          } else {
            if (isEscaping) {
              if (tokenChars[code] !== 1) {
                throw new SyntaxError(`Unexpected character at index ${i}`);
              }
              if (start === -1)
                start = i;
              else if (!mustUnescape)
                mustUnescape = true;
              isEscaping = false;
            } else if (inQuotes) {
              if (tokenChars[code] === 1) {
                if (start === -1)
                  start = i;
              } else if (code === 34 && start !== -1) {
                inQuotes = false;
                end = i;
              } else if (code === 92) {
                isEscaping = true;
              } else {
                throw new SyntaxError(`Unexpected character at index ${i}`);
              }
            } else if (code === 34 && header.charCodeAt(i - 1) === 61) {
              inQuotes = true;
            } else if (end === -1 && tokenChars[code] === 1) {
              if (start === -1)
                start = i;
            } else if (start !== -1 && (code === 32 || code === 9)) {
              if (end === -1)
                end = i;
            } else if (code === 59 || code === 44) {
              if (start === -1) {
                throw new SyntaxError(`Unexpected character at index ${i}`);
              }
              if (end === -1)
                end = i;
              let value = header.slice(start, end);
              if (mustUnescape) {
                value = value.replace(/\\/g, "");
                mustUnescape = false;
              }
              push(params, paramName, value);
              if (code === 44) {
                push(offers, extensionName, params);
                params = /* @__PURE__ */ Object.create(null);
                extensionName = void 0;
              }
              paramName = void 0;
              start = end = -1;
            } else {
              throw new SyntaxError(`Unexpected character at index ${i}`);
            }
          }
        }
        if (start === -1 || inQuotes || code === 32 || code === 9) {
          throw new SyntaxError("Unexpected end of input");
        }
        if (end === -1)
          end = i;
        const token = header.slice(start, end);
        if (extensionName === void 0) {
          push(offers, token, params);
        } else {
          if (paramName === void 0) {
            push(params, token, true);
          } else if (mustUnescape) {
            push(params, paramName, token.replace(/\\/g, ""));
          } else {
            push(params, paramName, token);
          }
          push(offers, extensionName, params);
        }
        return offers;
      }
      function format(extensions) {
        return Object.keys(extensions).map((extension) => {
          let configurations = extensions[extension];
          if (!Array.isArray(configurations))
            configurations = [configurations];
          return configurations.map((params) => {
            return [extension].concat(
              Object.keys(params).map((k) => {
                let values = params[k];
                if (!Array.isArray(values))
                  values = [values];
                return values.map((v) => v === true ? k : `${k}=${v}`).join("; ");
              })
            ).join("; ");
          }).join(", ");
        }).join(", ");
      }
      module.exports = { format, parse };
    }
  });

  // node_modules/.pnpm/ws@8.12.1/node_modules/ws/lib/websocket.js
  var require_websocket = __commonJS({
    "node_modules/.pnpm/ws@8.12.1/node_modules/ws/lib/websocket.js"(exports, module) {
      "use strict";
      var EventEmitter = __require("events");
      var https = __require("https");
      var http = __require("http");
      var net2 = __require("net");
      var tls = __require("tls");
      var { randomBytes, createHash } = __require("crypto");
      var { Readable } = __require("stream");
      var { URL } = __require("url");
      var PerMessageDeflate = require_permessage_deflate();
      var Receiver2 = require_receiver();
      var Sender2 = require_sender();
      var {
        BINARY_TYPES,
        EMPTY_BUFFER,
        GUID,
        kForOnEventAttribute,
        kListener,
        kStatusCode,
        kWebSocket,
        NOOP
      } = require_constants();
      var {
        EventTarget: { addEventListener, removeEventListener }
      } = require_event_target();
      var { format, parse } = require_extension();
      var { toBuffer } = require_buffer_util();
      var closeTimeout = 30 * 1e3;
      var kAborted = Symbol("kAborted");
      var protocolVersions = [8, 13];
      var readyStates = ["CONNECTING", "OPEN", "CLOSING", "CLOSED"];
      var subprotocolRegex = /^[!#$%&'*+\-.0-9A-Z^_`|a-z~]+$/;
      var WebSocket2 = class _WebSocket extends EventEmitter {
        /**
         * Create a new `WebSocket`.
         *
         * @param {(String|URL)} address The URL to which to connect
         * @param {(String|String[])} [protocols] The subprotocols
         * @param {Object} [options] Connection options
         */
        constructor(address, protocols, options) {
          super();
          this._binaryType = BINARY_TYPES[0];
          this._closeCode = 1006;
          this._closeFrameReceived = false;
          this._closeFrameSent = false;
          this._closeMessage = EMPTY_BUFFER;
          this._closeTimer = null;
          this._extensions = {};
          this._paused = false;
          this._protocol = "";
          this._readyState = _WebSocket.CONNECTING;
          this._receiver = null;
          this._sender = null;
          this._socket = null;
          if (address !== null) {
            this._bufferedAmount = 0;
            this._isServer = false;
            this._redirects = 0;
            if (protocols === void 0) {
              protocols = [];
            } else if (!Array.isArray(protocols)) {
              if (typeof protocols === "object" && protocols !== null) {
                options = protocols;
                protocols = [];
              } else {
                protocols = [protocols];
              }
            }
            initAsClient(this, address, protocols, options);
          } else {
            this._isServer = true;
          }
        }
        /**
         * This deviates from the WHATWG interface since ws doesn't support the
         * required default "blob" type (instead we define a custom "nodebuffer"
         * type).
         *
         * @type {String}
         */
        get binaryType() {
          return this._binaryType;
        }
        set binaryType(type) {
          if (!BINARY_TYPES.includes(type))
            return;
          this._binaryType = type;
          if (this._receiver)
            this._receiver._binaryType = type;
        }
        /**
         * @type {Number}
         */
        get bufferedAmount() {
          if (!this._socket)
            return this._bufferedAmount;
          return this._socket._writableState.length + this._sender._bufferedBytes;
        }
        /**
         * @type {String}
         */
        get extensions() {
          return Object.keys(this._extensions).join();
        }
        /**
         * @type {Boolean}
         */
        get isPaused() {
          return this._paused;
        }
        /**
         * @type {Function}
         */
        /* istanbul ignore next */
        get onclose() {
          return null;
        }
        /**
         * @type {Function}
         */
        /* istanbul ignore next */
        get onerror() {
          return null;
        }
        /**
         * @type {Function}
         */
        /* istanbul ignore next */
        get onopen() {
          return null;
        }
        /**
         * @type {Function}
         */
        /* istanbul ignore next */
        get onmessage() {
          return null;
        }
        /**
         * @type {String}
         */
        get protocol() {
          return this._protocol;
        }
        /**
         * @type {Number}
         */
        get readyState() {
          return this._readyState;
        }
        /**
         * @type {String}
         */
        get url() {
          return this._url;
        }
        /**
         * Set up the socket and the internal resources.
         *
         * @param {(net.Socket|tls.Socket)} socket The network socket between the
         *     server and client
         * @param {Buffer} head The first packet of the upgraded stream
         * @param {Object} options Options object
         * @param {Function} [options.generateMask] The function used to generate the
         *     masking key
         * @param {Number} [options.maxPayload=0] The maximum allowed message size
         * @param {Boolean} [options.skipUTF8Validation=false] Specifies whether or
         *     not to skip UTF-8 validation for text and close messages
         * @private
         */
        setSocket(socket, head, options) {
          const receiver = new Receiver2({
            binaryType: this.binaryType,
            extensions: this._extensions,
            isServer: this._isServer,
            maxPayload: options.maxPayload,
            skipUTF8Validation: options.skipUTF8Validation
          });
          this._sender = new Sender2(socket, this._extensions, options.generateMask);
          this._receiver = receiver;
          this._socket = socket;
          receiver[kWebSocket] = this;
          socket[kWebSocket] = this;
          receiver.on("conclude", receiverOnConclude);
          receiver.on("drain", receiverOnDrain);
          receiver.on("error", receiverOnError);
          receiver.on("message", receiverOnMessage);
          receiver.on("ping", receiverOnPing);
          receiver.on("pong", receiverOnPong);
          socket.setTimeout(0);
          socket.setNoDelay();
          if (head.length > 0)
            socket.unshift(head);
          socket.on("close", socketOnClose);
          socket.on("data", socketOnData);
          socket.on("end", socketOnEnd);
          socket.on("error", socketOnError);
          this._readyState = _WebSocket.OPEN;
          this.emit("open");
        }
        /**
         * Emit the `'close'` event.
         *
         * @private
         */
        emitClose() {
          if (!this._socket) {
            this._readyState = _WebSocket.CLOSED;
            this.emit("close", this._closeCode, this._closeMessage);
            return;
          }
          if (this._extensions[PerMessageDeflate.extensionName]) {
            this._extensions[PerMessageDeflate.extensionName].cleanup();
          }
          this._receiver.removeAllListeners();
          this._readyState = _WebSocket.CLOSED;
          this.emit("close", this._closeCode, this._closeMessage);
        }
        /**
         * Start a closing handshake.
         *
         *          +----------+   +-----------+   +----------+
         *     - - -|ws.close()|-->|close frame|-->|ws.close()|- - -
         *    |     +----------+   +-----------+   +----------+     |
         *          +----------+   +-----------+         |
         * CLOSING  |ws.close()|<--|close frame|<--+-----+       CLOSING
         *          +----------+   +-----------+   |
         *    |           |                        |   +---+        |
         *                +------------------------+-->|fin| - - - -
         *    |         +---+                      |   +---+
         *     - - - - -|fin|<---------------------+
         *              +---+
         *
         * @param {Number} [code] Status code explaining why the connection is closing
         * @param {(String|Buffer)} [data] The reason why the connection is
         *     closing
         * @public
         */
        close(code, data) {
          if (this.readyState === _WebSocket.CLOSED)
            return;
          if (this.readyState === _WebSocket.CONNECTING) {
            const msg = "WebSocket was closed before the connection was established";
            abortHandshake(this, this._req, msg);
            return;
          }
          if (this.readyState === _WebSocket.CLOSING) {
            if (this._closeFrameSent && (this._closeFrameReceived || this._receiver._writableState.errorEmitted)) {
              this._socket.end();
            }
            return;
          }
          this._readyState = _WebSocket.CLOSING;
          this._sender.close(code, data, !this._isServer, (err) => {
            if (err)
              return;
            this._closeFrameSent = true;
            if (this._closeFrameReceived || this._receiver._writableState.errorEmitted) {
              this._socket.end();
            }
          });
          this._closeTimer = setTimeout(
            this._socket.destroy.bind(this._socket),
            closeTimeout
          );
        }
        /**
         * Pause the socket.
         *
         * @public
         */
        pause() {
          if (this.readyState === _WebSocket.CONNECTING || this.readyState === _WebSocket.CLOSED) {
            return;
          }
          this._paused = true;
          this._socket.pause();
        }
        /**
         * Send a ping.
         *
         * @param {*} [data] The data to send
         * @param {Boolean} [mask] Indicates whether or not to mask `data`
         * @param {Function} [cb] Callback which is executed when the ping is sent
         * @public
         */
        ping(data, mask, cb) {
          if (this.readyState === _WebSocket.CONNECTING) {
            throw new Error("WebSocket is not open: readyState 0 (CONNECTING)");
          }
          if (typeof data === "function") {
            cb = data;
            data = mask = void 0;
          } else if (typeof mask === "function") {
            cb = mask;
            mask = void 0;
          }
          if (typeof data === "number")
            data = data.toString();
          if (this.readyState !== _WebSocket.OPEN) {
            sendAfterClose(this, data, cb);
            return;
          }
          if (mask === void 0)
            mask = !this._isServer;
          this._sender.ping(data || EMPTY_BUFFER, mask, cb);
        }
        /**
         * Send a pong.
         *
         * @param {*} [data] The data to send
         * @param {Boolean} [mask] Indicates whether or not to mask `data`
         * @param {Function} [cb] Callback which is executed when the pong is sent
         * @public
         */
        pong(data, mask, cb) {
          if (this.readyState === _WebSocket.CONNECTING) {
            throw new Error("WebSocket is not open: readyState 0 (CONNECTING)");
          }
          if (typeof data === "function") {
            cb = data;
            data = mask = void 0;
          } else if (typeof mask === "function") {
            cb = mask;
            mask = void 0;
          }
          if (typeof data === "number")
            data = data.toString();
          if (this.readyState !== _WebSocket.OPEN) {
            sendAfterClose(this, data, cb);
            return;
          }
          if (mask === void 0)
            mask = !this._isServer;
          this._sender.pong(data || EMPTY_BUFFER, mask, cb);
        }
        /**
         * Resume the socket.
         *
         * @public
         */
        resume() {
          if (this.readyState === _WebSocket.CONNECTING || this.readyState === _WebSocket.CLOSED) {
            return;
          }
          this._paused = false;
          if (!this._receiver._writableState.needDrain)
            this._socket.resume();
        }
        /**
         * Send a data message.
         *
         * @param {*} data The message to send
         * @param {Object} [options] Options object
         * @param {Boolean} [options.binary] Specifies whether `data` is binary or
         *     text
         * @param {Boolean} [options.compress] Specifies whether or not to compress
         *     `data`
         * @param {Boolean} [options.fin=true] Specifies whether the fragment is the
         *     last one
         * @param {Boolean} [options.mask] Specifies whether or not to mask `data`
         * @param {Function} [cb] Callback which is executed when data is written out
         * @public
         */
        send(data, options, cb) {
          if (this.readyState === _WebSocket.CONNECTING) {
            throw new Error("WebSocket is not open: readyState 0 (CONNECTING)");
          }
          if (typeof options === "function") {
            cb = options;
            options = {};
          }
          if (typeof data === "number")
            data = data.toString();
          if (this.readyState !== _WebSocket.OPEN) {
            sendAfterClose(this, data, cb);
            return;
          }
          const opts = {
            binary: typeof data !== "string",
            mask: !this._isServer,
            compress: true,
            fin: true,
            ...options
          };
          if (!this._extensions[PerMessageDeflate.extensionName]) {
            opts.compress = false;
          }
          this._sender.send(data || EMPTY_BUFFER, opts, cb);
        }
        /**
         * Forcibly close the connection.
         *
         * @public
         */
        terminate() {
          if (this.readyState === _WebSocket.CLOSED)
            return;
          if (this.readyState === _WebSocket.CONNECTING) {
            const msg = "WebSocket was closed before the connection was established";
            abortHandshake(this, this._req, msg);
            return;
          }
          if (this._socket) {
            this._readyState = _WebSocket.CLOSING;
            this._socket.destroy();
          }
        }
      };
      Object.defineProperty(WebSocket2, "CONNECTING", {
        enumerable: true,
        value: readyStates.indexOf("CONNECTING")
      });
      Object.defineProperty(WebSocket2.prototype, "CONNECTING", {
        enumerable: true,
        value: readyStates.indexOf("CONNECTING")
      });
      Object.defineProperty(WebSocket2, "OPEN", {
        enumerable: true,
        value: readyStates.indexOf("OPEN")
      });
      Object.defineProperty(WebSocket2.prototype, "OPEN", {
        enumerable: true,
        value: readyStates.indexOf("OPEN")
      });
      Object.defineProperty(WebSocket2, "CLOSING", {
        enumerable: true,
        value: readyStates.indexOf("CLOSING")
      });
      Object.defineProperty(WebSocket2.prototype, "CLOSING", {
        enumerable: true,
        value: readyStates.indexOf("CLOSING")
      });
      Object.defineProperty(WebSocket2, "CLOSED", {
        enumerable: true,
        value: readyStates.indexOf("CLOSED")
      });
      Object.defineProperty(WebSocket2.prototype, "CLOSED", {
        enumerable: true,
        value: readyStates.indexOf("CLOSED")
      });
      [
        "binaryType",
        "bufferedAmount",
        "extensions",
        "isPaused",
        "protocol",
        "readyState",
        "url"
      ].forEach((property) => {
        Object.defineProperty(WebSocket2.prototype, property, { enumerable: true });
      });
      ["open", "error", "close", "message"].forEach((method) => {
        Object.defineProperty(WebSocket2.prototype, `on${method}`, {
          enumerable: true,
          get() {
            for (const listener of this.listeners(method)) {
              if (listener[kForOnEventAttribute])
                return listener[kListener];
            }
            return null;
          },
          set(handler) {
            for (const listener of this.listeners(method)) {
              if (listener[kForOnEventAttribute]) {
                this.removeListener(method, listener);
                break;
              }
            }
            if (typeof handler !== "function")
              return;
            this.addEventListener(method, handler, {
              [kForOnEventAttribute]: true
            });
          }
        });
      });
      WebSocket2.prototype.addEventListener = addEventListener;
      WebSocket2.prototype.removeEventListener = removeEventListener;
      module.exports = WebSocket2;
      function initAsClient(websocket, address, protocols, options) {
        const opts = {
          protocolVersion: protocolVersions[1],
          maxPayload: 100 * 1024 * 1024,
          skipUTF8Validation: false,
          perMessageDeflate: true,
          followRedirects: false,
          maxRedirects: 10,
          ...options,
          createConnection: void 0,
          socketPath: void 0,
          hostname: void 0,
          protocol: void 0,
          timeout: void 0,
          method: "GET",
          host: void 0,
          path: void 0,
          port: void 0
        };
        if (!protocolVersions.includes(opts.protocolVersion)) {
          throw new RangeError(
            `Unsupported protocol version: ${opts.protocolVersion} (supported versions: ${protocolVersions.join(", ")})`
          );
        }
        let parsedUrl;
        if (address instanceof URL) {
          parsedUrl = address;
          websocket._url = address.href;
        } else {
          try {
            parsedUrl = new URL(address);
          } catch (e) {
            throw new SyntaxError(`Invalid URL: ${address}`);
          }
          websocket._url = address;
        }
        const isSecure = parsedUrl.protocol === "wss:";
        const isIpcUrl = parsedUrl.protocol === "ws+unix:";
        let invalidUrlMessage;
        if (parsedUrl.protocol !== "ws:" && !isSecure && !isIpcUrl) {
          invalidUrlMessage = `The URL's protocol must be one of "ws:", "wss:", or "ws+unix:"`;
        } else if (isIpcUrl && !parsedUrl.pathname) {
          invalidUrlMessage = "The URL's pathname is empty";
        } else if (parsedUrl.hash) {
          invalidUrlMessage = "The URL contains a fragment identifier";
        }
        if (invalidUrlMessage) {
          const err = new SyntaxError(invalidUrlMessage);
          if (websocket._redirects === 0) {
            throw err;
          } else {
            emitErrorAndClose(websocket, err);
            return;
          }
        }
        const defaultPort = isSecure ? 443 : 80;
        const key = randomBytes(16).toString("base64");
        const request = isSecure ? https.request : http.request;
        const protocolSet = /* @__PURE__ */ new Set();
        let perMessageDeflate;
        opts.createConnection = isSecure ? tlsConnect : netConnect;
        opts.defaultPort = opts.defaultPort || defaultPort;
        opts.port = parsedUrl.port || defaultPort;
        opts.host = parsedUrl.hostname.startsWith("[") ? parsedUrl.hostname.slice(1, -1) : parsedUrl.hostname;
        opts.headers = {
          ...opts.headers,
          "Sec-WebSocket-Version": opts.protocolVersion,
          "Sec-WebSocket-Key": key,
          Connection: "Upgrade",
          Upgrade: "websocket"
        };
        opts.path = parsedUrl.pathname + parsedUrl.search;
        opts.timeout = opts.handshakeTimeout;
        if (opts.perMessageDeflate) {
          perMessageDeflate = new PerMessageDeflate(
            opts.perMessageDeflate !== true ? opts.perMessageDeflate : {},
            false,
            opts.maxPayload
          );
          opts.headers["Sec-WebSocket-Extensions"] = format({
            [PerMessageDeflate.extensionName]: perMessageDeflate.offer()
          });
        }
        if (protocols.length) {
          for (const protocol of protocols) {
            if (typeof protocol !== "string" || !subprotocolRegex.test(protocol) || protocolSet.has(protocol)) {
              throw new SyntaxError(
                "An invalid or duplicated subprotocol was specified"
              );
            }
            protocolSet.add(protocol);
          }
          opts.headers["Sec-WebSocket-Protocol"] = protocols.join(",");
        }
        if (opts.origin) {
          if (opts.protocolVersion < 13) {
            opts.headers["Sec-WebSocket-Origin"] = opts.origin;
          } else {
            opts.headers.Origin = opts.origin;
          }
        }
        if (parsedUrl.username || parsedUrl.password) {
          opts.auth = `${parsedUrl.username}:${parsedUrl.password}`;
        }
        if (isIpcUrl) {
          const parts = opts.path.split(":");
          opts.socketPath = parts[0];
          opts.path = parts[1];
        }
        let req;
        if (opts.followRedirects) {
          if (websocket._redirects === 0) {
            websocket._originalIpc = isIpcUrl;
            websocket._originalSecure = isSecure;
            websocket._originalHostOrSocketPath = isIpcUrl ? opts.socketPath : parsedUrl.host;
            const headers = options && options.headers;
            options = { ...options, headers: {} };
            if (headers) {
              for (const [key2, value] of Object.entries(headers)) {
                options.headers[key2.toLowerCase()] = value;
              }
            }
          } else if (websocket.listenerCount("redirect") === 0) {
            const isSameHost = isIpcUrl ? websocket._originalIpc ? opts.socketPath === websocket._originalHostOrSocketPath : false : websocket._originalIpc ? false : parsedUrl.host === websocket._originalHostOrSocketPath;
            if (!isSameHost || websocket._originalSecure && !isSecure) {
              delete opts.headers.authorization;
              delete opts.headers.cookie;
              if (!isSameHost)
                delete opts.headers.host;
              opts.auth = void 0;
            }
          }
          if (opts.auth && !options.headers.authorization) {
            options.headers.authorization = "Basic " + Buffer.from(opts.auth).toString("base64");
          }
          req = websocket._req = request(opts);
          if (websocket._redirects) {
            websocket.emit("redirect", websocket.url, req);
          }
        } else {
          req = websocket._req = request(opts);
        }
        if (opts.timeout) {
          req.on("timeout", () => {
            abortHandshake(websocket, req, "Opening handshake has timed out");
          });
        }
        req.on("error", (err) => {
          if (req === null || req[kAborted])
            return;
          req = websocket._req = null;
          emitErrorAndClose(websocket, err);
        });
        req.on("response", (res) => {
          const location = res.headers.location;
          const statusCode = res.statusCode;
          if (location && opts.followRedirects && statusCode >= 300 && statusCode < 400) {
            if (++websocket._redirects > opts.maxRedirects) {
              abortHandshake(websocket, req, "Maximum redirects exceeded");
              return;
            }
            req.abort();
            let addr;
            try {
              addr = new URL(location, address);
            } catch (e) {
              const err = new SyntaxError(`Invalid URL: ${location}`);
              emitErrorAndClose(websocket, err);
              return;
            }
            initAsClient(websocket, addr, protocols, options);
          } else if (!websocket.emit("unexpected-response", req, res)) {
            abortHandshake(
              websocket,
              req,
              `Unexpected server response: ${res.statusCode}`
            );
          }
        });
        req.on("upgrade", (res, socket, head) => {
          websocket.emit("upgrade", res);
          if (websocket.readyState !== WebSocket2.CONNECTING)
            return;
          req = websocket._req = null;
          if (res.headers.upgrade.toLowerCase() !== "websocket") {
            abortHandshake(websocket, socket, "Invalid Upgrade header");
            return;
          }
          const digest = createHash("sha1").update(key + GUID).digest("base64");
          if (res.headers["sec-websocket-accept"] !== digest) {
            abortHandshake(websocket, socket, "Invalid Sec-WebSocket-Accept header");
            return;
          }
          const serverProt = res.headers["sec-websocket-protocol"];
          let protError;
          if (serverProt !== void 0) {
            if (!protocolSet.size) {
              protError = "Server sent a subprotocol but none was requested";
            } else if (!protocolSet.has(serverProt)) {
              protError = "Server sent an invalid subprotocol";
            }
          } else if (protocolSet.size) {
            protError = "Server sent no subprotocol";
          }
          if (protError) {
            abortHandshake(websocket, socket, protError);
            return;
          }
          if (serverProt)
            websocket._protocol = serverProt;
          const secWebSocketExtensions = res.headers["sec-websocket-extensions"];
          if (secWebSocketExtensions !== void 0) {
            if (!perMessageDeflate) {
              const message = "Server sent a Sec-WebSocket-Extensions header but no extension was requested";
              abortHandshake(websocket, socket, message);
              return;
            }
            let extensions;
            try {
              extensions = parse(secWebSocketExtensions);
            } catch (err) {
              const message = "Invalid Sec-WebSocket-Extensions header";
              abortHandshake(websocket, socket, message);
              return;
            }
            const extensionNames = Object.keys(extensions);
            if (extensionNames.length !== 1 || extensionNames[0] !== PerMessageDeflate.extensionName) {
              const message = "Server indicated an extension that was not requested";
              abortHandshake(websocket, socket, message);
              return;
            }
            try {
              perMessageDeflate.accept(extensions[PerMessageDeflate.extensionName]);
            } catch (err) {
              const message = "Invalid Sec-WebSocket-Extensions header";
              abortHandshake(websocket, socket, message);
              return;
            }
            websocket._extensions[PerMessageDeflate.extensionName] = perMessageDeflate;
          }
          websocket.setSocket(socket, head, {
            generateMask: opts.generateMask,
            maxPayload: opts.maxPayload,
            skipUTF8Validation: opts.skipUTF8Validation
          });
        });
        req.end();
      }
      function emitErrorAndClose(websocket, err) {
        websocket._readyState = WebSocket2.CLOSING;
        websocket.emit("error", err);
        websocket.emitClose();
      }
      function netConnect(options) {
        options.path = options.socketPath;
        return net2.connect(options);
      }
      function tlsConnect(options) {
        options.path = void 0;
        if (!options.servername && options.servername !== "") {
          options.servername = net2.isIP(options.host) ? "" : options.host;
        }
        return tls.connect(options);
      }
      function abortHandshake(websocket, stream, message) {
        websocket._readyState = WebSocket2.CLOSING;
        const err = new Error(message);
        Error.captureStackTrace(err, abortHandshake);
        if (stream.setHeader) {
          stream[kAborted] = true;
          stream.abort();
          if (stream.socket && !stream.socket.destroyed) {
            stream.socket.destroy();
          }
          process.nextTick(emitErrorAndClose, websocket, err);
        } else {
          stream.destroy(err);
          stream.once("error", websocket.emit.bind(websocket, "error"));
          stream.once("close", websocket.emitClose.bind(websocket));
        }
      }
      function sendAfterClose(websocket, data, cb) {
        if (data) {
          const length = toBuffer(data).length;
          if (websocket._socket)
            websocket._sender._bufferedBytes += length;
          else
            websocket._bufferedAmount += length;
        }
        if (cb) {
          const err = new Error(
            `WebSocket is not open: readyState ${websocket.readyState} (${readyStates[websocket.readyState]})`
          );
          process.nextTick(cb, err);
        }
      }
      function receiverOnConclude(code, reason) {
        const websocket = this[kWebSocket];
        websocket._closeFrameReceived = true;
        websocket._closeMessage = reason;
        websocket._closeCode = code;
        if (websocket._socket[kWebSocket] === void 0)
          return;
        websocket._socket.removeListener("data", socketOnData);
        process.nextTick(resume, websocket._socket);
        if (code === 1005)
          websocket.close();
        else
          websocket.close(code, reason);
      }
      function receiverOnDrain() {
        const websocket = this[kWebSocket];
        if (!websocket.isPaused)
          websocket._socket.resume();
      }
      function receiverOnError(err) {
        const websocket = this[kWebSocket];
        if (websocket._socket[kWebSocket] !== void 0) {
          websocket._socket.removeListener("data", socketOnData);
          process.nextTick(resume, websocket._socket);
          websocket.close(err[kStatusCode]);
        }
        websocket.emit("error", err);
      }
      function receiverOnFinish() {
        this[kWebSocket].emitClose();
      }
      function receiverOnMessage(data, isBinary) {
        this[kWebSocket].emit("message", data, isBinary);
      }
      function receiverOnPing(data) {
        const websocket = this[kWebSocket];
        websocket.pong(data, !websocket._isServer, NOOP);
        websocket.emit("ping", data);
      }
      function receiverOnPong(data) {
        this[kWebSocket].emit("pong", data);
      }
      function resume(stream) {
        stream.resume();
      }
      function socketOnClose() {
        const websocket = this[kWebSocket];
        this.removeListener("close", socketOnClose);
        this.removeListener("data", socketOnData);
        this.removeListener("end", socketOnEnd);
        websocket._readyState = WebSocket2.CLOSING;
        let chunk;
        if (!this._readableState.endEmitted && !websocket._closeFrameReceived && !websocket._receiver._writableState.errorEmitted && (chunk = websocket._socket.read()) !== null) {
          websocket._receiver.write(chunk);
        }
        websocket._receiver.end();
        this[kWebSocket] = void 0;
        clearTimeout(websocket._closeTimer);
        if (websocket._receiver._writableState.finished || websocket._receiver._writableState.errorEmitted) {
          websocket.emitClose();
        } else {
          websocket._receiver.on("error", receiverOnFinish);
          websocket._receiver.on("finish", receiverOnFinish);
        }
      }
      function socketOnData(chunk) {
        if (!this[kWebSocket]._receiver.write(chunk)) {
          this.pause();
        }
      }
      function socketOnEnd() {
        const websocket = this[kWebSocket];
        websocket._readyState = WebSocket2.CLOSING;
        websocket._receiver.end();
        this.end();
      }
      function socketOnError() {
        const websocket = this[kWebSocket];
        this.removeListener("error", socketOnError);
        this.on("error", NOOP);
        if (websocket) {
          websocket._readyState = WebSocket2.CLOSING;
          this.destroy();
        }
      }
    }
  });

  // node_modules/.pnpm/ws@8.12.1/node_modules/ws/lib/subprotocol.js
  var require_subprotocol = __commonJS({
    "node_modules/.pnpm/ws@8.12.1/node_modules/ws/lib/subprotocol.js"(exports, module) {
      "use strict";
      var { tokenChars } = require_validation();
      function parse(header) {
        const protocols = /* @__PURE__ */ new Set();
        let start = -1;
        let end = -1;
        let i = 0;
        for (i; i < header.length; i++) {
          const code = header.charCodeAt(i);
          if (end === -1 && tokenChars[code] === 1) {
            if (start === -1)
              start = i;
          } else if (i !== 0 && (code === 32 || code === 9)) {
            if (end === -1 && start !== -1)
              end = i;
          } else if (code === 44) {
            if (start === -1) {
              throw new SyntaxError(`Unexpected character at index ${i}`);
            }
            if (end === -1)
              end = i;
            const protocol2 = header.slice(start, end);
            if (protocols.has(protocol2)) {
              throw new SyntaxError(`The "${protocol2}" subprotocol is duplicated`);
            }
            protocols.add(protocol2);
            start = end = -1;
          } else {
            throw new SyntaxError(`Unexpected character at index ${i}`);
          }
        }
        if (start === -1 || end !== -1) {
          throw new SyntaxError("Unexpected end of input");
        }
        const protocol = header.slice(start, i);
        if (protocols.has(protocol)) {
          throw new SyntaxError(`The "${protocol}" subprotocol is duplicated`);
        }
        protocols.add(protocol);
        return protocols;
      }
      module.exports = { parse };
    }
  });

  // node_modules/.pnpm/ws@8.12.1/node_modules/ws/lib/websocket-server.js
  var require_websocket_server = __commonJS({
    "node_modules/.pnpm/ws@8.12.1/node_modules/ws/lib/websocket-server.js"(exports, module) {
      "use strict";
      var EventEmitter = __require("events");
      var http = __require("http");
      var https = __require("https");
      var net2 = __require("net");
      var tls = __require("tls");
      var { createHash } = __require("crypto");
      var extension = require_extension();
      var PerMessageDeflate = require_permessage_deflate();
      var subprotocol = require_subprotocol();
      var WebSocket2 = require_websocket();
      var { GUID, kWebSocket } = require_constants();
      var keyRegex = /^[+/0-9A-Za-z]{22}==$/;
      var RUNNING = 0;
      var CLOSING = 1;
      var CLOSED = 2;
      var WebSocketServer2 = class extends EventEmitter {
        /**
         * Create a `WebSocketServer` instance.
         *
         * @param {Object} options Configuration options
         * @param {Number} [options.backlog=511] The maximum length of the queue of
         *     pending connections
         * @param {Boolean} [options.clientTracking=true] Specifies whether or not to
         *     track clients
         * @param {Function} [options.handleProtocols] A hook to handle protocols
         * @param {String} [options.host] The hostname where to bind the server
         * @param {Number} [options.maxPayload=104857600] The maximum allowed message
         *     size
         * @param {Boolean} [options.noServer=false] Enable no server mode
         * @param {String} [options.path] Accept only connections matching this path
         * @param {(Boolean|Object)} [options.perMessageDeflate=false] Enable/disable
         *     permessage-deflate
         * @param {Number} [options.port] The port where to bind the server
         * @param {(http.Server|https.Server)} [options.server] A pre-created HTTP/S
         *     server to use
         * @param {Boolean} [options.skipUTF8Validation=false] Specifies whether or
         *     not to skip UTF-8 validation for text and close messages
         * @param {Function} [options.verifyClient] A hook to reject connections
         * @param {Function} [options.WebSocket=WebSocket] Specifies the `WebSocket`
         *     class to use. It must be the `WebSocket` class or class that extends it
         * @param {Function} [callback] A listener for the `listening` event
         */
        constructor(options, callback) {
          super();
          options = {
            maxPayload: 100 * 1024 * 1024,
            skipUTF8Validation: false,
            perMessageDeflate: false,
            handleProtocols: null,
            clientTracking: true,
            verifyClient: null,
            noServer: false,
            backlog: null,
            // use default (511 as implemented in net.js)
            server: null,
            host: null,
            path: null,
            port: null,
            WebSocket: WebSocket2,
            ...options
          };
          if (options.port == null && !options.server && !options.noServer || options.port != null && (options.server || options.noServer) || options.server && options.noServer) {
            throw new TypeError(
              'One and only one of the "port", "server", or "noServer" options must be specified'
            );
          }
          if (options.port != null) {
            this._server = http.createServer((req, res) => {
              const body = http.STATUS_CODES[426];
              res.writeHead(426, {
                "Content-Length": body.length,
                "Content-Type": "text/plain"
              });
              res.end(body);
            });
            this._server.listen(
              options.port,
              options.host,
              options.backlog,
              callback
            );
          } else if (options.server) {
            this._server = options.server;
          }
          if (this._server) {
            const emitConnection = this.emit.bind(this, "connection");
            this._removeListeners = addListeners(this._server, {
              listening: this.emit.bind(this, "listening"),
              error: this.emit.bind(this, "error"),
              upgrade: (req, socket, head) => {
                this.handleUpgrade(req, socket, head, emitConnection);
              }
            });
          }
          if (options.perMessageDeflate === true)
            options.perMessageDeflate = {};
          if (options.clientTracking) {
            this.clients = /* @__PURE__ */ new Set();
            this._shouldEmitClose = false;
          }
          this.options = options;
          this._state = RUNNING;
        }
        /**
         * Returns the bound address, the address family name, and port of the server
         * as reported by the operating system if listening on an IP socket.
         * If the server is listening on a pipe or UNIX domain socket, the name is
         * returned as a string.
         *
         * @return {(Object|String|null)} The address of the server
         * @public
         */
        address() {
          if (this.options.noServer) {
            throw new Error('The server is operating in "noServer" mode');
          }
          if (!this._server)
            return null;
          return this._server.address();
        }
        /**
         * Stop the server from accepting new connections and emit the `'close'` event
         * when all existing connections are closed.
         *
         * @param {Function} [cb] A one-time listener for the `'close'` event
         * @public
         */
        close(cb) {
          if (this._state === CLOSED) {
            if (cb) {
              this.once("close", () => {
                cb(new Error("The server is not running"));
              });
            }
            process.nextTick(emitClose, this);
            return;
          }
          if (cb)
            this.once("close", cb);
          if (this._state === CLOSING)
            return;
          this._state = CLOSING;
          if (this.options.noServer || this.options.server) {
            if (this._server) {
              this._removeListeners();
              this._removeListeners = this._server = null;
            }
            if (this.clients) {
              if (!this.clients.size) {
                process.nextTick(emitClose, this);
              } else {
                this._shouldEmitClose = true;
              }
            } else {
              process.nextTick(emitClose, this);
            }
          } else {
            const server = this._server;
            this._removeListeners();
            this._removeListeners = this._server = null;
            server.close(() => {
              emitClose(this);
            });
          }
        }
        /**
         * See if a given request should be handled by this server instance.
         *
         * @param {http.IncomingMessage} req Request object to inspect
         * @return {Boolean} `true` if the request is valid, else `false`
         * @public
         */
        shouldHandle(req) {
          if (this.options.path) {
            const index = req.url.indexOf("?");
            const pathname = index !== -1 ? req.url.slice(0, index) : req.url;
            if (pathname !== this.options.path)
              return false;
          }
          return true;
        }
        /**
         * Handle a HTTP Upgrade request.
         *
         * @param {http.IncomingMessage} req The request object
         * @param {(net.Socket|tls.Socket)} socket The network socket between the
         *     server and client
         * @param {Buffer} head The first packet of the upgraded stream
         * @param {Function} cb Callback
         * @public
         */
        handleUpgrade(req, socket, head, cb) {
          socket.on("error", socketOnError);
          const key = req.headers["sec-websocket-key"];
          const version = +req.headers["sec-websocket-version"];
          if (req.method !== "GET") {
            const message = "Invalid HTTP method";
            abortHandshakeOrEmitwsClientError(this, req, socket, 405, message);
            return;
          }
          if (req.headers.upgrade.toLowerCase() !== "websocket") {
            const message = "Invalid Upgrade header";
            abortHandshakeOrEmitwsClientError(this, req, socket, 400, message);
            return;
          }
          if (!key || !keyRegex.test(key)) {
            const message = "Missing or invalid Sec-WebSocket-Key header";
            abortHandshakeOrEmitwsClientError(this, req, socket, 400, message);
            return;
          }
          if (version !== 8 && version !== 13) {
            const message = "Missing or invalid Sec-WebSocket-Version header";
            abortHandshakeOrEmitwsClientError(this, req, socket, 400, message);
            return;
          }
          if (!this.shouldHandle(req)) {
            abortHandshake(socket, 400);
            return;
          }
          const secWebSocketProtocol = req.headers["sec-websocket-protocol"];
          let protocols = /* @__PURE__ */ new Set();
          if (secWebSocketProtocol !== void 0) {
            try {
              protocols = subprotocol.parse(secWebSocketProtocol);
            } catch (err) {
              const message = "Invalid Sec-WebSocket-Protocol header";
              abortHandshakeOrEmitwsClientError(this, req, socket, 400, message);
              return;
            }
          }
          const secWebSocketExtensions = req.headers["sec-websocket-extensions"];
          const extensions = {};
          if (this.options.perMessageDeflate && secWebSocketExtensions !== void 0) {
            const perMessageDeflate = new PerMessageDeflate(
              this.options.perMessageDeflate,
              true,
              this.options.maxPayload
            );
            try {
              const offers = extension.parse(secWebSocketExtensions);
              if (offers[PerMessageDeflate.extensionName]) {
                perMessageDeflate.accept(offers[PerMessageDeflate.extensionName]);
                extensions[PerMessageDeflate.extensionName] = perMessageDeflate;
              }
            } catch (err) {
              const message = "Invalid or unacceptable Sec-WebSocket-Extensions header";
              abortHandshakeOrEmitwsClientError(this, req, socket, 400, message);
              return;
            }
          }
          if (this.options.verifyClient) {
            const info = {
              origin: req.headers[`${version === 8 ? "sec-websocket-origin" : "origin"}`],
              secure: !!(req.socket.authorized || req.socket.encrypted),
              req
            };
            if (this.options.verifyClient.length === 2) {
              this.options.verifyClient(info, (verified, code, message, headers) => {
                if (!verified) {
                  return abortHandshake(socket, code || 401, message, headers);
                }
                this.completeUpgrade(
                  extensions,
                  key,
                  protocols,
                  req,
                  socket,
                  head,
                  cb
                );
              });
              return;
            }
            if (!this.options.verifyClient(info))
              return abortHandshake(socket, 401);
          }
          this.completeUpgrade(extensions, key, protocols, req, socket, head, cb);
        }
        /**
         * Upgrade the connection to WebSocket.
         *
         * @param {Object} extensions The accepted extensions
         * @param {String} key The value of the `Sec-WebSocket-Key` header
         * @param {Set} protocols The subprotocols
         * @param {http.IncomingMessage} req The request object
         * @param {(net.Socket|tls.Socket)} socket The network socket between the
         *     server and client
         * @param {Buffer} head The first packet of the upgraded stream
         * @param {Function} cb Callback
         * @throws {Error} If called more than once with the same socket
         * @private
         */
        completeUpgrade(extensions, key, protocols, req, socket, head, cb) {
          if (!socket.readable || !socket.writable)
            return socket.destroy();
          if (socket[kWebSocket]) {
            throw new Error(
              "server.handleUpgrade() was called more than once with the same socket, possibly due to a misconfiguration"
            );
          }
          if (this._state > RUNNING)
            return abortHandshake(socket, 503);
          const digest = createHash("sha1").update(key + GUID).digest("base64");
          const headers = [
            "HTTP/1.1 101 Switching Protocols",
            "Upgrade: websocket",
            "Connection: Upgrade",
            `Sec-WebSocket-Accept: ${digest}`
          ];
          const ws = new this.options.WebSocket(null);
          if (protocols.size) {
            const protocol = this.options.handleProtocols ? this.options.handleProtocols(protocols, req) : protocols.values().next().value;
            if (protocol) {
              headers.push(`Sec-WebSocket-Protocol: ${protocol}`);
              ws._protocol = protocol;
            }
          }
          if (extensions[PerMessageDeflate.extensionName]) {
            const params = extensions[PerMessageDeflate.extensionName].params;
            const value = extension.format({
              [PerMessageDeflate.extensionName]: [params]
            });
            headers.push(`Sec-WebSocket-Extensions: ${value}`);
            ws._extensions = extensions;
          }
          this.emit("headers", headers, req);
          socket.write(headers.concat("\r\n").join("\r\n"));
          socket.removeListener("error", socketOnError);
          ws.setSocket(socket, head, {
            maxPayload: this.options.maxPayload,
            skipUTF8Validation: this.options.skipUTF8Validation
          });
          if (this.clients) {
            this.clients.add(ws);
            ws.on("close", () => {
              this.clients.delete(ws);
              if (this._shouldEmitClose && !this.clients.size) {
                process.nextTick(emitClose, this);
              }
            });
          }
          cb(ws, req);
        }
      };
      module.exports = WebSocketServer2;
      function addListeners(server, map) {
        for (const event of Object.keys(map))
          server.on(event, map[event]);
        return function removeListeners() {
          for (const event of Object.keys(map)) {
            server.removeListener(event, map[event]);
          }
        };
      }
      function emitClose(server) {
        server._state = CLOSED;
        server.emit("close");
      }
      function socketOnError() {
        this.destroy();
      }
      function abortHandshake(socket, code, message, headers) {
        message = message || http.STATUS_CODES[code];
        headers = {
          Connection: "close",
          "Content-Type": "text/html",
          "Content-Length": Buffer.byteLength(message),
          ...headers
        };
        socket.once("finish", socket.destroy);
        socket.end(
          `HTTP/1.1 ${code} ${http.STATUS_CODES[code]}\r
` + Object.keys(headers).map((h) => `${h}: ${headers[h]}`).join("\r\n") + "\r\n\r\n" + message
        );
      }
      function abortHandshakeOrEmitwsClientError(server, req, socket, code, message) {
        if (server.listenerCount("wsClientError")) {
          const err = new Error(message);
          Error.captureStackTrace(err, abortHandshakeOrEmitwsClientError);
          server.emit("wsClientError", err, socket, req);
        } else {
          abortHandshake(socket, code, message);
        }
      }
    }
  });

  // node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_freeGlobal.js
  var require_freeGlobal = __commonJS({
    "node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_freeGlobal.js"(exports, module) {
      var freeGlobal = typeof global == "object" && global && global.Object === Object && global;
      module.exports = freeGlobal;
    }
  });

  // node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_root.js
  var require_root = __commonJS({
    "node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_root.js"(exports, module) {
      var freeGlobal = require_freeGlobal();
      var freeSelf = typeof self == "object" && self && self.Object === Object && self;
      var root = freeGlobal || freeSelf || Function("return this")();
      module.exports = root;
    }
  });

  // node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_Symbol.js
  var require_Symbol = __commonJS({
    "node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_Symbol.js"(exports, module) {
      var root = require_root();
      var Symbol2 = root.Symbol;
      module.exports = Symbol2;
    }
  });

  // node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_getRawTag.js
  var require_getRawTag = __commonJS({
    "node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_getRawTag.js"(exports, module) {
      var Symbol2 = require_Symbol();
      var objectProto = Object.prototype;
      var hasOwnProperty = objectProto.hasOwnProperty;
      var nativeObjectToString = objectProto.toString;
      var symToStringTag = Symbol2 ? Symbol2.toStringTag : void 0;
      function getRawTag(value) {
        var isOwn = hasOwnProperty.call(value, symToStringTag), tag = value[symToStringTag];
        try {
          value[symToStringTag] = void 0;
          var unmasked = true;
        } catch (e) {
        }
        var result = nativeObjectToString.call(value);
        if (unmasked) {
          if (isOwn) {
            value[symToStringTag] = tag;
          } else {
            delete value[symToStringTag];
          }
        }
        return result;
      }
      module.exports = getRawTag;
    }
  });

  // node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_objectToString.js
  var require_objectToString = __commonJS({
    "node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_objectToString.js"(exports, module) {
      var objectProto = Object.prototype;
      var nativeObjectToString = objectProto.toString;
      function objectToString(value) {
        return nativeObjectToString.call(value);
      }
      module.exports = objectToString;
    }
  });

  // node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_baseGetTag.js
  var require_baseGetTag = __commonJS({
    "node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_baseGetTag.js"(exports, module) {
      var Symbol2 = require_Symbol();
      var getRawTag = require_getRawTag();
      var objectToString = require_objectToString();
      var nullTag = "[object Null]";
      var undefinedTag = "[object Undefined]";
      var symToStringTag = Symbol2 ? Symbol2.toStringTag : void 0;
      function baseGetTag(value) {
        if (value == null) {
          return value === void 0 ? undefinedTag : nullTag;
        }
        return symToStringTag && symToStringTag in Object(value) ? getRawTag(value) : objectToString(value);
      }
      module.exports = baseGetTag;
    }
  });

  // node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_overArg.js
  var require_overArg = __commonJS({
    "node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_overArg.js"(exports, module) {
      function overArg(func, transform) {
        return function(arg) {
          return func(transform(arg));
        };
      }
      module.exports = overArg;
    }
  });

  // node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_getPrototype.js
  var require_getPrototype = __commonJS({
    "node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_getPrototype.js"(exports, module) {
      var overArg = require_overArg();
      var getPrototype = overArg(Object.getPrototypeOf, Object);
      module.exports = getPrototype;
    }
  });

  // node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/isObjectLike.js
  var require_isObjectLike = __commonJS({
    "node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/isObjectLike.js"(exports, module) {
      function isObjectLike(value) {
        return value != null && typeof value == "object";
      }
      module.exports = isObjectLike;
    }
  });

  // node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/isPlainObject.js
  var require_isPlainObject = __commonJS({
    "node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/isPlainObject.js"(exports, module) {
      var baseGetTag = require_baseGetTag();
      var getPrototype = require_getPrototype();
      var isObjectLike = require_isObjectLike();
      var objectTag = "[object Object]";
      var funcProto = Function.prototype;
      var objectProto = Object.prototype;
      var funcToString = funcProto.toString;
      var hasOwnProperty = objectProto.hasOwnProperty;
      var objectCtorString = funcToString.call(Object);
      function isPlainObject(value) {
        if (!isObjectLike(value) || baseGetTag(value) != objectTag) {
          return false;
        }
        var proto2 = getPrototype(value);
        if (proto2 === null) {
          return true;
        }
        var Ctor = hasOwnProperty.call(proto2, "constructor") && proto2.constructor;
        return typeof Ctor == "function" && Ctor instanceof Ctor && funcToString.call(Ctor) == objectCtorString;
      }
      module.exports = isPlainObject;
    }
  });

  // node_modules/.pnpm/pretty-error@4.0.0/node_modules/pretty-error/lib/defaultStyle.js
  var require_defaultStyle = __commonJS({
    "node_modules/.pnpm/pretty-error@4.0.0/node_modules/pretty-error/lib/defaultStyle.js"(exports, module) {
      module.exports = function() {
        return {
          "pretty-error": {
            display: "block",
            marginLeft: "2"
          },
          "pretty-error > header": {
            display: "block"
          },
          "pretty-error > header > title > kind": {
            background: "red",
            color: "bright-white"
          },
          "pretty-error > header > title > wrapper": {
            marginRight: "1",
            color: "grey"
          },
          "pretty-error > header > colon": {
            color: "grey",
            marginRight: 1
          },
          "pretty-error > header > message": {
            color: "bright-white"
          },
          "pretty-error > trace": {
            display: "block",
            marginTop: 1
          },
          "pretty-error > trace > item": {
            display: "block",
            marginBottom: 1,
            marginLeft: 2,
            bullet: '"<grey>-</grey>"'
          },
          "pretty-error > trace > item > header": {
            display: "block"
          },
          "pretty-error > trace > item > header > pointer > file": {
            color: "bright-yellow"
          },
          "pretty-error > trace > item > header > pointer > colon": {
            color: "grey"
          },
          "pretty-error > trace > item > header > pointer > line": {
            color: "bright-yellow",
            marginRight: 1
          },
          "pretty-error > trace > item > header > what": {
            color: "white"
          },
          "pretty-error > trace > item > footer": {
            display: "block"
          },
          "pretty-error > trace > item > footer > addr": {
            display: "block",
            color: "grey"
          },
          "pretty-error > trace > item > footer > extra": {
            display: "block",
            color: "grey"
          }
        };
      };
    }
  });

  // node_modules/.pnpm/pretty-error@4.0.0/node_modules/pretty-error/lib/ParsedError.js
  var require_ParsedError = __commonJS({
    "node_modules/.pnpm/pretty-error@4.0.0/node_modules/pretty-error/lib/ParsedError.js"(exports, module) {
      var ParsedError;
      var prop;
      var sysPath;
      var _fn;
      var _i;
      var _len;
      var _ref;
      sysPath = __require("path");
      module.exports = ParsedError = function() {
        function ParsedError2(error) {
          this.error = error;
          this._parse();
        }
        ParsedError2.prototype._parse = function() {
          var m;
          this._trace = [];
          this._kind = "Error";
          this._wrapper = "";
          if (this.error.wrapper != null) {
            this._wrapper = String(this.error.wrapper);
          }
          if (typeof this.error !== "object") {
            this._message = String(this.error);
          } else {
            this._stack = this.error.stack;
            if (this.error.kind != null) {
              this._kind = String(this.error.kind);
            } else if (typeof this._stack === "string") {
              if (m = this._stack.match(/^([a-zA-Z0-9\_\$]+):\ /)) {
                this._kind = m[1];
              }
            }
            this._message = this.error.message != null && String(this.error.message) || "";
            if (typeof this._stack === "string") {
              this._parseStack();
            }
          }
        };
        ParsedError2.prototype._parseStack = function() {
          var line, message, messageLines, reachedTrace, _i2, _len2, _ref2;
          messageLines = [];
          reachedTrace = false;
          _ref2 = this._stack.split("\n");
          for (_i2 = 0, _len2 = _ref2.length; _i2 < _len2; _i2++) {
            line = _ref2[_i2];
            if (line.trim() === "") {
              continue;
            }
            if (reachedTrace) {
              this._trace.push(this._parseTraceItem(line));
            } else {
              if (line.match(/^\s*at\s.+/)) {
                reachedTrace = true;
                this._trace.push(this._parseTraceItem(line));
              } else if (!this._message.split("\n".indexOf(line))) {
                messageLines.push(line);
              }
            }
          }
          message = messageLines.join("\n");
          if (message.substr(0, this._kind.length) === this._kind) {
            message = message.substr(this._kind.length, message.length).replace(/^\:\s+/, "");
          }
          if (message.length) {
            this._message = this._message.length ? [this._message, message].join("\n") : message;
          }
        };
        ParsedError2.prototype._parseTraceItem = function(text) {
          var addr, col, d, dir2, file, jsCol, jsLine, line, m, original, packageName, packages, path2, r, remaining, shortenedAddr, shortenedPath, what;
          text = text.trim();
          if (text === "") {
            return;
          }
          if (!text.match(/^at\ /)) {
            return text;
          }
          text = text.replace(/^at /, "");
          if (text === "Error (<anonymous>)" || text === "Error (<anonymous>:null:null)") {
            return;
          }
          original = text;
          what = null;
          addr = null;
          path2 = null;
          dir2 = null;
          file = null;
          line = null;
          col = null;
          jsLine = null;
          jsCol = null;
          shortenedPath = null;
          shortenedAddr = null;
          packageName = "[current]";
          if (m = text.match(/\(([^\)]+)\)$/)) {
            addr = m[1].trim();
          }
          if (addr != null) {
            what = text.substr(0, text.length - addr.length - 2);
            what = what.trim();
          }
          if (addr == null) {
            addr = text.trim();
          }
          addr = this._fixPath(addr);
          remaining = addr;
          if (m = remaining.match(/\,\ <js>:(\d+):(\d+)$/)) {
            jsLine = m[1];
            jsCol = m[2];
            remaining = remaining.substr(0, remaining.length - m[0].length);
          }
          if (m = remaining.match(/:(\d+):(\d+)$/)) {
            line = m[1];
            col = m[2];
            remaining = remaining.substr(0, remaining.length - m[0].length);
            path2 = remaining;
          }
          if (path2 != null) {
            file = sysPath.basename(path2);
            dir2 = sysPath.dirname(path2);
            if (dir2 === ".") {
              dir2 = "";
            }
            path2 = this._fixPath(path2);
            file = this._fixPath(file);
            dir2 = this._fixPath(dir2);
          }
          if (dir2 != null) {
            d = dir2.replace(/[\\]{1,2}/g, "/");
            if (m = d.match(/node_modules\/([^\/]+)(?!.*node_modules.*)/)) {
              packageName = m[1];
            }
          }
          if (jsLine == null) {
            jsLine = line;
            jsCol = col;
          }
          if (path2 != null) {
            r = this._rectifyPath(path2);
            shortenedPath = r.path;
            shortenedAddr = shortenedPath + addr.substr(path2.length, addr.length);
            packages = r.packages;
          }
          return {
            original,
            what,
            addr,
            path: path2,
            dir: dir2,
            file,
            line: parseInt(line),
            col: parseInt(col),
            jsLine: parseInt(jsLine),
            jsCol: parseInt(jsCol),
            packageName,
            shortenedPath,
            shortenedAddr,
            packages: packages || []
          };
        };
        ParsedError2.prototype._getMessage = function() {
          return this._message;
        };
        ParsedError2.prototype._getKind = function() {
          return this._kind;
        };
        ParsedError2.prototype._getWrapper = function() {
          return this._wrapper;
        };
        ParsedError2.prototype._getStack = function() {
          return this._stack;
        };
        ParsedError2.prototype._getArguments = function() {
          return this.error["arguments"];
        };
        ParsedError2.prototype._getType = function() {
          return this.error.type;
        };
        ParsedError2.prototype._getTrace = function() {
          return this._trace;
        };
        ParsedError2.prototype._fixPath = function(path2) {
          return path2.replace(/[\\]{1,2}/g, "/");
        };
        ParsedError2.prototype._rectifyPath = function(path2, nameForCurrentPackage) {
          var m, packages, parts, remaining, rest;
          path2 = String(path2);
          remaining = path2;
          if (!(m = path2.match(/^(.+?)\/node_modules\/(.+)$/))) {
            return {
              path: path2,
              packages: []
            };
          }
          parts = [];
          packages = [];
          if (typeof nameForCurrentPackage === "string") {
            parts.push("[" + nameForCurrentPackage + "]");
            packages.push("[" + nameForCurrentPackage + "]");
          } else {
            parts.push("[" + m[1].match(/([^\/]+)$/)[1] + "]");
            packages.push(m[1].match(/([^\/]+)$/)[1]);
          }
          rest = m[2];
          while (m = rest.match(/([^\/]+)\/node_modules\/(.+)$/)) {
            parts.push("[" + m[1] + "]");
            packages.push(m[1]);
            rest = m[2];
          }
          if (m = rest.match(/([^\/]+)\/(.+)$/)) {
            parts.push("[" + m[1] + "]");
            packages.push(m[1]);
            rest = m[2];
          }
          parts.push(rest);
          return {
            path: parts.join("/"),
            packages
          };
        };
        return ParsedError2;
      }();
      _ref = ["message", "kind", "arguments", "type", "stack", "trace", "wrapper"];
      _fn = function() {
        var methodName;
        methodName = "_get" + prop[0].toUpperCase() + prop.substr(1, prop.length);
        return Object.defineProperty(ParsedError.prototype, prop, {
          get: function() {
            return this[methodName]();
          }
        });
      };
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        prop = _ref[_i];
        _fn();
      }
    }
  });

  // node_modules/.pnpm/pretty-error@4.0.0/node_modules/pretty-error/lib/nodePaths.js
  var require_nodePaths = __commonJS({
    "node_modules/.pnpm/pretty-error@4.0.0/node_modules/pretty-error/lib/nodePaths.js"(exports, module) {
      module.exports = ["_debugger.js", "_http_agent.js", "_http_client.js", "_http_common.js", "_http_incoming.js", "_http_outgoing.js", "_http_server.js", "_linklist.js", "_stream_duplex.js", "_stream_passthrough.js", "_stream_readable.js", "_stream_transform.js", "_stream_writable.js", "_tls_legacy.js", "_tls_wrap.js", "assert.js", "buffer.js", "child_process.js", "cluster.js", "console.js", "constants.js", "crypto.js", "dgram.js", "dns.js", "domain.js", "events.js", "freelist.js", "fs.js", "http.js", "https.js", "module.js", "net.js", "os.js", "path.js", "punycode.js", "querystring.js", "readline.js", "repl.js", "smalloc.js", "stream.js", "string_decoder.js", "sys.js", "timers.js", "tls.js", "tty.js", "url.js", "util.js", "vm.js", "zlib.js", "node.js"];
    }
  });

  // node_modules/.pnpm/entities@2.2.0/node_modules/entities/lib/maps/decode.json
  var require_decode = __commonJS({
    "node_modules/.pnpm/entities@2.2.0/node_modules/entities/lib/maps/decode.json"(exports, module) {
      module.exports = { "0": 65533, "128": 8364, "130": 8218, "131": 402, "132": 8222, "133": 8230, "134": 8224, "135": 8225, "136": 710, "137": 8240, "138": 352, "139": 8249, "140": 338, "142": 381, "145": 8216, "146": 8217, "147": 8220, "148": 8221, "149": 8226, "150": 8211, "151": 8212, "152": 732, "153": 8482, "154": 353, "155": 8250, "156": 339, "158": 382, "159": 376 };
    }
  });

  // node_modules/.pnpm/entities@2.2.0/node_modules/entities/lib/decode_codepoint.js
  var require_decode_codepoint = __commonJS({
    "node_modules/.pnpm/entities@2.2.0/node_modules/entities/lib/decode_codepoint.js"(exports) {
      "use strict";
      var __importDefault = exports && exports.__importDefault || function(mod) {
        return mod && mod.__esModule ? mod : { "default": mod };
      };
      Object.defineProperty(exports, "__esModule", { value: true });
      var decode_json_1 = __importDefault(require_decode());
      var fromCodePoint = (
        // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
        String.fromCodePoint || function(codePoint) {
          var output = "";
          if (codePoint > 65535) {
            codePoint -= 65536;
            output += String.fromCharCode(codePoint >>> 10 & 1023 | 55296);
            codePoint = 56320 | codePoint & 1023;
          }
          output += String.fromCharCode(codePoint);
          return output;
        }
      );
      function decodeCodePoint(codePoint) {
        if (codePoint >= 55296 && codePoint <= 57343 || codePoint > 1114111) {
          return "\uFFFD";
        }
        if (codePoint in decode_json_1.default) {
          codePoint = decode_json_1.default[codePoint];
        }
        return fromCodePoint(codePoint);
      }
      exports.default = decodeCodePoint;
    }
  });

  // node_modules/.pnpm/entities@2.2.0/node_modules/entities/lib/maps/entities.json
  var require_entities = __commonJS({
    "node_modules/.pnpm/entities@2.2.0/node_modules/entities/lib/maps/entities.json"(exports, module) {
      module.exports = { Aacute: "\xC1", aacute: "\xE1", Abreve: "\u0102", abreve: "\u0103", ac: "\u223E", acd: "\u223F", acE: "\u223E\u0333", Acirc: "\xC2", acirc: "\xE2", acute: "\xB4", Acy: "\u0410", acy: "\u0430", AElig: "\xC6", aelig: "\xE6", af: "\u2061", Afr: "\u{1D504}", afr: "\u{1D51E}", Agrave: "\xC0", agrave: "\xE0", alefsym: "\u2135", aleph: "\u2135", Alpha: "\u0391", alpha: "\u03B1", Amacr: "\u0100", amacr: "\u0101", amalg: "\u2A3F", amp: "&", AMP: "&", andand: "\u2A55", And: "\u2A53", and: "\u2227", andd: "\u2A5C", andslope: "\u2A58", andv: "\u2A5A", ang: "\u2220", ange: "\u29A4", angle: "\u2220", angmsdaa: "\u29A8", angmsdab: "\u29A9", angmsdac: "\u29AA", angmsdad: "\u29AB", angmsdae: "\u29AC", angmsdaf: "\u29AD", angmsdag: "\u29AE", angmsdah: "\u29AF", angmsd: "\u2221", angrt: "\u221F", angrtvb: "\u22BE", angrtvbd: "\u299D", angsph: "\u2222", angst: "\xC5", angzarr: "\u237C", Aogon: "\u0104", aogon: "\u0105", Aopf: "\u{1D538}", aopf: "\u{1D552}", apacir: "\u2A6F", ap: "\u2248", apE: "\u2A70", ape: "\u224A", apid: "\u224B", apos: "'", ApplyFunction: "\u2061", approx: "\u2248", approxeq: "\u224A", Aring: "\xC5", aring: "\xE5", Ascr: "\u{1D49C}", ascr: "\u{1D4B6}", Assign: "\u2254", ast: "*", asymp: "\u2248", asympeq: "\u224D", Atilde: "\xC3", atilde: "\xE3", Auml: "\xC4", auml: "\xE4", awconint: "\u2233", awint: "\u2A11", backcong: "\u224C", backepsilon: "\u03F6", backprime: "\u2035", backsim: "\u223D", backsimeq: "\u22CD", Backslash: "\u2216", Barv: "\u2AE7", barvee: "\u22BD", barwed: "\u2305", Barwed: "\u2306", barwedge: "\u2305", bbrk: "\u23B5", bbrktbrk: "\u23B6", bcong: "\u224C", Bcy: "\u0411", bcy: "\u0431", bdquo: "\u201E", becaus: "\u2235", because: "\u2235", Because: "\u2235", bemptyv: "\u29B0", bepsi: "\u03F6", bernou: "\u212C", Bernoullis: "\u212C", Beta: "\u0392", beta: "\u03B2", beth: "\u2136", between: "\u226C", Bfr: "\u{1D505}", bfr: "\u{1D51F}", bigcap: "\u22C2", bigcirc: "\u25EF", bigcup: "\u22C3", bigodot: "\u2A00", bigoplus: "\u2A01", bigotimes: "\u2A02", bigsqcup: "\u2A06", bigstar: "\u2605", bigtriangledown: "\u25BD", bigtriangleup: "\u25B3", biguplus: "\u2A04", bigvee: "\u22C1", bigwedge: "\u22C0", bkarow: "\u290D", blacklozenge: "\u29EB", blacksquare: "\u25AA", blacktriangle: "\u25B4", blacktriangledown: "\u25BE", blacktriangleleft: "\u25C2", blacktriangleright: "\u25B8", blank: "\u2423", blk12: "\u2592", blk14: "\u2591", blk34: "\u2593", block: "\u2588", bne: "=\u20E5", bnequiv: "\u2261\u20E5", bNot: "\u2AED", bnot: "\u2310", Bopf: "\u{1D539}", bopf: "\u{1D553}", bot: "\u22A5", bottom: "\u22A5", bowtie: "\u22C8", boxbox: "\u29C9", boxdl: "\u2510", boxdL: "\u2555", boxDl: "\u2556", boxDL: "\u2557", boxdr: "\u250C", boxdR: "\u2552", boxDr: "\u2553", boxDR: "\u2554", boxh: "\u2500", boxH: "\u2550", boxhd: "\u252C", boxHd: "\u2564", boxhD: "\u2565", boxHD: "\u2566", boxhu: "\u2534", boxHu: "\u2567", boxhU: "\u2568", boxHU: "\u2569", boxminus: "\u229F", boxplus: "\u229E", boxtimes: "\u22A0", boxul: "\u2518", boxuL: "\u255B", boxUl: "\u255C", boxUL: "\u255D", boxur: "\u2514", boxuR: "\u2558", boxUr: "\u2559", boxUR: "\u255A", boxv: "\u2502", boxV: "\u2551", boxvh: "\u253C", boxvH: "\u256A", boxVh: "\u256B", boxVH: "\u256C", boxvl: "\u2524", boxvL: "\u2561", boxVl: "\u2562", boxVL: "\u2563", boxvr: "\u251C", boxvR: "\u255E", boxVr: "\u255F", boxVR: "\u2560", bprime: "\u2035", breve: "\u02D8", Breve: "\u02D8", brvbar: "\xA6", bscr: "\u{1D4B7}", Bscr: "\u212C", bsemi: "\u204F", bsim: "\u223D", bsime: "\u22CD", bsolb: "\u29C5", bsol: "\\", bsolhsub: "\u27C8", bull: "\u2022", bullet: "\u2022", bump: "\u224E", bumpE: "\u2AAE", bumpe: "\u224F", Bumpeq: "\u224E", bumpeq: "\u224F", Cacute: "\u0106", cacute: "\u0107", capand: "\u2A44", capbrcup: "\u2A49", capcap: "\u2A4B", cap: "\u2229", Cap: "\u22D2", capcup: "\u2A47", capdot: "\u2A40", CapitalDifferentialD: "\u2145", caps: "\u2229\uFE00", caret: "\u2041", caron: "\u02C7", Cayleys: "\u212D", ccaps: "\u2A4D", Ccaron: "\u010C", ccaron: "\u010D", Ccedil: "\xC7", ccedil: "\xE7", Ccirc: "\u0108", ccirc: "\u0109", Cconint: "\u2230", ccups: "\u2A4C", ccupssm: "\u2A50", Cdot: "\u010A", cdot: "\u010B", cedil: "\xB8", Cedilla: "\xB8", cemptyv: "\u29B2", cent: "\xA2", centerdot: "\xB7", CenterDot: "\xB7", cfr: "\u{1D520}", Cfr: "\u212D", CHcy: "\u0427", chcy: "\u0447", check: "\u2713", checkmark: "\u2713", Chi: "\u03A7", chi: "\u03C7", circ: "\u02C6", circeq: "\u2257", circlearrowleft: "\u21BA", circlearrowright: "\u21BB", circledast: "\u229B", circledcirc: "\u229A", circleddash: "\u229D", CircleDot: "\u2299", circledR: "\xAE", circledS: "\u24C8", CircleMinus: "\u2296", CirclePlus: "\u2295", CircleTimes: "\u2297", cir: "\u25CB", cirE: "\u29C3", cire: "\u2257", cirfnint: "\u2A10", cirmid: "\u2AEF", cirscir: "\u29C2", ClockwiseContourIntegral: "\u2232", CloseCurlyDoubleQuote: "\u201D", CloseCurlyQuote: "\u2019", clubs: "\u2663", clubsuit: "\u2663", colon: ":", Colon: "\u2237", Colone: "\u2A74", colone: "\u2254", coloneq: "\u2254", comma: ",", commat: "@", comp: "\u2201", compfn: "\u2218", complement: "\u2201", complexes: "\u2102", cong: "\u2245", congdot: "\u2A6D", Congruent: "\u2261", conint: "\u222E", Conint: "\u222F", ContourIntegral: "\u222E", copf: "\u{1D554}", Copf: "\u2102", coprod: "\u2210", Coproduct: "\u2210", copy: "\xA9", COPY: "\xA9", copysr: "\u2117", CounterClockwiseContourIntegral: "\u2233", crarr: "\u21B5", cross: "\u2717", Cross: "\u2A2F", Cscr: "\u{1D49E}", cscr: "\u{1D4B8}", csub: "\u2ACF", csube: "\u2AD1", csup: "\u2AD0", csupe: "\u2AD2", ctdot: "\u22EF", cudarrl: "\u2938", cudarrr: "\u2935", cuepr: "\u22DE", cuesc: "\u22DF", cularr: "\u21B6", cularrp: "\u293D", cupbrcap: "\u2A48", cupcap: "\u2A46", CupCap: "\u224D", cup: "\u222A", Cup: "\u22D3", cupcup: "\u2A4A", cupdot: "\u228D", cupor: "\u2A45", cups: "\u222A\uFE00", curarr: "\u21B7", curarrm: "\u293C", curlyeqprec: "\u22DE", curlyeqsucc: "\u22DF", curlyvee: "\u22CE", curlywedge: "\u22CF", curren: "\xA4", curvearrowleft: "\u21B6", curvearrowright: "\u21B7", cuvee: "\u22CE", cuwed: "\u22CF", cwconint: "\u2232", cwint: "\u2231", cylcty: "\u232D", dagger: "\u2020", Dagger: "\u2021", daleth: "\u2138", darr: "\u2193", Darr: "\u21A1", dArr: "\u21D3", dash: "\u2010", Dashv: "\u2AE4", dashv: "\u22A3", dbkarow: "\u290F", dblac: "\u02DD", Dcaron: "\u010E", dcaron: "\u010F", Dcy: "\u0414", dcy: "\u0434", ddagger: "\u2021", ddarr: "\u21CA", DD: "\u2145", dd: "\u2146", DDotrahd: "\u2911", ddotseq: "\u2A77", deg: "\xB0", Del: "\u2207", Delta: "\u0394", delta: "\u03B4", demptyv: "\u29B1", dfisht: "\u297F", Dfr: "\u{1D507}", dfr: "\u{1D521}", dHar: "\u2965", dharl: "\u21C3", dharr: "\u21C2", DiacriticalAcute: "\xB4", DiacriticalDot: "\u02D9", DiacriticalDoubleAcute: "\u02DD", DiacriticalGrave: "`", DiacriticalTilde: "\u02DC", diam: "\u22C4", diamond: "\u22C4", Diamond: "\u22C4", diamondsuit: "\u2666", diams: "\u2666", die: "\xA8", DifferentialD: "\u2146", digamma: "\u03DD", disin: "\u22F2", div: "\xF7", divide: "\xF7", divideontimes: "\u22C7", divonx: "\u22C7", DJcy: "\u0402", djcy: "\u0452", dlcorn: "\u231E", dlcrop: "\u230D", dollar: "$", Dopf: "\u{1D53B}", dopf: "\u{1D555}", Dot: "\xA8", dot: "\u02D9", DotDot: "\u20DC", doteq: "\u2250", doteqdot: "\u2251", DotEqual: "\u2250", dotminus: "\u2238", dotplus: "\u2214", dotsquare: "\u22A1", doublebarwedge: "\u2306", DoubleContourIntegral: "\u222F", DoubleDot: "\xA8", DoubleDownArrow: "\u21D3", DoubleLeftArrow: "\u21D0", DoubleLeftRightArrow: "\u21D4", DoubleLeftTee: "\u2AE4", DoubleLongLeftArrow: "\u27F8", DoubleLongLeftRightArrow: "\u27FA", DoubleLongRightArrow: "\u27F9", DoubleRightArrow: "\u21D2", DoubleRightTee: "\u22A8", DoubleUpArrow: "\u21D1", DoubleUpDownArrow: "\u21D5", DoubleVerticalBar: "\u2225", DownArrowBar: "\u2913", downarrow: "\u2193", DownArrow: "\u2193", Downarrow: "\u21D3", DownArrowUpArrow: "\u21F5", DownBreve: "\u0311", downdownarrows: "\u21CA", downharpoonleft: "\u21C3", downharpoonright: "\u21C2", DownLeftRightVector: "\u2950", DownLeftTeeVector: "\u295E", DownLeftVectorBar: "\u2956", DownLeftVector: "\u21BD", DownRightTeeVector: "\u295F", DownRightVectorBar: "\u2957", DownRightVector: "\u21C1", DownTeeArrow: "\u21A7", DownTee: "\u22A4", drbkarow: "\u2910", drcorn: "\u231F", drcrop: "\u230C", Dscr: "\u{1D49F}", dscr: "\u{1D4B9}", DScy: "\u0405", dscy: "\u0455", dsol: "\u29F6", Dstrok: "\u0110", dstrok: "\u0111", dtdot: "\u22F1", dtri: "\u25BF", dtrif: "\u25BE", duarr: "\u21F5", duhar: "\u296F", dwangle: "\u29A6", DZcy: "\u040F", dzcy: "\u045F", dzigrarr: "\u27FF", Eacute: "\xC9", eacute: "\xE9", easter: "\u2A6E", Ecaron: "\u011A", ecaron: "\u011B", Ecirc: "\xCA", ecirc: "\xEA", ecir: "\u2256", ecolon: "\u2255", Ecy: "\u042D", ecy: "\u044D", eDDot: "\u2A77", Edot: "\u0116", edot: "\u0117", eDot: "\u2251", ee: "\u2147", efDot: "\u2252", Efr: "\u{1D508}", efr: "\u{1D522}", eg: "\u2A9A", Egrave: "\xC8", egrave: "\xE8", egs: "\u2A96", egsdot: "\u2A98", el: "\u2A99", Element: "\u2208", elinters: "\u23E7", ell: "\u2113", els: "\u2A95", elsdot: "\u2A97", Emacr: "\u0112", emacr: "\u0113", empty: "\u2205", emptyset: "\u2205", EmptySmallSquare: "\u25FB", emptyv: "\u2205", EmptyVerySmallSquare: "\u25AB", emsp13: "\u2004", emsp14: "\u2005", emsp: "\u2003", ENG: "\u014A", eng: "\u014B", ensp: "\u2002", Eogon: "\u0118", eogon: "\u0119", Eopf: "\u{1D53C}", eopf: "\u{1D556}", epar: "\u22D5", eparsl: "\u29E3", eplus: "\u2A71", epsi: "\u03B5", Epsilon: "\u0395", epsilon: "\u03B5", epsiv: "\u03F5", eqcirc: "\u2256", eqcolon: "\u2255", eqsim: "\u2242", eqslantgtr: "\u2A96", eqslantless: "\u2A95", Equal: "\u2A75", equals: "=", EqualTilde: "\u2242", equest: "\u225F", Equilibrium: "\u21CC", equiv: "\u2261", equivDD: "\u2A78", eqvparsl: "\u29E5", erarr: "\u2971", erDot: "\u2253", escr: "\u212F", Escr: "\u2130", esdot: "\u2250", Esim: "\u2A73", esim: "\u2242", Eta: "\u0397", eta: "\u03B7", ETH: "\xD0", eth: "\xF0", Euml: "\xCB", euml: "\xEB", euro: "\u20AC", excl: "!", exist: "\u2203", Exists: "\u2203", expectation: "\u2130", exponentiale: "\u2147", ExponentialE: "\u2147", fallingdotseq: "\u2252", Fcy: "\u0424", fcy: "\u0444", female: "\u2640", ffilig: "\uFB03", fflig: "\uFB00", ffllig: "\uFB04", Ffr: "\u{1D509}", ffr: "\u{1D523}", filig: "\uFB01", FilledSmallSquare: "\u25FC", FilledVerySmallSquare: "\u25AA", fjlig: "fj", flat: "\u266D", fllig: "\uFB02", fltns: "\u25B1", fnof: "\u0192", Fopf: "\u{1D53D}", fopf: "\u{1D557}", forall: "\u2200", ForAll: "\u2200", fork: "\u22D4", forkv: "\u2AD9", Fouriertrf: "\u2131", fpartint: "\u2A0D", frac12: "\xBD", frac13: "\u2153", frac14: "\xBC", frac15: "\u2155", frac16: "\u2159", frac18: "\u215B", frac23: "\u2154", frac25: "\u2156", frac34: "\xBE", frac35: "\u2157", frac38: "\u215C", frac45: "\u2158", frac56: "\u215A", frac58: "\u215D", frac78: "\u215E", frasl: "\u2044", frown: "\u2322", fscr: "\u{1D4BB}", Fscr: "\u2131", gacute: "\u01F5", Gamma: "\u0393", gamma: "\u03B3", Gammad: "\u03DC", gammad: "\u03DD", gap: "\u2A86", Gbreve: "\u011E", gbreve: "\u011F", Gcedil: "\u0122", Gcirc: "\u011C", gcirc: "\u011D", Gcy: "\u0413", gcy: "\u0433", Gdot: "\u0120", gdot: "\u0121", ge: "\u2265", gE: "\u2267", gEl: "\u2A8C", gel: "\u22DB", geq: "\u2265", geqq: "\u2267", geqslant: "\u2A7E", gescc: "\u2AA9", ges: "\u2A7E", gesdot: "\u2A80", gesdoto: "\u2A82", gesdotol: "\u2A84", gesl: "\u22DB\uFE00", gesles: "\u2A94", Gfr: "\u{1D50A}", gfr: "\u{1D524}", gg: "\u226B", Gg: "\u22D9", ggg: "\u22D9", gimel: "\u2137", GJcy: "\u0403", gjcy: "\u0453", gla: "\u2AA5", gl: "\u2277", glE: "\u2A92", glj: "\u2AA4", gnap: "\u2A8A", gnapprox: "\u2A8A", gne: "\u2A88", gnE: "\u2269", gneq: "\u2A88", gneqq: "\u2269", gnsim: "\u22E7", Gopf: "\u{1D53E}", gopf: "\u{1D558}", grave: "`", GreaterEqual: "\u2265", GreaterEqualLess: "\u22DB", GreaterFullEqual: "\u2267", GreaterGreater: "\u2AA2", GreaterLess: "\u2277", GreaterSlantEqual: "\u2A7E", GreaterTilde: "\u2273", Gscr: "\u{1D4A2}", gscr: "\u210A", gsim: "\u2273", gsime: "\u2A8E", gsiml: "\u2A90", gtcc: "\u2AA7", gtcir: "\u2A7A", gt: ">", GT: ">", Gt: "\u226B", gtdot: "\u22D7", gtlPar: "\u2995", gtquest: "\u2A7C", gtrapprox: "\u2A86", gtrarr: "\u2978", gtrdot: "\u22D7", gtreqless: "\u22DB", gtreqqless: "\u2A8C", gtrless: "\u2277", gtrsim: "\u2273", gvertneqq: "\u2269\uFE00", gvnE: "\u2269\uFE00", Hacek: "\u02C7", hairsp: "\u200A", half: "\xBD", hamilt: "\u210B", HARDcy: "\u042A", hardcy: "\u044A", harrcir: "\u2948", harr: "\u2194", hArr: "\u21D4", harrw: "\u21AD", Hat: "^", hbar: "\u210F", Hcirc: "\u0124", hcirc: "\u0125", hearts: "\u2665", heartsuit: "\u2665", hellip: "\u2026", hercon: "\u22B9", hfr: "\u{1D525}", Hfr: "\u210C", HilbertSpace: "\u210B", hksearow: "\u2925", hkswarow: "\u2926", hoarr: "\u21FF", homtht: "\u223B", hookleftarrow: "\u21A9", hookrightarrow: "\u21AA", hopf: "\u{1D559}", Hopf: "\u210D", horbar: "\u2015", HorizontalLine: "\u2500", hscr: "\u{1D4BD}", Hscr: "\u210B", hslash: "\u210F", Hstrok: "\u0126", hstrok: "\u0127", HumpDownHump: "\u224E", HumpEqual: "\u224F", hybull: "\u2043", hyphen: "\u2010", Iacute: "\xCD", iacute: "\xED", ic: "\u2063", Icirc: "\xCE", icirc: "\xEE", Icy: "\u0418", icy: "\u0438", Idot: "\u0130", IEcy: "\u0415", iecy: "\u0435", iexcl: "\xA1", iff: "\u21D4", ifr: "\u{1D526}", Ifr: "\u2111", Igrave: "\xCC", igrave: "\xEC", ii: "\u2148", iiiint: "\u2A0C", iiint: "\u222D", iinfin: "\u29DC", iiota: "\u2129", IJlig: "\u0132", ijlig: "\u0133", Imacr: "\u012A", imacr: "\u012B", image: "\u2111", ImaginaryI: "\u2148", imagline: "\u2110", imagpart: "\u2111", imath: "\u0131", Im: "\u2111", imof: "\u22B7", imped: "\u01B5", Implies: "\u21D2", incare: "\u2105", in: "\u2208", infin: "\u221E", infintie: "\u29DD", inodot: "\u0131", intcal: "\u22BA", int: "\u222B", Int: "\u222C", integers: "\u2124", Integral: "\u222B", intercal: "\u22BA", Intersection: "\u22C2", intlarhk: "\u2A17", intprod: "\u2A3C", InvisibleComma: "\u2063", InvisibleTimes: "\u2062", IOcy: "\u0401", iocy: "\u0451", Iogon: "\u012E", iogon: "\u012F", Iopf: "\u{1D540}", iopf: "\u{1D55A}", Iota: "\u0399", iota: "\u03B9", iprod: "\u2A3C", iquest: "\xBF", iscr: "\u{1D4BE}", Iscr: "\u2110", isin: "\u2208", isindot: "\u22F5", isinE: "\u22F9", isins: "\u22F4", isinsv: "\u22F3", isinv: "\u2208", it: "\u2062", Itilde: "\u0128", itilde: "\u0129", Iukcy: "\u0406", iukcy: "\u0456", Iuml: "\xCF", iuml: "\xEF", Jcirc: "\u0134", jcirc: "\u0135", Jcy: "\u0419", jcy: "\u0439", Jfr: "\u{1D50D}", jfr: "\u{1D527}", jmath: "\u0237", Jopf: "\u{1D541}", jopf: "\u{1D55B}", Jscr: "\u{1D4A5}", jscr: "\u{1D4BF}", Jsercy: "\u0408", jsercy: "\u0458", Jukcy: "\u0404", jukcy: "\u0454", Kappa: "\u039A", kappa: "\u03BA", kappav: "\u03F0", Kcedil: "\u0136", kcedil: "\u0137", Kcy: "\u041A", kcy: "\u043A", Kfr: "\u{1D50E}", kfr: "\u{1D528}", kgreen: "\u0138", KHcy: "\u0425", khcy: "\u0445", KJcy: "\u040C", kjcy: "\u045C", Kopf: "\u{1D542}", kopf: "\u{1D55C}", Kscr: "\u{1D4A6}", kscr: "\u{1D4C0}", lAarr: "\u21DA", Lacute: "\u0139", lacute: "\u013A", laemptyv: "\u29B4", lagran: "\u2112", Lambda: "\u039B", lambda: "\u03BB", lang: "\u27E8", Lang: "\u27EA", langd: "\u2991", langle: "\u27E8", lap: "\u2A85", Laplacetrf: "\u2112", laquo: "\xAB", larrb: "\u21E4", larrbfs: "\u291F", larr: "\u2190", Larr: "\u219E", lArr: "\u21D0", larrfs: "\u291D", larrhk: "\u21A9", larrlp: "\u21AB", larrpl: "\u2939", larrsim: "\u2973", larrtl: "\u21A2", latail: "\u2919", lAtail: "\u291B", lat: "\u2AAB", late: "\u2AAD", lates: "\u2AAD\uFE00", lbarr: "\u290C", lBarr: "\u290E", lbbrk: "\u2772", lbrace: "{", lbrack: "[", lbrke: "\u298B", lbrksld: "\u298F", lbrkslu: "\u298D", Lcaron: "\u013D", lcaron: "\u013E", Lcedil: "\u013B", lcedil: "\u013C", lceil: "\u2308", lcub: "{", Lcy: "\u041B", lcy: "\u043B", ldca: "\u2936", ldquo: "\u201C", ldquor: "\u201E", ldrdhar: "\u2967", ldrushar: "\u294B", ldsh: "\u21B2", le: "\u2264", lE: "\u2266", LeftAngleBracket: "\u27E8", LeftArrowBar: "\u21E4", leftarrow: "\u2190", LeftArrow: "\u2190", Leftarrow: "\u21D0", LeftArrowRightArrow: "\u21C6", leftarrowtail: "\u21A2", LeftCeiling: "\u2308", LeftDoubleBracket: "\u27E6", LeftDownTeeVector: "\u2961", LeftDownVectorBar: "\u2959", LeftDownVector: "\u21C3", LeftFloor: "\u230A", leftharpoondown: "\u21BD", leftharpoonup: "\u21BC", leftleftarrows: "\u21C7", leftrightarrow: "\u2194", LeftRightArrow: "\u2194", Leftrightarrow: "\u21D4", leftrightarrows: "\u21C6", leftrightharpoons: "\u21CB", leftrightsquigarrow: "\u21AD", LeftRightVector: "\u294E", LeftTeeArrow: "\u21A4", LeftTee: "\u22A3", LeftTeeVector: "\u295A", leftthreetimes: "\u22CB", LeftTriangleBar: "\u29CF", LeftTriangle: "\u22B2", LeftTriangleEqual: "\u22B4", LeftUpDownVector: "\u2951", LeftUpTeeVector: "\u2960", LeftUpVectorBar: "\u2958", LeftUpVector: "\u21BF", LeftVectorBar: "\u2952", LeftVector: "\u21BC", lEg: "\u2A8B", leg: "\u22DA", leq: "\u2264", leqq: "\u2266", leqslant: "\u2A7D", lescc: "\u2AA8", les: "\u2A7D", lesdot: "\u2A7F", lesdoto: "\u2A81", lesdotor: "\u2A83", lesg: "\u22DA\uFE00", lesges: "\u2A93", lessapprox: "\u2A85", lessdot: "\u22D6", lesseqgtr: "\u22DA", lesseqqgtr: "\u2A8B", LessEqualGreater: "\u22DA", LessFullEqual: "\u2266", LessGreater: "\u2276", lessgtr: "\u2276", LessLess: "\u2AA1", lesssim: "\u2272", LessSlantEqual: "\u2A7D", LessTilde: "\u2272", lfisht: "\u297C", lfloor: "\u230A", Lfr: "\u{1D50F}", lfr: "\u{1D529}", lg: "\u2276", lgE: "\u2A91", lHar: "\u2962", lhard: "\u21BD", lharu: "\u21BC", lharul: "\u296A", lhblk: "\u2584", LJcy: "\u0409", ljcy: "\u0459", llarr: "\u21C7", ll: "\u226A", Ll: "\u22D8", llcorner: "\u231E", Lleftarrow: "\u21DA", llhard: "\u296B", lltri: "\u25FA", Lmidot: "\u013F", lmidot: "\u0140", lmoustache: "\u23B0", lmoust: "\u23B0", lnap: "\u2A89", lnapprox: "\u2A89", lne: "\u2A87", lnE: "\u2268", lneq: "\u2A87", lneqq: "\u2268", lnsim: "\u22E6", loang: "\u27EC", loarr: "\u21FD", lobrk: "\u27E6", longleftarrow: "\u27F5", LongLeftArrow: "\u27F5", Longleftarrow: "\u27F8", longleftrightarrow: "\u27F7", LongLeftRightArrow: "\u27F7", Longleftrightarrow: "\u27FA", longmapsto: "\u27FC", longrightarrow: "\u27F6", LongRightArrow: "\u27F6", Longrightarrow: "\u27F9", looparrowleft: "\u21AB", looparrowright: "\u21AC", lopar: "\u2985", Lopf: "\u{1D543}", lopf: "\u{1D55D}", loplus: "\u2A2D", lotimes: "\u2A34", lowast: "\u2217", lowbar: "_", LowerLeftArrow: "\u2199", LowerRightArrow: "\u2198", loz: "\u25CA", lozenge: "\u25CA", lozf: "\u29EB", lpar: "(", lparlt: "\u2993", lrarr: "\u21C6", lrcorner: "\u231F", lrhar: "\u21CB", lrhard: "\u296D", lrm: "\u200E", lrtri: "\u22BF", lsaquo: "\u2039", lscr: "\u{1D4C1}", Lscr: "\u2112", lsh: "\u21B0", Lsh: "\u21B0", lsim: "\u2272", lsime: "\u2A8D", lsimg: "\u2A8F", lsqb: "[", lsquo: "\u2018", lsquor: "\u201A", Lstrok: "\u0141", lstrok: "\u0142", ltcc: "\u2AA6", ltcir: "\u2A79", lt: "<", LT: "<", Lt: "\u226A", ltdot: "\u22D6", lthree: "\u22CB", ltimes: "\u22C9", ltlarr: "\u2976", ltquest: "\u2A7B", ltri: "\u25C3", ltrie: "\u22B4", ltrif: "\u25C2", ltrPar: "\u2996", lurdshar: "\u294A", luruhar: "\u2966", lvertneqq: "\u2268\uFE00", lvnE: "\u2268\uFE00", macr: "\xAF", male: "\u2642", malt: "\u2720", maltese: "\u2720", Map: "\u2905", map: "\u21A6", mapsto: "\u21A6", mapstodown: "\u21A7", mapstoleft: "\u21A4", mapstoup: "\u21A5", marker: "\u25AE", mcomma: "\u2A29", Mcy: "\u041C", mcy: "\u043C", mdash: "\u2014", mDDot: "\u223A", measuredangle: "\u2221", MediumSpace: "\u205F", Mellintrf: "\u2133", Mfr: "\u{1D510}", mfr: "\u{1D52A}", mho: "\u2127", micro: "\xB5", midast: "*", midcir: "\u2AF0", mid: "\u2223", middot: "\xB7", minusb: "\u229F", minus: "\u2212", minusd: "\u2238", minusdu: "\u2A2A", MinusPlus: "\u2213", mlcp: "\u2ADB", mldr: "\u2026", mnplus: "\u2213", models: "\u22A7", Mopf: "\u{1D544}", mopf: "\u{1D55E}", mp: "\u2213", mscr: "\u{1D4C2}", Mscr: "\u2133", mstpos: "\u223E", Mu: "\u039C", mu: "\u03BC", multimap: "\u22B8", mumap: "\u22B8", nabla: "\u2207", Nacute: "\u0143", nacute: "\u0144", nang: "\u2220\u20D2", nap: "\u2249", napE: "\u2A70\u0338", napid: "\u224B\u0338", napos: "\u0149", napprox: "\u2249", natural: "\u266E", naturals: "\u2115", natur: "\u266E", nbsp: "\xA0", nbump: "\u224E\u0338", nbumpe: "\u224F\u0338", ncap: "\u2A43", Ncaron: "\u0147", ncaron: "\u0148", Ncedil: "\u0145", ncedil: "\u0146", ncong: "\u2247", ncongdot: "\u2A6D\u0338", ncup: "\u2A42", Ncy: "\u041D", ncy: "\u043D", ndash: "\u2013", nearhk: "\u2924", nearr: "\u2197", neArr: "\u21D7", nearrow: "\u2197", ne: "\u2260", nedot: "\u2250\u0338", NegativeMediumSpace: "\u200B", NegativeThickSpace: "\u200B", NegativeThinSpace: "\u200B", NegativeVeryThinSpace: "\u200B", nequiv: "\u2262", nesear: "\u2928", nesim: "\u2242\u0338", NestedGreaterGreater: "\u226B", NestedLessLess: "\u226A", NewLine: "\n", nexist: "\u2204", nexists: "\u2204", Nfr: "\u{1D511}", nfr: "\u{1D52B}", ngE: "\u2267\u0338", nge: "\u2271", ngeq: "\u2271", ngeqq: "\u2267\u0338", ngeqslant: "\u2A7E\u0338", nges: "\u2A7E\u0338", nGg: "\u22D9\u0338", ngsim: "\u2275", nGt: "\u226B\u20D2", ngt: "\u226F", ngtr: "\u226F", nGtv: "\u226B\u0338", nharr: "\u21AE", nhArr: "\u21CE", nhpar: "\u2AF2", ni: "\u220B", nis: "\u22FC", nisd: "\u22FA", niv: "\u220B", NJcy: "\u040A", njcy: "\u045A", nlarr: "\u219A", nlArr: "\u21CD", nldr: "\u2025", nlE: "\u2266\u0338", nle: "\u2270", nleftarrow: "\u219A", nLeftarrow: "\u21CD", nleftrightarrow: "\u21AE", nLeftrightarrow: "\u21CE", nleq: "\u2270", nleqq: "\u2266\u0338", nleqslant: "\u2A7D\u0338", nles: "\u2A7D\u0338", nless: "\u226E", nLl: "\u22D8\u0338", nlsim: "\u2274", nLt: "\u226A\u20D2", nlt: "\u226E", nltri: "\u22EA", nltrie: "\u22EC", nLtv: "\u226A\u0338", nmid: "\u2224", NoBreak: "\u2060", NonBreakingSpace: "\xA0", nopf: "\u{1D55F}", Nopf: "\u2115", Not: "\u2AEC", not: "\xAC", NotCongruent: "\u2262", NotCupCap: "\u226D", NotDoubleVerticalBar: "\u2226", NotElement: "\u2209", NotEqual: "\u2260", NotEqualTilde: "\u2242\u0338", NotExists: "\u2204", NotGreater: "\u226F", NotGreaterEqual: "\u2271", NotGreaterFullEqual: "\u2267\u0338", NotGreaterGreater: "\u226B\u0338", NotGreaterLess: "\u2279", NotGreaterSlantEqual: "\u2A7E\u0338", NotGreaterTilde: "\u2275", NotHumpDownHump: "\u224E\u0338", NotHumpEqual: "\u224F\u0338", notin: "\u2209", notindot: "\u22F5\u0338", notinE: "\u22F9\u0338", notinva: "\u2209", notinvb: "\u22F7", notinvc: "\u22F6", NotLeftTriangleBar: "\u29CF\u0338", NotLeftTriangle: "\u22EA", NotLeftTriangleEqual: "\u22EC", NotLess: "\u226E", NotLessEqual: "\u2270", NotLessGreater: "\u2278", NotLessLess: "\u226A\u0338", NotLessSlantEqual: "\u2A7D\u0338", NotLessTilde: "\u2274", NotNestedGreaterGreater: "\u2AA2\u0338", NotNestedLessLess: "\u2AA1\u0338", notni: "\u220C", notniva: "\u220C", notnivb: "\u22FE", notnivc: "\u22FD", NotPrecedes: "\u2280", NotPrecedesEqual: "\u2AAF\u0338", NotPrecedesSlantEqual: "\u22E0", NotReverseElement: "\u220C", NotRightTriangleBar: "\u29D0\u0338", NotRightTriangle: "\u22EB", NotRightTriangleEqual: "\u22ED", NotSquareSubset: "\u228F\u0338", NotSquareSubsetEqual: "\u22E2", NotSquareSuperset: "\u2290\u0338", NotSquareSupersetEqual: "\u22E3", NotSubset: "\u2282\u20D2", NotSubsetEqual: "\u2288", NotSucceeds: "\u2281", NotSucceedsEqual: "\u2AB0\u0338", NotSucceedsSlantEqual: "\u22E1", NotSucceedsTilde: "\u227F\u0338", NotSuperset: "\u2283\u20D2", NotSupersetEqual: "\u2289", NotTilde: "\u2241", NotTildeEqual: "\u2244", NotTildeFullEqual: "\u2247", NotTildeTilde: "\u2249", NotVerticalBar: "\u2224", nparallel: "\u2226", npar: "\u2226", nparsl: "\u2AFD\u20E5", npart: "\u2202\u0338", npolint: "\u2A14", npr: "\u2280", nprcue: "\u22E0", nprec: "\u2280", npreceq: "\u2AAF\u0338", npre: "\u2AAF\u0338", nrarrc: "\u2933\u0338", nrarr: "\u219B", nrArr: "\u21CF", nrarrw: "\u219D\u0338", nrightarrow: "\u219B", nRightarrow: "\u21CF", nrtri: "\u22EB", nrtrie: "\u22ED", nsc: "\u2281", nsccue: "\u22E1", nsce: "\u2AB0\u0338", Nscr: "\u{1D4A9}", nscr: "\u{1D4C3}", nshortmid: "\u2224", nshortparallel: "\u2226", nsim: "\u2241", nsime: "\u2244", nsimeq: "\u2244", nsmid: "\u2224", nspar: "\u2226", nsqsube: "\u22E2", nsqsupe: "\u22E3", nsub: "\u2284", nsubE: "\u2AC5\u0338", nsube: "\u2288", nsubset: "\u2282\u20D2", nsubseteq: "\u2288", nsubseteqq: "\u2AC5\u0338", nsucc: "\u2281", nsucceq: "\u2AB0\u0338", nsup: "\u2285", nsupE: "\u2AC6\u0338", nsupe: "\u2289", nsupset: "\u2283\u20D2", nsupseteq: "\u2289", nsupseteqq: "\u2AC6\u0338", ntgl: "\u2279", Ntilde: "\xD1", ntilde: "\xF1", ntlg: "\u2278", ntriangleleft: "\u22EA", ntrianglelefteq: "\u22EC", ntriangleright: "\u22EB", ntrianglerighteq: "\u22ED", Nu: "\u039D", nu: "\u03BD", num: "#", numero: "\u2116", numsp: "\u2007", nvap: "\u224D\u20D2", nvdash: "\u22AC", nvDash: "\u22AD", nVdash: "\u22AE", nVDash: "\u22AF", nvge: "\u2265\u20D2", nvgt: ">\u20D2", nvHarr: "\u2904", nvinfin: "\u29DE", nvlArr: "\u2902", nvle: "\u2264\u20D2", nvlt: "<\u20D2", nvltrie: "\u22B4\u20D2", nvrArr: "\u2903", nvrtrie: "\u22B5\u20D2", nvsim: "\u223C\u20D2", nwarhk: "\u2923", nwarr: "\u2196", nwArr: "\u21D6", nwarrow: "\u2196", nwnear: "\u2927", Oacute: "\xD3", oacute: "\xF3", oast: "\u229B", Ocirc: "\xD4", ocirc: "\xF4", ocir: "\u229A", Ocy: "\u041E", ocy: "\u043E", odash: "\u229D", Odblac: "\u0150", odblac: "\u0151", odiv: "\u2A38", odot: "\u2299", odsold: "\u29BC", OElig: "\u0152", oelig: "\u0153", ofcir: "\u29BF", Ofr: "\u{1D512}", ofr: "\u{1D52C}", ogon: "\u02DB", Ograve: "\xD2", ograve: "\xF2", ogt: "\u29C1", ohbar: "\u29B5", ohm: "\u03A9", oint: "\u222E", olarr: "\u21BA", olcir: "\u29BE", olcross: "\u29BB", oline: "\u203E", olt: "\u29C0", Omacr: "\u014C", omacr: "\u014D", Omega: "\u03A9", omega: "\u03C9", Omicron: "\u039F", omicron: "\u03BF", omid: "\u29B6", ominus: "\u2296", Oopf: "\u{1D546}", oopf: "\u{1D560}", opar: "\u29B7", OpenCurlyDoubleQuote: "\u201C", OpenCurlyQuote: "\u2018", operp: "\u29B9", oplus: "\u2295", orarr: "\u21BB", Or: "\u2A54", or: "\u2228", ord: "\u2A5D", order: "\u2134", orderof: "\u2134", ordf: "\xAA", ordm: "\xBA", origof: "\u22B6", oror: "\u2A56", orslope: "\u2A57", orv: "\u2A5B", oS: "\u24C8", Oscr: "\u{1D4AA}", oscr: "\u2134", Oslash: "\xD8", oslash: "\xF8", osol: "\u2298", Otilde: "\xD5", otilde: "\xF5", otimesas: "\u2A36", Otimes: "\u2A37", otimes: "\u2297", Ouml: "\xD6", ouml: "\xF6", ovbar: "\u233D", OverBar: "\u203E", OverBrace: "\u23DE", OverBracket: "\u23B4", OverParenthesis: "\u23DC", para: "\xB6", parallel: "\u2225", par: "\u2225", parsim: "\u2AF3", parsl: "\u2AFD", part: "\u2202", PartialD: "\u2202", Pcy: "\u041F", pcy: "\u043F", percnt: "%", period: ".", permil: "\u2030", perp: "\u22A5", pertenk: "\u2031", Pfr: "\u{1D513}", pfr: "\u{1D52D}", Phi: "\u03A6", phi: "\u03C6", phiv: "\u03D5", phmmat: "\u2133", phone: "\u260E", Pi: "\u03A0", pi: "\u03C0", pitchfork: "\u22D4", piv: "\u03D6", planck: "\u210F", planckh: "\u210E", plankv: "\u210F", plusacir: "\u2A23", plusb: "\u229E", pluscir: "\u2A22", plus: "+", plusdo: "\u2214", plusdu: "\u2A25", pluse: "\u2A72", PlusMinus: "\xB1", plusmn: "\xB1", plussim: "\u2A26", plustwo: "\u2A27", pm: "\xB1", Poincareplane: "\u210C", pointint: "\u2A15", popf: "\u{1D561}", Popf: "\u2119", pound: "\xA3", prap: "\u2AB7", Pr: "\u2ABB", pr: "\u227A", prcue: "\u227C", precapprox: "\u2AB7", prec: "\u227A", preccurlyeq: "\u227C", Precedes: "\u227A", PrecedesEqual: "\u2AAF", PrecedesSlantEqual: "\u227C", PrecedesTilde: "\u227E", preceq: "\u2AAF", precnapprox: "\u2AB9", precneqq: "\u2AB5", precnsim: "\u22E8", pre: "\u2AAF", prE: "\u2AB3", precsim: "\u227E", prime: "\u2032", Prime: "\u2033", primes: "\u2119", prnap: "\u2AB9", prnE: "\u2AB5", prnsim: "\u22E8", prod: "\u220F", Product: "\u220F", profalar: "\u232E", profline: "\u2312", profsurf: "\u2313", prop: "\u221D", Proportional: "\u221D", Proportion: "\u2237", propto: "\u221D", prsim: "\u227E", prurel: "\u22B0", Pscr: "\u{1D4AB}", pscr: "\u{1D4C5}", Psi: "\u03A8", psi: "\u03C8", puncsp: "\u2008", Qfr: "\u{1D514}", qfr: "\u{1D52E}", qint: "\u2A0C", qopf: "\u{1D562}", Qopf: "\u211A", qprime: "\u2057", Qscr: "\u{1D4AC}", qscr: "\u{1D4C6}", quaternions: "\u210D", quatint: "\u2A16", quest: "?", questeq: "\u225F", quot: '"', QUOT: '"', rAarr: "\u21DB", race: "\u223D\u0331", Racute: "\u0154", racute: "\u0155", radic: "\u221A", raemptyv: "\u29B3", rang: "\u27E9", Rang: "\u27EB", rangd: "\u2992", range: "\u29A5", rangle: "\u27E9", raquo: "\xBB", rarrap: "\u2975", rarrb: "\u21E5", rarrbfs: "\u2920", rarrc: "\u2933", rarr: "\u2192", Rarr: "\u21A0", rArr: "\u21D2", rarrfs: "\u291E", rarrhk: "\u21AA", rarrlp: "\u21AC", rarrpl: "\u2945", rarrsim: "\u2974", Rarrtl: "\u2916", rarrtl: "\u21A3", rarrw: "\u219D", ratail: "\u291A", rAtail: "\u291C", ratio: "\u2236", rationals: "\u211A", rbarr: "\u290D", rBarr: "\u290F", RBarr: "\u2910", rbbrk: "\u2773", rbrace: "}", rbrack: "]", rbrke: "\u298C", rbrksld: "\u298E", rbrkslu: "\u2990", Rcaron: "\u0158", rcaron: "\u0159", Rcedil: "\u0156", rcedil: "\u0157", rceil: "\u2309", rcub: "}", Rcy: "\u0420", rcy: "\u0440", rdca: "\u2937", rdldhar: "\u2969", rdquo: "\u201D", rdquor: "\u201D", rdsh: "\u21B3", real: "\u211C", realine: "\u211B", realpart: "\u211C", reals: "\u211D", Re: "\u211C", rect: "\u25AD", reg: "\xAE", REG: "\xAE", ReverseElement: "\u220B", ReverseEquilibrium: "\u21CB", ReverseUpEquilibrium: "\u296F", rfisht: "\u297D", rfloor: "\u230B", rfr: "\u{1D52F}", Rfr: "\u211C", rHar: "\u2964", rhard: "\u21C1", rharu: "\u21C0", rharul: "\u296C", Rho: "\u03A1", rho: "\u03C1", rhov: "\u03F1", RightAngleBracket: "\u27E9", RightArrowBar: "\u21E5", rightarrow: "\u2192", RightArrow: "\u2192", Rightarrow: "\u21D2", RightArrowLeftArrow: "\u21C4", rightarrowtail: "\u21A3", RightCeiling: "\u2309", RightDoubleBracket: "\u27E7", RightDownTeeVector: "\u295D", RightDownVectorBar: "\u2955", RightDownVector: "\u21C2", RightFloor: "\u230B", rightharpoondown: "\u21C1", rightharpoonup: "\u21C0", rightleftarrows: "\u21C4", rightleftharpoons: "\u21CC", rightrightarrows: "\u21C9", rightsquigarrow: "\u219D", RightTeeArrow: "\u21A6", RightTee: "\u22A2", RightTeeVector: "\u295B", rightthreetimes: "\u22CC", RightTriangleBar: "\u29D0", RightTriangle: "\u22B3", RightTriangleEqual: "\u22B5", RightUpDownVector: "\u294F", RightUpTeeVector: "\u295C", RightUpVectorBar: "\u2954", RightUpVector: "\u21BE", RightVectorBar: "\u2953", RightVector: "\u21C0", ring: "\u02DA", risingdotseq: "\u2253", rlarr: "\u21C4", rlhar: "\u21CC", rlm: "\u200F", rmoustache: "\u23B1", rmoust: "\u23B1", rnmid: "\u2AEE", roang: "\u27ED", roarr: "\u21FE", robrk: "\u27E7", ropar: "\u2986", ropf: "\u{1D563}", Ropf: "\u211D", roplus: "\u2A2E", rotimes: "\u2A35", RoundImplies: "\u2970", rpar: ")", rpargt: "\u2994", rppolint: "\u2A12", rrarr: "\u21C9", Rrightarrow: "\u21DB", rsaquo: "\u203A", rscr: "\u{1D4C7}", Rscr: "\u211B", rsh: "\u21B1", Rsh: "\u21B1", rsqb: "]", rsquo: "\u2019", rsquor: "\u2019", rthree: "\u22CC", rtimes: "\u22CA", rtri: "\u25B9", rtrie: "\u22B5", rtrif: "\u25B8", rtriltri: "\u29CE", RuleDelayed: "\u29F4", ruluhar: "\u2968", rx: "\u211E", Sacute: "\u015A", sacute: "\u015B", sbquo: "\u201A", scap: "\u2AB8", Scaron: "\u0160", scaron: "\u0161", Sc: "\u2ABC", sc: "\u227B", sccue: "\u227D", sce: "\u2AB0", scE: "\u2AB4", Scedil: "\u015E", scedil: "\u015F", Scirc: "\u015C", scirc: "\u015D", scnap: "\u2ABA", scnE: "\u2AB6", scnsim: "\u22E9", scpolint: "\u2A13", scsim: "\u227F", Scy: "\u0421", scy: "\u0441", sdotb: "\u22A1", sdot: "\u22C5", sdote: "\u2A66", searhk: "\u2925", searr: "\u2198", seArr: "\u21D8", searrow: "\u2198", sect: "\xA7", semi: ";", seswar: "\u2929", setminus: "\u2216", setmn: "\u2216", sext: "\u2736", Sfr: "\u{1D516}", sfr: "\u{1D530}", sfrown: "\u2322", sharp: "\u266F", SHCHcy: "\u0429", shchcy: "\u0449", SHcy: "\u0428", shcy: "\u0448", ShortDownArrow: "\u2193", ShortLeftArrow: "\u2190", shortmid: "\u2223", shortparallel: "\u2225", ShortRightArrow: "\u2192", ShortUpArrow: "\u2191", shy: "\xAD", Sigma: "\u03A3", sigma: "\u03C3", sigmaf: "\u03C2", sigmav: "\u03C2", sim: "\u223C", simdot: "\u2A6A", sime: "\u2243", simeq: "\u2243", simg: "\u2A9E", simgE: "\u2AA0", siml: "\u2A9D", simlE: "\u2A9F", simne: "\u2246", simplus: "\u2A24", simrarr: "\u2972", slarr: "\u2190", SmallCircle: "\u2218", smallsetminus: "\u2216", smashp: "\u2A33", smeparsl: "\u29E4", smid: "\u2223", smile: "\u2323", smt: "\u2AAA", smte: "\u2AAC", smtes: "\u2AAC\uFE00", SOFTcy: "\u042C", softcy: "\u044C", solbar: "\u233F", solb: "\u29C4", sol: "/", Sopf: "\u{1D54A}", sopf: "\u{1D564}", spades: "\u2660", spadesuit: "\u2660", spar: "\u2225", sqcap: "\u2293", sqcaps: "\u2293\uFE00", sqcup: "\u2294", sqcups: "\u2294\uFE00", Sqrt: "\u221A", sqsub: "\u228F", sqsube: "\u2291", sqsubset: "\u228F", sqsubseteq: "\u2291", sqsup: "\u2290", sqsupe: "\u2292", sqsupset: "\u2290", sqsupseteq: "\u2292", square: "\u25A1", Square: "\u25A1", SquareIntersection: "\u2293", SquareSubset: "\u228F", SquareSubsetEqual: "\u2291", SquareSuperset: "\u2290", SquareSupersetEqual: "\u2292", SquareUnion: "\u2294", squarf: "\u25AA", squ: "\u25A1", squf: "\u25AA", srarr: "\u2192", Sscr: "\u{1D4AE}", sscr: "\u{1D4C8}", ssetmn: "\u2216", ssmile: "\u2323", sstarf: "\u22C6", Star: "\u22C6", star: "\u2606", starf: "\u2605", straightepsilon: "\u03F5", straightphi: "\u03D5", strns: "\xAF", sub: "\u2282", Sub: "\u22D0", subdot: "\u2ABD", subE: "\u2AC5", sube: "\u2286", subedot: "\u2AC3", submult: "\u2AC1", subnE: "\u2ACB", subne: "\u228A", subplus: "\u2ABF", subrarr: "\u2979", subset: "\u2282", Subset: "\u22D0", subseteq: "\u2286", subseteqq: "\u2AC5", SubsetEqual: "\u2286", subsetneq: "\u228A", subsetneqq: "\u2ACB", subsim: "\u2AC7", subsub: "\u2AD5", subsup: "\u2AD3", succapprox: "\u2AB8", succ: "\u227B", succcurlyeq: "\u227D", Succeeds: "\u227B", SucceedsEqual: "\u2AB0", SucceedsSlantEqual: "\u227D", SucceedsTilde: "\u227F", succeq: "\u2AB0", succnapprox: "\u2ABA", succneqq: "\u2AB6", succnsim: "\u22E9", succsim: "\u227F", SuchThat: "\u220B", sum: "\u2211", Sum: "\u2211", sung: "\u266A", sup1: "\xB9", sup2: "\xB2", sup3: "\xB3", sup: "\u2283", Sup: "\u22D1", supdot: "\u2ABE", supdsub: "\u2AD8", supE: "\u2AC6", supe: "\u2287", supedot: "\u2AC4", Superset: "\u2283", SupersetEqual: "\u2287", suphsol: "\u27C9", suphsub: "\u2AD7", suplarr: "\u297B", supmult: "\u2AC2", supnE: "\u2ACC", supne: "\u228B", supplus: "\u2AC0", supset: "\u2283", Supset: "\u22D1", supseteq: "\u2287", supseteqq: "\u2AC6", supsetneq: "\u228B", supsetneqq: "\u2ACC", supsim: "\u2AC8", supsub: "\u2AD4", supsup: "\u2AD6", swarhk: "\u2926", swarr: "\u2199", swArr: "\u21D9", swarrow: "\u2199", swnwar: "\u292A", szlig: "\xDF", Tab: "	", target: "\u2316", Tau: "\u03A4", tau: "\u03C4", tbrk: "\u23B4", Tcaron: "\u0164", tcaron: "\u0165", Tcedil: "\u0162", tcedil: "\u0163", Tcy: "\u0422", tcy: "\u0442", tdot: "\u20DB", telrec: "\u2315", Tfr: "\u{1D517}", tfr: "\u{1D531}", there4: "\u2234", therefore: "\u2234", Therefore: "\u2234", Theta: "\u0398", theta: "\u03B8", thetasym: "\u03D1", thetav: "\u03D1", thickapprox: "\u2248", thicksim: "\u223C", ThickSpace: "\u205F\u200A", ThinSpace: "\u2009", thinsp: "\u2009", thkap: "\u2248", thksim: "\u223C", THORN: "\xDE", thorn: "\xFE", tilde: "\u02DC", Tilde: "\u223C", TildeEqual: "\u2243", TildeFullEqual: "\u2245", TildeTilde: "\u2248", timesbar: "\u2A31", timesb: "\u22A0", times: "\xD7", timesd: "\u2A30", tint: "\u222D", toea: "\u2928", topbot: "\u2336", topcir: "\u2AF1", top: "\u22A4", Topf: "\u{1D54B}", topf: "\u{1D565}", topfork: "\u2ADA", tosa: "\u2929", tprime: "\u2034", trade: "\u2122", TRADE: "\u2122", triangle: "\u25B5", triangledown: "\u25BF", triangleleft: "\u25C3", trianglelefteq: "\u22B4", triangleq: "\u225C", triangleright: "\u25B9", trianglerighteq: "\u22B5", tridot: "\u25EC", trie: "\u225C", triminus: "\u2A3A", TripleDot: "\u20DB", triplus: "\u2A39", trisb: "\u29CD", tritime: "\u2A3B", trpezium: "\u23E2", Tscr: "\u{1D4AF}", tscr: "\u{1D4C9}", TScy: "\u0426", tscy: "\u0446", TSHcy: "\u040B", tshcy: "\u045B", Tstrok: "\u0166", tstrok: "\u0167", twixt: "\u226C", twoheadleftarrow: "\u219E", twoheadrightarrow: "\u21A0", Uacute: "\xDA", uacute: "\xFA", uarr: "\u2191", Uarr: "\u219F", uArr: "\u21D1", Uarrocir: "\u2949", Ubrcy: "\u040E", ubrcy: "\u045E", Ubreve: "\u016C", ubreve: "\u016D", Ucirc: "\xDB", ucirc: "\xFB", Ucy: "\u0423", ucy: "\u0443", udarr: "\u21C5", Udblac: "\u0170", udblac: "\u0171", udhar: "\u296E", ufisht: "\u297E", Ufr: "\u{1D518}", ufr: "\u{1D532}", Ugrave: "\xD9", ugrave: "\xF9", uHar: "\u2963", uharl: "\u21BF", uharr: "\u21BE", uhblk: "\u2580", ulcorn: "\u231C", ulcorner: "\u231C", ulcrop: "\u230F", ultri: "\u25F8", Umacr: "\u016A", umacr: "\u016B", uml: "\xA8", UnderBar: "_", UnderBrace: "\u23DF", UnderBracket: "\u23B5", UnderParenthesis: "\u23DD", Union: "\u22C3", UnionPlus: "\u228E", Uogon: "\u0172", uogon: "\u0173", Uopf: "\u{1D54C}", uopf: "\u{1D566}", UpArrowBar: "\u2912", uparrow: "\u2191", UpArrow: "\u2191", Uparrow: "\u21D1", UpArrowDownArrow: "\u21C5", updownarrow: "\u2195", UpDownArrow: "\u2195", Updownarrow: "\u21D5", UpEquilibrium: "\u296E", upharpoonleft: "\u21BF", upharpoonright: "\u21BE", uplus: "\u228E", UpperLeftArrow: "\u2196", UpperRightArrow: "\u2197", upsi: "\u03C5", Upsi: "\u03D2", upsih: "\u03D2", Upsilon: "\u03A5", upsilon: "\u03C5", UpTeeArrow: "\u21A5", UpTee: "\u22A5", upuparrows: "\u21C8", urcorn: "\u231D", urcorner: "\u231D", urcrop: "\u230E", Uring: "\u016E", uring: "\u016F", urtri: "\u25F9", Uscr: "\u{1D4B0}", uscr: "\u{1D4CA}", utdot: "\u22F0", Utilde: "\u0168", utilde: "\u0169", utri: "\u25B5", utrif: "\u25B4", uuarr: "\u21C8", Uuml: "\xDC", uuml: "\xFC", uwangle: "\u29A7", vangrt: "\u299C", varepsilon: "\u03F5", varkappa: "\u03F0", varnothing: "\u2205", varphi: "\u03D5", varpi: "\u03D6", varpropto: "\u221D", varr: "\u2195", vArr: "\u21D5", varrho: "\u03F1", varsigma: "\u03C2", varsubsetneq: "\u228A\uFE00", varsubsetneqq: "\u2ACB\uFE00", varsupsetneq: "\u228B\uFE00", varsupsetneqq: "\u2ACC\uFE00", vartheta: "\u03D1", vartriangleleft: "\u22B2", vartriangleright: "\u22B3", vBar: "\u2AE8", Vbar: "\u2AEB", vBarv: "\u2AE9", Vcy: "\u0412", vcy: "\u0432", vdash: "\u22A2", vDash: "\u22A8", Vdash: "\u22A9", VDash: "\u22AB", Vdashl: "\u2AE6", veebar: "\u22BB", vee: "\u2228", Vee: "\u22C1", veeeq: "\u225A", vellip: "\u22EE", verbar: "|", Verbar: "\u2016", vert: "|", Vert: "\u2016", VerticalBar: "\u2223", VerticalLine: "|", VerticalSeparator: "\u2758", VerticalTilde: "\u2240", VeryThinSpace: "\u200A", Vfr: "\u{1D519}", vfr: "\u{1D533}", vltri: "\u22B2", vnsub: "\u2282\u20D2", vnsup: "\u2283\u20D2", Vopf: "\u{1D54D}", vopf: "\u{1D567}", vprop: "\u221D", vrtri: "\u22B3", Vscr: "\u{1D4B1}", vscr: "\u{1D4CB}", vsubnE: "\u2ACB\uFE00", vsubne: "\u228A\uFE00", vsupnE: "\u2ACC\uFE00", vsupne: "\u228B\uFE00", Vvdash: "\u22AA", vzigzag: "\u299A", Wcirc: "\u0174", wcirc: "\u0175", wedbar: "\u2A5F", wedge: "\u2227", Wedge: "\u22C0", wedgeq: "\u2259", weierp: "\u2118", Wfr: "\u{1D51A}", wfr: "\u{1D534}", Wopf: "\u{1D54E}", wopf: "\u{1D568}", wp: "\u2118", wr: "\u2240", wreath: "\u2240", Wscr: "\u{1D4B2}", wscr: "\u{1D4CC}", xcap: "\u22C2", xcirc: "\u25EF", xcup: "\u22C3", xdtri: "\u25BD", Xfr: "\u{1D51B}", xfr: "\u{1D535}", xharr: "\u27F7", xhArr: "\u27FA", Xi: "\u039E", xi: "\u03BE", xlarr: "\u27F5", xlArr: "\u27F8", xmap: "\u27FC", xnis: "\u22FB", xodot: "\u2A00", Xopf: "\u{1D54F}", xopf: "\u{1D569}", xoplus: "\u2A01", xotime: "\u2A02", xrarr: "\u27F6", xrArr: "\u27F9", Xscr: "\u{1D4B3}", xscr: "\u{1D4CD}", xsqcup: "\u2A06", xuplus: "\u2A04", xutri: "\u25B3", xvee: "\u22C1", xwedge: "\u22C0", Yacute: "\xDD", yacute: "\xFD", YAcy: "\u042F", yacy: "\u044F", Ycirc: "\u0176", ycirc: "\u0177", Ycy: "\u042B", ycy: "\u044B", yen: "\xA5", Yfr: "\u{1D51C}", yfr: "\u{1D536}", YIcy: "\u0407", yicy: "\u0457", Yopf: "\u{1D550}", yopf: "\u{1D56A}", Yscr: "\u{1D4B4}", yscr: "\u{1D4CE}", YUcy: "\u042E", yucy: "\u044E", yuml: "\xFF", Yuml: "\u0178", Zacute: "\u0179", zacute: "\u017A", Zcaron: "\u017D", zcaron: "\u017E", Zcy: "\u0417", zcy: "\u0437", Zdot: "\u017B", zdot: "\u017C", zeetrf: "\u2128", ZeroWidthSpace: "\u200B", Zeta: "\u0396", zeta: "\u03B6", zfr: "\u{1D537}", Zfr: "\u2128", ZHcy: "\u0416", zhcy: "\u0436", zigrarr: "\u21DD", zopf: "\u{1D56B}", Zopf: "\u2124", Zscr: "\u{1D4B5}", zscr: "\u{1D4CF}", zwj: "\u200D", zwnj: "\u200C" };
    }
  });

  // node_modules/.pnpm/entities@2.2.0/node_modules/entities/lib/maps/legacy.json
  var require_legacy = __commonJS({
    "node_modules/.pnpm/entities@2.2.0/node_modules/entities/lib/maps/legacy.json"(exports, module) {
      module.exports = { Aacute: "\xC1", aacute: "\xE1", Acirc: "\xC2", acirc: "\xE2", acute: "\xB4", AElig: "\xC6", aelig: "\xE6", Agrave: "\xC0", agrave: "\xE0", amp: "&", AMP: "&", Aring: "\xC5", aring: "\xE5", Atilde: "\xC3", atilde: "\xE3", Auml: "\xC4", auml: "\xE4", brvbar: "\xA6", Ccedil: "\xC7", ccedil: "\xE7", cedil: "\xB8", cent: "\xA2", copy: "\xA9", COPY: "\xA9", curren: "\xA4", deg: "\xB0", divide: "\xF7", Eacute: "\xC9", eacute: "\xE9", Ecirc: "\xCA", ecirc: "\xEA", Egrave: "\xC8", egrave: "\xE8", ETH: "\xD0", eth: "\xF0", Euml: "\xCB", euml: "\xEB", frac12: "\xBD", frac14: "\xBC", frac34: "\xBE", gt: ">", GT: ">", Iacute: "\xCD", iacute: "\xED", Icirc: "\xCE", icirc: "\xEE", iexcl: "\xA1", Igrave: "\xCC", igrave: "\xEC", iquest: "\xBF", Iuml: "\xCF", iuml: "\xEF", laquo: "\xAB", lt: "<", LT: "<", macr: "\xAF", micro: "\xB5", middot: "\xB7", nbsp: "\xA0", not: "\xAC", Ntilde: "\xD1", ntilde: "\xF1", Oacute: "\xD3", oacute: "\xF3", Ocirc: "\xD4", ocirc: "\xF4", Ograve: "\xD2", ograve: "\xF2", ordf: "\xAA", ordm: "\xBA", Oslash: "\xD8", oslash: "\xF8", Otilde: "\xD5", otilde: "\xF5", Ouml: "\xD6", ouml: "\xF6", para: "\xB6", plusmn: "\xB1", pound: "\xA3", quot: '"', QUOT: '"', raquo: "\xBB", reg: "\xAE", REG: "\xAE", sect: "\xA7", shy: "\xAD", sup1: "\xB9", sup2: "\xB2", sup3: "\xB3", szlig: "\xDF", THORN: "\xDE", thorn: "\xFE", times: "\xD7", Uacute: "\xDA", uacute: "\xFA", Ucirc: "\xDB", ucirc: "\xFB", Ugrave: "\xD9", ugrave: "\xF9", uml: "\xA8", Uuml: "\xDC", uuml: "\xFC", Yacute: "\xDD", yacute: "\xFD", yen: "\xA5", yuml: "\xFF" };
    }
  });

  // node_modules/.pnpm/entities@2.2.0/node_modules/entities/lib/maps/xml.json
  var require_xml = __commonJS({
    "node_modules/.pnpm/entities@2.2.0/node_modules/entities/lib/maps/xml.json"(exports, module) {
      module.exports = { amp: "&", apos: "'", gt: ">", lt: "<", quot: '"' };
    }
  });

  // node_modules/.pnpm/htmlparser2@6.1.0/node_modules/htmlparser2/lib/Tokenizer.js
  var require_Tokenizer = __commonJS({
    "node_modules/.pnpm/htmlparser2@6.1.0/node_modules/htmlparser2/lib/Tokenizer.js"(exports) {
      "use strict";
      var __importDefault = exports && exports.__importDefault || function(mod) {
        return mod && mod.__esModule ? mod : { "default": mod };
      };
      Object.defineProperty(exports, "__esModule", { value: true });
      var decode_codepoint_1 = __importDefault(require_decode_codepoint());
      var entities_json_1 = __importDefault(require_entities());
      var legacy_json_1 = __importDefault(require_legacy());
      var xml_json_1 = __importDefault(require_xml());
      function whitespace(c) {
        return c === " " || c === "\n" || c === "	" || c === "\f" || c === "\r";
      }
      function isASCIIAlpha(c) {
        return c >= "a" && c <= "z" || c >= "A" && c <= "Z";
      }
      function ifElseState(upper, SUCCESS, FAILURE) {
        var lower = upper.toLowerCase();
        if (upper === lower) {
          return function(t, c) {
            if (c === lower) {
              t._state = SUCCESS;
            } else {
              t._state = FAILURE;
              t._index--;
            }
          };
        }
        return function(t, c) {
          if (c === lower || c === upper) {
            t._state = SUCCESS;
          } else {
            t._state = FAILURE;
            t._index--;
          }
        };
      }
      function consumeSpecialNameChar(upper, NEXT_STATE) {
        var lower = upper.toLowerCase();
        return function(t, c) {
          if (c === lower || c === upper) {
            t._state = NEXT_STATE;
          } else {
            t._state = 3;
            t._index--;
          }
        };
      }
      var stateBeforeCdata1 = ifElseState(
        "C",
        24,
        16
        /* InDeclaration */
      );
      var stateBeforeCdata2 = ifElseState(
        "D",
        25,
        16
        /* InDeclaration */
      );
      var stateBeforeCdata3 = ifElseState(
        "A",
        26,
        16
        /* InDeclaration */
      );
      var stateBeforeCdata4 = ifElseState(
        "T",
        27,
        16
        /* InDeclaration */
      );
      var stateBeforeCdata5 = ifElseState(
        "A",
        28,
        16
        /* InDeclaration */
      );
      var stateBeforeScript1 = consumeSpecialNameChar(
        "R",
        35
        /* BeforeScript2 */
      );
      var stateBeforeScript2 = consumeSpecialNameChar(
        "I",
        36
        /* BeforeScript3 */
      );
      var stateBeforeScript3 = consumeSpecialNameChar(
        "P",
        37
        /* BeforeScript4 */
      );
      var stateBeforeScript4 = consumeSpecialNameChar(
        "T",
        38
        /* BeforeScript5 */
      );
      var stateAfterScript1 = ifElseState(
        "R",
        40,
        1
        /* Text */
      );
      var stateAfterScript2 = ifElseState(
        "I",
        41,
        1
        /* Text */
      );
      var stateAfterScript3 = ifElseState(
        "P",
        42,
        1
        /* Text */
      );
      var stateAfterScript4 = ifElseState(
        "T",
        43,
        1
        /* Text */
      );
      var stateBeforeStyle1 = consumeSpecialNameChar(
        "Y",
        45
        /* BeforeStyle2 */
      );
      var stateBeforeStyle2 = consumeSpecialNameChar(
        "L",
        46
        /* BeforeStyle3 */
      );
      var stateBeforeStyle3 = consumeSpecialNameChar(
        "E",
        47
        /* BeforeStyle4 */
      );
      var stateAfterStyle1 = ifElseState(
        "Y",
        49,
        1
        /* Text */
      );
      var stateAfterStyle2 = ifElseState(
        "L",
        50,
        1
        /* Text */
      );
      var stateAfterStyle3 = ifElseState(
        "E",
        51,
        1
        /* Text */
      );
      var stateBeforeSpecialT = consumeSpecialNameChar(
        "I",
        54
        /* BeforeTitle1 */
      );
      var stateBeforeTitle1 = consumeSpecialNameChar(
        "T",
        55
        /* BeforeTitle2 */
      );
      var stateBeforeTitle2 = consumeSpecialNameChar(
        "L",
        56
        /* BeforeTitle3 */
      );
      var stateBeforeTitle3 = consumeSpecialNameChar(
        "E",
        57
        /* BeforeTitle4 */
      );
      var stateAfterSpecialTEnd = ifElseState(
        "I",
        58,
        1
        /* Text */
      );
      var stateAfterTitle1 = ifElseState(
        "T",
        59,
        1
        /* Text */
      );
      var stateAfterTitle2 = ifElseState(
        "L",
        60,
        1
        /* Text */
      );
      var stateAfterTitle3 = ifElseState(
        "E",
        61,
        1
        /* Text */
      );
      var stateBeforeEntity = ifElseState(
        "#",
        63,
        64
        /* InNamedEntity */
      );
      var stateBeforeNumericEntity = ifElseState(
        "X",
        66,
        65
        /* InNumericEntity */
      );
      var Tokenizer = (
        /** @class */
        function() {
          function Tokenizer2(options, cbs) {
            var _a;
            this._state = 1;
            this.buffer = "";
            this.sectionStart = 0;
            this._index = 0;
            this.bufferOffset = 0;
            this.baseState = 1;
            this.special = 1;
            this.running = true;
            this.ended = false;
            this.cbs = cbs;
            this.xmlMode = !!(options === null || options === void 0 ? void 0 : options.xmlMode);
            this.decodeEntities = (_a = options === null || options === void 0 ? void 0 : options.decodeEntities) !== null && _a !== void 0 ? _a : true;
          }
          Tokenizer2.prototype.reset = function() {
            this._state = 1;
            this.buffer = "";
            this.sectionStart = 0;
            this._index = 0;
            this.bufferOffset = 0;
            this.baseState = 1;
            this.special = 1;
            this.running = true;
            this.ended = false;
          };
          Tokenizer2.prototype.write = function(chunk) {
            if (this.ended)
              this.cbs.onerror(Error(".write() after done!"));
            this.buffer += chunk;
            this.parse();
          };
          Tokenizer2.prototype.end = function(chunk) {
            if (this.ended)
              this.cbs.onerror(Error(".end() after done!"));
            if (chunk)
              this.write(chunk);
            this.ended = true;
            if (this.running)
              this.finish();
          };
          Tokenizer2.prototype.pause = function() {
            this.running = false;
          };
          Tokenizer2.prototype.resume = function() {
            this.running = true;
            if (this._index < this.buffer.length) {
              this.parse();
            }
            if (this.ended) {
              this.finish();
            }
          };
          Tokenizer2.prototype.getAbsoluteIndex = function() {
            return this.bufferOffset + this._index;
          };
          Tokenizer2.prototype.stateText = function(c) {
            if (c === "<") {
              if (this._index > this.sectionStart) {
                this.cbs.ontext(this.getSection());
              }
              this._state = 2;
              this.sectionStart = this._index;
            } else if (this.decodeEntities && c === "&" && (this.special === 1 || this.special === 4)) {
              if (this._index > this.sectionStart) {
                this.cbs.ontext(this.getSection());
              }
              this.baseState = 1;
              this._state = 62;
              this.sectionStart = this._index;
            }
          };
          Tokenizer2.prototype.isTagStartChar = function(c) {
            return isASCIIAlpha(c) || this.xmlMode && !whitespace(c) && c !== "/" && c !== ">";
          };
          Tokenizer2.prototype.stateBeforeTagName = function(c) {
            if (c === "/") {
              this._state = 5;
            } else if (c === "<") {
              this.cbs.ontext(this.getSection());
              this.sectionStart = this._index;
            } else if (c === ">" || this.special !== 1 || whitespace(c)) {
              this._state = 1;
            } else if (c === "!") {
              this._state = 15;
              this.sectionStart = this._index + 1;
            } else if (c === "?") {
              this._state = 17;
              this.sectionStart = this._index + 1;
            } else if (!this.isTagStartChar(c)) {
              this._state = 1;
            } else {
              this._state = !this.xmlMode && (c === "s" || c === "S") ? 32 : !this.xmlMode && (c === "t" || c === "T") ? 52 : 3;
              this.sectionStart = this._index;
            }
          };
          Tokenizer2.prototype.stateInTagName = function(c) {
            if (c === "/" || c === ">" || whitespace(c)) {
              this.emitToken("onopentagname");
              this._state = 8;
              this._index--;
            }
          };
          Tokenizer2.prototype.stateBeforeClosingTagName = function(c) {
            if (whitespace(c)) {
            } else if (c === ">") {
              this._state = 1;
            } else if (this.special !== 1) {
              if (this.special !== 4 && (c === "s" || c === "S")) {
                this._state = 33;
              } else if (this.special === 4 && (c === "t" || c === "T")) {
                this._state = 53;
              } else {
                this._state = 1;
                this._index--;
              }
            } else if (!this.isTagStartChar(c)) {
              this._state = 20;
              this.sectionStart = this._index;
            } else {
              this._state = 6;
              this.sectionStart = this._index;
            }
          };
          Tokenizer2.prototype.stateInClosingTagName = function(c) {
            if (c === ">" || whitespace(c)) {
              this.emitToken("onclosetag");
              this._state = 7;
              this._index--;
            }
          };
          Tokenizer2.prototype.stateAfterClosingTagName = function(c) {
            if (c === ">") {
              this._state = 1;
              this.sectionStart = this._index + 1;
            }
          };
          Tokenizer2.prototype.stateBeforeAttributeName = function(c) {
            if (c === ">") {
              this.cbs.onopentagend();
              this._state = 1;
              this.sectionStart = this._index + 1;
            } else if (c === "/") {
              this._state = 4;
            } else if (!whitespace(c)) {
              this._state = 9;
              this.sectionStart = this._index;
            }
          };
          Tokenizer2.prototype.stateInSelfClosingTag = function(c) {
            if (c === ">") {
              this.cbs.onselfclosingtag();
              this._state = 1;
              this.sectionStart = this._index + 1;
              this.special = 1;
            } else if (!whitespace(c)) {
              this._state = 8;
              this._index--;
            }
          };
          Tokenizer2.prototype.stateInAttributeName = function(c) {
            if (c === "=" || c === "/" || c === ">" || whitespace(c)) {
              this.cbs.onattribname(this.getSection());
              this.sectionStart = -1;
              this._state = 10;
              this._index--;
            }
          };
          Tokenizer2.prototype.stateAfterAttributeName = function(c) {
            if (c === "=") {
              this._state = 11;
            } else if (c === "/" || c === ">") {
              this.cbs.onattribend(void 0);
              this._state = 8;
              this._index--;
            } else if (!whitespace(c)) {
              this.cbs.onattribend(void 0);
              this._state = 9;
              this.sectionStart = this._index;
            }
          };
          Tokenizer2.prototype.stateBeforeAttributeValue = function(c) {
            if (c === '"') {
              this._state = 12;
              this.sectionStart = this._index + 1;
            } else if (c === "'") {
              this._state = 13;
              this.sectionStart = this._index + 1;
            } else if (!whitespace(c)) {
              this._state = 14;
              this.sectionStart = this._index;
              this._index--;
            }
          };
          Tokenizer2.prototype.handleInAttributeValue = function(c, quote) {
            if (c === quote) {
              this.emitToken("onattribdata");
              this.cbs.onattribend(quote);
              this._state = 8;
            } else if (this.decodeEntities && c === "&") {
              this.emitToken("onattribdata");
              this.baseState = this._state;
              this._state = 62;
              this.sectionStart = this._index;
            }
          };
          Tokenizer2.prototype.stateInAttributeValueDoubleQuotes = function(c) {
            this.handleInAttributeValue(c, '"');
          };
          Tokenizer2.prototype.stateInAttributeValueSingleQuotes = function(c) {
            this.handleInAttributeValue(c, "'");
          };
          Tokenizer2.prototype.stateInAttributeValueNoQuotes = function(c) {
            if (whitespace(c) || c === ">") {
              this.emitToken("onattribdata");
              this.cbs.onattribend(null);
              this._state = 8;
              this._index--;
            } else if (this.decodeEntities && c === "&") {
              this.emitToken("onattribdata");
              this.baseState = this._state;
              this._state = 62;
              this.sectionStart = this._index;
            }
          };
          Tokenizer2.prototype.stateBeforeDeclaration = function(c) {
            this._state = c === "[" ? 23 : c === "-" ? 18 : 16;
          };
          Tokenizer2.prototype.stateInDeclaration = function(c) {
            if (c === ">") {
              this.cbs.ondeclaration(this.getSection());
              this._state = 1;
              this.sectionStart = this._index + 1;
            }
          };
          Tokenizer2.prototype.stateInProcessingInstruction = function(c) {
            if (c === ">") {
              this.cbs.onprocessinginstruction(this.getSection());
              this._state = 1;
              this.sectionStart = this._index + 1;
            }
          };
          Tokenizer2.prototype.stateBeforeComment = function(c) {
            if (c === "-") {
              this._state = 19;
              this.sectionStart = this._index + 1;
            } else {
              this._state = 16;
            }
          };
          Tokenizer2.prototype.stateInComment = function(c) {
            if (c === "-")
              this._state = 21;
          };
          Tokenizer2.prototype.stateInSpecialComment = function(c) {
            if (c === ">") {
              this.cbs.oncomment(this.buffer.substring(this.sectionStart, this._index));
              this._state = 1;
              this.sectionStart = this._index + 1;
            }
          };
          Tokenizer2.prototype.stateAfterComment1 = function(c) {
            if (c === "-") {
              this._state = 22;
            } else {
              this._state = 19;
            }
          };
          Tokenizer2.prototype.stateAfterComment2 = function(c) {
            if (c === ">") {
              this.cbs.oncomment(this.buffer.substring(this.sectionStart, this._index - 2));
              this._state = 1;
              this.sectionStart = this._index + 1;
            } else if (c !== "-") {
              this._state = 19;
            }
          };
          Tokenizer2.prototype.stateBeforeCdata6 = function(c) {
            if (c === "[") {
              this._state = 29;
              this.sectionStart = this._index + 1;
            } else {
              this._state = 16;
              this._index--;
            }
          };
          Tokenizer2.prototype.stateInCdata = function(c) {
            if (c === "]")
              this._state = 30;
          };
          Tokenizer2.prototype.stateAfterCdata1 = function(c) {
            if (c === "]")
              this._state = 31;
            else
              this._state = 29;
          };
          Tokenizer2.prototype.stateAfterCdata2 = function(c) {
            if (c === ">") {
              this.cbs.oncdata(this.buffer.substring(this.sectionStart, this._index - 2));
              this._state = 1;
              this.sectionStart = this._index + 1;
            } else if (c !== "]") {
              this._state = 29;
            }
          };
          Tokenizer2.prototype.stateBeforeSpecialS = function(c) {
            if (c === "c" || c === "C") {
              this._state = 34;
            } else if (c === "t" || c === "T") {
              this._state = 44;
            } else {
              this._state = 3;
              this._index--;
            }
          };
          Tokenizer2.prototype.stateBeforeSpecialSEnd = function(c) {
            if (this.special === 2 && (c === "c" || c === "C")) {
              this._state = 39;
            } else if (this.special === 3 && (c === "t" || c === "T")) {
              this._state = 48;
            } else
              this._state = 1;
          };
          Tokenizer2.prototype.stateBeforeSpecialLast = function(c, special) {
            if (c === "/" || c === ">" || whitespace(c)) {
              this.special = special;
            }
            this._state = 3;
            this._index--;
          };
          Tokenizer2.prototype.stateAfterSpecialLast = function(c, sectionStartOffset) {
            if (c === ">" || whitespace(c)) {
              this.special = 1;
              this._state = 6;
              this.sectionStart = this._index - sectionStartOffset;
              this._index--;
            } else
              this._state = 1;
          };
          Tokenizer2.prototype.parseFixedEntity = function(map) {
            if (map === void 0) {
              map = this.xmlMode ? xml_json_1.default : entities_json_1.default;
            }
            if (this.sectionStart + 1 < this._index) {
              var entity = this.buffer.substring(this.sectionStart + 1, this._index);
              if (Object.prototype.hasOwnProperty.call(map, entity)) {
                this.emitPartial(map[entity]);
                this.sectionStart = this._index + 1;
              }
            }
          };
          Tokenizer2.prototype.parseLegacyEntity = function() {
            var start = this.sectionStart + 1;
            var limit = Math.min(this._index - start, 6);
            while (limit >= 2) {
              var entity = this.buffer.substr(start, limit);
              if (Object.prototype.hasOwnProperty.call(legacy_json_1.default, entity)) {
                this.emitPartial(legacy_json_1.default[entity]);
                this.sectionStart += limit + 1;
                return;
              }
              limit--;
            }
          };
          Tokenizer2.prototype.stateInNamedEntity = function(c) {
            if (c === ";") {
              this.parseFixedEntity();
              if (this.baseState === 1 && this.sectionStart + 1 < this._index && !this.xmlMode) {
                this.parseLegacyEntity();
              }
              this._state = this.baseState;
            } else if ((c < "0" || c > "9") && !isASCIIAlpha(c)) {
              if (this.xmlMode || this.sectionStart + 1 === this._index) {
              } else if (this.baseState !== 1) {
                if (c !== "=") {
                  this.parseFixedEntity(legacy_json_1.default);
                }
              } else {
                this.parseLegacyEntity();
              }
              this._state = this.baseState;
              this._index--;
            }
          };
          Tokenizer2.prototype.decodeNumericEntity = function(offset, base, strict) {
            var sectionStart = this.sectionStart + offset;
            if (sectionStart !== this._index) {
              var entity = this.buffer.substring(sectionStart, this._index);
              var parsed = parseInt(entity, base);
              this.emitPartial(decode_codepoint_1.default(parsed));
              this.sectionStart = strict ? this._index + 1 : this._index;
            }
            this._state = this.baseState;
          };
          Tokenizer2.prototype.stateInNumericEntity = function(c) {
            if (c === ";") {
              this.decodeNumericEntity(2, 10, true);
            } else if (c < "0" || c > "9") {
              if (!this.xmlMode) {
                this.decodeNumericEntity(2, 10, false);
              } else {
                this._state = this.baseState;
              }
              this._index--;
            }
          };
          Tokenizer2.prototype.stateInHexEntity = function(c) {
            if (c === ";") {
              this.decodeNumericEntity(3, 16, true);
            } else if ((c < "a" || c > "f") && (c < "A" || c > "F") && (c < "0" || c > "9")) {
              if (!this.xmlMode) {
                this.decodeNumericEntity(3, 16, false);
              } else {
                this._state = this.baseState;
              }
              this._index--;
            }
          };
          Tokenizer2.prototype.cleanup = function() {
            if (this.sectionStart < 0) {
              this.buffer = "";
              this.bufferOffset += this._index;
              this._index = 0;
            } else if (this.running) {
              if (this._state === 1) {
                if (this.sectionStart !== this._index) {
                  this.cbs.ontext(this.buffer.substr(this.sectionStart));
                }
                this.buffer = "";
                this.bufferOffset += this._index;
                this._index = 0;
              } else if (this.sectionStart === this._index) {
                this.buffer = "";
                this.bufferOffset += this._index;
                this._index = 0;
              } else {
                this.buffer = this.buffer.substr(this.sectionStart);
                this._index -= this.sectionStart;
                this.bufferOffset += this.sectionStart;
              }
              this.sectionStart = 0;
            }
          };
          Tokenizer2.prototype.parse = function() {
            while (this._index < this.buffer.length && this.running) {
              var c = this.buffer.charAt(this._index);
              if (this._state === 1) {
                this.stateText(c);
              } else if (this._state === 12) {
                this.stateInAttributeValueDoubleQuotes(c);
              } else if (this._state === 9) {
                this.stateInAttributeName(c);
              } else if (this._state === 19) {
                this.stateInComment(c);
              } else if (this._state === 20) {
                this.stateInSpecialComment(c);
              } else if (this._state === 8) {
                this.stateBeforeAttributeName(c);
              } else if (this._state === 3) {
                this.stateInTagName(c);
              } else if (this._state === 6) {
                this.stateInClosingTagName(c);
              } else if (this._state === 2) {
                this.stateBeforeTagName(c);
              } else if (this._state === 10) {
                this.stateAfterAttributeName(c);
              } else if (this._state === 13) {
                this.stateInAttributeValueSingleQuotes(c);
              } else if (this._state === 11) {
                this.stateBeforeAttributeValue(c);
              } else if (this._state === 5) {
                this.stateBeforeClosingTagName(c);
              } else if (this._state === 7) {
                this.stateAfterClosingTagName(c);
              } else if (this._state === 32) {
                this.stateBeforeSpecialS(c);
              } else if (this._state === 21) {
                this.stateAfterComment1(c);
              } else if (this._state === 14) {
                this.stateInAttributeValueNoQuotes(c);
              } else if (this._state === 4) {
                this.stateInSelfClosingTag(c);
              } else if (this._state === 16) {
                this.stateInDeclaration(c);
              } else if (this._state === 15) {
                this.stateBeforeDeclaration(c);
              } else if (this._state === 22) {
                this.stateAfterComment2(c);
              } else if (this._state === 18) {
                this.stateBeforeComment(c);
              } else if (this._state === 33) {
                this.stateBeforeSpecialSEnd(c);
              } else if (this._state === 53) {
                stateAfterSpecialTEnd(this, c);
              } else if (this._state === 39) {
                stateAfterScript1(this, c);
              } else if (this._state === 40) {
                stateAfterScript2(this, c);
              } else if (this._state === 41) {
                stateAfterScript3(this, c);
              } else if (this._state === 34) {
                stateBeforeScript1(this, c);
              } else if (this._state === 35) {
                stateBeforeScript2(this, c);
              } else if (this._state === 36) {
                stateBeforeScript3(this, c);
              } else if (this._state === 37) {
                stateBeforeScript4(this, c);
              } else if (this._state === 38) {
                this.stateBeforeSpecialLast(
                  c,
                  2
                  /* Script */
                );
              } else if (this._state === 42) {
                stateAfterScript4(this, c);
              } else if (this._state === 43) {
                this.stateAfterSpecialLast(c, 6);
              } else if (this._state === 44) {
                stateBeforeStyle1(this, c);
              } else if (this._state === 29) {
                this.stateInCdata(c);
              } else if (this._state === 45) {
                stateBeforeStyle2(this, c);
              } else if (this._state === 46) {
                stateBeforeStyle3(this, c);
              } else if (this._state === 47) {
                this.stateBeforeSpecialLast(
                  c,
                  3
                  /* Style */
                );
              } else if (this._state === 48) {
                stateAfterStyle1(this, c);
              } else if (this._state === 49) {
                stateAfterStyle2(this, c);
              } else if (this._state === 50) {
                stateAfterStyle3(this, c);
              } else if (this._state === 51) {
                this.stateAfterSpecialLast(c, 5);
              } else if (this._state === 52) {
                stateBeforeSpecialT(this, c);
              } else if (this._state === 54) {
                stateBeforeTitle1(this, c);
              } else if (this._state === 55) {
                stateBeforeTitle2(this, c);
              } else if (this._state === 56) {
                stateBeforeTitle3(this, c);
              } else if (this._state === 57) {
                this.stateBeforeSpecialLast(
                  c,
                  4
                  /* Title */
                );
              } else if (this._state === 58) {
                stateAfterTitle1(this, c);
              } else if (this._state === 59) {
                stateAfterTitle2(this, c);
              } else if (this._state === 60) {
                stateAfterTitle3(this, c);
              } else if (this._state === 61) {
                this.stateAfterSpecialLast(c, 5);
              } else if (this._state === 17) {
                this.stateInProcessingInstruction(c);
              } else if (this._state === 64) {
                this.stateInNamedEntity(c);
              } else if (this._state === 23) {
                stateBeforeCdata1(this, c);
              } else if (this._state === 62) {
                stateBeforeEntity(this, c);
              } else if (this._state === 24) {
                stateBeforeCdata2(this, c);
              } else if (this._state === 25) {
                stateBeforeCdata3(this, c);
              } else if (this._state === 30) {
                this.stateAfterCdata1(c);
              } else if (this._state === 31) {
                this.stateAfterCdata2(c);
              } else if (this._state === 26) {
                stateBeforeCdata4(this, c);
              } else if (this._state === 27) {
                stateBeforeCdata5(this, c);
              } else if (this._state === 28) {
                this.stateBeforeCdata6(c);
              } else if (this._state === 66) {
                this.stateInHexEntity(c);
              } else if (this._state === 65) {
                this.stateInNumericEntity(c);
              } else if (this._state === 63) {
                stateBeforeNumericEntity(this, c);
              } else {
                this.cbs.onerror(Error("unknown _state"), this._state);
              }
              this._index++;
            }
            this.cleanup();
          };
          Tokenizer2.prototype.finish = function() {
            if (this.sectionStart < this._index) {
              this.handleTrailingData();
            }
            this.cbs.onend();
          };
          Tokenizer2.prototype.handleTrailingData = function() {
            var data = this.buffer.substr(this.sectionStart);
            if (this._state === 29 || this._state === 30 || this._state === 31) {
              this.cbs.oncdata(data);
            } else if (this._state === 19 || this._state === 21 || this._state === 22) {
              this.cbs.oncomment(data);
            } else if (this._state === 64 && !this.xmlMode) {
              this.parseLegacyEntity();
              if (this.sectionStart < this._index) {
                this._state = this.baseState;
                this.handleTrailingData();
              }
            } else if (this._state === 65 && !this.xmlMode) {
              this.decodeNumericEntity(2, 10, false);
              if (this.sectionStart < this._index) {
                this._state = this.baseState;
                this.handleTrailingData();
              }
            } else if (this._state === 66 && !this.xmlMode) {
              this.decodeNumericEntity(3, 16, false);
              if (this.sectionStart < this._index) {
                this._state = this.baseState;
                this.handleTrailingData();
              }
            } else if (this._state !== 3 && this._state !== 8 && this._state !== 11 && this._state !== 10 && this._state !== 9 && this._state !== 13 && this._state !== 12 && this._state !== 14 && this._state !== 6) {
              this.cbs.ontext(data);
            }
          };
          Tokenizer2.prototype.getSection = function() {
            return this.buffer.substring(this.sectionStart, this._index);
          };
          Tokenizer2.prototype.emitToken = function(name) {
            this.cbs[name](this.getSection());
            this.sectionStart = -1;
          };
          Tokenizer2.prototype.emitPartial = function(value) {
            if (this.baseState !== 1) {
              this.cbs.onattribdata(value);
            } else {
              this.cbs.ontext(value);
            }
          };
          return Tokenizer2;
        }()
      );
      exports.default = Tokenizer;
    }
  });

  // node_modules/.pnpm/htmlparser2@6.1.0/node_modules/htmlparser2/lib/Parser.js
  var require_Parser = __commonJS({
    "node_modules/.pnpm/htmlparser2@6.1.0/node_modules/htmlparser2/lib/Parser.js"(exports) {
      "use strict";
      var __importDefault = exports && exports.__importDefault || function(mod) {
        return mod && mod.__esModule ? mod : { "default": mod };
      };
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.Parser = void 0;
      var Tokenizer_1 = __importDefault(require_Tokenizer());
      var formTags = /* @__PURE__ */ new Set([
        "input",
        "option",
        "optgroup",
        "select",
        "button",
        "datalist",
        "textarea"
      ]);
      var pTag = /* @__PURE__ */ new Set(["p"]);
      var openImpliesClose = {
        tr: /* @__PURE__ */ new Set(["tr", "th", "td"]),
        th: /* @__PURE__ */ new Set(["th"]),
        td: /* @__PURE__ */ new Set(["thead", "th", "td"]),
        body: /* @__PURE__ */ new Set(["head", "link", "script"]),
        li: /* @__PURE__ */ new Set(["li"]),
        p: pTag,
        h1: pTag,
        h2: pTag,
        h3: pTag,
        h4: pTag,
        h5: pTag,
        h6: pTag,
        select: formTags,
        input: formTags,
        output: formTags,
        button: formTags,
        datalist: formTags,
        textarea: formTags,
        option: /* @__PURE__ */ new Set(["option"]),
        optgroup: /* @__PURE__ */ new Set(["optgroup", "option"]),
        dd: /* @__PURE__ */ new Set(["dt", "dd"]),
        dt: /* @__PURE__ */ new Set(["dt", "dd"]),
        address: pTag,
        article: pTag,
        aside: pTag,
        blockquote: pTag,
        details: pTag,
        div: pTag,
        dl: pTag,
        fieldset: pTag,
        figcaption: pTag,
        figure: pTag,
        footer: pTag,
        form: pTag,
        header: pTag,
        hr: pTag,
        main: pTag,
        nav: pTag,
        ol: pTag,
        pre: pTag,
        section: pTag,
        table: pTag,
        ul: pTag,
        rt: /* @__PURE__ */ new Set(["rt", "rp"]),
        rp: /* @__PURE__ */ new Set(["rt", "rp"]),
        tbody: /* @__PURE__ */ new Set(["thead", "tbody"]),
        tfoot: /* @__PURE__ */ new Set(["thead", "tbody"])
      };
      var voidElements = /* @__PURE__ */ new Set([
        "area",
        "base",
        "basefont",
        "br",
        "col",
        "command",
        "embed",
        "frame",
        "hr",
        "img",
        "input",
        "isindex",
        "keygen",
        "link",
        "meta",
        "param",
        "source",
        "track",
        "wbr"
      ]);
      var foreignContextElements = /* @__PURE__ */ new Set(["math", "svg"]);
      var htmlIntegrationElements = /* @__PURE__ */ new Set([
        "mi",
        "mo",
        "mn",
        "ms",
        "mtext",
        "annotation-xml",
        "foreignObject",
        "desc",
        "title"
      ]);
      var reNameEnd = /\s|\//;
      var Parser = (
        /** @class */
        function() {
          function Parser2(cbs, options) {
            if (options === void 0) {
              options = {};
            }
            var _a, _b, _c, _d, _e;
            this.startIndex = 0;
            this.endIndex = null;
            this.tagname = "";
            this.attribname = "";
            this.attribvalue = "";
            this.attribs = null;
            this.stack = [];
            this.foreignContext = [];
            this.options = options;
            this.cbs = cbs !== null && cbs !== void 0 ? cbs : {};
            this.lowerCaseTagNames = (_a = options.lowerCaseTags) !== null && _a !== void 0 ? _a : !options.xmlMode;
            this.lowerCaseAttributeNames = (_b = options.lowerCaseAttributeNames) !== null && _b !== void 0 ? _b : !options.xmlMode;
            this.tokenizer = new ((_c = options.Tokenizer) !== null && _c !== void 0 ? _c : Tokenizer_1.default)(this.options, this);
            (_e = (_d = this.cbs).onparserinit) === null || _e === void 0 ? void 0 : _e.call(_d, this);
          }
          Parser2.prototype.updatePosition = function(initialOffset) {
            if (this.endIndex === null) {
              if (this.tokenizer.sectionStart <= initialOffset) {
                this.startIndex = 0;
              } else {
                this.startIndex = this.tokenizer.sectionStart - initialOffset;
              }
            } else {
              this.startIndex = this.endIndex + 1;
            }
            this.endIndex = this.tokenizer.getAbsoluteIndex();
          };
          Parser2.prototype.ontext = function(data) {
            var _a, _b;
            this.updatePosition(1);
            this.endIndex--;
            (_b = (_a = this.cbs).ontext) === null || _b === void 0 ? void 0 : _b.call(_a, data);
          };
          Parser2.prototype.onopentagname = function(name) {
            var _a, _b;
            if (this.lowerCaseTagNames) {
              name = name.toLowerCase();
            }
            this.tagname = name;
            if (!this.options.xmlMode && Object.prototype.hasOwnProperty.call(openImpliesClose, name)) {
              var el = void 0;
              while (this.stack.length > 0 && openImpliesClose[name].has(el = this.stack[this.stack.length - 1])) {
                this.onclosetag(el);
              }
            }
            if (this.options.xmlMode || !voidElements.has(name)) {
              this.stack.push(name);
              if (foreignContextElements.has(name)) {
                this.foreignContext.push(true);
              } else if (htmlIntegrationElements.has(name)) {
                this.foreignContext.push(false);
              }
            }
            (_b = (_a = this.cbs).onopentagname) === null || _b === void 0 ? void 0 : _b.call(_a, name);
            if (this.cbs.onopentag)
              this.attribs = {};
          };
          Parser2.prototype.onopentagend = function() {
            var _a, _b;
            this.updatePosition(1);
            if (this.attribs) {
              (_b = (_a = this.cbs).onopentag) === null || _b === void 0 ? void 0 : _b.call(_a, this.tagname, this.attribs);
              this.attribs = null;
            }
            if (!this.options.xmlMode && this.cbs.onclosetag && voidElements.has(this.tagname)) {
              this.cbs.onclosetag(this.tagname);
            }
            this.tagname = "";
          };
          Parser2.prototype.onclosetag = function(name) {
            this.updatePosition(1);
            if (this.lowerCaseTagNames) {
              name = name.toLowerCase();
            }
            if (foreignContextElements.has(name) || htmlIntegrationElements.has(name)) {
              this.foreignContext.pop();
            }
            if (this.stack.length && (this.options.xmlMode || !voidElements.has(name))) {
              var pos = this.stack.lastIndexOf(name);
              if (pos !== -1) {
                if (this.cbs.onclosetag) {
                  pos = this.stack.length - pos;
                  while (pos--) {
                    this.cbs.onclosetag(this.stack.pop());
                  }
                } else
                  this.stack.length = pos;
              } else if (name === "p" && !this.options.xmlMode) {
                this.onopentagname(name);
                this.closeCurrentTag();
              }
            } else if (!this.options.xmlMode && (name === "br" || name === "p")) {
              this.onopentagname(name);
              this.closeCurrentTag();
            }
          };
          Parser2.prototype.onselfclosingtag = function() {
            if (this.options.xmlMode || this.options.recognizeSelfClosing || this.foreignContext[this.foreignContext.length - 1]) {
              this.closeCurrentTag();
            } else {
              this.onopentagend();
            }
          };
          Parser2.prototype.closeCurrentTag = function() {
            var _a, _b;
            var name = this.tagname;
            this.onopentagend();
            if (this.stack[this.stack.length - 1] === name) {
              (_b = (_a = this.cbs).onclosetag) === null || _b === void 0 ? void 0 : _b.call(_a, name);
              this.stack.pop();
            }
          };
          Parser2.prototype.onattribname = function(name) {
            if (this.lowerCaseAttributeNames) {
              name = name.toLowerCase();
            }
            this.attribname = name;
          };
          Parser2.prototype.onattribdata = function(value) {
            this.attribvalue += value;
          };
          Parser2.prototype.onattribend = function(quote) {
            var _a, _b;
            (_b = (_a = this.cbs).onattribute) === null || _b === void 0 ? void 0 : _b.call(_a, this.attribname, this.attribvalue, quote);
            if (this.attribs && !Object.prototype.hasOwnProperty.call(this.attribs, this.attribname)) {
              this.attribs[this.attribname] = this.attribvalue;
            }
            this.attribname = "";
            this.attribvalue = "";
          };
          Parser2.prototype.getInstructionName = function(value) {
            var idx = value.search(reNameEnd);
            var name = idx < 0 ? value : value.substr(0, idx);
            if (this.lowerCaseTagNames) {
              name = name.toLowerCase();
            }
            return name;
          };
          Parser2.prototype.ondeclaration = function(value) {
            if (this.cbs.onprocessinginstruction) {
              var name_1 = this.getInstructionName(value);
              this.cbs.onprocessinginstruction("!" + name_1, "!" + value);
            }
          };
          Parser2.prototype.onprocessinginstruction = function(value) {
            if (this.cbs.onprocessinginstruction) {
              var name_2 = this.getInstructionName(value);
              this.cbs.onprocessinginstruction("?" + name_2, "?" + value);
            }
          };
          Parser2.prototype.oncomment = function(value) {
            var _a, _b, _c, _d;
            this.updatePosition(4);
            (_b = (_a = this.cbs).oncomment) === null || _b === void 0 ? void 0 : _b.call(_a, value);
            (_d = (_c = this.cbs).oncommentend) === null || _d === void 0 ? void 0 : _d.call(_c);
          };
          Parser2.prototype.oncdata = function(value) {
            var _a, _b, _c, _d, _e, _f;
            this.updatePosition(1);
            if (this.options.xmlMode || this.options.recognizeCDATA) {
              (_b = (_a = this.cbs).oncdatastart) === null || _b === void 0 ? void 0 : _b.call(_a);
              (_d = (_c = this.cbs).ontext) === null || _d === void 0 ? void 0 : _d.call(_c, value);
              (_f = (_e = this.cbs).oncdataend) === null || _f === void 0 ? void 0 : _f.call(_e);
            } else {
              this.oncomment("[CDATA[" + value + "]]");
            }
          };
          Parser2.prototype.onerror = function(err) {
            var _a, _b;
            (_b = (_a = this.cbs).onerror) === null || _b === void 0 ? void 0 : _b.call(_a, err);
          };
          Parser2.prototype.onend = function() {
            var _a, _b;
            if (this.cbs.onclosetag) {
              for (var i = this.stack.length; i > 0; this.cbs.onclosetag(this.stack[--i]))
                ;
            }
            (_b = (_a = this.cbs).onend) === null || _b === void 0 ? void 0 : _b.call(_a);
          };
          Parser2.prototype.reset = function() {
            var _a, _b, _c, _d;
            (_b = (_a = this.cbs).onreset) === null || _b === void 0 ? void 0 : _b.call(_a);
            this.tokenizer.reset();
            this.tagname = "";
            this.attribname = "";
            this.attribs = null;
            this.stack = [];
            (_d = (_c = this.cbs).onparserinit) === null || _d === void 0 ? void 0 : _d.call(_c, this);
          };
          Parser2.prototype.parseComplete = function(data) {
            this.reset();
            this.end(data);
          };
          Parser2.prototype.write = function(chunk) {
            this.tokenizer.write(chunk);
          };
          Parser2.prototype.end = function(chunk) {
            this.tokenizer.end(chunk);
          };
          Parser2.prototype.pause = function() {
            this.tokenizer.pause();
          };
          Parser2.prototype.resume = function() {
            this.tokenizer.resume();
          };
          Parser2.prototype.parseChunk = function(chunk) {
            this.write(chunk);
          };
          Parser2.prototype.done = function(chunk) {
            this.end(chunk);
          };
          return Parser2;
        }()
      );
      exports.Parser = Parser;
    }
  });

  // node_modules/.pnpm/domelementtype@2.3.0/node_modules/domelementtype/lib/index.js
  var require_lib = __commonJS({
    "node_modules/.pnpm/domelementtype@2.3.0/node_modules/domelementtype/lib/index.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.Doctype = exports.CDATA = exports.Tag = exports.Style = exports.Script = exports.Comment = exports.Directive = exports.Text = exports.Root = exports.isTag = exports.ElementType = void 0;
      var ElementType;
      (function(ElementType2) {
        ElementType2["Root"] = "root";
        ElementType2["Text"] = "text";
        ElementType2["Directive"] = "directive";
        ElementType2["Comment"] = "comment";
        ElementType2["Script"] = "script";
        ElementType2["Style"] = "style";
        ElementType2["Tag"] = "tag";
        ElementType2["CDATA"] = "cdata";
        ElementType2["Doctype"] = "doctype";
      })(ElementType = exports.ElementType || (exports.ElementType = {}));
      function isTag(elem) {
        return elem.type === ElementType.Tag || elem.type === ElementType.Script || elem.type === ElementType.Style;
      }
      exports.isTag = isTag;
      exports.Root = ElementType.Root;
      exports.Text = ElementType.Text;
      exports.Directive = ElementType.Directive;
      exports.Comment = ElementType.Comment;
      exports.Script = ElementType.Script;
      exports.Style = ElementType.Style;
      exports.Tag = ElementType.Tag;
      exports.CDATA = ElementType.CDATA;
      exports.Doctype = ElementType.Doctype;
    }
  });

  // node_modules/.pnpm/domhandler@4.3.1/node_modules/domhandler/lib/node.js
  var require_node = __commonJS({
    "node_modules/.pnpm/domhandler@4.3.1/node_modules/domhandler/lib/node.js"(exports) {
      "use strict";
      var __extends = exports && exports.__extends || function() {
        var extendStatics = function(d, b) {
          extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
            d2.__proto__ = b2;
          } || function(d2, b2) {
            for (var p in b2)
              if (Object.prototype.hasOwnProperty.call(b2, p))
                d2[p] = b2[p];
          };
          return extendStatics(d, b);
        };
        return function(d, b) {
          if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
          extendStatics(d, b);
          function __() {
            this.constructor = d;
          }
          d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
        };
      }();
      var __assign = exports && exports.__assign || function() {
        __assign = Object.assign || function(t) {
          for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s)
              if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
          }
          return t;
        };
        return __assign.apply(this, arguments);
      };
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.cloneNode = exports.hasChildren = exports.isDocument = exports.isDirective = exports.isComment = exports.isText = exports.isCDATA = exports.isTag = exports.Element = exports.Document = exports.NodeWithChildren = exports.ProcessingInstruction = exports.Comment = exports.Text = exports.DataNode = exports.Node = void 0;
      var domelementtype_1 = require_lib();
      var nodeTypes = /* @__PURE__ */ new Map([
        [domelementtype_1.ElementType.Tag, 1],
        [domelementtype_1.ElementType.Script, 1],
        [domelementtype_1.ElementType.Style, 1],
        [domelementtype_1.ElementType.Directive, 1],
        [domelementtype_1.ElementType.Text, 3],
        [domelementtype_1.ElementType.CDATA, 4],
        [domelementtype_1.ElementType.Comment, 8],
        [domelementtype_1.ElementType.Root, 9]
      ]);
      var Node = (
        /** @class */
        function() {
          function Node2(type) {
            this.type = type;
            this.parent = null;
            this.prev = null;
            this.next = null;
            this.startIndex = null;
            this.endIndex = null;
          }
          Object.defineProperty(Node2.prototype, "nodeType", {
            // Read-only aliases
            /**
             * [DOM spec](https://dom.spec.whatwg.org/#dom-node-nodetype)-compatible
             * node {@link type}.
             */
            get: function() {
              var _a;
              return (_a = nodeTypes.get(this.type)) !== null && _a !== void 0 ? _a : 1;
            },
            enumerable: false,
            configurable: true
          });
          Object.defineProperty(Node2.prototype, "parentNode", {
            // Read-write aliases for properties
            /**
             * Same as {@link parent}.
             * [DOM spec](https://dom.spec.whatwg.org)-compatible alias.
             */
            get: function() {
              return this.parent;
            },
            set: function(parent) {
              this.parent = parent;
            },
            enumerable: false,
            configurable: true
          });
          Object.defineProperty(Node2.prototype, "previousSibling", {
            /**
             * Same as {@link prev}.
             * [DOM spec](https://dom.spec.whatwg.org)-compatible alias.
             */
            get: function() {
              return this.prev;
            },
            set: function(prev) {
              this.prev = prev;
            },
            enumerable: false,
            configurable: true
          });
          Object.defineProperty(Node2.prototype, "nextSibling", {
            /**
             * Same as {@link next}.
             * [DOM spec](https://dom.spec.whatwg.org)-compatible alias.
             */
            get: function() {
              return this.next;
            },
            set: function(next) {
              this.next = next;
            },
            enumerable: false,
            configurable: true
          });
          Node2.prototype.cloneNode = function(recursive) {
            if (recursive === void 0) {
              recursive = false;
            }
            return cloneNode(this, recursive);
          };
          return Node2;
        }()
      );
      exports.Node = Node;
      var DataNode = (
        /** @class */
        function(_super) {
          __extends(DataNode2, _super);
          function DataNode2(type, data) {
            var _this = _super.call(this, type) || this;
            _this.data = data;
            return _this;
          }
          Object.defineProperty(DataNode2.prototype, "nodeValue", {
            /**
             * Same as {@link data}.
             * [DOM spec](https://dom.spec.whatwg.org)-compatible alias.
             */
            get: function() {
              return this.data;
            },
            set: function(data) {
              this.data = data;
            },
            enumerable: false,
            configurable: true
          });
          return DataNode2;
        }(Node)
      );
      exports.DataNode = DataNode;
      var Text = (
        /** @class */
        function(_super) {
          __extends(Text2, _super);
          function Text2(data) {
            return _super.call(this, domelementtype_1.ElementType.Text, data) || this;
          }
          return Text2;
        }(DataNode)
      );
      exports.Text = Text;
      var Comment = (
        /** @class */
        function(_super) {
          __extends(Comment2, _super);
          function Comment2(data) {
            return _super.call(this, domelementtype_1.ElementType.Comment, data) || this;
          }
          return Comment2;
        }(DataNode)
      );
      exports.Comment = Comment;
      var ProcessingInstruction = (
        /** @class */
        function(_super) {
          __extends(ProcessingInstruction2, _super);
          function ProcessingInstruction2(name, data) {
            var _this = _super.call(this, domelementtype_1.ElementType.Directive, data) || this;
            _this.name = name;
            return _this;
          }
          return ProcessingInstruction2;
        }(DataNode)
      );
      exports.ProcessingInstruction = ProcessingInstruction;
      var NodeWithChildren = (
        /** @class */
        function(_super) {
          __extends(NodeWithChildren2, _super);
          function NodeWithChildren2(type, children) {
            var _this = _super.call(this, type) || this;
            _this.children = children;
            return _this;
          }
          Object.defineProperty(NodeWithChildren2.prototype, "firstChild", {
            // Aliases
            /** First child of the node. */
            get: function() {
              var _a;
              return (_a = this.children[0]) !== null && _a !== void 0 ? _a : null;
            },
            enumerable: false,
            configurable: true
          });
          Object.defineProperty(NodeWithChildren2.prototype, "lastChild", {
            /** Last child of the node. */
            get: function() {
              return this.children.length > 0 ? this.children[this.children.length - 1] : null;
            },
            enumerable: false,
            configurable: true
          });
          Object.defineProperty(NodeWithChildren2.prototype, "childNodes", {
            /**
             * Same as {@link children}.
             * [DOM spec](https://dom.spec.whatwg.org)-compatible alias.
             */
            get: function() {
              return this.children;
            },
            set: function(children) {
              this.children = children;
            },
            enumerable: false,
            configurable: true
          });
          return NodeWithChildren2;
        }(Node)
      );
      exports.NodeWithChildren = NodeWithChildren;
      var Document = (
        /** @class */
        function(_super) {
          __extends(Document2, _super);
          function Document2(children) {
            return _super.call(this, domelementtype_1.ElementType.Root, children) || this;
          }
          return Document2;
        }(NodeWithChildren)
      );
      exports.Document = Document;
      var Element = (
        /** @class */
        function(_super) {
          __extends(Element2, _super);
          function Element2(name, attribs, children, type) {
            if (children === void 0) {
              children = [];
            }
            if (type === void 0) {
              type = name === "script" ? domelementtype_1.ElementType.Script : name === "style" ? domelementtype_1.ElementType.Style : domelementtype_1.ElementType.Tag;
            }
            var _this = _super.call(this, type, children) || this;
            _this.name = name;
            _this.attribs = attribs;
            return _this;
          }
          Object.defineProperty(Element2.prototype, "tagName", {
            // DOM Level 1 aliases
            /**
             * Same as {@link name}.
             * [DOM spec](https://dom.spec.whatwg.org)-compatible alias.
             */
            get: function() {
              return this.name;
            },
            set: function(name) {
              this.name = name;
            },
            enumerable: false,
            configurable: true
          });
          Object.defineProperty(Element2.prototype, "attributes", {
            get: function() {
              var _this = this;
              return Object.keys(this.attribs).map(function(name) {
                var _a, _b;
                return {
                  name,
                  value: _this.attribs[name],
                  namespace: (_a = _this["x-attribsNamespace"]) === null || _a === void 0 ? void 0 : _a[name],
                  prefix: (_b = _this["x-attribsPrefix"]) === null || _b === void 0 ? void 0 : _b[name]
                };
              });
            },
            enumerable: false,
            configurable: true
          });
          return Element2;
        }(NodeWithChildren)
      );
      exports.Element = Element;
      function isTag(node) {
        return (0, domelementtype_1.isTag)(node);
      }
      exports.isTag = isTag;
      function isCDATA(node) {
        return node.type === domelementtype_1.ElementType.CDATA;
      }
      exports.isCDATA = isCDATA;
      function isText(node) {
        return node.type === domelementtype_1.ElementType.Text;
      }
      exports.isText = isText;
      function isComment(node) {
        return node.type === domelementtype_1.ElementType.Comment;
      }
      exports.isComment = isComment;
      function isDirective(node) {
        return node.type === domelementtype_1.ElementType.Directive;
      }
      exports.isDirective = isDirective;
      function isDocument(node) {
        return node.type === domelementtype_1.ElementType.Root;
      }
      exports.isDocument = isDocument;
      function hasChildren(node) {
        return Object.prototype.hasOwnProperty.call(node, "children");
      }
      exports.hasChildren = hasChildren;
      function cloneNode(node, recursive) {
        if (recursive === void 0) {
          recursive = false;
        }
        var result;
        if (isText(node)) {
          result = new Text(node.data);
        } else if (isComment(node)) {
          result = new Comment(node.data);
        } else if (isTag(node)) {
          var children = recursive ? cloneChildren(node.children) : [];
          var clone_1 = new Element(node.name, __assign({}, node.attribs), children);
          children.forEach(function(child) {
            return child.parent = clone_1;
          });
          if (node.namespace != null) {
            clone_1.namespace = node.namespace;
          }
          if (node["x-attribsNamespace"]) {
            clone_1["x-attribsNamespace"] = __assign({}, node["x-attribsNamespace"]);
          }
          if (node["x-attribsPrefix"]) {
            clone_1["x-attribsPrefix"] = __assign({}, node["x-attribsPrefix"]);
          }
          result = clone_1;
        } else if (isCDATA(node)) {
          var children = recursive ? cloneChildren(node.children) : [];
          var clone_2 = new NodeWithChildren(domelementtype_1.ElementType.CDATA, children);
          children.forEach(function(child) {
            return child.parent = clone_2;
          });
          result = clone_2;
        } else if (isDocument(node)) {
          var children = recursive ? cloneChildren(node.children) : [];
          var clone_3 = new Document(children);
          children.forEach(function(child) {
            return child.parent = clone_3;
          });
          if (node["x-mode"]) {
            clone_3["x-mode"] = node["x-mode"];
          }
          result = clone_3;
        } else if (isDirective(node)) {
          var instruction = new ProcessingInstruction(node.name, node.data);
          if (node["x-name"] != null) {
            instruction["x-name"] = node["x-name"];
            instruction["x-publicId"] = node["x-publicId"];
            instruction["x-systemId"] = node["x-systemId"];
          }
          result = instruction;
        } else {
          throw new Error("Not implemented yet: ".concat(node.type));
        }
        result.startIndex = node.startIndex;
        result.endIndex = node.endIndex;
        if (node.sourceCodeLocation != null) {
          result.sourceCodeLocation = node.sourceCodeLocation;
        }
        return result;
      }
      exports.cloneNode = cloneNode;
      function cloneChildren(childs) {
        var children = childs.map(function(child) {
          return cloneNode(child, true);
        });
        for (var i = 1; i < children.length; i++) {
          children[i].prev = children[i - 1];
          children[i - 1].next = children[i];
        }
        return children;
      }
    }
  });

  // node_modules/.pnpm/domhandler@4.3.1/node_modules/domhandler/lib/index.js
  var require_lib2 = __commonJS({
    "node_modules/.pnpm/domhandler@4.3.1/node_modules/domhandler/lib/index.js"(exports) {
      "use strict";
      var __createBinding = exports && exports.__createBinding || (Object.create ? function(o, m, k, k2) {
        if (k2 === void 0)
          k2 = k;
        var desc = Object.getOwnPropertyDescriptor(m, k);
        if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
          desc = { enumerable: true, get: function() {
            return m[k];
          } };
        }
        Object.defineProperty(o, k2, desc);
      } : function(o, m, k, k2) {
        if (k2 === void 0)
          k2 = k;
        o[k2] = m[k];
      });
      var __exportStar = exports && exports.__exportStar || function(m, exports2) {
        for (var p in m)
          if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports2, p))
            __createBinding(exports2, m, p);
      };
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.DomHandler = void 0;
      var domelementtype_1 = require_lib();
      var node_1 = require_node();
      __exportStar(require_node(), exports);
      var reWhitespace = /\s+/g;
      var defaultOpts = {
        normalizeWhitespace: false,
        withStartIndices: false,
        withEndIndices: false,
        xmlMode: false
      };
      var DomHandler = (
        /** @class */
        function() {
          function DomHandler2(callback, options, elementCB) {
            this.dom = [];
            this.root = new node_1.Document(this.dom);
            this.done = false;
            this.tagStack = [this.root];
            this.lastNode = null;
            this.parser = null;
            if (typeof options === "function") {
              elementCB = options;
              options = defaultOpts;
            }
            if (typeof callback === "object") {
              options = callback;
              callback = void 0;
            }
            this.callback = callback !== null && callback !== void 0 ? callback : null;
            this.options = options !== null && options !== void 0 ? options : defaultOpts;
            this.elementCB = elementCB !== null && elementCB !== void 0 ? elementCB : null;
          }
          DomHandler2.prototype.onparserinit = function(parser) {
            this.parser = parser;
          };
          DomHandler2.prototype.onreset = function() {
            this.dom = [];
            this.root = new node_1.Document(this.dom);
            this.done = false;
            this.tagStack = [this.root];
            this.lastNode = null;
            this.parser = null;
          };
          DomHandler2.prototype.onend = function() {
            if (this.done)
              return;
            this.done = true;
            this.parser = null;
            this.handleCallback(null);
          };
          DomHandler2.prototype.onerror = function(error) {
            this.handleCallback(error);
          };
          DomHandler2.prototype.onclosetag = function() {
            this.lastNode = null;
            var elem = this.tagStack.pop();
            if (this.options.withEndIndices) {
              elem.endIndex = this.parser.endIndex;
            }
            if (this.elementCB)
              this.elementCB(elem);
          };
          DomHandler2.prototype.onopentag = function(name, attribs) {
            var type = this.options.xmlMode ? domelementtype_1.ElementType.Tag : void 0;
            var element = new node_1.Element(name, attribs, void 0, type);
            this.addNode(element);
            this.tagStack.push(element);
          };
          DomHandler2.prototype.ontext = function(data) {
            var normalizeWhitespace = this.options.normalizeWhitespace;
            var lastNode = this.lastNode;
            if (lastNode && lastNode.type === domelementtype_1.ElementType.Text) {
              if (normalizeWhitespace) {
                lastNode.data = (lastNode.data + data).replace(reWhitespace, " ");
              } else {
                lastNode.data += data;
              }
              if (this.options.withEndIndices) {
                lastNode.endIndex = this.parser.endIndex;
              }
            } else {
              if (normalizeWhitespace) {
                data = data.replace(reWhitespace, " ");
              }
              var node = new node_1.Text(data);
              this.addNode(node);
              this.lastNode = node;
            }
          };
          DomHandler2.prototype.oncomment = function(data) {
            if (this.lastNode && this.lastNode.type === domelementtype_1.ElementType.Comment) {
              this.lastNode.data += data;
              return;
            }
            var node = new node_1.Comment(data);
            this.addNode(node);
            this.lastNode = node;
          };
          DomHandler2.prototype.oncommentend = function() {
            this.lastNode = null;
          };
          DomHandler2.prototype.oncdatastart = function() {
            var text = new node_1.Text("");
            var node = new node_1.NodeWithChildren(domelementtype_1.ElementType.CDATA, [text]);
            this.addNode(node);
            text.parent = node;
            this.lastNode = text;
          };
          DomHandler2.prototype.oncdataend = function() {
            this.lastNode = null;
          };
          DomHandler2.prototype.onprocessinginstruction = function(name, data) {
            var node = new node_1.ProcessingInstruction(name, data);
            this.addNode(node);
          };
          DomHandler2.prototype.handleCallback = function(error) {
            if (typeof this.callback === "function") {
              this.callback(error, this.dom);
            } else if (error) {
              throw error;
            }
          };
          DomHandler2.prototype.addNode = function(node) {
            var parent = this.tagStack[this.tagStack.length - 1];
            var previousSibling = parent.children[parent.children.length - 1];
            if (this.options.withStartIndices) {
              node.startIndex = this.parser.startIndex;
            }
            if (this.options.withEndIndices) {
              node.endIndex = this.parser.endIndex;
            }
            parent.children.push(node);
            if (previousSibling) {
              node.prev = previousSibling;
              previousSibling.next = node;
            }
            node.parent = parent;
            this.lastNode = null;
          };
          return DomHandler2;
        }()
      );
      exports.DomHandler = DomHandler;
      exports.default = DomHandler;
    }
  });

  // node_modules/.pnpm/entities@2.2.0/node_modules/entities/lib/decode.js
  var require_decode2 = __commonJS({
    "node_modules/.pnpm/entities@2.2.0/node_modules/entities/lib/decode.js"(exports) {
      "use strict";
      var __importDefault = exports && exports.__importDefault || function(mod) {
        return mod && mod.__esModule ? mod : { "default": mod };
      };
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.decodeHTML = exports.decodeHTMLStrict = exports.decodeXML = void 0;
      var entities_json_1 = __importDefault(require_entities());
      var legacy_json_1 = __importDefault(require_legacy());
      var xml_json_1 = __importDefault(require_xml());
      var decode_codepoint_1 = __importDefault(require_decode_codepoint());
      var strictEntityRe = /&(?:[a-zA-Z0-9]+|#[xX][\da-fA-F]+|#\d+);/g;
      exports.decodeXML = getStrictDecoder(xml_json_1.default);
      exports.decodeHTMLStrict = getStrictDecoder(entities_json_1.default);
      function getStrictDecoder(map) {
        var replace = getReplacer(map);
        return function(str) {
          return String(str).replace(strictEntityRe, replace);
        };
      }
      var sorter = function(a, b) {
        return a < b ? 1 : -1;
      };
      exports.decodeHTML = function() {
        var legacy = Object.keys(legacy_json_1.default).sort(sorter);
        var keys = Object.keys(entities_json_1.default).sort(sorter);
        for (var i = 0, j = 0; i < keys.length; i++) {
          if (legacy[j] === keys[i]) {
            keys[i] += ";?";
            j++;
          } else {
            keys[i] += ";";
          }
        }
        var re = new RegExp("&(?:" + keys.join("|") + "|#[xX][\\da-fA-F]+;?|#\\d+;?)", "g");
        var replace = getReplacer(entities_json_1.default);
        function replacer(str) {
          if (str.substr(-1) !== ";")
            str += ";";
          return replace(str);
        }
        return function(str) {
          return String(str).replace(re, replacer);
        };
      }();
      function getReplacer(map) {
        return function replace(str) {
          if (str.charAt(1) === "#") {
            var secondChar = str.charAt(2);
            if (secondChar === "X" || secondChar === "x") {
              return decode_codepoint_1.default(parseInt(str.substr(3), 16));
            }
            return decode_codepoint_1.default(parseInt(str.substr(2), 10));
          }
          return map[str.slice(1, -1)] || str;
        };
      }
    }
  });

  // node_modules/.pnpm/entities@2.2.0/node_modules/entities/lib/encode.js
  var require_encode = __commonJS({
    "node_modules/.pnpm/entities@2.2.0/node_modules/entities/lib/encode.js"(exports) {
      "use strict";
      var __importDefault = exports && exports.__importDefault || function(mod) {
        return mod && mod.__esModule ? mod : { "default": mod };
      };
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.escapeUTF8 = exports.escape = exports.encodeNonAsciiHTML = exports.encodeHTML = exports.encodeXML = void 0;
      var xml_json_1 = __importDefault(require_xml());
      var inverseXML = getInverseObj(xml_json_1.default);
      var xmlReplacer = getInverseReplacer(inverseXML);
      exports.encodeXML = getASCIIEncoder(inverseXML);
      var entities_json_1 = __importDefault(require_entities());
      var inverseHTML = getInverseObj(entities_json_1.default);
      var htmlReplacer = getInverseReplacer(inverseHTML);
      exports.encodeHTML = getInverse(inverseHTML, htmlReplacer);
      exports.encodeNonAsciiHTML = getASCIIEncoder(inverseHTML);
      function getInverseObj(obj) {
        return Object.keys(obj).sort().reduce(function(inverse, name) {
          inverse[obj[name]] = "&" + name + ";";
          return inverse;
        }, {});
      }
      function getInverseReplacer(inverse) {
        var single = [];
        var multiple = [];
        for (var _i = 0, _a = Object.keys(inverse); _i < _a.length; _i++) {
          var k = _a[_i];
          if (k.length === 1) {
            single.push("\\" + k);
          } else {
            multiple.push(k);
          }
        }
        single.sort();
        for (var start = 0; start < single.length - 1; start++) {
          var end = start;
          while (end < single.length - 1 && single[end].charCodeAt(1) + 1 === single[end + 1].charCodeAt(1)) {
            end += 1;
          }
          var count = 1 + end - start;
          if (count < 3)
            continue;
          single.splice(start, count, single[start] + "-" + single[end]);
        }
        multiple.unshift("[" + single.join("") + "]");
        return new RegExp(multiple.join("|"), "g");
      }
      var reNonASCII = /(?:[\x80-\uD7FF\uE000-\uFFFF]|[\uD800-\uDBFF][\uDC00-\uDFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF])/g;
      var getCodePoint = (
        // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
        String.prototype.codePointAt != null ? (
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          function(str) {
            return str.codePointAt(0);
          }
        ) : (
          // http://mathiasbynens.be/notes/javascript-encoding#surrogate-formulae
          function(c) {
            return (c.charCodeAt(0) - 55296) * 1024 + c.charCodeAt(1) - 56320 + 65536;
          }
        )
      );
      function singleCharReplacer(c) {
        return "&#x" + (c.length > 1 ? getCodePoint(c) : c.charCodeAt(0)).toString(16).toUpperCase() + ";";
      }
      function getInverse(inverse, re) {
        return function(data) {
          return data.replace(re, function(name) {
            return inverse[name];
          }).replace(reNonASCII, singleCharReplacer);
        };
      }
      var reEscapeChars = new RegExp(xmlReplacer.source + "|" + reNonASCII.source, "g");
      function escape(data) {
        return data.replace(reEscapeChars, singleCharReplacer);
      }
      exports.escape = escape;
      function escapeUTF8(data) {
        return data.replace(xmlReplacer, singleCharReplacer);
      }
      exports.escapeUTF8 = escapeUTF8;
      function getASCIIEncoder(obj) {
        return function(data) {
          return data.replace(reEscapeChars, function(c) {
            return obj[c] || singleCharReplacer(c);
          });
        };
      }
    }
  });

  // node_modules/.pnpm/entities@2.2.0/node_modules/entities/lib/index.js
  var require_lib3 = __commonJS({
    "node_modules/.pnpm/entities@2.2.0/node_modules/entities/lib/index.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.decodeXMLStrict = exports.decodeHTML5Strict = exports.decodeHTML4Strict = exports.decodeHTML5 = exports.decodeHTML4 = exports.decodeHTMLStrict = exports.decodeHTML = exports.decodeXML = exports.encodeHTML5 = exports.encodeHTML4 = exports.escapeUTF8 = exports.escape = exports.encodeNonAsciiHTML = exports.encodeHTML = exports.encodeXML = exports.encode = exports.decodeStrict = exports.decode = void 0;
      var decode_1 = require_decode2();
      var encode_1 = require_encode();
      function decode(data, level) {
        return (!level || level <= 0 ? decode_1.decodeXML : decode_1.decodeHTML)(data);
      }
      exports.decode = decode;
      function decodeStrict(data, level) {
        return (!level || level <= 0 ? decode_1.decodeXML : decode_1.decodeHTMLStrict)(data);
      }
      exports.decodeStrict = decodeStrict;
      function encode(data, level) {
        return (!level || level <= 0 ? encode_1.encodeXML : encode_1.encodeHTML)(data);
      }
      exports.encode = encode;
      var encode_2 = require_encode();
      Object.defineProperty(exports, "encodeXML", { enumerable: true, get: function() {
        return encode_2.encodeXML;
      } });
      Object.defineProperty(exports, "encodeHTML", { enumerable: true, get: function() {
        return encode_2.encodeHTML;
      } });
      Object.defineProperty(exports, "encodeNonAsciiHTML", { enumerable: true, get: function() {
        return encode_2.encodeNonAsciiHTML;
      } });
      Object.defineProperty(exports, "escape", { enumerable: true, get: function() {
        return encode_2.escape;
      } });
      Object.defineProperty(exports, "escapeUTF8", { enumerable: true, get: function() {
        return encode_2.escapeUTF8;
      } });
      Object.defineProperty(exports, "encodeHTML4", { enumerable: true, get: function() {
        return encode_2.encodeHTML;
      } });
      Object.defineProperty(exports, "encodeHTML5", { enumerable: true, get: function() {
        return encode_2.encodeHTML;
      } });
      var decode_2 = require_decode2();
      Object.defineProperty(exports, "decodeXML", { enumerable: true, get: function() {
        return decode_2.decodeXML;
      } });
      Object.defineProperty(exports, "decodeHTML", { enumerable: true, get: function() {
        return decode_2.decodeHTML;
      } });
      Object.defineProperty(exports, "decodeHTMLStrict", { enumerable: true, get: function() {
        return decode_2.decodeHTMLStrict;
      } });
      Object.defineProperty(exports, "decodeHTML4", { enumerable: true, get: function() {
        return decode_2.decodeHTML;
      } });
      Object.defineProperty(exports, "decodeHTML5", { enumerable: true, get: function() {
        return decode_2.decodeHTML;
      } });
      Object.defineProperty(exports, "decodeHTML4Strict", { enumerable: true, get: function() {
        return decode_2.decodeHTMLStrict;
      } });
      Object.defineProperty(exports, "decodeHTML5Strict", { enumerable: true, get: function() {
        return decode_2.decodeHTMLStrict;
      } });
      Object.defineProperty(exports, "decodeXMLStrict", { enumerable: true, get: function() {
        return decode_2.decodeXML;
      } });
    }
  });

  // node_modules/.pnpm/dom-serializer@1.4.1/node_modules/dom-serializer/lib/foreignNames.js
  var require_foreignNames = __commonJS({
    "node_modules/.pnpm/dom-serializer@1.4.1/node_modules/dom-serializer/lib/foreignNames.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.attributeNames = exports.elementNames = void 0;
      exports.elementNames = /* @__PURE__ */ new Map([
        ["altglyph", "altGlyph"],
        ["altglyphdef", "altGlyphDef"],
        ["altglyphitem", "altGlyphItem"],
        ["animatecolor", "animateColor"],
        ["animatemotion", "animateMotion"],
        ["animatetransform", "animateTransform"],
        ["clippath", "clipPath"],
        ["feblend", "feBlend"],
        ["fecolormatrix", "feColorMatrix"],
        ["fecomponenttransfer", "feComponentTransfer"],
        ["fecomposite", "feComposite"],
        ["feconvolvematrix", "feConvolveMatrix"],
        ["fediffuselighting", "feDiffuseLighting"],
        ["fedisplacementmap", "feDisplacementMap"],
        ["fedistantlight", "feDistantLight"],
        ["fedropshadow", "feDropShadow"],
        ["feflood", "feFlood"],
        ["fefunca", "feFuncA"],
        ["fefuncb", "feFuncB"],
        ["fefuncg", "feFuncG"],
        ["fefuncr", "feFuncR"],
        ["fegaussianblur", "feGaussianBlur"],
        ["feimage", "feImage"],
        ["femerge", "feMerge"],
        ["femergenode", "feMergeNode"],
        ["femorphology", "feMorphology"],
        ["feoffset", "feOffset"],
        ["fepointlight", "fePointLight"],
        ["fespecularlighting", "feSpecularLighting"],
        ["fespotlight", "feSpotLight"],
        ["fetile", "feTile"],
        ["feturbulence", "feTurbulence"],
        ["foreignobject", "foreignObject"],
        ["glyphref", "glyphRef"],
        ["lineargradient", "linearGradient"],
        ["radialgradient", "radialGradient"],
        ["textpath", "textPath"]
      ]);
      exports.attributeNames = /* @__PURE__ */ new Map([
        ["definitionurl", "definitionURL"],
        ["attributename", "attributeName"],
        ["attributetype", "attributeType"],
        ["basefrequency", "baseFrequency"],
        ["baseprofile", "baseProfile"],
        ["calcmode", "calcMode"],
        ["clippathunits", "clipPathUnits"],
        ["diffuseconstant", "diffuseConstant"],
        ["edgemode", "edgeMode"],
        ["filterunits", "filterUnits"],
        ["glyphref", "glyphRef"],
        ["gradienttransform", "gradientTransform"],
        ["gradientunits", "gradientUnits"],
        ["kernelmatrix", "kernelMatrix"],
        ["kernelunitlength", "kernelUnitLength"],
        ["keypoints", "keyPoints"],
        ["keysplines", "keySplines"],
        ["keytimes", "keyTimes"],
        ["lengthadjust", "lengthAdjust"],
        ["limitingconeangle", "limitingConeAngle"],
        ["markerheight", "markerHeight"],
        ["markerunits", "markerUnits"],
        ["markerwidth", "markerWidth"],
        ["maskcontentunits", "maskContentUnits"],
        ["maskunits", "maskUnits"],
        ["numoctaves", "numOctaves"],
        ["pathlength", "pathLength"],
        ["patterncontentunits", "patternContentUnits"],
        ["patterntransform", "patternTransform"],
        ["patternunits", "patternUnits"],
        ["pointsatx", "pointsAtX"],
        ["pointsaty", "pointsAtY"],
        ["pointsatz", "pointsAtZ"],
        ["preservealpha", "preserveAlpha"],
        ["preserveaspectratio", "preserveAspectRatio"],
        ["primitiveunits", "primitiveUnits"],
        ["refx", "refX"],
        ["refy", "refY"],
        ["repeatcount", "repeatCount"],
        ["repeatdur", "repeatDur"],
        ["requiredextensions", "requiredExtensions"],
        ["requiredfeatures", "requiredFeatures"],
        ["specularconstant", "specularConstant"],
        ["specularexponent", "specularExponent"],
        ["spreadmethod", "spreadMethod"],
        ["startoffset", "startOffset"],
        ["stddeviation", "stdDeviation"],
        ["stitchtiles", "stitchTiles"],
        ["surfacescale", "surfaceScale"],
        ["systemlanguage", "systemLanguage"],
        ["tablevalues", "tableValues"],
        ["targetx", "targetX"],
        ["targety", "targetY"],
        ["textlength", "textLength"],
        ["viewbox", "viewBox"],
        ["viewtarget", "viewTarget"],
        ["xchannelselector", "xChannelSelector"],
        ["ychannelselector", "yChannelSelector"],
        ["zoomandpan", "zoomAndPan"]
      ]);
    }
  });

  // node_modules/.pnpm/dom-serializer@1.4.1/node_modules/dom-serializer/lib/index.js
  var require_lib4 = __commonJS({
    "node_modules/.pnpm/dom-serializer@1.4.1/node_modules/dom-serializer/lib/index.js"(exports) {
      "use strict";
      var __assign = exports && exports.__assign || function() {
        __assign = Object.assign || function(t) {
          for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s)
              if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
          }
          return t;
        };
        return __assign.apply(this, arguments);
      };
      var __createBinding = exports && exports.__createBinding || (Object.create ? function(o, m, k, k2) {
        if (k2 === void 0)
          k2 = k;
        Object.defineProperty(o, k2, { enumerable: true, get: function() {
          return m[k];
        } });
      } : function(o, m, k, k2) {
        if (k2 === void 0)
          k2 = k;
        o[k2] = m[k];
      });
      var __setModuleDefault = exports && exports.__setModuleDefault || (Object.create ? function(o, v) {
        Object.defineProperty(o, "default", { enumerable: true, value: v });
      } : function(o, v) {
        o["default"] = v;
      });
      var __importStar = exports && exports.__importStar || function(mod) {
        if (mod && mod.__esModule)
          return mod;
        var result = {};
        if (mod != null) {
          for (var k in mod)
            if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k))
              __createBinding(result, mod, k);
        }
        __setModuleDefault(result, mod);
        return result;
      };
      Object.defineProperty(exports, "__esModule", { value: true });
      var ElementType = __importStar(require_lib());
      var entities_1 = require_lib3();
      var foreignNames_1 = require_foreignNames();
      var unencodedElements = /* @__PURE__ */ new Set([
        "style",
        "script",
        "xmp",
        "iframe",
        "noembed",
        "noframes",
        "plaintext",
        "noscript"
      ]);
      function formatAttributes(attributes, opts) {
        if (!attributes)
          return;
        return Object.keys(attributes).map(function(key) {
          var _a, _b;
          var value = (_a = attributes[key]) !== null && _a !== void 0 ? _a : "";
          if (opts.xmlMode === "foreign") {
            key = (_b = foreignNames_1.attributeNames.get(key)) !== null && _b !== void 0 ? _b : key;
          }
          if (!opts.emptyAttrs && !opts.xmlMode && value === "") {
            return key;
          }
          return key + '="' + (opts.decodeEntities !== false ? entities_1.encodeXML(value) : value.replace(/"/g, "&quot;")) + '"';
        }).join(" ");
      }
      var singleTag = /* @__PURE__ */ new Set([
        "area",
        "base",
        "basefont",
        "br",
        "col",
        "command",
        "embed",
        "frame",
        "hr",
        "img",
        "input",
        "isindex",
        "keygen",
        "link",
        "meta",
        "param",
        "source",
        "track",
        "wbr"
      ]);
      function render(node, options) {
        if (options === void 0) {
          options = {};
        }
        var nodes = "length" in node ? node : [node];
        var output = "";
        for (var i = 0; i < nodes.length; i++) {
          output += renderNode(nodes[i], options);
        }
        return output;
      }
      exports.default = render;
      function renderNode(node, options) {
        switch (node.type) {
          case ElementType.Root:
            return render(node.children, options);
          case ElementType.Directive:
          case ElementType.Doctype:
            return renderDirective(node);
          case ElementType.Comment:
            return renderComment(node);
          case ElementType.CDATA:
            return renderCdata(node);
          case ElementType.Script:
          case ElementType.Style:
          case ElementType.Tag:
            return renderTag(node, options);
          case ElementType.Text:
            return renderText(node, options);
        }
      }
      var foreignModeIntegrationPoints = /* @__PURE__ */ new Set([
        "mi",
        "mo",
        "mn",
        "ms",
        "mtext",
        "annotation-xml",
        "foreignObject",
        "desc",
        "title"
      ]);
      var foreignElements = /* @__PURE__ */ new Set(["svg", "math"]);
      function renderTag(elem, opts) {
        var _a;
        if (opts.xmlMode === "foreign") {
          elem.name = (_a = foreignNames_1.elementNames.get(elem.name)) !== null && _a !== void 0 ? _a : elem.name;
          if (elem.parent && foreignModeIntegrationPoints.has(elem.parent.name)) {
            opts = __assign(__assign({}, opts), { xmlMode: false });
          }
        }
        if (!opts.xmlMode && foreignElements.has(elem.name)) {
          opts = __assign(__assign({}, opts), { xmlMode: "foreign" });
        }
        var tag = "<" + elem.name;
        var attribs = formatAttributes(elem.attribs, opts);
        if (attribs) {
          tag += " " + attribs;
        }
        if (elem.children.length === 0 && (opts.xmlMode ? (
          // In XML mode or foreign mode, and user hasn't explicitly turned off self-closing tags
          opts.selfClosingTags !== false
        ) : (
          // User explicitly asked for self-closing tags, even in HTML mode
          opts.selfClosingTags && singleTag.has(elem.name)
        ))) {
          if (!opts.xmlMode)
            tag += " ";
          tag += "/>";
        } else {
          tag += ">";
          if (elem.children.length > 0) {
            tag += render(elem.children, opts);
          }
          if (opts.xmlMode || !singleTag.has(elem.name)) {
            tag += "</" + elem.name + ">";
          }
        }
        return tag;
      }
      function renderDirective(elem) {
        return "<" + elem.data + ">";
      }
      function renderText(elem, opts) {
        var data = elem.data || "";
        if (opts.decodeEntities !== false && !(!opts.xmlMode && elem.parent && unencodedElements.has(elem.parent.name))) {
          data = entities_1.encodeXML(data);
        }
        return data;
      }
      function renderCdata(elem) {
        return "<![CDATA[" + elem.children[0].data + "]]>";
      }
      function renderComment(elem) {
        return "<!--" + elem.data + "-->";
      }
    }
  });

  // node_modules/.pnpm/domutils@2.8.0/node_modules/domutils/lib/stringify.js
  var require_stringify = __commonJS({
    "node_modules/.pnpm/domutils@2.8.0/node_modules/domutils/lib/stringify.js"(exports) {
      "use strict";
      var __importDefault = exports && exports.__importDefault || function(mod) {
        return mod && mod.__esModule ? mod : { "default": mod };
      };
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.innerText = exports.textContent = exports.getText = exports.getInnerHTML = exports.getOuterHTML = void 0;
      var domhandler_1 = require_lib2();
      var dom_serializer_1 = __importDefault(require_lib4());
      var domelementtype_1 = require_lib();
      function getOuterHTML(node, options) {
        return (0, dom_serializer_1.default)(node, options);
      }
      exports.getOuterHTML = getOuterHTML;
      function getInnerHTML(node, options) {
        return (0, domhandler_1.hasChildren)(node) ? node.children.map(function(node2) {
          return getOuterHTML(node2, options);
        }).join("") : "";
      }
      exports.getInnerHTML = getInnerHTML;
      function getText(node) {
        if (Array.isArray(node))
          return node.map(getText).join("");
        if ((0, domhandler_1.isTag)(node))
          return node.name === "br" ? "\n" : getText(node.children);
        if ((0, domhandler_1.isCDATA)(node))
          return getText(node.children);
        if ((0, domhandler_1.isText)(node))
          return node.data;
        return "";
      }
      exports.getText = getText;
      function textContent(node) {
        if (Array.isArray(node))
          return node.map(textContent).join("");
        if ((0, domhandler_1.hasChildren)(node) && !(0, domhandler_1.isComment)(node)) {
          return textContent(node.children);
        }
        if ((0, domhandler_1.isText)(node))
          return node.data;
        return "";
      }
      exports.textContent = textContent;
      function innerText(node) {
        if (Array.isArray(node))
          return node.map(innerText).join("");
        if ((0, domhandler_1.hasChildren)(node) && (node.type === domelementtype_1.ElementType.Tag || (0, domhandler_1.isCDATA)(node))) {
          return innerText(node.children);
        }
        if ((0, domhandler_1.isText)(node))
          return node.data;
        return "";
      }
      exports.innerText = innerText;
    }
  });

  // node_modules/.pnpm/domutils@2.8.0/node_modules/domutils/lib/traversal.js
  var require_traversal = __commonJS({
    "node_modules/.pnpm/domutils@2.8.0/node_modules/domutils/lib/traversal.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.prevElementSibling = exports.nextElementSibling = exports.getName = exports.hasAttrib = exports.getAttributeValue = exports.getSiblings = exports.getParent = exports.getChildren = void 0;
      var domhandler_1 = require_lib2();
      var emptyArray = [];
      function getChildren(elem) {
        var _a;
        return (_a = elem.children) !== null && _a !== void 0 ? _a : emptyArray;
      }
      exports.getChildren = getChildren;
      function getParent(elem) {
        return elem.parent || null;
      }
      exports.getParent = getParent;
      function getSiblings(elem) {
        var _a, _b;
        var parent = getParent(elem);
        if (parent != null)
          return getChildren(parent);
        var siblings = [elem];
        var prev = elem.prev, next = elem.next;
        while (prev != null) {
          siblings.unshift(prev);
          _a = prev, prev = _a.prev;
        }
        while (next != null) {
          siblings.push(next);
          _b = next, next = _b.next;
        }
        return siblings;
      }
      exports.getSiblings = getSiblings;
      function getAttributeValue(elem, name) {
        var _a;
        return (_a = elem.attribs) === null || _a === void 0 ? void 0 : _a[name];
      }
      exports.getAttributeValue = getAttributeValue;
      function hasAttrib(elem, name) {
        return elem.attribs != null && Object.prototype.hasOwnProperty.call(elem.attribs, name) && elem.attribs[name] != null;
      }
      exports.hasAttrib = hasAttrib;
      function getName(elem) {
        return elem.name;
      }
      exports.getName = getName;
      function nextElementSibling(elem) {
        var _a;
        var next = elem.next;
        while (next !== null && !(0, domhandler_1.isTag)(next))
          _a = next, next = _a.next;
        return next;
      }
      exports.nextElementSibling = nextElementSibling;
      function prevElementSibling(elem) {
        var _a;
        var prev = elem.prev;
        while (prev !== null && !(0, domhandler_1.isTag)(prev))
          _a = prev, prev = _a.prev;
        return prev;
      }
      exports.prevElementSibling = prevElementSibling;
    }
  });

  // node_modules/.pnpm/domutils@2.8.0/node_modules/domutils/lib/manipulation.js
  var require_manipulation = __commonJS({
    "node_modules/.pnpm/domutils@2.8.0/node_modules/domutils/lib/manipulation.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.prepend = exports.prependChild = exports.append = exports.appendChild = exports.replaceElement = exports.removeElement = void 0;
      function removeElement(elem) {
        if (elem.prev)
          elem.prev.next = elem.next;
        if (elem.next)
          elem.next.prev = elem.prev;
        if (elem.parent) {
          var childs = elem.parent.children;
          childs.splice(childs.lastIndexOf(elem), 1);
        }
      }
      exports.removeElement = removeElement;
      function replaceElement(elem, replacement) {
        var prev = replacement.prev = elem.prev;
        if (prev) {
          prev.next = replacement;
        }
        var next = replacement.next = elem.next;
        if (next) {
          next.prev = replacement;
        }
        var parent = replacement.parent = elem.parent;
        if (parent) {
          var childs = parent.children;
          childs[childs.lastIndexOf(elem)] = replacement;
        }
      }
      exports.replaceElement = replaceElement;
      function appendChild(elem, child) {
        removeElement(child);
        child.next = null;
        child.parent = elem;
        if (elem.children.push(child) > 1) {
          var sibling = elem.children[elem.children.length - 2];
          sibling.next = child;
          child.prev = sibling;
        } else {
          child.prev = null;
        }
      }
      exports.appendChild = appendChild;
      function append(elem, next) {
        removeElement(next);
        var parent = elem.parent;
        var currNext = elem.next;
        next.next = currNext;
        next.prev = elem;
        elem.next = next;
        next.parent = parent;
        if (currNext) {
          currNext.prev = next;
          if (parent) {
            var childs = parent.children;
            childs.splice(childs.lastIndexOf(currNext), 0, next);
          }
        } else if (parent) {
          parent.children.push(next);
        }
      }
      exports.append = append;
      function prependChild(elem, child) {
        removeElement(child);
        child.parent = elem;
        child.prev = null;
        if (elem.children.unshift(child) !== 1) {
          var sibling = elem.children[1];
          sibling.prev = child;
          child.next = sibling;
        } else {
          child.next = null;
        }
      }
      exports.prependChild = prependChild;
      function prepend(elem, prev) {
        removeElement(prev);
        var parent = elem.parent;
        if (parent) {
          var childs = parent.children;
          childs.splice(childs.indexOf(elem), 0, prev);
        }
        if (elem.prev) {
          elem.prev.next = prev;
        }
        prev.parent = parent;
        prev.prev = elem.prev;
        prev.next = elem;
        elem.prev = prev;
      }
      exports.prepend = prepend;
    }
  });

  // node_modules/.pnpm/domutils@2.8.0/node_modules/domutils/lib/querying.js
  var require_querying = __commonJS({
    "node_modules/.pnpm/domutils@2.8.0/node_modules/domutils/lib/querying.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.findAll = exports.existsOne = exports.findOne = exports.findOneChild = exports.find = exports.filter = void 0;
      var domhandler_1 = require_lib2();
      function filter(test, node, recurse, limit) {
        if (recurse === void 0) {
          recurse = true;
        }
        if (limit === void 0) {
          limit = Infinity;
        }
        if (!Array.isArray(node))
          node = [node];
        return find(test, node, recurse, limit);
      }
      exports.filter = filter;
      function find(test, nodes, recurse, limit) {
        var result = [];
        for (var _i = 0, nodes_1 = nodes; _i < nodes_1.length; _i++) {
          var elem = nodes_1[_i];
          if (test(elem)) {
            result.push(elem);
            if (--limit <= 0)
              break;
          }
          if (recurse && (0, domhandler_1.hasChildren)(elem) && elem.children.length > 0) {
            var children = find(test, elem.children, recurse, limit);
            result.push.apply(result, children);
            limit -= children.length;
            if (limit <= 0)
              break;
          }
        }
        return result;
      }
      exports.find = find;
      function findOneChild(test, nodes) {
        return nodes.find(test);
      }
      exports.findOneChild = findOneChild;
      function findOne(test, nodes, recurse) {
        if (recurse === void 0) {
          recurse = true;
        }
        var elem = null;
        for (var i = 0; i < nodes.length && !elem; i++) {
          var checked = nodes[i];
          if (!(0, domhandler_1.isTag)(checked)) {
            continue;
          } else if (test(checked)) {
            elem = checked;
          } else if (recurse && checked.children.length > 0) {
            elem = findOne(test, checked.children);
          }
        }
        return elem;
      }
      exports.findOne = findOne;
      function existsOne(test, nodes) {
        return nodes.some(function(checked) {
          return (0, domhandler_1.isTag)(checked) && (test(checked) || checked.children.length > 0 && existsOne(test, checked.children));
        });
      }
      exports.existsOne = existsOne;
      function findAll(test, nodes) {
        var _a;
        var result = [];
        var stack = nodes.filter(domhandler_1.isTag);
        var elem;
        while (elem = stack.shift()) {
          var children = (_a = elem.children) === null || _a === void 0 ? void 0 : _a.filter(domhandler_1.isTag);
          if (children && children.length > 0) {
            stack.unshift.apply(stack, children);
          }
          if (test(elem))
            result.push(elem);
        }
        return result;
      }
      exports.findAll = findAll;
    }
  });

  // node_modules/.pnpm/domutils@2.8.0/node_modules/domutils/lib/legacy.js
  var require_legacy2 = __commonJS({
    "node_modules/.pnpm/domutils@2.8.0/node_modules/domutils/lib/legacy.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.getElementsByTagType = exports.getElementsByTagName = exports.getElementById = exports.getElements = exports.testElement = void 0;
      var domhandler_1 = require_lib2();
      var querying_1 = require_querying();
      var Checks = {
        tag_name: function(name) {
          if (typeof name === "function") {
            return function(elem) {
              return (0, domhandler_1.isTag)(elem) && name(elem.name);
            };
          } else if (name === "*") {
            return domhandler_1.isTag;
          }
          return function(elem) {
            return (0, domhandler_1.isTag)(elem) && elem.name === name;
          };
        },
        tag_type: function(type) {
          if (typeof type === "function") {
            return function(elem) {
              return type(elem.type);
            };
          }
          return function(elem) {
            return elem.type === type;
          };
        },
        tag_contains: function(data) {
          if (typeof data === "function") {
            return function(elem) {
              return (0, domhandler_1.isText)(elem) && data(elem.data);
            };
          }
          return function(elem) {
            return (0, domhandler_1.isText)(elem) && elem.data === data;
          };
        }
      };
      function getAttribCheck(attrib, value) {
        if (typeof value === "function") {
          return function(elem) {
            return (0, domhandler_1.isTag)(elem) && value(elem.attribs[attrib]);
          };
        }
        return function(elem) {
          return (0, domhandler_1.isTag)(elem) && elem.attribs[attrib] === value;
        };
      }
      function combineFuncs(a, b) {
        return function(elem) {
          return a(elem) || b(elem);
        };
      }
      function compileTest(options) {
        var funcs = Object.keys(options).map(function(key) {
          var value = options[key];
          return Object.prototype.hasOwnProperty.call(Checks, key) ? Checks[key](value) : getAttribCheck(key, value);
        });
        return funcs.length === 0 ? null : funcs.reduce(combineFuncs);
      }
      function testElement(options, node) {
        var test = compileTest(options);
        return test ? test(node) : true;
      }
      exports.testElement = testElement;
      function getElements(options, nodes, recurse, limit) {
        if (limit === void 0) {
          limit = Infinity;
        }
        var test = compileTest(options);
        return test ? (0, querying_1.filter)(test, nodes, recurse, limit) : [];
      }
      exports.getElements = getElements;
      function getElementById(id, nodes, recurse) {
        if (recurse === void 0) {
          recurse = true;
        }
        if (!Array.isArray(nodes))
          nodes = [nodes];
        return (0, querying_1.findOne)(getAttribCheck("id", id), nodes, recurse);
      }
      exports.getElementById = getElementById;
      function getElementsByTagName(tagName, nodes, recurse, limit) {
        if (recurse === void 0) {
          recurse = true;
        }
        if (limit === void 0) {
          limit = Infinity;
        }
        return (0, querying_1.filter)(Checks.tag_name(tagName), nodes, recurse, limit);
      }
      exports.getElementsByTagName = getElementsByTagName;
      function getElementsByTagType(type, nodes, recurse, limit) {
        if (recurse === void 0) {
          recurse = true;
        }
        if (limit === void 0) {
          limit = Infinity;
        }
        return (0, querying_1.filter)(Checks.tag_type(type), nodes, recurse, limit);
      }
      exports.getElementsByTagType = getElementsByTagType;
    }
  });

  // node_modules/.pnpm/domutils@2.8.0/node_modules/domutils/lib/helpers.js
  var require_helpers = __commonJS({
    "node_modules/.pnpm/domutils@2.8.0/node_modules/domutils/lib/helpers.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.uniqueSort = exports.compareDocumentPosition = exports.removeSubsets = void 0;
      var domhandler_1 = require_lib2();
      function removeSubsets(nodes) {
        var idx = nodes.length;
        while (--idx >= 0) {
          var node = nodes[idx];
          if (idx > 0 && nodes.lastIndexOf(node, idx - 1) >= 0) {
            nodes.splice(idx, 1);
            continue;
          }
          for (var ancestor = node.parent; ancestor; ancestor = ancestor.parent) {
            if (nodes.includes(ancestor)) {
              nodes.splice(idx, 1);
              break;
            }
          }
        }
        return nodes;
      }
      exports.removeSubsets = removeSubsets;
      function compareDocumentPosition(nodeA, nodeB) {
        var aParents = [];
        var bParents = [];
        if (nodeA === nodeB) {
          return 0;
        }
        var current = (0, domhandler_1.hasChildren)(nodeA) ? nodeA : nodeA.parent;
        while (current) {
          aParents.unshift(current);
          current = current.parent;
        }
        current = (0, domhandler_1.hasChildren)(nodeB) ? nodeB : nodeB.parent;
        while (current) {
          bParents.unshift(current);
          current = current.parent;
        }
        var maxIdx = Math.min(aParents.length, bParents.length);
        var idx = 0;
        while (idx < maxIdx && aParents[idx] === bParents[idx]) {
          idx++;
        }
        if (idx === 0) {
          return 1;
        }
        var sharedParent = aParents[idx - 1];
        var siblings = sharedParent.children;
        var aSibling = aParents[idx];
        var bSibling = bParents[idx];
        if (siblings.indexOf(aSibling) > siblings.indexOf(bSibling)) {
          if (sharedParent === nodeB) {
            return 4 | 16;
          }
          return 4;
        }
        if (sharedParent === nodeA) {
          return 2 | 8;
        }
        return 2;
      }
      exports.compareDocumentPosition = compareDocumentPosition;
      function uniqueSort(nodes) {
        nodes = nodes.filter(function(node, i, arr) {
          return !arr.includes(node, i + 1);
        });
        nodes.sort(function(a, b) {
          var relative = compareDocumentPosition(a, b);
          if (relative & 2) {
            return -1;
          } else if (relative & 4) {
            return 1;
          }
          return 0;
        });
        return nodes;
      }
      exports.uniqueSort = uniqueSort;
    }
  });

  // node_modules/.pnpm/domutils@2.8.0/node_modules/domutils/lib/feeds.js
  var require_feeds = __commonJS({
    "node_modules/.pnpm/domutils@2.8.0/node_modules/domutils/lib/feeds.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.getFeed = void 0;
      var stringify_1 = require_stringify();
      var legacy_1 = require_legacy2();
      function getFeed(doc) {
        var feedRoot = getOneElement(isValidFeed, doc);
        return !feedRoot ? null : feedRoot.name === "feed" ? getAtomFeed(feedRoot) : getRssFeed(feedRoot);
      }
      exports.getFeed = getFeed;
      function getAtomFeed(feedRoot) {
        var _a;
        var childs = feedRoot.children;
        var feed = {
          type: "atom",
          items: (0, legacy_1.getElementsByTagName)("entry", childs).map(function(item) {
            var _a2;
            var children = item.children;
            var entry = { media: getMediaElements(children) };
            addConditionally(entry, "id", "id", children);
            addConditionally(entry, "title", "title", children);
            var href2 = (_a2 = getOneElement("link", children)) === null || _a2 === void 0 ? void 0 : _a2.attribs.href;
            if (href2) {
              entry.link = href2;
            }
            var description = fetch2("summary", children) || fetch2("content", children);
            if (description) {
              entry.description = description;
            }
            var pubDate = fetch2("updated", children);
            if (pubDate) {
              entry.pubDate = new Date(pubDate);
            }
            return entry;
          })
        };
        addConditionally(feed, "id", "id", childs);
        addConditionally(feed, "title", "title", childs);
        var href = (_a = getOneElement("link", childs)) === null || _a === void 0 ? void 0 : _a.attribs.href;
        if (href) {
          feed.link = href;
        }
        addConditionally(feed, "description", "subtitle", childs);
        var updated = fetch2("updated", childs);
        if (updated) {
          feed.updated = new Date(updated);
        }
        addConditionally(feed, "author", "email", childs, true);
        return feed;
      }
      function getRssFeed(feedRoot) {
        var _a, _b;
        var childs = (_b = (_a = getOneElement("channel", feedRoot.children)) === null || _a === void 0 ? void 0 : _a.children) !== null && _b !== void 0 ? _b : [];
        var feed = {
          type: feedRoot.name.substr(0, 3),
          id: "",
          items: (0, legacy_1.getElementsByTagName)("item", feedRoot.children).map(function(item) {
            var children = item.children;
            var entry = { media: getMediaElements(children) };
            addConditionally(entry, "id", "guid", children);
            addConditionally(entry, "title", "title", children);
            addConditionally(entry, "link", "link", children);
            addConditionally(entry, "description", "description", children);
            var pubDate = fetch2("pubDate", children);
            if (pubDate)
              entry.pubDate = new Date(pubDate);
            return entry;
          })
        };
        addConditionally(feed, "title", "title", childs);
        addConditionally(feed, "link", "link", childs);
        addConditionally(feed, "description", "description", childs);
        var updated = fetch2("lastBuildDate", childs);
        if (updated) {
          feed.updated = new Date(updated);
        }
        addConditionally(feed, "author", "managingEditor", childs, true);
        return feed;
      }
      var MEDIA_KEYS_STRING = ["url", "type", "lang"];
      var MEDIA_KEYS_INT = [
        "fileSize",
        "bitrate",
        "framerate",
        "samplingrate",
        "channels",
        "duration",
        "height",
        "width"
      ];
      function getMediaElements(where) {
        return (0, legacy_1.getElementsByTagName)("media:content", where).map(function(elem) {
          var attribs = elem.attribs;
          var media = {
            medium: attribs.medium,
            isDefault: !!attribs.isDefault
          };
          for (var _i = 0, MEDIA_KEYS_STRING_1 = MEDIA_KEYS_STRING; _i < MEDIA_KEYS_STRING_1.length; _i++) {
            var attrib = MEDIA_KEYS_STRING_1[_i];
            if (attribs[attrib]) {
              media[attrib] = attribs[attrib];
            }
          }
          for (var _a = 0, MEDIA_KEYS_INT_1 = MEDIA_KEYS_INT; _a < MEDIA_KEYS_INT_1.length; _a++) {
            var attrib = MEDIA_KEYS_INT_1[_a];
            if (attribs[attrib]) {
              media[attrib] = parseInt(attribs[attrib], 10);
            }
          }
          if (attribs.expression) {
            media.expression = attribs.expression;
          }
          return media;
        });
      }
      function getOneElement(tagName, node) {
        return (0, legacy_1.getElementsByTagName)(tagName, node, true, 1)[0];
      }
      function fetch2(tagName, where, recurse) {
        if (recurse === void 0) {
          recurse = false;
        }
        return (0, stringify_1.textContent)((0, legacy_1.getElementsByTagName)(tagName, where, recurse, 1)).trim();
      }
      function addConditionally(obj, prop, tagName, where, recurse) {
        if (recurse === void 0) {
          recurse = false;
        }
        var val = fetch2(tagName, where, recurse);
        if (val)
          obj[prop] = val;
      }
      function isValidFeed(value) {
        return value === "rss" || value === "feed" || value === "rdf:RDF";
      }
    }
  });

  // node_modules/.pnpm/domutils@2.8.0/node_modules/domutils/lib/index.js
  var require_lib5 = __commonJS({
    "node_modules/.pnpm/domutils@2.8.0/node_modules/domutils/lib/index.js"(exports) {
      "use strict";
      var __createBinding = exports && exports.__createBinding || (Object.create ? function(o, m, k, k2) {
        if (k2 === void 0)
          k2 = k;
        Object.defineProperty(o, k2, { enumerable: true, get: function() {
          return m[k];
        } });
      } : function(o, m, k, k2) {
        if (k2 === void 0)
          k2 = k;
        o[k2] = m[k];
      });
      var __exportStar = exports && exports.__exportStar || function(m, exports2) {
        for (var p in m)
          if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports2, p))
            __createBinding(exports2, m, p);
      };
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.hasChildren = exports.isDocument = exports.isComment = exports.isText = exports.isCDATA = exports.isTag = void 0;
      __exportStar(require_stringify(), exports);
      __exportStar(require_traversal(), exports);
      __exportStar(require_manipulation(), exports);
      __exportStar(require_querying(), exports);
      __exportStar(require_legacy2(), exports);
      __exportStar(require_helpers(), exports);
      __exportStar(require_feeds(), exports);
      var domhandler_1 = require_lib2();
      Object.defineProperty(exports, "isTag", { enumerable: true, get: function() {
        return domhandler_1.isTag;
      } });
      Object.defineProperty(exports, "isCDATA", { enumerable: true, get: function() {
        return domhandler_1.isCDATA;
      } });
      Object.defineProperty(exports, "isText", { enumerable: true, get: function() {
        return domhandler_1.isText;
      } });
      Object.defineProperty(exports, "isComment", { enumerable: true, get: function() {
        return domhandler_1.isComment;
      } });
      Object.defineProperty(exports, "isDocument", { enumerable: true, get: function() {
        return domhandler_1.isDocument;
      } });
      Object.defineProperty(exports, "hasChildren", { enumerable: true, get: function() {
        return domhandler_1.hasChildren;
      } });
    }
  });

  // node_modules/.pnpm/htmlparser2@6.1.0/node_modules/htmlparser2/lib/FeedHandler.js
  var require_FeedHandler = __commonJS({
    "node_modules/.pnpm/htmlparser2@6.1.0/node_modules/htmlparser2/lib/FeedHandler.js"(exports) {
      "use strict";
      var __extends = exports && exports.__extends || function() {
        var extendStatics = function(d, b) {
          extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
            d2.__proto__ = b2;
          } || function(d2, b2) {
            for (var p in b2)
              if (Object.prototype.hasOwnProperty.call(b2, p))
                d2[p] = b2[p];
          };
          return extendStatics(d, b);
        };
        return function(d, b) {
          if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
          extendStatics(d, b);
          function __() {
            this.constructor = d;
          }
          d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
        };
      }();
      var __createBinding = exports && exports.__createBinding || (Object.create ? function(o, m, k, k2) {
        if (k2 === void 0)
          k2 = k;
        Object.defineProperty(o, k2, { enumerable: true, get: function() {
          return m[k];
        } });
      } : function(o, m, k, k2) {
        if (k2 === void 0)
          k2 = k;
        o[k2] = m[k];
      });
      var __setModuleDefault = exports && exports.__setModuleDefault || (Object.create ? function(o, v) {
        Object.defineProperty(o, "default", { enumerable: true, value: v });
      } : function(o, v) {
        o["default"] = v;
      });
      var __importStar = exports && exports.__importStar || function(mod) {
        if (mod && mod.__esModule)
          return mod;
        var result = {};
        if (mod != null) {
          for (var k in mod)
            if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k))
              __createBinding(result, mod, k);
        }
        __setModuleDefault(result, mod);
        return result;
      };
      var __importDefault = exports && exports.__importDefault || function(mod) {
        return mod && mod.__esModule ? mod : { "default": mod };
      };
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.parseFeed = exports.FeedHandler = void 0;
      var domhandler_1 = __importDefault(require_lib2());
      var DomUtils = __importStar(require_lib5());
      var Parser_1 = require_Parser();
      var FeedItemMediaMedium;
      (function(FeedItemMediaMedium2) {
        FeedItemMediaMedium2[FeedItemMediaMedium2["image"] = 0] = "image";
        FeedItemMediaMedium2[FeedItemMediaMedium2["audio"] = 1] = "audio";
        FeedItemMediaMedium2[FeedItemMediaMedium2["video"] = 2] = "video";
        FeedItemMediaMedium2[FeedItemMediaMedium2["document"] = 3] = "document";
        FeedItemMediaMedium2[FeedItemMediaMedium2["executable"] = 4] = "executable";
      })(FeedItemMediaMedium || (FeedItemMediaMedium = {}));
      var FeedItemMediaExpression;
      (function(FeedItemMediaExpression2) {
        FeedItemMediaExpression2[FeedItemMediaExpression2["sample"] = 0] = "sample";
        FeedItemMediaExpression2[FeedItemMediaExpression2["full"] = 1] = "full";
        FeedItemMediaExpression2[FeedItemMediaExpression2["nonstop"] = 2] = "nonstop";
      })(FeedItemMediaExpression || (FeedItemMediaExpression = {}));
      var FeedHandler = (
        /** @class */
        function(_super) {
          __extends(FeedHandler2, _super);
          function FeedHandler2(callback, options) {
            var _this = this;
            if (typeof callback === "object") {
              callback = void 0;
              options = callback;
            }
            _this = _super.call(this, callback, options) || this;
            return _this;
          }
          FeedHandler2.prototype.onend = function() {
            var _a, _b;
            var feedRoot = getOneElement(isValidFeed, this.dom);
            if (!feedRoot) {
              this.handleCallback(new Error("couldn't find root of feed"));
              return;
            }
            var feed = {};
            if (feedRoot.name === "feed") {
              var childs = feedRoot.children;
              feed.type = "atom";
              addConditionally(feed, "id", "id", childs);
              addConditionally(feed, "title", "title", childs);
              var href = getAttribute("href", getOneElement("link", childs));
              if (href) {
                feed.link = href;
              }
              addConditionally(feed, "description", "subtitle", childs);
              var updated = fetch2("updated", childs);
              if (updated) {
                feed.updated = new Date(updated);
              }
              addConditionally(feed, "author", "email", childs, true);
              feed.items = getElements("entry", childs).map(function(item) {
                var entry = {};
                var children = item.children;
                addConditionally(entry, "id", "id", children);
                addConditionally(entry, "title", "title", children);
                var href2 = getAttribute("href", getOneElement("link", children));
                if (href2) {
                  entry.link = href2;
                }
                var description = fetch2("summary", children) || fetch2("content", children);
                if (description) {
                  entry.description = description;
                }
                var pubDate = fetch2("updated", children);
                if (pubDate) {
                  entry.pubDate = new Date(pubDate);
                }
                entry.media = getMediaElements(children);
                return entry;
              });
            } else {
              var childs = (_b = (_a = getOneElement("channel", feedRoot.children)) === null || _a === void 0 ? void 0 : _a.children) !== null && _b !== void 0 ? _b : [];
              feed.type = feedRoot.name.substr(0, 3);
              feed.id = "";
              addConditionally(feed, "title", "title", childs);
              addConditionally(feed, "link", "link", childs);
              addConditionally(feed, "description", "description", childs);
              var updated = fetch2("lastBuildDate", childs);
              if (updated) {
                feed.updated = new Date(updated);
              }
              addConditionally(feed, "author", "managingEditor", childs, true);
              feed.items = getElements("item", feedRoot.children).map(function(item) {
                var entry = {};
                var children = item.children;
                addConditionally(entry, "id", "guid", children);
                addConditionally(entry, "title", "title", children);
                addConditionally(entry, "link", "link", children);
                addConditionally(entry, "description", "description", children);
                var pubDate = fetch2("pubDate", children);
                if (pubDate)
                  entry.pubDate = new Date(pubDate);
                entry.media = getMediaElements(children);
                return entry;
              });
            }
            this.feed = feed;
            this.handleCallback(null);
          };
          return FeedHandler2;
        }(domhandler_1.default)
      );
      exports.FeedHandler = FeedHandler;
      function getMediaElements(where) {
        return getElements("media:content", where).map(function(elem) {
          var media = {
            medium: elem.attribs.medium,
            isDefault: !!elem.attribs.isDefault
          };
          if (elem.attribs.url) {
            media.url = elem.attribs.url;
          }
          if (elem.attribs.fileSize) {
            media.fileSize = parseInt(elem.attribs.fileSize, 10);
          }
          if (elem.attribs.type) {
            media.type = elem.attribs.type;
          }
          if (elem.attribs.expression) {
            media.expression = elem.attribs.expression;
          }
          if (elem.attribs.bitrate) {
            media.bitrate = parseInt(elem.attribs.bitrate, 10);
          }
          if (elem.attribs.framerate) {
            media.framerate = parseInt(elem.attribs.framerate, 10);
          }
          if (elem.attribs.samplingrate) {
            media.samplingrate = parseInt(elem.attribs.samplingrate, 10);
          }
          if (elem.attribs.channels) {
            media.channels = parseInt(elem.attribs.channels, 10);
          }
          if (elem.attribs.duration) {
            media.duration = parseInt(elem.attribs.duration, 10);
          }
          if (elem.attribs.height) {
            media.height = parseInt(elem.attribs.height, 10);
          }
          if (elem.attribs.width) {
            media.width = parseInt(elem.attribs.width, 10);
          }
          if (elem.attribs.lang) {
            media.lang = elem.attribs.lang;
          }
          return media;
        });
      }
      function getElements(tagName, where) {
        return DomUtils.getElementsByTagName(tagName, where, true);
      }
      function getOneElement(tagName, node) {
        return DomUtils.getElementsByTagName(tagName, node, true, 1)[0];
      }
      function fetch2(tagName, where, recurse) {
        if (recurse === void 0) {
          recurse = false;
        }
        return DomUtils.getText(DomUtils.getElementsByTagName(tagName, where, recurse, 1)).trim();
      }
      function getAttribute(name, elem) {
        if (!elem) {
          return null;
        }
        var attribs = elem.attribs;
        return attribs[name];
      }
      function addConditionally(obj, prop, what, where, recurse) {
        if (recurse === void 0) {
          recurse = false;
        }
        var tmp = fetch2(what, where, recurse);
        if (tmp)
          obj[prop] = tmp;
      }
      function isValidFeed(value) {
        return value === "rss" || value === "feed" || value === "rdf:RDF";
      }
      function parseFeed(feed, options) {
        if (options === void 0) {
          options = { xmlMode: true };
        }
        var handler = new FeedHandler(options);
        new Parser_1.Parser(handler, options).end(feed);
        return handler.feed;
      }
      exports.parseFeed = parseFeed;
    }
  });

  // node_modules/.pnpm/htmlparser2@6.1.0/node_modules/htmlparser2/lib/index.js
  var require_lib6 = __commonJS({
    "node_modules/.pnpm/htmlparser2@6.1.0/node_modules/htmlparser2/lib/index.js"(exports) {
      "use strict";
      var __createBinding = exports && exports.__createBinding || (Object.create ? function(o, m, k, k2) {
        if (k2 === void 0)
          k2 = k;
        Object.defineProperty(o, k2, { enumerable: true, get: function() {
          return m[k];
        } });
      } : function(o, m, k, k2) {
        if (k2 === void 0)
          k2 = k;
        o[k2] = m[k];
      });
      var __setModuleDefault = exports && exports.__setModuleDefault || (Object.create ? function(o, v) {
        Object.defineProperty(o, "default", { enumerable: true, value: v });
      } : function(o, v) {
        o["default"] = v;
      });
      var __importStar = exports && exports.__importStar || function(mod) {
        if (mod && mod.__esModule)
          return mod;
        var result = {};
        if (mod != null) {
          for (var k in mod)
            if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k))
              __createBinding(result, mod, k);
        }
        __setModuleDefault(result, mod);
        return result;
      };
      var __exportStar = exports && exports.__exportStar || function(m, exports2) {
        for (var p in m)
          if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports2, p))
            __createBinding(exports2, m, p);
      };
      var __importDefault = exports && exports.__importDefault || function(mod) {
        return mod && mod.__esModule ? mod : { "default": mod };
      };
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.RssHandler = exports.DefaultHandler = exports.DomUtils = exports.ElementType = exports.Tokenizer = exports.createDomStream = exports.parseDOM = exports.parseDocument = exports.DomHandler = exports.Parser = void 0;
      var Parser_1 = require_Parser();
      Object.defineProperty(exports, "Parser", { enumerable: true, get: function() {
        return Parser_1.Parser;
      } });
      var domhandler_1 = require_lib2();
      Object.defineProperty(exports, "DomHandler", { enumerable: true, get: function() {
        return domhandler_1.DomHandler;
      } });
      Object.defineProperty(exports, "DefaultHandler", { enumerable: true, get: function() {
        return domhandler_1.DomHandler;
      } });
      function parseDocument(data, options) {
        var handler = new domhandler_1.DomHandler(void 0, options);
        new Parser_1.Parser(handler, options).end(data);
        return handler.root;
      }
      exports.parseDocument = parseDocument;
      function parseDOM(data, options) {
        return parseDocument(data, options).children;
      }
      exports.parseDOM = parseDOM;
      function createDomStream(cb, options, elementCb) {
        var handler = new domhandler_1.DomHandler(cb, options, elementCb);
        return new Parser_1.Parser(handler, options);
      }
      exports.createDomStream = createDomStream;
      var Tokenizer_1 = require_Tokenizer();
      Object.defineProperty(exports, "Tokenizer", { enumerable: true, get: function() {
        return __importDefault(Tokenizer_1).default;
      } });
      var ElementType = __importStar(require_lib());
      exports.ElementType = ElementType;
      __exportStar(require_FeedHandler(), exports);
      exports.DomUtils = __importStar(require_lib5());
      var FeedHandler_1 = require_FeedHandler();
      Object.defineProperty(exports, "RssHandler", { enumerable: true, get: function() {
        return FeedHandler_1.FeedHandler;
      } });
    }
  });

  // node_modules/.pnpm/utila@0.4.0/node_modules/utila/lib/array.js
  var require_array = __commonJS({
    "node_modules/.pnpm/utila@0.4.0/node_modules/utila/lib/array.js"(exports, module) {
      var array;
      module.exports = array = {
        /*
        	Tries to turn anything into an array.
        */
        from: function(r) {
          return Array.prototype.slice.call(r);
        },
        /*
        	Clone of an array. Properties will be shallow copies.
        */
        simpleClone: function(a) {
          return a.slice(0);
        },
        shallowEqual: function(a1, a2) {
          var i, val, _i, _len;
          if (!(Array.isArray(a1) && Array.isArray(a2) && a1.length === a2.length)) {
            return false;
          }
          for (i = _i = 0, _len = a1.length; _i < _len; i = ++_i) {
            val = a1[i];
            if (a2[i] !== val) {
              return false;
            }
          }
          return true;
        },
        pluck: function(a, i) {
          var index, value, _i, _len;
          if (a.length < 1) {
            return a;
          }
          for (index = _i = 0, _len = a.length; _i < _len; index = ++_i) {
            value = a[index];
            if (index > i) {
              a[index - 1] = a[index];
            }
          }
          a.length = a.length - 1;
          return a;
        },
        pluckItem: function(a, item) {
          var index, removed, value, _i, _len;
          if (a.length < 1) {
            return a;
          }
          removed = 0;
          for (index = _i = 0, _len = a.length; _i < _len; index = ++_i) {
            value = a[index];
            if (value === item) {
              removed++;
              continue;
            }
            if (removed !== 0) {
              a[index - removed] = a[index];
            }
          }
          if (removed > 0) {
            a.length = a.length - removed;
          }
          return a;
        },
        pluckOneItem: function(a, item) {
          var index, reached, value, _i, _len;
          if (a.length < 1) {
            return a;
          }
          reached = false;
          for (index = _i = 0, _len = a.length; _i < _len; index = ++_i) {
            value = a[index];
            if (!reached) {
              if (value === item) {
                reached = true;
                continue;
              }
            } else {
              a[index - 1] = a[index];
            }
          }
          if (reached) {
            a.length = a.length - 1;
          }
          return a;
        },
        pluckByCallback: function(a, cb) {
          var index, removed, value, _i, _len;
          if (a.length < 1) {
            return a;
          }
          removed = 0;
          for (index = _i = 0, _len = a.length; _i < _len; index = ++_i) {
            value = a[index];
            if (cb(value, index)) {
              removed++;
              continue;
            }
            if (removed !== 0) {
              a[index - removed] = a[index];
            }
          }
          if (removed > 0) {
            a.length = a.length - removed;
          }
          return a;
        },
        pluckMultiple: function(array2, indexesToRemove) {
          var i, removedSoFar, _i, _len;
          if (array2.length < 1) {
            return array2;
          }
          removedSoFar = 0;
          indexesToRemove.sort();
          for (_i = 0, _len = indexesToRemove.length; _i < _len; _i++) {
            i = indexesToRemove[_i];
            this.pluck(array2, i - removedSoFar);
            removedSoFar++;
          }
          return array2;
        },
        injectByCallback: function(a, toInject, shouldInject) {
          var i, len, val, valA, valB, _i, _len;
          valA = null;
          valB = null;
          len = a.length;
          if (len < 1) {
            a.push(toInject);
            return a;
          }
          for (i = _i = 0, _len = a.length; _i < _len; i = ++_i) {
            val = a[i];
            valA = valB;
            valB = val;
            if (shouldInject(valA, valB, toInject)) {
              return a.splice(i, 0, toInject);
            }
          }
          a.push(toInject);
          return a;
        },
        injectInIndex: function(a, index, toInject) {
          var i, len, toPut, toPutNext;
          len = a.length;
          i = index;
          if (len < 1) {
            a.push(toInject);
            return a;
          }
          toPut = toInject;
          toPutNext = null;
          for (; i <= len; i++) {
            toPutNext = a[i];
            a[i] = toPut;
            toPut = toPutNext;
          }
          ;
          return null;
        }
      };
    }
  });

  // node_modules/.pnpm/utila@0.4.0/node_modules/utila/lib/classic.js
  var require_classic = __commonJS({
    "node_modules/.pnpm/utila@0.4.0/node_modules/utila/lib/classic.js"(exports, module) {
      var classic;
      var __slice = [].slice;
      module.exports = classic = {};
      classic.implement = function() {
        var classProto, classReference, desc, member, mixin, mixins, _i, _j, _len;
        mixins = 2 <= arguments.length ? __slice.call(arguments, 0, _i = arguments.length - 1) : (_i = 0, []), classReference = arguments[_i++];
        for (_j = 0, _len = mixins.length; _j < _len; _j++) {
          mixin = mixins[_j];
          classProto = classReference.prototype;
          for (member in mixin.prototype) {
            if (!Object.getOwnPropertyDescriptor(classProto, member)) {
              desc = Object.getOwnPropertyDescriptor(mixin.prototype, member);
              Object.defineProperty(classProto, member, desc);
            }
          }
        }
        return classReference;
      };
      classic.mix = function() {
        var classProto, classReference, desc, member, mixin, mixins, _i, _j, _len;
        mixins = 2 <= arguments.length ? __slice.call(arguments, 0, _i = arguments.length - 1) : (_i = 0, []), classReference = arguments[_i++];
        classProto = classReference.prototype;
        classReference.__mixinCloners = [];
        classReference.__applyClonersFor = function(instance, args) {
          var cloner, _j2, _len2, _ref;
          if (args == null) {
            args = null;
          }
          _ref = classReference.__mixinCloners;
          for (_j2 = 0, _len2 = _ref.length; _j2 < _len2; _j2++) {
            cloner = _ref[_j2];
            cloner.apply(instance, args);
          }
        };
        classReference.__mixinInitializers = [];
        classReference.__initMixinsFor = function(instance, args) {
          var initializer, _j2, _len2, _ref;
          if (args == null) {
            args = null;
          }
          _ref = classReference.__mixinInitializers;
          for (_j2 = 0, _len2 = _ref.length; _j2 < _len2; _j2++) {
            initializer = _ref[_j2];
            initializer.apply(instance, args);
          }
        };
        classReference.__mixinQuitters = [];
        classReference.__applyQuittersFor = function(instance, args) {
          var quitter, _j2, _len2, _ref;
          if (args == null) {
            args = null;
          }
          _ref = classReference.__mixinQuitters;
          for (_j2 = 0, _len2 = _ref.length; _j2 < _len2; _j2++) {
            quitter = _ref[_j2];
            quitter.apply(instance, args);
          }
        };
        for (_j = 0, _len = mixins.length; _j < _len; _j++) {
          mixin = mixins[_j];
          if (!(mixin.constructor instanceof Function)) {
            throw Error("Mixin should be a function");
          }
          for (member in mixin.prototype) {
            if (member.substr(0, 11) === "__initMixin") {
              classReference.__mixinInitializers.push(mixin.prototype[member]);
              continue;
            } else if (member.substr(0, 11) === "__clonerFor") {
              classReference.__mixinCloners.push(mixin.prototype[member]);
              continue;
            } else if (member.substr(0, 12) === "__quitterFor") {
              classReference.__mixinQuitters.push(mixin.prototype[member]);
              continue;
            }
            if (!Object.getOwnPropertyDescriptor(classProto, member)) {
              desc = Object.getOwnPropertyDescriptor(mixin.prototype, member);
              Object.defineProperty(classProto, member, desc);
            }
          }
        }
        return classReference;
      };
    }
  });

  // node_modules/.pnpm/utila@0.4.0/node_modules/utila/lib/_common.js
  var require_common = __commonJS({
    "node_modules/.pnpm/utila@0.4.0/node_modules/utila/lib/_common.js"(exports, module) {
      var common;
      module.exports = common = {
        /*
        	Checks to see if o is an object, and it isn't an instance
        	of some class.
        */
        isBareObject: function(o) {
          if (o != null && o.constructor === Object) {
            return true;
          }
          return false;
        },
        /*
        	Returns type of an object, including:
        	undefined, null, string, number, array,
        	arguments, element, textnode, whitespace, and object
        */
        typeOf: function(item) {
          var _ref;
          if (item === null) {
            return "null";
          }
          if (typeof item !== "object") {
            return typeof item;
          }
          if (Array.isArray(item)) {
            return "array";
          }
          if (item.nodeName) {
            if (item.nodeType === 1) {
              return "element";
            }
            if (item.nodeType === 3) {
              return (_ref = /\S/.test(item.nodeValue)) != null ? _ref : {
                "textnode": "whitespace"
              };
            }
          } else if (typeof item.length === "number") {
            if (item.callee) {
              return "arguments";
            }
          }
          return typeof item;
        },
        clone: function(item, includePrototype) {
          if (includePrototype == null) {
            includePrototype = false;
          }
          switch (common.typeOf(item)) {
            case "array":
              return common._cloneArray(item, includePrototype);
            case "object":
              return common._cloneObject(item, includePrototype);
            default:
              return item;
          }
        },
        /*
        	Deep clone of an object.
        	From MooTools
        */
        _cloneObject: function(o, includePrototype) {
          var clone, key;
          if (includePrototype == null) {
            includePrototype = false;
          }
          if (common.isBareObject(o)) {
            clone = {};
            for (key in o) {
              clone[key] = common.clone(o[key], includePrototype);
            }
            return clone;
          } else {
            if (!includePrototype) {
              return o;
            }
            if (o instanceof Function) {
              return o;
            }
            clone = Object.create(o.constructor.prototype);
            for (key in o) {
              if (o.hasOwnProperty(key)) {
                clone[key] = common.clone(o[key], includePrototype);
              }
            }
            return clone;
          }
        },
        /*
        	Deep clone of an array.
        	From MooTools
        */
        _cloneArray: function(a, includePrototype) {
          var clone, i;
          if (includePrototype == null) {
            includePrototype = false;
          }
          i = a.length;
          clone = new Array(i);
          while (i--) {
            clone[i] = common.clone(a[i], includePrototype);
          }
          return clone;
        }
      };
    }
  });

  // node_modules/.pnpm/utila@0.4.0/node_modules/utila/lib/object.js
  var require_object = __commonJS({
    "node_modules/.pnpm/utila@0.4.0/node_modules/utila/lib/object.js"(exports, module) {
      var object;
      var _common;
      var __hasProp = {}.hasOwnProperty;
      _common = require_common();
      module.exports = object = {
        isBareObject: _common.isBareObject.bind(_common),
        /*
        	if object is an instance of a class
        */
        isInstance: function(what) {
          return !this.isBareObject(what);
        },
        /*
        	Alias to _common.typeOf
        */
        typeOf: _common.typeOf.bind(_common),
        /*
        	Alias to _common.clone
        */
        clone: _common.clone.bind(_common),
        /*
        	Empties an object of its properties.
        */
        empty: function(o) {
          var prop;
          for (prop in o) {
            if (o.hasOwnProperty(prop)) {
              delete o[prop];
            }
          }
          return o;
        },
        /*
        	Empties an object. Doesn't check for hasOwnProperty, so it's a tiny
        	bit faster. Use it for plain objects.
        */
        fastEmpty: function(o) {
          var property;
          for (property in o) {
            delete o[property];
          }
          return o;
        },
        /*
        	Overrides values fomr `newValues` on `base`, as long as they
        	already exist in base.
        */
        overrideOnto: function(base, newValues) {
          var key, newVal, oldVal;
          if (!this.isBareObject(newValues) || !this.isBareObject(base)) {
            return base;
          }
          for (key in base) {
            oldVal = base[key];
            newVal = newValues[key];
            if (newVal === void 0) {
              continue;
            }
            if (typeof newVal !== "object" || this.isInstance(newVal)) {
              base[key] = this.clone(newVal);
            } else {
              if (typeof oldVal !== "object" || this.isInstance(oldVal)) {
                base[key] = this.clone(newVal);
              } else {
                this.overrideOnto(oldVal, newVal);
              }
            }
          }
          return base;
        },
        /*
        	Takes a clone of 'base' and runs #overrideOnto on it
        */
        override: function(base, newValues) {
          return this.overrideOnto(this.clone(base), newValues);
        },
        append: function(base, toAppend) {
          return this.appendOnto(this.clone(base), toAppend);
        },
        appendOnto: function(base, toAppend) {
          var key, newVal, oldVal;
          if (!this.isBareObject(toAppend) || !this.isBareObject(base)) {
            return base;
          }
          for (key in toAppend) {
            if (!__hasProp.call(toAppend, key))
              continue;
            newVal = toAppend[key];
            if (newVal === void 0) {
              continue;
            }
            if (typeof newVal !== "object" || this.isInstance(newVal)) {
              base[key] = newVal;
            } else {
              oldVal = base[key];
              if (typeof oldVal !== "object" || this.isInstance(oldVal)) {
                base[key] = this.clone(newVal);
              } else {
                this.appendOnto(oldVal, newVal);
              }
            }
          }
          return base;
        },
        groupProps: function(obj, groups) {
          var def, defs, grouped, key, name, shouldAdd, val, _i, _len;
          grouped = {};
          for (name in groups) {
            defs = groups[name];
            grouped[name] = {};
          }
          grouped["rest"] = {};
          top:
            for (key in obj) {
              val = obj[key];
              shouldAdd = false;
              for (name in groups) {
                defs = groups[name];
                if (!Array.isArray(defs)) {
                  defs = [defs];
                }
                for (_i = 0, _len = defs.length; _i < _len; _i++) {
                  def = defs[_i];
                  if (typeof def === "string") {
                    if (key === def) {
                      shouldAdd = true;
                    }
                  } else if (def instanceof RegExp) {
                    if (def.test(key)) {
                      shouldAdd = true;
                    }
                  } else if (def instanceof Function) {
                    if (def(key)) {
                      shouldAdd = true;
                    }
                  } else {
                    throw Error("Group definitions must either						be strings, regexes, or functions.");
                  }
                  if (shouldAdd) {
                    grouped[name][key] = val;
                    continue top;
                  }
                }
              }
              grouped["rest"][key] = val;
            }
          return grouped;
        }
      };
    }
  });

  // node_modules/.pnpm/utila@0.4.0/node_modules/utila/lib/string.js
  var require_string = __commonJS({
    "node_modules/.pnpm/utila@0.4.0/node_modules/utila/lib/string.js"(exports, module) {
      module.exports = {
        pad: function(n, width, z) {
          if (z == null) {
            z = "0";
          }
          n = n + "";
          if (n.length >= width) {
            return n;
          } else {
            return new Array(width - n.length + 1).join(z) + n;
          }
        }
      };
    }
  });

  // node_modules/.pnpm/utila@0.4.0/node_modules/utila/lib/Emitter.js
  var require_Emitter = __commonJS({
    "node_modules/.pnpm/utila@0.4.0/node_modules/utila/lib/Emitter.js"(exports, module) {
      var Emitter;
      var array;
      array = require_array();
      module.exports = Emitter = function() {
        function Emitter2() {
          this._listeners = {};
          this._listenersForAnyEvent = [];
          this._disabledEmitters = {};
        }
        Emitter2.prototype.on = function(eventName, listener) {
          if (this._listeners[eventName] == null) {
            this._listeners[eventName] = [];
          }
          this._listeners[eventName].push(listener);
          return this;
        };
        Emitter2.prototype.once = function(eventName, listener) {
          var cb, ran, _this = this;
          ran = false;
          cb = function() {
            if (ran) {
              return;
            }
            ran = true;
            listener();
            return setTimeout(function() {
              return _this.removeEvent(eventName, cb);
            }, 0);
          };
          this.on(eventName, cb);
          return this;
        };
        Emitter2.prototype.onAnyEvent = function(listener) {
          this._listenersForAnyEvent.push(listener);
          return this;
        };
        Emitter2.prototype.removeEvent = function(eventName, listener) {
          if (this._listeners[eventName] == null) {
            return this;
          }
          array.pluckOneItem(this._listeners[eventName], listener);
          return this;
        };
        Emitter2.prototype.removeListeners = function(eventName) {
          if (this._listeners[eventName] == null) {
            return this;
          }
          this._listeners[eventName].length = 0;
          return this;
        };
        Emitter2.prototype.removeAllListeners = function() {
          var listeners, name, _ref;
          _ref = this._listeners;
          for (name in _ref) {
            listeners = _ref[name];
            listeners.length = 0;
          }
          return this;
        };
        Emitter2.prototype._emit = function(eventName, data) {
          var listener, _i, _j, _len, _len1, _ref, _ref1;
          _ref = this._listenersForAnyEvent;
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            listener = _ref[_i];
            listener.call(this, data, eventName);
          }
          if (this._listeners[eventName] == null) {
            return;
          }
          _ref1 = this._listeners[eventName];
          for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
            listener = _ref1[_j];
            listener.call(this, data);
          }
        };
        Emitter2.prototype._throttleEmitterMethod = function(fnName, time) {
          var lastCallArgs, originalFn, pend, pending, runIt, timer, _this = this;
          if (time == null) {
            time = 1e3;
          }
          originalFn = this[fnName];
          if (typeof originalFn !== "function") {
            throw Error("this class does not have a method called '" + fnName + "'");
          }
          lastCallArgs = null;
          pending = false;
          timer = null;
          this[fnName] = function() {
            lastCallArgs = arguments;
            return pend();
          };
          pend = function() {
            if (pending) {
              clearTimeout(timer);
            }
            timer = setTimeout(runIt, time);
            return pending = true;
          };
          return runIt = function() {
            pending = false;
            return originalFn.apply(_this, lastCallArgs);
          };
        };
        Emitter2.prototype._disableEmitter = function(fnName) {
          if (this._disabledEmitters[fnName] != null) {
            throw Error("" + fnName + " is already a disabled emitter");
          }
          this._disabledEmitters[fnName] = this[fnName];
          return this[fnName] = function() {
          };
        };
        Emitter2.prototype._enableEmitter = function(fnName) {
          var fn;
          fn = this._disabledEmitters[fnName];
          if (fn == null) {
            throw Error("" + fnName + " is not a disabled emitter");
          }
          this[fnName] = fn;
          return delete this._disabledEmitters[fnName];
        };
        return Emitter2;
      }();
    }
  });

  // node_modules/.pnpm/utila@0.4.0/node_modules/utila/lib/utila.js
  var require_utila = __commonJS({
    "node_modules/.pnpm/utila@0.4.0/node_modules/utila/lib/utila.js"(exports, module) {
      var utila;
      module.exports = utila = {
        array: require_array(),
        classic: require_classic(),
        object: require_object(),
        string: require_string(),
        Emitter: require_Emitter()
      };
    }
  });

  // node_modules/.pnpm/dom-converter@0.2.0/node_modules/dom-converter/lib/objectToSaneObject.js
  var require_objectToSaneObject = __commonJS({
    "node_modules/.pnpm/dom-converter@0.2.0/node_modules/dom-converter/lib/objectToSaneObject.js"(exports, module) {
      var object;
      var self2;
      var hasProp = {}.hasOwnProperty;
      object = require_utila().object;
      module.exports = self2 = {
        sanitize: function(val) {
          return self2._toChildren(val);
        },
        _toChildren: function(val) {
          var ref;
          if (object.isBareObject(val)) {
            return self2._objectToChildren(val);
          } else if (Array.isArray(val)) {
            return self2._arrayToChildren(val);
          } else if (val === null || typeof val === "undefined") {
            return [];
          } else if ((ref = typeof val) === "string" || ref === "number") {
            return [String(val)];
          } else {
            throw Error("not a valid child node: `" + val);
          }
        },
        _objectToChildren: function(o) {
          var a, cur, key, val;
          a = [];
          for (key in o) {
            if (!hasProp.call(o, key))
              continue;
            val = o[key];
            cur = {};
            cur[key] = self2.sanitize(val);
            a.push(cur);
          }
          return a;
        },
        _arrayToChildren: function(a) {
          var i, len, ret, v;
          ret = [];
          for (i = 0, len = a.length; i < len; i++) {
            v = a[i];
            ret.push(self2._toNode(v));
          }
          return ret;
        },
        _toNode: function(o) {
          var key, keys, obj, ref;
          if ((ref = typeof o) === "string" || ref === "number") {
            return String(o);
          } else if (object.isBareObject(o)) {
            keys = Object.keys(o);
            if (keys.length !== 1) {
              throw Error("a node must only have one key as tag name");
            }
            key = keys[0];
            obj = {};
            obj[key] = self2._toChildren(o[key]);
            return obj;
          } else {
            throw Error("not a valid node: `" + o + "`");
          }
        }
      };
    }
  });

  // node_modules/.pnpm/dom-converter@0.2.0/node_modules/dom-converter/lib/saneObjectToDom.js
  var require_saneObjectToDom = __commonJS({
    "node_modules/.pnpm/dom-converter@0.2.0/node_modules/dom-converter/lib/saneObjectToDom.js"(exports, module) {
      var self2;
      var hasProp = {}.hasOwnProperty;
      module.exports = self2 = {
        convert: function(obj) {
          return self2._arrayToChildren(obj);
        },
        _arrayToChildren: function(a, parent) {
          var children, j, len, node, prev, v;
          if (parent == null) {
            parent = null;
          }
          children = [];
          prev = null;
          for (j = 0, len = a.length; j < len; j++) {
            v = a[j];
            if (typeof v === "string") {
              node = self2._getTextNodeFor(v);
            } else {
              node = self2._objectToNode(v, parent);
              node.prev = null;
              node.next = null;
              node.parent = parent;
              if (prev != null) {
                node.prev = prev;
                prev.next = node;
              }
              prev = node;
            }
            children.push(node);
          }
          return children;
        },
        _objectToNode: function(o) {
          var attribs, children, i, k, key, name, node, ref, v, val;
          i = 0;
          for (k in o) {
            if (!hasProp.call(o, k))
              continue;
            v = o[k];
            if (i > 0) {
              throw Error("_objectToNode() only accepts an object with one key/value");
            }
            key = k;
            val = v;
            i++;
          }
          node = {};
          if (typeof key !== "string") {
            throw Error("_objectToNode()'s key must be a string of tag name and classes");
          }
          if (typeof val === "string") {
            children = [self2._getTextNodeFor(val)];
          } else if (Array.isArray(val)) {
            children = self2._arrayToChildren(val, node);
          } else {
            inspect(o);
            throw Error("_objectToNode()'s key's value must only be a string or an array");
          }
          node.type = "tag";
          ref = self2._parseTag(key), name = ref.name, attribs = ref.attribs;
          node.name = name;
          node.attribs = attribs;
          node.children = children;
          return node;
        },
        _getTextNodeFor: function(s) {
          return {
            type: "text",
            data: s
          };
        },
        _nameRx: /^[a-zA-Z\-\_]{1}[a-zA-Z0-9\-\_]*$/,
        _parseTag: function(k) {
          var attribs, classes, cls, id, m, name, parts;
          if (!k.match(/^[a-zA-Z0-9\#\-\_\.\[\]\"\'\=\,\s]+$/) || k.match(/^[0-9]+/)) {
            throw Error("cannot parse tag `" + k + "`");
          }
          attribs = {};
          parts = {
            name: "",
            attribs
          };
          if (m = k.match(/^([^\.#]+)/)) {
            name = m[1];
            if (!name.match(self2._nameRx)) {
              throw Error("tag name `" + name + "` is not valid");
            }
            parts.name = name;
            k = k.substr(name.length, k.length);
          }
          if (m = k.match(/^#([a-zA-Z0-9\-]+)/)) {
            id = m[1];
            if (!id.match(self2._nameRx)) {
              throw Error("tag id `" + id + "` is not valid");
            }
            attribs.id = id;
            k = k.substr(id.length + 1, k.length);
          }
          classes = [];
          while (m = k.match(/\.([a-zA-Z0-9\-\_]+)/)) {
            cls = m[1];
            if (!cls.match(self2._nameRx)) {
              throw Error("tag class `" + cls + "` is not valid");
            }
            classes.push(cls);
            k = k.replace("." + cls, "");
          }
          if (classes.length) {
            attribs["class"] = classes.join(" ");
          }
          return parts;
        }
      };
    }
  });

  // node_modules/.pnpm/dom-converter@0.2.0/node_modules/dom-converter/lib/domToMarkup.js
  var require_domToMarkup = __commonJS({
    "node_modules/.pnpm/dom-converter@0.2.0/node_modules/dom-converter/lib/domToMarkup.js"() {
    }
  });

  // node_modules/.pnpm/dom-converter@0.2.0/node_modules/dom-converter/lib/domConverter.js
  var require_domConverter = __commonJS({
    "node_modules/.pnpm/dom-converter@0.2.0/node_modules/dom-converter/lib/domConverter.js"(exports, module) {
      var domToMarkup;
      var object;
      var objectToSaneObject;
      var saneObjectToDom;
      var self2;
      objectToSaneObject = require_objectToSaneObject();
      saneObjectToDom = require_saneObjectToDom();
      domToMarkup = require_domToMarkup();
      object = require_utila().object;
      module.exports = self2 = {
        objectToDom: function(o) {
          o = self2._object2SaneObject(o);
          return saneObjectToDom.convert(o);
        },
        object2markup: function(o) {
          var dom;
          dom = self2.objectToDom(o);
          return domToMarkup.convert(dom);
        },
        domToMarkup: function(dom) {
          return domToMarkup.convert(dom);
        },
        _object2SaneObject: function(o) {
          if (!Array.isArray(o)) {
            if (!object.isBareObject(o)) {
              throw Error("toDom() only accepts arrays and bare objects as input");
            }
          }
          return objectToSaneObject.sanitize(o);
        }
      };
    }
  });

  // node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_listCacheClear.js
  var require_listCacheClear = __commonJS({
    "node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_listCacheClear.js"(exports, module) {
      function listCacheClear() {
        this.__data__ = [];
        this.size = 0;
      }
      module.exports = listCacheClear;
    }
  });

  // node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/eq.js
  var require_eq = __commonJS({
    "node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/eq.js"(exports, module) {
      function eq(value, other) {
        return value === other || value !== value && other !== other;
      }
      module.exports = eq;
    }
  });

  // node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_assocIndexOf.js
  var require_assocIndexOf = __commonJS({
    "node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_assocIndexOf.js"(exports, module) {
      var eq = require_eq();
      function assocIndexOf(array, key) {
        var length = array.length;
        while (length--) {
          if (eq(array[length][0], key)) {
            return length;
          }
        }
        return -1;
      }
      module.exports = assocIndexOf;
    }
  });

  // node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_listCacheDelete.js
  var require_listCacheDelete = __commonJS({
    "node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_listCacheDelete.js"(exports, module) {
      var assocIndexOf = require_assocIndexOf();
      var arrayProto = Array.prototype;
      var splice = arrayProto.splice;
      function listCacheDelete(key) {
        var data = this.__data__, index = assocIndexOf(data, key);
        if (index < 0) {
          return false;
        }
        var lastIndex = data.length - 1;
        if (index == lastIndex) {
          data.pop();
        } else {
          splice.call(data, index, 1);
        }
        --this.size;
        return true;
      }
      module.exports = listCacheDelete;
    }
  });

  // node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_listCacheGet.js
  var require_listCacheGet = __commonJS({
    "node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_listCacheGet.js"(exports, module) {
      var assocIndexOf = require_assocIndexOf();
      function listCacheGet(key) {
        var data = this.__data__, index = assocIndexOf(data, key);
        return index < 0 ? void 0 : data[index][1];
      }
      module.exports = listCacheGet;
    }
  });

  // node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_listCacheHas.js
  var require_listCacheHas = __commonJS({
    "node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_listCacheHas.js"(exports, module) {
      var assocIndexOf = require_assocIndexOf();
      function listCacheHas(key) {
        return assocIndexOf(this.__data__, key) > -1;
      }
      module.exports = listCacheHas;
    }
  });

  // node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_listCacheSet.js
  var require_listCacheSet = __commonJS({
    "node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_listCacheSet.js"(exports, module) {
      var assocIndexOf = require_assocIndexOf();
      function listCacheSet(key, value) {
        var data = this.__data__, index = assocIndexOf(data, key);
        if (index < 0) {
          ++this.size;
          data.push([key, value]);
        } else {
          data[index][1] = value;
        }
        return this;
      }
      module.exports = listCacheSet;
    }
  });

  // node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_ListCache.js
  var require_ListCache = __commonJS({
    "node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_ListCache.js"(exports, module) {
      var listCacheClear = require_listCacheClear();
      var listCacheDelete = require_listCacheDelete();
      var listCacheGet = require_listCacheGet();
      var listCacheHas = require_listCacheHas();
      var listCacheSet = require_listCacheSet();
      function ListCache(entries) {
        var index = -1, length = entries == null ? 0 : entries.length;
        this.clear();
        while (++index < length) {
          var entry = entries[index];
          this.set(entry[0], entry[1]);
        }
      }
      ListCache.prototype.clear = listCacheClear;
      ListCache.prototype["delete"] = listCacheDelete;
      ListCache.prototype.get = listCacheGet;
      ListCache.prototype.has = listCacheHas;
      ListCache.prototype.set = listCacheSet;
      module.exports = ListCache;
    }
  });

  // node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_stackClear.js
  var require_stackClear = __commonJS({
    "node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_stackClear.js"(exports, module) {
      var ListCache = require_ListCache();
      function stackClear() {
        this.__data__ = new ListCache();
        this.size = 0;
      }
      module.exports = stackClear;
    }
  });

  // node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_stackDelete.js
  var require_stackDelete = __commonJS({
    "node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_stackDelete.js"(exports, module) {
      function stackDelete(key) {
        var data = this.__data__, result = data["delete"](key);
        this.size = data.size;
        return result;
      }
      module.exports = stackDelete;
    }
  });

  // node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_stackGet.js
  var require_stackGet = __commonJS({
    "node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_stackGet.js"(exports, module) {
      function stackGet(key) {
        return this.__data__.get(key);
      }
      module.exports = stackGet;
    }
  });

  // node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_stackHas.js
  var require_stackHas = __commonJS({
    "node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_stackHas.js"(exports, module) {
      function stackHas(key) {
        return this.__data__.has(key);
      }
      module.exports = stackHas;
    }
  });

  // node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/isObject.js
  var require_isObject = __commonJS({
    "node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/isObject.js"(exports, module) {
      function isObject(value) {
        var type = typeof value;
        return value != null && (type == "object" || type == "function");
      }
      module.exports = isObject;
    }
  });

  // node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/isFunction.js
  var require_isFunction = __commonJS({
    "node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/isFunction.js"(exports, module) {
      var baseGetTag = require_baseGetTag();
      var isObject = require_isObject();
      var asyncTag = "[object AsyncFunction]";
      var funcTag = "[object Function]";
      var genTag = "[object GeneratorFunction]";
      var proxyTag = "[object Proxy]";
      function isFunction(value) {
        if (!isObject(value)) {
          return false;
        }
        var tag = baseGetTag(value);
        return tag == funcTag || tag == genTag || tag == asyncTag || tag == proxyTag;
      }
      module.exports = isFunction;
    }
  });

  // node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_coreJsData.js
  var require_coreJsData = __commonJS({
    "node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_coreJsData.js"(exports, module) {
      var root = require_root();
      var coreJsData = root["__core-js_shared__"];
      module.exports = coreJsData;
    }
  });

  // node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_isMasked.js
  var require_isMasked = __commonJS({
    "node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_isMasked.js"(exports, module) {
      var coreJsData = require_coreJsData();
      var maskSrcKey = function() {
        var uid = /[^.]+$/.exec(coreJsData && coreJsData.keys && coreJsData.keys.IE_PROTO || "");
        return uid ? "Symbol(src)_1." + uid : "";
      }();
      function isMasked(func) {
        return !!maskSrcKey && maskSrcKey in func;
      }
      module.exports = isMasked;
    }
  });

  // node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_toSource.js
  var require_toSource = __commonJS({
    "node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_toSource.js"(exports, module) {
      var funcProto = Function.prototype;
      var funcToString = funcProto.toString;
      function toSource(func) {
        if (func != null) {
          try {
            return funcToString.call(func);
          } catch (e) {
          }
          try {
            return func + "";
          } catch (e) {
          }
        }
        return "";
      }
      module.exports = toSource;
    }
  });

  // node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_baseIsNative.js
  var require_baseIsNative = __commonJS({
    "node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_baseIsNative.js"(exports, module) {
      var isFunction = require_isFunction();
      var isMasked = require_isMasked();
      var isObject = require_isObject();
      var toSource = require_toSource();
      var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;
      var reIsHostCtor = /^\[object .+?Constructor\]$/;
      var funcProto = Function.prototype;
      var objectProto = Object.prototype;
      var funcToString = funcProto.toString;
      var hasOwnProperty = objectProto.hasOwnProperty;
      var reIsNative = RegExp(
        "^" + funcToString.call(hasOwnProperty).replace(reRegExpChar, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
      );
      function baseIsNative(value) {
        if (!isObject(value) || isMasked(value)) {
          return false;
        }
        var pattern = isFunction(value) ? reIsNative : reIsHostCtor;
        return pattern.test(toSource(value));
      }
      module.exports = baseIsNative;
    }
  });

  // node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_getValue.js
  var require_getValue = __commonJS({
    "node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_getValue.js"(exports, module) {
      function getValue(object, key) {
        return object == null ? void 0 : object[key];
      }
      module.exports = getValue;
    }
  });

  // node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_getNative.js
  var require_getNative = __commonJS({
    "node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_getNative.js"(exports, module) {
      var baseIsNative = require_baseIsNative();
      var getValue = require_getValue();
      function getNative(object, key) {
        var value = getValue(object, key);
        return baseIsNative(value) ? value : void 0;
      }
      module.exports = getNative;
    }
  });

  // node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_Map.js
  var require_Map = __commonJS({
    "node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_Map.js"(exports, module) {
      var getNative = require_getNative();
      var root = require_root();
      var Map2 = getNative(root, "Map");
      module.exports = Map2;
    }
  });

  // node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_nativeCreate.js
  var require_nativeCreate = __commonJS({
    "node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_nativeCreate.js"(exports, module) {
      var getNative = require_getNative();
      var nativeCreate = getNative(Object, "create");
      module.exports = nativeCreate;
    }
  });

  // node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_hashClear.js
  var require_hashClear = __commonJS({
    "node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_hashClear.js"(exports, module) {
      var nativeCreate = require_nativeCreate();
      function hashClear() {
        this.__data__ = nativeCreate ? nativeCreate(null) : {};
        this.size = 0;
      }
      module.exports = hashClear;
    }
  });

  // node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_hashDelete.js
  var require_hashDelete = __commonJS({
    "node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_hashDelete.js"(exports, module) {
      function hashDelete(key) {
        var result = this.has(key) && delete this.__data__[key];
        this.size -= result ? 1 : 0;
        return result;
      }
      module.exports = hashDelete;
    }
  });

  // node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_hashGet.js
  var require_hashGet = __commonJS({
    "node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_hashGet.js"(exports, module) {
      var nativeCreate = require_nativeCreate();
      var HASH_UNDEFINED = "__lodash_hash_undefined__";
      var objectProto = Object.prototype;
      var hasOwnProperty = objectProto.hasOwnProperty;
      function hashGet(key) {
        var data = this.__data__;
        if (nativeCreate) {
          var result = data[key];
          return result === HASH_UNDEFINED ? void 0 : result;
        }
        return hasOwnProperty.call(data, key) ? data[key] : void 0;
      }
      module.exports = hashGet;
    }
  });

  // node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_hashHas.js
  var require_hashHas = __commonJS({
    "node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_hashHas.js"(exports, module) {
      var nativeCreate = require_nativeCreate();
      var objectProto = Object.prototype;
      var hasOwnProperty = objectProto.hasOwnProperty;
      function hashHas(key) {
        var data = this.__data__;
        return nativeCreate ? data[key] !== void 0 : hasOwnProperty.call(data, key);
      }
      module.exports = hashHas;
    }
  });

  // node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_hashSet.js
  var require_hashSet = __commonJS({
    "node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_hashSet.js"(exports, module) {
      var nativeCreate = require_nativeCreate();
      var HASH_UNDEFINED = "__lodash_hash_undefined__";
      function hashSet(key, value) {
        var data = this.__data__;
        this.size += this.has(key) ? 0 : 1;
        data[key] = nativeCreate && value === void 0 ? HASH_UNDEFINED : value;
        return this;
      }
      module.exports = hashSet;
    }
  });

  // node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_Hash.js
  var require_Hash = __commonJS({
    "node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_Hash.js"(exports, module) {
      var hashClear = require_hashClear();
      var hashDelete = require_hashDelete();
      var hashGet = require_hashGet();
      var hashHas = require_hashHas();
      var hashSet = require_hashSet();
      function Hash(entries) {
        var index = -1, length = entries == null ? 0 : entries.length;
        this.clear();
        while (++index < length) {
          var entry = entries[index];
          this.set(entry[0], entry[1]);
        }
      }
      Hash.prototype.clear = hashClear;
      Hash.prototype["delete"] = hashDelete;
      Hash.prototype.get = hashGet;
      Hash.prototype.has = hashHas;
      Hash.prototype.set = hashSet;
      module.exports = Hash;
    }
  });

  // node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_mapCacheClear.js
  var require_mapCacheClear = __commonJS({
    "node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_mapCacheClear.js"(exports, module) {
      var Hash = require_Hash();
      var ListCache = require_ListCache();
      var Map2 = require_Map();
      function mapCacheClear() {
        this.size = 0;
        this.__data__ = {
          "hash": new Hash(),
          "map": new (Map2 || ListCache)(),
          "string": new Hash()
        };
      }
      module.exports = mapCacheClear;
    }
  });

  // node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_isKeyable.js
  var require_isKeyable = __commonJS({
    "node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_isKeyable.js"(exports, module) {
      function isKeyable(value) {
        var type = typeof value;
        return type == "string" || type == "number" || type == "symbol" || type == "boolean" ? value !== "__proto__" : value === null;
      }
      module.exports = isKeyable;
    }
  });

  // node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_getMapData.js
  var require_getMapData = __commonJS({
    "node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_getMapData.js"(exports, module) {
      var isKeyable = require_isKeyable();
      function getMapData(map, key) {
        var data = map.__data__;
        return isKeyable(key) ? data[typeof key == "string" ? "string" : "hash"] : data.map;
      }
      module.exports = getMapData;
    }
  });

  // node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_mapCacheDelete.js
  var require_mapCacheDelete = __commonJS({
    "node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_mapCacheDelete.js"(exports, module) {
      var getMapData = require_getMapData();
      function mapCacheDelete(key) {
        var result = getMapData(this, key)["delete"](key);
        this.size -= result ? 1 : 0;
        return result;
      }
      module.exports = mapCacheDelete;
    }
  });

  // node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_mapCacheGet.js
  var require_mapCacheGet = __commonJS({
    "node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_mapCacheGet.js"(exports, module) {
      var getMapData = require_getMapData();
      function mapCacheGet(key) {
        return getMapData(this, key).get(key);
      }
      module.exports = mapCacheGet;
    }
  });

  // node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_mapCacheHas.js
  var require_mapCacheHas = __commonJS({
    "node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_mapCacheHas.js"(exports, module) {
      var getMapData = require_getMapData();
      function mapCacheHas(key) {
        return getMapData(this, key).has(key);
      }
      module.exports = mapCacheHas;
    }
  });

  // node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_mapCacheSet.js
  var require_mapCacheSet = __commonJS({
    "node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_mapCacheSet.js"(exports, module) {
      var getMapData = require_getMapData();
      function mapCacheSet(key, value) {
        var data = getMapData(this, key), size = data.size;
        data.set(key, value);
        this.size += data.size == size ? 0 : 1;
        return this;
      }
      module.exports = mapCacheSet;
    }
  });

  // node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_MapCache.js
  var require_MapCache = __commonJS({
    "node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_MapCache.js"(exports, module) {
      var mapCacheClear = require_mapCacheClear();
      var mapCacheDelete = require_mapCacheDelete();
      var mapCacheGet = require_mapCacheGet();
      var mapCacheHas = require_mapCacheHas();
      var mapCacheSet = require_mapCacheSet();
      function MapCache(entries) {
        var index = -1, length = entries == null ? 0 : entries.length;
        this.clear();
        while (++index < length) {
          var entry = entries[index];
          this.set(entry[0], entry[1]);
        }
      }
      MapCache.prototype.clear = mapCacheClear;
      MapCache.prototype["delete"] = mapCacheDelete;
      MapCache.prototype.get = mapCacheGet;
      MapCache.prototype.has = mapCacheHas;
      MapCache.prototype.set = mapCacheSet;
      module.exports = MapCache;
    }
  });

  // node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_stackSet.js
  var require_stackSet = __commonJS({
    "node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_stackSet.js"(exports, module) {
      var ListCache = require_ListCache();
      var Map2 = require_Map();
      var MapCache = require_MapCache();
      var LARGE_ARRAY_SIZE = 200;
      function stackSet(key, value) {
        var data = this.__data__;
        if (data instanceof ListCache) {
          var pairs = data.__data__;
          if (!Map2 || pairs.length < LARGE_ARRAY_SIZE - 1) {
            pairs.push([key, value]);
            this.size = ++data.size;
            return this;
          }
          data = this.__data__ = new MapCache(pairs);
        }
        data.set(key, value);
        this.size = data.size;
        return this;
      }
      module.exports = stackSet;
    }
  });

  // node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_Stack.js
  var require_Stack = __commonJS({
    "node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_Stack.js"(exports, module) {
      var ListCache = require_ListCache();
      var stackClear = require_stackClear();
      var stackDelete = require_stackDelete();
      var stackGet = require_stackGet();
      var stackHas = require_stackHas();
      var stackSet = require_stackSet();
      function Stack(entries) {
        var data = this.__data__ = new ListCache(entries);
        this.size = data.size;
      }
      Stack.prototype.clear = stackClear;
      Stack.prototype["delete"] = stackDelete;
      Stack.prototype.get = stackGet;
      Stack.prototype.has = stackHas;
      Stack.prototype.set = stackSet;
      module.exports = Stack;
    }
  });

  // node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_defineProperty.js
  var require_defineProperty = __commonJS({
    "node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_defineProperty.js"(exports, module) {
      var getNative = require_getNative();
      var defineProperty = function() {
        try {
          var func = getNative(Object, "defineProperty");
          func({}, "", {});
          return func;
        } catch (e) {
        }
      }();
      module.exports = defineProperty;
    }
  });

  // node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_baseAssignValue.js
  var require_baseAssignValue = __commonJS({
    "node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_baseAssignValue.js"(exports, module) {
      var defineProperty = require_defineProperty();
      function baseAssignValue(object, key, value) {
        if (key == "__proto__" && defineProperty) {
          defineProperty(object, key, {
            "configurable": true,
            "enumerable": true,
            "value": value,
            "writable": true
          });
        } else {
          object[key] = value;
        }
      }
      module.exports = baseAssignValue;
    }
  });

  // node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_assignMergeValue.js
  var require_assignMergeValue = __commonJS({
    "node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_assignMergeValue.js"(exports, module) {
      var baseAssignValue = require_baseAssignValue();
      var eq = require_eq();
      function assignMergeValue(object, key, value) {
        if (value !== void 0 && !eq(object[key], value) || value === void 0 && !(key in object)) {
          baseAssignValue(object, key, value);
        }
      }
      module.exports = assignMergeValue;
    }
  });

  // node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_createBaseFor.js
  var require_createBaseFor = __commonJS({
    "node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_createBaseFor.js"(exports, module) {
      function createBaseFor(fromRight) {
        return function(object, iteratee, keysFunc) {
          var index = -1, iterable = Object(object), props = keysFunc(object), length = props.length;
          while (length--) {
            var key = props[fromRight ? length : ++index];
            if (iteratee(iterable[key], key, iterable) === false) {
              break;
            }
          }
          return object;
        };
      }
      module.exports = createBaseFor;
    }
  });

  // node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_baseFor.js
  var require_baseFor = __commonJS({
    "node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_baseFor.js"(exports, module) {
      var createBaseFor = require_createBaseFor();
      var baseFor = createBaseFor();
      module.exports = baseFor;
    }
  });

  // node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_cloneBuffer.js
  var require_cloneBuffer = __commonJS({
    "node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_cloneBuffer.js"(exports, module) {
      var root = require_root();
      var freeExports = typeof exports == "object" && exports && !exports.nodeType && exports;
      var freeModule = freeExports && typeof module == "object" && module && !module.nodeType && module;
      var moduleExports = freeModule && freeModule.exports === freeExports;
      var Buffer2 = moduleExports ? root.Buffer : void 0;
      var allocUnsafe = Buffer2 ? Buffer2.allocUnsafe : void 0;
      function cloneBuffer(buffer, isDeep) {
        if (isDeep) {
          return buffer.slice();
        }
        var length = buffer.length, result = allocUnsafe ? allocUnsafe(length) : new buffer.constructor(length);
        buffer.copy(result);
        return result;
      }
      module.exports = cloneBuffer;
    }
  });

  // node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_Uint8Array.js
  var require_Uint8Array = __commonJS({
    "node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_Uint8Array.js"(exports, module) {
      var root = require_root();
      var Uint8Array2 = root.Uint8Array;
      module.exports = Uint8Array2;
    }
  });

  // node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_cloneArrayBuffer.js
  var require_cloneArrayBuffer = __commonJS({
    "node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_cloneArrayBuffer.js"(exports, module) {
      var Uint8Array2 = require_Uint8Array();
      function cloneArrayBuffer(arrayBuffer) {
        var result = new arrayBuffer.constructor(arrayBuffer.byteLength);
        new Uint8Array2(result).set(new Uint8Array2(arrayBuffer));
        return result;
      }
      module.exports = cloneArrayBuffer;
    }
  });

  // node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_cloneTypedArray.js
  var require_cloneTypedArray = __commonJS({
    "node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_cloneTypedArray.js"(exports, module) {
      var cloneArrayBuffer = require_cloneArrayBuffer();
      function cloneTypedArray(typedArray, isDeep) {
        var buffer = isDeep ? cloneArrayBuffer(typedArray.buffer) : typedArray.buffer;
        return new typedArray.constructor(buffer, typedArray.byteOffset, typedArray.length);
      }
      module.exports = cloneTypedArray;
    }
  });

  // node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_copyArray.js
  var require_copyArray = __commonJS({
    "node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_copyArray.js"(exports, module) {
      function copyArray(source, array) {
        var index = -1, length = source.length;
        array || (array = Array(length));
        while (++index < length) {
          array[index] = source[index];
        }
        return array;
      }
      module.exports = copyArray;
    }
  });

  // node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_baseCreate.js
  var require_baseCreate = __commonJS({
    "node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_baseCreate.js"(exports, module) {
      var isObject = require_isObject();
      var objectCreate = Object.create;
      var baseCreate = function() {
        function object() {
        }
        return function(proto2) {
          if (!isObject(proto2)) {
            return {};
          }
          if (objectCreate) {
            return objectCreate(proto2);
          }
          object.prototype = proto2;
          var result = new object();
          object.prototype = void 0;
          return result;
        };
      }();
      module.exports = baseCreate;
    }
  });

  // node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_isPrototype.js
  var require_isPrototype = __commonJS({
    "node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_isPrototype.js"(exports, module) {
      var objectProto = Object.prototype;
      function isPrototype(value) {
        var Ctor = value && value.constructor, proto2 = typeof Ctor == "function" && Ctor.prototype || objectProto;
        return value === proto2;
      }
      module.exports = isPrototype;
    }
  });

  // node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_initCloneObject.js
  var require_initCloneObject = __commonJS({
    "node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_initCloneObject.js"(exports, module) {
      var baseCreate = require_baseCreate();
      var getPrototype = require_getPrototype();
      var isPrototype = require_isPrototype();
      function initCloneObject(object) {
        return typeof object.constructor == "function" && !isPrototype(object) ? baseCreate(getPrototype(object)) : {};
      }
      module.exports = initCloneObject;
    }
  });

  // node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_baseIsArguments.js
  var require_baseIsArguments = __commonJS({
    "node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_baseIsArguments.js"(exports, module) {
      var baseGetTag = require_baseGetTag();
      var isObjectLike = require_isObjectLike();
      var argsTag = "[object Arguments]";
      function baseIsArguments(value) {
        return isObjectLike(value) && baseGetTag(value) == argsTag;
      }
      module.exports = baseIsArguments;
    }
  });

  // node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/isArguments.js
  var require_isArguments = __commonJS({
    "node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/isArguments.js"(exports, module) {
      var baseIsArguments = require_baseIsArguments();
      var isObjectLike = require_isObjectLike();
      var objectProto = Object.prototype;
      var hasOwnProperty = objectProto.hasOwnProperty;
      var propertyIsEnumerable = objectProto.propertyIsEnumerable;
      var isArguments = baseIsArguments(function() {
        return arguments;
      }()) ? baseIsArguments : function(value) {
        return isObjectLike(value) && hasOwnProperty.call(value, "callee") && !propertyIsEnumerable.call(value, "callee");
      };
      module.exports = isArguments;
    }
  });

  // node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/isArray.js
  var require_isArray = __commonJS({
    "node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/isArray.js"(exports, module) {
      var isArray = Array.isArray;
      module.exports = isArray;
    }
  });

  // node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/isLength.js
  var require_isLength = __commonJS({
    "node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/isLength.js"(exports, module) {
      var MAX_SAFE_INTEGER = 9007199254740991;
      function isLength(value) {
        return typeof value == "number" && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
      }
      module.exports = isLength;
    }
  });

  // node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/isArrayLike.js
  var require_isArrayLike = __commonJS({
    "node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/isArrayLike.js"(exports, module) {
      var isFunction = require_isFunction();
      var isLength = require_isLength();
      function isArrayLike(value) {
        return value != null && isLength(value.length) && !isFunction(value);
      }
      module.exports = isArrayLike;
    }
  });

  // node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/isArrayLikeObject.js
  var require_isArrayLikeObject = __commonJS({
    "node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/isArrayLikeObject.js"(exports, module) {
      var isArrayLike = require_isArrayLike();
      var isObjectLike = require_isObjectLike();
      function isArrayLikeObject(value) {
        return isObjectLike(value) && isArrayLike(value);
      }
      module.exports = isArrayLikeObject;
    }
  });

  // node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/stubFalse.js
  var require_stubFalse = __commonJS({
    "node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/stubFalse.js"(exports, module) {
      function stubFalse() {
        return false;
      }
      module.exports = stubFalse;
    }
  });

  // node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/isBuffer.js
  var require_isBuffer = __commonJS({
    "node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/isBuffer.js"(exports, module) {
      var root = require_root();
      var stubFalse = require_stubFalse();
      var freeExports = typeof exports == "object" && exports && !exports.nodeType && exports;
      var freeModule = freeExports && typeof module == "object" && module && !module.nodeType && module;
      var moduleExports = freeModule && freeModule.exports === freeExports;
      var Buffer2 = moduleExports ? root.Buffer : void 0;
      var nativeIsBuffer = Buffer2 ? Buffer2.isBuffer : void 0;
      var isBuffer = nativeIsBuffer || stubFalse;
      module.exports = isBuffer;
    }
  });

  // node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_baseIsTypedArray.js
  var require_baseIsTypedArray = __commonJS({
    "node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_baseIsTypedArray.js"(exports, module) {
      var baseGetTag = require_baseGetTag();
      var isLength = require_isLength();
      var isObjectLike = require_isObjectLike();
      var argsTag = "[object Arguments]";
      var arrayTag = "[object Array]";
      var boolTag = "[object Boolean]";
      var dateTag = "[object Date]";
      var errorTag = "[object Error]";
      var funcTag = "[object Function]";
      var mapTag = "[object Map]";
      var numberTag = "[object Number]";
      var objectTag = "[object Object]";
      var regexpTag = "[object RegExp]";
      var setTag = "[object Set]";
      var stringTag = "[object String]";
      var weakMapTag = "[object WeakMap]";
      var arrayBufferTag = "[object ArrayBuffer]";
      var dataViewTag = "[object DataView]";
      var float32Tag = "[object Float32Array]";
      var float64Tag = "[object Float64Array]";
      var int8Tag = "[object Int8Array]";
      var int16Tag = "[object Int16Array]";
      var int32Tag = "[object Int32Array]";
      var uint8Tag = "[object Uint8Array]";
      var uint8ClampedTag = "[object Uint8ClampedArray]";
      var uint16Tag = "[object Uint16Array]";
      var uint32Tag = "[object Uint32Array]";
      var typedArrayTags = {};
      typedArrayTags[float32Tag] = typedArrayTags[float64Tag] = typedArrayTags[int8Tag] = typedArrayTags[int16Tag] = typedArrayTags[int32Tag] = typedArrayTags[uint8Tag] = typedArrayTags[uint8ClampedTag] = typedArrayTags[uint16Tag] = typedArrayTags[uint32Tag] = true;
      typedArrayTags[argsTag] = typedArrayTags[arrayTag] = typedArrayTags[arrayBufferTag] = typedArrayTags[boolTag] = typedArrayTags[dataViewTag] = typedArrayTags[dateTag] = typedArrayTags[errorTag] = typedArrayTags[funcTag] = typedArrayTags[mapTag] = typedArrayTags[numberTag] = typedArrayTags[objectTag] = typedArrayTags[regexpTag] = typedArrayTags[setTag] = typedArrayTags[stringTag] = typedArrayTags[weakMapTag] = false;
      function baseIsTypedArray(value) {
        return isObjectLike(value) && isLength(value.length) && !!typedArrayTags[baseGetTag(value)];
      }
      module.exports = baseIsTypedArray;
    }
  });

  // node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_baseUnary.js
  var require_baseUnary = __commonJS({
    "node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_baseUnary.js"(exports, module) {
      function baseUnary(func) {
        return function(value) {
          return func(value);
        };
      }
      module.exports = baseUnary;
    }
  });

  // node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_nodeUtil.js
  var require_nodeUtil = __commonJS({
    "node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_nodeUtil.js"(exports, module) {
      var freeGlobal = require_freeGlobal();
      var freeExports = typeof exports == "object" && exports && !exports.nodeType && exports;
      var freeModule = freeExports && typeof module == "object" && module && !module.nodeType && module;
      var moduleExports = freeModule && freeModule.exports === freeExports;
      var freeProcess = moduleExports && freeGlobal.process;
      var nodeUtil = function() {
        try {
          var types = freeModule && freeModule.require && freeModule.require("util").types;
          if (types) {
            return types;
          }
          return freeProcess && freeProcess.binding && freeProcess.binding("util");
        } catch (e) {
        }
      }();
      module.exports = nodeUtil;
    }
  });

  // node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/isTypedArray.js
  var require_isTypedArray = __commonJS({
    "node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/isTypedArray.js"(exports, module) {
      var baseIsTypedArray = require_baseIsTypedArray();
      var baseUnary = require_baseUnary();
      var nodeUtil = require_nodeUtil();
      var nodeIsTypedArray = nodeUtil && nodeUtil.isTypedArray;
      var isTypedArray = nodeIsTypedArray ? baseUnary(nodeIsTypedArray) : baseIsTypedArray;
      module.exports = isTypedArray;
    }
  });

  // node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_safeGet.js
  var require_safeGet = __commonJS({
    "node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_safeGet.js"(exports, module) {
      function safeGet(object, key) {
        if (key === "constructor" && typeof object[key] === "function") {
          return;
        }
        if (key == "__proto__") {
          return;
        }
        return object[key];
      }
      module.exports = safeGet;
    }
  });

  // node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_assignValue.js
  var require_assignValue = __commonJS({
    "node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_assignValue.js"(exports, module) {
      var baseAssignValue = require_baseAssignValue();
      var eq = require_eq();
      var objectProto = Object.prototype;
      var hasOwnProperty = objectProto.hasOwnProperty;
      function assignValue(object, key, value) {
        var objValue = object[key];
        if (!(hasOwnProperty.call(object, key) && eq(objValue, value)) || value === void 0 && !(key in object)) {
          baseAssignValue(object, key, value);
        }
      }
      module.exports = assignValue;
    }
  });

  // node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_copyObject.js
  var require_copyObject = __commonJS({
    "node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_copyObject.js"(exports, module) {
      var assignValue = require_assignValue();
      var baseAssignValue = require_baseAssignValue();
      function copyObject(source, props, object, customizer) {
        var isNew = !object;
        object || (object = {});
        var index = -1, length = props.length;
        while (++index < length) {
          var key = props[index];
          var newValue = customizer ? customizer(object[key], source[key], key, object, source) : void 0;
          if (newValue === void 0) {
            newValue = source[key];
          }
          if (isNew) {
            baseAssignValue(object, key, newValue);
          } else {
            assignValue(object, key, newValue);
          }
        }
        return object;
      }
      module.exports = copyObject;
    }
  });

  // node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_baseTimes.js
  var require_baseTimes = __commonJS({
    "node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_baseTimes.js"(exports, module) {
      function baseTimes(n, iteratee) {
        var index = -1, result = Array(n);
        while (++index < n) {
          result[index] = iteratee(index);
        }
        return result;
      }
      module.exports = baseTimes;
    }
  });

  // node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_isIndex.js
  var require_isIndex = __commonJS({
    "node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_isIndex.js"(exports, module) {
      var MAX_SAFE_INTEGER = 9007199254740991;
      var reIsUint = /^(?:0|[1-9]\d*)$/;
      function isIndex(value, length) {
        var type = typeof value;
        length = length == null ? MAX_SAFE_INTEGER : length;
        return !!length && (type == "number" || type != "symbol" && reIsUint.test(value)) && (value > -1 && value % 1 == 0 && value < length);
      }
      module.exports = isIndex;
    }
  });

  // node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_arrayLikeKeys.js
  var require_arrayLikeKeys = __commonJS({
    "node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_arrayLikeKeys.js"(exports, module) {
      var baseTimes = require_baseTimes();
      var isArguments = require_isArguments();
      var isArray = require_isArray();
      var isBuffer = require_isBuffer();
      var isIndex = require_isIndex();
      var isTypedArray = require_isTypedArray();
      var objectProto = Object.prototype;
      var hasOwnProperty = objectProto.hasOwnProperty;
      function arrayLikeKeys(value, inherited) {
        var isArr = isArray(value), isArg = !isArr && isArguments(value), isBuff = !isArr && !isArg && isBuffer(value), isType = !isArr && !isArg && !isBuff && isTypedArray(value), skipIndexes = isArr || isArg || isBuff || isType, result = skipIndexes ? baseTimes(value.length, String) : [], length = result.length;
        for (var key in value) {
          if ((inherited || hasOwnProperty.call(value, key)) && !(skipIndexes && // Safari 9 has enumerable `arguments.length` in strict mode.
          (key == "length" || // Node.js 0.10 has enumerable non-index properties on buffers.
          isBuff && (key == "offset" || key == "parent") || // PhantomJS 2 has enumerable non-index properties on typed arrays.
          isType && (key == "buffer" || key == "byteLength" || key == "byteOffset") || // Skip index properties.
          isIndex(key, length)))) {
            result.push(key);
          }
        }
        return result;
      }
      module.exports = arrayLikeKeys;
    }
  });

  // node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_nativeKeysIn.js
  var require_nativeKeysIn = __commonJS({
    "node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_nativeKeysIn.js"(exports, module) {
      function nativeKeysIn(object) {
        var result = [];
        if (object != null) {
          for (var key in Object(object)) {
            result.push(key);
          }
        }
        return result;
      }
      module.exports = nativeKeysIn;
    }
  });

  // node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_baseKeysIn.js
  var require_baseKeysIn = __commonJS({
    "node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_baseKeysIn.js"(exports, module) {
      var isObject = require_isObject();
      var isPrototype = require_isPrototype();
      var nativeKeysIn = require_nativeKeysIn();
      var objectProto = Object.prototype;
      var hasOwnProperty = objectProto.hasOwnProperty;
      function baseKeysIn(object) {
        if (!isObject(object)) {
          return nativeKeysIn(object);
        }
        var isProto = isPrototype(object), result = [];
        for (var key in object) {
          if (!(key == "constructor" && (isProto || !hasOwnProperty.call(object, key)))) {
            result.push(key);
          }
        }
        return result;
      }
      module.exports = baseKeysIn;
    }
  });

  // node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/keysIn.js
  var require_keysIn = __commonJS({
    "node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/keysIn.js"(exports, module) {
      var arrayLikeKeys = require_arrayLikeKeys();
      var baseKeysIn = require_baseKeysIn();
      var isArrayLike = require_isArrayLike();
      function keysIn(object) {
        return isArrayLike(object) ? arrayLikeKeys(object, true) : baseKeysIn(object);
      }
      module.exports = keysIn;
    }
  });

  // node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/toPlainObject.js
  var require_toPlainObject = __commonJS({
    "node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/toPlainObject.js"(exports, module) {
      var copyObject = require_copyObject();
      var keysIn = require_keysIn();
      function toPlainObject(value) {
        return copyObject(value, keysIn(value));
      }
      module.exports = toPlainObject;
    }
  });

  // node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_baseMergeDeep.js
  var require_baseMergeDeep = __commonJS({
    "node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_baseMergeDeep.js"(exports, module) {
      var assignMergeValue = require_assignMergeValue();
      var cloneBuffer = require_cloneBuffer();
      var cloneTypedArray = require_cloneTypedArray();
      var copyArray = require_copyArray();
      var initCloneObject = require_initCloneObject();
      var isArguments = require_isArguments();
      var isArray = require_isArray();
      var isArrayLikeObject = require_isArrayLikeObject();
      var isBuffer = require_isBuffer();
      var isFunction = require_isFunction();
      var isObject = require_isObject();
      var isPlainObject = require_isPlainObject();
      var isTypedArray = require_isTypedArray();
      var safeGet = require_safeGet();
      var toPlainObject = require_toPlainObject();
      function baseMergeDeep(object, source, key, srcIndex, mergeFunc, customizer, stack) {
        var objValue = safeGet(object, key), srcValue = safeGet(source, key), stacked = stack.get(srcValue);
        if (stacked) {
          assignMergeValue(object, key, stacked);
          return;
        }
        var newValue = customizer ? customizer(objValue, srcValue, key + "", object, source, stack) : void 0;
        var isCommon = newValue === void 0;
        if (isCommon) {
          var isArr = isArray(srcValue), isBuff = !isArr && isBuffer(srcValue), isTyped = !isArr && !isBuff && isTypedArray(srcValue);
          newValue = srcValue;
          if (isArr || isBuff || isTyped) {
            if (isArray(objValue)) {
              newValue = objValue;
            } else if (isArrayLikeObject(objValue)) {
              newValue = copyArray(objValue);
            } else if (isBuff) {
              isCommon = false;
              newValue = cloneBuffer(srcValue, true);
            } else if (isTyped) {
              isCommon = false;
              newValue = cloneTypedArray(srcValue, true);
            } else {
              newValue = [];
            }
          } else if (isPlainObject(srcValue) || isArguments(srcValue)) {
            newValue = objValue;
            if (isArguments(objValue)) {
              newValue = toPlainObject(objValue);
            } else if (!isObject(objValue) || isFunction(objValue)) {
              newValue = initCloneObject(srcValue);
            }
          } else {
            isCommon = false;
          }
        }
        if (isCommon) {
          stack.set(srcValue, newValue);
          mergeFunc(newValue, srcValue, srcIndex, customizer, stack);
          stack["delete"](srcValue);
        }
        assignMergeValue(object, key, newValue);
      }
      module.exports = baseMergeDeep;
    }
  });

  // node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_baseMerge.js
  var require_baseMerge = __commonJS({
    "node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_baseMerge.js"(exports, module) {
      var Stack = require_Stack();
      var assignMergeValue = require_assignMergeValue();
      var baseFor = require_baseFor();
      var baseMergeDeep = require_baseMergeDeep();
      var isObject = require_isObject();
      var keysIn = require_keysIn();
      var safeGet = require_safeGet();
      function baseMerge(object, source, srcIndex, customizer, stack) {
        if (object === source) {
          return;
        }
        baseFor(source, function(srcValue, key) {
          stack || (stack = new Stack());
          if (isObject(srcValue)) {
            baseMergeDeep(object, source, key, srcIndex, baseMerge, customizer, stack);
          } else {
            var newValue = customizer ? customizer(safeGet(object, key), srcValue, key + "", object, source, stack) : void 0;
            if (newValue === void 0) {
              newValue = srcValue;
            }
            assignMergeValue(object, key, newValue);
          }
        }, keysIn);
      }
      module.exports = baseMerge;
    }
  });

  // node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/identity.js
  var require_identity = __commonJS({
    "node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/identity.js"(exports, module) {
      function identity(value) {
        return value;
      }
      module.exports = identity;
    }
  });

  // node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_apply.js
  var require_apply = __commonJS({
    "node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_apply.js"(exports, module) {
      function apply(func, thisArg, args) {
        switch (args.length) {
          case 0:
            return func.call(thisArg);
          case 1:
            return func.call(thisArg, args[0]);
          case 2:
            return func.call(thisArg, args[0], args[1]);
          case 3:
            return func.call(thisArg, args[0], args[1], args[2]);
        }
        return func.apply(thisArg, args);
      }
      module.exports = apply;
    }
  });

  // node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_overRest.js
  var require_overRest = __commonJS({
    "node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_overRest.js"(exports, module) {
      var apply = require_apply();
      var nativeMax = Math.max;
      function overRest(func, start, transform) {
        start = nativeMax(start === void 0 ? func.length - 1 : start, 0);
        return function() {
          var args = arguments, index = -1, length = nativeMax(args.length - start, 0), array = Array(length);
          while (++index < length) {
            array[index] = args[start + index];
          }
          index = -1;
          var otherArgs = Array(start + 1);
          while (++index < start) {
            otherArgs[index] = args[index];
          }
          otherArgs[start] = transform(array);
          return apply(func, this, otherArgs);
        };
      }
      module.exports = overRest;
    }
  });

  // node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/constant.js
  var require_constant = __commonJS({
    "node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/constant.js"(exports, module) {
      function constant(value) {
        return function() {
          return value;
        };
      }
      module.exports = constant;
    }
  });

  // node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_baseSetToString.js
  var require_baseSetToString = __commonJS({
    "node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_baseSetToString.js"(exports, module) {
      var constant = require_constant();
      var defineProperty = require_defineProperty();
      var identity = require_identity();
      var baseSetToString = !defineProperty ? identity : function(func, string) {
        return defineProperty(func, "toString", {
          "configurable": true,
          "enumerable": false,
          "value": constant(string),
          "writable": true
        });
      };
      module.exports = baseSetToString;
    }
  });

  // node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_shortOut.js
  var require_shortOut = __commonJS({
    "node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_shortOut.js"(exports, module) {
      var HOT_COUNT = 800;
      var HOT_SPAN = 16;
      var nativeNow = Date.now;
      function shortOut(func) {
        var count = 0, lastCalled = 0;
        return function() {
          var stamp = nativeNow(), remaining = HOT_SPAN - (stamp - lastCalled);
          lastCalled = stamp;
          if (remaining > 0) {
            if (++count >= HOT_COUNT) {
              return arguments[0];
            }
          } else {
            count = 0;
          }
          return func.apply(void 0, arguments);
        };
      }
      module.exports = shortOut;
    }
  });

  // node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_setToString.js
  var require_setToString = __commonJS({
    "node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_setToString.js"(exports, module) {
      var baseSetToString = require_baseSetToString();
      var shortOut = require_shortOut();
      var setToString = shortOut(baseSetToString);
      module.exports = setToString;
    }
  });

  // node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_baseRest.js
  var require_baseRest = __commonJS({
    "node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_baseRest.js"(exports, module) {
      var identity = require_identity();
      var overRest = require_overRest();
      var setToString = require_setToString();
      function baseRest(func, start) {
        return setToString(overRest(func, start, identity), func + "");
      }
      module.exports = baseRest;
    }
  });

  // node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_isIterateeCall.js
  var require_isIterateeCall = __commonJS({
    "node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_isIterateeCall.js"(exports, module) {
      var eq = require_eq();
      var isArrayLike = require_isArrayLike();
      var isIndex = require_isIndex();
      var isObject = require_isObject();
      function isIterateeCall(value, index, object) {
        if (!isObject(object)) {
          return false;
        }
        var type = typeof index;
        if (type == "number" ? isArrayLike(object) && isIndex(index, object.length) : type == "string" && index in object) {
          return eq(object[index], value);
        }
        return false;
      }
      module.exports = isIterateeCall;
    }
  });

  // node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_createAssigner.js
  var require_createAssigner = __commonJS({
    "node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_createAssigner.js"(exports, module) {
      var baseRest = require_baseRest();
      var isIterateeCall = require_isIterateeCall();
      function createAssigner(assigner) {
        return baseRest(function(object, sources) {
          var index = -1, length = sources.length, customizer = length > 1 ? sources[length - 1] : void 0, guard = length > 2 ? sources[2] : void 0;
          customizer = assigner.length > 3 && typeof customizer == "function" ? (length--, customizer) : void 0;
          if (guard && isIterateeCall(sources[0], sources[1], guard)) {
            customizer = length < 3 ? void 0 : customizer;
            length = 1;
          }
          object = Object(object);
          while (++index < length) {
            var source = sources[index];
            if (source) {
              assigner(object, source, index, customizer);
            }
          }
          return object;
        });
      }
      module.exports = createAssigner;
    }
  });

  // node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/merge.js
  var require_merge = __commonJS({
    "node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/merge.js"(exports, module) {
      var baseMerge = require_baseMerge();
      var createAssigner = require_createAssigner();
      var merge = createAssigner(function(object, source, srcIndex) {
        baseMerge(object, source, srcIndex);
      });
      module.exports = merge;
    }
  });

  // node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_arrayEach.js
  var require_arrayEach = __commonJS({
    "node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_arrayEach.js"(exports, module) {
      function arrayEach(array, iteratee) {
        var index = -1, length = array == null ? 0 : array.length;
        while (++index < length) {
          if (iteratee(array[index], index, array) === false) {
            break;
          }
        }
        return array;
      }
      module.exports = arrayEach;
    }
  });

  // node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_nativeKeys.js
  var require_nativeKeys = __commonJS({
    "node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_nativeKeys.js"(exports, module) {
      var overArg = require_overArg();
      var nativeKeys = overArg(Object.keys, Object);
      module.exports = nativeKeys;
    }
  });

  // node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_baseKeys.js
  var require_baseKeys = __commonJS({
    "node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_baseKeys.js"(exports, module) {
      var isPrototype = require_isPrototype();
      var nativeKeys = require_nativeKeys();
      var objectProto = Object.prototype;
      var hasOwnProperty = objectProto.hasOwnProperty;
      function baseKeys(object) {
        if (!isPrototype(object)) {
          return nativeKeys(object);
        }
        var result = [];
        for (var key in Object(object)) {
          if (hasOwnProperty.call(object, key) && key != "constructor") {
            result.push(key);
          }
        }
        return result;
      }
      module.exports = baseKeys;
    }
  });

  // node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/keys.js
  var require_keys = __commonJS({
    "node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/keys.js"(exports, module) {
      var arrayLikeKeys = require_arrayLikeKeys();
      var baseKeys = require_baseKeys();
      var isArrayLike = require_isArrayLike();
      function keys(object) {
        return isArrayLike(object) ? arrayLikeKeys(object) : baseKeys(object);
      }
      module.exports = keys;
    }
  });

  // node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_baseAssign.js
  var require_baseAssign = __commonJS({
    "node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_baseAssign.js"(exports, module) {
      var copyObject = require_copyObject();
      var keys = require_keys();
      function baseAssign(object, source) {
        return object && copyObject(source, keys(source), object);
      }
      module.exports = baseAssign;
    }
  });

  // node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_baseAssignIn.js
  var require_baseAssignIn = __commonJS({
    "node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_baseAssignIn.js"(exports, module) {
      var copyObject = require_copyObject();
      var keysIn = require_keysIn();
      function baseAssignIn(object, source) {
        return object && copyObject(source, keysIn(source), object);
      }
      module.exports = baseAssignIn;
    }
  });

  // node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_arrayFilter.js
  var require_arrayFilter = __commonJS({
    "node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_arrayFilter.js"(exports, module) {
      function arrayFilter(array, predicate) {
        var index = -1, length = array == null ? 0 : array.length, resIndex = 0, result = [];
        while (++index < length) {
          var value = array[index];
          if (predicate(value, index, array)) {
            result[resIndex++] = value;
          }
        }
        return result;
      }
      module.exports = arrayFilter;
    }
  });

  // node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/stubArray.js
  var require_stubArray = __commonJS({
    "node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/stubArray.js"(exports, module) {
      function stubArray() {
        return [];
      }
      module.exports = stubArray;
    }
  });

  // node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_getSymbols.js
  var require_getSymbols = __commonJS({
    "node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_getSymbols.js"(exports, module) {
      var arrayFilter = require_arrayFilter();
      var stubArray = require_stubArray();
      var objectProto = Object.prototype;
      var propertyIsEnumerable = objectProto.propertyIsEnumerable;
      var nativeGetSymbols = Object.getOwnPropertySymbols;
      var getSymbols = !nativeGetSymbols ? stubArray : function(object) {
        if (object == null) {
          return [];
        }
        object = Object(object);
        return arrayFilter(nativeGetSymbols(object), function(symbol) {
          return propertyIsEnumerable.call(object, symbol);
        });
      };
      module.exports = getSymbols;
    }
  });

  // node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_copySymbols.js
  var require_copySymbols = __commonJS({
    "node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_copySymbols.js"(exports, module) {
      var copyObject = require_copyObject();
      var getSymbols = require_getSymbols();
      function copySymbols(source, object) {
        return copyObject(source, getSymbols(source), object);
      }
      module.exports = copySymbols;
    }
  });

  // node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_arrayPush.js
  var require_arrayPush = __commonJS({
    "node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_arrayPush.js"(exports, module) {
      function arrayPush(array, values) {
        var index = -1, length = values.length, offset = array.length;
        while (++index < length) {
          array[offset + index] = values[index];
        }
        return array;
      }
      module.exports = arrayPush;
    }
  });

  // node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_getSymbolsIn.js
  var require_getSymbolsIn = __commonJS({
    "node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_getSymbolsIn.js"(exports, module) {
      var arrayPush = require_arrayPush();
      var getPrototype = require_getPrototype();
      var getSymbols = require_getSymbols();
      var stubArray = require_stubArray();
      var nativeGetSymbols = Object.getOwnPropertySymbols;
      var getSymbolsIn = !nativeGetSymbols ? stubArray : function(object) {
        var result = [];
        while (object) {
          arrayPush(result, getSymbols(object));
          object = getPrototype(object);
        }
        return result;
      };
      module.exports = getSymbolsIn;
    }
  });

  // node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_copySymbolsIn.js
  var require_copySymbolsIn = __commonJS({
    "node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_copySymbolsIn.js"(exports, module) {
      var copyObject = require_copyObject();
      var getSymbolsIn = require_getSymbolsIn();
      function copySymbolsIn(source, object) {
        return copyObject(source, getSymbolsIn(source), object);
      }
      module.exports = copySymbolsIn;
    }
  });

  // node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_baseGetAllKeys.js
  var require_baseGetAllKeys = __commonJS({
    "node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_baseGetAllKeys.js"(exports, module) {
      var arrayPush = require_arrayPush();
      var isArray = require_isArray();
      function baseGetAllKeys(object, keysFunc, symbolsFunc) {
        var result = keysFunc(object);
        return isArray(object) ? result : arrayPush(result, symbolsFunc(object));
      }
      module.exports = baseGetAllKeys;
    }
  });

  // node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_getAllKeys.js
  var require_getAllKeys = __commonJS({
    "node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_getAllKeys.js"(exports, module) {
      var baseGetAllKeys = require_baseGetAllKeys();
      var getSymbols = require_getSymbols();
      var keys = require_keys();
      function getAllKeys(object) {
        return baseGetAllKeys(object, keys, getSymbols);
      }
      module.exports = getAllKeys;
    }
  });

  // node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_getAllKeysIn.js
  var require_getAllKeysIn = __commonJS({
    "node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_getAllKeysIn.js"(exports, module) {
      var baseGetAllKeys = require_baseGetAllKeys();
      var getSymbolsIn = require_getSymbolsIn();
      var keysIn = require_keysIn();
      function getAllKeysIn(object) {
        return baseGetAllKeys(object, keysIn, getSymbolsIn);
      }
      module.exports = getAllKeysIn;
    }
  });

  // node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_DataView.js
  var require_DataView = __commonJS({
    "node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_DataView.js"(exports, module) {
      var getNative = require_getNative();
      var root = require_root();
      var DataView2 = getNative(root, "DataView");
      module.exports = DataView2;
    }
  });

  // node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_Promise.js
  var require_Promise = __commonJS({
    "node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_Promise.js"(exports, module) {
      var getNative = require_getNative();
      var root = require_root();
      var Promise2 = getNative(root, "Promise");
      module.exports = Promise2;
    }
  });

  // node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_Set.js
  var require_Set = __commonJS({
    "node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_Set.js"(exports, module) {
      var getNative = require_getNative();
      var root = require_root();
      var Set2 = getNative(root, "Set");
      module.exports = Set2;
    }
  });

  // node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_WeakMap.js
  var require_WeakMap = __commonJS({
    "node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_WeakMap.js"(exports, module) {
      var getNative = require_getNative();
      var root = require_root();
      var WeakMap2 = getNative(root, "WeakMap");
      module.exports = WeakMap2;
    }
  });

  // node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_getTag.js
  var require_getTag = __commonJS({
    "node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_getTag.js"(exports, module) {
      var DataView2 = require_DataView();
      var Map2 = require_Map();
      var Promise2 = require_Promise();
      var Set2 = require_Set();
      var WeakMap2 = require_WeakMap();
      var baseGetTag = require_baseGetTag();
      var toSource = require_toSource();
      var mapTag = "[object Map]";
      var objectTag = "[object Object]";
      var promiseTag = "[object Promise]";
      var setTag = "[object Set]";
      var weakMapTag = "[object WeakMap]";
      var dataViewTag = "[object DataView]";
      var dataViewCtorString = toSource(DataView2);
      var mapCtorString = toSource(Map2);
      var promiseCtorString = toSource(Promise2);
      var setCtorString = toSource(Set2);
      var weakMapCtorString = toSource(WeakMap2);
      var getTag = baseGetTag;
      if (DataView2 && getTag(new DataView2(new ArrayBuffer(1))) != dataViewTag || Map2 && getTag(new Map2()) != mapTag || Promise2 && getTag(Promise2.resolve()) != promiseTag || Set2 && getTag(new Set2()) != setTag || WeakMap2 && getTag(new WeakMap2()) != weakMapTag) {
        getTag = function(value) {
          var result = baseGetTag(value), Ctor = result == objectTag ? value.constructor : void 0, ctorString = Ctor ? toSource(Ctor) : "";
          if (ctorString) {
            switch (ctorString) {
              case dataViewCtorString:
                return dataViewTag;
              case mapCtorString:
                return mapTag;
              case promiseCtorString:
                return promiseTag;
              case setCtorString:
                return setTag;
              case weakMapCtorString:
                return weakMapTag;
            }
          }
          return result;
        };
      }
      module.exports = getTag;
    }
  });

  // node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_initCloneArray.js
  var require_initCloneArray = __commonJS({
    "node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_initCloneArray.js"(exports, module) {
      var objectProto = Object.prototype;
      var hasOwnProperty = objectProto.hasOwnProperty;
      function initCloneArray(array) {
        var length = array.length, result = new array.constructor(length);
        if (length && typeof array[0] == "string" && hasOwnProperty.call(array, "index")) {
          result.index = array.index;
          result.input = array.input;
        }
        return result;
      }
      module.exports = initCloneArray;
    }
  });

  // node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_cloneDataView.js
  var require_cloneDataView = __commonJS({
    "node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_cloneDataView.js"(exports, module) {
      var cloneArrayBuffer = require_cloneArrayBuffer();
      function cloneDataView(dataView, isDeep) {
        var buffer = isDeep ? cloneArrayBuffer(dataView.buffer) : dataView.buffer;
        return new dataView.constructor(buffer, dataView.byteOffset, dataView.byteLength);
      }
      module.exports = cloneDataView;
    }
  });

  // node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_cloneRegExp.js
  var require_cloneRegExp = __commonJS({
    "node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_cloneRegExp.js"(exports, module) {
      var reFlags = /\w*$/;
      function cloneRegExp(regexp) {
        var result = new regexp.constructor(regexp.source, reFlags.exec(regexp));
        result.lastIndex = regexp.lastIndex;
        return result;
      }
      module.exports = cloneRegExp;
    }
  });

  // node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_cloneSymbol.js
  var require_cloneSymbol = __commonJS({
    "node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_cloneSymbol.js"(exports, module) {
      var Symbol2 = require_Symbol();
      var symbolProto = Symbol2 ? Symbol2.prototype : void 0;
      var symbolValueOf = symbolProto ? symbolProto.valueOf : void 0;
      function cloneSymbol(symbol) {
        return symbolValueOf ? Object(symbolValueOf.call(symbol)) : {};
      }
      module.exports = cloneSymbol;
    }
  });

  // node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_initCloneByTag.js
  var require_initCloneByTag = __commonJS({
    "node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_initCloneByTag.js"(exports, module) {
      var cloneArrayBuffer = require_cloneArrayBuffer();
      var cloneDataView = require_cloneDataView();
      var cloneRegExp = require_cloneRegExp();
      var cloneSymbol = require_cloneSymbol();
      var cloneTypedArray = require_cloneTypedArray();
      var boolTag = "[object Boolean]";
      var dateTag = "[object Date]";
      var mapTag = "[object Map]";
      var numberTag = "[object Number]";
      var regexpTag = "[object RegExp]";
      var setTag = "[object Set]";
      var stringTag = "[object String]";
      var symbolTag = "[object Symbol]";
      var arrayBufferTag = "[object ArrayBuffer]";
      var dataViewTag = "[object DataView]";
      var float32Tag = "[object Float32Array]";
      var float64Tag = "[object Float64Array]";
      var int8Tag = "[object Int8Array]";
      var int16Tag = "[object Int16Array]";
      var int32Tag = "[object Int32Array]";
      var uint8Tag = "[object Uint8Array]";
      var uint8ClampedTag = "[object Uint8ClampedArray]";
      var uint16Tag = "[object Uint16Array]";
      var uint32Tag = "[object Uint32Array]";
      function initCloneByTag(object, tag, isDeep) {
        var Ctor = object.constructor;
        switch (tag) {
          case arrayBufferTag:
            return cloneArrayBuffer(object);
          case boolTag:
          case dateTag:
            return new Ctor(+object);
          case dataViewTag:
            return cloneDataView(object, isDeep);
          case float32Tag:
          case float64Tag:
          case int8Tag:
          case int16Tag:
          case int32Tag:
          case uint8Tag:
          case uint8ClampedTag:
          case uint16Tag:
          case uint32Tag:
            return cloneTypedArray(object, isDeep);
          case mapTag:
            return new Ctor();
          case numberTag:
          case stringTag:
            return new Ctor(object);
          case regexpTag:
            return cloneRegExp(object);
          case setTag:
            return new Ctor();
          case symbolTag:
            return cloneSymbol(object);
        }
      }
      module.exports = initCloneByTag;
    }
  });

  // node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_baseIsMap.js
  var require_baseIsMap = __commonJS({
    "node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_baseIsMap.js"(exports, module) {
      var getTag = require_getTag();
      var isObjectLike = require_isObjectLike();
      var mapTag = "[object Map]";
      function baseIsMap(value) {
        return isObjectLike(value) && getTag(value) == mapTag;
      }
      module.exports = baseIsMap;
    }
  });

  // node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/isMap.js
  var require_isMap = __commonJS({
    "node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/isMap.js"(exports, module) {
      var baseIsMap = require_baseIsMap();
      var baseUnary = require_baseUnary();
      var nodeUtil = require_nodeUtil();
      var nodeIsMap = nodeUtil && nodeUtil.isMap;
      var isMap = nodeIsMap ? baseUnary(nodeIsMap) : baseIsMap;
      module.exports = isMap;
    }
  });

  // node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_baseIsSet.js
  var require_baseIsSet = __commonJS({
    "node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_baseIsSet.js"(exports, module) {
      var getTag = require_getTag();
      var isObjectLike = require_isObjectLike();
      var setTag = "[object Set]";
      function baseIsSet(value) {
        return isObjectLike(value) && getTag(value) == setTag;
      }
      module.exports = baseIsSet;
    }
  });

  // node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/isSet.js
  var require_isSet = __commonJS({
    "node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/isSet.js"(exports, module) {
      var baseIsSet = require_baseIsSet();
      var baseUnary = require_baseUnary();
      var nodeUtil = require_nodeUtil();
      var nodeIsSet = nodeUtil && nodeUtil.isSet;
      var isSet = nodeIsSet ? baseUnary(nodeIsSet) : baseIsSet;
      module.exports = isSet;
    }
  });

  // node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_baseClone.js
  var require_baseClone = __commonJS({
    "node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_baseClone.js"(exports, module) {
      var Stack = require_Stack();
      var arrayEach = require_arrayEach();
      var assignValue = require_assignValue();
      var baseAssign = require_baseAssign();
      var baseAssignIn = require_baseAssignIn();
      var cloneBuffer = require_cloneBuffer();
      var copyArray = require_copyArray();
      var copySymbols = require_copySymbols();
      var copySymbolsIn = require_copySymbolsIn();
      var getAllKeys = require_getAllKeys();
      var getAllKeysIn = require_getAllKeysIn();
      var getTag = require_getTag();
      var initCloneArray = require_initCloneArray();
      var initCloneByTag = require_initCloneByTag();
      var initCloneObject = require_initCloneObject();
      var isArray = require_isArray();
      var isBuffer = require_isBuffer();
      var isMap = require_isMap();
      var isObject = require_isObject();
      var isSet = require_isSet();
      var keys = require_keys();
      var keysIn = require_keysIn();
      var CLONE_DEEP_FLAG = 1;
      var CLONE_FLAT_FLAG = 2;
      var CLONE_SYMBOLS_FLAG = 4;
      var argsTag = "[object Arguments]";
      var arrayTag = "[object Array]";
      var boolTag = "[object Boolean]";
      var dateTag = "[object Date]";
      var errorTag = "[object Error]";
      var funcTag = "[object Function]";
      var genTag = "[object GeneratorFunction]";
      var mapTag = "[object Map]";
      var numberTag = "[object Number]";
      var objectTag = "[object Object]";
      var regexpTag = "[object RegExp]";
      var setTag = "[object Set]";
      var stringTag = "[object String]";
      var symbolTag = "[object Symbol]";
      var weakMapTag = "[object WeakMap]";
      var arrayBufferTag = "[object ArrayBuffer]";
      var dataViewTag = "[object DataView]";
      var float32Tag = "[object Float32Array]";
      var float64Tag = "[object Float64Array]";
      var int8Tag = "[object Int8Array]";
      var int16Tag = "[object Int16Array]";
      var int32Tag = "[object Int32Array]";
      var uint8Tag = "[object Uint8Array]";
      var uint8ClampedTag = "[object Uint8ClampedArray]";
      var uint16Tag = "[object Uint16Array]";
      var uint32Tag = "[object Uint32Array]";
      var cloneableTags = {};
      cloneableTags[argsTag] = cloneableTags[arrayTag] = cloneableTags[arrayBufferTag] = cloneableTags[dataViewTag] = cloneableTags[boolTag] = cloneableTags[dateTag] = cloneableTags[float32Tag] = cloneableTags[float64Tag] = cloneableTags[int8Tag] = cloneableTags[int16Tag] = cloneableTags[int32Tag] = cloneableTags[mapTag] = cloneableTags[numberTag] = cloneableTags[objectTag] = cloneableTags[regexpTag] = cloneableTags[setTag] = cloneableTags[stringTag] = cloneableTags[symbolTag] = cloneableTags[uint8Tag] = cloneableTags[uint8ClampedTag] = cloneableTags[uint16Tag] = cloneableTags[uint32Tag] = true;
      cloneableTags[errorTag] = cloneableTags[funcTag] = cloneableTags[weakMapTag] = false;
      function baseClone(value, bitmask, customizer, key, object, stack) {
        var result, isDeep = bitmask & CLONE_DEEP_FLAG, isFlat = bitmask & CLONE_FLAT_FLAG, isFull = bitmask & CLONE_SYMBOLS_FLAG;
        if (customizer) {
          result = object ? customizer(value, key, object, stack) : customizer(value);
        }
        if (result !== void 0) {
          return result;
        }
        if (!isObject(value)) {
          return value;
        }
        var isArr = isArray(value);
        if (isArr) {
          result = initCloneArray(value);
          if (!isDeep) {
            return copyArray(value, result);
          }
        } else {
          var tag = getTag(value), isFunc = tag == funcTag || tag == genTag;
          if (isBuffer(value)) {
            return cloneBuffer(value, isDeep);
          }
          if (tag == objectTag || tag == argsTag || isFunc && !object) {
            result = isFlat || isFunc ? {} : initCloneObject(value);
            if (!isDeep) {
              return isFlat ? copySymbolsIn(value, baseAssignIn(result, value)) : copySymbols(value, baseAssign(result, value));
            }
          } else {
            if (!cloneableTags[tag]) {
              return object ? value : {};
            }
            result = initCloneByTag(value, tag, isDeep);
          }
        }
        stack || (stack = new Stack());
        var stacked = stack.get(value);
        if (stacked) {
          return stacked;
        }
        stack.set(value, result);
        if (isSet(value)) {
          value.forEach(function(subValue) {
            result.add(baseClone(subValue, bitmask, customizer, subValue, value, stack));
          });
        } else if (isMap(value)) {
          value.forEach(function(subValue, key2) {
            result.set(key2, baseClone(subValue, bitmask, customizer, key2, value, stack));
          });
        }
        var keysFunc = isFull ? isFlat ? getAllKeysIn : getAllKeys : isFlat ? keysIn : keys;
        var props = isArr ? void 0 : keysFunc(value);
        arrayEach(props || value, function(subValue, key2) {
          if (props) {
            key2 = subValue;
            subValue = value[key2];
          }
          assignValue(result, key2, baseClone(subValue, bitmask, customizer, key2, value, stack));
        });
        return result;
      }
      module.exports = baseClone;
    }
  });

  // node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/cloneDeep.js
  var require_cloneDeep = __commonJS({
    "node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/cloneDeep.js"(exports, module) {
      var baseClone = require_baseClone();
      var CLONE_DEEP_FLAG = 1;
      var CLONE_SYMBOLS_FLAG = 4;
      function cloneDeep(value) {
        return baseClone(value, CLONE_DEEP_FLAG | CLONE_SYMBOLS_FLAG);
      }
      module.exports = cloneDeep;
    }
  });

  // node_modules/.pnpm/renderkid@3.0.0/node_modules/renderkid/lib/tools.js
  var require_tools = __commonJS({
    "node_modules/.pnpm/renderkid@3.0.0/node_modules/renderkid/lib/tools.js"(exports, module) {
      "use strict";
      var cloneDeep;
      var htmlparser;
      var isPlainObject;
      var merge;
      var _objectToDom;
      var self2;
      htmlparser = require_lib6();
      var _require = require_domConverter();
      _objectToDom = _require.objectToDom;
      merge = require_merge();
      cloneDeep = require_cloneDeep();
      isPlainObject = require_isPlainObject();
      module.exports = self2 = {
        repeatString: function repeatString(str, times) {
          var i, j, output, ref;
          output = "";
          for (i = j = 0, ref = times; 0 <= ref ? j < ref : j > ref; i = 0 <= ref ? ++j : --j) {
            output += str;
          }
          return output;
        },
        cloneAndMergeDeep: function cloneAndMergeDeep(base, toAppend) {
          return merge(cloneDeep(base), toAppend);
        },
        toDom: function toDom(subject) {
          if (typeof subject === "string") {
            return self2.stringToDom(subject);
          } else if (isPlainObject(subject)) {
            return self2._objectToDom(subject);
          } else {
            throw Error("tools.toDom() only supports strings and objects");
          }
        },
        stringToDom: function stringToDom(string) {
          var handler, parser;
          handler = new htmlparser.DomHandler();
          parser = new htmlparser.Parser(handler);
          parser.write(string);
          parser.end();
          return handler.dom;
        },
        _fixQuotesInDom: function _fixQuotesInDom(input) {
          var j, len, node;
          if (Array.isArray(input)) {
            for (j = 0, len = input.length; j < len; j++) {
              node = input[j];
              self2._fixQuotesInDom(node);
            }
            return input;
          }
          node = input;
          if (node.type === "text") {
            return node.data = self2._quoteNodeText(node.data);
          } else {
            return self2._fixQuotesInDom(node.children);
          }
        },
        objectToDom: function objectToDom(o) {
          if (!Array.isArray(o)) {
            if (!isPlainObject(o)) {
              throw Error("objectToDom() only accepts a bare object or an array");
            }
          }
          return self2._fixQuotesInDom(_objectToDom(o));
        },
        quote: function quote(str) {
          return String(str).replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/\"/g, "&quot;").replace(/\ /g, "&sp;").replace(/\n/g, "<br />");
        },
        _quoteNodeText: function _quoteNodeText(text) {
          return String(text).replace(/\&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/\"/g, "&quot;").replace(/\ /g, "&sp;").replace(/\n/g, "&nl;");
        },
        getCols: function getCols() {
          var cols, tty2;
          tty2 = __require("tty");
          cols = function() {
            try {
              if (tty2.isatty(1) && tty2.isatty(2)) {
                if (process.stdout.getWindowSize) {
                  return process.stdout.getWindowSize(1)[0];
                } else if (tty2.getWindowSize) {
                  return tty2.getWindowSize()[1];
                } else if (process.stdout.columns) {
                  return process.stdout.columns;
                }
              }
            } catch (error) {
            }
          }();
          if (typeof cols === "number" && cols > 30) {
            return cols;
          } else {
            return 80;
          }
        }
      };
    }
  });

  // node_modules/.pnpm/renderkid@3.0.0/node_modules/renderkid/lib/ansiPainter/tags.js
  var require_tags = __commonJS({
    "node_modules/.pnpm/renderkid@3.0.0/node_modules/renderkid/lib/ansiPainter/tags.js"(exports, module) {
      "use strict";
      var color;
      var colors;
      var i;
      var len;
      var tags;
      module.exports = tags = {
        "none": {
          color: "none",
          bg: "none"
        },
        "bg-none": {
          color: "inherit",
          bg: "none"
        },
        "color-none": {
          color: "none",
          bg: "inherit"
        }
      };
      colors = ["black", "red", "green", "yellow", "blue", "magenta", "cyan", "white", "grey", "bright-red", "bright-green", "bright-yellow", "bright-blue", "bright-magenta", "bright-cyan", "bright-white"];
      for (i = 0, len = colors.length; i < len; i++) {
        color = colors[i];
        tags[color] = {
          color,
          bg: "inherit"
        };
        tags["color-".concat(color)] = {
          color,
          bg: "inherit"
        };
        tags["bg-".concat(color)] = {
          color: "inherit",
          bg: color
        };
      }
    }
  });

  // node_modules/.pnpm/renderkid@3.0.0/node_modules/renderkid/lib/ansiPainter/styles.js
  var require_styles = __commonJS({
    "node_modules/.pnpm/renderkid@3.0.0/node_modules/renderkid/lib/ansiPainter/styles.js"(exports, module) {
      "use strict";
      var codes;
      var styles3;
      module.exports = styles3 = {};
      styles3.codes = codes = {
        "none": 0,
        "black": 30,
        "red": 31,
        "green": 32,
        "yellow": 33,
        "blue": 34,
        "magenta": 35,
        "cyan": 36,
        "white": 37,
        "grey": 90,
        "bright-red": 91,
        "bright-green": 92,
        "bright-yellow": 93,
        "bright-blue": 94,
        "bright-magenta": 95,
        "bright-cyan": 96,
        "bright-white": 97,
        "bg-black": 40,
        "bg-red": 41,
        "bg-green": 42,
        "bg-yellow": 43,
        "bg-blue": 44,
        "bg-magenta": 45,
        "bg-cyan": 46,
        "bg-white": 47,
        "bg-grey": 100,
        "bg-bright-red": 101,
        "bg-bright-green": 102,
        "bg-bright-yellow": 103,
        "bg-bright-blue": 104,
        "bg-bright-magenta": 105,
        "bg-bright-cyan": 106,
        "bg-bright-white": 107
      };
      styles3.color = function(str) {
        var code;
        if (str === "none") {
          return "";
        }
        code = codes[str];
        if (code == null) {
          throw Error("Unknown color `".concat(str, "`"));
        }
        return "\x1B[" + code + "m";
      };
      styles3.bg = function(str) {
        var code;
        if (str === "none") {
          return "";
        }
        code = codes["bg-" + str];
        if (code == null) {
          throw Error("Unknown bg color `".concat(str, "`"));
        }
        return "\x1B[" + code + "m";
      };
      styles3.none = function(str) {
        return "\x1B[" + codes.none + "m";
      };
    }
  });

  // node_modules/.pnpm/renderkid@3.0.0/node_modules/renderkid/lib/AnsiPainter.js
  var require_AnsiPainter = __commonJS({
    "node_modules/.pnpm/renderkid@3.0.0/node_modules/renderkid/lib/AnsiPainter.js"(exports, module) {
      "use strict";
      function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
          throw new TypeError("Cannot call a class as a function");
        }
      }
      function _defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
          var descriptor = props[i];
          descriptor.enumerable = descriptor.enumerable || false;
          descriptor.configurable = true;
          if ("value" in descriptor)
            descriptor.writable = true;
          Object.defineProperty(target, descriptor.key, descriptor);
        }
      }
      function _createClass(Constructor, protoProps, staticProps) {
        if (protoProps)
          _defineProperties(Constructor.prototype, protoProps);
        if (staticProps)
          _defineProperties(Constructor, staticProps);
        return Constructor;
      }
      var AnsiPainter;
      var styles3;
      var tags;
      var tools;
      var hasProp = {}.hasOwnProperty;
      tools = require_tools();
      tags = require_tags();
      styles3 = require_styles();
      module.exports = AnsiPainter = function() {
        var self2;
        var AnsiPainter2 = /* @__PURE__ */ function() {
          function AnsiPainter3() {
            _classCallCheck(this, AnsiPainter3);
          }
          _createClass(AnsiPainter3, [{
            key: "paint",
            value: function paint(s) {
              return this._replaceSpecialStrings(this._renderDom(this._parse(s)));
            }
          }, {
            key: "_replaceSpecialStrings",
            value: function _replaceSpecialStrings(str) {
              return str.replace(/&sp;/g, " ").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;/g, '"').replace(/&amp;/g, "&");
            }
          }, {
            key: "_parse",
            value: function _parse(string) {
              var injectFakeRoot = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : true;
              if (injectFakeRoot) {
                string = "<none>" + string + "</none>";
              }
              return tools.toDom(string);
            }
          }, {
            key: "_renderDom",
            value: function _renderDom(dom) {
              var parentStyles;
              parentStyles = {
                bg: "none",
                color: "none"
              };
              return this._renderChildren(dom, parentStyles);
            }
          }, {
            key: "_renderChildren",
            value: function _renderChildren(children, parentStyles) {
              var child, n, ret;
              ret = "";
              for (n in children) {
                if (!hasProp.call(children, n))
                  continue;
                child = children[n];
                ret += this._renderNode(child, parentStyles);
              }
              return ret;
            }
          }, {
            key: "_renderNode",
            value: function _renderNode(node, parentStyles) {
              if (node.type === "text") {
                return this._renderTextNode(node, parentStyles);
              } else {
                return this._renderTag(node, parentStyles);
              }
            }
          }, {
            key: "_renderTextNode",
            value: function _renderTextNode(node, parentStyles) {
              return this._wrapInStyle(node.data, parentStyles);
            }
          }, {
            key: "_wrapInStyle",
            value: function _wrapInStyle(str, style) {
              return styles3.color(style.color) + styles3.bg(style.bg) + str + styles3.none();
            }
          }, {
            key: "_renderTag",
            value: function _renderTag(node, parentStyles) {
              var currentStyles, tagStyles;
              tagStyles = this._getStylesForTagName(node.name);
              currentStyles = this._mixStyles(parentStyles, tagStyles);
              return this._renderChildren(node.children, currentStyles);
            }
          }, {
            key: "_mixStyles",
            value: function _mixStyles() {
              var final, i, key, len, style, val;
              final = {};
              for (var _len = arguments.length, styles4 = new Array(_len), _key = 0; _key < _len; _key++) {
                styles4[_key] = arguments[_key];
              }
              for (i = 0, len = styles4.length; i < len; i++) {
                style = styles4[i];
                for (key in style) {
                  if (!hasProp.call(style, key))
                    continue;
                  val = style[key];
                  if (final[key] == null || val !== "inherit") {
                    final[key] = val;
                  }
                }
              }
              return final;
            }
          }, {
            key: "_getStylesForTagName",
            value: function _getStylesForTagName(name) {
              if (tags[name] == null) {
                throw Error("Unknown tag name `".concat(name, "`"));
              }
              return tags[name];
            }
          }], [{
            key: "getInstance",
            value: function getInstance() {
              if (self2._instance == null) {
                self2._instance = new self2();
              }
              return self2._instance;
            }
          }, {
            key: "paint",
            value: function paint(str) {
              return self2.getInstance().paint(str);
            }
          }, {
            key: "strip",
            value: function strip(s) {
              return s.replace(/\x1b\[[0-9]+m/g, "");
            }
          }]);
          return AnsiPainter3;
        }();
        ;
        AnsiPainter2.tags = tags;
        self2 = AnsiPainter2;
        return AnsiPainter2;
      }.call(void 0);
    }
  });

  // node_modules/.pnpm/renderkid@3.0.0/node_modules/renderkid/lib/renderKid/styleApplier/_common.js
  var require_common2 = __commonJS({
    "node_modules/.pnpm/renderkid@3.0.0/node_modules/renderkid/lib/renderKid/styleApplier/_common.js"(exports, module) {
      "use strict";
      var AnsiPainter;
      var _common;
      AnsiPainter = require_AnsiPainter();
      module.exports = _common = {
        getStyleTagsFor: function getStyleTagsFor(style) {
          var i, len, ret, tag, tagName, tagsToAdd;
          tagsToAdd = [];
          if (style.color != null) {
            tagName = "color-" + style.color;
            if (AnsiPainter.tags[tagName] == null) {
              throw Error("Unknown color `".concat(style.color, "`"));
            }
            tagsToAdd.push(tagName);
          }
          if (style.background != null) {
            tagName = "bg-" + style.background;
            if (AnsiPainter.tags[tagName] == null) {
              throw Error("Unknown background `".concat(style.background, "`"));
            }
            tagsToAdd.push(tagName);
          }
          ret = {
            before: "",
            after: ""
          };
          for (i = 0, len = tagsToAdd.length; i < len; i++) {
            tag = tagsToAdd[i];
            ret.before = "<".concat(tag, ">") + ret.before;
            ret.after = ret.after + "</".concat(tag, ">");
          }
          return ret;
        }
      };
    }
  });

  // node_modules/.pnpm/renderkid@3.0.0/node_modules/renderkid/lib/renderKid/styleApplier/inline.js
  var require_inline = __commonJS({
    "node_modules/.pnpm/renderkid@3.0.0/node_modules/renderkid/lib/renderKid/styleApplier/inline.js"(exports, module) {
      "use strict";
      var _common;
      var inlineStyleApplier;
      var self2;
      var tools;
      tools = require_tools();
      _common = require_common2();
      module.exports = inlineStyleApplier = self2 = {
        applyTo: function applyTo(el, style) {
          var ret;
          ret = _common.getStyleTagsFor(style);
          if (style.marginLeft != null) {
            ret.before = tools.repeatString("&sp;", parseInt(style.marginLeft)) + ret.before;
          }
          if (style.marginRight != null) {
            ret.after += tools.repeatString("&sp;", parseInt(style.marginRight));
          }
          if (style.paddingLeft != null) {
            ret.before += tools.repeatString("&sp;", parseInt(style.paddingLeft));
          }
          if (style.paddingRight != null) {
            ret.after = tools.repeatString("&sp;", parseInt(style.paddingRight)) + ret.after;
          }
          return ret;
        }
      };
    }
  });

  // node_modules/.pnpm/renderkid@3.0.0/node_modules/renderkid/lib/renderKid/styleApplier/block.js
  var require_block = __commonJS({
    "node_modules/.pnpm/renderkid@3.0.0/node_modules/renderkid/lib/renderKid/styleApplier/block.js"(exports, module) {
      "use strict";
      var _common;
      var blockStyleApplier;
      var merge;
      var self2;
      _common = require_common2();
      merge = require_merge();
      module.exports = blockStyleApplier = self2 = {
        applyTo: function applyTo(el, style) {
          var config2, ret;
          ret = _common.getStyleTagsFor(style);
          ret.blockConfig = config2 = {};
          this._margins(style, config2);
          this._bullet(style, config2);
          this._dims(style, config2);
          return ret;
        },
        _margins: function _margins(style, config2) {
          if (style.marginLeft != null) {
            merge(config2, {
              linePrependor: {
                options: {
                  amount: parseInt(style.marginLeft)
                }
              }
            });
          }
          if (style.marginRight != null) {
            merge(config2, {
              lineAppendor: {
                options: {
                  amount: parseInt(style.marginRight)
                }
              }
            });
          }
          if (style.marginTop != null) {
            merge(config2, {
              blockPrependor: {
                options: {
                  amount: parseInt(style.marginTop)
                }
              }
            });
          }
          if (style.marginBottom != null) {
            merge(config2, {
              blockAppendor: {
                options: {
                  amount: parseInt(style.marginBottom)
                }
              }
            });
          }
        },
        _bullet: function _bullet(style, config2) {
          var after, before, bullet, conf;
          if (style.bullet != null && style.bullet.enabled) {
            bullet = style.bullet;
            conf = {};
            conf.alignment = style.bullet.alignment;
            var _common$getStyleTagsF = _common.getStyleTagsFor({
              color: bullet.color,
              background: bullet.background
            });
            before = _common$getStyleTagsF.before;
            after = _common$getStyleTagsF.after;
            conf.char = before + bullet.char + after;
            merge(config2, {
              linePrependor: {
                options: {
                  bullet: conf
                }
              }
            });
          }
        },
        _dims: function _dims(style, config2) {
          var w;
          if (style.width != null) {
            w = parseInt(style.width);
            config2.width = w;
          }
        }
      };
    }
  });

  // node_modules/.pnpm/boolbase@1.0.0/node_modules/boolbase/index.js
  var require_boolbase = __commonJS({
    "node_modules/.pnpm/boolbase@1.0.0/node_modules/boolbase/index.js"(exports, module) {
      module.exports = {
        trueFunc: function trueFunc() {
          return true;
        },
        falseFunc: function falseFunc() {
          return false;
        }
      };
    }
  });

  // node_modules/.pnpm/css-what@6.1.0/node_modules/css-what/lib/commonjs/types.js
  var require_types = __commonJS({
    "node_modules/.pnpm/css-what@6.1.0/node_modules/css-what/lib/commonjs/types.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.AttributeAction = exports.IgnoreCaseMode = exports.SelectorType = void 0;
      var SelectorType;
      (function(SelectorType2) {
        SelectorType2["Attribute"] = "attribute";
        SelectorType2["Pseudo"] = "pseudo";
        SelectorType2["PseudoElement"] = "pseudo-element";
        SelectorType2["Tag"] = "tag";
        SelectorType2["Universal"] = "universal";
        SelectorType2["Adjacent"] = "adjacent";
        SelectorType2["Child"] = "child";
        SelectorType2["Descendant"] = "descendant";
        SelectorType2["Parent"] = "parent";
        SelectorType2["Sibling"] = "sibling";
        SelectorType2["ColumnCombinator"] = "column-combinator";
      })(SelectorType = exports.SelectorType || (exports.SelectorType = {}));
      exports.IgnoreCaseMode = {
        Unknown: null,
        QuirksMode: "quirks",
        IgnoreCase: true,
        CaseSensitive: false
      };
      var AttributeAction;
      (function(AttributeAction2) {
        AttributeAction2["Any"] = "any";
        AttributeAction2["Element"] = "element";
        AttributeAction2["End"] = "end";
        AttributeAction2["Equals"] = "equals";
        AttributeAction2["Exists"] = "exists";
        AttributeAction2["Hyphen"] = "hyphen";
        AttributeAction2["Not"] = "not";
        AttributeAction2["Start"] = "start";
      })(AttributeAction = exports.AttributeAction || (exports.AttributeAction = {}));
    }
  });

  // node_modules/.pnpm/css-what@6.1.0/node_modules/css-what/lib/commonjs/parse.js
  var require_parse = __commonJS({
    "node_modules/.pnpm/css-what@6.1.0/node_modules/css-what/lib/commonjs/parse.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.parse = exports.isTraversal = void 0;
      var types_1 = require_types();
      var reName = /^[^\\#]?(?:\\(?:[\da-f]{1,6}\s?|.)|[\w\-\u00b0-\uFFFF])+/;
      var reEscape = /\\([\da-f]{1,6}\s?|(\s)|.)/gi;
      var actionTypes = /* @__PURE__ */ new Map([
        [126, types_1.AttributeAction.Element],
        [94, types_1.AttributeAction.Start],
        [36, types_1.AttributeAction.End],
        [42, types_1.AttributeAction.Any],
        [33, types_1.AttributeAction.Not],
        [124, types_1.AttributeAction.Hyphen]
      ]);
      var unpackPseudos = /* @__PURE__ */ new Set([
        "has",
        "not",
        "matches",
        "is",
        "where",
        "host",
        "host-context"
      ]);
      function isTraversal(selector) {
        switch (selector.type) {
          case types_1.SelectorType.Adjacent:
          case types_1.SelectorType.Child:
          case types_1.SelectorType.Descendant:
          case types_1.SelectorType.Parent:
          case types_1.SelectorType.Sibling:
          case types_1.SelectorType.ColumnCombinator:
            return true;
          default:
            return false;
        }
      }
      exports.isTraversal = isTraversal;
      var stripQuotesFromPseudos = /* @__PURE__ */ new Set(["contains", "icontains"]);
      function funescape(_, escaped, escapedWhitespace) {
        var high = parseInt(escaped, 16) - 65536;
        return high !== high || escapedWhitespace ? escaped : high < 0 ? (
          // BMP codepoint
          String.fromCharCode(high + 65536)
        ) : (
          // Supplemental Plane codepoint (surrogate pair)
          String.fromCharCode(high >> 10 | 55296, high & 1023 | 56320)
        );
      }
      function unescapeCSS(str) {
        return str.replace(reEscape, funescape);
      }
      function isQuote(c) {
        return c === 39 || c === 34;
      }
      function isWhitespace(c) {
        return c === 32 || c === 9 || c === 10 || c === 12 || c === 13;
      }
      function parse(selector) {
        var subselects = [];
        var endIndex = parseSelector(subselects, "".concat(selector), 0);
        if (endIndex < selector.length) {
          throw new Error("Unmatched selector: ".concat(selector.slice(endIndex)));
        }
        return subselects;
      }
      exports.parse = parse;
      function parseSelector(subselects, selector, selectorIndex) {
        var tokens = [];
        function getName(offset) {
          var match = selector.slice(selectorIndex + offset).match(reName);
          if (!match) {
            throw new Error("Expected name, found ".concat(selector.slice(selectorIndex)));
          }
          var name = match[0];
          selectorIndex += offset + name.length;
          return unescapeCSS(name);
        }
        function stripWhitespace(offset) {
          selectorIndex += offset;
          while (selectorIndex < selector.length && isWhitespace(selector.charCodeAt(selectorIndex))) {
            selectorIndex++;
          }
        }
        function readValueWithParenthesis() {
          selectorIndex += 1;
          var start = selectorIndex;
          var counter = 1;
          for (; counter > 0 && selectorIndex < selector.length; selectorIndex++) {
            if (selector.charCodeAt(selectorIndex) === 40 && !isEscaped(selectorIndex)) {
              counter++;
            } else if (selector.charCodeAt(selectorIndex) === 41 && !isEscaped(selectorIndex)) {
              counter--;
            }
          }
          if (counter) {
            throw new Error("Parenthesis not matched");
          }
          return unescapeCSS(selector.slice(start, selectorIndex - 1));
        }
        function isEscaped(pos) {
          var slashCount = 0;
          while (selector.charCodeAt(--pos) === 92)
            slashCount++;
          return (slashCount & 1) === 1;
        }
        function ensureNotTraversal() {
          if (tokens.length > 0 && isTraversal(tokens[tokens.length - 1])) {
            throw new Error("Did not expect successive traversals.");
          }
        }
        function addTraversal(type) {
          if (tokens.length > 0 && tokens[tokens.length - 1].type === types_1.SelectorType.Descendant) {
            tokens[tokens.length - 1].type = type;
            return;
          }
          ensureNotTraversal();
          tokens.push({ type });
        }
        function addSpecialAttribute(name, action2) {
          tokens.push({
            type: types_1.SelectorType.Attribute,
            name,
            action: action2,
            value: getName(1),
            namespace: null,
            ignoreCase: "quirks"
          });
        }
        function finalizeSubselector() {
          if (tokens.length && tokens[tokens.length - 1].type === types_1.SelectorType.Descendant) {
            tokens.pop();
          }
          if (tokens.length === 0) {
            throw new Error("Empty sub-selector");
          }
          subselects.push(tokens);
        }
        stripWhitespace(0);
        if (selector.length === selectorIndex) {
          return selectorIndex;
        }
        loop:
          while (selectorIndex < selector.length) {
            var firstChar = selector.charCodeAt(selectorIndex);
            switch (firstChar) {
              case 32:
              case 9:
              case 10:
              case 12:
              case 13: {
                if (tokens.length === 0 || tokens[0].type !== types_1.SelectorType.Descendant) {
                  ensureNotTraversal();
                  tokens.push({ type: types_1.SelectorType.Descendant });
                }
                stripWhitespace(1);
                break;
              }
              case 62: {
                addTraversal(types_1.SelectorType.Child);
                stripWhitespace(1);
                break;
              }
              case 60: {
                addTraversal(types_1.SelectorType.Parent);
                stripWhitespace(1);
                break;
              }
              case 126: {
                addTraversal(types_1.SelectorType.Sibling);
                stripWhitespace(1);
                break;
              }
              case 43: {
                addTraversal(types_1.SelectorType.Adjacent);
                stripWhitespace(1);
                break;
              }
              case 46: {
                addSpecialAttribute("class", types_1.AttributeAction.Element);
                break;
              }
              case 35: {
                addSpecialAttribute("id", types_1.AttributeAction.Equals);
                break;
              }
              case 91: {
                stripWhitespace(1);
                var name_1 = void 0;
                var namespace = null;
                if (selector.charCodeAt(selectorIndex) === 124) {
                  name_1 = getName(1);
                } else if (selector.startsWith("*|", selectorIndex)) {
                  namespace = "*";
                  name_1 = getName(2);
                } else {
                  name_1 = getName(0);
                  if (selector.charCodeAt(selectorIndex) === 124 && selector.charCodeAt(selectorIndex + 1) !== 61) {
                    namespace = name_1;
                    name_1 = getName(1);
                  }
                }
                stripWhitespace(0);
                var action = types_1.AttributeAction.Exists;
                var possibleAction = actionTypes.get(selector.charCodeAt(selectorIndex));
                if (possibleAction) {
                  action = possibleAction;
                  if (selector.charCodeAt(selectorIndex + 1) !== 61) {
                    throw new Error("Expected `=`");
                  }
                  stripWhitespace(2);
                } else if (selector.charCodeAt(selectorIndex) === 61) {
                  action = types_1.AttributeAction.Equals;
                  stripWhitespace(1);
                }
                var value = "";
                var ignoreCase = null;
                if (action !== "exists") {
                  if (isQuote(selector.charCodeAt(selectorIndex))) {
                    var quote = selector.charCodeAt(selectorIndex);
                    var sectionEnd = selectorIndex + 1;
                    while (sectionEnd < selector.length && (selector.charCodeAt(sectionEnd) !== quote || isEscaped(sectionEnd))) {
                      sectionEnd += 1;
                    }
                    if (selector.charCodeAt(sectionEnd) !== quote) {
                      throw new Error("Attribute value didn't end");
                    }
                    value = unescapeCSS(selector.slice(selectorIndex + 1, sectionEnd));
                    selectorIndex = sectionEnd + 1;
                  } else {
                    var valueStart = selectorIndex;
                    while (selectorIndex < selector.length && (!isWhitespace(selector.charCodeAt(selectorIndex)) && selector.charCodeAt(selectorIndex) !== 93 || isEscaped(selectorIndex))) {
                      selectorIndex += 1;
                    }
                    value = unescapeCSS(selector.slice(valueStart, selectorIndex));
                  }
                  stripWhitespace(0);
                  var forceIgnore = selector.charCodeAt(selectorIndex) | 32;
                  if (forceIgnore === 115) {
                    ignoreCase = false;
                    stripWhitespace(1);
                  } else if (forceIgnore === 105) {
                    ignoreCase = true;
                    stripWhitespace(1);
                  }
                }
                if (selector.charCodeAt(selectorIndex) !== 93) {
                  throw new Error("Attribute selector didn't terminate");
                }
                selectorIndex += 1;
                var attributeSelector = {
                  type: types_1.SelectorType.Attribute,
                  name: name_1,
                  action,
                  value,
                  namespace,
                  ignoreCase
                };
                tokens.push(attributeSelector);
                break;
              }
              case 58: {
                if (selector.charCodeAt(selectorIndex + 1) === 58) {
                  tokens.push({
                    type: types_1.SelectorType.PseudoElement,
                    name: getName(2).toLowerCase(),
                    data: selector.charCodeAt(selectorIndex) === 40 ? readValueWithParenthesis() : null
                  });
                  continue;
                }
                var name_2 = getName(1).toLowerCase();
                var data = null;
                if (selector.charCodeAt(selectorIndex) === 40) {
                  if (unpackPseudos.has(name_2)) {
                    if (isQuote(selector.charCodeAt(selectorIndex + 1))) {
                      throw new Error("Pseudo-selector ".concat(name_2, " cannot be quoted"));
                    }
                    data = [];
                    selectorIndex = parseSelector(data, selector, selectorIndex + 1);
                    if (selector.charCodeAt(selectorIndex) !== 41) {
                      throw new Error("Missing closing parenthesis in :".concat(name_2, " (").concat(selector, ")"));
                    }
                    selectorIndex += 1;
                  } else {
                    data = readValueWithParenthesis();
                    if (stripQuotesFromPseudos.has(name_2)) {
                      var quot = data.charCodeAt(0);
                      if (quot === data.charCodeAt(data.length - 1) && isQuote(quot)) {
                        data = data.slice(1, -1);
                      }
                    }
                    data = unescapeCSS(data);
                  }
                }
                tokens.push({ type: types_1.SelectorType.Pseudo, name: name_2, data });
                break;
              }
              case 44: {
                finalizeSubselector();
                tokens = [];
                stripWhitespace(1);
                break;
              }
              default: {
                if (selector.startsWith("/*", selectorIndex)) {
                  var endIndex = selector.indexOf("*/", selectorIndex + 2);
                  if (endIndex < 0) {
                    throw new Error("Comment was not terminated");
                  }
                  selectorIndex = endIndex + 2;
                  if (tokens.length === 0) {
                    stripWhitespace(0);
                  }
                  break;
                }
                var namespace = null;
                var name_3 = void 0;
                if (firstChar === 42) {
                  selectorIndex += 1;
                  name_3 = "*";
                } else if (firstChar === 124) {
                  name_3 = "";
                  if (selector.charCodeAt(selectorIndex + 1) === 124) {
                    addTraversal(types_1.SelectorType.ColumnCombinator);
                    stripWhitespace(2);
                    break;
                  }
                } else if (reName.test(selector.slice(selectorIndex))) {
                  name_3 = getName(0);
                } else {
                  break loop;
                }
                if (selector.charCodeAt(selectorIndex) === 124 && selector.charCodeAt(selectorIndex + 1) !== 124) {
                  namespace = name_3;
                  if (selector.charCodeAt(selectorIndex + 1) === 42) {
                    name_3 = "*";
                    selectorIndex += 2;
                  } else {
                    name_3 = getName(1);
                  }
                }
                tokens.push(name_3 === "*" ? { type: types_1.SelectorType.Universal, namespace } : { type: types_1.SelectorType.Tag, name: name_3, namespace });
              }
            }
          }
        finalizeSubselector();
        return selectorIndex;
      }
    }
  });

  // node_modules/.pnpm/css-what@6.1.0/node_modules/css-what/lib/commonjs/stringify.js
  var require_stringify2 = __commonJS({
    "node_modules/.pnpm/css-what@6.1.0/node_modules/css-what/lib/commonjs/stringify.js"(exports) {
      "use strict";
      var __spreadArray = exports && exports.__spreadArray || function(to, from, pack) {
        if (pack || arguments.length === 2)
          for (var i = 0, l = from.length, ar; i < l; i++) {
            if (ar || !(i in from)) {
              if (!ar)
                ar = Array.prototype.slice.call(from, 0, i);
              ar[i] = from[i];
            }
          }
        return to.concat(ar || Array.prototype.slice.call(from));
      };
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.stringify = void 0;
      var types_1 = require_types();
      var attribValChars = ["\\", '"'];
      var pseudoValChars = __spreadArray(__spreadArray([], attribValChars, true), ["(", ")"], false);
      var charsToEscapeInAttributeValue = new Set(attribValChars.map(function(c) {
        return c.charCodeAt(0);
      }));
      var charsToEscapeInPseudoValue = new Set(pseudoValChars.map(function(c) {
        return c.charCodeAt(0);
      }));
      var charsToEscapeInName = new Set(__spreadArray(__spreadArray([], pseudoValChars, true), [
        "~",
        "^",
        "$",
        "*",
        "+",
        "!",
        "|",
        ":",
        "[",
        "]",
        " ",
        "."
      ], false).map(function(c) {
        return c.charCodeAt(0);
      }));
      function stringify(selector) {
        return selector.map(function(token) {
          return token.map(stringifyToken).join("");
        }).join(", ");
      }
      exports.stringify = stringify;
      function stringifyToken(token, index, arr) {
        switch (token.type) {
          case types_1.SelectorType.Child:
            return index === 0 ? "> " : " > ";
          case types_1.SelectorType.Parent:
            return index === 0 ? "< " : " < ";
          case types_1.SelectorType.Sibling:
            return index === 0 ? "~ " : " ~ ";
          case types_1.SelectorType.Adjacent:
            return index === 0 ? "+ " : " + ";
          case types_1.SelectorType.Descendant:
            return " ";
          case types_1.SelectorType.ColumnCombinator:
            return index === 0 ? "|| " : " || ";
          case types_1.SelectorType.Universal:
            return token.namespace === "*" && index + 1 < arr.length && "name" in arr[index + 1] ? "" : "".concat(getNamespace(token.namespace), "*");
          case types_1.SelectorType.Tag:
            return getNamespacedName(token);
          case types_1.SelectorType.PseudoElement:
            return "::".concat(escapeName(token.name, charsToEscapeInName)).concat(token.data === null ? "" : "(".concat(escapeName(token.data, charsToEscapeInPseudoValue), ")"));
          case types_1.SelectorType.Pseudo:
            return ":".concat(escapeName(token.name, charsToEscapeInName)).concat(token.data === null ? "" : "(".concat(typeof token.data === "string" ? escapeName(token.data, charsToEscapeInPseudoValue) : stringify(token.data), ")"));
          case types_1.SelectorType.Attribute: {
            if (token.name === "id" && token.action === types_1.AttributeAction.Equals && token.ignoreCase === "quirks" && !token.namespace) {
              return "#".concat(escapeName(token.value, charsToEscapeInName));
            }
            if (token.name === "class" && token.action === types_1.AttributeAction.Element && token.ignoreCase === "quirks" && !token.namespace) {
              return ".".concat(escapeName(token.value, charsToEscapeInName));
            }
            var name_1 = getNamespacedName(token);
            if (token.action === types_1.AttributeAction.Exists) {
              return "[".concat(name_1, "]");
            }
            return "[".concat(name_1).concat(getActionValue(token.action), '="').concat(escapeName(token.value, charsToEscapeInAttributeValue), '"').concat(token.ignoreCase === null ? "" : token.ignoreCase ? " i" : " s", "]");
          }
        }
      }
      function getActionValue(action) {
        switch (action) {
          case types_1.AttributeAction.Equals:
            return "";
          case types_1.AttributeAction.Element:
            return "~";
          case types_1.AttributeAction.Start:
            return "^";
          case types_1.AttributeAction.End:
            return "$";
          case types_1.AttributeAction.Any:
            return "*";
          case types_1.AttributeAction.Not:
            return "!";
          case types_1.AttributeAction.Hyphen:
            return "|";
          case types_1.AttributeAction.Exists:
            throw new Error("Shouldn't be here");
        }
      }
      function getNamespacedName(token) {
        return "".concat(getNamespace(token.namespace)).concat(escapeName(token.name, charsToEscapeInName));
      }
      function getNamespace(namespace) {
        return namespace !== null ? "".concat(namespace === "*" ? "*" : escapeName(namespace, charsToEscapeInName), "|") : "";
      }
      function escapeName(str, charsToEscape) {
        var lastIdx = 0;
        var ret = "";
        for (var i = 0; i < str.length; i++) {
          if (charsToEscape.has(str.charCodeAt(i))) {
            ret += "".concat(str.slice(lastIdx, i), "\\").concat(str.charAt(i));
            lastIdx = i + 1;
          }
        }
        return ret.length > 0 ? ret + str.slice(lastIdx) : str;
      }
    }
  });

  // node_modules/.pnpm/css-what@6.1.0/node_modules/css-what/lib/commonjs/index.js
  var require_commonjs = __commonJS({
    "node_modules/.pnpm/css-what@6.1.0/node_modules/css-what/lib/commonjs/index.js"(exports) {
      "use strict";
      var __createBinding = exports && exports.__createBinding || (Object.create ? function(o, m, k, k2) {
        if (k2 === void 0)
          k2 = k;
        var desc = Object.getOwnPropertyDescriptor(m, k);
        if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
          desc = { enumerable: true, get: function() {
            return m[k];
          } };
        }
        Object.defineProperty(o, k2, desc);
      } : function(o, m, k, k2) {
        if (k2 === void 0)
          k2 = k;
        o[k2] = m[k];
      });
      var __exportStar = exports && exports.__exportStar || function(m, exports2) {
        for (var p in m)
          if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports2, p))
            __createBinding(exports2, m, p);
      };
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.stringify = exports.parse = exports.isTraversal = void 0;
      __exportStar(require_types(), exports);
      var parse_1 = require_parse();
      Object.defineProperty(exports, "isTraversal", { enumerable: true, get: function() {
        return parse_1.isTraversal;
      } });
      Object.defineProperty(exports, "parse", { enumerable: true, get: function() {
        return parse_1.parse;
      } });
      var stringify_1 = require_stringify2();
      Object.defineProperty(exports, "stringify", { enumerable: true, get: function() {
        return stringify_1.stringify;
      } });
    }
  });

  // node_modules/.pnpm/css-select@4.3.0/node_modules/css-select/lib/procedure.js
  var require_procedure = __commonJS({
    "node_modules/.pnpm/css-select@4.3.0/node_modules/css-select/lib/procedure.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.isTraversal = exports.procedure = void 0;
      exports.procedure = {
        universal: 50,
        tag: 30,
        attribute: 1,
        pseudo: 0,
        "pseudo-element": 0,
        "column-combinator": -1,
        descendant: -1,
        child: -1,
        parent: -1,
        sibling: -1,
        adjacent: -1,
        _flexibleDescendant: -1
      };
      function isTraversal(t) {
        return exports.procedure[t.type] < 0;
      }
      exports.isTraversal = isTraversal;
    }
  });

  // node_modules/.pnpm/css-select@4.3.0/node_modules/css-select/lib/sort.js
  var require_sort = __commonJS({
    "node_modules/.pnpm/css-select@4.3.0/node_modules/css-select/lib/sort.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      var css_what_1 = require_commonjs();
      var procedure_1 = require_procedure();
      var attributes = {
        exists: 10,
        equals: 8,
        not: 7,
        start: 6,
        end: 6,
        any: 5,
        hyphen: 4,
        element: 4
      };
      function sortByProcedure(arr) {
        var procs = arr.map(getProcedure);
        for (var i = 1; i < arr.length; i++) {
          var procNew = procs[i];
          if (procNew < 0)
            continue;
          for (var j = i - 1; j >= 0 && procNew < procs[j]; j--) {
            var token = arr[j + 1];
            arr[j + 1] = arr[j];
            arr[j] = token;
            procs[j + 1] = procs[j];
            procs[j] = procNew;
          }
        }
      }
      exports.default = sortByProcedure;
      function getProcedure(token) {
        var proc = procedure_1.procedure[token.type];
        if (token.type === css_what_1.SelectorType.Attribute) {
          proc = attributes[token.action];
          if (proc === attributes.equals && token.name === "id") {
            proc = 9;
          }
          if (token.ignoreCase) {
            proc >>= 1;
          }
        } else if (token.type === css_what_1.SelectorType.Pseudo) {
          if (!token.data) {
            proc = 3;
          } else if (token.name === "has" || token.name === "contains") {
            proc = 0;
          } else if (Array.isArray(token.data)) {
            proc = 0;
            for (var i = 0; i < token.data.length; i++) {
              if (token.data[i].length !== 1)
                continue;
              var cur = getProcedure(token.data[i][0]);
              if (cur === 0) {
                proc = 0;
                break;
              }
              if (cur > proc)
                proc = cur;
            }
            if (token.data.length > 1 && proc > 0)
              proc -= 1;
          } else {
            proc = 1;
          }
        }
        return proc;
      }
    }
  });

  // node_modules/.pnpm/css-select@4.3.0/node_modules/css-select/lib/attributes.js
  var require_attributes = __commonJS({
    "node_modules/.pnpm/css-select@4.3.0/node_modules/css-select/lib/attributes.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.attributeRules = void 0;
      var boolbase_1 = require_boolbase();
      var reChars = /[-[\]{}()*+?.,\\^$|#\s]/g;
      function escapeRegex(value) {
        return value.replace(reChars, "\\$&");
      }
      var caseInsensitiveAttributes = /* @__PURE__ */ new Set([
        "accept",
        "accept-charset",
        "align",
        "alink",
        "axis",
        "bgcolor",
        "charset",
        "checked",
        "clear",
        "codetype",
        "color",
        "compact",
        "declare",
        "defer",
        "dir",
        "direction",
        "disabled",
        "enctype",
        "face",
        "frame",
        "hreflang",
        "http-equiv",
        "lang",
        "language",
        "link",
        "media",
        "method",
        "multiple",
        "nohref",
        "noresize",
        "noshade",
        "nowrap",
        "readonly",
        "rel",
        "rev",
        "rules",
        "scope",
        "scrolling",
        "selected",
        "shape",
        "target",
        "text",
        "type",
        "valign",
        "valuetype",
        "vlink"
      ]);
      function shouldIgnoreCase(selector, options) {
        return typeof selector.ignoreCase === "boolean" ? selector.ignoreCase : selector.ignoreCase === "quirks" ? !!options.quirksMode : !options.xmlMode && caseInsensitiveAttributes.has(selector.name);
      }
      exports.attributeRules = {
        equals: function(next, data, options) {
          var adapter = options.adapter;
          var name = data.name;
          var value = data.value;
          if (shouldIgnoreCase(data, options)) {
            value = value.toLowerCase();
            return function(elem) {
              var attr = adapter.getAttributeValue(elem, name);
              return attr != null && attr.length === value.length && attr.toLowerCase() === value && next(elem);
            };
          }
          return function(elem) {
            return adapter.getAttributeValue(elem, name) === value && next(elem);
          };
        },
        hyphen: function(next, data, options) {
          var adapter = options.adapter;
          var name = data.name;
          var value = data.value;
          var len = value.length;
          if (shouldIgnoreCase(data, options)) {
            value = value.toLowerCase();
            return function hyphenIC(elem) {
              var attr = adapter.getAttributeValue(elem, name);
              return attr != null && (attr.length === len || attr.charAt(len) === "-") && attr.substr(0, len).toLowerCase() === value && next(elem);
            };
          }
          return function hyphen(elem) {
            var attr = adapter.getAttributeValue(elem, name);
            return attr != null && (attr.length === len || attr.charAt(len) === "-") && attr.substr(0, len) === value && next(elem);
          };
        },
        element: function(next, data, options) {
          var adapter = options.adapter;
          var name = data.name, value = data.value;
          if (/\s/.test(value)) {
            return boolbase_1.falseFunc;
          }
          var regex = new RegExp("(?:^|\\s)".concat(escapeRegex(value), "(?:$|\\s)"), shouldIgnoreCase(data, options) ? "i" : "");
          return function element(elem) {
            var attr = adapter.getAttributeValue(elem, name);
            return attr != null && attr.length >= value.length && regex.test(attr) && next(elem);
          };
        },
        exists: function(next, _a, _b) {
          var name = _a.name;
          var adapter = _b.adapter;
          return function(elem) {
            return adapter.hasAttrib(elem, name) && next(elem);
          };
        },
        start: function(next, data, options) {
          var adapter = options.adapter;
          var name = data.name;
          var value = data.value;
          var len = value.length;
          if (len === 0) {
            return boolbase_1.falseFunc;
          }
          if (shouldIgnoreCase(data, options)) {
            value = value.toLowerCase();
            return function(elem) {
              var attr = adapter.getAttributeValue(elem, name);
              return attr != null && attr.length >= len && attr.substr(0, len).toLowerCase() === value && next(elem);
            };
          }
          return function(elem) {
            var _a;
            return !!((_a = adapter.getAttributeValue(elem, name)) === null || _a === void 0 ? void 0 : _a.startsWith(value)) && next(elem);
          };
        },
        end: function(next, data, options) {
          var adapter = options.adapter;
          var name = data.name;
          var value = data.value;
          var len = -value.length;
          if (len === 0) {
            return boolbase_1.falseFunc;
          }
          if (shouldIgnoreCase(data, options)) {
            value = value.toLowerCase();
            return function(elem) {
              var _a;
              return ((_a = adapter.getAttributeValue(elem, name)) === null || _a === void 0 ? void 0 : _a.substr(len).toLowerCase()) === value && next(elem);
            };
          }
          return function(elem) {
            var _a;
            return !!((_a = adapter.getAttributeValue(elem, name)) === null || _a === void 0 ? void 0 : _a.endsWith(value)) && next(elem);
          };
        },
        any: function(next, data, options) {
          var adapter = options.adapter;
          var name = data.name, value = data.value;
          if (value === "") {
            return boolbase_1.falseFunc;
          }
          if (shouldIgnoreCase(data, options)) {
            var regex_1 = new RegExp(escapeRegex(value), "i");
            return function anyIC(elem) {
              var attr = adapter.getAttributeValue(elem, name);
              return attr != null && attr.length >= value.length && regex_1.test(attr) && next(elem);
            };
          }
          return function(elem) {
            var _a;
            return !!((_a = adapter.getAttributeValue(elem, name)) === null || _a === void 0 ? void 0 : _a.includes(value)) && next(elem);
          };
        },
        not: function(next, data, options) {
          var adapter = options.adapter;
          var name = data.name;
          var value = data.value;
          if (value === "") {
            return function(elem) {
              return !!adapter.getAttributeValue(elem, name) && next(elem);
            };
          } else if (shouldIgnoreCase(data, options)) {
            value = value.toLowerCase();
            return function(elem) {
              var attr = adapter.getAttributeValue(elem, name);
              return (attr == null || attr.length !== value.length || attr.toLowerCase() !== value) && next(elem);
            };
          }
          return function(elem) {
            return adapter.getAttributeValue(elem, name) !== value && next(elem);
          };
        }
      };
    }
  });

  // node_modules/.pnpm/nth-check@2.1.1/node_modules/nth-check/lib/parse.js
  var require_parse2 = __commonJS({
    "node_modules/.pnpm/nth-check@2.1.1/node_modules/nth-check/lib/parse.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.parse = void 0;
      var whitespace = /* @__PURE__ */ new Set([9, 10, 12, 13, 32]);
      var ZERO = "0".charCodeAt(0);
      var NINE = "9".charCodeAt(0);
      function parse(formula) {
        formula = formula.trim().toLowerCase();
        if (formula === "even") {
          return [2, 0];
        } else if (formula === "odd") {
          return [2, 1];
        }
        var idx = 0;
        var a = 0;
        var sign = readSign();
        var number = readNumber();
        if (idx < formula.length && formula.charAt(idx) === "n") {
          idx++;
          a = sign * (number !== null && number !== void 0 ? number : 1);
          skipWhitespace();
          if (idx < formula.length) {
            sign = readSign();
            skipWhitespace();
            number = readNumber();
          } else {
            sign = number = 0;
          }
        }
        if (number === null || idx < formula.length) {
          throw new Error("n-th rule couldn't be parsed ('".concat(formula, "')"));
        }
        return [a, sign * number];
        function readSign() {
          if (formula.charAt(idx) === "-") {
            idx++;
            return -1;
          }
          if (formula.charAt(idx) === "+") {
            idx++;
          }
          return 1;
        }
        function readNumber() {
          var start = idx;
          var value = 0;
          while (idx < formula.length && formula.charCodeAt(idx) >= ZERO && formula.charCodeAt(idx) <= NINE) {
            value = value * 10 + (formula.charCodeAt(idx) - ZERO);
            idx++;
          }
          return idx === start ? null : value;
        }
        function skipWhitespace() {
          while (idx < formula.length && whitespace.has(formula.charCodeAt(idx))) {
            idx++;
          }
        }
      }
      exports.parse = parse;
    }
  });

  // node_modules/.pnpm/nth-check@2.1.1/node_modules/nth-check/lib/compile.js
  var require_compile = __commonJS({
    "node_modules/.pnpm/nth-check@2.1.1/node_modules/nth-check/lib/compile.js"(exports) {
      "use strict";
      var __importDefault = exports && exports.__importDefault || function(mod) {
        return mod && mod.__esModule ? mod : { "default": mod };
      };
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.generate = exports.compile = void 0;
      var boolbase_1 = __importDefault(require_boolbase());
      function compile(parsed) {
        var a = parsed[0];
        var b = parsed[1] - 1;
        if (b < 0 && a <= 0)
          return boolbase_1.default.falseFunc;
        if (a === -1)
          return function(index) {
            return index <= b;
          };
        if (a === 0)
          return function(index) {
            return index === b;
          };
        if (a === 1)
          return b < 0 ? boolbase_1.default.trueFunc : function(index) {
            return index >= b;
          };
        var absA = Math.abs(a);
        var bMod = (b % absA + absA) % absA;
        return a > 1 ? function(index) {
          return index >= b && index % absA === bMod;
        } : function(index) {
          return index <= b && index % absA === bMod;
        };
      }
      exports.compile = compile;
      function generate(parsed) {
        var a = parsed[0];
        var b = parsed[1] - 1;
        var n = 0;
        if (a < 0) {
          var aPos_1 = -a;
          var minValue_1 = (b % aPos_1 + aPos_1) % aPos_1;
          return function() {
            var val = minValue_1 + aPos_1 * n++;
            return val > b ? null : val;
          };
        }
        if (a === 0)
          return b < 0 ? (
            // There are no result — always return `null`
            function() {
              return null;
            }
          ) : (
            // Return `b` exactly once
            function() {
              return n++ === 0 ? b : null;
            }
          );
        if (b < 0) {
          b += a * Math.ceil(-b / a);
        }
        return function() {
          return a * n++ + b;
        };
      }
      exports.generate = generate;
    }
  });

  // node_modules/.pnpm/nth-check@2.1.1/node_modules/nth-check/lib/index.js
  var require_lib7 = __commonJS({
    "node_modules/.pnpm/nth-check@2.1.1/node_modules/nth-check/lib/index.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.sequence = exports.generate = exports.compile = exports.parse = void 0;
      var parse_js_1 = require_parse2();
      Object.defineProperty(exports, "parse", { enumerable: true, get: function() {
        return parse_js_1.parse;
      } });
      var compile_js_1 = require_compile();
      Object.defineProperty(exports, "compile", { enumerable: true, get: function() {
        return compile_js_1.compile;
      } });
      Object.defineProperty(exports, "generate", { enumerable: true, get: function() {
        return compile_js_1.generate;
      } });
      function nthCheck(formula) {
        return (0, compile_js_1.compile)((0, parse_js_1.parse)(formula));
      }
      exports.default = nthCheck;
      function sequence(formula) {
        return (0, compile_js_1.generate)((0, parse_js_1.parse)(formula));
      }
      exports.sequence = sequence;
    }
  });

  // node_modules/.pnpm/css-select@4.3.0/node_modules/css-select/lib/pseudo-selectors/filters.js
  var require_filters = __commonJS({
    "node_modules/.pnpm/css-select@4.3.0/node_modules/css-select/lib/pseudo-selectors/filters.js"(exports) {
      "use strict";
      var __importDefault = exports && exports.__importDefault || function(mod) {
        return mod && mod.__esModule ? mod : { "default": mod };
      };
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.filters = void 0;
      var nth_check_1 = __importDefault(require_lib7());
      var boolbase_1 = require_boolbase();
      function getChildFunc(next, adapter) {
        return function(elem) {
          var parent = adapter.getParent(elem);
          return parent != null && adapter.isTag(parent) && next(elem);
        };
      }
      exports.filters = {
        contains: function(next, text, _a) {
          var adapter = _a.adapter;
          return function contains(elem) {
            return next(elem) && adapter.getText(elem).includes(text);
          };
        },
        icontains: function(next, text, _a) {
          var adapter = _a.adapter;
          var itext = text.toLowerCase();
          return function icontains(elem) {
            return next(elem) && adapter.getText(elem).toLowerCase().includes(itext);
          };
        },
        // Location specific methods
        "nth-child": function(next, rule, _a) {
          var adapter = _a.adapter, equals = _a.equals;
          var func = (0, nth_check_1.default)(rule);
          if (func === boolbase_1.falseFunc)
            return boolbase_1.falseFunc;
          if (func === boolbase_1.trueFunc)
            return getChildFunc(next, adapter);
          return function nthChild(elem) {
            var siblings = adapter.getSiblings(elem);
            var pos = 0;
            for (var i = 0; i < siblings.length; i++) {
              if (equals(elem, siblings[i]))
                break;
              if (adapter.isTag(siblings[i])) {
                pos++;
              }
            }
            return func(pos) && next(elem);
          };
        },
        "nth-last-child": function(next, rule, _a) {
          var adapter = _a.adapter, equals = _a.equals;
          var func = (0, nth_check_1.default)(rule);
          if (func === boolbase_1.falseFunc)
            return boolbase_1.falseFunc;
          if (func === boolbase_1.trueFunc)
            return getChildFunc(next, adapter);
          return function nthLastChild(elem) {
            var siblings = adapter.getSiblings(elem);
            var pos = 0;
            for (var i = siblings.length - 1; i >= 0; i--) {
              if (equals(elem, siblings[i]))
                break;
              if (adapter.isTag(siblings[i])) {
                pos++;
              }
            }
            return func(pos) && next(elem);
          };
        },
        "nth-of-type": function(next, rule, _a) {
          var adapter = _a.adapter, equals = _a.equals;
          var func = (0, nth_check_1.default)(rule);
          if (func === boolbase_1.falseFunc)
            return boolbase_1.falseFunc;
          if (func === boolbase_1.trueFunc)
            return getChildFunc(next, adapter);
          return function nthOfType(elem) {
            var siblings = adapter.getSiblings(elem);
            var pos = 0;
            for (var i = 0; i < siblings.length; i++) {
              var currentSibling = siblings[i];
              if (equals(elem, currentSibling))
                break;
              if (adapter.isTag(currentSibling) && adapter.getName(currentSibling) === adapter.getName(elem)) {
                pos++;
              }
            }
            return func(pos) && next(elem);
          };
        },
        "nth-last-of-type": function(next, rule, _a) {
          var adapter = _a.adapter, equals = _a.equals;
          var func = (0, nth_check_1.default)(rule);
          if (func === boolbase_1.falseFunc)
            return boolbase_1.falseFunc;
          if (func === boolbase_1.trueFunc)
            return getChildFunc(next, adapter);
          return function nthLastOfType(elem) {
            var siblings = adapter.getSiblings(elem);
            var pos = 0;
            for (var i = siblings.length - 1; i >= 0; i--) {
              var currentSibling = siblings[i];
              if (equals(elem, currentSibling))
                break;
              if (adapter.isTag(currentSibling) && adapter.getName(currentSibling) === adapter.getName(elem)) {
                pos++;
              }
            }
            return func(pos) && next(elem);
          };
        },
        // TODO determine the actual root element
        root: function(next, _rule, _a) {
          var adapter = _a.adapter;
          return function(elem) {
            var parent = adapter.getParent(elem);
            return (parent == null || !adapter.isTag(parent)) && next(elem);
          };
        },
        scope: function(next, rule, options, context) {
          var equals = options.equals;
          if (!context || context.length === 0) {
            return exports.filters.root(next, rule, options);
          }
          if (context.length === 1) {
            return function(elem) {
              return equals(context[0], elem) && next(elem);
            };
          }
          return function(elem) {
            return context.includes(elem) && next(elem);
          };
        },
        hover: dynamicStatePseudo("isHovered"),
        visited: dynamicStatePseudo("isVisited"),
        active: dynamicStatePseudo("isActive")
      };
      function dynamicStatePseudo(name) {
        return function dynamicPseudo(next, _rule, _a) {
          var adapter = _a.adapter;
          var func = adapter[name];
          if (typeof func !== "function") {
            return boolbase_1.falseFunc;
          }
          return function active(elem) {
            return func(elem) && next(elem);
          };
        };
      }
    }
  });

  // node_modules/.pnpm/css-select@4.3.0/node_modules/css-select/lib/pseudo-selectors/pseudos.js
  var require_pseudos = __commonJS({
    "node_modules/.pnpm/css-select@4.3.0/node_modules/css-select/lib/pseudo-selectors/pseudos.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.verifyPseudoArgs = exports.pseudos = void 0;
      exports.pseudos = {
        empty: function(elem, _a) {
          var adapter = _a.adapter;
          return !adapter.getChildren(elem).some(function(elem2) {
            return adapter.isTag(elem2) || adapter.getText(elem2) !== "";
          });
        },
        "first-child": function(elem, _a) {
          var adapter = _a.adapter, equals = _a.equals;
          var firstChild = adapter.getSiblings(elem).find(function(elem2) {
            return adapter.isTag(elem2);
          });
          return firstChild != null && equals(elem, firstChild);
        },
        "last-child": function(elem, _a) {
          var adapter = _a.adapter, equals = _a.equals;
          var siblings = adapter.getSiblings(elem);
          for (var i = siblings.length - 1; i >= 0; i--) {
            if (equals(elem, siblings[i]))
              return true;
            if (adapter.isTag(siblings[i]))
              break;
          }
          return false;
        },
        "first-of-type": function(elem, _a) {
          var adapter = _a.adapter, equals = _a.equals;
          var siblings = adapter.getSiblings(elem);
          var elemName = adapter.getName(elem);
          for (var i = 0; i < siblings.length; i++) {
            var currentSibling = siblings[i];
            if (equals(elem, currentSibling))
              return true;
            if (adapter.isTag(currentSibling) && adapter.getName(currentSibling) === elemName) {
              break;
            }
          }
          return false;
        },
        "last-of-type": function(elem, _a) {
          var adapter = _a.adapter, equals = _a.equals;
          var siblings = adapter.getSiblings(elem);
          var elemName = adapter.getName(elem);
          for (var i = siblings.length - 1; i >= 0; i--) {
            var currentSibling = siblings[i];
            if (equals(elem, currentSibling))
              return true;
            if (adapter.isTag(currentSibling) && adapter.getName(currentSibling) === elemName) {
              break;
            }
          }
          return false;
        },
        "only-of-type": function(elem, _a) {
          var adapter = _a.adapter, equals = _a.equals;
          var elemName = adapter.getName(elem);
          return adapter.getSiblings(elem).every(function(sibling) {
            return equals(elem, sibling) || !adapter.isTag(sibling) || adapter.getName(sibling) !== elemName;
          });
        },
        "only-child": function(elem, _a) {
          var adapter = _a.adapter, equals = _a.equals;
          return adapter.getSiblings(elem).every(function(sibling) {
            return equals(elem, sibling) || !adapter.isTag(sibling);
          });
        }
      };
      function verifyPseudoArgs(func, name, subselect) {
        if (subselect === null) {
          if (func.length > 2) {
            throw new Error("pseudo-selector :".concat(name, " requires an argument"));
          }
        } else if (func.length === 2) {
          throw new Error("pseudo-selector :".concat(name, " doesn't have any arguments"));
        }
      }
      exports.verifyPseudoArgs = verifyPseudoArgs;
    }
  });

  // node_modules/.pnpm/css-select@4.3.0/node_modules/css-select/lib/pseudo-selectors/aliases.js
  var require_aliases = __commonJS({
    "node_modules/.pnpm/css-select@4.3.0/node_modules/css-select/lib/pseudo-selectors/aliases.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.aliases = void 0;
      exports.aliases = {
        // Links
        "any-link": ":is(a, area, link)[href]",
        link: ":any-link:not(:visited)",
        // Forms
        // https://html.spec.whatwg.org/multipage/scripting.html#disabled-elements
        disabled: ":is(\n        :is(button, input, select, textarea, optgroup, option)[disabled],\n        optgroup[disabled] > option,\n        fieldset[disabled]:not(fieldset[disabled] legend:first-of-type *)\n    )",
        enabled: ":not(:disabled)",
        checked: ":is(:is(input[type=radio], input[type=checkbox])[checked], option:selected)",
        required: ":is(input, select, textarea)[required]",
        optional: ":is(input, select, textarea):not([required])",
        // JQuery extensions
        // https://html.spec.whatwg.org/multipage/form-elements.html#concept-option-selectedness
        selected: "option:is([selected], select:not([multiple]):not(:has(> option[selected])) > :first-of-type)",
        checkbox: "[type=checkbox]",
        file: "[type=file]",
        password: "[type=password]",
        radio: "[type=radio]",
        reset: "[type=reset]",
        image: "[type=image]",
        submit: "[type=submit]",
        parent: ":not(:empty)",
        header: ":is(h1, h2, h3, h4, h5, h6)",
        button: ":is(button, input[type=button])",
        input: ":is(input, textarea, select, button)",
        text: "input:is(:not([type!='']), [type=text])"
      };
    }
  });

  // node_modules/.pnpm/css-select@4.3.0/node_modules/css-select/lib/pseudo-selectors/subselects.js
  var require_subselects = __commonJS({
    "node_modules/.pnpm/css-select@4.3.0/node_modules/css-select/lib/pseudo-selectors/subselects.js"(exports) {
      "use strict";
      var __spreadArray = exports && exports.__spreadArray || function(to, from, pack) {
        if (pack || arguments.length === 2)
          for (var i = 0, l = from.length, ar; i < l; i++) {
            if (ar || !(i in from)) {
              if (!ar)
                ar = Array.prototype.slice.call(from, 0, i);
              ar[i] = from[i];
            }
          }
        return to.concat(ar || Array.prototype.slice.call(from));
      };
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.subselects = exports.getNextSiblings = exports.ensureIsTag = exports.PLACEHOLDER_ELEMENT = void 0;
      var boolbase_1 = require_boolbase();
      var procedure_1 = require_procedure();
      exports.PLACEHOLDER_ELEMENT = {};
      function ensureIsTag(next, adapter) {
        if (next === boolbase_1.falseFunc)
          return boolbase_1.falseFunc;
        return function(elem) {
          return adapter.isTag(elem) && next(elem);
        };
      }
      exports.ensureIsTag = ensureIsTag;
      function getNextSiblings(elem, adapter) {
        var siblings = adapter.getSiblings(elem);
        if (siblings.length <= 1)
          return [];
        var elemIndex = siblings.indexOf(elem);
        if (elemIndex < 0 || elemIndex === siblings.length - 1)
          return [];
        return siblings.slice(elemIndex + 1).filter(adapter.isTag);
      }
      exports.getNextSiblings = getNextSiblings;
      var is = function(next, token, options, context, compileToken) {
        var opts = {
          xmlMode: !!options.xmlMode,
          adapter: options.adapter,
          equals: options.equals
        };
        var func = compileToken(token, opts, context);
        return function(elem) {
          return func(elem) && next(elem);
        };
      };
      exports.subselects = {
        is,
        /**
         * `:matches` and `:where` are aliases for `:is`.
         */
        matches: is,
        where: is,
        not: function(next, token, options, context, compileToken) {
          var opts = {
            xmlMode: !!options.xmlMode,
            adapter: options.adapter,
            equals: options.equals
          };
          var func = compileToken(token, opts, context);
          if (func === boolbase_1.falseFunc)
            return next;
          if (func === boolbase_1.trueFunc)
            return boolbase_1.falseFunc;
          return function not(elem) {
            return !func(elem) && next(elem);
          };
        },
        has: function(next, subselect, options, _context, compileToken) {
          var adapter = options.adapter;
          var opts = {
            xmlMode: !!options.xmlMode,
            adapter,
            equals: options.equals
          };
          var context = subselect.some(function(s) {
            return s.some(procedure_1.isTraversal);
          }) ? [exports.PLACEHOLDER_ELEMENT] : void 0;
          var compiled = compileToken(subselect, opts, context);
          if (compiled === boolbase_1.falseFunc)
            return boolbase_1.falseFunc;
          if (compiled === boolbase_1.trueFunc) {
            return function(elem) {
              return adapter.getChildren(elem).some(adapter.isTag) && next(elem);
            };
          }
          var hasElement = ensureIsTag(compiled, adapter);
          var _a = compiled.shouldTestNextSiblings, shouldTestNextSiblings = _a === void 0 ? false : _a;
          if (context) {
            return function(elem) {
              context[0] = elem;
              var childs = adapter.getChildren(elem);
              var nextElements = shouldTestNextSiblings ? __spreadArray(__spreadArray([], childs, true), getNextSiblings(elem, adapter), true) : childs;
              return next(elem) && adapter.existsOne(hasElement, nextElements);
            };
          }
          return function(elem) {
            return next(elem) && adapter.existsOne(hasElement, adapter.getChildren(elem));
          };
        }
      };
    }
  });

  // node_modules/.pnpm/css-select@4.3.0/node_modules/css-select/lib/pseudo-selectors/index.js
  var require_pseudo_selectors = __commonJS({
    "node_modules/.pnpm/css-select@4.3.0/node_modules/css-select/lib/pseudo-selectors/index.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.compilePseudoSelector = exports.aliases = exports.pseudos = exports.filters = void 0;
      var boolbase_1 = require_boolbase();
      var css_what_1 = require_commonjs();
      var filters_1 = require_filters();
      Object.defineProperty(exports, "filters", { enumerable: true, get: function() {
        return filters_1.filters;
      } });
      var pseudos_1 = require_pseudos();
      Object.defineProperty(exports, "pseudos", { enumerable: true, get: function() {
        return pseudos_1.pseudos;
      } });
      var aliases_1 = require_aliases();
      Object.defineProperty(exports, "aliases", { enumerable: true, get: function() {
        return aliases_1.aliases;
      } });
      var subselects_1 = require_subselects();
      function compilePseudoSelector(next, selector, options, context, compileToken) {
        var name = selector.name, data = selector.data;
        if (Array.isArray(data)) {
          return subselects_1.subselects[name](next, data, options, context, compileToken);
        }
        if (name in aliases_1.aliases) {
          if (data != null) {
            throw new Error("Pseudo ".concat(name, " doesn't have any arguments"));
          }
          var alias = (0, css_what_1.parse)(aliases_1.aliases[name]);
          return subselects_1.subselects.is(next, alias, options, context, compileToken);
        }
        if (name in filters_1.filters) {
          return filters_1.filters[name](next, data, options, context);
        }
        if (name in pseudos_1.pseudos) {
          var pseudo_1 = pseudos_1.pseudos[name];
          (0, pseudos_1.verifyPseudoArgs)(pseudo_1, name, data);
          return pseudo_1 === boolbase_1.falseFunc ? boolbase_1.falseFunc : next === boolbase_1.trueFunc ? function(elem) {
            return pseudo_1(elem, options, data);
          } : function(elem) {
            return pseudo_1(elem, options, data) && next(elem);
          };
        }
        throw new Error("unmatched pseudo-class :".concat(name));
      }
      exports.compilePseudoSelector = compilePseudoSelector;
    }
  });

  // node_modules/.pnpm/css-select@4.3.0/node_modules/css-select/lib/general.js
  var require_general = __commonJS({
    "node_modules/.pnpm/css-select@4.3.0/node_modules/css-select/lib/general.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.compileGeneralSelector = void 0;
      var attributes_1 = require_attributes();
      var pseudo_selectors_1 = require_pseudo_selectors();
      var css_what_1 = require_commonjs();
      function compileGeneralSelector(next, selector, options, context, compileToken) {
        var adapter = options.adapter, equals = options.equals;
        switch (selector.type) {
          case css_what_1.SelectorType.PseudoElement: {
            throw new Error("Pseudo-elements are not supported by css-select");
          }
          case css_what_1.SelectorType.ColumnCombinator: {
            throw new Error("Column combinators are not yet supported by css-select");
          }
          case css_what_1.SelectorType.Attribute: {
            if (selector.namespace != null) {
              throw new Error("Namespaced attributes are not yet supported by css-select");
            }
            if (!options.xmlMode || options.lowerCaseAttributeNames) {
              selector.name = selector.name.toLowerCase();
            }
            return attributes_1.attributeRules[selector.action](next, selector, options);
          }
          case css_what_1.SelectorType.Pseudo: {
            return (0, pseudo_selectors_1.compilePseudoSelector)(next, selector, options, context, compileToken);
          }
          case css_what_1.SelectorType.Tag: {
            if (selector.namespace != null) {
              throw new Error("Namespaced tag names are not yet supported by css-select");
            }
            var name_1 = selector.name;
            if (!options.xmlMode || options.lowerCaseTags) {
              name_1 = name_1.toLowerCase();
            }
            return function tag(elem) {
              return adapter.getName(elem) === name_1 && next(elem);
            };
          }
          case css_what_1.SelectorType.Descendant: {
            if (options.cacheResults === false || typeof WeakSet === "undefined") {
              return function descendant(elem) {
                var current = elem;
                while (current = adapter.getParent(current)) {
                  if (adapter.isTag(current) && next(current)) {
                    return true;
                  }
                }
                return false;
              };
            }
            var isFalseCache_1 = /* @__PURE__ */ new WeakSet();
            return function cachedDescendant(elem) {
              var current = elem;
              while (current = adapter.getParent(current)) {
                if (!isFalseCache_1.has(current)) {
                  if (adapter.isTag(current) && next(current)) {
                    return true;
                  }
                  isFalseCache_1.add(current);
                }
              }
              return false;
            };
          }
          case "_flexibleDescendant": {
            return function flexibleDescendant(elem) {
              var current = elem;
              do {
                if (adapter.isTag(current) && next(current))
                  return true;
              } while (current = adapter.getParent(current));
              return false;
            };
          }
          case css_what_1.SelectorType.Parent: {
            return function parent(elem) {
              return adapter.getChildren(elem).some(function(elem2) {
                return adapter.isTag(elem2) && next(elem2);
              });
            };
          }
          case css_what_1.SelectorType.Child: {
            return function child(elem) {
              var parent = adapter.getParent(elem);
              return parent != null && adapter.isTag(parent) && next(parent);
            };
          }
          case css_what_1.SelectorType.Sibling: {
            return function sibling(elem) {
              var siblings = adapter.getSiblings(elem);
              for (var i = 0; i < siblings.length; i++) {
                var currentSibling = siblings[i];
                if (equals(elem, currentSibling))
                  break;
                if (adapter.isTag(currentSibling) && next(currentSibling)) {
                  return true;
                }
              }
              return false;
            };
          }
          case css_what_1.SelectorType.Adjacent: {
            if (adapter.prevElementSibling) {
              return function adjacent(elem) {
                var previous = adapter.prevElementSibling(elem);
                return previous != null && next(previous);
              };
            }
            return function adjacent(elem) {
              var siblings = adapter.getSiblings(elem);
              var lastElement;
              for (var i = 0; i < siblings.length; i++) {
                var currentSibling = siblings[i];
                if (equals(elem, currentSibling))
                  break;
                if (adapter.isTag(currentSibling)) {
                  lastElement = currentSibling;
                }
              }
              return !!lastElement && next(lastElement);
            };
          }
          case css_what_1.SelectorType.Universal: {
            if (selector.namespace != null && selector.namespace !== "*") {
              throw new Error("Namespaced universal selectors are not yet supported by css-select");
            }
            return next;
          }
        }
      }
      exports.compileGeneralSelector = compileGeneralSelector;
    }
  });

  // node_modules/.pnpm/css-select@4.3.0/node_modules/css-select/lib/compile.js
  var require_compile2 = __commonJS({
    "node_modules/.pnpm/css-select@4.3.0/node_modules/css-select/lib/compile.js"(exports) {
      "use strict";
      var __importDefault = exports && exports.__importDefault || function(mod) {
        return mod && mod.__esModule ? mod : { "default": mod };
      };
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.compileToken = exports.compileUnsafe = exports.compile = void 0;
      var css_what_1 = require_commonjs();
      var boolbase_1 = require_boolbase();
      var sort_1 = __importDefault(require_sort());
      var procedure_1 = require_procedure();
      var general_1 = require_general();
      var subselects_1 = require_subselects();
      function compile(selector, options, context) {
        var next = compileUnsafe(selector, options, context);
        return (0, subselects_1.ensureIsTag)(next, options.adapter);
      }
      exports.compile = compile;
      function compileUnsafe(selector, options, context) {
        var token = typeof selector === "string" ? (0, css_what_1.parse)(selector) : selector;
        return compileToken(token, options, context);
      }
      exports.compileUnsafe = compileUnsafe;
      function includesScopePseudo(t) {
        return t.type === "pseudo" && (t.name === "scope" || Array.isArray(t.data) && t.data.some(function(data) {
          return data.some(includesScopePseudo);
        }));
      }
      var DESCENDANT_TOKEN = { type: css_what_1.SelectorType.Descendant };
      var FLEXIBLE_DESCENDANT_TOKEN = {
        type: "_flexibleDescendant"
      };
      var SCOPE_TOKEN = {
        type: css_what_1.SelectorType.Pseudo,
        name: "scope",
        data: null
      };
      function absolutize(token, _a, context) {
        var adapter = _a.adapter;
        var hasContext = !!(context === null || context === void 0 ? void 0 : context.every(function(e) {
          var parent = adapter.isTag(e) && adapter.getParent(e);
          return e === subselects_1.PLACEHOLDER_ELEMENT || parent && adapter.isTag(parent);
        }));
        for (var _i = 0, token_1 = token; _i < token_1.length; _i++) {
          var t = token_1[_i];
          if (t.length > 0 && (0, procedure_1.isTraversal)(t[0]) && t[0].type !== "descendant") {
          } else if (hasContext && !t.some(includesScopePseudo)) {
            t.unshift(DESCENDANT_TOKEN);
          } else {
            continue;
          }
          t.unshift(SCOPE_TOKEN);
        }
      }
      function compileToken(token, options, context) {
        var _a;
        token = token.filter(function(t) {
          return t.length > 0;
        });
        token.forEach(sort_1.default);
        context = (_a = options.context) !== null && _a !== void 0 ? _a : context;
        var isArrayContext = Array.isArray(context);
        var finalContext = context && (Array.isArray(context) ? context : [context]);
        absolutize(token, options, finalContext);
        var shouldTestNextSiblings = false;
        var query = token.map(function(rules) {
          if (rules.length >= 2) {
            var first = rules[0], second = rules[1];
            if (first.type !== "pseudo" || first.name !== "scope") {
            } else if (isArrayContext && second.type === "descendant") {
              rules[1] = FLEXIBLE_DESCENDANT_TOKEN;
            } else if (second.type === "adjacent" || second.type === "sibling") {
              shouldTestNextSiblings = true;
            }
          }
          return compileRules(rules, options, finalContext);
        }).reduce(reduceRules, boolbase_1.falseFunc);
        query.shouldTestNextSiblings = shouldTestNextSiblings;
        return query;
      }
      exports.compileToken = compileToken;
      function compileRules(rules, options, context) {
        var _a;
        return rules.reduce(function(previous, rule) {
          return previous === boolbase_1.falseFunc ? boolbase_1.falseFunc : (0, general_1.compileGeneralSelector)(previous, rule, options, context, compileToken);
        }, (_a = options.rootFunc) !== null && _a !== void 0 ? _a : boolbase_1.trueFunc);
      }
      function reduceRules(a, b) {
        if (b === boolbase_1.falseFunc || a === boolbase_1.trueFunc) {
          return a;
        }
        if (a === boolbase_1.falseFunc || b === boolbase_1.trueFunc) {
          return b;
        }
        return function combine(elem) {
          return a(elem) || b(elem);
        };
      }
    }
  });

  // node_modules/.pnpm/css-select@4.3.0/node_modules/css-select/lib/index.js
  var require_lib8 = __commonJS({
    "node_modules/.pnpm/css-select@4.3.0/node_modules/css-select/lib/index.js"(exports) {
      "use strict";
      var __createBinding = exports && exports.__createBinding || (Object.create ? function(o, m, k, k2) {
        if (k2 === void 0)
          k2 = k;
        var desc = Object.getOwnPropertyDescriptor(m, k);
        if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
          desc = { enumerable: true, get: function() {
            return m[k];
          } };
        }
        Object.defineProperty(o, k2, desc);
      } : function(o, m, k, k2) {
        if (k2 === void 0)
          k2 = k;
        o[k2] = m[k];
      });
      var __setModuleDefault = exports && exports.__setModuleDefault || (Object.create ? function(o, v) {
        Object.defineProperty(o, "default", { enumerable: true, value: v });
      } : function(o, v) {
        o["default"] = v;
      });
      var __importStar = exports && exports.__importStar || function(mod) {
        if (mod && mod.__esModule)
          return mod;
        var result = {};
        if (mod != null) {
          for (var k in mod)
            if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k))
              __createBinding(result, mod, k);
        }
        __setModuleDefault(result, mod);
        return result;
      };
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.aliases = exports.pseudos = exports.filters = exports.is = exports.selectOne = exports.selectAll = exports.prepareContext = exports._compileToken = exports._compileUnsafe = exports.compile = void 0;
      var DomUtils = __importStar(require_lib5());
      var boolbase_1 = require_boolbase();
      var compile_1 = require_compile2();
      var subselects_1 = require_subselects();
      var defaultEquals = function(a, b) {
        return a === b;
      };
      var defaultOptions = {
        adapter: DomUtils,
        equals: defaultEquals
      };
      function convertOptionFormats(options) {
        var _a, _b, _c, _d;
        var opts = options !== null && options !== void 0 ? options : defaultOptions;
        (_a = opts.adapter) !== null && _a !== void 0 ? _a : opts.adapter = DomUtils;
        (_b = opts.equals) !== null && _b !== void 0 ? _b : opts.equals = (_d = (_c = opts.adapter) === null || _c === void 0 ? void 0 : _c.equals) !== null && _d !== void 0 ? _d : defaultEquals;
        return opts;
      }
      function wrapCompile(func) {
        return function addAdapter(selector, options, context) {
          var opts = convertOptionFormats(options);
          return func(selector, opts, context);
        };
      }
      exports.compile = wrapCompile(compile_1.compile);
      exports._compileUnsafe = wrapCompile(compile_1.compileUnsafe);
      exports._compileToken = wrapCompile(compile_1.compileToken);
      function getSelectorFunc(searchFunc) {
        return function select(query, elements, options) {
          var opts = convertOptionFormats(options);
          if (typeof query !== "function") {
            query = (0, compile_1.compileUnsafe)(query, opts, elements);
          }
          var filteredElements = prepareContext(elements, opts.adapter, query.shouldTestNextSiblings);
          return searchFunc(query, filteredElements, opts);
        };
      }
      function prepareContext(elems, adapter, shouldTestNextSiblings) {
        if (shouldTestNextSiblings === void 0) {
          shouldTestNextSiblings = false;
        }
        if (shouldTestNextSiblings) {
          elems = appendNextSiblings(elems, adapter);
        }
        return Array.isArray(elems) ? adapter.removeSubsets(elems) : adapter.getChildren(elems);
      }
      exports.prepareContext = prepareContext;
      function appendNextSiblings(elem, adapter) {
        var elems = Array.isArray(elem) ? elem.slice(0) : [elem];
        var elemsLength = elems.length;
        for (var i = 0; i < elemsLength; i++) {
          var nextSiblings = (0, subselects_1.getNextSiblings)(elems[i], adapter);
          elems.push.apply(elems, nextSiblings);
        }
        return elems;
      }
      exports.selectAll = getSelectorFunc(function(query, elems, options) {
        return query === boolbase_1.falseFunc || !elems || elems.length === 0 ? [] : options.adapter.findAll(query, elems);
      });
      exports.selectOne = getSelectorFunc(function(query, elems, options) {
        return query === boolbase_1.falseFunc || !elems || elems.length === 0 ? null : options.adapter.findOne(query, elems);
      });
      function is(elem, query, options) {
        var opts = convertOptionFormats(options);
        return (typeof query === "function" ? query : (0, compile_1.compile)(query, opts))(elem);
      }
      exports.is = is;
      exports.default = exports.selectAll;
      var pseudo_selectors_1 = require_pseudo_selectors();
      Object.defineProperty(exports, "filters", { enumerable: true, get: function() {
        return pseudo_selectors_1.filters;
      } });
      Object.defineProperty(exports, "pseudos", { enumerable: true, get: function() {
        return pseudo_selectors_1.pseudos;
      } });
      Object.defineProperty(exports, "aliases", { enumerable: true, get: function() {
        return pseudo_selectors_1.aliases;
      } });
    }
  });

  // node_modules/.pnpm/renderkid@3.0.0/node_modules/renderkid/lib/renderKid/styles/rule/Selector.js
  var require_Selector = __commonJS({
    "node_modules/.pnpm/renderkid@3.0.0/node_modules/renderkid/lib/renderKid/styles/rule/Selector.js"(exports, module) {
      "use strict";
      function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
          throw new TypeError("Cannot call a class as a function");
        }
      }
      function _defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
          var descriptor = props[i];
          descriptor.enumerable = descriptor.enumerable || false;
          descriptor.configurable = true;
          if ("value" in descriptor)
            descriptor.writable = true;
          Object.defineProperty(target, descriptor.key, descriptor);
        }
      }
      function _createClass(Constructor, protoProps, staticProps) {
        if (protoProps)
          _defineProperties(Constructor.prototype, protoProps);
        if (staticProps)
          _defineProperties(Constructor, staticProps);
        return Constructor;
      }
      var CSSSelect;
      var Selector;
      CSSSelect = require_lib8();
      module.exports = Selector = function() {
        var self2;
        var Selector2 = /* @__PURE__ */ function() {
          function Selector3(text1) {
            _classCallCheck(this, Selector3);
            this.text = text1;
            this._fn = CSSSelect.compile(this.text);
            this.priority = self2.calculatePriority(this.text);
          }
          _createClass(Selector3, [{
            key: "matches",
            value: function matches(elem) {
              return CSSSelect.is(elem, this._fn);
            }
            // This stupid piece of code is supposed to calculate
            // selector priority, somehow according to
            // http://www.w3.org/wiki/CSS/Training/Priority_level_of_selector
          }], [{
            key: "calculatePriority",
            value: function calculatePriority(text) {
              var n, priotrity;
              priotrity = 0;
              if (n = text.match(/[\#]{1}/g)) {
                priotrity += 100 * n.length;
              }
              if (n = text.match(/[a-zA-Z]+/g)) {
                priotrity += 2 * n.length;
              }
              if (n = text.match(/\*/g)) {
                priotrity += 1 * n.length;
              }
              return priotrity;
            }
          }]);
          return Selector3;
        }();
        ;
        self2 = Selector2;
        return Selector2;
      }.call(void 0);
    }
  });

  // node_modules/.pnpm/renderkid@3.0.0/node_modules/renderkid/lib/renderKid/styles/rule/declarationBlock/_Declaration.js
  var require_Declaration = __commonJS({
    "node_modules/.pnpm/renderkid@3.0.0/node_modules/renderkid/lib/renderKid/styles/rule/declarationBlock/_Declaration.js"(exports, module) {
      "use strict";
      function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
          throw new TypeError("Cannot call a class as a function");
        }
      }
      function _defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
          var descriptor = props[i];
          descriptor.enumerable = descriptor.enumerable || false;
          descriptor.configurable = true;
          if ("value" in descriptor)
            descriptor.writable = true;
          Object.defineProperty(target, descriptor.key, descriptor);
        }
      }
      function _createClass(Constructor, protoProps, staticProps) {
        if (protoProps)
          _defineProperties(Constructor.prototype, protoProps);
        if (staticProps)
          _defineProperties(Constructor, staticProps);
        return Constructor;
      }
      var _Declaration;
      module.exports = _Declaration = function() {
        var self2;
        var _Declaration2 = /* @__PURE__ */ function() {
          function _Declaration3(prop1, val) {
            _classCallCheck(this, _Declaration3);
            this.prop = prop1;
            this.important = false;
            this.set(val);
          }
          _createClass(_Declaration3, [{
            key: "get",
            value: function get4() {
              return this._get();
            }
          }, {
            key: "_get",
            value: function _get() {
              return this.val;
            }
          }, {
            key: "_pickImportantClause",
            value: function _pickImportantClause(val) {
              if (self2.importantClauseRx.test(String(val))) {
                this.important = true;
                return val.replace(self2.importantClauseRx, "");
              } else {
                this.important = false;
                return val;
              }
            }
          }, {
            key: "set",
            value: function set(val) {
              val = self2.sanitizeValue(val);
              val = this._pickImportantClause(val);
              val = val.trim();
              if (this._handleNullOrInherit(val)) {
                return this;
              }
              this._set(val);
              return this;
            }
          }, {
            key: "_set",
            value: function _set(val) {
              return this.val = val;
            }
          }, {
            key: "_handleNullOrInherit",
            value: function _handleNullOrInherit(val) {
              if (val === "") {
                this.val = "";
                return true;
              }
              if (val === "inherit") {
                if (this.constructor.inheritAllowed) {
                  this.val = "inherit";
                } else {
                  throw Error("Inherit is not allowed for `".concat(this.prop, "`"));
                }
                return true;
              } else {
                return false;
              }
            }
          }], [{
            key: "setOnto",
            value: function setOnto(declarations, prop, val) {
              var dec;
              if (!(dec = declarations[prop])) {
                return declarations[prop] = new this(prop, val);
              } else {
                return dec.set(val);
              }
            }
          }, {
            key: "sanitizeValue",
            value: function sanitizeValue(val) {
              return String(val).trim().replace(/[\s]+/g, " ");
            }
          }]);
          return _Declaration3;
        }();
        ;
        self2 = _Declaration2;
        _Declaration2.importantClauseRx = /(\s\!important)$/;
        _Declaration2.inheritAllowed = false;
        return _Declaration2;
      }.call(void 0);
    }
  });

  // node_modules/.pnpm/renderkid@3.0.0/node_modules/renderkid/lib/renderKid/styles/rule/declarationBlock/Arbitrary.js
  var require_Arbitrary = __commonJS({
    "node_modules/.pnpm/renderkid@3.0.0/node_modules/renderkid/lib/renderKid/styles/rule/declarationBlock/Arbitrary.js"(exports, module) {
      "use strict";
      function _typeof(obj) {
        "@babel/helpers - typeof";
        if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
          _typeof = function _typeof2(obj2) {
            return typeof obj2;
          };
        } else {
          _typeof = function _typeof2(obj2) {
            return obj2 && typeof Symbol === "function" && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
          };
        }
        return _typeof(obj);
      }
      function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
          throw new TypeError("Cannot call a class as a function");
        }
      }
      function _inherits(subClass, superClass) {
        if (typeof superClass !== "function" && superClass !== null) {
          throw new TypeError("Super expression must either be null or a function");
        }
        subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } });
        if (superClass)
          _setPrototypeOf(subClass, superClass);
      }
      function _setPrototypeOf(o, p) {
        _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf2(o2, p2) {
          o2.__proto__ = p2;
          return o2;
        };
        return _setPrototypeOf(o, p);
      }
      function _createSuper(Derived) {
        var hasNativeReflectConstruct = _isNativeReflectConstruct();
        return function _createSuperInternal() {
          var Super = _getPrototypeOf(Derived), result;
          if (hasNativeReflectConstruct) {
            var NewTarget = _getPrototypeOf(this).constructor;
            result = Reflect.construct(Super, arguments, NewTarget);
          } else {
            result = Super.apply(this, arguments);
          }
          return _possibleConstructorReturn(this, result);
        };
      }
      function _possibleConstructorReturn(self2, call) {
        if (call && (_typeof(call) === "object" || typeof call === "function")) {
          return call;
        }
        return _assertThisInitialized(self2);
      }
      function _assertThisInitialized(self2) {
        if (self2 === void 0) {
          throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        }
        return self2;
      }
      function _isNativeReflectConstruct() {
        if (typeof Reflect === "undefined" || !Reflect.construct)
          return false;
        if (Reflect.construct.sham)
          return false;
        if (typeof Proxy === "function")
          return true;
        try {
          Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
          }));
          return true;
        } catch (e) {
          return false;
        }
      }
      function _getPrototypeOf(o) {
        _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf2(o2) {
          return o2.__proto__ || Object.getPrototypeOf(o2);
        };
        return _getPrototypeOf(o);
      }
      var Arbitrary;
      var _Declaration;
      _Declaration = require_Declaration();
      module.exports = Arbitrary = /* @__PURE__ */ function(_Declaration2) {
        _inherits(Arbitrary2, _Declaration2);
        var _super = _createSuper(Arbitrary2);
        function Arbitrary2() {
          _classCallCheck(this, Arbitrary2);
          return _super.apply(this, arguments);
        }
        return Arbitrary2;
      }(_Declaration);
    }
  });

  // node_modules/.pnpm/renderkid@3.0.0/node_modules/renderkid/lib/renderKid/styles/rule/declarationBlock/Color.js
  var require_Color = __commonJS({
    "node_modules/.pnpm/renderkid@3.0.0/node_modules/renderkid/lib/renderKid/styles/rule/declarationBlock/Color.js"(exports, module) {
      "use strict";
      function _typeof(obj) {
        "@babel/helpers - typeof";
        if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
          _typeof = function _typeof2(obj2) {
            return typeof obj2;
          };
        } else {
          _typeof = function _typeof2(obj2) {
            return obj2 && typeof Symbol === "function" && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
          };
        }
        return _typeof(obj);
      }
      function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
          throw new TypeError("Cannot call a class as a function");
        }
      }
      function _inherits(subClass, superClass) {
        if (typeof superClass !== "function" && superClass !== null) {
          throw new TypeError("Super expression must either be null or a function");
        }
        subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } });
        if (superClass)
          _setPrototypeOf(subClass, superClass);
      }
      function _setPrototypeOf(o, p) {
        _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf2(o2, p2) {
          o2.__proto__ = p2;
          return o2;
        };
        return _setPrototypeOf(o, p);
      }
      function _createSuper(Derived) {
        var hasNativeReflectConstruct = _isNativeReflectConstruct();
        return function _createSuperInternal() {
          var Super = _getPrototypeOf(Derived), result;
          if (hasNativeReflectConstruct) {
            var NewTarget = _getPrototypeOf(this).constructor;
            result = Reflect.construct(Super, arguments, NewTarget);
          } else {
            result = Super.apply(this, arguments);
          }
          return _possibleConstructorReturn(this, result);
        };
      }
      function _possibleConstructorReturn(self2, call) {
        if (call && (_typeof(call) === "object" || typeof call === "function")) {
          return call;
        }
        return _assertThisInitialized(self2);
      }
      function _assertThisInitialized(self2) {
        if (self2 === void 0) {
          throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        }
        return self2;
      }
      function _isNativeReflectConstruct() {
        if (typeof Reflect === "undefined" || !Reflect.construct)
          return false;
        if (Reflect.construct.sham)
          return false;
        if (typeof Proxy === "function")
          return true;
        try {
          Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
          }));
          return true;
        } catch (e) {
          return false;
        }
      }
      function _getPrototypeOf(o) {
        _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf2(o2) {
          return o2.__proto__ || Object.getPrototypeOf(o2);
        };
        return _getPrototypeOf(o);
      }
      var Color;
      var _Declaration;
      _Declaration = require_Declaration();
      module.exports = Color = /* @__PURE__ */ function(_Declaration2) {
        _inherits(Color2, _Declaration2);
        var _super = _createSuper(Color2);
        function Color2() {
          _classCallCheck(this, Color2);
          return _super.apply(this, arguments);
        }
        return Color2;
      }(_Declaration);
    }
  });

  // node_modules/.pnpm/renderkid@3.0.0/node_modules/renderkid/lib/renderKid/styles/rule/declarationBlock/Background.js
  var require_Background = __commonJS({
    "node_modules/.pnpm/renderkid@3.0.0/node_modules/renderkid/lib/renderKid/styles/rule/declarationBlock/Background.js"(exports, module) {
      "use strict";
      function _typeof(obj) {
        "@babel/helpers - typeof";
        if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
          _typeof = function _typeof2(obj2) {
            return typeof obj2;
          };
        } else {
          _typeof = function _typeof2(obj2) {
            return obj2 && typeof Symbol === "function" && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
          };
        }
        return _typeof(obj);
      }
      function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
          throw new TypeError("Cannot call a class as a function");
        }
      }
      function _inherits(subClass, superClass) {
        if (typeof superClass !== "function" && superClass !== null) {
          throw new TypeError("Super expression must either be null or a function");
        }
        subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } });
        if (superClass)
          _setPrototypeOf(subClass, superClass);
      }
      function _setPrototypeOf(o, p) {
        _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf2(o2, p2) {
          o2.__proto__ = p2;
          return o2;
        };
        return _setPrototypeOf(o, p);
      }
      function _createSuper(Derived) {
        var hasNativeReflectConstruct = _isNativeReflectConstruct();
        return function _createSuperInternal() {
          var Super = _getPrototypeOf(Derived), result;
          if (hasNativeReflectConstruct) {
            var NewTarget = _getPrototypeOf(this).constructor;
            result = Reflect.construct(Super, arguments, NewTarget);
          } else {
            result = Super.apply(this, arguments);
          }
          return _possibleConstructorReturn(this, result);
        };
      }
      function _possibleConstructorReturn(self2, call) {
        if (call && (_typeof(call) === "object" || typeof call === "function")) {
          return call;
        }
        return _assertThisInitialized(self2);
      }
      function _assertThisInitialized(self2) {
        if (self2 === void 0) {
          throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        }
        return self2;
      }
      function _isNativeReflectConstruct() {
        if (typeof Reflect === "undefined" || !Reflect.construct)
          return false;
        if (Reflect.construct.sham)
          return false;
        if (typeof Proxy === "function")
          return true;
        try {
          Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
          }));
          return true;
        } catch (e) {
          return false;
        }
      }
      function _getPrototypeOf(o) {
        _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf2(o2) {
          return o2.__proto__ || Object.getPrototypeOf(o2);
        };
        return _getPrototypeOf(o);
      }
      var Background;
      var _Declaration;
      _Declaration = require_Declaration();
      module.exports = Background = /* @__PURE__ */ function(_Declaration2) {
        _inherits(Background2, _Declaration2);
        var _super = _createSuper(Background2);
        function Background2() {
          _classCallCheck(this, Background2);
          return _super.apply(this, arguments);
        }
        return Background2;
      }(_Declaration);
    }
  });

  // node_modules/.pnpm/renderkid@3.0.0/node_modules/renderkid/lib/renderKid/styles/rule/declarationBlock/_Length.js
  var require_Length = __commonJS({
    "node_modules/.pnpm/renderkid@3.0.0/node_modules/renderkid/lib/renderKid/styles/rule/declarationBlock/_Length.js"(exports, module) {
      "use strict";
      function _typeof(obj) {
        "@babel/helpers - typeof";
        if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
          _typeof = function _typeof2(obj2) {
            return typeof obj2;
          };
        } else {
          _typeof = function _typeof2(obj2) {
            return obj2 && typeof Symbol === "function" && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
          };
        }
        return _typeof(obj);
      }
      function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
          throw new TypeError("Cannot call a class as a function");
        }
      }
      function _defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
          var descriptor = props[i];
          descriptor.enumerable = descriptor.enumerable || false;
          descriptor.configurable = true;
          if ("value" in descriptor)
            descriptor.writable = true;
          Object.defineProperty(target, descriptor.key, descriptor);
        }
      }
      function _createClass(Constructor, protoProps, staticProps) {
        if (protoProps)
          _defineProperties(Constructor.prototype, protoProps);
        if (staticProps)
          _defineProperties(Constructor, staticProps);
        return Constructor;
      }
      function _inherits(subClass, superClass) {
        if (typeof superClass !== "function" && superClass !== null) {
          throw new TypeError("Super expression must either be null or a function");
        }
        subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } });
        if (superClass)
          _setPrototypeOf(subClass, superClass);
      }
      function _setPrototypeOf(o, p) {
        _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf2(o2, p2) {
          o2.__proto__ = p2;
          return o2;
        };
        return _setPrototypeOf(o, p);
      }
      function _createSuper(Derived) {
        var hasNativeReflectConstruct = _isNativeReflectConstruct();
        return function _createSuperInternal() {
          var Super = _getPrototypeOf(Derived), result;
          if (hasNativeReflectConstruct) {
            var NewTarget = _getPrototypeOf(this).constructor;
            result = Reflect.construct(Super, arguments, NewTarget);
          } else {
            result = Super.apply(this, arguments);
          }
          return _possibleConstructorReturn(this, result);
        };
      }
      function _possibleConstructorReturn(self2, call) {
        if (call && (_typeof(call) === "object" || typeof call === "function")) {
          return call;
        }
        return _assertThisInitialized(self2);
      }
      function _assertThisInitialized(self2) {
        if (self2 === void 0) {
          throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        }
        return self2;
      }
      function _isNativeReflectConstruct() {
        if (typeof Reflect === "undefined" || !Reflect.construct)
          return false;
        if (Reflect.construct.sham)
          return false;
        if (typeof Proxy === "function")
          return true;
        try {
          Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
          }));
          return true;
        } catch (e) {
          return false;
        }
      }
      function _getPrototypeOf(o) {
        _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf2(o2) {
          return o2.__proto__ || Object.getPrototypeOf(o2);
        };
        return _getPrototypeOf(o);
      }
      var _Declaration;
      var _Length;
      _Declaration = require_Declaration();
      module.exports = _Length = /* @__PURE__ */ function(_Declaration2) {
        _inherits(_Length2, _Declaration2);
        var _super = _createSuper(_Length2);
        function _Length2() {
          _classCallCheck(this, _Length2);
          return _super.apply(this, arguments);
        }
        _createClass(_Length2, [{
          key: "_set",
          value: function _set(val) {
            if (!/^[0-9]+$/.test(String(val))) {
              throw Error("`".concat(this.prop, "` only takes an integer for value"));
            }
            return this.val = parseInt(val);
          }
        }]);
        return _Length2;
      }(_Declaration);
    }
  });

  // node_modules/.pnpm/renderkid@3.0.0/node_modules/renderkid/lib/renderKid/styles/rule/declarationBlock/Width.js
  var require_Width = __commonJS({
    "node_modules/.pnpm/renderkid@3.0.0/node_modules/renderkid/lib/renderKid/styles/rule/declarationBlock/Width.js"(exports, module) {
      "use strict";
      function _typeof(obj) {
        "@babel/helpers - typeof";
        if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
          _typeof = function _typeof2(obj2) {
            return typeof obj2;
          };
        } else {
          _typeof = function _typeof2(obj2) {
            return obj2 && typeof Symbol === "function" && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
          };
        }
        return _typeof(obj);
      }
      function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
          throw new TypeError("Cannot call a class as a function");
        }
      }
      function _inherits(subClass, superClass) {
        if (typeof superClass !== "function" && superClass !== null) {
          throw new TypeError("Super expression must either be null or a function");
        }
        subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } });
        if (superClass)
          _setPrototypeOf(subClass, superClass);
      }
      function _setPrototypeOf(o, p) {
        _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf2(o2, p2) {
          o2.__proto__ = p2;
          return o2;
        };
        return _setPrototypeOf(o, p);
      }
      function _createSuper(Derived) {
        var hasNativeReflectConstruct = _isNativeReflectConstruct();
        return function _createSuperInternal() {
          var Super = _getPrototypeOf(Derived), result;
          if (hasNativeReflectConstruct) {
            var NewTarget = _getPrototypeOf(this).constructor;
            result = Reflect.construct(Super, arguments, NewTarget);
          } else {
            result = Super.apply(this, arguments);
          }
          return _possibleConstructorReturn(this, result);
        };
      }
      function _possibleConstructorReturn(self2, call) {
        if (call && (_typeof(call) === "object" || typeof call === "function")) {
          return call;
        }
        return _assertThisInitialized(self2);
      }
      function _assertThisInitialized(self2) {
        if (self2 === void 0) {
          throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        }
        return self2;
      }
      function _isNativeReflectConstruct() {
        if (typeof Reflect === "undefined" || !Reflect.construct)
          return false;
        if (Reflect.construct.sham)
          return false;
        if (typeof Proxy === "function")
          return true;
        try {
          Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
          }));
          return true;
        } catch (e) {
          return false;
        }
      }
      function _getPrototypeOf(o) {
        _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf2(o2) {
          return o2.__proto__ || Object.getPrototypeOf(o2);
        };
        return _getPrototypeOf(o);
      }
      var Width;
      var _Length;
      _Length = require_Length();
      module.exports = Width = /* @__PURE__ */ function(_Length2) {
        _inherits(Width2, _Length2);
        var _super = _createSuper(Width2);
        function Width2() {
          _classCallCheck(this, Width2);
          return _super.apply(this, arguments);
        }
        return Width2;
      }(_Length);
    }
  });

  // node_modules/.pnpm/renderkid@3.0.0/node_modules/renderkid/lib/renderKid/styles/rule/declarationBlock/Height.js
  var require_Height = __commonJS({
    "node_modules/.pnpm/renderkid@3.0.0/node_modules/renderkid/lib/renderKid/styles/rule/declarationBlock/Height.js"(exports, module) {
      "use strict";
      function _typeof(obj) {
        "@babel/helpers - typeof";
        if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
          _typeof = function _typeof2(obj2) {
            return typeof obj2;
          };
        } else {
          _typeof = function _typeof2(obj2) {
            return obj2 && typeof Symbol === "function" && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
          };
        }
        return _typeof(obj);
      }
      function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
          throw new TypeError("Cannot call a class as a function");
        }
      }
      function _inherits(subClass, superClass) {
        if (typeof superClass !== "function" && superClass !== null) {
          throw new TypeError("Super expression must either be null or a function");
        }
        subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } });
        if (superClass)
          _setPrototypeOf(subClass, superClass);
      }
      function _setPrototypeOf(o, p) {
        _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf2(o2, p2) {
          o2.__proto__ = p2;
          return o2;
        };
        return _setPrototypeOf(o, p);
      }
      function _createSuper(Derived) {
        var hasNativeReflectConstruct = _isNativeReflectConstruct();
        return function _createSuperInternal() {
          var Super = _getPrototypeOf(Derived), result;
          if (hasNativeReflectConstruct) {
            var NewTarget = _getPrototypeOf(this).constructor;
            result = Reflect.construct(Super, arguments, NewTarget);
          } else {
            result = Super.apply(this, arguments);
          }
          return _possibleConstructorReturn(this, result);
        };
      }
      function _possibleConstructorReturn(self2, call) {
        if (call && (_typeof(call) === "object" || typeof call === "function")) {
          return call;
        }
        return _assertThisInitialized(self2);
      }
      function _assertThisInitialized(self2) {
        if (self2 === void 0) {
          throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        }
        return self2;
      }
      function _isNativeReflectConstruct() {
        if (typeof Reflect === "undefined" || !Reflect.construct)
          return false;
        if (Reflect.construct.sham)
          return false;
        if (typeof Proxy === "function")
          return true;
        try {
          Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
          }));
          return true;
        } catch (e) {
          return false;
        }
      }
      function _getPrototypeOf(o) {
        _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf2(o2) {
          return o2.__proto__ || Object.getPrototypeOf(o2);
        };
        return _getPrototypeOf(o);
      }
      var Height;
      var _Length;
      _Length = require_Length();
      module.exports = Height = /* @__PURE__ */ function(_Length2) {
        _inherits(Height2, _Length2);
        var _super = _createSuper(Height2);
        function Height2() {
          _classCallCheck(this, Height2);
          return _super.apply(this, arguments);
        }
        return Height2;
      }(_Length);
    }
  });

  // node_modules/.pnpm/renderkid@3.0.0/node_modules/renderkid/lib/renderKid/styles/rule/declarationBlock/Bullet.js
  var require_Bullet = __commonJS({
    "node_modules/.pnpm/renderkid@3.0.0/node_modules/renderkid/lib/renderKid/styles/rule/declarationBlock/Bullet.js"(exports, module) {
      "use strict";
      function _typeof(obj) {
        "@babel/helpers - typeof";
        if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
          _typeof = function _typeof2(obj2) {
            return typeof obj2;
          };
        } else {
          _typeof = function _typeof2(obj2) {
            return obj2 && typeof Symbol === "function" && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
          };
        }
        return _typeof(obj);
      }
      function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
          throw new TypeError("Cannot call a class as a function");
        }
      }
      function _defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
          var descriptor = props[i];
          descriptor.enumerable = descriptor.enumerable || false;
          descriptor.configurable = true;
          if ("value" in descriptor)
            descriptor.writable = true;
          Object.defineProperty(target, descriptor.key, descriptor);
        }
      }
      function _createClass(Constructor, protoProps, staticProps) {
        if (protoProps)
          _defineProperties(Constructor.prototype, protoProps);
        if (staticProps)
          _defineProperties(Constructor, staticProps);
        return Constructor;
      }
      function _inherits(subClass, superClass) {
        if (typeof superClass !== "function" && superClass !== null) {
          throw new TypeError("Super expression must either be null or a function");
        }
        subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } });
        if (superClass)
          _setPrototypeOf(subClass, superClass);
      }
      function _setPrototypeOf(o, p) {
        _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf2(o2, p2) {
          o2.__proto__ = p2;
          return o2;
        };
        return _setPrototypeOf(o, p);
      }
      function _createSuper(Derived) {
        var hasNativeReflectConstruct = _isNativeReflectConstruct();
        return function _createSuperInternal() {
          var Super = _getPrototypeOf(Derived), result;
          if (hasNativeReflectConstruct) {
            var NewTarget = _getPrototypeOf(this).constructor;
            result = Reflect.construct(Super, arguments, NewTarget);
          } else {
            result = Super.apply(this, arguments);
          }
          return _possibleConstructorReturn(this, result);
        };
      }
      function _possibleConstructorReturn(self2, call) {
        if (call && (_typeof(call) === "object" || typeof call === "function")) {
          return call;
        }
        return _assertThisInitialized(self2);
      }
      function _assertThisInitialized(self2) {
        if (self2 === void 0) {
          throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        }
        return self2;
      }
      function _isNativeReflectConstruct() {
        if (typeof Reflect === "undefined" || !Reflect.construct)
          return false;
        if (Reflect.construct.sham)
          return false;
        if (typeof Proxy === "function")
          return true;
        try {
          Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
          }));
          return true;
        } catch (e) {
          return false;
        }
      }
      function _getPrototypeOf(o) {
        _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf2(o2) {
          return o2.__proto__ || Object.getPrototypeOf(o2);
        };
        return _getPrototypeOf(o);
      }
      var Bullet;
      var _Declaration;
      _Declaration = require_Declaration();
      module.exports = Bullet = function() {
        var self2;
        var Bullet2 = /* @__PURE__ */ function(_Declaration2) {
          _inherits(Bullet3, _Declaration2);
          var _super = _createSuper(Bullet3);
          function Bullet3() {
            _classCallCheck(this, Bullet3);
            return _super.apply(this, arguments);
          }
          _createClass(Bullet3, [{
            key: "_set",
            value: function _set(val) {
              var alignment, bg, char, color, enabled, m, original;
              val = String(val);
              original = val;
              char = null;
              enabled = false;
              color = "none";
              bg = "none";
              if (m = val.match(/\"([^"]+)\"/) || (m = val.match(/\'([^']+)\'/))) {
                char = m[1];
                val = val.replace(m[0], "");
                enabled = true;
              }
              if (m = val.match(/(none|left|right|center)/)) {
                alignment = m[1];
                val = val.replace(m[0], "");
              } else {
                alignment = "left";
              }
              if (alignment === "none") {
                enabled = false;
              }
              if (m = val.match(/color\:([\w\-]+)/)) {
                color = m[1];
                val = val.replace(m[0], "");
              }
              if (m = val.match(/bg\:([\w\-]+)/)) {
                bg = m[1];
                val = val.replace(m[0], "");
              }
              if (val.trim() !== "") {
                throw Error("Unrecognizable value `".concat(original, "` for `").concat(this.prop, "`"));
              }
              return this.val = {
                enabled,
                char,
                alignment,
                background: bg,
                color
              };
            }
          }]);
          return Bullet3;
        }(_Declaration);
        ;
        self2 = Bullet2;
        return Bullet2;
      }.call(void 0);
    }
  });

  // node_modules/.pnpm/renderkid@3.0.0/node_modules/renderkid/lib/renderKid/styles/rule/declarationBlock/Display.js
  var require_Display = __commonJS({
    "node_modules/.pnpm/renderkid@3.0.0/node_modules/renderkid/lib/renderKid/styles/rule/declarationBlock/Display.js"(exports, module) {
      "use strict";
      function _typeof(obj) {
        "@babel/helpers - typeof";
        if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
          _typeof = function _typeof2(obj2) {
            return typeof obj2;
          };
        } else {
          _typeof = function _typeof2(obj2) {
            return obj2 && typeof Symbol === "function" && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
          };
        }
        return _typeof(obj);
      }
      function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
          throw new TypeError("Cannot call a class as a function");
        }
      }
      function _defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
          var descriptor = props[i];
          descriptor.enumerable = descriptor.enumerable || false;
          descriptor.configurable = true;
          if ("value" in descriptor)
            descriptor.writable = true;
          Object.defineProperty(target, descriptor.key, descriptor);
        }
      }
      function _createClass(Constructor, protoProps, staticProps) {
        if (protoProps)
          _defineProperties(Constructor.prototype, protoProps);
        if (staticProps)
          _defineProperties(Constructor, staticProps);
        return Constructor;
      }
      function _inherits(subClass, superClass) {
        if (typeof superClass !== "function" && superClass !== null) {
          throw new TypeError("Super expression must either be null or a function");
        }
        subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } });
        if (superClass)
          _setPrototypeOf(subClass, superClass);
      }
      function _setPrototypeOf(o, p) {
        _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf2(o2, p2) {
          o2.__proto__ = p2;
          return o2;
        };
        return _setPrototypeOf(o, p);
      }
      function _createSuper(Derived) {
        var hasNativeReflectConstruct = _isNativeReflectConstruct();
        return function _createSuperInternal() {
          var Super = _getPrototypeOf(Derived), result;
          if (hasNativeReflectConstruct) {
            var NewTarget = _getPrototypeOf(this).constructor;
            result = Reflect.construct(Super, arguments, NewTarget);
          } else {
            result = Super.apply(this, arguments);
          }
          return _possibleConstructorReturn(this, result);
        };
      }
      function _possibleConstructorReturn(self2, call) {
        if (call && (_typeof(call) === "object" || typeof call === "function")) {
          return call;
        }
        return _assertThisInitialized(self2);
      }
      function _assertThisInitialized(self2) {
        if (self2 === void 0) {
          throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        }
        return self2;
      }
      function _isNativeReflectConstruct() {
        if (typeof Reflect === "undefined" || !Reflect.construct)
          return false;
        if (Reflect.construct.sham)
          return false;
        if (typeof Proxy === "function")
          return true;
        try {
          Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
          }));
          return true;
        } catch (e) {
          return false;
        }
      }
      function _getPrototypeOf(o) {
        _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf2(o2) {
          return o2.__proto__ || Object.getPrototypeOf(o2);
        };
        return _getPrototypeOf(o);
      }
      var Display;
      var _Declaration;
      var indexOf = [].indexOf;
      _Declaration = require_Declaration();
      module.exports = Display = function() {
        var self2;
        var Display2 = /* @__PURE__ */ function(_Declaration2) {
          _inherits(Display3, _Declaration2);
          var _super = _createSuper(Display3);
          function Display3() {
            _classCallCheck(this, Display3);
            return _super.apply(this, arguments);
          }
          _createClass(Display3, [{
            key: "_set",
            value: function _set(val) {
              val = String(val).toLowerCase();
              if (indexOf.call(self2._allowed, val) < 0) {
                throw Error("Unrecognizable value `".concat(val, "` for `").concat(this.prop, "`"));
              }
              return this.val = val;
            }
          }]);
          return Display3;
        }(_Declaration);
        ;
        self2 = Display2;
        Display2._allowed = ["inline", "block", "none"];
        return Display2;
      }.call(void 0);
    }
  });

  // node_modules/.pnpm/renderkid@3.0.0/node_modules/renderkid/lib/renderKid/styles/rule/declarationBlock/MarginTop.js
  var require_MarginTop = __commonJS({
    "node_modules/.pnpm/renderkid@3.0.0/node_modules/renderkid/lib/renderKid/styles/rule/declarationBlock/MarginTop.js"(exports, module) {
      "use strict";
      function _typeof(obj) {
        "@babel/helpers - typeof";
        if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
          _typeof = function _typeof2(obj2) {
            return typeof obj2;
          };
        } else {
          _typeof = function _typeof2(obj2) {
            return obj2 && typeof Symbol === "function" && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
          };
        }
        return _typeof(obj);
      }
      function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
          throw new TypeError("Cannot call a class as a function");
        }
      }
      function _inherits(subClass, superClass) {
        if (typeof superClass !== "function" && superClass !== null) {
          throw new TypeError("Super expression must either be null or a function");
        }
        subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } });
        if (superClass)
          _setPrototypeOf(subClass, superClass);
      }
      function _setPrototypeOf(o, p) {
        _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf2(o2, p2) {
          o2.__proto__ = p2;
          return o2;
        };
        return _setPrototypeOf(o, p);
      }
      function _createSuper(Derived) {
        var hasNativeReflectConstruct = _isNativeReflectConstruct();
        return function _createSuperInternal() {
          var Super = _getPrototypeOf(Derived), result;
          if (hasNativeReflectConstruct) {
            var NewTarget = _getPrototypeOf(this).constructor;
            result = Reflect.construct(Super, arguments, NewTarget);
          } else {
            result = Super.apply(this, arguments);
          }
          return _possibleConstructorReturn(this, result);
        };
      }
      function _possibleConstructorReturn(self2, call) {
        if (call && (_typeof(call) === "object" || typeof call === "function")) {
          return call;
        }
        return _assertThisInitialized(self2);
      }
      function _assertThisInitialized(self2) {
        if (self2 === void 0) {
          throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        }
        return self2;
      }
      function _isNativeReflectConstruct() {
        if (typeof Reflect === "undefined" || !Reflect.construct)
          return false;
        if (Reflect.construct.sham)
          return false;
        if (typeof Proxy === "function")
          return true;
        try {
          Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
          }));
          return true;
        } catch (e) {
          return false;
        }
      }
      function _getPrototypeOf(o) {
        _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf2(o2) {
          return o2.__proto__ || Object.getPrototypeOf(o2);
        };
        return _getPrototypeOf(o);
      }
      var MarginTop;
      var _Length;
      _Length = require_Length();
      module.exports = MarginTop = /* @__PURE__ */ function(_Length2) {
        _inherits(MarginTop2, _Length2);
        var _super = _createSuper(MarginTop2);
        function MarginTop2() {
          _classCallCheck(this, MarginTop2);
          return _super.apply(this, arguments);
        }
        return MarginTop2;
      }(_Length);
    }
  });

  // node_modules/.pnpm/renderkid@3.0.0/node_modules/renderkid/lib/renderKid/styles/rule/declarationBlock/MarginLeft.js
  var require_MarginLeft = __commonJS({
    "node_modules/.pnpm/renderkid@3.0.0/node_modules/renderkid/lib/renderKid/styles/rule/declarationBlock/MarginLeft.js"(exports, module) {
      "use strict";
      function _typeof(obj) {
        "@babel/helpers - typeof";
        if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
          _typeof = function _typeof2(obj2) {
            return typeof obj2;
          };
        } else {
          _typeof = function _typeof2(obj2) {
            return obj2 && typeof Symbol === "function" && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
          };
        }
        return _typeof(obj);
      }
      function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
          throw new TypeError("Cannot call a class as a function");
        }
      }
      function _inherits(subClass, superClass) {
        if (typeof superClass !== "function" && superClass !== null) {
          throw new TypeError("Super expression must either be null or a function");
        }
        subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } });
        if (superClass)
          _setPrototypeOf(subClass, superClass);
      }
      function _setPrototypeOf(o, p) {
        _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf2(o2, p2) {
          o2.__proto__ = p2;
          return o2;
        };
        return _setPrototypeOf(o, p);
      }
      function _createSuper(Derived) {
        var hasNativeReflectConstruct = _isNativeReflectConstruct();
        return function _createSuperInternal() {
          var Super = _getPrototypeOf(Derived), result;
          if (hasNativeReflectConstruct) {
            var NewTarget = _getPrototypeOf(this).constructor;
            result = Reflect.construct(Super, arguments, NewTarget);
          } else {
            result = Super.apply(this, arguments);
          }
          return _possibleConstructorReturn(this, result);
        };
      }
      function _possibleConstructorReturn(self2, call) {
        if (call && (_typeof(call) === "object" || typeof call === "function")) {
          return call;
        }
        return _assertThisInitialized(self2);
      }
      function _assertThisInitialized(self2) {
        if (self2 === void 0) {
          throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        }
        return self2;
      }
      function _isNativeReflectConstruct() {
        if (typeof Reflect === "undefined" || !Reflect.construct)
          return false;
        if (Reflect.construct.sham)
          return false;
        if (typeof Proxy === "function")
          return true;
        try {
          Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
          }));
          return true;
        } catch (e) {
          return false;
        }
      }
      function _getPrototypeOf(o) {
        _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf2(o2) {
          return o2.__proto__ || Object.getPrototypeOf(o2);
        };
        return _getPrototypeOf(o);
      }
      var MarginLeft;
      var _Length;
      _Length = require_Length();
      module.exports = MarginLeft = /* @__PURE__ */ function(_Length2) {
        _inherits(MarginLeft2, _Length2);
        var _super = _createSuper(MarginLeft2);
        function MarginLeft2() {
          _classCallCheck(this, MarginLeft2);
          return _super.apply(this, arguments);
        }
        return MarginLeft2;
      }(_Length);
    }
  });

  // node_modules/.pnpm/renderkid@3.0.0/node_modules/renderkid/lib/renderKid/styles/rule/declarationBlock/MarginRight.js
  var require_MarginRight = __commonJS({
    "node_modules/.pnpm/renderkid@3.0.0/node_modules/renderkid/lib/renderKid/styles/rule/declarationBlock/MarginRight.js"(exports, module) {
      "use strict";
      function _typeof(obj) {
        "@babel/helpers - typeof";
        if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
          _typeof = function _typeof2(obj2) {
            return typeof obj2;
          };
        } else {
          _typeof = function _typeof2(obj2) {
            return obj2 && typeof Symbol === "function" && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
          };
        }
        return _typeof(obj);
      }
      function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
          throw new TypeError("Cannot call a class as a function");
        }
      }
      function _inherits(subClass, superClass) {
        if (typeof superClass !== "function" && superClass !== null) {
          throw new TypeError("Super expression must either be null or a function");
        }
        subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } });
        if (superClass)
          _setPrototypeOf(subClass, superClass);
      }
      function _setPrototypeOf(o, p) {
        _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf2(o2, p2) {
          o2.__proto__ = p2;
          return o2;
        };
        return _setPrototypeOf(o, p);
      }
      function _createSuper(Derived) {
        var hasNativeReflectConstruct = _isNativeReflectConstruct();
        return function _createSuperInternal() {
          var Super = _getPrototypeOf(Derived), result;
          if (hasNativeReflectConstruct) {
            var NewTarget = _getPrototypeOf(this).constructor;
            result = Reflect.construct(Super, arguments, NewTarget);
          } else {
            result = Super.apply(this, arguments);
          }
          return _possibleConstructorReturn(this, result);
        };
      }
      function _possibleConstructorReturn(self2, call) {
        if (call && (_typeof(call) === "object" || typeof call === "function")) {
          return call;
        }
        return _assertThisInitialized(self2);
      }
      function _assertThisInitialized(self2) {
        if (self2 === void 0) {
          throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        }
        return self2;
      }
      function _isNativeReflectConstruct() {
        if (typeof Reflect === "undefined" || !Reflect.construct)
          return false;
        if (Reflect.construct.sham)
          return false;
        if (typeof Proxy === "function")
          return true;
        try {
          Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
          }));
          return true;
        } catch (e) {
          return false;
        }
      }
      function _getPrototypeOf(o) {
        _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf2(o2) {
          return o2.__proto__ || Object.getPrototypeOf(o2);
        };
        return _getPrototypeOf(o);
      }
      var MarginRight;
      var _Length;
      _Length = require_Length();
      module.exports = MarginRight = /* @__PURE__ */ function(_Length2) {
        _inherits(MarginRight2, _Length2);
        var _super = _createSuper(MarginRight2);
        function MarginRight2() {
          _classCallCheck(this, MarginRight2);
          return _super.apply(this, arguments);
        }
        return MarginRight2;
      }(_Length);
    }
  });

  // node_modules/.pnpm/renderkid@3.0.0/node_modules/renderkid/lib/renderKid/styles/rule/declarationBlock/MarginBottom.js
  var require_MarginBottom = __commonJS({
    "node_modules/.pnpm/renderkid@3.0.0/node_modules/renderkid/lib/renderKid/styles/rule/declarationBlock/MarginBottom.js"(exports, module) {
      "use strict";
      function _typeof(obj) {
        "@babel/helpers - typeof";
        if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
          _typeof = function _typeof2(obj2) {
            return typeof obj2;
          };
        } else {
          _typeof = function _typeof2(obj2) {
            return obj2 && typeof Symbol === "function" && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
          };
        }
        return _typeof(obj);
      }
      function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
          throw new TypeError("Cannot call a class as a function");
        }
      }
      function _inherits(subClass, superClass) {
        if (typeof superClass !== "function" && superClass !== null) {
          throw new TypeError("Super expression must either be null or a function");
        }
        subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } });
        if (superClass)
          _setPrototypeOf(subClass, superClass);
      }
      function _setPrototypeOf(o, p) {
        _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf2(o2, p2) {
          o2.__proto__ = p2;
          return o2;
        };
        return _setPrototypeOf(o, p);
      }
      function _createSuper(Derived) {
        var hasNativeReflectConstruct = _isNativeReflectConstruct();
        return function _createSuperInternal() {
          var Super = _getPrototypeOf(Derived), result;
          if (hasNativeReflectConstruct) {
            var NewTarget = _getPrototypeOf(this).constructor;
            result = Reflect.construct(Super, arguments, NewTarget);
          } else {
            result = Super.apply(this, arguments);
          }
          return _possibleConstructorReturn(this, result);
        };
      }
      function _possibleConstructorReturn(self2, call) {
        if (call && (_typeof(call) === "object" || typeof call === "function")) {
          return call;
        }
        return _assertThisInitialized(self2);
      }
      function _assertThisInitialized(self2) {
        if (self2 === void 0) {
          throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        }
        return self2;
      }
      function _isNativeReflectConstruct() {
        if (typeof Reflect === "undefined" || !Reflect.construct)
          return false;
        if (Reflect.construct.sham)
          return false;
        if (typeof Proxy === "function")
          return true;
        try {
          Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
          }));
          return true;
        } catch (e) {
          return false;
        }
      }
      function _getPrototypeOf(o) {
        _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf2(o2) {
          return o2.__proto__ || Object.getPrototypeOf(o2);
        };
        return _getPrototypeOf(o);
      }
      var MarginBottom;
      var _Length;
      _Length = require_Length();
      module.exports = MarginBottom = /* @__PURE__ */ function(_Length2) {
        _inherits(MarginBottom2, _Length2);
        var _super = _createSuper(MarginBottom2);
        function MarginBottom2() {
          _classCallCheck(this, MarginBottom2);
          return _super.apply(this, arguments);
        }
        return MarginBottom2;
      }(_Length);
    }
  });

  // node_modules/.pnpm/renderkid@3.0.0/node_modules/renderkid/lib/renderKid/styles/rule/declarationBlock/Margin.js
  var require_Margin = __commonJS({
    "node_modules/.pnpm/renderkid@3.0.0/node_modules/renderkid/lib/renderKid/styles/rule/declarationBlock/Margin.js"(exports, module) {
      "use strict";
      function _typeof(obj) {
        "@babel/helpers - typeof";
        if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
          _typeof = function _typeof2(obj2) {
            return typeof obj2;
          };
        } else {
          _typeof = function _typeof2(obj2) {
            return obj2 && typeof Symbol === "function" && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
          };
        }
        return _typeof(obj);
      }
      function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
          throw new TypeError("Cannot call a class as a function");
        }
      }
      function _defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
          var descriptor = props[i];
          descriptor.enumerable = descriptor.enumerable || false;
          descriptor.configurable = true;
          if ("value" in descriptor)
            descriptor.writable = true;
          Object.defineProperty(target, descriptor.key, descriptor);
        }
      }
      function _createClass(Constructor, protoProps, staticProps) {
        if (protoProps)
          _defineProperties(Constructor.prototype, protoProps);
        if (staticProps)
          _defineProperties(Constructor, staticProps);
        return Constructor;
      }
      function _inherits(subClass, superClass) {
        if (typeof superClass !== "function" && superClass !== null) {
          throw new TypeError("Super expression must either be null or a function");
        }
        subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } });
        if (superClass)
          _setPrototypeOf(subClass, superClass);
      }
      function _setPrototypeOf(o, p) {
        _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf2(o2, p2) {
          o2.__proto__ = p2;
          return o2;
        };
        return _setPrototypeOf(o, p);
      }
      function _createSuper(Derived) {
        var hasNativeReflectConstruct = _isNativeReflectConstruct();
        return function _createSuperInternal() {
          var Super = _getPrototypeOf(Derived), result;
          if (hasNativeReflectConstruct) {
            var NewTarget = _getPrototypeOf(this).constructor;
            result = Reflect.construct(Super, arguments, NewTarget);
          } else {
            result = Super.apply(this, arguments);
          }
          return _possibleConstructorReturn(this, result);
        };
      }
      function _possibleConstructorReturn(self2, call) {
        if (call && (_typeof(call) === "object" || typeof call === "function")) {
          return call;
        }
        return _assertThisInitialized(self2);
      }
      function _assertThisInitialized(self2) {
        if (self2 === void 0) {
          throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        }
        return self2;
      }
      function _isNativeReflectConstruct() {
        if (typeof Reflect === "undefined" || !Reflect.construct)
          return false;
        if (Reflect.construct.sham)
          return false;
        if (typeof Proxy === "function")
          return true;
        try {
          Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
          }));
          return true;
        } catch (e) {
          return false;
        }
      }
      function _getPrototypeOf(o) {
        _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf2(o2) {
          return o2.__proto__ || Object.getPrototypeOf(o2);
        };
        return _getPrototypeOf(o);
      }
      var Margin;
      var MarginBottom;
      var MarginLeft;
      var MarginRight;
      var MarginTop;
      var _Declaration;
      _Declaration = require_Declaration();
      MarginTop = require_MarginTop();
      MarginLeft = require_MarginLeft();
      MarginRight = require_MarginRight();
      MarginBottom = require_MarginBottom();
      module.exports = Margin = function() {
        var self2;
        var Margin2 = /* @__PURE__ */ function(_Declaration2) {
          _inherits(Margin3, _Declaration2);
          var _super = _createSuper(Margin3);
          function Margin3() {
            _classCallCheck(this, Margin3);
            return _super.apply(this, arguments);
          }
          _createClass(Margin3, null, [{
            key: "setOnto",
            value: function setOnto(declarations, prop, originalValue) {
              var append, val, vals;
              append = "";
              val = _Declaration.sanitizeValue(originalValue);
              if (_Declaration.importantClauseRx.test(String(val))) {
                append = " !important";
                val = val.replace(_Declaration.importantClauseRx, "");
              }
              val = val.trim();
              if (val.length === 0) {
                return self2._setAllDirections(declarations, append, append, append, append);
              }
              vals = val.split(" ").map(function(val2) {
                return val2 + append;
              });
              if (vals.length === 1) {
                return self2._setAllDirections(declarations, vals[0], vals[0], vals[0], vals[0]);
              } else if (vals.length === 2) {
                return self2._setAllDirections(declarations, vals[0], vals[1], vals[0], vals[1]);
              } else if (vals.length === 3) {
                return self2._setAllDirections(declarations, vals[0], vals[1], vals[2], vals[1]);
              } else if (vals.length === 4) {
                return self2._setAllDirections(declarations, vals[0], vals[1], vals[2], vals[3]);
              } else {
                throw Error("Can't understand value for margin: `".concat(originalValue, "`"));
              }
            }
          }, {
            key: "_setAllDirections",
            value: function _setAllDirections(declarations, top, right, bottom, left) {
              MarginTop.setOnto(declarations, "marginTop", top);
              MarginTop.setOnto(declarations, "marginRight", right);
              MarginTop.setOnto(declarations, "marginBottom", bottom);
              MarginTop.setOnto(declarations, "marginLeft", left);
            }
          }]);
          return Margin3;
        }(_Declaration);
        ;
        self2 = Margin2;
        return Margin2;
      }.call(void 0);
    }
  });

  // node_modules/.pnpm/renderkid@3.0.0/node_modules/renderkid/lib/renderKid/styles/rule/declarationBlock/PaddingTop.js
  var require_PaddingTop = __commonJS({
    "node_modules/.pnpm/renderkid@3.0.0/node_modules/renderkid/lib/renderKid/styles/rule/declarationBlock/PaddingTop.js"(exports, module) {
      "use strict";
      function _typeof(obj) {
        "@babel/helpers - typeof";
        if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
          _typeof = function _typeof2(obj2) {
            return typeof obj2;
          };
        } else {
          _typeof = function _typeof2(obj2) {
            return obj2 && typeof Symbol === "function" && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
          };
        }
        return _typeof(obj);
      }
      function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
          throw new TypeError("Cannot call a class as a function");
        }
      }
      function _inherits(subClass, superClass) {
        if (typeof superClass !== "function" && superClass !== null) {
          throw new TypeError("Super expression must either be null or a function");
        }
        subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } });
        if (superClass)
          _setPrototypeOf(subClass, superClass);
      }
      function _setPrototypeOf(o, p) {
        _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf2(o2, p2) {
          o2.__proto__ = p2;
          return o2;
        };
        return _setPrototypeOf(o, p);
      }
      function _createSuper(Derived) {
        var hasNativeReflectConstruct = _isNativeReflectConstruct();
        return function _createSuperInternal() {
          var Super = _getPrototypeOf(Derived), result;
          if (hasNativeReflectConstruct) {
            var NewTarget = _getPrototypeOf(this).constructor;
            result = Reflect.construct(Super, arguments, NewTarget);
          } else {
            result = Super.apply(this, arguments);
          }
          return _possibleConstructorReturn(this, result);
        };
      }
      function _possibleConstructorReturn(self2, call) {
        if (call && (_typeof(call) === "object" || typeof call === "function")) {
          return call;
        }
        return _assertThisInitialized(self2);
      }
      function _assertThisInitialized(self2) {
        if (self2 === void 0) {
          throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        }
        return self2;
      }
      function _isNativeReflectConstruct() {
        if (typeof Reflect === "undefined" || !Reflect.construct)
          return false;
        if (Reflect.construct.sham)
          return false;
        if (typeof Proxy === "function")
          return true;
        try {
          Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
          }));
          return true;
        } catch (e) {
          return false;
        }
      }
      function _getPrototypeOf(o) {
        _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf2(o2) {
          return o2.__proto__ || Object.getPrototypeOf(o2);
        };
        return _getPrototypeOf(o);
      }
      var PaddingTop;
      var _Length;
      _Length = require_Length();
      module.exports = PaddingTop = /* @__PURE__ */ function(_Length2) {
        _inherits(PaddingTop2, _Length2);
        var _super = _createSuper(PaddingTop2);
        function PaddingTop2() {
          _classCallCheck(this, PaddingTop2);
          return _super.apply(this, arguments);
        }
        return PaddingTop2;
      }(_Length);
    }
  });

  // node_modules/.pnpm/renderkid@3.0.0/node_modules/renderkid/lib/renderKid/styles/rule/declarationBlock/PaddingLeft.js
  var require_PaddingLeft = __commonJS({
    "node_modules/.pnpm/renderkid@3.0.0/node_modules/renderkid/lib/renderKid/styles/rule/declarationBlock/PaddingLeft.js"(exports, module) {
      "use strict";
      function _typeof(obj) {
        "@babel/helpers - typeof";
        if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
          _typeof = function _typeof2(obj2) {
            return typeof obj2;
          };
        } else {
          _typeof = function _typeof2(obj2) {
            return obj2 && typeof Symbol === "function" && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
          };
        }
        return _typeof(obj);
      }
      function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
          throw new TypeError("Cannot call a class as a function");
        }
      }
      function _inherits(subClass, superClass) {
        if (typeof superClass !== "function" && superClass !== null) {
          throw new TypeError("Super expression must either be null or a function");
        }
        subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } });
        if (superClass)
          _setPrototypeOf(subClass, superClass);
      }
      function _setPrototypeOf(o, p) {
        _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf2(o2, p2) {
          o2.__proto__ = p2;
          return o2;
        };
        return _setPrototypeOf(o, p);
      }
      function _createSuper(Derived) {
        var hasNativeReflectConstruct = _isNativeReflectConstruct();
        return function _createSuperInternal() {
          var Super = _getPrototypeOf(Derived), result;
          if (hasNativeReflectConstruct) {
            var NewTarget = _getPrototypeOf(this).constructor;
            result = Reflect.construct(Super, arguments, NewTarget);
          } else {
            result = Super.apply(this, arguments);
          }
          return _possibleConstructorReturn(this, result);
        };
      }
      function _possibleConstructorReturn(self2, call) {
        if (call && (_typeof(call) === "object" || typeof call === "function")) {
          return call;
        }
        return _assertThisInitialized(self2);
      }
      function _assertThisInitialized(self2) {
        if (self2 === void 0) {
          throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        }
        return self2;
      }
      function _isNativeReflectConstruct() {
        if (typeof Reflect === "undefined" || !Reflect.construct)
          return false;
        if (Reflect.construct.sham)
          return false;
        if (typeof Proxy === "function")
          return true;
        try {
          Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
          }));
          return true;
        } catch (e) {
          return false;
        }
      }
      function _getPrototypeOf(o) {
        _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf2(o2) {
          return o2.__proto__ || Object.getPrototypeOf(o2);
        };
        return _getPrototypeOf(o);
      }
      var PaddingLeft;
      var _Length;
      _Length = require_Length();
      module.exports = PaddingLeft = /* @__PURE__ */ function(_Length2) {
        _inherits(PaddingLeft2, _Length2);
        var _super = _createSuper(PaddingLeft2);
        function PaddingLeft2() {
          _classCallCheck(this, PaddingLeft2);
          return _super.apply(this, arguments);
        }
        return PaddingLeft2;
      }(_Length);
    }
  });

  // node_modules/.pnpm/renderkid@3.0.0/node_modules/renderkid/lib/renderKid/styles/rule/declarationBlock/PaddingRight.js
  var require_PaddingRight = __commonJS({
    "node_modules/.pnpm/renderkid@3.0.0/node_modules/renderkid/lib/renderKid/styles/rule/declarationBlock/PaddingRight.js"(exports, module) {
      "use strict";
      function _typeof(obj) {
        "@babel/helpers - typeof";
        if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
          _typeof = function _typeof2(obj2) {
            return typeof obj2;
          };
        } else {
          _typeof = function _typeof2(obj2) {
            return obj2 && typeof Symbol === "function" && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
          };
        }
        return _typeof(obj);
      }
      function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
          throw new TypeError("Cannot call a class as a function");
        }
      }
      function _inherits(subClass, superClass) {
        if (typeof superClass !== "function" && superClass !== null) {
          throw new TypeError("Super expression must either be null or a function");
        }
        subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } });
        if (superClass)
          _setPrototypeOf(subClass, superClass);
      }
      function _setPrototypeOf(o, p) {
        _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf2(o2, p2) {
          o2.__proto__ = p2;
          return o2;
        };
        return _setPrototypeOf(o, p);
      }
      function _createSuper(Derived) {
        var hasNativeReflectConstruct = _isNativeReflectConstruct();
        return function _createSuperInternal() {
          var Super = _getPrototypeOf(Derived), result;
          if (hasNativeReflectConstruct) {
            var NewTarget = _getPrototypeOf(this).constructor;
            result = Reflect.construct(Super, arguments, NewTarget);
          } else {
            result = Super.apply(this, arguments);
          }
          return _possibleConstructorReturn(this, result);
        };
      }
      function _possibleConstructorReturn(self2, call) {
        if (call && (_typeof(call) === "object" || typeof call === "function")) {
          return call;
        }
        return _assertThisInitialized(self2);
      }
      function _assertThisInitialized(self2) {
        if (self2 === void 0) {
          throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        }
        return self2;
      }
      function _isNativeReflectConstruct() {
        if (typeof Reflect === "undefined" || !Reflect.construct)
          return false;
        if (Reflect.construct.sham)
          return false;
        if (typeof Proxy === "function")
          return true;
        try {
          Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
          }));
          return true;
        } catch (e) {
          return false;
        }
      }
      function _getPrototypeOf(o) {
        _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf2(o2) {
          return o2.__proto__ || Object.getPrototypeOf(o2);
        };
        return _getPrototypeOf(o);
      }
      var PaddingRight;
      var _Length;
      _Length = require_Length();
      module.exports = PaddingRight = /* @__PURE__ */ function(_Length2) {
        _inherits(PaddingRight2, _Length2);
        var _super = _createSuper(PaddingRight2);
        function PaddingRight2() {
          _classCallCheck(this, PaddingRight2);
          return _super.apply(this, arguments);
        }
        return PaddingRight2;
      }(_Length);
    }
  });

  // node_modules/.pnpm/renderkid@3.0.0/node_modules/renderkid/lib/renderKid/styles/rule/declarationBlock/PaddingBottom.js
  var require_PaddingBottom = __commonJS({
    "node_modules/.pnpm/renderkid@3.0.0/node_modules/renderkid/lib/renderKid/styles/rule/declarationBlock/PaddingBottom.js"(exports, module) {
      "use strict";
      function _typeof(obj) {
        "@babel/helpers - typeof";
        if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
          _typeof = function _typeof2(obj2) {
            return typeof obj2;
          };
        } else {
          _typeof = function _typeof2(obj2) {
            return obj2 && typeof Symbol === "function" && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
          };
        }
        return _typeof(obj);
      }
      function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
          throw new TypeError("Cannot call a class as a function");
        }
      }
      function _inherits(subClass, superClass) {
        if (typeof superClass !== "function" && superClass !== null) {
          throw new TypeError("Super expression must either be null or a function");
        }
        subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } });
        if (superClass)
          _setPrototypeOf(subClass, superClass);
      }
      function _setPrototypeOf(o, p) {
        _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf2(o2, p2) {
          o2.__proto__ = p2;
          return o2;
        };
        return _setPrototypeOf(o, p);
      }
      function _createSuper(Derived) {
        var hasNativeReflectConstruct = _isNativeReflectConstruct();
        return function _createSuperInternal() {
          var Super = _getPrototypeOf(Derived), result;
          if (hasNativeReflectConstruct) {
            var NewTarget = _getPrototypeOf(this).constructor;
            result = Reflect.construct(Super, arguments, NewTarget);
          } else {
            result = Super.apply(this, arguments);
          }
          return _possibleConstructorReturn(this, result);
        };
      }
      function _possibleConstructorReturn(self2, call) {
        if (call && (_typeof(call) === "object" || typeof call === "function")) {
          return call;
        }
        return _assertThisInitialized(self2);
      }
      function _assertThisInitialized(self2) {
        if (self2 === void 0) {
          throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        }
        return self2;
      }
      function _isNativeReflectConstruct() {
        if (typeof Reflect === "undefined" || !Reflect.construct)
          return false;
        if (Reflect.construct.sham)
          return false;
        if (typeof Proxy === "function")
          return true;
        try {
          Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
          }));
          return true;
        } catch (e) {
          return false;
        }
      }
      function _getPrototypeOf(o) {
        _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf2(o2) {
          return o2.__proto__ || Object.getPrototypeOf(o2);
        };
        return _getPrototypeOf(o);
      }
      var PaddingBottom;
      var _Length;
      _Length = require_Length();
      module.exports = PaddingBottom = /* @__PURE__ */ function(_Length2) {
        _inherits(PaddingBottom2, _Length2);
        var _super = _createSuper(PaddingBottom2);
        function PaddingBottom2() {
          _classCallCheck(this, PaddingBottom2);
          return _super.apply(this, arguments);
        }
        return PaddingBottom2;
      }(_Length);
    }
  });

  // node_modules/.pnpm/renderkid@3.0.0/node_modules/renderkid/lib/renderKid/styles/rule/declarationBlock/Padding.js
  var require_Padding = __commonJS({
    "node_modules/.pnpm/renderkid@3.0.0/node_modules/renderkid/lib/renderKid/styles/rule/declarationBlock/Padding.js"(exports, module) {
      "use strict";
      function _typeof(obj) {
        "@babel/helpers - typeof";
        if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
          _typeof = function _typeof2(obj2) {
            return typeof obj2;
          };
        } else {
          _typeof = function _typeof2(obj2) {
            return obj2 && typeof Symbol === "function" && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
          };
        }
        return _typeof(obj);
      }
      function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
          throw new TypeError("Cannot call a class as a function");
        }
      }
      function _defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
          var descriptor = props[i];
          descriptor.enumerable = descriptor.enumerable || false;
          descriptor.configurable = true;
          if ("value" in descriptor)
            descriptor.writable = true;
          Object.defineProperty(target, descriptor.key, descriptor);
        }
      }
      function _createClass(Constructor, protoProps, staticProps) {
        if (protoProps)
          _defineProperties(Constructor.prototype, protoProps);
        if (staticProps)
          _defineProperties(Constructor, staticProps);
        return Constructor;
      }
      function _inherits(subClass, superClass) {
        if (typeof superClass !== "function" && superClass !== null) {
          throw new TypeError("Super expression must either be null or a function");
        }
        subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } });
        if (superClass)
          _setPrototypeOf(subClass, superClass);
      }
      function _setPrototypeOf(o, p) {
        _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf2(o2, p2) {
          o2.__proto__ = p2;
          return o2;
        };
        return _setPrototypeOf(o, p);
      }
      function _createSuper(Derived) {
        var hasNativeReflectConstruct = _isNativeReflectConstruct();
        return function _createSuperInternal() {
          var Super = _getPrototypeOf(Derived), result;
          if (hasNativeReflectConstruct) {
            var NewTarget = _getPrototypeOf(this).constructor;
            result = Reflect.construct(Super, arguments, NewTarget);
          } else {
            result = Super.apply(this, arguments);
          }
          return _possibleConstructorReturn(this, result);
        };
      }
      function _possibleConstructorReturn(self2, call) {
        if (call && (_typeof(call) === "object" || typeof call === "function")) {
          return call;
        }
        return _assertThisInitialized(self2);
      }
      function _assertThisInitialized(self2) {
        if (self2 === void 0) {
          throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        }
        return self2;
      }
      function _isNativeReflectConstruct() {
        if (typeof Reflect === "undefined" || !Reflect.construct)
          return false;
        if (Reflect.construct.sham)
          return false;
        if (typeof Proxy === "function")
          return true;
        try {
          Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
          }));
          return true;
        } catch (e) {
          return false;
        }
      }
      function _getPrototypeOf(o) {
        _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf2(o2) {
          return o2.__proto__ || Object.getPrototypeOf(o2);
        };
        return _getPrototypeOf(o);
      }
      var Padding;
      var PaddingBottom;
      var PaddingLeft;
      var PaddingRight;
      var PaddingTop;
      var _Declaration;
      _Declaration = require_Declaration();
      PaddingTop = require_PaddingTop();
      PaddingLeft = require_PaddingLeft();
      PaddingRight = require_PaddingRight();
      PaddingBottom = require_PaddingBottom();
      module.exports = Padding = function() {
        var self2;
        var Padding2 = /* @__PURE__ */ function(_Declaration2) {
          _inherits(Padding3, _Declaration2);
          var _super = _createSuper(Padding3);
          function Padding3() {
            _classCallCheck(this, Padding3);
            return _super.apply(this, arguments);
          }
          _createClass(Padding3, null, [{
            key: "setOnto",
            value: function setOnto(declarations, prop, originalValue) {
              var append, val, vals;
              append = "";
              val = _Declaration.sanitizeValue(originalValue);
              if (_Declaration.importantClauseRx.test(String(val))) {
                append = " !important";
                val = val.replace(_Declaration.importantClauseRx, "");
              }
              val = val.trim();
              if (val.length === 0) {
                return self2._setAllDirections(declarations, append, append, append, append);
              }
              vals = val.split(" ").map(function(val2) {
                return val2 + append;
              });
              if (vals.length === 1) {
                return self2._setAllDirections(declarations, vals[0], vals[0], vals[0], vals[0]);
              } else if (vals.length === 2) {
                return self2._setAllDirections(declarations, vals[0], vals[1], vals[0], vals[1]);
              } else if (vals.length === 3) {
                return self2._setAllDirections(declarations, vals[0], vals[1], vals[2], vals[1]);
              } else if (vals.length === 4) {
                return self2._setAllDirections(declarations, vals[0], vals[1], vals[2], vals[3]);
              } else {
                throw Error("Can't understand value for padding: `".concat(originalValue, "`"));
              }
            }
          }, {
            key: "_setAllDirections",
            value: function _setAllDirections(declarations, top, right, bottom, left) {
              PaddingTop.setOnto(declarations, "paddingTop", top);
              PaddingTop.setOnto(declarations, "paddingRight", right);
              PaddingTop.setOnto(declarations, "paddingBottom", bottom);
              PaddingTop.setOnto(declarations, "paddingLeft", left);
            }
          }]);
          return Padding3;
        }(_Declaration);
        ;
        self2 = Padding2;
        return Padding2;
      }.call(void 0);
    }
  });

  // node_modules/.pnpm/renderkid@3.0.0/node_modules/renderkid/lib/renderKid/styles/rule/DeclarationBlock.js
  var require_DeclarationBlock = __commonJS({
    "node_modules/.pnpm/renderkid@3.0.0/node_modules/renderkid/lib/renderKid/styles/rule/DeclarationBlock.js"(exports, module) {
      "use strict";
      function _typeof(obj) {
        "@babel/helpers - typeof";
        if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
          _typeof = function _typeof2(obj2) {
            return typeof obj2;
          };
        } else {
          _typeof = function _typeof2(obj2) {
            return obj2 && typeof Symbol === "function" && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
          };
        }
        return _typeof(obj);
      }
      function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
          throw new TypeError("Cannot call a class as a function");
        }
      }
      function _defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
          var descriptor = props[i];
          descriptor.enumerable = descriptor.enumerable || false;
          descriptor.configurable = true;
          if ("value" in descriptor)
            descriptor.writable = true;
          Object.defineProperty(target, descriptor.key, descriptor);
        }
      }
      function _createClass(Constructor, protoProps, staticProps) {
        if (protoProps)
          _defineProperties(Constructor.prototype, protoProps);
        if (staticProps)
          _defineProperties(Constructor, staticProps);
        return Constructor;
      }
      var Arbitrary;
      var DeclarationBlock;
      var declarationClasses;
      module.exports = DeclarationBlock = function() {
        var self2;
        var DeclarationBlock2 = /* @__PURE__ */ function() {
          function DeclarationBlock3() {
            _classCallCheck(this, DeclarationBlock3);
            this._declarations = {};
          }
          _createClass(DeclarationBlock3, [{
            key: "set",
            value: function set(prop, value) {
              var key, val;
              if (_typeof(prop) === "object") {
                for (key in prop) {
                  val = prop[key];
                  this.set(key, val);
                }
                return this;
              }
              prop = self2.sanitizeProp(prop);
              this._getDeclarationClass(prop).setOnto(this._declarations, prop, value);
              return this;
            }
          }, {
            key: "_getDeclarationClass",
            value: function _getDeclarationClass(prop) {
              var cls;
              if (prop[0] === "_") {
                return Arbitrary;
              }
              if (!(cls = declarationClasses[prop])) {
                throw Error("Unknown property `".concat(prop, "`. Write it as `_").concat(prop, "` if you're defining a custom property"));
              }
              return cls;
            }
          }], [{
            key: "sanitizeProp",
            value: function sanitizeProp(prop) {
              return String(prop).trim();
            }
          }]);
          return DeclarationBlock3;
        }();
        ;
        self2 = DeclarationBlock2;
        return DeclarationBlock2;
      }.call(void 0);
      Arbitrary = require_Arbitrary();
      declarationClasses = {
        color: require_Color(),
        background: require_Background(),
        width: require_Width(),
        height: require_Height(),
        bullet: require_Bullet(),
        display: require_Display(),
        margin: require_Margin(),
        marginTop: require_MarginTop(),
        marginLeft: require_MarginLeft(),
        marginRight: require_MarginRight(),
        marginBottom: require_MarginBottom(),
        padding: require_Padding(),
        paddingTop: require_PaddingTop(),
        paddingLeft: require_PaddingLeft(),
        paddingRight: require_PaddingRight(),
        paddingBottom: require_PaddingBottom()
      };
    }
  });

  // node_modules/.pnpm/renderkid@3.0.0/node_modules/renderkid/lib/renderKid/styles/Rule.js
  var require_Rule = __commonJS({
    "node_modules/.pnpm/renderkid@3.0.0/node_modules/renderkid/lib/renderKid/styles/Rule.js"(exports, module) {
      "use strict";
      function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
          throw new TypeError("Cannot call a class as a function");
        }
      }
      function _defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
          var descriptor = props[i];
          descriptor.enumerable = descriptor.enumerable || false;
          descriptor.configurable = true;
          if ("value" in descriptor)
            descriptor.writable = true;
          Object.defineProperty(target, descriptor.key, descriptor);
        }
      }
      function _createClass(Constructor, protoProps, staticProps) {
        if (protoProps)
          _defineProperties(Constructor.prototype, protoProps);
        if (staticProps)
          _defineProperties(Constructor, staticProps);
        return Constructor;
      }
      var DeclarationBlock;
      var Rule;
      var Selector;
      Selector = require_Selector();
      DeclarationBlock = require_DeclarationBlock();
      module.exports = Rule = /* @__PURE__ */ function() {
        function Rule2(selector) {
          _classCallCheck(this, Rule2);
          this.selector = new Selector(selector);
          this.styles = new DeclarationBlock();
        }
        _createClass(Rule2, [{
          key: "setStyles",
          value: function setStyles(styles3) {
            this.styles.set(styles3);
            return this;
          }
        }]);
        return Rule2;
      }();
    }
  });

  // node_modules/.pnpm/renderkid@3.0.0/node_modules/renderkid/lib/renderKid/styles/StyleSheet.js
  var require_StyleSheet = __commonJS({
    "node_modules/.pnpm/renderkid@3.0.0/node_modules/renderkid/lib/renderKid/styles/StyleSheet.js"(exports, module) {
      "use strict";
      function _typeof(obj) {
        "@babel/helpers - typeof";
        if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
          _typeof = function _typeof2(obj2) {
            return typeof obj2;
          };
        } else {
          _typeof = function _typeof2(obj2) {
            return obj2 && typeof Symbol === "function" && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
          };
        }
        return _typeof(obj);
      }
      function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
          throw new TypeError("Cannot call a class as a function");
        }
      }
      function _defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
          var descriptor = props[i];
          descriptor.enumerable = descriptor.enumerable || false;
          descriptor.configurable = true;
          if ("value" in descriptor)
            descriptor.writable = true;
          Object.defineProperty(target, descriptor.key, descriptor);
        }
      }
      function _createClass(Constructor, protoProps, staticProps) {
        if (protoProps)
          _defineProperties(Constructor.prototype, protoProps);
        if (staticProps)
          _defineProperties(Constructor, staticProps);
        return Constructor;
      }
      var Rule;
      var StyleSheet;
      Rule = require_Rule();
      module.exports = StyleSheet = function() {
        var self2;
        var StyleSheet2 = /* @__PURE__ */ function() {
          function StyleSheet3() {
            _classCallCheck(this, StyleSheet3);
            this._rulesBySelector = {};
          }
          _createClass(StyleSheet3, [{
            key: "setRule",
            value: function setRule(selector, styles3) {
              var key, val;
              if (typeof selector === "string") {
                this._setRule(selector, styles3);
              } else if (_typeof(selector) === "object") {
                for (key in selector) {
                  val = selector[key];
                  this._setRule(key, val);
                }
              }
              return this;
            }
          }, {
            key: "_setRule",
            value: function _setRule(s, styles3) {
              var i, len, ref, selector;
              ref = self2.splitSelectors(s);
              for (i = 0, len = ref.length; i < len; i++) {
                selector = ref[i];
                this._setSingleRule(selector, styles3);
              }
              return this;
            }
          }, {
            key: "_setSingleRule",
            value: function _setSingleRule(s, styles3) {
              var rule, selector;
              selector = self2.normalizeSelector(s);
              if (!(rule = this._rulesBySelector[selector])) {
                rule = new Rule(selector);
                this._rulesBySelector[selector] = rule;
              }
              rule.setStyles(styles3);
              return this;
            }
          }, {
            key: "getRulesFor",
            value: function getRulesFor(el) {
              var ref, rule, rules, selector;
              rules = [];
              ref = this._rulesBySelector;
              for (selector in ref) {
                rule = ref[selector];
                if (rule.selector.matches(el)) {
                  rules.push(rule);
                }
              }
              return rules;
            }
          }], [{
            key: "normalizeSelector",
            value: function normalizeSelector(selector) {
              return selector.replace(/[\s]+/g, " ").replace(/[\s]*([>\,\+]{1})[\s]*/g, "$1").trim();
            }
          }, {
            key: "splitSelectors",
            value: function splitSelectors(s) {
              return s.trim().split(",");
            }
          }]);
          return StyleSheet3;
        }();
        ;
        self2 = StyleSheet2;
        return StyleSheet2;
      }.call(void 0);
    }
  });

  // node_modules/.pnpm/renderkid@3.0.0/node_modules/renderkid/lib/renderKid/styles/rule/MixedDeclarationSet.js
  var require_MixedDeclarationSet = __commonJS({
    "node_modules/.pnpm/renderkid@3.0.0/node_modules/renderkid/lib/renderKid/styles/rule/MixedDeclarationSet.js"(exports, module) {
      "use strict";
      function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
          throw new TypeError("Cannot call a class as a function");
        }
      }
      function _defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
          var descriptor = props[i];
          descriptor.enumerable = descriptor.enumerable || false;
          descriptor.configurable = true;
          if ("value" in descriptor)
            descriptor.writable = true;
          Object.defineProperty(target, descriptor.key, descriptor);
        }
      }
      function _createClass(Constructor, protoProps, staticProps) {
        if (protoProps)
          _defineProperties(Constructor.prototype, protoProps);
        if (staticProps)
          _defineProperties(Constructor, staticProps);
        return Constructor;
      }
      var MixedDeclarationSet;
      module.exports = MixedDeclarationSet = function() {
        var self2;
        var MixedDeclarationSet2 = /* @__PURE__ */ function() {
          function MixedDeclarationSet3() {
            _classCallCheck(this, MixedDeclarationSet3);
            this._declarations = {};
          }
          _createClass(MixedDeclarationSet3, [{
            key: "mixWithList",
            value: function mixWithList(rules) {
              var i, len, rule;
              rules.sort(function(a, b) {
                return a.selector.priority > b.selector.priority;
              });
              for (i = 0, len = rules.length; i < len; i++) {
                rule = rules[i];
                this._mixWithRule(rule);
              }
              return this;
            }
          }, {
            key: "_mixWithRule",
            value: function _mixWithRule(rule) {
              var dec, prop, ref;
              ref = rule.styles._declarations;
              for (prop in ref) {
                dec = ref[prop];
                this._mixWithDeclaration(dec);
              }
            }
          }, {
            key: "_mixWithDeclaration",
            value: function _mixWithDeclaration(dec) {
              var cur;
              cur = this._declarations[dec.prop];
              if (cur != null && cur.important && !dec.important) {
                return;
              }
              this._declarations[dec.prop] = dec;
            }
          }, {
            key: "get",
            value: function get4(prop) {
              if (prop == null) {
                return this._declarations;
              }
              if (this._declarations[prop] == null) {
                return null;
              }
              return this._declarations[prop].val;
            }
          }, {
            key: "toObject",
            value: function toObject() {
              var dec, obj, prop, ref;
              obj = {};
              ref = this._declarations;
              for (prop in ref) {
                dec = ref[prop];
                obj[prop] = dec.val;
              }
              return obj;
            }
          }], [{
            key: "mix",
            value: function mix() {
              var i, len, mixed, rules;
              mixed = new self2();
              for (var _len = arguments.length, ruleSets = new Array(_len), _key = 0; _key < _len; _key++) {
                ruleSets[_key] = arguments[_key];
              }
              for (i = 0, len = ruleSets.length; i < len; i++) {
                rules = ruleSets[i];
                mixed.mixWithList(rules);
              }
              return mixed;
            }
          }]);
          return MixedDeclarationSet3;
        }();
        ;
        self2 = MixedDeclarationSet2;
        return MixedDeclarationSet2;
      }.call(void 0);
    }
  });

  // node_modules/.pnpm/renderkid@3.0.0/node_modules/renderkid/lib/renderKid/Styles.js
  var require_Styles = __commonJS({
    "node_modules/.pnpm/renderkid@3.0.0/node_modules/renderkid/lib/renderKid/Styles.js"(exports, module) {
      "use strict";
      function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
          throw new TypeError("Cannot call a class as a function");
        }
      }
      function _defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
          var descriptor = props[i];
          descriptor.enumerable = descriptor.enumerable || false;
          descriptor.configurable = true;
          if ("value" in descriptor)
            descriptor.writable = true;
          Object.defineProperty(target, descriptor.key, descriptor);
        }
      }
      function _createClass(Constructor, protoProps, staticProps) {
        if (protoProps)
          _defineProperties(Constructor.prototype, protoProps);
        if (staticProps)
          _defineProperties(Constructor, staticProps);
        return Constructor;
      }
      var MixedDeclarationSet;
      var StyleSheet;
      var Styles;
      var terminalWidth;
      StyleSheet = require_StyleSheet();
      MixedDeclarationSet = require_MixedDeclarationSet();
      terminalWidth = require_tools().getCols();
      module.exports = Styles = function() {
        var self2;
        var Styles2 = /* @__PURE__ */ function() {
          function Styles3() {
            _classCallCheck(this, Styles3);
            this._defaultStyles = new StyleSheet();
            this._userStyles = new StyleSheet();
            this._setDefaultStyles();
          }
          _createClass(Styles3, [{
            key: "_setDefaultStyles",
            value: function _setDefaultStyles() {
              this._defaultStyles.setRule(self2.defaultRules);
            }
          }, {
            key: "setRule",
            value: function setRule(selector, rules) {
              this._userStyles.setRule.apply(this._userStyles, arguments);
              return this;
            }
          }, {
            key: "getStyleFor",
            value: function getStyleFor(el) {
              var styles3;
              styles3 = el.styles;
              if (styles3 == null) {
                el.styles = styles3 = this._getComputedStyleFor(el);
              }
              return styles3;
            }
          }, {
            key: "_getRawStyleFor",
            value: function _getRawStyleFor(el) {
              var def, user;
              def = this._defaultStyles.getRulesFor(el);
              user = this._userStyles.getRulesFor(el);
              return MixedDeclarationSet.mix(def, user).toObject();
            }
          }, {
            key: "_getComputedStyleFor",
            value: function _getComputedStyleFor(el) {
              var decs, parent, prop, ref, val;
              decs = {};
              parent = el.parent;
              ref = this._getRawStyleFor(el);
              for (prop in ref) {
                val = ref[prop];
                if (val !== "inherit") {
                  decs[prop] = val;
                } else {
                  throw Error("Inherited styles are not supported yet.");
                }
              }
              return decs;
            }
          }]);
          return Styles3;
        }();
        ;
        self2 = Styles2;
        Styles2.defaultRules = {
          "*": {
            display: "inline"
          },
          "body": {
            background: "none",
            color: "white",
            display: "block",
            width: terminalWidth + " !important"
          }
        };
        return Styles2;
      }.call(void 0);
    }
  });

  // node_modules/.pnpm/renderkid@3.0.0/node_modules/renderkid/lib/layout/SpecialString.js
  var require_SpecialString = __commonJS({
    "node_modules/.pnpm/renderkid@3.0.0/node_modules/renderkid/lib/layout/SpecialString.js"(exports, module) {
      "use strict";
      function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
          throw new TypeError("Cannot call a class as a function");
        }
      }
      function _defineProperties(target, props) {
        for (var i2 = 0; i2 < props.length; i2++) {
          var descriptor = props[i2];
          descriptor.enumerable = descriptor.enumerable || false;
          descriptor.configurable = true;
          if ("value" in descriptor)
            descriptor.writable = true;
          Object.defineProperty(target, descriptor.key, descriptor);
        }
      }
      function _createClass(Constructor, protoProps, staticProps) {
        if (protoProps)
          _defineProperties(Constructor.prototype, protoProps);
        if (staticProps)
          _defineProperties(Constructor, staticProps);
        return Constructor;
      }
      var SpecialString;
      var i;
      var len;
      var prop;
      var ref;
      module.exports = SpecialString = function() {
        var self2;
        var SpecialString2 = /* @__PURE__ */ function() {
          function SpecialString3(str) {
            _classCallCheck(this, SpecialString3);
            if (!(this instanceof self2)) {
              return new self2(str);
            }
            this._str = String(str);
            this._len = 0;
          }
          _createClass(SpecialString3, [{
            key: "_getStr",
            value: function _getStr() {
              return this._str;
            }
          }, {
            key: "set",
            value: function set(str) {
              this._str = String(str);
              return this;
            }
          }, {
            key: "clone",
            value: function clone() {
              return new SpecialString3(this._str);
            }
          }, {
            key: "isEmpty",
            value: function isEmpty() {
              return this._str === "";
            }
          }, {
            key: "isOnlySpecialChars",
            value: function isOnlySpecialChars() {
              return !this.isEmpty() && this.length === 0;
            }
          }, {
            key: "_reset",
            value: function _reset() {
              return this._len = 0;
            }
          }, {
            key: "splitIn",
            value: function splitIn(limit) {
              var trimLeftEachLine = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : false;
              var buffer, bufferLength, justSkippedSkipChar, lines;
              buffer = "";
              bufferLength = 0;
              lines = [];
              justSkippedSkipChar = false;
              self2._countChars(this._str, function(char, charLength) {
                if (bufferLength > limit || bufferLength + charLength > limit) {
                  lines.push(buffer);
                  buffer = "";
                  bufferLength = 0;
                }
                if (bufferLength === 0 && char === " " && !justSkippedSkipChar && trimLeftEachLine) {
                  return justSkippedSkipChar = true;
                } else {
                  buffer += char;
                  bufferLength += charLength;
                  return justSkippedSkipChar = false;
                }
              });
              if (buffer.length > 0) {
                lines.push(buffer);
              }
              return lines;
            }
          }, {
            key: "trim",
            value: function trim() {
              return new SpecialString3(this.str.trim());
            }
          }, {
            key: "_getLength",
            value: function _getLength() {
              var sum;
              sum = 0;
              self2._countChars(this._str, function(char, charLength) {
                sum += charLength;
              });
              return sum;
            }
          }, {
            key: "cut",
            value: function cut(from, to) {
              var _this = this;
              var trimLeft = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : false;
              var after, before, cur, cut2;
              if (to == null) {
                to = this.length;
              }
              from = parseInt(from);
              if (from >= to) {
                throw Error("`from` shouldn't be larger than `to`");
              }
              before = "";
              after = "";
              cut2 = "";
              cur = 0;
              self2._countChars(this._str, function(char, charLength) {
                if (_this.str === "ab<tag>") {
                  console.log(charLength, char);
                }
                if (cur === from && char.match(/^\s+$/) && trimLeft) {
                  return;
                }
                if (cur < from) {
                  before += char;
                } else if (cur < to || cur + charLength <= to) {
                  cut2 += char;
                } else {
                  after += char;
                }
                cur += charLength;
              });
              this._str = before + after;
              this._reset();
              return new SpecialString3(cut2);
            }
          }], [{
            key: "_countChars",
            value: function _countChars(text, cb) {
              var char, charLength, m;
              while (text.length !== 0) {
                if (m = text.match(self2._tagRx)) {
                  char = m[0];
                  charLength = 0;
                  text = text.substr(char.length, text.length);
                } else if (m = text.match(self2._quotedHtmlRx)) {
                  char = m[0];
                  charLength = 1;
                  text = text.substr(char.length, text.length);
                } else if (text.match(self2._tabRx)) {
                  char = "	";
                  charLength = 8;
                  text = text.substr(1, text.length);
                } else {
                  char = text[0];
                  charLength = 1;
                  text = text.substr(1, text.length);
                }
                cb.call(null, char, charLength);
              }
            }
          }]);
          return SpecialString3;
        }();
        ;
        self2 = SpecialString2;
        SpecialString2._tabRx = /^\t/;
        SpecialString2._tagRx = /^<[^>]+>/;
        SpecialString2._quotedHtmlRx = /^&(gt|lt|quot|amp|apos|sp);/;
        return SpecialString2;
      }.call(void 0);
      ref = ["str", "length"];
      for (i = 0, len = ref.length; i < len; i++) {
        prop = ref[i];
        (function() {
          var methodName;
          methodName = "_get" + prop[0].toUpperCase() + prop.substr(1, prop.length);
          return SpecialString.prototype.__defineGetter__(prop, function() {
            return this[methodName]();
          });
        })();
      }
    }
  });

  // node_modules/.pnpm/renderkid@3.0.0/node_modules/renderkid/lib/layout/block/blockPrependor/_BlockPrependor.js
  var require_BlockPrependor = __commonJS({
    "node_modules/.pnpm/renderkid@3.0.0/node_modules/renderkid/lib/layout/block/blockPrependor/_BlockPrependor.js"(exports, module) {
      "use strict";
      function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
          throw new TypeError("Cannot call a class as a function");
        }
      }
      function _defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
          var descriptor = props[i];
          descriptor.enumerable = descriptor.enumerable || false;
          descriptor.configurable = true;
          if ("value" in descriptor)
            descriptor.writable = true;
          Object.defineProperty(target, descriptor.key, descriptor);
        }
      }
      function _createClass(Constructor, protoProps, staticProps) {
        if (protoProps)
          _defineProperties(Constructor.prototype, protoProps);
        if (staticProps)
          _defineProperties(Constructor, staticProps);
        return Constructor;
      }
      var _BlockPrependor;
      module.exports = _BlockPrependor = /* @__PURE__ */ function() {
        function _BlockPrependor2(_config) {
          _classCallCheck(this, _BlockPrependor2);
          this._config = _config;
        }
        _createClass(_BlockPrependor2, [{
          key: "render",
          value: function render(options) {
            return this._render(options);
          }
        }]);
        return _BlockPrependor2;
      }();
    }
  });

  // node_modules/.pnpm/renderkid@3.0.0/node_modules/renderkid/lib/layout/block/blockPrependor/Default.js
  var require_Default = __commonJS({
    "node_modules/.pnpm/renderkid@3.0.0/node_modules/renderkid/lib/layout/block/blockPrependor/Default.js"(exports, module) {
      "use strict";
      function _typeof(obj) {
        "@babel/helpers - typeof";
        if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
          _typeof = function _typeof2(obj2) {
            return typeof obj2;
          };
        } else {
          _typeof = function _typeof2(obj2) {
            return obj2 && typeof Symbol === "function" && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
          };
        }
        return _typeof(obj);
      }
      function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
          throw new TypeError("Cannot call a class as a function");
        }
      }
      function _defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
          var descriptor = props[i];
          descriptor.enumerable = descriptor.enumerable || false;
          descriptor.configurable = true;
          if ("value" in descriptor)
            descriptor.writable = true;
          Object.defineProperty(target, descriptor.key, descriptor);
        }
      }
      function _createClass(Constructor, protoProps, staticProps) {
        if (protoProps)
          _defineProperties(Constructor.prototype, protoProps);
        if (staticProps)
          _defineProperties(Constructor, staticProps);
        return Constructor;
      }
      function _inherits(subClass, superClass) {
        if (typeof superClass !== "function" && superClass !== null) {
          throw new TypeError("Super expression must either be null or a function");
        }
        subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } });
        if (superClass)
          _setPrototypeOf(subClass, superClass);
      }
      function _setPrototypeOf(o, p) {
        _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf2(o2, p2) {
          o2.__proto__ = p2;
          return o2;
        };
        return _setPrototypeOf(o, p);
      }
      function _createSuper(Derived) {
        var hasNativeReflectConstruct = _isNativeReflectConstruct();
        return function _createSuperInternal() {
          var Super = _getPrototypeOf(Derived), result;
          if (hasNativeReflectConstruct) {
            var NewTarget = _getPrototypeOf(this).constructor;
            result = Reflect.construct(Super, arguments, NewTarget);
          } else {
            result = Super.apply(this, arguments);
          }
          return _possibleConstructorReturn(this, result);
        };
      }
      function _possibleConstructorReturn(self2, call) {
        if (call && (_typeof(call) === "object" || typeof call === "function")) {
          return call;
        }
        return _assertThisInitialized(self2);
      }
      function _assertThisInitialized(self2) {
        if (self2 === void 0) {
          throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        }
        return self2;
      }
      function _isNativeReflectConstruct() {
        if (typeof Reflect === "undefined" || !Reflect.construct)
          return false;
        if (Reflect.construct.sham)
          return false;
        if (typeof Proxy === "function")
          return true;
        try {
          Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
          }));
          return true;
        } catch (e) {
          return false;
        }
      }
      function _getPrototypeOf(o) {
        _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf2(o2) {
          return o2.__proto__ || Object.getPrototypeOf(o2);
        };
        return _getPrototypeOf(o);
      }
      var DefaultBlockPrependor;
      var tools;
      tools = require_tools();
      module.exports = DefaultBlockPrependor = /* @__PURE__ */ function(_require) {
        _inherits(DefaultBlockPrependor2, _require);
        var _super = _createSuper(DefaultBlockPrependor2);
        function DefaultBlockPrependor2() {
          _classCallCheck(this, DefaultBlockPrependor2);
          return _super.apply(this, arguments);
        }
        _createClass(DefaultBlockPrependor2, [{
          key: "_render",
          value: function _render(options) {
            return tools.repeatString("\n", this._config.amount);
          }
        }]);
        return DefaultBlockPrependor2;
      }(require_BlockPrependor());
    }
  });

  // node_modules/.pnpm/renderkid@3.0.0/node_modules/renderkid/lib/layout/block/blockAppendor/_BlockAppendor.js
  var require_BlockAppendor = __commonJS({
    "node_modules/.pnpm/renderkid@3.0.0/node_modules/renderkid/lib/layout/block/blockAppendor/_BlockAppendor.js"(exports, module) {
      "use strict";
      function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
          throw new TypeError("Cannot call a class as a function");
        }
      }
      function _defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
          var descriptor = props[i];
          descriptor.enumerable = descriptor.enumerable || false;
          descriptor.configurable = true;
          if ("value" in descriptor)
            descriptor.writable = true;
          Object.defineProperty(target, descriptor.key, descriptor);
        }
      }
      function _createClass(Constructor, protoProps, staticProps) {
        if (protoProps)
          _defineProperties(Constructor.prototype, protoProps);
        if (staticProps)
          _defineProperties(Constructor, staticProps);
        return Constructor;
      }
      var _BlockAppendor;
      module.exports = _BlockAppendor = /* @__PURE__ */ function() {
        function _BlockAppendor2(_config) {
          _classCallCheck(this, _BlockAppendor2);
          this._config = _config;
        }
        _createClass(_BlockAppendor2, [{
          key: "render",
          value: function render(options) {
            return this._render(options);
          }
        }]);
        return _BlockAppendor2;
      }();
    }
  });

  // node_modules/.pnpm/renderkid@3.0.0/node_modules/renderkid/lib/layout/block/blockAppendor/Default.js
  var require_Default2 = __commonJS({
    "node_modules/.pnpm/renderkid@3.0.0/node_modules/renderkid/lib/layout/block/blockAppendor/Default.js"(exports, module) {
      "use strict";
      function _typeof(obj) {
        "@babel/helpers - typeof";
        if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
          _typeof = function _typeof2(obj2) {
            return typeof obj2;
          };
        } else {
          _typeof = function _typeof2(obj2) {
            return obj2 && typeof Symbol === "function" && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
          };
        }
        return _typeof(obj);
      }
      function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
          throw new TypeError("Cannot call a class as a function");
        }
      }
      function _defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
          var descriptor = props[i];
          descriptor.enumerable = descriptor.enumerable || false;
          descriptor.configurable = true;
          if ("value" in descriptor)
            descriptor.writable = true;
          Object.defineProperty(target, descriptor.key, descriptor);
        }
      }
      function _createClass(Constructor, protoProps, staticProps) {
        if (protoProps)
          _defineProperties(Constructor.prototype, protoProps);
        if (staticProps)
          _defineProperties(Constructor, staticProps);
        return Constructor;
      }
      function _inherits(subClass, superClass) {
        if (typeof superClass !== "function" && superClass !== null) {
          throw new TypeError("Super expression must either be null or a function");
        }
        subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } });
        if (superClass)
          _setPrototypeOf(subClass, superClass);
      }
      function _setPrototypeOf(o, p) {
        _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf2(o2, p2) {
          o2.__proto__ = p2;
          return o2;
        };
        return _setPrototypeOf(o, p);
      }
      function _createSuper(Derived) {
        var hasNativeReflectConstruct = _isNativeReflectConstruct();
        return function _createSuperInternal() {
          var Super = _getPrototypeOf(Derived), result;
          if (hasNativeReflectConstruct) {
            var NewTarget = _getPrototypeOf(this).constructor;
            result = Reflect.construct(Super, arguments, NewTarget);
          } else {
            result = Super.apply(this, arguments);
          }
          return _possibleConstructorReturn(this, result);
        };
      }
      function _possibleConstructorReturn(self2, call) {
        if (call && (_typeof(call) === "object" || typeof call === "function")) {
          return call;
        }
        return _assertThisInitialized(self2);
      }
      function _assertThisInitialized(self2) {
        if (self2 === void 0) {
          throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        }
        return self2;
      }
      function _isNativeReflectConstruct() {
        if (typeof Reflect === "undefined" || !Reflect.construct)
          return false;
        if (Reflect.construct.sham)
          return false;
        if (typeof Proxy === "function")
          return true;
        try {
          Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
          }));
          return true;
        } catch (e) {
          return false;
        }
      }
      function _getPrototypeOf(o) {
        _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf2(o2) {
          return o2.__proto__ || Object.getPrototypeOf(o2);
        };
        return _getPrototypeOf(o);
      }
      var DefaultBlockAppendor;
      var tools;
      tools = require_tools();
      module.exports = DefaultBlockAppendor = /* @__PURE__ */ function(_require) {
        _inherits(DefaultBlockAppendor2, _require);
        var _super = _createSuper(DefaultBlockAppendor2);
        function DefaultBlockAppendor2() {
          _classCallCheck(this, DefaultBlockAppendor2);
          return _super.apply(this, arguments);
        }
        _createClass(DefaultBlockAppendor2, [{
          key: "_render",
          value: function _render(options) {
            return tools.repeatString("\n", this._config.amount);
          }
        }]);
        return DefaultBlockAppendor2;
      }(require_BlockAppendor());
    }
  });

  // node_modules/.pnpm/renderkid@3.0.0/node_modules/renderkid/lib/layout/block/linePrependor/_LinePrependor.js
  var require_LinePrependor = __commonJS({
    "node_modules/.pnpm/renderkid@3.0.0/node_modules/renderkid/lib/layout/block/linePrependor/_LinePrependor.js"(exports, module) {
      "use strict";
      function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
          throw new TypeError("Cannot call a class as a function");
        }
      }
      function _defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
          var descriptor = props[i];
          descriptor.enumerable = descriptor.enumerable || false;
          descriptor.configurable = true;
          if ("value" in descriptor)
            descriptor.writable = true;
          Object.defineProperty(target, descriptor.key, descriptor);
        }
      }
      function _createClass(Constructor, protoProps, staticProps) {
        if (protoProps)
          _defineProperties(Constructor.prototype, protoProps);
        if (staticProps)
          _defineProperties(Constructor, staticProps);
        return Constructor;
      }
      var _LinePrependor;
      module.exports = _LinePrependor = /* @__PURE__ */ function() {
        function _LinePrependor2(_config) {
          _classCallCheck(this, _LinePrependor2);
          this._config = _config;
          this._lineNo = -1;
        }
        _createClass(_LinePrependor2, [{
          key: "render",
          value: function render(inherited, options) {
            this._lineNo++;
            return "<none>" + this._render(inherited, options) + "</none>";
          }
        }]);
        return _LinePrependor2;
      }();
    }
  });

  // node_modules/.pnpm/renderkid@3.0.0/node_modules/renderkid/lib/layout/block/linePrependor/Default.js
  var require_Default3 = __commonJS({
    "node_modules/.pnpm/renderkid@3.0.0/node_modules/renderkid/lib/layout/block/linePrependor/Default.js"(exports, module) {
      "use strict";
      function _typeof(obj) {
        "@babel/helpers - typeof";
        if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
          _typeof = function _typeof2(obj2) {
            return typeof obj2;
          };
        } else {
          _typeof = function _typeof2(obj2) {
            return obj2 && typeof Symbol === "function" && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
          };
        }
        return _typeof(obj);
      }
      function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
          throw new TypeError("Cannot call a class as a function");
        }
      }
      function _defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
          var descriptor = props[i];
          descriptor.enumerable = descriptor.enumerable || false;
          descriptor.configurable = true;
          if ("value" in descriptor)
            descriptor.writable = true;
          Object.defineProperty(target, descriptor.key, descriptor);
        }
      }
      function _createClass(Constructor, protoProps, staticProps) {
        if (protoProps)
          _defineProperties(Constructor.prototype, protoProps);
        if (staticProps)
          _defineProperties(Constructor, staticProps);
        return Constructor;
      }
      function _inherits(subClass, superClass) {
        if (typeof superClass !== "function" && superClass !== null) {
          throw new TypeError("Super expression must either be null or a function");
        }
        subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } });
        if (superClass)
          _setPrototypeOf(subClass, superClass);
      }
      function _setPrototypeOf(o, p) {
        _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf2(o2, p2) {
          o2.__proto__ = p2;
          return o2;
        };
        return _setPrototypeOf(o, p);
      }
      function _createSuper(Derived) {
        var hasNativeReflectConstruct = _isNativeReflectConstruct();
        return function _createSuperInternal() {
          var Super = _getPrototypeOf(Derived), result;
          if (hasNativeReflectConstruct) {
            var NewTarget = _getPrototypeOf(this).constructor;
            result = Reflect.construct(Super, arguments, NewTarget);
          } else {
            result = Super.apply(this, arguments);
          }
          return _possibleConstructorReturn(this, result);
        };
      }
      function _possibleConstructorReturn(self2, call) {
        if (call && (_typeof(call) === "object" || typeof call === "function")) {
          return call;
        }
        return _assertThisInitialized(self2);
      }
      function _assertThisInitialized(self2) {
        if (self2 === void 0) {
          throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        }
        return self2;
      }
      function _isNativeReflectConstruct() {
        if (typeof Reflect === "undefined" || !Reflect.construct)
          return false;
        if (Reflect.construct.sham)
          return false;
        if (typeof Proxy === "function")
          return true;
        try {
          Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
          }));
          return true;
        } catch (e) {
          return false;
        }
      }
      function _getPrototypeOf(o) {
        _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf2(o2) {
          return o2.__proto__ || Object.getPrototypeOf(o2);
        };
        return _getPrototypeOf(o);
      }
      var DefaultLinePrependor;
      var SpecialString;
      var tools;
      tools = require_tools();
      SpecialString = require_SpecialString();
      module.exports = DefaultLinePrependor = function() {
        var self2;
        var DefaultLinePrependor2 = /* @__PURE__ */ function(_require) {
          _inherits(DefaultLinePrependor3, _require);
          var _super = _createSuper(DefaultLinePrependor3);
          function DefaultLinePrependor3() {
            _classCallCheck(this, DefaultLinePrependor3);
            return _super.apply(this, arguments);
          }
          _createClass(DefaultLinePrependor3, [{
            key: "_render",
            value: function _render(inherited, options) {
              var addToLeft, addToRight, alignment, bullet, char, charLen, diff, left, output, space, toWrite;
              if (this._lineNo === 0 && (bullet = this._config.bullet)) {
                char = bullet.char;
                charLen = new SpecialString(char).length;
                alignment = bullet.alignment;
                space = this._config.amount;
                toWrite = char;
                addToLeft = "";
                addToRight = "";
                if (space > charLen) {
                  diff = space - charLen;
                  if (alignment === "right") {
                    addToLeft = self2.pad(diff);
                  } else if (alignment === "left") {
                    addToRight = self2.pad(diff);
                  } else if (alignment === "center") {
                    left = Math.round(diff / 2);
                    addToLeft = self2.pad(left);
                    addToRight = self2.pad(diff - left);
                  } else {
                    throw Error("Unknown alignment `".concat(alignment, "`"));
                  }
                }
                output = addToLeft + char + addToRight;
              } else {
                output = self2.pad(this._config.amount);
              }
              return inherited + output;
            }
          }], [{
            key: "pad",
            value: function pad(howMuch) {
              return tools.repeatString(" ", howMuch);
            }
          }]);
          return DefaultLinePrependor3;
        }(require_LinePrependor());
        ;
        self2 = DefaultLinePrependor2;
        return DefaultLinePrependor2;
      }.call(void 0);
    }
  });

  // node_modules/.pnpm/renderkid@3.0.0/node_modules/renderkid/lib/layout/block/lineAppendor/_LineAppendor.js
  var require_LineAppendor = __commonJS({
    "node_modules/.pnpm/renderkid@3.0.0/node_modules/renderkid/lib/layout/block/lineAppendor/_LineAppendor.js"(exports, module) {
      "use strict";
      function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
          throw new TypeError("Cannot call a class as a function");
        }
      }
      function _defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
          var descriptor = props[i];
          descriptor.enumerable = descriptor.enumerable || false;
          descriptor.configurable = true;
          if ("value" in descriptor)
            descriptor.writable = true;
          Object.defineProperty(target, descriptor.key, descriptor);
        }
      }
      function _createClass(Constructor, protoProps, staticProps) {
        if (protoProps)
          _defineProperties(Constructor.prototype, protoProps);
        if (staticProps)
          _defineProperties(Constructor, staticProps);
        return Constructor;
      }
      var _LineAppendor;
      module.exports = _LineAppendor = /* @__PURE__ */ function() {
        function _LineAppendor2(_config) {
          _classCallCheck(this, _LineAppendor2);
          this._config = _config;
          this._lineNo = 0;
        }
        _createClass(_LineAppendor2, [{
          key: "render",
          value: function render(inherited, options) {
            this._lineNo++;
            return "<none>" + this._render(inherited, options) + "</none>";
          }
        }]);
        return _LineAppendor2;
      }();
    }
  });

  // node_modules/.pnpm/renderkid@3.0.0/node_modules/renderkid/lib/layout/block/lineAppendor/Default.js
  var require_Default4 = __commonJS({
    "node_modules/.pnpm/renderkid@3.0.0/node_modules/renderkid/lib/layout/block/lineAppendor/Default.js"(exports, module) {
      "use strict";
      function _typeof(obj) {
        "@babel/helpers - typeof";
        if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
          _typeof = function _typeof2(obj2) {
            return typeof obj2;
          };
        } else {
          _typeof = function _typeof2(obj2) {
            return obj2 && typeof Symbol === "function" && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
          };
        }
        return _typeof(obj);
      }
      function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
          throw new TypeError("Cannot call a class as a function");
        }
      }
      function _defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
          var descriptor = props[i];
          descriptor.enumerable = descriptor.enumerable || false;
          descriptor.configurable = true;
          if ("value" in descriptor)
            descriptor.writable = true;
          Object.defineProperty(target, descriptor.key, descriptor);
        }
      }
      function _createClass(Constructor, protoProps, staticProps) {
        if (protoProps)
          _defineProperties(Constructor.prototype, protoProps);
        if (staticProps)
          _defineProperties(Constructor, staticProps);
        return Constructor;
      }
      function _inherits(subClass, superClass) {
        if (typeof superClass !== "function" && superClass !== null) {
          throw new TypeError("Super expression must either be null or a function");
        }
        subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } });
        if (superClass)
          _setPrototypeOf(subClass, superClass);
      }
      function _setPrototypeOf(o, p) {
        _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf2(o2, p2) {
          o2.__proto__ = p2;
          return o2;
        };
        return _setPrototypeOf(o, p);
      }
      function _createSuper(Derived) {
        var hasNativeReflectConstruct = _isNativeReflectConstruct();
        return function _createSuperInternal() {
          var Super = _getPrototypeOf(Derived), result;
          if (hasNativeReflectConstruct) {
            var NewTarget = _getPrototypeOf(this).constructor;
            result = Reflect.construct(Super, arguments, NewTarget);
          } else {
            result = Super.apply(this, arguments);
          }
          return _possibleConstructorReturn(this, result);
        };
      }
      function _possibleConstructorReturn(self2, call) {
        if (call && (_typeof(call) === "object" || typeof call === "function")) {
          return call;
        }
        return _assertThisInitialized(self2);
      }
      function _assertThisInitialized(self2) {
        if (self2 === void 0) {
          throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        }
        return self2;
      }
      function _isNativeReflectConstruct() {
        if (typeof Reflect === "undefined" || !Reflect.construct)
          return false;
        if (Reflect.construct.sham)
          return false;
        if (typeof Proxy === "function")
          return true;
        try {
          Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
          }));
          return true;
        } catch (e) {
          return false;
        }
      }
      function _getPrototypeOf(o) {
        _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf2(o2) {
          return o2.__proto__ || Object.getPrototypeOf(o2);
        };
        return _getPrototypeOf(o);
      }
      var DefaultLineAppendor;
      var tools;
      tools = require_tools();
      module.exports = DefaultLineAppendor = /* @__PURE__ */ function(_require) {
        _inherits(DefaultLineAppendor2, _require);
        var _super = _createSuper(DefaultLineAppendor2);
        function DefaultLineAppendor2() {
          _classCallCheck(this, DefaultLineAppendor2);
          return _super.apply(this, arguments);
        }
        _createClass(DefaultLineAppendor2, [{
          key: "_render",
          value: function _render(inherited, options) {
            return inherited + tools.repeatString(" ", this._config.amount);
          }
        }]);
        return DefaultLineAppendor2;
      }(require_LineAppendor());
    }
  });

  // node_modules/.pnpm/renderkid@3.0.0/node_modules/renderkid/lib/layout/block/lineWrapper/_LineWrapper.js
  var require_LineWrapper = __commonJS({
    "node_modules/.pnpm/renderkid@3.0.0/node_modules/renderkid/lib/layout/block/lineWrapper/_LineWrapper.js"(exports, module) {
      "use strict";
      function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
          throw new TypeError("Cannot call a class as a function");
        }
      }
      function _defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
          var descriptor = props[i];
          descriptor.enumerable = descriptor.enumerable || false;
          descriptor.configurable = true;
          if ("value" in descriptor)
            descriptor.writable = true;
          Object.defineProperty(target, descriptor.key, descriptor);
        }
      }
      function _createClass(Constructor, protoProps, staticProps) {
        if (protoProps)
          _defineProperties(Constructor.prototype, protoProps);
        if (staticProps)
          _defineProperties(Constructor, staticProps);
        return Constructor;
      }
      var _LineWrapper;
      module.exports = _LineWrapper = /* @__PURE__ */ function() {
        function _LineWrapper2() {
          _classCallCheck(this, _LineWrapper2);
        }
        _createClass(_LineWrapper2, [{
          key: "render",
          value: function render(str, options) {
            return this._render(str, options);
          }
        }]);
        return _LineWrapper2;
      }();
    }
  });

  // node_modules/.pnpm/renderkid@3.0.0/node_modules/renderkid/lib/layout/block/lineWrapper/Default.js
  var require_Default5 = __commonJS({
    "node_modules/.pnpm/renderkid@3.0.0/node_modules/renderkid/lib/layout/block/lineWrapper/Default.js"(exports, module) {
      "use strict";
      function _typeof(obj) {
        "@babel/helpers - typeof";
        if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
          _typeof = function _typeof2(obj2) {
            return typeof obj2;
          };
        } else {
          _typeof = function _typeof2(obj2) {
            return obj2 && typeof Symbol === "function" && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
          };
        }
        return _typeof(obj);
      }
      function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
          throw new TypeError("Cannot call a class as a function");
        }
      }
      function _defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
          var descriptor = props[i];
          descriptor.enumerable = descriptor.enumerable || false;
          descriptor.configurable = true;
          if ("value" in descriptor)
            descriptor.writable = true;
          Object.defineProperty(target, descriptor.key, descriptor);
        }
      }
      function _createClass(Constructor, protoProps, staticProps) {
        if (protoProps)
          _defineProperties(Constructor.prototype, protoProps);
        if (staticProps)
          _defineProperties(Constructor, staticProps);
        return Constructor;
      }
      function _inherits(subClass, superClass) {
        if (typeof superClass !== "function" && superClass !== null) {
          throw new TypeError("Super expression must either be null or a function");
        }
        subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } });
        if (superClass)
          _setPrototypeOf(subClass, superClass);
      }
      function _setPrototypeOf(o, p) {
        _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf2(o2, p2) {
          o2.__proto__ = p2;
          return o2;
        };
        return _setPrototypeOf(o, p);
      }
      function _createSuper(Derived) {
        var hasNativeReflectConstruct = _isNativeReflectConstruct();
        return function _createSuperInternal() {
          var Super = _getPrototypeOf(Derived), result;
          if (hasNativeReflectConstruct) {
            var NewTarget = _getPrototypeOf(this).constructor;
            result = Reflect.construct(Super, arguments, NewTarget);
          } else {
            result = Super.apply(this, arguments);
          }
          return _possibleConstructorReturn(this, result);
        };
      }
      function _possibleConstructorReturn(self2, call) {
        if (call && (_typeof(call) === "object" || typeof call === "function")) {
          return call;
        }
        return _assertThisInitialized(self2);
      }
      function _assertThisInitialized(self2) {
        if (self2 === void 0) {
          throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        }
        return self2;
      }
      function _isNativeReflectConstruct() {
        if (typeof Reflect === "undefined" || !Reflect.construct)
          return false;
        if (Reflect.construct.sham)
          return false;
        if (typeof Proxy === "function")
          return true;
        try {
          Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
          }));
          return true;
        } catch (e) {
          return false;
        }
      }
      function _getPrototypeOf(o) {
        _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf2(o2) {
          return o2.__proto__ || Object.getPrototypeOf(o2);
        };
        return _getPrototypeOf(o);
      }
      var DefaultLineWrapper;
      module.exports = DefaultLineWrapper = /* @__PURE__ */ function(_require) {
        _inherits(DefaultLineWrapper2, _require);
        var _super = _createSuper(DefaultLineWrapper2);
        function DefaultLineWrapper2() {
          _classCallCheck(this, DefaultLineWrapper2);
          return _super.apply(this, arguments);
        }
        _createClass(DefaultLineWrapper2, [{
          key: "_render",
          value: function _render() {
          }
        }]);
        return DefaultLineWrapper2;
      }(require_LineWrapper());
    }
  });

  // node_modules/.pnpm/renderkid@3.0.0/node_modules/renderkid/lib/layout/Block.js
  var require_Block = __commonJS({
    "node_modules/.pnpm/renderkid@3.0.0/node_modules/renderkid/lib/layout/Block.js"(exports, module) {
      "use strict";
      function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
          throw new TypeError("Cannot call a class as a function");
        }
      }
      function _defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
          var descriptor = props[i];
          descriptor.enumerable = descriptor.enumerable || false;
          descriptor.configurable = true;
          if ("value" in descriptor)
            descriptor.writable = true;
          Object.defineProperty(target, descriptor.key, descriptor);
        }
      }
      function _createClass(Constructor, protoProps, staticProps) {
        if (protoProps)
          _defineProperties(Constructor.prototype, protoProps);
        if (staticProps)
          _defineProperties(Constructor, staticProps);
        return Constructor;
      }
      var Block;
      var SpecialString;
      var cloneAndMergeDeep;
      var terminalWidth;
      SpecialString = require_SpecialString();
      terminalWidth = require_tools().getCols();
      var _require = require_tools();
      cloneAndMergeDeep = _require.cloneAndMergeDeep;
      module.exports = Block = function() {
        var self2;
        var Block2 = /* @__PURE__ */ function() {
          function Block3(_layout, _parent) {
            var config2 = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
            var _name = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : "";
            _classCallCheck(this, Block3);
            this._layout = _layout;
            this._parent = _parent;
            this._name = _name;
            this._config = cloneAndMergeDeep(self2.defaultConfig, config2);
            this._closed = false;
            this._wasOpenOnce = false;
            this._active = false;
            this._buffer = "";
            this._didSeparateBlock = false;
            this._linePrependor = new this._config.linePrependor.fn(this._config.linePrependor.options);
            this._lineAppendor = new this._config.lineAppendor.fn(this._config.lineAppendor.options);
            this._blockPrependor = new this._config.blockPrependor.fn(this._config.blockPrependor.options);
            this._blockAppendor = new this._config.blockAppendor.fn(this._config.blockAppendor.options);
          }
          _createClass(Block3, [{
            key: "_activate",
            value: function _activate() {
              var deactivateParent = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : true;
              if (this._active) {
                throw Error("This block is already active. This is probably a bug in RenderKid itself");
              }
              if (this._closed) {
                throw Error("This block is closed and cannot be activated. This is probably a bug in RenderKid itself");
              }
              this._active = true;
              this._layout._activeBlock = this;
              if (deactivateParent) {
                if (this._parent != null) {
                  this._parent._deactivate(false);
                }
              }
              return this;
            }
          }, {
            key: "_deactivate",
            value: function _deactivate() {
              var activateParent = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : true;
              this._ensureActive();
              this._flushBuffer();
              if (activateParent) {
                if (this._parent != null) {
                  this._parent._activate(false);
                }
              }
              this._active = false;
              return this;
            }
          }, {
            key: "_ensureActive",
            value: function _ensureActive() {
              if (!this._wasOpenOnce) {
                throw Error("This block has never been open before. This is probably a bug in RenderKid itself.");
              }
              if (!this._active) {
                throw Error("This block is not active. This is probably a bug in RenderKid itself.");
              }
              if (this._closed) {
                throw Error("This block is already closed. This is probably a bug in RenderKid itself.");
              }
            }
          }, {
            key: "_open",
            value: function _open() {
              if (this._wasOpenOnce) {
                throw Error("Block._open() has been called twice. This is probably a RenderKid bug.");
              }
              this._wasOpenOnce = true;
              if (this._parent != null) {
                this._parent.write(this._whatToPrependToBlock());
              }
              this._activate();
              return this;
            }
          }, {
            key: "close",
            value: function close() {
              this._deactivate();
              this._closed = true;
              if (this._parent != null) {
                this._parent.write(this._whatToAppendToBlock());
              }
              return this;
            }
          }, {
            key: "isOpen",
            value: function isOpen() {
              return this._wasOpenOnce && !this._closed;
            }
          }, {
            key: "write",
            value: function write(str) {
              this._ensureActive();
              if (str === "") {
                return;
              }
              str = String(str);
              this._buffer += str;
              return this;
            }
          }, {
            key: "openBlock",
            value: function openBlock(config2, name) {
              var block;
              this._ensureActive();
              block = new Block3(this._layout, this, config2, name);
              block._open();
              return block;
            }
          }, {
            key: "_flushBuffer",
            value: function _flushBuffer() {
              var str;
              if (this._buffer === "") {
                return;
              }
              str = this._buffer;
              this._buffer = "";
              this._writeInline(str);
            }
          }, {
            key: "_toPrependToLine",
            value: function _toPrependToLine() {
              var fromParent;
              fromParent = "";
              if (this._parent != null) {
                fromParent = this._parent._toPrependToLine();
              }
              return this._linePrependor.render(fromParent);
            }
          }, {
            key: "_toAppendToLine",
            value: function _toAppendToLine() {
              var fromParent;
              fromParent = "";
              if (this._parent != null) {
                fromParent = this._parent._toAppendToLine();
              }
              return this._lineAppendor.render(fromParent);
            }
          }, {
            key: "_whatToPrependToBlock",
            value: function _whatToPrependToBlock() {
              return this._blockPrependor.render();
            }
          }, {
            key: "_whatToAppendToBlock",
            value: function _whatToAppendToBlock() {
              return this._blockAppendor.render();
            }
          }, {
            key: "_writeInline",
            value: function _writeInline(str) {
              var i, j, k, l, lineBreaksToAppend, m, ref, ref1, ref2, remaining;
              if (new SpecialString(str).isOnlySpecialChars()) {
                this._layout._append(str);
                return;
              }
              remaining = str;
              lineBreaksToAppend = 0;
              if (m = remaining.match(/^\n+/)) {
                for (i = j = 1, ref = m[0].length; 1 <= ref ? j <= ref : j >= ref; i = 1 <= ref ? ++j : --j) {
                  this._writeLine("");
                }
                remaining = remaining.substr(m[0].length, remaining.length);
              }
              if (m = remaining.match(/\n+$/)) {
                lineBreaksToAppend = m[0].length;
                remaining = remaining.substr(0, remaining.length - m[0].length);
              }
              while (remaining.length > 0) {
                if (m = remaining.match(/^[^\n]+/)) {
                  this._writeLine(m[0]);
                  remaining = remaining.substr(m[0].length, remaining.length);
                } else if (m = remaining.match(/^\n+/)) {
                  for (i = k = 1, ref1 = m[0].length; 1 <= ref1 ? k < ref1 : k > ref1; i = 1 <= ref1 ? ++k : --k) {
                    this._writeLine("");
                  }
                  remaining = remaining.substr(m[0].length, remaining.length);
                }
              }
              if (lineBreaksToAppend > 0) {
                for (i = l = 1, ref2 = lineBreaksToAppend; 1 <= ref2 ? l <= ref2 : l >= ref2; i = 1 <= ref2 ? ++l : --l) {
                  this._writeLine("");
                }
              }
            }
            // wraps a line into multiple lines if necessary, adds horizontal margins,
            // etc, and appends it to the layout.
          }, {
            key: "_writeLine",
            value: function _writeLine(str) {
              var line, lineContent, lineContentLength, remaining, roomLeft, toAppend, toAppendLength, toPrepend, toPrependLength;
              remaining = new SpecialString(str);
              while (true) {
                toPrepend = this._toPrependToLine();
                toPrependLength = new SpecialString(toPrepend).length;
                toAppend = this._toAppendToLine();
                toAppendLength = new SpecialString(toAppend).length;
                roomLeft = this._layout._config.terminalWidth - (toPrependLength + toAppendLength);
                lineContentLength = Math.min(this._config.width, roomLeft);
                lineContent = remaining.cut(0, lineContentLength, true);
                line = toPrepend + lineContent.str + toAppend;
                this._layout._appendLine(line);
                if (remaining.isEmpty()) {
                  break;
                }
              }
            }
          }]);
          return Block3;
        }();
        ;
        self2 = Block2;
        Block2.defaultConfig = {
          blockPrependor: {
            fn: require_Default(),
            options: {
              amount: 0
            }
          },
          blockAppendor: {
            fn: require_Default2(),
            options: {
              amount: 0
            }
          },
          linePrependor: {
            fn: require_Default3(),
            options: {
              amount: 0
            }
          },
          lineAppendor: {
            fn: require_Default4(),
            options: {
              amount: 0
            }
          },
          lineWrapper: {
            fn: require_Default5(),
            options: {
              lineWidth: null
            }
          },
          width: terminalWidth,
          prefixRaw: "",
          suffixRaw: ""
        };
        return Block2;
      }.call(void 0);
    }
  });

  // node_modules/.pnpm/renderkid@3.0.0/node_modules/renderkid/lib/Layout.js
  var require_Layout = __commonJS({
    "node_modules/.pnpm/renderkid@3.0.0/node_modules/renderkid/lib/Layout.js"(exports, module) {
      "use strict";
      function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
          throw new TypeError("Cannot call a class as a function");
        }
      }
      function _defineProperties(target, props) {
        for (var i2 = 0; i2 < props.length; i2++) {
          var descriptor = props[i2];
          descriptor.enumerable = descriptor.enumerable || false;
          descriptor.configurable = true;
          if ("value" in descriptor)
            descriptor.writable = true;
          Object.defineProperty(target, descriptor.key, descriptor);
        }
      }
      function _createClass(Constructor, protoProps, staticProps) {
        if (protoProps)
          _defineProperties(Constructor.prototype, protoProps);
        if (staticProps)
          _defineProperties(Constructor, staticProps);
        return Constructor;
      }
      var Block;
      var Layout;
      var SpecialString;
      var cloneAndMergeDeep;
      var i;
      var len;
      var prop;
      var ref;
      var terminalWidth;
      Block = require_Block();
      var _require = require_tools();
      cloneAndMergeDeep = _require.cloneAndMergeDeep;
      SpecialString = require_SpecialString();
      terminalWidth = require_tools().getCols();
      module.exports = Layout = function() {
        var self2;
        var Layout2 = /* @__PURE__ */ function() {
          function Layout3() {
            var config2 = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
            var rootBlockConfig = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
            _classCallCheck(this, Layout3);
            var rootConfig;
            this._written = [];
            this._activeBlock = null;
            this._config = cloneAndMergeDeep(self2._defaultConfig, config2);
            rootConfig = cloneAndMergeDeep(self2._rootBlockDefaultConfig, rootBlockConfig);
            this._root = new Block(this, null, rootConfig, "__root");
            this._root._open();
          }
          _createClass(Layout3, [{
            key: "getRootBlock",
            value: function getRootBlock() {
              return this._root;
            }
          }, {
            key: "_append",
            value: function _append(text) {
              return this._written.push(text);
            }
          }, {
            key: "_appendLine",
            value: function _appendLine(text) {
              var s;
              this._append(text);
              s = new SpecialString(text);
              if (s.length < this._config.terminalWidth) {
                this._append("<none>\n</none>");
              }
              return this;
            }
          }, {
            key: "get",
            value: function get4() {
              this._ensureClosed();
              if (this._written[this._written.length - 1] === "<none>\n</none>") {
                this._written.pop();
              }
              return this._written.join("");
            }
          }, {
            key: "_ensureClosed",
            value: function _ensureClosed() {
              if (this._activeBlock !== this._root) {
                throw Error("Not all the blocks have been closed. Please call block.close() on all open blocks.");
              }
              if (this._root.isOpen()) {
                this._root.close();
              }
            }
          }]);
          return Layout3;
        }();
        ;
        self2 = Layout2;
        Layout2._rootBlockDefaultConfig = {
          linePrependor: {
            options: {
              amount: 0
            }
          },
          lineAppendor: {
            options: {
              amount: 0
            }
          },
          blockPrependor: {
            options: {
              amount: 0
            }
          },
          blockAppendor: {
            options: {
              amount: 0
            }
          }
        };
        Layout2._defaultConfig = {
          terminalWidth
        };
        return Layout2;
      }.call(void 0);
      ref = ["openBlock", "write"];
      for (i = 0, len = ref.length; i < len; i++) {
        prop = ref[i];
        (function() {
          var method;
          method = prop;
          return Layout.prototype[method] = function() {
            return this._root[method].apply(this._root, arguments);
          };
        })();
      }
    }
  });

  // node_modules/.pnpm/ansi-regex@5.0.1/node_modules/ansi-regex/index.js
  var require_ansi_regex = __commonJS({
    "node_modules/.pnpm/ansi-regex@5.0.1/node_modules/ansi-regex/index.js"(exports, module) {
      "use strict";
      module.exports = ({ onlyFirst = false } = {}) => {
        const pattern = [
          "[\\u001B\\u009B][[\\]()#;?]*(?:(?:(?:(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]+)*|[a-zA-Z\\d]+(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]*)*)?\\u0007)",
          "(?:(?:\\d{1,4}(?:;\\d{0,4})*)?[\\dA-PR-TZcf-ntqry=><~]))"
        ].join("|");
        return new RegExp(pattern, onlyFirst ? void 0 : "g");
      };
    }
  });

  // node_modules/.pnpm/strip-ansi@6.0.1/node_modules/strip-ansi/index.js
  var require_strip_ansi = __commonJS({
    "node_modules/.pnpm/strip-ansi@6.0.1/node_modules/strip-ansi/index.js"(exports, module) {
      "use strict";
      var ansiRegex = require_ansi_regex();
      module.exports = (string) => typeof string === "string" ? string.replace(ansiRegex(), "") : string;
    }
  });

  // node_modules/.pnpm/renderkid@3.0.0/node_modules/renderkid/lib/RenderKid.js
  var require_RenderKid = __commonJS({
    "node_modules/.pnpm/renderkid@3.0.0/node_modules/renderkid/lib/RenderKid.js"(exports, module) {
      "use strict";
      function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
          throw new TypeError("Cannot call a class as a function");
        }
      }
      function _defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
          var descriptor = props[i];
          descriptor.enumerable = descriptor.enumerable || false;
          descriptor.configurable = true;
          if ("value" in descriptor)
            descriptor.writable = true;
          Object.defineProperty(target, descriptor.key, descriptor);
        }
      }
      function _createClass(Constructor, protoProps, staticProps) {
        if (protoProps)
          _defineProperties(Constructor.prototype, protoProps);
        if (staticProps)
          _defineProperties(Constructor, staticProps);
        return Constructor;
      }
      var AnsiPainter;
      var Layout;
      var RenderKid;
      var Styles;
      var blockStyleApplier;
      var cloneAndMergeDeep;
      var inlineStyleApplier;
      var isPlainObject;
      var stripAnsi;
      var terminalWidth;
      var tools;
      inlineStyleApplier = require_inline();
      blockStyleApplier = require_block();
      isPlainObject = require_isPlainObject();
      var _require = require_tools();
      cloneAndMergeDeep = _require.cloneAndMergeDeep;
      AnsiPainter = require_AnsiPainter();
      Styles = require_Styles();
      Layout = require_Layout();
      tools = require_tools();
      stripAnsi = require_strip_ansi();
      terminalWidth = require_tools().getCols();
      module.exports = RenderKid = function() {
        var self2;
        var RenderKid2 = /* @__PURE__ */ function() {
          function RenderKid3() {
            var config2 = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
            _classCallCheck(this, RenderKid3);
            this.tools = self2.tools;
            this._config = cloneAndMergeDeep(self2._defaultConfig, config2);
            this._initStyles();
          }
          _createClass(RenderKid3, [{
            key: "_initStyles",
            value: function _initStyles() {
              return this._styles = new Styles();
            }
          }, {
            key: "style",
            value: function style() {
              return this._styles.setRule.apply(this._styles, arguments);
            }
          }, {
            key: "_getStyleFor",
            value: function _getStyleFor(el) {
              return this._styles.getStyleFor(el);
            }
          }, {
            key: "render",
            value: function render(input) {
              var withColors = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : true;
              return this._paint(this._renderDom(this._toDom(input)), withColors);
            }
          }, {
            key: "_toDom",
            value: function _toDom(input) {
              if (typeof input === "string") {
                return this._parse(input);
              } else if (isPlainObject(input) || Array.isArray(input)) {
                return this._objToDom(input);
              } else {
                throw Error("Invalid input type. Only strings, arrays and objects are accepted");
              }
            }
          }, {
            key: "_objToDom",
            value: function _objToDom(o) {
              var injectFakeRoot = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : true;
              if (injectFakeRoot) {
                o = {
                  body: o
                };
              }
              return tools.objectToDom(o);
            }
          }, {
            key: "_paint",
            value: function _paint(text, withColors) {
              var painted;
              painted = AnsiPainter.paint(text);
              if (withColors) {
                return painted;
              } else {
                return stripAnsi(painted);
              }
            }
          }, {
            key: "_parse",
            value: function _parse(string) {
              var injectFakeRoot = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : true;
              if (injectFakeRoot) {
                string = "<body>" + string + "</body>";
              }
              return tools.stringToDom(string);
            }
          }, {
            key: "_renderDom",
            value: function _renderDom(dom) {
              var bodyTag, layout, rootBlock;
              bodyTag = dom[0];
              layout = new Layout(this._config.layout);
              rootBlock = layout.getRootBlock();
              this._renderBlockNode(bodyTag, null, rootBlock);
              return layout.get();
            }
          }, {
            key: "_renderChildrenOf",
            value: function _renderChildrenOf(parentNode, parentBlock) {
              var i, len, node, nodes;
              nodes = parentNode.children;
              for (i = 0, len = nodes.length; i < len; i++) {
                node = nodes[i];
                this._renderNode(node, parentNode, parentBlock);
              }
            }
          }, {
            key: "_renderNode",
            value: function _renderNode(node, parentNode, parentBlock) {
              if (node.type === "text") {
                this._renderText(node, parentNode, parentBlock);
              } else if (node.name === "br") {
                this._renderBr(node, parentNode, parentBlock);
              } else if (this._isBlock(node)) {
                this._renderBlockNode(node, parentNode, parentBlock);
              } else if (this._isNone(node)) {
                return;
              } else {
                this._renderInlineNode(node, parentNode, parentBlock);
              }
            }
          }, {
            key: "_renderText",
            value: function _renderText(node, parentNode, parentBlock) {
              var ref, text;
              text = node.data;
              text = text.replace(/\s+/g, " ");
              if ((parentNode != null ? (ref = parentNode.styles) != null ? ref.display : void 0 : void 0) !== "inline") {
                text = text.trim();
              }
              if (text.length === 0) {
                return;
              }
              text = text.replace(/&nl;/g, "\n");
              return parentBlock.write(text);
            }
          }, {
            key: "_renderBlockNode",
            value: function _renderBlockNode(node, parentNode, parentBlock) {
              var after, before, block, blockConfig;
              var _blockStyleApplier$ap = blockStyleApplier.applyTo(node, this._getStyleFor(node));
              before = _blockStyleApplier$ap.before;
              after = _blockStyleApplier$ap.after;
              blockConfig = _blockStyleApplier$ap.blockConfig;
              block = parentBlock.openBlock(blockConfig);
              if (before !== "") {
                block.write(before);
              }
              this._renderChildrenOf(node, block);
              if (after !== "") {
                block.write(after);
              }
              return block.close();
            }
          }, {
            key: "_renderInlineNode",
            value: function _renderInlineNode(node, parentNode, parentBlock) {
              var after, before;
              var _inlineStyleApplier$a = inlineStyleApplier.applyTo(node, this._getStyleFor(node));
              before = _inlineStyleApplier$a.before;
              after = _inlineStyleApplier$a.after;
              if (before !== "") {
                parentBlock.write(before);
              }
              this._renderChildrenOf(node, parentBlock);
              if (after !== "") {
                return parentBlock.write(after);
              }
            }
          }, {
            key: "_renderBr",
            value: function _renderBr(node, parentNode, parentBlock) {
              return parentBlock.write("\n");
            }
          }, {
            key: "_isBlock",
            value: function _isBlock(node) {
              return !(node.type === "text" || node.name === "br" || this._getStyleFor(node).display !== "block");
            }
          }, {
            key: "_isNone",
            value: function _isNone(node) {
              return !(node.type === "text" || node.name === "br" || this._getStyleFor(node).display !== "none");
            }
          }]);
          return RenderKid3;
        }();
        ;
        self2 = RenderKid2;
        RenderKid2.AnsiPainter = AnsiPainter;
        RenderKid2.Layout = Layout;
        RenderKid2.quote = tools.quote;
        RenderKid2.tools = tools;
        RenderKid2._defaultConfig = {
          layout: {
            terminalWidth
          }
        };
        return RenderKid2;
      }.call(void 0);
    }
  });

  // node_modules/.pnpm/pretty-error@4.0.0/node_modules/pretty-error/lib/PrettyError.js
  var require_PrettyError = __commonJS({
    "node_modules/.pnpm/pretty-error@4.0.0/node_modules/pretty-error/lib/PrettyError.js"(exports, module) {
      var ParsedError;
      var PrettyError2;
      var RenderKid;
      var arrayUtils;
      var defaultStyle;
      var instance;
      var isPlainObject;
      var merge;
      var nodePaths;
      var prop;
      var _fn;
      var _i;
      var _len;
      var _ref;
      var __slice = [].slice;
      var __indexOf = [].indexOf || function(item) {
        for (var i = 0, l = this.length; i < l; i++) {
          if (i in this && this[i] === item)
            return i;
        }
        return -1;
      };
      isPlainObject = require_isPlainObject();
      defaultStyle = require_defaultStyle();
      ParsedError = require_ParsedError();
      nodePaths = require_nodePaths();
      RenderKid = require_RenderKid();
      merge = require_merge();
      arrayUtils = {
        pluckByCallback: function(a, cb) {
          var index, removed, value, _i2, _len2;
          if (a.length < 1) {
            return a;
          }
          removed = 0;
          for (index = _i2 = 0, _len2 = a.length; _i2 < _len2; index = ++_i2) {
            value = a[index];
            if (cb(value, index)) {
              removed++;
              continue;
            }
            if (removed !== 0) {
              a[index - removed] = a[index];
            }
          }
          if (removed > 0) {
            a.length = a.length - removed;
          }
          return a;
        },
        pluckOneItem: function(a, item) {
          var index, reached, value, _i2, _len2;
          if (a.length < 1) {
            return a;
          }
          reached = false;
          for (index = _i2 = 0, _len2 = a.length; _i2 < _len2; index = ++_i2) {
            value = a[index];
            if (!reached) {
              if (value === item) {
                reached = true;
                continue;
              }
            } else {
              a[index - 1] = a[index];
            }
          }
          if (reached) {
            a.length = a.length - 1;
          }
          return a;
        }
      };
      instance = null;
      module.exports = PrettyError2 = function() {
        var self2;
        self2 = PrettyError3;
        PrettyError3._filters = {
          "module.exports": function(item) {
            if (item.what == null) {
              return;
            }
            item.what = item.what.replace(/\.module\.exports\./g, " - ");
          }
        };
        PrettyError3._getDefaultStyle = function() {
          return defaultStyle();
        };
        PrettyError3.start = function() {
          if (instance == null) {
            instance = new self2();
            instance.start();
          }
          return instance;
        };
        PrettyError3.stop = function() {
          return instance != null ? instance.stop() : void 0;
        };
        function PrettyError3() {
          this._useColors = true;
          this._maxItems = 50;
          this._packagesToSkip = [];
          this._pathsToSkip = [];
          this._skipCallbacks = [];
          this._filterCallbacks = [];
          this._parsedErrorFilters = [];
          this._aliases = [];
          this._renderer = new RenderKid();
          this._style = self2._getDefaultStyle();
          this._renderer.style(this._style);
        }
        PrettyError3.prototype.start = function() {
          var prepeare;
          this._oldPrepareStackTrace = Error.prepareStackTrace;
          prepeare = this._oldPrepareStackTrace || function(exc, frames) {
            var result;
            result = exc.toString();
            frames = frames.map(function(frame) {
              return "  at " + frame.toString();
            });
            return result + "\n" + frames.join("\n");
          };
          Error.prepareStackTrace = function(_this) {
            return function(exc, trace) {
              var stack;
              stack = prepeare.apply(null, arguments);
              return _this.render({
                stack,
                message: exc.toString().replace(/^.*: /, "")
              }, false);
            };
          }(this);
          return this;
        };
        PrettyError3.prototype.stop = function() {
          Error.prepareStackTrace = this._oldPrepareStackTrace;
          return this._oldPrepareStackTrace = null;
        };
        PrettyError3.prototype.config = function(c) {
          var alias, path2, _ref2;
          if (c.skipPackages != null) {
            if (c.skipPackages === false) {
              this.unskipAllPackages();
            } else {
              this.skipPackage.apply(this, c.skipPackages);
            }
          }
          if (c.skipPaths != null) {
            if (c.skipPaths === false) {
              this.unskipAllPaths();
            } else {
              this.skipPath.apply(this, c.skipPaths);
            }
          }
          if (c.skip != null) {
            if (c.skip === false) {
              this.unskipAll();
            } else {
              this.skip.apply(this, c.skip);
            }
          }
          if (c.maxItems != null) {
            this.setMaxItems(c.maxItems);
          }
          if (c.skipNodeFiles === true) {
            this.skipNodeFiles();
          } else if (c.skipNodeFiles === false) {
            this.unskipNodeFiles();
          }
          if (c.filters != null) {
            if (c.filters === false) {
              this.removeAllFilters();
            } else {
              this.filter.apply(this, c.filters);
            }
          }
          if (c.parsedErrorFilters != null) {
            if (c.parsedErrorFilters === false) {
              this.removeAllParsedErrorFilters();
            } else {
              this.filterParsedError.apply(this, c.parsedErrorFilters);
            }
          }
          if (c.aliases != null) {
            if (isPlainObject(c.aliases)) {
              _ref2 = c.aliases;
              for (path2 in _ref2) {
                alias = _ref2[path2];
                this.alias(path2, alias);
              }
            } else if (c.aliases === false) {
              this.removeAllAliases();
            }
          }
          return this;
        };
        PrettyError3.prototype.withoutColors = function() {
          this._useColors = false;
          return this;
        };
        PrettyError3.prototype.withColors = function() {
          this._useColors = true;
          return this;
        };
        PrettyError3.prototype.skipPackage = function() {
          var packages, pkg2, _i2, _len2;
          packages = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
          for (_i2 = 0, _len2 = packages.length; _i2 < _len2; _i2++) {
            pkg2 = packages[_i2];
            this._packagesToSkip.push(String(pkg2));
          }
          return this;
        };
        PrettyError3.prototype.unskipPackage = function() {
          var packages, pkg2, _i2, _len2;
          packages = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
          for (_i2 = 0, _len2 = packages.length; _i2 < _len2; _i2++) {
            pkg2 = packages[_i2];
            arrayUtils.pluckOneItem(this._packagesToSkip, pkg2);
          }
          return this;
        };
        PrettyError3.prototype.unskipAllPackages = function() {
          this._packagesToSkip.length = 0;
          return this;
        };
        PrettyError3.prototype.skipPath = function() {
          var path2, paths, _i2, _len2;
          paths = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
          for (_i2 = 0, _len2 = paths.length; _i2 < _len2; _i2++) {
            path2 = paths[_i2];
            this._pathsToSkip.push(path2);
          }
          return this;
        };
        PrettyError3.prototype.unskipPath = function() {
          var path2, paths, _i2, _len2;
          paths = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
          for (_i2 = 0, _len2 = paths.length; _i2 < _len2; _i2++) {
            path2 = paths[_i2];
            arrayUtils.pluckOneItem(this._pathsToSkip, path2);
          }
          return this;
        };
        PrettyError3.prototype.unskipAllPaths = function() {
          this._pathsToSkip.length = 0;
          return this;
        };
        PrettyError3.prototype.skip = function() {
          var callbacks, cb, _i2, _len2;
          callbacks = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
          for (_i2 = 0, _len2 = callbacks.length; _i2 < _len2; _i2++) {
            cb = callbacks[_i2];
            this._skipCallbacks.push(cb);
          }
          return this;
        };
        PrettyError3.prototype.unskip = function() {
          var callbacks, cb, _i2, _len2;
          callbacks = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
          for (_i2 = 0, _len2 = callbacks.length; _i2 < _len2; _i2++) {
            cb = callbacks[_i2];
            arrayUtils.pluckOneItem(this._skipCallbacks, cb);
          }
          return this;
        };
        PrettyError3.prototype.unskipAll = function() {
          this._skipCallbacks.length = 0;
          return this;
        };
        PrettyError3.prototype.skipNodeFiles = function() {
          return this.skipPath.apply(this, nodePaths);
        };
        PrettyError3.prototype.unskipNodeFiles = function() {
          return this.unskipPath.apply(this, nodePaths);
        };
        PrettyError3.prototype.filter = function() {
          var callbacks, cb, _i2, _len2;
          callbacks = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
          for (_i2 = 0, _len2 = callbacks.length; _i2 < _len2; _i2++) {
            cb = callbacks[_i2];
            this._filterCallbacks.push(cb);
          }
          return this;
        };
        PrettyError3.prototype.removeFilter = function() {
          var callbacks, cb, _i2, _len2;
          callbacks = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
          for (_i2 = 0, _len2 = callbacks.length; _i2 < _len2; _i2++) {
            cb = callbacks[_i2];
            arrayUtils.pluckOneItem(this._filterCallbacks, cb);
          }
          return this;
        };
        PrettyError3.prototype.removeAllFilters = function() {
          this._filterCallbacks.length = 0;
          return this;
        };
        PrettyError3.prototype.filterParsedError = function() {
          var callbacks, cb, _i2, _len2;
          callbacks = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
          for (_i2 = 0, _len2 = callbacks.length; _i2 < _len2; _i2++) {
            cb = callbacks[_i2];
            this._parsedErrorFilters.push(cb);
          }
          return this;
        };
        PrettyError3.prototype.removeParsedErrorFilter = function() {
          var callbacks, cb, _i2, _len2;
          callbacks = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
          for (_i2 = 0, _len2 = callbacks.length; _i2 < _len2; _i2++) {
            cb = callbacks[_i2];
            arrayUtils.pluckOneItem(this._parsedErrorFilters, cb);
          }
          return this;
        };
        PrettyError3.prototype.removeAllParsedErrorFilters = function() {
          this._parsedErrorFilters.length = 0;
          return this;
        };
        PrettyError3.prototype.setMaxItems = function(maxItems) {
          if (maxItems == null) {
            maxItems = 50;
          }
          if (maxItems === 0) {
            maxItems = 50;
          }
          this._maxItems = maxItems | 0;
          return this;
        };
        PrettyError3.prototype.alias = function(stringOrRx, alias) {
          this._aliases.push({
            stringOrRx,
            alias
          });
          return this;
        };
        PrettyError3.prototype.removeAlias = function(stringOrRx) {
          arrayUtils.pluckByCallback(this._aliases, function(pair) {
            return pair.stringOrRx === stringOrRx;
          });
          return this;
        };
        PrettyError3.prototype.removeAllAliases = function() {
          this._aliases.length = 0;
          return this;
        };
        PrettyError3.prototype._getStyle = function() {
          return this._style;
        };
        PrettyError3.prototype.appendStyle = function(toAppend) {
          merge(this._style, toAppend);
          this._renderer.style(toAppend);
          return this;
        };
        PrettyError3.prototype._getRenderer = function() {
          return this._renderer;
        };
        PrettyError3.prototype.render = function(e, logIt, useColors) {
          var obj, rendered;
          if (logIt == null) {
            logIt = false;
          }
          if (useColors == null) {
            useColors = this._useColors;
          }
          obj = this.getObject(e);
          rendered = this._renderer.render(obj, useColors);
          if (logIt === true) {
            console.error(rendered);
          }
          return rendered;
        };
        PrettyError3.prototype.getObject = function(e) {
          var count, header, i, item, obj, traceItems, _i2, _len2, _ref2;
          if (!(e instanceof ParsedError)) {
            e = new ParsedError(e);
          }
          this._applyParsedErrorFiltersOn(e);
          header = {
            title: function() {
              var ret;
              ret = {};
              if (e.wrapper !== "") {
                ret.wrapper = "" + e.wrapper;
              }
              ret.kind = e.kind;
              return ret;
            }(),
            colon: ":",
            message: String(e.message).trim()
          };
          traceItems = [];
          count = -1;
          _ref2 = e.trace;
          for (i = _i2 = 0, _len2 = _ref2.length; _i2 < _len2; i = ++_i2) {
            item = _ref2[i];
            if (item == null) {
              continue;
            }
            if (this._skipOrFilter(item, i) === true) {
              continue;
            }
            count++;
            if (count > this._maxItems) {
              break;
            }
            if (typeof item === "string") {
              traceItems.push({
                item: {
                  custom: item
                }
              });
              continue;
            }
            traceItems.push(function() {
              var markupItem;
              markupItem = {
                item: {
                  header: {
                    pointer: function() {
                      if (item.file == null) {
                        return "";
                      }
                      return {
                        file: item.file,
                        colon: ":",
                        line: item.line
                      };
                    }()
                  },
                  footer: function() {
                    var foooter;
                    foooter = {
                      addr: item.shortenedAddr
                    };
                    if (item.extra != null) {
                      foooter.extra = item.extra;
                    }
                    return foooter;
                  }()
                }
              };
              if (typeof item.what === "string" && item.what.trim().length > 0) {
                markupItem.item.header.what = item.what;
              }
              return markupItem;
            }());
          }
          obj = {
            "pretty-error": {
              header
            }
          };
          if (traceItems.length > 0) {
            obj["pretty-error"].trace = traceItems;
          }
          return obj;
        };
        PrettyError3.prototype._skipOrFilter = function(item, itemNumber) {
          var cb, modName, pair, _i2, _j, _k, _l, _len2, _len1, _len22, _len3, _ref2, _ref1, _ref22, _ref3, _ref4, _ref5;
          if (typeof item === "object") {
            if (_ref2 = item.modName, __indexOf.call(this._packagesToSkip, _ref2) >= 0) {
              return true;
            }
            if (_ref1 = item.path, __indexOf.call(this._pathsToSkip, _ref1) >= 0) {
              return true;
            }
            _ref22 = item.packages;
            for (_i2 = 0, _len2 = _ref22.length; _i2 < _len2; _i2++) {
              modName = _ref22[_i2];
              if (__indexOf.call(this._packagesToSkip, modName) >= 0) {
                return true;
              }
            }
            if (typeof item.shortenedAddr === "string") {
              _ref3 = this._aliases;
              for (_j = 0, _len1 = _ref3.length; _j < _len1; _j++) {
                pair = _ref3[_j];
                item.shortenedAddr = item.shortenedAddr.replace(pair.stringOrRx, pair.alias);
              }
            }
          }
          _ref4 = this._skipCallbacks;
          for (_k = 0, _len22 = _ref4.length; _k < _len22; _k++) {
            cb = _ref4[_k];
            if (cb(item, itemNumber) === true) {
              return true;
            }
          }
          _ref5 = this._filterCallbacks;
          for (_l = 0, _len3 = _ref5.length; _l < _len3; _l++) {
            cb = _ref5[_l];
            cb(item, itemNumber);
          }
          return false;
        };
        PrettyError3.prototype._applyParsedErrorFiltersOn = function(error) {
          var cb, _i2, _len2, _ref2;
          _ref2 = this._parsedErrorFilters;
          for (_i2 = 0, _len2 = _ref2.length; _i2 < _len2; _i2++) {
            cb = _ref2[_i2];
            cb(error);
          }
        };
        return PrettyError3;
      }();
      _ref = ["renderer", "style"];
      _fn = function() {
        var methodName;
        methodName = "_get" + prop[0].toUpperCase() + prop.substr(1, prop.length);
        return PrettyError2.prototype.__defineGetter__(prop, function() {
          return this[methodName]();
        });
      };
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        prop = _ref[_i];
        _fn();
      }
    }
  });

  // node_modules/.pnpm/command-exists@1.2.9/node_modules/command-exists/lib/command-exists.js
  var require_command_exists = __commonJS({
    "node_modules/.pnpm/command-exists@1.2.9/node_modules/command-exists/lib/command-exists.js"(exports, module) {
      "use strict";
      var exec = __require("child_process").exec;
      var execSync = __require("child_process").execSync;
      var fs2 = __require("fs");
      var path2 = __require("path");
      var access = fs2.access;
      var accessSync = fs2.accessSync;
      var constants = fs2.constants || fs2;
      var isUsingWindows = process.platform == "win32";
      var fileNotExists = function(commandName, callback) {
        access(
          commandName,
          constants.F_OK,
          function(err) {
            callback(!err);
          }
        );
      };
      var fileNotExistsSync = function(commandName) {
        try {
          accessSync(commandName, constants.F_OK);
          return false;
        } catch (e) {
          return true;
        }
      };
      var localExecutable = function(commandName, callback) {
        access(
          commandName,
          constants.F_OK | constants.X_OK,
          function(err) {
            callback(null, !err);
          }
        );
      };
      var localExecutableSync = function(commandName) {
        try {
          accessSync(commandName, constants.F_OK | constants.X_OK);
          return true;
        } catch (e) {
          return false;
        }
      };
      var commandExistsUnix = function(commandName, cleanedCommandName, callback) {
        fileNotExists(commandName, function(isFile) {
          if (!isFile) {
            var child = exec(
              "command -v " + cleanedCommandName + " 2>/dev/null && { echo >&1 " + cleanedCommandName + "; exit 0; }",
              function(error, stdout, stderr) {
                callback(null, !!stdout);
              }
            );
            return;
          }
          localExecutable(commandName, callback);
        });
      };
      var commandExistsWindows = function(commandName, cleanedCommandName, callback) {
        if (!/^(?!(?:.*\s|.*\.|\W+)$)(?:[a-zA-Z]:)?(?:(?:[^<>:"\|\?\*\n])+(?:\/\/|\/|\\\\|\\)?)+$/m.test(commandName)) {
          callback(null, false);
          return;
        }
        var child = exec(
          "where " + cleanedCommandName,
          function(error) {
            if (error !== null) {
              callback(null, false);
            } else {
              callback(null, true);
            }
          }
        );
      };
      var commandExistsUnixSync = function(commandName, cleanedCommandName) {
        if (fileNotExistsSync(commandName)) {
          try {
            var stdout = execSync(
              "command -v " + cleanedCommandName + " 2>/dev/null && { echo >&1 " + cleanedCommandName + "; exit 0; }"
            );
            return !!stdout;
          } catch (error) {
            return false;
          }
        }
        return localExecutableSync(commandName);
      };
      var commandExistsWindowsSync = function(commandName, cleanedCommandName, callback) {
        if (!/^(?!(?:.*\s|.*\.|\W+)$)(?:[a-zA-Z]:)?(?:(?:[^<>:"\|\?\*\n])+(?:\/\/|\/|\\\\|\\)?)+$/m.test(commandName)) {
          return false;
        }
        try {
          var stdout = execSync("where " + cleanedCommandName, { stdio: [] });
          return !!stdout;
        } catch (error) {
          return false;
        }
      };
      var cleanInput = function(s) {
        if (/[^A-Za-z0-9_\/:=-]/.test(s)) {
          s = "'" + s.replace(/'/g, "'\\''") + "'";
          s = s.replace(/^(?:'')+/g, "").replace(/\\'''/g, "\\'");
        }
        return s;
      };
      if (isUsingWindows) {
        cleanInput = function(s) {
          var isPathName = /[\\]/.test(s);
          if (isPathName) {
            var dirname4 = '"' + path2.dirname(s) + '"';
            var basename2 = '"' + path2.basename(s) + '"';
            return dirname4 + ":" + basename2;
          }
          return '"' + s + '"';
        };
      }
      module.exports = function commandExists2(commandName, callback) {
        var cleanedCommandName = cleanInput(commandName);
        if (!callback && typeof Promise !== "undefined") {
          return new Promise(function(resolve, reject) {
            commandExists2(commandName, function(error, output) {
              if (output) {
                resolve(commandName);
              } else {
                reject(error);
              }
            });
          });
        }
        if (isUsingWindows) {
          commandExistsWindows(commandName, cleanedCommandName, callback);
        } else {
          commandExistsUnix(commandName, cleanedCommandName, callback);
        }
      };
      module.exports.sync = function(commandName) {
        var cleanedCommandName = cleanInput(commandName);
        if (isUsingWindows) {
          return commandExistsWindowsSync(commandName, cleanedCommandName);
        } else {
          return commandExistsUnixSync(commandName, cleanedCommandName);
        }
      };
    }
  });

  // node_modules/.pnpm/command-exists@1.2.9/node_modules/command-exists/index.js
  var require_command_exists2 = __commonJS({
    "node_modules/.pnpm/command-exists@1.2.9/node_modules/command-exists/index.js"(exports, module) {
      module.exports = require_command_exists();
    }
  });

  // node_modules/.pnpm/@qiwi+deep-proxy@2.0.3/node_modules/@qiwi/deep-proxy/target/es6/cache.js
  var cache = { proxies: /* @__PURE__ */ new WeakMap(), traps: /* @__PURE__ */ new WeakMap() };
  var getCache = (e, t, a) => e.get(t) || e.set(t, new a()).get(t);
  var getKey = (e) => e.join();
  var addToCache = (e, t, a, c, o) => {
    getCache(getCache(cache.traps, e, WeakMap), t, Map).set(getKey(a), c), cache.proxies.set(c, o);
  };
  var getFromCache = (e, t, a) => {
    var c, o;
    return cache.proxies.get(null === (o = null === (c = cache.traps.get(e)) || void 0 === c ? void 0 : c.get(t)) || void 0 === o ? void 0 : o.get(getKey(a)));
  };

  // node_modules/.pnpm/@qiwi+deep-proxy@2.0.3/node_modules/@qiwi/deep-proxy/target/es6/proxy.js
  var DEFAULT = Symbol("default");
  var trapNames = Object.keys(Object.getOwnPropertyDescriptors(Reflect));
  var trapsWithKey = ["get", "has", "set", "defineProperty", "deleteProperty", "getOwnPropertyDescriptor"];
  var parseParameters = (e, r) => {
    let t, a, o, s, c, p, n, l;
    switch (e) {
      case "get":
        [t, a, s] = r;
        break;
      case "set":
        [t, a, o, s] = r;
        break;
      case "deleteProperty":
      case "defineProperty":
        [t, p] = r;
        break;
      case "has":
      case "getOwnPropertyDescriptor":
        [t, a] = r;
        break;
      case "apply":
        [t, n, c] = r;
        break;
      case "construct":
        [t, c] = r;
        break;
      case "setPrototypeOf":
        [t, l] = r;
        break;
      default:
        [t] = r;
    }
    return { target: t, name: a, receiver: s, val: o, args: c, descriptor: p, thisValue: n, prototype: l };
  };
  var createHandlerContext = (e, r) => {
    const { trapName: t, handler: a, traps: o, root: s, path: c } = e, { target: p, name: n, val: l, receiver: d, args: i, descriptor: h, thisValue: y, prototype: u } = parseParameters(t, r), g2 = trapsWithKey.includes(t) ? n : void 0;
    return { parameters: r, target: p, name: n, val: l, args: i, descriptor: h, receiver: d, thisValue: y, prototype: u, trapName: t, traps: o, path: c, handler: a, key: g2, newValue: "set" === t ? l : void 0, root: s, get proxy() {
      return getFromCache(s, p, c);
    }, get value() {
      return g2 && p[g2];
    }, DEFAULT, PROXY: createDeepProxy.bind({ root: s, handler: a, path: [...c, g2] }) };
  };
  var trap = function(...e) {
    const { trapName: r, handler: t } = this, a = createHandlerContext(this, e), { PROXY: o, DEFAULT: s } = a, c = t(a);
    return c === o ? o(a.value) : c === s ? Reflect[r](...e) : c;
  };
  var createTraps = (e, r, t) => trapNames.reduce((a, o) => (a[o] = trap.bind({ trapName: o, handler: e, traps: a, root: r, path: t }), a), {});
  var checkTarget = (e) => {
    if (null === e || "object" != typeof e && "function" != typeof e)
      throw new TypeError("Deep proxy could be applied to objects and functions only");
  };
  var defaultProxyHandler = ({ DEFAULT: e }) => e;
  var createDeepProxy = function(e, r, t, a) {
    checkTarget(e);
    const o = Object.assign({}, this), s = r || o.handler || defaultProxyHandler, c = t || o.path || [], p = o.root || a || e, n = getFromCache(p, e, c);
    if (n)
      return n;
    const l = createTraps(s, p, c), d = new Proxy(e, l);
    return addToCache(p, e, c, l, d), d;
  };
  var DeepProxy = class {
    constructor(e, r, t, a) {
      return createDeepProxy(e, r, t, a);
    }
  };

  // pkgs/service/export.ts
  var import_catch_exit = __toESM(require_dist());

  // node_modules/.pnpm/chalk@5.2.0/node_modules/chalk/source/vendor/ansi-styles/index.js
  var ANSI_BACKGROUND_OFFSET = 10;
  var wrapAnsi16 = (offset = 0) => (code) => `\x1B[${code + offset}m`;
  var wrapAnsi256 = (offset = 0) => (code) => `\x1B[${38 + offset};5;${code}m`;
  var wrapAnsi16m = (offset = 0) => (red, green, blue) => `\x1B[${38 + offset};2;${red};${green};${blue}m`;
  var styles = {
    modifier: {
      reset: [0, 0],
      // 21 isn't widely supported and 22 does the same thing
      bold: [1, 22],
      dim: [2, 22],
      italic: [3, 23],
      underline: [4, 24],
      overline: [53, 55],
      inverse: [7, 27],
      hidden: [8, 28],
      strikethrough: [9, 29]
    },
    color: {
      black: [30, 39],
      red: [31, 39],
      green: [32, 39],
      yellow: [33, 39],
      blue: [34, 39],
      magenta: [35, 39],
      cyan: [36, 39],
      white: [37, 39],
      // Bright color
      blackBright: [90, 39],
      gray: [90, 39],
      // Alias of `blackBright`
      grey: [90, 39],
      // Alias of `blackBright`
      redBright: [91, 39],
      greenBright: [92, 39],
      yellowBright: [93, 39],
      blueBright: [94, 39],
      magentaBright: [95, 39],
      cyanBright: [96, 39],
      whiteBright: [97, 39]
    },
    bgColor: {
      bgBlack: [40, 49],
      bgRed: [41, 49],
      bgGreen: [42, 49],
      bgYellow: [43, 49],
      bgBlue: [44, 49],
      bgMagenta: [45, 49],
      bgCyan: [46, 49],
      bgWhite: [47, 49],
      // Bright color
      bgBlackBright: [100, 49],
      bgGray: [100, 49],
      // Alias of `bgBlackBright`
      bgGrey: [100, 49],
      // Alias of `bgBlackBright`
      bgRedBright: [101, 49],
      bgGreenBright: [102, 49],
      bgYellowBright: [103, 49],
      bgBlueBright: [104, 49],
      bgMagentaBright: [105, 49],
      bgCyanBright: [106, 49],
      bgWhiteBright: [107, 49]
    }
  };
  var modifierNames = Object.keys(styles.modifier);
  var foregroundColorNames = Object.keys(styles.color);
  var backgroundColorNames = Object.keys(styles.bgColor);
  var colorNames = [...foregroundColorNames, ...backgroundColorNames];
  function assembleStyles() {
    const codes = /* @__PURE__ */ new Map();
    for (const [groupName, group] of Object.entries(styles)) {
      for (const [styleName, style] of Object.entries(group)) {
        styles[styleName] = {
          open: `\x1B[${style[0]}m`,
          close: `\x1B[${style[1]}m`
        };
        group[styleName] = styles[styleName];
        codes.set(style[0], style[1]);
      }
      Object.defineProperty(styles, groupName, {
        value: group,
        enumerable: false
      });
    }
    Object.defineProperty(styles, "codes", {
      value: codes,
      enumerable: false
    });
    styles.color.close = "\x1B[39m";
    styles.bgColor.close = "\x1B[49m";
    styles.color.ansi = wrapAnsi16();
    styles.color.ansi256 = wrapAnsi256();
    styles.color.ansi16m = wrapAnsi16m();
    styles.bgColor.ansi = wrapAnsi16(ANSI_BACKGROUND_OFFSET);
    styles.bgColor.ansi256 = wrapAnsi256(ANSI_BACKGROUND_OFFSET);
    styles.bgColor.ansi16m = wrapAnsi16m(ANSI_BACKGROUND_OFFSET);
    Object.defineProperties(styles, {
      rgbToAnsi256: {
        value(red, green, blue) {
          if (red === green && green === blue) {
            if (red < 8) {
              return 16;
            }
            if (red > 248) {
              return 231;
            }
            return Math.round((red - 8) / 247 * 24) + 232;
          }
          return 16 + 36 * Math.round(red / 255 * 5) + 6 * Math.round(green / 255 * 5) + Math.round(blue / 255 * 5);
        },
        enumerable: false
      },
      hexToRgb: {
        value(hex) {
          const matches = /[a-f\d]{6}|[a-f\d]{3}/i.exec(hex.toString(16));
          if (!matches) {
            return [0, 0, 0];
          }
          let [colorString] = matches;
          if (colorString.length === 3) {
            colorString = [...colorString].map((character) => character + character).join("");
          }
          const integer = Number.parseInt(colorString, 16);
          return [
            /* eslint-disable no-bitwise */
            integer >> 16 & 255,
            integer >> 8 & 255,
            integer & 255
            /* eslint-enable no-bitwise */
          ];
        },
        enumerable: false
      },
      hexToAnsi256: {
        value: (hex) => styles.rgbToAnsi256(...styles.hexToRgb(hex)),
        enumerable: false
      },
      ansi256ToAnsi: {
        value(code) {
          if (code < 8) {
            return 30 + code;
          }
          if (code < 16) {
            return 90 + (code - 8);
          }
          let red;
          let green;
          let blue;
          if (code >= 232) {
            red = ((code - 232) * 10 + 8) / 255;
            green = red;
            blue = red;
          } else {
            code -= 16;
            const remainder = code % 36;
            red = Math.floor(code / 36) / 5;
            green = Math.floor(remainder / 6) / 5;
            blue = remainder % 6 / 5;
          }
          const value = Math.max(red, green, blue) * 2;
          if (value === 0) {
            return 30;
          }
          let result = 30 + (Math.round(blue) << 2 | Math.round(green) << 1 | Math.round(red));
          if (value === 2) {
            result += 60;
          }
          return result;
        },
        enumerable: false
      },
      rgbToAnsi: {
        value: (red, green, blue) => styles.ansi256ToAnsi(styles.rgbToAnsi256(red, green, blue)),
        enumerable: false
      },
      hexToAnsi: {
        value: (hex) => styles.ansi256ToAnsi(styles.hexToAnsi256(hex)),
        enumerable: false
      }
    });
    return styles;
  }
  var ansiStyles = assembleStyles();
  var ansi_styles_default = ansiStyles;

  // node_modules/.pnpm/chalk@5.2.0/node_modules/chalk/source/vendor/supports-color/index.js
  var import_node_process = __toESM(__require("node:process"), 1);
  var import_node_os = __toESM(__require("node:os"), 1);
  var import_node_tty = __toESM(__require("node:tty"), 1);
  function hasFlag(flag, argv = globalThis.Deno ? globalThis.Deno.args : import_node_process.default.argv) {
    const prefix = flag.startsWith("-") ? "" : flag.length === 1 ? "-" : "--";
    const position = argv.indexOf(prefix + flag);
    const terminatorPosition = argv.indexOf("--");
    return position !== -1 && (terminatorPosition === -1 || position < terminatorPosition);
  }
  var { env } = import_node_process.default;
  var flagForceColor;
  if (hasFlag("no-color") || hasFlag("no-colors") || hasFlag("color=false") || hasFlag("color=never")) {
    flagForceColor = 0;
  } else if (hasFlag("color") || hasFlag("colors") || hasFlag("color=true") || hasFlag("color=always")) {
    flagForceColor = 1;
  }
  function envForceColor() {
    if ("FORCE_COLOR" in env) {
      if (env.FORCE_COLOR === "true") {
        return 1;
      }
      if (env.FORCE_COLOR === "false") {
        return 0;
      }
      return env.FORCE_COLOR.length === 0 ? 1 : Math.min(Number.parseInt(env.FORCE_COLOR, 10), 3);
    }
  }
  function translateLevel(level) {
    if (level === 0) {
      return false;
    }
    return {
      level,
      hasBasic: true,
      has256: level >= 2,
      has16m: level >= 3
    };
  }
  function _supportsColor(haveStream, { streamIsTTY, sniffFlags = true } = {}) {
    const noFlagForceColor = envForceColor();
    if (noFlagForceColor !== void 0) {
      flagForceColor = noFlagForceColor;
    }
    const forceColor = sniffFlags ? flagForceColor : noFlagForceColor;
    if (forceColor === 0) {
      return 0;
    }
    if (sniffFlags) {
      if (hasFlag("color=16m") || hasFlag("color=full") || hasFlag("color=truecolor")) {
        return 3;
      }
      if (hasFlag("color=256")) {
        return 2;
      }
    }
    if ("TF_BUILD" in env && "AGENT_NAME" in env) {
      return 1;
    }
    if (haveStream && !streamIsTTY && forceColor === void 0) {
      return 0;
    }
    const min = forceColor || 0;
    if (env.TERM === "dumb") {
      return min;
    }
    if (import_node_process.default.platform === "win32") {
      const osRelease = import_node_os.default.release().split(".");
      if (Number(osRelease[0]) >= 10 && Number(osRelease[2]) >= 10586) {
        return Number(osRelease[2]) >= 14931 ? 3 : 2;
      }
      return 1;
    }
    if ("CI" in env) {
      if ("GITHUB_ACTIONS" in env) {
        return 3;
      }
      if (["TRAVIS", "CIRCLECI", "APPVEYOR", "GITLAB_CI", "BUILDKITE", "DRONE"].some((sign) => sign in env) || env.CI_NAME === "codeship") {
        return 1;
      }
      return min;
    }
    if ("TEAMCITY_VERSION" in env) {
      return /^(9\.(0*[1-9]\d*)\.|\d{2,}\.)/.test(env.TEAMCITY_VERSION) ? 1 : 0;
    }
    if (env.COLORTERM === "truecolor") {
      return 3;
    }
    if (env.TERM === "xterm-kitty") {
      return 3;
    }
    if ("TERM_PROGRAM" in env) {
      const version = Number.parseInt((env.TERM_PROGRAM_VERSION || "").split(".")[0], 10);
      switch (env.TERM_PROGRAM) {
        case "iTerm.app": {
          return version >= 3 ? 3 : 2;
        }
        case "Apple_Terminal": {
          return 2;
        }
      }
    }
    if (/-256(color)?$/i.test(env.TERM)) {
      return 2;
    }
    if (/^screen|^xterm|^vt100|^vt220|^rxvt|color|ansi|cygwin|linux/i.test(env.TERM)) {
      return 1;
    }
    if ("COLORTERM" in env) {
      return 1;
    }
    return min;
  }
  function createSupportsColor(stream, options = {}) {
    const level = _supportsColor(stream, {
      streamIsTTY: stream && stream.isTTY,
      ...options
    });
    return translateLevel(level);
  }
  var supportsColor = {
    stdout: createSupportsColor({ isTTY: import_node_tty.default.isatty(1) }),
    stderr: createSupportsColor({ isTTY: import_node_tty.default.isatty(2) })
  };
  var supports_color_default = supportsColor;

  // node_modules/.pnpm/chalk@5.2.0/node_modules/chalk/source/utilities.js
  function stringReplaceAll(string, substring, replacer) {
    let index = string.indexOf(substring);
    if (index === -1) {
      return string;
    }
    const substringLength = substring.length;
    let endIndex = 0;
    let returnValue = "";
    do {
      returnValue += string.slice(endIndex, index) + substring + replacer;
      endIndex = index + substringLength;
      index = string.indexOf(substring, endIndex);
    } while (index !== -1);
    returnValue += string.slice(endIndex);
    return returnValue;
  }
  function stringEncaseCRLFWithFirstIndex(string, prefix, postfix, index) {
    let endIndex = 0;
    let returnValue = "";
    do {
      const gotCR = string[index - 1] === "\r";
      returnValue += string.slice(endIndex, gotCR ? index - 1 : index) + prefix + (gotCR ? "\r\n" : "\n") + postfix;
      endIndex = index + 1;
      index = string.indexOf("\n", endIndex);
    } while (index !== -1);
    returnValue += string.slice(endIndex);
    return returnValue;
  }

  // node_modules/.pnpm/chalk@5.2.0/node_modules/chalk/source/index.js
  var { stdout: stdoutColor, stderr: stderrColor } = supports_color_default;
  var GENERATOR = Symbol("GENERATOR");
  var STYLER = Symbol("STYLER");
  var IS_EMPTY = Symbol("IS_EMPTY");
  var levelMapping = [
    "ansi",
    "ansi",
    "ansi256",
    "ansi16m"
  ];
  var styles2 = /* @__PURE__ */ Object.create(null);
  var applyOptions = (object, options = {}) => {
    if (options.level && !(Number.isInteger(options.level) && options.level >= 0 && options.level <= 3)) {
      throw new Error("The `level` option should be an integer from 0 to 3");
    }
    const colorLevel = stdoutColor ? stdoutColor.level : 0;
    object.level = options.level === void 0 ? colorLevel : options.level;
  };
  var chalkFactory = (options) => {
    const chalk4 = (...strings) => strings.join(" ");
    applyOptions(chalk4, options);
    Object.setPrototypeOf(chalk4, createChalk.prototype);
    return chalk4;
  };
  function createChalk(options) {
    return chalkFactory(options);
  }
  Object.setPrototypeOf(createChalk.prototype, Function.prototype);
  for (const [styleName, style] of Object.entries(ansi_styles_default)) {
    styles2[styleName] = {
      get() {
        const builder = createBuilder(this, createStyler(style.open, style.close, this[STYLER]), this[IS_EMPTY]);
        Object.defineProperty(this, styleName, { value: builder });
        return builder;
      }
    };
  }
  styles2.visible = {
    get() {
      const builder = createBuilder(this, this[STYLER], true);
      Object.defineProperty(this, "visible", { value: builder });
      return builder;
    }
  };
  var getModelAnsi = (model, level, type, ...arguments_) => {
    if (model === "rgb") {
      if (level === "ansi16m") {
        return ansi_styles_default[type].ansi16m(...arguments_);
      }
      if (level === "ansi256") {
        return ansi_styles_default[type].ansi256(ansi_styles_default.rgbToAnsi256(...arguments_));
      }
      return ansi_styles_default[type].ansi(ansi_styles_default.rgbToAnsi(...arguments_));
    }
    if (model === "hex") {
      return getModelAnsi("rgb", level, type, ...ansi_styles_default.hexToRgb(...arguments_));
    }
    return ansi_styles_default[type][model](...arguments_);
  };
  var usedModels = ["rgb", "hex", "ansi256"];
  for (const model of usedModels) {
    styles2[model] = {
      get() {
        const { level } = this;
        return function(...arguments_) {
          const styler = createStyler(getModelAnsi(model, levelMapping[level], "color", ...arguments_), ansi_styles_default.color.close, this[STYLER]);
          return createBuilder(this, styler, this[IS_EMPTY]);
        };
      }
    };
    const bgModel = "bg" + model[0].toUpperCase() + model.slice(1);
    styles2[bgModel] = {
      get() {
        const { level } = this;
        return function(...arguments_) {
          const styler = createStyler(getModelAnsi(model, levelMapping[level], "bgColor", ...arguments_), ansi_styles_default.bgColor.close, this[STYLER]);
          return createBuilder(this, styler, this[IS_EMPTY]);
        };
      }
    };
  }
  var proto = Object.defineProperties(() => {
  }, {
    ...styles2,
    level: {
      enumerable: true,
      get() {
        return this[GENERATOR].level;
      },
      set(level) {
        this[GENERATOR].level = level;
      }
    }
  });
  var createStyler = (open, close, parent) => {
    let openAll;
    let closeAll;
    if (parent === void 0) {
      openAll = open;
      closeAll = close;
    } else {
      openAll = parent.openAll + open;
      closeAll = close + parent.closeAll;
    }
    return {
      open,
      close,
      openAll,
      closeAll,
      parent
    };
  };
  var createBuilder = (self2, _styler, _isEmpty) => {
    const builder = (...arguments_) => applyStyle(builder, arguments_.length === 1 ? "" + arguments_[0] : arguments_.join(" "));
    Object.setPrototypeOf(builder, proto);
    builder[GENERATOR] = self2;
    builder[STYLER] = _styler;
    builder[IS_EMPTY] = _isEmpty;
    return builder;
  };
  var applyStyle = (self2, string) => {
    if (self2.level <= 0 || !string) {
      return self2[IS_EMPTY] ? "" : string;
    }
    let styler = self2[STYLER];
    if (styler === void 0) {
      return string;
    }
    const { openAll, closeAll } = styler;
    if (string.includes("\x1B")) {
      while (styler !== void 0) {
        string = stringReplaceAll(string, styler.close, styler.open);
        styler = styler.parent;
      }
    }
    const lfIndex = string.indexOf("\n");
    if (lfIndex !== -1) {
      string = stringEncaseCRLFWithFirstIndex(string, closeAll, openAll, lfIndex);
    }
    return openAll + string + closeAll;
  };
  Object.defineProperties(createChalk.prototype, styles2);
  var chalk = createChalk();
  var chalkStderr = createChalk({ level: stderrColor ? stderrColor.level : 0 });
  var source_default = chalk;

  // pkgs/base/pkgs/dir/export.ts
  var import_fs = __require("fs");
  var import_path = __require("path");
  var import_process = __require("process");
  var globalize = (arg) => {
    const { name, init } = arg;
    const g2 = global;
    if (typeof g2[name] === "undefined") {
      g2[name] = arg.value;
    }
    g2[name].init = async () => {
      if (init) {
        await init(g2[name]);
      }
    };
    return g2[name];
  };
  var dir = new Proxy(
    {},
    {
      get(_target, p) {
        if (p === "path") {
          return (arg = "") => {
            return (0, import_path.join)(process.cwd(), ...(arg || "").split("/"));
          };
        }
        if (p === "root") {
          return (arg = "") => {
            if ((0, import_fs.existsSync)((0, import_path.join)((0, import_process.cwd)(), "base"))) {
              return (0, import_path.join)(process.cwd(), ...arg.split("/"));
            }
            return (0, import_path.join)(process.cwd(), "..", "..", ...arg.split("/"));
          };
        }
      }
    }
  );

  // pkgs/base/pkgs/pkg/export.ts
  var import_child_process = __require("child_process");
  var import_chalk2 = __toESM(require_source());
  var import_fs2 = __toESM(__require("fs"));
  var import_path3 = __toESM(__require("path"));

  // pkgs/base/pkgs/pkg/src/should-install.ts
  var import_chalk = __toESM(require_source());
  var import_fs_jetpack = __toESM(require_main2());
  var import_path2 = __require("path");
  var shouldInstall = async (path2, silent = false) => {
    const dir2 = (0, import_path2.dirname)(path2);
    let pkg2 = {};
    try {
      pkg2 = await (0, import_fs_jetpack.readAsync)(path2, "json");
    } catch (e) {
      try {
        pkg2 = await (0, import_fs_jetpack.readAsync)((0, import_path2.join)(path2, "package.json"), "json");
      } catch (e2) {
      }
    }
    let install = false;
    for (const e of ["dependencies", "devDependencies"]) {
      if (!pkg2 || pkg2 && !pkg2[e])
        continue;
      const entries = Object.entries(pkg2[e]);
      for (const [k, v] of entries) {
        if (k === "hyper-express")
          continue;
        if (v.startsWith(".") || v.startsWith("/")) {
          continue;
        }
        if (v === "*") {
          try {
            const res = await fetch(
              `https://data.jsdelivr.com/v1/packages/npm/${k}/resolved`
            );
            const json = await res.json();
            pkg2[e][k] = json.version;
            if (!silent && !install)
              console.log(
                `found ${import_chalk.default.cyan(`${k} = "*"`)} in ${path2.substring(
                  process.cwd().length + 1
                )}`
              );
            install = true;
          } catch (e2) {
          }
        }
      }
    }
    if (install) {
      await (0, import_fs_jetpack.writeAsync)(path2, pkg2, { jsonIndent: 2 });
    }
    return install;
  };

  // pkgs/base/pkgs/pkg/export.ts
  var import_fs_jetpack2 = __toESM(require_main2());
  var g = globalThis;
  if (!g.pkgRunning) {
    g.pkgRunning = /* @__PURE__ */ new Set();
  }
  var getModuleVersion = async (name) => {
    if (!g.allPkgs) {
      g.allPkgs = {};
      const dirs = await scanDir([dir.root()]);
      await Promise.all(
        dirs.map(async (e) => {
          try {
            const res = await (0, import_fs_jetpack2.readAsync)(e, "json");
            g.allPkgs[e] = res;
          } catch (e2) {
          }
        })
      );
    }
    for (const pkg2 of Object.values(g.allPkgs)) {
      if (pkg2.dependencies) {
        for (const [k, v] of Object.entries(pkg2.dependencies)) {
          if (k === name)
            return v;
        }
      }
      if (pkg2.devDependencies) {
        for (const [k, v] of Object.entries(pkg2.devDependencies)) {
          if (k === name)
            return v;
        }
      }
    }
  };
  var pkg = {
    async extractExternal(pkg2) {
      const dependencies = {};
      if (pkg2.external) {
        for (const f of pkg2.external) {
          const v = await getModuleVersion(f);
          if (v)
            dependencies[f] = v;
          if (f === "*") {
            if (pkg2.dependencies) {
              for (const [k, v2] of Object.entries(pkg2.dependencies)) {
                if (!v2.startsWith("workspace:") && !v2.startsWith(".")) {
                  dependencies[k] = v2;
                }
              }
            }
            if (pkg2.devDependencies) {
              for (const [k, v2] of Object.entries(pkg2.devDependencies)) {
                if (!v2.startsWith("workspace:") && !v2.startsWith(".")) {
                  dependencies[k] = v2;
                }
              }
            }
          }
        }
      } else {
        if (pkg2.dependencies) {
          for (const [k, v] of Object.entries(pkg2.dependencies)) {
            if (!v.startsWith("workspace:") && !v.startsWith(".")) {
              dependencies[k] = v;
            }
          }
        }
        if (pkg2.devDependencies) {
          for (const [k, v] of Object.entries(pkg2.devDependencies)) {
            if (!v.startsWith("workspace:") && !v.startsWith(".")) {
              dependencies[k] = v;
            }
          }
        }
      }
      return { name: pkg2.name, version: pkg2.version, dependencies };
    },
    async install(path2, arg) {
      const _arg = arg ? arg : { cwd: void 0, silent: false };
      let silent = _arg.silent === true ? true : false;
      if (g.pkgRunning.size > 0) {
        await Promise.all([...g.pkgRunning.values()]);
      }
      const prom = new Promise(async (resolve) => {
        let install = false;
        let mustInstall = [path2];
        if (arg && arg.deep) {
          let dirs = await scanDir([path2]);
          if (typeof arg.deep === "object") {
            dirs = dirs.filter((d) => {
              if (typeof arg.deep === "object") {
                for (const e of arg.deep.exclude) {
                  if (d.startsWith(e)) {
                    return false;
                  }
                }
              }
              return true;
            });
          }
          const mustInstall2 = [];
          for (const p of dirs) {
            if (await shouldInstall(p, silent)) {
              mustInstall2.push(p);
              install = true;
            }
          }
        } else {
          install = await shouldInstall(path2, silent);
        }
        if (install) {
          if (arg?.onInstall)
            await arg.onInstall();
          if (!silent) {
            console.log(
              `
${import_chalk2.default.magenta("Installing")} deps:
 ${import_chalk2.default.blue("\u27A5")}`,
              mustInstall.map((e) => {
                if (e.startsWith(dir.root()))
                  return import_chalk2.default.green(e.substring(dir.root().length + 1));
                if (e === dir.root())
                  return import_chalk2.default.green(e);
              }).join(" ")
            );
          }
          const child = (0, import_child_process.spawn)("pnpm", ["i"], {
            stdio: silent ? "ignore" : "inherit",
            cwd: _arg.cwd || process.cwd(),
            shell: true
          });
          child.on("exit", () => {
            g.pkgRunning.delete(prom);
            if (arg?.onInstallDone)
              arg.onInstallDone();
            resolve();
          });
        } else {
          resolve();
        }
      });
      g.pkgRunning.add(prom);
      return await prom;
    }
  };
  var scanDir = async (paths) => {
    const pkgs = [];
    for (const path2 of paths) {
      for await (const p of walkDir(path2)) {
        if (p.endsWith("package.json")) {
          pkgs.push(p);
        }
        if (p.endsWith("node_modules"))
          break;
      }
    }
    return pkgs;
  };
  async function* walkDir(dir2) {
    for await (const d of await import_fs2.default.promises.opendir(dir2)) {
      const entry = import_path3.default.join(dir2, d.name);
      if (d.isDirectory()) {
        if (!entry.endsWith("node_modules")) {
          yield* await walkDir(entry);
        }
      } else if (d.isFile())
        yield entry;
    }
  }

  // pkgs/base/pkgs/rpc/src/connect.ts
  var import_cuid2 = __toESM(require_cuid2());
  var import_lodash = __toESM(require_lodash());

  // node_modules/.pnpm/ws@8.12.1/node_modules/ws/wrapper.mjs
  var import_stream = __toESM(require_stream(), 1);
  var import_receiver = __toESM(require_receiver(), 1);
  var import_sender = __toESM(require_sender(), 1);
  var import_websocket = __toESM(require_websocket(), 1);
  var import_websocket_server = __toESM(require_websocket_server(), 1);

  // pkgs/base/pkgs/rpc/src/config.ts
  var import_fs3 = __require("fs");
  var import_path4 = __require("path");
  var config = new Proxy(
    {
      _path: "",
      _raw: null
    },
    {
      get(target, p, receiver) {
        initConf(target);
        return target._raw[p];
      },
      set(target, p, newValue, receiver) {
        initConf(target);
        target._raw[p] = newValue;
        (0, import_fs3.writeFileSync)(target._path, JSON.stringify(target._raw, null, 2));
        return true;
      }
    }
  );
  var initConf = (target) => {
    target._path = (0, import_path4.join)(process.cwd(), "rpc.json");
    try {
      if ((0, import_fs3.existsSync)((0, import_path4.join)(process.cwd(), "base"))) {
        target._path = dir.root(".output/app/rpc.json");
      }
      if ((0, import_fs3.existsSync)(target._path)) {
        const json = (0, import_fs3.readFileSync)(target._path, "utf-8");
        target._raw = JSON.parse(json);
      } else {
        (0, import_fs3.mkdirSync)((0, import_path4.dirname)(target._path), { recursive: true });
      }
    } catch (e) {
    }
    if (!target._raw) {
      target._raw = {
        port: 0,
        rpc: {}
      };
    }
  };

  // pkgs/base/pkgs/rpc/src/connect.ts
  var connectRPC = async (name, arg) => {
    const waitConnection = (0, import_lodash.default)(arg, "waitConnection", false);
    const exitWhenDisconnect = (0, import_lodash.default)(arg, "exitWhenDisconnect", true);
    let ws = false;
    let serverConnected = false;
    const onClose = () => {
      if (exitWhenDisconnect) {
        process.exit(0);
      }
    };
    const res = await connect(name, {
      waitServer: waitConnection,
      onClose
    });
    if (res) {
      ws = res.ws;
      serverConnected = res.serverConnected;
    }
    return new DeepProxy({}, ({ PROXY, key, path: path2, handler }) => {
      if (key) {
        if (key === "then") {
          return PROXY({}, handler, path2);
        }
        if (path2.length === 0 && key === "connected")
          return !!ws && !!serverConnected;
        return async (...args) => {
          if (ws === false) {
            const res2 = await connect(name, {
              waitServer: true,
              onClose
            });
            if (res2) {
              ws = res2.ws;
              serverConnected = res2.serverConnected;
            }
          }
          const result = new Promise((resolve, reject) => {
            const msgid = (0, import_cuid2.createId)();
            let retryCounter = 0;
            let timeout = null;
            let retryTimeout = 5e3;
            const lastArg = args[args.length - 1];
            if (lastArg && typeof lastArg === "object" && lastArg["__retryTimeout"]) {
              retryTimeout = lastArg["__retryTimeout"];
            }
            timeout = setTimeout(() => {
              if (ws && ws.readyState === 1) {
                resend();
              }
            }, retryTimeout);
            const resend = () => {
              if (retryCounter > 3)
                reject("RPC Server disconnected, failed to reconne 3x");
              retryCounter++;
              if (ws) {
                const onmsg = (raw) => {
                  if (ws) {
                    const msg = JSON.parse(raw);
                    if (msg.msgid === msgid) {
                      if (timeout) {
                        clearTimeout(timeout);
                      }
                      ws.off("close", resend);
                      ws.off("message", onmsg);
                      if (msg.type === "action-result") {
                        if (msg.result === "null") {
                          msg.result = null;
                        } else if (msg.result === "undefined") {
                          msg.result = void 0;
                        } else if (msg.result === "0") {
                          msg.result = 0;
                        }
                        if (!!msg.error && !!msg.result) {
                          resolve(msg.result);
                        } else if (!msg.error) {
                          resolve(msg.result);
                        } else {
                          reject(msg.error.msg);
                        }
                      }
                    }
                  }
                };
                ws.once("close", resend);
                ws.on("message", onmsg);
                ws.send(
                  JSON.stringify({
                    type: "action",
                    msgid,
                    path: [...path2, key],
                    args
                  })
                );
              }
            };
            resend();
          });
          return await result;
        };
      }
      return void 0;
    });
  };
  var connect = (name, arg) => {
    return new Promise(
      (resolve) => {
        const ws = new import_websocket.default(`ws://localhost:${config.port}/connect/${name}`);
        ws.on("open", () => {
          ws.send(JSON.stringify({ type: "identify", name }));
          ws.on("message", (raw) => {
            const msg = JSON.parse(raw);
            if (msg.type === "connected") {
              if (arg?.waitServer) {
                if (msg.serverConnected) {
                  resolve({ ws, serverConnected: msg.serverConnected });
                }
              } else {
                resolve({ ws, serverConnected: msg.serverConnected });
              }
            }
          });
        });
        ws.on("close", () => {
          resolve(false);
          if (arg?.onClose)
            arg.onClose();
        });
        ws.on("error", () => {
          resolve(false);
        });
      }
    );
  };

  // pkgs/base/pkgs/rpc/src/server.ts
  var import_hyper_express = __require("hyper-express");

  // node_modules/.pnpm/get-port@6.1.2/node_modules/get-port/index.js
  var import_node_net = __toESM(__require("node:net"), 1);
  var import_node_os2 = __toESM(__require("node:os"), 1);
  var Locked = class extends Error {
    constructor(port) {
      super(`${port} is locked`);
    }
  };
  var lockedPorts = {
    old: /* @__PURE__ */ new Set(),
    young: /* @__PURE__ */ new Set()
  };
  var releaseOldLockedPortsIntervalMs = 1e3 * 15;
  var minPort = 1024;
  var maxPort = 65535;
  var interval;
  var getLocalHosts = () => {
    const interfaces = import_node_os2.default.networkInterfaces();
    const results = /* @__PURE__ */ new Set([void 0, "0.0.0.0"]);
    for (const _interface of Object.values(interfaces)) {
      for (const config2 of _interface) {
        results.add(config2.address);
      }
    }
    return results;
  };
  var checkAvailablePort = (options) => new Promise((resolve, reject) => {
    const server = import_node_net.default.createServer();
    server.unref();
    server.on("error", reject);
    server.listen(options, () => {
      const { port } = server.address();
      server.close(() => {
        resolve(port);
      });
    });
  });
  var getAvailablePort = async (options, hosts) => {
    if (options.host || options.port === 0) {
      return checkAvailablePort(options);
    }
    for (const host of hosts) {
      try {
        await checkAvailablePort({ port: options.port, host });
      } catch (error) {
        if (!["EADDRNOTAVAIL", "EINVAL"].includes(error.code)) {
          throw error;
        }
      }
    }
    return options.port;
  };
  var portCheckSequence = function* (ports) {
    if (ports) {
      yield* ports;
    }
    yield 0;
  };
  async function getPorts(options) {
    let ports;
    let exclude = /* @__PURE__ */ new Set();
    if (options) {
      if (options.port) {
        ports = typeof options.port === "number" ? [options.port] : options.port;
      }
      if (options.exclude) {
        const excludeIterable = options.exclude;
        if (typeof excludeIterable[Symbol.iterator] !== "function") {
          throw new TypeError("The `exclude` option must be an iterable.");
        }
        for (const element of excludeIterable) {
          if (typeof element !== "number") {
            throw new TypeError("Each item in the `exclude` option must be a number corresponding to the port you want excluded.");
          }
          if (!Number.isSafeInteger(element)) {
            throw new TypeError(`Number ${element} in the exclude option is not a safe integer and can't be used`);
          }
        }
        exclude = new Set(excludeIterable);
      }
    }
    if (interval === void 0) {
      interval = setInterval(() => {
        lockedPorts.old = lockedPorts.young;
        lockedPorts.young = /* @__PURE__ */ new Set();
      }, releaseOldLockedPortsIntervalMs);
      if (interval.unref) {
        interval.unref();
      }
    }
    const hosts = getLocalHosts();
    for (const port of portCheckSequence(ports)) {
      try {
        if (exclude.has(port)) {
          continue;
        }
        let availablePort = await getAvailablePort({ ...options, port }, hosts);
        while (lockedPorts.old.has(availablePort) || lockedPorts.young.has(availablePort)) {
          if (port !== 0) {
            throw new Locked(port);
          }
          availablePort = await getAvailablePort({ ...options, port }, hosts);
        }
        lockedPorts.young.add(availablePort);
        return availablePort;
      } catch (error) {
        if (!["EADDRINUSE", "EACCES"].includes(error.code) && !(error instanceof Locked)) {
          throw error;
        }
      }
    }
    throw new Error("No available ports found");
  }
  function portNumbers(from, to) {
    if (!Number.isInteger(from) || !Number.isInteger(to)) {
      throw new TypeError("`from` and `to` must be integer numbers");
    }
    if (from < minPort || from > maxPort) {
      throw new RangeError(`'from' must be between ${minPort} and ${maxPort}`);
    }
    if (to < minPort || to > maxPort) {
      throw new RangeError(`'to' must be between ${minPort} and ${maxPort}`);
    }
    if (from > to) {
      throw new RangeError("`to` must be greater than or equal to `from`");
    }
    const generator = function* (from2, to2) {
      for (let port = from2; port <= to2; port++) {
        yield port;
      }
    };
    return generator(from, to);
  }

  // pkgs/base/pkgs/rpc/src/server.ts
  var import_cuid22 = __toESM(require_cuid2());
  var import_lodash2 = __toESM(require_lodash());
  var import_pretty_error = __toESM(require_PrettyError());
  var pe = new import_pretty_error.default();
  function getRandomArbitrary(min, max) {
    return Math.round(Math.random() * (max - min) + min);
  }
  var createRPC = async (name, action, opt) => {
    let srv = null;
    if (!config.port) {
      config.port = await getPorts({
        port: portNumbers(getRandomArbitrary(11e3, 14e3), 19e3)
      });
      srv = await createServer();
    }
    let ws = await connect2(name, action);
    if (!ws) {
      srv = await createServer();
      ws = await connect2(name, action);
    }
    if (opt?.isMain && !srv) {
      console.log(
        `
Royal is already running.
Make sure to kill running instance before starting.

`
      );
      process.exit(1);
    }
    return new DeepProxy(action, ({ target, PROXY, key, path: path2, handler }) => {
      if (key) {
        if (key === "destroy") {
          return () => {
            if (srv) {
              srv.close();
            }
          };
        }
        if (key === "then") {
          return PROXY({}, handler, path2);
        }
        if (typeof target[key] === "function") {
          return target[key];
        }
        return PROXY(target[key], handler, path2);
      }
      return void 0;
    });
  };
  var connect2 = (name, action) => {
    return new Promise((resolve) => {
      const ws = new import_websocket.default(`ws://localhost:${config.port}/create/${name}`);
      setTimeout(() => {
        if (ws.readyState !== ws.OPEN) {
          ws.close();
          resolve(false);
        }
      }, 500);
      ws.on("open", () => {
        ws.send(JSON.stringify({ type: "identify", name }));
        ws.on("message", async (raw) => {
          const msg = JSON.parse(raw);
          if (msg.type === "action") {
            const fn = (0, import_lodash2.default)(action, msg.path.join("."));
            if (typeof fn === "undefined") {
              ws.send(
                JSON.stringify({
                  type: "action-result",
                  error: {
                    msg: `${source_default.red(`ERROR`)}: Function ${source_default.cyan(
                      msg.path.join(".")
                    )} not found in ${source_default.green(name)} action`
                  },
                  clientid: msg.clientid,
                  msgid: msg.msgid
                })
              );
            }
            if (typeof fn === "function") {
              let result = void 0;
              let error = void 0;
              try {
                result = await fn(...msg.args);
              } catch (e) {
                if (typeof e === "string") {
                  error = { msg: e };
                } else {
                  error = { msg: e?.message || "" };
                }
              }
              const final = JSON.stringify({
                type: "action-result",
                result,
                error,
                clientid: msg.clientid,
                msgid: msg.msgid
              });
              ws.send(final);
            }
          }
        });
        resolve(ws);
      });
      ws.on("close", () => {
        resolve(false);
      });
      ws.on("error", () => {
        resolve(false);
      });
    });
  };
  var createServer = async () => {
    const MAX_BODY = Number.MAX_SAFE_INTEGER;
    const server = new import_hyper_express.Server({
      max_body_length: MAX_BODY,
      auto_close: true,
      trust_proxy: true,
      fast_buffers: true
    });
    const conns = {};
    server.ws("/create/:name", { max_payload_length: MAX_BODY }, (ws) => {
      ws.on("message", (raw) => {
        const msg = JSON.parse(raw);
        if (msg.type === "identify") {
          if (!conns[msg.name]) {
            conns[msg.name] = {
              server: null,
              clients: /* @__PURE__ */ new Set()
            };
          }
          conns[msg.name].server = ws;
          conns[msg.name].clients.forEach((ws2) => {
            ws2.send(
              JSON.stringify({
                type: "connected",
                serverConnected: true
              })
            );
          });
        } else if (msg.type === "action-result") {
          for (const v of Object.values(conns)) {
            v.clients.forEach((cws) => {
              if (cws.context.clientId === msg.clientid) {
                cws.send(raw);
              }
            });
          }
        }
      });
    });
    server.ws(
      "/connect/:name",
      { max_payload_length: MAX_BODY },
      (ws) => {
        ws.on("message", (raw) => {
          const msg = JSON.parse(raw);
          if (msg.type === "identify") {
            if (!conns[msg.name]) {
              conns[msg.name] = {
                server: null,
                clients: /* @__PURE__ */ new Set()
              };
            }
            ws.context.clientId = (0, import_cuid22.createId)();
            conns[msg.name].clients.add(ws);
            ws.send(
              JSON.stringify({
                type: "connected",
                serverConnected: !!conns[msg.name].server
              })
            );
          } else if (msg.type === "action") {
            let name = "";
            for (const [k, v] of Object.entries(conns)) {
              if (v.clients.has(ws)) {
                name = k;
              }
            }
            if (name && conns[name]) {
              conns[name].server?.send(
                JSON.stringify({ ...msg, clientid: ws.context.clientId })
              );
            }
          }
        });
      }
    );
    try {
      await server.listen(config.port, "localhost");
    } catch (e) {
      await server.listen(config.port, "127.0.0.1");
    }
    return server;
  };

  // pkgs/base/pkgs/bundler/global.ts
  var bundler = globalThis;
  if (!bundler.runs)
    bundler.runs = {};

  // pkgs/base/pkgs/utility/spawn.ts
  var import_child_process2 = __require("child_process");
  var spawn2 = (file, args, opt) => {
    let proc = opt?.ipc ? (0, import_child_process2.fork)(file, args, {
      cwd: opt?.cwd,
      stdio: "inherit",
      execArgv: ["--enable-source-maps", "--trace-warnings"]
    }) : (0, import_child_process2.spawn)(file, args, {
      cwd: opt?.cwd,
      stdio: opt?.silent === true ? "ignore" : "inherit",
      shell: true
    });
    const callback = {
      onMessage: (e) => {
      },
      onExit: (e) => {
      }
    };
    const result = {
      data: {},
      markedRunning: false,
      onMessage: (fn) => {
        callback.onMessage = fn;
      },
      proc,
      onExit: (fn) => {
        callback.onExit = fn;
      },
      killing: null,
      async kill() {
        await new Promise((resolve) => {
          if (opt?.ipc) {
            proc.on("message", (e) => {
              if (e === "::SPAWN_DISPOSED::") {
                resolve();
              }
            });
            proc.send("::SPAWN_DISPOSE::");
          } else {
            resolve();
          }
        });
      }
    };
    return new Promise((resolve) => {
      if (opt?.ipc) {
        proc.on("message", async (e) => {
          callback.onMessage(e);
        });
        proc.on("exit", async (code, signal) => {
          callback.onExit({
            exitCode: code || 0,
            signal
          });
        });
        resolve(result);
      } else {
        proc.on("exit", async (code, signal) => {
          callback.onExit({
            exitCode: code || 0,
            signal
          });
          resolve(result);
        });
      }
    });
  };
  var attachSpawnCleanup = (name) => {
    process.on("message", async (e) => {
      if (e === "::SPAWN_DISPOSE::") {
        await Promise.all(
          Object.values(bundler.runs).map(async (runs) => {
            runs.forEach(async (run) => {
              await new Promise((resolve) => {
                run.proc.on("message", (e2) => {
                  if (e2 === "::SPAWN_DISPOSED::") {
                    resolve();
                  }
                });
                if (run.proc.send)
                  run.proc.send("::SPAWN_DISPOSE::");
              });
            });
          })
        );
        try {
          if (process.send)
            process.send(`::SPAWN_DISPOSED::`);
        } catch (e2) {
        }
        console.log("Exit because of: Process Respawn (restart process)");
        process.exit(0);
      }
    });
  };

  // pkgs/base/pkgs/bundler/runner.ts
  var import_command_exists = __toESM(require_command_exists2());
  var import_fs4 = __require("fs");
  var runner = {
    get list() {
      return bundler.runs;
    },
    async dispose() {
      const all = Object.values(bundler.runs).map(async (runs) => {
        runs.forEach(async (run) => {
          await run.kill();
        });
      });
      return await Promise.all(all);
    },
    async restart(path2) {
      if (!bundler.restart) {
        bundler.restart = /* @__PURE__ */ new Set();
      }
      bundler.restart.add(path2);
      if (bundler.runs[path2]) {
        bundler.runs[path2].forEach(async (run) => {
          const data = run.data;
          await this.stop(path2);
          await runner.run(data.arg);
          bundler.restart.delete(path2);
        });
      } else if (bundler.lastRunArgs[path2]) {
        await runner.run(bundler.lastRunArgs[path2]);
        bundler.restart.delete(path2);
      } else {
        bundler.restart.delete(path2);
        return false;
      }
    },
    async stop(path2) {
      return new Promise((resolve) => {
        if (!bundler.runs[path2]) {
          resolve(true);
        } else {
          bundler.runs[path2].forEach((run) => {
            run.onExit(() => resolve(true));
            run.kill();
            bundler.runs[path2].delete(run);
            if (bundler.runs[path2].size === 0)
              delete bundler.runs[path2];
          });
        }
      });
    },
    async run(arg) {
      try {
        const { path: path2, args, cwd: cwd2, onStop } = arg;
        let isCommand = false;
        if (!(0, import_fs4.existsSync)(path2)) {
          if (await (0, import_command_exists.default)(path2)) {
            isCommand = true;
          }
        }
        if (!bundler.runs[path2]) {
          bundler.runs[path2] = /* @__PURE__ */ new Set();
        }
        if (!bundler.lastRunArgs) {
          bundler.lastRunArgs = {};
        }
        bundler.lastRunArgs[path2] = arg;
        const run = await spawn2(path2, args || [], {
          cwd: cwd2,
          ipc: isCommand ? false : true,
          silent: arg.silent
        });
        bundler.runs[path2].add(run);
        run.data = {
          arg
        };
        run.onExit(async (e) => {
          if (onStop)
            await onStop(e);
          bundler.runs[path2].delete(run);
          if (bundler.runs[path2].size === 0)
            delete bundler.runs[path2];
          if (bundler.restart && !bundler.restart.has(path2)) {
            this.run(arg);
          }
        });
        let resolved = false;
        return await new Promise((resolve) => {
          if (!isCommand) {
            run.onMessage((e) => {
              if (!resolved) {
                resolved = true;
                resolve(true);
              }
            });
          } else {
            resolve(true);
          }
        });
      } catch (e) {
        console.log(e);
        return false;
      }
    }
  };

  // pkgs/service/src/action.ts
  var import_lodash3 = __toESM(require_lodash());

  // pkgs/service/src/global.ts
  var svc = globalize({
    name: "svc",
    value: {
      root: null,
      definitions: {}
      // action definition
    },
    init: async (g2) => {
      g2.root = await connectRPC("root");
    }
  });

  // pkgs/service/src/action.ts
  var rpc = {};
  var rootAction = {
    async start(arg) {
      const running = await runner.run({
        path: dir.path(`${arg.name}/index.js`),
        args: [arg.pid],
        cwd: dir.path()
      });
      if (!running) {
        console.log(
          `${source_default.red(`Failed`)} to start ${source_default.cyan(
            arg.name
          )}: Service not found`
        );
      }
      return running;
    },
    async restart(arg) {
      return await runner.restart(dir.path(`${arg.name}/index.js`));
    },
    async identify({
      name,
      pid,
      definition
    }) {
      svc.definitions[name] = definition;
      rpc[`${name}.${pid}`] = await connectRPC(`${name}.${pid}`, {
        waitConnection: true
      });
      for (const [_, v] of Object.entries(rpc)) {
        await v._receiveDefinition(svc.definitions, {
          __retryTimeout: 1e3
        });
      }
    },
    async executeAction(arg) {
      return await (0, import_lodash3.default)(
        rpc[`${arg.name}.${arg.pid}`],
        arg.path.join(".")
      )(...arg.args);
    }
  };

  // pkgs/service/src/create-service.ts
  var import_fs_jetpack3 = __toESM(require_main2());

  // pkgs/service/export.ts
  var initialize = async (fn) => {
    attachSpawnCleanup("root");
    await pkg.install(dir.path(), { deep: true });
    process.removeAllListeners("warning");
    const root = await createRPC("root", rootAction);
    await svc.init();
    await fn();
    if (process.send)
      process.send("::RUNNING::");
    if ((await connectRPC("base")).connected) {
    } else {
      (0, import_catch_exit.addExitCallback)(() => {
        root.destroy();
      });
    }
  };
  var manageProcess = (name, pid) => {
    return {
      get isRunning() {
        return false;
      },
      async start() {
        return await svc.root.start({ name, pid: pid || name });
      },
      async restart() {
        return true;
      },
      async stop() {
        return true;
      }
    };
  };
  var executeAction = (arg) => {
    const { name, entry } = arg;
    let pid = arg.pid || name;
    const def = svc.definitions[name];
    if (def) {
      if (def[entry] === "function") {
        return async (...args) => {
          return await svc.root.executeAction({
            name,
            pid,
            path: [entry],
            args
          });
        };
      } else if (def[entry] === "object") {
        return new DeepProxy({}, ({ path: path2, key, PROXY }) => {
          const objkey = [entry, ...path2, key];
          if (def[objkey.join(".")] === "function") {
            return async (...args) => {
              return await svc.root.executeAction({
                name,
                pid,
                path: objkey,
                args
              });
            };
          }
          return PROXY({});
        });
      }
    } else {
      console.error(
        `Failed to call ${source_default.magenta(
          `service.${name}.${entry}`
        )}
 Service ${source_default.green(
          name
        )} not started yet. 

 Please put your service call inside onServiceReady(() => {})`
      );
    }
  };
  var service = new DeepProxy({}, ({ PROXY, path: path2, key }) => {
    return PROXY({}, ({ path: path3, key: key2, PROXY: PROXY2 }) => {
      if (key2 === "then")
        return PROXY2({});
      if (key2 === "_process" || key2 === "_all") {
        return manageProcess(path3[0]);
      }
      if (key2 === "_pid") {
        return PROXY2({}, ({ path: path4, key: key3 }) => {
          const pid = key3;
          return PROXY2({}, async ({ key: key4 }) => {
            if (key4 === "_process") {
              return manageProcess(path4[0], key4);
            }
            return executeAction({
              name: path4[0],
              pid,
              entry: key4
            });
          });
        });
      }
      return executeAction({ name: path3[0], entry: key2 });
    });
  });

  // app/app.ts
  initialize(async () => {
    await service.db._process.start();
    await service.srv._process.start();
  });
})();
/*! Bundled license information:

@noble/hashes/utils.js:
  (*! noble-hashes - MIT License (c) 2022 Paul Miller (paulmillr.com) *)
*/
//# sourceMappingURL=app.js.map

})()