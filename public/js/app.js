/*! For license information please see app.js.LICENSE.txt  */
(() => {
    var t, e = {
            669: (t, e, n) => { t.exports = n(609) },
            448: (t, e, n) => {
                "use strict";
                var r = n(867),
                    o = n(26),
                    i = n(372),
                    a = n(327),
                    u = n(97),
                    l = n(109),
                    s = n(985),
                    c = n(61);
                t.exports = function(t) {
                    return new Promise((function(e, n) {
                        var f = t.data,
                            h = t.headers,
                            p = t.responseType;
                        r.isFormData(f) && delete h["Content-Type"];
                        var d = new XMLHttpRequest;
                        if (t.auth) {
                            var y = t.auth.username || "",
                                v = t.auth.password ? unescape(encodeURIComponent(t.auth.password)) : "";
                            h.Authorization = "Basic " + btoa(y + ":" + v)
                        }
                        var g = u(t.baseURL, t.url);

                        function b() {
                            if (d) {
                                var r = "getAllResponseHeaders" in d ? l(d.getAllResponseHeaders()) : null,
                                    i = { data: p && "text" !== p && "json" !== p ? d.response : d.responseText, status: d.status, statusText: d.statusText, headers: r, config: t, request: d };
                                o(e, n, i), d = null
                            }
                        }
                        if (d.open(t.method.toUpperCase(), a(g, t.params, t.paramsSerializer), !0), d.timeout = t.timeout, "onloadend" in d ? d.onloadend = b : d.onreadystatechange = function() { d && 4 === d.readyState && (0 !== d.status || d.responseURL && 0 === d.responseURL.indexOf("file:")) && setTimeout(b) }, d.onabort = function() { d && (n(c("Request aborted", t, "ECONNABORTED", d)), d = null) }, d.onerror = function() { n(c("Network Error", t, null, d)), d = null }, d.ontimeout = function() {
                                var e = "timeout of " + t.timeout + "ms exceeded";
                                t.timeoutErrorMessage && (e = t.timeoutErrorMessage), n(c(e, t, t.transitional && t.transitional.clarifyTimeoutError ? "ETIMEDOUT" : "ECONNABORTED", d)), d = null
                            }, r.isStandardBrowserEnv()) {
                            var m = (t.withCredentials || s(g)) && t.xsrfCookieName ? i.read(t.xsrfCookieName) : void 0;
                            m && (h[t.xsrfHeaderName] = m)
                        }
                        "setRequestHeader" in d && r.forEach(h, (function(t, e) { void 0 === f && "content-type" === e.toLowerCase() ? delete h[e] : d.setRequestHeader(e, t) })), r.isUndefined(t.withCredentials) || (d.withCredentials = !!t.withCredentials), p && "json" !== p && (d.responseType = t.responseType), "function" == typeof t.onDownloadProgress && d.addEventListener("progress", t.onDownloadProgress), "function" == typeof t.onUploadProgress && d.upload && d.upload.addEventListener("progress", t.onUploadProgress), t.cancelToken && t.cancelToken.promise.then((function(t) { d && (d.abort(), n(t), d = null) })), f || (f = null), d.send(f)
                    }))
                }
            },
            609: (t, e, n) => {
                "use strict";
                var r = n(867),
                    o = n(849),
                    i = n(321),
                    a = n(185);

                function u(t) {
                    var e = new i(t),
                        n = o(i.prototype.request, e);
                    return r.extend(n, i.prototype, e), r.extend(n, e), n
                }
                var l = u(n(655));
                l.Axios = i, l.create = function(t) { return u(a(l.defaults, t)) }, l.Cancel = n(263), l.CancelToken = n(972), l.isCancel = n(502), l.all = function(t) { return Promise.all(t) }, l.spread = n(713), l.isAxiosError = n(268), t.exports = l, t.exports.default = l
            },
            263: t => {
                "use strict";

                function e(t) { this.message = t }
                e.prototype.toString = function() { return "Cancel" + (this.message ? ": " + this.message : "") }, e.prototype.__CANCEL__ = !0, t.exports = e
            },
            972: (t, e, n) => {
                "use strict";
                var r = n(263);

                function o(t) {
                    if ("function" != typeof t) throw new TypeError("executor must be a function.");
                    var e;
                    this.promise = new Promise((function(t) { e = t }));
                    var n = this;
                    t((function(t) { n.reason || (n.reason = new r(t), e(n.reason)) }))
                }
                o.prototype.throwIfRequested = function() { if (this.reason) throw this.reason }, o.source = function() { var t; return { token: new o((function(e) { t = e })), cancel: t } }, t.exports = o
            },
            502: t => {
                "use strict";
                t.exports = function(t) { return !(!t || !t.__CANCEL__) }
            },
            321: (t, e, n) => {
                "use strict";
                var r = n(867),
                    o = n(327),
                    i = n(782),
                    a = n(572),
                    u = n(185),
                    l = n(875),
                    s = l.validators;

                function c(t) { this.defaults = t, this.interceptors = { request: new i, response: new i } }
                c.prototype.request = function(t) {
                    "string" == typeof t ? (t = arguments[1] || {}).url = arguments[0] : t = t || {}, (t = u(this.defaults, t)).method ? t.method = t.method.toLowerCase() : this.defaults.method ? t.method = this.defaults.method.toLowerCase() : t.method = "get";
                    var e = t.transitional;
                    void 0 !== e && l.assertOptions(e, { silentJSONParsing: s.transitional(s.boolean, "1.0.0"), forcedJSONParsing: s.transitional(s.boolean, "1.0.0"), clarifyTimeoutError: s.transitional(s.boolean, "1.0.0") }, !1);
                    var n = [],
                        r = !0;
                    this.interceptors.request.forEach((function(e) { "function" == typeof e.runWhen && !1 === e.runWhen(t) || (r = r && e.synchronous, n.unshift(e.fulfilled, e.rejected)) }));
                    var o, i = [];
                    if (this.interceptors.response.forEach((function(t) { i.push(t.fulfilled, t.rejected) })), !r) { var c = [a, void 0]; for (Array.prototype.unshift.apply(c, n), c = c.concat(i), o = Promise.resolve(t); c.length;) o = o.then(c.shift(), c.shift()); return o }
                    for (var f = t; n.length;) {
                        var h = n.shift(),
                            p = n.shift();
                        try { f = h(f) } catch (t) { p(t); break }
                    }
                    try { o = a(f) } catch (t) { return Promise.reject(t) }
                    for (; i.length;) o = o.then(i.shift(), i.shift());
                    return o
                }, c.prototype.getUri = function(t) { return t = u(this.defaults, t), o(t.url, t.params, t.paramsSerializer).replace(/^\?/, "") }, r.forEach(["delete", "get", "head", "options"], (function(t) { c.prototype[t] = function(e, n) { return this.request(u(n || {}, { method: t, url: e, data: (n || {}).data })) } })), r.forEach(["post", "put", "patch"], (function(t) { c.prototype[t] = function(e, n, r) { return this.request(u(r || {}, { method: t, url: e, data: n })) } })), t.exports = c
            },
            782: (t, e, n) => {
                "use strict";
                var r = n(867);

                function o() { this.handlers = [] }
                o.prototype.use = function(t, e, n) { return this.handlers.push({ fulfilled: t, rejected: e, synchronous: !!n && n.synchronous, runWhen: n ? n.runWhen : null }), this.handlers.length - 1 }, o.prototype.eject = function(t) { this.handlers[t] && (this.handlers[t] = null) }, o.prototype.forEach = function(t) { r.forEach(this.handlers, (function(e) { null !== e && t(e) })) }, t.exports = o
            },
            97: (t, e, n) => {
                "use strict";
                var r = n(793),
                    o = n(303);
                t.exports = function(t, e) { return t && !r(e) ? o(t, e) : e }
            },
            61: (t, e, n) => {
                "use strict";
                var r = n(481);
                t.exports = function(t, e, n, o, i) { var a = new Error(t); return r(a, e, n, o, i) }
            },
            572: (t, e, n) => {
                "use strict";
                var r = n(867),
                    o = n(527),
                    i = n(502),
                    a = n(655);

                function u(t) { t.cancelToken && t.cancelToken.throwIfRequested() }
                t.exports = function(t) { return u(t), t.headers = t.headers || {}, t.data = o.call(t, t.data, t.headers, t.transformRequest), t.headers = r.merge(t.headers.common || {}, t.headers[t.method] || {}, t.headers), r.forEach(["delete", "get", "head", "post", "put", "patch", "common"], (function(e) { delete t.headers[e] })), (t.adapter || a.adapter)(t).then((function(e) { return u(t), e.data = o.call(t, e.data, e.headers, t.transformResponse), e }), (function(e) { return i(e) || (u(t), e && e.response && (e.response.data = o.call(t, e.response.data, e.response.headers, t.transformResponse))), Promise.reject(e) })) }
            },
            481: t => {
                "use strict";
                t.exports = function(t, e, n, r, o) { return t.config = e, n && (t.code = n), t.request = r, t.response = o, t.isAxiosError = !0, t.toJSON = function() { return { message: this.message, name: this.name, description: this.description, number: this.number, fileName: this.fileName, lineNumber: this.lineNumber, columnNumber: this.columnNumber, stack: this.stack, config: this.config, code: this.code } }, t }
            },
            185: (t, e, n) => {
                "use strict";
                var r = n(867);
                t.exports = function(t, e) {
                    e = e || {};
                    var n = {},
                        o = ["url", "method", "data"],
                        i = ["headers", "auth", "proxy", "params"],
                        a = ["baseURL", "transformRequest", "transformResponse", "paramsSerializer", "timeout", "timeoutMessage", "withCredentials", "adapter", "responseType", "xsrfCookieName", "xsrfHeaderName", "onUploadProgress", "onDownloadProgress", "decompress", "maxContentLength", "maxBodyLength", "maxRedirects", "transport", "httpAgent", "httpsAgent", "cancelToken", "socketPath", "responseEncoding"],
                        u = ["validateStatus"];

                    function l(t, e) { return r.isPlainObject(t) && r.isPlainObject(e) ? r.merge(t, e) : r.isPlainObject(e) ? r.merge({}, e) : r.isArray(e) ? e.slice() : e }

                    function s(o) { r.isUndefined(e[o]) ? r.isUndefined(t[o]) || (n[o] = l(void 0, t[o])) : n[o] = l(t[o], e[o]) }
                    r.forEach(o, (function(t) { r.isUndefined(e[t]) || (n[t] = l(void 0, e[t])) })), r.forEach(i, s), r.forEach(a, (function(o) { r.isUndefined(e[o]) ? r.isUndefined(t[o]) || (n[o] = l(void 0, t[o])) : n[o] = l(void 0, e[o]) })), r.forEach(u, (function(r) { r in e ? n[r] = l(t[r], e[r]) : r in t && (n[r] = l(void 0, t[r])) }));
                    var c = o.concat(i).concat(a).concat(u),
                        f = Object.keys(t).concat(Object.keys(e)).filter((function(t) { return -1 === c.indexOf(t) }));
                    return r.forEach(f, s), n
                }
            },
            26: (t, e, n) => {
                "use strict";
                var r = n(61);
                t.exports = function(t, e, n) {
                    var o = n.config.validateStatus;
                    n.status && o && !o(n.status) ? e(r("Request failed with status code " + n.status, n.config, null, n.request, n)) : t(n)
                }
            },
            527: (t, e, n) => {
                "use strict";
                var r = n(867),
                    o = n(655);
                t.exports = function(t, e, n) { var i = this || o; return r.forEach(n, (function(n) { t = n.call(i, t, e) })), t }
            },
            655: (t, e, n) => {
                "use strict";
                var r = n(155),
                    o = n(867),
                    i = n(16),
                    a = n(481),
                    u = { "Content-Type": "application/x-www-form-urlencoded" };

                function l(t, e) {!o.isUndefined(t) && o.isUndefined(t["Content-Type"]) && (t["Content-Type"] = e) }
                var s, c = {
                    transitional: { silentJSONParsing: !0, forcedJSONParsing: !0, clarifyTimeoutError: !1 },
                    adapter: (("undefined" != typeof XMLHttpRequest || void 0 !== r && "[object process]" === Object.prototype.toString.call(r)) && (s = n(448)), s),
                    transformRequest: [function(t, e) {
                        return i(e, "Accept"), i(e, "Content-Type"), o.isFormData(t) || o.isArrayBuffer(t) || o.isBuffer(t) || o.isStream(t) || o.isFile(t) || o.isBlob(t) ? t : o.isArrayBufferView(t) ? t.buffer : o.isURLSearchParams(t) ? (l(e, "application/x-www-form-urlencoded;charset=utf-8"), t.toString()) : o.isObject(t) || e && "application/json" === e["Content-Type"] ? (l(e, "application/json"), function(t, e, n) {
                            if (o.isString(t)) try { return (e || JSON.parse)(t), o.trim(t) } catch (t) { if ("SyntaxError" !== t.name) throw t }
                            return (n || JSON.stringify)(t)
                        }(t)) : t
                    }],
                    transformResponse: [function(t) {
                        var e = this.transitional,
                            n = e && e.silentJSONParsing,
                            r = e && e.forcedJSONParsing,
                            i = !n && "json" === this.responseType;
                        if (i || r && o.isString(t) && t.length) try { return JSON.parse(t) } catch (t) { if (i) { if ("SyntaxError" === t.name) throw a(t, this, "E_JSON_PARSE"); throw t } }
                        return t
                    }],
                    timeout: 0,
                    xsrfCookieName: "XSRF-TOKEN",
                    xsrfHeaderName: "X-XSRF-TOKEN",
                    maxContentLength: -1,
                    maxBodyLength: -1,
                    validateStatus: function(t) { return t >= 200 && t < 300 }
                };
                c.headers = { common: { Accept: "application/json, text/plain, */*" } }, o.forEach(["delete", "get", "head"], (function(t) { c.headers[t] = {} })), o.forEach(["post", "put", "patch"], (function(t) { c.headers[t] = o.merge(u) })), t.exports = c
            },
            849: t => {
                "use strict";
                t.exports = function(t, e) { return function() { for (var n = new Array(arguments.length), r = 0; r < n.length; r++) n[r] = arguments[r]; return t.apply(e, n) } }
            },
            327: (t, e, n) => {
                "use strict";
                var r = n(867);

                function o(t) { return encodeURIComponent(t).replace(/%3A/gi, ":").replace(/%24/g, "$").replace(/%2C/gi, ",").replace(/%20/g, "+").replace(/%5B/gi, "[").replace(/%5D/gi, "]") }
                t.exports = function(t, e, n) {
                    if (!e) return t;
                    var i;
                    if (n) i = n(e);
                    else if (r.isURLSearchParams(e)) i = e.toString();
                    else {
                        var a = [];
                        r.forEach(e, (function(t, e) { null != t && (r.isArray(t) ? e += "[]" : t = [t], r.forEach(t, (function(t) { r.isDate(t) ? t = t.toISOString() : r.isObject(t) && (t = JSON.stringify(t)), a.push(o(e) + "=" + o(t)) }))) })), i = a.join("&")
                    }
                    if (i) { var u = t.indexOf("#"); - 1 !== u && (t = t.slice(0, u)), t += (-1 === t.indexOf("?") ? "?" : "&") + i }
                    return t
                }
            },
            303: t => {
                "use strict";
                t.exports = function(t, e) { return e ? t.replace(/\/+$/, "") + "/" + e.replace(/^\/+/, "") : t }
            },
            372: (t, e, n) => {
                "use strict";
                var r = n(867);
                t.exports = r.isStandardBrowserEnv() ? {
                    write: function(t, e, n, o, i, a) {
                        var u = [];
                        u.push(t + "=" + encodeURIComponent(e)), r.isNumber(n) && u.push("expires=" + new Date(n).toGMTString()), r.isString(o) && u.push("path=" + o), r.isString(i) && u.push("domain=" + i), !0 === a && u.push("secure"), document.cookie = u.join("; ")
                    },
                    read: function(t) { var e = document.cookie.match(new RegExp("(^|;\\s*)(" + t + ")=([^;]*)")); return e ? decodeURIComponent(e[3]) : null },
                    remove: function(t) { this.write(t, "", Date.now() - 864e5) }
                } : { write: function() {}, read: function() { return null }, remove: function() {} }
            },
            793: t => {
                "use strict";
                t.exports = function(t) { return /^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(t) }
            },
            268: t => {
                "use strict";
                t.exports = function(t) { return "object" == typeof t && !0 === t.isAxiosError }
            },
            985: (t, e, n) => {
                "use strict";
                var r = n(867);
                t.exports = r.isStandardBrowserEnv() ? function() {
                    var t, e = /(msie|trident)/i.test(navigator.userAgent),
                        n = document.createElement("a");

                    function o(t) { var r = t; return e && (n.setAttribute("href", r), r = n.href), n.setAttribute("href", r), { href: n.href, protocol: n.protocol ? n.protocol.replace(/:$/, "") : "", host: n.host, search: n.search ? n.search.replace(/^\?/, "") : "", hash: n.hash ? n.hash.replace(/^#/, "") : "", hostname: n.hostname, port: n.port, pathname: "/" === n.pathname.charAt(0) ? n.pathname : "/" + n.pathname } }
                    return t = o(window.location.href),
                        function(e) { var n = r.isString(e) ? o(e) : e; return n.protocol === t.protocol && n.host === t.host }
                }() : function() { return !0 }
            },
            16: (t, e, n) => {
                "use strict";
                var r = n(867);
                t.exports = function(t, e) { r.forEach(t, (function(n, r) { r !== e && r.toUpperCase() === e.toUpperCase() && (t[e] = n, delete t[r]) })) }
            },
            109: (t, e, n) => {
                "use strict";
                var r = n(867),
                    o = ["age", "authorization", "content-length", "content-type", "etag", "expires", "from", "host", "if-modified-since", "if-unmodified-since", "last-modified", "location", "max-forwards", "proxy-authorization", "referer", "retry-after", "user-agent"];
                t.exports = function(t) {
                    var e, n, i, a = {};
                    return t ? (r.forEach(t.split("\n"), (function(t) {
                        if (i = t.indexOf(":"), e = r.trim(t.substr(0, i)).toLowerCase(), n = r.trim(t.substr(i + 1)), e) {
                            if (a[e] && o.indexOf(e) >= 0) return;
                            a[e] = "set-cookie" === e ? (a[e] ? a[e] : []).concat([n]) : a[e] ? a[e] + ", " + n : n
                        }
                    })), a) : a
                }
            },
            713: t => {
                "use strict";
                t.exports = function(t) { return function(e) { return t.apply(null, e) } }
            },
            875: (t, e, n) => {
                "use strict";
                var r = n(593),
                    o = {};
                ["object", "boolean", "number", "function", "string", "symbol"].forEach((function(t, e) { o[t] = function(n) { return typeof n === t || "a" + (e < 1 ? "n " : " ") + t } }));
                var i = {},
                    a = r.version.split(".");

                function u(t, e) { for (var n = e ? e.split(".") : a, r = t.split("."), o = 0; o < 3; o++) { if (n[o] > r[o]) return !0; if (n[o] < r[o]) return !1 } return !1 }
                o.transitional = function(t, e, n) {
                    var o = e && u(e);

                    function a(t, e) { return "[Axios v" + r.version + "] Transitional option '" + t + "'" + e + (n ? ". " + n : "") }
                    return function(n, r, u) { if (!1 === t) throw new Error(a(r, " has been removed in " + e)); return o && !i[r] && (i[r] = !0, console.warn(a(r, " has been deprecated since v" + e + " and will be removed in the near future"))), !t || t(n, r, u) }
                }, t.exports = {
                    isOlderVersion: u,
                    assertOptions: function(t, e, n) {
                        if ("object" != typeof t) throw new TypeError("options must be an object");
                        for (var r = Object.keys(t), o = r.length; o-- > 0;) {
                            var i = r[o],
                                a = e[i];
                            if (a) {
                                var u = t[i],
                                    l = void 0 === u || a(u, i, t);
                                if (!0 !== l) throw new TypeError("option " + i + " must be " + l)
                            } else if (!0 !== n) throw Error("Unknown option " + i)
                        }
                    },
                    validators: o
                }
            },
            867: (t, e, n) => {
                "use strict";
                var r = n(849),
                    o = Object.prototype.toString;

                function i(t) { return "[object Array]" === o.call(t) }

                function a(t) { return void 0 === t }

                function u(t) { return null !== t && "object" == typeof t }

                function l(t) { if ("[object Object]" !== o.call(t)) return !1; var e = Object.getPrototypeOf(t); return null === e || e === Object.prototype }

                function s(t) { return "[object Function]" === o.call(t) }

                function c(t, e) {
                    if (null != t)
                        if ("object" != typeof t && (t = [t]), i(t))
                            for (var n = 0, r = t.length; n < r; n++) e.call(null, t[n], n, t);
                        else
                            for (var o in t) Object.prototype.hasOwnProperty.call(t, o) && e.call(null, t[o], o, t)
                }
                t.exports = {
                    isArray: i,
                    isArrayBuffer: function(t) { return "[object ArrayBuffer]" === o.call(t) },
                    isBuffer: function(t) { return null !== t && !a(t) && null !== t.constructor && !a(t.constructor) && "function" == typeof t.constructor.isBuffer && t.constructor.isBuffer(t) },
                    isFormData: function(t) { return "undefined" != typeof FormData && t instanceof FormData },
                    isArrayBufferView: function(t) { return "undefined" != typeof ArrayBuffer && ArrayBuffer.isView ? ArrayBuffer.isView(t) : t && t.buffer && t.buffer instanceof ArrayBuffer },
                    isString: function(t) { return "string" == typeof t },
                    isNumber: function(t) { return "number" == typeof t },
                    isObject: u,
                    isPlainObject: l,
                    isUndefined: a,
                    isDate: function(t) { return "[object Date]" === o.call(t) },
                    isFile: function(t) { return "[object File]" === o.call(t) },
                    isBlob: function(t) { return "[object Blob]" === o.call(t) },
                    isFunction: s,
                    isStream: function(t) { return u(t) && s(t.pipe) },
                    isURLSearchParams: function(t) { return "undefined" != typeof URLSearchParams && t instanceof URLSearchParams },
                    isStandardBrowserEnv: function() { return ("undefined" == typeof navigator || "ReactNative" !== navigator.product && "NativeScript" !== navigator.product && "NS" !== navigator.product) && ("undefined" != typeof window && "undefined" != typeof document) },
                    forEach: c,
                    merge: function t() {
                        var e = {};

                        function n(n, r) { l(e[r]) && l(n) ? e[r] = t(e[r], n) : l(n) ? e[r] = t({}, n) : i(n) ? e[r] = n.slice() : e[r] = n }
                        for (var r = 0, o = arguments.length; r < o; r++) c(arguments[r], n);
                        return e
                    },
                    extend: function(t, e, n) { return c(e, (function(e, o) { t[o] = n && "function" == typeof e ? r(e, n) : e })), t },
                    trim: function(t) { return t.trim ? t.trim() : t.replace(/^\s+|\s+$/g, "") },
                    stripBOM: function(t) { return 65279 === t.charCodeAt(0) && (t = t.slice(1)), t }
                }
            },
            905: (t, e, n) => {
                "use strict";
                var r, o, i, a, u = Object.create,
                    l = Object.defineProperty,
                    s = Object.getPrototypeOf,
                    c = Object.prototype.hasOwnProperty,
                    f = Object.getOwnPropertyNames,
                    h = Object.getOwnPropertyDescriptor,
                    p = (t, e) => () => (e || t((e = { exports: {} }).exports, e), e.exports),
                    d = p((t => {
                        function e(t, e) {
                            const n = Object.create(null),
                                r = t.split(",");
                            for (let t = 0; t < r.length; t++) n[r[t]] = !0;
                            return e ? t => !!n[t.toLowerCase()] : t => !!n[t]
                        }
                        Object.defineProperty(t, "__esModule", { value: !0 });
                        var r = { 1: "TEXT", 2: "CLASS", 4: "STYLE", 8: "PROPS", 16: "FULL_PROPS", 32: "HYDRATE_EVENTS", 64: "STABLE_FRAGMENT", 128: "KEYED_FRAGMENT", 256: "UNKEYED_FRAGMENT", 512: "NEED_PATCH", 1024: "DYNAMIC_SLOTS", 2048: "DEV_ROOT_FRAGMENT", [-1]: "HOISTED", [-2]: "BAIL" },
                            o = { 1: "STABLE", 2: "DYNAMIC", 3: "FORWARDED" },
                            i = e("Infinity,undefined,NaN,isFinite,isNaN,parseFloat,parseInt,decodeURI,decodeURIComponent,encodeURI,encodeURIComponent,Math,Number,Date,Array,Object,Boolean,String,RegExp,Map,Set,JSON,Intl,BigInt");
                        var a = "itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly",
                            u = e(a),
                            l = e(a + ",async,autofocus,autoplay,controls,default,defer,disabled,hidden,loop,open,required,reversed,scoped,seamless,checked,muted,multiple,selected"),
                            s = /[>/="'\u0009\u000a\u000c\u0020]/,
                            c = {};
                        var f = e("animation-iteration-count,border-image-outset,border-image-slice,border-image-width,box-flex,box-flex-group,box-ordinal-group,column-count,columns,flex,flex-grow,flex-positive,flex-shrink,flex-negative,flex-order,grid-row,grid-row-end,grid-row-span,grid-row-start,grid-column,grid-column-end,grid-column-span,grid-column-start,font-weight,line-clamp,line-height,opacity,order,orphans,tab-size,widows,z-index,zoom,fill-opacity,flood-opacity,stop-opacity,stroke-dasharray,stroke-dashoffset,stroke-miterlimit,stroke-opacity,stroke-width"),
                            h = e("accept,accept-charset,accesskey,action,align,allow,alt,async,autocapitalize,autocomplete,autofocus,autoplay,background,bgcolor,border,buffered,capture,challenge,charset,checked,cite,class,code,codebase,color,cols,colspan,content,contenteditable,contextmenu,controls,coords,crossorigin,csp,data,datetime,decoding,default,defer,dir,dirname,disabled,download,draggable,dropzone,enctype,enterkeyhint,for,form,formaction,formenctype,formmethod,formnovalidate,formtarget,headers,height,hidden,high,href,hreflang,http-equiv,icon,id,importance,integrity,ismap,itemprop,keytype,kind,label,lang,language,loading,list,loop,low,manifest,max,maxlength,minlength,media,min,multiple,muted,name,novalidate,open,optimum,pattern,ping,placeholder,poster,preload,radiogroup,readonly,referrerpolicy,rel,required,reversed,rows,rowspan,sandbox,scope,scoped,selected,shape,size,sizes,slot,span,spellcheck,src,srcdoc,srclang,srcset,start,step,style,summary,tabindex,target,title,translate,type,usemap,value,width,wrap");
                        var p = /;(?![^(]*\))/g,
                            d = /:(.+)/;

                        function y(t) {
                            const e = {};
                            return t.split(p).forEach((t => {
                                if (t) {
                                    const n = t.split(d);
                                    n.length > 1 && (e[n[0].trim()] = n[1].trim())
                                }
                            })), e
                        }
                        var v = e("html,body,base,head,link,meta,style,title,address,article,aside,footer,header,h1,h2,h3,h4,h5,h6,hgroup,nav,section,div,dd,dl,dt,figcaption,figure,picture,hr,img,li,main,ol,p,pre,ul,a,b,abbr,bdi,bdo,br,cite,code,data,dfn,em,i,kbd,mark,q,rp,rt,rtc,ruby,s,samp,small,span,strong,sub,sup,time,u,var,wbr,area,audio,map,track,video,embed,object,param,source,canvas,script,noscript,del,ins,caption,col,colgroup,table,thead,tbody,td,th,tr,button,datalist,fieldset,form,input,label,legend,meter,optgroup,option,output,progress,select,textarea,details,dialog,menu,summary,template,blockquote,iframe,tfoot"),
                            g = e("svg,animate,animateMotion,animateTransform,circle,clipPath,color-profile,defs,desc,discard,ellipse,feBlend,feColorMatrix,feComponentTransfer,feComposite,feConvolveMatrix,feDiffuseLighting,feDisplacementMap,feDistanceLight,feDropShadow,feFlood,feFuncA,feFuncB,feFuncG,feFuncR,feGaussianBlur,feImage,feMerge,feMergeNode,feMorphology,feOffset,fePointLight,feSpecularLighting,feSpotLight,feTile,feTurbulence,filter,foreignObject,g,hatch,hatchpath,image,line,linearGradient,marker,mask,mesh,meshgradient,meshpatch,meshrow,metadata,mpath,path,pattern,polygon,polyline,radialGradient,rect,set,solidcolor,stop,switch,symbol,text,textPath,title,tspan,unknown,use,view"),
                            b = e("area,base,br,col,embed,hr,img,input,link,meta,param,source,track,wbr"),
                            m = /["'&<>]/;
                        var _ = /^-?>|<!--|-->|--!>|<!-$/g;

                        function w(t, e) {
                            if (t === e) return !0;
                            let n = C(t),
                                r = C(e);
                            if (n || r) return !(!n || !r) && t.getTime() === e.getTime();
                            if (n = S(t), r = S(e), n || r) return !(!n || !r) && function(t, e) { if (t.length !== e.length) return !1; let n = !0; for (let r = 0; n && r < t.length; r++) n = w(t[r], e[r]); return n }(t, e);
                            if (n = R(t), r = R(e), n || r) {
                                if (!n || !r) return !1;
                                if (Object.keys(t).length !== Object.keys(e).length) return !1;
                                for (const n in t) {
                                    const r = t.hasOwnProperty(n),
                                        o = e.hasOwnProperty(n);
                                    if (r && !o || !r && o || !w(t[n], e[n])) return !1
                                }
                            }
                            return String(t) === String(e)
                        }
                        var x, O = (t, e) => T(e) ? {
                                [`Map(${e.size})`]: [...e.entries()].reduce(((t, [e, n]) => (t[`${e}  => `] = n, t)), {})
                            } : P(e) ? {
                                [`Set(${e.size})`]: [...e.values()]
                            } : !R(e) || S(e) || B(e) ? e : String(e),
                            E = Object.freeze({}),
                            k = Object.freeze([]),
                            A = /^on[^a-z]/,
                            j = Object.assign,
                            N = Object.prototype.hasOwnProperty,
                            S = Array.isArray,
                            T = t => "[object Map]" === I(t),
                            P = t => "[object Set]" === I(t),
                            C = t => t instanceof Date,
                            q = t => "function" == typeof t,
                            L = t => "string" == typeof t,
                            R = t => null !== t && "object" == typeof t,
                            M = Object.prototype.toString,
                            I = t => M.call(t),
                            B = t => "[object Object]" === I(t),
                            D = e(",key,ref,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"),
                            U = t => { const e = Object.create(null); return n => e[n] || (e[n] = t(n)) },
                            F = /-(\w)/g,
                            z = U((t => t.replace(F, ((t, e) => e ? e.toUpperCase() : "")))),
                            K = /\B([A-Z])/g,
                            H = U((t => t.replace(K, "-$1").toLowerCase())),
                            $ = U((t => t.charAt(0).toUpperCase() + t.slice(1))),
                            W = U((t => t ? `on${$(t)}` : ""));
                        t.EMPTY_ARR = k, t.EMPTY_OBJ = E, t.NO = () => !1, t.NOOP = () => {}, t.PatchFlagNames = r, t.babelParserDefaultPlugins = ["bigInt", "optionalChaining", "nullishCoalescingOperator"], t.camelize = z, t.capitalize = $, t.def = (t, e, n) => { Object.defineProperty(t, e, { configurable: !0, enumerable: !1, value: n }) }, t.escapeHtml = function(t) {
                            const e = "" + t,
                                n = m.exec(e);
                            if (!n) return e;
                            let r, o, i = "",
                                a = 0;
                            for (o = n.index; o < e.length; o++) {
                                switch (e.charCodeAt(o)) {
                                    case 34:
                                        r = "&quot;";
                                        break;
                                    case 38:
                                        r = "&amp;";
                                        break;
                                    case 39:
                                        r = "&#39;";
                                        break;
                                    case 60:
                                        r = "&lt;";
                                        break;
                                    case 62:
                                        r = "&gt;";
                                        break;
                                    default:
                                        continue
                                }
                                a !== o && (i += e.substring(a, o)), a = o + 1, i += r
                            }
                            return a !== o ? i + e.substring(a, o) : i
                        }, t.escapeHtmlComment = function(t) { return t.replace(_, "") }, t.extend = j, t.generateCodeFrame = function(t, e = 0, n = t.length) {
                            const r = t.split(/\r?\n/);
                            let o = 0;
                            const i = [];
                            for (let t = 0; t < r.length; t++)
                                if (o += r[t].length + 1, o >= e) {
                                    for (let a = t - 2; a <= t + 2 || n > o; a++) {
                                        if (a < 0 || a >= r.length) continue;
                                        const u = a + 1;
                                        i.push(`${u}${" ".repeat(Math.max(3-String(u).length,0))}|  ${r[a]}`);
                                        const l = r[a].length;
                                        if (a === t) {
                                            const t = e - (o - l) + 1,
                                                r = Math.max(1, n > o ? l - t : n - e);
                                            i.push("   |  " + " ".repeat(t) + "^".repeat(r))
                                        } else if (a > t) {
                                            if (n > o) {
                                                const t = Math.max(Math.min(n - o, l), 1);
                                                i.push("   |  " + "^".repeat(t))
                                            }
                                            o += l + 1
                                        }
                                    }
                                    break
                                }
                            return i.join("\n")
                        }, t.getGlobalThis = () => x || (x = "undefined" != typeof globalThis ? globalThis : "undefined" != typeof self ? self : "undefined" != typeof window ? window : void 0 !== n.g ? n.g : {}), t.hasChanged = (t, e) => t !== e && (t == t || e == e), t.hasOwn = (t, e) => N.call(t, e), t.hyphenate = H, t.invokeArrayFns = (t, e) => { for (let n = 0; n < t.length; n++) t[n](e) }, t.isArray = S, t.isBooleanAttr = l, t.isDate = C, t.isFunction = q, t.isGloballyWhitelisted = i, t.isHTMLTag = v, t.isIntegerKey = t => L(t) && "NaN" !== t && "-" !== t[0] && "" + parseInt(t, 10) === t, t.isKnownAttr = h, t.isMap = T, t.isModelListener = t => t.startsWith("onUpdate:"), t.isNoUnitNumericStyleProp = f, t.isObject = R, t.isOn = t => A.test(t), t.isPlainObject = B, t.isPromise = t => R(t) && q(t.then) && q(t.catch), t.isReservedProp = D, t.isSSRSafeAttrName = function(t) { if (c.hasOwnProperty(t)) return c[t]; const e = s.test(t); return e && console.error(`unsafe attribute name: ${t}`), c[t] = !e }, t.isSVGTag = g, t.isSet = P, t.isSpecialBooleanAttr = u, t.isString = L, t.isSymbol = t => "symbol" == typeof t, t.isVoidTag = b, t.looseEqual = w, t.looseIndexOf = function(t, e) { return t.findIndex((t => w(t, e))) }, t.makeMap = e, t.normalizeClass = function t(e) {
                            let n = "";
                            if (L(e)) n = e;
                            else if (S(e))
                                for (let r = 0; r < e.length; r++) {
                                    const o = t(e[r]);
                                    o && (n += o + " ")
                                } else if (R(e))
                                    for (const t in e) e[t] && (n += t + " ");
                            return n.trim()
                        }, t.normalizeStyle = function t(e) {
                            if (S(e)) {
                                const n = {};
                                for (let r = 0; r < e.length; r++) {
                                    const o = e[r],
                                        i = t(L(o) ? y(o) : o);
                                    if (i)
                                        for (const t in i) n[t] = i[t]
                                }
                                return n
                            }
                            if (R(e)) return e
                        }, t.objectToString = M, t.parseStringStyle = y, t.propsToAttrMap = { acceptCharset: "accept-charset", className: "class", htmlFor: "for", httpEquiv: "http-equiv" }, t.remove = (t, e) => {
                            const n = t.indexOf(e);
                            n > -1 && t.splice(n, 1)
                        }, t.slotFlagsText = o, t.stringifyStyle = function(t) {
                            let e = "";
                            if (!t) return e;
                            for (const n in t) {
                                const r = t[n],
                                    o = n.startsWith("--") ? n : H(n);
                                (L(r) || "number" == typeof r && f(o)) && (e += `${o}:${r};`)
                            }
                            return e
                        }, t.toDisplayString = t => null == t ? "" : R(t) ? JSON.stringify(t, O, 2) : String(t), t.toHandlerKey = W, t.toNumber = t => { const e = parseFloat(t); return isNaN(e) ? t : e }, t.toRawType = t => I(t).slice(8, -1), t.toTypeString = I
                    })),
                    y = p(((t, e) => { e.exports = d() })),
                    v = p((t => {
                        Object.defineProperty(t, "__esModule", { value: !0 });
                        var e, n = y(),
                            r = new WeakMap,
                            o = [],
                            i = Symbol("iterate"),
                            a = Symbol("Map key iterate");

                        function u(t, r = n.EMPTY_OBJ) {
                            (function(t) { return t && !0 === t._isEffect })(t) && (t = t.raw);
                            const i = function(t, n) { const r = function() { if (!r.active) return t(); if (!o.includes(r)) { s(r); try { return p(), o.push(r), e = r, t() } finally { o.pop(), d(), e = o[o.length - 1] } } }; return r.id = l++, r.allowRecurse = !!n.allowRecurse, r._isEffect = !0, r.active = !0, r.raw = t, r.deps = [], r.options = n, r }(t, r);
                            return r.lazy || i(), i
                        }
                        var l = 0;

                        function s(t) {
                            const { deps: e } = t;
                            if (e.length) {
                                for (let n = 0; n < e.length; n++) e[n].delete(t);
                                e.length = 0
                            }
                        }
                        var c = !0,
                            f = [];

                        function h() { f.push(c), c = !1 }

                        function p() { f.push(c), c = !0 }

                        function d() {
                            const t = f.pop();
                            c = void 0 === t || t
                        }

                        function v(t, n, o) {
                            if (!c || void 0 === e) return;
                            let i = r.get(t);
                            i || r.set(t, i = new Map);
                            let a = i.get(o);
                            a || i.set(o, a = new Set), a.has(e) || (a.add(e), e.deps.push(a), e.options.onTrack && e.options.onTrack({ effect: e, target: t, type: n, key: o }))
                        }

                        function g(t, o, u, l, s, c) {
                            const f = r.get(t);
                            if (!f) return;
                            const h = new Set,
                                p = t => {
                                    t && t.forEach((t => {
                                        (t !== e || t.allowRecurse) && h.add(t)
                                    }))
                                };
                            if ("clear" === o) f.forEach(p);
                            else if ("length" === u && n.isArray(t)) f.forEach(((t, e) => {
                                ("length" === e || e >= l) && p(t)
                            }));
                            else switch (void 0 !== u && p(f.get(u)), o) {
                                case "add":
                                    n.isArray(t) ? n.isIntegerKey(u) && p(f.get("length")) : (p(f.get(i)), n.isMap(t) && p(f.get(a)));
                                    break;
                                case "delete":
                                    n.isArray(t) || (p(f.get(i)), n.isMap(t) && p(f.get(a)));
                                    break;
                                case "set":
                                    n.isMap(t) && p(f.get(i))
                            }
                            h.forEach((e => { e.options.onTrigger && e.options.onTrigger({ effect: e, target: t, key: u, type: o, newValue: l, oldValue: s, oldTarget: c }), e.options.scheduler ? e.options.scheduler(e) : e() }))
                        }
                        var b = n.makeMap("__proto__,__v_isRef,__isVue"),
                            m = new Set(Object.getOwnPropertyNames(Symbol).map((t => Symbol[t])).filter(n.isSymbol)),
                            _ = k(),
                            w = k(!1, !0),
                            x = k(!0),
                            O = k(!0, !0),
                            E = {};

                        function k(t = !1, e = !1) { return function(r, o, i) { if ("__v_isReactive" === o) return !t; if ("__v_isReadonly" === o) return t; if ("__v_raw" === o && i === (t ? e ? at : it : e ? ot : rt).get(r)) return r; const a = n.isArray(r); if (!t && a && n.hasOwn(E, o)) return Reflect.get(E, o, i); const u = Reflect.get(r, o, i); if (n.isSymbol(o) ? m.has(o) : b(o)) return u; if (t || v(r, "get", o), e) return u; if (yt(u)) { return !a || !n.isIntegerKey(o) ? u.value : u } return n.isObject(u) ? t ? lt(u) : ut(u) : u } }["includes", "indexOf", "lastIndexOf"].forEach((t => {
                            const e = Array.prototype[t];
                            E[t] = function(...t) { const n = pt(this); for (let t = 0, e = this.length; t < e; t++) v(n, "get", t + ""); const r = e.apply(n, t); return -1 === r || !1 === r ? e.apply(n, t.map(pt)) : r }
                        })), ["push", "pop", "shift", "unshift", "splice"].forEach((t => {
                            const e = Array.prototype[t];
                            E[t] = function(...t) { h(); const n = e.apply(this, t); return d(), n }
                        }));
                        var A = N(),
                            j = N(!0);

                        function N(t = !1) {
                            return function(e, r, o, i) {
                                let a = e[r];
                                if (!t && (o = pt(o), a = pt(a), !n.isArray(e) && yt(a) && !yt(o))) return a.value = o, !0;
                                const u = n.isArray(e) && n.isIntegerKey(r) ? Number(r) < e.length : n.hasOwn(e, r),
                                    l = Reflect.set(e, r, o, i);
                                return e === pt(i) && (u ? n.hasChanged(o, a) && g(e, "set", r, o, a) : g(e, "add", r, o)), l
                            }
                        }
                        var S = {
                                get: _,
                                set: A,
                                deleteProperty: function(t, e) {
                                    const r = n.hasOwn(t, e),
                                        o = t[e],
                                        i = Reflect.deleteProperty(t, e);
                                    return i && r && g(t, "delete", e, void 0, o), i
                                },
                                has: function(t, e) { const r = Reflect.has(t, e); return n.isSymbol(e) && m.has(e) || v(t, "has", e), r },
                                ownKeys: function(t) { return v(t, "iterate", n.isArray(t) ? "length" : i), Reflect.ownKeys(t) }
                            },
                            T = { get: x, set: (t, e) => (console.warn(`Set operation on key "${String(e)}" failed: target is readonly.`, t), !0), deleteProperty: (t, e) => (console.warn(`Delete operation on key "${String(e)}" failed: target is readonly.`, t), !0) },
                            P = n.extend({}, S, { get: w, set: j }),
                            C = n.extend({}, T, { get: O }),
                            q = t => n.isObject(t) ? ut(t) : t,
                            L = t => n.isObject(t) ? lt(t) : t,
                            R = t => t,
                            M = t => Reflect.getPrototypeOf(t);

                        function I(t, e, n = !1, r = !1) {
                            const o = pt(t = t.__v_raw),
                                i = pt(e);
                            e !== i && !n && v(o, "get", e), !n && v(o, "get", i);
                            const { has: a } = M(o), u = r ? R : n ? L : q;
                            return a.call(o, e) ? u(t.get(e)) : a.call(o, i) ? u(t.get(i)) : void(t !== o && t.get(e))
                        }

                        function B(t, e = !1) {
                            const n = this.__v_raw,
                                r = pt(n),
                                o = pt(t);
                            return t !== o && !e && v(r, "has", t), !e && v(r, "has", o), t === o ? n.has(t) : n.has(t) || n.has(o)
                        }

                        function D(t, e = !1) { return t = t.__v_raw, !e && v(pt(t), "iterate", i), Reflect.get(t, "size", t) }

                        function U(t) { t = pt(t); const e = pt(this); return M(e).has.call(e, t) || (e.add(t), g(e, "add", t, t)), this }

                        function F(t, e) {
                            e = pt(e);
                            const r = pt(this),
                                { has: o, get: i } = M(r);
                            let a = o.call(r, t);
                            a ? nt(r, o, t) : (t = pt(t), a = o.call(r, t));
                            const u = i.call(r, t);
                            return r.set(t, e), a ? n.hasChanged(e, u) && g(r, "set", t, e, u) : g(r, "add", t, e), this
                        }

                        function z(t) {
                            const e = pt(this),
                                { has: n, get: r } = M(e);
                            let o = n.call(e, t);
                            o ? nt(e, n, t) : (t = pt(t), o = n.call(e, t));
                            const i = r ? r.call(e, t) : void 0,
                                a = e.delete(t);
                            return o && g(e, "delete", t, void 0, i), a
                        }

                        function K() {
                            const t = pt(this),
                                e = 0 !== t.size,
                                r = n.isMap(t) ? new Map(t) : new Set(t),
                                o = t.clear();
                            return e && g(t, "clear", void 0, void 0, r), o
                        }

                        function H(t, e) {
                            return function(n, r) {
                                const o = this,
                                    a = o.__v_raw,
                                    u = pt(a),
                                    l = e ? R : t ? L : q;
                                return !t && v(u, "iterate", i), a.forEach(((t, e) => n.call(r, l(t), l(e), o)))
                            }
                        }

                        function $(t, e, r) {
                            return function(...o) {
                                const u = this.__v_raw,
                                    l = pt(u),
                                    s = n.isMap(l),
                                    c = "entries" === t || t === Symbol.iterator && s,
                                    f = "keys" === t && s,
                                    h = u[t](...o),
                                    p = r ? R : e ? L : q;
                                return !e && v(l, "iterate", f ? a : i), { next() { const { value: t, done: e } = h.next(); return e ? { value: t, done: e } : { value: c ? [p(t[0]), p(t[1])] : p(t), done: e } }, [Symbol.iterator]() { return this } }
                            }
                        }

                        function W(t) {
                            return function(...e) {
                                {
                                    const r = e[0] ? `on key "${e[0]}" ` : "";
                                    console.warn(`${n.capitalize(t)} operation ${r}failed: target is readonly.`, pt(this))
                                }
                                return "delete" !== t && this
                            }
                        }
                        var V = {get(t) { return I(this, t) }, get size() { return D(this) }, has: B, add: U, set: F, delete: z, clear: K, forEach: H(!1, !1) },
                            Y = {get(t) { return I(this, t, !1, !0) }, get size() { return D(this) }, has: B, add: U, set: F, delete: z, clear: K, forEach: H(!1, !0) },
                            Z = {get(t) { return I(this, t, !0) }, get size() { return D(this, !0) }, has(t) { return B.call(this, t, !0) }, add: W("add"), set: W("set"), delete: W("delete"), clear: W("clear"), forEach: H(!0, !1) },
                            G = {get(t) { return I(this, t, !0, !0) }, get size() { return D(this, !0) }, has(t) { return B.call(this, t, !0) }, add: W("add"), set: W("set"), delete: W("delete"), clear: W("clear"), forEach: H(!0, !0) };

                        function X(t, e) { const r = e ? t ? G : Y : t ? Z : V; return (e, o, i) => "__v_isReactive" === o ? !t : "__v_isReadonly" === o ? t : "__v_raw" === o ? e : Reflect.get(n.hasOwn(r, o) && o in e ? r : e, o, i) }["keys", "values", "entries", Symbol.iterator].forEach((t => { V[t] = $(t, !1, !1), Z[t] = $(t, !0, !1), Y[t] = $(t, !1, !0), G[t] = $(t, !0, !0) }));
                        var J = { get: X(!1, !1) },
                            Q = { get: X(!1, !0) },
                            tt = { get: X(!0, !1) },
                            et = { get: X(!0, !0) };

                        function nt(t, e, r) {
                            const o = pt(r);
                            if (o !== r && e.call(t, o)) {
                                const e = n.toRawType(t);
                                console.warn(`Reactive ${e} contains both the raw and reactive versions of the same object${"Map"===e?" as keys":""}, which can lead to inconsistencies. Avoid differentiating between the raw and reactive versions of an object and only use the reactive version if possible.`)
                            }
                        }
                        var rt = new WeakMap,
                            ot = new WeakMap,
                            it = new WeakMap,
                            at = new WeakMap;

                        function ut(t) { return t && t.__v_isReadonly ? t : st(t, !1, S, J, rt) }

                        function lt(t) { return st(t, !0, T, tt, it) }

                        function st(t, e, r, o, i) {
                            if (!n.isObject(t)) return console.warn(`value cannot be made reactive: ${String(t)}`), t;
                            if (t.__v_raw && (!e || !t.__v_isReactive)) return t;
                            const a = i.get(t);
                            if (a) return a;
                            const u = (l = t).__v_skip || !Object.isExtensible(l) ? 0 : function(t) {
                                switch (t) {
                                    case "Object":
                                    case "Array":
                                        return 1;
                                    case "Map":
                                    case "Set":
                                    case "WeakMap":
                                    case "WeakSet":
                                        return 2;
                                    default:
                                        return 0
                                }
                            }(n.toRawType(l));
                            var l;
                            if (0 === u) return t;
                            const s = new Proxy(t, 2 === u ? o : r);
                            return i.set(t, s), s
                        }

                        function ct(t) { return ft(t) ? ct(t.__v_raw) : !(!t || !t.__v_isReactive) }

                        function ft(t) { return !(!t || !t.__v_isReadonly) }

                        function ht(t) { return ct(t) || ft(t) }

                        function pt(t) { return t && pt(t.__v_raw) || t }
                        var dt = t => n.isObject(t) ? ut(t) : t;

                        function yt(t) { return Boolean(t && !0 === t.__v_isRef) }

                        function vt(t, e = !1) {
                            return yt(t) ? t : new class {
                                constructor(t, e = !1) { this._rawValue = t, this._shallow = e, this.__v_isRef = !0, this._value = e ? t : dt(t) }
                                get value() { return v(pt(this), "get", "value"), this._value }
                                set value(t) { n.hasChanged(pt(t), this._rawValue) && (this._rawValue = t, this._value = this._shallow ? t : dt(t), g(pt(this), "set", "value", t)) }
                            }(t, e)
                        }

                        function gt(t) { return yt(t) ? t.value : t }
                        var bt = { get: (t, e, n) => gt(Reflect.get(t, e, n)), set: (t, e, n, r) => { const o = t[e]; return yt(o) && !yt(n) ? (o.value = n, !0) : Reflect.set(t, e, n, r) } };

                        function mt(t, e) {
                            return yt(t[e]) ? t[e] : new class {
                                constructor(t, e) { this._object = t, this._key = e, this.__v_isRef = !0 }
                                get value() { return this._object[this._key] }
                                set value(t) { this._object[this._key] = t }
                            }(t, e)
                        }
                        t.ITERATE_KEY = i, t.computed = function(t) {
                            let e, r;
                            return n.isFunction(t) ? (e = t, r = () => { console.warn("Write operation failed: computed value is readonly") }) : (e = t.get, r = t.set), new class {
                                constructor(t, e, n) { this._setter = e, this._dirty = !0, this.__v_isRef = !0, this.effect = u(t, { lazy: !0, scheduler: () => { this._dirty || (this._dirty = !0, g(pt(this), "set", "value")) } }), this.__v_isReadonly = n }
                                get value() { const t = pt(this); return t._dirty && (t._value = this.effect(), t._dirty = !1), v(t, "get", "value"), t._value }
                                set value(t) { this._setter(t) }
                            }(e, r, n.isFunction(t) || !t.set)
                        }, t.customRef = function(t) {
                            return new class {
                                constructor(t) {
                                    this.__v_isRef = !0;
                                    const { get: e, set: n } = t((() => v(this, "get", "value")), (() => g(this, "set", "value")));
                                    this._get = e, this._set = n
                                }
                                get value() { return this._get() }
                                set value(t) { this._set(t) }
                            }(t)
                        }, t.effect = u, t.enableTracking = p, t.isProxy = ht, t.isReactive = ct, t.isReadonly = ft, t.isRef = yt, t.markRaw = function(t) { return n.def(t, "__v_skip", !0), t }, t.pauseTracking = h, t.proxyRefs = function(t) { return ct(t) ? t : new Proxy(t, bt) }, t.reactive = ut, t.readonly = lt, t.ref = function(t) { return vt(t) }, t.resetTracking = d, t.shallowReactive = function(t) { return st(t, !1, P, Q, ot) }, t.shallowReadonly = function(t) { return st(t, !0, C, et, at) }, t.shallowRef = function(t) { return vt(t, !0) }, t.stop = function(t) { t.active && (s(t), t.options.onStop && t.options.onStop(), t.active = !1) }, t.toRaw = pt, t.toRef = mt, t.toRefs = function(t) { ht(t) || console.warn("toRefs() expects a reactive object but received a plain one."); const e = n.isArray(t) ? new Array(t.length) : {}; for (const n in t) e[n] = mt(t, n); return e }, t.track = v, t.trigger = g, t.triggerRef = function(t) { g(pt(t), "set", "value", t.value) }, t.unref = gt
                    })),
                    g = p(((t, e) => { e.exports = v() })),
                    b = !1,
                    m = !1,
                    _ = [];

                function w(t) {
                    ! function(t) {
                        _.includes(t) || _.push(t);
                        m || b || (b = !0, queueMicrotask(x))
                    }(t)
                }

                function x() {
                    b = !1, m = !0;
                    for (let t = 0; t < _.length; t++) _[t]();
                    _.length = 0, m = !1
                }
                var O = !0;

                function E(t) { o = t }
                var k = [],
                    A = [],
                    j = [];

                function N(t, e) {
                    t._x_attributeCleanups && Object.entries(t._x_attributeCleanups).forEach((([n, r]) => {
                        (void 0 === e || e.includes(n)) && (r.forEach((t => t())), delete t._x_attributeCleanups[n])
                    }))
                }
                var S = new MutationObserver(B),
                    T = !1;

                function P() { S.observe(document, { subtree: !0, childList: !0, attributes: !0, attributeOldValue: !0 }), T = !0 }

                function C() {
                    (q = q.concat(S.takeRecords())).length && !L && (L = !0, queueMicrotask((() => { B(q), q.length = 0, L = !1 }))), S.disconnect(), T = !1
                }
                var q = [],
                    L = !1;

                function R(t) {
                    if (!T) return t();
                    C();
                    let e = t();
                    return P(), e
                }
                var M = !1,
                    I = [];

                function B(t) {
                    if (M) return void(I = I.concat(t));
                    let e = [],
                        n = [],
                        r = new Map,
                        o = new Map;
                    for (let i = 0; i < t.length; i++)
                        if (!t[i].target._x_ignoreMutationObserver && ("childList" === t[i].type && (t[i].addedNodes.forEach((t => 1 === t.nodeType && e.push(t))), t[i].removedNodes.forEach((t => 1 === t.nodeType && n.push(t)))), "attributes" === t[i].type)) {
                            let e = t[i].target,
                                n = t[i].attributeName,
                                a = t[i].oldValue,
                                u = () => { r.has(e) || r.set(e, []), r.get(e).push({ name: n, value: e.getAttribute(n) }) },
                                l = () => { o.has(e) || o.set(e, []), o.get(e).push(n) };
                            e.hasAttribute(n) && null === a ? u() : e.hasAttribute(n) ? (l(), u()) : l()
                        }
                    o.forEach(((t, e) => { N(e, t) })), r.forEach(((t, e) => { k.forEach((n => n(e, t))) }));
                    for (let t of n) e.includes(t) || A.forEach((e => e(t)));
                    e.forEach((t => { t._x_ignoreSelf = !0, t._x_ignore = !0 }));
                    for (let t of e) n.includes(t) || t.isConnected && (delete t._x_ignoreSelf, delete t._x_ignore, j.forEach((e => e(t))), t._x_ignore = !0, t._x_ignoreSelf = !0);
                    e.forEach((t => { delete t._x_ignoreSelf, delete t._x_ignore })), e = null, n = null, r = null, o = null
                }

                function D(t) { return K(z(t)) }

                function U(t, e, n) { return t._x_dataStack = [e, ...z(n || t)], () => { t._x_dataStack = t._x_dataStack.filter((t => t !== e)) } }

                function F(t, e) {
                    let n = t._x_dataStack[0];
                    Object.entries(e).forEach((([t, e]) => { n[t] = e }))
                }

                function z(t) { return t._x_dataStack ? t._x_dataStack : "function" == typeof ShadowRoot && t instanceof ShadowRoot ? z(t.host) : t.parentNode ? z(t.parentNode) : [] }

                function K(t) {
                    let e = new Proxy({}, {
                        ownKeys: () => Array.from(new Set(t.flatMap((t => Object.keys(t))))),
                        has: (e, n) => t.some((t => t.hasOwnProperty(n))),
                        get: (n, r) => (t.find((t => {
                            if (t.hasOwnProperty(r)) {
                                let n = Object.getOwnPropertyDescriptor(t, r);
                                if (n.get && n.get._x_alreadyBound || n.set && n.set._x_alreadyBound) return !0;
                                if ((n.get || n.set) && n.enumerable) {
                                    let o = n.get,
                                        i = n.set,
                                        a = n;
                                    o = o && o.bind(e), i = i && i.bind(e), o && (o._x_alreadyBound = !0), i && (i._x_alreadyBound = !0), Object.defineProperty(t, r, {...a, get: o, set: i })
                                }
                                return !0
                            }
                            return !1
                        })) || {})[r],
                        set: (e, n, r) => { let o = t.find((t => t.hasOwnProperty(n))); return o ? o[n] = r : t[t.length - 1][n] = r, !0 }
                    });
                    return e
                }

                function H(t) { let e = (n, r = "") => { Object.entries(Object.getOwnPropertyDescriptors(n)).forEach((([o, { value: i, enumerable: a }]) => { if (!1 === a || void 0 === i) return; let u = "" === r ? o : `${r}.${o}`; var l; "object" == typeof i && null !== i && i._x_interceptor ? n[o] = i.initialize(t, u, o) : "object" != typeof(l = i) || Array.isArray(l) || null === l || i === n || i instanceof Element || e(i, u) })) }; return e(t) }

                function $(t, e = (() => {})) {
                    let n = { initialValue: void 0, _x_interceptor: !0, initialize(e, n, r) { return t(this.initialValue, (() => function(t, e) { return e.split(".").reduce(((t, e) => t[e]), t) }(e, n)), (t => W(e, n, t)), n, r) } };
                    return e(n), t => {
                        if ("object" == typeof t && null !== t && t._x_interceptor) {
                            let e = n.initialize.bind(n);
                            n.initialize = (r, o, i) => { let a = t.initialize(r, o, i); return n.initialValue = a, e(r, o, i) }
                        } else n.initialValue = t;
                        return n
                    }
                }

                function W(t, e, n) {
                    if ("string" == typeof e && (e = e.split(".")), 1 !== e.length) { if (0 === e.length) throw error; return t[e[0]] || (t[e[0]] = {}), W(t[e[0]], e.slice(1), n) }
                    t[e[0]] = n
                }
                var V = {};

                function Y(t, e) { V[t] = e }

                function Z(t, e) { return Object.entries(V).forEach((([n, r]) => { Object.defineProperty(t, `$${n}`, { get: () => r(e, { Alpine: oe, interceptor: $ }), enumerable: !1 }) })), t }

                function G(t, e, n, ...r) { try { return n(...r) } catch (n) { X(n, t, e) } }

                function X(t, e, n) { Object.assign(t, { el: e, expression: n }), console.warn(`Alpine Expression Error: ${t.message}\n\n${n?'Expression: "'+n+'"\n\n':""}`, e), setTimeout((() => { throw t }), 0) }

                function J(t, e, n = {}) { let r; return Q(t, e)((t => r = t), n), r }

                function Q(...t) { return tt(...t) }
                var tt = et;

                function et(t, e) {
                    let n = {};
                    Z(n, t);
                    let r = [n, ...z(t)];
                    if ("function" == typeof e) return function(t, e) { return (n = (() => {}), { scope: r = {}, params: o = [] } = {}) => { rt(n, e.apply(K([r, ...t]), o)) } }(r, e);
                    let o = function(t, e, n) {
                        let r = function(t, e) {
                            if (nt[t]) return nt[t];
                            let n = Object.getPrototypeOf((async function() {})).constructor,
                                r = /^[\n\s]*if.*\(.*\)/.test(t) || /^(let|const)\s/.test(t) ? `(()  =>  { ${t} })()` : t;
                            let o = (() => { try { return new n(["__self", "scope"], `with (scope) { __self.result = ${r} }; __self.finished = true; return __self.result;`) } catch (n) { return X(n, e, t), Promise.resolve() } })();
                            return nt[t] = o, o
                        }(e, n);
                        return (o = (() => {}), { scope: i = {}, params: a = [] } = {}) => {
                            r.result = void 0, r.finished = !1;
                            let u = K([i, ...t]);
                            if ("function" == typeof r) {
                                let t = r(r, u).catch((t => X(t, n, e)));
                                r.finished ? (rt(o, r.result, u, a, n), r.result = void 0) : t.then((t => { rt(o, t, u, a, n) })).catch((t => X(t, n, e))).finally((() => r.result = void 0))
                            }
                        }
                    }(r, e, t);
                    return G.bind(null, t, e, o)
                }
                var nt = {};

                function rt(t, e, n, r, o) {
                    if ("function" == typeof e) {
                        let i = e.apply(n, r);
                        i instanceof Promise ? i.then((e => rt(t, e, n, r))).catch((t => X(t, o, e))) : t(i)
                    } else t(e)
                }
                var ot = "x-";

                function it(t = "") { return ot + t }
                var at = {};

                function ut(t, e) { at[t] = e }

                function lt(t, e, n) {
                    let r = {},
                        a = Array.from(e).map(pt(((t, e) => r[t] = e))).filter(vt).map(function(t, e) {
                            return ({ name: n, value: r }) => {
                                let o = n.match(gt()),
                                    i = n.match(/:([a-zA-Z0-9\-:]+)/),
                                    a = n.match(/\.[^.\]]+(?=[^\]]*$)/g) || [],
                                    u = e || t[n] || n;
                                return { type: o ? o[1] : null, value: i ? i[1] : null, modifiers: a.map((t => t.replace(".", ""))), expression: r, original: u }
                            }
                        }(r, n)).sort(_t);
                    return a.map((e => function(t, e) {
                        let n = () => {},
                            r = at[e.type] || n,
                            a = [],
                            u = t => a.push(t),
                            [l, s] = function(t) {
                                let e = () => {};
                                return [n => {
                                    let r = o(n);
                                    t._x_effects || (t._x_effects = new Set, t._x_runEffects = () => { t._x_effects.forEach((t => t())) }), t._x_effects.add(r), e = () => { void 0 !== r && (t._x_effects.delete(r), i(r)) }
                                }, () => { e() }]
                            }(t);
                        a.push(s);
                        let c = { Alpine: oe, effect: l, cleanup: u, evaluateLater: Q.bind(Q, t), evaluate: J.bind(J, t) },
                            f = () => a.forEach((t => t()));
                        ! function(t, e, n) { t._x_attributeCleanups || (t._x_attributeCleanups = {}), t._x_attributeCleanups[e] || (t._x_attributeCleanups[e] = []), t._x_attributeCleanups[e].push(n) }(t, e.original, f);
                        let h = () => { t._x_ignore || t._x_ignoreSelf || (r.inline && r.inline(t, e, c), r = r.bind(r, t, e, c), st ? ct.get(ft).push(r) : r()) };
                        return h.runCleanups = f, h
                    }(t, e)))
                }
                var st = !1,
                    ct = new Map,
                    ft = Symbol();
                var ht = (t, e) => ({ name: n, value: r }) => (n.startsWith(t) && (n = n.replace(t, e)), { name: n, value: r });

                function pt(t = (() => {})) { return ({ name: e, value: n }) => { let { name: r, value: o } = dt.reduce(((t, e) => e(t)), { name: e, value: n }); return r !== e && t(r, e), { name: r, value: o } } }
                var dt = [];

                function yt(t) { dt.push(t) }

                function vt({ name: t }) { return gt().test(t) }
                var gt = () => new RegExp(`^${ot}([^:^.]+)\\b`);
                var bt = "DEFAULT",
                    mt = ["ignore", "ref", "data", "id", "bind", "init", "for", "model", "transition", "show", "if", bt, "teleport", "element"];

                function _t(t, e) {
                    let n = -1 === mt.indexOf(t.type) ? bt : t.type,
                        r = -1 === mt.indexOf(e.type) ? bt : e.type;
                    return mt.indexOf(n) - mt.indexOf(r)
                }

                function wt(t, e, n = {}) { t.dispatchEvent(new CustomEvent(e, { detail: n, bubbles: !0, composed: !0, cancelable: !0 })) }
                var xt = [],
                    Ot = !1;

                function Et(t) { xt.push(t), queueMicrotask((() => { Ot || setTimeout((() => { kt() })) })) }

                function kt() { for (Ot = !1; xt.length;) xt.shift()() }

                function At(t, e) { if ("function" == typeof ShadowRoot && t instanceof ShadowRoot) return void Array.from(t.children).forEach((t => At(t, e))); let n = !1; if (e(t, (() => n = !0)), n) return; let r = t.firstElementChild; for (; r;) At(r, e), r = r.nextElementSibling }

                function jt(t, ...e) { console.warn(`Alpine Warning: ${t}`, ...e) }
                var Nt = [],
                    St = [];

                function Tt() { return Nt.map((t => t())) }

                function Pt() { return Nt.concat(St).map((t => t())) }

                function Ct(t) { Nt.push(t) }

                function qt(t) { St.push(t) }

                function Lt(t, e = !1) { return Rt(t, (t => { if ((e ? Pt() : Tt()).some((e => t.matches(e)))) return !0 })) }

                function Rt(t, e) { if (t) { if (e(t)) return t; if (t._x_teleportBack && (t = t._x_teleportBack), t.parentElement) return Rt(t.parentElement, e) } }

                function Mt(t, e = At) {
                    ! function(t) {
                        st = !0;
                        let e = Symbol();
                        ft = e, ct.set(e, []);
                        let n = () => {
                            for (; ct.get(e).length;) ct.get(e).shift()();
                            ct.delete(e)
                        };
                        t(n), st = !1, n()
                    }((() => { e(t, ((t, e) => { lt(t, t.attributes).forEach((t => t())), t._x_ignore && e() })) }))
                }

                function It(t, e) {
                    return Array.isArray(e) ? Bt(t, e.join(" ")) : "object" == typeof e && null !== e ? function(t, e) {
                        let n = t => t.split(" ").filter(Boolean),
                            r = Object.entries(e).flatMap((([t, e]) => !!e && n(t))).filter(Boolean),
                            o = Object.entries(e).flatMap((([t, e]) => !e && n(t))).filter(Boolean),
                            i = [],
                            a = [];
                        return o.forEach((e => { t.classList.contains(e) && (t.classList.remove(e), a.push(e)) })), r.forEach((e => { t.classList.contains(e) || (t.classList.add(e), i.push(e)) })), () => { a.forEach((e => t.classList.add(e))), i.forEach((e => t.classList.remove(e))) }
                    }(t, e) : "function" == typeof e ? It(t, e()) : Bt(t, e)
                }

                function Bt(t, e) { return e = !0 === e ? e = "" : e || "", n = e.split(" ").filter((e => !t.classList.contains(e))).filter(Boolean), t.classList.add(...n), () => { t.classList.remove(...n) }; var n }

                function Dt(t, e) { return "object" == typeof e && null !== e ? function(t, e) { let n = {}; return Object.entries(e).forEach((([e, r]) => { n[e] = t.style[e], t.style.setProperty(e.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase(), r) })), setTimeout((() => { 0 === t.style.length && t.removeAttribute("style") })), () => { Dt(t, n) } }(t, e) : function(t, e) { let n = t.getAttribute("style", e); return t.setAttribute("style", e), () => { t.setAttribute("style", n || "") } }(t, e) }

                function Ut(t, e = (() => {})) { let n = !1; return function() { n ? e.apply(this, arguments) : (n = !0, t.apply(this, arguments)) } }

                function Ft(t, e, n = {}) { t._x_transition || (t._x_transition = { enter: { during: n, start: n, end: n }, leave: { during: n, start: n, end: n }, in (n = (() => {}), r = (() => {})) { Kt(t, e, { during: this.enter.during, start: this.enter.start, end: this.enter.end }, n, r) }, out(n = (() => {}), r = (() => {})) { Kt(t, e, { during: this.leave.during, start: this.leave.start, end: this.leave.end }, n, r) } }) }

                function zt(t) { let e = t.parentNode; if (e) return e._x_hidePromise ? e : zt(e) }

                function Kt(t, e, { during: n, start: r, end: o } = {}, i = (() => {}), a = (() => {})) {
                    if (t._x_transitioning && t._x_transitioning.cancel(), 0 === Object.keys(n).length && 0 === Object.keys(r).length && 0 === Object.keys(o).length) return i(), void a();
                    let u, l, s;
                    ! function(t, e) {
                        let n, r, o, i = Ut((() => { R((() => { n = !0, r || e.before(), o || (e.end(), kt()), e.after(), t.isConnected && e.cleanup(), delete t._x_transitioning })) }));
                        t._x_transitioning = {
                            beforeCancels: [],
                            beforeCancel(t) { this.beforeCancels.push(t) },
                            cancel: Ut((function() {
                                for (; this.beforeCancels.length;) this.beforeCancels.shift()();
                                i()
                            })),
                            finish: i
                        }, R((() => { e.start(), e.during() })), Ot = !0, requestAnimationFrame((() => {
                            if (n) return;
                            let i = 1e3 * Number(getComputedStyle(t).transitionDuration.replace(/,.*/, "").replace("s", "")),
                                a = 1e3 * Number(getComputedStyle(t).transitionDelay.replace(/,.*/, "").replace("s", ""));
                            0 === i && (i = 1e3 * Number(getComputedStyle(t).animationDuration.replace("s", ""))), R((() => { e.before() })), r = !0, requestAnimationFrame((() => { n || (R((() => { e.end() })), kt(), setTimeout(t._x_transitioning.finish, i + a), o = !0) }))
                        }))
                    }(t, { start() { u = e(t, r) }, during() { l = e(t, n) }, before: i, end() { u(), s = e(t, o) }, after: a, cleanup() { l(), s() } })
                }

                function Ht(t, e, n) { if (-1 === t.indexOf(e)) return n; const r = t[t.indexOf(e) + 1]; if (!r) return n; if ("scale" === e && isNaN(r)) return n; if ("duration" === e) { let t = r.match(/([0-9]+)ms/); if (t) return t[1] } return "origin" === e && ["top", "right", "left", "center", "bottom"].includes(t[t.indexOf(e) + 2]) ? [r, t[t.indexOf(e) + 2]].join(" ") : r }
                ut("transition", ((t, { value: e, modifiers: n, expression: r }, { evaluate: o }) => {
                    "function" == typeof r && (r = o(r)), r ? function(t, e, n) { Ft(t, It, ""), { enter: e => { t._x_transition.enter.during = e }, "enter-start": e => { t._x_transition.enter.start = e }, "enter-end": e => { t._x_transition.enter.end = e }, leave: e => { t._x_transition.leave.during = e }, "leave-start": e => { t._x_transition.leave.start = e }, "leave-end": e => { t._x_transition.leave.end = e } }[n](e) }(t, r, e) : function(t, e, n) {
                        Ft(t, Dt);
                        let r = !e.includes("in") && !e.includes("out") && !n,
                            o = r || e.includes("in") || ["enter"].includes(n),
                            i = r || e.includes("out") || ["leave"].includes(n);
                        e.includes("in") && !r && (e = e.filter(((t, n) => n < e.indexOf("out"))));
                        e.includes("out") && !r && (e = e.filter(((t, n) => n > e.indexOf("out"))));
                        let a = !e.includes("opacity") && !e.includes("scale"),
                            u = a || e.includes("opacity"),
                            l = a || e.includes("scale"),
                            s = u ? 0 : 1,
                            c = l ? Ht(e, "scale", 95) / 100 : 1,
                            f = Ht(e, "delay", 0),
                            h = Ht(e, "origin", "center"),
                            p = "opacity, transform",
                            d = Ht(e, "duration", 150) / 1e3,
                            y = Ht(e, "duration", 75) / 1e3,
                            v = "cubic-bezier(0.4, 0.0, 0.2, 1)";
                        o && (t._x_transition.enter.during = { transformOrigin: h, transitionDelay: f, transitionProperty: p, transitionDuration: `${d}s`, transitionTimingFunction: v }, t._x_transition.enter.start = { opacity: s, transform: `scale(${c})` }, t._x_transition.enter.end = { opacity: 1, transform: "scale(1)" });
                        i && (t._x_transition.leave.during = { transformOrigin: h, transitionDelay: f, transitionProperty: p, transitionDuration: `${y}s`, transitionTimingFunction: v }, t._x_transition.leave.start = { opacity: 1, transform: "scale(1)" }, t._x_transition.leave.end = { opacity: s, transform: `scale(${c})` })
                    }(t, n, e)
                })), window.Element.prototype._x_toggleAndCascadeWithTransitions = function(t, e, n, r) {
                    let o = () => { "visible" === document.visibilityState ? requestAnimationFrame(n) : setTimeout(n) };
                    e ? t._x_transition && (t._x_transition.enter || t._x_transition.leave) ? t._x_transition.enter && (Object.entries(t._x_transition.enter.during).length || Object.entries(t._x_transition.enter.start).length || Object.entries(t._x_transition.enter.end).length) ? t._x_transition.in(n) : o() : t._x_transition ? t._x_transition.in(n) : o() : (t._x_hidePromise = t._x_transition ? new Promise(((e, n) => { t._x_transition.out((() => {}), (() => e(r))), t._x_transitioning.beforeCancel((() => n({ isFromCancelledTransition: !0 }))) })) : Promise.resolve(r), queueMicrotask((() => {
                        let e = zt(t);
                        e ? (e._x_hideChildren || (e._x_hideChildren = []), e._x_hideChildren.push(t)) : queueMicrotask((() => {
                            let e = t => { let n = Promise.all([t._x_hidePromise, ...(t._x_hideChildren || []).map(e)]).then((([t]) => t())); return delete t._x_hidePromise, delete t._x_hideChildren, n };
                            e(t).catch((t => { if (!t.isFromCancelledTransition) throw t }))
                        }))
                    })))
                };
                var $t = !1;

                function Wt(t, e = (() => {})) { return (...n) => $t ? e(...n) : t(...n) }

                function Vt(t, e, n, o = []) {
                    switch (t._x_bindings || (t._x_bindings = r({})), t._x_bindings[e] = n, e = o.includes("camel") ? e.toLowerCase().replace(/-(\w)/g, ((t, e) => e.toUpperCase())) : e) {
                        case "value":
                            ! function(t, e) {
                                if ("radio" === t.type) void 0 === t.attributes.value && (t.value = e), window.fromModel && (t.checked = Yt(t.value, e));
                                else if ("checkbox" === t.type) Number.isInteger(e) ? t.value = e : Number.isInteger(e) || Array.isArray(e) || "boolean" == typeof e || [null, void 0].includes(e) ? Array.isArray(e) ? t.checked = e.some((e => Yt(e, t.value))) : t.checked = !!e : t.value = String(e);
                                else if ("SELECT" === t.tagName) ! function(t, e) {
                                    const n = [].concat(e).map((t => t + ""));
                                    Array.from(t.options).forEach((t => { t.selected = n.includes(t.value) }))
                                }(t, e);
                                else {
                                    if (t.value === e) return;
                                    t.value = e
                                }
                            }(t, n);
                            break;
                        case "style":
                            ! function(t, e) {
                                t._x_undoAddedStyles && t._x_undoAddedStyles();
                                t._x_undoAddedStyles = Dt(t, e)
                            }(t, n);
                            break;
                        case "class":
                            ! function(t, e) {
                                t._x_undoAddedClasses && t._x_undoAddedClasses();
                                t._x_undoAddedClasses = It(t, e)
                            }(t, n);
                            break;
                        default:
                            ! function(t, e, n) {
                                [null, void 0, !1].includes(n) && function(t) { return !["aria-pressed", "aria-checked", "aria-expanded", "aria-selected"].includes(t) }(e) ? t.removeAttribute(e) : (Zt(e) && (n = e), function(t, e, n) { t.getAttribute(e) != n && t.setAttribute(e, n) }(t, e, n))
                            }(t, e, n)
                    }
                }

                function Yt(t, e) { return t == e }

                function Zt(t) { return ["disabled", "checked", "required", "readonly", "hidden", "open", "selected", "autofocus", "itemscope", "multiple", "novalidate", "allowfullscreen", "allowpaymentrequest", "formnovalidate", "autoplay", "controls", "loop", "muted", "playsinline", "default", "ismap", "reversed", "async", "defer", "nomodule"].includes(t) }

                function Gt(t, e) {
                    var n;
                    return function() {
                        var r = this,
                            o = arguments,
                            i = function() { n = null, t.apply(r, o) };
                        clearTimeout(n), n = setTimeout(i, e)
                    }
                }

                function Xt(t, e) {
                    let n;
                    return function() {
                        let r = this,
                            o = arguments;
                        n || (t.apply(r, o), n = !0, setTimeout((() => n = !1), e))
                    }
                }
                var Jt = {},
                    Qt = !1;
                var te = {};
                var ee = {};
                var ne, re, oe = {get reactive() { return r },
                        get release() { return i },
                        get effect() { return o },
                        get raw() { return a },
                        version: "3.8.1",
                        flushAndStopDeferringMutations: function() { M = !1, B(I), I = [] },
                        disableEffectScheduling: function(t) { O = !1, t(), O = !0 },
                        setReactivityEngine: function(t) { r = t.reactive, i = t.release, o = e => t.effect(e, { scheduler: t => { O ? w(t) : t() } }), a = t.raw },
                        closestDataStack: z,
                        skipDuringClone: Wt,
                        addRootSelector: Ct,
                        addInitSelector: qt,
                        addScopeToNode: U,
                        deferMutations: function() { M = !0 },
                        mapAttributes: yt,
                        evaluateLater: Q,
                        setEvaluator: function(t) { tt = t },
                        mergeProxies: K,
                        findClosest: Rt,
                        closestRoot: Lt,
                        interceptor: $,
                        transition: Kt,
                        setStyles: Dt,
                        mutateDom: R,
                        directive: ut,
                        throttle: Xt,
                        debounce: Gt,
                        evaluate: J,
                        initTree: Mt,
                        nextTick: Et,
                        prefixed: it,
                        prefix: function(t) { ot = t },
                        plugin: function(t) { t(oe) },
                        magic: Y,
                        store: function(t, e) {
                            if (Qt || (Jt = r(Jt), Qt = !0), void 0 === e) return Jt[t];
                            Jt[t] = e, "object" == typeof e && null !== e && e.hasOwnProperty("init") && "function" == typeof e.init && Jt[t].init(), H(Jt[t])
                        },
                        start: function() {
                            var t;
                            document.body || jt("Unable to initialize. Trying to load Alpine before `<body>` is available. Did you forget to add `defer` in Alpine's `<script>` tag?"), wt(document, "alpine:init"), wt(document, "alpine:initializing"), P(), t = t => Mt(t, At), j.push(t),
                                function(t) { A.push(t) }((t => { At(t, (t => N(t))) })),
                                function(t) { k.push(t) }(((t, e) => { lt(t, e).forEach((t => t())) })), Array.from(document.querySelectorAll(Pt())).filter((t => !Lt(t.parentElement, !0))).forEach((t => { Mt(t) })), wt(document, "alpine:initialized")
                        },
                        clone: function(t, e) {
                            e._x_dataStack || (e._x_dataStack = t._x_dataStack), $t = !0,
                                function(t) {
                                    let e = o;
                                    E(((t, n) => { let r = e(t); return i(r), () => {} })), t(), E(e)
                                }((() => {
                                    ! function(t) {
                                        let e = !1;
                                        Mt(t, ((t, n) => {
                                            At(t, ((t, r) => {
                                                if (e && function(t) { return Tt().some((e => t.matches(e))) }(t)) return r();
                                                e = !0, n(t, r)
                                            }))
                                        }))
                                    }(e)
                                })), $t = !1
                        },
                        bound: function(t, e, n) { if (t._x_bindings && void 0 !== t._x_bindings[e]) return t._x_bindings[e]; let r = t.getAttribute(e); return null === r ? "function" == typeof n ? n() : n : Zt(e) ? !![e, "true"].includes(r) : "" === r || r },
                        $data: D,
                        data: function(t, e) { ee[t] = e },
                        bind: function(t, e) { te[t] = "function" != typeof e ? () => e : e }
                    },
                    ie = (ne = g(), ((t, e, n) => {
                        if (e && "object" == typeof e || "function" == typeof e)
                            for (let r of f(e)) c.call(t, r) || "default" === r || l(t, r, { get: () => e[r], enumerable: !(n = h(e, r)) || n.enumerable });
                        return t
                    })((re = l(null != ne ? u(s(ne)) : {}, "default", ne && ne.__esModule && "default" in ne ? { get: () => ne.default, enumerable: !0 } : { value: ne, enumerable: !0 }), l(re, "__esModule", { value: !0 })), ne));
                Y("nextTick", (() => Et)), Y("dispatch", (t => wt.bind(wt, t))), Y("watch", (t => (e, n) => {
                    let r, i = Q(t, e),
                        a = !0;
                    o((() => i((t => { JSON.stringify(t), a ? r = t : queueMicrotask((() => { n(t, r), r = t })), a = !1 }))))
                })), Y("store", (function() { return Jt })), Y("data", (t => D(t))), Y("root", (t => Lt(t))), Y("refs", (t => (t._x_refs_proxy || (t._x_refs_proxy = K(function(t) {
                    let e = [],
                        n = t;
                    for (; n;) n._x_refs && e.push(n._x_refs), n = n.parentNode;
                    return e
                }(t))), t._x_refs_proxy)));
                var ae = {};

                function ue(t) { return ae[t] || (ae[t] = 0), ++ae[t] }
                Y("id", (t => (e, n = null) => {
                    let r = function(t, e) { return Rt(t, (t => { if (t._x_ids && t._x_ids[e]) return !0 })) }(t, e),
                        o = r ? r._x_ids[e] : ue(e);
                    return n ? `${e}-${o}-${n}` : `${e}-${o}`
                })), Y("el", (t => t)), ut("teleport", ((t, { expression: e }, { cleanup: n }) => {
                    "template" !== t.tagName.toLowerCase() && jt("x-teleport can only be used on a <template> tag", t);
                    let r = document.querySelector(e);
                    r || jt(`Cannot find x-teleport element for selector: "${e}"`);
                    let o = t.content.cloneNode(!0).firstElementChild;
                    t._x_teleport = o, o._x_teleportBack = t, t._x_forwardEvents && t._x_forwardEvents.forEach((e => { o.addEventListener(e, (e => { e.stopPropagation(), t.dispatchEvent(new e.constructor(e.type, e)) })) })), U(o, {}, t), R((() => { r.appendChild(o), Mt(o), o._x_ignore = !0 })), n((() => o.remove()))
                }));
                var le = () => {};

                function se(t, e, n, r) {
                    let o = t,
                        i = t => r(t),
                        a = {},
                        u = (t, e) => n => e(t, n);
                    if (n.includes("dot") && (e = e.replace(/-/g, ".")), n.includes("camel") && (e = function(t) { return t.toLowerCase().replace(/-(\w)/g, ((t, e) => e.toUpperCase())) }(e)), n.includes("passive") && (a.passive = !0), n.includes("capture") && (a.capture = !0), n.includes("window") && (o = window), n.includes("document") && (o = document), n.includes("prevent") && (i = u(i, ((t, e) => { e.preventDefault(), t(e) }))), n.includes("stop") && (i = u(i, ((t, e) => { e.stopPropagation(), t(e) }))), n.includes("self") && (i = u(i, ((e, n) => { n.target === t && e(n) }))), (n.includes("away") || n.includes("outside")) && (o = document, i = u(i, ((e, n) => { t.contains(n.target) || t.offsetWidth < 1 && t.offsetHeight < 1 || !1 !== t._x_isShown && e(n) }))), i = u(i, ((t, r) => {
                            (function(t) { return ["keydown", "keyup"].includes(t) })(e) && function(t, e) {
                                let n = e.filter((t => !["window", "document", "prevent", "stop", "once"].includes(t)));
                                if (n.includes("debounce")) {
                                    let t = n.indexOf("debounce");
                                    n.splice(t, ce((n[t + 1] || "invalid-wait").split("ms")[0]) ? 2 : 1)
                                }
                                if (0 === n.length) return !1;
                                if (1 === n.length && fe(t.key).includes(n[0])) return !1;
                                const r = ["ctrl", "shift", "alt", "meta", "cmd", "super"].filter((t => n.includes(t)));
                                if (n = n.filter((t => !r.includes(t))), r.length > 0) { if (r.filter((e => ("cmd" !== e && "super" !== e || (e = "meta"), t[`${e}Key`]))).length === r.length && fe(t.key).includes(n[0])) return !1 }
                                return !0
                            }(r, n) || t(r)
                        })), n.includes("debounce")) {
                        let t = n[n.indexOf("debounce") + 1] || "invalid-wait",
                            e = ce(t.split("ms")[0]) ? Number(t.split("ms")[0]) : 250;
                        i = Gt(i, e)
                    }
                    if (n.includes("throttle")) {
                        let t = n[n.indexOf("throttle") + 1] || "invalid-wait",
                            e = ce(t.split("ms")[0]) ? Number(t.split("ms")[0]) : 250;
                        i = Xt(i, e)
                    }
                    return n.includes("once") && (i = u(i, ((t, n) => { t(n), o.removeEventListener(e, i, a) }))), o.addEventListener(e, i, a), () => { o.removeEventListener(e, i, a) }
                }

                function ce(t) { return !Array.isArray(t) && !isNaN(t) }

                function fe(t) {
                    if (!t) return [];
                    t = t.replace(/([a-z])([A-Z])/g, "$1-$2").replace(/[_\s]/, "-").toLowerCase();
                    let e = { ctrl: "control", slash: "/", space: "-", spacebar: "-", cmd: "meta", esc: "escape", up: "arrow-up", down: "arrow-down", left: "arrow-left", right: "arrow-right", period: ".", equal: "=" };
                    return e[t] = t, Object.keys(e).map((n => { if (e[n] === t) return n })).filter((t => t))
                }

                function he(t) { let e = t ? parseFloat(t) : null; return n = e, Array.isArray(n) || isNaN(n) ? t : e; var n }

                function pe(t, e, n, r) { let o = {}; if (/^\[.*\]$/.test(t.item) && Array.isArray(e)) { t.item.replace("[", "").replace("]", "").split(",").map((t => t.trim())).forEach(((t, n) => { o[t] = e[n] })) } else if (/^\{.*\}$/.test(t.item) && !Array.isArray(e) && "object" == typeof e) { t.item.replace("{", "").replace("}", "").split(",").map((t => t.trim())).forEach((t => { o[t] = e[t] })) } else o[t.item] = e; return t.index && (o[t.index] = n), t.collection && (o[t.collection] = r), o }

                function de() {}
                le.inline = (t, { modifiers: e }, { cleanup: n }) => { e.includes("self") ? t._x_ignoreSelf = !0 : t._x_ignore = !0, n((() => { e.includes("self") ? delete t._x_ignoreSelf : delete t._x_ignore })) }, ut("ignore", le), ut("effect", ((t, { expression: e }, { effect: n }) => n(Q(t, e)))), ut("model", ((t, { modifiers: e, expression: n }, { effect: r, cleanup: o }) => {
                    let i = Q(t, n),
                        a = Q(t, `${n} = rightSideOfExpression($event, ${n})`);
                    var u = "select" === t.tagName.toLowerCase() || ["checkbox", "radio"].includes(t.type) || e.includes("lazy") ? "change" : "input";
                    let l = function(t, e, n) { "radio" === t.type && R((() => { t.hasAttribute("name") || t.setAttribute("name", n) })); return (n, r) => R((() => { if (n instanceof CustomEvent && void 0 !== n.detail) return n.detail || n.target.value; if ("checkbox" === t.type) { if (Array.isArray(r)) { let t = e.includes("number") ? he(n.target.value) : n.target.value; return n.target.checked ? r.concat([t]) : r.filter((e => !(e == t))) } return n.target.checked } if ("select" === t.tagName.toLowerCase() && t.multiple) return e.includes("number") ? Array.from(n.target.selectedOptions).map((t => he(t.value || t.text))) : Array.from(n.target.selectedOptions).map((t => t.value || t.text)); { let t = n.target.value; return e.includes("number") ? he(t) : e.includes("trim") ? t.trim() : t } })) }(t, e, n),
                        s = se(t, u, e, (t => { a((() => {}), { scope: { $event: t, rightSideOfExpression: l } }) }));
                    o((() => s()));
                    let c = Q(t, `${n} = __placeholder`);
                    t._x_model = {get() { let t; return i((e => t = e)), t }, set(t) { c((() => {}), { scope: { __placeholder: t } }) } }, t._x_forceModelUpdate = () => { i((e => { void 0 === e && n.match(/\./) && (e = ""), window.fromModel = !0, R((() => Vt(t, "value", e))), delete window.fromModel })) }, r((() => { e.includes("unintrusive") && document.activeElement.isSameNode(t) || t._x_forceModelUpdate() }))
                })), ut("cloak", (t => queueMicrotask((() => R((() => t.removeAttribute(it("cloak")))))))), qt((() => `[${it("init")}]`)), ut("init", Wt(((t, { expression: e }) => "string" == typeof e ? !!e.trim() && J(t, e, {}) : J(t, e, {})))), ut("text", ((t, { expression: e }, { effect: n, evaluateLater: r }) => {
                    let o = r(e);
                    n((() => { o((e => { R((() => { t.textContent = e })) })) }))
                })), ut("html", ((t, { expression: e }, { effect: n, evaluateLater: r }) => {
                    let o = r(e);
                    n((() => { o((e => { t.innerHTML = e })) }))
                })), yt(ht(":", it("bind:"))), ut("bind", ((t, { value: e, modifiers: n, expression: r, original: o }, { effect: i }) => {
                    if (!e) return function(t, e, n, r) {
                        let o = {};
                        i = o, Object.entries(te).forEach((([t, e]) => { Object.defineProperty(i, t, { get: () => (...t) => e(...t) }) }));
                        var i;
                        let a = Q(t, e),
                            u = [];
                        for (; u.length;) u.pop()();
                        a((e => {
                            let r = Object.entries(e).map((([t, e]) => ({ name: t, value: e }))),
                                o = function(t) { return Array.from(t).map(pt()).filter((t => !vt(t))) }(r);
                            r = r.map((t => o.find((e => e.name === t.name)) ? { name: `x-bind:${t.name}`, value: `"${t.value}"` } : t)), lt(t, r, n).map((t => { u.push(t.runCleanups), t() }))
                        }), { scope: o })
                    }(t, r, o);
                    if ("key" === e) return function(t, e) { t._x_keyExpression = e }(t, r);
                    let a = Q(t, r);
                    i((() => a((o => { void 0 === o && r.match(/\./) && (o = ""), R((() => Vt(t, e, o, n))) }))))
                })), Ct((() => `[${it("data")}]`)), ut("data", Wt(((t, { expression: e }, { cleanup: n }) => {
                    e = "" === e ? "{}" : e;
                    let o = {};
                    Z(o, t);
                    let i = {};
                    var a, u;
                    a = i, u = o, Object.entries(ee).forEach((([t, e]) => { Object.defineProperty(a, t, { get: () => (...t) => e.bind(u)(...t), enumerable: !1 }) }));
                    let l = J(t, e, { scope: i });
                    void 0 === l && (l = {}), Z(l, t);
                    let s = r(l);
                    H(s);
                    let c = U(t, s);
                    s.init && J(t, s.init), n((() => { c(), s.destroy && J(t, s.destroy) }))
                }))), ut("show", ((t, { modifiers: e, expression: n }, { effect: r }) => {
                    let o, i = Q(t, n),
                        a = () => R((() => { t.style.display = "none", t._x_isShown = !1 })),
                        u = () => R((() => { 1 === t.style.length && "none" === t.style.display ? t.removeAttribute("style") : t.style.removeProperty("display"), t._x_isShown = !0 })),
                        l = () => setTimeout(u),
                        s = Ut((t => t ? u() : a()), (e => { "function" == typeof t._x_toggleAndCascadeWithTransitions ? t._x_toggleAndCascadeWithTransitions(t, e, u, a) : e ? l() : a() })),
                        c = !0;
                    r((() => i((t => {
                        (c || t !== o) && (e.includes("immediate") && (t ? l() : a()), s(t), o = t, c = !1)
                    }))))
                })), ut("for", ((t, { expression: e }, { effect: n, cleanup: o }) => {
                    let i = function(t) {
                            let e = /,([^,\}\]]*)(?:,([^,\}\]]*))?$/,
                                n = /^\s*\(|\)\s*$/g,
                                r = /([\s\S]*?)\s+(?:in|of)\s+([\s\S]*)/,
                                o = t.match(r);
                            if (!o) return;
                            let i = {};
                            i.items = o[2].trim();
                            let a = o[1].replace(n, "").trim(),
                                u = a.match(e);
                            u ? (i.item = a.replace(e, "").trim(), i.index = u[1].trim(), u[2] && (i.collection = u[2].trim())) : i.item = a;
                            return i
                        }(e),
                        a = Q(t, i.items),
                        u = Q(t, t._x_keyExpression || "index");
                    t._x_prevKeys = [], t._x_lookup = {}, n((() => function(t, e, n, o) {
                        let i = t => "object" == typeof t && !Array.isArray(t),
                            a = t;
                        n((n => {
                            var u;
                            u = n, !Array.isArray(u) && !isNaN(u) && n >= 0 && (n = Array.from(Array(n).keys(), (t => t + 1))), void 0 === n && (n = []);
                            let l = t._x_lookup,
                                s = t._x_prevKeys,
                                c = [],
                                f = [];
                            if (i(n)) n = Object.entries(n).map((([t, r]) => {
                                let i = pe(e, r, t, n);
                                o((t => f.push(t)), { scope: { index: t, ...i } }), c.push(i)
                            }));
                            else
                                for (let t = 0; t < n.length; t++) {
                                    let r = pe(e, n[t], t, n);
                                    o((t => f.push(t)), { scope: { index: t, ...r } }), c.push(r)
                                }
                            let h = [],
                                p = [],
                                d = [],
                                y = [];
                            for (let t = 0; t < s.length; t++) { let e = s[t]; - 1 === f.indexOf(e) && d.push(e) }
                            s = s.filter((t => !d.includes(t)));
                            let v = "template";
                            for (let t = 0; t < f.length; t++) {
                                let e = f[t],
                                    n = s.indexOf(e);
                                if (-1 === n) s.splice(t, 0, e), h.push([v, t]);
                                else if (n !== t) {
                                    let e = s.splice(t, 1)[0],
                                        r = s.splice(n - 1, 1)[0];
                                    s.splice(t, 0, r), s.splice(n, 0, e), p.push([e, r])
                                } else y.push(e);
                                v = e
                            }
                            for (let t = 0; t < d.length; t++) {
                                let e = d[t];
                                l[e].remove(), l[e] = null, delete l[e]
                            }
                            for (let t = 0; t < p.length; t++) {
                                let [e, n] = p[t], r = l[e], o = l[n], i = document.createElement("div");
                                R((() => { o.after(i), r.after(o), o._x_currentIfEl && o.after(o._x_currentIfEl), i.before(r), r._x_currentIfEl && r.after(r._x_currentIfEl), i.remove() })), F(o, c[f.indexOf(n)])
                            }
                            for (let t = 0; t < h.length; t++) {
                                let [e, n] = h[t], o = "template" === e ? a : l[e];
                                o._x_currentIfEl && (o = o._x_currentIfEl);
                                let i = c[n],
                                    u = f[n],
                                    s = document.importNode(a.content, !0).firstElementChild;
                                U(s, r(i), a), R((() => { o.after(s), Mt(s) })), "object" == typeof u && jt("x-for key cannot be an object, it must be a string or an integer", a), l[u] = s
                            }
                            for (let t = 0; t < y.length; t++) F(l[y[t]], c[f.indexOf(y[t])]);
                            a._x_prevKeys = f
                        }))
                    }(t, i, a, u))), o((() => { Object.values(t._x_lookup).forEach((t => t.remove())), delete t._x_prevKeys, delete t._x_lookup }))
                })), de.inline = (t, { expression: e }, { cleanup: n }) => {
                    let r = Lt(t);
                    r._x_refs || (r._x_refs = {}), r._x_refs[e] = t, n((() => delete r._x_refs[e]))
                }, ut("ref", de), ut("if", ((t, { expression: e }, { effect: n, cleanup: r }) => {
                    let o = Q(t, e);
                    n((() => o((e => {
                        e ? (() => {
                            if (t._x_currentIfEl) return t._x_currentIfEl;
                            let e = t.content.cloneNode(!0).firstElementChild;
                            U(e, {}, t), R((() => { t.after(e), Mt(e) })), t._x_currentIfEl = e, t._x_undoIf = () => { e.remove(), delete t._x_currentIfEl }
                        })() : t._x_undoIf && (t._x_undoIf(), delete t._x_undoIf)
                    })))), r((() => t._x_undoIf && t._x_undoIf()))
                })), ut("id", ((t, { expression: e }, { evaluate: n }) => { n(e).forEach((e => function(t, e) { t._x_ids || (t._x_ids = {}), t._x_ids[e] || (t._x_ids[e] = ue(e)) }(t, e))) })), yt(ht("@", it("on:"))), ut("on", Wt(((t, { value: e, modifiers: n, expression: r }, { cleanup: o }) => {
                    let i = r ? Q(t, r) : () => {};
                    "template" === t.tagName.toLowerCase() && (t._x_forwardEvents || (t._x_forwardEvents = []), t._x_forwardEvents.includes(e) || t._x_forwardEvents.push(e));
                    let a = se(t, e, n, (t => { i((() => {}), { scope: { $event: t }, params: [t] }) }));
                    o((() => a()))
                }))), oe.setEvaluator(et), oe.setReactivityEngine({ reactive: ie.reactive, effect: ie.effect, release: ie.stop, raw: ie.toRaw });
                var ye = oe,
                    ve = n(95),
                    ge = n.n(ve);
                var be = function(t) {
                        let e = () => {
                            let e, n = localStorage;
                            return t.interceptor(((r, o, i, a, u) => {
                                let l = e || `_x_${a}`,
                                    s = function(t, e) { return null !== e.getItem(t) }(l, n) ? function(t, e) { return JSON.parse(e.getItem(t, e)) }(l, n) : r;
                                return i(s), t.effect((() => { let t = o();! function(t, e, n) { n.setItem(t, JSON.stringify(e)) }(l, t, n), i(t) })), s
                            }), (t => { t.as = n => (e = n, t), t.using = e => (n = e, t) }))
                        };
                        Object.defineProperty(t, "$persist", { get: () => e() }), t.magic("persist", e)
                    },
                    me = "undefined" != typeof navigator && navigator.userAgent.toLowerCase().indexOf("firefox") > 0;

                function _e(t, e, n) { t.addEventListener ? t.addEventListener(e, n, !1) : t.attachEvent && t.attachEvent("on".concat(e), (function() { n(window.event) })) }

                function we(t, e) { for (var n = e.slice(0, e.length - 1), r = 0; r < n.length; r++) n[r] = t[n[r].toLowerCase()]; return n }

                function xe(t) { "string" != typeof t && (t = ""); for (var e = (t = t.replace(/\s/g, "")).split(","), n = e.lastIndexOf(""); n >= 0;) e[n - 1] += ",", e.splice(n, 1), n = e.lastIndexOf(""); return e }
                for (var Oe = { backspace: 8, tab: 9, clear: 12, enter: 13, return: 13, esc: 27, escape: 27, space: 32, left: 37, up: 38, right: 39, down: 40, del: 46, delete: 46, ins: 45, insert: 45, home: 36, end: 35, pageup: 33, pagedown: 34, capslock: 20, num_0: 96, num_1: 97, num_2: 98, num_3: 99, num_4: 100, num_5: 101, num_6: 102, num_7: 103, num_8: 104, num_9: 105, num_multiply: 106, num_add: 107, num_enter: 108, num_subtract: 109, num_decimal: 110, num_divide: 111, "⇪": 20, ",": 188, ".": 190, "/": 191, "`": 192, "-": me ? 173 : 189, "=": me ? 61 : 187, ";": me ? 59 : 186, "'": 222, "[": 219, "]": 221, "\\": 220 }, Ee = { "⇧": 16, shift: 16, "⌥": 18, alt: 18, option: 18, "⌃": 17, ctrl: 17, control: 17, "⌘": 91, cmd: 91, command: 91 }, ke = { 16: "shiftKey", 18: "altKey", 17: "ctrlKey", 91: "metaKey", shiftKey: 16, ctrlKey: 17, altKey: 18, metaKey: 91 }, Ae = { 16: !1, 18: !1, 17: !1, 91: !1 }, je = {}, Ne = 1; Ne < 20; Ne++) Oe["f".concat(Ne)] = 111 + Ne;
                var Se = [],
                    Te = "all",
                    Pe = [],
                    Ce = function(t) { return Oe[t.toLowerCase()] || Ee[t.toLowerCase()] || t.toUpperCase().charCodeAt(0) };

                function qe(t) { Te = t || "all" }

                function Le() { return Te || "all" }
                var Re = function(t) {
                    var e = t.key,
                        n = t.scope,
                        r = t.method,
                        o = t.splitKey,
                        i = void 0 === o ? "+" : o;
                    xe(e).forEach((function(t) {
                        var e = t.split(i),
                            o = e.length,
                            a = e[o - 1],
                            u = "*" === a ? "*" : Ce(a);
                        if (je[u]) {
                            n || (n = Le());
                            var l = o > 1 ? we(Ee, e) : [];
                            je[u] = je[u].map((function(t) { return (!r || t.method === r) && t.scope === n && function(t, e) { for (var n = t.length >= e.length ? t : e, r = t.length >= e.length ? e : t, o = !0, i = 0; i < n.length; i++) - 1 === r.indexOf(n[i]) && (o = !1); return o }(t.mods, l) ? {} : t }))
                        }
                    }))
                };

                function Me(t, e, n) {
                    var r;
                    if (e.scope === n || "all" === e.scope) {
                        for (var o in r = e.mods.length > 0, Ae) Object.prototype.hasOwnProperty.call(Ae, o) && (!Ae[o] && e.mods.indexOf(+o) > -1 || Ae[o] && -1 === e.mods.indexOf(+o)) && (r = !1);
                        (0 !== e.mods.length || Ae[16] || Ae[18] || Ae[17] || Ae[91]) && !r && "*" !== e.shortcut || !1 === e.method(t, e) && (t.preventDefault ? t.preventDefault() : t.returnValue = !1, t.stopPropagation && t.stopPropagation(), t.cancelBubble && (t.cancelBubble = !0))
                    }
                }

                function Ie(t) {
                    var e = je["*"],
                        n = t.keyCode || t.which || t.charCode;
                    if (Be.filter.call(this, t)) {
                        if (93 !== n && 224 !== n || (n = 91), -1 === Se.indexOf(n) && 229 !== n && Se.push(n), ["ctrlKey", "altKey", "shiftKey", "metaKey"].forEach((function(e) {
                                var n = ke[e];
                                t[e] && -1 === Se.indexOf(n) ? Se.push(n) : !t[e] && Se.indexOf(n) > -1 ? Se.splice(Se.indexOf(n), 1) : "metaKey" === e && t[e] && 3 === Se.length && (t.ctrlKey || t.shiftKey || t.altKey || (Se = Se.slice(Se.indexOf(n))))
                            })), n in Ae) { for (var r in Ae[n] = !0, Ee) Ee[r] === n && (Be[r] = !0); if (!e) return }
                        for (var o in Ae) Object.prototype.hasOwnProperty.call(Ae, o) && (Ae[o] = t[ke[o]]);
                        t.getModifierState && (!t.altKey || t.ctrlKey) && t.getModifierState("AltGraph") && (-1 === Se.indexOf(17) && Se.push(17), -1 === Se.indexOf(18) && Se.push(18), Ae[17] = !0, Ae[18] = !0);
                        var i = Le();
                        if (e)
                            for (var a = 0; a < e.length; a++) e[a].scope === i && ("keydown" === t.type && e[a].keydown || "keyup" === t.type && e[a].keyup) && Me(t, e[a], i);
                        if (n in je)
                            for (var u = 0; u < je[n].length; u++)
                                if (("keydown" === t.type && je[n][u].keydown || "keyup" === t.type && je[n][u].keyup) && je[n][u].key) {
                                    for (var l = je[n][u], s = l.splitKey, c = l.key.split(s), f = [], h = 0; h < c.length; h++) f.push(Ce(c[h]));
                                    f.sort().join("") === Se.sort().join("") && Me(t, l, i)
                                }
                    }
                }

                function Be(t, e, n) {
                    Se = [];
                    var r = xe(t),
                        o = [],
                        i = "all",
                        a = document,
                        u = 0,
                        l = !1,
                        s = !0,
                        c = "+";
                    for (void 0 === n && "function" == typeof e && (n = e), "[object Object]" === Object.prototype.toString.call(e) && (e.scope && (i = e.scope), e.element && (a = e.element), e.keyup && (l = e.keyup), void 0 !== e.keydown && (s = e.keydown), "string" == typeof e.splitKey && (c = e.splitKey)), "string" == typeof e && (i = e); u < r.length; u++) o = [], (t = r[u].split(c)).length > 1 && (o = we(Ee, t)), (t = "*" === (t = t[t.length - 1]) ? "*" : Ce(t)) in je || (je[t] = []), je[t].push({ keyup: l, keydown: s, scope: i, mods: o, shortcut: r[u], method: n, key: r[u], splitKey: c });
                    void 0 !== a && ! function(t) { return Pe.indexOf(t) > -1 }(a) && window && (Pe.push(a), _e(a, "keydown", (function(t) { Ie(t) })), _e(window, "focus", (function() { Se = [] })), _e(a, "keyup", (function(t) {
                        Ie(t),
                            function(t) {
                                var e = t.keyCode || t.which || t.charCode,
                                    n = Se.indexOf(e);
                                if (n >= 0 && Se.splice(n, 1), t.key && "meta" === t.key.toLowerCase() && Se.splice(0, Se.length), 93 !== e && 224 !== e || (e = 91), e in Ae)
                                    for (var r in Ae[e] = !1, Ee) Ee[r] === e && (Be[r] = !1)
                            }(t)
                    })))
                }
                var De = {
                    setScope: qe,
                    getScope: Le,
                    deleteScope: function(t, e) {
                        var n, r;
                        for (var o in t || (t = Le()), je)
                            if (Object.prototype.hasOwnProperty.call(je, o))
                                for (n = je[o], r = 0; r < n.length;) n[r].scope === t ? n.splice(r, 1) : r++;
                        Le() === t && qe(e || "all")
                    },
                    getPressedKeyCodes: function() { return Se.slice(0) },
                    isPressed: function(t) { return "string" == typeof t && (t = Ce(t)), -1 !== Se.indexOf(t) },
                    filter: function(t) {
                        var e = t.target || t.srcElement,
                            n = e.tagName,
                            r = !0;
                        return !e.isContentEditable && ("INPUT" !== n && "TEXTAREA" !== n && "SELECT" !== n || e.readOnly) || (r = !1), r
                    },
                    unbind: function(t) {
                        if (t) {
                            if (Array.isArray(t)) t.forEach((function(t) { t.key && Re(t) }));
                            else if ("object" == typeof t) t.key && Re(t);
                            else if ("string" == typeof t) {
                                for (var e = arguments.length, n = new Array(e > 1 ? e - 1 : 0), r = 1; r < e; r++) n[r - 1] = arguments[r];
                                var o = n[0],
                                    i = n[1];
                                "function" == typeof o && (i = o, o = ""), Re({ key: t, scope: o, method: i, splitKey: "+" })
                            }
                        } else Object.keys(je).forEach((function(t) { return delete je[t] }))
                    }
                };
                for (var Ue in De) Object.prototype.hasOwnProperty.call(De, Ue) && (Be[Ue] = De[Ue]);
                if ("undefined" != typeof window) {
                    var Fe = window.hotkeys;
                    Be.noConflict = function(t) { return t && window.hotkeys === Be && (window.hotkeys = Fe), Be }, window.hotkeys = Be
                }
                const ze = Be;
                n(689), ye.directive("global", (function(t, e) {
                    var n = e.expression;
                    new Function("_", "$data", "_." + n + " = $data;return;")(window, t._x_dataStack[0])
                })), window.Alpine = ye, window.Quill = ge(), ye.plugin(be), ye.start();
                var Ke = ze.noConflict();
                if ("undefined" != typeof LP_DATA) {
                    var He = LP_DATA.appBaseUrl;
                    He = He.replace(/&quot;/g, ""), Ke(".+s,.+h,.+l,.+d,.+p,shift+/,esc,/", (function(t, e) {
                        switch (t.preventDefault(), e.key) {
                            case "/":
                                document.getElementById("searchString").focus();
                                break;
                            case ".+h":
                                window.location.replace(He + "/hubble");
                                break;
                            case ".+s":
                                window.location.replace(He + "/spell-check");
                                break;
                            case ".+l":
                            default:
                                window.location.replace(He + "/lumiere");
                                break;
                            case ".+d":
                                window.location.replace(He + "/");
                                break;
                            case ".+p":
                                window.location.replace(He + "/pdf-extraction");
                                break;
                            case "shift+/":
                                LP_DATA.isShortCutsModalOpen = !LP_DATA.isShortCutsModalOpen;
                                break;
                            case "esc":
                                LP_DATA.isShortCutsModalOpen = !1
                        }
                    }))
                }
            },
            689: (t, e, n) => { window._ = n(486), window.axios = n(669), window.axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest" },
            742: (t, e) => {
                "use strict";
                e.byteLength = function(t) {
                    var e = l(t),
                        n = e[0],
                        r = e[1];
                    return 3 * (n + r) / 4 - r
                }, e.toByteArray = function(t) {
                    var e, n, i = l(t),
                        a = i[0],
                        u = i[1],
                        s = new o(function(t, e, n) { return 3 * (e + n) / 4 - n }(0, a, u)),
                        c = 0,
                        f = u > 0 ? a - 4 : a;
                    for (n = 0; n < f; n += 4) e = r[t.charCodeAt(n)] << 18 | r[t.charCodeAt(n + 1)] << 12 | r[t.charCodeAt(n + 2)] << 6 | r[t.charCodeAt(n + 3)], s[c++] = e >> 16 & 255, s[c++] = e >> 8 & 255, s[c++] = 255 & e;
                    2 === u && (e = r[t.charCodeAt(n)] << 2 | r[t.charCodeAt(n + 1)] >> 4, s[c++] = 255 & e);
                    1 === u && (e = r[t.charCodeAt(n)] << 10 | r[t.charCodeAt(n + 1)] << 4 | r[t.charCodeAt(n + 2)] >> 2, s[c++] = e >> 8 & 255, s[c++] = 255 & e);
                    return s
                }, e.fromByteArray = function(t) {
                    for (var e, r = t.length, o = r % 3, i = [], a = 16383, u = 0, l = r - o; u < l; u += a) i.push(s(t, u, u + a > l ? l : u + a));
                    1 === o ? (e = t[r - 1], i.push(n[e >> 2] + n[e << 4 & 63] + "==")) : 2 === o && (e = (t[r - 2] << 8) + t[r - 1], i.push(n[e >> 10] + n[e >> 4 & 63] + n[e << 2 & 63] + "="));
                    return i.join("")
                };
                for (var n = [], r = [], o = "undefined" != typeof Uint8Array ? Uint8Array : Array, i = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", a = 0, u = i.length; a < u; ++a) n[a] = i[a], r[i.charCodeAt(a)] = a;

                function l(t) { var e = t.length; if (e % 4 > 0) throw new Error("Invalid string. Length must be a multiple of 4"); var n = t.indexOf("="); return -1 === n && (n = e), [n, n === e ? 0 : 4 - n % 4] }

                function s(t, e, r) { for (var o, i, a = [], u = e; u < r; u += 3) o = (t[u] << 16 & 16711680) + (t[u + 1] << 8 & 65280) + (255 & t[u + 2]), a.push(n[(i = o) >> 18 & 63] + n[i >> 12 & 63] + n[i >> 6 & 63] + n[63 & i]); return a.join("") }
                r["-".charCodeAt(0)] = 62, r["_".charCodeAt(0)] = 63
            },
            764: (t, e, n) => {
                "use strict";
                var r = n(742),
                    o = n(645),
                    i = n(826);

                function a() { return l.TYPED_ARRAY_SUPPORT ? 2147483647 : 1073741823 }

                function u(t, e) { if (a() < e) throw new RangeError("Invalid typed array length"); return l.TYPED_ARRAY_SUPPORT ? (t = new Uint8Array(e)).__proto__ = l.prototype : (null === t && (t = new l(e)), t.length = e), t }

                function l(t, e, n) { if (!(l.TYPED_ARRAY_SUPPORT || this instanceof l)) return new l(t, e, n); if ("number" == typeof t) { if ("string" == typeof e) throw new Error("If encoding is specified then the first argument must be a string"); return f(this, t) } return s(this, t, e, n) }

                function s(t, e, n, r) {
                    if ("number" == typeof e) throw new TypeError('"value" argument must not be a number');
                    return "undefined" != typeof ArrayBuffer && e instanceof ArrayBuffer ? function(t, e, n, r) {
                        if (e.byteLength, n < 0 || e.byteLength < n) throw new RangeError("'offset' is out of bounds");
                        if (e.byteLength < n + (r || 0)) throw new RangeError("'length' is out of bounds");
                        e = void 0 === n && void 0 === r ? new Uint8Array(e) : void 0 === r ? new Uint8Array(e, n) : new Uint8Array(e, n, r);
                        l.TYPED_ARRAY_SUPPORT ? (t = e).__proto__ = l.prototype : t = h(t, e);
                        return t
                    }(t, e, n, r) : "string" == typeof e ? function(t, e, n) {
                        "string" == typeof n && "" !== n || (n = "utf8");
                        if (!l.isEncoding(n)) throw new TypeError('"encoding" must be a valid string encoding');
                        var r = 0 | d(e, n),
                            o = (t = u(t, r)).write(e, n);
                        o !== r && (t = t.slice(0, o));
                        return t
                    }(t, e, n) : function(t, e) { if (l.isBuffer(e)) { var n = 0 | p(e.length); return 0 === (t = u(t, n)).length || e.copy(t, 0, 0, n), t } if (e) { if ("undefined" != typeof ArrayBuffer && e.buffer instanceof ArrayBuffer || "length" in e) return "number" != typeof e.length || (r = e.length) != r ? u(t, 0) : h(t, e); if ("Buffer" === e.type && i(e.data)) return h(t, e.data) } var r; throw new TypeError("First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.") }(t, e)
                }

                function c(t) { if ("number" != typeof t) throw new TypeError('"size" argument must be a number'); if (t < 0) throw new RangeError('"size" argument must not be negative') }

                function f(t, e) {
                    if (c(e), t = u(t, e < 0 ? 0 : 0 | p(e)), !l.TYPED_ARRAY_SUPPORT)
                        for (var n = 0; n < e; ++n) t[n] = 0;
                    return t
                }

                function h(t, e) {
                    var n = e.length < 0 ? 0 : 0 | p(e.length);
                    t = u(t, n);
                    for (var r = 0; r < n; r += 1) t[r] = 255 & e[r];
                    return t
                }

                function p(t) { if (t >= a()) throw new RangeError("Attempt to allocate Buffer larger than maximum size: 0x" + a().toString(16) + " bytes"); return 0 | t }

                function d(t, e) {
                    if (l.isBuffer(t)) return t.length;
                    if ("undefined" != typeof ArrayBuffer && "function" == typeof ArrayBuffer.isView && (ArrayBuffer.isView(t) || t instanceof ArrayBuffer)) return t.byteLength;
                    "string" != typeof t && (t = "" + t);
                    var n = t.length;
                    if (0 === n) return 0;
                    for (var r = !1;;) switch (e) {
                        case "ascii":
                        case "latin1":
                        case "binary":
                            return n;
                        case "utf8":
                        case "utf-8":
                        case void 0:
                            return F(t).length;
                        case "ucs2":
                        case "ucs-2":
                        case "utf16le":
                        case "utf-16le":
                            return 2 * n;
                        case "hex":
                            return n >>> 1;
                        case "base64":
                            return z(t).length;
                        default:
                            if (r) return F(t).length;
                            e = ("" + e).toLowerCase(), r = !0
                    }
                }

                function y(t, e, n) {
                    var r = !1;
                    if ((void 0 === e || e < 0) && (e = 0), e > this.length) return "";
                    if ((void 0 === n || n > this.length) && (n = this.length), n <= 0) return "";
                    if ((n >>>= 0) <= (e >>>= 0)) return "";
                    for (t || (t = "utf8");;) switch (t) {
                        case "hex":
                            return T(this, e, n);
                        case "utf8":
                        case "utf-8":
                            return A(this, e, n);
                        case "ascii":
                            return N(this, e, n);
                        case "latin1":
                        case "binary":
                            return S(this, e, n);
                        case "base64":
                            return k(this, e, n);
                        case "ucs2":
                        case "ucs-2":
                        case "utf16le":
                        case "utf-16le":
                            return P(this, e, n);
                        default:
                            if (r) throw new TypeError("Unknown encoding: " + t);
                            t = (t + "").toLowerCase(), r = !0
                    }
                }

                function v(t, e, n) {
                    var r = t[e];
                    t[e] = t[n], t[n] = r
                }

                function g(t, e, n, r, o) {
                    if (0 === t.length) return -1;
                    if ("string" == typeof n ? (r = n, n = 0) : n > 2147483647 ? n = 2147483647 : n < -2147483648 && (n = -2147483648), n = +n, isNaN(n) && (n = o ? 0 : t.length - 1), n < 0 && (n = t.length + n), n >= t.length) {
                        if (o) return -1;
                        n = t.length - 1
                    } else if (n < 0) {
                        if (!o) return -1;
                        n = 0
                    }
                    if ("string" == typeof e && (e = l.from(e, r)), l.isBuffer(e)) return 0 === e.length ? -1 : b(t, e, n, r, o);
                    if ("number" == typeof e) return e &= 255, l.TYPED_ARRAY_SUPPORT && "function" == typeof Uint8Array.prototype.indexOf ? o ? Uint8Array.prototype.indexOf.call(t, e, n) : Uint8Array.prototype.lastIndexOf.call(t, e, n) : b(t, [e], n, r, o);
                    throw new TypeError("val must be string, number or Buffer")
                }

                function b(t, e, n, r, o) {
                    var i, a = 1,
                        u = t.length,
                        l = e.length;
                    if (void 0 !== r && ("ucs2" === (r = String(r).toLowerCase()) || "ucs-2" === r || "utf16le" === r || "utf-16le" === r)) {
                        if (t.length < 2 || e.length < 2) return -1;
                        a = 2, u /= 2, l /= 2, n /= 2
                    }

                    function s(t, e) { return 1 === a ? t[e] : t.readUInt16BE(e * a) }
                    if (o) {
                        var c = -1;
                        for (i = n; i < u; i++)
                            if (s(t, i) === s(e, -1 === c ? 0 : i - c)) { if (-1 === c && (c = i), i - c + 1 === l) return c * a } else -1 !== c && (i -= i - c), c = -1
                    } else
                        for (n + l > u && (n = u - l), i = n; i >= 0; i--) {
                            for (var f = !0, h = 0; h < l; h++)
                                if (s(t, i + h) !== s(e, h)) { f = !1; break }
                            if (f) return i
                        }
                    return -1
                }

                function m(t, e, n, r) {
                    n = Number(n) || 0;
                    var o = t.length - n;
                    r ? (r = Number(r)) > o && (r = o) : r = o;
                    var i = e.length;
                    if (i % 2 != 0) throw new TypeError("Invalid hex string");
                    r > i / 2 && (r = i / 2);
                    for (var a = 0; a < r; ++a) {
                        var u = parseInt(e.substr(2 * a, 2), 16);
                        if (isNaN(u)) return a;
                        t[n + a] = u
                    }
                    return a
                }

                function _(t, e, n, r) { return K(F(e, t.length - n), t, n, r) }

                function w(t, e, n, r) { return K(function(t) { for (var e = [], n = 0; n < t.length; ++n) e.push(255 & t.charCodeAt(n)); return e }(e), t, n, r) }

                function x(t, e, n, r) { return w(t, e, n, r) }

                function O(t, e, n, r) { return K(z(e), t, n, r) }

                function E(t, e, n, r) { return K(function(t, e) { for (var n, r, o, i = [], a = 0; a < t.length && !((e -= 2) < 0); ++a) r = (n = t.charCodeAt(a)) >> 8, o = n % 256, i.push(o), i.push(r); return i }(e, t.length - n), t, n, r) }

                function k(t, e, n) { return 0 === e && n === t.length ? r.fromByteArray(t) : r.fromByteArray(t.slice(e, n)) }

                function A(t, e, n) {
                    n = Math.min(t.length, n);
                    for (var r = [], o = e; o < n;) {
                        var i, a, u, l, s = t[o],
                            c = null,
                            f = s > 239 ? 4 : s > 223 ? 3 : s > 191 ? 2 : 1;
                        if (o + f <= n) switch (f) {
                            case 1:
                                s < 128 && (c = s);
                                break;
                            case 2:
                                128 == (192 & (i = t[o + 1])) && (l = (31 & s) << 6 | 63 & i) > 127 && (c = l);
                                break;
                            case 3:
                                i = t[o + 1], a = t[o + 2], 128 == (192 & i) && 128 == (192 & a) && (l = (15 & s) << 12 | (63 & i) << 6 | 63 & a) > 2047 && (l < 55296 || l > 57343) && (c = l);
                                break;
                            case 4:
                                i = t[o + 1], a = t[o + 2], u = t[o + 3], 128 == (192 & i) && 128 == (192 & a) && 128 == (192 & u) && (l = (15 & s) << 18 | (63 & i) << 12 | (63 & a) << 6 | 63 & u) > 65535 && l < 1114112 && (c = l)
                        }
                        null === c ? (c = 65533, f = 1) : c > 65535 && (c -= 65536, r.push(c >>> 10 & 1023 | 55296), c = 56320 | 1023 & c), r.push(c), o += f
                    }
                    return function(t) {
                        var e = t.length;
                        if (e <= j) return String.fromCharCode.apply(String, t);
                        var n = "",
                            r = 0;
                        for (; r < e;) n += String.fromCharCode.apply(String, t.slice(r, r += j));
                        return n
                    }(r)
                }
                e.Buffer = l, e.SlowBuffer = function(t) {+t != t && (t = 0); return l.alloc(+t) }, e.INSPECT_MAX_BYTES = 50, l.TYPED_ARRAY_SUPPORT = void 0 !== n.g.TYPED_ARRAY_SUPPORT ? n.g.TYPED_ARRAY_SUPPORT : function() { try { var t = new Uint8Array(1); return t.__proto__ = { __proto__: Uint8Array.prototype, foo: function() { return 42 } }, 42 === t.foo() && "function" == typeof t.subarray && 0 === t.subarray(1, 1).byteLength } catch (t) { return !1 } }(), e.kMaxLength = a(), l.poolSize = 8192, l._augment = function(t) { return t.__proto__ = l.prototype, t }, l.from = function(t, e, n) { return s(null, t, e, n) }, l.TYPED_ARRAY_SUPPORT && (l.prototype.__proto__ = Uint8Array.prototype, l.__proto__ = Uint8Array, "undefined" != typeof Symbol && Symbol.species && l[Symbol.species] === l && Object.defineProperty(l, Symbol.species, { value: null, configurable: !0 })), l.alloc = function(t, e, n) { return function(t, e, n, r) { return c(e), e <= 0 ? u(t, e) : void 0 !== n ? "string" == typeof r ? u(t, e).fill(n, r) : u(t, e).fill(n) : u(t, e) }(null, t, e, n) }, l.allocUnsafe = function(t) { return f(null, t) }, l.allocUnsafeSlow = function(t) { return f(null, t) }, l.isBuffer = function(t) { return !(null == t || !t._isBuffer) }, l.compare = function(t, e) {
                    if (!l.isBuffer(t) || !l.isBuffer(e)) throw new TypeError("Arguments must be Buffers");
                    if (t === e) return 0;
                    for (var n = t.length, r = e.length, o = 0, i = Math.min(n, r); o < i; ++o)
                        if (t[o] !== e[o]) { n = t[o], r = e[o]; break }
                    return n < r ? -1 : r < n ? 1 : 0
                }, l.isEncoding = function(t) {
                    switch (String(t).toLowerCase()) {
                        case "hex":
                        case "utf8":
                        case "utf-8":
                        case "ascii":
                        case "latin1":
                        case "binary":
                        case "base64":
                        case "ucs2":
                        case "ucs-2":
                        case "utf16le":
                        case "utf-16le":
                            return !0;
                        default:
                            return !1
                    }
                }, l.concat = function(t, e) {
                    if (!i(t)) throw new TypeError('"list" argument must be an Array of Buffers');
                    if (0 === t.length) return l.alloc(0);
                    var n;
                    if (void 0 === e)
                        for (e = 0, n = 0; n < t.length; ++n) e += t[n].length;
                    var r = l.allocUnsafe(e),
                        o = 0;
                    for (n = 0; n < t.length; ++n) {
                        var a = t[n];
                        if (!l.isBuffer(a)) throw new TypeError('"list" argument must be an Array of Buffers');
                        a.copy(r, o), o += a.length
                    }
                    return r
                }, l.byteLength = d, l.prototype._isBuffer = !0, l.prototype.swap16 = function() { var t = this.length; if (t % 2 != 0) throw new RangeError("Buffer size must be a multiple of 16-bits"); for (var e = 0; e < t; e += 2) v(this, e, e + 1); return this }, l.prototype.swap32 = function() { var t = this.length; if (t % 4 != 0) throw new RangeError("Buffer size must be a multiple of 32-bits"); for (var e = 0; e < t; e += 4) v(this, e, e + 3), v(this, e + 1, e + 2); return this }, l.prototype.swap64 = function() { var t = this.length; if (t % 8 != 0) throw new RangeError("Buffer size must be a multiple of 64-bits"); for (var e = 0; e < t; e += 8) v(this, e, e + 7), v(this, e + 1, e + 6), v(this, e + 2, e + 5), v(this, e + 3, e + 4); return this }, l.prototype.toString = function() { var t = 0 | this.length; return 0 === t ? "" : 0 === arguments.length ? A(this, 0, t) : y.apply(this, arguments) }, l.prototype.equals = function(t) { if (!l.isBuffer(t)) throw new TypeError("Argument must be a Buffer"); return this === t || 0 === l.compare(this, t) }, l.prototype.inspect = function() {
                    var t = "",
                        n = e.INSPECT_MAX_BYTES;
                    return this.length > 0 && (t = this.toString("hex", 0, n).match(/.{2}/g).join(" "), this.length > n && (t += " ... ")), "<Buffer " + t + ">"
                }, l.prototype.compare = function(t, e, n, r, o) {
                    if (!l.isBuffer(t)) throw new TypeError("Argument must be a Buffer");
                    if (void 0 === e && (e = 0), void 0 === n && (n = t ? t.length : 0), void 0 === r && (r = 0), void 0 === o && (o = this.length), e < 0 || n > t.length || r < 0 || o > this.length) throw new RangeError("out of range index");
                    if (r >= o && e >= n) return 0;
                    if (r >= o) return -1;
                    if (e >= n) return 1;
                    if (this === t) return 0;
                    for (var i = (o >>>= 0) - (r >>>= 0), a = (n >>>= 0) - (e >>>= 0), u = Math.min(i, a), s = this.slice(r, o), c = t.slice(e, n), f = 0; f < u; ++f)
                        if (s[f] !== c[f]) { i = s[f], a = c[f]; break }
                    return i < a ? -1 : a < i ? 1 : 0
                }, l.prototype.includes = function(t, e, n) { return -1 !== this.indexOf(t, e, n) }, l.prototype.indexOf = function(t, e, n) { return g(this, t, e, n, !0) }, l.prototype.lastIndexOf = function(t, e, n) { return g(this, t, e, n, !1) }, l.prototype.write = function(t, e, n, r) {
                    if (void 0 === e) r = "utf8", n = this.length, e = 0;
                    else if (void 0 === n && "string" == typeof e) r = e, n = this.length, e = 0;
                    else {
                        if (!isFinite(e)) throw new Error("Buffer.write(string, encoding, offset[, length]) is no longer supported");
                        e |= 0, isFinite(n) ? (n |= 0, void 0 === r && (r = "utf8")) : (r = n, n = void 0)
                    }
                    var o = this.length - e;
                    if ((void 0 === n || n > o) && (n = o), t.length > 0 && (n < 0 || e < 0) || e > this.length) throw new RangeError("Attempt to write outside buffer bounds");
                    r || (r = "utf8");
                    for (var i = !1;;) switch (r) {
                        case "hex":
                            return m(this, t, e, n);
                        case "utf8":
                        case "utf-8":
                            return _(this, t, e, n);
                        case "ascii":
                            return w(this, t, e, n);
                        case "latin1":
                        case "binary":
                            return x(this, t, e, n);
                        case "base64":
                            return O(this, t, e, n);
                        case "ucs2":
                        case "ucs-2":
                        case "utf16le":
                        case "utf-16le":
                            return E(this, t, e, n);
                        default:
                            if (i) throw new TypeError("Unknown encoding: " + r);
                            r = ("" + r).toLowerCase(), i = !0
                    }
                }, l.prototype.toJSON = function() { return { type: "Buffer", data: Array.prototype.slice.call(this._arr || this, 0) } };
                var j = 4096;

                function N(t, e, n) {
                    var r = "";
                    n = Math.min(t.length, n);
                    for (var o = e; o < n; ++o) r += String.fromCharCode(127 & t[o]);
                    return r
                }

                function S(t, e, n) {
                    var r = "";
                    n = Math.min(t.length, n);
                    for (var o = e; o < n; ++o) r += String.fromCharCode(t[o]);
                    return r
                }

                function T(t, e, n) {
                    var r = t.length;
                    (!e || e < 0) && (e = 0), (!n || n < 0 || n > r) && (n = r);
                    for (var o = "", i = e; i < n; ++i) o += U(t[i]);
                    return o
                }

                function P(t, e, n) { for (var r = t.slice(e, n), o = "", i = 0; i < r.length; i += 2) o += String.fromCharCode(r[i] + 256 * r[i + 1]); return o }

                function C(t, e, n) { if (t % 1 != 0 || t < 0) throw new RangeError("offset is not uint"); if (t + e > n) throw new RangeError("Trying to access beyond buffer length") }

                function q(t, e, n, r, o, i) { if (!l.isBuffer(t)) throw new TypeError('"buffer" argument must be a Buffer instance'); if (e > o || e < i) throw new RangeError('"value" argument is out of bounds'); if (n + r > t.length) throw new RangeError("Index out of range") }

                function L(t, e, n, r) { e < 0 && (e = 65535 + e + 1); for (var o = 0, i = Math.min(t.length - n, 2); o < i; ++o) t[n + o] = (e & 255 << 8 * (r ? o : 1 - o)) >>> 8 * (r ? o : 1 - o) }

                function R(t, e, n, r) { e < 0 && (e = 4294967295 + e + 1); for (var o = 0, i = Math.min(t.length - n, 4); o < i; ++o) t[n + o] = e >>> 8 * (r ? o : 3 - o) & 255 }

                function M(t, e, n, r, o, i) { if (n + r > t.length) throw new RangeError("Index out of range"); if (n < 0) throw new RangeError("Index out of range") }

                function I(t, e, n, r, i) { return i || M(t, 0, n, 4), o.write(t, e, n, r, 23, 4), n + 4 }

                function B(t, e, n, r, i) { return i || M(t, 0, n, 8), o.write(t, e, n, r, 52, 8), n + 8 }
                l.prototype.slice = function(t, e) {
                    var n, r = this.length;
                    if ((t = ~~t) < 0 ? (t += r) < 0 && (t = 0) : t > r && (t = r), (e = void 0 === e ? r : ~~e) < 0 ? (e += r) < 0 && (e = 0) : e > r && (e = r), e < t && (e = t), l.TYPED_ARRAY_SUPPORT)(n = this.subarray(t, e)).__proto__ = l.prototype;
                    else {
                        var o = e - t;
                        n = new l(o, void 0);
                        for (var i = 0; i < o; ++i) n[i] = this[i + t]
                    }
                    return n
                }, l.prototype.readUIntLE = function(t, e, n) { t |= 0, e |= 0, n || C(t, e, this.length); for (var r = this[t], o = 1, i = 0; ++i < e && (o *= 256);) r += this[t + i] * o; return r }, l.prototype.readUIntBE = function(t, e, n) { t |= 0, e |= 0, n || C(t, e, this.length); for (var r = this[t + --e], o = 1; e > 0 && (o *= 256);) r += this[t + --e] * o; return r }, l.prototype.readUInt8 = function(t, e) { return e || C(t, 1, this.length), this[t] }, l.prototype.readUInt16LE = function(t, e) { return e || C(t, 2, this.length), this[t] | this[t + 1] << 8 }, l.prototype.readUInt16BE = function(t, e) { return e || C(t, 2, this.length), this[t] << 8 | this[t + 1] }, l.prototype.readUInt32LE = function(t, e) { return e || C(t, 4, this.length), (this[t] | this[t + 1] << 8 | this[t + 2] << 16) + 16777216 * this[t + 3] }, l.prototype.readUInt32BE = function(t, e) { return e || C(t, 4, this.length), 16777216 * this[t] + (this[t + 1] << 16 | this[t + 2] << 8 | this[t + 3]) }, l.prototype.readIntLE = function(t, e, n) { t |= 0, e |= 0, n || C(t, e, this.length); for (var r = this[t], o = 1, i = 0; ++i < e && (o *= 256);) r += this[t + i] * o; return r >= (o *= 128) && (r -= Math.pow(2, 8 * e)), r }, l.prototype.readIntBE = function(t, e, n) { t |= 0, e |= 0, n || C(t, e, this.length); for (var r = e, o = 1, i = this[t + --r]; r > 0 && (o *= 256);) i += this[t + --r] * o; return i >= (o *= 128) && (i -= Math.pow(2, 8 * e)), i }, l.prototype.readInt8 = function(t, e) { return e || C(t, 1, this.length), 128 & this[t] ? -1 * (255 - this[t] + 1) : this[t] }, l.prototype.readInt16LE = function(t, e) { e || C(t, 2, this.length); var n = this[t] | this[t + 1] << 8; return 32768 & n ? 4294901760 | n : n }, l.prototype.readInt16BE = function(t, e) { e || C(t, 2, this.length); var n = this[t + 1] | this[t] << 8; return 32768 & n ? 4294901760 | n : n }, l.prototype.readInt32LE = function(t, e) { return e || C(t, 4, this.length), this[t] | this[t + 1] << 8 | this[t + 2] << 16 | this[t + 3] << 24 }, l.prototype.readInt32BE = function(t, e) { return e || C(t, 4, this.length), this[t] << 24 | this[t + 1] << 16 | this[t + 2] << 8 | this[t + 3] }, l.prototype.readFloatLE = function(t, e) { return e || C(t, 4, this.length), o.read(this, t, !0, 23, 4) }, l.prototype.readFloatBE = function(t, e) { return e || C(t, 4, this.length), o.read(this, t, !1, 23, 4) }, l.prototype.readDoubleLE = function(t, e) { return e || C(t, 8, this.length), o.read(this, t, !0, 52, 8) }, l.prototype.readDoubleBE = function(t, e) { return e || C(t, 8, this.length), o.read(this, t, !1, 52, 8) }, l.prototype.writeUIntLE = function(t, e, n, r) {
                    (t = +t, e |= 0, n |= 0, r) || q(this, t, e, n, Math.pow(2, 8 * n) - 1, 0);
                    var o = 1,
                        i = 0;
                    for (this[e] = 255 & t; ++i < n && (o *= 256);) this[e + i] = t / o & 255;
                    return e + n
                }, l.prototype.writeUIntBE = function(t, e, n, r) {
                    (t = +t, e |= 0, n |= 0, r) || q(this, t, e, n, Math.pow(2, 8 * n) - 1, 0);
                    var o = n - 1,
                        i = 1;
                    for (this[e + o] = 255 & t; --o >= 0 && (i *= 256);) this[e + o] = t / i & 255;
                    return e + n
                }, l.prototype.writeUInt8 = function(t, e, n) { return t = +t, e |= 0, n || q(this, t, e, 1, 255, 0), l.TYPED_ARRAY_SUPPORT || (t = Math.floor(t)), this[e] = 255 & t, e + 1 }, l.prototype.writeUInt16LE = function(t, e, n) { return t = +t, e |= 0, n || q(this, t, e, 2, 65535, 0), l.TYPED_ARRAY_SUPPORT ? (this[e] = 255 & t, this[e + 1] = t >>> 8) : L(this, t, e, !0), e + 2 }, l.prototype.writeUInt16BE = function(t, e, n) { return t = +t, e |= 0, n || q(this, t, e, 2, 65535, 0), l.TYPED_ARRAY_SUPPORT ? (this[e] = t >>> 8, this[e + 1] = 255 & t) : L(this, t, e, !1), e + 2 }, l.prototype.writeUInt32LE = function(t, e, n) { return t = +t, e |= 0, n || q(this, t, e, 4, 4294967295, 0), l.TYPED_ARRAY_SUPPORT ? (this[e + 3] = t >>> 24, this[e + 2] = t >>> 16, this[e + 1] = t >>> 8, this[e] = 255 & t) : R(this, t, e, !0), e + 4 }, l.prototype.writeUInt32BE = function(t, e, n) { return t = +t, e |= 0, n || q(this, t, e, 4, 4294967295, 0), l.TYPED_ARRAY_SUPPORT ? (this[e] = t >>> 24, this[e + 1] = t >>> 16, this[e + 2] = t >>> 8, this[e + 3] = 255 & t) : R(this, t, e, !1), e + 4 }, l.prototype.writeIntLE = function(t, e, n, r) {
                    if (t = +t, e |= 0, !r) {
                        var o = Math.pow(2, 8 * n - 1);
                        q(this, t, e, n, o - 1, -o)
                    }
                    var i = 0,
                        a = 1,
                        u = 0;
                    for (this[e] = 255 & t; ++i < n && (a *= 256);) t < 0 && 0 === u && 0 !== this[e + i - 1] && (u = 1), this[e + i] = (t / a >> 0) - u & 255;
                    return e + n
                }, l.prototype.writeIntBE = function(t, e, n, r) {
                    if (t = +t, e |= 0, !r) {
                        var o = Math.pow(2, 8 * n - 1);
                        q(this, t, e, n, o - 1, -o)
                    }
                    var i = n - 1,
                        a = 1,
                        u = 0;
                    for (this[e + i] = 255 & t; --i >= 0 && (a *= 256);) t < 0 && 0 === u && 0 !== this[e + i + 1] && (u = 1), this[e + i] = (t / a >> 0) - u & 255;
                    return e + n
                }, l.prototype.writeInt8 = function(t, e, n) { return t = +t, e |= 0, n || q(this, t, e, 1, 127, -128), l.TYPED_ARRAY_SUPPORT || (t = Math.floor(t)), t < 0 && (t = 255 + t + 1), this[e] = 255 & t, e + 1 }, l.prototype.writeInt16LE = function(t, e, n) { return t = +t, e |= 0, n || q(this, t, e, 2, 32767, -32768), l.TYPED_ARRAY_SUPPORT ? (this[e] = 255 & t, this[e + 1] = t >>> 8) : L(this, t, e, !0), e + 2 }, l.prototype.writeInt16BE = function(t, e, n) { return t = +t, e |= 0, n || q(this, t, e, 2, 32767, -32768), l.TYPED_ARRAY_SUPPORT ? (this[e] = t >>> 8, this[e + 1] = 255 & t) : L(this, t, e, !1), e + 2 }, l.prototype.writeInt32LE = function(t, e, n) { return t = +t, e |= 0, n || q(this, t, e, 4, 2147483647, -2147483648), l.TYPED_ARRAY_SUPPORT ? (this[e] = 255 & t, this[e + 1] = t >>> 8, this[e + 2] = t >>> 16, this[e + 3] = t >>> 24) : R(this, t, e, !0), e + 4 }, l.prototype.writeInt32BE = function(t, e, n) { return t = +t, e |= 0, n || q(this, t, e, 4, 2147483647, -2147483648), t < 0 && (t = 4294967295 + t + 1), l.TYPED_ARRAY_SUPPORT ? (this[e] = t >>> 24, this[e + 1] = t >>> 16, this[e + 2] = t >>> 8, this[e + 3] = 255 & t) : R(this, t, e, !1), e + 4 }, l.prototype.writeFloatLE = function(t, e, n) { return I(this, t, e, !0, n) }, l.prototype.writeFloatBE = function(t, e, n) { return I(this, t, e, !1, n) }, l.prototype.writeDoubleLE = function(t, e, n) { return B(this, t, e, !0, n) }, l.prototype.writeDoubleBE = function(t, e, n) { return B(this, t, e, !1, n) }, l.prototype.copy = function(t, e, n, r) {
                    if (n || (n = 0), r || 0 === r || (r = this.length), e >= t.length && (e = t.length), e || (e = 0), r > 0 && r < n && (r = n), r === n) return 0;
                    if (0 === t.length || 0 === this.length) return 0;
                    if (e < 0) throw new RangeError("targetStart out of bounds");
                    if (n < 0 || n >= this.length) throw new RangeError("sourceStart out of bounds");
                    if (r < 0) throw new RangeError("sourceEnd out of bounds");
                    r > this.length && (r = this.length), t.length - e < r - n && (r = t.length - e + n);
                    var o, i = r - n;
                    if (this === t && n < e && e < r)
                        for (o = i - 1; o >= 0; --o) t[o + e] = this[o + n];
                    else if (i < 1e3 || !l.TYPED_ARRAY_SUPPORT)
                        for (o = 0; o < i; ++o) t[o + e] = this[o + n];
                    else Uint8Array.prototype.set.call(t, this.subarray(n, n + i), e);
                    return i
                }, l.prototype.fill = function(t, e, n, r) {
                    if ("string" == typeof t) {
                        if ("string" == typeof e ? (r = e, e = 0, n = this.length) : "string" == typeof n && (r = n, n = this.length), 1 === t.length) {
                            var o = t.charCodeAt(0);
                            o < 256 && (t = o)
                        }
                        if (void 0 !== r && "string" != typeof r) throw new TypeError("encoding must be a string");
                        if ("string" == typeof r && !l.isEncoding(r)) throw new TypeError("Unknown encoding: " + r)
                    } else "number" == typeof t && (t &= 255);
                    if (e < 0 || this.length < e || this.length < n) throw new RangeError("Out of range index");
                    if (n <= e) return this;
                    var i;
                    if (e >>>= 0, n = void 0 === n ? this.length : n >>> 0, t || (t = 0), "number" == typeof t)
                        for (i = e; i < n; ++i) this[i] = t;
                    else {
                        var a = l.isBuffer(t) ? t : F(new l(t, r).toString()),
                            u = a.length;
                        for (i = 0; i < n - e; ++i) this[i + e] = a[i % u]
                    }
                    return this
                };
                var D = /[^+\/0-9A-Za-z-_]/g;

                function U(t) { return t < 16 ? "0" + t.toString(16) : t.toString(16) }

                function F(t, e) {
                    var n;
                    e = e || 1 / 0;
                    for (var r = t.length, o = null, i = [], a = 0; a < r; ++a) {
                        if ((n = t.charCodeAt(a)) > 55295 && n < 57344) {
                            if (!o) {
                                if (n > 56319) {
                                    (e -= 3) > -1 && i.push(239, 191, 189);
                                    continue
                                }
                                if (a + 1 === r) {
                                    (e -= 3) > -1 && i.push(239, 191, 189);
                                    continue
                                }
                                o = n;
                                continue
                            }
                            if (n < 56320) {
                                (e -= 3) > -1 && i.push(239, 191, 189), o = n;
                                continue
                            }
                            n = 65536 + (o - 55296 << 10 | n - 56320)
                        } else o && (e -= 3) > -1 && i.push(239, 191, 189);
                        if (o = null, n < 128) {
                            if ((e -= 1) < 0) break;
                            i.push(n)
                        } else if (n < 2048) {
                            if ((e -= 2) < 0) break;
                            i.push(n >> 6 | 192, 63 & n | 128)
                        } else if (n < 65536) {
                            if ((e -= 3) < 0) break;
                            i.push(n >> 12 | 224, n >> 6 & 63 | 128, 63 & n | 128)
                        } else {
                            if (!(n < 1114112)) throw new Error("Invalid code point");
                            if ((e -= 4) < 0) break;
                            i.push(n >> 18 | 240, n >> 12 & 63 | 128, n >> 6 & 63 | 128, 63 & n | 128)
                        }
                    }
                    return i
                }

                function z(t) { return r.toByteArray(function(t) { if ((t = function(t) { return t.trim ? t.trim() : t.replace(/^\s+|\s+$/g, "") }(t).replace(D, "")).length < 2) return ""; for (; t.length % 4 != 0;) t += "="; return t }(t)) }

                function K(t, e, n, r) { for (var o = 0; o < r && !(o + n >= e.length || o >= t.length); ++o) e[o + n] = t[o]; return o }
            },
            645: (t, e) => {
                e.read = function(t, e, n, r, o) {
                    var i, a, u = 8 * o - r - 1,
                        l = (1 << u) - 1,
                        s = l >> 1,
                        c = -7,
                        f = n ? o - 1 : 0,
                        h = n ? -1 : 1,
                        p = t[e + f];
                    for (f += h, i = p & (1 << -c) - 1, p >>= -c, c += u; c > 0; i = 256 * i + t[e + f], f += h, c -= 8);
                    for (a = i & (1 << -c) - 1, i >>= -c, c += r; c > 0; a = 256 * a + t[e + f], f += h, c -= 8);
                    if (0 === i) i = 1 - s;
                    else {
                        if (i === l) return a ? NaN : 1 / 0 * (p ? -1 : 1);
                        a += Math.pow(2, r), i -= s
                    }
                    return (p ? -1 : 1) * a * Math.pow(2, i - r)
                }, e.write = function(t, e, n, r, o, i) {
                    var a, u, l, s = 8 * i - o - 1,
                        c = (1 << s) - 1,
                        f = c >> 1,
                        h = 23 === o ? Math.pow(2, -24) - Math.pow(2, -77) : 0,
                        p = r ? 0 : i - 1,
                        d = r ? 1 : -1,
                        y = e < 0 || 0 === e && 1 / e < 0 ? 1 : 0;
                    for (e = Math.abs(e), isNaN(e) || e === 1 / 0 ? (u = isNaN(e) ? 1 : 0, a = c) : (a = Math.floor(Math.log(e) / Math.LN2), e * (l = Math.pow(2, -a)) < 1 && (a--, l *= 2), (e += a + f >= 1 ? h / l : h * Math.pow(2, 1 - f)) * l >= 2 && (a++, l /= 2), a + f >= c ? (u = 0, a = c) : a + f >= 1 ? (u = (e * l - 1) * Math.pow(2, o), a += f) : (u = e * Math.pow(2, f - 1) * Math.pow(2, o), a = 0)); o >= 8; t[n + p] = 255 & u, p += d, u /= 256, o -= 8);
                    for (a = a << o | u, s += o; s > 0; t[n + p] = 255 & a, p += d, a /= 256, s -= 8);
                    t[n + p - d] |= 128 * y
                }
            },
            826: t => {
                var e = {}.toString;
                t.exports = Array.isArray || function(t) { return "[object Array]" == e.call(t) }
            },
            486: function(t, e, n) {
                var r;
                t = n.nmd(t),
                    function() {
                        var o, i = "Expected a function",
                            a = "__lodash_hash_undefined__",
                            u = "__lodash_placeholder__",
                            l = 16,
                            s = 32,
                            c = 64,
                            f = 128,
                            h = 256,
                            p = 1 / 0,
                            d = 9007199254740991,
                            y = NaN,
                            v = 4294967295,
                            g = [
                                ["ary", f],
                                ["bind", 1],
                                ["bindKey", 2],
                                ["curry", 8],
                                ["curryRight", l],
                                ["flip", 512],
                                ["partial", s],
                                ["partialRight", c],
                                ["rearg", h]
                            ],
                            b = "[object Arguments]",
                            m = "[object Array]",
                            _ = "[object Boolean]",
                            w = "[object Date]",
                            x = "[object Error]",
                            O = "[object Function]",
                            E = "[object GeneratorFunction]",
                            k = "[object Map]",
                            A = "[object Number]",
                            j = "[object Object]",
                            N = "[object Promise]",
                            S = "[object RegExp]",
                            T = "[object Set]",
                            P = "[object String]",
                            C = "[object Symbol]",
                            q = "[object WeakMap]",
                            L = "[object ArrayBuffer]",
                            R = "[object DataView]",
                            M = "[object Float32Array]",
                            I = "[object Float64Array]",
                            B = "[object Int8Array]",
                            D = "[object Int16Array]",
                            U = "[object Int32Array]",
                            F = "[object Uint8Array]",
                            z = "[object Uint8ClampedArray]",
                            K = "[object Uint16Array]",
                            H = "[object Uint32Array]",
                            $ = /\b__p \+= '';/g,
                            W = /\b(__p \+=) '' \+/g,
                            V = /(__e\(.*?\)|\b__t\)) \+\n'';/g,
                            Y = /&(?:amp|lt|gt|quot|#39);/g,
                            Z = /[&<>"']/g,
                            G = RegExp(Y.source),
                            X = RegExp(Z.source),
                            J = /<%-([\s\S]+?)%>/g,
                            Q = /<%([\s\S]+?)%>/g,
                            tt = /<%=([\s\S]+?)%>/g,
                            et = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/,
                            nt = /^\w*$/,
                            rt = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g,
                            ot = /[\\^$.*+?()[\]{}|]/g,
                            it = RegExp(ot.source),
                            at = /^\s+/,
                            ut = /\s/,
                            lt = /\{(?:\n\/\* \[wrapped with .+\] \*\/)?\n?/,
                            st = /\{\n\/\* \[wrapped with (.+)\] \*/,
                            ct = /,? & /,
                            ft = /[^\x00-\x2f\x3a-\x40\x5b-\x60\x7b-\x7f]+/g,
                            ht = /[()=,{}\[\]\/\s]/,
                            pt = /\\(\\)?/g,
                            dt = /\$\{([^\\}]*(?:\\.[^\\}]*)*)\}/g,
                            yt = /\w*$/,
                            vt = /^[-+]0x[0-9a-f]+$/i,
                            gt = /^0b[01]+$/i,
                            bt = /^\[object .+?Constructor\]$/,
                            mt = /^0o[0-7]+$/i,
                            _t = /^(?:0|[1-9]\d*)$/,
                            wt = /[\xc0-\xd6\xd8-\xf6\xf8-\xff\u0100-\u017f]/g,
                            xt = /($^)/,
                            Ot = /['\n\r\u2028\u2029\\]/g,
                            Et = "\\u0300-\\u036f\\ufe20-\\ufe2f\\u20d0-\\u20ff",
                            kt = "\\u2700-\\u27bf",
                            At = "a-z\\xdf-\\xf6\\xf8-\\xff",
                            jt = "A-Z\\xc0-\\xd6\\xd8-\\xde",
                            Nt = "\\ufe0e\\ufe0f",
                            St = "\\xac\\xb1\\xd7\\xf7\\x00-\\x2f\\x3a-\\x40\\x5b-\\x60\\x7b-\\xbf\\u2000-\\u206f \\t\\x0b\\f\\xa0\\ufeff\\n\\r\\u2028\\u2029\\u1680\\u180e\\u2000\\u2001\\u2002\\u2003\\u2004\\u2005\\u2006\\u2007\\u2008\\u2009\\u200a\\u202f\\u205f\\u3000",
                            Tt = "['’]",
                            Pt = "[\\ud800-\\udfff]",
                            Ct = "[" + St + "]",
                            qt = "[" + Et + "]",
                            Lt = "\\d+",
                            Rt = "[\\u2700-\\u27bf]",
                            Mt = "[" + At + "]",
                            It = "[^\\ud800-\\udfff" + St + Lt + kt + At + jt + "]",
                            Bt = "\\ud83c[\\udffb-\\udfff]",
                            Dt = "[^\\ud800-\\udfff]",
                            Ut = "(?:\\ud83c[\\udde6-\\uddff]){2}",
                            Ft = "[\\ud800-\\udbff][\\udc00-\\udfff]",
                            zt = "[" + jt + "]",
                            Kt = "(?:" + Mt + "|" + It + ")",
                            Ht = "(?:" + zt + "|" + It + ")",
                            $t = "(?:['’](?:d|ll|m|re|s|t|ve))?",
                            Wt = "(?:['’](?:D|LL|M|RE|S|T|VE))?",
                            Vt = "(?:" + qt + "|" + Bt + ")" + "?",
                            Yt = "[\\ufe0e\\ufe0f]?",
                            Zt = Yt + Vt + ("(?:\\u200d(?:" + [Dt, Ut, Ft].join("|") + ")" + Yt + Vt + ")*"),
                            Gt = "(?:" + [Rt, Ut, Ft].join("|") + ")" + Zt,
                            Xt = "(?:" + [Dt + qt + "?", qt, Ut, Ft, Pt].join("|") + ")",
                            Jt = RegExp(Tt, "g"),
                            Qt = RegExp(qt, "g"),
                            te = RegExp(Bt + "(?=" + Bt + ")|" + Xt + Zt, "g"),
                            ee = RegExp([zt + "?" + Mt + "+" + $t + "(?=" + [Ct, zt, "$"].join("|") + ")", Ht + "+" + Wt + "(?=" + [Ct, zt + Kt, "$"].join("|") + ")", zt + "?" + Kt + "+" + $t, zt + "+" + Wt, "\\d*(?:1ST|2ND|3RD|(?![123])\\dTH)(?=\\b|[a-z_])", "\\d*(?:1st|2nd|3rd|(?![123])\\dth)(?=\\b|[A-Z_])", Lt, Gt].join("|"), "g"),
                            ne = RegExp("[\\u200d\\ud800-\\udfff" + Et + Nt + "]"),
                            re = /[a-z][A-Z]|[A-Z]{2}[a-z]|[0-9][a-zA-Z]|[a-zA-Z][0-9]|[^a-zA-Z0-9 ]/,
                            oe = ["Array", "Buffer", "DataView", "Date", "Error", "Float32Array", "Float64Array", "Function", "Int8Array", "Int16Array", "Int32Array", "Map", "Math", "Object", "Promise", "RegExp", "Set", "String", "Symbol", "TypeError", "Uint8Array", "Uint8ClampedArray", "Uint16Array", "Uint32Array", "WeakMap", "_", "clearTimeout", "isFinite", "parseInt", "setTimeout"],
                            ie = -1,
                            ae = {};
                        ae[M] = ae[I] = ae[B] = ae[D] = ae[U] = ae[F] = ae[z] = ae[K] = ae[H] = !0, ae[b] = ae[m] = ae[L] = ae[_] = ae[R] = ae[w] = ae[x] = ae[O] = ae[k] = ae[A] = ae[j] = ae[S] = ae[T] = ae[P] = ae[q] = !1;
                        var ue = {};
                        ue[b] = ue[m] = ue[L] = ue[R] = ue[_] = ue[w] = ue[M] = ue[I] = ue[B] = ue[D] = ue[U] = ue[k] = ue[A] = ue[j] = ue[S] = ue[T] = ue[P] = ue[C] = ue[F] = ue[z] = ue[K] = ue[H] = !0, ue[x] = ue[O] = ue[q] = !1;
                        var le = { "\\": "\\", "'": "'", "\n": "n", "\r": "r", "\u2028": "u2028", "\u2029": "u2029" },
                            se = parseFloat,
                            ce = parseInt,
                            fe = "object" == typeof n.g && n.g && n.g.Object === Object && n.g,
                            he = "object" == typeof self && self && self.Object === Object && self,
                            pe = fe || he || Function("return this")(),
                            de = e && !e.nodeType && e,
                            ye = de && t && !t.nodeType && t,
                            ve = ye && ye.exports === de,
                            ge = ve && fe.process,
                            be = function() { try { var t = ye && ye.require && ye.require("util").types; return t || ge && ge.binding && ge.binding("util") } catch (t) {} }(),
                            me = be && be.isArrayBuffer,
                            _e = be && be.isDate,
                            we = be && be.isMap,
                            xe = be && be.isRegExp,
                            Oe = be && be.isSet,
                            Ee = be && be.isTypedArray;

                        function ke(t, e, n) {
                            switch (n.length) {
                                case 0:
                                    return t.call(e);
                                case 1:
                                    return t.call(e, n[0]);
                                case 2:
                                    return t.call(e, n[0], n[1]);
                                case 3:
                                    return t.call(e, n[0], n[1], n[2])
                            }
                            return t.apply(e, n)
                        }

                        function Ae(t, e, n, r) {
                            for (var o = -1, i = null == t ? 0 : t.length; ++o < i;) {
                                var a = t[o];
                                e(r, a, n(a), t)
                            }
                            return r
                        }

                        function je(t, e) { for (var n = -1, r = null == t ? 0 : t.length; ++n < r && !1 !== e(t[n], n, t);); return t }

                        function Ne(t, e) { for (var n = null == t ? 0 : t.length; n-- && !1 !== e(t[n], n, t);); return t }

                        function Se(t, e) {
                            for (var n = -1, r = null == t ? 0 : t.length; ++n < r;)
                                if (!e(t[n], n, t)) return !1;
                            return !0
                        }

                        function Te(t, e) {
                            for (var n = -1, r = null == t ? 0 : t.length, o = 0, i = []; ++n < r;) {
                                var a = t[n];
                                e(a, n, t) && (i[o++] = a)
                            }
                            return i
                        }

                        function Pe(t, e) { return !!(null == t ? 0 : t.length) && Fe(t, e, 0) > -1 }

                        function Ce(t, e, n) {
                            for (var r = -1, o = null == t ? 0 : t.length; ++r < o;)
                                if (n(e, t[r])) return !0;
                            return !1
                        }

                        function qe(t, e) { for (var n = -1, r = null == t ? 0 : t.length, o = Array(r); ++n < r;) o[n] = e(t[n], n, t); return o }

                        function Le(t, e) { for (var n = -1, r = e.length, o = t.length; ++n < r;) t[o + n] = e[n]; return t }

                        function Re(t, e, n, r) {
                            var o = -1,
                                i = null == t ? 0 : t.length;
                            for (r && i && (n = t[++o]); ++o < i;) n = e(n, t[o], o, t);
                            return n
                        }

                        function Me(t, e, n, r) { var o = null == t ? 0 : t.length; for (r && o && (n = t[--o]); o--;) n = e(n, t[o], o, t); return n }

                        function Ie(t, e) {
                            for (var n = -1, r = null == t ? 0 : t.length; ++n < r;)
                                if (e(t[n], n, t)) return !0;
                            return !1
                        }
                        var Be = $e("length");

                        function De(t, e, n) { var r; return n(t, (function(t, n, o) { if (e(t, n, o)) return r = n, !1 })), r }

                        function Ue(t, e, n, r) {
                            for (var o = t.length, i = n + (r ? 1 : -1); r ? i-- : ++i < o;)
                                if (e(t[i], i, t)) return i;
                            return -1
                        }

                        function Fe(t, e, n) {
                            return e == e ? function(t, e, n) {
                                var r = n - 1,
                                    o = t.length;
                                for (; ++r < o;)
                                    if (t[r] === e) return r;
                                return -1
                            }(t, e, n) : Ue(t, Ke, n)
                        }

                        function ze(t, e, n, r) {
                            for (var o = n - 1, i = t.length; ++o < i;)
                                if (r(t[o], e)) return o;
                            return -1
                        }

                        function Ke(t) { return t != t }

                        function He(t, e) { var n = null == t ? 0 : t.length; return n ? Ye(t, e) / n : y }

                        function $e(t) { return function(e) { return null == e ? o : e[t] } }

                        function We(t) { return function(e) { return null == t ? o : t[e] } }

                        function Ve(t, e, n, r, o) { return o(t, (function(t, o, i) { n = r ? (r = !1, t) : e(n, t, o, i) })), n }

                        function Ye(t, e) {
                            for (var n, r = -1, i = t.length; ++r < i;) {
                                var a = e(t[r]);
                                a !== o && (n = n === o ? a : n + a)
                            }
                            return n
                        }

                        function Ze(t, e) { for (var n = -1, r = Array(t); ++n < t;) r[n] = e(n); return r }

                        function Ge(t) { return t ? t.slice(0, yn(t) + 1).replace(at, "") : t }

                        function Xe(t) { return function(e) { return t(e) } }

                        function Je(t, e) { return qe(e, (function(e) { return t[e] })) }

                        function Qe(t, e) { return t.has(e) }

                        function tn(t, e) { for (var n = -1, r = t.length; ++n < r && Fe(e, t[n], 0) > -1;); return n }

                        function en(t, e) { for (var n = t.length; n-- && Fe(e, t[n], 0) > -1;); return n }

                        function nn(t, e) { for (var n = t.length, r = 0; n--;) t[n] === e && ++r; return r }
                        var rn = We({ À: "A", Á: "A", Â: "A", Ã: "A", Ä: "A", Å: "A", à: "a", á: "a", â: "a", ã: "a", ä: "a", å: "a", Ç: "C", ç: "c", Ð: "D", ð: "d", È: "E", É: "E", Ê: "E", Ë: "E", è: "e", é: "e", ê: "e", ë: "e", Ì: "I", Í: "I", Î: "I", Ï: "I", ì: "i", í: "i", î: "i", ï: "i", Ñ: "N", ñ: "n", Ò: "O", Ó: "O", Ô: "O", Õ: "O", Ö: "O", Ø: "O", ò: "o", ó: "o", ô: "o", õ: "o", ö: "o", ø: "o", Ù: "U", Ú: "U", Û: "U", Ü: "U", ù: "u", ú: "u", û: "u", ü: "u", Ý: "Y", ý: "y", ÿ: "y", Æ: "Ae", æ: "ae", Þ: "Th", þ: "th", ß: "ss", Ā: "A", Ă: "A", Ą: "A", ā: "a", ă: "a", ą: "a", Ć: "C", Ĉ: "C", Ċ: "C", Č: "C", ć: "c", ĉ: "c", ċ: "c", č: "c", Ď: "D", Đ: "D", ď: "d", đ: "d", Ē: "E", Ĕ: "E", Ė: "E", Ę: "E", Ě: "E", ē: "e", ĕ: "e", ė: "e", ę: "e", ě: "e", Ĝ: "G", Ğ: "G", Ġ: "G", Ģ: "G", ĝ: "g", ğ: "g", ġ: "g", ģ: "g", Ĥ: "H", Ħ: "H", ĥ: "h", ħ: "h", Ĩ: "I", Ī: "I", Ĭ: "I", Į: "I", İ: "I", ĩ: "i", ī: "i", ĭ: "i", į: "i", ı: "i", Ĵ: "J", ĵ: "j", Ķ: "K", ķ: "k", ĸ: "k", Ĺ: "L", Ļ: "L", Ľ: "L", Ŀ: "L", Ł: "L", ĺ: "l", ļ: "l", ľ: "l", ŀ: "l", ł: "l", Ń: "N", Ņ: "N", Ň: "N", Ŋ: "N", ń: "n", ņ: "n", ň: "n", ŋ: "n", Ō: "O", Ŏ: "O", Ő: "O", ō: "o", ŏ: "o", ő: "o", Ŕ: "R", Ŗ: "R", Ř: "R", ŕ: "r", ŗ: "r", ř: "r", Ś: "S", Ŝ: "S", Ş: "S", Š: "S", ś: "s", ŝ: "s", ş: "s", š: "s", Ţ: "T", Ť: "T", Ŧ: "T", ţ: "t", ť: "t", ŧ: "t", Ũ: "U", Ū: "U", Ŭ: "U", Ů: "U", Ű: "U", Ų: "U", ũ: "u", ū: "u", ŭ: "u", ů: "u", ű: "u", ų: "u", Ŵ: "W", ŵ: "w", Ŷ: "Y", ŷ: "y", Ÿ: "Y", Ź: "Z", Ż: "Z", Ž: "Z", ź: "z", ż: "z", ž: "z", Ĳ: "IJ", ĳ: "ij", Œ: "Oe", œ: "oe", ŉ: "'n", ſ: "s" }),
                            on = We({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" });

                        function an(t) { return "\\" + le[t] }

                        function un(t) { return ne.test(t) }

                        function ln(t) {
                            var e = -1,
                                n = Array(t.size);
                            return t.forEach((function(t, r) { n[++e] = [r, t] })), n
                        }

                        function sn(t, e) { return function(n) { return t(e(n)) } }

                        function cn(t, e) {
                            for (var n = -1, r = t.length, o = 0, i = []; ++n < r;) {
                                var a = t[n];
                                a !== e && a !== u || (t[n] = u, i[o++] = n)
                            }
                            return i
                        }

                        function fn(t) {
                            var e = -1,
                                n = Array(t.size);
                            return t.forEach((function(t) { n[++e] = t })), n
                        }

                        function hn(t) {
                            var e = -1,
                                n = Array(t.size);
                            return t.forEach((function(t) { n[++e] = [t, t] })), n
                        }

                        function pn(t) { return un(t) ? function(t) { var e = te.lastIndex = 0; for (; te.test(t);) ++e; return e }(t) : Be(t) }

                        function dn(t) { return un(t) ? function(t) { return t.match(te) || [] }(t) : function(t) { return t.split("") }(t) }

                        function yn(t) { for (var e = t.length; e-- && ut.test(t.charAt(e));); return e }
                        var vn = We({ "&amp;": "&", "&lt;": "<", "&gt;": ">", "&quot;": '"', "&#39;": "'" });
                        var gn = function t(e) {
                            var n, r = (e = null == e ? pe : gn.defaults(pe.Object(), e, gn.pick(pe, oe))).Array,
                                ut = e.Date,
                                Et = e.Error,
                                kt = e.Function,
                                At = e.Math,
                                jt = e.Object,
                                Nt = e.RegExp,
                                St = e.String,
                                Tt = e.TypeError,
                                Pt = r.prototype,
                                Ct = kt.prototype,
                                qt = jt.prototype,
                                Lt = e["__core-js_shared__"],
                                Rt = Ct.toString,
                                Mt = qt.hasOwnProperty,
                                It = 0,
                                Bt = (n = /[^.]+$/.exec(Lt && Lt.keys && Lt.keys.IE_PROTO || "")) ? "Symbol(src)_1." + n : "",
                                Dt = qt.toString,
                                Ut = Rt.call(jt),
                                Ft = pe._,
                                zt = Nt("^" + Rt.call(Mt).replace(ot, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"),
                                Kt = ve ? e.Buffer : o,
                                Ht = e.Symbol,
                                $t = e.Uint8Array,
                                Wt = Kt ? Kt.allocUnsafe : o,
                                Vt = sn(jt.getPrototypeOf, jt),
                                Yt = jt.create,
                                Zt = qt.propertyIsEnumerable,
                                Gt = Pt.splice,
                                Xt = Ht ? Ht.isConcatSpreadable : o,
                                te = Ht ? Ht.iterator : o,
                                ne = Ht ? Ht.toStringTag : o,
                                le = function() { try { var t = di(jt, "defineProperty"); return t({}, "", {}), t } catch (t) {} }(),
                                fe = e.clearTimeout !== pe.clearTimeout && e.clearTimeout,
                                he = ut && ut.now !== pe.Date.now && ut.now,
                                de = e.setTimeout !== pe.setTimeout && e.setTimeout,
                                ye = At.ceil,
                                ge = At.floor,
                                be = jt.getOwnPropertySymbols,
                                Be = Kt ? Kt.isBuffer : o,
                                We = e.isFinite,
                                bn = Pt.join,
                                mn = sn(jt.keys, jt),
                                _n = At.max,
                                wn = At.min,
                                xn = ut.now,
                                On = e.parseInt,
                                En = At.random,
                                kn = Pt.reverse,
                                An = di(e, "DataView"),
                                jn = di(e, "Map"),
                                Nn = di(e, "Promise"),
                                Sn = di(e, "Set"),
                                Tn = di(e, "WeakMap"),
                                Pn = di(jt, "create"),
                                Cn = Tn && new Tn,
                                qn = {},
                                Ln = Fi(An),
                                Rn = Fi(jn),
                                Mn = Fi(Nn),
                                In = Fi(Sn),
                                Bn = Fi(Tn),
                                Dn = Ht ? Ht.prototype : o,
                                Un = Dn ? Dn.valueOf : o,
                                Fn = Dn ? Dn.toString : o;

                            function zn(t) { if (ou(t) && !Va(t) && !(t instanceof Wn)) { if (t instanceof $n) return t; if (Mt.call(t, "__wrapped__")) return zi(t) } return new $n(t) }
                            var Kn = function() {
                                function t() {}
                                return function(e) {
                                    if (!ru(e)) return {};
                                    if (Yt) return Yt(e);
                                    t.prototype = e;
                                    var n = new t;
                                    return t.prototype = o, n
                                }
                            }();

                            function Hn() {}

                            function $n(t, e) { this.__wrapped__ = t, this.__actions__ = [], this.__chain__ = !!e, this.__index__ = 0, this.__values__ = o }

                            function Wn(t) { this.__wrapped__ = t, this.__actions__ = [], this.__dir__ = 1, this.__filtered__ = !1, this.__iteratees__ = [], this.__takeCount__ = v, this.__views__ = [] }

                            function Vn(t) {
                                var e = -1,
                                    n = null == t ? 0 : t.length;
                                for (this.clear(); ++e < n;) {
                                    var r = t[e];
                                    this.set(r[0], r[1])
                                }
                            }

                            function Yn(t) {
                                var e = -1,
                                    n = null == t ? 0 : t.length;
                                for (this.clear(); ++e < n;) {
                                    var r = t[e];
                                    this.set(r[0], r[1])
                                }
                            }

                            function Zn(t) {
                                var e = -1,
                                    n = null == t ? 0 : t.length;
                                for (this.clear(); ++e < n;) {
                                    var r = t[e];
                                    this.set(r[0], r[1])
                                }
                            }

                            function Gn(t) {
                                var e = -1,
                                    n = null == t ? 0 : t.length;
                                for (this.__data__ = new Zn; ++e < n;) this.add(t[e])
                            }

                            function Xn(t) {
                                var e = this.__data__ = new Yn(t);
                                this.size = e.size
                            }

                            function Jn(t, e) {
                                var n = Va(t),
                                    r = !n && Wa(t),
                                    o = !n && !r && Xa(t),
                                    i = !n && !r && !o && hu(t),
                                    a = n || r || o || i,
                                    u = a ? Ze(t.length, St) : [],
                                    l = u.length;
                                for (var s in t) !e && !Mt.call(t, s) || a && ("length" == s || o && ("offset" == s || "parent" == s) || i && ("buffer" == s || "byteLength" == s || "byteOffset" == s) || wi(s, l)) || u.push(s);
                                return u
                            }

                            function Qn(t) { var e = t.length; return e ? t[Gr(0, e - 1)] : o }

                            function tr(t, e) { return Bi(Co(t), sr(e, 0, t.length)) }

                            function er(t) { return Bi(Co(t)) }

                            function nr(t, e, n) {
                                (n !== o && !Ka(t[e], n) || n === o && !(e in t)) && ur(t, e, n)
                            }

                            function rr(t, e, n) {
                                var r = t[e];
                                Mt.call(t, e) && Ka(r, n) && (n !== o || e in t) || ur(t, e, n)
                            }

                            function or(t, e) {
                                for (var n = t.length; n--;)
                                    if (Ka(t[n][0], e)) return n;
                                return -1
                            }

                            function ir(t, e, n, r) { return dr(t, (function(t, o, i) { e(r, t, n(t), i) })), r }

                            function ar(t, e) { return t && qo(e, Lu(e), t) }

                            function ur(t, e, n) { "__proto__" == e && le ? le(t, e, { configurable: !0, enumerable: !0, value: n, writable: !0 }) : t[e] = n }

                            function lr(t, e) { for (var n = -1, i = e.length, a = r(i), u = null == t; ++n < i;) a[n] = u ? o : Su(t, e[n]); return a }

                            function sr(t, e, n) { return t == t && (n !== o && (t = t <= n ? t : n), e !== o && (t = t >= e ? t : e)), t }

                            function cr(t, e, n, r, i, a) {
                                var u, l = 1 & e,
                                    s = 2 & e,
                                    c = 4 & e;
                                if (n && (u = i ? n(t, r, i, a) : n(t)), u !== o) return u;
                                if (!ru(t)) return t;
                                var f = Va(t);
                                if (f) {
                                    if (u = function(t) {
                                            var e = t.length,
                                                n = new t.constructor(e);
                                            e && "string" == typeof t[0] && Mt.call(t, "index") && (n.index = t.index, n.input = t.input);
                                            return n
                                        }(t), !l) return Co(t, u)
                                } else {
                                    var h = gi(t),
                                        p = h == O || h == E;
                                    if (Xa(t)) return Ao(t, l);
                                    if (h == j || h == b || p && !i) { if (u = s || p ? {} : mi(t), !l) return s ? function(t, e) { return qo(t, vi(t), e) }(t, function(t, e) { return t && qo(e, Ru(e), t) }(u, t)) : function(t, e) { return qo(t, yi(t), e) }(t, ar(u, t)) } else {
                                        if (!ue[h]) return i ? t : {};
                                        u = function(t, e, n) {
                                            var r = t.constructor;
                                            switch (e) {
                                                case L:
                                                    return jo(t);
                                                case _:
                                                case w:
                                                    return new r(+t);
                                                case R:
                                                    return function(t, e) { var n = e ? jo(t.buffer) : t.buffer; return new t.constructor(n, t.byteOffset, t.byteLength) }(t, n);
                                                case M:
                                                case I:
                                                case B:
                                                case D:
                                                case U:
                                                case F:
                                                case z:
                                                case K:
                                                case H:
                                                    return No(t, n);
                                                case k:
                                                    return new r;
                                                case A:
                                                case P:
                                                    return new r(t);
                                                case S:
                                                    return function(t) { var e = new t.constructor(t.source, yt.exec(t)); return e.lastIndex = t.lastIndex, e }(t);
                                                case T:
                                                    return new r;
                                                case C:
                                                    return o = t, Un ? jt(Un.call(o)) : {}
                                            }
                                            var o
                                        }(t, h, l)
                                    }
                                }
                                a || (a = new Xn);
                                var d = a.get(t);
                                if (d) return d;
                                a.set(t, u), su(t) ? t.forEach((function(r) { u.add(cr(r, e, n, r, t, a)) })) : iu(t) && t.forEach((function(r, o) { u.set(o, cr(r, e, n, o, t, a)) }));
                                var y = f ? o : (c ? s ? ui : ai : s ? Ru : Lu)(t);
                                return je(y || t, (function(r, o) { y && (r = t[o = r]), rr(u, o, cr(r, e, n, o, t, a)) })), u
                            }

                            function fr(t, e, n) {
                                var r = n.length;
                                if (null == t) return !r;
                                for (t = jt(t); r--;) {
                                    var i = n[r],
                                        a = e[i],
                                        u = t[i];
                                    if (u === o && !(i in t) || !a(u)) return !1
                                }
                                return !0
                            }

                            function hr(t, e, n) { if ("function" != typeof t) throw new Tt(i); return Li((function() { t.apply(o, n) }), e) }

                            function pr(t, e, n, r) {
                                var o = -1,
                                    i = Pe,
                                    a = !0,
                                    u = t.length,
                                    l = [],
                                    s = e.length;
                                if (!u) return l;
                                n && (e = qe(e, Xe(n))), r ? (i = Ce, a = !1) : e.length >= 200 && (i = Qe, a = !1, e = new Gn(e));
                                t: for (; ++o < u;) {
                                    var c = t[o],
                                        f = null == n ? c : n(c);
                                    if (c = r || 0 !== c ? c : 0, a && f == f) {
                                        for (var h = s; h--;)
                                            if (e[h] === f) continue t;
                                        l.push(c)
                                    } else i(e, f, r) || l.push(c)
                                }
                                return l
                            }
                            zn.templateSettings = { escape: J, evaluate: Q, interpolate: tt, variable: "", imports: { _: zn } }, zn.prototype = Hn.prototype, zn.prototype.constructor = zn, $n.prototype = Kn(Hn.prototype), $n.prototype.constructor = $n, Wn.prototype = Kn(Hn.prototype), Wn.prototype.constructor = Wn, Vn.prototype.clear = function() { this.__data__ = Pn ? Pn(null) : {}, this.size = 0 }, Vn.prototype.delete = function(t) { var e = this.has(t) && delete this.__data__[t]; return this.size -= e ? 1 : 0, e }, Vn.prototype.get = function(t) { var e = this.__data__; if (Pn) { var n = e[t]; return n === a ? o : n } return Mt.call(e, t) ? e[t] : o }, Vn.prototype.has = function(t) { var e = this.__data__; return Pn ? e[t] !== o : Mt.call(e, t) }, Vn.prototype.set = function(t, e) { var n = this.__data__; return this.size += this.has(t) ? 0 : 1, n[t] = Pn && e === o ? a : e, this }, Yn.prototype.clear = function() { this.__data__ = [], this.size = 0 }, Yn.prototype.delete = function(t) {
                                var e = this.__data__,
                                    n = or(e, t);
                                return !(n < 0) && (n == e.length - 1 ? e.pop() : Gt.call(e, n, 1), --this.size, !0)
                            }, Yn.prototype.get = function(t) {
                                var e = this.__data__,
                                    n = or(e, t);
                                return n < 0 ? o : e[n][1]
                            }, Yn.prototype.has = function(t) { return or(this.__data__, t) > -1 }, Yn.prototype.set = function(t, e) {
                                var n = this.__data__,
                                    r = or(n, t);
                                return r < 0 ? (++this.size, n.push([t, e])) : n[r][1] = e, this
                            }, Zn.prototype.clear = function() { this.size = 0, this.__data__ = { hash: new Vn, map: new(jn || Yn), string: new Vn } }, Zn.prototype.delete = function(t) { var e = hi(this, t).delete(t); return this.size -= e ? 1 : 0, e }, Zn.prototype.get = function(t) { return hi(this, t).get(t) }, Zn.prototype.has = function(t) { return hi(this, t).has(t) }, Zn.prototype.set = function(t, e) {
                                var n = hi(this, t),
                                    r = n.size;
                                return n.set(t, e), this.size += n.size == r ? 0 : 1, this
                            }, Gn.prototype.add = Gn.prototype.push = function(t) { return this.__data__.set(t, a), this }, Gn.prototype.has = function(t) { return this.__data__.has(t) }, Xn.prototype.clear = function() { this.__data__ = new Yn, this.size = 0 }, Xn.prototype.delete = function(t) {
                                var e = this.__data__,
                                    n = e.delete(t);
                                return this.size = e.size, n
                            }, Xn.prototype.get = function(t) { return this.__data__.get(t) }, Xn.prototype.has = function(t) { return this.__data__.has(t) }, Xn.prototype.set = function(t, e) {
                                var n = this.__data__;
                                if (n instanceof Yn) {
                                    var r = n.__data__;
                                    if (!jn || r.length < 199) return r.push([t, e]), this.size = ++n.size, this;
                                    n = this.__data__ = new Zn(r)
                                }
                                return n.set(t, e), this.size = n.size, this
                            };
                            var dr = Mo(xr),
                                yr = Mo(Or, !0);

                            function vr(t, e) { var n = !0; return dr(t, (function(t, r, o) { return n = !!e(t, r, o) })), n }

                            function gr(t, e, n) {
                                for (var r = -1, i = t.length; ++r < i;) {
                                    var a = t[r],
                                        u = e(a);
                                    if (null != u && (l === o ? u == u && !fu(u) : n(u, l))) var l = u,
                                        s = a
                                }
                                return s
                            }

                            function br(t, e) { var n = []; return dr(t, (function(t, r, o) { e(t, r, o) && n.push(t) })), n }

                            function mr(t, e, n, r, o) {
                                var i = -1,
                                    a = t.length;
                                for (n || (n = _i), o || (o = []); ++i < a;) {
                                    var u = t[i];
                                    e > 0 && n(u) ? e > 1 ? mr(u, e - 1, n, r, o) : Le(o, u) : r || (o[o.length] = u)
                                }
                                return o
                            }
                            var _r = Io(),
                                wr = Io(!0);

                            function xr(t, e) { return t && _r(t, e, Lu) }

                            function Or(t, e) { return t && wr(t, e, Lu) }

                            function Er(t, e) { return Te(e, (function(e) { return tu(t[e]) })) }

                            function kr(t, e) { for (var n = 0, r = (e = xo(e, t)).length; null != t && n < r;) t = t[Ui(e[n++])]; return n && n == r ? t : o }

                            function Ar(t, e, n) { var r = e(t); return Va(t) ? r : Le(r, n(t)) }

                            function jr(t) {
                                return null == t ? t === o ? "[object Undefined]" : "[object Null]" : ne && ne in jt(t) ? function(t) {
                                    var e = Mt.call(t, ne),
                                        n = t[ne];
                                    try { t[ne] = o; var r = !0 } catch (t) {}
                                    var i = Dt.call(t);
                                    r && (e ? t[ne] = n : delete t[ne]);
                                    return i
                                }(t) : function(t) { return Dt.call(t) }(t)
                            }

                            function Nr(t, e) { return t > e }

                            function Sr(t, e) { return null != t && Mt.call(t, e) }

                            function Tr(t, e) { return null != t && e in jt(t) }

                            function Pr(t, e, n) {
                                for (var i = n ? Ce : Pe, a = t[0].length, u = t.length, l = u, s = r(u), c = 1 / 0, f = []; l--;) {
                                    var h = t[l];
                                    l && e && (h = qe(h, Xe(e))), c = wn(h.length, c), s[l] = !n && (e || a >= 120 && h.length >= 120) ? new Gn(l && h) : o
                                }
                                h = t[0];
                                var p = -1,
                                    d = s[0];
                                t: for (; ++p < a && f.length < c;) {
                                    var y = h[p],
                                        v = e ? e(y) : y;
                                    if (y = n || 0 !== y ? y : 0, !(d ? Qe(d, v) : i(f, v, n))) {
                                        for (l = u; --l;) { var g = s[l]; if (!(g ? Qe(g, v) : i(t[l], v, n))) continue t }
                                        d && d.push(v), f.push(y)
                                    }
                                }
                                return f
                            }

                            function Cr(t, e, n) { var r = null == (t = Ti(t, e = xo(e, t))) ? t : t[Ui(Qi(e))]; return null == r ? o : ke(r, t, n) }

                            function qr(t) { return ou(t) && jr(t) == b }

                            function Lr(t, e, n, r, i) {
                                return t === e || (null == t || null == e || !ou(t) && !ou(e) ? t != t && e != e : function(t, e, n, r, i, a) {
                                    var u = Va(t),
                                        l = Va(e),
                                        s = u ? m : gi(t),
                                        c = l ? m : gi(e),
                                        f = (s = s == b ? j : s) == j,
                                        h = (c = c == b ? j : c) == j,
                                        p = s == c;
                                    if (p && Xa(t)) {
                                        if (!Xa(e)) return !1;
                                        u = !0, f = !1
                                    }
                                    if (p && !f) return a || (a = new Xn), u || hu(t) ? oi(t, e, n, r, i, a) : function(t, e, n, r, o, i, a) {
                                        switch (n) {
                                            case R:
                                                if (t.byteLength != e.byteLength || t.byteOffset != e.byteOffset) return !1;
                                                t = t.buffer, e = e.buffer;
                                            case L:
                                                return !(t.byteLength != e.byteLength || !i(new $t(t), new $t(e)));
                                            case _:
                                            case w:
                                            case A:
                                                return Ka(+t, +e);
                                            case x:
                                                return t.name == e.name && t.message == e.message;
                                            case S:
                                            case P:
                                                return t == e + "";
                                            case k:
                                                var u = ln;
                                            case T:
                                                var l = 1 & r;
                                                if (u || (u = fn), t.size != e.size && !l) return !1;
                                                var s = a.get(t);
                                                if (s) return s == e;
                                                r |= 2, a.set(t, e);
                                                var c = oi(u(t), u(e), r, o, i, a);
                                                return a.delete(t), c;
                                            case C:
                                                if (Un) return Un.call(t) == Un.call(e)
                                        }
                                        return !1
                                    }(t, e, s, n, r, i, a);
                                    if (!(1 & n)) {
                                        var d = f && Mt.call(t, "__wrapped__"),
                                            y = h && Mt.call(e, "__wrapped__");
                                        if (d || y) {
                                            var v = d ? t.value() : t,
                                                g = y ? e.value() : e;
                                            return a || (a = new Xn), i(v, g, n, r, a)
                                        }
                                    }
                                    if (!p) return !1;
                                    return a || (a = new Xn),
                                        function(t, e, n, r, i, a) {
                                            var u = 1 & n,
                                                l = ai(t),
                                                s = l.length,
                                                c = ai(e).length;
                                            if (s != c && !u) return !1;
                                            var f = s;
                                            for (; f--;) { var h = l[f]; if (!(u ? h in e : Mt.call(e, h))) return !1 }
                                            var p = a.get(t),
                                                d = a.get(e);
                                            if (p && d) return p == e && d == t;
                                            var y = !0;
                                            a.set(t, e), a.set(e, t);
                                            var v = u;
                                            for (; ++f < s;) {
                                                var g = t[h = l[f]],
                                                    b = e[h];
                                                if (r) var m = u ? r(b, g, h, e, t, a) : r(g, b, h, t, e, a);
                                                if (!(m === o ? g === b || i(g, b, n, r, a) : m)) { y = !1; break }
                                                v || (v = "constructor" == h)
                                            }
                                            if (y && !v) {
                                                var _ = t.constructor,
                                                    w = e.constructor;
                                                _ == w || !("constructor" in t) || !("constructor" in e) || "function" == typeof _ && _ instanceof _ && "function" == typeof w && w instanceof w || (y = !1)
                                            }
                                            return a.delete(t), a.delete(e), y
                                        }(t, e, n, r, i, a)
                                }(t, e, n, r, Lr, i))
                            }

                            function Rr(t, e, n, r) {
                                var i = n.length,
                                    a = i,
                                    u = !r;
                                if (null == t) return !a;
                                for (t = jt(t); i--;) { var l = n[i]; if (u && l[2] ? l[1] !== t[l[0]] : !(l[0] in t)) return !1 }
                                for (; ++i < a;) {
                                    var s = (l = n[i])[0],
                                        c = t[s],
                                        f = l[1];
                                    if (u && l[2]) { if (c === o && !(s in t)) return !1 } else { var h = new Xn; if (r) var p = r(c, f, s, t, e, h); if (!(p === o ? Lr(f, c, 3, r, h) : p)) return !1 }
                                }
                                return !0
                            }

                            function Mr(t) { return !(!ru(t) || (e = t, Bt && Bt in e)) && (tu(t) ? zt : bt).test(Fi(t)); var e }

                            function Ir(t) { return "function" == typeof t ? t : null == t ? al : "object" == typeof t ? Va(t) ? Kr(t[0], t[1]) : zr(t) : yl(t) }

                            function Br(t) { if (!Ai(t)) return mn(t); var e = []; for (var n in jt(t)) Mt.call(t, n) && "constructor" != n && e.push(n); return e }

                            function Dr(t) {
                                if (!ru(t)) return function(t) {
                                    var e = [];
                                    if (null != t)
                                        for (var n in jt(t)) e.push(n);
                                    return e
                                }(t);
                                var e = Ai(t),
                                    n = [];
                                for (var r in t)("constructor" != r || !e && Mt.call(t, r)) && n.push(r);
                                return n
                            }

                            function Ur(t, e) { return t < e }

                            function Fr(t, e) {
                                var n = -1,
                                    o = Za(t) ? r(t.length) : [];
                                return dr(t, (function(t, r, i) { o[++n] = e(t, r, i) })), o
                            }

                            function zr(t) { var e = pi(t); return 1 == e.length && e[0][2] ? Ni(e[0][0], e[0][1]) : function(n) { return n === t || Rr(n, t, e) } }

                            function Kr(t, e) { return Oi(t) && ji(e) ? Ni(Ui(t), e) : function(n) { var r = Su(n, t); return r === o && r === e ? Tu(n, t) : Lr(e, r, 3) } }

                            function Hr(t, e, n, r, i) {
                                t !== e && _r(e, (function(a, u) {
                                    if (i || (i = new Xn), ru(a)) ! function(t, e, n, r, i, a, u) {
                                        var l = Ci(t, n),
                                            s = Ci(e, n),
                                            c = u.get(s);
                                        if (c) return void nr(t, n, c);
                                        var f = a ? a(l, s, n + "", t, e, u) : o,
                                            h = f === o;
                                        if (h) {
                                            var p = Va(s),
                                                d = !p && Xa(s),
                                                y = !p && !d && hu(s);
                                            f = s, p || d || y ? Va(l) ? f = l : Ga(l) ? f = Co(l) : d ? (h = !1, f = Ao(s, !0)) : y ? (h = !1, f = No(s, !0)) : f = [] : uu(s) || Wa(s) ? (f = l, Wa(l) ? f = _u(l) : ru(l) && !tu(l) || (f = mi(s))) : h = !1
                                        }
                                        h && (u.set(s, f), i(f, s, r, a, u), u.delete(s));
                                        nr(t, n, f)
                                    }(t, e, u, n, Hr, r, i);
                                    else {
                                        var l = r ? r(Ci(t, u), a, u + "", t, e, i) : o;
                                        l === o && (l = a), nr(t, u, l)
                                    }
                                }), Ru)
                            }

                            function $r(t, e) { var n = t.length; if (n) return wi(e += e < 0 ? n : 0, n) ? t[e] : o }

                            function Wr(t, e, n) {
                                e = e.length ? qe(e, (function(t) { return Va(t) ? function(e) { return kr(e, 1 === t.length ? t[0] : t) } : t })) : [al];
                                var r = -1;
                                e = qe(e, Xe(fi()));
                                var o = Fr(t, (function(t, n, o) { var i = qe(e, (function(e) { return e(t) })); return { criteria: i, index: ++r, value: t } }));
                                return function(t, e) { var n = t.length; for (t.sort(e); n--;) t[n] = t[n].value; return t }(o, (function(t, e) {
                                    return function(t, e, n) {
                                        var r = -1,
                                            o = t.criteria,
                                            i = e.criteria,
                                            a = o.length,
                                            u = n.length;
                                        for (; ++r < a;) { var l = So(o[r], i[r]); if (l) return r >= u ? l : l * ("desc" == n[r] ? -1 : 1) }
                                        return t.index - e.index
                                    }(t, e, n)
                                }))
                            }

                            function Vr(t, e, n) {
                                for (var r = -1, o = e.length, i = {}; ++r < o;) {
                                    var a = e[r],
                                        u = kr(t, a);
                                    n(u, a) && eo(i, xo(a, t), u)
                                }
                                return i
                            }

                            function Yr(t, e, n, r) {
                                var o = r ? ze : Fe,
                                    i = -1,
                                    a = e.length,
                                    u = t;
                                for (t === e && (e = Co(e)), n && (u = qe(t, Xe(n))); ++i < a;)
                                    for (var l = 0, s = e[i], c = n ? n(s) : s;
                                        (l = o(u, c, l, r)) > -1;) u !== t && Gt.call(u, l, 1), Gt.call(t, l, 1);
                                return t
                            }

                            function Zr(t, e) {
                                for (var n = t ? e.length : 0, r = n - 1; n--;) {
                                    var o = e[n];
                                    if (n == r || o !== i) {
                                        var i = o;
                                        wi(o) ? Gt.call(t, o, 1) : po(t, o)
                                    }
                                }
                                return t
                            }

                            function Gr(t, e) { return t + ge(En() * (e - t + 1)) }

                            function Xr(t, e) {
                                var n = "";
                                if (!t || e < 1 || e > d) return n;
                                do { e % 2 && (n += t), (e = ge(e / 2)) && (t += t) } while (e);
                                return n
                            }

                            function Jr(t, e) { return Ri(Si(t, e, al), t + "") }

                            function Qr(t) { return Qn(Ku(t)) }

                            function to(t, e) { var n = Ku(t); return Bi(n, sr(e, 0, n.length)) }

                            function eo(t, e, n, r) {
                                if (!ru(t)) return t;
                                for (var i = -1, a = (e = xo(e, t)).length, u = a - 1, l = t; null != l && ++i < a;) {
                                    var s = Ui(e[i]),
                                        c = n;
                                    if ("__proto__" === s || "constructor" === s || "prototype" === s) return t;
                                    if (i != u) {
                                        var f = l[s];
                                        (c = r ? r(f, s, l) : o) === o && (c = ru(f) ? f : wi(e[i + 1]) ? [] : {})
                                    }
                                    rr(l, s, c), l = l[s]
                                }
                                return t
                            }
                            var no = Cn ? function(t, e) { return Cn.set(t, e), t } : al,
                                ro = le ? function(t, e) { return le(t, "toString", { configurable: !0, enumerable: !1, value: rl(e), writable: !0 }) } : al;

                            function oo(t) { return Bi(Ku(t)) }

                            function io(t, e, n) {
                                var o = -1,
                                    i = t.length;
                                e < 0 && (e = -e > i ? 0 : i + e), (n = n > i ? i : n) < 0 && (n += i), i = e > n ? 0 : n - e >>> 0, e >>>= 0;
                                for (var a = r(i); ++o < i;) a[o] = t[o + e];
                                return a
                            }

                            function ao(t, e) { var n; return dr(t, (function(t, r, o) { return !(n = e(t, r, o)) })), !!n }

                            function uo(t, e, n) {
                                var r = 0,
                                    o = null == t ? r : t.length;
                                if ("number" == typeof e && e == e && o <= 2147483647) {
                                    for (; r < o;) {
                                        var i = r + o >>> 1,
                                            a = t[i];
                                        null !== a && !fu(a) && (n ? a <= e : a < e) ? r = i + 1 : o = i
                                    }
                                    return o
                                }
                                return lo(t, e, al, n)
                            }

                            function lo(t, e, n, r) {
                                var i = 0,
                                    a = null == t ? 0 : t.length;
                                if (0 === a) return 0;
                                for (var u = (e = n(e)) != e, l = null === e, s = fu(e), c = e === o; i < a;) {
                                    var f = ge((i + a) / 2),
                                        h = n(t[f]),
                                        p = h !== o,
                                        d = null === h,
                                        y = h == h,
                                        v = fu(h);
                                    if (u) var g = r || y;
                                    else g = c ? y && (r || p) : l ? y && p && (r || !d) : s ? y && p && !d && (r || !v) : !d && !v && (r ? h <= e : h < e);
                                    g ? i = f + 1 : a = f
                                }
                                return wn(a, 4294967294)
                            }

                            function so(t, e) {
                                for (var n = -1, r = t.length, o = 0, i = []; ++n < r;) {
                                    var a = t[n],
                                        u = e ? e(a) : a;
                                    if (!n || !Ka(u, l)) {
                                        var l = u;
                                        i[o++] = 0 === a ? 0 : a
                                    }
                                }
                                return i
                            }

                            function co(t) { return "number" == typeof t ? t : fu(t) ? y : +t }

                            function fo(t) { if ("string" == typeof t) return t; if (Va(t)) return qe(t, fo) + ""; if (fu(t)) return Fn ? Fn.call(t) : ""; var e = t + ""; return "0" == e && 1 / t == -1 / 0 ? "-0" : e }

                            function ho(t, e, n) {
                                var r = -1,
                                    o = Pe,
                                    i = t.length,
                                    a = !0,
                                    u = [],
                                    l = u;
                                if (n) a = !1, o = Ce;
                                else if (i >= 200) {
                                    var s = e ? null : Jo(t);
                                    if (s) return fn(s);
                                    a = !1, o = Qe, l = new Gn
                                } else l = e ? [] : u;
                                t: for (; ++r < i;) {
                                    var c = t[r],
                                        f = e ? e(c) : c;
                                    if (c = n || 0 !== c ? c : 0, a && f == f) {
                                        for (var h = l.length; h--;)
                                            if (l[h] === f) continue t;
                                        e && l.push(f), u.push(c)
                                    } else o(l, f, n) || (l !== u && l.push(f), u.push(c))
                                }
                                return u
                            }

                            function po(t, e) { return null == (t = Ti(t, e = xo(e, t))) || delete t[Ui(Qi(e))] }

                            function yo(t, e, n, r) { return eo(t, e, n(kr(t, e)), r) }

                            function vo(t, e, n, r) {
                                for (var o = t.length, i = r ? o : -1;
                                    (r ? i-- : ++i < o) && e(t[i], i, t););
                                return n ? io(t, r ? 0 : i, r ? i + 1 : o) : io(t, r ? i + 1 : 0, r ? o : i)
                            }

                            function go(t, e) { var n = t; return n instanceof Wn && (n = n.value()), Re(e, (function(t, e) { return e.func.apply(e.thisArg, Le([t], e.args)) }), n) }

                            function bo(t, e, n) {
                                var o = t.length;
                                if (o < 2) return o ? ho(t[0]) : [];
                                for (var i = -1, a = r(o); ++i < o;)
                                    for (var u = t[i], l = -1; ++l < o;) l != i && (a[i] = pr(a[i] || u, t[l], e, n));
                                return ho(mr(a, 1), e, n)
                            }

                            function mo(t, e, n) {
                                for (var r = -1, i = t.length, a = e.length, u = {}; ++r < i;) {
                                    var l = r < a ? e[r] : o;
                                    n(u, t[r], l)
                                }
                                return u
                            }

                            function _o(t) { return Ga(t) ? t : [] }

                            function wo(t) { return "function" == typeof t ? t : al }

                            function xo(t, e) { return Va(t) ? t : Oi(t, e) ? [t] : Di(wu(t)) }
                            var Oo = Jr;

                            function Eo(t, e, n) { var r = t.length; return n = n === o ? r : n, !e && n >= r ? t : io(t, e, n) }
                            var ko = fe || function(t) { return pe.clearTimeout(t) };

                            function Ao(t, e) {
                                if (e) return t.slice();
                                var n = t.length,
                                    r = Wt ? Wt(n) : new t.constructor(n);
                                return t.copy(r), r
                            }

                            function jo(t) { var e = new t.constructor(t.byteLength); return new $t(e).set(new $t(t)), e }

                            function No(t, e) { var n = e ? jo(t.buffer) : t.buffer; return new t.constructor(n, t.byteOffset, t.length) }

                            function So(t, e) {
                                if (t !== e) {
                                    var n = t !== o,
                                        r = null === t,
                                        i = t == t,
                                        a = fu(t),
                                        u = e !== o,
                                        l = null === e,
                                        s = e == e,
                                        c = fu(e);
                                    if (!l && !c && !a && t > e || a && u && s && !l && !c || r && u && s || !n && s || !i) return 1;
                                    if (!r && !a && !c && t < e || c && n && i && !r && !a || l && n && i || !u && i || !s) return -1
                                }
                                return 0
                            }

                            function To(t, e, n, o) { for (var i = -1, a = t.length, u = n.length, l = -1, s = e.length, c = _n(a - u, 0), f = r(s + c), h = !o; ++l < s;) f[l] = e[l]; for (; ++i < u;)(h || i < a) && (f[n[i]] = t[i]); for (; c--;) f[l++] = t[i++]; return f }

                            function Po(t, e, n, o) { for (var i = -1, a = t.length, u = -1, l = n.length, s = -1, c = e.length, f = _n(a - l, 0), h = r(f + c), p = !o; ++i < f;) h[i] = t[i]; for (var d = i; ++s < c;) h[d + s] = e[s]; for (; ++u < l;)(p || i < a) && (h[d + n[u]] = t[i++]); return h }

                            function Co(t, e) {
                                var n = -1,
                                    o = t.length;
                                for (e || (e = r(o)); ++n < o;) e[n] = t[n];
                                return e
                            }

                            function qo(t, e, n, r) {
                                var i = !n;
                                n || (n = {});
                                for (var a = -1, u = e.length; ++a < u;) {
                                    var l = e[a],
                                        s = r ? r(n[l], t[l], l, n, t) : o;
                                    s === o && (s = t[l]), i ? ur(n, l, s) : rr(n, l, s)
                                }
                                return n
                            }

                            function Lo(t, e) {
                                return function(n, r) {
                                    var o = Va(n) ? Ae : ir,
                                        i = e ? e() : {};
                                    return o(n, t, fi(r, 2), i)
                                }
                            }

                            function Ro(t) {
                                return Jr((function(e, n) {
                                    var r = -1,
                                        i = n.length,
                                        a = i > 1 ? n[i - 1] : o,
                                        u = i > 2 ? n[2] : o;
                                    for (a = t.length > 3 && "function" == typeof a ? (i--, a) : o, u && xi(n[0], n[1], u) && (a = i < 3 ? o : a, i = 1), e = jt(e); ++r < i;) {
                                        var l = n[r];
                                        l && t(e, l, r, a)
                                    }
                                    return e
                                }))
                            }

                            function Mo(t, e) {
                                return function(n, r) {
                                    if (null == n) return n;
                                    if (!Za(n)) return t(n, r);
                                    for (var o = n.length, i = e ? o : -1, a = jt(n);
                                        (e ? i-- : ++i < o) && !1 !== r(a[i], i, a););
                                    return n
                                }
                            }

                            function Io(t) { return function(e, n, r) { for (var o = -1, i = jt(e), a = r(e), u = a.length; u--;) { var l = a[t ? u : ++o]; if (!1 === n(i[l], l, i)) break } return e } }

                            function Bo(t) {
                                return function(e) {
                                    var n = un(e = wu(e)) ? dn(e) : o,
                                        r = n ? n[0] : e.charAt(0),
                                        i = n ? Eo(n, 1).join("") : e.slice(1);
                                    return r[t]() + i
                                }
                            }

                            function Do(t) { return function(e) { return Re(tl(Wu(e).replace(Jt, "")), t, "") } }

                            function Uo(t) {
                                return function() {
                                    var e = arguments;
                                    switch (e.length) {
                                        case 0:
                                            return new t;
                                        case 1:
                                            return new t(e[0]);
                                        case 2:
                                            return new t(e[0], e[1]);
                                        case 3:
                                            return new t(e[0], e[1], e[2]);
                                        case 4:
                                            return new t(e[0], e[1], e[2], e[3]);
                                        case 5:
                                            return new t(e[0], e[1], e[2], e[3], e[4]);
                                        case 6:
                                            return new t(e[0], e[1], e[2], e[3], e[4], e[5]);
                                        case 7:
                                            return new t(e[0], e[1], e[2], e[3], e[4], e[5], e[6])
                                    }
                                    var n = Kn(t.prototype),
                                        r = t.apply(n, e);
                                    return ru(r) ? r : n
                                }
                            }

                            function Fo(t) {
                                return function(e, n, r) {
                                    var i = jt(e);
                                    if (!Za(e)) {
                                        var a = fi(n, 3);
                                        e = Lu(e), n = function(t) { return a(i[t], t, i) }
                                    }
                                    var u = t(e, n, r);
                                    return u > -1 ? i[a ? e[u] : u] : o
                                }
                            }

                            function zo(t) {
                                return ii((function(e) {
                                    var n = e.length,
                                        r = n,
                                        a = $n.prototype.thru;
                                    for (t && e.reverse(); r--;) { var u = e[r]; if ("function" != typeof u) throw new Tt(i); if (a && !l && "wrapper" == si(u)) var l = new $n([], !0) }
                                    for (r = l ? r : n; ++r < n;) {
                                        var s = si(u = e[r]),
                                            c = "wrapper" == s ? li(u) : o;
                                        l = c && Ei(c[0]) && 424 == c[1] && !c[4].length && 1 == c[9] ? l[si(c[0])].apply(l, c[3]) : 1 == u.length && Ei(u) ? l[s]() : l.thru(u)
                                    }
                                    return function() {
                                        var t = arguments,
                                            r = t[0];
                                        if (l && 1 == t.length && Va(r)) return l.plant(r).value();
                                        for (var o = 0, i = n ? e[o].apply(this, t) : r; ++o < n;) i = e[o].call(this, i);
                                        return i
                                    }
                                }))
                            }

                            function Ko(t, e, n, i, a, u, l, s, c, h) {
                                var p = e & f,
                                    d = 1 & e,
                                    y = 2 & e,
                                    v = 24 & e,
                                    g = 512 & e,
                                    b = y ? o : Uo(t);
                                return function o() {
                                    for (var f = arguments.length, m = r(f), _ = f; _--;) m[_] = arguments[_];
                                    if (v) var w = ci(o),
                                        x = nn(m, w);
                                    if (i && (m = To(m, i, a, v)), u && (m = Po(m, u, l, v)), f -= x, v && f < h) { var O = cn(m, w); return Go(t, e, Ko, o.placeholder, n, m, O, s, c, h - f) }
                                    var E = d ? n : this,
                                        k = y ? E[t] : t;
                                    return f = m.length, s ? m = Pi(m, s) : g && f > 1 && m.reverse(), p && c < f && (m.length = c), this && this !== pe && this instanceof o && (k = b || Uo(k)), k.apply(E, m)
                                }
                            }

                            function Ho(t, e) { return function(n, r) { return function(t, e, n, r) { return xr(t, (function(t, o, i) { e(r, n(t), o, i) })), r }(n, t, e(r), {}) } }

                            function $o(t, e) { return function(n, r) { var i; if (n === o && r === o) return e; if (n !== o && (i = n), r !== o) { if (i === o) return r; "string" == typeof n || "string" == typeof r ? (n = fo(n), r = fo(r)) : (n = co(n), r = co(r)), i = t(n, r) } return i } }

                            function Wo(t) { return ii((function(e) { return e = qe(e, Xe(fi())), Jr((function(n) { var r = this; return t(e, (function(t) { return ke(t, r, n) })) })) })) }

                            function Vo(t, e) { var n = (e = e === o ? " " : fo(e)).length; if (n < 2) return n ? Xr(e, t) : e; var r = Xr(e, ye(t / pn(e))); return un(e) ? Eo(dn(r), 0, t).join("") : r.slice(0, t) }

                            function Yo(t) {
                                return function(e, n, i) {
                                    return i && "number" != typeof i && xi(e, n, i) && (n = i = o), e = vu(e), n === o ? (n = e, e = 0) : n = vu(n),
                                        function(t, e, n, o) { for (var i = -1, a = _n(ye((e - t) / (n || 1)), 0), u = r(a); a--;) u[o ? a : ++i] = t, t += n; return u }(e, n, i = i === o ? e < n ? 1 : -1 : vu(i), t)
                                }
                            }

                            function Zo(t) { return function(e, n) { return "string" == typeof e && "string" == typeof n || (e = mu(e), n = mu(n)), t(e, n) } }

                            function Go(t, e, n, r, i, a, u, l, f, h) {
                                var p = 8 & e;
                                e |= p ? s : c, 4 & (e &= ~(p ? c : s)) || (e &= -4);
                                var d = [t, e, i, p ? a : o, p ? u : o, p ? o : a, p ? o : u, l, f, h],
                                    y = n.apply(o, d);
                                return Ei(t) && qi(y, d), y.placeholder = r, Mi(y, t, e)
                            }

                            function Xo(t) { var e = At[t]; return function(t, n) { if (t = mu(t), (n = null == n ? 0 : wn(gu(n), 292)) && We(t)) { var r = (wu(t) + "e").split("e"); return +((r = (wu(e(r[0] + "e" + (+r[1] + n))) + "e").split("e"))[0] + "e" + (+r[1] - n)) } return e(t) } }
                            var Jo = Sn && 1 / fn(new Sn([, -0]))[1] == p ? function(t) { return new Sn(t) } : fl;

                            function Qo(t) { return function(e) { var n = gi(e); return n == k ? ln(e) : n == T ? hn(e) : function(t, e) { return qe(e, (function(e) { return [e, t[e]] })) }(e, t(e)) } }

                            function ti(t, e, n, a, p, d, y, v) {
                                var g = 2 & e;
                                if (!g && "function" != typeof t) throw new Tt(i);
                                var b = a ? a.length : 0;
                                if (b || (e &= -97, a = p = o), y = y === o ? y : _n(gu(y), 0), v = v === o ? v : gu(v), b -= p ? p.length : 0, e & c) {
                                    var m = a,
                                        _ = p;
                                    a = p = o
                                }
                                var w = g ? o : li(t),
                                    x = [t, e, n, a, p, m, _, d, y, v];
                                if (w && function(t, e) {
                                        var n = t[1],
                                            r = e[1],
                                            o = n | r,
                                            i = o < 131,
                                            a = r == f && 8 == n || r == f && n == h && t[7].length <= e[8] || 384 == r && e[7].length <= e[8] && 8 == n;
                                        if (!i && !a) return t;
                                        1 & r && (t[2] = e[2], o |= 1 & n ? 0 : 4);
                                        var l = e[3];
                                        if (l) {
                                            var s = t[3];
                                            t[3] = s ? To(s, l, e[4]) : l, t[4] = s ? cn(t[3], u) : e[4]
                                        }(l = e[5]) && (s = t[5], t[5] = s ? Po(s, l, e[6]) : l, t[6] = s ? cn(t[5], u) : e[6]);
                                        (l = e[7]) && (t[7] = l);
                                        r & f && (t[8] = null == t[8] ? e[8] : wn(t[8], e[8]));
                                        null == t[9] && (t[9] = e[9]);
                                        t[0] = e[0], t[1] = o
                                    }(x, w), t = x[0], e = x[1], n = x[2], a = x[3], p = x[4], !(v = x[9] = x[9] === o ? g ? 0 : t.length : _n(x[9] - b, 0)) && 24 & e && (e &= -25), e && 1 != e) O = 8 == e || e == l ? function(t, e, n) { var i = Uo(t); return function a() { for (var u = arguments.length, l = r(u), s = u, c = ci(a); s--;) l[s] = arguments[s]; var f = u < 3 && l[0] !== c && l[u - 1] !== c ? [] : cn(l, c); return (u -= f.length) < n ? Go(t, e, Ko, a.placeholder, o, l, f, o, o, n - u) : ke(this && this !== pe && this instanceof a ? i : t, this, l) } }(t, e, v) : e != s && 33 != e || p.length ? Ko.apply(o, x) : function(t, e, n, o) {
                                    var i = 1 & e,
                                        a = Uo(t);
                                    return function e() { for (var u = -1, l = arguments.length, s = -1, c = o.length, f = r(c + l), h = this && this !== pe && this instanceof e ? a : t; ++s < c;) f[s] = o[s]; for (; l--;) f[s++] = arguments[++u]; return ke(h, i ? n : this, f) }
                                }(t, e, n, a);
                                else var O = function(t, e, n) {
                                    var r = 1 & e,
                                        o = Uo(t);
                                    return function e() { return (this && this !== pe && this instanceof e ? o : t).apply(r ? n : this, arguments) }
                                }(t, e, n);
                                return Mi((w ? no : qi)(O, x), t, e)
                            }

                            function ei(t, e, n, r) { return t === o || Ka(t, qt[n]) && !Mt.call(r, n) ? e : t }

                            function ni(t, e, n, r, i, a) { return ru(t) && ru(e) && (a.set(e, t), Hr(t, e, o, ni, a), a.delete(e)), t }

                            function ri(t) { return uu(t) ? o : t }

                            function oi(t, e, n, r, i, a) {
                                var u = 1 & n,
                                    l = t.length,
                                    s = e.length;
                                if (l != s && !(u && s > l)) return !1;
                                var c = a.get(t),
                                    f = a.get(e);
                                if (c && f) return c == e && f == t;
                                var h = -1,
                                    p = !0,
                                    d = 2 & n ? new Gn : o;
                                for (a.set(t, e), a.set(e, t); ++h < l;) {
                                    var y = t[h],
                                        v = e[h];
                                    if (r) var g = u ? r(v, y, h, e, t, a) : r(y, v, h, t, e, a);
                                    if (g !== o) {
                                        if (g) continue;
                                        p = !1;
                                        break
                                    }
                                    if (d) { if (!Ie(e, (function(t, e) { if (!Qe(d, e) && (y === t || i(y, t, n, r, a))) return d.push(e) }))) { p = !1; break } } else if (y !== v && !i(y, v, n, r, a)) { p = !1; break }
                                }
                                return a.delete(t), a.delete(e), p
                            }

                            function ii(t) { return Ri(Si(t, o, Yi), t + "") }

                            function ai(t) { return Ar(t, Lu, yi) }

                            function ui(t) { return Ar(t, Ru, vi) }
                            var li = Cn ? function(t) { return Cn.get(t) } : fl;

                            function si(t) {
                                for (var e = t.name + "", n = qn[e], r = Mt.call(qn, e) ? n.length : 0; r--;) {
                                    var o = n[r],
                                        i = o.func;
                                    if (null == i || i == t) return o.name
                                }
                                return e
                            }

                            function ci(t) { return (Mt.call(zn, "placeholder") ? zn : t).placeholder }

                            function fi() { var t = zn.iteratee || ul; return t = t === ul ? Ir : t, arguments.length ? t(arguments[0], arguments[1]) : t }

                            function hi(t, e) { var n, r, o = t.__data__; return ("string" == (r = typeof(n = e)) || "number" == r || "symbol" == r || "boolean" == r ? "__proto__" !== n : null === n) ? o["string" == typeof e ? "string" : "hash"] : o.map }

                            function pi(t) {
                                for (var e = Lu(t), n = e.length; n--;) {
                                    var r = e[n],
                                        o = t[r];
                                    e[n] = [r, o, ji(o)]
                                }
                                return e
                            }

                            function di(t, e) { var n = function(t, e) { return null == t ? o : t[e] }(t, e); return Mr(n) ? n : o }
                            var yi = be ? function(t) { return null == t ? [] : (t = jt(t), Te(be(t), (function(e) { return Zt.call(t, e) }))) } : bl,
                                vi = be ? function(t) { for (var e = []; t;) Le(e, yi(t)), t = Vt(t); return e } : bl,
                                gi = jr;

                            function bi(t, e, n) {
                                for (var r = -1, o = (e = xo(e, t)).length, i = !1; ++r < o;) {
                                    var a = Ui(e[r]);
                                    if (!(i = null != t && n(t, a))) break;
                                    t = t[a]
                                }
                                return i || ++r != o ? i : !!(o = null == t ? 0 : t.length) && nu(o) && wi(a, o) && (Va(t) || Wa(t))
                            }

                            function mi(t) { return "function" != typeof t.constructor || Ai(t) ? {} : Kn(Vt(t)) }

                            function _i(t) { return Va(t) || Wa(t) || !!(Xt && t && t[Xt]) }

                            function wi(t, e) { var n = typeof t; return !!(e = null == e ? d : e) && ("number" == n || "symbol" != n && _t.test(t)) && t > -1 && t % 1 == 0 && t < e }

                            function xi(t, e, n) { if (!ru(n)) return !1; var r = typeof e; return !!("number" == r ? Za(n) && wi(e, n.length) : "string" == r && e in n) && Ka(n[e], t) }

                            function Oi(t, e) { if (Va(t)) return !1; var n = typeof t; return !("number" != n && "symbol" != n && "boolean" != n && null != t && !fu(t)) || (nt.test(t) || !et.test(t) || null != e && t in jt(e)) }

                            function Ei(t) {
                                var e = si(t),
                                    n = zn[e];
                                if ("function" != typeof n || !(e in Wn.prototype)) return !1;
                                if (t === n) return !0;
                                var r = li(n);
                                return !!r && t === r[0]
                            }(An && gi(new An(new ArrayBuffer(1))) != R || jn && gi(new jn) != k || Nn && gi(Nn.resolve()) != N || Sn && gi(new Sn) != T || Tn && gi(new Tn) != q) && (gi = function(t) {
                                var e = jr(t),
                                    n = e == j ? t.constructor : o,
                                    r = n ? Fi(n) : "";
                                if (r) switch (r) {
                                    case Ln:
                                        return R;
                                    case Rn:
                                        return k;
                                    case Mn:
                                        return N;
                                    case In:
                                        return T;
                                    case Bn:
                                        return q
                                }
                                return e
                            });
                            var ki = Lt ? tu : ml;

                            function Ai(t) { var e = t && t.constructor; return t === ("function" == typeof e && e.prototype || qt) }

                            function ji(t) { return t == t && !ru(t) }

                            function Ni(t, e) { return function(n) { return null != n && (n[t] === e && (e !== o || t in jt(n))) } }

                            function Si(t, e, n) {
                                return e = _n(e === o ? t.length - 1 : e, 0),
                                    function() {
                                        for (var o = arguments, i = -1, a = _n(o.length - e, 0), u = r(a); ++i < a;) u[i] = o[e + i];
                                        i = -1;
                                        for (var l = r(e + 1); ++i < e;) l[i] = o[i];
                                        return l[e] = n(u), ke(t, this, l)
                                    }
                            }

                            function Ti(t, e) { return e.length < 2 ? t : kr(t, io(e, 0, -1)) }

                            function Pi(t, e) {
                                for (var n = t.length, r = wn(e.length, n), i = Co(t); r--;) {
                                    var a = e[r];
                                    t[r] = wi(a, n) ? i[a] : o
                                }
                                return t
                            }

                            function Ci(t, e) { if (("constructor" !== e || "function" != typeof t[e]) && "__proto__" != e) return t[e] }
                            var qi = Ii(no),
                                Li = de || function(t, e) { return pe.setTimeout(t, e) },
                                Ri = Ii(ro);

                            function Mi(t, e, n) {
                                var r = e + "";
                                return Ri(t, function(t, e) { var n = e.length; if (!n) return t; var r = n - 1; return e[r] = (n > 1 ? "& " : "") + e[r], e = e.join(n > 2 ? ", " : " "), t.replace(lt, "{\n/* [wrapped with " + e + "] */\n") }(r, function(t, e) {
                                    return je(g, (function(n) {
                                        var r = "_." + n[0];
                                        e & n[1] && !Pe(t, r) && t.push(r)
                                    })), t.sort()
                                }(function(t) { var e = t.match(st); return e ? e[1].split(ct) : [] }(r), n)))
                            }

                            function Ii(t) {
                                var e = 0,
                                    n = 0;
                                return function() {
                                    var r = xn(),
                                        i = 16 - (r - n);
                                    if (n = r, i > 0) { if (++e >= 800) return arguments[0] } else e = 0;
                                    return t.apply(o, arguments)
                                }
                            }

                            function Bi(t, e) {
                                var n = -1,
                                    r = t.length,
                                    i = r - 1;
                                for (e = e === o ? r : e; ++n < e;) {
                                    var a = Gr(n, i),
                                        u = t[a];
                                    t[a] = t[n], t[n] = u
                                }
                                return t.length = e, t
                            }
                            var Di = function(t) {
                                var e = Ia(t, (function(t) { return 500 === n.size && n.clear(), t })),
                                    n = e.cache;
                                return e
                            }((function(t) { var e = []; return 46 === t.charCodeAt(0) && e.push(""), t.replace(rt, (function(t, n, r, o) { e.push(r ? o.replace(pt, "$1") : n || t) })), e }));

                            function Ui(t) { if ("string" == typeof t || fu(t)) return t; var e = t + ""; return "0" == e && 1 / t == -1 / 0 ? "-0" : e }

                            function Fi(t) { if (null != t) { try { return Rt.call(t) } catch (t) {} try { return t + "" } catch (t) {} } return "" }

                            function zi(t) { if (t instanceof Wn) return t.clone(); var e = new $n(t.__wrapped__, t.__chain__); return e.__actions__ = Co(t.__actions__), e.__index__ = t.__index__, e.__values__ = t.__values__, e }
                            var Ki = Jr((function(t, e) { return Ga(t) ? pr(t, mr(e, 1, Ga, !0)) : [] })),
                                Hi = Jr((function(t, e) { var n = Qi(e); return Ga(n) && (n = o), Ga(t) ? pr(t, mr(e, 1, Ga, !0), fi(n, 2)) : [] })),
                                $i = Jr((function(t, e) { var n = Qi(e); return Ga(n) && (n = o), Ga(t) ? pr(t, mr(e, 1, Ga, !0), o, n) : [] }));

                            function Wi(t, e, n) { var r = null == t ? 0 : t.length; if (!r) return -1; var o = null == n ? 0 : gu(n); return o < 0 && (o = _n(r + o, 0)), Ue(t, fi(e, 3), o) }

                            function Vi(t, e, n) { var r = null == t ? 0 : t.length; if (!r) return -1; var i = r - 1; return n !== o && (i = gu(n), i = n < 0 ? _n(r + i, 0) : wn(i, r - 1)), Ue(t, fi(e, 3), i, !0) }

                            function Yi(t) { return (null == t ? 0 : t.length) ? mr(t, 1) : [] }

                            function Zi(t) { return t && t.length ? t[0] : o }
                            var Gi = Jr((function(t) { var e = qe(t, _o); return e.length && e[0] === t[0] ? Pr(e) : [] })),
                                Xi = Jr((function(t) {
                                    var e = Qi(t),
                                        n = qe(t, _o);
                                    return e === Qi(n) ? e = o : n.pop(), n.length && n[0] === t[0] ? Pr(n, fi(e, 2)) : []
                                })),
                                Ji = Jr((function(t) {
                                    var e = Qi(t),
                                        n = qe(t, _o);
                                    return (e = "function" == typeof e ? e : o) && n.pop(), n.length && n[0] === t[0] ? Pr(n, o, e) : []
                                }));

                            function Qi(t) { var e = null == t ? 0 : t.length; return e ? t[e - 1] : o }
                            var ta = Jr(ea);

                            function ea(t, e) { return t && t.length && e && e.length ? Yr(t, e) : t }
                            var na = ii((function(t, e) {
                                var n = null == t ? 0 : t.length,
                                    r = lr(t, e);
                                return Zr(t, qe(e, (function(t) { return wi(t, n) ? +t : t })).sort(So)), r
                            }));

                            function ra(t) { return null == t ? t : kn.call(t) }
                            var oa = Jr((function(t) { return ho(mr(t, 1, Ga, !0)) })),
                                ia = Jr((function(t) { var e = Qi(t); return Ga(e) && (e = o), ho(mr(t, 1, Ga, !0), fi(e, 2)) })),
                                aa = Jr((function(t) { var e = Qi(t); return e = "function" == typeof e ? e : o, ho(mr(t, 1, Ga, !0), o, e) }));

                            function ua(t) { if (!t || !t.length) return []; var e = 0; return t = Te(t, (function(t) { if (Ga(t)) return e = _n(t.length, e), !0 })), Ze(e, (function(e) { return qe(t, $e(e)) })) }

                            function la(t, e) { if (!t || !t.length) return []; var n = ua(t); return null == e ? n : qe(n, (function(t) { return ke(e, o, t) })) }
                            var sa = Jr((function(t, e) { return Ga(t) ? pr(t, e) : [] })),
                                ca = Jr((function(t) { return bo(Te(t, Ga)) })),
                                fa = Jr((function(t) { var e = Qi(t); return Ga(e) && (e = o), bo(Te(t, Ga), fi(e, 2)) })),
                                ha = Jr((function(t) { var e = Qi(t); return e = "function" == typeof e ? e : o, bo(Te(t, Ga), o, e) })),
                                pa = Jr(ua);
                            var da = Jr((function(t) {
                                var e = t.length,
                                    n = e > 1 ? t[e - 1] : o;
                                return n = "function" == typeof n ? (t.pop(), n) : o, la(t, n)
                            }));

                            function ya(t) { var e = zn(t); return e.__chain__ = !0, e }

                            function va(t, e) { return e(t) }
                            var ga = ii((function(t) {
                                var e = t.length,
                                    n = e ? t[0] : 0,
                                    r = this.__wrapped__,
                                    i = function(e) { return lr(e, t) };
                                return !(e > 1 || this.__actions__.length) && r instanceof Wn && wi(n) ? ((r = r.slice(n, +n + (e ? 1 : 0))).__actions__.push({ func: va, args: [i], thisArg: o }), new $n(r, this.__chain__).thru((function(t) { return e && !t.length && t.push(o), t }))) : this.thru(i)
                            }));
                            var ba = Lo((function(t, e, n) { Mt.call(t, n) ? ++t[n] : ur(t, n, 1) }));
                            var ma = Fo(Wi),
                                _a = Fo(Vi);

                            function wa(t, e) { return (Va(t) ? je : dr)(t, fi(e, 3)) }

                            function xa(t, e) { return (Va(t) ? Ne : yr)(t, fi(e, 3)) }
                            var Oa = Lo((function(t, e, n) { Mt.call(t, n) ? t[n].push(e) : ur(t, n, [e]) }));
                            var Ea = Jr((function(t, e, n) {
                                    var o = -1,
                                        i = "function" == typeof e,
                                        a = Za(t) ? r(t.length) : [];
                                    return dr(t, (function(t) { a[++o] = i ? ke(e, t, n) : Cr(t, e, n) })), a
                                })),
                                ka = Lo((function(t, e, n) { ur(t, n, e) }));

                            function Aa(t, e) { return (Va(t) ? qe : Fr)(t, fi(e, 3)) }
                            var ja = Lo((function(t, e, n) { t[n ? 0 : 1].push(e) }), (function() {
                                return [
                                    [],
                                    []
                                ]
                            }));
                            var Na = Jr((function(t, e) { if (null == t) return []; var n = e.length; return n > 1 && xi(t, e[0], e[1]) ? e = [] : n > 2 && xi(e[0], e[1], e[2]) && (e = [e[0]]), Wr(t, mr(e, 1), []) })),
                                Sa = he || function() { return pe.Date.now() };

                            function Ta(t, e, n) { return e = n ? o : e, e = t && null == e ? t.length : e, ti(t, f, o, o, o, o, e) }

                            function Pa(t, e) {
                                var n;
                                if ("function" != typeof e) throw new Tt(i);
                                return t = gu(t),
                                    function() { return --t > 0 && (n = e.apply(this, arguments)), t <= 1 && (e = o), n }
                            }
                            var Ca = Jr((function(t, e, n) {
                                    var r = 1;
                                    if (n.length) {
                                        var o = cn(n, ci(Ca));
                                        r |= s
                                    }
                                    return ti(t, r, e, n, o)
                                })),
                                qa = Jr((function(t, e, n) {
                                    var r = 3;
                                    if (n.length) {
                                        var o = cn(n, ci(qa));
                                        r |= s
                                    }
                                    return ti(e, r, t, n, o)
                                }));

                            function La(t, e, n) {
                                var r, a, u, l, s, c, f = 0,
                                    h = !1,
                                    p = !1,
                                    d = !0;
                                if ("function" != typeof t) throw new Tt(i);

                                function y(e) {
                                    var n = r,
                                        i = a;
                                    return r = a = o, f = e, l = t.apply(i, n)
                                }

                                function v(t) { return f = t, s = Li(b, e), h ? y(t) : l }

                                function g(t) { var n = t - c; return c === o || n >= e || n < 0 || p && t - f >= u }

                                function b() {
                                    var t = Sa();
                                    if (g(t)) return m(t);
                                    s = Li(b, function(t) { var n = e - (t - c); return p ? wn(n, u - (t - f)) : n }(t))
                                }

                                function m(t) { return s = o, d && r ? y(t) : (r = a = o, l) }

                                function _() {
                                    var t = Sa(),
                                        n = g(t);
                                    if (r = arguments, a = this, c = t, n) { if (s === o) return v(c); if (p) return ko(s), s = Li(b, e), y(c) }
                                    return s === o && (s = Li(b, e)), l
                                }
                                return e = mu(e) || 0, ru(n) && (h = !!n.leading, u = (p = "maxWait" in n) ? _n(mu(n.maxWait) || 0, e) : u, d = "trailing" in n ? !!n.trailing : d), _.cancel = function() { s !== o && ko(s), f = 0, r = c = a = s = o }, _.flush = function() { return s === o ? l : m(Sa()) }, _
                            }
                            var Ra = Jr((function(t, e) { return hr(t, 1, e) })),
                                Ma = Jr((function(t, e, n) { return hr(t, mu(e) || 0, n) }));

                            function Ia(t, e) {
                                if ("function" != typeof t || null != e && "function" != typeof e) throw new Tt(i);
                                var n = function() {
                                    var r = arguments,
                                        o = e ? e.apply(this, r) : r[0],
                                        i = n.cache;
                                    if (i.has(o)) return i.get(o);
                                    var a = t.apply(this, r);
                                    return n.cache = i.set(o, a) || i, a
                                };
                                return n.cache = new(Ia.Cache || Zn), n
                            }

                            function Ba(t) {
                                if ("function" != typeof t) throw new Tt(i);
                                return function() {
                                    var e = arguments;
                                    switch (e.length) {
                                        case 0:
                                            return !t.call(this);
                                        case 1:
                                            return !t.call(this, e[0]);
                                        case 2:
                                            return !t.call(this, e[0], e[1]);
                                        case 3:
                                            return !t.call(this, e[0], e[1], e[2])
                                    }
                                    return !t.apply(this, e)
                                }
                            }
                            Ia.Cache = Zn;
                            var Da = Oo((function(t, e) { var n = (e = 1 == e.length && Va(e[0]) ? qe(e[0], Xe(fi())) : qe(mr(e, 1), Xe(fi()))).length; return Jr((function(r) { for (var o = -1, i = wn(r.length, n); ++o < i;) r[o] = e[o].call(this, r[o]); return ke(t, this, r) })) })),
                                Ua = Jr((function(t, e) { var n = cn(e, ci(Ua)); return ti(t, s, o, e, n) })),
                                Fa = Jr((function(t, e) { var n = cn(e, ci(Fa)); return ti(t, c, o, e, n) })),
                                za = ii((function(t, e) { return ti(t, h, o, o, o, e) }));

                            function Ka(t, e) { return t === e || t != t && e != e }
                            var Ha = Zo(Nr),
                                $a = Zo((function(t, e) { return t >= e })),
                                Wa = qr(function() { return arguments }()) ? qr : function(t) { return ou(t) && Mt.call(t, "callee") && !Zt.call(t, "callee") },
                                Va = r.isArray,
                                Ya = me ? Xe(me) : function(t) { return ou(t) && jr(t) == L };

                            function Za(t) { return null != t && nu(t.length) && !tu(t) }

                            function Ga(t) { return ou(t) && Za(t) }
                            var Xa = Be || ml,
                                Ja = _e ? Xe(_e) : function(t) { return ou(t) && jr(t) == w };

                            function Qa(t) { if (!ou(t)) return !1; var e = jr(t); return e == x || "[object DOMException]" == e || "string" == typeof t.message && "string" == typeof t.name && !uu(t) }

                            function tu(t) { if (!ru(t)) return !1; var e = jr(t); return e == O || e == E || "[object AsyncFunction]" == e || "[object Proxy]" == e }

                            function eu(t) { return "number" == typeof t && t == gu(t) }

                            function nu(t) { return "number" == typeof t && t > -1 && t % 1 == 0 && t <= d }

                            function ru(t) { var e = typeof t; return null != t && ("object" == e || "function" == e) }

                            function ou(t) { return null != t && "object" == typeof t }
                            var iu = we ? Xe(we) : function(t) { return ou(t) && gi(t) == k };

                            function au(t) { return "number" == typeof t || ou(t) && jr(t) == A }

                            function uu(t) { if (!ou(t) || jr(t) != j) return !1; var e = Vt(t); if (null === e) return !0; var n = Mt.call(e, "constructor") && e.constructor; return "function" == typeof n && n instanceof n && Rt.call(n) == Ut }
                            var lu = xe ? Xe(xe) : function(t) { return ou(t) && jr(t) == S };
                            var su = Oe ? Xe(Oe) : function(t) { return ou(t) && gi(t) == T };

                            function cu(t) { return "string" == typeof t || !Va(t) && ou(t) && jr(t) == P }

                            function fu(t) { return "symbol" == typeof t || ou(t) && jr(t) == C }
                            var hu = Ee ? Xe(Ee) : function(t) { return ou(t) && nu(t.length) && !!ae[jr(t)] };
                            var pu = Zo(Ur),
                                du = Zo((function(t, e) { return t <= e }));

                            function yu(t) { if (!t) return []; if (Za(t)) return cu(t) ? dn(t) : Co(t); if (te && t[te]) return function(t) { for (var e, n = []; !(e = t.next()).done;) n.push(e.value); return n }(t[te]()); var e = gi(t); return (e == k ? ln : e == T ? fn : Ku)(t) }

                            function vu(t) { return t ? (t = mu(t)) === p || t === -1 / 0 ? 17976931348623157e292 * (t < 0 ? -1 : 1) : t == t ? t : 0 : 0 === t ? t : 0 }

                            function gu(t) {
                                var e = vu(t),
                                    n = e % 1;
                                return e == e ? n ? e - n : e : 0
                            }

                            function bu(t) { return t ? sr(gu(t), 0, v) : 0 }

                            function mu(t) {
                                if ("number" == typeof t) return t;
                                if (fu(t)) return y;
                                if (ru(t)) {
                                    var e = "function" == typeof t.valueOf ? t.valueOf() : t;
                                    t = ru(e) ? e + "" : e
                                }
                                if ("string" != typeof t) return 0 === t ? t : +t;
                                t = Ge(t);
                                var n = gt.test(t);
                                return n || mt.test(t) ? ce(t.slice(2), n ? 2 : 8) : vt.test(t) ? y : +t
                            }

                            function _u(t) { return qo(t, Ru(t)) }

                            function wu(t) { return null == t ? "" : fo(t) }
                            var xu = Ro((function(t, e) {
                                    if (Ai(e) || Za(e)) qo(e, Lu(e), t);
                                    else
                                        for (var n in e) Mt.call(e, n) && rr(t, n, e[n])
                                })),
                                Ou = Ro((function(t, e) { qo(e, Ru(e), t) })),
                                Eu = Ro((function(t, e, n, r) { qo(e, Ru(e), t, r) })),
                                ku = Ro((function(t, e, n, r) { qo(e, Lu(e), t, r) })),
                                Au = ii(lr);
                            var ju = Jr((function(t, e) {
                                    t = jt(t);
                                    var n = -1,
                                        r = e.length,
                                        i = r > 2 ? e[2] : o;
                                    for (i && xi(e[0], e[1], i) && (r = 1); ++n < r;)
                                        for (var a = e[n], u = Ru(a), l = -1, s = u.length; ++l < s;) {
                                            var c = u[l],
                                                f = t[c];
                                            (f === o || Ka(f, qt[c]) && !Mt.call(t, c)) && (t[c] = a[c])
                                        }
                                    return t
                                })),
                                Nu = Jr((function(t) { return t.push(o, ni), ke(Iu, o, t) }));

                            function Su(t, e, n) { var r = null == t ? o : kr(t, e); return r === o ? n : r }

                            function Tu(t, e) { return null != t && bi(t, e, Tr) }
                            var Pu = Ho((function(t, e, n) { null != e && "function" != typeof e.toString && (e = Dt.call(e)), t[e] = n }), rl(al)),
                                Cu = Ho((function(t, e, n) { null != e && "function" != typeof e.toString && (e = Dt.call(e)), Mt.call(t, e) ? t[e].push(n) : t[e] = [n] }), fi),
                                qu = Jr(Cr);

                            function Lu(t) { return Za(t) ? Jn(t) : Br(t) }

                            function Ru(t) { return Za(t) ? Jn(t, !0) : Dr(t) }
                            var Mu = Ro((function(t, e, n) { Hr(t, e, n) })),
                                Iu = Ro((function(t, e, n, r) { Hr(t, e, n, r) })),
                                Bu = ii((function(t, e) {
                                    var n = {};
                                    if (null == t) return n;
                                    var r = !1;
                                    e = qe(e, (function(e) { return e = xo(e, t), r || (r = e.length > 1), e })), qo(t, ui(t), n), r && (n = cr(n, 7, ri));
                                    for (var o = e.length; o--;) po(n, e[o]);
                                    return n
                                }));
                            var Du = ii((function(t, e) { return null == t ? {} : function(t, e) { return Vr(t, e, (function(e, n) { return Tu(t, n) })) }(t, e) }));

                            function Uu(t, e) { if (null == t) return {}; var n = qe(ui(t), (function(t) { return [t] })); return e = fi(e), Vr(t, n, (function(t, n) { return e(t, n[0]) })) }
                            var Fu = Qo(Lu),
                                zu = Qo(Ru);

                            function Ku(t) { return null == t ? [] : Je(t, Lu(t)) }
                            var Hu = Do((function(t, e, n) { return e = e.toLowerCase(), t + (n ? $u(e) : e) }));

                            function $u(t) { return Qu(wu(t).toLowerCase()) }

                            function Wu(t) { return (t = wu(t)) && t.replace(wt, rn).replace(Qt, "") }
                            var Vu = Do((function(t, e, n) { return t + (n ? "-" : "") + e.toLowerCase() })),
                                Yu = Do((function(t, e, n) { return t + (n ? " " : "") + e.toLowerCase() })),
                                Zu = Bo("toLowerCase");
                            var Gu = Do((function(t, e, n) { return t + (n ? "_" : "") + e.toLowerCase() }));
                            var Xu = Do((function(t, e, n) { return t + (n ? " " : "") + Qu(e) }));
                            var Ju = Do((function(t, e, n) { return t + (n ? " " : "") + e.toUpperCase() })),
                                Qu = Bo("toUpperCase");

                            function tl(t, e, n) { return t = wu(t), (e = n ? o : e) === o ? function(t) { return re.test(t) }(t) ? function(t) { return t.match(ee) || [] }(t) : function(t) { return t.match(ft) || [] }(t) : t.match(e) || [] }
                            var el = Jr((function(t, e) { try { return ke(t, o, e) } catch (t) { return Qa(t) ? t : new Et(t) } })),
                                nl = ii((function(t, e) { return je(e, (function(e) { e = Ui(e), ur(t, e, Ca(t[e], t)) })), t }));

                            function rl(t) { return function() { return t } }
                            var ol = zo(),
                                il = zo(!0);

                            function al(t) { return t }

                            function ul(t) { return Ir("function" == typeof t ? t : cr(t, 1)) }
                            var ll = Jr((function(t, e) { return function(n) { return Cr(n, t, e) } })),
                                sl = Jr((function(t, e) { return function(n) { return Cr(t, n, e) } }));

                            function cl(t, e, n) {
                                var r = Lu(e),
                                    o = Er(e, r);
                                null != n || ru(e) && (o.length || !r.length) || (n = e, e = t, t = this, o = Er(e, Lu(e)));
                                var i = !(ru(n) && "chain" in n && !n.chain),
                                    a = tu(t);
                                return je(o, (function(n) {
                                    var r = e[n];
                                    t[n] = r, a && (t.prototype[n] = function() {
                                        var e = this.__chain__;
                                        if (i || e) {
                                            var n = t(this.__wrapped__),
                                                o = n.__actions__ = Co(this.__actions__);
                                            return o.push({ func: r, args: arguments, thisArg: t }), n.__chain__ = e, n
                                        }
                                        return r.apply(t, Le([this.value()], arguments))
                                    })
                                })), t
                            }

                            function fl() {}
                            var hl = Wo(qe),
                                pl = Wo(Se),
                                dl = Wo(Ie);

                            function yl(t) { return Oi(t) ? $e(Ui(t)) : function(t) { return function(e) { return kr(e, t) } }(t) }
                            var vl = Yo(),
                                gl = Yo(!0);

                            function bl() { return [] }

                            function ml() { return !1 }
                            var _l = $o((function(t, e) { return t + e }), 0),
                                wl = Xo("ceil"),
                                xl = $o((function(t, e) { return t / e }), 1),
                                Ol = Xo("floor");
                            var El, kl = $o((function(t, e) { return t * e }), 1),
                                Al = Xo("round"),
                                jl = $o((function(t, e) { return t - e }), 0);
                            return zn.after = function(t, e) {
                                if ("function" != typeof e) throw new Tt(i);
                                return t = gu(t),
                                    function() { if (--t < 1) return e.apply(this, arguments) }
                            }, zn.ary = Ta, zn.assign = xu, zn.assignIn = Ou, zn.assignInWith = Eu, zn.assignWith = ku, zn.at = Au, zn.before = Pa, zn.bind = Ca, zn.bindAll = nl, zn.bindKey = qa, zn.castArray = function() { if (!arguments.length) return []; var t = arguments[0]; return Va(t) ? t : [t] }, zn.chain = ya, zn.chunk = function(t, e, n) { e = (n ? xi(t, e, n) : e === o) ? 1 : _n(gu(e), 0); var i = null == t ? 0 : t.length; if (!i || e < 1) return []; for (var a = 0, u = 0, l = r(ye(i / e)); a < i;) l[u++] = io(t, a, a += e); return l }, zn.compact = function(t) {
                                for (var e = -1, n = null == t ? 0 : t.length, r = 0, o = []; ++e < n;) {
                                    var i = t[e];
                                    i && (o[r++] = i)
                                }
                                return o
                            }, zn.concat = function() { var t = arguments.length; if (!t) return []; for (var e = r(t - 1), n = arguments[0], o = t; o--;) e[o - 1] = arguments[o]; return Le(Va(n) ? Co(n) : [n], mr(e, 1)) }, zn.cond = function(t) {
                                var e = null == t ? 0 : t.length,
                                    n = fi();
                                return t = e ? qe(t, (function(t) { if ("function" != typeof t[1]) throw new Tt(i); return [n(t[0]), t[1]] })) : [], Jr((function(n) { for (var r = -1; ++r < e;) { var o = t[r]; if (ke(o[0], this, n)) return ke(o[1], this, n) } }))
                            }, zn.conforms = function(t) { return function(t) { var e = Lu(t); return function(n) { return fr(n, t, e) } }(cr(t, 1)) }, zn.constant = rl, zn.countBy = ba, zn.create = function(t, e) { var n = Kn(t); return null == e ? n : ar(n, e) }, zn.curry = function t(e, n, r) { var i = ti(e, 8, o, o, o, o, o, n = r ? o : n); return i.placeholder = t.placeholder, i }, zn.curryRight = function t(e, n, r) { var i = ti(e, l, o, o, o, o, o, n = r ? o : n); return i.placeholder = t.placeholder, i }, zn.debounce = La, zn.defaults = ju, zn.defaultsDeep = Nu, zn.defer = Ra, zn.delay = Ma, zn.difference = Ki, zn.differenceBy = Hi, zn.differenceWith = $i, zn.drop = function(t, e, n) { var r = null == t ? 0 : t.length; return r ? io(t, (e = n || e === o ? 1 : gu(e)) < 0 ? 0 : e, r) : [] }, zn.dropRight = function(t, e, n) { var r = null == t ? 0 : t.length; return r ? io(t, 0, (e = r - (e = n || e === o ? 1 : gu(e))) < 0 ? 0 : e) : [] }, zn.dropRightWhile = function(t, e) { return t && t.length ? vo(t, fi(e, 3), !0, !0) : [] }, zn.dropWhile = function(t, e) { return t && t.length ? vo(t, fi(e, 3), !0) : [] }, zn.fill = function(t, e, n, r) { var i = null == t ? 0 : t.length; return i ? (n && "number" != typeof n && xi(t, e, n) && (n = 0, r = i), function(t, e, n, r) { var i = t.length; for ((n = gu(n)) < 0 && (n = -n > i ? 0 : i + n), (r = r === o || r > i ? i : gu(r)) < 0 && (r += i), r = n > r ? 0 : bu(r); n < r;) t[n++] = e; return t }(t, e, n, r)) : [] }, zn.filter = function(t, e) { return (Va(t) ? Te : br)(t, fi(e, 3)) }, zn.flatMap = function(t, e) { return mr(Aa(t, e), 1) }, zn.flatMapDeep = function(t, e) { return mr(Aa(t, e), p) }, zn.flatMapDepth = function(t, e, n) { return n = n === o ? 1 : gu(n), mr(Aa(t, e), n) }, zn.flatten = Yi, zn.flattenDeep = function(t) { return (null == t ? 0 : t.length) ? mr(t, p) : [] }, zn.flattenDepth = function(t, e) { return (null == t ? 0 : t.length) ? mr(t, e = e === o ? 1 : gu(e)) : [] }, zn.flip = function(t) { return ti(t, 512) }, zn.flow = ol, zn.flowRight = il, zn.fromPairs = function(t) {
                                for (var e = -1, n = null == t ? 0 : t.length, r = {}; ++e < n;) {
                                    var o = t[e];
                                    r[o[0]] = o[1]
                                }
                                return r
                            }, zn.functions = function(t) { return null == t ? [] : Er(t, Lu(t)) }, zn.functionsIn = function(t) { return null == t ? [] : Er(t, Ru(t)) }, zn.groupBy = Oa, zn.initial = function(t) { return (null == t ? 0 : t.length) ? io(t, 0, -1) : [] }, zn.intersection = Gi, zn.intersectionBy = Xi, zn.intersectionWith = Ji, zn.invert = Pu, zn.invertBy = Cu, zn.invokeMap = Ea, zn.iteratee = ul, zn.keyBy = ka, zn.keys = Lu, zn.keysIn = Ru, zn.map = Aa, zn.mapKeys = function(t, e) { var n = {}; return e = fi(e, 3), xr(t, (function(t, r, o) { ur(n, e(t, r, o), t) })), n }, zn.mapValues = function(t, e) { var n = {}; return e = fi(e, 3), xr(t, (function(t, r, o) { ur(n, r, e(t, r, o)) })), n }, zn.matches = function(t) { return zr(cr(t, 1)) }, zn.matchesProperty = function(t, e) { return Kr(t, cr(e, 1)) }, zn.memoize = Ia, zn.merge = Mu, zn.mergeWith = Iu, zn.method = ll, zn.methodOf = sl, zn.mixin = cl, zn.negate = Ba, zn.nthArg = function(t) { return t = gu(t), Jr((function(e) { return $r(e, t) })) }, zn.omit = Bu, zn.omitBy = function(t, e) { return Uu(t, Ba(fi(e))) }, zn.once = function(t) { return Pa(2, t) }, zn.orderBy = function(t, e, n, r) { return null == t ? [] : (Va(e) || (e = null == e ? [] : [e]), Va(n = r ? o : n) || (n = null == n ? [] : [n]), Wr(t, e, n)) }, zn.over = hl, zn.overArgs = Da, zn.overEvery = pl, zn.overSome = dl, zn.partial = Ua, zn.partialRight = Fa, zn.partition = ja, zn.pick = Du, zn.pickBy = Uu, zn.property = yl, zn.propertyOf = function(t) { return function(e) { return null == t ? o : kr(t, e) } }, zn.pull = ta, zn.pullAll = ea, zn.pullAllBy = function(t, e, n) { return t && t.length && e && e.length ? Yr(t, e, fi(n, 2)) : t }, zn.pullAllWith = function(t, e, n) { return t && t.length && e && e.length ? Yr(t, e, o, n) : t }, zn.pullAt = na, zn.range = vl, zn.rangeRight = gl, zn.rearg = za, zn.reject = function(t, e) { return (Va(t) ? Te : br)(t, Ba(fi(e, 3))) }, zn.remove = function(t, e) {
                                var n = [];
                                if (!t || !t.length) return n;
                                var r = -1,
                                    o = [],
                                    i = t.length;
                                for (e = fi(e, 3); ++r < i;) {
                                    var a = t[r];
                                    e(a, r, t) && (n.push(a), o.push(r))
                                }
                                return Zr(t, o), n
                            }, zn.rest = function(t, e) { if ("function" != typeof t) throw new Tt(i); return Jr(t, e = e === o ? e : gu(e)) }, zn.reverse = ra, zn.sampleSize = function(t, e, n) { return e = (n ? xi(t, e, n) : e === o) ? 1 : gu(e), (Va(t) ? tr : to)(t, e) }, zn.set = function(t, e, n) { return null == t ? t : eo(t, e, n) }, zn.setWith = function(t, e, n, r) { return r = "function" == typeof r ? r : o, null == t ? t : eo(t, e, n, r) }, zn.shuffle = function(t) { return (Va(t) ? er : oo)(t) }, zn.slice = function(t, e, n) { var r = null == t ? 0 : t.length; return r ? (n && "number" != typeof n && xi(t, e, n) ? (e = 0, n = r) : (e = null == e ? 0 : gu(e), n = n === o ? r : gu(n)), io(t, e, n)) : [] }, zn.sortBy = Na, zn.sortedUniq = function(t) { return t && t.length ? so(t) : [] }, zn.sortedUniqBy = function(t, e) { return t && t.length ? so(t, fi(e, 2)) : [] }, zn.split = function(t, e, n) { return n && "number" != typeof n && xi(t, e, n) && (e = n = o), (n = n === o ? v : n >>> 0) ? (t = wu(t)) && ("string" == typeof e || null != e && !lu(e)) && !(e = fo(e)) && un(t) ? Eo(dn(t), 0, n) : t.split(e, n) : [] }, zn.spread = function(t, e) {
                                if ("function" != typeof t) throw new Tt(i);
                                return e = null == e ? 0 : _n(gu(e), 0), Jr((function(n) {
                                    var r = n[e],
                                        o = Eo(n, 0, e);
                                    return r && Le(o, r), ke(t, this, o)
                                }))
                            }, zn.tail = function(t) { var e = null == t ? 0 : t.length; return e ? io(t, 1, e) : [] }, zn.take = function(t, e, n) { return t && t.length ? io(t, 0, (e = n || e === o ? 1 : gu(e)) < 0 ? 0 : e) : [] }, zn.takeRight = function(t, e, n) { var r = null == t ? 0 : t.length; return r ? io(t, (e = r - (e = n || e === o ? 1 : gu(e))) < 0 ? 0 : e, r) : [] }, zn.takeRightWhile = function(t, e) { return t && t.length ? vo(t, fi(e, 3), !1, !0) : [] }, zn.takeWhile = function(t, e) { return t && t.length ? vo(t, fi(e, 3)) : [] }, zn.tap = function(t, e) { return e(t), t }, zn.throttle = function(t, e, n) {
                                var r = !0,
                                    o = !0;
                                if ("function" != typeof t) throw new Tt(i);
                                return ru(n) && (r = "leading" in n ? !!n.leading : r, o = "trailing" in n ? !!n.trailing : o), La(t, e, { leading: r, maxWait: e, trailing: o })
                            }, zn.thru = va, zn.toArray = yu, zn.toPairs = Fu, zn.toPairsIn = zu, zn.toPath = function(t) { return Va(t) ? qe(t, Ui) : fu(t) ? [t] : Co(Di(wu(t))) }, zn.toPlainObject = _u, zn.transform = function(t, e, n) {
                                var r = Va(t),
                                    o = r || Xa(t) || hu(t);
                                if (e = fi(e, 4), null == n) {
                                    var i = t && t.constructor;
                                    n = o ? r ? new i : [] : ru(t) && tu(i) ? Kn(Vt(t)) : {}
                                }
                                return (o ? je : xr)(t, (function(t, r, o) { return e(n, t, r, o) })), n
                            }, zn.unary = function(t) { return Ta(t, 1) }, zn.union = oa, zn.unionBy = ia, zn.unionWith = aa, zn.uniq = function(t) { return t && t.length ? ho(t) : [] }, zn.uniqBy = function(t, e) { return t && t.length ? ho(t, fi(e, 2)) : [] }, zn.uniqWith = function(t, e) { return e = "function" == typeof e ? e : o, t && t.length ? ho(t, o, e) : [] }, zn.unset = function(t, e) { return null == t || po(t, e) }, zn.unzip = ua, zn.unzipWith = la, zn.update = function(t, e, n) { return null == t ? t : yo(t, e, wo(n)) }, zn.updateWith = function(t, e, n, r) { return r = "function" == typeof r ? r : o, null == t ? t : yo(t, e, wo(n), r) }, zn.values = Ku, zn.valuesIn = function(t) { return null == t ? [] : Je(t, Ru(t)) }, zn.without = sa, zn.words = tl, zn.wrap = function(t, e) { return Ua(wo(e), t) }, zn.xor = ca, zn.xorBy = fa, zn.xorWith = ha, zn.zip = pa, zn.zipObject = function(t, e) { return mo(t || [], e || [], rr) }, zn.zipObjectDeep = function(t, e) { return mo(t || [], e || [], eo) }, zn.zipWith = da, zn.entries = Fu, zn.entriesIn = zu, zn.extend = Ou, zn.extendWith = Eu, cl(zn, zn), zn.add = _l, zn.attempt = el, zn.camelCase = Hu, zn.capitalize = $u, zn.ceil = wl, zn.clamp = function(t, e, n) { return n === o && (n = e, e = o), n !== o && (n = (n = mu(n)) == n ? n : 0), e !== o && (e = (e = mu(e)) == e ? e : 0), sr(mu(t), e, n) }, zn.clone = function(t) { return cr(t, 4) }, zn.cloneDeep = function(t) { return cr(t, 5) }, zn.cloneDeepWith = function(t, e) { return cr(t, 5, e = "function" == typeof e ? e : o) }, zn.cloneWith = function(t, e) { return cr(t, 4, e = "function" == typeof e ? e : o) }, zn.conformsTo = function(t, e) { return null == e || fr(t, e, Lu(e)) }, zn.deburr = Wu, zn.defaultTo = function(t, e) { return null == t || t != t ? e : t }, zn.divide = xl, zn.endsWith = function(t, e, n) {
                                t = wu(t), e = fo(e);
                                var r = t.length,
                                    i = n = n === o ? r : sr(gu(n), 0, r);
                                return (n -= e.length) >= 0 && t.slice(n, i) == e
                            }, zn.eq = Ka, zn.escape = function(t) { return (t = wu(t)) && X.test(t) ? t.replace(Z, on) : t }, zn.escapeRegExp = function(t) { return (t = wu(t)) && it.test(t) ? t.replace(ot, "\\$&") : t }, zn.every = function(t, e, n) { var r = Va(t) ? Se : vr; return n && xi(t, e, n) && (e = o), r(t, fi(e, 3)) }, zn.find = ma, zn.findIndex = Wi, zn.findKey = function(t, e) { return De(t, fi(e, 3), xr) }, zn.findLast = _a, zn.findLastIndex = Vi, zn.findLastKey = function(t, e) { return De(t, fi(e, 3), Or) }, zn.floor = Ol, zn.forEach = wa, zn.forEachRight = xa, zn.forIn = function(t, e) { return null == t ? t : _r(t, fi(e, 3), Ru) }, zn.forInRight = function(t, e) { return null == t ? t : wr(t, fi(e, 3), Ru) }, zn.forOwn = function(t, e) { return t && xr(t, fi(e, 3)) }, zn.forOwnRight = function(t, e) { return t && Or(t, fi(e, 3)) }, zn.get = Su, zn.gt = Ha, zn.gte = $a, zn.has = function(t, e) { return null != t && bi(t, e, Sr) }, zn.hasIn = Tu, zn.head = Zi, zn.identity = al, zn.includes = function(t, e, n, r) { t = Za(t) ? t : Ku(t), n = n && !r ? gu(n) : 0; var o = t.length; return n < 0 && (n = _n(o + n, 0)), cu(t) ? n <= o && t.indexOf(e, n) > -1 : !!o && Fe(t, e, n) > -1 }, zn.indexOf = function(t, e, n) { var r = null == t ? 0 : t.length; if (!r) return -1; var o = null == n ? 0 : gu(n); return o < 0 && (o = _n(r + o, 0)), Fe(t, e, o) }, zn.inRange = function(t, e, n) {
                                return e = vu(e), n === o ? (n = e, e = 0) : n = vu(n),
                                    function(t, e, n) { return t >= wn(e, n) && t < _n(e, n) }(t = mu(t), e, n)
                            }, zn.invoke = qu, zn.isArguments = Wa, zn.isArray = Va, zn.isArrayBuffer = Ya, zn.isArrayLike = Za, zn.isArrayLikeObject = Ga, zn.isBoolean = function(t) { return !0 === t || !1 === t || ou(t) && jr(t) == _ }, zn.isBuffer = Xa, zn.isDate = Ja, zn.isElement = function(t) { return ou(t) && 1 === t.nodeType && !uu(t) }, zn.isEmpty = function(t) {
                                if (null == t) return !0;
                                if (Za(t) && (Va(t) || "string" == typeof t || "function" == typeof t.splice || Xa(t) || hu(t) || Wa(t))) return !t.length;
                                var e = gi(t);
                                if (e == k || e == T) return !t.size;
                                if (Ai(t)) return !Br(t).length;
                                for (var n in t)
                                    if (Mt.call(t, n)) return !1;
                                return !0
                            }, zn.isEqual = function(t, e) { return Lr(t, e) }, zn.isEqualWith = function(t, e, n) { var r = (n = "function" == typeof n ? n : o) ? n(t, e) : o; return r === o ? Lr(t, e, o, n) : !!r }, zn.isError = Qa, zn.isFinite = function(t) { return "number" == typeof t && We(t) }, zn.isFunction = tu, zn.isInteger = eu, zn.isLength = nu, zn.isMap = iu, zn.isMatch = function(t, e) { return t === e || Rr(t, e, pi(e)) }, zn.isMatchWith = function(t, e, n) { return n = "function" == typeof n ? n : o, Rr(t, e, pi(e), n) }, zn.isNaN = function(t) { return au(t) && t != +t }, zn.isNative = function(t) { if (ki(t)) throw new Et("Unsupported core-js use. Try https://npms.io/search?q=ponyfill."); return Mr(t) }, zn.isNil = function(t) { return null == t }, zn.isNull = function(t) { return null === t }, zn.isNumber = au, zn.isObject = ru, zn.isObjectLike = ou, zn.isPlainObject = uu, zn.isRegExp = lu, zn.isSafeInteger = function(t) { return eu(t) && t >= -9007199254740991 && t <= d }, zn.isSet = su, zn.isString = cu, zn.isSymbol = fu, zn.isTypedArray = hu, zn.isUndefined = function(t) { return t === o }, zn.isWeakMap = function(t) { return ou(t) && gi(t) == q }, zn.isWeakSet = function(t) { return ou(t) && "[object WeakSet]" == jr(t) }, zn.join = function(t, e) { return null == t ? "" : bn.call(t, e) }, zn.kebabCase = Vu, zn.last = Qi, zn.lastIndexOf = function(t, e, n) {
                                var r = null == t ? 0 : t.length;
                                if (!r) return -1;
                                var i = r;
                                return n !== o && (i = (i = gu(n)) < 0 ? _n(r + i, 0) : wn(i, r - 1)), e == e ? function(t, e, n) {
                                    for (var r = n + 1; r--;)
                                        if (t[r] === e) return r;
                                    return r
                                }(t, e, i) : Ue(t, Ke, i, !0)
                            }, zn.lowerCase = Yu, zn.lowerFirst = Zu, zn.lt = pu, zn.lte = du, zn.max = function(t) { return t && t.length ? gr(t, al, Nr) : o }, zn.maxBy = function(t, e) { return t && t.length ? gr(t, fi(e, 2), Nr) : o }, zn.mean = function(t) { return He(t, al) }, zn.meanBy = function(t, e) { return He(t, fi(e, 2)) }, zn.min = function(t) { return t && t.length ? gr(t, al, Ur) : o }, zn.minBy = function(t, e) { return t && t.length ? gr(t, fi(e, 2), Ur) : o }, zn.stubArray = bl, zn.stubFalse = ml, zn.stubObject = function() { return {} }, zn.stubString = function() { return "" }, zn.stubTrue = function() { return !0 }, zn.multiply = kl, zn.nth = function(t, e) { return t && t.length ? $r(t, gu(e)) : o }, zn.noConflict = function() { return pe._ === this && (pe._ = Ft), this }, zn.noop = fl, zn.now = Sa, zn.pad = function(t, e, n) { t = wu(t); var r = (e = gu(e)) ? pn(t) : 0; if (!e || r >= e) return t; var o = (e - r) / 2; return Vo(ge(o), n) + t + Vo(ye(o), n) }, zn.padEnd = function(t, e, n) { t = wu(t); var r = (e = gu(e)) ? pn(t) : 0; return e && r < e ? t + Vo(e - r, n) : t }, zn.padStart = function(t, e, n) { t = wu(t); var r = (e = gu(e)) ? pn(t) : 0; return e && r < e ? Vo(e - r, n) + t : t }, zn.parseInt = function(t, e, n) { return n || null == e ? e = 0 : e && (e = +e), On(wu(t).replace(at, ""), e || 0) }, zn.random = function(t, e, n) {
                                if (n && "boolean" != typeof n && xi(t, e, n) && (e = n = o), n === o && ("boolean" == typeof e ? (n = e, e = o) : "boolean" == typeof t && (n = t, t = o)), t === o && e === o ? (t = 0, e = 1) : (t = vu(t), e === o ? (e = t, t = 0) : e = vu(e)), t > e) {
                                    var r = t;
                                    t = e, e = r
                                }
                                if (n || t % 1 || e % 1) { var i = En(); return wn(t + i * (e - t + se("1e-" + ((i + "").length - 1))), e) }
                                return Gr(t, e)
                            }, zn.reduce = function(t, e, n) {
                                var r = Va(t) ? Re : Ve,
                                    o = arguments.length < 3;
                                return r(t, fi(e, 4), n, o, dr)
                            }, zn.reduceRight = function(t, e, n) {
                                var r = Va(t) ? Me : Ve,
                                    o = arguments.length < 3;
                                return r(t, fi(e, 4), n, o, yr)
                            }, zn.repeat = function(t, e, n) { return e = (n ? xi(t, e, n) : e === o) ? 1 : gu(e), Xr(wu(t), e) }, zn.replace = function() {
                                var t = arguments,
                                    e = wu(t[0]);
                                return t.length < 3 ? e : e.replace(t[1], t[2])
                            }, zn.result = function(t, e, n) {
                                var r = -1,
                                    i = (e = xo(e, t)).length;
                                for (i || (i = 1, t = o); ++r < i;) {
                                    var a = null == t ? o : t[Ui(e[r])];
                                    a === o && (r = i, a = n), t = tu(a) ? a.call(t) : a
                                }
                                return t
                            }, zn.round = Al, zn.runInContext = t, zn.sample = function(t) { return (Va(t) ? Qn : Qr)(t) }, zn.size = function(t) { if (null == t) return 0; if (Za(t)) return cu(t) ? pn(t) : t.length; var e = gi(t); return e == k || e == T ? t.size : Br(t).length }, zn.snakeCase = Gu, zn.some = function(t, e, n) { var r = Va(t) ? Ie : ao; return n && xi(t, e, n) && (e = o), r(t, fi(e, 3)) }, zn.sortedIndex = function(t, e) { return uo(t, e) }, zn.sortedIndexBy = function(t, e, n) { return lo(t, e, fi(n, 2)) }, zn.sortedIndexOf = function(t, e) { var n = null == t ? 0 : t.length; if (n) { var r = uo(t, e); if (r < n && Ka(t[r], e)) return r } return -1 }, zn.sortedLastIndex = function(t, e) { return uo(t, e, !0) }, zn.sortedLastIndexBy = function(t, e, n) { return lo(t, e, fi(n, 2), !0) }, zn.sortedLastIndexOf = function(t, e) { if (null == t ? 0 : t.length) { var n = uo(t, e, !0) - 1; if (Ka(t[n], e)) return n } return -1 }, zn.startCase = Xu, zn.startsWith = function(t, e, n) { return t = wu(t), n = null == n ? 0 : sr(gu(n), 0, t.length), e = fo(e), t.slice(n, n + e.length) == e }, zn.subtract = jl, zn.sum = function(t) { return t && t.length ? Ye(t, al) : 0 }, zn.sumBy = function(t, e) { return t && t.length ? Ye(t, fi(e, 2)) : 0 }, zn.template = function(t, e, n) {
                                var r = zn.templateSettings;
                                n && xi(t, e, n) && (e = o), t = wu(t), e = Eu({}, e, r, ei);
                                var i, a, u = Eu({}, e.imports, r.imports, ei),
                                    l = Lu(u),
                                    s = Je(u, l),
                                    c = 0,
                                    f = e.interpolate || xt,
                                    h = "__p += '",
                                    p = Nt((e.escape || xt).source + "|" + f.source + "|" + (f === tt ? dt : xt).source + "|" + (e.evaluate || xt).source + "|$", "g"),
                                    d = "//# sourceURL=" + (Mt.call(e, "sourceURL") ? (e.sourceURL + "").replace(/\s/g, " ") : "lodash.templateSources[" + ++ie + "]") + "\n";
                                t.replace(p, (function(e, n, r, o, u, l) { return r || (r = o), h += t.slice(c, l).replace(Ot, an), n && (i = !0, h += "' +\n__e(" + n + ") +\n'"), u && (a = !0, h += "';\n" + u + ";\n__p += '"), r && (h += "' +\n((__t = (" + r + ")) == null ? '' : __t) +\n'"), c = l + e.length, e })), h += "';\n";
                                var y = Mt.call(e, "variable") && e.variable;
                                if (y) { if (ht.test(y)) throw new Et("Invalid `variable` option passed into `_.template`") } else h = "with (obj) {\n" + h + "\n}\n";
                                h = (a ? h.replace($, "") : h).replace(W, "$1").replace(V, "$1;"), h = "function(" + (y || "obj") + ") {\n" + (y ? "" : "obj || (obj = {});\n") + "var __t, __p = ''" + (i ? ", __e = _.escape" : "") + (a ? ", __j = Array.prototype.join;\nfunction print() { __p += __j.call(arguments, '') }\n" : ";\n") + h + "return __p\n}";
                                var v = el((function() { return kt(l, d + "return " + h).apply(o, s) }));
                                if (v.source = h, Qa(v)) throw v;
                                return v
                            }, zn.times = function(t, e) {
                                if ((t = gu(t)) < 1 || t > d) return [];
                                var n = v,
                                    r = wn(t, v);
                                e = fi(e), t -= v;
                                for (var o = Ze(r, e); ++n < t;) e(n);
                                return o
                            }, zn.toFinite = vu, zn.toInteger = gu, zn.toLength = bu, zn.toLower = function(t) { return wu(t).toLowerCase() }, zn.toNumber = mu, zn.toSafeInteger = function(t) { return t ? sr(gu(t), -9007199254740991, d) : 0 === t ? t : 0 }, zn.toString = wu, zn.toUpper = function(t) { return wu(t).toUpperCase() }, zn.trim = function(t, e, n) {
                                if ((t = wu(t)) && (n || e === o)) return Ge(t);
                                if (!t || !(e = fo(e))) return t;
                                var r = dn(t),
                                    i = dn(e);
                                return Eo(r, tn(r, i), en(r, i) + 1).join("")
                            }, zn.trimEnd = function(t, e, n) { if ((t = wu(t)) && (n || e === o)) return t.slice(0, yn(t) + 1); if (!t || !(e = fo(e))) return t; var r = dn(t); return Eo(r, 0, en(r, dn(e)) + 1).join("") }, zn.trimStart = function(t, e, n) { if ((t = wu(t)) && (n || e === o)) return t.replace(at, ""); if (!t || !(e = fo(e))) return t; var r = dn(t); return Eo(r, tn(r, dn(e))).join("") }, zn.truncate = function(t, e) {
                                var n = 30,
                                    r = "...";
                                if (ru(e)) {
                                    var i = "separator" in e ? e.separator : i;
                                    n = "length" in e ? gu(e.length) : n, r = "omission" in e ? fo(e.omission) : r
                                }
                                var a = (t = wu(t)).length;
                                if (un(t)) {
                                    var u = dn(t);
                                    a = u.length
                                }
                                if (n >= a) return t;
                                var l = n - pn(r);
                                if (l < 1) return r;
                                var s = u ? Eo(u, 0, l).join("") : t.slice(0, l);
                                if (i === o) return s + r;
                                if (u && (l += s.length - l), lu(i)) {
                                    if (t.slice(l).search(i)) {
                                        var c, f = s;
                                        for (i.global || (i = Nt(i.source, wu(yt.exec(i)) + "g")), i.lastIndex = 0; c = i.exec(f);) var h = c.index;
                                        s = s.slice(0, h === o ? l : h)
                                    }
                                } else if (t.indexOf(fo(i), l) != l) {
                                    var p = s.lastIndexOf(i);
                                    p > -1 && (s = s.slice(0, p))
                                }
                                return s + r
                            }, zn.unescape = function(t) { return (t = wu(t)) && G.test(t) ? t.replace(Y, vn) : t }, zn.uniqueId = function(t) { var e = ++It; return wu(t) + e }, zn.upperCase = Ju, zn.upperFirst = Qu, zn.each = wa, zn.eachRight = xa, zn.first = Zi, cl(zn, (El = {}, xr(zn, (function(t, e) { Mt.call(zn.prototype, e) || (El[e] = t) })), El), { chain: !1 }), zn.VERSION = "4.17.21", je(["bind", "bindKey", "curry", "curryRight", "partial", "partialRight"], (function(t) { zn[t].placeholder = zn })), je(["drop", "take"], (function(t, e) { Wn.prototype[t] = function(n) { n = n === o ? 1 : _n(gu(n), 0); var r = this.__filtered__ && !e ? new Wn(this) : this.clone(); return r.__filtered__ ? r.__takeCount__ = wn(n, r.__takeCount__) : r.__views__.push({ size: wn(n, v), type: t + (r.__dir__ < 0 ? "Right" : "") }), r }, Wn.prototype[t + "Right"] = function(e) { return this.reverse()[t](e).reverse() } })), je(["filter", "map", "takeWhile"], (function(t, e) {
                                var n = e + 1,
                                    r = 1 == n || 3 == n;
                                Wn.prototype[t] = function(t) { var e = this.clone(); return e.__iteratees__.push({ iteratee: fi(t, 3), type: n }), e.__filtered__ = e.__filtered__ || r, e }
                            })), je(["head", "last"], (function(t, e) {
                                var n = "take" + (e ? "Right" : "");
                                Wn.prototype[t] = function() { return this[n](1).value()[0] }
                            })), je(["initial", "tail"], (function(t, e) {
                                var n = "drop" + (e ? "" : "Right");
                                Wn.prototype[t] = function() { return this.__filtered__ ? new Wn(this) : this[n](1) }
                            })), Wn.prototype.compact = function() { return this.filter(al) }, Wn.prototype.find = function(t) { return this.filter(t).head() }, Wn.prototype.findLast = function(t) { return this.reverse().find(t) }, Wn.prototype.invokeMap = Jr((function(t, e) { return "function" == typeof t ? new Wn(this) : this.map((function(n) { return Cr(n, t, e) })) })), Wn.prototype.reject = function(t) { return this.filter(Ba(fi(t))) }, Wn.prototype.slice = function(t, e) { t = gu(t); var n = this; return n.__filtered__ && (t > 0 || e < 0) ? new Wn(n) : (t < 0 ? n = n.takeRight(-t) : t && (n = n.drop(t)), e !== o && (n = (e = gu(e)) < 0 ? n.dropRight(-e) : n.take(e - t)), n) }, Wn.prototype.takeRightWhile = function(t) { return this.reverse().takeWhile(t).reverse() }, Wn.prototype.toArray = function() { return this.take(v) }, xr(Wn.prototype, (function(t, e) {
                                var n = /^(?:filter|find|map|reject)|While$/.test(e),
                                    r = /^(?:head|last)$/.test(e),
                                    i = zn[r ? "take" + ("last" == e ? "Right" : "") : e],
                                    a = r || /^find/.test(e);
                                i && (zn.prototype[e] = function() {
                                    var e = this.__wrapped__,
                                        u = r ? [1] : arguments,
                                        l = e instanceof Wn,
                                        s = u[0],
                                        c = l || Va(e),
                                        f = function(t) { var e = i.apply(zn, Le([t], u)); return r && h ? e[0] : e };
                                    c && n && "function" == typeof s && 1 != s.length && (l = c = !1);
                                    var h = this.__chain__,
                                        p = !!this.__actions__.length,
                                        d = a && !h,
                                        y = l && !p;
                                    if (!a && c) { e = y ? e : new Wn(this); var v = t.apply(e, u); return v.__actions__.push({ func: va, args: [f], thisArg: o }), new $n(v, h) }
                                    return d && y ? t.apply(this, u) : (v = this.thru(f), d ? r ? v.value()[0] : v.value() : v)
                                })
                            })), je(["pop", "push", "shift", "sort", "splice", "unshift"], (function(t) {
                                var e = Pt[t],
                                    n = /^(?:push|sort|unshift)$/.test(t) ? "tap" : "thru",
                                    r = /^(?:pop|shift)$/.test(t);
                                zn.prototype[t] = function() { var t = arguments; if (r && !this.__chain__) { var o = this.value(); return e.apply(Va(o) ? o : [], t) } return this[n]((function(n) { return e.apply(Va(n) ? n : [], t) })) }
                            })), xr(Wn.prototype, (function(t, e) {
                                var n = zn[e];
                                if (n) {
                                    var r = n.name + "";
                                    Mt.call(qn, r) || (qn[r] = []), qn[r].push({ name: e, func: n })
                                }
                            })), qn[Ko(o, 2).name] = [{ name: "wrapper", func: o }], Wn.prototype.clone = function() { var t = new Wn(this.__wrapped__); return t.__actions__ = Co(this.__actions__), t.__dir__ = this.__dir__, t.__filtered__ = this.__filtered__, t.__iteratees__ = Co(this.__iteratees__), t.__takeCount__ = this.__takeCount__, t.__views__ = Co(this.__views__), t }, Wn.prototype.reverse = function() {
                                if (this.__filtered__) {
                                    var t = new Wn(this);
                                    t.__dir__ = -1, t.__filtered__ = !0
                                } else(t = this.clone()).__dir__ *= -1;
                                return t
                            }, Wn.prototype.value = function() {
                                var t = this.__wrapped__.value(),
                                    e = this.__dir__,
                                    n = Va(t),
                                    r = e < 0,
                                    o = n ? t.length : 0,
                                    i = function(t, e, n) {
                                        var r = -1,
                                            o = n.length;
                                        for (; ++r < o;) {
                                            var i = n[r],
                                                a = i.size;
                                            switch (i.type) {
                                                case "drop":
                                                    t += a;
                                                    break;
                                                case "dropRight":
                                                    e -= a;
                                                    break;
                                                case "take":
                                                    e = wn(e, t + a);
                                                    break;
                                                case "takeRight":
                                                    t = _n(t, e - a)
                                            }
                                        }
                                        return { start: t, end: e }
                                    }(0, o, this.__views__),
                                    a = i.start,
                                    u = i.end,
                                    l = u - a,
                                    s = r ? u : a - 1,
                                    c = this.__iteratees__,
                                    f = c.length,
                                    h = 0,
                                    p = wn(l, this.__takeCount__);
                                if (!n || !r && o == l && p == l) return go(t, this.__actions__);
                                var d = [];
                                t: for (; l-- && h < p;) {
                                    for (var y = -1, v = t[s += e]; ++y < f;) {
                                        var g = c[y],
                                            b = g.iteratee,
                                            m = g.type,
                                            _ = b(v);
                                        if (2 == m) v = _;
                                        else if (!_) { if (1 == m) continue t; break t }
                                    }
                                    d[h++] = v
                                }
                                return d
                            }, zn.prototype.at = ga, zn.prototype.chain = function() { return ya(this) }, zn.prototype.commit = function() { return new $n(this.value(), this.__chain__) }, zn.prototype.next = function() { this.__values__ === o && (this.__values__ = yu(this.value())); var t = this.__index__ >= this.__values__.length; return { done: t, value: t ? o : this.__values__[this.__index__++] } }, zn.prototype.plant = function(t) {
                                for (var e, n = this; n instanceof Hn;) {
                                    var r = zi(n);
                                    r.__index__ = 0, r.__values__ = o, e ? i.__wrapped__ = r : e = r;
                                    var i = r;
                                    n = n.__wrapped__
                                }
                                return i.__wrapped__ = t, e
                            }, zn.prototype.reverse = function() { var t = this.__wrapped__; if (t instanceof Wn) { var e = t; return this.__actions__.length && (e = new Wn(this)), (e = e.reverse()).__actions__.push({ func: va, args: [ra], thisArg: o }), new $n(e, this.__chain__) } return this.thru(ra) }, zn.prototype.toJSON = zn.prototype.valueOf = zn.prototype.value = function() { return go(this.__wrapped__, this.__actions__) }, zn.prototype.first = zn.prototype.head, te && (zn.prototype[te] = function() { return this }), zn
                        }();
                        pe._ = gn, (r = function() { return gn }.call(e, n, e, t)) === o || (t.exports = r)
                    }.call(this)
            },
            662: () => {},
            155: t => {
                var e, n, r = t.exports = {};

                function o() { throw new Error("setTimeout has not been defined") }

                function i() { throw new Error("clearTimeout has not been defined") }

                function a(t) { if (e === setTimeout) return setTimeout(t, 0); if ((e === o || !e) && setTimeout) return e = setTimeout, setTimeout(t, 0); try { return e(t, 0) } catch (n) { try { return e.call(null, t, 0) } catch (n) { return e.call(this, t, 0) } } }! function() { try { e = "function" == typeof setTimeout ? setTimeout : o } catch (t) { e = o } try { n = "function" == typeof clearTimeout ? clearTimeout : i } catch (t) { n = i } }();
                var u, l = [],
                    s = !1,
                    c = -1;

                function f() { s && u && (s = !1, u.length ? l = u.concat(l) : c = -1, l.length && h()) }

                function h() {
                    if (!s) {
                        var t = a(f);
                        s = !0;
                        for (var e = l.length; e;) {
                            for (u = l, l = []; ++c < e;) u && u[c].run();
                            c = -1, e = l.length
                        }
                        u = null, s = !1,
                            function(t) { if (n === clearTimeout) return clearTimeout(t); if ((n === i || !n) && clearTimeout) return n = clearTimeout, clearTimeout(t); try { n(t) } catch (e) { try { return n.call(null, t) } catch (e) { return n.call(this, t) } } }(t)
                    }
                }

                function p(t, e) { this.fun = t, this.array = e }

                function d() {}
                r.nextTick = function(t) {
                    var e = new Array(arguments.length - 1);
                    if (arguments.length > 1)
                        for (var n = 1; n < arguments.length; n++) e[n - 1] = arguments[n];
                    l.push(new p(t, e)), 1 !== l.length || s || a(h)
                }, p.prototype.run = function() { this.fun.apply(null, this.array) }, r.title = "browser", r.browser = !0, r.env = {}, r.argv = [], r.version = "", r.versions = {}, r.on = d, r.addListener = d, r.once = d, r.off = d, r.removeListener = d, r.removeAllListeners = d, r.emit = d, r.prependListener = d, r.prependOnceListener = d, r.listeners = function(t) { return [] }, r.binding = function(t) { throw new Error("process.binding is not supported") }, r.cwd = function() { return "/" }, r.chdir = function(t) { throw new Error("process.chdir is not supported") }, r.umask = function() { return 0 }
            },
            95: function(t, e, n) {
                var r, o = n(764).Buffer;
                "undefined" != typeof self && self, r = function() {
                    return function(t) {
                        var e = {};

                        function n(r) { if (e[r]) return e[r].exports; var o = e[r] = { i: r, l: !1, exports: {} }; return t[r].call(o.exports, o, o.exports, n), o.l = !0, o.exports }
                        return n.m = t, n.c = e, n.d = function(t, e, r) { n.o(t, e) || Object.defineProperty(t, e, { configurable: !1, enumerable: !0, get: r }) }, n.n = function(t) { var e = t && t.__esModule ? function() { return t.default } : function() { return t }; return n.d(e, "a", e), e }, n.o = function(t, e) { return Object.prototype.hasOwnProperty.call(t, e) }, n.p = "", n(n.s = 109)
                    }([function(t, e, n) {
                        "use strict";
                        Object.defineProperty(e, "__esModule", { value: !0 });
                        var r = n(17),
                            o = n(18),
                            i = n(19),
                            a = n(45),
                            u = n(46),
                            l = n(47),
                            s = n(48),
                            c = n(49),
                            f = n(12),
                            h = n(32),
                            p = n(33),
                            d = n(31),
                            y = n(1),
                            v = { Scope: y.Scope, create: y.create, find: y.find, query: y.query, register: y.register, Container: r.default, Format: o.default, Leaf: i.default, Embed: s.default, Scroll: a.default, Block: l.default, Inline: u.default, Text: c.default, Attributor: { Attribute: f.default, Class: h.default, Style: p.default, Store: d.default } };
                        e.default = v
                    }, function(t, e, n) {
                        "use strict";
                        var r, o = this && this.__extends || (r = Object.setPrototypeOf || { __proto__: [] }
                            instanceof Array && function(t, e) { t.__proto__ = e } || function(t, e) { for (var n in e) e.hasOwnProperty(n) && (t[n] = e[n]) },
                            function(t, e) {
                                function n() { this.constructor = t }
                                r(t, e), t.prototype = null === e ? Object.create(e) : (n.prototype = e.prototype, new n)
                            });
                        Object.defineProperty(e, "__esModule", { value: !0 });
                        var i = function(t) {
                            function e(e) { var n = this; return e = "[Parchment] " + e, (n = t.call(this, e) || this).message = e, n.name = n.constructor.name, n }
                            return o(e, t), e
                        }(Error);
                        e.ParchmentError = i;
                        var a, u = {},
                            l = {},
                            s = {},
                            c = {};

                        function f(t, e) {
                            var n;
                            if (void 0 === e && (e = a.ANY), "string" == typeof t) n = c[t] || u[t];
                            else if (t instanceof Text || t.nodeType === Node.TEXT_NODE) n = c.text;
                            else if ("number" == typeof t) t & a.LEVEL & a.BLOCK ? n = c.block : t & a.LEVEL & a.INLINE && (n = c.inline);
                            else if (t instanceof HTMLElement) {
                                var r = (t.getAttribute("class") || "").split(/\s+/);
                                for (var o in r)
                                    if (n = l[r[o]]) break;
                                n = n || s[t.tagName]
                            }
                            return null == n ? null : e & a.LEVEL & n.scope && e & a.TYPE & n.scope ? n : null
                        }
                        e.DATA_KEY = "__blot",
                            function(t) { t[t.TYPE = 3] = "TYPE", t[t.LEVEL = 12] = "LEVEL", t[t.ATTRIBUTE = 13] = "ATTRIBUTE", t[t.BLOT = 14] = "BLOT", t[t.INLINE = 7] = "INLINE", t[t.BLOCK = 11] = "BLOCK", t[t.BLOCK_BLOT = 10] = "BLOCK_BLOT", t[t.INLINE_BLOT = 6] = "INLINE_BLOT", t[t.BLOCK_ATTRIBUTE = 9] = "BLOCK_ATTRIBUTE", t[t.INLINE_ATTRIBUTE = 5] = "INLINE_ATTRIBUTE", t[t.ANY = 15] = "ANY" }(a = e.Scope || (e.Scope = {})), e.create = function(t, e) {
                                var n = f(t);
                                if (null == n) throw new i("Unable to create " + t + " blot");
                                var r = n,
                                    o = t instanceof Node || t.nodeType === Node.TEXT_NODE ? t : r.create(e);
                                return new r(o, e)
                            }, e.find = function t(n, r) { return void 0 === r && (r = !1), null == n ? null : null != n[e.DATA_KEY] ? n[e.DATA_KEY].blot : r ? t(n.parentNode, r) : null }, e.query = f, e.register = function t() {
                                for (var e = [], n = 0; n < arguments.length; n++) e[n] = arguments[n];
                                if (e.length > 1) return e.map((function(e) { return t(e) }));
                                var r = e[0];
                                if ("string" != typeof r.blotName && "string" != typeof r.attrName) throw new i("Invalid definition");
                                if ("abstract" === r.blotName) throw new i("Cannot register abstract class");
                                if (c[r.blotName || r.attrName] = r, "string" == typeof r.keyName) u[r.keyName] = r;
                                else if (null != r.className && (l[r.className] = r), null != r.tagName) {
                                    Array.isArray(r.tagName) ? r.tagName = r.tagName.map((function(t) { return t.toUpperCase() })) : r.tagName = r.tagName.toUpperCase();
                                    var o = Array.isArray(r.tagName) ? r.tagName : [r.tagName];
                                    o.forEach((function(t) { null != s[t] && null != r.className || (s[t] = r) }))
                                }
                                return r
                            }
                    }, function(t, e, n) {
                        var r = n(51),
                            o = n(11),
                            i = n(3),
                            a = n(20),
                            u = String.fromCharCode(0),
                            l = function(t) { Array.isArray(t) ? this.ops = t : null != t && Array.isArray(t.ops) ? this.ops = t.ops : this.ops = [] };
                        l.prototype.insert = function(t, e) { var n = {}; return 0 === t.length ? this : (n.insert = t, null != e && "object" == typeof e && Object.keys(e).length > 0 && (n.attributes = e), this.push(n)) }, l.prototype.delete = function(t) { return t <= 0 ? this : this.push({ delete: t }) }, l.prototype.retain = function(t, e) { if (t <= 0) return this; var n = { retain: t }; return null != e && "object" == typeof e && Object.keys(e).length > 0 && (n.attributes = e), this.push(n) }, l.prototype.push = function(t) {
                            var e = this.ops.length,
                                n = this.ops[e - 1];
                            if (t = i(!0, {}, t), "object" == typeof n) { if ("number" == typeof t.delete && "number" == typeof n.delete) return this.ops[e - 1] = { delete: n.delete + t.delete }, this; if ("number" == typeof n.delete && null != t.insert && (e -= 1, "object" != typeof(n = this.ops[e - 1]))) return this.ops.unshift(t), this; if (o(t.attributes, n.attributes)) { if ("string" == typeof t.insert && "string" == typeof n.insert) return this.ops[e - 1] = { insert: n.insert + t.insert }, "object" == typeof t.attributes && (this.ops[e - 1].attributes = t.attributes), this; if ("number" == typeof t.retain && "number" == typeof n.retain) return this.ops[e - 1] = { retain: n.retain + t.retain }, "object" == typeof t.attributes && (this.ops[e - 1].attributes = t.attributes), this } }
                            return e === this.ops.length ? this.ops.push(t) : this.ops.splice(e, 0, t), this
                        }, l.prototype.chop = function() { var t = this.ops[this.ops.length - 1]; return t && t.retain && !t.attributes && this.ops.pop(), this }, l.prototype.filter = function(t) { return this.ops.filter(t) }, l.prototype.forEach = function(t) { this.ops.forEach(t) }, l.prototype.map = function(t) { return this.ops.map(t) }, l.prototype.partition = function(t) {
                            var e = [],
                                n = [];
                            return this.forEach((function(r) {
                                (t(r) ? e : n).push(r)
                            })), [e, n]
                        }, l.prototype.reduce = function(t, e) { return this.ops.reduce(t, e) }, l.prototype.changeLength = function() { return this.reduce((function(t, e) { return e.insert ? t + a.length(e) : e.delete ? t - e.delete : t }), 0) }, l.prototype.length = function() { return this.reduce((function(t, e) { return t + a.length(e) }), 0) }, l.prototype.slice = function(t, e) {
                            t = t || 0, "number" != typeof e && (e = 1 / 0);
                            for (var n = [], r = a.iterator(this.ops), o = 0; o < e && r.hasNext();) {
                                var i;
                                o < t ? i = r.next(t - o) : (i = r.next(e - o), n.push(i)), o += a.length(i)
                            }
                            return new l(n)
                        }, l.prototype.compose = function(t) {
                            var e = a.iterator(this.ops),
                                n = a.iterator(t.ops),
                                r = [],
                                i = n.peek();
                            if (null != i && "number" == typeof i.retain && null == i.attributes) {
                                for (var u = i.retain;
                                    "insert" === e.peekType() && e.peekLength() <= u;) u -= e.peekLength(), r.push(e.next());
                                i.retain - u > 0 && n.next(i.retain - u)
                            }
                            for (var s = new l(r); e.hasNext() || n.hasNext();)
                                if ("insert" === n.peekType()) s.push(n.next());
                                else if ("delete" === e.peekType()) s.push(e.next());
                            else {
                                var c = Math.min(e.peekLength(), n.peekLength()),
                                    f = e.next(c),
                                    h = n.next(c);
                                if ("number" == typeof h.retain) { var p = {}; "number" == typeof f.retain ? p.retain = c : p.insert = f.insert; var d = a.attributes.compose(f.attributes, h.attributes, "number" == typeof f.retain); if (d && (p.attributes = d), s.push(p), !n.hasNext() && o(s.ops[s.ops.length - 1], p)) { var y = new l(e.rest()); return s.concat(y).chop() } } else "number" == typeof h.delete && "number" == typeof f.retain && s.push(h)
                            }
                            return s.chop()
                        }, l.prototype.concat = function(t) { var e = new l(this.ops.slice()); return t.ops.length > 0 && (e.push(t.ops[0]), e.ops = e.ops.concat(t.ops.slice(1))), e }, l.prototype.diff = function(t, e) {
                            if (this.ops === t.ops) return new l;
                            var n = [this, t].map((function(e) { return e.map((function(n) { if (null != n.insert) return "string" == typeof n.insert ? n.insert : u; throw new Error("diff() called " + (e === t ? "on" : "with") + " non-document") })).join("") })),
                                i = new l,
                                s = r(n[0], n[1], e),
                                c = a.iterator(this.ops),
                                f = a.iterator(t.ops);
                            return s.forEach((function(t) {
                                for (var e = t[1].length; e > 0;) {
                                    var n = 0;
                                    switch (t[0]) {
                                        case r.INSERT:
                                            n = Math.min(f.peekLength(), e), i.push(f.next(n));
                                            break;
                                        case r.DELETE:
                                            n = Math.min(e, c.peekLength()), c.next(n), i.delete(n);
                                            break;
                                        case r.EQUAL:
                                            n = Math.min(c.peekLength(), f.peekLength(), e);
                                            var u = c.next(n),
                                                l = f.next(n);
                                            o(u.insert, l.insert) ? i.retain(n, a.attributes.diff(u.attributes, l.attributes)) : i.push(l).delete(n)
                                    }
                                    e -= n
                                }
                            })), i.chop()
                        }, l.prototype.eachLine = function(t, e) {
                            e = e || "\n";
                            for (var n = a.iterator(this.ops), r = new l, o = 0; n.hasNext();) {
                                if ("insert" !== n.peekType()) return;
                                var i = n.peek(),
                                    u = a.length(i) - n.peekLength(),
                                    s = "string" == typeof i.insert ? i.insert.indexOf(e, u) - u : -1;
                                if (s < 0) r.push(n.next());
                                else if (s > 0) r.push(n.next(s));
                                else {
                                    if (!1 === t(r, n.next(1).attributes || {}, o)) return;
                                    o += 1, r = new l
                                }
                            }
                            r.length() > 0 && t(r, {}, o)
                        }, l.prototype.transform = function(t, e) {
                            if (e = !!e, "number" == typeof t) return this.transformPosition(t, e);
                            for (var n = a.iterator(this.ops), r = a.iterator(t.ops), o = new l; n.hasNext() || r.hasNext();)
                                if ("insert" !== n.peekType() || !e && "insert" === r.peekType())
                                    if ("insert" === r.peekType()) o.push(r.next());
                                    else {
                                        var i = Math.min(n.peekLength(), r.peekLength()),
                                            u = n.next(i),
                                            s = r.next(i);
                                        if (u.delete) continue;
                                        s.delete ? o.push(s) : o.retain(i, a.attributes.transform(u.attributes, s.attributes, e))
                                    }
                            else o.retain(a.length(n.next()));
                            return o.chop()
                        }, l.prototype.transformPosition = function(t, e) {
                            e = !!e;
                            for (var n = a.iterator(this.ops), r = 0; n.hasNext() && r <= t;) {
                                var o = n.peekLength(),
                                    i = n.peekType();
                                n.next(), "delete" !== i ? ("insert" === i && (r < t || !e) && (t += o), r += o) : t -= Math.min(o, t - r)
                            }
                            return t
                        }, t.exports = l
                    }, function(t, e) {
                        "use strict";
                        var n = Object.prototype.hasOwnProperty,
                            r = Object.prototype.toString,
                            o = Object.defineProperty,
                            i = Object.getOwnPropertyDescriptor,
                            a = function(t) { return "function" == typeof Array.isArray ? Array.isArray(t) : "[object Array]" === r.call(t) },
                            u = function(t) {
                                if (!t || "[object Object]" !== r.call(t)) return !1;
                                var e, o = n.call(t, "constructor"),
                                    i = t.constructor && t.constructor.prototype && n.call(t.constructor.prototype, "isPrototypeOf");
                                if (t.constructor && !o && !i) return !1;
                                for (e in t);
                                return void 0 === e || n.call(t, e)
                            },
                            l = function(t, e) { o && "__proto__" === e.name ? o(t, e.name, { enumerable: !0, configurable: !0, value: e.newValue, writable: !0 }) : t[e.name] = e.newValue },
                            s = function(t, e) { if ("__proto__" === e) { if (!n.call(t, e)) return; if (i) return i(t, e).value } return t[e] };
                        t.exports = function t() {
                            var e, n, r, o, i, c, f = arguments[0],
                                h = 1,
                                p = arguments.length,
                                d = !1;
                            for ("boolean" == typeof f && (d = f, f = arguments[1] || {}, h = 2), (null == f || "object" != typeof f && "function" != typeof f) && (f = {}); h < p; ++h)
                                if (null != (e = arguments[h]))
                                    for (n in e) r = s(f, n), f !== (o = s(e, n)) && (d && o && (u(o) || (i = a(o))) ? (i ? (i = !1, c = r && a(r) ? r : []) : c = r && u(r) ? r : {}, l(f, { name: n, newValue: t(d, c, o) })) : void 0 !== o && l(f, { name: n, newValue: o }));
                            return f
                        }
                    }, function(t, e, n) {
                        "use strict";
                        Object.defineProperty(e, "__esModule", { value: !0 }), e.default = e.BlockEmbed = e.bubbleFormats = void 0;
                        var r = function() {
                                function t(t, e) {
                                    for (var n = 0; n < e.length; n++) {
                                        var r = e[n];
                                        r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(t, r.key, r)
                                    }
                                }
                                return function(e, n, r) { return n && t(e.prototype, n), r && t(e, r), e }
                            }(),
                            o = function t(e, n, r) { null === e && (e = Function.prototype); var o = Object.getOwnPropertyDescriptor(e, n); if (void 0 === o) { var i = Object.getPrototypeOf(e); return null === i ? void 0 : t(i, n, r) } if ("value" in o) return o.value; var a = o.get; return void 0 !== a ? a.call(r) : void 0 },
                            i = f(n(3)),
                            a = f(n(2)),
                            u = f(n(0)),
                            l = f(n(16)),
                            s = f(n(6)),
                            c = f(n(7));

                        function f(t) { return t && t.__esModule ? t : { default: t } }

                        function h(t, e) { if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function") }

                        function p(t, e) { if (!t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return !e || "object" != typeof e && "function" != typeof e ? t : e }

                        function d(t, e) {
                            if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + typeof e);
                            t.prototype = Object.create(e && e.prototype, { constructor: { value: t, enumerable: !1, writable: !0, configurable: !0 } }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e)
                        }
                        var y = function(t) {
                            function e() { return h(this, e), p(this, (e.__proto__ || Object.getPrototypeOf(e)).apply(this, arguments)) }
                            return d(e, t), r(e, [{ key: "attach", value: function() { o(e.prototype.__proto__ || Object.getPrototypeOf(e.prototype), "attach", this).call(this), this.attributes = new u.default.Attributor.Store(this.domNode) } }, { key: "delta", value: function() { return (new a.default).insert(this.value(), (0, i.default)(this.formats(), this.attributes.values())) } }, {
                                key: "format",
                                value: function(t, e) {
                                    var n = u.default.query(t, u.default.Scope.BLOCK_ATTRIBUTE);
                                    null != n && this.attributes.attribute(n, e)
                                }
                            }, { key: "formatAt", value: function(t, e, n, r) { this.format(n, r) } }, {
                                key: "insertAt",
                                value: function(t, n, r) {
                                    if ("string" == typeof n && n.endsWith("\n")) {
                                        var i = u.default.create(v.blotName);
                                        this.parent.insertBefore(i, 0 === t ? this : this.next), i.insertAt(0, n.slice(0, -1))
                                    } else o(e.prototype.__proto__ || Object.getPrototypeOf(e.prototype), "insertAt", this).call(this, t, n, r)
                                }
                            }]), e
                        }(u.default.Embed);
                        y.scope = u.default.Scope.BLOCK_BLOT;
                        var v = function(t) {
                            function e(t) { h(this, e); var n = p(this, (e.__proto__ || Object.getPrototypeOf(e)).call(this, t)); return n.cache = {}, n }
                            return d(e, t), r(e, [{ key: "delta", value: function() { return null == this.cache.delta && (this.cache.delta = this.descendants(u.default.Leaf).reduce((function(t, e) { return 0 === e.length() ? t : t.insert(e.value(), g(e)) }), new a.default).insert("\n", g(this))), this.cache.delta } }, { key: "deleteAt", value: function(t, n) { o(e.prototype.__proto__ || Object.getPrototypeOf(e.prototype), "deleteAt", this).call(this, t, n), this.cache = {} } }, { key: "formatAt", value: function(t, n, r, i) { n <= 0 || (u.default.query(r, u.default.Scope.BLOCK) ? t + n === this.length() && this.format(r, i) : o(e.prototype.__proto__ || Object.getPrototypeOf(e.prototype), "formatAt", this).call(this, t, Math.min(n, this.length() - t - 1), r, i), this.cache = {}) } }, {
                                key: "insertAt",
                                value: function(t, n, r) {
                                    if (null != r) return o(e.prototype.__proto__ || Object.getPrototypeOf(e.prototype), "insertAt", this).call(this, t, n, r);
                                    if (0 !== n.length) {
                                        var i = n.split("\n"),
                                            a = i.shift();
                                        a.length > 0 && (t < this.length() - 1 || null == this.children.tail ? o(e.prototype.__proto__ || Object.getPrototypeOf(e.prototype), "insertAt", this).call(this, Math.min(t, this.length() - 1), a) : this.children.tail.insertAt(this.children.tail.length(), a), this.cache = {});
                                        var u = this;
                                        i.reduce((function(t, e) { return (u = u.split(t, !0)).insertAt(0, e), e.length }), t + a.length)
                                    }
                                }
                            }, {
                                key: "insertBefore",
                                value: function(t, n) {
                                    var r = this.children.head;
                                    o(e.prototype.__proto__ || Object.getPrototypeOf(e.prototype), "insertBefore", this).call(this, t, n), r instanceof l.default && r.remove(), this.cache = {}
                                }
                            }, { key: "length", value: function() { return null == this.cache.length && (this.cache.length = o(e.prototype.__proto__ || Object.getPrototypeOf(e.prototype), "length", this).call(this) + 1), this.cache.length } }, { key: "moveChildren", value: function(t, n) { o(e.prototype.__proto__ || Object.getPrototypeOf(e.prototype), "moveChildren", this).call(this, t, n), this.cache = {} } }, { key: "optimize", value: function(t) { o(e.prototype.__proto__ || Object.getPrototypeOf(e.prototype), "optimize", this).call(this, t), this.cache = {} } }, { key: "path", value: function(t) { return o(e.prototype.__proto__ || Object.getPrototypeOf(e.prototype), "path", this).call(this, t, !0) } }, { key: "removeChild", value: function(t) { o(e.prototype.__proto__ || Object.getPrototypeOf(e.prototype), "removeChild", this).call(this, t), this.cache = {} } }, { key: "split", value: function(t) { var n = arguments.length > 1 && void 0 !== arguments[1] && arguments[1]; if (n && (0 === t || t >= this.length() - 1)) { var r = this.clone(); return 0 === t ? (this.parent.insertBefore(r, this), this) : (this.parent.insertBefore(r, this.next), r) } var i = o(e.prototype.__proto__ || Object.getPrototypeOf(e.prototype), "split", this).call(this, t, n); return this.cache = {}, i } }]), e
                        }(u.default.Block);

                        function g(t) { var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}; return null == t ? e : ("function" == typeof t.formats && (e = (0, i.default)(e, t.formats())), null == t.parent || "scroll" == t.parent.blotName || t.parent.statics.scope !== t.statics.scope ? e : g(t.parent, e)) }
                        v.blotName = "block", v.tagName = "P", v.defaultChild = "break", v.allowedChildren = [s.default, u.default.Embed, c.default], e.bubbleFormats = g, e.BlockEmbed = y, e.default = v
                    }, function(t, e, n) {
                        "use strict";
                        Object.defineProperty(e, "__esModule", { value: !0 }), e.default = e.overload = e.expandConfig = void 0;
                        var r = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) { return typeof t } : function(t) { return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t },
                            o = function(t, e) {
                                if (Array.isArray(t)) return t;
                                if (Symbol.iterator in Object(t)) return function(t, e) {
                                    var n = [],
                                        r = !0,
                                        o = !1,
                                        i = void 0;
                                    try { for (var a, u = t[Symbol.iterator](); !(r = (a = u.next()).done) && (n.push(a.value), !e || n.length !== e); r = !0); } catch (t) { o = !0, i = t } finally { try {!r && u.return && u.return() } finally { if (o) throw i } }
                                    return n
                                }(t, e);
                                throw new TypeError("Invalid attempt to destructure non-iterable instance")
                            },
                            i = function() {
                                function t(t, e) {
                                    for (var n = 0; n < e.length; n++) {
                                        var r = e[n];
                                        r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(t, r.key, r)
                                    }
                                }
                                return function(e, n, r) { return n && t(e.prototype, n), r && t(e, r), e }
                            }();
                        n(50);
                        var a = v(n(2)),
                            u = v(n(14)),
                            l = v(n(8)),
                            s = v(n(9)),
                            c = v(n(0)),
                            f = n(15),
                            h = v(f),
                            p = v(n(3)),
                            d = v(n(10)),
                            y = v(n(34));

                        function v(t) { return t && t.__esModule ? t : { default: t } }

                        function g(t, e, n) { return e in t ? Object.defineProperty(t, e, { value: n, enumerable: !0, configurable: !0, writable: !0 }) : t[e] = n, t }

                        function b(t, e) { if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function") }
                        var m = (0, d.default)("quill"),
                            _ = function() {
                                function t(e) {
                                    var n = this,
                                        r = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
                                    if (b(this, t), this.options = w(e, r), this.container = this.options.container, null == this.container) return m.error("Invalid Quill container", e);
                                    this.options.debug && t.debug(this.options.debug);
                                    var o = this.container.innerHTML.trim();
                                    this.container.classList.add("ql-container"), this.container.innerHTML = "", this.container.__quill = this, this.root = this.addContainer("ql-editor"), this.root.classList.add("ql-blank"), this.root.setAttribute("data-gramm", !1), this.scrollingContainer = this.options.scrollingContainer || this.root, this.emitter = new l.default, this.scroll = c.default.create(this.root, { emitter: this.emitter, whitelist: this.options.formats }), this.editor = new u.default(this.scroll), this.selection = new h.default(this.scroll, this.emitter), this.theme = new this.options.theme(this, this.options), this.keyboard = this.theme.addModule("keyboard"), this.clipboard = this.theme.addModule("clipboard"), this.history = this.theme.addModule("history"), this.theme.init(), this.emitter.on(l.default.events.EDITOR_CHANGE, (function(t) { t === l.default.events.TEXT_CHANGE && n.root.classList.toggle("ql-blank", n.editor.isBlank()) })), this.emitter.on(l.default.events.SCROLL_UPDATE, (function(t, e) {
                                        var r = n.selection.lastRange,
                                            o = r && 0 === r.length ? r.index : void 0;
                                        x.call(n, (function() { return n.editor.update(null, e, o) }), t)
                                    }));
                                    var i = this.clipboard.convert("<div class='ql-editor' style=\"white-space: normal;\">" + o + "<p><br></p></div>");
                                    this.setContents(i), this.history.clear(), this.options.placeholder && this.root.setAttribute("data-placeholder", this.options.placeholder), this.options.readOnly && this.disable()
                                }
                                return i(t, null, [{ key: "debug", value: function(t) {!0 === t && (t = "log"), d.default.level(t) } }, { key: "find", value: function(t) { return t.__quill || c.default.find(t) } }, { key: "import", value: function(t) { return null == this.imports[t] && m.error("Cannot import " + t + ". Are you sure it was registered?"), this.imports[t] } }, {
                                    key: "register",
                                    value: function(t, e) {
                                        var n = this,
                                            r = arguments.length > 2 && void 0 !== arguments[2] && arguments[2];
                                        if ("string" != typeof t) { var o = t.attrName || t.blotName; "string" == typeof o ? this.register("formats/" + o, t, e) : Object.keys(t).forEach((function(r) { n.register(r, t[r], e) })) } else null == this.imports[t] || r || m.warn("Overwriting " + t + " with", e), this.imports[t] = e, (t.startsWith("blots/") || t.startsWith("formats/")) && "abstract" !== e.blotName ? c.default.register(e) : t.startsWith("modules") && "function" == typeof e.register && e.register()
                                    }
                                }]), i(t, [{
                                    key: "addContainer",
                                    value: function(t) {
                                        var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : null;
                                        if ("string" == typeof t) {
                                            var n = t;
                                            (t = document.createElement("div")).classList.add(n)
                                        }
                                        return this.container.insertBefore(t, e), t
                                    }
                                }, { key: "blur", value: function() { this.selection.setRange(null) } }, {
                                    key: "deleteText",
                                    value: function(t, e, n) {
                                        var r = this,
                                            i = O(t, e, n),
                                            a = o(i, 4);
                                        return t = a[0], e = a[1], n = a[3], x.call(this, (function() { return r.editor.deleteText(t, e) }), n, t, -1 * e)
                                    }
                                }, { key: "disable", value: function() { this.enable(!1) } }, {
                                    key: "enable",
                                    value: function() {
                                        var t = !(arguments.length > 0 && void 0 !== arguments[0]) || arguments[0];
                                        this.scroll.enable(t), this.container.classList.toggle("ql-disabled", !t)
                                    }
                                }, {
                                    key: "focus",
                                    value: function() {
                                        var t = this.scrollingContainer.scrollTop;
                                        this.selection.focus(), this.scrollingContainer.scrollTop = t, this.scrollIntoView()
                                    }
                                }, {
                                    key: "format",
                                    value: function(t, e) {
                                        var n = this,
                                            r = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : l.default.sources.API;
                                        return x.call(this, (function() {
                                            var r = n.getSelection(!0),
                                                o = new a.default;
                                            if (null == r) return o;
                                            if (c.default.query(t, c.default.Scope.BLOCK)) o = n.editor.formatLine(r.index, r.length, g({}, t, e));
                                            else {
                                                if (0 === r.length) return n.selection.format(t, e), o;
                                                o = n.editor.formatText(r.index, r.length, g({}, t, e))
                                            }
                                            return n.setSelection(r, l.default.sources.SILENT), o
                                        }), r)
                                    }
                                }, {
                                    key: "formatLine",
                                    value: function(t, e, n, r, i) {
                                        var a, u = this,
                                            l = O(t, e, n, r, i),
                                            s = o(l, 4);
                                        return t = s[0], e = s[1], a = s[2], i = s[3], x.call(this, (function() { return u.editor.formatLine(t, e, a) }), i, t, 0)
                                    }
                                }, {
                                    key: "formatText",
                                    value: function(t, e, n, r, i) {
                                        var a, u = this,
                                            l = O(t, e, n, r, i),
                                            s = o(l, 4);
                                        return t = s[0], e = s[1], a = s[2], i = s[3], x.call(this, (function() { return u.editor.formatText(t, e, a) }), i, t, 0)
                                    }
                                }, {
                                    key: "getBounds",
                                    value: function(t) {
                                        var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0,
                                            n = void 0;
                                        n = "number" == typeof t ? this.selection.getBounds(t, e) : this.selection.getBounds(t.index, t.length);
                                        var r = this.container.getBoundingClientRect();
                                        return { bottom: n.bottom - r.top, height: n.height, left: n.left - r.left, right: n.right - r.left, top: n.top - r.top, width: n.width }
                                    }
                                }, {
                                    key: "getContents",
                                    value: function() {
                                        var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 0,
                                            e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : this.getLength() - t,
                                            n = O(t, e),
                                            r = o(n, 2);
                                        return t = r[0], e = r[1], this.editor.getContents(t, e)
                                    }
                                }, {
                                    key: "getFormat",
                                    value: function() {
                                        var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : this.getSelection(!0),
                                            e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0;
                                        return "number" == typeof t ? this.editor.getFormat(t, e) : this.editor.getFormat(t.index, t.length)
                                    }
                                }, { key: "getIndex", value: function(t) { return t.offset(this.scroll) } }, { key: "getLength", value: function() { return this.scroll.length() } }, { key: "getLeaf", value: function(t) { return this.scroll.leaf(t) } }, { key: "getLine", value: function(t) { return this.scroll.line(t) } }, {
                                    key: "getLines",
                                    value: function() {
                                        var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 0,
                                            e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : Number.MAX_VALUE;
                                        return "number" != typeof t ? this.scroll.lines(t.index, t.length) : this.scroll.lines(t, e)
                                    }
                                }, { key: "getModule", value: function(t) { return this.theme.modules[t] } }, { key: "getSelection", value: function() { var t = arguments.length > 0 && void 0 !== arguments[0] && arguments[0]; return t && this.focus(), this.update(), this.selection.getRange()[0] } }, {
                                    key: "getText",
                                    value: function() {
                                        var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 0,
                                            e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : this.getLength() - t,
                                            n = O(t, e),
                                            r = o(n, 2);
                                        return t = r[0], e = r[1], this.editor.getText(t, e)
                                    }
                                }, { key: "hasFocus", value: function() { return this.selection.hasFocus() } }, {
                                    key: "insertEmbed",
                                    value: function(e, n, r) {
                                        var o = this,
                                            i = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : t.sources.API;
                                        return x.call(this, (function() { return o.editor.insertEmbed(e, n, r) }), i, e)
                                    }
                                }, {
                                    key: "insertText",
                                    value: function(t, e, n, r, i) {
                                        var a, u = this,
                                            l = O(t, 0, n, r, i),
                                            s = o(l, 4);
                                        return t = s[0], a = s[2], i = s[3], x.call(this, (function() { return u.editor.insertText(t, e, a) }), i, t, e.length)
                                    }
                                }, { key: "isEnabled", value: function() { return !this.container.classList.contains("ql-disabled") } }, { key: "off", value: function() { return this.emitter.off.apply(this.emitter, arguments) } }, { key: "on", value: function() { return this.emitter.on.apply(this.emitter, arguments) } }, { key: "once", value: function() { return this.emitter.once.apply(this.emitter, arguments) } }, { key: "pasteHTML", value: function(t, e, n) { this.clipboard.dangerouslyPasteHTML(t, e, n) } }, {
                                    key: "removeFormat",
                                    value: function(t, e, n) {
                                        var r = this,
                                            i = O(t, e, n),
                                            a = o(i, 4);
                                        return t = a[0], e = a[1], n = a[3], x.call(this, (function() { return r.editor.removeFormat(t, e) }), n, t)
                                    }
                                }, { key: "scrollIntoView", value: function() { this.selection.scrollIntoView(this.scrollingContainer) } }, {
                                    key: "setContents",
                                    value: function(t) {
                                        var e = this,
                                            n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : l.default.sources.API;
                                        return x.call(this, (function() {
                                            t = new a.default(t);
                                            var n = e.getLength(),
                                                r = e.editor.deleteText(0, n),
                                                o = e.editor.applyDelta(t),
                                                i = o.ops[o.ops.length - 1];
                                            return null != i && "string" == typeof i.insert && "\n" === i.insert[i.insert.length - 1] && (e.editor.deleteText(e.getLength() - 1, 1), o.delete(1)), r.compose(o)
                                        }), n)
                                    }
                                }, {
                                    key: "setSelection",
                                    value: function(e, n, r) {
                                        if (null == e) this.selection.setRange(null, n || t.sources.API);
                                        else {
                                            var i = O(e, n, r),
                                                a = o(i, 4);
                                            e = a[0], n = a[1], r = a[3], this.selection.setRange(new f.Range(e, n), r), r !== l.default.sources.SILENT && this.selection.scrollIntoView(this.scrollingContainer)
                                        }
                                    }
                                }, {
                                    key: "setText",
                                    value: function(t) {
                                        var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : l.default.sources.API,
                                            n = (new a.default).insert(t);
                                        return this.setContents(n, e)
                                    }
                                }, {
                                    key: "update",
                                    value: function() {
                                        var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : l.default.sources.USER,
                                            e = this.scroll.update(t);
                                        return this.selection.update(t), e
                                    }
                                }, {
                                    key: "updateContents",
                                    value: function(t) {
                                        var e = this,
                                            n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : l.default.sources.API;
                                        return x.call(this, (function() { return t = new a.default(t), e.editor.applyDelta(t, n) }), n, !0)
                                    }
                                }]), t
                            }();

                        function w(t, e) {
                            if ((e = (0, p.default)(!0, { container: t, modules: { clipboard: !0, keyboard: !0, history: !0 } }, e)).theme && e.theme !== _.DEFAULTS.theme) { if (e.theme = _.import("themes/" + e.theme), null == e.theme) throw new Error("Invalid theme " + e.theme + ". Did you register it?") } else e.theme = y.default;
                            var n = (0, p.default)(!0, {}, e.theme.DEFAULTS);
                            [n, e].forEach((function(t) { t.modules = t.modules || {}, Object.keys(t.modules).forEach((function(e) {!0 === t.modules[e] && (t.modules[e] = {}) })) }));
                            var r = Object.keys(n.modules).concat(Object.keys(e.modules)).reduce((function(t, e) { var n = _.import("modules/" + e); return null == n ? m.error("Cannot load " + e + " module. Are you sure you registered it?") : t[e] = n.DEFAULTS || {}, t }), {});
                            return null != e.modules && e.modules.toolbar && e.modules.toolbar.constructor !== Object && (e.modules.toolbar = { container: e.modules.toolbar }), e = (0, p.default)(!0, {}, _.DEFAULTS, { modules: r }, n, e), ["bounds", "container", "scrollingContainer"].forEach((function(t) { "string" == typeof e[t] && (e[t] = document.querySelector(e[t])) })), e.modules = Object.keys(e.modules).reduce((function(t, n) { return e.modules[n] && (t[n] = e.modules[n]), t }), {}), e
                        }

                        function x(t, e, n, r) {
                            if (this.options.strict && !this.isEnabled() && e === l.default.sources.USER) return new a.default;
                            var o = null == n ? null : this.getSelection(),
                                i = this.editor.delta,
                                u = t();
                            if (null != o && (!0 === n && (n = o.index), null == r ? o = E(o, u, e) : 0 !== r && (o = E(o, n, r, e)), this.setSelection(o, l.default.sources.SILENT)), u.length() > 0) {
                                var s, c, f = [l.default.events.TEXT_CHANGE, u, i, e];
                                (s = this.emitter).emit.apply(s, [l.default.events.EDITOR_CHANGE].concat(f)), e !== l.default.sources.SILENT && (c = this.emitter).emit.apply(c, f)
                            }
                            return u
                        }

                        function O(t, e, n, o, i) { var a = {}; return "number" == typeof t.index && "number" == typeof t.length ? "number" != typeof e ? (i = o, o = n, n = e, e = t.length, t = t.index) : (e = t.length, t = t.index) : "number" != typeof e && (i = o, o = n, n = e, e = 0), "object" === (void 0 === n ? "undefined" : r(n)) ? (a = n, i = o) : "string" == typeof n && (null != o ? a[n] = o : i = n), [t, e, a, i = i || l.default.sources.API] }

                        function E(t, e, n, r) {
                            if (null == t) return null;
                            var i = void 0,
                                u = void 0;
                            if (e instanceof a.default) {
                                var s = [t.index, t.index + t.length].map((function(t) { return e.transformPosition(t, r !== l.default.sources.USER) })),
                                    c = o(s, 2);
                                i = c[0], u = c[1]
                            } else {
                                var h = [t.index, t.index + t.length].map((function(t) { return t < e || t === e && r === l.default.sources.USER ? t : n >= 0 ? t + n : Math.max(e, t + n) })),
                                    p = o(h, 2);
                                i = p[0], u = p[1]
                            }
                            return new f.Range(i, u - i)
                        }
                        _.DEFAULTS = { bounds: null, formats: null, modules: {}, placeholder: "", readOnly: !1, scrollingContainer: null, strict: !0, theme: "default" }, _.events = l.default.events, _.sources = l.default.sources, _.version = "1.3.7", _.imports = { delta: a.default, parchment: c.default, "core/module": s.default, "core/theme": y.default }, e.expandConfig = w, e.overload = O, e.default = _
                    }, function(t, e, n) {
                        "use strict";
                        Object.defineProperty(e, "__esModule", { value: !0 });
                        var r = function() {
                                function t(t, e) {
                                    for (var n = 0; n < e.length; n++) {
                                        var r = e[n];
                                        r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(t, r.key, r)
                                    }
                                }
                                return function(e, n, r) { return n && t(e.prototype, n), r && t(e, r), e }
                            }(),
                            o = function t(e, n, r) { null === e && (e = Function.prototype); var o = Object.getOwnPropertyDescriptor(e, n); if (void 0 === o) { var i = Object.getPrototypeOf(e); return null === i ? void 0 : t(i, n, r) } if ("value" in o) return o.value; var a = o.get; return void 0 !== a ? a.call(r) : void 0 },
                            i = u(n(7)),
                            a = u(n(0));

                        function u(t) { return t && t.__esModule ? t : { default: t } }

                        function l(t, e) { if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function") }

                        function s(t, e) { if (!t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return !e || "object" != typeof e && "function" != typeof e ? t : e }
                        var c = function(t) {
                            function e() { return l(this, e), s(this, (e.__proto__ || Object.getPrototypeOf(e)).apply(this, arguments)) }
                            return function(t, e) {
                                if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + typeof e);
                                t.prototype = Object.create(e && e.prototype, { constructor: { value: t, enumerable: !1, writable: !0, configurable: !0 } }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e)
                            }(e, t), r(e, [{
                                key: "formatAt",
                                value: function(t, n, r, i) {
                                    if (e.compare(this.statics.blotName, r) < 0 && a.default.query(r, a.default.Scope.BLOT)) {
                                        var u = this.isolate(t, n);
                                        i && u.wrap(r, i)
                                    } else o(e.prototype.__proto__ || Object.getPrototypeOf(e.prototype), "formatAt", this).call(this, t, n, r, i)
                                }
                            }, {
                                key: "optimize",
                                value: function(t) {
                                    if (o(e.prototype.__proto__ || Object.getPrototypeOf(e.prototype), "optimize", this).call(this, t), this.parent instanceof e && e.compare(this.statics.blotName, this.parent.statics.blotName) > 0) {
                                        var n = this.parent.isolate(this.offset(), this.length());
                                        this.moveChildren(n), n.wrap(this)
                                    }
                                }
                            }], [{
                                key: "compare",
                                value: function(t, n) {
                                    var r = e.order.indexOf(t),
                                        o = e.order.indexOf(n);
                                    return r >= 0 || o >= 0 ? r - o : t === n ? 0 : t < n ? -1 : 1
                                }
                            }]), e
                        }(a.default.Inline);
                        c.allowedChildren = [c, a.default.Embed, i.default], c.order = ["cursor", "inline", "underline", "strike", "italic", "bold", "script", "link", "code"], e.default = c
                    }, function(t, e, n) {
                        "use strict";
                        Object.defineProperty(e, "__esModule", { value: !0 });
                        var r, o = n(0);

                        function i(t, e) { if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function") }

                        function a(t, e) { if (!t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return !e || "object" != typeof e && "function" != typeof e ? t : e }
                        var u = function(t) {
                            function e() { return i(this, e), a(this, (e.__proto__ || Object.getPrototypeOf(e)).apply(this, arguments)) }
                            return function(t, e) {
                                if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + typeof e);
                                t.prototype = Object.create(e && e.prototype, { constructor: { value: t, enumerable: !1, writable: !0, configurable: !0 } }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e)
                            }(e, t), e
                        }(((r = o) && r.__esModule ? r : { default: r }).default.Text);
                        e.default = u
                    }, function(t, e, n) {
                        "use strict";
                        Object.defineProperty(e, "__esModule", { value: !0 });
                        var r = function() {
                                function t(t, e) {
                                    for (var n = 0; n < e.length; n++) {
                                        var r = e[n];
                                        r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(t, r.key, r)
                                    }
                                }
                                return function(e, n, r) { return n && t(e.prototype, n), r && t(e, r), e }
                            }(),
                            o = function t(e, n, r) { null === e && (e = Function.prototype); var o = Object.getOwnPropertyDescriptor(e, n); if (void 0 === o) { var i = Object.getPrototypeOf(e); return null === i ? void 0 : t(i, n, r) } if ("value" in o) return o.value; var a = o.get; return void 0 !== a ? a.call(r) : void 0 },
                            i = a(n(54));

                        function a(t) { return t && t.__esModule ? t : { default: t } }
                        var u = (0, a(n(10)).default)("quill:events");
                        ["selectionchange", "mousedown", "mouseup", "click"].forEach((function(t) {
                            document.addEventListener(t, (function() {
                                for (var t = arguments.length, e = Array(t), n = 0; n < t; n++) e[n] = arguments[n];
                                [].slice.call(document.querySelectorAll(".ql-container")).forEach((function(t) {
                                    var n;
                                    t.__quill && t.__quill.emitter && (n = t.__quill.emitter).handleDOM.apply(n, e)
                                }))
                            }))
                        }));
                        var l = function(t) {
                            function e() {! function(t, e) { if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function") }(this, e); var t = function(t, e) { if (!t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return !e || "object" != typeof e && "function" != typeof e ? t : e }(this, (e.__proto__ || Object.getPrototypeOf(e)).call(this)); return t.listeners = {}, t.on("error", u.error), t }
                            return function(t, e) {
                                if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + typeof e);
                                t.prototype = Object.create(e && e.prototype, { constructor: { value: t, enumerable: !1, writable: !0, configurable: !0 } }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e)
                            }(e, t), r(e, [{ key: "emit", value: function() { u.log.apply(u, arguments), o(e.prototype.__proto__ || Object.getPrototypeOf(e.prototype), "emit", this).apply(this, arguments) } }, {
                                key: "handleDOM",
                                value: function(t) {
                                    for (var e = arguments.length, n = Array(e > 1 ? e - 1 : 0), r = 1; r < e; r++) n[r - 1] = arguments[r];
                                    (this.listeners[t.type] || []).forEach((function(e) {
                                        var r = e.node,
                                            o = e.handler;
                                        (t.target === r || r.contains(t.target)) && o.apply(void 0, [t].concat(n))
                                    }))
                                }
                            }, { key: "listenDOM", value: function(t, e, n) { this.listeners[t] || (this.listeners[t] = []), this.listeners[t].push({ node: e, handler: n }) } }]), e
                        }(i.default);
                        l.events = { EDITOR_CHANGE: "editor-change", SCROLL_BEFORE_UPDATE: "scroll-before-update", SCROLL_OPTIMIZE: "scroll-optimize", SCROLL_UPDATE: "scroll-update", SELECTION_CHANGE: "selection-change", TEXT_CHANGE: "text-change" }, l.sources = { API: "api", SILENT: "silent", USER: "user" }, e.default = l
                    }, function(t, e, n) {
                        "use strict";

                        function r(t, e) { if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function") }
                        Object.defineProperty(e, "__esModule", { value: !0 });
                        var o = function t(e) {
                            var n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
                            r(this, t), this.quill = e, this.options = n
                        };
                        o.DEFAULTS = {}, e.default = o
                    }, function(t, e, n) {
                        "use strict";
                        Object.defineProperty(e, "__esModule", { value: !0 });
                        var r = ["error", "warn", "log", "info"],
                            o = "warn";

                        function i(t) {
                            if (r.indexOf(t) <= r.indexOf(o)) {
                                for (var e, n = arguments.length, i = Array(n > 1 ? n - 1 : 0), a = 1; a < n; a++) i[a - 1] = arguments[a];
                                (e = console)[t].apply(e, i)
                            }
                        }

                        function a(t) { return r.reduce((function(e, n) { return e[n] = i.bind(console, n, t), e }), {}) }
                        i.level = a.level = function(t) { o = t }, e.default = a
                    }, function(t, e, n) {
                        var r = Array.prototype.slice,
                            o = n(52),
                            i = n(53),
                            a = t.exports = function(t, e, n) {
                                return n || (n = {}), t === e || (t instanceof Date && e instanceof Date ? t.getTime() === e.getTime() : !t || !e || "object" != typeof t && "object" != typeof e ? n.strict ? t === e : t == e : function(t, e, n) {
                                    var s, c;
                                    if (u(t) || u(e)) return !1;
                                    if (t.prototype !== e.prototype) return !1;
                                    if (i(t)) return !!i(e) && (t = r.call(t), e = r.call(e), a(t, e, n));
                                    if (l(t)) {
                                        if (!l(e)) return !1;
                                        if (t.length !== e.length) return !1;
                                        for (s = 0; s < t.length; s++)
                                            if (t[s] !== e[s]) return !1;
                                        return !0
                                    }
                                    try {
                                        var f = o(t),
                                            h = o(e)
                                    } catch (t) { return !1 }
                                    if (f.length != h.length) return !1;
                                    for (f.sort(), h.sort(), s = f.length - 1; s >= 0; s--)
                                        if (f[s] != h[s]) return !1;
                                    for (s = f.length - 1; s >= 0; s--)
                                        if (c = f[s], !a(t[c], e[c], n)) return !1;
                                    return typeof t == typeof e
                                }(t, e, n))
                            };

                        function u(t) { return null == t }

                        function l(t) { return !(!t || "object" != typeof t || "number" != typeof t.length || "function" != typeof t.copy || "function" != typeof t.slice || t.length > 0 && "number" != typeof t[0]) }
                    }, function(t, e, n) {
                        "use strict";
                        Object.defineProperty(e, "__esModule", { value: !0 });
                        var r = n(1),
                            o = function() {
                                function t(t, e, n) {
                                    void 0 === n && (n = {}), this.attrName = t, this.keyName = e;
                                    var o = r.Scope.TYPE & r.Scope.ATTRIBUTE;
                                    null != n.scope ? this.scope = n.scope & r.Scope.LEVEL | o : this.scope = r.Scope.ATTRIBUTE, null != n.whitelist && (this.whitelist = n.whitelist)
                                }
                                return t.keys = function(t) { return [].map.call(t.attributes, (function(t) { return t.name })) }, t.prototype.add = function(t, e) { return !!this.canAdd(t, e) && (t.setAttribute(this.keyName, e), !0) }, t.prototype.canAdd = function(t, e) { return null != r.query(t, r.Scope.BLOT & (this.scope | r.Scope.TYPE)) && (null == this.whitelist || ("string" == typeof e ? this.whitelist.indexOf(e.replace(/["']/g, "")) > -1 : this.whitelist.indexOf(e) > -1)) }, t.prototype.remove = function(t) { t.removeAttribute(this.keyName) }, t.prototype.value = function(t) { var e = t.getAttribute(this.keyName); return this.canAdd(t, e) && e ? e : "" }, t
                            }();
                        e.default = o
                    }, function(t, e, n) {
                        "use strict";
                        Object.defineProperty(e, "__esModule", { value: !0 }), e.default = e.Code = void 0;
                        var r = function(t, e) {
                                if (Array.isArray(t)) return t;
                                if (Symbol.iterator in Object(t)) return function(t, e) {
                                    var n = [],
                                        r = !0,
                                        o = !1,
                                        i = void 0;
                                    try { for (var a, u = t[Symbol.iterator](); !(r = (a = u.next()).done) && (n.push(a.value), !e || n.length !== e); r = !0); } catch (t) { o = !0, i = t } finally { try {!r && u.return && u.return() } finally { if (o) throw i } }
                                    return n
                                }(t, e);
                                throw new TypeError("Invalid attempt to destructure non-iterable instance")
                            },
                            o = function() {
                                function t(t, e) {
                                    for (var n = 0; n < e.length; n++) {
                                        var r = e[n];
                                        r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(t, r.key, r)
                                    }
                                }
                                return function(e, n, r) { return n && t(e.prototype, n), r && t(e, r), e }
                            }(),
                            i = function t(e, n, r) { null === e && (e = Function.prototype); var o = Object.getOwnPropertyDescriptor(e, n); if (void 0 === o) { var i = Object.getPrototypeOf(e); return null === i ? void 0 : t(i, n, r) } if ("value" in o) return o.value; var a = o.get; return void 0 !== a ? a.call(r) : void 0 },
                            a = f(n(2)),
                            u = f(n(0)),
                            l = f(n(4)),
                            s = f(n(6)),
                            c = f(n(7));

                        function f(t) { return t && t.__esModule ? t : { default: t } }

                        function h(t, e) { if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function") }

                        function p(t, e) { if (!t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return !e || "object" != typeof e && "function" != typeof e ? t : e }

                        function d(t, e) {
                            if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + typeof e);
                            t.prototype = Object.create(e && e.prototype, { constructor: { value: t, enumerable: !1, writable: !0, configurable: !0 } }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e)
                        }
                        var y = function(t) {
                            function e() { return h(this, e), p(this, (e.__proto__ || Object.getPrototypeOf(e)).apply(this, arguments)) }
                            return d(e, t), e
                        }(s.default);
                        y.blotName = "code", y.tagName = "CODE";
                        var v = function(t) {
                            function e() { return h(this, e), p(this, (e.__proto__ || Object.getPrototypeOf(e)).apply(this, arguments)) }
                            return d(e, t), o(e, [{
                                key: "delta",
                                value: function() {
                                    var t = this,
                                        e = this.domNode.textContent;
                                    return e.endsWith("\n") && (e = e.slice(0, -1)), e.split("\n").reduce((function(e, n) { return e.insert(n).insert("\n", t.formats()) }), new a.default)
                                }
                            }, {
                                key: "format",
                                value: function(t, n) {
                                    if (t !== this.statics.blotName || !n) {
                                        var o = this.descendant(c.default, this.length() - 1),
                                            a = r(o, 1)[0];
                                        null != a && a.deleteAt(a.length() - 1, 1), i(e.prototype.__proto__ || Object.getPrototypeOf(e.prototype), "format", this).call(this, t, n)
                                    }
                                }
                            }, {
                                key: "formatAt",
                                value: function(t, n, r, o) {
                                    if (0 !== n && null != u.default.query(r, u.default.Scope.BLOCK) && (r !== this.statics.blotName || o !== this.statics.formats(this.domNode))) {
                                        var i = this.newlineIndex(t);
                                        if (!(i < 0 || i >= t + n)) {
                                            var a = this.newlineIndex(t, !0) + 1,
                                                l = i - a + 1,
                                                s = this.isolate(a, l),
                                                c = s.next;
                                            s.format(r, o), c instanceof e && c.formatAt(0, t - a + n - l, r, o)
                                        }
                                    }
                                }
                            }, {
                                key: "insertAt",
                                value: function(t, e, n) {
                                    if (null == n) {
                                        var o = this.descendant(c.default, t),
                                            i = r(o, 2),
                                            a = i[0],
                                            u = i[1];
                                        a.insertAt(u, e)
                                    }
                                }
                            }, { key: "length", value: function() { var t = this.domNode.textContent.length; return this.domNode.textContent.endsWith("\n") ? t : t + 1 } }, { key: "newlineIndex", value: function(t) { var e = arguments.length > 1 && void 0 !== arguments[1] && arguments[1]; if (e) return this.domNode.textContent.slice(0, t).lastIndexOf("\n"); var n = this.domNode.textContent.slice(t).indexOf("\n"); return n > -1 ? t + n : -1 } }, {
                                key: "optimize",
                                value: function(t) {
                                    this.domNode.textContent.endsWith("\n") || this.appendChild(u.default.create("text", "\n")), i(e.prototype.__proto__ || Object.getPrototypeOf(e.prototype), "optimize", this).call(this, t);
                                    var n = this.next;
                                    null != n && n.prev === this && n.statics.blotName === this.statics.blotName && this.statics.formats(this.domNode) === n.statics.formats(n.domNode) && (n.optimize(t), n.moveChildren(this), n.remove())
                                }
                            }, {
                                key: "replace",
                                value: function(t) {
                                    i(e.prototype.__proto__ || Object.getPrototypeOf(e.prototype), "replace", this).call(this, t), [].slice.call(this.domNode.querySelectorAll("*")).forEach((function(t) {
                                        var e = u.default.find(t);
                                        null == e ? t.parentNode.removeChild(t) : e instanceof u.default.Embed ? e.remove() : e.unwrap()
                                    }))
                                }
                            }], [{ key: "create", value: function(t) { var n = i(e.__proto__ || Object.getPrototypeOf(e), "create", this).call(this, t); return n.setAttribute("spellcheck", !1), n } }, { key: "formats", value: function() { return !0 } }]), e
                        }(l.default);
                        v.blotName = "code-block", v.tagName = "PRE", v.TAB = "  ", e.Code = y, e.default = v
                    }, function(t, e, n) {
                        "use strict";
                        Object.defineProperty(e, "__esModule", { value: !0 });
                        var r = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) { return typeof t } : function(t) { return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t },
                            o = function(t, e) {
                                if (Array.isArray(t)) return t;
                                if (Symbol.iterator in Object(t)) return function(t, e) {
                                    var n = [],
                                        r = !0,
                                        o = !1,
                                        i = void 0;
                                    try { for (var a, u = t[Symbol.iterator](); !(r = (a = u.next()).done) && (n.push(a.value), !e || n.length !== e); r = !0); } catch (t) { o = !0, i = t } finally { try {!r && u.return && u.return() } finally { if (o) throw i } }
                                    return n
                                }(t, e);
                                throw new TypeError("Invalid attempt to destructure non-iterable instance")
                            },
                            i = function() {
                                function t(t, e) {
                                    for (var n = 0; n < e.length; n++) {
                                        var r = e[n];
                                        r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(t, r.key, r)
                                    }
                                }
                                return function(e, n, r) { return n && t(e.prototype, n), r && t(e, r), e }
                            }(),
                            a = g(n(2)),
                            u = g(n(20)),
                            l = g(n(0)),
                            s = g(n(13)),
                            c = g(n(24)),
                            f = n(4),
                            h = g(f),
                            p = g(n(16)),
                            d = g(n(21)),
                            y = g(n(11)),
                            v = g(n(3));

                        function g(t) { return t && t.__esModule ? t : { default: t } }
                        var b = /^[ -~]*$/,
                            m = function() {
                                function t(e) {! function(t, e) { if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function") }(this, t), this.scroll = e, this.delta = this.getDelta() }
                                return i(t, [{
                                    key: "applyDelta",
                                    value: function(t) {
                                        var e = this,
                                            n = !1;
                                        this.scroll.update();
                                        var i = this.scroll.length();
                                        return this.scroll.batchStart(), (t = function(t) { return t.reduce((function(t, e) { if (1 === e.insert) { var n = (0, d.default)(e.attributes); return delete n.image, t.insert({ image: e.attributes.image }, n) } if (null == e.attributes || !0 !== e.attributes.list && !0 !== e.attributes.bullet || ((e = (0, d.default)(e)).attributes.list ? e.attributes.list = "ordered" : (e.attributes.list = "bullet", delete e.attributes.bullet)), "string" == typeof e.insert) { var r = e.insert.replace(/\r\n/g, "\n").replace(/\r/g, "\n"); return t.insert(r, e.attributes) } return t.push(e) }), new a.default) }(t)).reduce((function(t, a) {
                                            var s = a.retain || a.delete || a.insert.length || 1,
                                                c = a.attributes || {};
                                            if (null != a.insert) {
                                                if ("string" == typeof a.insert) {
                                                    var p = a.insert;
                                                    p.endsWith("\n") && n && (n = !1, p = p.slice(0, -1)), t >= i && !p.endsWith("\n") && (n = !0), e.scroll.insertAt(t, p);
                                                    var d = e.scroll.line(t),
                                                        y = o(d, 2),
                                                        g = y[0],
                                                        b = y[1],
                                                        m = (0, v.default)({}, (0, f.bubbleFormats)(g));
                                                    if (g instanceof h.default) {
                                                        var _ = g.descendant(l.default.Leaf, b),
                                                            w = o(_, 1)[0];
                                                        m = (0, v.default)(m, (0, f.bubbleFormats)(w))
                                                    }
                                                    c = u.default.attributes.diff(m, c) || {}
                                                } else if ("object" === r(a.insert)) {
                                                    var x = Object.keys(a.insert)[0];
                                                    if (null == x) return t;
                                                    e.scroll.insertAt(t, x, a.insert[x])
                                                }
                                                i += s
                                            }
                                            return Object.keys(c).forEach((function(n) { e.scroll.formatAt(t, s, n, c[n]) })), t + s
                                        }), 0), t.reduce((function(t, n) { return "number" == typeof n.delete ? (e.scroll.deleteAt(t, n.delete), t) : t + (n.retain || n.insert.length || 1) }), 0), this.scroll.batchEnd(), this.update(t)
                                    }
                                }, { key: "deleteText", value: function(t, e) { return this.scroll.deleteAt(t, e), this.update((new a.default).retain(t).delete(e)) } }, {
                                    key: "formatLine",
                                    value: function(t, e) {
                                        var n = this,
                                            r = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
                                        return this.scroll.update(), Object.keys(r).forEach((function(o) {
                                            if (null == n.scroll.whitelist || n.scroll.whitelist[o]) {
                                                var i = n.scroll.lines(t, Math.max(e, 1)),
                                                    a = e;
                                                i.forEach((function(e) {
                                                    var i = e.length();
                                                    if (e instanceof s.default) {
                                                        var u = t - e.offset(n.scroll),
                                                            l = e.newlineIndex(u + a) - u + 1;
                                                        e.formatAt(u, l, o, r[o])
                                                    } else e.format(o, r[o]);
                                                    a -= i
                                                }))
                                            }
                                        })), this.scroll.optimize(), this.update((new a.default).retain(t).retain(e, (0, d.default)(r)))
                                    }
                                }, {
                                    key: "formatText",
                                    value: function(t, e) {
                                        var n = this,
                                            r = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
                                        return Object.keys(r).forEach((function(o) { n.scroll.formatAt(t, e, o, r[o]) })), this.update((new a.default).retain(t).retain(e, (0, d.default)(r)))
                                    }
                                }, { key: "getContents", value: function(t, e) { return this.delta.slice(t, t + e) } }, { key: "getDelta", value: function() { return this.scroll.lines().reduce((function(t, e) { return t.concat(e.delta()) }), new a.default) } }, {
                                    key: "getFormat",
                                    value: function(t) {
                                        var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0,
                                            n = [],
                                            r = [];
                                        0 === e ? this.scroll.path(t).forEach((function(t) {
                                            var e = o(t, 1)[0];
                                            e instanceof h.default ? n.push(e) : e instanceof l.default.Leaf && r.push(e)
                                        })) : (n = this.scroll.lines(t, e), r = this.scroll.descendants(l.default.Leaf, t, e));
                                        var i = [n, r].map((function(t) {
                                            if (0 === t.length) return {};
                                            for (var e = (0, f.bubbleFormats)(t.shift()); Object.keys(e).length > 0;) {
                                                var n = t.shift();
                                                if (null == n) return e;
                                                e = _((0, f.bubbleFormats)(n), e)
                                            }
                                            return e
                                        }));
                                        return v.default.apply(v.default, i)
                                    }
                                }, { key: "getText", value: function(t, e) { return this.getContents(t, e).filter((function(t) { return "string" == typeof t.insert })).map((function(t) { return t.insert })).join("") } }, { key: "insertEmbed", value: function(t, e, n) { return this.scroll.insertAt(t, e, n), this.update((new a.default).retain(t).insert(function(t, e, n) { return e in t ? Object.defineProperty(t, e, { value: n, enumerable: !0, configurable: !0, writable: !0 }) : t[e] = n, t }({}, e, n))) } }, {
                                    key: "insertText",
                                    value: function(t, e) {
                                        var n = this,
                                            r = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
                                        return e = e.replace(/\r\n/g, "\n").replace(/\r/g, "\n"), this.scroll.insertAt(t, e), Object.keys(r).forEach((function(o) { n.scroll.formatAt(t, e.length, o, r[o]) })), this.update((new a.default).retain(t).insert(e, (0, d.default)(r)))
                                    }
                                }, { key: "isBlank", value: function() { if (0 == this.scroll.children.length) return !0; if (this.scroll.children.length > 1) return !1; var t = this.scroll.children.head; return t.statics.blotName === h.default.blotName && !(t.children.length > 1) && t.children.head instanceof p.default } }, {
                                    key: "removeFormat",
                                    value: function(t, e) {
                                        var n = this.getText(t, e),
                                            r = this.scroll.line(t + e),
                                            i = o(r, 2),
                                            u = i[0],
                                            l = i[1],
                                            c = 0,
                                            f = new a.default;
                                        null != u && (c = u instanceof s.default ? u.newlineIndex(l) - l + 1 : u.length() - l, f = u.delta().slice(l, l + c - 1).insert("\n"));
                                        var h = this.getContents(t, e + c).diff((new a.default).insert(n).concat(f)),
                                            p = (new a.default).retain(t).concat(h);
                                        return this.applyDelta(p)
                                    }
                                }, {
                                    key: "update",
                                    value: function(t) {
                                        var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : [],
                                            n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : void 0,
                                            r = this.delta;
                                        if (1 === e.length && "characterData" === e[0].type && e[0].target.data.match(b) && l.default.find(e[0].target)) {
                                            var o = l.default.find(e[0].target),
                                                i = (0, f.bubbleFormats)(o),
                                                u = o.offset(this.scroll),
                                                s = e[0].oldValue.replace(c.default.CONTENTS, ""),
                                                h = (new a.default).insert(s),
                                                p = (new a.default).insert(o.value()),
                                                d = (new a.default).retain(u).concat(h.diff(p, n));
                                            t = d.reduce((function(t, e) { return e.insert ? t.insert(e.insert, i) : t.push(e) }), new a.default), this.delta = r.compose(t)
                                        } else this.delta = this.getDelta(), t && (0, y.default)(r.compose(t), this.delta) || (t = r.diff(this.delta, n));
                                        return t
                                    }
                                }]), t
                            }();

                        function _(t, e) { return Object.keys(e).reduce((function(n, r) { return null == t[r] || (e[r] === t[r] ? n[r] = e[r] : Array.isArray(e[r]) ? e[r].indexOf(t[r]) < 0 && (n[r] = e[r].concat([t[r]])) : n[r] = [e[r], t[r]]), n }), {}) }
                        e.default = m
                    }, function(t, e, n) {
                        "use strict";
                        Object.defineProperty(e, "__esModule", { value: !0 }), e.default = e.Range = void 0;
                        var r = function(t, e) {
                                if (Array.isArray(t)) return t;
                                if (Symbol.iterator in Object(t)) return function(t, e) {
                                    var n = [],
                                        r = !0,
                                        o = !1,
                                        i = void 0;
                                    try { for (var a, u = t[Symbol.iterator](); !(r = (a = u.next()).done) && (n.push(a.value), !e || n.length !== e); r = !0); } catch (t) { o = !0, i = t } finally { try {!r && u.return && u.return() } finally { if (o) throw i } }
                                    return n
                                }(t, e);
                                throw new TypeError("Invalid attempt to destructure non-iterable instance")
                            },
                            o = function() {
                                function t(t, e) {
                                    for (var n = 0; n < e.length; n++) {
                                        var r = e[n];
                                        r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(t, r.key, r)
                                    }
                                }
                                return function(e, n, r) { return n && t(e.prototype, n), r && t(e, r), e }
                            }(),
                            i = s(n(0)),
                            a = s(n(21)),
                            u = s(n(11)),
                            l = s(n(8));

                        function s(t) { return t && t.__esModule ? t : { default: t } }

                        function c(t) { if (Array.isArray(t)) { for (var e = 0, n = Array(t.length); e < t.length; e++) n[e] = t[e]; return n } return Array.from(t) }

                        function f(t, e) { if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function") }
                        var h = (0, s(n(10)).default)("quill:selection"),
                            p = function t(e) {
                                var n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0;
                                f(this, t), this.index = e, this.length = n
                            },
                            d = function() {
                                function t(e, n) {
                                    var r = this;
                                    f(this, t), this.emitter = n, this.scroll = e, this.composing = !1, this.mouseDown = !1, this.root = this.scroll.domNode, this.cursor = i.default.create("cursor", this), this.lastRange = this.savedRange = new p(0, 0), this.handleComposition(), this.handleDragging(), this.emitter.listenDOM("selectionchange", document, (function() { r.mouseDown || setTimeout(r.update.bind(r, l.default.sources.USER), 1) })), this.emitter.on(l.default.events.EDITOR_CHANGE, (function(t, e) { t === l.default.events.TEXT_CHANGE && e.length() > 0 && r.update(l.default.sources.SILENT) })), this.emitter.on(l.default.events.SCROLL_BEFORE_UPDATE, (function() {
                                        if (r.hasFocus()) {
                                            var t = r.getNativeRange();
                                            null != t && t.start.node !== r.cursor.textNode && r.emitter.once(l.default.events.SCROLL_UPDATE, (function() { try { r.setNativeRange(t.start.node, t.start.offset, t.end.node, t.end.offset) } catch (t) {} }))
                                        }
                                    })), this.emitter.on(l.default.events.SCROLL_OPTIMIZE, (function(t, e) {
                                        if (e.range) {
                                            var n = e.range,
                                                o = n.startNode,
                                                i = n.startOffset,
                                                a = n.endNode,
                                                u = n.endOffset;
                                            r.setNativeRange(o, i, a, u)
                                        }
                                    })), this.update(l.default.sources.SILENT)
                                }
                                return o(t, [{
                                    key: "handleComposition",
                                    value: function() {
                                        var t = this;
                                        this.root.addEventListener("compositionstart", (function() { t.composing = !0 })), this.root.addEventListener("compositionend", (function() {
                                            if (t.composing = !1, t.cursor.parent) {
                                                var e = t.cursor.restore();
                                                if (!e) return;
                                                setTimeout((function() { t.setNativeRange(e.startNode, e.startOffset, e.endNode, e.endOffset) }), 1)
                                            }
                                        }))
                                    }
                                }, {
                                    key: "handleDragging",
                                    value: function() {
                                        var t = this;
                                        this.emitter.listenDOM("mousedown", document.body, (function() { t.mouseDown = !0 })), this.emitter.listenDOM("mouseup", document.body, (function() { t.mouseDown = !1, t.update(l.default.sources.USER) }))
                                    }
                                }, { key: "focus", value: function() { this.hasFocus() || (this.root.focus(), this.setRange(this.savedRange)) } }, {
                                    key: "format",
                                    value: function(t, e) {
                                        if (null == this.scroll.whitelist || this.scroll.whitelist[t]) {
                                            this.scroll.update();
                                            var n = this.getNativeRange();
                                            if (null != n && n.native.collapsed && !i.default.query(t, i.default.Scope.BLOCK)) {
                                                if (n.start.node !== this.cursor.textNode) {
                                                    var r = i.default.find(n.start.node, !1);
                                                    if (null == r) return;
                                                    if (r instanceof i.default.Leaf) {
                                                        var o = r.split(n.start.offset);
                                                        r.parent.insertBefore(this.cursor, o)
                                                    } else r.insertBefore(this.cursor, n.start.node);
                                                    this.cursor.attach()
                                                }
                                                this.cursor.format(t, e), this.scroll.optimize(), this.setNativeRange(this.cursor.textNode, this.cursor.textNode.data.length), this.update()
                                            }
                                        }
                                    }
                                }, {
                                    key: "getBounds",
                                    value: function(t) {
                                        var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0,
                                            n = this.scroll.length();
                                        t = Math.min(t, n - 1), e = Math.min(t + e, n - 1) - t;
                                        var o = void 0,
                                            i = this.scroll.leaf(t),
                                            a = r(i, 2),
                                            u = a[0],
                                            l = a[1];
                                        if (null == u) return null;
                                        var s = u.position(l, !0),
                                            c = r(s, 2);
                                        o = c[0], l = c[1];
                                        var f = document.createRange();
                                        if (e > 0) {
                                            f.setStart(o, l);
                                            var h = this.scroll.leaf(t + e),
                                                p = r(h, 2);
                                            if (u = p[0], l = p[1], null == u) return null;
                                            var d = u.position(l, !0),
                                                y = r(d, 2);
                                            return o = y[0], l = y[1], f.setEnd(o, l), f.getBoundingClientRect()
                                        }
                                        var v = "left",
                                            g = void 0;
                                        return o instanceof Text ? (l < o.data.length ? (f.setStart(o, l), f.setEnd(o, l + 1)) : (f.setStart(o, l - 1), f.setEnd(o, l), v = "right"), g = f.getBoundingClientRect()) : (g = u.domNode.getBoundingClientRect(), l > 0 && (v = "right")), { bottom: g.top + g.height, height: g.height, left: g[v], right: g[v], top: g.top, width: 0 }
                                    }
                                }, { key: "getNativeRange", value: function() { var t = document.getSelection(); if (null == t || t.rangeCount <= 0) return null; var e = t.getRangeAt(0); if (null == e) return null; var n = this.normalizeNative(e); return h.info("getNativeRange", n), n } }, { key: "getRange", value: function() { var t = this.getNativeRange(); return null == t ? [null, null] : [this.normalizedToRange(t), t] } }, { key: "hasFocus", value: function() { return document.activeElement === this.root } }, {
                                    key: "normalizedToRange",
                                    value: function(t) {
                                        var e = this,
                                            n = [
                                                [t.start.node, t.start.offset]
                                            ];
                                        t.native.collapsed || n.push([t.end.node, t.end.offset]);
                                        var o = n.map((function(t) {
                                                var n = r(t, 2),
                                                    o = n[0],
                                                    a = n[1],
                                                    u = i.default.find(o, !0),
                                                    l = u.offset(e.scroll);
                                                return 0 === a ? l : u instanceof i.default.Container ? l + u.length() : l + u.index(o, a)
                                            })),
                                            a = Math.min(Math.max.apply(Math, c(o)), this.scroll.length() - 1),
                                            u = Math.min.apply(Math, [a].concat(c(o)));
                                        return new p(u, a - u)
                                    }
                                }, {
                                    key: "normalizeNative",
                                    value: function(t) {
                                        if (!y(this.root, t.startContainer) || !t.collapsed && !y(this.root, t.endContainer)) return null;
                                        var e = { start: { node: t.startContainer, offset: t.startOffset }, end: { node: t.endContainer, offset: t.endOffset }, native: t };
                                        return [e.start, e.end].forEach((function(t) {
                                            for (var e = t.node, n = t.offset; !(e instanceof Text) && e.childNodes.length > 0;)
                                                if (e.childNodes.length > n) e = e.childNodes[n], n = 0;
                                                else {
                                                    if (e.childNodes.length !== n) break;
                                                    n = (e = e.lastChild) instanceof Text ? e.data.length : e.childNodes.length + 1
                                                }
                                            t.node = e, t.offset = n
                                        })), e
                                    }
                                }, {
                                    key: "rangeToNative",
                                    value: function(t) {
                                        var e = this,
                                            n = t.collapsed ? [t.index] : [t.index, t.index + t.length],
                                            o = [],
                                            i = this.scroll.length();
                                        return n.forEach((function(t, n) {
                                            t = Math.min(i - 1, t);
                                            var a, u = e.scroll.leaf(t),
                                                l = r(u, 2),
                                                s = l[0],
                                                c = l[1],
                                                f = s.position(c, 0 !== n),
                                                h = r(f, 2);
                                            a = h[0], c = h[1], o.push(a, c)
                                        })), o.length < 2 && (o = o.concat(o)), o
                                    }
                                }, {
                                    key: "scrollIntoView",
                                    value: function(t) {
                                        var e = this.lastRange;
                                        if (null != e) {
                                            var n = this.getBounds(e.index, e.length);
                                            if (null != n) {
                                                var o = this.scroll.length() - 1,
                                                    i = this.scroll.line(Math.min(e.index, o)),
                                                    a = r(i, 1)[0],
                                                    u = a;
                                                if (e.length > 0) {
                                                    var l = this.scroll.line(Math.min(e.index + e.length, o));
                                                    u = r(l, 1)[0]
                                                }
                                                if (null != a && null != u) {
                                                    var s = t.getBoundingClientRect();
                                                    n.top < s.top ? t.scrollTop -= s.top - n.top : n.bottom > s.bottom && (t.scrollTop += n.bottom - s.bottom)
                                                }
                                            }
                                        }
                                    }
                                }, {
                                    key: "setNativeRange",
                                    value: function(t, e) {
                                        var n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : t,
                                            r = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : e,
                                            o = arguments.length > 4 && void 0 !== arguments[4] && arguments[4];
                                        if (h.info("setNativeRange", t, e, n, r), null == t || null != this.root.parentNode && null != t.parentNode && null != n.parentNode) {
                                            var i = document.getSelection();
                                            if (null != i)
                                                if (null != t) {
                                                    this.hasFocus() || this.root.focus();
                                                    var a = (this.getNativeRange() || {}).native;
                                                    if (null == a || o || t !== a.startContainer || e !== a.startOffset || n !== a.endContainer || r !== a.endOffset) {
                                                        "BR" == t.tagName && (e = [].indexOf.call(t.parentNode.childNodes, t), t = t.parentNode), "BR" == n.tagName && (r = [].indexOf.call(n.parentNode.childNodes, n), n = n.parentNode);
                                                        var u = document.createRange();
                                                        u.setStart(t, e), u.setEnd(n, r), i.removeAllRanges(), i.addRange(u)
                                                    }
                                                } else i.removeAllRanges(), this.root.blur(), document.body.focus()
                                        }
                                    }
                                }, {
                                    key: "setRange",
                                    value: function(t) {
                                        var e = arguments.length > 1 && void 0 !== arguments[1] && arguments[1],
                                            n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : l.default.sources.API;
                                        if ("string" == typeof e && (n = e, e = !1), h.info("setRange", t), null != t) {
                                            var r = this.rangeToNative(t);
                                            this.setNativeRange.apply(this, c(r).concat([e]))
                                        } else this.setNativeRange(null);
                                        this.update(n)
                                    }
                                }, {
                                    key: "update",
                                    value: function() {
                                        var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : l.default.sources.USER,
                                            e = this.lastRange,
                                            n = this.getRange(),
                                            o = r(n, 2),
                                            i = o[0],
                                            s = o[1];
                                        if (this.lastRange = i, null != this.lastRange && (this.savedRange = this.lastRange), !(0, u.default)(e, this.lastRange)) {
                                            var c;
                                            !this.composing && null != s && s.native.collapsed && s.start.node !== this.cursor.textNode && this.cursor.restore();
                                            var f, h = [l.default.events.SELECTION_CHANGE, (0, a.default)(this.lastRange), (0, a.default)(e), t];
                                            (c = this.emitter).emit.apply(c, [l.default.events.EDITOR_CHANGE].concat(h)), t !== l.default.sources.SILENT && (f = this.emitter).emit.apply(f, h)
                                        }
                                    }
                                }]), t
                            }();

                        function y(t, e) { try { e.parentNode } catch (t) { return !1 } return e instanceof Text && (e = e.parentNode), t.contains(e) }
                        e.Range = p, e.default = d
                    }, function(t, e, n) {
                        "use strict";
                        Object.defineProperty(e, "__esModule", { value: !0 });
                        var r, o = function() {
                                function t(t, e) {
                                    for (var n = 0; n < e.length; n++) {
                                        var r = e[n];
                                        r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(t, r.key, r)
                                    }
                                }
                                return function(e, n, r) { return n && t(e.prototype, n), r && t(e, r), e }
                            }(),
                            i = function t(e, n, r) { null === e && (e = Function.prototype); var o = Object.getOwnPropertyDescriptor(e, n); if (void 0 === o) { var i = Object.getPrototypeOf(e); return null === i ? void 0 : t(i, n, r) } if ("value" in o) return o.value; var a = o.get; return void 0 !== a ? a.call(r) : void 0 },
                            a = n(0);

                        function u(t, e) { if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function") }

                        function l(t, e) { if (!t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return !e || "object" != typeof e && "function" != typeof e ? t : e }
                        var s = function(t) {
                            function e() { return u(this, e), l(this, (e.__proto__ || Object.getPrototypeOf(e)).apply(this, arguments)) }
                            return function(t, e) {
                                if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + typeof e);
                                t.prototype = Object.create(e && e.prototype, { constructor: { value: t, enumerable: !1, writable: !0, configurable: !0 } }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e)
                            }(e, t), o(e, [{ key: "insertInto", value: function(t, n) { 0 === t.children.length ? i(e.prototype.__proto__ || Object.getPrototypeOf(e.prototype), "insertInto", this).call(this, t, n) : this.remove() } }, { key: "length", value: function() { return 0 } }, { key: "value", value: function() { return "" } }], [{ key: "value", value: function() {} }]), e
                        }(((r = a) && r.__esModule ? r : { default: r }).default.Embed);
                        s.blotName = "break", s.tagName = "BR", e.default = s
                    }, function(t, e, n) {
                        "use strict";
                        var r, o = this && this.__extends || (r = Object.setPrototypeOf || { __proto__: [] }
                            instanceof Array && function(t, e) { t.__proto__ = e } || function(t, e) { for (var n in e) e.hasOwnProperty(n) && (t[n] = e[n]) },
                            function(t, e) {
                                function n() { this.constructor = t }
                                r(t, e), t.prototype = null === e ? Object.create(e) : (n.prototype = e.prototype, new n)
                            });
                        Object.defineProperty(e, "__esModule", { value: !0 });
                        var i = n(44),
                            a = n(30),
                            u = n(1),
                            l = function(t) {
                                function e(e) { var n = t.call(this, e) || this; return n.build(), n }
                                return o(e, t), e.prototype.appendChild = function(t) { this.insertBefore(t) }, e.prototype.attach = function() { t.prototype.attach.call(this), this.children.forEach((function(t) { t.attach() })) }, e.prototype.build = function() {
                                    var t = this;
                                    this.children = new i.default, [].slice.call(this.domNode.childNodes).reverse().forEach((function(e) {
                                        try {
                                            var n = s(e);
                                            t.insertBefore(n, t.children.head || void 0)
                                        } catch (t) { if (t instanceof u.ParchmentError) return; throw t }
                                    }))
                                }, e.prototype.deleteAt = function(t, e) {
                                    if (0 === t && e === this.length()) return this.remove();
                                    this.children.forEachAt(t, e, (function(t, e, n) { t.deleteAt(e, n) }))
                                }, e.prototype.descendant = function(t, n) {
                                    var r = this.children.find(n),
                                        o = r[0],
                                        i = r[1];
                                    return null == t.blotName && t(o) || null != t.blotName && o instanceof t ? [o, i] : o instanceof e ? o.descendant(t, i) : [null, -1]
                                }, e.prototype.descendants = function(t, n, r) {
                                    void 0 === n && (n = 0), void 0 === r && (r = Number.MAX_VALUE);
                                    var o = [],
                                        i = r;
                                    return this.children.forEachAt(n, r, (function(n, r, a) {
                                        (null == t.blotName && t(n) || null != t.blotName && n instanceof t) && o.push(n), n instanceof e && (o = o.concat(n.descendants(t, r, i))), i -= a
                                    })), o
                                }, e.prototype.detach = function() { this.children.forEach((function(t) { t.detach() })), t.prototype.detach.call(this) }, e.prototype.formatAt = function(t, e, n, r) { this.children.forEachAt(t, e, (function(t, e, o) { t.formatAt(e, o, n, r) })) }, e.prototype.insertAt = function(t, e, n) {
                                    var r = this.children.find(t),
                                        o = r[0],
                                        i = r[1];
                                    if (o) o.insertAt(i, e, n);
                                    else {
                                        var a = null == n ? u.create("text", e) : u.create(e, n);
                                        this.appendChild(a)
                                    }
                                }, e.prototype.insertBefore = function(t, e) {
                                    if (null != this.statics.allowedChildren && !this.statics.allowedChildren.some((function(e) { return t instanceof e }))) throw new u.ParchmentError("Cannot insert " + t.statics.blotName + " into " + this.statics.blotName);
                                    t.insertInto(this, e)
                                }, e.prototype.length = function() { return this.children.reduce((function(t, e) { return t + e.length() }), 0) }, e.prototype.moveChildren = function(t, e) { this.children.forEach((function(n) { t.insertBefore(n, e) })) }, e.prototype.optimize = function(e) {
                                    if (t.prototype.optimize.call(this, e), 0 === this.children.length)
                                        if (null != this.statics.defaultChild) {
                                            var n = u.create(this.statics.defaultChild);
                                            this.appendChild(n), n.optimize(e)
                                        } else this.remove()
                                }, e.prototype.path = function(t, n) {
                                    void 0 === n && (n = !1);
                                    var r = this.children.find(t, n),
                                        o = r[0],
                                        i = r[1],
                                        a = [
                                            [this, t]
                                        ];
                                    return o instanceof e ? a.concat(o.path(i, n)) : (null != o && a.push([o, i]), a)
                                }, e.prototype.removeChild = function(t) { this.children.remove(t) }, e.prototype.replace = function(n) { n instanceof e && n.moveChildren(this), t.prototype.replace.call(this, n) }, e.prototype.split = function(t, e) { if (void 0 === e && (e = !1), !e) { if (0 === t) return this; if (t === this.length()) return this.next } var n = this.clone(); return this.parent.insertBefore(n, this.next), this.children.forEachAt(t, this.length(), (function(t, r, o) { t = t.split(r, e), n.appendChild(t) })), n }, e.prototype.unwrap = function() { this.moveChildren(this.parent, this.next), this.remove() }, e.prototype.update = function(t, e) {
                                    var n = this,
                                        r = [],
                                        o = [];
                                    t.forEach((function(t) { t.target === n.domNode && "childList" === t.type && (r.push.apply(r, t.addedNodes), o.push.apply(o, t.removedNodes)) })), o.forEach((function(t) {
                                        if (!(null != t.parentNode && "IFRAME" !== t.tagName && document.body.compareDocumentPosition(t) & Node.DOCUMENT_POSITION_CONTAINED_BY)) {
                                            var e = u.find(t);
                                            null != e && (null != e.domNode.parentNode && e.domNode.parentNode !== n.domNode || e.detach())
                                        }
                                    })), r.filter((function(t) { return t.parentNode == n.domNode })).sort((function(t, e) { return t === e ? 0 : t.compareDocumentPosition(e) & Node.DOCUMENT_POSITION_FOLLOWING ? 1 : -1 })).forEach((function(t) {
                                        var e = null;
                                        null != t.nextSibling && (e = u.find(t.nextSibling));
                                        var r = s(t);
                                        r.next == e && null != r.next || (null != r.parent && r.parent.removeChild(n), n.insertBefore(r, e || void 0))
                                    }))
                                }, e
                            }(a.default);

                        function s(t) {
                            var e = u.find(t);
                            if (null == e) try { e = u.create(t) } catch (n) { e = u.create(u.Scope.INLINE), [].slice.call(t.childNodes).forEach((function(t) { e.domNode.appendChild(t) })), t.parentNode && t.parentNode.replaceChild(e.domNode, t), e.attach() }
                            return e
                        }
                        e.default = l
                    }, function(t, e, n) {
                        "use strict";
                        var r, o = this && this.__extends || (r = Object.setPrototypeOf || { __proto__: [] }
                            instanceof Array && function(t, e) { t.__proto__ = e } || function(t, e) { for (var n in e) e.hasOwnProperty(n) && (t[n] = e[n]) },
                            function(t, e) {
                                function n() { this.constructor = t }
                                r(t, e), t.prototype = null === e ? Object.create(e) : (n.prototype = e.prototype, new n)
                            });
                        Object.defineProperty(e, "__esModule", { value: !0 });
                        var i = n(12),
                            a = n(31),
                            u = n(17),
                            l = n(1),
                            s = function(t) {
                                function e(e) { var n = t.call(this, e) || this; return n.attributes = new a.default(n.domNode), n }
                                return o(e, t), e.formats = function(t) { return "string" == typeof this.tagName || (Array.isArray(this.tagName) ? t.tagName.toLowerCase() : void 0) }, e.prototype.format = function(t, e) {
                                    var n = l.query(t);
                                    n instanceof i.default ? this.attributes.attribute(n, e) : e && (null == n || t === this.statics.blotName && this.formats()[t] === e || this.replaceWith(t, e))
                                }, e.prototype.formats = function() {
                                    var t = this.attributes.values(),
                                        e = this.statics.formats(this.domNode);
                                    return null != e && (t[this.statics.blotName] = e), t
                                }, e.prototype.replaceWith = function(e, n) { var r = t.prototype.replaceWith.call(this, e, n); return this.attributes.copy(r), r }, e.prototype.update = function(e, n) {
                                    var r = this;
                                    t.prototype.update.call(this, e, n), e.some((function(t) { return t.target === r.domNode && "attributes" === t.type })) && this.attributes.build()
                                }, e.prototype.wrap = function(n, r) { var o = t.prototype.wrap.call(this, n, r); return o instanceof e && o.statics.scope === this.statics.scope && this.attributes.move(o), o }, e
                            }(u.default);
                        e.default = s
                    }, function(t, e, n) {
                        "use strict";
                        var r, o = this && this.__extends || (r = Object.setPrototypeOf || { __proto__: [] }
                            instanceof Array && function(t, e) { t.__proto__ = e } || function(t, e) { for (var n in e) e.hasOwnProperty(n) && (t[n] = e[n]) },
                            function(t, e) {
                                function n() { this.constructor = t }
                                r(t, e), t.prototype = null === e ? Object.create(e) : (n.prototype = e.prototype, new n)
                            });
                        Object.defineProperty(e, "__esModule", { value: !0 });
                        var i = n(30),
                            a = n(1),
                            u = function(t) {
                                function e() { return null !== t && t.apply(this, arguments) || this }
                                return o(e, t), e.value = function(t) { return !0 }, e.prototype.index = function(t, e) { return this.domNode === t || this.domNode.compareDocumentPosition(t) & Node.DOCUMENT_POSITION_CONTAINED_BY ? Math.min(e, 1) : -1 }, e.prototype.position = function(t, e) { var n = [].indexOf.call(this.parent.domNode.childNodes, this.domNode); return t > 0 && (n += 1), [this.parent.domNode, n] }, e.prototype.value = function() { var t; return (t = {})[this.statics.blotName] = this.statics.value(this.domNode) || !0, t }, e.scope = a.Scope.INLINE_BLOT, e
                            }(i.default);
                        e.default = u
                    }, function(t, e, n) {
                        var r = n(11),
                            o = n(3),
                            i = { attributes: { compose: function(t, e, n) { "object" != typeof t && (t = {}), "object" != typeof e && (e = {}); var r = o(!0, {}, e); for (var i in n || (r = Object.keys(r).reduce((function(t, e) { return null != r[e] && (t[e] = r[e]), t }), {})), t) void 0 !== t[i] && void 0 === e[i] && (r[i] = t[i]); return Object.keys(r).length > 0 ? r : void 0 }, diff: function(t, e) { "object" != typeof t && (t = {}), "object" != typeof e && (e = {}); var n = Object.keys(t).concat(Object.keys(e)).reduce((function(n, o) { return r(t[o], e[o]) || (n[o] = void 0 === e[o] ? null : e[o]), n }), {}); return Object.keys(n).length > 0 ? n : void 0 }, transform: function(t, e, n) { if ("object" != typeof t) return e; if ("object" == typeof e) { if (!n) return e; var r = Object.keys(e).reduce((function(n, r) { return void 0 === t[r] && (n[r] = e[r]), n }), {}); return Object.keys(r).length > 0 ? r : void 0 } } }, iterator: function(t) { return new a(t) }, length: function(t) { return "number" == typeof t.delete ? t.delete : "number" == typeof t.retain ? t.retain : "string" == typeof t.insert ? t.insert.length : 1 } };

                        function a(t) { this.ops = t, this.index = 0, this.offset = 0 }
                        a.prototype.hasNext = function() { return this.peekLength() < 1 / 0 }, a.prototype.next = function(t) {
                            t || (t = 1 / 0);
                            var e = this.ops[this.index];
                            if (e) {
                                var n = this.offset,
                                    r = i.length(e);
                                if (t >= r - n ? (t = r - n, this.index += 1, this.offset = 0) : this.offset += t, "number" == typeof e.delete) return { delete: t };
                                var o = {};
                                return e.attributes && (o.attributes = e.attributes), "number" == typeof e.retain ? o.retain = t : "string" == typeof e.insert ? o.insert = e.insert.substr(n, t) : o.insert = e.insert, o
                            }
                            return { retain: 1 / 0 }
                        }, a.prototype.peek = function() { return this.ops[this.index] }, a.prototype.peekLength = function() { return this.ops[this.index] ? i.length(this.ops[this.index]) - this.offset : 1 / 0 }, a.prototype.peekType = function() { return this.ops[this.index] ? "number" == typeof this.ops[this.index].delete ? "delete" : "number" == typeof this.ops[this.index].retain ? "retain" : "insert" : "retain" }, a.prototype.rest = function() {
                            if (this.hasNext()) {
                                if (0 === this.offset) return this.ops.slice(this.index);
                                var t = this.offset,
                                    e = this.index,
                                    n = this.next(),
                                    r = this.ops.slice(this.index);
                                return this.offset = t, this.index = e, [n].concat(r)
                            }
                            return []
                        }, t.exports = i
                    }, function(t, e) {
                        var n = function() {
                            "use strict";

                            function t(t, e) { return null != e && t instanceof e }
                            var e, n, r;
                            try { e = Map } catch (t) { e = function() {} }
                            try { n = Set } catch (t) { n = function() {} }
                            try { r = Promise } catch (t) { r = function() {} }

                            function i(a, l, s, c, f) {
                                "object" == typeof l && (s = l.depth, c = l.prototype, f = l.includeNonEnumerable, l = l.circular);
                                var h = [],
                                    p = [],
                                    d = void 0 !== o;
                                return void 0 === l && (l = !0), void 0 === s && (s = 1 / 0),
                                    function a(s, y) {
                                        if (null === s) return null;
                                        if (0 === y) return s;
                                        var v, g;
                                        if ("object" != typeof s) return s;
                                        if (t(s, e)) v = new e;
                                        else if (t(s, n)) v = new n;
                                        else if (t(s, r)) v = new r((function(t, e) { s.then((function(e) { t(a(e, y - 1)) }), (function(t) { e(a(t, y - 1)) })) }));
                                        else if (i.__isArray(s)) v = [];
                                        else if (i.__isRegExp(s)) v = new RegExp(s.source, u(s)), s.lastIndex && (v.lastIndex = s.lastIndex);
                                        else if (i.__isDate(s)) v = new Date(s.getTime());
                                        else {
                                            if (d && o.isBuffer(s)) return v = o.allocUnsafe ? o.allocUnsafe(s.length) : new o(s.length), s.copy(v), v;
                                            t(s, Error) ? v = Object.create(s) : void 0 === c ? (g = Object.getPrototypeOf(s), v = Object.create(g)) : (v = Object.create(c), g = c)
                                        }
                                        if (l) {
                                            var b = h.indexOf(s);
                                            if (-1 != b) return p[b];
                                            h.push(s), p.push(v)
                                        }
                                        for (var m in t(s, e) && s.forEach((function(t, e) {
                                                var n = a(e, y - 1),
                                                    r = a(t, y - 1);
                                                v.set(n, r)
                                            })), t(s, n) && s.forEach((function(t) {
                                                var e = a(t, y - 1);
                                                v.add(e)
                                            })), s) {
                                            var _;
                                            g && (_ = Object.getOwnPropertyDescriptor(g, m)), _ && null == _.set || (v[m] = a(s[m], y - 1))
                                        }
                                        if (Object.getOwnPropertySymbols) {
                                            var w = Object.getOwnPropertySymbols(s);
                                            for (m = 0; m < w.length; m++) {
                                                var x = w[m];
                                                (!(E = Object.getOwnPropertyDescriptor(s, x)) || E.enumerable || f) && (v[x] = a(s[x], y - 1), E.enumerable || Object.defineProperty(v, x, { enumerable: !1 }))
                                            }
                                        }
                                        if (f) {
                                            var O = Object.getOwnPropertyNames(s);
                                            for (m = 0; m < O.length; m++) {
                                                var E, k = O[m];
                                                (E = Object.getOwnPropertyDescriptor(s, k)) && E.enumerable || (v[k] = a(s[k], y - 1), Object.defineProperty(v, k, { enumerable: !1 }))
                                            }
                                        }
                                        return v
                                    }(a, s)
                            }

                            function a(t) { return Object.prototype.toString.call(t) }

                            function u(t) { var e = ""; return t.global && (e += "g"), t.ignoreCase && (e += "i"), t.multiline && (e += "m"), e }
                            return i.clonePrototype = function(t) { if (null === t) return null; var e = function() {}; return e.prototype = t, new e }, i.__objToStr = a, i.__isDate = function(t) { return "object" == typeof t && "[object Date]" === a(t) }, i.__isArray = function(t) { return "object" == typeof t && "[object Array]" === a(t) }, i.__isRegExp = function(t) { return "object" == typeof t && "[object RegExp]" === a(t) }, i.__getRegExpFlags = u, i
                        }();
                        "object" == typeof t && t.exports && (t.exports = n)
                    }, function(t, e, n) {
                        "use strict";
                        Object.defineProperty(e, "__esModule", { value: !0 });
                        var r = function(t, e) {
                                if (Array.isArray(t)) return t;
                                if (Symbol.iterator in Object(t)) return function(t, e) {
                                    var n = [],
                                        r = !0,
                                        o = !1,
                                        i = void 0;
                                    try { for (var a, u = t[Symbol.iterator](); !(r = (a = u.next()).done) && (n.push(a.value), !e || n.length !== e); r = !0); } catch (t) { o = !0, i = t } finally { try {!r && u.return && u.return() } finally { if (o) throw i } }
                                    return n
                                }(t, e);
                                throw new TypeError("Invalid attempt to destructure non-iterable instance")
                            },
                            o = function() {
                                function t(t, e) {
                                    for (var n = 0; n < e.length; n++) {
                                        var r = e[n];
                                        r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(t, r.key, r)
                                    }
                                }
                                return function(e, n, r) { return n && t(e.prototype, n), r && t(e, r), e }
                            }(),
                            i = function t(e, n, r) { null === e && (e = Function.prototype); var o = Object.getOwnPropertyDescriptor(e, n); if (void 0 === o) { var i = Object.getPrototypeOf(e); return null === i ? void 0 : t(i, n, r) } if ("value" in o) return o.value; var a = o.get; return void 0 !== a ? a.call(r) : void 0 },
                            a = p(n(0)),
                            u = p(n(8)),
                            l = n(4),
                            s = p(l),
                            c = p(n(16)),
                            f = p(n(13)),
                            h = p(n(25));

                        function p(t) { return t && t.__esModule ? t : { default: t } }

                        function d(t) { return t instanceof s.default || t instanceof l.BlockEmbed }
                        var y = function(t) {
                            function e(t, n) {! function(t, e) { if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function") }(this, e); var r = function(t, e) { if (!t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return !e || "object" != typeof e && "function" != typeof e ? t : e }(this, (e.__proto__ || Object.getPrototypeOf(e)).call(this, t)); return r.emitter = n.emitter, Array.isArray(n.whitelist) && (r.whitelist = n.whitelist.reduce((function(t, e) { return t[e] = !0, t }), {})), r.domNode.addEventListener("DOMNodeInserted", (function() {})), r.optimize(), r.enable(), r }
                            return function(t, e) {
                                if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + typeof e);
                                t.prototype = Object.create(e && e.prototype, { constructor: { value: t, enumerable: !1, writable: !0, configurable: !0 } }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e)
                            }(e, t), o(e, [{ key: "batchStart", value: function() { this.batch = !0 } }, { key: "batchEnd", value: function() { this.batch = !1, this.optimize() } }, {
                                key: "deleteAt",
                                value: function(t, n) {
                                    var o = this.line(t),
                                        a = r(o, 2),
                                        u = a[0],
                                        s = a[1],
                                        h = this.line(t + n),
                                        p = r(h, 1)[0];
                                    if (i(e.prototype.__proto__ || Object.getPrototypeOf(e.prototype), "deleteAt", this).call(this, t, n), null != p && u !== p && s > 0) {
                                        if (u instanceof l.BlockEmbed || p instanceof l.BlockEmbed) return void this.optimize();
                                        if (u instanceof f.default) { var d = u.newlineIndex(u.length(), !0); if (d > -1 && (u = u.split(d + 1)) === p) return void this.optimize() } else if (p instanceof f.default) {
                                            var y = p.newlineIndex(0);
                                            y > -1 && p.split(y + 1)
                                        }
                                        var v = p.children.head instanceof c.default ? null : p.children.head;
                                        u.moveChildren(p, v), u.remove()
                                    }
                                    this.optimize()
                                }
                            }, {
                                key: "enable",
                                value: function() {
                                    var t = !(arguments.length > 0 && void 0 !== arguments[0]) || arguments[0];
                                    this.domNode.setAttribute("contenteditable", t)
                                }
                            }, {
                                key: "formatAt",
                                value: function(t, n, r, o) {
                                    (null == this.whitelist || this.whitelist[r]) && (i(e.prototype.__proto__ || Object.getPrototypeOf(e.prototype), "formatAt", this).call(this, t, n, r, o), this.optimize())
                                }
                            }, {
                                key: "insertAt",
                                value: function(t, n, r) {
                                    if (null == r || null == this.whitelist || this.whitelist[n]) {
                                        if (t >= this.length())
                                            if (null == r || null == a.default.query(n, a.default.Scope.BLOCK)) {
                                                var o = a.default.create(this.statics.defaultChild);
                                                this.appendChild(o), null == r && n.endsWith("\n") && (n = n.slice(0, -1)), o.insertAt(0, n, r)
                                            } else {
                                                var u = a.default.create(n, r);
                                                this.appendChild(u)
                                            }
                                        else i(e.prototype.__proto__ || Object.getPrototypeOf(e.prototype), "insertAt", this).call(this, t, n, r);
                                        this.optimize()
                                    }
                                }
                            }, {
                                key: "insertBefore",
                                value: function(t, n) {
                                    if (t.statics.scope === a.default.Scope.INLINE_BLOT) {
                                        var r = a.default.create(this.statics.defaultChild);
                                        r.appendChild(t), t = r
                                    }
                                    i(e.prototype.__proto__ || Object.getPrototypeOf(e.prototype), "insertBefore", this).call(this, t, n)
                                }
                            }, { key: "leaf", value: function(t) { return this.path(t).pop() || [null, -1] } }, { key: "line", value: function(t) { return t === this.length() ? this.line(t - 1) : this.descendant(d, t) } }, {
                                key: "lines",
                                value: function() {
                                    var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 0,
                                        e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : Number.MAX_VALUE,
                                        n = function t(e, n, r) {
                                            var o = [],
                                                i = r;
                                            return e.children.forEachAt(n, r, (function(e, n, r) { d(e) ? o.push(e) : e instanceof a.default.Container && (o = o.concat(t(e, n, i))), i -= r })), o
                                        };
                                    return n(this, t, e)
                                }
                            }, {
                                key: "optimize",
                                value: function() {
                                    var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : [],
                                        n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
                                    !0 !== this.batch && (i(e.prototype.__proto__ || Object.getPrototypeOf(e.prototype), "optimize", this).call(this, t, n), t.length > 0 && this.emitter.emit(u.default.events.SCROLL_OPTIMIZE, t, n))
                                }
                            }, { key: "path", value: function(t) { return i(e.prototype.__proto__ || Object.getPrototypeOf(e.prototype), "path", this).call(this, t).slice(1) } }, { key: "update", value: function(t) { if (!0 !== this.batch) { var n = u.default.sources.USER; "string" == typeof t && (n = t), Array.isArray(t) || (t = this.observer.takeRecords()), t.length > 0 && this.emitter.emit(u.default.events.SCROLL_BEFORE_UPDATE, n, t), i(e.prototype.__proto__ || Object.getPrototypeOf(e.prototype), "update", this).call(this, t.concat([])), t.length > 0 && this.emitter.emit(u.default.events.SCROLL_UPDATE, n, t) } } }]), e
                        }(a.default.Scroll);
                        y.blotName = "scroll", y.className = "ql-editor", y.tagName = "DIV", y.defaultChild = "block", y.allowedChildren = [s.default, l.BlockEmbed, h.default], e.default = y
                    }, function(t, e, n) {
                        "use strict";
                        Object.defineProperty(e, "__esModule", { value: !0 }), e.SHORTKEY = e.default = void 0;
                        var r = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) { return typeof t } : function(t) { return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t },
                            o = function(t, e) {
                                if (Array.isArray(t)) return t;
                                if (Symbol.iterator in Object(t)) return function(t, e) {
                                    var n = [],
                                        r = !0,
                                        o = !1,
                                        i = void 0;
                                    try { for (var a, u = t[Symbol.iterator](); !(r = (a = u.next()).done) && (n.push(a.value), !e || n.length !== e); r = !0); } catch (t) { o = !0, i = t } finally { try {!r && u.return && u.return() } finally { if (o) throw i } }
                                    return n
                                }(t, e);
                                throw new TypeError("Invalid attempt to destructure non-iterable instance")
                            },
                            i = function() {
                                function t(t, e) {
                                    for (var n = 0; n < e.length; n++) {
                                        var r = e[n];
                                        r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(t, r.key, r)
                                    }
                                }
                                return function(e, n, r) { return n && t(e.prototype, n), r && t(e, r), e }
                            }(),
                            a = y(n(21)),
                            u = y(n(11)),
                            l = y(n(3)),
                            s = y(n(2)),
                            c = y(n(20)),
                            f = y(n(0)),
                            h = y(n(5)),
                            p = y(n(10)),
                            d = y(n(9));

                        function y(t) { return t && t.__esModule ? t : { default: t } }

                        function v(t, e, n) { return e in t ? Object.defineProperty(t, e, { value: n, enumerable: !0, configurable: !0, writable: !0 }) : t[e] = n, t }
                        var g = (0, p.default)("quill:keyboard"),
                            b = /Mac/i.test(navigator.platform) ? "metaKey" : "ctrlKey",
                            m = function(t) {
                                function e(t, n) {
                                    ! function(t, e) { if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function") }(this, e);
                                    var r = function(t, e) { if (!t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return !e || "object" != typeof e && "function" != typeof e ? t : e }(this, (e.__proto__ || Object.getPrototypeOf(e)).call(this, t, n));
                                    return r.bindings = {}, Object.keys(r.options.bindings).forEach((function(e) {
                                        ("list autofill" !== e || null == t.scroll.whitelist || t.scroll.whitelist.list) && r.options.bindings[e] && r.addBinding(r.options.bindings[e])
                                    })), r.addBinding({ key: e.keys.ENTER, shiftKey: null }, E), r.addBinding({ key: e.keys.ENTER, metaKey: null, ctrlKey: null, altKey: null }, (function() {})), /Firefox/i.test(navigator.userAgent) ? (r.addBinding({ key: e.keys.BACKSPACE }, { collapsed: !0 }, w), r.addBinding({ key: e.keys.DELETE }, { collapsed: !0 }, x)) : (r.addBinding({ key: e.keys.BACKSPACE }, { collapsed: !0, prefix: /^.?$/ }, w), r.addBinding({ key: e.keys.DELETE }, { collapsed: !0, suffix: /^.?$/ }, x)), r.addBinding({ key: e.keys.BACKSPACE }, { collapsed: !1 }, O), r.addBinding({ key: e.keys.DELETE }, { collapsed: !1 }, O), r.addBinding({ key: e.keys.BACKSPACE, altKey: null, ctrlKey: null, metaKey: null, shiftKey: null }, { collapsed: !0, offset: 0 }, w), r.listen(), r
                                }
                                return function(t, e) {
                                    if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + typeof e);
                                    t.prototype = Object.create(e && e.prototype, { constructor: { value: t, enumerable: !1, writable: !0, configurable: !0 } }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e)
                                }(e, t), i(e, null, [{ key: "match", value: function(t, e) { return e = j(e), !["altKey", "ctrlKey", "metaKey", "shiftKey"].some((function(n) { return !!e[n] !== t[n] && null !== e[n] })) && e.key === (t.which || t.keyCode) } }]), i(e, [{
                                    key: "addBinding",
                                    value: function(t) {
                                        var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
                                            n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {},
                                            r = j(t);
                                        if (null == r || null == r.key) return g.warn("Attempted to add invalid keyboard binding", r);
                                        "function" == typeof e && (e = { handler: e }), "function" == typeof n && (n = { handler: n }), r = (0, l.default)(r, e, n), this.bindings[r.key] = this.bindings[r.key] || [], this.bindings[r.key].push(r)
                                    }
                                }, {
                                    key: "listen",
                                    value: function() {
                                        var t = this;
                                        this.quill.root.addEventListener("keydown", (function(n) {
                                            if (!n.defaultPrevented) {
                                                var i = n.which || n.keyCode,
                                                    a = (t.bindings[i] || []).filter((function(t) { return e.match(n, t) }));
                                                if (0 !== a.length) {
                                                    var l = t.quill.getSelection();
                                                    if (null != l && t.quill.hasFocus()) {
                                                        var s = t.quill.getLine(l.index),
                                                            c = o(s, 2),
                                                            h = c[0],
                                                            p = c[1],
                                                            d = t.quill.getLeaf(l.index),
                                                            y = o(d, 2),
                                                            v = y[0],
                                                            g = y[1],
                                                            b = 0 === l.length ? [v, g] : t.quill.getLeaf(l.index + l.length),
                                                            m = o(b, 2),
                                                            _ = m[0],
                                                            w = m[1],
                                                            x = v instanceof f.default.Text ? v.value().slice(0, g) : "",
                                                            O = _ instanceof f.default.Text ? _.value().slice(w) : "",
                                                            E = { collapsed: 0 === l.length, empty: 0 === l.length && h.length() <= 1, format: t.quill.getFormat(l), offset: p, prefix: x, suffix: O };
                                                        a.some((function(e) { if (null != e.collapsed && e.collapsed !== E.collapsed) return !1; if (null != e.empty && e.empty !== E.empty) return !1; if (null != e.offset && e.offset !== E.offset) return !1; if (Array.isArray(e.format)) { if (e.format.every((function(t) { return null == E.format[t] }))) return !1 } else if ("object" === r(e.format) && !Object.keys(e.format).every((function(t) { return !0 === e.format[t] ? null != E.format[t] : !1 === e.format[t] ? null == E.format[t] : (0, u.default)(e.format[t], E.format[t]) }))) return !1; return !(null != e.prefix && !e.prefix.test(E.prefix) || null != e.suffix && !e.suffix.test(E.suffix) || !0 === e.handler.call(t, l, E)) })) && n.preventDefault()
                                                    }
                                                }
                                            }
                                        }))
                                    }
                                }]), e
                            }(d.default);

                        function _(t, e) {
                            var n, r = t === m.keys.LEFT ? "prefix" : "suffix";
                            return v(n = { key: t, shiftKey: e, altKey: null }, r, /^$/), v(n, "handler", (function(n) {
                                var r = n.index;
                                t === m.keys.RIGHT && (r += n.length + 1);
                                var i = this.quill.getLeaf(r);
                                return !(o(i, 1)[0] instanceof f.default.Embed && (t === m.keys.LEFT ? e ? this.quill.setSelection(n.index - 1, n.length + 1, h.default.sources.USER) : this.quill.setSelection(n.index - 1, h.default.sources.USER) : e ? this.quill.setSelection(n.index, n.length + 1, h.default.sources.USER) : this.quill.setSelection(n.index + n.length + 1, h.default.sources.USER), 1))
                            })), n
                        }

                        function w(t, e) {
                            if (!(0 === t.index || this.quill.getLength() <= 1)) {
                                var n = this.quill.getLine(t.index),
                                    r = o(n, 1)[0],
                                    i = {};
                                if (0 === e.offset) {
                                    var a = this.quill.getLine(t.index - 1),
                                        u = o(a, 1)[0];
                                    if (null != u && u.length() > 1) {
                                        var l = r.formats(),
                                            s = this.quill.getFormat(t.index - 1, 1);
                                        i = c.default.attributes.diff(l, s) || {}
                                    }
                                }
                                var f = /[\uD800-\uDBFF][\uDC00-\uDFFF]$/.test(e.prefix) ? 2 : 1;
                                this.quill.deleteText(t.index - f, f, h.default.sources.USER), Object.keys(i).length > 0 && this.quill.formatLine(t.index - f, f, i, h.default.sources.USER), this.quill.focus()
                            }
                        }

                        function x(t, e) {
                            var n = /^[\uD800-\uDBFF][\uDC00-\uDFFF]/.test(e.suffix) ? 2 : 1;
                            if (!(t.index >= this.quill.getLength() - n)) {
                                var r = {},
                                    i = 0,
                                    a = this.quill.getLine(t.index),
                                    u = o(a, 1)[0];
                                if (e.offset >= u.length() - 1) {
                                    var l = this.quill.getLine(t.index + 1),
                                        s = o(l, 1)[0];
                                    if (s) {
                                        var f = u.formats(),
                                            p = this.quill.getFormat(t.index, 1);
                                        r = c.default.attributes.diff(f, p) || {}, i = s.length()
                                    }
                                }
                                this.quill.deleteText(t.index, n, h.default.sources.USER), Object.keys(r).length > 0 && this.quill.formatLine(t.index + i - 1, n, r, h.default.sources.USER)
                            }
                        }

                        function O(t) {
                            var e = this.quill.getLines(t),
                                n = {};
                            if (e.length > 1) {
                                var r = e[0].formats(),
                                    o = e[e.length - 1].formats();
                                n = c.default.attributes.diff(o, r) || {}
                            }
                            this.quill.deleteText(t, h.default.sources.USER), Object.keys(n).length > 0 && this.quill.formatLine(t.index, 1, n, h.default.sources.USER), this.quill.setSelection(t.index, h.default.sources.SILENT), this.quill.focus()
                        }

                        function E(t, e) {
                            var n = this;
                            t.length > 0 && this.quill.scroll.deleteAt(t.index, t.length);
                            var r = Object.keys(e.format).reduce((function(t, n) { return f.default.query(n, f.default.Scope.BLOCK) && !Array.isArray(e.format[n]) && (t[n] = e.format[n]), t }), {});
                            this.quill.insertText(t.index, "\n", r, h.default.sources.USER), this.quill.setSelection(t.index + 1, h.default.sources.SILENT), this.quill.focus(), Object.keys(e.format).forEach((function(t) { null == r[t] && (Array.isArray(e.format[t]) || "link" !== t && n.quill.format(t, e.format[t], h.default.sources.USER)) }))
                        }

                        function k(t) {
                            return {
                                key: m.keys.TAB,
                                shiftKey: !t,
                                format: { "code-block": !0 },
                                handler: function(e) {
                                    var n = f.default.query("code-block"),
                                        r = e.index,
                                        i = e.length,
                                        a = this.quill.scroll.descendant(n, r),
                                        u = o(a, 2),
                                        l = u[0],
                                        s = u[1];
                                    if (null != l) {
                                        var c = this.quill.getIndex(l),
                                            p = l.newlineIndex(s, !0) + 1,
                                            d = l.newlineIndex(c + s + i),
                                            y = l.domNode.textContent.slice(p, d).split("\n");
                                        s = 0, y.forEach((function(e, o) { t ? (l.insertAt(p + s, n.TAB), s += n.TAB.length, 0 === o ? r += n.TAB.length : i += n.TAB.length) : e.startsWith(n.TAB) && (l.deleteAt(p + s, n.TAB.length), s -= n.TAB.length, 0 === o ? r -= n.TAB.length : i -= n.TAB.length), s += e.length + 1 })), this.quill.update(h.default.sources.USER), this.quill.setSelection(r, i, h.default.sources.SILENT)
                                    }
                                }
                            }
                        }

                        function A(t) { return { key: t[0].toUpperCase(), shortKey: !0, handler: function(e, n) { this.quill.format(t, !n.format[t], h.default.sources.USER) } } }

                        function j(t) {
                            if ("string" == typeof t || "number" == typeof t) return j({ key: t });
                            if ("object" === (void 0 === t ? "undefined" : r(t)) && (t = (0, a.default)(t, !1)), "string" == typeof t.key)
                                if (null != m.keys[t.key.toUpperCase()]) t.key = m.keys[t.key.toUpperCase()];
                                else {
                                    if (1 !== t.key.length) return null;
                                    t.key = t.key.toUpperCase().charCodeAt(0)
                                }
                            return t.shortKey && (t[b] = t.shortKey, delete t.shortKey), t
                        }
                        m.keys = { BACKSPACE: 8, TAB: 9, ENTER: 13, ESCAPE: 27, LEFT: 37, UP: 38, RIGHT: 39, DOWN: 40, DELETE: 46 }, m.DEFAULTS = {
                            bindings: {
                                bold: A("bold"),
                                italic: A("italic"),
                                underline: A("underline"),
                                indent: {
                                    key: m.keys.TAB,
                                    format: ["blockquote", "indent", "list"],
                                    handler: function(t, e) {
                                        if (e.collapsed && 0 !== e.offset) return !0;
                                        this.quill.format("indent", "+1", h.default.sources.USER)
                                    }
                                },
                                outdent: {
                                    key: m.keys.TAB,
                                    shiftKey: !0,
                                    format: ["blockquote", "indent", "list"],
                                    handler: function(t, e) {
                                        if (e.collapsed && 0 !== e.offset) return !0;
                                        this.quill.format("indent", "-1", h.default.sources.USER)
                                    }
                                },
                                "outdent backspace": { key: m.keys.BACKSPACE, collapsed: !0, shiftKey: null, metaKey: null, ctrlKey: null, altKey: null, format: ["indent", "list"], offset: 0, handler: function(t, e) { null != e.format.indent ? this.quill.format("indent", "-1", h.default.sources.USER) : null != e.format.list && this.quill.format("list", !1, h.default.sources.USER) } },
                                "indent code-block": k(!0),
                                "outdent code-block": k(!1),
                                "remove tab": { key: m.keys.TAB, shiftKey: !0, collapsed: !0, prefix: /\t$/, handler: function(t) { this.quill.deleteText(t.index - 1, 1, h.default.sources.USER) } },
                                tab: {
                                    key: m.keys.TAB,
                                    handler: function(t) {
                                        this.quill.history.cutoff();
                                        var e = (new s.default).retain(t.index).delete(t.length).insert("\t");
                                        this.quill.updateContents(e, h.default.sources.USER), this.quill.history.cutoff(), this.quill.setSelection(t.index + 1, h.default.sources.SILENT)
                                    }
                                },
                                "list empty enter": { key: m.keys.ENTER, collapsed: !0, format: ["list"], empty: !0, handler: function(t, e) { this.quill.format("list", !1, h.default.sources.USER), e.format.indent && this.quill.format("indent", !1, h.default.sources.USER) } },
                                "checklist enter": {
                                    key: m.keys.ENTER,
                                    collapsed: !0,
                                    format: { list: "checked" },
                                    handler: function(t) {
                                        var e = this.quill.getLine(t.index),
                                            n = o(e, 2),
                                            r = n[0],
                                            i = n[1],
                                            a = (0, l.default)({}, r.formats(), { list: "checked" }),
                                            u = (new s.default).retain(t.index).insert("\n", a).retain(r.length() - i - 1).retain(1, { list: "unchecked" });
                                        this.quill.updateContents(u, h.default.sources.USER), this.quill.setSelection(t.index + 1, h.default.sources.SILENT), this.quill.scrollIntoView()
                                    }
                                },
                                "header enter": {
                                    key: m.keys.ENTER,
                                    collapsed: !0,
                                    format: ["header"],
                                    suffix: /^$/,
                                    handler: function(t, e) {
                                        var n = this.quill.getLine(t.index),
                                            r = o(n, 2),
                                            i = r[0],
                                            a = r[1],
                                            u = (new s.default).retain(t.index).insert("\n", e.format).retain(i.length() - a - 1).retain(1, { header: null });
                                        this.quill.updateContents(u, h.default.sources.USER), this.quill.setSelection(t.index + 1, h.default.sources.SILENT), this.quill.scrollIntoView()
                                    }
                                },
                                "list autofill": {
                                    key: " ",
                                    collapsed: !0,
                                    format: { list: !1 },
                                    prefix: /^\s*?(\d+\.|-|\*|\[ ?\]|\[x\])$/,
                                    handler: function(t, e) {
                                        var n = e.prefix.length,
                                            r = this.quill.getLine(t.index),
                                            i = o(r, 2),
                                            a = i[0],
                                            u = i[1];
                                        if (u > n) return !0;
                                        var l = void 0;
                                        switch (e.prefix.trim()) {
                                            case "[]":
                                            case "[ ]":
                                                l = "unchecked";
                                                break;
                                            case "[x]":
                                                l = "checked";
                                                break;
                                            case "-":
                                            case "*":
                                                l = "bullet";
                                                break;
                                            default:
                                                l = "ordered"
                                        }
                                        this.quill.insertText(t.index, " ", h.default.sources.USER), this.quill.history.cutoff();
                                        var c = (new s.default).retain(t.index - u).delete(n + 1).retain(a.length() - 2 - u).retain(1, { list: l });
                                        this.quill.updateContents(c, h.default.sources.USER), this.quill.history.cutoff(), this.quill.setSelection(t.index - n, h.default.sources.SILENT)
                                    }
                                },
                                "code exit": {
                                    key: m.keys.ENTER,
                                    collapsed: !0,
                                    format: ["code-block"],
                                    prefix: /\n\n$/,
                                    suffix: /^\s+$/,
                                    handler: function(t) {
                                        var e = this.quill.getLine(t.index),
                                            n = o(e, 2),
                                            r = n[0],
                                            i = n[1],
                                            a = (new s.default).retain(t.index + r.length() - i - 2).retain(1, { "code-block": null }).delete(1);
                                        this.quill.updateContents(a, h.default.sources.USER)
                                    }
                                },
                                "embed left": _(m.keys.LEFT, !1),
                                "embed left shift": _(m.keys.LEFT, !0),
                                "embed right": _(m.keys.RIGHT, !1),
                                "embed right shift": _(m.keys.RIGHT, !0)
                            }
                        }, e.default = m, e.SHORTKEY = b
                    }, function(t, e, n) {
                        "use strict";
                        Object.defineProperty(e, "__esModule", { value: !0 });
                        var r = function(t, e) {
                                if (Array.isArray(t)) return t;
                                if (Symbol.iterator in Object(t)) return function(t, e) {
                                    var n = [],
                                        r = !0,
                                        o = !1,
                                        i = void 0;
                                    try { for (var a, u = t[Symbol.iterator](); !(r = (a = u.next()).done) && (n.push(a.value), !e || n.length !== e); r = !0); } catch (t) { o = !0, i = t } finally { try {!r && u.return && u.return() } finally { if (o) throw i } }
                                    return n
                                }(t, e);
                                throw new TypeError("Invalid attempt to destructure non-iterable instance")
                            },
                            o = function t(e, n, r) { null === e && (e = Function.prototype); var o = Object.getOwnPropertyDescriptor(e, n); if (void 0 === o) { var i = Object.getPrototypeOf(e); return null === i ? void 0 : t(i, n, r) } if ("value" in o) return o.value; var a = o.get; return void 0 !== a ? a.call(r) : void 0 },
                            i = function() {
                                function t(t, e) {
                                    for (var n = 0; n < e.length; n++) {
                                        var r = e[n];
                                        r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(t, r.key, r)
                                    }
                                }
                                return function(e, n, r) { return n && t(e.prototype, n), r && t(e, r), e }
                            }(),
                            a = l(n(0)),
                            u = l(n(7));

                        function l(t) { return t && t.__esModule ? t : { default: t } }
                        var s = function(t) {
                            function e(t, n) {! function(t, e) { if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function") }(this, e); var r = function(t, e) { if (!t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return !e || "object" != typeof e && "function" != typeof e ? t : e }(this, (e.__proto__ || Object.getPrototypeOf(e)).call(this, t)); return r.selection = n, r.textNode = document.createTextNode(e.CONTENTS), r.domNode.appendChild(r.textNode), r._length = 0, r }
                            return function(t, e) {
                                if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + typeof e);
                                t.prototype = Object.create(e && e.prototype, { constructor: { value: t, enumerable: !1, writable: !0, configurable: !0 } }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e)
                            }(e, t), i(e, null, [{ key: "value", value: function() {} }]), i(e, [{ key: "detach", value: function() { null != this.parent && this.parent.removeChild(this) } }, {
                                key: "format",
                                value: function(t, n) {
                                    if (0 !== this._length) return o(e.prototype.__proto__ || Object.getPrototypeOf(e.prototype), "format", this).call(this, t, n);
                                    for (var r = this, i = 0; null != r && r.statics.scope !== a.default.Scope.BLOCK_BLOT;) i += r.offset(r.parent), r = r.parent;
                                    null != r && (this._length = e.CONTENTS.length, r.optimize(), r.formatAt(i, e.CONTENTS.length, t, n), this._length = 0)
                                }
                            }, { key: "index", value: function(t, n) { return t === this.textNode ? 0 : o(e.prototype.__proto__ || Object.getPrototypeOf(e.prototype), "index", this).call(this, t, n) } }, { key: "length", value: function() { return this._length } }, { key: "position", value: function() { return [this.textNode, this.textNode.data.length] } }, { key: "remove", value: function() { o(e.prototype.__proto__ || Object.getPrototypeOf(e.prototype), "remove", this).call(this), this.parent = null } }, {
                                key: "restore",
                                value: function() {
                                    if (!this.selection.composing && null != this.parent) {
                                        var t = this.textNode,
                                            n = this.selection.getNativeRange(),
                                            o = void 0,
                                            i = void 0,
                                            l = void 0;
                                        if (null != n && n.start.node === t && n.end.node === t) {
                                            var s = [t, n.start.offset, n.end.offset];
                                            o = s[0], i = s[1], l = s[2]
                                        }
                                        for (; null != this.domNode.lastChild && this.domNode.lastChild !== this.textNode;) this.domNode.parentNode.insertBefore(this.domNode.lastChild, this.domNode);
                                        if (this.textNode.data !== e.CONTENTS) {
                                            var c = this.textNode.data.split(e.CONTENTS).join("");
                                            this.next instanceof u.default ? (o = this.next.domNode, this.next.insertAt(0, c), this.textNode.data = e.CONTENTS) : (this.textNode.data = c, this.parent.insertBefore(a.default.create(this.textNode), this), this.textNode = document.createTextNode(e.CONTENTS), this.domNode.appendChild(this.textNode))
                                        }
                                        if (this.remove(), null != i) {
                                            var f = [i, l].map((function(t) { return Math.max(0, Math.min(o.data.length, t - 1)) })),
                                                h = r(f, 2);
                                            return i = h[0], l = h[1], { startNode: o, startOffset: i, endNode: o, endOffset: l }
                                        }
                                    }
                                }
                            }, {
                                key: "update",
                                value: function(t, e) {
                                    var n = this;
                                    if (t.some((function(t) { return "characterData" === t.type && t.target === n.textNode }))) {
                                        var r = this.restore();
                                        r && (e.range = r)
                                    }
                                }
                            }, { key: "value", value: function() { return "" } }]), e
                        }(a.default.Embed);
                        s.blotName = "cursor", s.className = "ql-cursor", s.tagName = "span", s.CONTENTS = "\ufeff", e.default = s
                    }, function(t, e, n) {
                        "use strict";
                        Object.defineProperty(e, "__esModule", { value: !0 });
                        var r = a(n(0)),
                            o = n(4),
                            i = a(o);

                        function a(t) { return t && t.__esModule ? t : { default: t } }

                        function u(t, e) { if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function") }

                        function l(t, e) { if (!t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return !e || "object" != typeof e && "function" != typeof e ? t : e }
                        var s = function(t) {
                            function e() { return u(this, e), l(this, (e.__proto__ || Object.getPrototypeOf(e)).apply(this, arguments)) }
                            return function(t, e) {
                                if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + typeof e);
                                t.prototype = Object.create(e && e.prototype, { constructor: { value: t, enumerable: !1, writable: !0, configurable: !0 } }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e)
                            }(e, t), e
                        }(r.default.Container);
                        s.allowedChildren = [i.default, o.BlockEmbed, s], e.default = s
                    }, function(t, e, n) {
                        "use strict";
                        Object.defineProperty(e, "__esModule", { value: !0 }), e.ColorStyle = e.ColorClass = e.ColorAttributor = void 0;
                        var r, o = function() {
                                function t(t, e) {
                                    for (var n = 0; n < e.length; n++) {
                                        var r = e[n];
                                        r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(t, r.key, r)
                                    }
                                }
                                return function(e, n, r) { return n && t(e.prototype, n), r && t(e, r), e }
                            }(),
                            i = function t(e, n, r) { null === e && (e = Function.prototype); var o = Object.getOwnPropertyDescriptor(e, n); if (void 0 === o) { var i = Object.getPrototypeOf(e); return null === i ? void 0 : t(i, n, r) } if ("value" in o) return o.value; var a = o.get; return void 0 !== a ? a.call(r) : void 0 },
                            a = n(0),
                            u = (r = a) && r.__esModule ? r : { default: r };

                        function l(t, e) { if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function") }

                        function s(t, e) { if (!t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return !e || "object" != typeof e && "function" != typeof e ? t : e }
                        var c = function(t) {
                                function e() { return l(this, e), s(this, (e.__proto__ || Object.getPrototypeOf(e)).apply(this, arguments)) }
                                return function(t, e) {
                                    if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + typeof e);
                                    t.prototype = Object.create(e && e.prototype, { constructor: { value: t, enumerable: !1, writable: !0, configurable: !0 } }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e)
                                }(e, t), o(e, [{ key: "value", value: function(t) { var n = i(e.prototype.__proto__ || Object.getPrototypeOf(e.prototype), "value", this).call(this, t); return n.startsWith("rgb(") ? (n = n.replace(/^[^\d]+/, "").replace(/[^\d]+$/, ""), "#" + n.split(",").map((function(t) { return ("00" + parseInt(t).toString(16)).slice(-2) })).join("")) : n } }]), e
                            }(u.default.Attributor.Style),
                            f = new u.default.Attributor.Class("color", "ql-color", { scope: u.default.Scope.INLINE }),
                            h = new c("color", "color", { scope: u.default.Scope.INLINE });
                        e.ColorAttributor = c, e.ColorClass = f, e.ColorStyle = h
                    }, function(t, e, n) {
                        "use strict";
                        Object.defineProperty(e, "__esModule", { value: !0 }), e.sanitize = e.default = void 0;
                        var r, o = function() {
                                function t(t, e) {
                                    for (var n = 0; n < e.length; n++) {
                                        var r = e[n];
                                        r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(t, r.key, r)
                                    }
                                }
                                return function(e, n, r) { return n && t(e.prototype, n), r && t(e, r), e }
                            }(),
                            i = function t(e, n, r) { null === e && (e = Function.prototype); var o = Object.getOwnPropertyDescriptor(e, n); if (void 0 === o) { var i = Object.getPrototypeOf(e); return null === i ? void 0 : t(i, n, r) } if ("value" in o) return o.value; var a = o.get; return void 0 !== a ? a.call(r) : void 0 },
                            a = n(6);

                        function u(t, e) { if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function") }

                        function l(t, e) { if (!t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return !e || "object" != typeof e && "function" != typeof e ? t : e }
                        var s = function(t) {
                            function e() { return u(this, e), l(this, (e.__proto__ || Object.getPrototypeOf(e)).apply(this, arguments)) }
                            return function(t, e) {
                                if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + typeof e);
                                t.prototype = Object.create(e && e.prototype, { constructor: { value: t, enumerable: !1, writable: !0, configurable: !0 } }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e)
                            }(e, t), o(e, [{
                                key: "format",
                                value: function(t, n) {
                                    if (t !== this.statics.blotName || !n) return i(e.prototype.__proto__ || Object.getPrototypeOf(e.prototype), "format", this).call(this, t, n);
                                    n = this.constructor.sanitize(n), this.domNode.setAttribute("href", n)
                                }
                            }], [{ key: "create", value: function(t) { var n = i(e.__proto__ || Object.getPrototypeOf(e), "create", this).call(this, t); return t = this.sanitize(t), n.setAttribute("href", t), n.setAttribute("rel", "noopener noreferrer"), n.setAttribute("target", "_blank"), n } }, { key: "formats", value: function(t) { return t.getAttribute("href") } }, { key: "sanitize", value: function(t) { return c(t, this.PROTOCOL_WHITELIST) ? t : this.SANITIZED_URL } }]), e
                        }(((r = a) && r.__esModule ? r : { default: r }).default);

                        function c(t, e) {
                            var n = document.createElement("a");
                            n.href = t;
                            var r = n.href.slice(0, n.href.indexOf(":"));
                            return e.indexOf(r) > -1
                        }
                        s.blotName = "link", s.tagName = "A", s.SANITIZED_URL = "about:blank", s.PROTOCOL_WHITELIST = ["http", "https", "mailto", "tel"], e.default = s, e.sanitize = c
                    }, function(t, e, n) {
                        "use strict";
                        Object.defineProperty(e, "__esModule", { value: !0 });
                        var r = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) { return typeof t } : function(t) { return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t },
                            o = function() {
                                function t(t, e) {
                                    for (var n = 0; n < e.length; n++) {
                                        var r = e[n];
                                        r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(t, r.key, r)
                                    }
                                }
                                return function(e, n, r) { return n && t(e.prototype, n), r && t(e, r), e }
                            }(),
                            i = u(n(23)),
                            a = u(n(107));

                        function u(t) { return t && t.__esModule ? t : { default: t } }
                        var l = 0;

                        function s(t, e) { t.setAttribute(e, !("true" === t.getAttribute(e))) }
                        var c = function() {
                            function t(e) {
                                var n = this;
                                ! function(t, e) { if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function") }(this, t), this.select = e, this.container = document.createElement("span"), this.buildPicker(), this.select.style.display = "none", this.select.parentNode.insertBefore(this.container, this.select), this.label.addEventListener("mousedown", (function() { n.togglePicker() })), this.label.addEventListener("keydown", (function(t) {
                                    switch (t.keyCode) {
                                        case i.default.keys.ENTER:
                                            n.togglePicker();
                                            break;
                                        case i.default.keys.ESCAPE:
                                            n.escape(), t.preventDefault()
                                    }
                                })), this.select.addEventListener("change", this.update.bind(this))
                            }
                            return o(t, [{ key: "togglePicker", value: function() { this.container.classList.toggle("ql-expanded"), s(this.label, "aria-expanded"), s(this.options, "aria-hidden") } }, {
                                key: "buildItem",
                                value: function(t) {
                                    var e = this,
                                        n = document.createElement("span");
                                    return n.tabIndex = "0", n.setAttribute("role", "button"), n.classList.add("ql-picker-item"), t.hasAttribute("value") && n.setAttribute("data-value", t.getAttribute("value")), t.textContent && n.setAttribute("data-label", t.textContent), n.addEventListener("click", (function() { e.selectItem(n, !0) })), n.addEventListener("keydown", (function(t) {
                                        switch (t.keyCode) {
                                            case i.default.keys.ENTER:
                                                e.selectItem(n, !0), t.preventDefault();
                                                break;
                                            case i.default.keys.ESCAPE:
                                                e.escape(), t.preventDefault()
                                        }
                                    })), n
                                }
                            }, { key: "buildLabel", value: function() { var t = document.createElement("span"); return t.classList.add("ql-picker-label"), t.innerHTML = a.default, t.tabIndex = "0", t.setAttribute("role", "button"), t.setAttribute("aria-expanded", "false"), this.container.appendChild(t), t } }, {
                                key: "buildOptions",
                                value: function() {
                                    var t = this,
                                        e = document.createElement("span");
                                    e.classList.add("ql-picker-options"), e.setAttribute("aria-hidden", "true"), e.tabIndex = "-1", e.id = "ql-picker-options-" + l, l += 1, this.label.setAttribute("aria-controls", e.id), this.options = e, [].slice.call(this.select.options).forEach((function(n) {
                                        var r = t.buildItem(n);
                                        e.appendChild(r), !0 === n.selected && t.selectItem(r)
                                    })), this.container.appendChild(e)
                                }
                            }, {
                                key: "buildPicker",
                                value: function() {
                                    var t = this;
                                    [].slice.call(this.select.attributes).forEach((function(e) { t.container.setAttribute(e.name, e.value) })), this.container.classList.add("ql-picker"), this.label = this.buildLabel(), this.buildOptions()
                                }
                            }, {
                                key: "escape",
                                value: function() {
                                    var t = this;
                                    this.close(), setTimeout((function() { return t.label.focus() }), 1)
                                }
                            }, { key: "close", value: function() { this.container.classList.remove("ql-expanded"), this.label.setAttribute("aria-expanded", "false"), this.options.setAttribute("aria-hidden", "true") } }, {
                                key: "selectItem",
                                value: function(t) {
                                    var e = arguments.length > 1 && void 0 !== arguments[1] && arguments[1],
                                        n = this.container.querySelector(".ql-selected");
                                    if (t !== n && (null != n && n.classList.remove("ql-selected"), null != t && (t.classList.add("ql-selected"), this.select.selectedIndex = [].indexOf.call(t.parentNode.children, t), t.hasAttribute("data-value") ? this.label.setAttribute("data-value", t.getAttribute("data-value")) : this.label.removeAttribute("data-value"), t.hasAttribute("data-label") ? this.label.setAttribute("data-label", t.getAttribute("data-label")) : this.label.removeAttribute("data-label"), e))) {
                                        if ("function" == typeof Event) this.select.dispatchEvent(new Event("change"));
                                        else if ("object" === ("undefined" == typeof Event ? "undefined" : r(Event))) {
                                            var o = document.createEvent("Event");
                                            o.initEvent("change", !0, !0), this.select.dispatchEvent(o)
                                        }
                                        this.close()
                                    }
                                }
                            }, {
                                key: "update",
                                value: function() {
                                    var t = void 0;
                                    if (this.select.selectedIndex > -1) {
                                        var e = this.container.querySelector(".ql-picker-options").children[this.select.selectedIndex];
                                        t = this.select.options[this.select.selectedIndex], this.selectItem(e)
                                    } else this.selectItem(null);
                                    var n = null != t && t !== this.select.querySelector("option[selected]");
                                    this.label.classList.toggle("ql-active", n)
                                }
                            }]), t
                        }();
                        e.default = c
                    }, function(t, e, n) {
                        "use strict";
                        Object.defineProperty(e, "__esModule", { value: !0 });
                        var r = g(n(0)),
                            o = g(n(5)),
                            i = n(4),
                            a = g(i),
                            u = g(n(16)),
                            l = g(n(25)),
                            s = g(n(24)),
                            c = g(n(35)),
                            f = g(n(6)),
                            h = g(n(22)),
                            p = g(n(7)),
                            d = g(n(55)),
                            y = g(n(42)),
                            v = g(n(23));

                        function g(t) { return t && t.__esModule ? t : { default: t } }
                        o.default.register({ "blots/block": a.default, "blots/block/embed": i.BlockEmbed, "blots/break": u.default, "blots/container": l.default, "blots/cursor": s.default, "blots/embed": c.default, "blots/inline": f.default, "blots/scroll": h.default, "blots/text": p.default, "modules/clipboard": d.default, "modules/history": y.default, "modules/keyboard": v.default }), r.default.register(a.default, u.default, s.default, f.default, h.default, p.default), e.default = o.default
                    }, function(t, e, n) {
                        "use strict";
                        Object.defineProperty(e, "__esModule", { value: !0 });
                        var r = n(1),
                            o = function() {
                                function t(t) { this.domNode = t, this.domNode[r.DATA_KEY] = { blot: this } }
                                return Object.defineProperty(t.prototype, "statics", { get: function() { return this.constructor }, enumerable: !0, configurable: !0 }), t.create = function(t) { if (null == this.tagName) throw new r.ParchmentError("Blot definition missing tagName"); var e; return Array.isArray(this.tagName) ? ("string" == typeof t && (t = t.toUpperCase(), parseInt(t).toString() === t && (t = parseInt(t))), e = "number" == typeof t ? document.createElement(this.tagName[t - 1]) : this.tagName.indexOf(t) > -1 ? document.createElement(t) : document.createElement(this.tagName[0])) : e = document.createElement(this.tagName), this.className && e.classList.add(this.className), e }, t.prototype.attach = function() { null != this.parent && (this.scroll = this.parent.scroll) }, t.prototype.clone = function() { var t = this.domNode.cloneNode(!1); return r.create(t) }, t.prototype.detach = function() { null != this.parent && this.parent.removeChild(this), delete this.domNode[r.DATA_KEY] }, t.prototype.deleteAt = function(t, e) { this.isolate(t, e).remove() }, t.prototype.formatAt = function(t, e, n, o) {
                                    var i = this.isolate(t, e);
                                    if (null != r.query(n, r.Scope.BLOT) && o) i.wrap(n, o);
                                    else if (null != r.query(n, r.Scope.ATTRIBUTE)) {
                                        var a = r.create(this.statics.scope);
                                        i.wrap(a), a.format(n, o)
                                    }
                                }, t.prototype.insertAt = function(t, e, n) {
                                    var o = null == n ? r.create("text", e) : r.create(e, n),
                                        i = this.split(t);
                                    this.parent.insertBefore(o, i)
                                }, t.prototype.insertInto = function(t, e) {
                                    void 0 === e && (e = null), null != this.parent && this.parent.children.remove(this);
                                    var n = null;
                                    t.children.insertBefore(this, e), null != e && (n = e.domNode), this.domNode.parentNode == t.domNode && this.domNode.nextSibling == n || t.domNode.insertBefore(this.domNode, n), this.parent = t, this.attach()
                                }, t.prototype.isolate = function(t, e) { var n = this.split(t); return n.split(e), n }, t.prototype.length = function() { return 1 }, t.prototype.offset = function(t) { return void 0 === t && (t = this.parent), null == this.parent || this == t ? 0 : this.parent.children.offset(this) + this.parent.offset(t) }, t.prototype.optimize = function(t) { null != this.domNode[r.DATA_KEY] && delete this.domNode[r.DATA_KEY].mutations }, t.prototype.remove = function() { null != this.domNode.parentNode && this.domNode.parentNode.removeChild(this.domNode), this.detach() }, t.prototype.replace = function(t) { null != t.parent && (t.parent.insertBefore(this, t.next), t.remove()) }, t.prototype.replaceWith = function(t, e) { var n = "string" == typeof t ? r.create(t, e) : t; return n.replace(this), n }, t.prototype.split = function(t, e) { return 0 === t ? this : this.next }, t.prototype.update = function(t, e) {}, t.prototype.wrap = function(t, e) { var n = "string" == typeof t ? r.create(t, e) : t; return null != this.parent && this.parent.insertBefore(n, this.next), n.appendChild(this), n }, t.blotName = "abstract", t
                            }();
                        e.default = o
                    }, function(t, e, n) {
                        "use strict";
                        Object.defineProperty(e, "__esModule", { value: !0 });
                        var r = n(12),
                            o = n(32),
                            i = n(33),
                            a = n(1),
                            u = function() {
                                function t(t) { this.attributes = {}, this.domNode = t, this.build() }
                                return t.prototype.attribute = function(t, e) { e ? t.add(this.domNode, e) && (null != t.value(this.domNode) ? this.attributes[t.attrName] = t : delete this.attributes[t.attrName]) : (t.remove(this.domNode), delete this.attributes[t.attrName]) }, t.prototype.build = function() {
                                    var t = this;
                                    this.attributes = {};
                                    var e = r.default.keys(this.domNode),
                                        n = o.default.keys(this.domNode),
                                        u = i.default.keys(this.domNode);
                                    e.concat(n).concat(u).forEach((function(e) {
                                        var n = a.query(e, a.Scope.ATTRIBUTE);
                                        n instanceof r.default && (t.attributes[n.attrName] = n)
                                    }))
                                }, t.prototype.copy = function(t) {
                                    var e = this;
                                    Object.keys(this.attributes).forEach((function(n) {
                                        var r = e.attributes[n].value(e.domNode);
                                        t.format(n, r)
                                    }))
                                }, t.prototype.move = function(t) {
                                    var e = this;
                                    this.copy(t), Object.keys(this.attributes).forEach((function(t) { e.attributes[t].remove(e.domNode) })), this.attributes = {}
                                }, t.prototype.values = function() { var t = this; return Object.keys(this.attributes).reduce((function(e, n) { return e[n] = t.attributes[n].value(t.domNode), e }), {}) }, t
                            }();
                        e.default = u
                    }, function(t, e, n) {
                        "use strict";
                        var r, o = this && this.__extends || (r = Object.setPrototypeOf || { __proto__: [] }
                            instanceof Array && function(t, e) { t.__proto__ = e } || function(t, e) { for (var n in e) e.hasOwnProperty(n) && (t[n] = e[n]) },
                            function(t, e) {
                                function n() { this.constructor = t }
                                r(t, e), t.prototype = null === e ? Object.create(e) : (n.prototype = e.prototype, new n)
                            });

                        function i(t, e) { return (t.getAttribute("class") || "").split(/\s+/).filter((function(t) { return 0 === t.indexOf(e + "-") })) }
                        Object.defineProperty(e, "__esModule", { value: !0 });
                        var a = function(t) {
                            function e() { return null !== t && t.apply(this, arguments) || this }
                            return o(e, t), e.keys = function(t) { return (t.getAttribute("class") || "").split(/\s+/).map((function(t) { return t.split("-").slice(0, -1).join("-") })) }, e.prototype.add = function(t, e) { return !!this.canAdd(t, e) && (this.remove(t), t.classList.add(this.keyName + "-" + e), !0) }, e.prototype.remove = function(t) { i(t, this.keyName).forEach((function(e) { t.classList.remove(e) })), 0 === t.classList.length && t.removeAttribute("class") }, e.prototype.value = function(t) { var e = (i(t, this.keyName)[0] || "").slice(this.keyName.length + 1); return this.canAdd(t, e) ? e : "" }, e
                        }(n(12).default);
                        e.default = a
                    }, function(t, e, n) {
                        "use strict";
                        var r, o = this && this.__extends || (r = Object.setPrototypeOf || { __proto__: [] }
                            instanceof Array && function(t, e) { t.__proto__ = e } || function(t, e) { for (var n in e) e.hasOwnProperty(n) && (t[n] = e[n]) },
                            function(t, e) {
                                function n() { this.constructor = t }
                                r(t, e), t.prototype = null === e ? Object.create(e) : (n.prototype = e.prototype, new n)
                            });

                        function i(t) {
                            var e = t.split("-"),
                                n = e.slice(1).map((function(t) { return t[0].toUpperCase() + t.slice(1) })).join("");
                            return e[0] + n
                        }
                        Object.defineProperty(e, "__esModule", { value: !0 });
                        var a = function(t) {
                            function e() { return null !== t && t.apply(this, arguments) || this }
                            return o(e, t), e.keys = function(t) { return (t.getAttribute("style") || "").split(";").map((function(t) { return t.split(":")[0].trim() })) }, e.prototype.add = function(t, e) { return !!this.canAdd(t, e) && (t.style[i(this.keyName)] = e, !0) }, e.prototype.remove = function(t) { t.style[i(this.keyName)] = "", t.getAttribute("style") || t.removeAttribute("style") }, e.prototype.value = function(t) { var e = t.style[i(this.keyName)]; return this.canAdd(t, e) ? e : "" }, e
                        }(n(12).default);
                        e.default = a
                    }, function(t, e, n) {
                        "use strict";
                        Object.defineProperty(e, "__esModule", { value: !0 });
                        var r = function() {
                                function t(t, e) {
                                    for (var n = 0; n < e.length; n++) {
                                        var r = e[n];
                                        r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(t, r.key, r)
                                    }
                                }
                                return function(e, n, r) { return n && t(e.prototype, n), r && t(e, r), e }
                            }(),
                            o = function() {
                                function t(e, n) {! function(t, e) { if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function") }(this, t), this.quill = e, this.options = n, this.modules = {} }
                                return r(t, [{
                                    key: "init",
                                    value: function() {
                                        var t = this;
                                        Object.keys(this.options.modules).forEach((function(e) { null == t.modules[e] && t.addModule(e) }))
                                    }
                                }, { key: "addModule", value: function(t) { var e = this.quill.constructor.import("modules/" + t); return this.modules[t] = new e(this.quill, this.options.modules[t] || {}), this.modules[t] } }]), t
                            }();
                        o.DEFAULTS = { modules: {} }, o.themes = { default: o }, e.default = o
                    }, function(t, e, n) {
                        "use strict";
                        Object.defineProperty(e, "__esModule", { value: !0 });
                        var r = function() {
                                function t(t, e) {
                                    for (var n = 0; n < e.length; n++) {
                                        var r = e[n];
                                        r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(t, r.key, r)
                                    }
                                }
                                return function(e, n, r) { return n && t(e.prototype, n), r && t(e, r), e }
                            }(),
                            o = function t(e, n, r) { null === e && (e = Function.prototype); var o = Object.getOwnPropertyDescriptor(e, n); if (void 0 === o) { var i = Object.getPrototypeOf(e); return null === i ? void 0 : t(i, n, r) } if ("value" in o) return o.value; var a = o.get; return void 0 !== a ? a.call(r) : void 0 },
                            i = u(n(0)),
                            a = u(n(7));

                        function u(t) { return t && t.__esModule ? t : { default: t } }
                        var l = "\ufeff",
                            s = function(t) {
                                function e(t) {! function(t, e) { if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function") }(this, e); var n = function(t, e) { if (!t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return !e || "object" != typeof e && "function" != typeof e ? t : e }(this, (e.__proto__ || Object.getPrototypeOf(e)).call(this, t)); return n.contentNode = document.createElement("span"), n.contentNode.setAttribute("contenteditable", !1), [].slice.call(n.domNode.childNodes).forEach((function(t) { n.contentNode.appendChild(t) })), n.leftGuard = document.createTextNode(l), n.rightGuard = document.createTextNode(l), n.domNode.appendChild(n.leftGuard), n.domNode.appendChild(n.contentNode), n.domNode.appendChild(n.rightGuard), n }
                                return function(t, e) {
                                    if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + typeof e);
                                    t.prototype = Object.create(e && e.prototype, { constructor: { value: t, enumerable: !1, writable: !0, configurable: !0 } }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e)
                                }(e, t), r(e, [{ key: "index", value: function(t, n) { return t === this.leftGuard ? 0 : t === this.rightGuard ? 1 : o(e.prototype.__proto__ || Object.getPrototypeOf(e.prototype), "index", this).call(this, t, n) } }, {
                                    key: "restore",
                                    value: function(t) {
                                        var e = void 0,
                                            n = void 0,
                                            r = t.data.split(l).join("");
                                        if (t === this.leftGuard)
                                            if (this.prev instanceof a.default) {
                                                var o = this.prev.length();
                                                this.prev.insertAt(o, r), e = { startNode: this.prev.domNode, startOffset: o + r.length }
                                            } else n = document.createTextNode(r), this.parent.insertBefore(i.default.create(n), this), e = { startNode: n, startOffset: r.length };
                                        else t === this.rightGuard && (this.next instanceof a.default ? (this.next.insertAt(0, r), e = { startNode: this.next.domNode, startOffset: r.length }) : (n = document.createTextNode(r), this.parent.insertBefore(i.default.create(n), this.next), e = { startNode: n, startOffset: r.length }));
                                        return t.data = l, e
                                    }
                                }, {
                                    key: "update",
                                    value: function(t, e) {
                                        var n = this;
                                        t.forEach((function(t) {
                                            if ("characterData" === t.type && (t.target === n.leftGuard || t.target === n.rightGuard)) {
                                                var r = n.restore(t.target);
                                                r && (e.range = r)
                                            }
                                        }))
                                    }
                                }]), e
                            }(i.default.Embed);
                        e.default = s
                    }, function(t, e, n) {
                        "use strict";
                        Object.defineProperty(e, "__esModule", { value: !0 }), e.AlignStyle = e.AlignClass = e.AlignAttribute = void 0;
                        var r, o = n(0),
                            i = (r = o) && r.__esModule ? r : { default: r },
                            a = { scope: i.default.Scope.BLOCK, whitelist: ["right", "center", "justify"] },
                            u = new i.default.Attributor.Attribute("align", "align", a),
                            l = new i.default.Attributor.Class("align", "ql-align", a),
                            s = new i.default.Attributor.Style("align", "text-align", a);
                        e.AlignAttribute = u, e.AlignClass = l, e.AlignStyle = s
                    }, function(t, e, n) {
                        "use strict";
                        Object.defineProperty(e, "__esModule", { value: !0 }), e.BackgroundStyle = e.BackgroundClass = void 0;
                        var r, o = n(0),
                            i = (r = o) && r.__esModule ? r : { default: r },
                            a = n(26),
                            u = new i.default.Attributor.Class("background", "ql-bg", { scope: i.default.Scope.INLINE }),
                            l = new a.ColorAttributor("background", "background-color", { scope: i.default.Scope.INLINE });
                        e.BackgroundClass = u, e.BackgroundStyle = l
                    }, function(t, e, n) {
                        "use strict";
                        Object.defineProperty(e, "__esModule", { value: !0 }), e.DirectionStyle = e.DirectionClass = e.DirectionAttribute = void 0;
                        var r, o = n(0),
                            i = (r = o) && r.__esModule ? r : { default: r },
                            a = { scope: i.default.Scope.BLOCK, whitelist: ["rtl"] },
                            u = new i.default.Attributor.Attribute("direction", "dir", a),
                            l = new i.default.Attributor.Class("direction", "ql-direction", a),
                            s = new i.default.Attributor.Style("direction", "direction", a);
                        e.DirectionAttribute = u, e.DirectionClass = l, e.DirectionStyle = s
                    }, function(t, e, n) {
                        "use strict";
                        Object.defineProperty(e, "__esModule", { value: !0 }), e.FontClass = e.FontStyle = void 0;
                        var r, o = function() {
                                function t(t, e) {
                                    for (var n = 0; n < e.length; n++) {
                                        var r = e[n];
                                        r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(t, r.key, r)
                                    }
                                }
                                return function(e, n, r) { return n && t(e.prototype, n), r && t(e, r), e }
                            }(),
                            i = function t(e, n, r) { null === e && (e = Function.prototype); var o = Object.getOwnPropertyDescriptor(e, n); if (void 0 === o) { var i = Object.getPrototypeOf(e); return null === i ? void 0 : t(i, n, r) } if ("value" in o) return o.value; var a = o.get; return void 0 !== a ? a.call(r) : void 0 },
                            a = n(0),
                            u = (r = a) && r.__esModule ? r : { default: r };

                        function l(t, e) { if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function") }

                        function s(t, e) { if (!t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return !e || "object" != typeof e && "function" != typeof e ? t : e }
                        var c = { scope: u.default.Scope.INLINE, whitelist: ["serif", "monospace"] },
                            f = new u.default.Attributor.Class("font", "ql-font", c),
                            h = function(t) {
                                function e() { return l(this, e), s(this, (e.__proto__ || Object.getPrototypeOf(e)).apply(this, arguments)) }
                                return function(t, e) {
                                    if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + typeof e);
                                    t.prototype = Object.create(e && e.prototype, { constructor: { value: t, enumerable: !1, writable: !0, configurable: !0 } }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e)
                                }(e, t), o(e, [{ key: "value", value: function(t) { return i(e.prototype.__proto__ || Object.getPrototypeOf(e.prototype), "value", this).call(this, t).replace(/["']/g, "") } }]), e
                            }(u.default.Attributor.Style),
                            p = new h("font", "font-family", c);
                        e.FontStyle = p, e.FontClass = f
                    }, function(t, e, n) {
                        "use strict";
                        Object.defineProperty(e, "__esModule", { value: !0 }), e.SizeStyle = e.SizeClass = void 0;
                        var r, o = n(0),
                            i = (r = o) && r.__esModule ? r : { default: r },
                            a = new i.default.Attributor.Class("size", "ql-size", { scope: i.default.Scope.INLINE, whitelist: ["small", "large", "huge"] }),
                            u = new i.default.Attributor.Style("size", "font-size", { scope: i.default.Scope.INLINE, whitelist: ["10px", "18px", "32px"] });
                        e.SizeClass = a, e.SizeStyle = u
                    }, function(t, e, n) {
                        "use strict";
                        t.exports = { align: { "": n(76), center: n(77), right: n(78), justify: n(79) }, background: n(80), blockquote: n(81), bold: n(82), clean: n(83), code: n(58), "code-block": n(58), color: n(84), direction: { "": n(85), rtl: n(86) }, float: { center: n(87), full: n(88), left: n(89), right: n(90) }, formula: n(91), header: { 1: n(92), 2: n(93) }, italic: n(94), image: n(95), indent: { "+1": n(96), "-1": n(97) }, link: n(98), list: { ordered: n(99), bullet: n(100), check: n(101) }, script: { sub: n(102), super: n(103) }, strike: n(104), underline: n(105), video: n(106) }
                    }, function(t, e, n) {
                        "use strict";
                        Object.defineProperty(e, "__esModule", { value: !0 }), e.getLastChangeIndex = e.default = void 0;
                        var r = function() {
                                function t(t, e) {
                                    for (var n = 0; n < e.length; n++) {
                                        var r = e[n];
                                        r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(t, r.key, r)
                                    }
                                }
                                return function(e, n, r) { return n && t(e.prototype, n), r && t(e, r), e }
                            }(),
                            o = a(n(0)),
                            i = a(n(5));

                        function a(t) { return t && t.__esModule ? t : { default: t } }
                        var u = function(t) {
                            function e(t, n) {! function(t, e) { if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function") }(this, e); var r = function(t, e) { if (!t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return !e || "object" != typeof e && "function" != typeof e ? t : e }(this, (e.__proto__ || Object.getPrototypeOf(e)).call(this, t, n)); return r.lastRecorded = 0, r.ignoreChange = !1, r.clear(), r.quill.on(i.default.events.EDITOR_CHANGE, (function(t, e, n, o) { t !== i.default.events.TEXT_CHANGE || r.ignoreChange || (r.options.userOnly && o !== i.default.sources.USER ? r.transform(e) : r.record(e, n)) })), r.quill.keyboard.addBinding({ key: "Z", shortKey: !0 }, r.undo.bind(r)), r.quill.keyboard.addBinding({ key: "Z", shortKey: !0, shiftKey: !0 }, r.redo.bind(r)), /Win/i.test(navigator.platform) && r.quill.keyboard.addBinding({ key: "Y", shortKey: !0 }, r.redo.bind(r)), r }
                            return function(t, e) {
                                if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + typeof e);
                                t.prototype = Object.create(e && e.prototype, { constructor: { value: t, enumerable: !1, writable: !0, configurable: !0 } }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e)
                            }(e, t), r(e, [{
                                key: "change",
                                value: function(t, e) {
                                    if (0 !== this.stack[t].length) {
                                        var n = this.stack[t].pop();
                                        this.stack[e].push(n), this.lastRecorded = 0, this.ignoreChange = !0, this.quill.updateContents(n[t], i.default.sources.USER), this.ignoreChange = !1;
                                        var r = l(n[t]);
                                        this.quill.setSelection(r)
                                    }
                                }
                            }, { key: "clear", value: function() { this.stack = { undo: [], redo: [] } } }, { key: "cutoff", value: function() { this.lastRecorded = 0 } }, {
                                key: "record",
                                value: function(t, e) {
                                    if (0 !== t.ops.length) {
                                        this.stack.redo = [];
                                        var n = this.quill.getContents().diff(e),
                                            r = Date.now();
                                        if (this.lastRecorded + this.options.delay > r && this.stack.undo.length > 0) {
                                            var o = this.stack.undo.pop();
                                            n = n.compose(o.undo), t = o.redo.compose(t)
                                        } else this.lastRecorded = r;
                                        this.stack.undo.push({ redo: t, undo: n }), this.stack.undo.length > this.options.maxStack && this.stack.undo.shift()
                                    }
                                }
                            }, { key: "redo", value: function() { this.change("redo", "undo") } }, { key: "transform", value: function(t) { this.stack.undo.forEach((function(e) { e.undo = t.transform(e.undo, !0), e.redo = t.transform(e.redo, !0) })), this.stack.redo.forEach((function(e) { e.undo = t.transform(e.undo, !0), e.redo = t.transform(e.redo, !0) })) } }, { key: "undo", value: function() { this.change("undo", "redo") } }]), e
                        }(a(n(9)).default);

                        function l(t) {
                            var e = t.reduce((function(t, e) { return t += e.delete || 0 }), 0),
                                n = t.length() - e;
                            return function(t) { var e = t.ops[t.ops.length - 1]; return null != e && (null != e.insert ? "string" == typeof e.insert && e.insert.endsWith("\n") : null != e.attributes && Object.keys(e.attributes).some((function(t) { return null != o.default.query(t, o.default.Scope.BLOCK) }))) }(t) && (n -= 1), n
                        }
                        u.DEFAULTS = { delay: 1e3, maxStack: 100, userOnly: !1 }, e.default = u, e.getLastChangeIndex = l
                    }, function(t, e, n) {
                        "use strict";
                        Object.defineProperty(e, "__esModule", { value: !0 }), e.default = e.BaseTooltip = void 0;
                        var r = function() {
                                function t(t, e) {
                                    for (var n = 0; n < e.length; n++) {
                                        var r = e[n];
                                        r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(t, r.key, r)
                                    }
                                }
                                return function(e, n, r) { return n && t(e.prototype, n), r && t(e, r), e }
                            }(),
                            o = function t(e, n, r) { null === e && (e = Function.prototype); var o = Object.getOwnPropertyDescriptor(e, n); if (void 0 === o) { var i = Object.getPrototypeOf(e); return null === i ? void 0 : t(i, n, r) } if ("value" in o) return o.value; var a = o.get; return void 0 !== a ? a.call(r) : void 0 },
                            i = d(n(3)),
                            a = d(n(2)),
                            u = d(n(8)),
                            l = d(n(23)),
                            s = d(n(34)),
                            c = d(n(59)),
                            f = d(n(60)),
                            h = d(n(28)),
                            p = d(n(61));

                        function d(t) { return t && t.__esModule ? t : { default: t } }

                        function y(t, e) { if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function") }

                        function v(t, e) { if (!t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return !e || "object" != typeof e && "function" != typeof e ? t : e }

                        function g(t, e) {
                            if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + typeof e);
                            t.prototype = Object.create(e && e.prototype, { constructor: { value: t, enumerable: !1, writable: !0, configurable: !0 } }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e)
                        }
                        var b = [!1, "center", "right", "justify"],
                            m = ["#000000", "#e60000", "#ff9900", "#ffff00", "#008a00", "#0066cc", "#9933ff", "#ffffff", "#facccc", "#ffebcc", "#ffffcc", "#cce8cc", "#cce0f5", "#ebd6ff", "#bbbbbb", "#f06666", "#ffc266", "#ffff66", "#66b966", "#66a3e0", "#c285ff", "#888888", "#a10000", "#b26b00", "#b2b200", "#006100", "#0047b2", "#6b24b2", "#444444", "#5c0000", "#663d00", "#666600", "#003700", "#002966", "#3d1466"],
                            _ = [!1, "serif", "monospace"],
                            w = ["1", "2", "3", !1],
                            x = ["small", !1, "large", "huge"],
                            O = function(t) {
                                function e(t, n) {
                                    y(this, e);
                                    var r = v(this, (e.__proto__ || Object.getPrototypeOf(e)).call(this, t, n));
                                    return t.emitter.listenDOM("click", document.body, (function e(n) {
                                        if (!document.body.contains(t.root)) return document.body.removeEventListener("click", e);
                                        null == r.tooltip || r.tooltip.root.contains(n.target) || document.activeElement === r.tooltip.textbox || r.quill.hasFocus() || r.tooltip.hide(), null != r.pickers && r.pickers.forEach((function(t) { t.container.contains(n.target) || t.close() }))
                                    })), r
                                }
                                return g(e, t), r(e, [{ key: "addModule", value: function(t) { var n = o(e.prototype.__proto__ || Object.getPrototypeOf(e.prototype), "addModule", this).call(this, t); return "toolbar" === t && this.extendToolbar(n), n } }, {
                                    key: "buildButtons",
                                    value: function(t, e) {
                                        t.forEach((function(t) {
                                            (t.getAttribute("class") || "").split(/\s+/).forEach((function(n) {
                                                if (n.startsWith("ql-") && (n = n.slice("ql-".length), null != e[n]))
                                                    if ("direction" === n) t.innerHTML = e[n][""] + e[n].rtl;
                                                    else if ("string" == typeof e[n]) t.innerHTML = e[n];
                                                else {
                                                    var r = t.value || "";
                                                    null != r && e[n][r] && (t.innerHTML = e[n][r])
                                                }
                                            }))
                                        }))
                                    }
                                }, {
                                    key: "buildPickers",
                                    value: function(t, e) {
                                        var n = this;
                                        this.pickers = t.map((function(t) { if (t.classList.contains("ql-align")) return null == t.querySelector("option") && k(t, b), new f.default(t, e.align); if (t.classList.contains("ql-background") || t.classList.contains("ql-color")) { var n = t.classList.contains("ql-background") ? "background" : "color"; return null == t.querySelector("option") && k(t, m, "background" === n ? "#ffffff" : "#000000"), new c.default(t, e[n]) } return null == t.querySelector("option") && (t.classList.contains("ql-font") ? k(t, _) : t.classList.contains("ql-header") ? k(t, w) : t.classList.contains("ql-size") && k(t, x)), new h.default(t) })), this.quill.on(u.default.events.EDITOR_CHANGE, (function() { n.pickers.forEach((function(t) { t.update() })) }))
                                    }
                                }]), e
                            }(s.default);
                        O.DEFAULTS = (0, i.default)(!0, {}, s.default.DEFAULTS, {
                            modules: {
                                toolbar: {
                                    handlers: {
                                        formula: function() { this.quill.theme.tooltip.edit("formula") },
                                        image: function() {
                                            var t = this,
                                                e = this.container.querySelector("input.ql-image[type=file]");
                                            null == e && ((e = document.createElement("input")).setAttribute("type", "file"), e.setAttribute("accept", "image/png, image/gif, image/jpeg, image/bmp, image/x-icon"), e.classList.add("ql-image"), e.addEventListener("change", (function() {
                                                if (null != e.files && null != e.files[0]) {
                                                    var n = new FileReader;
                                                    n.onload = function(n) {
                                                        var r = t.quill.getSelection(!0);
                                                        t.quill.updateContents((new a.default).retain(r.index).delete(r.length).insert({ image: n.target.result }), u.default.sources.USER), t.quill.setSelection(r.index + 1, u.default.sources.SILENT), e.value = ""
                                                    }, n.readAsDataURL(e.files[0])
                                                }
                                            })), this.container.appendChild(e)), e.click()
                                        },
                                        video: function() { this.quill.theme.tooltip.edit("video") }
                                    }
                                }
                            }
                        });
                        var E = function(t) {
                            function e(t, n) { y(this, e); var r = v(this, (e.__proto__ || Object.getPrototypeOf(e)).call(this, t, n)); return r.textbox = r.root.querySelector('input[type="text"]'), r.listen(), r }
                            return g(e, t), r(e, [{
                                key: "listen",
                                value: function() {
                                    var t = this;
                                    this.textbox.addEventListener("keydown", (function(e) { l.default.match(e, "enter") ? (t.save(), e.preventDefault()) : l.default.match(e, "escape") && (t.cancel(), e.preventDefault()) }))
                                }
                            }, { key: "cancel", value: function() { this.hide() } }, {
                                key: "edit",
                                value: function() {
                                    var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "link",
                                        e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : null;
                                    this.root.classList.remove("ql-hidden"), this.root.classList.add("ql-editing"), null != e ? this.textbox.value = e : t !== this.root.getAttribute("data-mode") && (this.textbox.value = ""), this.position(this.quill.getBounds(this.quill.selection.savedRange)), this.textbox.select(), this.textbox.setAttribute("placeholder", this.textbox.getAttribute("data-" + t) || ""), this.root.setAttribute("data-mode", t)
                                }
                            }, {
                                key: "restoreFocus",
                                value: function() {
                                    var t = this.quill.scrollingContainer.scrollTop;
                                    this.quill.focus(), this.quill.scrollingContainer.scrollTop = t
                                }
                            }, {
                                key: "save",
                                value: function() {
                                    var t, e, n = this.textbox.value;
                                    switch (this.root.getAttribute("data-mode")) {
                                        case "link":
                                            var r = this.quill.root.scrollTop;
                                            this.linkRange ? (this.quill.formatText(this.linkRange, "link", n, u.default.sources.USER), delete this.linkRange) : (this.restoreFocus(), this.quill.format("link", n, u.default.sources.USER)), this.quill.root.scrollTop = r;
                                            break;
                                        case "video":
                                            e = (t = n).match(/^(?:(https?):\/\/)?(?:(?:www|m)\.)?youtube\.com\/watch.*v=([a-zA-Z0-9_-]+)/) || t.match(/^(?:(https?):\/\/)?(?:(?:www|m)\.)?youtu\.be\/([a-zA-Z0-9_-]+)/), n = e ? (e[1] || "https") + "://www.youtube.com/embed/" + e[2] + "?showinfo=0" : (e = t.match(/^(?:(https?):\/\/)?(?:www\.)?vimeo\.com\/(\d+)/)) ? (e[1] || "https") + "://player.vimeo.com/video/" + e[2] + "/" : t;
                                        case "formula":
                                            if (!n) break;
                                            var o = this.quill.getSelection(!0);
                                            if (null != o) {
                                                var i = o.index + o.length;
                                                this.quill.insertEmbed(i, this.root.getAttribute("data-mode"), n, u.default.sources.USER), "formula" === this.root.getAttribute("data-mode") && this.quill.insertText(i + 1, " ", u.default.sources.USER), this.quill.setSelection(i + 2, u.default.sources.USER)
                                            }
                                    }
                                    this.textbox.value = "", this.hide()
                                }
                            }]), e
                        }(p.default);

                        function k(t, e) {
                            var n = arguments.length > 2 && void 0 !== arguments[2] && arguments[2];
                            e.forEach((function(e) {
                                var r = document.createElement("option");
                                e === n ? r.setAttribute("selected", "selected") : r.setAttribute("value", e), t.appendChild(r)
                            }))
                        }
                        e.BaseTooltip = E, e.default = O
                    }, function(t, e, n) {
                        "use strict";
                        Object.defineProperty(e, "__esModule", { value: !0 });
                        var r = function() {
                            function t() { this.head = this.tail = null, this.length = 0 }
                            return t.prototype.append = function() {
                                for (var t = [], e = 0; e < arguments.length; e++) t[e] = arguments[e];
                                this.insertBefore(t[0], null), t.length > 1 && this.append.apply(this, t.slice(1))
                            }, t.prototype.contains = function(t) {
                                for (var e, n = this.iterator(); e = n();)
                                    if (e === t) return !0;
                                return !1
                            }, t.prototype.insertBefore = function(t, e) { t && (t.next = e, null != e ? (t.prev = e.prev, null != e.prev && (e.prev.next = t), e.prev = t, e === this.head && (this.head = t)) : null != this.tail ? (this.tail.next = t, t.prev = this.tail, this.tail = t) : (t.prev = null, this.head = this.tail = t), this.length += 1) }, t.prototype.offset = function(t) {
                                for (var e = 0, n = this.head; null != n;) {
                                    if (n === t) return e;
                                    e += n.length(), n = n.next
                                }
                                return -1
                            }, t.prototype.remove = function(t) { this.contains(t) && (null != t.prev && (t.prev.next = t.next), null != t.next && (t.next.prev = t.prev), t === this.head && (this.head = t.next), t === this.tail && (this.tail = t.prev), this.length -= 1) }, t.prototype.iterator = function(t) {
                                return void 0 === t && (t = this.head),
                                    function() { var e = t; return null != t && (t = t.next), e }
                            }, t.prototype.find = function(t, e) {
                                void 0 === e && (e = !1);
                                for (var n, r = this.iterator(); n = r();) {
                                    var o = n.length();
                                    if (t < o || e && t === o && (null == n.next || 0 !== n.next.length())) return [n, t];
                                    t -= o
                                }
                                return [null, 0]
                            }, t.prototype.forEach = function(t) { for (var e, n = this.iterator(); e = n();) t(e) }, t.prototype.forEachAt = function(t, e, n) {
                                if (!(e <= 0))
                                    for (var r, o = this.find(t), i = o[0], a = t - o[1], u = this.iterator(i);
                                        (r = u()) && a < t + e;) {
                                        var l = r.length();
                                        t > a ? n(r, t - a, Math.min(e, a + l - t)) : n(r, 0, Math.min(l, t + e - a)), a += l
                                    }
                            }, t.prototype.map = function(t) { return this.reduce((function(e, n) { return e.push(t(n)), e }), []) }, t.prototype.reduce = function(t, e) { for (var n, r = this.iterator(); n = r();) e = t(e, n); return e }, t
                        }();
                        e.default = r
                    }, function(t, e, n) {
                        "use strict";
                        var r, o = this && this.__extends || (r = Object.setPrototypeOf || { __proto__: [] }
                            instanceof Array && function(t, e) { t.__proto__ = e } || function(t, e) { for (var n in e) e.hasOwnProperty(n) && (t[n] = e[n]) },
                            function(t, e) {
                                function n() { this.constructor = t }
                                r(t, e), t.prototype = null === e ? Object.create(e) : (n.prototype = e.prototype, new n)
                            });
                        Object.defineProperty(e, "__esModule", { value: !0 });
                        var i = n(17),
                            a = n(1),
                            u = { attributes: !0, characterData: !0, characterDataOldValue: !0, childList: !0, subtree: !0 },
                            l = function(t) {
                                function e(e) { var n = t.call(this, e) || this; return n.scroll = n, n.observer = new MutationObserver((function(t) { n.update(t) })), n.observer.observe(n.domNode, u), n.attach(), n }
                                return o(e, t), e.prototype.detach = function() { t.prototype.detach.call(this), this.observer.disconnect() }, e.prototype.deleteAt = function(e, n) { this.update(), 0 === e && n === this.length() ? this.children.forEach((function(t) { t.remove() })) : t.prototype.deleteAt.call(this, e, n) }, e.prototype.formatAt = function(e, n, r, o) { this.update(), t.prototype.formatAt.call(this, e, n, r, o) }, e.prototype.insertAt = function(e, n, r) { this.update(), t.prototype.insertAt.call(this, e, n, r) }, e.prototype.optimize = function(e, n) {
                                    var r = this;
                                    void 0 === e && (e = []), void 0 === n && (n = {}), t.prototype.optimize.call(this, n);
                                    for (var o = [].slice.call(this.observer.takeRecords()); o.length > 0;) e.push(o.pop());
                                    for (var u = function(t, e) { void 0 === e && (e = !0), null != t && t !== r && null != t.domNode.parentNode && (null == t.domNode[a.DATA_KEY].mutations && (t.domNode[a.DATA_KEY].mutations = []), e && u(t.parent)) }, l = function(t) { null != t.domNode[a.DATA_KEY] && null != t.domNode[a.DATA_KEY].mutations && (t instanceof i.default && t.children.forEach(l), t.optimize(n)) }, s = e, c = 0; s.length > 0; c += 1) {
                                        if (c >= 100) throw new Error("[Parchment] Maximum optimize iterations reached");
                                        for (s.forEach((function(t) {
                                                var e = a.find(t.target, !0);
                                                null != e && (e.domNode === t.target && ("childList" === t.type ? (u(a.find(t.previousSibling, !1)), [].forEach.call(t.addedNodes, (function(t) {
                                                    var e = a.find(t, !1);
                                                    u(e, !1), e instanceof i.default && e.children.forEach((function(t) { u(t, !1) }))
                                                }))) : "attributes" === t.type && u(e.prev)), u(e))
                                            })), this.children.forEach(l), o = (s = [].slice.call(this.observer.takeRecords())).slice(); o.length > 0;) e.push(o.pop())
                                    }
                                }, e.prototype.update = function(e, n) {
                                    var r = this;
                                    void 0 === n && (n = {}), (e = e || this.observer.takeRecords()).map((function(t) { var e = a.find(t.target, !0); return null == e ? null : null == e.domNode[a.DATA_KEY].mutations ? (e.domNode[a.DATA_KEY].mutations = [t], e) : (e.domNode[a.DATA_KEY].mutations.push(t), null) })).forEach((function(t) { null != t && t !== r && null != t.domNode[a.DATA_KEY] && t.update(t.domNode[a.DATA_KEY].mutations || [], n) })), null != this.domNode[a.DATA_KEY].mutations && t.prototype.update.call(this, this.domNode[a.DATA_KEY].mutations, n), this.optimize(e, n)
                                }, e.blotName = "scroll", e.defaultChild = "block", e.scope = a.Scope.BLOCK_BLOT, e.tagName = "DIV", e
                            }(i.default);
                        e.default = l
                    }, function(t, e, n) {
                        "use strict";
                        var r, o = this && this.__extends || (r = Object.setPrototypeOf || { __proto__: [] }
                            instanceof Array && function(t, e) { t.__proto__ = e } || function(t, e) { for (var n in e) e.hasOwnProperty(n) && (t[n] = e[n]) },
                            function(t, e) {
                                function n() { this.constructor = t }
                                r(t, e), t.prototype = null === e ? Object.create(e) : (n.prototype = e.prototype, new n)
                            });
                        Object.defineProperty(e, "__esModule", { value: !0 });
                        var i = n(18),
                            a = n(1),
                            u = function(t) {
                                function e() { return null !== t && t.apply(this, arguments) || this }
                                return o(e, t), e.formats = function(n) { if (n.tagName !== e.tagName) return t.formats.call(this, n) }, e.prototype.format = function(n, r) {
                                    var o = this;
                                    n !== this.statics.blotName || r ? t.prototype.format.call(this, n, r) : (this.children.forEach((function(t) { t instanceof i.default || (t = t.wrap(e.blotName, !0)), o.attributes.copy(t) })), this.unwrap())
                                }, e.prototype.formatAt = function(e, n, r, o) { null != this.formats()[r] || a.query(r, a.Scope.ATTRIBUTE) ? this.isolate(e, n).format(r, o) : t.prototype.formatAt.call(this, e, n, r, o) }, e.prototype.optimize = function(n) {
                                    t.prototype.optimize.call(this, n);
                                    var r = this.formats();
                                    if (0 === Object.keys(r).length) return this.unwrap();
                                    var o = this.next;
                                    o instanceof e && o.prev === this && function(t, e) {
                                        if (Object.keys(t).length !== Object.keys(e).length) return !1;
                                        for (var n in t)
                                            if (t[n] !== e[n]) return !1;
                                        return !0
                                    }(r, o.formats()) && (o.moveChildren(this), o.remove())
                                }, e.blotName = "inline", e.scope = a.Scope.INLINE_BLOT, e.tagName = "SPAN", e
                            }(i.default);
                        e.default = u
                    }, function(t, e, n) {
                        "use strict";
                        var r, o = this && this.__extends || (r = Object.setPrototypeOf || { __proto__: [] }
                            instanceof Array && function(t, e) { t.__proto__ = e } || function(t, e) { for (var n in e) e.hasOwnProperty(n) && (t[n] = e[n]) },
                            function(t, e) {
                                function n() { this.constructor = t }
                                r(t, e), t.prototype = null === e ? Object.create(e) : (n.prototype = e.prototype, new n)
                            });
                        Object.defineProperty(e, "__esModule", { value: !0 });
                        var i = n(18),
                            a = n(1),
                            u = function(t) {
                                function e() { return null !== t && t.apply(this, arguments) || this }
                                return o(e, t), e.formats = function(n) { var r = a.query(e.blotName).tagName; if (n.tagName !== r) return t.formats.call(this, n) }, e.prototype.format = function(n, r) { null != a.query(n, a.Scope.BLOCK) && (n !== this.statics.blotName || r ? t.prototype.format.call(this, n, r) : this.replaceWith(e.blotName)) }, e.prototype.formatAt = function(e, n, r, o) { null != a.query(r, a.Scope.BLOCK) ? this.format(r, o) : t.prototype.formatAt.call(this, e, n, r, o) }, e.prototype.insertAt = function(e, n, r) {
                                    if (null == r || null != a.query(n, a.Scope.INLINE)) t.prototype.insertAt.call(this, e, n, r);
                                    else {
                                        var o = this.split(e),
                                            i = a.create(n, r);
                                        o.parent.insertBefore(i, o)
                                    }
                                }, e.prototype.update = function(e, n) { navigator.userAgent.match(/Trident/) ? this.build() : t.prototype.update.call(this, e, n) }, e.blotName = "block", e.scope = a.Scope.BLOCK_BLOT, e.tagName = "P", e
                            }(i.default);
                        e.default = u
                    }, function(t, e, n) {
                        "use strict";
                        var r, o = this && this.__extends || (r = Object.setPrototypeOf || { __proto__: [] }
                            instanceof Array && function(t, e) { t.__proto__ = e } || function(t, e) { for (var n in e) e.hasOwnProperty(n) && (t[n] = e[n]) },
                            function(t, e) {
                                function n() { this.constructor = t }
                                r(t, e), t.prototype = null === e ? Object.create(e) : (n.prototype = e.prototype, new n)
                            });
                        Object.defineProperty(e, "__esModule", { value: !0 });
                        var i = function(t) {
                            function e() { return null !== t && t.apply(this, arguments) || this }
                            return o(e, t), e.formats = function(t) {}, e.prototype.format = function(e, n) { t.prototype.formatAt.call(this, 0, this.length(), e, n) }, e.prototype.formatAt = function(e, n, r, o) { 0 === e && n === this.length() ? this.format(r, o) : t.prototype.formatAt.call(this, e, n, r, o) }, e.prototype.formats = function() { return this.statics.formats(this.domNode) }, e
                        }(n(19).default);
                        e.default = i
                    }, function(t, e, n) {
                        "use strict";
                        var r, o = this && this.__extends || (r = Object.setPrototypeOf || { __proto__: [] }
                            instanceof Array && function(t, e) { t.__proto__ = e } || function(t, e) { for (var n in e) e.hasOwnProperty(n) && (t[n] = e[n]) },
                            function(t, e) {
                                function n() { this.constructor = t }
                                r(t, e), t.prototype = null === e ? Object.create(e) : (n.prototype = e.prototype, new n)
                            });
                        Object.defineProperty(e, "__esModule", { value: !0 });
                        var i = n(19),
                            a = n(1),
                            u = function(t) {
                                function e(e) { var n = t.call(this, e) || this; return n.text = n.statics.value(n.domNode), n }
                                return o(e, t), e.create = function(t) { return document.createTextNode(t) }, e.value = function(t) { var e = t.data; return e.normalize && (e = e.normalize()), e }, e.prototype.deleteAt = function(t, e) { this.domNode.data = this.text = this.text.slice(0, t) + this.text.slice(t + e) }, e.prototype.index = function(t, e) { return this.domNode === t ? e : -1 }, e.prototype.insertAt = function(e, n, r) { null == r ? (this.text = this.text.slice(0, e) + n + this.text.slice(e), this.domNode.data = this.text) : t.prototype.insertAt.call(this, e, n, r) }, e.prototype.length = function() { return this.text.length }, e.prototype.optimize = function(n) { t.prototype.optimize.call(this, n), this.text = this.statics.value(this.domNode), 0 === this.text.length ? this.remove() : this.next instanceof e && this.next.prev === this && (this.insertAt(this.length(), this.next.value()), this.next.remove()) }, e.prototype.position = function(t, e) { return void 0 === e && (e = !1), [this.domNode, t] }, e.prototype.split = function(t, e) { if (void 0 === e && (e = !1), !e) { if (0 === t) return this; if (t === this.length()) return this.next } var n = a.create(this.domNode.splitText(t)); return this.parent.insertBefore(n, this.next), this.text = this.statics.value(this.domNode), n }, e.prototype.update = function(t, e) {
                                    var n = this;
                                    t.some((function(t) { return "characterData" === t.type && t.target === n.domNode })) && (this.text = this.statics.value(this.domNode))
                                }, e.prototype.value = function() { return this.text }, e.blotName = "text", e.scope = a.Scope.INLINE_BLOT, e
                            }(i.default);
                        e.default = u
                    }, function(t, e, n) {
                        "use strict";
                        var r = document.createElement("div");
                        if (r.classList.toggle("test-class", !1), r.classList.contains("test-class")) {
                            var o = DOMTokenList.prototype.toggle;
                            DOMTokenList.prototype.toggle = function(t, e) { return arguments.length > 1 && !this.contains(t) == !e ? e : o.call(this, t) }
                        }
                        String.prototype.startsWith || (String.prototype.startsWith = function(t, e) { return e = e || 0, this.substr(e, t.length) === t }), String.prototype.endsWith || (String.prototype.endsWith = function(t, e) {
                            var n = this.toString();
                            ("number" != typeof e || !isFinite(e) || Math.floor(e) !== e || e > n.length) && (e = n.length), e -= t.length;
                            var r = n.indexOf(t, e);
                            return -1 !== r && r === e
                        }), Array.prototype.find || Object.defineProperty(Array.prototype, "find", {
                            value: function(t) {
                                if (null === this) throw new TypeError("Array.prototype.find called on null or undefined");
                                if ("function" != typeof t) throw new TypeError("predicate must be a function");
                                for (var e, n = Object(this), r = n.length >>> 0, o = arguments[1], i = 0; i < r; i++)
                                    if (e = n[i], t.call(o, e, i, n)) return e
                            }
                        }), document.addEventListener("DOMContentLoaded", (function() { document.execCommand("enableObjectResizing", !1, !1), document.execCommand("autoUrlDetect", !1, !1) }))
                    }, function(t, e) {
                        var n = -1;

                        function r(t, e, l) {
                            if (t == e) return t ? [
                                [0, t]
                            ] : [];
                            (l < 0 || t.length < l) && (l = null);
                            var c = i(t, e),
                                f = t.substring(0, c);
                            c = a(t = t.substring(c), e = e.substring(c));
                            var h = t.substring(t.length - c),
                                p = function(t, e) {
                                    var u;
                                    if (!t) return [
                                        [1, e]
                                    ];
                                    if (!e) return [
                                        [n, t]
                                    ];
                                    var l = t.length > e.length ? t : e,
                                        s = t.length > e.length ? e : t,
                                        c = l.indexOf(s);
                                    if (-1 != c) return u = [
                                        [1, l.substring(0, c)],
                                        [0, s],
                                        [1, l.substring(c + s.length)]
                                    ], t.length > e.length && (u[0][0] = u[2][0] = n), u;
                                    if (1 == s.length) return [
                                        [n, t],
                                        [1, e]
                                    ];
                                    var f = function(t, e) {
                                        var n = t.length > e.length ? t : e,
                                            r = t.length > e.length ? e : t;
                                        if (n.length < 4 || 2 * r.length < n.length) return null;

                                        function o(t, e, n) {
                                            for (var r, o, u, l, s = t.substring(n, n + Math.floor(t.length / 4)), c = -1, f = ""; - 1 != (c = e.indexOf(s, c + 1));) {
                                                var h = i(t.substring(n), e.substring(c)),
                                                    p = a(t.substring(0, n), e.substring(0, c));
                                                f.length < p + h && (f = e.substring(c - p, c) + e.substring(c, c + h), r = t.substring(0, n - p), o = t.substring(n + h), u = e.substring(0, c - p), l = e.substring(c + h))
                                            }
                                            return 2 * f.length >= t.length ? [r, o, u, l, f] : null
                                        }
                                        var u, l, s, c, f, h = o(n, r, Math.ceil(n.length / 4)),
                                            p = o(n, r, Math.ceil(n.length / 2));
                                        if (!h && !p) return null;
                                        u = p ? h && h[4].length > p[4].length ? h : p : h, t.length > e.length ? (l = u[0], s = u[1], c = u[2], f = u[3]) : (c = u[0], f = u[1], l = u[2], s = u[3]);
                                        var d = u[4];
                                        return [l, s, c, f, d]
                                    }(t, e);
                                    if (f) {
                                        var h = f[0],
                                            p = f[1],
                                            d = f[2],
                                            y = f[3],
                                            v = f[4],
                                            g = r(h, d),
                                            b = r(p, y);
                                        return g.concat([
                                            [0, v]
                                        ], b)
                                    }
                                    return function(t, e) {
                                        for (var r = t.length, i = e.length, a = Math.ceil((r + i) / 2), u = a, l = 2 * a, s = new Array(l), c = new Array(l), f = 0; f < l; f++) s[f] = -1, c[f] = -1;
                                        s[u + 1] = 0, c[u + 1] = 0;
                                        for (var h = r - i, p = h % 2 != 0, d = 0, y = 0, v = 0, g = 0, b = 0; b < a; b++) {
                                            for (var m = -b + d; m <= b - y; m += 2) {
                                                for (var _ = u + m, w = (A = m == -b || m != b && s[_ - 1] < s[_ + 1] ? s[_ + 1] : s[_ - 1] + 1) - m; A < r && w < i && t.charAt(A) == e.charAt(w);) A++, w++;
                                                if (s[_] = A, A > r) y += 2;
                                                else if (w > i) d += 2;
                                                else if (p && (E = u + h - m) >= 0 && E < l && -1 != c[E] && A >= (O = r - c[E])) return o(t, e, A, w)
                                            }
                                            for (var x = -b + v; x <= b - g; x += 2) {
                                                for (var O, E = u + x, k = (O = x == -b || x != b && c[E - 1] < c[E + 1] ? c[E + 1] : c[E - 1] + 1) - x; O < r && k < i && t.charAt(r - O - 1) == e.charAt(i - k - 1);) O++, k++;
                                                if (c[E] = O, O > r) g += 2;
                                                else if (k > i) v += 2;
                                                else if (!p) {
                                                    var A;
                                                    if ((_ = u + h - x) >= 0 && _ < l && -1 != s[_])
                                                        if (w = u + (A = s[_]) - _, A >= (O = r - O)) return o(t, e, A, w)
                                                }
                                            }
                                        }
                                        return [
                                            [n, t],
                                            [1, e]
                                        ]
                                    }(t, e)
                                }(t = t.substring(0, t.length - c), e = e.substring(0, e.length - c));
                            return f && p.unshift([0, f]), h && p.push([0, h]), u(p), null != l && (p = function(t, e) {
                                var r = function(t, e) {
                                        if (0 === e) return [0, t];
                                        for (var r = 0, o = 0; o < t.length; o++) {
                                            var i = t[o];
                                            if (i[0] === n || 0 === i[0]) {
                                                var a = r + i[1].length;
                                                if (e === a) return [o + 1, t];
                                                if (e < a) {
                                                    t = t.slice();
                                                    var u = e - r,
                                                        l = [i[0], i[1].slice(0, u)],
                                                        s = [i[0], i[1].slice(u)];
                                                    return t.splice(o, 1, l, s), [o + 1, t]
                                                }
                                                r = a
                                            }
                                        }
                                        throw new Error("cursor_pos is out of bounds!")
                                    }(t, e),
                                    o = r[1],
                                    i = r[0],
                                    a = o[i],
                                    u = o[i + 1];
                                if (null == a) return t;
                                if (0 !== a[0]) return t;
                                if (null != u && a[1] + u[1] === u[1] + a[1]) return o.splice(i, 2, u, a), s(o, i, 2);
                                if (null != u && 0 === u[1].indexOf(a[1])) { o.splice(i, 2, [u[0], a[1]], [0, a[1]]); var l = u[1].slice(a[1].length); return l.length > 0 && o.splice(i + 2, 0, [u[0], l]), s(o, i, 3) }
                                return t
                            }(p, l)), p = function(t) { for (var e = !1, r = function(t) { return t.charCodeAt(0) >= 56320 && t.charCodeAt(0) <= 57343 }, o = function(t) { return t.charCodeAt(t.length - 1) >= 55296 && t.charCodeAt(t.length - 1) <= 56319 }, i = 2; i < t.length; i += 1) 0 === t[i - 2][0] && o(t[i - 2][1]) && t[i - 1][0] === n && r(t[i - 1][1]) && 1 === t[i][0] && r(t[i][1]) && (e = !0, t[i - 1][1] = t[i - 2][1].slice(-1) + t[i - 1][1], t[i][1] = t[i - 2][1].slice(-1) + t[i][1], t[i - 2][1] = t[i - 2][1].slice(0, -1)); if (!e) return t; var a = []; for (i = 0; i < t.length; i += 1) t[i][1].length > 0 && a.push(t[i]); return a }(p)
                        }

                        function o(t, e, n, o) {
                            var i = t.substring(0, n),
                                a = e.substring(0, o),
                                u = t.substring(n),
                                l = e.substring(o),
                                s = r(i, a),
                                c = r(u, l);
                            return s.concat(c)
                        }

                        function i(t, e) { if (!t || !e || t.charAt(0) != e.charAt(0)) return 0; for (var n = 0, r = Math.min(t.length, e.length), o = r, i = 0; n < o;) t.substring(i, o) == e.substring(i, o) ? i = n = o : r = o, o = Math.floor((r - n) / 2 + n); return o }

                        function a(t, e) { if (!t || !e || t.charAt(t.length - 1) != e.charAt(e.length - 1)) return 0; for (var n = 0, r = Math.min(t.length, e.length), o = r, i = 0; n < o;) t.substring(t.length - o, t.length - i) == e.substring(e.length - o, e.length - i) ? i = n = o : r = o, o = Math.floor((r - n) / 2 + n); return o }

                        function u(t) {
                            t.push([0, ""]);
                            for (var e, r = 0, o = 0, l = 0, s = "", c = ""; r < t.length;) switch (t[r][0]) {
                                case 1:
                                    l++, c += t[r][1], r++;
                                    break;
                                case n:
                                    o++, s += t[r][1], r++;
                                    break;
                                case 0:
                                    o + l > 1 ? (0 !== o && 0 !== l && (0 !== (e = i(c, s)) && (r - o - l > 0 && 0 == t[r - o - l - 1][0] ? t[r - o - l - 1][1] += c.substring(0, e) : (t.splice(0, 0, [0, c.substring(0, e)]), r++), c = c.substring(e), s = s.substring(e)), 0 !== (e = a(c, s)) && (t[r][1] = c.substring(c.length - e) + t[r][1], c = c.substring(0, c.length - e), s = s.substring(0, s.length - e))), 0 === o ? t.splice(r - l, o + l, [1, c]) : 0 === l ? t.splice(r - o, o + l, [n, s]) : t.splice(r - o - l, o + l, [n, s], [1, c]), r = r - o - l + (o ? 1 : 0) + (l ? 1 : 0) + 1) : 0 !== r && 0 == t[r - 1][0] ? (t[r - 1][1] += t[r][1], t.splice(r, 1)) : r++, l = 0, o = 0, s = "", c = ""
                            }
                            "" === t[t.length - 1][1] && t.pop();
                            var f = !1;
                            for (r = 1; r < t.length - 1;) 0 == t[r - 1][0] && 0 == t[r + 1][0] && (t[r][1].substring(t[r][1].length - t[r - 1][1].length) == t[r - 1][1] ? (t[r][1] = t[r - 1][1] + t[r][1].substring(0, t[r][1].length - t[r - 1][1].length), t[r + 1][1] = t[r - 1][1] + t[r + 1][1], t.splice(r - 1, 1), f = !0) : t[r][1].substring(0, t[r + 1][1].length) == t[r + 1][1] && (t[r - 1][1] += t[r + 1][1], t[r][1] = t[r][1].substring(t[r + 1][1].length) + t[r + 1][1], t.splice(r + 1, 1), f = !0)), r++;
                            f && u(t)
                        }
                        var l = r;

                        function s(t, e, n) {
                            for (var r = e + n - 1; r >= 0 && r >= e - 1; r--)
                                if (r + 1 < t.length) {
                                    var o = t[r],
                                        i = t[r + 1];
                                    o[0] === i[1] && t.splice(r, 2, [o[0], o[1] + i[1]])
                                }
                            return t
                        }
                        l.INSERT = 1, l.DELETE = n, l.EQUAL = 0, t.exports = l
                    }, function(t, e) {
                        function n(t) { var e = []; for (var n in t) e.push(n); return e }(t.exports = "function" == typeof Object.keys ? Object.keys : n).shim = n
                    }, function(t, e) {
                        var n = "[object Arguments]" == function() { return Object.prototype.toString.call(arguments) }();

                        function r(t) { return "[object Arguments]" == Object.prototype.toString.call(t) }

                        function o(t) { return t && "object" == typeof t && "number" == typeof t.length && Object.prototype.hasOwnProperty.call(t, "callee") && !Object.prototype.propertyIsEnumerable.call(t, "callee") || !1 }(e = t.exports = n ? r : o).supported = r, e.unsupported = o
                    }, function(t, e) {
                        "use strict";
                        var n = Object.prototype.hasOwnProperty,
                            r = "~";

                        function o() {}

                        function i(t, e, n) { this.fn = t, this.context = e, this.once = n || !1 }

                        function a() { this._events = new o, this._eventsCount = 0 }
                        Object.create && (o.prototype = Object.create(null), (new o).__proto__ || (r = !1)), a.prototype.eventNames = function() { var t, e, o = []; if (0 === this._eventsCount) return o; for (e in t = this._events) n.call(t, e) && o.push(r ? e.slice(1) : e); return Object.getOwnPropertySymbols ? o.concat(Object.getOwnPropertySymbols(t)) : o }, a.prototype.listeners = function(t, e) {
                            var n = r ? r + t : t,
                                o = this._events[n];
                            if (e) return !!o;
                            if (!o) return [];
                            if (o.fn) return [o.fn];
                            for (var i = 0, a = o.length, u = new Array(a); i < a; i++) u[i] = o[i].fn;
                            return u
                        }, a.prototype.emit = function(t, e, n, o, i, a) {
                            var u = r ? r + t : t;
                            if (!this._events[u]) return !1;
                            var l, s, c = this._events[u],
                                f = arguments.length;
                            if (c.fn) {
                                switch (c.once && this.removeListener(t, c.fn, void 0, !0), f) {
                                    case 1:
                                        return c.fn.call(c.context), !0;
                                    case 2:
                                        return c.fn.call(c.context, e), !0;
                                    case 3:
                                        return c.fn.call(c.context, e, n), !0;
                                    case 4:
                                        return c.fn.call(c.context, e, n, o), !0;
                                    case 5:
                                        return c.fn.call(c.context, e, n, o, i), !0;
                                    case 6:
                                        return c.fn.call(c.context, e, n, o, i, a), !0
                                }
                                for (s = 1, l = new Array(f - 1); s < f; s++) l[s - 1] = arguments[s];
                                c.fn.apply(c.context, l)
                            } else {
                                var h, p = c.length;
                                for (s = 0; s < p; s++) switch (c[s].once && this.removeListener(t, c[s].fn, void 0, !0), f) {
                                    case 1:
                                        c[s].fn.call(c[s].context);
                                        break;
                                    case 2:
                                        c[s].fn.call(c[s].context, e);
                                        break;
                                    case 3:
                                        c[s].fn.call(c[s].context, e, n);
                                        break;
                                    case 4:
                                        c[s].fn.call(c[s].context, e, n, o);
                                        break;
                                    default:
                                        if (!l)
                                            for (h = 1, l = new Array(f - 1); h < f; h++) l[h - 1] = arguments[h];
                                        c[s].fn.apply(c[s].context, l)
                                }
                            }
                            return !0
                        }, a.prototype.on = function(t, e, n) {
                            var o = new i(e, n || this),
                                a = r ? r + t : t;
                            return this._events[a] ? this._events[a].fn ? this._events[a] = [this._events[a], o] : this._events[a].push(o) : (this._events[a] = o, this._eventsCount++), this
                        }, a.prototype.once = function(t, e, n) {
                            var o = new i(e, n || this, !0),
                                a = r ? r + t : t;
                            return this._events[a] ? this._events[a].fn ? this._events[a] = [this._events[a], o] : this._events[a].push(o) : (this._events[a] = o, this._eventsCount++), this
                        }, a.prototype.removeListener = function(t, e, n, i) {
                            var a = r ? r + t : t;
                            if (!this._events[a]) return this;
                            if (!e) return 0 == --this._eventsCount ? this._events = new o : delete this._events[a], this;
                            var u = this._events[a];
                            if (u.fn) u.fn !== e || i && !u.once || n && u.context !== n || (0 == --this._eventsCount ? this._events = new o : delete this._events[a]);
                            else {
                                for (var l = 0, s = [], c = u.length; l < c; l++)(u[l].fn !== e || i && !u[l].once || n && u[l].context !== n) && s.push(u[l]);
                                s.length ? this._events[a] = 1 === s.length ? s[0] : s : 0 == --this._eventsCount ? this._events = new o : delete this._events[a]
                            }
                            return this
                        }, a.prototype.removeAllListeners = function(t) { var e; return t ? (e = r ? r + t : t, this._events[e] && (0 == --this._eventsCount ? this._events = new o : delete this._events[e])) : (this._events = new o, this._eventsCount = 0), this }, a.prototype.off = a.prototype.removeListener, a.prototype.addListener = a.prototype.on, a.prototype.setMaxListeners = function() { return this }, a.prefixed = r, a.EventEmitter = a, void 0 !== t && (t.exports = a)
                    }, function(t, e, n) {
                        "use strict";
                        Object.defineProperty(e, "__esModule", { value: !0 }), e.matchText = e.matchSpacing = e.matchNewline = e.matchBlot = e.matchAttributor = e.default = void 0;
                        var r = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) { return typeof t } : function(t) { return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t },
                            o = function(t, e) {
                                if (Array.isArray(t)) return t;
                                if (Symbol.iterator in Object(t)) return function(t, e) {
                                    var n = [],
                                        r = !0,
                                        o = !1,
                                        i = void 0;
                                    try { for (var a, u = t[Symbol.iterator](); !(r = (a = u.next()).done) && (n.push(a.value), !e || n.length !== e); r = !0); } catch (t) { o = !0, i = t } finally { try {!r && u.return && u.return() } finally { if (o) throw i } }
                                    return n
                                }(t, e);
                                throw new TypeError("Invalid attempt to destructure non-iterable instance")
                            },
                            i = function() {
                                function t(t, e) {
                                    for (var n = 0; n < e.length; n++) {
                                        var r = e[n];
                                        r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(t, r.key, r)
                                    }
                                }
                                return function(e, n, r) { return n && t(e.prototype, n), r && t(e, r), e }
                            }(),
                            a = m(n(3)),
                            u = m(n(2)),
                            l = m(n(0)),
                            s = m(n(5)),
                            c = m(n(10)),
                            f = m(n(9)),
                            h = n(36),
                            p = n(37),
                            d = m(n(13)),
                            y = n(26),
                            v = n(38),
                            g = n(39),
                            b = n(40);

                        function m(t) { return t && t.__esModule ? t : { default: t } }

                        function _(t, e, n) { return e in t ? Object.defineProperty(t, e, { value: n, enumerable: !0, configurable: !0, writable: !0 }) : t[e] = n, t }
                        var w = (0, c.default)("quill:clipboard"),
                            x = "__ql-matcher",
                            O = [
                                [Node.TEXT_NODE, I],
                                [Node.TEXT_NODE, R],
                                ["br", function(t, e) { return S(e, "\n") || e.insert("\n"), e }],
                                [Node.ELEMENT_NODE, R],
                                [Node.ELEMENT_NODE, L],
                                [Node.ELEMENT_NODE, M],
                                [Node.ELEMENT_NODE, q],
                                [Node.ELEMENT_NODE, function(t, e) {
                                    var n = {},
                                        r = t.style || {};
                                    return r.fontStyle && "italic" === N(t).fontStyle && (n.italic = !0), r.fontWeight && (N(t).fontWeight.startsWith("bold") || parseInt(N(t).fontWeight) >= 700) && (n.bold = !0), Object.keys(n).length > 0 && (e = j(e, n)), parseFloat(r.textIndent || 0) > 0 && (e = (new u.default).insert("\t").concat(e)), e
                                }],
                                ["li", function(t, e) { var n = l.default.query(t); if (null == n || "list-item" !== n.blotName || !S(e, "\n")) return e; for (var r = -1, o = t.parentNode; !o.classList.contains("ql-clipboard");) "list" === (l.default.query(o) || {}).blotName && (r += 1), o = o.parentNode; return r <= 0 ? e : e.compose((new u.default).retain(e.length() - 1).retain(1, { indent: r })) }],
                                ["b", C.bind(C, "bold")],
                                ["i", C.bind(C, "italic")],
                                ["style", function() { return new u.default }]
                            ],
                            E = [h.AlignAttribute, v.DirectionAttribute].reduce((function(t, e) { return t[e.keyName] = e, t }), {}),
                            k = [h.AlignStyle, p.BackgroundStyle, y.ColorStyle, v.DirectionStyle, g.FontStyle, b.SizeStyle].reduce((function(t, e) { return t[e.keyName] = e, t }), {}),
                            A = function(t) {
                                function e(t, n) {
                                    ! function(t, e) { if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function") }(this, e);
                                    var r = function(t, e) { if (!t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return !e || "object" != typeof e && "function" != typeof e ? t : e }(this, (e.__proto__ || Object.getPrototypeOf(e)).call(this, t, n));
                                    return r.quill.root.addEventListener("paste", r.onPaste.bind(r)), r.container = r.quill.addContainer("ql-clipboard"), r.container.setAttribute("contenteditable", !0), r.container.setAttribute("tabindex", -1), r.matchers = [], O.concat(r.options.matchers).forEach((function(t) {
                                        var e = o(t, 2),
                                            i = e[0],
                                            a = e[1];
                                        (n.matchVisual || a !== M) && r.addMatcher(i, a)
                                    })), r
                                }
                                return function(t, e) {
                                    if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + typeof e);
                                    t.prototype = Object.create(e && e.prototype, { constructor: { value: t, enumerable: !1, writable: !0, configurable: !0 } }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e)
                                }(e, t), i(e, [{ key: "addMatcher", value: function(t, e) { this.matchers.push([t, e]) } }, {
                                    key: "convert",
                                    value: function(t) {
                                        if ("string" == typeof t) return this.container.innerHTML = t.replace(/\>\r?\n +\</g, "><"), this.convert();
                                        var e = this.quill.getFormat(this.quill.selection.savedRange.index);
                                        if (e[d.default.blotName]) { var n = this.container.innerText; return this.container.innerHTML = "", (new u.default).insert(n, _({}, d.default.blotName, e[d.default.blotName])) }
                                        var r = this.prepareMatching(),
                                            i = o(r, 2),
                                            a = i[0],
                                            l = i[1],
                                            s = P(this.container, a, l);
                                        return S(s, "\n") && null == s.ops[s.ops.length - 1].attributes && (s = s.compose((new u.default).retain(s.length() - 1).delete(1))), w.log("convert", this.container.innerHTML, s), this.container.innerHTML = "", s
                                    }
                                }, {
                                    key: "dangerouslyPasteHTML",
                                    value: function(t, e) {
                                        var n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : s.default.sources.API;
                                        if ("string" == typeof t) this.quill.setContents(this.convert(t), e), this.quill.setSelection(0, s.default.sources.SILENT);
                                        else {
                                            var r = this.convert(e);
                                            this.quill.updateContents((new u.default).retain(t).concat(r), n), this.quill.setSelection(t + r.length(), s.default.sources.SILENT)
                                        }
                                    }
                                }, {
                                    key: "onPaste",
                                    value: function(t) {
                                        var e = this;
                                        if (!t.defaultPrevented && this.quill.isEnabled()) {
                                            var n = this.quill.getSelection(),
                                                r = (new u.default).retain(n.index),
                                                o = this.quill.scrollingContainer.scrollTop;
                                            this.container.focus(), this.quill.selection.update(s.default.sources.SILENT), setTimeout((function() { r = r.concat(e.convert()).delete(n.length), e.quill.updateContents(r, s.default.sources.USER), e.quill.setSelection(r.length() - n.length, s.default.sources.SILENT), e.quill.scrollingContainer.scrollTop = o, e.quill.focus() }), 1)
                                        }
                                    }
                                }, {
                                    key: "prepareMatching",
                                    value: function() {
                                        var t = this,
                                            e = [],
                                            n = [];
                                        return this.matchers.forEach((function(r) {
                                            var i = o(r, 2),
                                                a = i[0],
                                                u = i[1];
                                            switch (a) {
                                                case Node.TEXT_NODE:
                                                    n.push(u);
                                                    break;
                                                case Node.ELEMENT_NODE:
                                                    e.push(u);
                                                    break;
                                                default:
                                                    [].forEach.call(t.container.querySelectorAll(a), (function(t) { t[x] = t[x] || [], t[x].push(u) }))
                                            }
                                        })), [e, n]
                                    }
                                }]), e
                            }(f.default);

                        function j(t, e, n) { return "object" === (void 0 === e ? "undefined" : r(e)) ? Object.keys(e).reduce((function(t, n) { return j(t, n, e[n]) }), t) : t.reduce((function(t, r) { return r.attributes && r.attributes[e] ? t.push(r) : t.insert(r.insert, (0, a.default)({}, _({}, e, n), r.attributes)) }), new u.default) }

                        function N(t) { if (t.nodeType !== Node.ELEMENT_NODE) return {}; var e = "__ql-computed-style"; return t[e] || (t[e] = window.getComputedStyle(t)) }

                        function S(t, e) {
                            for (var n = "", r = t.ops.length - 1; r >= 0 && n.length < e.length; --r) {
                                var o = t.ops[r];
                                if ("string" != typeof o.insert) break;
                                n = o.insert + n
                            }
                            return n.slice(-1 * e.length) === e
                        }

                        function T(t) { if (0 === t.childNodes.length) return !1; var e = N(t); return ["block", "list-item"].indexOf(e.display) > -1 }

                        function P(t, e, n) { return t.nodeType === t.TEXT_NODE ? n.reduce((function(e, n) { return n(t, e) }), new u.default) : t.nodeType === t.ELEMENT_NODE ? [].reduce.call(t.childNodes || [], (function(r, o) { var i = P(o, e, n); return o.nodeType === t.ELEMENT_NODE && (i = e.reduce((function(t, e) { return e(o, t) }), i), i = (o[x] || []).reduce((function(t, e) { return e(o, t) }), i)), r.concat(i) }), new u.default) : new u.default }

                        function C(t, e, n) { return j(n, t, !0) }

                        function q(t, e) {
                            var n = l.default.Attributor.Attribute.keys(t),
                                r = l.default.Attributor.Class.keys(t),
                                o = l.default.Attributor.Style.keys(t),
                                i = {};
                            return n.concat(r).concat(o).forEach((function(e) {
                                var n = l.default.query(e, l.default.Scope.ATTRIBUTE);
                                null != n && (i[n.attrName] = n.value(t), i[n.attrName]) || (null == (n = E[e]) || n.attrName !== e && n.keyName !== e || (i[n.attrName] = n.value(t) || void 0), null == (n = k[e]) || n.attrName !== e && n.keyName !== e || (n = k[e], i[n.attrName] = n.value(t) || void 0))
                            })), Object.keys(i).length > 0 && (e = j(e, i)), e
                        }

                        function L(t, e) {
                            var n = l.default.query(t);
                            if (null == n) return e;
                            if (n.prototype instanceof l.default.Embed) {
                                var r = {},
                                    o = n.value(t);
                                null != o && (r[n.blotName] = o, e = (new u.default).insert(r, n.formats(t)))
                            } else "function" == typeof n.formats && (e = j(e, n.blotName, n.formats(t)));
                            return e
                        }

                        function R(t, e) { return S(e, "\n") || (T(t) || e.length() > 0 && t.nextSibling && T(t.nextSibling)) && e.insert("\n"), e }

                        function M(t, e) {
                            if (T(t) && null != t.nextElementSibling && !S(e, "\n\n")) {
                                var n = t.offsetHeight + parseFloat(N(t).marginTop) + parseFloat(N(t).marginBottom);
                                t.nextElementSibling.offsetTop > t.offsetTop + 1.5 * n && e.insert("\n")
                            }
                            return e
                        }

                        function I(t, e) {
                            var n = t.data;
                            if ("O:P" === t.parentNode.tagName) return e.insert(n.trim());
                            if (0 === n.trim().length && t.parentNode.classList.contains("ql-clipboard")) return e;
                            if (!N(t.parentNode).whiteSpace.startsWith("pre")) {
                                var r = function(t, e) { return (e = e.replace(/[^\u00a0]/g, "")).length < 1 && t ? " " : e };
                                n = (n = n.replace(/\r\n/g, " ").replace(/\n/g, " ")).replace(/\s\s+/g, r.bind(r, !0)), (null == t.previousSibling && T(t.parentNode) || null != t.previousSibling && T(t.previousSibling)) && (n = n.replace(/^\s+/, r.bind(r, !1))), (null == t.nextSibling && T(t.parentNode) || null != t.nextSibling && T(t.nextSibling)) && (n = n.replace(/\s+$/, r.bind(r, !1)))
                            }
                            return e.insert(n)
                        }
                        A.DEFAULTS = { matchers: [], matchVisual: !0 }, e.default = A, e.matchAttributor = q, e.matchBlot = L, e.matchNewline = R, e.matchSpacing = M, e.matchText = I
                    }, function(t, e, n) {
                        "use strict";
                        Object.defineProperty(e, "__esModule", { value: !0 });
                        var r, o = function() {
                                function t(t, e) {
                                    for (var n = 0; n < e.length; n++) {
                                        var r = e[n];
                                        r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(t, r.key, r)
                                    }
                                }
                                return function(e, n, r) { return n && t(e.prototype, n), r && t(e, r), e }
                            }(),
                            i = function t(e, n, r) { null === e && (e = Function.prototype); var o = Object.getOwnPropertyDescriptor(e, n); if (void 0 === o) { var i = Object.getPrototypeOf(e); return null === i ? void 0 : t(i, n, r) } if ("value" in o) return o.value; var a = o.get; return void 0 !== a ? a.call(r) : void 0 },
                            a = n(6);

                        function u(t, e) { if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function") }

                        function l(t, e) { if (!t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return !e || "object" != typeof e && "function" != typeof e ? t : e }
                        var s = function(t) {
                            function e() { return u(this, e), l(this, (e.__proto__ || Object.getPrototypeOf(e)).apply(this, arguments)) }
                            return function(t, e) {
                                if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + typeof e);
                                t.prototype = Object.create(e && e.prototype, { constructor: { value: t, enumerable: !1, writable: !0, configurable: !0 } }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e)
                            }(e, t), o(e, [{ key: "optimize", value: function(t) { i(e.prototype.__proto__ || Object.getPrototypeOf(e.prototype), "optimize", this).call(this, t), this.domNode.tagName !== this.statics.tagName[0] && this.replaceWith(this.statics.blotName) } }], [{ key: "create", value: function() { return i(e.__proto__ || Object.getPrototypeOf(e), "create", this).call(this) } }, { key: "formats", value: function() { return !0 } }]), e
                        }(((r = a) && r.__esModule ? r : { default: r }).default);
                        s.blotName = "bold", s.tagName = ["STRONG", "B"], e.default = s
                    }, function(t, e, n) {
                        "use strict";
                        Object.defineProperty(e, "__esModule", { value: !0 }), e.addControls = e.default = void 0;
                        var r = function(t, e) {
                                if (Array.isArray(t)) return t;
                                if (Symbol.iterator in Object(t)) return function(t, e) {
                                    var n = [],
                                        r = !0,
                                        o = !1,
                                        i = void 0;
                                    try { for (var a, u = t[Symbol.iterator](); !(r = (a = u.next()).done) && (n.push(a.value), !e || n.length !== e); r = !0); } catch (t) { o = !0, i = t } finally { try {!r && u.return && u.return() } finally { if (o) throw i } }
                                    return n
                                }(t, e);
                                throw new TypeError("Invalid attempt to destructure non-iterable instance")
                            },
                            o = function() {
                                function t(t, e) {
                                    for (var n = 0; n < e.length; n++) {
                                        var r = e[n];
                                        r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(t, r.key, r)
                                    }
                                }
                                return function(e, n, r) { return n && t(e.prototype, n), r && t(e, r), e }
                            }(),
                            i = c(n(2)),
                            a = c(n(0)),
                            u = c(n(5)),
                            l = c(n(10)),
                            s = c(n(9));

                        function c(t) { return t && t.__esModule ? t : { default: t } }

                        function f(t, e) { if (!t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return !e || "object" != typeof e && "function" != typeof e ? t : e }
                        var h = (0, l.default)("quill:toolbar"),
                            p = function(t) {
                                function e(t, n) {
                                    ! function(t, e) { if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function") }(this, e);
                                    var o, i = f(this, (e.__proto__ || Object.getPrototypeOf(e)).call(this, t, n));
                                    if (Array.isArray(i.options.container)) {
                                        var a = document.createElement("div");
                                        y(a, i.options.container), t.container.parentNode.insertBefore(a, t.container), i.container = a
                                    } else "string" == typeof i.options.container ? i.container = document.querySelector(i.options.container) : i.container = i.options.container;
                                    return i.container instanceof HTMLElement ? (i.container.classList.add("ql-toolbar"), i.controls = [], i.handlers = {}, Object.keys(i.options.handlers).forEach((function(t) { i.addHandler(t, i.options.handlers[t]) })), [].forEach.call(i.container.querySelectorAll("button, select"), (function(t) { i.attach(t) })), i.quill.on(u.default.events.EDITOR_CHANGE, (function(t, e) { t === u.default.events.SELECTION_CHANGE && i.update(e) })), i.quill.on(u.default.events.SCROLL_OPTIMIZE, (function() {
                                        var t = i.quill.selection.getRange(),
                                            e = r(t, 1)[0];
                                        i.update(e)
                                    })), i) : (o = h.error("Container required for toolbar", i.options), f(i, o))
                                }
                                return function(t, e) {
                                    if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + typeof e);
                                    t.prototype = Object.create(e && e.prototype, { constructor: { value: t, enumerable: !1, writable: !0, configurable: !0 } }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e)
                                }(e, t), o(e, [{ key: "addHandler", value: function(t, e) { this.handlers[t] = e } }, {
                                    key: "attach",
                                    value: function(t) {
                                        var e = this,
                                            n = [].find.call(t.classList, (function(t) { return 0 === t.indexOf("ql-") }));
                                        if (n) {
                                            if (n = n.slice("ql-".length), "BUTTON" === t.tagName && t.setAttribute("type", "button"), null == this.handlers[n]) { if (null != this.quill.scroll.whitelist && null == this.quill.scroll.whitelist[n]) return void h.warn("ignoring attaching to disabled format", n, t); if (null == a.default.query(n)) return void h.warn("ignoring attaching to nonexistent format", n, t) }
                                            var o = "SELECT" === t.tagName ? "change" : "click";
                                            t.addEventListener(o, (function(o) {
                                                var l = void 0;
                                                if ("SELECT" === t.tagName) {
                                                    if (t.selectedIndex < 0) return;
                                                    var s = t.options[t.selectedIndex];
                                                    l = !s.hasAttribute("selected") && (s.value || !1)
                                                } else l = !t.classList.contains("ql-active") && (t.value || !t.hasAttribute("value")), o.preventDefault();
                                                e.quill.focus();
                                                var c = e.quill.selection.getRange(),
                                                    f = r(c, 1)[0];
                                                if (null != e.handlers[n]) e.handlers[n].call(e, l);
                                                else if (a.default.query(n).prototype instanceof a.default.Embed) {
                                                    if (!(l = prompt("Enter " + n))) return;
                                                    e.quill.updateContents((new i.default).retain(f.index).delete(f.length).insert(function(t, e, n) { return e in t ? Object.defineProperty(t, e, { value: n, enumerable: !0, configurable: !0, writable: !0 }) : t[e] = n, t }({}, n, l)), u.default.sources.USER)
                                                } else e.quill.format(n, l, u.default.sources.USER);
                                                e.update(f)
                                            })), this.controls.push([n, t])
                                        }
                                    }
                                }, {
                                    key: "update",
                                    value: function(t) {
                                        var e = null == t ? {} : this.quill.getFormat(t);
                                        this.controls.forEach((function(n) {
                                            var o = r(n, 2),
                                                i = o[0],
                                                a = o[1];
                                            if ("SELECT" === a.tagName) {
                                                var u = void 0;
                                                if (null == t) u = null;
                                                else if (null == e[i]) u = a.querySelector("option[selected]");
                                                else if (!Array.isArray(e[i])) { var l = e[i]; "string" == typeof l && (l = l.replace(/\"/g, '\\"')), u = a.querySelector('option[value="' + l + '"]') }
                                                null == u ? (a.value = "", a.selectedIndex = -1) : u.selected = !0
                                            } else if (null == t) a.classList.remove("ql-active");
                                            else if (a.hasAttribute("value")) {
                                                var s = e[i] === a.getAttribute("value") || null != e[i] && e[i].toString() === a.getAttribute("value") || null == e[i] && !a.getAttribute("value");
                                                a.classList.toggle("ql-active", s)
                                            } else a.classList.toggle("ql-active", null != e[i])
                                        }))
                                    }
                                }]), e
                            }(s.default);

                        function d(t, e, n) {
                            var r = document.createElement("button");
                            r.setAttribute("type", "button"), r.classList.add("ql-" + e), null != n && (r.value = n), t.appendChild(r)
                        }

                        function y(t, e) {
                            Array.isArray(e[0]) || (e = [e]), e.forEach((function(e) {
                                var n = document.createElement("span");
                                n.classList.add("ql-formats"), e.forEach((function(t) {
                                    if ("string" == typeof t) d(n, t);
                                    else {
                                        var e = Object.keys(t)[0],
                                            r = t[e];
                                        Array.isArray(r) ? function(t, e, n) {
                                            var r = document.createElement("select");
                                            r.classList.add("ql-" + e), n.forEach((function(t) { var e = document.createElement("option");!1 !== t ? e.setAttribute("value", t) : e.setAttribute("selected", "selected"), r.appendChild(e) })), t.appendChild(r)
                                        }(n, e, r) : d(n, e, r)
                                    }
                                })), t.appendChild(n)
                            }))
                        }
                        p.DEFAULTS = {}, p.DEFAULTS = {
                            container: null,
                            handlers: {
                                clean: function() {
                                    var t = this,
                                        e = this.quill.getSelection();
                                    if (null != e)
                                        if (0 == e.length) {
                                            var n = this.quill.getFormat();
                                            Object.keys(n).forEach((function(e) { null != a.default.query(e, a.default.Scope.INLINE) && t.quill.format(e, !1) }))
                                        } else this.quill.removeFormat(e, u.default.sources.USER)
                                },
                                direction: function(t) { var e = this.quill.getFormat().align; "rtl" === t && null == e ? this.quill.format("align", "right", u.default.sources.USER) : t || "right" !== e || this.quill.format("align", !1, u.default.sources.USER), this.quill.format("direction", t, u.default.sources.USER) },
                                indent: function(t) {
                                    var e = this.quill.getSelection(),
                                        n = this.quill.getFormat(e),
                                        r = parseInt(n.indent || 0);
                                    if ("+1" === t || "-1" === t) { var o = "+1" === t ? 1 : -1; "rtl" === n.direction && (o *= -1), this.quill.format("indent", r + o, u.default.sources.USER) }
                                },
                                link: function(t) {!0 === t && (t = prompt("Enter link URL:")), this.quill.format("link", t, u.default.sources.USER) },
                                list: function(t) {
                                    var e = this.quill.getSelection(),
                                        n = this.quill.getFormat(e);
                                    "check" === t ? "checked" === n.list || "unchecked" === n.list ? this.quill.format("list", !1, u.default.sources.USER) : this.quill.format("list", "unchecked", u.default.sources.USER) : this.quill.format("list", t, u.default.sources.USER)
                                }
                            }
                        }, e.default = p, e.addControls = y
                    }, function(t, e) { t.exports = '<svg viewbox="0 0 18 18"> <polyline class="ql-even ql-stroke" points="5 7 3 9 5 11"></polyline> <polyline class="ql-even ql-stroke" points="13 7 15 9 13 11"></polyline> <line class=ql-stroke x1=10 x2=8 y1=5 y2=13></line> </svg>' }, function(t, e, n) {
                        "use strict";
                        Object.defineProperty(e, "__esModule", { value: !0 });
                        var r, o = function() {
                                function t(t, e) {
                                    for (var n = 0; n < e.length; n++) {
                                        var r = e[n];
                                        r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(t, r.key, r)
                                    }
                                }
                                return function(e, n, r) { return n && t(e.prototype, n), r && t(e, r), e }
                            }(),
                            i = function t(e, n, r) { null === e && (e = Function.prototype); var o = Object.getOwnPropertyDescriptor(e, n); if (void 0 === o) { var i = Object.getPrototypeOf(e); return null === i ? void 0 : t(i, n, r) } if ("value" in o) return o.value; var a = o.get; return void 0 !== a ? a.call(r) : void 0 },
                            a = n(28),
                            u = function(t) {
                                function e(t, n) {! function(t, e) { if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function") }(this, e); var r = function(t, e) { if (!t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return !e || "object" != typeof e && "function" != typeof e ? t : e }(this, (e.__proto__ || Object.getPrototypeOf(e)).call(this, t)); return r.label.innerHTML = n, r.container.classList.add("ql-color-picker"), [].slice.call(r.container.querySelectorAll(".ql-picker-item"), 0, 7).forEach((function(t) { t.classList.add("ql-primary") })), r }
                                return function(t, e) {
                                    if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + typeof e);
                                    t.prototype = Object.create(e && e.prototype, { constructor: { value: t, enumerable: !1, writable: !0, configurable: !0 } }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e)
                                }(e, t), o(e, [{ key: "buildItem", value: function(t) { var n = i(e.prototype.__proto__ || Object.getPrototypeOf(e.prototype), "buildItem", this).call(this, t); return n.style.backgroundColor = t.getAttribute("value") || "", n } }, {
                                    key: "selectItem",
                                    value: function(t, n) {
                                        i(e.prototype.__proto__ || Object.getPrototypeOf(e.prototype), "selectItem", this).call(this, t, n);
                                        var r = this.label.querySelector(".ql-color-label"),
                                            o = t && t.getAttribute("data-value") || "";
                                        r && ("line" === r.tagName ? r.style.stroke = o : r.style.fill = o)
                                    }
                                }]), e
                            }(((r = a) && r.__esModule ? r : { default: r }).default);
                        e.default = u
                    }, function(t, e, n) {
                        "use strict";
                        Object.defineProperty(e, "__esModule", { value: !0 });
                        var r, o = function() {
                                function t(t, e) {
                                    for (var n = 0; n < e.length; n++) {
                                        var r = e[n];
                                        r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(t, r.key, r)
                                    }
                                }
                                return function(e, n, r) { return n && t(e.prototype, n), r && t(e, r), e }
                            }(),
                            i = function t(e, n, r) { null === e && (e = Function.prototype); var o = Object.getOwnPropertyDescriptor(e, n); if (void 0 === o) { var i = Object.getPrototypeOf(e); return null === i ? void 0 : t(i, n, r) } if ("value" in o) return o.value; var a = o.get; return void 0 !== a ? a.call(r) : void 0 },
                            a = n(28),
                            u = function(t) {
                                function e(t, n) {! function(t, e) { if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function") }(this, e); var r = function(t, e) { if (!t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return !e || "object" != typeof e && "function" != typeof e ? t : e }(this, (e.__proto__ || Object.getPrototypeOf(e)).call(this, t)); return r.container.classList.add("ql-icon-picker"), [].forEach.call(r.container.querySelectorAll(".ql-picker-item"), (function(t) { t.innerHTML = n[t.getAttribute("data-value") || ""] })), r.defaultItem = r.container.querySelector(".ql-selected"), r.selectItem(r.defaultItem), r }
                                return function(t, e) {
                                    if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + typeof e);
                                    t.prototype = Object.create(e && e.prototype, { constructor: { value: t, enumerable: !1, writable: !0, configurable: !0 } }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e)
                                }(e, t), o(e, [{ key: "selectItem", value: function(t, n) { i(e.prototype.__proto__ || Object.getPrototypeOf(e.prototype), "selectItem", this).call(this, t, n), t = t || this.defaultItem, this.label.innerHTML = t.innerHTML } }]), e
                            }(((r = a) && r.__esModule ? r : { default: r }).default);
                        e.default = u
                    }, function(t, e, n) {
                        "use strict";
                        Object.defineProperty(e, "__esModule", { value: !0 });
                        var r = function() {
                                function t(t, e) {
                                    for (var n = 0; n < e.length; n++) {
                                        var r = e[n];
                                        r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(t, r.key, r)
                                    }
                                }
                                return function(e, n, r) { return n && t(e.prototype, n), r && t(e, r), e }
                            }(),
                            o = function() {
                                function t(e, n) { var r = this;! function(t, e) { if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function") }(this, t), this.quill = e, this.boundsContainer = n || document.body, this.root = e.addContainer("ql-tooltip"), this.root.innerHTML = this.constructor.TEMPLATE, this.quill.root === this.quill.scrollingContainer && this.quill.root.addEventListener("scroll", (function() { r.root.style.marginTop = -1 * r.quill.root.scrollTop + "px" })), this.hide() }
                                return r(t, [{ key: "hide", value: function() { this.root.classList.add("ql-hidden") } }, {
                                    key: "position",
                                    value: function(t) {
                                        var e = t.left + t.width / 2 - this.root.offsetWidth / 2,
                                            n = t.bottom + this.quill.root.scrollTop;
                                        this.root.style.left = e + "px", this.root.style.top = n + "px", this.root.classList.remove("ql-flip");
                                        var r = this.boundsContainer.getBoundingClientRect(),
                                            o = this.root.getBoundingClientRect(),
                                            i = 0;
                                        if (o.right > r.right && (i = r.right - o.right, this.root.style.left = e + i + "px"), o.left < r.left && (i = r.left - o.left, this.root.style.left = e + i + "px"), o.bottom > r.bottom) {
                                            var a = o.bottom - o.top,
                                                u = t.bottom - t.top + a;
                                            this.root.style.top = n - u + "px", this.root.classList.add("ql-flip")
                                        }
                                        return i
                                    }
                                }, { key: "show", value: function() { this.root.classList.remove("ql-editing"), this.root.classList.remove("ql-hidden") } }]), t
                            }();
                        e.default = o
                    }, function(t, e, n) {
                        "use strict";
                        Object.defineProperty(e, "__esModule", { value: !0 });
                        var r = function(t, e) {
                                if (Array.isArray(t)) return t;
                                if (Symbol.iterator in Object(t)) return function(t, e) {
                                    var n = [],
                                        r = !0,
                                        o = !1,
                                        i = void 0;
                                    try { for (var a, u = t[Symbol.iterator](); !(r = (a = u.next()).done) && (n.push(a.value), !e || n.length !== e); r = !0); } catch (t) { o = !0, i = t } finally { try {!r && u.return && u.return() } finally { if (o) throw i } }
                                    return n
                                }(t, e);
                                throw new TypeError("Invalid attempt to destructure non-iterable instance")
                            },
                            o = function t(e, n, r) { null === e && (e = Function.prototype); var o = Object.getOwnPropertyDescriptor(e, n); if (void 0 === o) { var i = Object.getPrototypeOf(e); return null === i ? void 0 : t(i, n, r) } if ("value" in o) return o.value; var a = o.get; return void 0 !== a ? a.call(r) : void 0 },
                            i = function() {
                                function t(t, e) {
                                    for (var n = 0; n < e.length; n++) {
                                        var r = e[n];
                                        r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(t, r.key, r)
                                    }
                                }
                                return function(e, n, r) { return n && t(e.prototype, n), r && t(e, r), e }
                            }(),
                            a = p(n(3)),
                            u = p(n(8)),
                            l = n(43),
                            s = p(l),
                            c = p(n(27)),
                            f = n(15),
                            h = p(n(41));

                        function p(t) { return t && t.__esModule ? t : { default: t } }

                        function d(t, e) { if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function") }

                        function y(t, e) { if (!t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return !e || "object" != typeof e && "function" != typeof e ? t : e }

                        function v(t, e) {
                            if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + typeof e);
                            t.prototype = Object.create(e && e.prototype, { constructor: { value: t, enumerable: !1, writable: !0, configurable: !0 } }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e)
                        }
                        var g = [
                                [{ header: ["1", "2", "3", !1] }],
                                ["bold", "italic", "underline", "link"],
                                [{ list: "ordered" }, { list: "bullet" }],
                                ["clean"]
                            ],
                            b = function(t) {
                                function e(t, n) { d(this, e), null != n.modules.toolbar && null == n.modules.toolbar.container && (n.modules.toolbar.container = g); var r = y(this, (e.__proto__ || Object.getPrototypeOf(e)).call(this, t, n)); return r.quill.container.classList.add("ql-snow"), r }
                                return v(e, t), i(e, [{ key: "extendToolbar", value: function(t) { t.container.classList.add("ql-snow"), this.buildButtons([].slice.call(t.container.querySelectorAll("button")), h.default), this.buildPickers([].slice.call(t.container.querySelectorAll("select")), h.default), this.tooltip = new m(this.quill, this.options.bounds), t.container.querySelector(".ql-link") && this.quill.keyboard.addBinding({ key: "K", shortKey: !0 }, (function(e, n) { t.handlers.link.call(t, !n.format.link) })) } }]), e
                            }(s.default);
                        b.DEFAULTS = (0, a.default)(!0, {}, s.default.DEFAULTS, { modules: { toolbar: { handlers: { link: function(t) { if (t) { var e = this.quill.getSelection(); if (null == e || 0 == e.length) return; var n = this.quill.getText(e); /^\S+@\S+\.\S+$/.test(n) && 0 !== n.indexOf("mailto:") && (n = "mailto:" + n), this.quill.theme.tooltip.edit("link", n) } else this.quill.format("link", !1) } } } } });
                        var m = function(t) {
                            function e(t, n) { d(this, e); var r = y(this, (e.__proto__ || Object.getPrototypeOf(e)).call(this, t, n)); return r.preview = r.root.querySelector("a.ql-preview"), r }
                            return v(e, t), i(e, [{
                                key: "listen",
                                value: function() {
                                    var t = this;
                                    o(e.prototype.__proto__ || Object.getPrototypeOf(e.prototype), "listen", this).call(this), this.root.querySelector("a.ql-action").addEventListener("click", (function(e) { t.root.classList.contains("ql-editing") ? t.save() : t.edit("link", t.preview.textContent), e.preventDefault() })), this.root.querySelector("a.ql-remove").addEventListener("click", (function(e) {
                                        if (null != t.linkRange) {
                                            var n = t.linkRange;
                                            t.restoreFocus(), t.quill.formatText(n, "link", !1, u.default.sources.USER), delete t.linkRange
                                        }
                                        e.preventDefault(), t.hide()
                                    })), this.quill.on(u.default.events.SELECTION_CHANGE, (function(e, n, o) {
                                        if (null != e) {
                                            if (0 === e.length && o === u.default.sources.USER) {
                                                var i = t.quill.scroll.descendant(c.default, e.index),
                                                    a = r(i, 2),
                                                    l = a[0],
                                                    s = a[1];
                                                if (null != l) { t.linkRange = new f.Range(e.index - s, l.length()); var h = c.default.formats(l.domNode); return t.preview.textContent = h, t.preview.setAttribute("href", h), t.show(), void t.position(t.quill.getBounds(t.linkRange)) }
                                            } else delete t.linkRange;
                                            t.hide()
                                        }
                                    }))
                                }
                            }, { key: "show", value: function() { o(e.prototype.__proto__ || Object.getPrototypeOf(e.prototype), "show", this).call(this), this.root.removeAttribute("data-mode") } }]), e
                        }(l.BaseTooltip);
                        m.TEMPLATE = ['<a class="ql-preview" rel="noopener noreferrer" target="_blank" href="about:blank"></a>', '<input type="text" data-formula="e=mc^2" data-link="https://quilljs.com" data-video="Embed URL">', '<a class="ql-action"></a>', '<a class="ql-remove"></a>'].join(""), e.default = b
                    }, function(t, e, n) {
                        "use strict";
                        Object.defineProperty(e, "__esModule", { value: !0 });
                        var r = R(n(29)),
                            o = n(36),
                            i = n(38),
                            a = n(64),
                            u = R(n(65)),
                            l = R(n(66)),
                            s = n(67),
                            c = R(s),
                            f = n(37),
                            h = n(26),
                            p = n(39),
                            d = n(40),
                            y = R(n(56)),
                            v = R(n(68)),
                            g = R(n(27)),
                            b = R(n(69)),
                            m = R(n(70)),
                            _ = R(n(71)),
                            w = R(n(72)),
                            x = R(n(73)),
                            O = n(13),
                            E = R(O),
                            k = R(n(74)),
                            A = R(n(75)),
                            j = R(n(57)),
                            N = R(n(41)),
                            S = R(n(28)),
                            T = R(n(59)),
                            P = R(n(60)),
                            C = R(n(61)),
                            q = R(n(108)),
                            L = R(n(62));

                        function R(t) { return t && t.__esModule ? t : { default: t } }
                        r.default.register({ "attributors/attribute/direction": i.DirectionAttribute, "attributors/class/align": o.AlignClass, "attributors/class/background": f.BackgroundClass, "attributors/class/color": h.ColorClass, "attributors/class/direction": i.DirectionClass, "attributors/class/font": p.FontClass, "attributors/class/size": d.SizeClass, "attributors/style/align": o.AlignStyle, "attributors/style/background": f.BackgroundStyle, "attributors/style/color": h.ColorStyle, "attributors/style/direction": i.DirectionStyle, "attributors/style/font": p.FontStyle, "attributors/style/size": d.SizeStyle }, !0), r.default.register({ "formats/align": o.AlignClass, "formats/direction": i.DirectionClass, "formats/indent": a.IndentClass, "formats/background": f.BackgroundStyle, "formats/color": h.ColorStyle, "formats/font": p.FontClass, "formats/size": d.SizeClass, "formats/blockquote": u.default, "formats/code-block": E.default, "formats/header": l.default, "formats/list": c.default, "formats/bold": y.default, "formats/code": O.Code, "formats/italic": v.default, "formats/link": g.default, "formats/script": b.default, "formats/strike": m.default, "formats/underline": _.default, "formats/image": w.default, "formats/video": x.default, "formats/list/item": s.ListItem, "modules/formula": k.default, "modules/syntax": A.default, "modules/toolbar": j.default, "themes/bubble": q.default, "themes/snow": L.default, "ui/icons": N.default, "ui/picker": S.default, "ui/icon-picker": P.default, "ui/color-picker": T.default, "ui/tooltip": C.default }, !0), e.default = r.default
                    }, function(t, e, n) {
                        "use strict";
                        Object.defineProperty(e, "__esModule", { value: !0 }), e.IndentClass = void 0;
                        var r, o = function() {
                                function t(t, e) {
                                    for (var n = 0; n < e.length; n++) {
                                        var r = e[n];
                                        r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(t, r.key, r)
                                    }
                                }
                                return function(e, n, r) { return n && t(e.prototype, n), r && t(e, r), e }
                            }(),
                            i = function t(e, n, r) { null === e && (e = Function.prototype); var o = Object.getOwnPropertyDescriptor(e, n); if (void 0 === o) { var i = Object.getPrototypeOf(e); return null === i ? void 0 : t(i, n, r) } if ("value" in o) return o.value; var a = o.get; return void 0 !== a ? a.call(r) : void 0 },
                            a = n(0),
                            u = (r = a) && r.__esModule ? r : { default: r };

                        function l(t, e) { if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function") }

                        function s(t, e) { if (!t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return !e || "object" != typeof e && "function" != typeof e ? t : e }
                        var c = function(t) {
                                function e() { return l(this, e), s(this, (e.__proto__ || Object.getPrototypeOf(e)).apply(this, arguments)) }
                                return function(t, e) {
                                    if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + typeof e);
                                    t.prototype = Object.create(e && e.prototype, { constructor: { value: t, enumerable: !1, writable: !0, configurable: !0 } }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e)
                                }(e, t), o(e, [{
                                    key: "add",
                                    value: function(t, n) {
                                        if ("+1" === n || "-1" === n) {
                                            var r = this.value(t) || 0;
                                            n = "+1" === n ? r + 1 : r - 1
                                        }
                                        return 0 === n ? (this.remove(t), !0) : i(e.prototype.__proto__ || Object.getPrototypeOf(e.prototype), "add", this).call(this, t, n)
                                    }
                                }, { key: "canAdd", value: function(t, n) { return i(e.prototype.__proto__ || Object.getPrototypeOf(e.prototype), "canAdd", this).call(this, t, n) || i(e.prototype.__proto__ || Object.getPrototypeOf(e.prototype), "canAdd", this).call(this, t, parseInt(n)) } }, { key: "value", value: function(t) { return parseInt(i(e.prototype.__proto__ || Object.getPrototypeOf(e.prototype), "value", this).call(this, t)) || void 0 } }]), e
                            }(u.default.Attributor.Class),
                            f = new c("indent", "ql-indent", { scope: u.default.Scope.BLOCK, whitelist: [1, 2, 3, 4, 5, 6, 7, 8] });
                        e.IndentClass = f
                    }, function(t, e, n) {
                        "use strict";
                        Object.defineProperty(e, "__esModule", { value: !0 });
                        var r, o = n(4);

                        function i(t, e) { if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function") }

                        function a(t, e) { if (!t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return !e || "object" != typeof e && "function" != typeof e ? t : e }
                        var u = function(t) {
                            function e() { return i(this, e), a(this, (e.__proto__ || Object.getPrototypeOf(e)).apply(this, arguments)) }
                            return function(t, e) {
                                if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + typeof e);
                                t.prototype = Object.create(e && e.prototype, { constructor: { value: t, enumerable: !1, writable: !0, configurable: !0 } }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e)
                            }(e, t), e
                        }(((r = o) && r.__esModule ? r : { default: r }).default);
                        u.blotName = "blockquote", u.tagName = "blockquote", e.default = u
                    }, function(t, e, n) {
                        "use strict";
                        Object.defineProperty(e, "__esModule", { value: !0 });
                        var r, o = function() {
                                function t(t, e) {
                                    for (var n = 0; n < e.length; n++) {
                                        var r = e[n];
                                        r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(t, r.key, r)
                                    }
                                }
                                return function(e, n, r) { return n && t(e.prototype, n), r && t(e, r), e }
                            }(),
                            i = n(4);

                        function a(t, e) { if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function") }

                        function u(t, e) { if (!t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return !e || "object" != typeof e && "function" != typeof e ? t : e }
                        var l = function(t) {
                            function e() { return a(this, e), u(this, (e.__proto__ || Object.getPrototypeOf(e)).apply(this, arguments)) }
                            return function(t, e) {
                                if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + typeof e);
                                t.prototype = Object.create(e && e.prototype, { constructor: { value: t, enumerable: !1, writable: !0, configurable: !0 } }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e)
                            }(e, t), o(e, null, [{ key: "formats", value: function(t) { return this.tagName.indexOf(t.tagName) + 1 } }]), e
                        }(((r = i) && r.__esModule ? r : { default: r }).default);
                        l.blotName = "header", l.tagName = ["H1", "H2", "H3", "H4", "H5", "H6"], e.default = l
                    }, function(t, e, n) {
                        "use strict";
                        Object.defineProperty(e, "__esModule", { value: !0 }), e.default = e.ListItem = void 0;
                        var r = function() {
                                function t(t, e) {
                                    for (var n = 0; n < e.length; n++) {
                                        var r = e[n];
                                        r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(t, r.key, r)
                                    }
                                }
                                return function(e, n, r) { return n && t(e.prototype, n), r && t(e, r), e }
                            }(),
                            o = function t(e, n, r) { null === e && (e = Function.prototype); var o = Object.getOwnPropertyDescriptor(e, n); if (void 0 === o) { var i = Object.getPrototypeOf(e); return null === i ? void 0 : t(i, n, r) } if ("value" in o) return o.value; var a = o.get; return void 0 !== a ? a.call(r) : void 0 },
                            i = l(n(0)),
                            a = l(n(4)),
                            u = l(n(25));

                        function l(t) { return t && t.__esModule ? t : { default: t } }

                        function s(t, e) { if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function") }

                        function c(t, e) { if (!t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return !e || "object" != typeof e && "function" != typeof e ? t : e }

                        function f(t, e) {
                            if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + typeof e);
                            t.prototype = Object.create(e && e.prototype, { constructor: { value: t, enumerable: !1, writable: !0, configurable: !0 } }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e)
                        }
                        var h = function(t) {
                            function e() { return s(this, e), c(this, (e.__proto__ || Object.getPrototypeOf(e)).apply(this, arguments)) }
                            return f(e, t), r(e, [{ key: "format", value: function(t, n) { t !== p.blotName || n ? o(e.prototype.__proto__ || Object.getPrototypeOf(e.prototype), "format", this).call(this, t, n) : this.replaceWith(i.default.create(this.statics.scope)) } }, { key: "remove", value: function() { null == this.prev && null == this.next ? this.parent.remove() : o(e.prototype.__proto__ || Object.getPrototypeOf(e.prototype), "remove", this).call(this) } }, { key: "replaceWith", value: function(t, n) { return this.parent.isolate(this.offset(this.parent), this.length()), t === this.parent.statics.blotName ? (this.parent.replaceWith(t, n), this) : (this.parent.unwrap(), o(e.prototype.__proto__ || Object.getPrototypeOf(e.prototype), "replaceWith", this).call(this, t, n)) } }], [{ key: "formats", value: function(t) { return t.tagName === this.tagName ? void 0 : o(e.__proto__ || Object.getPrototypeOf(e), "formats", this).call(this, t) } }]), e
                        }(a.default);
                        h.blotName = "list-item", h.tagName = "LI";
                        var p = function(t) {
                            function e(t) {
                                s(this, e);
                                var n = c(this, (e.__proto__ || Object.getPrototypeOf(e)).call(this, t)),
                                    r = function(e) {
                                        if (e.target.parentNode === t) {
                                            var r = n.statics.formats(t),
                                                o = i.default.find(e.target);
                                            "checked" === r ? o.format("list", "unchecked") : "unchecked" === r && o.format("list", "checked")
                                        }
                                    };
                                return t.addEventListener("touchstart", r), t.addEventListener("mousedown", r), n
                            }
                            return f(e, t), r(e, null, [{
                                key: "create",
                                value: function(t) {
                                    var n = "ordered" === t ? "OL" : "UL",
                                        r = o(e.__proto__ || Object.getPrototypeOf(e), "create", this).call(this, n);
                                    return "checked" !== t && "unchecked" !== t || r.setAttribute("data-checked", "checked" === t), r
                                }
                            }, { key: "formats", value: function(t) { return "OL" === t.tagName ? "ordered" : "UL" === t.tagName ? t.hasAttribute("data-checked") ? "true" === t.getAttribute("data-checked") ? "checked" : "unchecked" : "bullet" : void 0 } }]), r(e, [{ key: "format", value: function(t, e) { this.children.length > 0 && this.children.tail.format(t, e) } }, { key: "formats", value: function() { return t = {}, e = this.statics.blotName, n = this.statics.formats(this.domNode), e in t ? Object.defineProperty(t, e, { value: n, enumerable: !0, configurable: !0, writable: !0 }) : t[e] = n, t; var t, e, n } }, {
                                key: "insertBefore",
                                value: function(t, n) {
                                    if (t instanceof h) o(e.prototype.__proto__ || Object.getPrototypeOf(e.prototype), "insertBefore", this).call(this, t, n);
                                    else {
                                        var r = null == n ? this.length() : n.offset(this),
                                            i = this.split(r);
                                        i.parent.insertBefore(t, i)
                                    }
                                }
                            }, {
                                key: "optimize",
                                value: function(t) {
                                    o(e.prototype.__proto__ || Object.getPrototypeOf(e.prototype), "optimize", this).call(this, t);
                                    var n = this.next;
                                    null != n && n.prev === this && n.statics.blotName === this.statics.blotName && n.domNode.tagName === this.domNode.tagName && n.domNode.getAttribute("data-checked") === this.domNode.getAttribute("data-checked") && (n.moveChildren(this), n.remove())
                                }
                            }, {
                                key: "replace",
                                value: function(t) {
                                    if (t.statics.blotName !== this.statics.blotName) {
                                        var n = i.default.create(this.statics.defaultChild);
                                        t.moveChildren(n), this.appendChild(n)
                                    }
                                    o(e.prototype.__proto__ || Object.getPrototypeOf(e.prototype), "replace", this).call(this, t)
                                }
                            }]), e
                        }(u.default);
                        p.blotName = "list", p.scope = i.default.Scope.BLOCK_BLOT, p.tagName = ["OL", "UL"], p.defaultChild = "list-item", p.allowedChildren = [h], e.ListItem = h, e.default = p
                    }, function(t, e, n) {
                        "use strict";
                        Object.defineProperty(e, "__esModule", { value: !0 });
                        var r, o = n(56);

                        function i(t, e) { if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function") }

                        function a(t, e) { if (!t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return !e || "object" != typeof e && "function" != typeof e ? t : e }
                        var u = function(t) {
                            function e() { return i(this, e), a(this, (e.__proto__ || Object.getPrototypeOf(e)).apply(this, arguments)) }
                            return function(t, e) {
                                if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + typeof e);
                                t.prototype = Object.create(e && e.prototype, { constructor: { value: t, enumerable: !1, writable: !0, configurable: !0 } }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e)
                            }(e, t), e
                        }(((r = o) && r.__esModule ? r : { default: r }).default);
                        u.blotName = "italic", u.tagName = ["EM", "I"], e.default = u
                    }, function(t, e, n) {
                        "use strict";
                        Object.defineProperty(e, "__esModule", { value: !0 });
                        var r, o = function() {
                                function t(t, e) {
                                    for (var n = 0; n < e.length; n++) {
                                        var r = e[n];
                                        r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(t, r.key, r)
                                    }
                                }
                                return function(e, n, r) { return n && t(e.prototype, n), r && t(e, r), e }
                            }(),
                            i = function t(e, n, r) { null === e && (e = Function.prototype); var o = Object.getOwnPropertyDescriptor(e, n); if (void 0 === o) { var i = Object.getPrototypeOf(e); return null === i ? void 0 : t(i, n, r) } if ("value" in o) return o.value; var a = o.get; return void 0 !== a ? a.call(r) : void 0 },
                            a = n(6);

                        function u(t, e) { if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function") }

                        function l(t, e) { if (!t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return !e || "object" != typeof e && "function" != typeof e ? t : e }
                        var s = function(t) {
                            function e() { return u(this, e), l(this, (e.__proto__ || Object.getPrototypeOf(e)).apply(this, arguments)) }
                            return function(t, e) {
                                if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + typeof e);
                                t.prototype = Object.create(e && e.prototype, { constructor: { value: t, enumerable: !1, writable: !0, configurable: !0 } }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e)
                            }(e, t), o(e, null, [{ key: "create", value: function(t) { return "super" === t ? document.createElement("sup") : "sub" === t ? document.createElement("sub") : i(e.__proto__ || Object.getPrototypeOf(e), "create", this).call(this, t) } }, { key: "formats", value: function(t) { return "SUB" === t.tagName ? "sub" : "SUP" === t.tagName ? "super" : void 0 } }]), e
                        }(((r = a) && r.__esModule ? r : { default: r }).default);
                        s.blotName = "script", s.tagName = ["SUB", "SUP"], e.default = s
                    }, function(t, e, n) {
                        "use strict";
                        Object.defineProperty(e, "__esModule", { value: !0 });
                        var r, o = n(6);

                        function i(t, e) { if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function") }

                        function a(t, e) { if (!t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return !e || "object" != typeof e && "function" != typeof e ? t : e }
                        var u = function(t) {
                            function e() { return i(this, e), a(this, (e.__proto__ || Object.getPrototypeOf(e)).apply(this, arguments)) }
                            return function(t, e) {
                                if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + typeof e);
                                t.prototype = Object.create(e && e.prototype, { constructor: { value: t, enumerable: !1, writable: !0, configurable: !0 } }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e)
                            }(e, t), e
                        }(((r = o) && r.__esModule ? r : { default: r }).default);
                        u.blotName = "strike", u.tagName = "S", e.default = u
                    }, function(t, e, n) {
                        "use strict";
                        Object.defineProperty(e, "__esModule", { value: !0 });
                        var r, o = n(6);

                        function i(t, e) { if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function") }

                        function a(t, e) { if (!t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return !e || "object" != typeof e && "function" != typeof e ? t : e }
                        var u = function(t) {
                            function e() { return i(this, e), a(this, (e.__proto__ || Object.getPrototypeOf(e)).apply(this, arguments)) }
                            return function(t, e) {
                                if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + typeof e);
                                t.prototype = Object.create(e && e.prototype, { constructor: { value: t, enumerable: !1, writable: !0, configurable: !0 } }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e)
                            }(e, t), e
                        }(((r = o) && r.__esModule ? r : { default: r }).default);
                        u.blotName = "underline", u.tagName = "U", e.default = u
                    }, function(t, e, n) {
                        "use strict";
                        Object.defineProperty(e, "__esModule", { value: !0 });
                        var r, o = function() {
                                function t(t, e) {
                                    for (var n = 0; n < e.length; n++) {
                                        var r = e[n];
                                        r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(t, r.key, r)
                                    }
                                }
                                return function(e, n, r) { return n && t(e.prototype, n), r && t(e, r), e }
                            }(),
                            i = function t(e, n, r) { null === e && (e = Function.prototype); var o = Object.getOwnPropertyDescriptor(e, n); if (void 0 === o) { var i = Object.getPrototypeOf(e); return null === i ? void 0 : t(i, n, r) } if ("value" in o) return o.value; var a = o.get; return void 0 !== a ? a.call(r) : void 0 },
                            a = n(0),
                            u = (r = a) && r.__esModule ? r : { default: r },
                            l = n(27);

                        function s(t, e) { if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function") }

                        function c(t, e) { if (!t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return !e || "object" != typeof e && "function" != typeof e ? t : e }
                        var f = ["alt", "height", "width"],
                            h = function(t) {
                                function e() { return s(this, e), c(this, (e.__proto__ || Object.getPrototypeOf(e)).apply(this, arguments)) }
                                return function(t, e) {
                                    if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + typeof e);
                                    t.prototype = Object.create(e && e.prototype, { constructor: { value: t, enumerable: !1, writable: !0, configurable: !0 } }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e)
                                }(e, t), o(e, [{ key: "format", value: function(t, n) { f.indexOf(t) > -1 ? n ? this.domNode.setAttribute(t, n) : this.domNode.removeAttribute(t) : i(e.prototype.__proto__ || Object.getPrototypeOf(e.prototype), "format", this).call(this, t, n) } }], [{ key: "create", value: function(t) { var n = i(e.__proto__ || Object.getPrototypeOf(e), "create", this).call(this, t); return "string" == typeof t && n.setAttribute("src", this.sanitize(t)), n } }, { key: "formats", value: function(t) { return f.reduce((function(e, n) { return t.hasAttribute(n) && (e[n] = t.getAttribute(n)), e }), {}) } }, { key: "match", value: function(t) { return /\.(jpe?g|gif|png)$/.test(t) || /^data:image\/.+;base64/.test(t) } }, { key: "sanitize", value: function(t) { return (0, l.sanitize)(t, ["http", "https", "data"]) ? t : "//:0" } }, { key: "value", value: function(t) { return t.getAttribute("src") } }]), e
                            }(u.default.Embed);
                        h.blotName = "image", h.tagName = "IMG", e.default = h
                    }, function(t, e, n) {
                        "use strict";
                        Object.defineProperty(e, "__esModule", { value: !0 });
                        var r, o = function() {
                                function t(t, e) {
                                    for (var n = 0; n < e.length; n++) {
                                        var r = e[n];
                                        r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(t, r.key, r)
                                    }
                                }
                                return function(e, n, r) { return n && t(e.prototype, n), r && t(e, r), e }
                            }(),
                            i = function t(e, n, r) { null === e && (e = Function.prototype); var o = Object.getOwnPropertyDescriptor(e, n); if (void 0 === o) { var i = Object.getPrototypeOf(e); return null === i ? void 0 : t(i, n, r) } if ("value" in o) return o.value; var a = o.get; return void 0 !== a ? a.call(r) : void 0 },
                            a = n(4),
                            u = n(27),
                            l = (r = u) && r.__esModule ? r : { default: r };

                        function s(t, e) { if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function") }

                        function c(t, e) { if (!t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return !e || "object" != typeof e && "function" != typeof e ? t : e }
                        var f = ["height", "width"],
                            h = function(t) {
                                function e() { return s(this, e), c(this, (e.__proto__ || Object.getPrototypeOf(e)).apply(this, arguments)) }
                                return function(t, e) {
                                    if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + typeof e);
                                    t.prototype = Object.create(e && e.prototype, { constructor: { value: t, enumerable: !1, writable: !0, configurable: !0 } }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e)
                                }(e, t), o(e, [{ key: "format", value: function(t, n) { f.indexOf(t) > -1 ? n ? this.domNode.setAttribute(t, n) : this.domNode.removeAttribute(t) : i(e.prototype.__proto__ || Object.getPrototypeOf(e.prototype), "format", this).call(this, t, n) } }], [{ key: "create", value: function(t) { var n = i(e.__proto__ || Object.getPrototypeOf(e), "create", this).call(this, t); return n.setAttribute("frameborder", "0"), n.setAttribute("allowfullscreen", !0), n.setAttribute("src", this.sanitize(t)), n } }, { key: "formats", value: function(t) { return f.reduce((function(e, n) { return t.hasAttribute(n) && (e[n] = t.getAttribute(n)), e }), {}) } }, { key: "sanitize", value: function(t) { return l.default.sanitize(t) } }, { key: "value", value: function(t) { return t.getAttribute("src") } }]), e
                            }(a.BlockEmbed);
                        h.blotName = "video", h.className = "ql-video", h.tagName = "IFRAME", e.default = h
                    }, function(t, e, n) {
                        "use strict";
                        Object.defineProperty(e, "__esModule", { value: !0 }), e.default = e.FormulaBlot = void 0;
                        var r = function() {
                                function t(t, e) {
                                    for (var n = 0; n < e.length; n++) {
                                        var r = e[n];
                                        r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(t, r.key, r)
                                    }
                                }
                                return function(e, n, r) { return n && t(e.prototype, n), r && t(e, r), e }
                            }(),
                            o = function t(e, n, r) { null === e && (e = Function.prototype); var o = Object.getOwnPropertyDescriptor(e, n); if (void 0 === o) { var i = Object.getPrototypeOf(e); return null === i ? void 0 : t(i, n, r) } if ("value" in o) return o.value; var a = o.get; return void 0 !== a ? a.call(r) : void 0 },
                            i = l(n(35)),
                            a = l(n(5)),
                            u = l(n(9));

                        function l(t) { return t && t.__esModule ? t : { default: t } }

                        function s(t, e) { if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function") }

                        function c(t, e) { if (!t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return !e || "object" != typeof e && "function" != typeof e ? t : e }

                        function f(t, e) {
                            if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + typeof e);
                            t.prototype = Object.create(e && e.prototype, { constructor: { value: t, enumerable: !1, writable: !0, configurable: !0 } }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e)
                        }
                        var h = function(t) {
                            function e() { return s(this, e), c(this, (e.__proto__ || Object.getPrototypeOf(e)).apply(this, arguments)) }
                            return f(e, t), r(e, null, [{ key: "create", value: function(t) { var n = o(e.__proto__ || Object.getPrototypeOf(e), "create", this).call(this, t); return "string" == typeof t && (window.katex.render(t, n, { throwOnError: !1, errorColor: "#f00" }), n.setAttribute("data-value", t)), n } }, { key: "value", value: function(t) { return t.getAttribute("data-value") } }]), e
                        }(i.default);
                        h.blotName = "formula", h.className = "ql-formula", h.tagName = "SPAN";
                        var p = function(t) {
                            function e() { s(this, e); var t = c(this, (e.__proto__ || Object.getPrototypeOf(e)).call(this)); if (null == window.katex) throw new Error("Formula module requires KaTeX."); return t }
                            return f(e, t), r(e, null, [{ key: "register", value: function() { a.default.register(h, !0) } }]), e
                        }(u.default);
                        e.FormulaBlot = h, e.default = p
                    }, function(t, e, n) {
                        "use strict";
                        Object.defineProperty(e, "__esModule", { value: !0 }), e.default = e.CodeToken = e.CodeBlock = void 0;
                        var r = function() {
                                function t(t, e) {
                                    for (var n = 0; n < e.length; n++) {
                                        var r = e[n];
                                        r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(t, r.key, r)
                                    }
                                }
                                return function(e, n, r) { return n && t(e.prototype, n), r && t(e, r), e }
                            }(),
                            o = function t(e, n, r) { null === e && (e = Function.prototype); var o = Object.getOwnPropertyDescriptor(e, n); if (void 0 === o) { var i = Object.getPrototypeOf(e); return null === i ? void 0 : t(i, n, r) } if ("value" in o) return o.value; var a = o.get; return void 0 !== a ? a.call(r) : void 0 },
                            i = l(n(0)),
                            a = l(n(5)),
                            u = l(n(9));

                        function l(t) { return t && t.__esModule ? t : { default: t } }

                        function s(t, e) { if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function") }

                        function c(t, e) { if (!t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return !e || "object" != typeof e && "function" != typeof e ? t : e }

                        function f(t, e) {
                            if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + typeof e);
                            t.prototype = Object.create(e && e.prototype, { constructor: { value: t, enumerable: !1, writable: !0, configurable: !0 } }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e)
                        }
                        var h = function(t) {
                            function e() { return s(this, e), c(this, (e.__proto__ || Object.getPrototypeOf(e)).apply(this, arguments)) }
                            return f(e, t), r(e, [{ key: "replaceWith", value: function(t) { this.domNode.textContent = this.domNode.textContent, this.attach(), o(e.prototype.__proto__ || Object.getPrototypeOf(e.prototype), "replaceWith", this).call(this, t) } }, {
                                key: "highlight",
                                value: function(t) {
                                    var e = this.domNode.textContent;
                                    this.cachedText !== e && ((e.trim().length > 0 || null == this.cachedText) && (this.domNode.innerHTML = t(e), this.domNode.normalize(), this.attach()), this.cachedText = e)
                                }
                            }]), e
                        }(l(n(13)).default);
                        h.className = "ql-syntax";
                        var p = new i.default.Attributor.Class("token", "hljs", { scope: i.default.Scope.INLINE }),
                            d = function(t) {
                                function e(t, n) { s(this, e); var r = c(this, (e.__proto__ || Object.getPrototypeOf(e)).call(this, t, n)); if ("function" != typeof r.options.highlight) throw new Error("Syntax module requires highlight.js. Please include the library on the page before Quill."); var o = null; return r.quill.on(a.default.events.SCROLL_OPTIMIZE, (function() { clearTimeout(o), o = setTimeout((function() { r.highlight(), o = null }), r.options.interval) })), r.highlight(), r }
                                return f(e, t), r(e, null, [{ key: "register", value: function() { a.default.register(p, !0), a.default.register(h, !0) } }]), r(e, [{
                                    key: "highlight",
                                    value: function() {
                                        var t = this;
                                        if (!this.quill.selection.composing) {
                                            this.quill.update(a.default.sources.USER);
                                            var e = this.quill.getSelection();
                                            this.quill.scroll.descendants(h).forEach((function(e) { e.highlight(t.options.highlight) })), this.quill.update(a.default.sources.SILENT), null != e && this.quill.setSelection(e, a.default.sources.SILENT)
                                        }
                                    }
                                }]), e
                            }(u.default);
                        d.DEFAULTS = { highlight: null == window.hljs ? null : function(t) { return window.hljs.highlightAuto(t).value }, interval: 1e3 }, e.CodeBlock = h, e.CodeToken = p, e.default = d
                    }, function(t, e) { t.exports = '<svg viewbox="0 0 18 18"> <line class=ql-stroke x1=3 x2=15 y1=9 y2=9></line> <line class=ql-stroke x1=3 x2=13 y1=14 y2=14></line> <line class=ql-stroke x1=3 x2=9 y1=4 y2=4></line> </svg>' }, function(t, e) { t.exports = '<svg viewbox="0 0 18 18"> <line class=ql-stroke x1=15 x2=3 y1=9 y2=9></line> <line class=ql-stroke x1=14 x2=4 y1=14 y2=14></line> <line class=ql-stroke x1=12 x2=6 y1=4 y2=4></line> </svg>' }, function(t, e) { t.exports = '<svg viewbox="0 0 18 18"> <line class=ql-stroke x1=15 x2=3 y1=9 y2=9></line> <line class=ql-stroke x1=15 x2=5 y1=14 y2=14></line> <line class=ql-stroke x1=15 x2=9 y1=4 y2=4></line> </svg>' }, function(t, e) { t.exports = '<svg viewbox="0 0 18 18"> <line class=ql-stroke x1=15 x2=3 y1=9 y2=9></line> <line class=ql-stroke x1=15 x2=3 y1=14 y2=14></line> <line class=ql-stroke x1=15 x2=3 y1=4 y2=4></line> </svg>' }, function(t, e) { t.exports = '<svg viewbox="0 0 18 18"> <g class="ql-fill ql-color-label"> <polygon points="6 6.868 6 6 5 6 5 7 5.942 7 6 6.868"></polygon> <rect height=1 width=1 x=4 y=4></rect> <polygon points="6.817 5 6 5 6 6 6.38 6 6.817 5"></polygon> <rect height=1 width=1 x=2 y=6></rect> <rect height=1 width=1 x=3 y=5></rect> <rect height=1 width=1 x=4 y=7></rect> <polygon points="4 11.439 4 11 3 11 3 12 3.755 12 4 11.439"></polygon> <rect height=1 width=1 x=2 y=12></rect> <rect height=1 width=1 x=2 y=9></rect> <rect height=1 width=1 x=2 y=15></rect> <polygon points="4.63 10 4 10 4 11 4.192 11 4.63 10"></polygon> <rect height=1 width=1 x=3 y=8></rect> <path d=M10.832,4.2L11,4.582V4H10.708A1.948,1.948,0,0,1,10.832,4.2Z></path> <path d=M7,4.582L7.168,4.2A1.929,1.929,0,0,1,7.292,4H7V4.582Z></path> <path d=M8,13H7.683l-0.351.8a1.933,1.933,0,0,1-.124.2H8V13Z></path> <rect height=1 width=1 x=12 y=2></rect> <rect height=1 width=1 x=11 y=3></rect> <path d=M9,3H8V3.282A1.985,1.985,0,0,1,9,3Z></path> <rect height=1 width=1 x=2 y=3></rect> <rect height=1 width=1 x=6 y=2></rect> <rect height=1 width=1 x=3 y=2></rect> <rect height=1 width=1 x=5 y=3></rect> <rect height=1 width=1 x=9 y=2></rect> <rect height=1 width=1 x=15 y=14></rect> <polygon points="13.447 10.174 13.469 10.225 13.472 10.232 13.808 11 14 11 14 10 13.37 10 13.447 10.174"></polygon> <rect height=1 width=1 x=13 y=7></rect> <rect height=1 width=1 x=15 y=5></rect> <rect height=1 width=1 x=14 y=6></rect> <rect height=1 width=1 x=15 y=8></rect> <rect height=1 width=1 x=14 y=9></rect> <path d=M3.775,14H3v1H4V14.314A1.97,1.97,0,0,1,3.775,14Z></path> <rect height=1 width=1 x=14 y=3></rect> <polygon points="12 6.868 12 6 11.62 6 12 6.868"></polygon> <rect height=1 width=1 x=15 y=2></rect> <rect height=1 width=1 x=12 y=5></rect> <rect height=1 width=1 x=13 y=4></rect> <polygon points="12.933 9 13 9 13 8 12.495 8 12.933 9"></polygon> <rect height=1 width=1 x=9 y=14></rect> <rect height=1 width=1 x=8 y=15></rect> <path d=M6,14.926V15H7V14.316A1.993,1.993,0,0,1,6,14.926Z></path> <rect height=1 width=1 x=5 y=15></rect> <path d=M10.668,13.8L10.317,13H10v1h0.792A1.947,1.947,0,0,1,10.668,13.8Z></path> <rect height=1 width=1 x=11 y=15></rect> <path d=M14.332,12.2a1.99,1.99,0,0,1,.166.8H15V12H14.245Z></path> <rect height=1 width=1 x=14 y=15></rect> <rect height=1 width=1 x=15 y=11></rect> </g> <polyline class=ql-stroke points="5.5 13 9 5 12.5 13"></polyline> <line class=ql-stroke x1=11.63 x2=6.38 y1=11 y2=11></line> </svg>' }, function(t, e) { t.exports = '<svg viewbox="0 0 18 18"> <rect class="ql-fill ql-stroke" height=3 width=3 x=4 y=5></rect> <rect class="ql-fill ql-stroke" height=3 width=3 x=11 y=5></rect> <path class="ql-even ql-fill ql-stroke" d=M7,8c0,4.031-3,5-3,5></path> <path class="ql-even ql-fill ql-stroke" d=M14,8c0,4.031-3,5-3,5></path> </svg>' }, function(t, e) { t.exports = '<svg viewbox="0 0 18 18"> <path class=ql-stroke d=M5,4H9.5A2.5,2.5,0,0,1,12,6.5v0A2.5,2.5,0,0,1,9.5,9H5A0,0,0,0,1,5,9V4A0,0,0,0,1,5,4Z></path> <path class=ql-stroke d=M5,9h5.5A2.5,2.5,0,0,1,13,11.5v0A2.5,2.5,0,0,1,10.5,14H5a0,0,0,0,1,0,0V9A0,0,0,0,1,5,9Z></path> </svg>' }, function(t, e) { t.exports = '<svg class="" viewbox="0 0 18 18"> <line class=ql-stroke x1=5 x2=13 y1=3 y2=3></line> <line class=ql-stroke x1=6 x2=9.35 y1=12 y2=3></line> <line class=ql-stroke x1=11 x2=15 y1=11 y2=15></line> <line class=ql-stroke x1=15 x2=11 y1=11 y2=15></line> <rect class=ql-fill height=1 rx=0.5 ry=0.5 width=7 x=2 y=14></rect> </svg>' }, function(t, e) { t.exports = '<svg viewbox="0 0 18 18"> <line class="ql-color-label ql-stroke ql-transparent" x1=3 x2=15 y1=15 y2=15></line> <polyline class=ql-stroke points="5.5 11 9 3 12.5 11"></polyline> <line class=ql-stroke x1=11.63 x2=6.38 y1=9 y2=9></line> </svg>' }, function(t, e) { t.exports = '<svg viewbox="0 0 18 18"> <polygon class="ql-stroke ql-fill" points="3 11 5 9 3 7 3 11"></polygon> <line class="ql-stroke ql-fill" x1=15 x2=11 y1=4 y2=4></line> <path class=ql-fill d=M11,3a3,3,0,0,0,0,6h1V3H11Z></path> <rect class=ql-fill height=11 width=1 x=11 y=4></rect> <rect class=ql-fill height=11 width=1 x=13 y=4></rect> </svg>' }, function(t, e) { t.exports = '<svg viewbox="0 0 18 18"> <polygon class="ql-stroke ql-fill" points="15 12 13 10 15 8 15 12"></polygon> <line class="ql-stroke ql-fill" x1=9 x2=5 y1=4 y2=4></line> <path class=ql-fill d=M5,3A3,3,0,0,0,5,9H6V3H5Z></path> <rect class=ql-fill height=11 width=1 x=5 y=4></rect> <rect class=ql-fill height=11 width=1 x=7 y=4></rect> </svg>' }, function(t, e) { t.exports = '<svg viewbox="0 0 18 18"> <path class=ql-fill d=M14,16H4a1,1,0,0,1,0-2H14A1,1,0,0,1,14,16Z /> <path class=ql-fill d=M14,4H4A1,1,0,0,1,4,2H14A1,1,0,0,1,14,4Z /> <rect class=ql-fill x=3 y=6 width=12 height=6 rx=1 ry=1 /> </svg>' }, function(t, e) { t.exports = '<svg viewbox="0 0 18 18"> <path class=ql-fill d=M13,16H5a1,1,0,0,1,0-2h8A1,1,0,0,1,13,16Z /> <path class=ql-fill d=M13,4H5A1,1,0,0,1,5,2h8A1,1,0,0,1,13,4Z /> <rect class=ql-fill x=2 y=6 width=14 height=6 rx=1 ry=1 /> </svg>' }, function(t, e) { t.exports = '<svg viewbox="0 0 18 18"> <path class=ql-fill d=M15,8H13a1,1,0,0,1,0-2h2A1,1,0,0,1,15,8Z /> <path class=ql-fill d=M15,12H13a1,1,0,0,1,0-2h2A1,1,0,0,1,15,12Z /> <path class=ql-fill d=M15,16H5a1,1,0,0,1,0-2H15A1,1,0,0,1,15,16Z /> <path class=ql-fill d=M15,4H5A1,1,0,0,1,5,2H15A1,1,0,0,1,15,4Z /> <rect class=ql-fill x=2 y=6 width=8 height=6 rx=1 ry=1 /> </svg>' }, function(t, e) { t.exports = '<svg viewbox="0 0 18 18"> <path class=ql-fill d=M5,8H3A1,1,0,0,1,3,6H5A1,1,0,0,1,5,8Z /> <path class=ql-fill d=M5,12H3a1,1,0,0,1,0-2H5A1,1,0,0,1,5,12Z /> <path class=ql-fill d=M13,16H3a1,1,0,0,1,0-2H13A1,1,0,0,1,13,16Z /> <path class=ql-fill d=M13,4H3A1,1,0,0,1,3,2H13A1,1,0,0,1,13,4Z /> <rect class=ql-fill x=8 y=6 width=8 height=6 rx=1 ry=1 transform="translate(24 18) rotate(-180)"/> </svg>' }, function(t, e) { t.exports = '<svg viewbox="0 0 18 18"> <path class=ql-fill d=M11.759,2.482a2.561,2.561,0,0,0-3.53.607A7.656,7.656,0,0,0,6.8,6.2C6.109,9.188,5.275,14.677,4.15,14.927a1.545,1.545,0,0,0-1.3-.933A0.922,0.922,0,0,0,2,15.036S1.954,16,4.119,16s3.091-2.691,3.7-5.553c0.177-.826.36-1.726,0.554-2.6L8.775,6.2c0.381-1.421.807-2.521,1.306-2.676a1.014,1.014,0,0,0,1.02.56A0.966,0.966,0,0,0,11.759,2.482Z></path> <rect class=ql-fill height=1.6 rx=0.8 ry=0.8 width=5 x=5.15 y=6.2></rect> <path class=ql-fill d=M13.663,12.027a1.662,1.662,0,0,1,.266-0.276q0.193,0.069.456,0.138a2.1,2.1,0,0,0,.535.069,1.075,1.075,0,0,0,.767-0.3,1.044,1.044,0,0,0,.314-0.8,0.84,0.84,0,0,0-.238-0.619,0.8,0.8,0,0,0-.594-0.239,1.154,1.154,0,0,0-.781.3,4.607,4.607,0,0,0-.781,1q-0.091.15-.218,0.346l-0.246.38c-0.068-.288-0.137-0.582-0.212-0.885-0.459-1.847-2.494-.984-2.941-0.8-0.482.2-.353,0.647-0.094,0.529a0.869,0.869,0,0,1,1.281.585c0.217,0.751.377,1.436,0.527,2.038a5.688,5.688,0,0,1-.362.467,2.69,2.69,0,0,1-.264.271q-0.221-.08-0.471-0.147a2.029,2.029,0,0,0-.522-0.066,1.079,1.079,0,0,0-.768.3A1.058,1.058,0,0,0,9,15.131a0.82,0.82,0,0,0,.832.852,1.134,1.134,0,0,0,.787-0.3,5.11,5.11,0,0,0,.776-0.993q0.141-.219.215-0.34c0.046-.076.122-0.194,0.223-0.346a2.786,2.786,0,0,0,.918,1.726,2.582,2.582,0,0,0,2.376-.185c0.317-.181.212-0.565,0-0.494A0.807,0.807,0,0,1,14.176,15a5.159,5.159,0,0,1-.913-2.446l0,0Q13.487,12.24,13.663,12.027Z></path> </svg>' }, function(t, e) { t.exports = '<svg viewBox="0 0 18 18"> <path class=ql-fill d=M10,4V14a1,1,0,0,1-2,0V10H3v4a1,1,0,0,1-2,0V4A1,1,0,0,1,3,4V8H8V4a1,1,0,0,1,2,0Zm6.06787,9.209H14.98975V7.59863a.54085.54085,0,0,0-.605-.60547h-.62744a1.01119,1.01119,0,0,0-.748.29688L11.645,8.56641a.5435.5435,0,0,0-.022.8584l.28613.30762a.53861.53861,0,0,0,.84717.0332l.09912-.08789a1.2137,1.2137,0,0,0,.2417-.35254h.02246s-.01123.30859-.01123.60547V13.209H12.041a.54085.54085,0,0,0-.605.60547v.43945a.54085.54085,0,0,0,.605.60547h4.02686a.54085.54085,0,0,0,.605-.60547v-.43945A.54085.54085,0,0,0,16.06787,13.209Z /> </svg>' }, function(t, e) { t.exports = '<svg viewBox="0 0 18 18"> <path class=ql-fill d=M16.73975,13.81445v.43945a.54085.54085,0,0,1-.605.60547H11.855a.58392.58392,0,0,1-.64893-.60547V14.0127c0-2.90527,3.39941-3.42187,3.39941-4.55469a.77675.77675,0,0,0-.84717-.78125,1.17684,1.17684,0,0,0-.83594.38477c-.2749.26367-.561.374-.85791.13184l-.4292-.34082c-.30811-.24219-.38525-.51758-.1543-.81445a2.97155,2.97155,0,0,1,2.45361-1.17676,2.45393,2.45393,0,0,1,2.68408,2.40918c0,2.45312-3.1792,2.92676-3.27832,3.93848h2.79443A.54085.54085,0,0,1,16.73975,13.81445ZM9,3A.99974.99974,0,0,0,8,4V8H3V4A1,1,0,0,0,1,4V14a1,1,0,0,0,2,0V10H8v4a1,1,0,0,0,2,0V4A.99974.99974,0,0,0,9,3Z /> </svg>' }, function(t, e) { t.exports = '<svg viewbox="0 0 18 18"> <line class=ql-stroke x1=7 x2=13 y1=4 y2=4></line> <line class=ql-stroke x1=5 x2=11 y1=14 y2=14></line> <line class=ql-stroke x1=8 x2=10 y1=14 y2=4></line> </svg>' }, function(t, e) { t.exports = '<svg viewbox="0 0 18 18"> <rect class=ql-stroke height=10 width=12 x=3 y=4></rect> <circle class=ql-fill cx=6 cy=7 r=1></circle> <polyline class="ql-even ql-fill" points="5 12 5 11 7 9 8 10 11 7 13 9 13 12 5 12"></polyline> </svg>' }, function(t, e) { t.exports = '<svg viewbox="0 0 18 18"> <line class=ql-stroke x1=3 x2=15 y1=14 y2=14></line> <line class=ql-stroke x1=3 x2=15 y1=4 y2=4></line> <line class=ql-stroke x1=9 x2=15 y1=9 y2=9></line> <polyline class="ql-fill ql-stroke" points="3 7 3 11 5 9 3 7"></polyline> </svg>' }, function(t, e) { t.exports = '<svg viewbox="0 0 18 18"> <line class=ql-stroke x1=3 x2=15 y1=14 y2=14></line> <line class=ql-stroke x1=3 x2=15 y1=4 y2=4></line> <line class=ql-stroke x1=9 x2=15 y1=9 y2=9></line> <polyline class=ql-stroke points="5 7 5 11 3 9 5 7"></polyline> </svg>' }, function(t, e) { t.exports = '<svg viewbox="0 0 18 18"> <line class=ql-stroke x1=7 x2=11 y1=7 y2=11></line> <path class="ql-even ql-stroke" d=M8.9,4.577a3.476,3.476,0,0,1,.36,4.679A3.476,3.476,0,0,1,4.577,8.9C3.185,7.5,2.035,6.4,4.217,4.217S7.5,3.185,8.9,4.577Z></path> <path class="ql-even ql-stroke" d=M13.423,9.1a3.476,3.476,0,0,0-4.679-.36,3.476,3.476,0,0,0,.36,4.679c1.392,1.392,2.5,2.542,4.679.36S14.815,10.5,13.423,9.1Z></path> </svg>' }, function(t, e) { t.exports = '<svg viewbox="0 0 18 18"> <line class=ql-stroke x1=7 x2=15 y1=4 y2=4></line> <line class=ql-stroke x1=7 x2=15 y1=9 y2=9></line> <line class=ql-stroke x1=7 x2=15 y1=14 y2=14></line> <line class="ql-stroke ql-thin" x1=2.5 x2=4.5 y1=5.5 y2=5.5></line> <path class=ql-fill d=M3.5,6A0.5,0.5,0,0,1,3,5.5V3.085l-0.276.138A0.5,0.5,0,0,1,2.053,3c-0.124-.247-0.023-0.324.224-0.447l1-.5A0.5,0.5,0,0,1,4,2.5v3A0.5,0.5,0,0,1,3.5,6Z></path> <path class="ql-stroke ql-thin" d=M4.5,10.5h-2c0-.234,1.85-1.076,1.85-2.234A0.959,0.959,0,0,0,2.5,8.156></path> <path class="ql-stroke ql-thin" d=M2.5,14.846a0.959,0.959,0,0,0,1.85-.109A0.7,0.7,0,0,0,3.75,14a0.688,0.688,0,0,0,.6-0.736,0.959,0.959,0,0,0-1.85-.109></path> </svg>' }, function(t, e) { t.exports = '<svg viewbox="0 0 18 18"> <line class=ql-stroke x1=6 x2=15 y1=4 y2=4></line> <line class=ql-stroke x1=6 x2=15 y1=9 y2=9></line> <line class=ql-stroke x1=6 x2=15 y1=14 y2=14></line> <line class=ql-stroke x1=3 x2=3 y1=4 y2=4></line> <line class=ql-stroke x1=3 x2=3 y1=9 y2=9></line> <line class=ql-stroke x1=3 x2=3 y1=14 y2=14></line> </svg>' }, function(t, e) { t.exports = '<svg class="" viewbox="0 0 18 18"> <line class=ql-stroke x1=9 x2=15 y1=4 y2=4></line> <polyline class=ql-stroke points="3 4 4 5 6 3"></polyline> <line class=ql-stroke x1=9 x2=15 y1=14 y2=14></line> <polyline class=ql-stroke points="3 14 4 15 6 13"></polyline> <line class=ql-stroke x1=9 x2=15 y1=9 y2=9></line> <polyline class=ql-stroke points="3 9 4 10 6 8"></polyline> </svg>' }, function(t, e) { t.exports = '<svg viewbox="0 0 18 18"> <path class=ql-fill d=M15.5,15H13.861a3.858,3.858,0,0,0,1.914-2.975,1.8,1.8,0,0,0-1.6-1.751A1.921,1.921,0,0,0,12.021,11.7a0.50013,0.50013,0,1,0,.957.291h0a0.914,0.914,0,0,1,1.053-.725,0.81,0.81,0,0,1,.744.762c0,1.076-1.16971,1.86982-1.93971,2.43082A1.45639,1.45639,0,0,0,12,15.5a0.5,0.5,0,0,0,.5.5h3A0.5,0.5,0,0,0,15.5,15Z /> <path class=ql-fill d=M9.65,5.241a1,1,0,0,0-1.409.108L6,7.964,3.759,5.349A1,1,0,0,0,2.192,6.59178Q2.21541,6.6213,2.241,6.649L4.684,9.5,2.241,12.35A1,1,0,0,0,3.71,13.70722q0.02557-.02768.049-0.05722L6,11.036,8.241,13.65a1,1,0,1,0,1.567-1.24277Q9.78459,12.3777,9.759,12.35L7.316,9.5,9.759,6.651A1,1,0,0,0,9.65,5.241Z /> </svg>' }, function(t, e) { t.exports = '<svg viewbox="0 0 18 18"> <path class=ql-fill d=M15.5,7H13.861a4.015,4.015,0,0,0,1.914-2.975,1.8,1.8,0,0,0-1.6-1.751A1.922,1.922,0,0,0,12.021,3.7a0.5,0.5,0,1,0,.957.291,0.917,0.917,0,0,1,1.053-.725,0.81,0.81,0,0,1,.744.762c0,1.077-1.164,1.925-1.934,2.486A1.423,1.423,0,0,0,12,7.5a0.5,0.5,0,0,0,.5.5h3A0.5,0.5,0,0,0,15.5,7Z /> <path class=ql-fill d=M9.651,5.241a1,1,0,0,0-1.41.108L6,7.964,3.759,5.349a1,1,0,1,0-1.519,1.3L4.683,9.5,2.241,12.35a1,1,0,1,0,1.519,1.3L6,11.036,8.241,13.65a1,1,0,0,0,1.519-1.3L7.317,9.5,9.759,6.651A1,1,0,0,0,9.651,5.241Z /> </svg>' }, function(t, e) { t.exports = '<svg viewbox="0 0 18 18"> <line class="ql-stroke ql-thin" x1=15.5 x2=2.5 y1=8.5 y2=9.5></line> <path class=ql-fill d=M9.007,8C6.542,7.791,6,7.519,6,6.5,6,5.792,7.283,5,9,5c1.571,0,2.765.679,2.969,1.309a1,1,0,0,0,1.9-.617C13.356,4.106,11.354,3,9,3,6.2,3,4,4.538,4,6.5a3.2,3.2,0,0,0,.5,1.843Z></path> <path class=ql-fill d=M8.984,10C11.457,10.208,12,10.479,12,11.5c0,0.708-1.283,1.5-3,1.5-1.571,0-2.765-.679-2.969-1.309a1,1,0,1,0-1.9.617C4.644,13.894,6.646,15,9,15c2.8,0,5-1.538,5-3.5a3.2,3.2,0,0,0-.5-1.843Z></path> </svg>' }, function(t, e) { t.exports = '<svg viewbox="0 0 18 18"> <path class=ql-stroke d=M5,3V9a4.012,4.012,0,0,0,4,4H9a4.012,4.012,0,0,0,4-4V3></path> <rect class=ql-fill height=1 rx=0.5 ry=0.5 width=12 x=3 y=15></rect> </svg>' }, function(t, e) { t.exports = '<svg viewbox="0 0 18 18"> <rect class=ql-stroke height=12 width=12 x=3 y=3></rect> <rect class=ql-fill height=12 width=1 x=5 y=3></rect> <rect class=ql-fill height=12 width=1 x=12 y=3></rect> <rect class=ql-fill height=2 width=8 x=5 y=8></rect> <rect class=ql-fill height=1 width=3 x=3 y=5></rect> <rect class=ql-fill height=1 width=3 x=3 y=7></rect> <rect class=ql-fill height=1 width=3 x=3 y=10></rect> <rect class=ql-fill height=1 width=3 x=3 y=12></rect> <rect class=ql-fill height=1 width=3 x=12 y=5></rect> <rect class=ql-fill height=1 width=3 x=12 y=7></rect> <rect class=ql-fill height=1 width=3 x=12 y=10></rect> <rect class=ql-fill height=1 width=3 x=12 y=12></rect> </svg>' }, function(t, e) { t.exports = '<svg viewbox="0 0 18 18"> <polygon class=ql-stroke points="7 11 9 13 11 11 7 11"></polygon> <polygon class=ql-stroke points="7 7 9 5 11 7 7 7"></polygon> </svg>' }, function(t, e, n) {
                        "use strict";
                        Object.defineProperty(e, "__esModule", { value: !0 }), e.default = e.BubbleTooltip = void 0;
                        var r = function t(e, n, r) { null === e && (e = Function.prototype); var o = Object.getOwnPropertyDescriptor(e, n); if (void 0 === o) { var i = Object.getPrototypeOf(e); return null === i ? void 0 : t(i, n, r) } if ("value" in o) return o.value; var a = o.get; return void 0 !== a ? a.call(r) : void 0 },
                            o = function() {
                                function t(t, e) {
                                    for (var n = 0; n < e.length; n++) {
                                        var r = e[n];
                                        r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(t, r.key, r)
                                    }
                                }
                                return function(e, n, r) { return n && t(e.prototype, n), r && t(e, r), e }
                            }(),
                            i = f(n(3)),
                            a = f(n(8)),
                            u = n(43),
                            l = f(u),
                            s = n(15),
                            c = f(n(41));

                        function f(t) { return t && t.__esModule ? t : { default: t } }

                        function h(t, e) { if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function") }

                        function p(t, e) { if (!t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return !e || "object" != typeof e && "function" != typeof e ? t : e }

                        function d(t, e) {
                            if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + typeof e);
                            t.prototype = Object.create(e && e.prototype, { constructor: { value: t, enumerable: !1, writable: !0, configurable: !0 } }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e)
                        }
                        var y = [
                                ["bold", "italic", "link"],
                                [{ header: 1 }, { header: 2 }, "blockquote"]
                            ],
                            v = function(t) {
                                function e(t, n) { h(this, e), null != n.modules.toolbar && null == n.modules.toolbar.container && (n.modules.toolbar.container = y); var r = p(this, (e.__proto__ || Object.getPrototypeOf(e)).call(this, t, n)); return r.quill.container.classList.add("ql-bubble"), r }
                                return d(e, t), o(e, [{ key: "extendToolbar", value: function(t) { this.tooltip = new g(this.quill, this.options.bounds), this.tooltip.root.appendChild(t.container), this.buildButtons([].slice.call(t.container.querySelectorAll("button")), c.default), this.buildPickers([].slice.call(t.container.querySelectorAll("select")), c.default) } }]), e
                            }(l.default);
                        v.DEFAULTS = (0, i.default)(!0, {}, l.default.DEFAULTS, { modules: { toolbar: { handlers: { link: function(t) { t ? this.quill.theme.tooltip.edit() : this.quill.format("link", !1) } } } } });
                        var g = function(t) {
                            function e(t, n) {
                                h(this, e);
                                var r = p(this, (e.__proto__ || Object.getPrototypeOf(e)).call(this, t, n));
                                return r.quill.on(a.default.events.EDITOR_CHANGE, (function(t, e, n, o) {
                                    if (t === a.default.events.SELECTION_CHANGE)
                                        if (null != e && e.length > 0 && o === a.default.sources.USER) {
                                            r.show(), r.root.style.left = "0px", r.root.style.width = "", r.root.style.width = r.root.offsetWidth + "px";
                                            var i = r.quill.getLines(e.index, e.length);
                                            if (1 === i.length) r.position(r.quill.getBounds(e));
                                            else {
                                                var u = i[i.length - 1],
                                                    l = r.quill.getIndex(u),
                                                    c = Math.min(u.length() - 1, e.index + e.length - l),
                                                    f = r.quill.getBounds(new s.Range(l, c));
                                                r.position(f)
                                            }
                                        } else document.activeElement !== r.textbox && r.quill.hasFocus() && r.hide()
                                })), r
                            }
                            return d(e, t), o(e, [{
                                key: "listen",
                                value: function() {
                                    var t = this;
                                    r(e.prototype.__proto__ || Object.getPrototypeOf(e.prototype), "listen", this).call(this), this.root.querySelector(".ql-close").addEventListener("click", (function() { t.root.classList.remove("ql-editing") })), this.quill.on(a.default.events.SCROLL_OPTIMIZE, (function() {
                                        setTimeout((function() {
                                            if (!t.root.classList.contains("ql-hidden")) {
                                                var e = t.quill.getSelection();
                                                null != e && t.position(t.quill.getBounds(e))
                                            }
                                        }), 1)
                                    }))
                                }
                            }, { key: "cancel", value: function() { this.show() } }, {
                                key: "position",
                                value: function(t) {
                                    var n = r(e.prototype.__proto__ || Object.getPrototypeOf(e.prototype), "position", this).call(this, t),
                                        o = this.root.querySelector(".ql-tooltip-arrow");
                                    if (o.style.marginLeft = "", 0 === n) return n;
                                    o.style.marginLeft = -1 * n - o.offsetWidth / 2 + "px"
                                }
                            }]), e
                        }(u.BaseTooltip);
                        g.TEMPLATE = ['<span class="ql-tooltip-arrow"></span>', '<div class="ql-tooltip-editor">', '<input type="text" data-formula="e=mc^2" data-link="https://quilljs.com" data-video="Embed URL">', '<a class="ql-close"></a>', "</div>"].join(""), e.BubbleTooltip = g, e.default = v
                    }, function(t, e, n) { t.exports = n(63) }]).default
                }, t.exports = r()
            },
            593: t => {
                "use strict";
                t.exports = JSON.parse('{"name":"axios","version":"0.21.4","description":"Promise based HTTP client for the browser and node.js","main":"index.js","scripts":{"test":"grunt test","start":"node ./sandbox/server.js","build":"NODE_ENV=production grunt build","preversion":"npm test","version":"npm run build && grunt version && git add -A dist && git add CHANGELOG.md bower.json package.json","postversion":"git push && git push --tags","examples":"node ./examples/server.js","coveralls":"cat coverage/lcov.info | ./node_modules/coveralls/bin/coveralls.js","fix":"eslint --fix lib/**/*.js"},"repository":{"type":"git","url":"https://github.com/axios/axios.git"},"keywords":["xhr","http","ajax","promise","node"],"author":"Matt Zabriskie","license":"MIT","bugs":{"url":"https://github.com/axios/axios/issues"},"homepage":"https://axios-http.com","devDependencies":{"coveralls":"^3.0.0","es6-promise":"^4.2.4","grunt":"^1.3.0","grunt-banner":"^0.6.0","grunt-cli":"^1.2.0","grunt-contrib-clean":"^1.1.0","grunt-contrib-watch":"^1.0.0","grunt-eslint":"^23.0.0","grunt-karma":"^4.0.0","grunt-mocha-test":"^0.13.3","grunt-ts":"^6.0.0-beta.19","grunt-webpack":"^4.0.2","istanbul-instrumenter-loader":"^1.0.0","jasmine-core":"^2.4.1","karma":"^6.3.2","karma-chrome-launcher":"^3.1.0","karma-firefox-launcher":"^2.1.0","karma-jasmine":"^1.1.1","karma-jasmine-ajax":"^0.1.13","karma-safari-launcher":"^1.0.0","karma-sauce-launcher":"^4.3.6","karma-sinon":"^1.0.5","karma-sourcemap-loader":"^0.3.8","karma-webpack":"^4.0.2","load-grunt-tasks":"^3.5.2","minimist":"^1.2.0","mocha":"^8.2.1","sinon":"^4.5.0","terser-webpack-plugin":"^4.2.3","typescript":"^4.0.5","url-search-params":"^0.10.0","webpack":"^4.44.2","webpack-dev-server":"^3.11.0"},"browser":{"./lib/adapters/http.js":"./lib/adapters/xhr.js"},"jsdelivr":"dist/axios.min.js","unpkg":"dist/axios.min.js","typings":"./index.d.ts","dependencies":{"follow-redirects":"^1.14.0"},"bundlesize":[{"path":"./dist/axios.min.js","threshold":"5kB"}]}')
            }
        },
        n = {};

    function r(t) { var o = n[t]; if (void 0 !== o) return o.exports; var i = n[t] = { id: t, loaded: !1, exports: {} }; return e[t].call(i.exports, i, i.exports, r), i.loaded = !0, i.exports }
    r.m = e, t = [], r.O = (e, n, o, i) => {
        if (!n) {
            var a = 1 / 0;
            for (c = 0; c < t.length; c++) {
                for (var [n, o, i] = t[c], u = !0, l = 0; l < n.length; l++)(!1 & i || a >= i) && Object.keys(r.O).every((t => r.O[t](n[l]))) ? n.splice(l--, 1) : (u = !1, i < a && (a = i));
                if (u) {
                    t.splice(c--, 1);
                    var s = o();
                    void 0 !== s && (e = s)
                }
            }
            return e
        }
        i = i || 0;
        for (var c = t.length; c > 0 && t[c - 1][2] > i; c--) t[c] = t[c - 1];
        t[c] = [n, o, i]
    }, r.n = t => { var e = t && t.__esModule ? () => t.default : () => t; return r.d(e, { a: e }), e }, r.d = (t, e) => { for (var n in e) r.o(e, n) && !r.o(t, n) && Object.defineProperty(t, n, { enumerable: !0, get: e[n] }) }, r.g = function() { if ("object" == typeof globalThis) return globalThis; try { return this || new Function("return this")() } catch (t) { if ("object" == typeof window) return window } }(), r.o = (t, e) => Object.prototype.hasOwnProperty.call(t, e), r.nmd = t => (t.paths = [], t.children || (t.children = []), t), (() => {
        var t = { 773: 0, 170: 0 };
        r.O.j = e => 0 === t[e];
        var e = (e, n) => {
                var o, i, [a, u, l] = n,
                    s = 0;
                if (a.some((e => 0 !== t[e]))) { for (o in u) r.o(u, o) && (r.m[o] = u[o]); if (l) var c = l(r) }
                for (e && e(n); s < a.length; s++) i = a[s], r.o(t, i) && t[i] && t[i][0](), t[i] = 0;
                return r.O(c)
            },
            n = self.webpackChunk = self.webpackChunk || [];
        n.forEach(e.bind(null, 0)), n.push = e.bind(null, n.push.bind(n))
    })(), r.O(void 0, [170], (() => r(905)));
    var o = r.O(void 0, [170], (() => r(662)));
    o = r.O(o)
})();