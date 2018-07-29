console.log("MDHAdapter Ver : 4.1.0, 2015-04-29 17:44:05");
window.console = window.console || {};
window.console.log = window.console.log || function() {};
console.log("START to load MDHAdapter.js");

function loadJavascript(f) {
    var head = document.getElementsByTagName("head")[0];
    var e = head.getElementsByTagName("script");
    var d;
    for (var g = 0; g < e.length; g++) {
        if (e[g].src.indexOf("MDHVirtualAdapter") > -1) {
            return
        }
        var b = e[g].src.indexOf("MDHAdapter");
        if (b > -1) {
            var a = e[g].src.substring(0, b);
            d = a + f
        }
    }
    var c = document.createElement("script");
    c.type = "text/javascript";
    c.charset = "utf-8";
    c.src = d;
    head.appendChild(c)
}
var MDHValidator = new function() {
    this.isNumber = function(a) {
        return !isNaN(parseFloat(a)) && isFinite(a)
    };
    this.isNumber_ge_lt = function(b, c, a) {
        if (!this.isNumber(c)) {
            return false
        }
        c = parseFloat(c);
        return b <= c && c < a
    };
    this.isNumber_ge_le = function(b, c, a) {
        if (!this.isNumber(c)) {
            return false
        }
        c = parseFloat(c);
        return b <= c && c <= a
    };
    this.isNumber_ge = function(a, b) {
        if (!this.isNumber(b)) {
            return false
        }
        b = parseFloat(b);
        return a <= b
    }
};
if (navigator.userAgent.indexOf("iPhone OS 6_") > 0 || navigator.userAgent.indexOf("iPad; CPU OS 6_") > 0) {
    (function(g) {
        var a = {};
        var d = {};
        var e = g.setTimeout;
        var f = g.setInterval;
        var h = g.clearTimeout;
        var c = g.clearInterval;

        function i(p, m, k) {
            var o, j = k[0],
                l = (p === f);

            function n() {
                if (j) {
                    j.apply(g, arguments);
                    if (!l) {
                        delete m[o];
                        j = null
                    }
                }
            }
            k[0] = n;
            o = p.apply(g, k);
            m[o] = {
                args: k,
                created: Date.now(),
                cb: j,
                id: o
            };
            return o
        }

        function b(p, n, j, q, s) {
            var k = j[q];
            if (!k) {
                return
            }
            var l = (p === f);
            n(k.id);
            if (!l) {
                var m = k.args[1];
                var o = Date.now() - k.created;
                if (o < 0) {
                    o = 0
                }
                m -= o;
                if (m < 0) {
                    m = 0
                }
                k.args[1] = m
            }

            function r() {
                if (k.cb) {
                    k.cb.apply(g, arguments);
                    if (!l) {
                        delete j[q];
                        k.cb = null
                    }
                }
            }
            k.args[0] = r;
            k.created = Date.now();
            k.id = p.apply(g, k.args)
        }
        g.setTimeout = function() {
            return i(e, a, arguments)
        };
        g.setInterval = function() {
            return i(f, d, arguments)
        };
        g.clearTimeout = function(k) {
            var j = a[k];
            if (j) {
                delete a[k];
                h(j.id)
            }
        };
        g.clearInterval = function(k) {
            var j = d[k];
            if (j) {
                delete d[k];
                c(j.id)
            }
        };
        g.addEventListener("scroll", function() {
            var j;
            for (j in a) {
                b(e, h, a, j)
            }
            for (j in d) {
                b(f, c, d, j)
            }
        })
    }(window))
}
var MDHMgr = new function() {
    this.queue = {
        ready: true,
        commands: [],
        timer: null
    };
    this._constructors = [];
    this.available = true;
    this.virtualMode = false;
    this._exec = {};
    this.device = {
        platform: "",
        model: ""
    };
    this.MDH_SUCCESS = 0;
    this.MDH_START_ACTIVITY_FOR_RESULT = 10000;
    this.MDH_INVALID_ARGUMENT = -10001;
    this.MDH_JSON_EXP_ERROR = -10002;
    this.MDH_USER_CANCELED = -10003;
    this.MDH_SIMULATOR_NOT_SUPPORTED = -10004;
    this.MDH_NETWORK_TIMEOUT = -10007;
    this.MDH_NO_PERMISSION = -10008;
    this.MDH_PLATFORM_NOT_SUPPORTED = -10009;
    this.MDH_CLASS_NOT_FOUND = -10097;
    this.MDH_NO_SUCH_METHOD = -10098;
    this.MDH_UNKNOWN_ERROR = -10099;
    this.MDH_Basic_LAUNCHER_IS_NOT_INSTALLED = -10100;
    this.MDH_Basic_SSO_SIGN_OFF = -10101;
    this.MDH_Basic_NO_LOCK_PASSWORD = -10102;
    this.MDH_Basic_SCREEN_IS_LOCKED = -10103;
    this.MDH_Basic_SERVICE_IS_BINDING = -10104;
    this.MDH_Basic_LOCK_IS_NOT_MATCHED = -10105;
    this.MDH_Basic_APP_INSTALL_CANCLED = -10106;
    this.MDH_Basic_APP_INSTALL_FAILED = -10107;
    this.MDH_Basic_LOGOUT = -10108;
    this.MDH_Basic_SERVICE_IS_NOT_BINDING = -10109;
    this.MDH_Basic_VPN_KEYPAIR_ERROR = -10110;
    this.MDH_Basic_VPN_PROVISION_ERROR = -10111;
    this.MDH_Basic_VPN_CONNECTION_ERROR = -10112;
    this.MDH_Basic_NETWORK_IS_NOT_CONNECTED = -100;
    this.MDH_Basic_USER_ID_OR_MOBILE_ID_IS_NULL = -102;
    this.MDH_Basic_SERVICE_ID_IS_NULL = -103;
    this.MDH_Basic_NO_INPUT_URL = -104;
    this.MDH_Basic_CONNECTION_TIMED_OUT = -107;
    this.MDH_Basic_SERVICE_NOT_FOUND = -108;
    this.MDH_Basic_UNKNOWN_ERROR_FROM_SB = 109;
    this.MDH_Basic_NO_DELEGATE = -110;
    this.MDH_Basic_HOSTNAME_COULD_NOT_BE_FOUND = -111;
    this.MDH_Basic_CONNECTION_ERROR_403 = 403;
    this.MDH_Basic_CONNECTION_ERROR_404 = 404;
    this.MDH_Basic_CONNECTION_ERROR_500 = 500;
    this.MDH_Basic_SAP_SERVER_CONNECT_ERROR = 101;
    this.MDH_Basic_SAP_INVALID_PARAMETER = 102;
    this.MDH_Basic_SAP_RUNTIME_ERROR = 103;
    this.MDH_Basic_DB_RUNTIME_ERROR = 200;
    this.MDH_Basic_AUTH_INVALID_PARAMETER = 900;
    this.MDH_Basic_AUTH_UNREGISTERED_USER = 901;
    this.MDH_Basic_AUTH_FAILED_MOBILE = 902;
    this.MDH_Basic_AUTH_FAILED_USER_INFO = 903;
    this.MDH_Basic_PROV_INVALID_ID_OR_PASSWORD = 904;
    this.MDH_PHONE_NO_SIM = -10200;
    this.MDH_PHONE_AIRPLANE_MODE = -10201;
    this.MDH_PHONE_CALLING = -10202;
    this.MDH_PHONE_NO_DATA = -10203;
    this.MDH_PHONE_NO_RESULT = -10204;
    this.MDH_PHONE_SMS_ERROR_GENERIC_FAILURE = -10250;
    this.MDH_PHONE_SMS_ERROR_NO_SERVICE = -10251;
    this.MDH_PHONE_SMS_ERROR_NULL_PDU = -10252;
    this.MDH_PHONE_SMS_ERROR_RADIO_OFF = -10253;
    this.MDH_Device_error = -10300;
    this.MDH_Device_GPS_IS_NOT_AVAILABLE = -10301;
    this.MDH_Device_ORIENTATION_IS_LOCKED = -10302;
    this.MDH_Device_NO_CAMERA = -10303;
    this.MDH_Device_CAMERA_IS_LOCKED = -10304;
    this.MDH_Device_OUT_OF_MEMORY = -10305;
    this.MDH_Device_LOW_BATTERY = -10306;
    this.MDH_Device_NO_DATA_IN_LIBRARY = -10307;
    this.MDH_Device_NO_COMPASS = -10308;
    this.MDH_Device_NOT_SUPPORT = -10309;
    this.MDH_Device_GPS_TIMEOUT = -10310;
    this.MDH_Device_MEDIA_NO_MEDIA = -10313;
    this.MDH_Storage_NOT_FOUND_ERR = -10400;
    this.MDH_Storage_SECURITY_ERR = -10401;
    this.MDH_Storage_ABORT_ERR = -10402;
    this.MDH_Storage_NOT_READABLE_ERR = -10403;
    this.MDH_Storage_ENCODING_ERR = -10404;
    this.MDH_Storage_NO_MODIFICATION_ALLOWED_ERR = -10405;
    this.MDH_Storage_INVALID_STATE_ERR = -10406;
    this.MDH_Storage_SYNTAX_ERR = -10407;
    this.MDH_Storage_FILEIO_ERR = -10408;
    this.MDH_Storage_SDCARD_NOT_EXIST = -10409;
    this.MDH_Storage_ENCRYPTION_ERR = -10410;
    this.MDH_Util_NO_CAMERA = -10500;
    this.MDH_Util_CAMERA_IS_LOCKED = -10501;
    this.MDH_Util_OUT_OF_MEMORY = -10502;
    this.MDH_Util_LOW_BATTERY = -10503;
    this.MDH_Util_PUSH_CFG_NONE_SENDERID = -10580;
    this.MDH_Util_PUSH_CFG_NONE_SENDERPW = -10581;
    this.MDH_Util_PUSH_NONE_GOOGLEACCOUNT = -10582;
    this.MDH_Util_PUSH_ID_REGISTRATION_ERROR = -10583;
    this.MDH_Util_PUSH_UNREGISTERED_ID = -10584;
    this.MDH_Util_PUSH_CFG_NONE_PROJECTID = -10585;
    this.MDH_Util_PUSH_CFG_NONE_APPSERVERKEY = -10586;
    this.MDH_Util_PUSH_GCM_SERVICE_NOT_AVAILABLE = -10587;
    this.MDH_Util_PUSH_GCM_AUTHENTICATION_FAILED = -10588;
    this.MDH_Util_PUSH_GCM_INVALID_PARAMETERS = -10589;
    this.MDH_Util_PUSH_GCM_INVALID_SENDER = -10590;
    this.MDH_UI_INVALID_UIID = -10700;
    this.MDH_UI_CANNOT_CREATE_CONTAINER = -10701;
    this.MDH_UI_CANNOT_CREATE_COMPONENT = -10702;
    this.MDH_UI_INCORRECT_FUNCTION_CALL = -10703;
    this.MDH_ATTACH_ERROR_0 = -11000;
    this.MDH_ATTACH_ERROR_01 = -11001;
    this.MDH_ATTACH_ERROR_600 = -11006;
    this.MDH_ATTACH_ERROR_5000 = -11010;
    this.MDH_ATTACH_ERROR_5001 = -11011;
    this.MDH_ATTACH_ERROR_5002 = -11012;
    this.MDH_ATTACH_ERROR_5003 = -11013;
    this.MDH_ATTACH_ERROR_5004 = -11014;
    this.MDH_ATTACH_ERROR_5005 = -11015;
    this.MDH_ATTACH_ERROR_DISCONN_AGENT = -11020;
    this.MDH_ATTACH_ERROR_FILECOUNT_OVER = -11021;
    this.MDH_ATTACH_ERROR_SHEETCOUNT_OVER = -11022;
    this.MDH_ATTACH_ERROR_IMAGEBUFFER = -11023;
    this.MDH_ATTACH_ERROR_PWD = -11024;
    this.MDH_ATTACH_ERROR_WAIT_CLOSE_DOC = -11025;
    this.MDH_ATTACH_ERROR_NOT_SUPPORTED = -11030;
    this.MDH_ATTACH_ERROR_NOT_SUPPORTED_02 = -11032;
    this.MDH_ATTACH_ERROR_NOT_SUPPORTED_04 = -11034;
    this.MDH_FileTransfer_INVALID_URL = -11100;
    this.MDH_FileTransfer_CONNECT_ERR = -11101;
    this.MDH_FileTransfer_TOO_BIG = -11102;
    this.MDH_MDM_IS_NOT_INSTAILLED = -13000;
    this.MDH_MDM_SERVICE_NOT_EXIST = -13001;
    this.MDH_MDM_NOT_SUPPORTED_VERSION = -13002;
    this.MDH_MDM_SERVICE_IN_MANIFEST_NOT_FOUND = -13003;
    this.MDH_MDM_SERVICE_IS_DISABLED = -13004;
    this.MDH_MDM_SERVICE_GET_INFO_FAILED = -13005;
    this.MDH_MDM_SERVICE_CONNECT_FAILED = -13006;
    this.MDH_MDM_NOT_ALLOW_THIS_WORK = -13007;
    this.MDH_SEMPLOG_NOT_SUPPORTED = -14000;
    this.MDH_SEMPLOG_CONFIG_INVALID = -14001;
    this.MDH_SECUREDB_SQL_ERROR = -15000;
    this.init = function() {
        console.log("MDHMgr.init() is callled");
        this.checkDevice();
        this._exec = this["_exec_" + this.device.platform];
        if (this.device.platform == "wp") {
            __onSuccess_WP = function(callbackId, args) {
                MDHMgr.CallbackMgr.onSuccess(callbackId, JSON.parse(args))
            };
            __onError_WP = function(callbackId, args) {
                MDHMgr.CallbackMgr.onError(callbackId, JSON.parse(args))
            }
        }
    };
    this.initComponents = function() {
        var timer = setInterval(function() {
            var state = document.readyState;
            if ((state == "loaded" || state == "complete") && DeviceInfo.uuid != null) {
                clearInterval(timer);
                while (MDHMgr._constructors.length > 0) {
                    var constructor = MDHMgr._constructors.shift();
                    try {
                        constructor()
                    } catch (e) {
                        alert("Failed to run constructor: " + e.message)
                    }
                }
                var e = document.createEvent("Events");
                e.initEvent("deviceready");
                document.dispatchEvent(e)
            }
        }, 1)
    };
    this.checkDevice = function() {
        if (this.virtualMode === true) {
            this.device.platform = "virtual";
            this.device.model = "virtual";
            return "virtual"
        } else {
            if (navigator.userAgent.toLowerCase().indexOf("iphone") != -1) {
                this.device.platform = "iOS";
                this.device.model = "iphone"
            } else {
                if (navigator.userAgent.toLowerCase().indexOf("ipad") != -1) {
                    this.device.platform = "iOS";
                    this.device.model = "ipad"
                } else {
                    if (navigator.userAgent.toLowerCase().indexOf("android") != -1) {
                        this.device.platform = "android";
                        this.device.model = "galaxy"
                    } else {
                        if (navigator.userAgent.toLowerCase().indexOf("windows phone") != -1) {
                            this.device.platform = "wp";
                            this.device.model = "wp"
                        } else {
                            this.device.platform = "virtual";
                            this.device.model = "virtual";
                            loadJavascript("MDHVirtualAdapter.js")
                        }
                    }
                }
            }
        }
    };
    this.addConstructor = function(func) {
        var state = document.readyState;
        if ((state == "loaded" || state == "complete") && DeviceInfo.uuid != null) {
            func()
        } else {
            MDHMgr._constructors.push(func)
        }
    };
    this.exec = function() {
        console.log("exec() is called " + arguments[0]);
        try {
            var isAsyncMode = MDHConfig && MDHConfig.useiOSAsync;
            if (!isAsyncMode && arguments[4] && this.device.platform == "iOS") {
                var serviceAction = arguments[0].split(".");
                return this._exec_iOS_sync(serviceAction[0], serviceAction[1], arguments[3])
            }
        } catch (e) {}
        var callbackId = arguments[0] + this.CallbackMgr.callbackId++;
        if (typeof arguments[1] != "function") {
            return
        }
        if (typeof arguments[2] != "function") {
            return
        }
        if (arguments[1] || arguments[2]) {
            this.CallbackMgr.callbacks[callbackId] = {
                success: arguments[1],
                error: arguments[2]
            }
        }
        if (this.device.platform == "virtual") {
            this._exec(arguments[0], callbackId, arguments[3]);
            return
        }
        this._exec(callbackId, arguments);
        return callbackId
    };
    this._exec_virtual = function() {
        if (typeof MDHVirtualAdapter == "object") {
            var functionCall = "MDHVirtualAdapter." + arguments[0] + "(" + JSON.stringify(arguments[1]) + "," + JSON.stringify(arguments[2]) + ");";
            try {
                eval(functionCall)
            } catch (e) {}
        } else {
            console.log("MDHVirtualAdapter NOT Loaded")
        }
    };
    this._exec_android = function() {
        var callbackId = arguments[0];
        var serviceAction = arguments[1][0];
        var options = {};
        if (arguments[1].length > 2) {
            options = arguments[1][3]
        }
        MDHAndroid._exec(callbackId, serviceAction, JSON.stringify(options))
    };
    this._exec_wp = function() {
        var callbackId = arguments[0];
        var serviceAction = arguments[1][0];
        var options = {};
        if (arguments[1].length > 2) {
            options = arguments[1][3]
        }
        window.external.notify(callbackId + "|" + serviceAction + "|" + JSON.stringify(options))
    };
    this._exec_iOS = function() {
        this.queue.commands.push(arguments);
        if (this.queue.timer == null) {
            this.queue.timer = setInterval(this.run_command, 10)
        }
    };
    this._exec_iOS_sync = function(service, method, args) {
        var xhr = new XMLHttpRequest();
        var host = window.location.host;
        if (!host) {
            host = "."
        }
        xhr.open("GET", "http://" + host + "/_hybridsync/" + service + "." + method + "?" + encodeURIComponent(JSON.stringify(args)), false);
        xhr.send();
        return JSON.parse(xhr.responseText)
    };
    this.run_command = function() {
        if (!MDHMgr.queue.ready) {
            return
        }
        MDHMgr.queue.ready = false;
        if (!this.mdhBridge) {
            this.mdhBridge = document.createElement("iframe");
            this.mdhBridge.setAttribute("style", "display:none;");
            this.mdhBridge.setAttribute("height", "0px");
            this.mdhBridge.setAttribute("width", "0px");
            this.mdhBridge.setAttribute("frameborder", "0");
            document.documentElement.appendChild(this.mdhBridge)
        }
        var args = MDHMgr.queue.commands.shift();
        if (MDHMgr.queue.commands.length == 0) {
            clearInterval(MDHMgr.queue.timer);
            MDHMgr.queue.timer = null
        }
        var uri = [];
        var dict = null;
        if (args[1].length > 3) {
            for (var i = 3; i < args[1].length; i++) {
                var arg = args[1][i];
                if (arg == undefined || arg == null) {
                    arg = ""
                }
                if (typeof(arg) == "object") {
                    dict = arg
                } else {
                    uri.push(encodeURIComponent(arg))
                }
            }
        }
        var url = "MDHybrid://" + args[1][0] + "/" + args[0] + "/" + uri.join("/");
        if (dict != null) {
            url += "?" + encodeURIComponent(JSON.stringify(dict))
        }
        this.mdhBridge.src = url
    };
    this.log = function(message) {
        if (this.device.platform == "iOS") {
            this.exec("DebugConsole.log", function() {}, function() {}, message)
        }
    };
    this.CallbackMgr = {};
    this.CallbackMgr.callbackId = 0;
    this.CallbackMgr.callbacks = {};
    this.CallbackMgr.callbackStatus = {
        NO_RESULT: 0,
        OK: 1,
        JSON_EXCEPTION: 8,
        ERROR: 9
    };
    this.CallbackMgr.onSuccess = function(callbackId, args) {
        if (MDHMgr.CallbackMgr.callbacks[callbackId]) {
            if (args.status == MDHMgr.CallbackMgr.callbackStatus.OK) {
                try {
                    if (MDHMgr.CallbackMgr.callbacks[callbackId].success) {
                        MDHMgr.CallbackMgr.callbacks[callbackId].success(args.message)
                    }
                } catch (e) {
                    console.log("Error in success callback: " + callbackId + " = " + e)
                }
            }
            if (args.keepCallback == 0) {
                delete MDHMgr.CallbackMgr.callbacks[callbackId]
            }
        }
    };
    this.CallbackMgr.onError = function(callbackId, args) {
        if (MDHMgr.CallbackMgr.callbacks[callbackId]) {
            try {
                if (MDHMgr.CallbackMgr.callbacks[callbackId].error) {
                    MDHMgr.CallbackMgr.callbacks[callbackId].error(args.message)
                }
            } catch (e) {
                console.log("Error in error callback: " + callbackId + " = " + e)
            }
            if (args.keepCallback == 0) {
                delete MDHMgr.CallbackMgr.callbacks[callbackId]
            }
        }
    }
};
MDHMgr.init();

function GetFunctionName(b) {
    if (b) {
        var a = b.toString().match(/^\s*function\s+([^\s\(]+)/);
        return a ? a[1] : anomToNameFunk(b)
    } else {
        return null
    }
}
var _anomFunkMap = {};
var _anomFunkMapNextId = 0;

function anomToNameFunk(a) {
    var c = "f" + _anomFunkMapNextId++;
    var b = function() {
        a.apply(this, arguments);
        _anomFunkMap[c] = null;
        delete _anomFunkMap[c]
    };
    _anomFunkMap[c] = b;
    return "_anomFunkMap." + c
}

function __proxyObj(e, c, d) {
    var a = function(h, f, g) {
        h[g] = function() {
            return f[g].apply(f, arguments)
        }
    };
    for (var b in d) {
        a(e, c, d[b])
    }
}
MDHBasic = new function() {
    this.constructor = function() {};
    this.SSO = new function() {
        this.NICKNAME = "nickname";
        this.FULLNAME = "fullname";
        this.FAMILYNAME = "familyname";
        this.GIVENNAME = "givenname";
        this.TELEPHONE_HOME = "telephone_home";
        this.TELEPHONE_WORK = "telephone_work";
        this.TELEPHONE_MOBILE = "telephone_mobile";
        this.TELEPHONE_FAX = "telephone_fax";
        this.E_MAIL = "email";
        this.ADDRESS_HOME = "address_home";
        this.ADDRESS_WORK = "address_work";
        this.COMPANY = "company";
        this.DEPARTMENT = "department";
        this.POSITION = "position";
        this.EMPLOYEE_NUMBER = "employeeNumber";
        this.DEPARTMENT_NUMBER = "departmentNumber";
        this.COMPANY_CODE = "companyCode";
        this.ISBLUE = "isBlue";
        this.SECURITY_LEVEL = "securityLevel";
        this.EPID = "epid";
        this.GENDER = "gender";
        this.TITLE_NUMBER = "titleNumber";
        this.USERID = "userId";
        this.MAIL_HOST = "mailHost";
        this.TELEPHONE_INTERNET = "telephoneInternet";
        this.GRADE_OR_TITLE = "gradeOrTitle";
        this.COUNTRY = "country";
        this.PREFERRED_LANGUAGE_PRESENTATION = "preferredLanguagePresentation";
        this.USER_LEVEL = "userLevel";
        this.USER_STATUS = "userStatus";
        this.ISNATIVE = "isNative";
        this.BUSI_CODE = "busiCode";
        this.BUSI_NAME = "busiName";
        this.SUBORG_CODE = "suborgcode";
        this.SUBORG_NAME = "suborgname";
        this.GRADE_NAME = "gradeName";
        this.REGION_CODE = "resionCode";
        this.JOB = "job";
        this.JOB_NAME = "jobName";
        this.EMPLOYEE_NUMBER_ENC = "employeenumberEnc";
        this.getInfo = function(a, c, b) {
            if (window.MDHVar_isEMM == true) {
                MDHMgr.exec("EMMSSOPlugin.getInfo", a, c, b)
            } else {
                MDHMgr.exec("SSO.getInfo", a, c, b)
            }
        }
    };
    this.ScreenLock = new function() {
        this.isLocked = function(a, b) {
            if (window.MDHVar_isEMM == true) {
                MDHMgr.exec("EMMScreenLockPlugin.isLocked", a, b)
            } else {
                MDHMgr.exec("ScreenLock.isLocked", a, b)
            }
        };
        this.unlock = function(a, b, c) {
            if (window.MDHVar_isEMM == true) {
                MDHMgr.exec("EMMScreenLockPlugin.unlock", a, b, c)
            } else {
                MDHMgr.exec("ScreenLock.unlock", a, b, c)
            }
        }
    };
    this.App = new function() {
        this.getList = function(a, b) {
            MDHMgr.exec("App.getList", a, b)
        };
        this.install = function(a, b, c) {
            MDHMgr.exec("App.install", a, b, c)
        }
    };
    this._EventTarget = function() {
        this._listeners = {}
    };
    this._EventTarget.prototype = {
        constructor: this._EventTarget,
        addListener: function(a, b) {
            if (typeof this._listeners[a] == "undefined") {
                this._listeners[a] = []
            }
            this._listeners[a].push(b);
            MDHMgr.exec("CustomEvent.link", function() {}, function() {}, {
                type: a
            })
        },
        fire: function(d) {
            if (typeof d == "string") {
                d = {
                    type: d
                }
            }
            if (!d.target) {
                d.target = this
            }
            if (!d.type) {
                throw new Error("Event object missing 'type' property.")
            }
            if (this._listeners[d.type] instanceof Array) {
                var c = this._listeners[d.type];
                for (var b = 0, a = c.length; b < a; b++) {
                    c[b].call(this, d)
                }
            }
        },
        removeListener: function(d, e) {
            if (this._listeners[d] instanceof Array) {
                var c = this._listeners[d];
                for (var b = 0, a = c.length; b < a; b++) {
                    if (c[b] === e) {
                        c.splice(b, 1);
                        break
                    }
                }
                if (c.length == 0) {
                    MDHMgr.exec("CustomEvent.unlink", function() {}, function() {}, {
                        type: d
                    })
                }
            }
        },
        removeListenerAll: function(b) {
            for (var a in this._listeners) {
                if (a.indexOf(b) == 0) {
                    delete this._listeners[a]
                }
            }
        }
    };
    this.Event = new this._EventTarget()
};
MDHPhone = new function() {
    this.contactKey = {
        UID: "uid",
        FULLNAME: "fullname",
        ADDRESSHOME: "addressHome",
        ADDRESSWORK: "addressWork",
        TELMOBILE: "telMobile",
        TELHOME: "telHome",
        TELWORK: "telWork",
        EMAILMOBILE: "emailMobile",
        EMAILWORK: "emailWork",
        EMAILHOME: "emailHome",
        WEBSITE: "website",
        NOTE: "note",
        COMPANY: "company",
        POSITION: "position",
        NICKNAME: "nickname",
        IM: "im"
    };
    this.contacts = function(g, o, j, n, p, h, l, b, f, e, a, k, i, d, c, m) {
        this.uid = g || null;
        this.fullname = o || null;
        this.addressHome = j || null;
        this.addressWork = n || null;
        this.telMobile = p || null;
        this.telHome = h || null;
        this.telWork = l || null;
        this.emailMobile = b || null;
        this.emailWork = f || null;
        this.emailHome = e || null;
        this.website = a || null;
        this.note = k || null;
        this.company = i || null;
        this.position = d || null;
        this.nickname = c || null;
        this.im = m || null
    };
    this.Telephony = new function() {
        this.call = function(a, b, c) {
            MDHMgr.exec("Telephony.call", a, b, c)
        };
        this.sendSMS = function(a, b, c) {
            MDHMgr.exec("Telephony.sendSMS", a, b, c)
        }
    };
    this.Contact = new function() {
        this.search = function(a, b, c) {
            MDHMgr.exec("Contact.search", a, b, c)
        }
    }
};
MDHDevice = new function() {
    this.constructor = function() {};
    this.GPS = new function() {
        this.lastPosition = null;
        this.lastError = null
    };
    this.GPS._setPosition = function(a) {
        this.lastError = null;
        this.lastPosition = a
    };
    this.GPS._setError = function(a) {
        this.lastError = a
    };
    this.GPS._start = function(a) {
        MDHMgr.exec("GPS.start", function() {}, function() {}, a)
    };
    this.GPS._stop = function() {
        MDHMgr.exec("GPS.stop", function() {}, function() {})
    };
    this.GPS._getWatchNetworkPosition = function(a) {
        if (MDHMgr.device.platform == "android") {
            MDHMgr.exec("GPS.watchNetwork", function() {}, function() {}, a)
        } else {
            errorCallback(MDHMgr.MDH_Device_GPS_TIMEOUT)
        }
    };
    this.GPS._getNetworkPosition = function(a, b, c) {
        if (MDHMgr.device.platform == "android") {
            MDHMgr.exec("GPS.network", a, b, c)
        } else {
            b(MDHMgr.MDH_Device_GPS_TIMEOUT)
        }
    };
    this.GPS._getPosition = function(d, f, k, b) {
        if (this.lastError != null) {
            if (typeof f == "function") {
                f.call(null, this.lastError)
            }
            this._stop();
            return
        }
        if (k) {
            if (isNaN(k.frequency)) {
                k.frequency = 100
            }
            if (k.timeout <= 0 || isNaN(k.timeout)) {
                f(MDHMgr.MDH_INVALID_ARGUMENT);
                return
            }
        }
        this._start(k);
        var h = 0;
        var j = 30000;
        var c = 2000;
        if (k && k.timeout) {
            j = k.timeout
        }
        if (typeof d != "function") {
            d = function() {}
        }
        if (typeof f != "function") {
            f = function() {}
        }
        var e = 0;
        var i = this;
        var g = arguments;
        var a = setInterval(function() {
            e += c;
            if (i.lastPosition != null && i.lastPosition.timestamp > h) {
                clearInterval(a);
                d(i.lastPosition);
                if (b === true) {
                    i._stop()
                }
            } else {
                if (e > j) {
                    clearInterval(a);
                    if (b === true) {
                        i._getNetworkPosition(d, f, k);
                        i._stop()
                    } else {
                        i._getWatchNetworkPosition(k)
                    }
                } else {
                    if (i.lastError != null) {
                        clearInterval(a);
                        f(i.lastError);
                        i.lastError = null;
                        if (b === true) {
                            i._stop()
                        }
                    }
                }
            }
        }, c)
    };
    this.GPS.getCurrentPosition = function(a, b, c) {
        if (c && !c.timeout) {
            c.timeout = 300000
        }
        if (!c || !MDHValidator.isNumber_ge_le(1, c.accuracy, 5) || !MDHValidator.isNumber_ge(0, c.timeout)) {
            b(MDHMgr.MDH_INVALID_ARGUMENT);
            return
        }
        var d = this;
        d.lastError = null;
        d.lastPosition = null;
        this._getPosition(a, b, c, true)
    };
    this.GPS.watchPosition = function(a, b, c) {
        if (!c) {
            c = {}
        }
        if (!c.frequency) {
            c.frequency = 10000
        }
        if (!c.timeout) {
            c.timeout = 300000
        }
        if (!MDHValidator.isNumber_ge(0, c.frequency) || !MDHValidator.isNumber_ge(0, c.timeout)) {
            b(MDHMgr.MDH_INVALID_ARGUMENT);
            return null
        }
        this._getPosition(a, b, c, false);
        var e;
        if (!c.frequency || c.frequency == 0 || c.timeout == 0) {
            b(MDHMgr.MDH_INVALID_ARGUMENT);
            return
        } else {
            e = c.frequency
        }
        var d = this;
        return setInterval(function() {
            d._getPosition(a, b, c, false)
        }, e)
    };
    this.GPS.clearWatch = function(a) {
        this._stop();
        return clearInterval(a)
    };
    this.Accelerator = new function() {
        function a(b, d, c) {
            this.x = b;
            this.y = d;
            this.z = c;
            this.timestamp = new Date().getTime()
        }
        this.lastError = null;
        this.lastAcceleration = null;
        this._onUpdate = function(b, d, c) {
            this.lastAcceleration = new a(b, d, c)
        };
        this._setError = function(b) {
            this.lastError = b
        };
        this.getCurrentAcceleration = function(b, d, e) {
            var c = this;
            c.lastAcceleration = null;
            c.lastError = null;
            var f = 100;
            MDHMgr.exec("Accelerator.start", function() {}, function() {}, {
                frequency: f
            });
            var g = setInterval(function() {
                if (c.lastError != null) {
                    MDHMgr.exec("Accelerator.stop", function() {}, function() {});
                    clearInterval(g);
                    d(c.lastError)
                }
                if (c.lastAcceleration != null) {
                    MDHMgr.exec("Accelerator.stop", function() {}, function() {});
                    clearInterval(g);
                    b(c.lastAcceleration)
                }
            }, 100)
        };
        this._getCurrentAcceleration = function(b, c, d) {
            if (this.lastError != null) {
                if (typeof c == "function") {
                    c.call(null, this.lastError)
                }
                MDHMgr.exec("Accelerator.stop", function() {}, function() {});
                return
            }
            if (typeof b == "function") {
                b(this.lastAcceleration)
            }
        };
        this.watchAcceleration = function(b, c, d) {
            if (!d) {
                d = {}
            }
            if (!MDHValidator.isNumber_ge(0, d.frequency) || d.frequency == 0) {
                c(MDHMgr.MDH_INVALID_ARGUMENT);
                return -1
            }
            MDHMgr.exec("Accelerator.start", function() {}, function() {}, d);
            return setInterval(function() {
                MDHDevice.Accelerator._getCurrentAcceleration(b, c, d)
            }, d.frequency)
        };
        this.clearWatch = function(b) {
            MDHMgr.exec("Accelerator.stop", function() {}, function() {});
            clearInterval(b)
        }
    };
    this.Camera = new function() {
        this.DestinationType = {
            DATA_URL: 0,
            FILE_URI: 1
        };
        this.PictureSourceType = {
            PHOTOLIBRARY: 0,
            CAMERA: 1,
            SAVEDPHOTOALBUM: 2
        };
        this.ImageType = {
            ORIGINAL_IMAGE: 0,
            MINI_IMAGE: 1,
            MICRO_IMAGE: 2
        };
        this._listeners = {};
        this.getPicture = function(a, b, c) {
            if (!c) {
                c = {}
            }
            if (!c.quality) {
                c.quality = 50
            }
            if (!MDHValidator.isNumber_ge_le(0, c.quality, 100)) {
                b(MDHMgr.MDH_INVALID_ARGUMENT);
                return
            }
            MDHMgr.exec("Camera.getPicture", a, b, c)
        };
        this.addListener = function(a, b) {
            if (typeof this._listeners[a] == "undefined") {
                this._listeners[a] = []
            }
            if (MDHMgr.device.platform == "iOS") {
                return
            }
            this._listeners[a].push(b);
            MDHMgr.exec("Camera.addListener", function() {}, function() {}, {
                type: a
            })
        };
        this.fire = function(d) {
            if (typeof d == "string") {
                d = {
                    type: d
                }
            }
            if (!d.target) {
                d.target = this
            }
            if (!d.type) {
                throw new Error("Event object missing 'type' property.")
            }
            if (this._listeners[d.type] instanceof Array) {
                var c = this._listeners[d.type];
                for (var b = 0, a = c.length; b < a; b++) {
                    c[b].call(this, d)
                }
            }
        };
        this.removeListener = function(d, e) {
            if (MDHMgr.device.platform == "iOS") {
                return
            }
            if (this._listeners[d] instanceof Array) {
                var c = this._listeners[d];
                for (var b = 0, a = c.length; b < a; b++) {
                    if (c[b] === e) {
                        c.splice(b, 1);
                        break
                    }
                }
                if (c.length == 0) {
                    MDHMgr.exec("Camera.removeListener", function() {}, function() {}, {
                        type: d
                    })
                }
            }
        };
        this.deleteImage = function(a, b, c) {
            if (MDHMgr.device.platform == "iOS") {
                b(MDHMgr.MDH_Device_NOT_SUPPORT);
                return
            }
            MDHMgr.exec("Camera.deleteImage", a, b, c)
        }
    };
    this.Vibrator = new function() {
        this.run = function(a, b, c) {
            if (!c || !MDHValidator.isNumber_ge(0, c.duration)) {
                b(MDHMgr.MDH_INVALID_ARGUMENT);
                return
            }
            MDHMgr.exec("Vibrator.run", a, b, c)
        }
    };
    this.Compass = new function() {
        function a(b) {
            this.magneticHeading = b.magneticHeading;
            this.trueHeading = b.trueHeading;
            this.headingAccuracy = b.headingAccuracy
        }
        this.lastHeading = null;
        this.lastError = null;
        this._setHeading = function(b) {
            this.lastHeading = new a(b)
        };
        this._setError = function(b) {
            this.lastError = b
        };
        this.getCurrentCompass = function(b, d, e) {
            var c = this;
            c.lastHeading = null;
            MDHMgr.exec("Compass.start", function() {}, function() {}, {
                frequency: 100
            });
            var f = setInterval(function() {
                if (c.lastHeading != null) {
                    MDHMgr.exec("Compass.stop", function() {}, function() {});
                    clearInterval(f);
                    b(c.lastHeading.trueHeading)
                }
            }, 100);
            if (typeof b == "function") {
                if (c.lastHeading != null) {
                    b(c.lastHeading.trueHeading)
                }
            }
        };
        this._getCurrentCompass = function(b, c, d) {
            if (this.lastError != null) {
                if (typeof c == "function") {
                    c.call(null, this.lastError)
                }
                MDHMgr.exec("Compass.stop", function() {}, function() {});
                return
            }
            if (typeof b == "function") {
                if (this.lastHeading != null) {
                    b(this.lastHeading.trueHeading)
                }
            }
        };
        this.watchCompass = function(b, c, d) {
            if (!d) {
                d = {}
            }
            if (!MDHValidator.isNumber_ge(0, d.frequency) || d.frequency == 0) {
                c(MDHMgr.MDH_INVALID_ARGUMENT);
                return -1
            }
            MDHMgr.exec("Compass.start", function() {}, function() {}, d);
            return setInterval(function() {
                MDHDevice.Compass._getCurrentCompass(b, c, d)
            }, d.frequency)
        };
        this.clearWatch = function(b) {
            MDHMgr.exec("Compass.stop", function() {}, function() {});
            return clearInterval(b)
        }
    };
    this.MediaMgr = new function() {
        this.MEDIA_NONE = 0;
        this.MEDIA_STARTING = 1;
        this.MEDIA_RUNNING = 2;
        this.MEDIA_PAUSED = 3;
        this.MEDIA_STOPPED = 4;
        this.MEDIA_START_RECORD = 10;
        this.MEDIA_STOP_RECORD = 11;
        this.Medias = {};
        this.addMedia = function(a) {
            this.Medias[a.src] = a;
            return a
        };
        this.removeMedia = function(a) {
            this.Medias[a.src] = null
        };
        this._onStatus = function(a, c, b) {
            if (this.Medias[a] != null) {
                if (c == "duration" && this.Medias[a]._duration != null) {
                    this.Medias[a]._duration = b
                }
                if (c == "currentTime" && this.Medias[a]._position != null) {
                    this.Medias[a]._position = b
                }
            }
        }
    };
    this.Media = function(d, a, b, c) {
        if (MDHVar_isEMM == true) {
            b(MDHMgr.MDH_PLATFORM_NOT_SUPPORTED);
            return
        }
        if (d == "") {
            b(MDHMgr.MDH_INVALID_ARGUMENT);
            return
        }
        switch (c.mediaType) {
            case MDHDevice.Media.REMOTE_URL:
                this.src = d;
                break;
            case MDHDevice.Media.LOCAL_READONLY:
                this.src = "sandbox://" + d;
                break;
            case MDHDevice.Media.LOCAL_READWRITE:
                this.src = "notsandbox://" + d;
                break
        }
        this.state = MDHDevice.MediaMgr.MEDIA_NONE;
        this.onLoad = a;
        this.onError = b;
        this._duration = -1;
        this._position = -1;
        if (this.src && this.src.length > 0) {
            MDHDevice.MediaMgr.removeMedia(this)
        }
        MDHDevice.MediaMgr.addMedia(this);
        if (this.src != null) {
            MDHMgr.exec("Sound.prepare", a, b, {
                source: this.src,
                backgroundMode: c.backgroundMode
            })
        }
    };
    this.Media.REMOTE_URL = 1;
    this.Media.LOCAL_READONLY = 2;
    this.Media.LOCAL_READWRITE = 3;
    this.Media.prototype.getCurrentPosition = function() {
        if (MDHVar_isEMM == true) {
            return MDHMgr.MDH_PLATFORM_NOT_SUPPORTED
        }
        return this._position
    };
    this.Media.prototype.getDuration = function() {
        if (MDHVar_isEMM == true) {
            return MDHMgr.MDH_PLATFORM_NOT_SUPPORTED
        }
        return this._duration
    };
    this.Media.prototype.play = function() {
        if (MDHVar_isEMM == true) {
            return
        }
        if (this.src != null) {
            MDHMgr.exec("Sound.play", function() {}, function() {}, this.src)
        }
    };
    this.Media.prototype.pause = function() {
        if (MDHVar_isEMM == true) {
            return
        }
        if (this.src != null) {
            MDHMgr.exec("Sound.pause", function() {}, function() {}, this.src)
        }
    };
    this.Media.prototype.stop = function() {
        if (MDHVar_isEMM == true) {
            return
        }
        if (this.src != null) {
            MDHMgr.exec("Sound.stop", function() {}, function() {}, this.src)
        }
    };
    this.Media.prototype.startRecord = function() {
        if (MDHVar_isEMM == true) {
            return
        }
        if (this.src != null) {
            MDHMgr.exec("Sound.startRecord", function() {}, function() {}, this.src)
        }
    };
    this.Media.prototype.stopRecord = function() {
        if (MDHVar_isEMM == true) {
            return
        }
        if (this.src != null) {
            MDHMgr.exec("Sound.stopRecord", function() {}, function() {}, this.src)
        }
    };
    this.Network = new function() {
        this.NOT_REACHABLE = 0;
        this.REACHABLE_VIA_CARRIER_DATA_NETWORK = 1;
        this.REACHABLE_VIA_WIFI_NETWORK = 2;
        this.isReachable = function(a, b, c) {
            if (c.hostName.length < 1) {
                b(MDHMgr.MDH_INVALID_ARGUMENT);
                return
            }
            MDHMgr.exec("Network.isReachable", a, b, c)
        }
    }
};
MDHStorage = new function() {
    this.FileError = function() {
        this.code = null
    };
    this.FileMgr = new function() {
        this.INIT = 0;
        this.PROCESSING = 1;
        this.DONE = 2;
        this.fileReaders = {};
        this.fileWriters = {};
        this._createEvent = function(b, c) {
            var a = {
                type: b
            };
            a.target = c;
            return a
        };
        this.addFileReader = function(b, a) {
            this.fileReaders[b] = a;
            return a
        };
        this.addFileWriter = function(a, b) {
            this.fileWriters[a] = b;
            return b
        };
        this.removeFileReader = function(a) {
            this.fileReaders[a] = null
        };
        this.removeFileWriter = function(a) {
            this.fileWriters[a] = null
        };
        this.reader_onloadstart = function(b) {
            var a = MDHStorage.FileMgr._createEvent("loadstart", this.fileReaders[b]);
            this.fileReaders[b].onloadstart(a)
        };
        this.reader_onprogress = function(c, a) {
            this.fileReaders[c].result = a;
            var b = MDHStorage.FileMgr._createEvent("progress", this.fileReaders[c]);
            this.fileReaders[c].onprogress(b)
        };
        this.reader_onload = function(c, a) {
            this.fileReaders[c].result = a;
            var b = MDHStorage.FileMgr._createEvent("load", this.fileReaders[c]);
            this.fileReaders[c].onload(b)
        };
        this.reader_onerror = function(c, d) {
            var b = new MDHStorage.FileError();
            b.code = d;
            this.fileReaders[c].error = b;
            var a = MDHStorage.FileMgr._createEvent("error", this.fileReaders[c]);
            this.fileReaders[c].onerror(a)
        };
        this.reader_onloadend = function(c, a) {
            this.fileReaders[c].result = a;
            var b = MDHStorage.FileMgr._createEvent("loadend", this.fileReaders[c]);
            this.fileReaders[c].onloadend(b)
        };
        this.writer_onwritestart = function(b) {
            if (this.fileWriters[b].onwritestart != null) {
                var a = MDHStorage.FileMgr._createEvent("loadstart", this.fileWriters[b]);
                this.fileWriters[b].onwritestart()
            }
        };
        this.writer_onerror = function(c, d) {
            var b = new MDHStorage.FileError();
            b.code = d;
            this.fileWriters[c].error = b;
            var a = MDHStorage.FileMgr._createEvent("error", this.fileWriters[c]);
            this.fileWriters[c].onerror(a);
            this.fileWriters[c] = null
        };
        this.writer_oncomplete = function(b, d, e) {
            var c = this.fileWriters[b];
            c.length = e;
            c.position += d;
            var a = MDHStorage.FileMgr._createEvent("writeend", this.fileWriters[b]);
            c.onwriteend(a)
        };
        this.writer_ontruncate = function(c, a) {
            var d = this.fileWriters[c];
            d.length = a;
            d.position = a;
            var b = MDHStorage.FileMgr._createEvent("truncateend", this.fileWriters[c]);
            d.ontruncateend(b)
        }
    };
    this.File = new function() {
        this.getFreeDiskSpace = function(a, b) {
            MDHMgr.exec("File.getFreeDiskSpace", a, b, {})
        };
        this.exists = function(a, c, b) {
            MDHMgr.exec("File.exists", a, c, {
                filepath: b
            })
        };
        this.remove = function(a, b, d) {
            var c = {};
            if (typeof d == "string") {
                c.filepath = d
            } else {
                if (typeof d == "object") {
                    c = d
                }
            }
            MDHStorage.FileMgr.removeFileWriter(c.filepath);
            MDHMgr.exec("File.remove", a, b, c)
        };
        this.list = function(a, b, c) {
            MDHMgr.exec("File.list", a, b, {
                type: c
            })
        };
        this.fileSize = function(a, c, b) {
            MDHMgr.exec("File.fileSize", a, c, {
                filepath: b
            })
        }
    };
    this.FileReader = function(a) {
        this.fileName = a || null;
        this.result;
        this.error = null;
        this.readyState = MDHStorage.FileMgr.DONE;
        this.onloadstart = null;
        this.onprogress = null;
        this.onload = null;
        this.onerror = null;
        this.onloadend = null
    };
    this.FileReader.prototype.abort = function() {
        this.readyState = MDHStorage.FileMgr.DONE;
        this.result;
        var b = new MDHStorage.FileError();
        b.code = MDHMgr.MDH_Storage_ABORT_ERR;
        this.error = b;
        if (MDHVar_isEMM == false) {
            if (typeof this.onerror == "function") {
                var a = MDHStorage.FileMgr._createEvent("error", this);
                this.onerror(a)
            }
            if (typeof this.onabort == "function") {
                var a = MDHStorage.FileMgr._createEvent("abort", this);
                this.onabort(a)
            }
        }
        this.readyState = MDHStorage.FileMgr.DONE;
        if (MDHVar_isEMM == false) {
            if (typeof this.onloadeend == "function") {
                var a = MDHStorage.FileMgr._createEvent("loadend", this);
                this.onloadeend(a)
            }
        }
    };
    this.FileReader.prototype.read = function() {
        return this.readAsText(this.fileName, "UTF-8")
    };
    this.FileReader.prototype.readAsText = function(a, b) {
        this.fileName = a;
        this.readyState = MDHStorage.FileMgr.PROCESSING;
        if (this.fileName && this.fileName.length > 0) {
            MDHStorage.FileMgr.removeFileReader(this.fileName, this)
        }
        MDHStorage.FileMgr.addFileReader(this.fileName, this);
        MDHMgr.exec("File.read", function() {}, function() {}, {
            filepath: this.fileName
        })
    };
    this.FileWriter = function(a) {
        this.fileName = a || null;
        this.position = 0;
        this.length = 0;
        this.error = null;
        this.readyState = MDHStorage.FileMgr.INIT;
        this.onerror = null;
        this.onwritestart = null;
        this.onwriteend = null;
        this.onprogress = null;
        this.onabort = null;
        this.ontruncateend = null;
        if (MDHStorage.FileMgr.fileWriters[a] != null) {
            return MDHStorage.FileMgr.fileWriters[a]
        } else {
            this.fileName = a || null
        }
    };
    this.FileWriter.prototype.abort = function() {
        if (this.readyState != MDHStorage.FileMgr.PROCESSING) {
            throw MDHMgr.MDH_Storage_INVALID_STATE_ERR
        }
        var b = new MDHStorage.FileError();
        b.code = MDHMgr.MDH_Storage_ABORT_ERR;
        this.error = b;
        if (MDHVar_isEMM == false) {
            if (typeof this.onerror == "function") {
                var a = MDHStorage.FileMgr._createEvent("error", this);
                this.onerror(a)
            }
            if (typeof this.onabort == "function") {
                var a = MDHStorage.FileMgr._createEvent("abort", this);
                this.onabort(a)
            }
        }
        this.readyState = MDHStorage.FileMgr.DONE;
        if (MDHVar_isEMM == false) {
            if (typeof this.onwriteend == "function") {
                var a = MDHStorage.FileMgr._createEvent("writeend", this);
                this.onwriteend(a)
            }
        }
    };
    this.FileWriter.prototype.seek = function(a) {
        if (!this.fileName || isNaN(a)) {
            return MDHMgr.MDH_INVALID_ARGUMENT
        }
        if (!MDHStorage.FileMgr.fileWriters[this.fileName]) {
            return MDHMgr.MDH_Storage_NOT_FOUND_ERR
        }
        if (this.readyState == MDHStorage.FileMgr.PROCESSING) {
            throw MDHMgr.MDH_Storage_INVALID_STATE_ERR
        }
        if (a < 0) {
            this.position = Math.max(a + this.length, 0)
        } else {
            if (a > this.length) {
                this.position = this.length
            } else {
                this.position = a
            }
        }
        return this.position
    };
    this.FileWriter.prototype.truncate = function(a) {
        if (this.readyState == MDHStorage.FileMgr.PROCESSING) {
            throw MDHMgr.MDH_Storage_INVALID_STATE_ERR
        }
        this.readyState = MDHStorage.FileMgr.PROCESSING;
        if (this.fileName && this.fileName.length > 0) {
            MDHStorage.FileMgr.removeFileWriter(this.fileName)
        }
        MDHStorage.FileMgr.addFileWriter(this.fileName, this);
        this.readyState = MDHStorage.FileMgr.INIT;
        this.result = null;
        MDHMgr.exec("File.truncate", function() {}, function() {}, {
            filepath: this.fileName,
            offset: a
        })
    };
    this.FileWriter.prototype.write = function(a) {
        return this.writeAsText(this.fileName, a)
    };
    this.FileWriter.prototype.writeAsText = function(b, a) {
        if (this.readyState == MDHStorage.FileMgr.PROCESSING) {
            throw MDHMgr.MDH_Storage_INVALID_STATE_ERR
        }
        this.readyState = MDHStorage.FileMgr.PROCESSING;
        if (this.fileName && this.fileName.length > 0) {
            MDHStorage.FileMgr.removeFileWriter(this.fileName)
        }
        this.fileName = b;
        MDHStorage.FileMgr.addFileWriter(this.fileName, this);
        this.readyState = MDHStorage.FileMgr.INIT;
        this.result = null;
        MDHMgr.exec("File.write", function() {}, function() {}, {
            filepath: this.fileName,
            data: a,
            offset: this.position
        })
    };
    this.FileTransfer = new function() {};
    this.FileTransfer.upload = function(a, b, e, c, d) {
        if (!d) {
            d = {}
        }
        if (!d.params) {
            d.params = {}
        }
        d.fileUrlOrData = e;
        d.serverUrl = c;
        if (!d.fileName) {
            d.fileName = "image.png"
        }
        if (!d.timeout) {
            d.timeout = 60
        }
        if (!d.mimeType) {
            d.mimeType = "image/png"
        }
        if (a && (typeof a != "function")) {
            console.log("FileTransfer Error: successCallback is not a function");
            return
        }
        if (b && (typeof b != "function")) {
            console.log("FileTransfer Error: errorCallback is not a function");
            return
        }
        MDHMgr.exec("FileTransfer.upload", a, b, d)
    };
    this.FileTransfer.download = function(a, b, e, d, c) {
        if (!e) {
            console.log("FileTransfer Error: srcUrl is empty");
            return
        }
        if (!d) {
            d = e.replace(/^.*[\\\/]/, "")
        }
        if (!c) {
            c = {}
        }
        if (!c.dstDir) {
            c.dstDir = "external"
        }
        if (!c.timeout) {
            c.timeout = 30
        }
        if (a && (typeof a != "function")) {
            console.log("FileTransfer Error: successCallback is not a function");
            return
        }
        if (b && (typeof b != "function")) {
            console.log("FileTransfer Error: errorCallback is not a function");
            return
        }
        MDHMgr.exec("FileTransfer.download", a, b, {
            src: e,
            dst: d,
            dstdir: c.dstDir,
            timeout: c.timeout
        })
    };
    this.SecureDB = new function() {
        this.createDB = function(a, b, c) {
            MDHMgr.exec("SecureDB.createDB", a, b, c)
        };
        this.dropDB = function(a, b, c) {
            MDHMgr.exec("SecureDB.dropDB", a, b, c)
        };
        this.closeDB = function(a, b) {
            MDHMgr.exec("SecureDB.closeDB", a, b)
        };
        this.createTable = function(a, b, c) {
            MDHMgr.exec("SecureDB.createTable", a, b, c)
        };
        this.dropTable = function(a, b, c) {
            MDHMgr.exec("SecureDB.dropTable", a, b, c)
        };
        this.insertData = function(a, b, c) {
            MDHMgr.exec("SecureDB.insertData", a, b, c)
        };
        this.updateData = function(a, b, c) {
            MDHMgr.exec("SecureDB.updateData", a, b, c)
        };
        this.queryData = function(a, b, c) {
            MDHMgr.exec("SecureDB.queryData", a, b, c)
        };
        this.deleteData = function(a, b, c) {
            MDHMgr.exec("SecureDB.deleteData", a, b, c)
        };
        this.querySQL = function(a, b, c) {
            MDHMgr.exec("SecureDB.querySQL", a, b, c)
        };
        this.execSQL = function(a, b, c) {
            MDHMgr.exec("SecureDB.execSQL", a, b, c)
        }
    }
};
MDHUtil = new function() {
    this.Barcode = new function() {
        this.decode = function(a, b) {
            MDHMgr.exec("Barcode.decode", a, b)
        };
        this.run = this.decode;
        this.encode = function(a, b, d, c) {
            if (!c) {
                c = new Object()
            }
            if (!c.type) {
                c.type = "QR_CODE"
            }
            if (!c.width) {
                c.width = 400
            }
            c.value = d;
            if (!d || !MDHValidator.isNumber_ge(0, c.width)) {
                b(MDHMgr.MDH_INVALID_ARGUMENT);
                return
            }
            MDHMgr.exec("Barcode.encode", a, b, c)
        }
    };
    this.Browser = new function() {
        this.startLoadingBar = function() {
            if (typeof arguments[0] != "function" && arguments.length == 1) {
                MDHMgr.exec("Browser.startLoadingBar", function() {}, function() {}, arguments[0])
            } else {
                if (typeof arguments[0] == "function" && typeof arguments[1] != "function" && arguments.length == 2) {
                    MDHMgr.exec("Browser.startLoadingBar", arguments[0], function() {}, arguments[1])
                } else {
                    if (typeof arguments[0] == "function" && typeof arguments[1] == "function" && typeof arguments[2] != "function" && arguments.length == 3) {
                        MDHMgr.exec("Browser.startLoadingBar", arguments[0], arguments[1], arguments[2])
                    }
                }
            }
        };
        this.stopLoadingBar = function() {
            MDHMgr.exec("Browser.stopLoadingBar", function() {}, function() {}, {})
        };
        this.clearHistory = function() {
            MDHMgr.exec("Browser.clearHistory", function() {}, function() {}, {})
        };
        this.SENSOR_ON = 1;
        this.SENSOR_OFF = 2;
        this.LANDSCAPE = 3;
        this.PORTRAIT = 4;
        this.setOrientation = function(a, b, c) {
            MDHMgr.exec("Browser.setOrientation", a, b, c)
        };
        this.getOrientation = function(a, b) {
            MDHMgr.exec("Browser.getOrientation", a, b, {})
        };
        this.ORIENT_UNKNOWN = 0;
        this.ORIENT_PORTRAIT = 1;
        this.ORIENT_PORTRAITUP = 2;
        this.ORIENT_LANDSCAPELEFT = 3;
        this.ORIENT_LANDSCAPERIGHT = 4;
        this.ORIENT_FACEUP = 5;
        this.ORIENT_FACEDOWN = 6;
        this.getCurrentOrientation = function(a) {
            MDHMgr.exec("Browser.getCurrentOrientation", a, function() {}, {})
        };
        this.getFontSize = function(a, b) {
            MDHMgr.exec("Browser.getFontSize", a, b, {})
        };
        this.clearCache = function() {
            MDHMgr.exec("Browser.clearCache", function() {}, function() {}, {})
        };
        this.START_LAUNCHER = 1;
        this.NO_ACTION = 0;
        this.terminateApp = function(a) {
            if (a) {
                MDHMgr.exec("Browser.terminateApp", function() {}, function() {}, {
                    "with": a
                })
            } else {
                MDHMgr.exec("Browser.terminateApp2", function() {}, function() {}, {})
            }
        };
        this.setLocation = function(a) {
            if (MDHMgr.device.platform == "iOS") {
                MDHMgr.exec("Browser.setLocation", function() {}, function() {}, {
                    href: a
                })
            } else {
                window.location = a
            }
        }
    };
    this._PushTarget = function() {
        this._listeners = {}
    };
    this._PushTarget.prototype = {
        constructor: this._PushTarget,
        getregid: function(a, b) {
            MDHMgr.exec("Push.getRegId", a, b)
        },
        delregid: function(a, b) {
            MDHMgr.exec("Push.delRegId", a, b)
        },
        testsend: function(a, b, c) {
            MDHMgr.exec("Push.testSendMessage", a, b, c)
        },
        addListener: function(a, b) {
            if (typeof this._listeners[a] == "undefined") {
                this._listeners[a] = []
            }
            this._listeners[a].push(b);
            MDHMgr.exec("Push.setListener", function() {}, function() {}, {
                type: a
            })
        },
        fire: function(d) {
            if (typeof d == "string") {
                d = {
                    type: d
                }
            }
            if (!d.target) {
                d.target = this
            }
            if (!d.type) {
                throw new Error("Event object missing 'type' property.")
            }
            if (this._listeners[d.type] instanceof Array) {
                var c = this._listeners[d.type];
                for (var b = 0, a = c.length; b < a; b++) {
                    c[b].call(this, d)
                }
            }
        },
        removeListener: function(d, e) {
            if (this._listeners[d] instanceof Array) {
                var c = this._listeners[d];
                for (var b = 0, a = c.length; b < a; b++) {
                    if (c[b] === e) {
                        c.splice(b, 1);
                        break
                    }
                }
                if (c.length == 0) {
                    MDHMgr.exec("Push.removeListener", function() {}, function() {}, {
                        type: d
                    })
                }
            }
        }
    };
    this.Push = new this._PushTarget();
    this.AR = new function() {
        this.show = function(a, b, c) {
            MDHMgr.exec("AR.show", a, b, c)
        }
    };
    this.SignPad = new function() {
        this.start = function(a, b, c) {
            MDHMgr.exec("SignPad.start", a, b, c)
        }
    }
};
MDHInfo = new function() {
    this.Device = new function() {
        this.getDeviceInfo = function(a, b) {
            MDHMgr.exec("Device.getDeviceInfo", a, b, {})
        };
        this.getLanguage = function(a, b) {
            MDHMgr.exec("Device.getLanguage", a, b, {})
        };
        this.NONE = 0;
        this.CARRIER_DATA = 1;
        this.WIFI = 2;
        this.getNetworkInfo = function(a, b) {
            MDHMgr.exec("Device.getNetworkInfo", a, b, {})
        };
        this.getStorageInfo = function(a, b) {
            MDHMgr.exec("Device.getStorageInfo", a, b, {})
        };
        this.getBatteryInfo = function(a, b) {
            MDHMgr.exec("Device.getBatteryInfo", a, b, {})
        };
        this.getDisplayInfo = function(a, b) {
            if (MDHMgr.device.platform == "android") {
                MDHMgr.exec("Device.getDisplayInfo", a, b, {})
            } else {
                b(MDHMgr.MDH_Device_NOT_SUPPORT)
            }
        }
    };
    this.Platform = new function() {
        this.getVersions = function(a, b) {
            MDHMgr.exec("Platform.getVersions", a, b, {})
        };
        this.isEMM = function(a, b) {
            MDHMgr.exec("Platform.isEMM", a, b, {})
        }
    };
    this.MDMInfo = new function() {
        this.getMDMInfo = function(a, b) {
            if (MDHMgr.device.platform == "iOS") {
                a({
                    isEnableCamera: true,
                    isEnableVoiceRecord: true
                });
                return
            }
            MDHMgr.exec("MDMInfo.getMDMInfo", a, b)
        }
    }
};
MDHUI = new function() {
    this.start = function(a, b, c) {
        if (c.removeAll == "true") {
            MDHBasic.Event.removeListenerAll("touch.button")
        }
        MDHUI.UIMgr._onSuccess = a;
        MDHUI.UIMgr._onError = b;
        MDHMgr.exec("UI.start", function() {}, function() {}, c, true)
    };
    this.end = function() {
        MDHMgr.exec("UI.end", MDHUI.UIMgr._onSuccess, MDHUI.UIMgr._onError, {}, true)
    };
    this.createContainer = function(b) {
        var a = new MDHUI.Container();
        a.create(MDHUI.UIMgr._onSuccess, MDHUI.UIMgr._onError, b);
        return a
    };
    this.createButton = function(b) {
        var a = new MDHUI.Component(MDHUI.UIMgr.UICOMPTYPE_BUTTON);
        a.create(MDHUI.UIMgr._onSuccess, MDHUI.UIMgr._onError, b);
        return a
    };
    this.createLabel = function(b) {
        var a = new MDHUI.Component(MDHUI.UIMgr.UICOMPTYPE_LABEL);
        a.create(MDHUI.UIMgr._onSuccess, MDHUI.UIMgr._onError, b);
        return a
    };
    this.createImageView = function(b) {
        var a = new MDHUI.Component(MDHUI.UIMgr.UICOMPTYPE_IMAGEVIEW);
        a.create(MDHUI.UIMgr._onSuccess, MDHUI.UIMgr._onError, b);
        return a
    };
    this.setWebContentView = function() {
        var a = {},
            b, c;
        if (typeof arguments[0] === "object") {
            a = arguments[0];
            b = MDHUI.UIMgr._onSuccess;
            c = MDHUI.UIMgr._onError
        } else {
            if (typeof arguments[0] === "function" || typeof arguments[1] === "function") {
                b = arguments[0];
                c = arguments[1];
                a = arguments[2]
            } else {
                c("invalid argements");
                return
            }
        }
        MDHMgr.exec("UI.setWebContentView", b, c, a, true)
    };
    this.UIMgr = new function() {
        this.countUiId = 0;
        this._onSuccess = {};
        this._onError = {};
        this.UITYPE_NONE = 0;
        this.UITYPE_CONTAINER = 1;
        this.UITYPE_COMPONENT = 2;
        this.UICOMPTYPE_NONE = 10;
        this.UICOMPTYPE_BUTTON = 11;
        this.UICOMPTYPE_LABEL = 12;
        this.UICOMPTYPE_IMAGEVIEW = 13;
        this.fireCallback = function(b, a) {};
        this.createUiId = function() {
            return this.countUiId++
        }
    };
    this.Container = function() {
        this._uiType = MDHUI.UIMgr.UITYPE_CONTAINER;
        this.uiId = MDHUI.UIMgr.createUiId()
    };
    this.Container.prototype.create = function(a, b, c) {
        for (var d in c) {
            this[d] = c[d]
        }
        c._uiType = this._uiType;
        c.uiId = this.uiId;
        MDHMgr.exec("UI.createContainer", a, b, c, true)
    };
    this.Container.prototype.remove = function() {
        var a = {};
        a.uiId = this.uiId;
        MDHMgr.exec("UI.removeContainer", MDHUI.UIMgr._onSuccess, MDHUI.UIMgr._onError, a, true)
    };
    this.Container.prototype.addContainer = function(b) {
        var a = {};
        a.pUiId = this.uiId;
        a.uiId = b.uiId;
        MDHMgr.exec("UI.addContainer", MDHUI.UIMgr._onSuccess, MDHUI.UIMgr._onError, a, true)
    };
    this.Container.prototype.addComponent = function(b) {
        var a = {};
        a.pUiId = this.uiId;
        a.uiId = b.uiId;
        MDHMgr.exec("UI.addComponent", MDHUI.UIMgr._onSuccess, MDHUI.UIMgr._onError, a, true)
    };
    this.Container.prototype.setAttribute = function() {
        var a = {},
            c, d;
        if (typeof arguments[0] === "object") {
            a = arguments[0];
            c = MDHUI.UIMgr._onSuccess;
            d = MDHUI.UIMgr._onError
        } else {
            if (typeof arguments[0] === "function" || typeof arguments[1] === "function") {
                c = arguments[0];
                d = arguments[1];
                a = arguments[2]
            } else {
                d("invalid argements");
                return
            }
        }
        for (var b in a) {
            this[b] = a[b]
        }
        a._uiType = this._uiType;
        a.uiId = this.uiId;
        MDHMgr.exec("UI.setAttribute", c, d, a, true)
    };
    this.Component = function(a) {
        this._uiType = MDHUI.UIMgr.UITYPE_COMPONENT;
        this.uiId = MDHUI.UIMgr.createUiId();
        this._uiCompType = a;
        this._touchListener = null
    };
    this.Component.prototype.create = function(a, b, c) {
        this.text = "";
        for (var d in c) {
            this[d] = c[d]
        }
        c._uiType = this._uiType;
        c.uiId = this.uiId;
        c._uiCompType = this._uiCompType;
        MDHMgr.exec("UI.createComponent", a, b, c, true)
    };
    this.Component.prototype.remove = function() {
        if (this._uiCompType == MDHUI.UIMgr.UICOMPTYPE_BUTTON) {
            this.removeListener("touch")
        } else {
            console.log("This component has NOT callback")
        }
        var a = {};
        a.uiId = this.uiId;
        MDHMgr.exec("UI.removeComponent", MDHUI.UIMgr._onSuccess, MDHUI.UIMgr._onError, a, true)
    };
    this.Component.prototype.addListener = function(b, a) {
        if (this._uiCompType == MDHUI.UIMgr.UICOMPTYPE_BUTTON) {
            if (b == "touch") {
                this._touchListener = a;
                MDHBasic.Event.addListener("touch.button." + this.uiId, a)
            } else {
                alert("This component is NOT supported")
            }
        } else {
            alert("This component is NOT supported")
        }
    };
    this.Component.prototype.removeListener = function(a) {
        if (this._uiCompType == MDHUI.UIMgr.UICOMPTYPE_BUTTON) {
            if (a == "touch") {
                MDHBasic.Event.removeListener("touch.button." + this.uiId, this._touchListener);
                this._touchListener = null
            } else {
                alert("This component is NOT supported")
            }
        } else {
            alert("This component is NOT supported")
        }
    };
    this.Component.prototype.setAttribute = function() {
        var a = {},
            c, d;
        if (typeof arguments[0] === "object") {
            a = arguments[0];
            c = MDHUI.UIMgr._onSuccess;
            d = MDHUI.UIMgr._onError
        } else {
            if (typeof arguments[0] === "function" || typeof arguments[1] === "function") {
                c = arguments[0];
                d = arguments[1];
                a = arguments[2]
            } else {
                d("invalid argements");
                return
            }
        }
        if (this._uiCompType == MDHUI.UIMgr.UICOMPTYPE_BUTTON) {
            for (var b in a) {
                this[b] = a[b]
            }
            a._uiType = this._uiType;
            a.uiId = this.uiId;
            a._uiCompType = this._uiCompType;
            MDHMgr.exec("UI.setAttribute", c, d, a, true)
        } else {
            if (this._uiCompType == MDHUI.UIMgr.UICOMPTYPE_LABEL) {
                for (var b in a) {
                    this[b] = a[b]
                }
                a._uiType = this._uiType;
                a.uiId = this.uiId;
                a._uiCompType = this._uiCompType;
                MDHMgr.exec("UI.setAttribute", c, d, a, true)
            } else {
                if (this._uiCompType == MDHUI.UIMgr.UICOMPTYPE_IMAGEVIEW) {
                    for (var b in a) {
                        this[b] = a[b]
                    }
                    a._uiType = this._uiType;
                    a.uiId = this.uiId;
                    a._uiCompType = this._uiCompType;
                    MDHMgr.exec("UI.setAttribute", c, d, a, true)
                }
            }
        }
    };
    this.Component.prototype.setPressed = function(a) {
        if (this._uiCompType == MDHUI.UIMgr.UICOMPTYPE_BUTTON) {} else {
            alert("This component is NOT supported")
        }
    }
};
window.MDHConfig = window.MDHConfig || {};
if (navigator.userAgent.toLowerCase().indexOf("windows phone") != -1) {
    MDHConfig.fixedToolbarMode = "web"
}
MDHConfig.checkMode = function() {
    if (MDHMgr.device.platform == "virtual") {
        MDHConfig.fixedToolbarMode = "web"
    } else {
        if (!MDHConfig.fixedToolbarMode || (MDHConfig.fixedToolbarMode !== "none" && MDHConfig.fixedToolbarMode !== "web")) {
            MDHConfig.fixedToolbarMode = "native"
        }
    }
};
console.log("END to load MDHAdapter.js");
console.log("START to check EMM Mode");
var MDHVar_isEMM = false;
MDHInfo.Platform.isEMM(function(a) {
    if (a == "true") {
        MDHVar_isEMM = true;
        _setEMMInvalidFunction()
    } else {
        MDHVar_isEMM = false
    }
}, function(a) {
    MDHVar_isEMM = false
});

function _setEMMInvalidFunction() {
    if (MDHDevice.Media != undefined) {}
    if (MDHStorage.FileTransfer != undefined) {
        MDHStorage.FileTransfer.upload = function(a, b, e, c, d) {
            b(MDHMgr.MDH_PLATFORM_NOT_SUPPORTED);
            return
        };
        MDHStorage.FileTransfer.download = function(a, b, e, d, c) {
            b(MDHMgr.MDH_PLATFORM_NOT_SUPPORTED);
            return
        }
    }
    if (MDHUtil.AR != undefined) {
        MDHUtil.AR.show = function(a, b, c) {
            b(MDHMgr.MDH_PLATFORM_NOT_SUPPORTED);
            return
        }
    }
    if (MDHUtil.Push != undefined) {
        MDHUtil.Push.getregid = function(a, b) {
            b(MDHMgr.MDH_PLATFORM_NOT_SUPPORTED);
            return
        };
        MDHUtil.Push.delregid = function(a, b) {
            b(MDHMgr.MDH_PLATFORM_NOT_SUPPORTED);
            return
        };
        MDHUtil.Push.testsend = function(a, b, c) {
            b(MDHMgr.MDH_PLATFORM_NOT_SUPPORTED);
            return
        };
        MDHUtil.Push.addListener = function(a, b) {
            return
        };
        MDHUtil.Push.fire = function(a) {
            return
        };
        MDHUtil.Push.removeListener = function(a, b) {
            return
        }
    }
    if (MDHStorage.FileMgr != undefined) {
        MDHStorage.FileMgr.reader_onprogress = function(b, a) {
            return
        };
        MDHStorage.FileMgr.reader_onloadend = function(b, a) {
            return
        }
    }
}
console.log("END to check EMM Mode");
if ((typeof MDHBasic === "object") && (typeof MDHBasic.SEMP === "undefined") && (typeof MDHBasic.VPN === "undefined") && (typeof MDHBasic.SEMPLog === "undefined") && (typeof MDHBasic.SEMPProvision == "undefined") && (typeof MDHBasic.EMMConnector == "undefined")) {
    MDHBasic.SEMP = new function() {
        this.request = function(a, b, c) {
            if (window.MDHVar_isEMM == true) {
                b(MDHMgr.MDH_PLATFORM_NOT_SUPPORTED);
                return
            } else {
                MDHMgr.exec("SEMP.request", a, b, c)
            }
        };
        this.fileUpload = function(a, b, c) {
            if (window.MDHVar_isEMM == true) {
                b(MDHMgr.MDH_PLATFORM_NOT_SUPPORTED);
                return
            } else {
                MDHMgr.exec("SEMP.fileUploadRequest", a, b, c)
            }
        };
        this.fileUploadCancel = function(a, b, c) {
            if (window.MDHVar_isEMM == true) {
                b(MDHMgr.MDH_PLATFORM_NOT_SUPPORTED);
                return
            } else {
                MDHMgr.exec("SEMP.fileUploadCancelRequest", a, b, c)
            }
        }
    };
    MDHBasic.VPN = new function() {
        this.initialize = function(a, b, c) {
            MDHMgr.exec("VPN.initialize", a, b, c)
        };
        this.prepare = function(a, b, c) {
            MDHMgr.exec("VPN.prepare", a, b, c)
        };
        this.connect = function(a, b, c) {
            MDHMgr.exec("VPN.connect", a, b, c)
        };
        this.checkStatus = function(a, b, c) {
            MDHMgr.exec("VPN.checkStatus", a, b, c)
        };
        this.disconnect = function(a, b, c) {
            MDHMgr.exec("VPN.disconnect", a, b, c)
        };
        this.AutoReconnect = function(a, b, c) {
            MDHMgr.exec("VPN.AutoReconnect", a, b, c)
        };
        this.IsKeepConnection = function(a, b, c) {
            MDHMgr.exec("VPN.IsKeepConnection", a, b, c)
        };
        this.IsConnected = function(a, b, c) {
            MDHMgr.exec("VPN.IsConnected", a, b, c)
        };
        this.IsExistKeyPairs = function(a, b, c) {
            MDHMgr.exec("VPN.IsExistKeyPairs", a, b, c)
        };
        this.IsProvised = function(a, b, c) {
            MDHMgr.exec("VPN.IsProvised", a, b, c)
        };
        this.setKeepAliveDuration = function(a, b, c) {
            MDHMgr.exec("VPN.setKeepAliveDuration", a, b, c)
        };
        this.SMVPN_CTX_DEPEND_ON_SERVER = 0;
        this.SMVPN_CTX_ARIA_128_CBC = 1;
        this.SMVPN_CTX_ARIA_192_CBC = 2;
        this.SMVPN_CTX_ARIA_256_CBC = 3;
        this.SMVPN_CTX_SEED_CBC = 4;
        this.SMVPN_CTX_AES_128_CBC = 5;
        this.SMVPN_CTX_AES_192_CBC = 6;
        this.SMVPN_CTX_AES_256_CBC = 7;
        this.SMVPN_CTX_3DES_CBC = 8;
        this.setCryptoMethod = function(a, b, c) {
            MDHMgr.exec("VPN.setCryptoMethod", a, b, c)
        };
        this.setSessionCheckDuration = function(a, b, c) {
            MDHMgr.exec("VPN.setSessionCheckDuration", a, b, c)
        }
    };
    MDHBasic.SEMPLog = new function() {
        this.transferFile = function(a, b, c) {
            if (window.MDHVar_isEMM == true) {
                b(MDHMgr.MDH_PLATFORM_NOT_SUPPORTED);
                return
            } else {
                MDHMgr.exec("SEMPLog.transferFile", a, b, c)
            }
        }
    };
    MDHBasic.SEMPProvision = new function() {
        this.provision = function(a, b, c) {
            if (window.MDHVar_isEMM == true) {
                b(MDHMgr.MDH_PLATFORM_NOT_SUPPORTED);
                return
            } else {
                MDHMgr.exec("SEMPProvision.provision", a, b, c)
            }
        };
        this.initProvision = function(a, b, c) {
            if (window.MDHVar_isEMM == true) {
                b(MDHMgr.MDH_PLATFORM_NOT_SUPPORTED);
                return
            } else {
                MDHMgr.exec("SEMPProvision.initProvision", a, b, c)
            }
        }
    };
    MDHBasic.EMMConnector = new function() {
        this.request = function(a, b, c) {
            MDHMgr.exec("EMMConnector.request", a, b, c)
        };
        this.fileUpload = function(a, b, c) {
            MDHMgr.exec("EMMConnector.fileUploadRequest", a, b, c)
        };
        this.fileUploadCancel = function(a, b, c) {
            MDHMgr.exec("EMMConnector.fileUploadCancelRequest", a, b, c)
        }
    }
}
if ((typeof MDHBasic === "object") && (typeof MDHBasic.Attachment != "object")) {
    MDHBasic.Attachment = new function() {
        this.load = function(a, b, c) {
            if (!c || !MDHValidator.isNumber_ge(0, c.port)) {
                b(MDHMgr.MDH_INVALID_ARGUMENT);
                return
            }
            MDHMgr.exec("Attachment.load", a, b, c)
        };
        this.loadTablet = function(b, c, d) {
            if (!d || !MDHValidator.isNumber_ge(0, d.port)) {
                c(MDHMgr.MDH_INVALID_ARGUMENT);
                return
            }
            var a = MDHMgr.device.platform;
            if (a == "iOS") {
                c(MDHMgr.MDH_Device_NOT_SUPPORT);
                return
            }
            MDHMgr.exec("Attachment.loadTablet", b, c, d)
        }
    }
};