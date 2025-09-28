import process from 'node:process';globalThis._importMeta_=globalThis._importMeta_||{url:"file:///_entry.js",env:process.env};import http from 'node:http';
import https from 'node:https';
import { EventEmitter } from 'node:events';
import { Buffer as Buffer$1 } from 'node:buffer';
import { promises, existsSync } from 'node:fs';
import { resolve as resolve$1, dirname as dirname$1, join } from 'node:path';
import { createHash } from 'node:crypto';
import { createPathIndexLanguageParser, parseAcceptLanguage } from '@intlify/utils';
import { createRouterMatcher } from 'vue-router';
import { fileURLToPath } from 'node:url';

const suspectProtoRx = /"(?:_|\\u0{2}5[Ff]){2}(?:p|\\u0{2}70)(?:r|\\u0{2}72)(?:o|\\u0{2}6[Ff])(?:t|\\u0{2}74)(?:o|\\u0{2}6[Ff])(?:_|\\u0{2}5[Ff]){2}"\s*:/;
const suspectConstructorRx = /"(?:c|\\u0063)(?:o|\\u006[Ff])(?:n|\\u006[Ee])(?:s|\\u0073)(?:t|\\u0074)(?:r|\\u0072)(?:u|\\u0075)(?:c|\\u0063)(?:t|\\u0074)(?:o|\\u006[Ff])(?:r|\\u0072)"\s*:/;
const JsonSigRx = /^\s*["[{]|^\s*-?\d{1,16}(\.\d{1,17})?([Ee][+-]?\d+)?\s*$/;
function jsonParseTransform(key, value) {
  if (key === "__proto__" || key === "constructor" && value && typeof value === "object" && "prototype" in value) {
    warnKeyDropped(key);
    return;
  }
  return value;
}
function warnKeyDropped(key) {
  console.warn(`[destr] Dropping "${key}" key to prevent prototype pollution.`);
}
function destr(value, options = {}) {
  if (typeof value !== "string") {
    return value;
  }
  if (value[0] === '"' && value[value.length - 1] === '"' && value.indexOf("\\") === -1) {
    return value.slice(1, -1);
  }
  const _value = value.trim();
  if (_value.length <= 9) {
    switch (_value.toLowerCase()) {
      case "true": {
        return true;
      }
      case "false": {
        return false;
      }
      case "undefined": {
        return void 0;
      }
      case "null": {
        return null;
      }
      case "nan": {
        return Number.NaN;
      }
      case "infinity": {
        return Number.POSITIVE_INFINITY;
      }
      case "-infinity": {
        return Number.NEGATIVE_INFINITY;
      }
    }
  }
  if (!JsonSigRx.test(value)) {
    if (options.strict) {
      throw new SyntaxError("[destr] Invalid JSON");
    }
    return value;
  }
  try {
    if (suspectProtoRx.test(value) || suspectConstructorRx.test(value)) {
      if (options.strict) {
        throw new Error("[destr] Possible prototype pollution");
      }
      return JSON.parse(value, jsonParseTransform);
    }
    return JSON.parse(value);
  } catch (error) {
    if (options.strict) {
      throw error;
    }
    return value;
  }
}

const HASH_RE = /#/g;
const AMPERSAND_RE = /&/g;
const SLASH_RE = /\//g;
const EQUAL_RE = /=/g;
const PLUS_RE = /\+/g;
const ENC_CARET_RE = /%5e/gi;
const ENC_BACKTICK_RE = /%60/gi;
const ENC_PIPE_RE = /%7c/gi;
const ENC_SPACE_RE = /%20/gi;
const ENC_SLASH_RE = /%2f/gi;
function encode(text) {
  return encodeURI("" + text).replace(ENC_PIPE_RE, "|");
}
function encodeQueryValue(input) {
  return encode(typeof input === "string" ? input : JSON.stringify(input)).replace(PLUS_RE, "%2B").replace(ENC_SPACE_RE, "+").replace(HASH_RE, "%23").replace(AMPERSAND_RE, "%26").replace(ENC_BACKTICK_RE, "`").replace(ENC_CARET_RE, "^").replace(SLASH_RE, "%2F");
}
function encodeQueryKey(text) {
  return encodeQueryValue(text).replace(EQUAL_RE, "%3D");
}
function decode$2(text = "") {
  try {
    return decodeURIComponent("" + text);
  } catch {
    return "" + text;
  }
}
function decodePath(text) {
  return decode$2(text.replace(ENC_SLASH_RE, "%252F"));
}
function decodeQueryKey(text) {
  return decode$2(text.replace(PLUS_RE, " "));
}
function decodeQueryValue(text) {
  return decode$2(text.replace(PLUS_RE, " "));
}

function parseQuery(parametersString = "") {
  const object = /* @__PURE__ */ Object.create(null);
  if (parametersString[0] === "?") {
    parametersString = parametersString.slice(1);
  }
  for (const parameter of parametersString.split("&")) {
    const s = parameter.match(/([^=]+)=?(.*)/) || [];
    if (s.length < 2) {
      continue;
    }
    const key = decodeQueryKey(s[1]);
    if (key === "__proto__" || key === "constructor") {
      continue;
    }
    const value = decodeQueryValue(s[2] || "");
    if (object[key] === void 0) {
      object[key] = value;
    } else if (Array.isArray(object[key])) {
      object[key].push(value);
    } else {
      object[key] = [object[key], value];
    }
  }
  return object;
}
function encodeQueryItem(key, value) {
  if (typeof value === "number" || typeof value === "boolean") {
    value = String(value);
  }
  if (!value) {
    return encodeQueryKey(key);
  }
  if (Array.isArray(value)) {
    return value.map(
      (_value) => `${encodeQueryKey(key)}=${encodeQueryValue(_value)}`
    ).join("&");
  }
  return `${encodeQueryKey(key)}=${encodeQueryValue(value)}`;
}
function stringifyQuery(query) {
  return Object.keys(query).filter((k) => query[k] !== void 0).map((k) => encodeQueryItem(k, query[k])).filter(Boolean).join("&");
}

const PROTOCOL_STRICT_REGEX = /^[\s\w\0+.-]{2,}:([/\\]{1,2})/;
const PROTOCOL_REGEX = /^[\s\w\0+.-]{2,}:([/\\]{2})?/;
const PROTOCOL_RELATIVE_REGEX = /^([/\\]\s*){2,}[^/\\]/;
const JOIN_LEADING_SLASH_RE = /^\.?\//;
function hasProtocol(inputString, opts = {}) {
  if (typeof opts === "boolean") {
    opts = { acceptRelative: opts };
  }
  if (opts.strict) {
    return PROTOCOL_STRICT_REGEX.test(inputString);
  }
  return PROTOCOL_REGEX.test(inputString) || (opts.acceptRelative ? PROTOCOL_RELATIVE_REGEX.test(inputString) : false);
}
function hasTrailingSlash(input = "", respectQueryAndFragment) {
  {
    return input.endsWith("/");
  }
}
function withoutTrailingSlash(input = "", respectQueryAndFragment) {
  {
    return (hasTrailingSlash(input) ? input.slice(0, -1) : input) || "/";
  }
}
function withTrailingSlash(input = "", respectQueryAndFragment) {
  {
    return input.endsWith("/") ? input : input + "/";
  }
}
function hasLeadingSlash(input = "") {
  return input.startsWith("/");
}
function withLeadingSlash(input = "") {
  return hasLeadingSlash(input) ? input : "/" + input;
}
function withBase(input, base) {
  if (isEmptyURL(base) || hasProtocol(input)) {
    return input;
  }
  const _base = withoutTrailingSlash(base);
  if (input.startsWith(_base)) {
    return input;
  }
  return joinURL(_base, input);
}
function withoutBase(input, base) {
  if (isEmptyURL(base)) {
    return input;
  }
  const _base = withoutTrailingSlash(base);
  if (!input.startsWith(_base)) {
    return input;
  }
  const trimmed = input.slice(_base.length);
  return trimmed[0] === "/" ? trimmed : "/" + trimmed;
}
function withQuery(input, query) {
  const parsed = parseURL(input);
  const mergedQuery = { ...parseQuery(parsed.search), ...query };
  parsed.search = stringifyQuery(mergedQuery);
  return stringifyParsedURL(parsed);
}
function getQuery$1(input) {
  return parseQuery(parseURL(input).search);
}
function isEmptyURL(url) {
  return !url || url === "/";
}
function isNonEmptyURL(url) {
  return url && url !== "/";
}
function joinURL(base, ...input) {
  let url = base || "";
  for (const segment of input.filter((url2) => isNonEmptyURL(url2))) {
    if (url) {
      const _segment = segment.replace(JOIN_LEADING_SLASH_RE, "");
      url = withTrailingSlash(url) + _segment;
    } else {
      url = segment;
    }
  }
  return url;
}
function joinRelativeURL(..._input) {
  const JOIN_SEGMENT_SPLIT_RE = /\/(?!\/)/;
  const input = _input.filter(Boolean);
  const segments = [];
  let segmentsDepth = 0;
  for (const i of input) {
    if (!i || i === "/") {
      continue;
    }
    for (const [sindex, s] of i.split(JOIN_SEGMENT_SPLIT_RE).entries()) {
      if (!s || s === ".") {
        continue;
      }
      if (s === "..") {
        if (segments.length === 1 && hasProtocol(segments[0])) {
          continue;
        }
        segments.pop();
        segmentsDepth--;
        continue;
      }
      if (sindex === 1 && segments[segments.length - 1]?.endsWith(":/")) {
        segments[segments.length - 1] += "/" + s;
        continue;
      }
      segments.push(s);
      segmentsDepth++;
    }
  }
  let url = segments.join("/");
  if (segmentsDepth >= 0) {
    if (input[0]?.startsWith("/") && !url.startsWith("/")) {
      url = "/" + url;
    } else if (input[0]?.startsWith("./") && !url.startsWith("./")) {
      url = "./" + url;
    }
  } else {
    url = "../".repeat(-1 * segmentsDepth) + url;
  }
  if (input[input.length - 1]?.endsWith("/") && !url.endsWith("/")) {
    url += "/";
  }
  return url;
}

const protocolRelative = Symbol.for("ufo:protocolRelative");
function parseURL(input = "", defaultProto) {
  const _specialProtoMatch = input.match(
    /^[\s\0]*(blob:|data:|javascript:|vbscript:)(.*)/i
  );
  if (_specialProtoMatch) {
    const [, _proto, _pathname = ""] = _specialProtoMatch;
    return {
      protocol: _proto.toLowerCase(),
      pathname: _pathname,
      href: _proto + _pathname,
      auth: "",
      host: "",
      search: "",
      hash: ""
    };
  }
  if (!hasProtocol(input, { acceptRelative: true })) {
    return parsePath(input);
  }
  const [, protocol = "", auth, hostAndPath = ""] = input.replace(/\\/g, "/").match(/^[\s\0]*([\w+.-]{2,}:)?\/\/([^/@]+@)?(.*)/) || [];
  let [, host = "", path = ""] = hostAndPath.match(/([^#/?]*)(.*)?/) || [];
  if (protocol === "file:") {
    path = path.replace(/\/(?=[A-Za-z]:)/, "");
  }
  const { pathname, search, hash } = parsePath(path);
  return {
    protocol: protocol.toLowerCase(),
    auth: auth ? auth.slice(0, Math.max(0, auth.length - 1)) : "",
    host,
    pathname,
    search,
    hash,
    [protocolRelative]: !protocol
  };
}
function parsePath(input = "") {
  const [pathname = "", search = "", hash = ""] = (input.match(/([^#?]*)(\?[^#]*)?(#.*)?/) || []).splice(1);
  return {
    pathname,
    search,
    hash
  };
}
function stringifyParsedURL(parsed) {
  const pathname = parsed.pathname || "";
  const search = parsed.search ? (parsed.search.startsWith("?") ? "" : "?") + parsed.search : "";
  const hash = parsed.hash || "";
  const auth = parsed.auth ? parsed.auth + "@" : "";
  const host = parsed.host || "";
  const proto = parsed.protocol || parsed[protocolRelative] ? (parsed.protocol || "") + "//" : "";
  return proto + auth + host + pathname + search + hash;
}

function parse$1(str, options) {
  if (typeof str !== "string") {
    throw new TypeError("argument str must be a string");
  }
  const obj = {};
  const opt = {};
  const dec = opt.decode || decode$1;
  let index = 0;
  while (index < str.length) {
    const eqIdx = str.indexOf("=", index);
    if (eqIdx === -1) {
      break;
    }
    let endIdx = str.indexOf(";", index);
    if (endIdx === -1) {
      endIdx = str.length;
    } else if (endIdx < eqIdx) {
      index = str.lastIndexOf(";", eqIdx - 1) + 1;
      continue;
    }
    const key = str.slice(index, eqIdx).trim();
    if (opt?.filter && !opt?.filter(key)) {
      index = endIdx + 1;
      continue;
    }
    if (void 0 === obj[key]) {
      let val = str.slice(eqIdx + 1, endIdx).trim();
      if (val.codePointAt(0) === 34) {
        val = val.slice(1, -1);
      }
      obj[key] = tryDecode$1(val, dec);
    }
    index = endIdx + 1;
  }
  return obj;
}
function decode$1(str) {
  return str.includes("%") ? decodeURIComponent(str) : str;
}
function tryDecode$1(str, decode2) {
  try {
    return decode2(str);
  } catch {
    return str;
  }
}

const fieldContentRegExp = /^[\u0009\u0020-\u007E\u0080-\u00FF]+$/;
function serialize$2(name, value, options) {
  const opt = options || {};
  const enc = opt.encode || encodeURIComponent;
  if (typeof enc !== "function") {
    throw new TypeError("option encode is invalid");
  }
  if (!fieldContentRegExp.test(name)) {
    throw new TypeError("argument name is invalid");
  }
  const encodedValue = enc(value);
  if (encodedValue && !fieldContentRegExp.test(encodedValue)) {
    throw new TypeError("argument val is invalid");
  }
  let str = name + "=" + encodedValue;
  if (void 0 !== opt.maxAge && opt.maxAge !== null) {
    const maxAge = opt.maxAge - 0;
    if (Number.isNaN(maxAge) || !Number.isFinite(maxAge)) {
      throw new TypeError("option maxAge is invalid");
    }
    str += "; Max-Age=" + Math.floor(maxAge);
  }
  if (opt.domain) {
    if (!fieldContentRegExp.test(opt.domain)) {
      throw new TypeError("option domain is invalid");
    }
    str += "; Domain=" + opt.domain;
  }
  if (opt.path) {
    if (!fieldContentRegExp.test(opt.path)) {
      throw new TypeError("option path is invalid");
    }
    str += "; Path=" + opt.path;
  }
  if (opt.expires) {
    if (!isDate(opt.expires) || Number.isNaN(opt.expires.valueOf())) {
      throw new TypeError("option expires is invalid");
    }
    str += "; Expires=" + opt.expires.toUTCString();
  }
  if (opt.httpOnly) {
    str += "; HttpOnly";
  }
  if (opt.secure) {
    str += "; Secure";
  }
  if (opt.priority) {
    const priority = typeof opt.priority === "string" ? opt.priority.toLowerCase() : opt.priority;
    switch (priority) {
      case "low": {
        str += "; Priority=Low";
        break;
      }
      case "medium": {
        str += "; Priority=Medium";
        break;
      }
      case "high": {
        str += "; Priority=High";
        break;
      }
      default: {
        throw new TypeError("option priority is invalid");
      }
    }
  }
  if (opt.sameSite) {
    const sameSite = typeof opt.sameSite === "string" ? opt.sameSite.toLowerCase() : opt.sameSite;
    switch (sameSite) {
      case true: {
        str += "; SameSite=Strict";
        break;
      }
      case "lax": {
        str += "; SameSite=Lax";
        break;
      }
      case "strict": {
        str += "; SameSite=Strict";
        break;
      }
      case "none": {
        str += "; SameSite=None";
        break;
      }
      default: {
        throw new TypeError("option sameSite is invalid");
      }
    }
  }
  if (opt.partitioned) {
    str += "; Partitioned";
  }
  return str;
}
function isDate(val) {
  return Object.prototype.toString.call(val) === "[object Date]" || val instanceof Date;
}

function parseSetCookie(setCookieValue, options) {
  const parts = (setCookieValue || "").split(";").filter((str) => typeof str === "string" && !!str.trim());
  const nameValuePairStr = parts.shift() || "";
  const parsed = _parseNameValuePair(nameValuePairStr);
  const name = parsed.name;
  let value = parsed.value;
  try {
    value = options?.decode === false ? value : (options?.decode || decodeURIComponent)(value);
  } catch {
  }
  const cookie = {
    name,
    value
  };
  for (const part of parts) {
    const sides = part.split("=");
    const partKey = (sides.shift() || "").trimStart().toLowerCase();
    const partValue = sides.join("=");
    switch (partKey) {
      case "expires": {
        cookie.expires = new Date(partValue);
        break;
      }
      case "max-age": {
        cookie.maxAge = Number.parseInt(partValue, 10);
        break;
      }
      case "secure": {
        cookie.secure = true;
        break;
      }
      case "httponly": {
        cookie.httpOnly = true;
        break;
      }
      case "samesite": {
        cookie.sameSite = partValue;
        break;
      }
      default: {
        cookie[partKey] = partValue;
      }
    }
  }
  return cookie;
}
function _parseNameValuePair(nameValuePairStr) {
  let name = "";
  let value = "";
  const nameValueArr = nameValuePairStr.split("=");
  if (nameValueArr.length > 1) {
    name = nameValueArr.shift();
    value = nameValueArr.join("=");
  } else {
    value = nameValuePairStr;
  }
  return { name, value };
}

const NODE_TYPES = {
  NORMAL: 0,
  WILDCARD: 1,
  PLACEHOLDER: 2
};

function createRouter$1(options = {}) {
  const ctx = {
    options,
    rootNode: createRadixNode(),
    staticRoutesMap: {}
  };
  const normalizeTrailingSlash = (p) => options.strictTrailingSlash ? p : p.replace(/\/$/, "") || "/";
  if (options.routes) {
    for (const path in options.routes) {
      insert(ctx, normalizeTrailingSlash(path), options.routes[path]);
    }
  }
  return {
    ctx,
    lookup: (path) => lookup(ctx, normalizeTrailingSlash(path)),
    insert: (path, data) => insert(ctx, normalizeTrailingSlash(path), data),
    remove: (path) => remove(ctx, normalizeTrailingSlash(path))
  };
}
function lookup(ctx, path) {
  const staticPathNode = ctx.staticRoutesMap[path];
  if (staticPathNode) {
    return staticPathNode.data;
  }
  const sections = path.split("/");
  const params = {};
  let paramsFound = false;
  let wildcardNode = null;
  let node = ctx.rootNode;
  let wildCardParam = null;
  for (let i = 0; i < sections.length; i++) {
    const section = sections[i];
    if (node.wildcardChildNode !== null) {
      wildcardNode = node.wildcardChildNode;
      wildCardParam = sections.slice(i).join("/");
    }
    const nextNode = node.children.get(section);
    if (nextNode === void 0) {
      if (node && node.placeholderChildren.length > 1) {
        const remaining = sections.length - i;
        node = node.placeholderChildren.find((c) => c.maxDepth === remaining) || null;
      } else {
        node = node.placeholderChildren[0] || null;
      }
      if (!node) {
        break;
      }
      if (node.paramName) {
        params[node.paramName] = section;
      }
      paramsFound = true;
    } else {
      node = nextNode;
    }
  }
  if ((node === null || node.data === null) && wildcardNode !== null) {
    node = wildcardNode;
    params[node.paramName || "_"] = wildCardParam;
    paramsFound = true;
  }
  if (!node) {
    return null;
  }
  if (paramsFound) {
    return {
      ...node.data,
      params: paramsFound ? params : void 0
    };
  }
  return node.data;
}
function insert(ctx, path, data) {
  let isStaticRoute = true;
  const sections = path.split("/");
  let node = ctx.rootNode;
  let _unnamedPlaceholderCtr = 0;
  const matchedNodes = [node];
  for (const section of sections) {
    let childNode;
    if (childNode = node.children.get(section)) {
      node = childNode;
    } else {
      const type = getNodeType(section);
      childNode = createRadixNode({ type, parent: node });
      node.children.set(section, childNode);
      if (type === NODE_TYPES.PLACEHOLDER) {
        childNode.paramName = section === "*" ? `_${_unnamedPlaceholderCtr++}` : section.slice(1);
        node.placeholderChildren.push(childNode);
        isStaticRoute = false;
      } else if (type === NODE_TYPES.WILDCARD) {
        node.wildcardChildNode = childNode;
        childNode.paramName = section.slice(
          3
          /* "**:" */
        ) || "_";
        isStaticRoute = false;
      }
      matchedNodes.push(childNode);
      node = childNode;
    }
  }
  for (const [depth, node2] of matchedNodes.entries()) {
    node2.maxDepth = Math.max(matchedNodes.length - depth, node2.maxDepth || 0);
  }
  node.data = data;
  if (isStaticRoute === true) {
    ctx.staticRoutesMap[path] = node;
  }
  return node;
}
function remove(ctx, path) {
  let success = false;
  const sections = path.split("/");
  let node = ctx.rootNode;
  for (const section of sections) {
    node = node.children.get(section);
    if (!node) {
      return success;
    }
  }
  if (node.data) {
    const lastSection = sections.at(-1) || "";
    node.data = null;
    if (Object.keys(node.children).length === 0 && node.parent) {
      node.parent.children.delete(lastSection);
      node.parent.wildcardChildNode = null;
      node.parent.placeholderChildren = [];
    }
    success = true;
  }
  return success;
}
function createRadixNode(options = {}) {
  return {
    type: options.type || NODE_TYPES.NORMAL,
    maxDepth: 0,
    parent: options.parent || null,
    children: /* @__PURE__ */ new Map(),
    data: options.data || null,
    paramName: options.paramName || null,
    wildcardChildNode: null,
    placeholderChildren: []
  };
}
function getNodeType(str) {
  if (str.startsWith("**")) {
    return NODE_TYPES.WILDCARD;
  }
  if (str[0] === ":" || str === "*") {
    return NODE_TYPES.PLACEHOLDER;
  }
  return NODE_TYPES.NORMAL;
}

function toRouteMatcher(router) {
  const table = _routerNodeToTable("", router.ctx.rootNode);
  return _createMatcher(table, router.ctx.options.strictTrailingSlash);
}
function _createMatcher(table, strictTrailingSlash) {
  return {
    ctx: { table },
    matchAll: (path) => _matchRoutes(path, table, strictTrailingSlash)
  };
}
function _createRouteTable() {
  return {
    static: /* @__PURE__ */ new Map(),
    wildcard: /* @__PURE__ */ new Map(),
    dynamic: /* @__PURE__ */ new Map()
  };
}
function _matchRoutes(path, table, strictTrailingSlash) {
  if (strictTrailingSlash !== true && path.endsWith("/")) {
    path = path.slice(0, -1) || "/";
  }
  const matches = [];
  for (const [key, value] of _sortRoutesMap(table.wildcard)) {
    if (path === key || path.startsWith(key + "/")) {
      matches.push(value);
    }
  }
  for (const [key, value] of _sortRoutesMap(table.dynamic)) {
    if (path.startsWith(key + "/")) {
      const subPath = "/" + path.slice(key.length).split("/").splice(2).join("/");
      matches.push(..._matchRoutes(subPath, value));
    }
  }
  const staticMatch = table.static.get(path);
  if (staticMatch) {
    matches.push(staticMatch);
  }
  return matches.filter(Boolean);
}
function _sortRoutesMap(m) {
  return [...m.entries()].sort((a, b) => a[0].length - b[0].length);
}
function _routerNodeToTable(initialPath, initialNode) {
  const table = _createRouteTable();
  function _addNode(path, node) {
    if (path) {
      if (node.type === NODE_TYPES.NORMAL && !(path.includes("*") || path.includes(":"))) {
        if (node.data) {
          table.static.set(path, node.data);
        }
      } else if (node.type === NODE_TYPES.WILDCARD) {
        table.wildcard.set(path.replace("/**", ""), node.data);
      } else if (node.type === NODE_TYPES.PLACEHOLDER) {
        const subTable = _routerNodeToTable("", node);
        if (node.data) {
          subTable.static.set("/", node.data);
        }
        table.dynamic.set(path.replace(/\/\*|\/:\w+/, ""), subTable);
        return;
      }
    }
    for (const [childPath, child] of node.children.entries()) {
      _addNode(`${path}/${childPath}`.replace("//", "/"), child);
    }
  }
  _addNode(initialPath, initialNode);
  return table;
}

function isPlainObject(value) {
  if (value === null || typeof value !== "object") {
    return false;
  }
  const prototype = Object.getPrototypeOf(value);
  if (prototype !== null && prototype !== Object.prototype && Object.getPrototypeOf(prototype) !== null) {
    return false;
  }
  if (Symbol.iterator in value) {
    return false;
  }
  if (Symbol.toStringTag in value) {
    return Object.prototype.toString.call(value) === "[object Module]";
  }
  return true;
}

function _defu(baseObject, defaults, namespace = ".", merger) {
  if (!isPlainObject(defaults)) {
    return _defu(baseObject, {}, namespace, merger);
  }
  const object = Object.assign({}, defaults);
  for (const key in baseObject) {
    if (key === "__proto__" || key === "constructor") {
      continue;
    }
    const value = baseObject[key];
    if (value === null || value === void 0) {
      continue;
    }
    if (merger && merger(object, key, value, namespace)) {
      continue;
    }
    if (Array.isArray(value) && Array.isArray(object[key])) {
      object[key] = [...value, ...object[key]];
    } else if (isPlainObject(value) && isPlainObject(object[key])) {
      object[key] = _defu(
        value,
        object[key],
        (namespace ? `${namespace}.` : "") + key.toString(),
        merger
      );
    } else {
      object[key] = value;
    }
  }
  return object;
}
function createDefu(merger) {
  return (...arguments_) => (
    // eslint-disable-next-line unicorn/no-array-reduce
    arguments_.reduce((p, c) => _defu(p, c, "", merger), {})
  );
}
const defu = createDefu();
const defuFn = createDefu((object, key, currentValue) => {
  if (object[key] !== void 0 && typeof currentValue === "function") {
    object[key] = currentValue(object[key]);
    return true;
  }
});

function o(n){throw new Error(`${n} is not implemented yet!`)}let i$1 = class i extends EventEmitter{__unenv__={};readableEncoding=null;readableEnded=true;readableFlowing=false;readableHighWaterMark=0;readableLength=0;readableObjectMode=false;readableAborted=false;readableDidRead=false;closed=false;errored=null;readable=false;destroyed=false;static from(e,t){return new i(t)}constructor(e){super();}_read(e){}read(e){}setEncoding(e){return this}pause(){return this}resume(){return this}isPaused(){return  true}unpipe(e){return this}unshift(e,t){}wrap(e){return this}push(e,t){return  false}_destroy(e,t){this.removeAllListeners();}destroy(e){return this.destroyed=true,this._destroy(e),this}pipe(e,t){return {}}compose(e,t){throw new Error("Method not implemented.")}[Symbol.asyncDispose](){return this.destroy(),Promise.resolve()}async*[Symbol.asyncIterator](){throw o("Readable.asyncIterator")}iterator(e){throw o("Readable.iterator")}map(e,t){throw o("Readable.map")}filter(e,t){throw o("Readable.filter")}forEach(e,t){throw o("Readable.forEach")}reduce(e,t,r){throw o("Readable.reduce")}find(e,t){throw o("Readable.find")}findIndex(e,t){throw o("Readable.findIndex")}some(e,t){throw o("Readable.some")}toArray(e){throw o("Readable.toArray")}every(e,t){throw o("Readable.every")}flatMap(e,t){throw o("Readable.flatMap")}drop(e,t){throw o("Readable.drop")}take(e,t){throw o("Readable.take")}asIndexedPairs(e){throw o("Readable.asIndexedPairs")}};let l$1 = class l extends EventEmitter{__unenv__={};writable=true;writableEnded=false;writableFinished=false;writableHighWaterMark=0;writableLength=0;writableObjectMode=false;writableCorked=0;closed=false;errored=null;writableNeedDrain=false;writableAborted=false;destroyed=false;_data;_encoding="utf8";constructor(e){super();}pipe(e,t){return {}}_write(e,t,r){if(this.writableEnded){r&&r();return}if(this._data===void 0)this._data=e;else {const s=typeof this._data=="string"?Buffer$1.from(this._data,this._encoding||t||"utf8"):this._data,a=typeof e=="string"?Buffer$1.from(e,t||this._encoding||"utf8"):e;this._data=Buffer$1.concat([s,a]);}this._encoding=t,r&&r();}_writev(e,t){}_destroy(e,t){}_final(e){}write(e,t,r){const s=typeof t=="string"?this._encoding:"utf8",a=typeof t=="function"?t:typeof r=="function"?r:void 0;return this._write(e,s,a),true}setDefaultEncoding(e){return this}end(e,t,r){const s=typeof e=="function"?e:typeof t=="function"?t:typeof r=="function"?r:void 0;if(this.writableEnded)return s&&s(),this;const a=e===s?void 0:e;if(a){const u=t===s?void 0:t;this.write(a,u,s);}return this.writableEnded=true,this.writableFinished=true,this.emit("close"),this.emit("finish"),this}cork(){}uncork(){}destroy(e){return this.destroyed=true,delete this._data,this.removeAllListeners(),this}compose(e,t){throw new Error("Method not implemented.")}[Symbol.asyncDispose](){return Promise.resolve()}};const c$1=class c{allowHalfOpen=true;_destroy;constructor(e=new i$1,t=new l$1){Object.assign(this,e),Object.assign(this,t),this._destroy=m(e._destroy,t._destroy);}};function _(){return Object.assign(c$1.prototype,i$1.prototype),Object.assign(c$1.prototype,l$1.prototype),c$1}function m(...n){return function(...e){for(const t of n)t(...e);}}const g=_();class A extends g{__unenv__={};bufferSize=0;bytesRead=0;bytesWritten=0;connecting=false;destroyed=false;pending=false;localAddress="";localPort=0;remoteAddress="";remoteFamily="";remotePort=0;autoSelectFamilyAttemptedAddresses=[];readyState="readOnly";constructor(e){super();}write(e,t,r){return  false}connect(e,t,r){return this}end(e,t,r){return this}setEncoding(e){return this}pause(){return this}resume(){return this}setTimeout(e,t){return this}setNoDelay(e){return this}setKeepAlive(e,t){return this}address(){return {}}unref(){return this}ref(){return this}destroySoon(){this.destroy();}resetAndDestroy(){const e=new Error("ERR_SOCKET_CLOSED");return e.code="ERR_SOCKET_CLOSED",this.destroy(e),this}}class y extends i$1{aborted=false;httpVersion="1.1";httpVersionMajor=1;httpVersionMinor=1;complete=true;connection;socket;headers={};trailers={};method="GET";url="/";statusCode=200;statusMessage="";closed=false;errored=null;readable=false;constructor(e){super(),this.socket=this.connection=e||new A;}get rawHeaders(){const e=this.headers,t=[];for(const r in e)if(Array.isArray(e[r]))for(const s of e[r])t.push(r,s);else t.push(r,e[r]);return t}get rawTrailers(){return []}setTimeout(e,t){return this}get headersDistinct(){return p(this.headers)}get trailersDistinct(){return p(this.trailers)}}function p(n){const e={};for(const[t,r]of Object.entries(n))t&&(e[t]=(Array.isArray(r)?r:[r]).filter(Boolean));return e}class w extends l$1{statusCode=200;statusMessage="";upgrading=false;chunkedEncoding=false;shouldKeepAlive=false;useChunkedEncodingByDefault=false;sendDate=false;finished=false;headersSent=false;strictContentLength=false;connection=null;socket=null;req;_headers={};constructor(e){super(),this.req=e;}assignSocket(e){e._httpMessage=this,this.socket=e,this.connection=e,this.emit("socket",e),this._flush();}_flush(){this.flushHeaders();}detachSocket(e){}writeContinue(e){}writeHead(e,t,r){e&&(this.statusCode=e),typeof t=="string"&&(this.statusMessage=t,t=void 0);const s=r||t;if(s&&!Array.isArray(s))for(const a in s)this.setHeader(a,s[a]);return this.headersSent=true,this}writeProcessing(){}setTimeout(e,t){return this}appendHeader(e,t){e=e.toLowerCase();const r=this._headers[e],s=[...Array.isArray(r)?r:[r],...Array.isArray(t)?t:[t]].filter(Boolean);return this._headers[e]=s.length>1?s:s[0],this}setHeader(e,t){return this._headers[e.toLowerCase()]=t,this}setHeaders(e){for(const[t,r]of Object.entries(e))this.setHeader(t,r);return this}getHeader(e){return this._headers[e.toLowerCase()]}getHeaders(){return this._headers}getHeaderNames(){return Object.keys(this._headers)}hasHeader(e){return e.toLowerCase()in this._headers}removeHeader(e){delete this._headers[e.toLowerCase()];}addTrailers(e){}flushHeaders(){}writeEarlyHints(e,t){typeof t=="function"&&t();}}const E=(()=>{const n=function(){};return n.prototype=Object.create(null),n})();function R(n={}){const e=new E,t=Array.isArray(n)||H(n)?n:Object.entries(n);for(const[r,s]of t)if(s){if(e[r]===void 0){e[r]=s;continue}e[r]=[...Array.isArray(e[r])?e[r]:[e[r]],...Array.isArray(s)?s:[s]];}return e}function H(n){return typeof n?.entries=="function"}function v(n={}){if(n instanceof Headers)return n;const e=new Headers;for(const[t,r]of Object.entries(n))if(r!==void 0){if(Array.isArray(r)){for(const s of r)e.append(t,String(s));continue}e.set(t,String(r));}return e}const S=new Set([101,204,205,304]);async function b(n,e){const t=new y,r=new w(t);t.url=e.url?.toString()||"/";let s;if(!t.url.startsWith("/")){const d=new URL(t.url);s=d.host,t.url=d.pathname+d.search+d.hash;}t.method=e.method||"GET",t.headers=R(e.headers||{}),t.headers.host||(t.headers.host=e.host||s||"localhost"),t.connection.encrypted=t.connection.encrypted||e.protocol==="https",t.body=e.body||null,t.__unenv__=e.context,await n(t,r);let a=r._data;(S.has(r.statusCode)||t.method.toUpperCase()==="HEAD")&&(a=null,delete r._headers["content-length"]);const u={status:r.statusCode,statusText:r.statusMessage,headers:r._headers,body:a};return t.destroy(),r.destroy(),u}async function C(n,e,t={}){try{const r=await b(n,{url:e,...t});return new Response(r.body,{status:r.status,statusText:r.statusText,headers:v(r.headers)})}catch(r){return new Response(r.toString(),{status:Number.parseInt(r.statusCode||r.code)||500,statusText:r.statusText})}}

function hasProp(obj, prop) {
  try {
    return prop in obj;
  } catch {
    return false;
  }
}

class H3Error extends Error {
  static __h3_error__ = true;
  statusCode = 500;
  fatal = false;
  unhandled = false;
  statusMessage;
  data;
  cause;
  constructor(message, opts = {}) {
    super(message, opts);
    if (opts.cause && !this.cause) {
      this.cause = opts.cause;
    }
  }
  toJSON() {
    const obj = {
      message: this.message,
      statusCode: sanitizeStatusCode(this.statusCode, 500)
    };
    if (this.statusMessage) {
      obj.statusMessage = sanitizeStatusMessage(this.statusMessage);
    }
    if (this.data !== void 0) {
      obj.data = this.data;
    }
    return obj;
  }
}
function createError$1(input) {
  if (typeof input === "string") {
    return new H3Error(input);
  }
  if (isError(input)) {
    return input;
  }
  const err = new H3Error(input.message ?? input.statusMessage ?? "", {
    cause: input.cause || input
  });
  if (hasProp(input, "stack")) {
    try {
      Object.defineProperty(err, "stack", {
        get() {
          return input.stack;
        }
      });
    } catch {
      try {
        err.stack = input.stack;
      } catch {
      }
    }
  }
  if (input.data) {
    err.data = input.data;
  }
  if (input.statusCode) {
    err.statusCode = sanitizeStatusCode(input.statusCode, err.statusCode);
  } else if (input.status) {
    err.statusCode = sanitizeStatusCode(input.status, err.statusCode);
  }
  if (input.statusMessage) {
    err.statusMessage = input.statusMessage;
  } else if (input.statusText) {
    err.statusMessage = input.statusText;
  }
  if (err.statusMessage) {
    const originalMessage = err.statusMessage;
    const sanitizedMessage = sanitizeStatusMessage(err.statusMessage);
    if (sanitizedMessage !== originalMessage) {
      console.warn(
        "[h3] Please prefer using `message` for longer error messages instead of `statusMessage`. In the future, `statusMessage` will be sanitized by default."
      );
    }
  }
  if (input.fatal !== void 0) {
    err.fatal = input.fatal;
  }
  if (input.unhandled !== void 0) {
    err.unhandled = input.unhandled;
  }
  return err;
}
function sendError(event, error, debug) {
  if (event.handled) {
    return;
  }
  const h3Error = isError(error) ? error : createError$1(error);
  const responseBody = {
    statusCode: h3Error.statusCode,
    statusMessage: h3Error.statusMessage,
    stack: [],
    data: h3Error.data
  };
  if (debug) {
    responseBody.stack = (h3Error.stack || "").split("\n").map((l) => l.trim());
  }
  if (event.handled) {
    return;
  }
  const _code = Number.parseInt(h3Error.statusCode);
  setResponseStatus(event, _code, h3Error.statusMessage);
  event.node.res.setHeader("content-type", MIMES.json);
  event.node.res.end(JSON.stringify(responseBody, void 0, 2));
}
function isError(input) {
  return input?.constructor?.__h3_error__ === true;
}

function getQuery(event) {
  return getQuery$1(event.path || "");
}
function getRouterParams(event, opts = {}) {
  let params = event.context.params || {};
  if (opts.decode) {
    params = { ...params };
    for (const key in params) {
      params[key] = decode$2(params[key]);
    }
  }
  return params;
}
function getRouterParam(event, name, opts = {}) {
  const params = getRouterParams(event, opts);
  return params[name];
}
function isMethod(event, expected, allowHead) {
  if (typeof expected === "string") {
    if (event.method === expected) {
      return true;
    }
  } else if (expected.includes(event.method)) {
    return true;
  }
  return false;
}
function assertMethod(event, expected, allowHead) {
  if (!isMethod(event, expected)) {
    throw createError$1({
      statusCode: 405,
      statusMessage: "HTTP method is not allowed."
    });
  }
}
function getRequestHeaders(event) {
  const _headers = {};
  for (const key in event.node.req.headers) {
    const val = event.node.req.headers[key];
    _headers[key] = Array.isArray(val) ? val.filter(Boolean).join(", ") : val;
  }
  return _headers;
}
function getRequestHeader(event, name) {
  const headers = getRequestHeaders(event);
  const value = headers[name.toLowerCase()];
  return value;
}
function getRequestHost(event, opts = {}) {
  if (opts.xForwardedHost) {
    const _header = event.node.req.headers["x-forwarded-host"];
    const xForwardedHost = (_header || "").split(",").shift()?.trim();
    if (xForwardedHost) {
      return xForwardedHost;
    }
  }
  return event.node.req.headers.host || "localhost";
}
function getRequestProtocol(event, opts = {}) {
  if (opts.xForwardedProto !== false && event.node.req.headers["x-forwarded-proto"] === "https") {
    return "https";
  }
  return event.node.req.connection?.encrypted ? "https" : "http";
}
function getRequestURL(event, opts = {}) {
  const host = getRequestHost(event, opts);
  const protocol = getRequestProtocol(event, opts);
  const path = (event.node.req.originalUrl || event.path).replace(
    /^[/\\]+/g,
    "/"
  );
  return new URL(path, `${protocol}://${host}`);
}

const RawBodySymbol = Symbol.for("h3RawBody");
const PayloadMethods$1 = ["PATCH", "POST", "PUT", "DELETE"];
function readRawBody(event, encoding = "utf8") {
  assertMethod(event, PayloadMethods$1);
  const _rawBody = event._requestBody || event.web?.request?.body || event.node.req[RawBodySymbol] || event.node.req.rawBody || event.node.req.body;
  if (_rawBody) {
    const promise2 = Promise.resolve(_rawBody).then((_resolved) => {
      if (Buffer.isBuffer(_resolved)) {
        return _resolved;
      }
      if (typeof _resolved.pipeTo === "function") {
        return new Promise((resolve, reject) => {
          const chunks = [];
          _resolved.pipeTo(
            new WritableStream({
              write(chunk) {
                chunks.push(chunk);
              },
              close() {
                resolve(Buffer.concat(chunks));
              },
              abort(reason) {
                reject(reason);
              }
            })
          ).catch(reject);
        });
      } else if (typeof _resolved.pipe === "function") {
        return new Promise((resolve, reject) => {
          const chunks = [];
          _resolved.on("data", (chunk) => {
            chunks.push(chunk);
          }).on("end", () => {
            resolve(Buffer.concat(chunks));
          }).on("error", reject);
        });
      }
      if (_resolved.constructor === Object) {
        return Buffer.from(JSON.stringify(_resolved));
      }
      if (_resolved instanceof URLSearchParams) {
        return Buffer.from(_resolved.toString());
      }
      if (_resolved instanceof FormData) {
        return new Response(_resolved).bytes().then((uint8arr) => Buffer.from(uint8arr));
      }
      return Buffer.from(_resolved);
    });
    return encoding ? promise2.then((buff) => buff.toString(encoding)) : promise2;
  }
  if (!Number.parseInt(event.node.req.headers["content-length"] || "") && !String(event.node.req.headers["transfer-encoding"] ?? "").split(",").map((e) => e.trim()).filter(Boolean).includes("chunked")) {
    return Promise.resolve(void 0);
  }
  const promise = event.node.req[RawBodySymbol] = new Promise(
    (resolve, reject) => {
      const bodyData = [];
      event.node.req.on("error", (err) => {
        reject(err);
      }).on("data", (chunk) => {
        bodyData.push(chunk);
      }).on("end", () => {
        resolve(Buffer.concat(bodyData));
      });
    }
  );
  const result = encoding ? promise.then((buff) => buff.toString(encoding)) : promise;
  return result;
}
function getRequestWebStream(event) {
  if (!PayloadMethods$1.includes(event.method)) {
    return;
  }
  const bodyStream = event.web?.request?.body || event._requestBody;
  if (bodyStream) {
    return bodyStream;
  }
  const _hasRawBody = RawBodySymbol in event.node.req || "rawBody" in event.node.req || "body" in event.node.req || "__unenv__" in event.node.req;
  if (_hasRawBody) {
    return new ReadableStream({
      async start(controller) {
        const _rawBody = await readRawBody(event, false);
        if (_rawBody) {
          controller.enqueue(_rawBody);
        }
        controller.close();
      }
    });
  }
  return new ReadableStream({
    start: (controller) => {
      event.node.req.on("data", (chunk) => {
        controller.enqueue(chunk);
      });
      event.node.req.on("end", () => {
        controller.close();
      });
      event.node.req.on("error", (err) => {
        controller.error(err);
      });
    }
  });
}

function handleCacheHeaders(event, opts) {
  const cacheControls = ["public", ...opts.cacheControls || []];
  let cacheMatched = false;
  if (opts.maxAge !== void 0) {
    cacheControls.push(`max-age=${+opts.maxAge}`, `s-maxage=${+opts.maxAge}`);
  }
  if (opts.modifiedTime) {
    const modifiedTime = new Date(opts.modifiedTime);
    const ifModifiedSince = event.node.req.headers["if-modified-since"];
    event.node.res.setHeader("last-modified", modifiedTime.toUTCString());
    if (ifModifiedSince && new Date(ifModifiedSince) >= modifiedTime) {
      cacheMatched = true;
    }
  }
  if (opts.etag) {
    event.node.res.setHeader("etag", opts.etag);
    const ifNonMatch = event.node.req.headers["if-none-match"];
    if (ifNonMatch === opts.etag) {
      cacheMatched = true;
    }
  }
  event.node.res.setHeader("cache-control", cacheControls.join(", "));
  if (cacheMatched) {
    event.node.res.statusCode = 304;
    if (!event.handled) {
      event.node.res.end();
    }
    return true;
  }
  return false;
}

const MIMES = {
  html: "text/html",
  json: "application/json"
};

const DISALLOWED_STATUS_CHARS = /[^\u0009\u0020-\u007E]/g;
function sanitizeStatusMessage(statusMessage = "") {
  return statusMessage.replace(DISALLOWED_STATUS_CHARS, "");
}
function sanitizeStatusCode(statusCode, defaultStatusCode = 200) {
  if (!statusCode) {
    return defaultStatusCode;
  }
  if (typeof statusCode === "string") {
    statusCode = Number.parseInt(statusCode, 10);
  }
  if (statusCode < 100 || statusCode > 999) {
    return defaultStatusCode;
  }
  return statusCode;
}

function getDistinctCookieKey(name, opts) {
  return [name, opts.domain || "", opts.path || "/"].join(";");
}

function parseCookies(event) {
  return parse$1(event.node.req.headers.cookie || "");
}
function getCookie(event, name) {
  return parseCookies(event)[name];
}
function setCookie(event, name, value, serializeOptions = {}) {
  if (!serializeOptions.path) {
    serializeOptions = { path: "/", ...serializeOptions };
  }
  const newCookie = serialize$2(name, value, serializeOptions);
  const currentCookies = splitCookiesString(
    event.node.res.getHeader("set-cookie")
  );
  if (currentCookies.length === 0) {
    event.node.res.setHeader("set-cookie", newCookie);
    return;
  }
  const newCookieKey = getDistinctCookieKey(name, serializeOptions);
  event.node.res.removeHeader("set-cookie");
  for (const cookie of currentCookies) {
    const parsed = parseSetCookie(cookie);
    const key = getDistinctCookieKey(parsed.name, parsed);
    if (key === newCookieKey) {
      continue;
    }
    event.node.res.appendHeader("set-cookie", cookie);
  }
  event.node.res.appendHeader("set-cookie", newCookie);
}
function deleteCookie(event, name, serializeOptions) {
  setCookie(event, name, "", {
    ...serializeOptions,
    maxAge: 0
  });
}
function splitCookiesString(cookiesString) {
  if (Array.isArray(cookiesString)) {
    return cookiesString.flatMap((c) => splitCookiesString(c));
  }
  if (typeof cookiesString !== "string") {
    return [];
  }
  const cookiesStrings = [];
  let pos = 0;
  let start;
  let ch;
  let lastComma;
  let nextStart;
  let cookiesSeparatorFound;
  const skipWhitespace = () => {
    while (pos < cookiesString.length && /\s/.test(cookiesString.charAt(pos))) {
      pos += 1;
    }
    return pos < cookiesString.length;
  };
  const notSpecialChar = () => {
    ch = cookiesString.charAt(pos);
    return ch !== "=" && ch !== ";" && ch !== ",";
  };
  while (pos < cookiesString.length) {
    start = pos;
    cookiesSeparatorFound = false;
    while (skipWhitespace()) {
      ch = cookiesString.charAt(pos);
      if (ch === ",") {
        lastComma = pos;
        pos += 1;
        skipWhitespace();
        nextStart = pos;
        while (pos < cookiesString.length && notSpecialChar()) {
          pos += 1;
        }
        if (pos < cookiesString.length && cookiesString.charAt(pos) === "=") {
          cookiesSeparatorFound = true;
          pos = nextStart;
          cookiesStrings.push(cookiesString.slice(start, lastComma));
          start = pos;
        } else {
          pos = lastComma + 1;
        }
      } else {
        pos += 1;
      }
    }
    if (!cookiesSeparatorFound || pos >= cookiesString.length) {
      cookiesStrings.push(cookiesString.slice(start));
    }
  }
  return cookiesStrings;
}

const defer = typeof setImmediate === "undefined" ? (fn) => fn() : setImmediate;
function send(event, data, type) {
  if (type) {
    defaultContentType(event, type);
  }
  return new Promise((resolve) => {
    defer(() => {
      if (!event.handled) {
        event.node.res.end(data);
      }
      resolve();
    });
  });
}
function sendNoContent(event, code) {
  if (event.handled) {
    return;
  }
  if (!code && event.node.res.statusCode !== 200) {
    code = event.node.res.statusCode;
  }
  const _code = sanitizeStatusCode(code, 204);
  if (_code === 204) {
    event.node.res.removeHeader("content-length");
  }
  event.node.res.writeHead(_code);
  event.node.res.end();
}
function setResponseStatus(event, code, text) {
  if (code) {
    event.node.res.statusCode = sanitizeStatusCode(
      code,
      event.node.res.statusCode
    );
  }
  if (text) {
    event.node.res.statusMessage = sanitizeStatusMessage(text);
  }
}
function getResponseStatus(event) {
  return event.node.res.statusCode;
}
function getResponseStatusText(event) {
  return event.node.res.statusMessage;
}
function defaultContentType(event, type) {
  if (type && event.node.res.statusCode !== 304 && !event.node.res.getHeader("content-type")) {
    event.node.res.setHeader("content-type", type);
  }
}
function sendRedirect(event, location, code = 302) {
  event.node.res.statusCode = sanitizeStatusCode(
    code,
    event.node.res.statusCode
  );
  event.node.res.setHeader("location", location);
  const encodedLoc = location.replace(/"/g, "%22");
  const html = `<!DOCTYPE html><html><head><meta http-equiv="refresh" content="0; url=${encodedLoc}"></head></html>`;
  return send(event, html, MIMES.html);
}
function getResponseHeader(event, name) {
  return event.node.res.getHeader(name);
}
function setResponseHeaders(event, headers) {
  for (const [name, value] of Object.entries(headers)) {
    event.node.res.setHeader(
      name,
      value
    );
  }
}
const setHeaders = setResponseHeaders;
function setResponseHeader(event, name, value) {
  event.node.res.setHeader(name, value);
}
function appendResponseHeader(event, name, value) {
  let current = event.node.res.getHeader(name);
  if (!current) {
    event.node.res.setHeader(name, value);
    return;
  }
  if (!Array.isArray(current)) {
    current = [current.toString()];
  }
  event.node.res.setHeader(name, [...current, value]);
}
function removeResponseHeader(event, name) {
  return event.node.res.removeHeader(name);
}
function isStream(data) {
  if (!data || typeof data !== "object") {
    return false;
  }
  if (typeof data.pipe === "function") {
    if (typeof data._read === "function") {
      return true;
    }
    if (typeof data.abort === "function") {
      return true;
    }
  }
  if (typeof data.pipeTo === "function") {
    return true;
  }
  return false;
}
function isWebResponse(data) {
  return typeof Response !== "undefined" && data instanceof Response;
}
function sendStream(event, stream) {
  if (!stream || typeof stream !== "object") {
    throw new Error("[h3] Invalid stream provided.");
  }
  event.node.res._data = stream;
  if (!event.node.res.socket) {
    event._handled = true;
    return Promise.resolve();
  }
  if (hasProp(stream, "pipeTo") && typeof stream.pipeTo === "function") {
    return stream.pipeTo(
      new WritableStream({
        write(chunk) {
          event.node.res.write(chunk);
        }
      })
    ).then(() => {
      event.node.res.end();
    });
  }
  if (hasProp(stream, "pipe") && typeof stream.pipe === "function") {
    return new Promise((resolve, reject) => {
      stream.pipe(event.node.res);
      if (stream.on) {
        stream.on("end", () => {
          event.node.res.end();
          resolve();
        });
        stream.on("error", (error) => {
          reject(error);
        });
      }
      event.node.res.on("close", () => {
        if (stream.abort) {
          stream.abort();
        }
      });
    });
  }
  throw new Error("[h3] Invalid or incompatible stream provided.");
}
function sendWebResponse(event, response) {
  for (const [key, value] of response.headers) {
    if (key === "set-cookie") {
      event.node.res.appendHeader(key, splitCookiesString(value));
    } else {
      event.node.res.setHeader(key, value);
    }
  }
  if (response.status) {
    event.node.res.statusCode = sanitizeStatusCode(
      response.status,
      event.node.res.statusCode
    );
  }
  if (response.statusText) {
    event.node.res.statusMessage = sanitizeStatusMessage(response.statusText);
  }
  if (response.redirected) {
    event.node.res.setHeader("location", response.url);
  }
  if (!response.body) {
    event.node.res.end();
    return;
  }
  return sendStream(event, response.body);
}

const PayloadMethods = /* @__PURE__ */ new Set(["PATCH", "POST", "PUT", "DELETE"]);
const ignoredHeaders = /* @__PURE__ */ new Set([
  "transfer-encoding",
  "accept-encoding",
  "connection",
  "keep-alive",
  "upgrade",
  "expect",
  "host",
  "accept"
]);
async function proxyRequest(event, target, opts = {}) {
  let body;
  let duplex;
  if (PayloadMethods.has(event.method)) {
    if (opts.streamRequest) {
      body = getRequestWebStream(event);
      duplex = "half";
    } else {
      body = await readRawBody(event, false).catch(() => void 0);
    }
  }
  const method = opts.fetchOptions?.method || event.method;
  const fetchHeaders = mergeHeaders$1(
    getProxyRequestHeaders(event, { host: target.startsWith("/") }),
    opts.fetchOptions?.headers,
    opts.headers
  );
  return sendProxy(event, target, {
    ...opts,
    fetchOptions: {
      method,
      body,
      duplex,
      ...opts.fetchOptions,
      headers: fetchHeaders
    }
  });
}
async function sendProxy(event, target, opts = {}) {
  let response;
  try {
    response = await _getFetch(opts.fetch)(target, {
      headers: opts.headers,
      ignoreResponseError: true,
      // make $ofetch.raw transparent
      ...opts.fetchOptions
    });
  } catch (error) {
    throw createError$1({
      status: 502,
      statusMessage: "Bad Gateway",
      cause: error
    });
  }
  event.node.res.statusCode = sanitizeStatusCode(
    response.status,
    event.node.res.statusCode
  );
  event.node.res.statusMessage = sanitizeStatusMessage(response.statusText);
  const cookies = [];
  for (const [key, value] of response.headers.entries()) {
    if (key === "content-encoding") {
      continue;
    }
    if (key === "content-length") {
      continue;
    }
    if (key === "set-cookie") {
      cookies.push(...splitCookiesString(value));
      continue;
    }
    event.node.res.setHeader(key, value);
  }
  if (cookies.length > 0) {
    event.node.res.setHeader(
      "set-cookie",
      cookies.map((cookie) => {
        if (opts.cookieDomainRewrite) {
          cookie = rewriteCookieProperty(
            cookie,
            opts.cookieDomainRewrite,
            "domain"
          );
        }
        if (opts.cookiePathRewrite) {
          cookie = rewriteCookieProperty(
            cookie,
            opts.cookiePathRewrite,
            "path"
          );
        }
        return cookie;
      })
    );
  }
  if (opts.onResponse) {
    await opts.onResponse(event, response);
  }
  if (response._data !== void 0) {
    return response._data;
  }
  if (event.handled) {
    return;
  }
  if (opts.sendStream === false) {
    const data = new Uint8Array(await response.arrayBuffer());
    return event.node.res.end(data);
  }
  if (response.body) {
    for await (const chunk of response.body) {
      event.node.res.write(chunk);
    }
  }
  return event.node.res.end();
}
function getProxyRequestHeaders(event, opts) {
  const headers = /* @__PURE__ */ Object.create(null);
  const reqHeaders = getRequestHeaders(event);
  for (const name in reqHeaders) {
    if (!ignoredHeaders.has(name) || name === "host" && opts?.host) {
      headers[name] = reqHeaders[name];
    }
  }
  return headers;
}
function fetchWithEvent(event, req, init, options) {
  return _getFetch(options?.fetch)(req, {
    ...init,
    context: init?.context || event.context,
    headers: {
      ...getProxyRequestHeaders(event, {
        host: typeof req === "string" && req.startsWith("/")
      }),
      ...init?.headers
    }
  });
}
function _getFetch(_fetch) {
  if (_fetch) {
    return _fetch;
  }
  if (globalThis.fetch) {
    return globalThis.fetch;
  }
  throw new Error(
    "fetch is not available. Try importing `node-fetch-native/polyfill` for Node.js."
  );
}
function rewriteCookieProperty(header, map, property) {
  const _map = typeof map === "string" ? { "*": map } : map;
  return header.replace(
    new RegExp(`(;\\s*${property}=)([^;]+)`, "gi"),
    (match, prefix, previousValue) => {
      let newValue;
      if (previousValue in _map) {
        newValue = _map[previousValue];
      } else if ("*" in _map) {
        newValue = _map["*"];
      } else {
        return match;
      }
      return newValue ? prefix + newValue : "";
    }
  );
}
function mergeHeaders$1(defaults, ...inputs) {
  const _inputs = inputs.filter(Boolean);
  if (_inputs.length === 0) {
    return defaults;
  }
  const merged = new Headers(defaults);
  for (const input of _inputs) {
    const entries = Array.isArray(input) ? input : typeof input.entries === "function" ? input.entries() : Object.entries(input);
    for (const [key, value] of entries) {
      if (value !== void 0) {
        merged.set(key, value);
      }
    }
  }
  return merged;
}

class H3Event {
  "__is_event__" = true;
  // Context
  node;
  // Node
  web;
  // Web
  context = {};
  // Shared
  // Request
  _method;
  _path;
  _headers;
  _requestBody;
  // Response
  _handled = false;
  // Hooks
  _onBeforeResponseCalled;
  _onAfterResponseCalled;
  constructor(req, res) {
    this.node = { req, res };
  }
  // --- Request ---
  get method() {
    if (!this._method) {
      this._method = (this.node.req.method || "GET").toUpperCase();
    }
    return this._method;
  }
  get path() {
    return this._path || this.node.req.url || "/";
  }
  get headers() {
    if (!this._headers) {
      this._headers = _normalizeNodeHeaders(this.node.req.headers);
    }
    return this._headers;
  }
  // --- Respoonse ---
  get handled() {
    return this._handled || this.node.res.writableEnded || this.node.res.headersSent;
  }
  respondWith(response) {
    return Promise.resolve(response).then(
      (_response) => sendWebResponse(this, _response)
    );
  }
  // --- Utils ---
  toString() {
    return `[${this.method}] ${this.path}`;
  }
  toJSON() {
    return this.toString();
  }
  // --- Deprecated ---
  /** @deprecated Please use `event.node.req` instead. */
  get req() {
    return this.node.req;
  }
  /** @deprecated Please use `event.node.res` instead. */
  get res() {
    return this.node.res;
  }
}
function isEvent(input) {
  return hasProp(input, "__is_event__");
}
function createEvent(req, res) {
  return new H3Event(req, res);
}
function _normalizeNodeHeaders(nodeHeaders) {
  const headers = new Headers();
  for (const [name, value] of Object.entries(nodeHeaders)) {
    if (Array.isArray(value)) {
      for (const item of value) {
        headers.append(name, item);
      }
    } else if (value) {
      headers.set(name, value);
    }
  }
  return headers;
}

function defineEventHandler(handler) {
  if (typeof handler === "function") {
    handler.__is_handler__ = true;
    return handler;
  }
  const _hooks = {
    onRequest: _normalizeArray(handler.onRequest),
    onBeforeResponse: _normalizeArray(handler.onBeforeResponse)
  };
  const _handler = (event) => {
    return _callHandler(event, handler.handler, _hooks);
  };
  _handler.__is_handler__ = true;
  _handler.__resolve__ = handler.handler.__resolve__;
  _handler.__websocket__ = handler.websocket;
  return _handler;
}
function _normalizeArray(input) {
  return input ? Array.isArray(input) ? input : [input] : void 0;
}
async function _callHandler(event, handler, hooks) {
  if (hooks.onRequest) {
    for (const hook of hooks.onRequest) {
      await hook(event);
      if (event.handled) {
        return;
      }
    }
  }
  const body = await handler(event);
  const response = { body };
  if (hooks.onBeforeResponse) {
    for (const hook of hooks.onBeforeResponse) {
      await hook(event, response);
    }
  }
  return response.body;
}
const eventHandler = defineEventHandler;
function isEventHandler(input) {
  return hasProp(input, "__is_handler__");
}
function toEventHandler(input, _, _route) {
  if (!isEventHandler(input)) {
    console.warn(
      "[h3] Implicit event handler conversion is deprecated. Use `eventHandler()` or `fromNodeMiddleware()` to define event handlers.",
      _route && _route !== "/" ? `
     Route: ${_route}` : "",
      `
     Handler: ${input}`
    );
  }
  return input;
}
function defineLazyEventHandler(factory) {
  let _promise;
  let _resolved;
  const resolveHandler = () => {
    if (_resolved) {
      return Promise.resolve(_resolved);
    }
    if (!_promise) {
      _promise = Promise.resolve(factory()).then((r) => {
        const handler2 = r.default || r;
        if (typeof handler2 !== "function") {
          throw new TypeError(
            "Invalid lazy handler result. It should be a function:",
            handler2
          );
        }
        _resolved = { handler: toEventHandler(r.default || r) };
        return _resolved;
      });
    }
    return _promise;
  };
  const handler = eventHandler((event) => {
    if (_resolved) {
      return _resolved.handler(event);
    }
    return resolveHandler().then((r) => r.handler(event));
  });
  handler.__resolve__ = resolveHandler;
  return handler;
}
const lazyEventHandler = defineLazyEventHandler;

function createApp(options = {}) {
  const stack = [];
  const handler = createAppEventHandler(stack, options);
  const resolve = createResolver(stack);
  handler.__resolve__ = resolve;
  const getWebsocket = cachedFn(() => websocketOptions(resolve, options));
  const app = {
    // @ts-expect-error
    use: (arg1, arg2, arg3) => use(app, arg1, arg2, arg3),
    resolve,
    handler,
    stack,
    options,
    get websocket() {
      return getWebsocket();
    }
  };
  return app;
}
function use(app, arg1, arg2, arg3) {
  if (Array.isArray(arg1)) {
    for (const i of arg1) {
      use(app, i, arg2, arg3);
    }
  } else if (Array.isArray(arg2)) {
    for (const i of arg2) {
      use(app, arg1, i, arg3);
    }
  } else if (typeof arg1 === "string") {
    app.stack.push(
      normalizeLayer({ ...arg3, route: arg1, handler: arg2 })
    );
  } else if (typeof arg1 === "function") {
    app.stack.push(normalizeLayer({ ...arg2, handler: arg1 }));
  } else {
    app.stack.push(normalizeLayer({ ...arg1 }));
  }
  return app;
}
function createAppEventHandler(stack, options) {
  const spacing = options.debug ? 2 : void 0;
  return eventHandler(async (event) => {
    event.node.req.originalUrl = event.node.req.originalUrl || event.node.req.url || "/";
    const _reqPath = event._path || event.node.req.url || "/";
    let _layerPath;
    if (options.onRequest) {
      await options.onRequest(event);
    }
    for (const layer of stack) {
      if (layer.route.length > 1) {
        if (!_reqPath.startsWith(layer.route)) {
          continue;
        }
        _layerPath = _reqPath.slice(layer.route.length) || "/";
      } else {
        _layerPath = _reqPath;
      }
      if (layer.match && !layer.match(_layerPath, event)) {
        continue;
      }
      event._path = _layerPath;
      event.node.req.url = _layerPath;
      const val = await layer.handler(event);
      const _body = val === void 0 ? void 0 : await val;
      if (_body !== void 0) {
        const _response = { body: _body };
        if (options.onBeforeResponse) {
          event._onBeforeResponseCalled = true;
          await options.onBeforeResponse(event, _response);
        }
        await handleHandlerResponse(event, _response.body, spacing);
        if (options.onAfterResponse) {
          event._onAfterResponseCalled = true;
          await options.onAfterResponse(event, _response);
        }
        return;
      }
      if (event.handled) {
        if (options.onAfterResponse) {
          event._onAfterResponseCalled = true;
          await options.onAfterResponse(event, void 0);
        }
        return;
      }
    }
    if (!event.handled) {
      throw createError$1({
        statusCode: 404,
        statusMessage: `Cannot find any path matching ${event.path || "/"}.`
      });
    }
    if (options.onAfterResponse) {
      event._onAfterResponseCalled = true;
      await options.onAfterResponse(event, void 0);
    }
  });
}
function createResolver(stack) {
  return async (path) => {
    let _layerPath;
    for (const layer of stack) {
      if (layer.route === "/" && !layer.handler.__resolve__) {
        continue;
      }
      if (!path.startsWith(layer.route)) {
        continue;
      }
      _layerPath = path.slice(layer.route.length) || "/";
      if (layer.match && !layer.match(_layerPath, void 0)) {
        continue;
      }
      let res = { route: layer.route, handler: layer.handler };
      if (res.handler.__resolve__) {
        const _res = await res.handler.__resolve__(_layerPath);
        if (!_res) {
          continue;
        }
        res = {
          ...res,
          ..._res,
          route: joinURL(res.route || "/", _res.route || "/")
        };
      }
      return res;
    }
  };
}
function normalizeLayer(input) {
  let handler = input.handler;
  if (handler.handler) {
    handler = handler.handler;
  }
  if (input.lazy) {
    handler = lazyEventHandler(handler);
  } else if (!isEventHandler(handler)) {
    handler = toEventHandler(handler, void 0, input.route);
  }
  return {
    route: withoutTrailingSlash(input.route),
    match: input.match,
    handler
  };
}
function handleHandlerResponse(event, val, jsonSpace) {
  if (val === null) {
    return sendNoContent(event);
  }
  if (val) {
    if (isWebResponse(val)) {
      return sendWebResponse(event, val);
    }
    if (isStream(val)) {
      return sendStream(event, val);
    }
    if (val.buffer) {
      return send(event, val);
    }
    if (val.arrayBuffer && typeof val.arrayBuffer === "function") {
      return val.arrayBuffer().then((arrayBuffer) => {
        return send(event, Buffer.from(arrayBuffer), val.type);
      });
    }
    if (val instanceof Error) {
      throw createError$1(val);
    }
    if (typeof val.end === "function") {
      return true;
    }
  }
  const valType = typeof val;
  if (valType === "string") {
    return send(event, val, MIMES.html);
  }
  if (valType === "object" || valType === "boolean" || valType === "number") {
    return send(event, JSON.stringify(val, void 0, jsonSpace), MIMES.json);
  }
  if (valType === "bigint") {
    return send(event, val.toString(), MIMES.json);
  }
  throw createError$1({
    statusCode: 500,
    statusMessage: `[h3] Cannot send ${valType} as response.`
  });
}
function cachedFn(fn) {
  let cache;
  return () => {
    if (!cache) {
      cache = fn();
    }
    return cache;
  };
}
function websocketOptions(evResolver, appOptions) {
  return {
    ...appOptions.websocket,
    async resolve(info) {
      const url = info.request?.url || info.url || "/";
      const { pathname } = typeof url === "string" ? parseURL(url) : url;
      const resolved = await evResolver(pathname);
      return resolved?.handler?.__websocket__ || {};
    }
  };
}

const RouterMethods = [
  "connect",
  "delete",
  "get",
  "head",
  "options",
  "post",
  "put",
  "trace",
  "patch"
];
function createRouter(opts = {}) {
  const _router = createRouter$1({});
  const routes = {};
  let _matcher;
  const router = {};
  const addRoute = (path, handler, method) => {
    let route = routes[path];
    if (!route) {
      routes[path] = route = { path, handlers: {} };
      _router.insert(path, route);
    }
    if (Array.isArray(method)) {
      for (const m of method) {
        addRoute(path, handler, m);
      }
    } else {
      route.handlers[method] = toEventHandler(handler, void 0, path);
    }
    return router;
  };
  router.use = router.add = (path, handler, method) => addRoute(path, handler, method || "all");
  for (const method of RouterMethods) {
    router[method] = (path, handle) => router.add(path, handle, method);
  }
  const matchHandler = (path = "/", method = "get") => {
    const qIndex = path.indexOf("?");
    if (qIndex !== -1) {
      path = path.slice(0, Math.max(0, qIndex));
    }
    const matched = _router.lookup(path);
    if (!matched || !matched.handlers) {
      return {
        error: createError$1({
          statusCode: 404,
          name: "Not Found",
          statusMessage: `Cannot find any route matching ${path || "/"}.`
        })
      };
    }
    let handler = matched.handlers[method] || matched.handlers.all;
    if (!handler) {
      if (!_matcher) {
        _matcher = toRouteMatcher(_router);
      }
      const _matches = _matcher.matchAll(path).reverse();
      for (const _match of _matches) {
        if (_match.handlers[method]) {
          handler = _match.handlers[method];
          matched.handlers[method] = matched.handlers[method] || handler;
          break;
        }
        if (_match.handlers.all) {
          handler = _match.handlers.all;
          matched.handlers.all = matched.handlers.all || handler;
          break;
        }
      }
    }
    if (!handler) {
      return {
        error: createError$1({
          statusCode: 405,
          name: "Method Not Allowed",
          statusMessage: `Method ${method} is not allowed on this route.`
        })
      };
    }
    return { matched, handler };
  };
  const isPreemptive = opts.preemptive || opts.preemtive;
  router.handler = eventHandler((event) => {
    const match = matchHandler(
      event.path,
      event.method.toLowerCase()
    );
    if ("error" in match) {
      if (isPreemptive) {
        throw match.error;
      } else {
        return;
      }
    }
    event.context.matchedRoute = match.matched;
    const params = match.matched.params || {};
    event.context.params = params;
    return Promise.resolve(match.handler(event)).then((res) => {
      if (res === void 0 && isPreemptive) {
        return null;
      }
      return res;
    });
  });
  router.handler.__resolve__ = async (path) => {
    path = withLeadingSlash(path);
    const match = matchHandler(path);
    if ("error" in match) {
      return;
    }
    let res = {
      route: match.matched.path,
      handler: match.handler
    };
    if (match.handler.__resolve__) {
      const _res = await match.handler.__resolve__(path);
      if (!_res) {
        return;
      }
      res = { ...res, ..._res };
    }
    return res;
  };
  return router;
}
function toNodeListener(app) {
  const toNodeHandle = async function(req, res) {
    const event = createEvent(req, res);
    try {
      await app.handler(event);
    } catch (_error) {
      const error = createError$1(_error);
      if (!isError(_error)) {
        error.unhandled = true;
      }
      setResponseStatus(event, error.statusCode, error.statusMessage);
      if (app.options.onError) {
        await app.options.onError(error, event);
      }
      if (event.handled) {
        return;
      }
      if (error.unhandled || error.fatal) {
        console.error("[h3]", error.fatal ? "[fatal]" : "[unhandled]", error);
      }
      if (app.options.onBeforeResponse && !event._onBeforeResponseCalled) {
        await app.options.onBeforeResponse(event, { body: error });
      }
      await sendError(event, error, !!app.options.debug);
      if (app.options.onAfterResponse && !event._onAfterResponseCalled) {
        await app.options.onAfterResponse(event, { body: error });
      }
    }
  };
  return toNodeHandle;
}

function flatHooks(configHooks, hooks = {}, parentName) {
  for (const key in configHooks) {
    const subHook = configHooks[key];
    const name = parentName ? `${parentName}:${key}` : key;
    if (typeof subHook === "object" && subHook !== null) {
      flatHooks(subHook, hooks, name);
    } else if (typeof subHook === "function") {
      hooks[name] = subHook;
    }
  }
  return hooks;
}
const defaultTask = { run: (function_) => function_() };
const _createTask = () => defaultTask;
const createTask = typeof console.createTask !== "undefined" ? console.createTask : _createTask;
function serialTaskCaller(hooks, args) {
  const name = args.shift();
  const task = createTask(name);
  return hooks.reduce(
    (promise, hookFunction) => promise.then(() => task.run(() => hookFunction(...args))),
    Promise.resolve()
  );
}
function parallelTaskCaller(hooks, args) {
  const name = args.shift();
  const task = createTask(name);
  return Promise.all(hooks.map((hook) => task.run(() => hook(...args))));
}
function callEachWith(callbacks, arg0) {
  for (const callback of [...callbacks]) {
    callback(arg0);
  }
}

class Hookable {
  constructor() {
    this._hooks = {};
    this._before = void 0;
    this._after = void 0;
    this._deprecatedMessages = void 0;
    this._deprecatedHooks = {};
    this.hook = this.hook.bind(this);
    this.callHook = this.callHook.bind(this);
    this.callHookWith = this.callHookWith.bind(this);
  }
  hook(name, function_, options = {}) {
    if (!name || typeof function_ !== "function") {
      return () => {
      };
    }
    const originalName = name;
    let dep;
    while (this._deprecatedHooks[name]) {
      dep = this._deprecatedHooks[name];
      name = dep.to;
    }
    if (dep && !options.allowDeprecated) {
      let message = dep.message;
      if (!message) {
        message = `${originalName} hook has been deprecated` + (dep.to ? `, please use ${dep.to}` : "");
      }
      if (!this._deprecatedMessages) {
        this._deprecatedMessages = /* @__PURE__ */ new Set();
      }
      if (!this._deprecatedMessages.has(message)) {
        console.warn(message);
        this._deprecatedMessages.add(message);
      }
    }
    if (!function_.name) {
      try {
        Object.defineProperty(function_, "name", {
          get: () => "_" + name.replace(/\W+/g, "_") + "_hook_cb",
          configurable: true
        });
      } catch {
      }
    }
    this._hooks[name] = this._hooks[name] || [];
    this._hooks[name].push(function_);
    return () => {
      if (function_) {
        this.removeHook(name, function_);
        function_ = void 0;
      }
    };
  }
  hookOnce(name, function_) {
    let _unreg;
    let _function = (...arguments_) => {
      if (typeof _unreg === "function") {
        _unreg();
      }
      _unreg = void 0;
      _function = void 0;
      return function_(...arguments_);
    };
    _unreg = this.hook(name, _function);
    return _unreg;
  }
  removeHook(name, function_) {
    if (this._hooks[name]) {
      const index = this._hooks[name].indexOf(function_);
      if (index !== -1) {
        this._hooks[name].splice(index, 1);
      }
      if (this._hooks[name].length === 0) {
        delete this._hooks[name];
      }
    }
  }
  deprecateHook(name, deprecated) {
    this._deprecatedHooks[name] = typeof deprecated === "string" ? { to: deprecated } : deprecated;
    const _hooks = this._hooks[name] || [];
    delete this._hooks[name];
    for (const hook of _hooks) {
      this.hook(name, hook);
    }
  }
  deprecateHooks(deprecatedHooks) {
    Object.assign(this._deprecatedHooks, deprecatedHooks);
    for (const name in deprecatedHooks) {
      this.deprecateHook(name, deprecatedHooks[name]);
    }
  }
  addHooks(configHooks) {
    const hooks = flatHooks(configHooks);
    const removeFns = Object.keys(hooks).map(
      (key) => this.hook(key, hooks[key])
    );
    return () => {
      for (const unreg of removeFns.splice(0, removeFns.length)) {
        unreg();
      }
    };
  }
  removeHooks(configHooks) {
    const hooks = flatHooks(configHooks);
    for (const key in hooks) {
      this.removeHook(key, hooks[key]);
    }
  }
  removeAllHooks() {
    for (const key in this._hooks) {
      delete this._hooks[key];
    }
  }
  callHook(name, ...arguments_) {
    arguments_.unshift(name);
    return this.callHookWith(serialTaskCaller, name, ...arguments_);
  }
  callHookParallel(name, ...arguments_) {
    arguments_.unshift(name);
    return this.callHookWith(parallelTaskCaller, name, ...arguments_);
  }
  callHookWith(caller, name, ...arguments_) {
    const event = this._before || this._after ? { name, args: arguments_, context: {} } : void 0;
    if (this._before) {
      callEachWith(this._before, event);
    }
    const result = caller(
      name in this._hooks ? [...this._hooks[name]] : [],
      arguments_
    );
    if (result instanceof Promise) {
      return result.finally(() => {
        if (this._after && event) {
          callEachWith(this._after, event);
        }
      });
    }
    if (this._after && event) {
      callEachWith(this._after, event);
    }
    return result;
  }
  beforeEach(function_) {
    this._before = this._before || [];
    this._before.push(function_);
    return () => {
      if (this._before !== void 0) {
        const index = this._before.indexOf(function_);
        if (index !== -1) {
          this._before.splice(index, 1);
        }
      }
    };
  }
  afterEach(function_) {
    this._after = this._after || [];
    this._after.push(function_);
    return () => {
      if (this._after !== void 0) {
        const index = this._after.indexOf(function_);
        if (index !== -1) {
          this._after.splice(index, 1);
        }
      }
    };
  }
}
function createHooks() {
  return new Hookable();
}

const s$1=globalThis.Headers,i=globalThis.AbortController,l=globalThis.fetch||(()=>{throw new Error("[node-fetch-native] Failed to fetch: `globalThis.fetch` is not available!")});

class FetchError extends Error {
  constructor(message, opts) {
    super(message, opts);
    this.name = "FetchError";
    if (opts?.cause && !this.cause) {
      this.cause = opts.cause;
    }
  }
}
function createFetchError(ctx) {
  const errorMessage = ctx.error?.message || ctx.error?.toString() || "";
  const method = ctx.request?.method || ctx.options?.method || "GET";
  const url = ctx.request?.url || String(ctx.request) || "/";
  const requestStr = `[${method}] ${JSON.stringify(url)}`;
  const statusStr = ctx.response ? `${ctx.response.status} ${ctx.response.statusText}` : "<no response>";
  const message = `${requestStr}: ${statusStr}${errorMessage ? ` ${errorMessage}` : ""}`;
  const fetchError = new FetchError(
    message,
    ctx.error ? { cause: ctx.error } : void 0
  );
  for (const key of ["request", "options", "response"]) {
    Object.defineProperty(fetchError, key, {
      get() {
        return ctx[key];
      }
    });
  }
  for (const [key, refKey] of [
    ["data", "_data"],
    ["status", "status"],
    ["statusCode", "status"],
    ["statusText", "statusText"],
    ["statusMessage", "statusText"]
  ]) {
    Object.defineProperty(fetchError, key, {
      get() {
        return ctx.response && ctx.response[refKey];
      }
    });
  }
  return fetchError;
}

const payloadMethods = new Set(
  Object.freeze(["PATCH", "POST", "PUT", "DELETE"])
);
function isPayloadMethod(method = "GET") {
  return payloadMethods.has(method.toUpperCase());
}
function isJSONSerializable(value) {
  if (value === void 0) {
    return false;
  }
  const t = typeof value;
  if (t === "string" || t === "number" || t === "boolean" || t === null) {
    return true;
  }
  if (t !== "object") {
    return false;
  }
  if (Array.isArray(value)) {
    return true;
  }
  if (value.buffer) {
    return false;
  }
  return value.constructor && value.constructor.name === "Object" || typeof value.toJSON === "function";
}
const textTypes = /* @__PURE__ */ new Set([
  "image/svg",
  "application/xml",
  "application/xhtml",
  "application/html"
]);
const JSON_RE = /^application\/(?:[\w!#$%&*.^`~-]*\+)?json(;.+)?$/i;
function detectResponseType(_contentType = "") {
  if (!_contentType) {
    return "json";
  }
  const contentType = _contentType.split(";").shift() || "";
  if (JSON_RE.test(contentType)) {
    return "json";
  }
  if (textTypes.has(contentType) || contentType.startsWith("text/")) {
    return "text";
  }
  return "blob";
}
function resolveFetchOptions(request, input, defaults, Headers) {
  const headers = mergeHeaders(
    input?.headers ?? request?.headers,
    defaults?.headers,
    Headers
  );
  let query;
  if (defaults?.query || defaults?.params || input?.params || input?.query) {
    query = {
      ...defaults?.params,
      ...defaults?.query,
      ...input?.params,
      ...input?.query
    };
  }
  return {
    ...defaults,
    ...input,
    query,
    params: query,
    headers
  };
}
function mergeHeaders(input, defaults, Headers) {
  if (!defaults) {
    return new Headers(input);
  }
  const headers = new Headers(defaults);
  if (input) {
    for (const [key, value] of Symbol.iterator in input || Array.isArray(input) ? input : new Headers(input)) {
      headers.set(key, value);
    }
  }
  return headers;
}
async function callHooks(context, hooks) {
  if (hooks) {
    if (Array.isArray(hooks)) {
      for (const hook of hooks) {
        await hook(context);
      }
    } else {
      await hooks(context);
    }
  }
}

const retryStatusCodes = /* @__PURE__ */ new Set([
  408,
  // Request Timeout
  409,
  // Conflict
  425,
  // Too Early (Experimental)
  429,
  // Too Many Requests
  500,
  // Internal Server Error
  502,
  // Bad Gateway
  503,
  // Service Unavailable
  504
  // Gateway Timeout
]);
const nullBodyResponses = /* @__PURE__ */ new Set([101, 204, 205, 304]);
function createFetch(globalOptions = {}) {
  const {
    fetch = globalThis.fetch,
    Headers = globalThis.Headers,
    AbortController = globalThis.AbortController
  } = globalOptions;
  async function onError(context) {
    const isAbort = context.error && context.error.name === "AbortError" && !context.options.timeout || false;
    if (context.options.retry !== false && !isAbort) {
      let retries;
      if (typeof context.options.retry === "number") {
        retries = context.options.retry;
      } else {
        retries = isPayloadMethod(context.options.method) ? 0 : 1;
      }
      const responseCode = context.response && context.response.status || 500;
      if (retries > 0 && (Array.isArray(context.options.retryStatusCodes) ? context.options.retryStatusCodes.includes(responseCode) : retryStatusCodes.has(responseCode))) {
        const retryDelay = typeof context.options.retryDelay === "function" ? context.options.retryDelay(context) : context.options.retryDelay || 0;
        if (retryDelay > 0) {
          await new Promise((resolve) => setTimeout(resolve, retryDelay));
        }
        return $fetchRaw(context.request, {
          ...context.options,
          retry: retries - 1
        });
      }
    }
    const error = createFetchError(context);
    if (Error.captureStackTrace) {
      Error.captureStackTrace(error, $fetchRaw);
    }
    throw error;
  }
  const $fetchRaw = async function $fetchRaw2(_request, _options = {}) {
    const context = {
      request: _request,
      options: resolveFetchOptions(
        _request,
        _options,
        globalOptions.defaults,
        Headers
      ),
      response: void 0,
      error: void 0
    };
    if (context.options.method) {
      context.options.method = context.options.method.toUpperCase();
    }
    if (context.options.onRequest) {
      await callHooks(context, context.options.onRequest);
    }
    if (typeof context.request === "string") {
      if (context.options.baseURL) {
        context.request = withBase(context.request, context.options.baseURL);
      }
      if (context.options.query) {
        context.request = withQuery(context.request, context.options.query);
        delete context.options.query;
      }
      if ("query" in context.options) {
        delete context.options.query;
      }
      if ("params" in context.options) {
        delete context.options.params;
      }
    }
    if (context.options.body && isPayloadMethod(context.options.method)) {
      if (isJSONSerializable(context.options.body)) {
        context.options.body = typeof context.options.body === "string" ? context.options.body : JSON.stringify(context.options.body);
        context.options.headers = new Headers(context.options.headers || {});
        if (!context.options.headers.has("content-type")) {
          context.options.headers.set("content-type", "application/json");
        }
        if (!context.options.headers.has("accept")) {
          context.options.headers.set("accept", "application/json");
        }
      } else if (
        // ReadableStream Body
        "pipeTo" in context.options.body && typeof context.options.body.pipeTo === "function" || // Node.js Stream Body
        typeof context.options.body.pipe === "function"
      ) {
        if (!("duplex" in context.options)) {
          context.options.duplex = "half";
        }
      }
    }
    let abortTimeout;
    if (!context.options.signal && context.options.timeout) {
      const controller = new AbortController();
      abortTimeout = setTimeout(() => {
        const error = new Error(
          "[TimeoutError]: The operation was aborted due to timeout"
        );
        error.name = "TimeoutError";
        error.code = 23;
        controller.abort(error);
      }, context.options.timeout);
      context.options.signal = controller.signal;
    }
    try {
      context.response = await fetch(
        context.request,
        context.options
      );
    } catch (error) {
      context.error = error;
      if (context.options.onRequestError) {
        await callHooks(
          context,
          context.options.onRequestError
        );
      }
      return await onError(context);
    } finally {
      if (abortTimeout) {
        clearTimeout(abortTimeout);
      }
    }
    const hasBody = (context.response.body || // https://github.com/unjs/ofetch/issues/324
    // https://github.com/unjs/ofetch/issues/294
    // https://github.com/JakeChampion/fetch/issues/1454
    context.response._bodyInit) && !nullBodyResponses.has(context.response.status) && context.options.method !== "HEAD";
    if (hasBody) {
      const responseType = (context.options.parseResponse ? "json" : context.options.responseType) || detectResponseType(context.response.headers.get("content-type") || "");
      switch (responseType) {
        case "json": {
          const data = await context.response.text();
          const parseFunction = context.options.parseResponse || destr;
          context.response._data = parseFunction(data);
          break;
        }
        case "stream": {
          context.response._data = context.response.body || context.response._bodyInit;
          break;
        }
        default: {
          context.response._data = await context.response[responseType]();
        }
      }
    }
    if (context.options.onResponse) {
      await callHooks(
        context,
        context.options.onResponse
      );
    }
    if (!context.options.ignoreResponseError && context.response.status >= 400 && context.response.status < 600) {
      if (context.options.onResponseError) {
        await callHooks(
          context,
          context.options.onResponseError
        );
      }
      return await onError(context);
    }
    return context.response;
  };
  const $fetch = async function $fetch2(request, options) {
    const r = await $fetchRaw(request, options);
    return r._data;
  };
  $fetch.raw = $fetchRaw;
  $fetch.native = (...args) => fetch(...args);
  $fetch.create = (defaultOptions = {}, customGlobalOptions = {}) => createFetch({
    ...globalOptions,
    ...customGlobalOptions,
    defaults: {
      ...globalOptions.defaults,
      ...customGlobalOptions.defaults,
      ...defaultOptions
    }
  });
  return $fetch;
}

function createNodeFetch() {
  const useKeepAlive = JSON.parse(process.env.FETCH_KEEP_ALIVE || "false");
  if (!useKeepAlive) {
    return l;
  }
  const agentOptions = { keepAlive: true };
  const httpAgent = new http.Agent(agentOptions);
  const httpsAgent = new https.Agent(agentOptions);
  const nodeFetchOptions = {
    agent(parsedURL) {
      return parsedURL.protocol === "http:" ? httpAgent : httpsAgent;
    }
  };
  return function nodeFetchWithKeepAlive(input, init) {
    return l(input, { ...nodeFetchOptions, ...init });
  };
}
const fetch = globalThis.fetch ? (...args) => globalThis.fetch(...args) : createNodeFetch();
const Headers$1 = globalThis.Headers || s$1;
const AbortController = globalThis.AbortController || i;
const ofetch = createFetch({ fetch, Headers: Headers$1, AbortController });
const $fetch$1 = ofetch;

function wrapToPromise(value) {
  if (!value || typeof value.then !== "function") {
    return Promise.resolve(value);
  }
  return value;
}
function asyncCall(function_, ...arguments_) {
  try {
    return wrapToPromise(function_(...arguments_));
  } catch (error) {
    return Promise.reject(error);
  }
}
function isPrimitive(value) {
  const type = typeof value;
  return value === null || type !== "object" && type !== "function";
}
function isPureObject(value) {
  const proto = Object.getPrototypeOf(value);
  return !proto || proto.isPrototypeOf(Object);
}
function stringify(value) {
  if (isPrimitive(value)) {
    return String(value);
  }
  if (isPureObject(value) || Array.isArray(value)) {
    return JSON.stringify(value);
  }
  if (typeof value.toJSON === "function") {
    return stringify(value.toJSON());
  }
  throw new Error("[unstorage] Cannot stringify value!");
}
const BASE64_PREFIX = "base64:";
function serializeRaw(value) {
  if (typeof value === "string") {
    return value;
  }
  return BASE64_PREFIX + base64Encode(value);
}
function deserializeRaw(value) {
  if (typeof value !== "string") {
    return value;
  }
  if (!value.startsWith(BASE64_PREFIX)) {
    return value;
  }
  return base64Decode(value.slice(BASE64_PREFIX.length));
}
function base64Decode(input) {
  if (globalThis.Buffer) {
    return Buffer.from(input, "base64");
  }
  return Uint8Array.from(
    globalThis.atob(input),
    (c) => c.codePointAt(0)
  );
}
function base64Encode(input) {
  if (globalThis.Buffer) {
    return Buffer.from(input).toString("base64");
  }
  return globalThis.btoa(String.fromCodePoint(...input));
}

const storageKeyProperties = [
  "has",
  "hasItem",
  "get",
  "getItem",
  "getItemRaw",
  "set",
  "setItem",
  "setItemRaw",
  "del",
  "remove",
  "removeItem",
  "getMeta",
  "setMeta",
  "removeMeta",
  "getKeys",
  "clear",
  "mount",
  "unmount"
];
function prefixStorage(storage, base) {
  base = normalizeBaseKey(base);
  if (!base) {
    return storage;
  }
  const nsStorage = { ...storage };
  for (const property of storageKeyProperties) {
    nsStorage[property] = (key = "", ...args) => (
      // @ts-ignore
      storage[property](base + key, ...args)
    );
  }
  nsStorage.getKeys = (key = "", ...arguments_) => storage.getKeys(base + key, ...arguments_).then((keys) => keys.map((key2) => key2.slice(base.length)));
  nsStorage.keys = nsStorage.getKeys;
  nsStorage.getItems = async (items, commonOptions) => {
    const prefixedItems = items.map(
      (item) => typeof item === "string" ? base + item : { ...item, key: base + item.key }
    );
    const results = await storage.getItems(prefixedItems, commonOptions);
    return results.map((entry) => ({
      key: entry.key.slice(base.length),
      value: entry.value
    }));
  };
  nsStorage.setItems = async (items, commonOptions) => {
    const prefixedItems = items.map((item) => ({
      key: base + item.key,
      value: item.value,
      options: item.options
    }));
    return storage.setItems(prefixedItems, commonOptions);
  };
  return nsStorage;
}
function normalizeKey$1(key) {
  if (!key) {
    return "";
  }
  return key.split("?")[0]?.replace(/[/\\]/g, ":").replace(/:+/g, ":").replace(/^:|:$/g, "") || "";
}
function joinKeys(...keys) {
  return normalizeKey$1(keys.join(":"));
}
function normalizeBaseKey(base) {
  base = normalizeKey$1(base);
  return base ? base + ":" : "";
}
function filterKeyByDepth(key, depth) {
  if (depth === void 0) {
    return true;
  }
  let substrCount = 0;
  let index = key.indexOf(":");
  while (index > -1) {
    substrCount++;
    index = key.indexOf(":", index + 1);
  }
  return substrCount <= depth;
}
function filterKeyByBase(key, base) {
  if (base) {
    return key.startsWith(base) && key[key.length - 1] !== "$";
  }
  return key[key.length - 1] !== "$";
}

function defineDriver$1(factory) {
  return factory;
}

const DRIVER_NAME$1 = "memory";
const memory = defineDriver$1(() => {
  const data = /* @__PURE__ */ new Map();
  return {
    name: DRIVER_NAME$1,
    getInstance: () => data,
    hasItem(key) {
      return data.has(key);
    },
    getItem(key) {
      return data.get(key) ?? null;
    },
    getItemRaw(key) {
      return data.get(key) ?? null;
    },
    setItem(key, value) {
      data.set(key, value);
    },
    setItemRaw(key, value) {
      data.set(key, value);
    },
    removeItem(key) {
      data.delete(key);
    },
    getKeys() {
      return [...data.keys()];
    },
    clear() {
      data.clear();
    },
    dispose() {
      data.clear();
    }
  };
});

function createStorage(options = {}) {
  const context = {
    mounts: { "": options.driver || memory() },
    mountpoints: [""],
    watching: false,
    watchListeners: [],
    unwatch: {}
  };
  const getMount = (key) => {
    for (const base of context.mountpoints) {
      if (key.startsWith(base)) {
        return {
          base,
          relativeKey: key.slice(base.length),
          driver: context.mounts[base]
        };
      }
    }
    return {
      base: "",
      relativeKey: key,
      driver: context.mounts[""]
    };
  };
  const getMounts = (base, includeParent) => {
    return context.mountpoints.filter(
      (mountpoint) => mountpoint.startsWith(base) || includeParent && base.startsWith(mountpoint)
    ).map((mountpoint) => ({
      relativeBase: base.length > mountpoint.length ? base.slice(mountpoint.length) : void 0,
      mountpoint,
      driver: context.mounts[mountpoint]
    }));
  };
  const onChange = (event, key) => {
    if (!context.watching) {
      return;
    }
    key = normalizeKey$1(key);
    for (const listener of context.watchListeners) {
      listener(event, key);
    }
  };
  const startWatch = async () => {
    if (context.watching) {
      return;
    }
    context.watching = true;
    for (const mountpoint in context.mounts) {
      context.unwatch[mountpoint] = await watch(
        context.mounts[mountpoint],
        onChange,
        mountpoint
      );
    }
  };
  const stopWatch = async () => {
    if (!context.watching) {
      return;
    }
    for (const mountpoint in context.unwatch) {
      await context.unwatch[mountpoint]();
    }
    context.unwatch = {};
    context.watching = false;
  };
  const runBatch = (items, commonOptions, cb) => {
    const batches = /* @__PURE__ */ new Map();
    const getBatch = (mount) => {
      let batch = batches.get(mount.base);
      if (!batch) {
        batch = {
          driver: mount.driver,
          base: mount.base,
          items: []
        };
        batches.set(mount.base, batch);
      }
      return batch;
    };
    for (const item of items) {
      const isStringItem = typeof item === "string";
      const key = normalizeKey$1(isStringItem ? item : item.key);
      const value = isStringItem ? void 0 : item.value;
      const options2 = isStringItem || !item.options ? commonOptions : { ...commonOptions, ...item.options };
      const mount = getMount(key);
      getBatch(mount).items.push({
        key,
        value,
        relativeKey: mount.relativeKey,
        options: options2
      });
    }
    return Promise.all([...batches.values()].map((batch) => cb(batch))).then(
      (r) => r.flat()
    );
  };
  const storage = {
    // Item
    hasItem(key, opts = {}) {
      key = normalizeKey$1(key);
      const { relativeKey, driver } = getMount(key);
      return asyncCall(driver.hasItem, relativeKey, opts);
    },
    getItem(key, opts = {}) {
      key = normalizeKey$1(key);
      const { relativeKey, driver } = getMount(key);
      return asyncCall(driver.getItem, relativeKey, opts).then(
        (value) => destr(value)
      );
    },
    getItems(items, commonOptions = {}) {
      return runBatch(items, commonOptions, (batch) => {
        if (batch.driver.getItems) {
          return asyncCall(
            batch.driver.getItems,
            batch.items.map((item) => ({
              key: item.relativeKey,
              options: item.options
            })),
            commonOptions
          ).then(
            (r) => r.map((item) => ({
              key: joinKeys(batch.base, item.key),
              value: destr(item.value)
            }))
          );
        }
        return Promise.all(
          batch.items.map((item) => {
            return asyncCall(
              batch.driver.getItem,
              item.relativeKey,
              item.options
            ).then((value) => ({
              key: item.key,
              value: destr(value)
            }));
          })
        );
      });
    },
    getItemRaw(key, opts = {}) {
      key = normalizeKey$1(key);
      const { relativeKey, driver } = getMount(key);
      if (driver.getItemRaw) {
        return asyncCall(driver.getItemRaw, relativeKey, opts);
      }
      return asyncCall(driver.getItem, relativeKey, opts).then(
        (value) => deserializeRaw(value)
      );
    },
    async setItem(key, value, opts = {}) {
      if (value === void 0) {
        return storage.removeItem(key);
      }
      key = normalizeKey$1(key);
      const { relativeKey, driver } = getMount(key);
      if (!driver.setItem) {
        return;
      }
      await asyncCall(driver.setItem, relativeKey, stringify(value), opts);
      if (!driver.watch) {
        onChange("update", key);
      }
    },
    async setItems(items, commonOptions) {
      await runBatch(items, commonOptions, async (batch) => {
        if (batch.driver.setItems) {
          return asyncCall(
            batch.driver.setItems,
            batch.items.map((item) => ({
              key: item.relativeKey,
              value: stringify(item.value),
              options: item.options
            })),
            commonOptions
          );
        }
        if (!batch.driver.setItem) {
          return;
        }
        await Promise.all(
          batch.items.map((item) => {
            return asyncCall(
              batch.driver.setItem,
              item.relativeKey,
              stringify(item.value),
              item.options
            );
          })
        );
      });
    },
    async setItemRaw(key, value, opts = {}) {
      if (value === void 0) {
        return storage.removeItem(key, opts);
      }
      key = normalizeKey$1(key);
      const { relativeKey, driver } = getMount(key);
      if (driver.setItemRaw) {
        await asyncCall(driver.setItemRaw, relativeKey, value, opts);
      } else if (driver.setItem) {
        await asyncCall(driver.setItem, relativeKey, serializeRaw(value), opts);
      } else {
        return;
      }
      if (!driver.watch) {
        onChange("update", key);
      }
    },
    async removeItem(key, opts = {}) {
      if (typeof opts === "boolean") {
        opts = { removeMeta: opts };
      }
      key = normalizeKey$1(key);
      const { relativeKey, driver } = getMount(key);
      if (!driver.removeItem) {
        return;
      }
      await asyncCall(driver.removeItem, relativeKey, opts);
      if (opts.removeMeta || opts.removeMata) {
        await asyncCall(driver.removeItem, relativeKey + "$", opts);
      }
      if (!driver.watch) {
        onChange("remove", key);
      }
    },
    // Meta
    async getMeta(key, opts = {}) {
      if (typeof opts === "boolean") {
        opts = { nativeOnly: opts };
      }
      key = normalizeKey$1(key);
      const { relativeKey, driver } = getMount(key);
      const meta = /* @__PURE__ */ Object.create(null);
      if (driver.getMeta) {
        Object.assign(meta, await asyncCall(driver.getMeta, relativeKey, opts));
      }
      if (!opts.nativeOnly) {
        const value = await asyncCall(
          driver.getItem,
          relativeKey + "$",
          opts
        ).then((value_) => destr(value_));
        if (value && typeof value === "object") {
          if (typeof value.atime === "string") {
            value.atime = new Date(value.atime);
          }
          if (typeof value.mtime === "string") {
            value.mtime = new Date(value.mtime);
          }
          Object.assign(meta, value);
        }
      }
      return meta;
    },
    setMeta(key, value, opts = {}) {
      return this.setItem(key + "$", value, opts);
    },
    removeMeta(key, opts = {}) {
      return this.removeItem(key + "$", opts);
    },
    // Keys
    async getKeys(base, opts = {}) {
      base = normalizeBaseKey(base);
      const mounts = getMounts(base, true);
      let maskedMounts = [];
      const allKeys = [];
      let allMountsSupportMaxDepth = true;
      for (const mount of mounts) {
        if (!mount.driver.flags?.maxDepth) {
          allMountsSupportMaxDepth = false;
        }
        const rawKeys = await asyncCall(
          mount.driver.getKeys,
          mount.relativeBase,
          opts
        );
        for (const key of rawKeys) {
          const fullKey = mount.mountpoint + normalizeKey$1(key);
          if (!maskedMounts.some((p) => fullKey.startsWith(p))) {
            allKeys.push(fullKey);
          }
        }
        maskedMounts = [
          mount.mountpoint,
          ...maskedMounts.filter((p) => !p.startsWith(mount.mountpoint))
        ];
      }
      const shouldFilterByDepth = opts.maxDepth !== void 0 && !allMountsSupportMaxDepth;
      return allKeys.filter(
        (key) => (!shouldFilterByDepth || filterKeyByDepth(key, opts.maxDepth)) && filterKeyByBase(key, base)
      );
    },
    // Utils
    async clear(base, opts = {}) {
      base = normalizeBaseKey(base);
      await Promise.all(
        getMounts(base, false).map(async (m) => {
          if (m.driver.clear) {
            return asyncCall(m.driver.clear, m.relativeBase, opts);
          }
          if (m.driver.removeItem) {
            const keys = await m.driver.getKeys(m.relativeBase || "", opts);
            return Promise.all(
              keys.map((key) => m.driver.removeItem(key, opts))
            );
          }
        })
      );
    },
    async dispose() {
      await Promise.all(
        Object.values(context.mounts).map((driver) => dispose(driver))
      );
    },
    async watch(callback) {
      await startWatch();
      context.watchListeners.push(callback);
      return async () => {
        context.watchListeners = context.watchListeners.filter(
          (listener) => listener !== callback
        );
        if (context.watchListeners.length === 0) {
          await stopWatch();
        }
      };
    },
    async unwatch() {
      context.watchListeners = [];
      await stopWatch();
    },
    // Mount
    mount(base, driver) {
      base = normalizeBaseKey(base);
      if (base && context.mounts[base]) {
        throw new Error(`already mounted at ${base}`);
      }
      if (base) {
        context.mountpoints.push(base);
        context.mountpoints.sort((a, b) => b.length - a.length);
      }
      context.mounts[base] = driver;
      if (context.watching) {
        Promise.resolve(watch(driver, onChange, base)).then((unwatcher) => {
          context.unwatch[base] = unwatcher;
        }).catch(console.error);
      }
      return storage;
    },
    async unmount(base, _dispose = true) {
      base = normalizeBaseKey(base);
      if (!base || !context.mounts[base]) {
        return;
      }
      if (context.watching && base in context.unwatch) {
        context.unwatch[base]?.();
        delete context.unwatch[base];
      }
      if (_dispose) {
        await dispose(context.mounts[base]);
      }
      context.mountpoints = context.mountpoints.filter((key) => key !== base);
      delete context.mounts[base];
    },
    getMount(key = "") {
      key = normalizeKey$1(key) + ":";
      const m = getMount(key);
      return {
        driver: m.driver,
        base: m.base
      };
    },
    getMounts(base = "", opts = {}) {
      base = normalizeKey$1(base);
      const mounts = getMounts(base, opts.parents);
      return mounts.map((m) => ({
        driver: m.driver,
        base: m.mountpoint
      }));
    },
    // Aliases
    keys: (base, opts = {}) => storage.getKeys(base, opts),
    get: (key, opts = {}) => storage.getItem(key, opts),
    set: (key, value, opts = {}) => storage.setItem(key, value, opts),
    has: (key, opts = {}) => storage.hasItem(key, opts),
    del: (key, opts = {}) => storage.removeItem(key, opts),
    remove: (key, opts = {}) => storage.removeItem(key, opts)
  };
  return storage;
}
function watch(driver, onChange, base) {
  return driver.watch ? driver.watch((event, key) => onChange(event, base + key)) : () => {
  };
}
async function dispose(driver) {
  if (typeof driver.dispose === "function") {
    await asyncCall(driver.dispose);
  }
}

const _assets = {

};

const normalizeKey = function normalizeKey(key) {
  if (!key) {
    return "";
  }
  return key.split("?")[0]?.replace(/[/\\]/g, ":").replace(/:+/g, ":").replace(/^:|:$/g, "") || "";
};

const assets$1 = {
  getKeys() {
    return Promise.resolve(Object.keys(_assets))
  },
  hasItem (id) {
    id = normalizeKey(id);
    return Promise.resolve(id in _assets)
  },
  getItem (id) {
    id = normalizeKey(id);
    return Promise.resolve(_assets[id] ? _assets[id].import() : null)
  },
  getMeta (id) {
    id = normalizeKey(id);
    return Promise.resolve(_assets[id] ? _assets[id].meta : {})
  }
};

function defineDriver(factory) {
  return factory;
}
function createError(driver, message, opts) {
  const err = new Error(`[unstorage] [${driver}] ${message}`, opts);
  if (Error.captureStackTrace) {
    Error.captureStackTrace(err, createError);
  }
  return err;
}
function createRequiredError(driver, name) {
  if (Array.isArray(name)) {
    return createError(
      driver,
      `Missing some of the required options ${name.map((n) => "`" + n + "`").join(", ")}`
    );
  }
  return createError(driver, `Missing required option \`${name}\`.`);
}

function ignoreNotfound(err) {
  return err.code === "ENOENT" || err.code === "EISDIR" ? null : err;
}
function ignoreExists(err) {
  return err.code === "EEXIST" ? null : err;
}
async function writeFile(path, data, encoding) {
  await ensuredir(dirname$1(path));
  return promises.writeFile(path, data, encoding);
}
function readFile(path, encoding) {
  return promises.readFile(path, encoding).catch(ignoreNotfound);
}
function unlink(path) {
  return promises.unlink(path).catch(ignoreNotfound);
}
function readdir(dir) {
  return promises.readdir(dir, { withFileTypes: true }).catch(ignoreNotfound).then((r) => r || []);
}
async function ensuredir(dir) {
  if (existsSync(dir)) {
    return;
  }
  await ensuredir(dirname$1(dir)).catch(ignoreExists);
  await promises.mkdir(dir).catch(ignoreExists);
}
async function readdirRecursive(dir, ignore, maxDepth) {
  if (ignore && ignore(dir)) {
    return [];
  }
  const entries = await readdir(dir);
  const files = [];
  await Promise.all(
    entries.map(async (entry) => {
      const entryPath = resolve$1(dir, entry.name);
      if (entry.isDirectory()) {
        if (maxDepth === void 0 || maxDepth > 0) {
          const dirFiles = await readdirRecursive(
            entryPath,
            ignore,
            maxDepth === void 0 ? void 0 : maxDepth - 1
          );
          files.push(...dirFiles.map((f) => entry.name + "/" + f));
        }
      } else {
        if (!(ignore && ignore(entry.name))) {
          files.push(entry.name);
        }
      }
    })
  );
  return files;
}
async function rmRecursive(dir) {
  const entries = await readdir(dir);
  await Promise.all(
    entries.map((entry) => {
      const entryPath = resolve$1(dir, entry.name);
      if (entry.isDirectory()) {
        return rmRecursive(entryPath).then(() => promises.rmdir(entryPath));
      } else {
        return promises.unlink(entryPath);
      }
    })
  );
}

const PATH_TRAVERSE_RE = /\.\.:|\.\.$/;
const DRIVER_NAME = "fs-lite";
const unstorage_47drivers_47fs_45lite = defineDriver((opts = {}) => {
  if (!opts.base) {
    throw createRequiredError(DRIVER_NAME, "base");
  }
  opts.base = resolve$1(opts.base);
  const r = (key) => {
    if (PATH_TRAVERSE_RE.test(key)) {
      throw createError(
        DRIVER_NAME,
        `Invalid key: ${JSON.stringify(key)}. It should not contain .. segments`
      );
    }
    const resolved = join(opts.base, key.replace(/:/g, "/"));
    return resolved;
  };
  return {
    name: DRIVER_NAME,
    options: opts,
    flags: {
      maxDepth: true
    },
    hasItem(key) {
      return existsSync(r(key));
    },
    getItem(key) {
      return readFile(r(key), "utf8");
    },
    getItemRaw(key) {
      return readFile(r(key));
    },
    async getMeta(key) {
      const { atime, mtime, size, birthtime, ctime } = await promises.stat(r(key)).catch(() => ({}));
      return { atime, mtime, size, birthtime, ctime };
    },
    setItem(key, value) {
      if (opts.readOnly) {
        return;
      }
      return writeFile(r(key), value, "utf8");
    },
    setItemRaw(key, value) {
      if (opts.readOnly) {
        return;
      }
      return writeFile(r(key), value);
    },
    removeItem(key) {
      if (opts.readOnly) {
        return;
      }
      return unlink(r(key));
    },
    getKeys(_base, topts) {
      return readdirRecursive(r("."), opts.ignore, topts?.maxDepth);
    },
    async clear() {
      if (opts.readOnly || opts.noClear) {
        return;
      }
      await rmRecursive(r("."));
    }
  };
});

const storage$1 = createStorage({});

storage$1.mount('/assets', assets$1);

storage$1.mount('data', unstorage_47drivers_47fs_45lite({"driver":"fsLite","base":"./.data/kv"}));

function useStorage(base = "") {
  return base ? prefixStorage(storage$1, base) : storage$1;
}

function serialize$1(o){return typeof o=="string"?`'${o}'`:new c().serialize(o)}const c=/*@__PURE__*/function(){class o{#t=new Map;compare(t,r){const e=typeof t,n=typeof r;return e==="string"&&n==="string"?t.localeCompare(r):e==="number"&&n==="number"?t-r:String.prototype.localeCompare.call(this.serialize(t,true),this.serialize(r,true))}serialize(t,r){if(t===null)return "null";switch(typeof t){case "string":return r?t:`'${t}'`;case "bigint":return `${t}n`;case "object":return this.$object(t);case "function":return this.$function(t)}return String(t)}serializeObject(t){const r=Object.prototype.toString.call(t);if(r!=="[object Object]")return this.serializeBuiltInType(r.length<10?`unknown:${r}`:r.slice(8,-1),t);const e=t.constructor,n=e===Object||e===void 0?"":e.name;if(n!==""&&globalThis[n]===e)return this.serializeBuiltInType(n,t);if(typeof t.toJSON=="function"){const i=t.toJSON();return n+(i!==null&&typeof i=="object"?this.$object(i):`(${this.serialize(i)})`)}return this.serializeObjectEntries(n,Object.entries(t))}serializeBuiltInType(t,r){const e=this["$"+t];if(e)return e.call(this,r);if(typeof r?.entries=="function")return this.serializeObjectEntries(t,r.entries());throw new Error(`Cannot serialize ${t}`)}serializeObjectEntries(t,r){const e=Array.from(r).sort((i,a)=>this.compare(i[0],a[0]));let n=`${t}{`;for(let i=0;i<e.length;i++){const[a,l]=e[i];n+=`${this.serialize(a,true)}:${this.serialize(l)}`,i<e.length-1&&(n+=",");}return n+"}"}$object(t){let r=this.#t.get(t);return r===void 0&&(this.#t.set(t,`#${this.#t.size}`),r=this.serializeObject(t),this.#t.set(t,r)),r}$function(t){const r=Function.prototype.toString.call(t);return r.slice(-15)==="[native code] }"?`${t.name||""}()[native]`:`${t.name}(${t.length})${r.replace(/\s*\n\s*/g,"")}`}$Array(t){let r="[";for(let e=0;e<t.length;e++)r+=this.serialize(t[e]),e<t.length-1&&(r+=",");return r+"]"}$Date(t){try{return `Date(${t.toISOString()})`}catch{return "Date(null)"}}$ArrayBuffer(t){return `ArrayBuffer[${new Uint8Array(t).join(",")}]`}$Set(t){return `Set${this.$Array(Array.from(t).sort((r,e)=>this.compare(r,e)))}`}$Map(t){return this.serializeObjectEntries("Map",t.entries())}}for(const s of ["Error","RegExp","URL"])o.prototype["$"+s]=function(t){return `${s}(${t})`};for(const s of ["Int8Array","Uint8Array","Uint8ClampedArray","Int16Array","Uint16Array","Int32Array","Uint32Array","Float32Array","Float64Array"])o.prototype["$"+s]=function(t){return `${s}[${t.join(",")}]`};for(const s of ["BigInt64Array","BigUint64Array"])o.prototype["$"+s]=function(t){return `${s}[${t.join("n,")}${t.length>0?"n":""}]`};return o}();

function isEqual(object1, object2) {
  if (object1 === object2) {
    return true;
  }
  if (serialize$1(object1) === serialize$1(object2)) {
    return true;
  }
  return false;
}

const e=globalThis.process?.getBuiltinModule?.("crypto")?.hash,r="sha256",s="base64url";function digest(t){if(e)return e(r,t,s);const o=createHash(r).update(t);return globalThis.process?.versions?.webcontainer?o.digest().toString(s):o.digest(s)}

const Hasher = /* @__PURE__ */ (() => {
  class Hasher2 {
    buff = "";
    #context = /* @__PURE__ */ new Map();
    write(str) {
      this.buff += str;
    }
    dispatch(value) {
      const type = value === null ? "null" : typeof value;
      return this[type](value);
    }
    object(object) {
      if (object && typeof object.toJSON === "function") {
        return this.object(object.toJSON());
      }
      const objString = Object.prototype.toString.call(object);
      let objType = "";
      const objectLength = objString.length;
      objType = objectLength < 10 ? "unknown:[" + objString + "]" : objString.slice(8, objectLength - 1);
      objType = objType.toLowerCase();
      let objectNumber = null;
      if ((objectNumber = this.#context.get(object)) === void 0) {
        this.#context.set(object, this.#context.size);
      } else {
        return this.dispatch("[CIRCULAR:" + objectNumber + "]");
      }
      if (typeof Buffer !== "undefined" && Buffer.isBuffer && Buffer.isBuffer(object)) {
        this.write("buffer:");
        return this.write(object.toString("utf8"));
      }
      if (objType !== "object" && objType !== "function" && objType !== "asyncfunction") {
        if (this[objType]) {
          this[objType](object);
        } else {
          this.unknown(object, objType);
        }
      } else {
        const keys = Object.keys(object).sort();
        const extraKeys = [];
        this.write("object:" + (keys.length + extraKeys.length) + ":");
        const dispatchForKey = (key) => {
          this.dispatch(key);
          this.write(":");
          this.dispatch(object[key]);
          this.write(",");
        };
        for (const key of keys) {
          dispatchForKey(key);
        }
        for (const key of extraKeys) {
          dispatchForKey(key);
        }
      }
    }
    array(arr, unordered) {
      unordered = unordered === void 0 ? false : unordered;
      this.write("array:" + arr.length + ":");
      if (!unordered || arr.length <= 1) {
        for (const entry of arr) {
          this.dispatch(entry);
        }
        return;
      }
      const contextAdditions = /* @__PURE__ */ new Map();
      const entries = arr.map((entry) => {
        const hasher = new Hasher2();
        hasher.dispatch(entry);
        for (const [key, value] of hasher.#context) {
          contextAdditions.set(key, value);
        }
        return hasher.toString();
      });
      this.#context = contextAdditions;
      entries.sort();
      return this.array(entries, false);
    }
    date(date) {
      return this.write("date:" + date.toJSON());
    }
    symbol(sym) {
      return this.write("symbol:" + sym.toString());
    }
    unknown(value, type) {
      this.write(type);
      if (!value) {
        return;
      }
      this.write(":");
      if (value && typeof value.entries === "function") {
        return this.array(
          [...value.entries()],
          true
          /* ordered */
        );
      }
    }
    error(err) {
      return this.write("error:" + err.toString());
    }
    boolean(bool) {
      return this.write("bool:" + bool);
    }
    string(string) {
      this.write("string:" + string.length + ":");
      this.write(string);
    }
    function(fn) {
      this.write("fn:");
      if (isNativeFunction(fn)) {
        this.dispatch("[native]");
      } else {
        this.dispatch(fn.toString());
      }
    }
    number(number) {
      return this.write("number:" + number);
    }
    null() {
      return this.write("Null");
    }
    undefined() {
      return this.write("Undefined");
    }
    regexp(regex) {
      return this.write("regex:" + regex.toString());
    }
    arraybuffer(arr) {
      this.write("arraybuffer:");
      return this.dispatch(new Uint8Array(arr));
    }
    url(url) {
      return this.write("url:" + url.toString());
    }
    map(map) {
      this.write("map:");
      const arr = [...map];
      return this.array(arr, false);
    }
    set(set) {
      this.write("set:");
      const arr = [...set];
      return this.array(arr, false);
    }
    bigint(number) {
      return this.write("bigint:" + number.toString());
    }
  }
  for (const type of [
    "uint8array",
    "uint8clampedarray",
    "unt8array",
    "uint16array",
    "unt16array",
    "uint32array",
    "unt32array",
    "float32array",
    "float64array"
  ]) {
    Hasher2.prototype[type] = function(arr) {
      this.write(type + ":");
      return this.array([...arr], false);
    };
  }
  function isNativeFunction(f) {
    if (typeof f !== "function") {
      return false;
    }
    return Function.prototype.toString.call(f).slice(
      -15
      /* "[native code] }".length */
    ) === "[native code] }";
  }
  return Hasher2;
})();
function serialize(object) {
  const hasher = new Hasher();
  hasher.dispatch(object);
  return hasher.buff;
}
function hash(value) {
  return digest(typeof value === "string" ? value : serialize(value)).replace(/[-_]/g, "").slice(0, 10);
}

function defaultCacheOptions() {
  return {
    name: "_",
    base: "/cache",
    swr: true,
    maxAge: 1
  };
}
function defineCachedFunction(fn, opts = {}) {
  opts = { ...defaultCacheOptions(), ...opts };
  const pending = {};
  const group = opts.group || "nitro/functions";
  const name = opts.name || fn.name || "_";
  const integrity = opts.integrity || hash([fn, opts]);
  const validate = opts.validate || ((entry) => entry.value !== void 0);
  async function get(key, resolver, shouldInvalidateCache, event) {
    const cacheKey = [opts.base, group, name, key + ".json"].filter(Boolean).join(":").replace(/:\/$/, ":index");
    let entry = await useStorage().getItem(cacheKey).catch((error) => {
      console.error(`[cache] Cache read error.`, error);
      useNitroApp().captureError(error, { event, tags: ["cache"] });
    }) || {};
    if (typeof entry !== "object") {
      entry = {};
      const error = new Error("Malformed data read from cache.");
      console.error("[cache]", error);
      useNitroApp().captureError(error, { event, tags: ["cache"] });
    }
    const ttl = (opts.maxAge ?? 0) * 1e3;
    if (ttl) {
      entry.expires = Date.now() + ttl;
    }
    const expired = shouldInvalidateCache || entry.integrity !== integrity || ttl && Date.now() - (entry.mtime || 0) > ttl || validate(entry) === false;
    const _resolve = async () => {
      const isPending = pending[key];
      if (!isPending) {
        if (entry.value !== void 0 && (opts.staleMaxAge || 0) >= 0 && opts.swr === false) {
          entry.value = void 0;
          entry.integrity = void 0;
          entry.mtime = void 0;
          entry.expires = void 0;
        }
        pending[key] = Promise.resolve(resolver());
      }
      try {
        entry.value = await pending[key];
      } catch (error) {
        if (!isPending) {
          delete pending[key];
        }
        throw error;
      }
      if (!isPending) {
        entry.mtime = Date.now();
        entry.integrity = integrity;
        delete pending[key];
        if (validate(entry) !== false) {
          let setOpts;
          if (opts.maxAge && !opts.swr) {
            setOpts = { ttl: opts.maxAge };
          }
          const promise = useStorage().setItem(cacheKey, entry, setOpts).catch((error) => {
            console.error(`[cache] Cache write error.`, error);
            useNitroApp().captureError(error, { event, tags: ["cache"] });
          });
          if (event?.waitUntil) {
            event.waitUntil(promise);
          }
        }
      }
    };
    const _resolvePromise = expired ? _resolve() : Promise.resolve();
    if (entry.value === void 0) {
      await _resolvePromise;
    } else if (expired && event && event.waitUntil) {
      event.waitUntil(_resolvePromise);
    }
    if (opts.swr && validate(entry) !== false) {
      _resolvePromise.catch((error) => {
        console.error(`[cache] SWR handler error.`, error);
        useNitroApp().captureError(error, { event, tags: ["cache"] });
      });
      return entry;
    }
    return _resolvePromise.then(() => entry);
  }
  return async (...args) => {
    const shouldBypassCache = await opts.shouldBypassCache?.(...args);
    if (shouldBypassCache) {
      return fn(...args);
    }
    const key = await (opts.getKey || getKey)(...args);
    const shouldInvalidateCache = await opts.shouldInvalidateCache?.(...args);
    const entry = await get(
      key,
      () => fn(...args),
      shouldInvalidateCache,
      args[0] && isEvent(args[0]) ? args[0] : void 0
    );
    let value = entry.value;
    if (opts.transform) {
      value = await opts.transform(entry, ...args) || value;
    }
    return value;
  };
}
function cachedFunction(fn, opts = {}) {
  return defineCachedFunction(fn, opts);
}
function getKey(...args) {
  return args.length > 0 ? hash(args) : "";
}
function escapeKey(key) {
  return String(key).replace(/\W/g, "");
}
function defineCachedEventHandler(handler, opts = defaultCacheOptions()) {
  const variableHeaderNames = (opts.varies || []).filter(Boolean).map((h) => h.toLowerCase()).sort();
  const _opts = {
    ...opts,
    getKey: async (event) => {
      const customKey = await opts.getKey?.(event);
      if (customKey) {
        return escapeKey(customKey);
      }
      const _path = event.node.req.originalUrl || event.node.req.url || event.path;
      let _pathname;
      try {
        _pathname = escapeKey(decodeURI(parseURL(_path).pathname)).slice(0, 16) || "index";
      } catch {
        _pathname = "-";
      }
      const _hashedPath = `${_pathname}.${hash(_path)}`;
      const _headers = variableHeaderNames.map((header) => [header, event.node.req.headers[header]]).map(([name, value]) => `${escapeKey(name)}.${hash(value)}`);
      return [_hashedPath, ..._headers].join(":");
    },
    validate: (entry) => {
      if (!entry.value) {
        return false;
      }
      if (entry.value.code >= 400) {
        return false;
      }
      if (entry.value.body === void 0) {
        return false;
      }
      if (entry.value.headers.etag === "undefined" || entry.value.headers["last-modified"] === "undefined") {
        return false;
      }
      return true;
    },
    group: opts.group || "nitro/handlers",
    integrity: opts.integrity || hash([handler, opts])
  };
  const _cachedHandler = cachedFunction(
    async (incomingEvent) => {
      const variableHeaders = {};
      for (const header of variableHeaderNames) {
        const value = incomingEvent.node.req.headers[header];
        if (value !== void 0) {
          variableHeaders[header] = value;
        }
      }
      const reqProxy = cloneWithProxy(incomingEvent.node.req, {
        headers: variableHeaders
      });
      const resHeaders = {};
      let _resSendBody;
      const resProxy = cloneWithProxy(incomingEvent.node.res, {
        statusCode: 200,
        writableEnded: false,
        writableFinished: false,
        headersSent: false,
        closed: false,
        getHeader(name) {
          return resHeaders[name];
        },
        setHeader(name, value) {
          resHeaders[name] = value;
          return this;
        },
        getHeaderNames() {
          return Object.keys(resHeaders);
        },
        hasHeader(name) {
          return name in resHeaders;
        },
        removeHeader(name) {
          delete resHeaders[name];
        },
        getHeaders() {
          return resHeaders;
        },
        end(chunk, arg2, arg3) {
          if (typeof chunk === "string") {
            _resSendBody = chunk;
          }
          if (typeof arg2 === "function") {
            arg2();
          }
          if (typeof arg3 === "function") {
            arg3();
          }
          return this;
        },
        write(chunk, arg2, arg3) {
          if (typeof chunk === "string") {
            _resSendBody = chunk;
          }
          if (typeof arg2 === "function") {
            arg2(void 0);
          }
          if (typeof arg3 === "function") {
            arg3();
          }
          return true;
        },
        writeHead(statusCode, headers2) {
          this.statusCode = statusCode;
          if (headers2) {
            if (Array.isArray(headers2) || typeof headers2 === "string") {
              throw new TypeError("Raw headers  is not supported.");
            }
            for (const header in headers2) {
              const value = headers2[header];
              if (value !== void 0) {
                this.setHeader(
                  header,
                  value
                );
              }
            }
          }
          return this;
        }
      });
      const event = createEvent(reqProxy, resProxy);
      event.fetch = (url, fetchOptions) => fetchWithEvent(event, url, fetchOptions, {
        fetch: useNitroApp().localFetch
      });
      event.$fetch = (url, fetchOptions) => fetchWithEvent(event, url, fetchOptions, {
        fetch: globalThis.$fetch
      });
      event.waitUntil = incomingEvent.waitUntil;
      event.context = incomingEvent.context;
      event.context.cache = {
        options: _opts
      };
      const body = await handler(event) || _resSendBody;
      const headers = event.node.res.getHeaders();
      headers.etag = String(
        headers.Etag || headers.etag || `W/"${hash(body)}"`
      );
      headers["last-modified"] = String(
        headers["Last-Modified"] || headers["last-modified"] || (/* @__PURE__ */ new Date()).toUTCString()
      );
      const cacheControl = [];
      if (opts.swr) {
        if (opts.maxAge) {
          cacheControl.push(`s-maxage=${opts.maxAge}`);
        }
        if (opts.staleMaxAge) {
          cacheControl.push(`stale-while-revalidate=${opts.staleMaxAge}`);
        } else {
          cacheControl.push("stale-while-revalidate");
        }
      } else if (opts.maxAge) {
        cacheControl.push(`max-age=${opts.maxAge}`);
      }
      if (cacheControl.length > 0) {
        headers["cache-control"] = cacheControl.join(", ");
      }
      const cacheEntry = {
        code: event.node.res.statusCode,
        headers,
        body
      };
      return cacheEntry;
    },
    _opts
  );
  return defineEventHandler(async (event) => {
    if (opts.headersOnly) {
      if (handleCacheHeaders(event, { maxAge: opts.maxAge })) {
        return;
      }
      return handler(event);
    }
    const response = await _cachedHandler(
      event
    );
    if (event.node.res.headersSent || event.node.res.writableEnded) {
      return response.body;
    }
    if (handleCacheHeaders(event, {
      modifiedTime: new Date(response.headers["last-modified"]),
      etag: response.headers.etag,
      maxAge: opts.maxAge
    })) {
      return;
    }
    event.node.res.statusCode = response.code;
    for (const name in response.headers) {
      const value = response.headers[name];
      if (name === "set-cookie") {
        event.node.res.appendHeader(
          name,
          splitCookiesString(value)
        );
      } else {
        if (value !== void 0) {
          event.node.res.setHeader(name, value);
        }
      }
    }
    return response.body;
  });
}
function cloneWithProxy(obj, overrides) {
  return new Proxy(obj, {
    get(target, property, receiver) {
      if (property in overrides) {
        return overrides[property];
      }
      return Reflect.get(target, property, receiver);
    },
    set(target, property, value, receiver) {
      if (property in overrides) {
        overrides[property] = value;
        return true;
      }
      return Reflect.set(target, property, value, receiver);
    }
  });
}
const cachedEventHandler = defineCachedEventHandler;

function klona(x) {
	if (typeof x !== 'object') return x;

	var k, tmp, str=Object.prototype.toString.call(x);

	if (str === '[object Object]') {
		if (x.constructor !== Object && typeof x.constructor === 'function') {
			tmp = new x.constructor();
			for (k in x) {
				if (x.hasOwnProperty(k) && tmp[k] !== x[k]) {
					tmp[k] = klona(x[k]);
				}
			}
		} else {
			tmp = {}; // null
			for (k in x) {
				if (k === '__proto__') {
					Object.defineProperty(tmp, k, {
						value: klona(x[k]),
						configurable: true,
						enumerable: true,
						writable: true,
					});
				} else {
					tmp[k] = klona(x[k]);
				}
			}
		}
		return tmp;
	}

	if (str === '[object Array]') {
		k = x.length;
		for (tmp=Array(k); k--;) {
			tmp[k] = klona(x[k]);
		}
		return tmp;
	}

	if (str === '[object Set]') {
		tmp = new Set;
		x.forEach(function (val) {
			tmp.add(klona(val));
		});
		return tmp;
	}

	if (str === '[object Map]') {
		tmp = new Map;
		x.forEach(function (val, key) {
			tmp.set(klona(key), klona(val));
		});
		return tmp;
	}

	if (str === '[object Date]') {
		return new Date(+x);
	}

	if (str === '[object RegExp]') {
		tmp = new RegExp(x.source, x.flags);
		tmp.lastIndex = x.lastIndex;
		return tmp;
	}

	if (str === '[object DataView]') {
		return new x.constructor( klona(x.buffer) );
	}

	if (str === '[object ArrayBuffer]') {
		return x.slice(0);
	}

	// ArrayBuffer.isView(x)
	// ~> `new` bcuz `Buffer.slice` => ref
	if (str.slice(-6) === 'Array]') {
		return new x.constructor(x);
	}

	return x;
}

const inlineAppConfig = {
  "nuxt": {}
};



const appConfig = defuFn(inlineAppConfig);

const NUMBER_CHAR_RE = /\d/;
const STR_SPLITTERS = ["-", "_", "/", "."];
function isUppercase(char = "") {
  if (NUMBER_CHAR_RE.test(char)) {
    return void 0;
  }
  return char !== char.toLowerCase();
}
function splitByCase(str, separators) {
  const splitters = STR_SPLITTERS;
  const parts = [];
  if (!str || typeof str !== "string") {
    return parts;
  }
  let buff = "";
  let previousUpper;
  let previousSplitter;
  for (const char of str) {
    const isSplitter = splitters.includes(char);
    if (isSplitter === true) {
      parts.push(buff);
      buff = "";
      previousUpper = void 0;
      continue;
    }
    const isUpper = isUppercase(char);
    if (previousSplitter === false) {
      if (previousUpper === false && isUpper === true) {
        parts.push(buff);
        buff = char;
        previousUpper = isUpper;
        continue;
      }
      if (previousUpper === true && isUpper === false && buff.length > 1) {
        const lastChar = buff.at(-1);
        parts.push(buff.slice(0, Math.max(0, buff.length - 1)));
        buff = lastChar + char;
        previousUpper = isUpper;
        continue;
      }
    }
    buff += char;
    previousUpper = isUpper;
    previousSplitter = isSplitter;
  }
  parts.push(buff);
  return parts;
}
function kebabCase(str, joiner) {
  return str ? (Array.isArray(str) ? str : splitByCase(str)).map((p) => p.toLowerCase()).join(joiner) : "";
}
function snakeCase(str) {
  return kebabCase(str || "", "_");
}

function getEnv(key, opts) {
  const envKey = snakeCase(key).toUpperCase();
  return destr(
    process.env[opts.prefix + envKey] ?? process.env[opts.altPrefix + envKey]
  );
}
function _isObject(input) {
  return typeof input === "object" && !Array.isArray(input);
}
function applyEnv(obj, opts, parentKey = "") {
  for (const key in obj) {
    const subKey = parentKey ? `${parentKey}_${key}` : key;
    const envValue = getEnv(subKey, opts);
    if (_isObject(obj[key])) {
      if (_isObject(envValue)) {
        obj[key] = { ...obj[key], ...envValue };
        applyEnv(obj[key], opts, subKey);
      } else if (envValue === void 0) {
        applyEnv(obj[key], opts, subKey);
      } else {
        obj[key] = envValue ?? obj[key];
      }
    } else {
      obj[key] = envValue ?? obj[key];
    }
    if (opts.envExpansion && typeof obj[key] === "string") {
      obj[key] = _expandFromEnv(obj[key]);
    }
  }
  return obj;
}
const envExpandRx = /\{\{([^{}]*)\}\}/g;
function _expandFromEnv(value) {
  return value.replace(envExpandRx, (match, key) => {
    return process.env[key] || match;
  });
}

const _inlineRuntimeConfig = {
  "app": {
    "baseURL": "/",
    "buildId": "fd4cda3b-4973-41b5-b98f-c9e6d8e6d376",
    "buildAssetsDir": "/_nuxt/",
    "cdnURL": ""
  },
  "nitro": {
    "envPrefix": "NUXT_",
    "routeRules": {
      "/__nuxt_error": {
        "cache": false
      },
      "/_nuxt/builds/meta/**": {
        "headers": {
          "cache-control": "public, max-age=31536000, immutable"
        }
      },
      "/_nuxt/builds/**": {
        "headers": {
          "cache-control": "public, max-age=1, immutable"
        }
      },
      "/_nuxt/**": {
        "headers": {
          "cache-control": "public, max-age=31536000, immutable"
        }
      }
    }
  },
  "public": {
    "i18n": {
      "baseUrl": "",
      "defaultLocale": "en",
      "rootRedirect": "",
      "redirectStatusCode": 302,
      "skipSettingLocaleOnNavigate": false,
      "locales": [
        {
          "code": "en",
          "iso": "en-US",
          "language": ""
        },
        {
          "code": "lv",
          "iso": "lv-LV",
          "language": ""
        },
        {
          "code": "ru",
          "iso": "ru-RU",
          "language": ""
        }
      ],
      "detectBrowserLanguage": {
        "alwaysRedirect": false,
        "cookieCrossOrigin": false,
        "cookieDomain": "",
        "cookieKey": "i18n_redirected",
        "cookieSecure": false,
        "fallbackLocale": "en",
        "redirectOn": "root",
        "useCookie": true
      },
      "experimental": {
        "localeDetector": "",
        "typedPages": true,
        "typedOptionsAndMessages": false,
        "alternateLinkCanonicalQueries": true,
        "devCache": false,
        "cacheLifetime": "",
        "stripMessagesPayload": false,
        "preload": false,
        "strictSeo": false,
        "nitroContextDetection": true
      },
      "domainLocales": {
        "en": {
          "domain": ""
        },
        "lv": {
          "domain": ""
        },
        "ru": {
          "domain": ""
        }
      }
    }
  }
};
const envOptions = {
  prefix: "NITRO_",
  altPrefix: _inlineRuntimeConfig.nitro.envPrefix ?? process.env.NITRO_ENV_PREFIX ?? "_",
  envExpansion: _inlineRuntimeConfig.nitro.envExpansion ?? process.env.NITRO_ENV_EXPANSION ?? false
};
const _sharedRuntimeConfig = _deepFreeze(
  applyEnv(klona(_inlineRuntimeConfig), envOptions)
);
function useRuntimeConfig(event) {
  if (!event) {
    return _sharedRuntimeConfig;
  }
  if (event.context.nitro.runtimeConfig) {
    return event.context.nitro.runtimeConfig;
  }
  const runtimeConfig = klona(_inlineRuntimeConfig);
  applyEnv(runtimeConfig, envOptions);
  event.context.nitro.runtimeConfig = runtimeConfig;
  return runtimeConfig;
}
_deepFreeze(klona(appConfig));
function _deepFreeze(object) {
  const propNames = Object.getOwnPropertyNames(object);
  for (const name of propNames) {
    const value = object[name];
    if (value && typeof value === "object") {
      _deepFreeze(value);
    }
  }
  return Object.freeze(object);
}
new Proxy(/* @__PURE__ */ Object.create(null), {
  get: (_, prop) => {
    console.warn(
      "Please use `useRuntimeConfig()` instead of accessing config directly."
    );
    const runtimeConfig = useRuntimeConfig();
    if (prop in runtimeConfig) {
      return runtimeConfig[prop];
    }
    return void 0;
  }
});

function createContext(opts = {}) {
  let currentInstance;
  let isSingleton = false;
  const checkConflict = (instance) => {
    if (currentInstance && currentInstance !== instance) {
      throw new Error("Context conflict");
    }
  };
  let als;
  if (opts.asyncContext) {
    const _AsyncLocalStorage = opts.AsyncLocalStorage || globalThis.AsyncLocalStorage;
    if (_AsyncLocalStorage) {
      als = new _AsyncLocalStorage();
    } else {
      console.warn("[unctx] `AsyncLocalStorage` is not provided.");
    }
  }
  const _getCurrentInstance = () => {
    if (als) {
      const instance = als.getStore();
      if (instance !== void 0) {
        return instance;
      }
    }
    return currentInstance;
  };
  return {
    use: () => {
      const _instance = _getCurrentInstance();
      if (_instance === void 0) {
        throw new Error("Context is not available");
      }
      return _instance;
    },
    tryUse: () => {
      return _getCurrentInstance();
    },
    set: (instance, replace) => {
      if (!replace) {
        checkConflict(instance);
      }
      currentInstance = instance;
      isSingleton = true;
    },
    unset: () => {
      currentInstance = void 0;
      isSingleton = false;
    },
    call: (instance, callback) => {
      checkConflict(instance);
      currentInstance = instance;
      try {
        return als ? als.run(instance, callback) : callback();
      } finally {
        if (!isSingleton) {
          currentInstance = void 0;
        }
      }
    },
    async callAsync(instance, callback) {
      currentInstance = instance;
      const onRestore = () => {
        currentInstance = instance;
      };
      const onLeave = () => currentInstance === instance ? onRestore : void 0;
      asyncHandlers.add(onLeave);
      try {
        const r = als ? als.run(instance, callback) : callback();
        if (!isSingleton) {
          currentInstance = void 0;
        }
        return await r;
      } finally {
        asyncHandlers.delete(onLeave);
      }
    }
  };
}
function createNamespace(defaultOpts = {}) {
  const contexts = {};
  return {
    get(key, opts = {}) {
      if (!contexts[key]) {
        contexts[key] = createContext({ ...defaultOpts, ...opts });
      }
      return contexts[key];
    }
  };
}
const _globalThis = typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : typeof global !== "undefined" ? global : {};
const globalKey = "__unctx__";
const defaultNamespace = _globalThis[globalKey] || (_globalThis[globalKey] = createNamespace());
const getContext = (key, opts = {}) => defaultNamespace.get(key, opts);
const asyncHandlersKey = "__unctx_async_handlers__";
const asyncHandlers = _globalThis[asyncHandlersKey] || (_globalThis[asyncHandlersKey] = /* @__PURE__ */ new Set());
function executeAsync(function_) {
  const restores = [];
  for (const leaveHandler of asyncHandlers) {
    const restore2 = leaveHandler();
    if (restore2) {
      restores.push(restore2);
    }
  }
  const restore = () => {
    for (const restore2 of restores) {
      restore2();
    }
  };
  let awaitable = function_();
  if (awaitable && typeof awaitable === "object" && "catch" in awaitable) {
    awaitable = awaitable.catch((error) => {
      restore();
      throw error;
    });
  }
  return [awaitable, restore];
}

const config = useRuntimeConfig();
const _routeRulesMatcher = toRouteMatcher(
  createRouter$1({ routes: config.nitro.routeRules })
);
function createRouteRulesHandler(ctx) {
  return eventHandler((event) => {
    const routeRules = getRouteRules(event);
    if (routeRules.headers) {
      setHeaders(event, routeRules.headers);
    }
    if (routeRules.redirect) {
      let target = routeRules.redirect.to;
      if (target.endsWith("/**")) {
        let targetPath = event.path;
        const strpBase = routeRules.redirect._redirectStripBase;
        if (strpBase) {
          targetPath = withoutBase(targetPath, strpBase);
        }
        target = joinURL(target.slice(0, -3), targetPath);
      } else if (event.path.includes("?")) {
        const query = getQuery$1(event.path);
        target = withQuery(target, query);
      }
      return sendRedirect(event, target, routeRules.redirect.statusCode);
    }
    if (routeRules.proxy) {
      let target = routeRules.proxy.to;
      if (target.endsWith("/**")) {
        let targetPath = event.path;
        const strpBase = routeRules.proxy._proxyStripBase;
        if (strpBase) {
          targetPath = withoutBase(targetPath, strpBase);
        }
        target = joinURL(target.slice(0, -3), targetPath);
      } else if (event.path.includes("?")) {
        const query = getQuery$1(event.path);
        target = withQuery(target, query);
      }
      return proxyRequest(event, target, {
        fetch: ctx.localFetch,
        ...routeRules.proxy
      });
    }
  });
}
function getRouteRules(event) {
  event.context._nitro = event.context._nitro || {};
  if (!event.context._nitro.routeRules) {
    event.context._nitro.routeRules = getRouteRulesForPath(
      withoutBase(event.path.split("?")[0], useRuntimeConfig().app.baseURL)
    );
  }
  return event.context._nitro.routeRules;
}
function getRouteRulesForPath(path) {
  return defu({}, ..._routeRulesMatcher.matchAll(path).reverse());
}

function _captureError(error, type) {
  console.error(`[${type}]`, error);
  useNitroApp().captureError(error, { tags: [type] });
}
function trapUnhandledNodeErrors() {
  process.on(
    "unhandledRejection",
    (error) => _captureError(error, "unhandledRejection")
  );
  process.on(
    "uncaughtException",
    (error) => _captureError(error, "uncaughtException")
  );
}
function joinHeaders(value) {
  return Array.isArray(value) ? value.join(", ") : String(value);
}
function normalizeFetchResponse(response) {
  if (!response.headers.has("set-cookie")) {
    return response;
  }
  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers: normalizeCookieHeaders(response.headers)
  });
}
function normalizeCookieHeader(header = "") {
  return splitCookiesString(joinHeaders(header));
}
function normalizeCookieHeaders(headers) {
  const outgoingHeaders = new Headers();
  for (const [name, header] of headers) {
    if (name === "set-cookie") {
      for (const cookie of normalizeCookieHeader(header)) {
        outgoingHeaders.append("set-cookie", cookie);
      }
    } else {
      outgoingHeaders.set(name, joinHeaders(header));
    }
  }
  return outgoingHeaders;
}

function isJsonRequest(event) {
  if (hasReqHeader(event, "accept", "text/html")) {
    return false;
  }
  return hasReqHeader(event, "accept", "application/json") || hasReqHeader(event, "user-agent", "curl/") || hasReqHeader(event, "user-agent", "httpie/") || hasReqHeader(event, "sec-fetch-mode", "cors") || event.path.startsWith("/api/") || event.path.endsWith(".json");
}
function hasReqHeader(event, name, includes) {
  const value = getRequestHeader(event, name);
  return value && typeof value === "string" && value.toLowerCase().includes(includes);
}

const errorHandler$0 = (async function errorhandler(error, event, { defaultHandler }) {
  if (event.handled || isJsonRequest(event)) {
    return;
  }
  const defaultRes = await defaultHandler(error, event, { json: true });
  const statusCode = error.statusCode || 500;
  if (statusCode === 404 && defaultRes.status === 302) {
    setResponseHeaders(event, defaultRes.headers);
    setResponseStatus(event, defaultRes.status, defaultRes.statusText);
    return send(event, JSON.stringify(defaultRes.body, null, 2));
  }
  const errorObject = defaultRes.body;
  const url = new URL(errorObject.url);
  errorObject.url = withoutBase(url.pathname, useRuntimeConfig(event).app.baseURL) + url.search + url.hash;
  errorObject.message ||= "Server Error";
  errorObject.data ||= error.data;
  errorObject.statusMessage ||= error.statusMessage;
  delete defaultRes.headers["content-type"];
  delete defaultRes.headers["content-security-policy"];
  setResponseHeaders(event, defaultRes.headers);
  const reqHeaders = getRequestHeaders(event);
  const isRenderingError = event.path.startsWith("/__nuxt_error") || !!reqHeaders["x-nuxt-error"];
  const res = isRenderingError ? null : await useNitroApp().localFetch(
    withQuery(joinURL(useRuntimeConfig(event).app.baseURL, "/__nuxt_error"), errorObject),
    {
      headers: { ...reqHeaders, "x-nuxt-error": "true" },
      redirect: "manual"
    }
  ).catch(() => null);
  if (event.handled) {
    return;
  }
  if (!res) {
    const { template } = await import('./error-500.mjs');
    setResponseHeader(event, "Content-Type", "text/html;charset=UTF-8");
    return send(event, template(errorObject));
  }
  const html = await res.text();
  for (const [header, value] of res.headers.entries()) {
    if (header === "set-cookie") {
      appendResponseHeader(event, header, value);
      continue;
    }
    setResponseHeader(event, header, value);
  }
  setResponseStatus(event, res.status && res.status !== 200 ? res.status : defaultRes.status, res.statusText || defaultRes.statusText);
  return send(event, html);
});

function defineNitroErrorHandler(handler) {
  return handler;
}

const errorHandler$1 = defineNitroErrorHandler(
  function defaultNitroErrorHandler(error, event) {
    const res = defaultHandler(error, event);
    setResponseHeaders(event, res.headers);
    setResponseStatus(event, res.status, res.statusText);
    return send(event, JSON.stringify(res.body, null, 2));
  }
);
function defaultHandler(error, event, opts) {
  const isSensitive = error.unhandled || error.fatal;
  const statusCode = error.statusCode || 500;
  const statusMessage = error.statusMessage || "Server Error";
  const url = getRequestURL(event, { xForwardedHost: true, xForwardedProto: true });
  if (statusCode === 404) {
    const baseURL = "/";
    if (/^\/[^/]/.test(baseURL) && !url.pathname.startsWith(baseURL)) {
      const redirectTo = `${baseURL}${url.pathname.slice(1)}${url.search}`;
      return {
        status: 302,
        statusText: "Found",
        headers: { location: redirectTo },
        body: `Redirecting...`
      };
    }
  }
  if (isSensitive && !opts?.silent) {
    const tags = [error.unhandled && "[unhandled]", error.fatal && "[fatal]"].filter(Boolean).join(" ");
    console.error(`[request error] ${tags} [${event.method}] ${url}
`, error);
  }
  const headers = {
    "content-type": "application/json",
    // Prevent browser from guessing the MIME types of resources.
    "x-content-type-options": "nosniff",
    // Prevent error page from being embedded in an iframe
    "x-frame-options": "DENY",
    // Prevent browsers from sending the Referer header
    "referrer-policy": "no-referrer",
    // Disable the execution of any js
    "content-security-policy": "script-src 'none'; frame-ancestors 'none';"
  };
  setResponseStatus(event, statusCode, statusMessage);
  if (statusCode === 404 || !getResponseHeader(event, "cache-control")) {
    headers["cache-control"] = "no-cache";
  }
  const body = {
    error: true,
    url: url.href,
    statusCode,
    statusMessage,
    message: isSensitive ? "Server Error" : error.message,
    data: isSensitive ? void 0 : error.data
  };
  return {
    status: statusCode,
    statusText: statusMessage,
    headers,
    body
  };
}

const errorHandlers = [errorHandler$0, errorHandler$1];

async function errorHandler(error, event) {
  for (const handler of errorHandlers) {
    try {
      await handler(error, event, { defaultHandler });
      if (event.handled) {
        return; // Response handled
      }
    } catch(error) {
      // Handler itself thrown, log and continue
      console.error(error);
    }
  }
  // H3 will handle fallback
}

function useI18nContext(event) {
  if (event.context.nuxtI18n == null) {
    throw new Error("Nuxt I18n server context has not been set up yet.");
  }
  return event.context.nuxtI18n;
}
function tryUseI18nContext(event) {
  return event.context.nuxtI18n;
}
new Headers({ "x-nuxt-i18n": "internal" });
function createI18nContext() {
  return {
    messages: {},
    slp: {},
    localeConfigs: {},
    trackMap: {},
    vueI18nOptions: void 0,
    trackKey(key, locale) {
      this.trackMap[locale] ??= /* @__PURE__ */ new Set();
      this.trackMap[locale].add(key);
    }
  };
}

/*!
  * shared v11.1.12
  * (c) 2025 kazuya kawaguchi
  * Released under the MIT License.
  */
const _create = Object.create;
const create = (obj = null) => _create(obj);
/* eslint-enable */
/**
 * Useful Utilities By Evan you
 * Modified by kazuya kawaguchi
 * MIT License
 * https://github.com/vuejs/vue-next/blob/master/packages/shared/src/index.ts
 * https://github.com/vuejs/vue-next/blob/master/packages/shared/src/codeframe.ts
 */
const isArray = Array.isArray;
const isFunction = (val) => typeof val === 'function';
const isString = (val) => typeof val === 'string';
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isObject = (val) => val !== null && typeof val === 'object';
const objectToString = Object.prototype.toString;
const toTypeString = (value) => objectToString.call(value);

const isNotObjectOrIsArray = (val) => !isObject(val) || isArray(val);
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function deepCopy(src, des) {
    // src and des should both be objects, and none of them can be a array
    if (isNotObjectOrIsArray(src) || isNotObjectOrIsArray(des)) {
        throw new Error('Invalid value');
    }
    const stack = [{ src, des }];
    while (stack.length) {
        const { src, des } = stack.pop();
        // using `Object.keys` which skips prototype properties
        Object.keys(src).forEach(key => {
            if (key === '__proto__') {
                return;
            }
            // if src[key] is an object/array, set des[key]
            // to empty object/array to prevent setting by reference
            if (isObject(src[key]) && !isObject(des[key])) {
                des[key] = Array.isArray(src[key]) ? [] : create();
            }
            if (isNotObjectOrIsArray(des[key]) || isNotObjectOrIsArray(src[key])) {
                // replace with src[key] when:
                // src[key] or des[key] is not an object, or
                // src[key] or des[key] is an array
                des[key] = src[key];
            }
            else {
                // src[key] and des[key] are both objects, merge them
                stack.push({ src: src[key], des: des[key] });
            }
        });
    }
}

function matchBrowserLocale(locales, browserLocales) {
  const matchedLocales = [];
  for (const [index, browserCode] of browserLocales.entries()) {
    const matchedLocale = locales.find((l) => l.language?.toLowerCase() === browserCode.toLowerCase());
    if (matchedLocale) {
      matchedLocales.push({ code: matchedLocale.code, score: 1 - index / browserLocales.length });
      break;
    }
  }
  for (const [index, browserCode] of browserLocales.entries()) {
    const languageCode = browserCode.split("-")[0].toLowerCase();
    const matchedLocale = locales.find((l) => l.language?.split("-")[0].toLowerCase() === languageCode);
    if (matchedLocale) {
      matchedLocales.push({ code: matchedLocale.code, score: 0.999 - index / browserLocales.length });
      break;
    }
  }
  return matchedLocales;
}
function compareBrowserLocale(a, b) {
  if (a.score === b.score) {
    return b.code.length - a.code.length;
  }
  return b.score - a.score;
}
function findBrowserLocale(locales, browserLocales) {
  const matchedLocales = matchBrowserLocale(
    locales.map((l) => ({ code: l.code, language: l.language || l.code })),
    browserLocales
  );
  return matchedLocales.sort(compareBrowserLocale).at(0)?.code ?? "";
}

// @ts-nocheck
const localeCodes =  [
  "en",
  "lv",
  "ru"
];
const localeLoaders = {
  en: [
    {
      key: "locale_en_46json_3af704b5",
      load: () => import('./en.mjs' /* webpackChunkName: "locale_en_46json_3af704b5" */),
      cache: true
    }
  ],
  lv: [
    {
      key: "locale_lv_46json_1fa2d980",
      load: () => import('./lv.mjs' /* webpackChunkName: "locale_lv_46json_1fa2d980" */),
      cache: true
    }
  ],
  ru: [
    {
      key: "locale_ru_46json_87970932",
      load: () => import('./ru.mjs' /* webpackChunkName: "locale_ru_46json_87970932" */),
      cache: true
    }
  ]
};
const vueI18nConfigs = [];
const normalizedLocales = [
  {
    code: "en",
    iso: "en-US",
    language: undefined
  },
  {
    code: "lv",
    iso: "lv-LV",
    language: undefined
  },
  {
    code: "ru",
    iso: "ru-RU",
    language: undefined
  }
];

function createLocaleConfigs(fallbackLocale) {
  const localeConfigs = {};
  for (const locale of localeCodes) {
    const fallbacks = getFallbackLocaleCodes(fallbackLocale, [locale]);
    const cacheable = isLocaleWithFallbacksCacheable(locale, fallbacks);
    localeConfigs[locale] = { fallbacks, cacheable };
  }
  return localeConfigs;
}
function getFallbackLocaleCodes(fallback, locales) {
  if (fallback === false) return [];
  if (isArray(fallback)) return fallback;
  let fallbackLocales = [];
  if (isString(fallback)) {
    if (locales.every((locale) => locale !== fallback)) {
      fallbackLocales.push(fallback);
    }
    return fallbackLocales;
  }
  const targets = [...locales, "default"];
  for (const locale of targets) {
    if (locale in fallback == false) continue;
    fallbackLocales = [...fallbackLocales, ...fallback[locale].filter(Boolean)];
  }
  return fallbackLocales;
}
function isLocaleCacheable(locale) {
  return localeLoaders[locale] != null && localeLoaders[locale].every((loader) => loader.cache !== false);
}
function isLocaleWithFallbacksCacheable(locale, fallbackLocales) {
  return isLocaleCacheable(locale) && fallbackLocales.every((fallbackLocale) => isLocaleCacheable(fallbackLocale));
}
function getDefaultLocaleForDomain(host) {
  return normalizedLocales.find((l) => !!l.defaultForDomains?.includes(host))?.code;
}
const isSupportedLocale = (locale) => localeCodes.includes(locale || "");

const __nuxtMock = { runWithContext: async (fn) => await fn() };
const merger = createDefu((obj, key, value) => {
  if (key === "messages" || key === "datetimeFormats" || key === "numberFormats") {
    obj[key] ??= create(null);
    deepCopy(value, obj[key]);
    return true;
  }
});
async function loadVueI18nOptions(vueI18nConfigs) {
  const nuxtApp = __nuxtMock;
  let vueI18nOptions = { messages: create(null) };
  for (const configFile of vueI18nConfigs) {
    const resolver = await configFile().then((x) => x.default);
    const resolved = isFunction(resolver) ? await nuxtApp.runWithContext(() => resolver()) : resolver;
    vueI18nOptions = merger(create(null), resolved, vueI18nOptions);
  }
  vueI18nOptions.fallbackLocale ??= false;
  return vueI18nOptions;
}
const isModule = (val) => toTypeString(val) === "[object Module]";
const isResolvedModule = (val) => isModule(val) || true;
async function getLocaleMessages(locale, loader) {
  const nuxtApp = __nuxtMock;
  try {
    const getter = await nuxtApp.runWithContext(loader.load).then((x) => isResolvedModule(x) ? x.default : x);
    return isFunction(getter) ? await nuxtApp.runWithContext(() => getter(locale)) : getter;
  } catch (e) {
    throw new Error(`Failed loading locale (${locale}): ` + e.message);
  }
}
async function getLocaleMessagesMerged(locale, loaders = []) {
  const nuxtApp = __nuxtMock;
  const merged = {};
  for (const loader of loaders) {
    deepCopy(await nuxtApp.runWithContext(async () => await getLocaleMessages(locale, loader)), merged);
  }
  return merged;
}

const setupVueI18nOptions = async (defaultLocale) => {
  const options = await loadVueI18nOptions(vueI18nConfigs);
  options.locale = defaultLocale || options.locale || "en-US";
  options.defaultLocale = defaultLocale;
  options.fallbackLocale ??= false;
  options.messages ??= {};
  for (const locale of localeCodes) {
    options.messages[locale] ??= {};
  }
  return options;
};

const appHead = {"meta":[{"name":"viewport","content":"width=device-width, initial-scale=1"},{"charset":"utf-8"}],"link":[{"rel":"shortcut icon","href":"/imgs/favicon.ico"},{"rel":"stylesheet","href":"https://fonts.googleapis.com/css?family=Poppins:100,200,300,400,500,600,700,800,900&display=swap"},{"rel":"stylesheet","href":"/fonts/mona-sans/style.css"},{"rel":"stylesheet","href":"/css/plugins.css"},{"rel":"stylesheet","href":"/css/style.css"}],"style":[],"script":[{"src":"/js/charming.min.js"},{"src":"/js/bootstrap.bundle.min.js"},{"src":"/js/plugins.js"},{"src":"/js/isotope.pkgd.min.js"},{"src":"/js/wow.min.js"},{"src":"/js/gsap.min.js"},{"src":"/js/ScrollTrigger.min.js"},{"src":"/js/ScrollSmoother.min.js"},{"src":"https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js"},{"src":"/js/scripts.js","defer":true}],"noscript":[]};

const appRootTag = "div";

const appRootAttrs = {"id":"__nuxt"};

const appTeleportTag = "div";

const appTeleportAttrs = {"id":"teleports"};

const appId = "nuxt-app";

function useRuntimeI18n(nuxtApp) {
  {
    return useRuntimeConfig().public.i18n;
  }
}
function useI18nDetection(nuxtApp) {
  const detectBrowserLanguage = useRuntimeI18n().detectBrowserLanguage;
  const detect = detectBrowserLanguage || {};
  return {
    ...detect,
    enabled: !!detectBrowserLanguage,
    cookieKey: detect.cookieKey || "i18n_redirected"
  };
}
function resolveRootRedirect(config) {
  if (!config) return void 0;
  return {
    path: "/" + (isString(config) ? config : config.path).replace(/^\//, ""),
    code: !isString(config) && config.statusCode || 302
  };
}
function toArray(value) {
  return Array.isArray(value) ? value : [value];
}

const separator = "___";
const pathLanguageParser = createPathIndexLanguageParser(0);
const getLocaleFromRoutePath = (path) => pathLanguageParser(path);
const getLocaleFromRouteName = (name) => name.split(separator).at(1) ?? "";
function normalizeInput(input) {
  return typeof input !== "object" ? String(input) : String(input?.name || input?.path || "");
}
function getLocaleFromRoute(route) {
  const input = normalizeInput(route);
  return input[0] === "/" ? getLocaleFromRoutePath(input) : getLocaleFromRouteName(input);
}

function matchDomainLocale(locales, host, pathLocale) {
  const normalizeDomain = (domain = "") => domain.replace(/https?:\/\//, "");
  const matches = locales.filter(
    (locale) => normalizeDomain(locale.domain) === host || toArray(locale.domains).includes(host)
  );
  if (matches.length <= 1) {
    return matches[0]?.code;
  }
  return (
    // match by current path locale
    matches.find((l) => l.code === pathLocale)?.code || // fallback to default locale for the domain
    matches.find((l) => l.defaultForDomains?.includes(host) ?? l.domainDefault)?.code
  );
}

function parse(str, options) {
  if (typeof str !== "string") {
    throw new TypeError("argument str must be a string");
  }
  const obj = {};
  const opt = options || {};
  const dec = opt.decode || decode;
  let index = 0;
  while (index < str.length) {
    const eqIdx = str.indexOf("=", index);
    if (eqIdx === -1) {
      break;
    }
    let endIdx = str.indexOf(";", index);
    if (endIdx === -1) {
      endIdx = str.length;
    } else if (endIdx < eqIdx) {
      index = str.lastIndexOf(";", eqIdx - 1) + 1;
      continue;
    }
    const key = str.slice(index, eqIdx).trim();
    if (opt?.filter && !opt?.filter(key)) {
      index = endIdx + 1;
      continue;
    }
    if (void 0 === obj[key]) {
      let val = str.slice(eqIdx + 1, endIdx).trim();
      if (val.codePointAt(0) === 34) {
        val = val.slice(1, -1);
      }
      obj[key] = tryDecode(val, dec);
    }
    index = endIdx + 1;
  }
  return obj;
}
function decode(str) {
  return str.includes("%") ? decodeURIComponent(str) : str;
}
function tryDecode(str, decode2) {
  try {
    return decode2(str);
  } catch {
    return str;
  }
}

const getCookieLocale = (event, cookieName) => {
  const cookieValue = getRequestHeader(event, "cookie") || "";
  return parse(cookieValue)[cookieName];
};
const getRouteLocale = (event, route) => getLocaleFromRoute(route);
const getHeaderLocale = (event) => {
  return findBrowserLocale(normalizedLocales, parseAcceptLanguage(getRequestHeader(event, "accept-language") || ""));
};
const getHostLocale = (event, path, domainLocales) => {
  const host = getRequestURL(event, { xForwardedHost: true }).host;
  const locales = normalizedLocales.map((l) => ({
    ...l,
    domain: domainLocales[l.code]?.domain ?? l.domain
  }));
  return matchDomainLocale(locales, host, getLocaleFromRoutePath(path));
};
const useDetectors = (event, config, nuxtApp) => {
  if (!event) {
    throw new Error("H3Event is required for server-side locale detection");
  }
  const runtimeI18n = useRuntimeI18n();
  return {
    cookie: () => getCookieLocale(event, config.cookieKey),
    header: () => getHeaderLocale(event) ,
    navigator: () => void 0,
    host: (path) => getHostLocale(event, path, runtimeI18n.domainLocales),
    route: (path) => getRouteLocale(event, path)
  };
};

// Generated by @nuxtjs/i18n
const pathToI18nConfig = {
  "/about": {
    "en": "/about",
    "lv": "/about",
    "ru": "/about"
  },
  "/": {
    "en": "/",
    "lv": "/",
    "ru": "/"
  },
  "/contact": {
    "en": "/contact",
    "lv": "/contact",
    "ru": "/contact"
  },
  "/:all(.*)*": {
    "en": "/:all(.*)*",
    "lv": "/:all(.*)*",
    "ru": "/:all(.*)*"
  },
  "/portfolio": {
    "en": "/portfolio",
    "lv": "/portfolio",
    "ru": "/portfolio"
  },
  "/projects/5w": {
    "en": "/projects/5w",
    "lv": "/projects/5w",
    "ru": "/projects/5w"
  },
  "/creative-agency": {
    "en": "/creative-agency",
    "lv": "/creative-agency",
    "ru": "/creative-agency"
  },
  "/projects/Palami": {
    "en": "/projects/Palami",
    "lv": "/projects/Palami",
    "ru": "/projects/Palami"
  },
  "/projects/ViaBon": {
    "en": "/projects/ViaBon",
    "lv": "/projects/ViaBon",
    "ru": "/projects/ViaBon"
  },
  "/services/:slug()": {
    "en": "/services/:slug()",
    "lv": "/services/:slug()",
    "ru": "/services/:slug()"
  },
  "/projects/Mullers": {
    "en": "/projects/Mullers",
    "lv": "/projects/Mullers",
    "ru": "/projects/Mullers"
  },
  "/projects/PenaLab": {
    "en": "/projects/PenaLab",
    "lv": "/projects/PenaLab",
    "ru": "/projects/PenaLab"
  },
  "/projects/FinanceLabs": {
    "en": "/projects/FinanceLabs",
    "lv": "/projects/FinanceLabs",
    "ru": "/projects/FinanceLabs"
  }
};
const i18nPathToPath = {
  "/about": "/about",
  "/": "/",
  "/contact": "/contact",
  "/:all(.*)*": "/:all(.*)*",
  "/portfolio": "/portfolio",
  "/projects/5w": "/projects/5w",
  "/creative-agency": "/creative-agency",
  "/projects/Palami": "/projects/Palami",
  "/projects/ViaBon": "/projects/ViaBon",
  "/services/:slug()": "/services/:slug()",
  "/projects/Mullers": "/projects/Mullers",
  "/projects/PenaLab": "/projects/PenaLab",
  "/projects/FinanceLabs": "/projects/FinanceLabs"
};

const matcher = createRouterMatcher([], {});
for (const path of Object.keys(i18nPathToPath)) {
  matcher.addRoute({ path, component: () => "", meta: {} });
}
const getI18nPathToI18nPath = (path, locale) => {
  if (!path || !locale) return;
  const plainPath = i18nPathToPath[path];
  const i18nConfig = pathToI18nConfig[plainPath];
  if (i18nConfig && i18nConfig[locale]) {
    return i18nConfig[locale] === true ? plainPath : i18nConfig[locale];
  }
};
function isExistingNuxtRoute(path) {
  if (path === "") return;
  const resolvedMatch = matcher.resolve({ path }, { path: "/", name: "", matched: [], params: {}, meta: {} });
  return resolvedMatch.matched.length > 0 ? resolvedMatch : void 0;
}
function matchLocalized(path, locale, defaultLocale) {
  if (path === "") return;
  const parsed = parsePath(path);
  const resolvedMatch = matcher.resolve(
    { path: parsed.pathname || "/" },
    { path: "/", name: "", matched: [], params: {}, meta: {} }
  );
  if (resolvedMatch.matched.length > 0) {
    const alternate = getI18nPathToI18nPath(resolvedMatch.matched[0].path, locale);
    const match = matcher.resolve(
      { params: resolvedMatch.params },
      { path: alternate || "/", name: "", matched: [], params: {}, meta: {} }
    );
    const isPrefixable = prefixable(locale, defaultLocale);
    return withLeadingSlash(joinURL(isPrefixable ? locale : "", match.path));
  }
}
function prefixable(currentLocale, defaultLocale) {
  return   (currentLocale !== defaultLocale || "prefix_except_default" === "prefix");
}

const getHost = (event) => getRequestURL(event, { xForwardedHost: true }).host;
function* detect(detectors, detection, path) {
  if (detection.enabled) {
    yield { locale: detectors.cookie(), source: "cookie" };
    yield { locale: detectors.header(), source: "header" };
  }
  {
    yield { locale: detectors.route(path), source: "route" };
  }
  yield { locale: detection.fallbackLocale, source: "fallback" };
}
const _GXvIFiXUzCcCoNlXSQELKOsruxvj53vT9nGUrkwyt5o = defineNitroPlugin(async (nitro) => {
  const runtimeI18n = useRuntimeI18n();
  const rootRedirect = resolveRootRedirect(runtimeI18n.rootRedirect);
  const _defaultLocale = runtimeI18n.defaultLocale || "";
  try {
    const cacheStorage = useStorage("cache");
    const cachedKeys = await cacheStorage.getKeys("nitro:handlers:i18n");
    await Promise.all(cachedKeys.map((key) => cacheStorage.removeItem(key)));
  } catch {
  }
  const detection = useI18nDetection();
  const cookieOptions = {
    path: "/",
    domain: detection.cookieDomain || void 0,
    maxAge: 60 * 60 * 24 * 365,
    sameSite: "lax",
    secure: detection.cookieSecure
  };
  const createBaseUrlGetter = () => {
    isFunction(runtimeI18n.baseUrl) ? "" : runtimeI18n.baseUrl || "";
    if (isFunction(runtimeI18n.baseUrl)) {
      return () => "";
    }
    return (event, defaultLocale) => {
      return "";
    };
  };
  function resolveRedirectPath(event, path, pathLocale, defaultLocale, detector) {
    let locale = "";
    for (const detected of detect(detector, detection, event.path)) {
      if (detected.locale && isSupportedLocale(detected.locale)) {
        locale = detected.locale;
        break;
      }
    }
    locale ||= defaultLocale;
    function getLocalizedMatch(locale2) {
      const res = matchLocalized(path || "/", locale2, defaultLocale);
      if (res && res !== event.path) {
        return res;
      }
    }
    let resolvedPath = void 0;
    let redirectCode = 302;
    const requestURL = getRequestURL(event);
    if (rootRedirect && requestURL.pathname === "/") {
      locale = detection.enabled && locale || defaultLocale;
      resolvedPath = isSupportedLocale(detector.route(rootRedirect.path)) && rootRedirect.path || matchLocalized(rootRedirect.path, locale, defaultLocale);
      redirectCode = rootRedirect.code;
    } else if (runtimeI18n.redirectStatusCode) {
      redirectCode = runtimeI18n.redirectStatusCode;
    }
    switch (detection.redirectOn) {
      case "root":
        if (requestURL.pathname !== "/") break;
      // fallthrough (root has no prefix)
      case "no prefix":
        if (pathLocale) break;
      // fallthrough to resolve
      case "all":
        resolvedPath ??= getLocalizedMatch(locale);
        break;
    }
    if (requestURL.pathname === "/" && "prefix_except_default" === "prefix") ;
    return { path: resolvedPath, code: redirectCode, locale };
  }
  const baseUrlGetter = createBaseUrlGetter();
  nitro.hooks.hook("request", async (event) => {
    const options = await setupVueI18nOptions(getDefaultLocaleForDomain(getHost(event)) || _defaultLocale);
    const url = getRequestURL(event);
    const ctx = createI18nContext();
    event.context.nuxtI18n = ctx;
    {
      const detector = useDetectors(event, detection);
      const localeSegment = detector.route(event.path);
      const pathLocale = isSupportedLocale(localeSegment) && localeSegment || void 0;
      const path = pathLocale && url.pathname.slice(pathLocale.length + 1) || url.pathname;
      if (!url.pathname.includes("/_i18n/") && !isExistingNuxtRoute(path)) {
        return;
      }
      const resolved = resolveRedirectPath(event, path, pathLocale, options.defaultLocale, detector);
      if (resolved.path && resolved.path !== url.pathname) {
        ctx.detectLocale = resolved.locale;
        detection.useCookie && setCookie(event, detection.cookieKey, resolved.locale, cookieOptions);
        await sendRedirect(
          event,
          joinURL(baseUrlGetter(event, options.defaultLocale), resolved.path + url.search),
          resolved.code
        );
        return;
      }
    }
    const localeConfigs = createLocaleConfigs(options.fallbackLocale);
    ctx.vueI18nOptions = options;
    ctx.localeConfigs = localeConfigs;
  });
  nitro.hooks.hook("render:html", (htmlContext, { event }) => {
    tryUseI18nContext(event);
  });
});

const plugins = [
  _GXvIFiXUzCcCoNlXSQELKOsruxvj53vT9nGUrkwyt5o
];

const assets = {
  "/contact.php": {
    "type": "application/x-httpd-php",
    "etag": "\"605-AK6AmdkCEZvMQrEcrfOg3vSuUZs\"",
    "mtime": "2025-08-21T10:20:41.879Z",
    "size": 1541,
    "path": "../public/contact.php"
  },
  "/des.jpg": {
    "type": "image/jpeg",
    "etag": "\"3e5ed-hQHyAo04s+b7tEcQbub2BNnh9No\"",
    "mtime": "2025-08-21T10:20:41.886Z",
    "size": 255469,
    "path": "../public/des.jpg"
  },
  "/favicon.ico": {
    "type": "image/vnd.microsoft.icon",
    "etag": "\"2c74d-kGts8wM10KXmAmsg4yN4cNeWOfQ\"",
    "mtime": "2025-09-14T08:26:34.434Z",
    "size": 182093,
    "path": "../public/favicon.ico"
  },
  "/googleac00a413d9409453.html": {
    "type": "text/html; charset=utf-8",
    "etag": "\"35-2zyuyo0MKX5R0GmYlX4chkZn9AQ\"",
    "mtime": "2025-09-05T16:48:46.397Z",
    "size": 53,
    "path": "../public/googleac00a413d9409453.html"
  },
  "/robots.txt": {
    "type": "text/plain; charset=utf-8",
    "etag": "\"c4-jTkg8SbtLAQUqxjCBlXBNBHgk+I\"",
    "mtime": "2025-09-16T18:17:44.794Z",
    "size": 196,
    "path": "../public/robots.txt"
  },
  "/sitemap.xml": {
    "type": "application/xml",
    "etag": "\"a58-OOPX3+ExdAbFr5Getkhd8kE5JKA\"",
    "mtime": "2025-09-16T19:32:25.508Z",
    "size": 2648,
    "path": "../public/sitemap.xml"
  },
  "/css/base.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"250-ouxLnOtTYWSycsILBdEthtGAuLU\"",
    "mtime": "2025-09-27T20:41:38.046Z",
    "size": 592,
    "path": "../public/css/base.css"
  },
  "/css/plugins.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"564-9EobcUslqGhpJBWOMPLxZC0BDR4\"",
    "mtime": "2025-09-27T20:41:38.062Z",
    "size": 1380,
    "path": "../public/css/plugins.css"
  },
  "/css/style.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"21d0d-G6seaqcco2rMNPLr6960KsPKWTg\"",
    "mtime": "2025-09-28T19:30:15.195Z",
    "size": 138509,
    "path": "../public/css/style.css"
  },
  "/imgs/About_banner.jpg": {
    "type": "image/jpeg",
    "etag": "\"18657-x7AEFGP2mKKID0HEFcJ+XveoNnw\"",
    "mtime": "2025-09-27T20:41:38.212Z",
    "size": 99927,
    "path": "../public/imgs/About_banner.jpg"
  },
  "/imgs/favicon.ico": {
    "type": "image/vnd.microsoft.icon",
    "etag": "\"2c74d-kGts8wM10KXmAmsg4yN4cNeWOfQ\"",
    "mtime": "2025-09-27T20:41:38.223Z",
    "size": 182093,
    "path": "../public/imgs/favicon.ico"
  },
  "/imgs/logo-light.png": {
    "type": "image/png",
    "etag": "\"1064-PUPkZypBdpllnGVWZ1gP/hKXd7U\"",
    "mtime": "2025-09-27T20:41:38.225Z",
    "size": 4196,
    "path": "../public/imgs/logo-light.png"
  },
  "/imgs/Logo_dark.svg": {
    "type": "image/svg+xml",
    "etag": "\"1635-+TLBAv/5EVIva0ycD/F9DTZZCeM\"",
    "mtime": "2025-09-27T20:41:38.213Z",
    "size": 5685,
    "path": "../public/imgs/Logo_dark.svg"
  },
  "/imgs/Logo_IDigex.svg": {
    "type": "image/svg+xml",
    "etag": "\"1424-C+y5G2zXkQP9n6S0VFzVuw5ouBE\"",
    "mtime": "2025-09-27T20:41:38.213Z",
    "size": 5156,
    "path": "../public/imgs/Logo_IDigex.svg"
  },
  "/imgs/Main banner-min.jpg": {
    "type": "image/jpeg",
    "etag": "\"4ae3f-SVO4eKMruxQaBO37QXSnoovP+xk\"",
    "mtime": "2025-09-27T20:41:38.216Z",
    "size": 306751,
    "path": "../public/imgs/Main banner-min.jpg"
  },
  "/imgs/noise.png": {
    "type": "image/png",
    "etag": "\"17971-wH61vgfLMMKLxhmRrJROi3gQYyg\"",
    "mtime": "2025-09-27T20:41:38.226Z",
    "size": 96625,
    "path": "../public/imgs/noise.png"
  },
  "/imgs/Services_m_1.jpg": {
    "type": "image/jpeg",
    "etag": "\"1cc21-qU5JvrX2sLOk85p8U0sEsraQleU\"",
    "mtime": "2025-09-27T20:41:38.217Z",
    "size": 117793,
    "path": "../public/imgs/Services_m_1.jpg"
  },
  "/imgs/Services_m_2.jpg": {
    "type": "image/jpeg",
    "etag": "\"4973c-vTSuODyS//wE63726oa/iE2OJWw\"",
    "mtime": "2025-09-27T20:41:38.220Z",
    "size": 300860,
    "path": "../public/imgs/Services_m_2.jpg"
  },
  "/imgs/Services_m_3.jpg": {
    "type": "image/jpeg",
    "etag": "\"1a1c9-4gRayqJQzcWbB+h6Wf/reQeU68M\"",
    "mtime": "2025-09-27T20:41:38.221Z",
    "size": 106953,
    "path": "../public/imgs/Services_m_3.jpg"
  },
  "/imgs/Services_m_4.jpg": {
    "type": "image/jpeg",
    "etag": "\"49449-XLyzfPusQhZfhmKfqF/gx5+q4d8\"",
    "mtime": "2025-09-27T20:41:38.222Z",
    "size": 300105,
    "path": "../public/imgs/Services_m_4.jpg"
  },
  "/fonts/fa-brands-400.eot": {
    "type": "application/vnd.ms-fontobject",
    "etag": "\"20c96-0f/WNAzb9yiQzLZ/MgFer8XfUac\"",
    "mtime": "2025-09-27T20:41:38.080Z",
    "size": 134294,
    "path": "../public/fonts/fa-brands-400.eot"
  },
  "/fonts/fa-brands-400.ttf": {
    "type": "font/ttf",
    "etag": "\"20b64-irkHCD/sqqKp7JOyf4hK10VzcFw\"",
    "mtime": "2025-09-27T20:41:38.082Z",
    "size": 133988,
    "path": "../public/fonts/fa-brands-400.ttf"
  },
  "/fonts/fa-brands-400.woff": {
    "type": "font/woff",
    "etag": "\"15f84-Hh8Cv6ieF5/i3RODJzuIEqqHNBg\"",
    "mtime": "2025-09-27T20:41:38.083Z",
    "size": 89988,
    "path": "../public/fonts/fa-brands-400.woff"
  },
  "/fonts/fa-brands-400.woff2": {
    "type": "font/woff2",
    "etag": "\"12bc0-BhPH67pV7kfvMCwPd2YyRpL4mac\"",
    "mtime": "2025-09-27T20:41:38.083Z",
    "size": 76736,
    "path": "../public/fonts/fa-brands-400.woff2"
  },
  "/fonts/fa-regular-400.eot": {
    "type": "application/vnd.ms-fontobject",
    "etag": "\"84f2-Zw+wHkkwrkb+jW0rderSiPVOjmE\"",
    "mtime": "2025-09-27T20:41:38.084Z",
    "size": 34034,
    "path": "../public/fonts/fa-regular-400.eot"
  },
  "/fonts/fa-regular-400.ttf": {
    "type": "font/ttf",
    "etag": "\"83c8-w0rNaBjfbba+QaLjMYhnZdYB8us\"",
    "mtime": "2025-09-27T20:41:38.085Z",
    "size": 33736,
    "path": "../public/fonts/fa-regular-400.ttf"
  },
  "/fonts/fa-regular-400.woff": {
    "type": "font/woff",
    "etag": "\"3f94-OtT05LH7Pt7j1Lol5s3+0vC4ilQ\"",
    "mtime": "2025-09-27T20:41:38.085Z",
    "size": 16276,
    "path": "../public/fonts/fa-regular-400.woff"
  },
  "/fonts/fa-regular-400.woff2": {
    "type": "font/woff2",
    "etag": "\"33a8-E1F1Ka/6OeJYXFkayubcM2tqqRc\"",
    "mtime": "2025-09-27T20:41:38.085Z",
    "size": 13224,
    "path": "../public/fonts/fa-regular-400.woff2"
  },
  "/fonts/fa-solid-900.eot": {
    "type": "application/vnd.ms-fontobject",
    "etag": "\"31916-6oRcWb7kpcbbd0uNgGD1ZBt4muk\"",
    "mtime": "2025-09-27T20:41:38.088Z",
    "size": 203030,
    "path": "../public/fonts/fa-solid-900.eot"
  },
  "/fonts/fa-solid-900.ttf": {
    "type": "font/ttf",
    "etag": "\"317f8-64kU9rF5e0XuCIPmCJ2SaV2flEE\"",
    "mtime": "2025-09-27T20:41:38.091Z",
    "size": 202744,
    "path": "../public/fonts/fa-solid-900.ttf"
  },
  "/fonts/fa-solid-900.woff": {
    "type": "font/woff",
    "etag": "\"18d10-oirNdpfzbn1MwxqFPHDndurFS7E\"",
    "mtime": "2025-09-27T20:41:38.092Z",
    "size": 101648,
    "path": "../public/fonts/fa-solid-900.woff"
  },
  "/fonts/fa-solid-900.woff2": {
    "type": "font/woff2",
    "etag": "\"131bc-DMssgUp+TKEsR3iCFjOAnLA2Hqo\"",
    "mtime": "2025-09-27T20:41:38.092Z",
    "size": 78268,
    "path": "../public/fonts/fa-solid-900.woff2"
  },
  "/fonts/fontawesome-webfont.eot": {
    "type": "application/vnd.ms-fontobject",
    "etag": "\"2876e-2YDCzoc9xDr0YNTVctRBMESZ9AA\"",
    "mtime": "2025-09-27T20:41:38.092Z",
    "size": 165742,
    "path": "../public/fonts/fontawesome-webfont.eot"
  },
  "/fonts/fontawesome-webfont.ttf": {
    "type": "font/ttf",
    "etag": "\"286ac-E7HqtlqYPHpzvHmXxHnWaUP3xss\"",
    "mtime": "2025-09-27T20:41:38.092Z",
    "size": 165548,
    "path": "../public/fonts/fontawesome-webfont.ttf"
  },
  "/fonts/fontawesome-webfont.woff": {
    "type": "font/woff",
    "etag": "\"17ee8-KLeCJAs+dtuCThLAJ1SpcxoWdSc\"",
    "mtime": "2025-09-27T20:41:38.092Z",
    "size": 98024,
    "path": "../public/fonts/fontawesome-webfont.woff"
  },
  "/fonts/fontawesome-webfont.woff2": {
    "type": "font/woff2",
    "etag": "\"12d68-1vSMun0Hb7by/Wupk6dbncHsvww\"",
    "mtime": "2025-09-27T20:41:38.092Z",
    "size": 77160,
    "path": "../public/fonts/fontawesome-webfont.woff2"
  },
  "/fonts/FontAwesome.otf": {
    "type": "font/otf",
    "etag": "\"20e98-BIcHvFKsS2VjqqODv+hmCg3ckIw\"",
    "mtime": "2025-09-27T20:41:38.074Z",
    "size": 134808,
    "path": "../public/fonts/FontAwesome.otf"
  },
  "/fonts/ionicons.eot": {
    "type": "application/vnd.ms-fontobject",
    "etag": "\"1d794-YVMuieIS+N0WujHz6881wKczQDU\"",
    "mtime": "2025-09-27T20:41:38.092Z",
    "size": 120724,
    "path": "../public/fonts/ionicons.eot"
  },
  "/fonts/ionicons.ttf": {
    "type": "font/ttf",
    "etag": "\"2e05c-GwoN4ISQWUaiAwDKjDVIZd7EZ2Q\"",
    "mtime": "2025-09-27T20:41:38.092Z",
    "size": 188508,
    "path": "../public/fonts/ionicons.ttf"
  },
  "/fonts/ionicons.woff": {
    "type": "font/woff",
    "etag": "\"10940-5GgZ6GOkZ1HWIsEZDE6Kg+vCBhI\"",
    "mtime": "2025-09-27T20:41:38.092Z",
    "size": 67904,
    "path": "../public/fonts/ionicons.woff"
  },
  "/fonts/Pe-icon-7-stroke.eot": {
    "type": "application/vnd.ms-fontobject",
    "etag": "\"e538-bAn5sBovip1nIpKy1B2U5jnq8T0\"",
    "mtime": "2025-09-27T20:41:38.074Z",
    "size": 58680,
    "path": "../public/fonts/Pe-icon-7-stroke.eot"
  },
  "/fonts/Pe-icon-7-stroke.ttf": {
    "type": "font/ttf",
    "etag": "\"e470-6NIauRh38AQvvutyvq9xymWVueg\"",
    "mtime": "2025-09-27T20:41:38.076Z",
    "size": 58480,
    "path": "../public/fonts/Pe-icon-7-stroke.ttf"
  },
  "/fonts/Pe-icon-7-stroke.woff": {
    "type": "font/woff",
    "etag": "\"e4bc-flRLsRt2VZmNtvMkxhL3/78Ktm4\"",
    "mtime": "2025-09-27T20:41:38.078Z",
    "size": 58556,
    "path": "../public/fonts/Pe-icon-7-stroke.woff"
  },
  "/js/bootstrap.bundle.min.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"13137-vNOSotlQUYEeolAIyoXKpLsMT+g\"",
    "mtime": "2025-09-27T20:41:38.609Z",
    "size": 78135,
    "path": "../public/js/bootstrap.bundle.min.js"
  },
  "/js/charming.min.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"34f-MFvRWHdJ4u13AhmXbmpFI9gnaPI\"",
    "mtime": "2025-09-27T20:41:38.611Z",
    "size": 847,
    "path": "../public/js/charming.min.js"
  },
  "/js/countdown.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"863-0RVVvwOnswGLeDtyDqCkh9mMpy0\"",
    "mtime": "2025-09-27T20:41:38.611Z",
    "size": 2147,
    "path": "../public/js/countdown.js"
  },
  "/js/demo.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"1a8c6-2RQ5iWzUMWEYCCaaftIHpmHZ4ss\"",
    "mtime": "2025-09-27T20:41:38.612Z",
    "size": 108742,
    "path": "../public/js/demo.js"
  },
  "/js/gsap.min.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"116d8-nXR3+f0D8boWxkVMLap7uIAWA0I\"",
    "mtime": "2025-09-27T20:41:38.613Z",
    "size": 71384,
    "path": "../public/js/gsap.min.js"
  },
  "/js/hscroll.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"259-VG6e+FKbrcZSciAfdv4pFx+prso\"",
    "mtime": "2025-09-27T20:41:38.614Z",
    "size": 601,
    "path": "../public/js/hscroll.js"
  },
  "/js/imagesloaded.pkgd.min.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"1547-bgFCCIki8JtmbXJdg/UyWPYKzOE\"",
    "mtime": "2025-09-27T20:41:38.615Z",
    "size": 5447,
    "path": "../public/js/imagesloaded.pkgd.min.js"
  },
  "/js/isotope.pkgd.min.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"8a80-FMf1nnPSqZqmiMJEOpqbJKy/9Dw\"",
    "mtime": "2025-09-27T20:41:38.615Z",
    "size": 35456,
    "path": "../public/js/isotope.pkgd.min.js"
  },
  "/js/map.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"f16-IQeKxBR27To+sQYDVUXeZL0xz8E\"",
    "mtime": "2025-09-27T20:41:38.616Z",
    "size": 3862,
    "path": "../public/js/map.js"
  },
  "/js/parallax.min.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"2486-j84+ubRMUHHtxGcdkhMpcrcFv+o\"",
    "mtime": "2025-09-27T20:41:38.616Z",
    "size": 9350,
    "path": "../public/js/parallax.min.js"
  },
  "/js/plugins.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"3f37-FUE3/qFk/Wgy21uNy8iNo9wJPKY\"",
    "mtime": "2025-09-27T20:41:38.617Z",
    "size": 16183,
    "path": "../public/js/plugins.js"
  },
  "/js/scripts.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"b2-7g8f1S+H3MFXnMULBpvGEyLwio8\"",
    "mtime": "2025-09-27T20:41:38.617Z",
    "size": 178,
    "path": "../public/js/scripts.js"
  },
  "/js/ScrollSmoother.min.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"2f9c-eFL7pS4SZ21OtkNgMsF+MwLumrM\"",
    "mtime": "2025-09-27T20:41:38.594Z",
    "size": 12188,
    "path": "../public/js/ScrollSmoother.min.js"
  },
  "/js/ScrollTrigger.min.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"a169-AuMgdWb0+tY65QmLLJQZJ+wPbX0\"",
    "mtime": "2025-09-27T20:41:38.594Z",
    "size": 41321,
    "path": "../public/js/ScrollTrigger.min.js"
  },
  "/js/smoother-script.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"177-GaTDbJXXIKAdAkTgeJJdpNatnMg\"",
    "mtime": "2025-09-27T20:41:38.618Z",
    "size": 375,
    "path": "../public/js/smoother-script.js"
  },
  "/js/TweenMax.min.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"3f914-3fF9gKUHKjKptE4E9OFffyaenOg\"",
    "mtime": "2025-09-27T20:41:38.594Z",
    "size": 260372,
    "path": "../public/js/TweenMax.min.js"
  },
  "/js/wow.min.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"3ae5-WKqSatx4JTob60BXlFPi1Wz6FFk\"",
    "mtime": "2025-09-27T20:41:38.619Z",
    "size": 15077,
    "path": "../public/js/wow.min.js"
  },
  "/_nuxt/1jH27Qmq.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"13e6-fmxU6B21QRGvx8UtHjRkzFOH42I\"",
    "mtime": "2025-09-28T19:30:26.733Z",
    "size": 5094,
    "path": "../public/_nuxt/1jH27Qmq.js"
  },
  "/_nuxt/B-tiLm8f.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"25a-/QkURa6Xw+tt9Cjl0eiw6OWCX5w\"",
    "mtime": "2025-09-28T19:30:26.733Z",
    "size": 602,
    "path": "../public/_nuxt/B-tiLm8f.js"
  },
  "/_nuxt/B21icfte.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"8e5a-fVWt/lOvUmBcWENabCsojRMKHdA\"",
    "mtime": "2025-09-28T19:30:26.733Z",
    "size": 36442,
    "path": "../public/_nuxt/B21icfte.js"
  },
  "/_nuxt/B7IEb7eY.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"13a5-YGeagEpNBPyyNYefXN4jQk89poQ\"",
    "mtime": "2025-09-28T19:30:26.733Z",
    "size": 5029,
    "path": "../public/_nuxt/B7IEb7eY.js"
  },
  "/_nuxt/Bjou_V1r.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"d37-okd+n7meFV32CeARZnQ5fZ7hc1E\"",
    "mtime": "2025-09-28T19:30:26.733Z",
    "size": 3383,
    "path": "../public/_nuxt/Bjou_V1r.js"
  },
  "/_nuxt/BVad-gR8.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"685e-j6Q6tDfPfJ62CDaIIspr2eFshdA\"",
    "mtime": "2025-09-28T19:30:26.737Z",
    "size": 26718,
    "path": "../public/_nuxt/BVad-gR8.js"
  },
  "/_nuxt/BwoIW13p.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"391-itCgzO5LAw5mOybXxX4/rE9Txz8\"",
    "mtime": "2025-09-28T19:30:26.733Z",
    "size": 913,
    "path": "../public/_nuxt/BwoIW13p.js"
  },
  "/_nuxt/B_Kdjlo6.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"2e7c-Zmit0feigVEhodA5RETw+rHaRkA\"",
    "mtime": "2025-09-28T19:30:26.733Z",
    "size": 11900,
    "path": "../public/_nuxt/B_Kdjlo6.js"
  },
  "/_nuxt/C4nn2V66.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"1f9-Hll4Or8forfCLn9afWR2es+6Lyc\"",
    "mtime": "2025-09-28T19:30:26.733Z",
    "size": 505,
    "path": "../public/_nuxt/C4nn2V66.js"
  },
  "/_nuxt/C6ariGr5.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"1412-F//HK2WhpK+xS+9lnWU5v1eXgsU\"",
    "mtime": "2025-09-28T19:30:26.733Z",
    "size": 5138,
    "path": "../public/_nuxt/C6ariGr5.js"
  },
  "/_nuxt/CDRkeY5d.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"dcb-J8egE0fCWzk3UATPrS3ScRyh9k8\"",
    "mtime": "2025-09-28T19:30:26.733Z",
    "size": 3531,
    "path": "../public/_nuxt/CDRkeY5d.js"
  },
  "/_nuxt/Ces2lQgR.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"d2e-0n56jC2ywPV0rBrS0kCNRKQVKW8\"",
    "mtime": "2025-09-28T19:30:26.733Z",
    "size": 3374,
    "path": "../public/_nuxt/Ces2lQgR.js"
  },
  "/_nuxt/CNYjWOQa.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"48ea-qo7o7gmwvdDuucC18U9vT/lGWNA\"",
    "mtime": "2025-09-28T19:30:26.737Z",
    "size": 18666,
    "path": "../public/_nuxt/CNYjWOQa.js"
  },
  "/_nuxt/CQSkDu6H.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"3261-/91w7IaSOAvELFkkmUWBHlBJ6d0\"",
    "mtime": "2025-09-28T19:30:26.733Z",
    "size": 12897,
    "path": "../public/_nuxt/CQSkDu6H.js"
  },
  "/_nuxt/D--tcrqx.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"2316-60mZMAnpHaZOmR9H4C+nBL0wkH8\"",
    "mtime": "2025-09-28T19:30:26.733Z",
    "size": 8982,
    "path": "../public/_nuxt/D--tcrqx.js"
  },
  "/_nuxt/D7sFhZXG.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"7eb-CUS2qidLBnS/Snl5IiyX9jWv5f0\"",
    "mtime": "2025-09-28T19:30:26.733Z",
    "size": 2027,
    "path": "../public/_nuxt/D7sFhZXG.js"
  },
  "/_nuxt/D8EQoOsD.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"3e0-ZsjUc8ZxsC+iLtkaKj89mCTkp1k\"",
    "mtime": "2025-09-28T19:30:26.733Z",
    "size": 992,
    "path": "../public/_nuxt/D8EQoOsD.js"
  },
  "/_nuxt/DbVCS9iz.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"13ca-hU2H4585cPVY3TxHF06atjFuVzI\"",
    "mtime": "2025-09-28T19:30:26.733Z",
    "size": 5066,
    "path": "../public/_nuxt/DbVCS9iz.js"
  },
  "/_nuxt/Deh6--pq.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"13d-h9CN6syVcPRwqlHuwtjedTy3mAo\"",
    "mtime": "2025-09-28T19:30:26.733Z",
    "size": 317,
    "path": "../public/_nuxt/Deh6--pq.js"
  },
  "/_nuxt/DFJDXlNt.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"f7-0Z98yX3JTau7SK8N5gvIOY2MunA\"",
    "mtime": "2025-09-28T19:30:26.733Z",
    "size": 247,
    "path": "../public/_nuxt/DFJDXlNt.js"
  },
  "/_nuxt/DIxgIYD-.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"103-ryDypHrA1yREOBzVpdK5YSG6Ya8\"",
    "mtime": "2025-09-28T19:30:26.733Z",
    "size": 259,
    "path": "../public/_nuxt/DIxgIYD-.js"
  },
  "/_nuxt/DmDiQTGC.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"166c-FDr6cUfzXL44sc+w8A7vUu8kXto\"",
    "mtime": "2025-09-28T19:30:26.733Z",
    "size": 5740,
    "path": "../public/_nuxt/DmDiQTGC.js"
  },
  "/_nuxt/DnMnLoFm.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"16b5-OQV+6M/XogyX/bRsz4Ko91KEcjM\"",
    "mtime": "2025-09-28T19:30:26.733Z",
    "size": 5813,
    "path": "../public/_nuxt/DnMnLoFm.js"
  },
  "/_nuxt/DsgzOVKm.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"e9f-JyogksSD7cGqW9B4WSrnbKcM6N8\"",
    "mtime": "2025-09-28T19:30:26.733Z",
    "size": 3743,
    "path": "../public/_nuxt/DsgzOVKm.js"
  },
  "/_nuxt/DYwJ-ck_.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"13e6-ny5EwimT8V4FizgwFG4rk/z0Lbg\"",
    "mtime": "2025-09-28T19:30:26.733Z",
    "size": 5094,
    "path": "../public/_nuxt/DYwJ-ck_.js"
  },
  "/_nuxt/error-404.DqZyKpgk.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"dce-saxwjItO1YVdOSJb93rly2zR334\"",
    "mtime": "2025-09-28T19:30:26.733Z",
    "size": 3534,
    "path": "../public/_nuxt/error-404.DqZyKpgk.css"
  },
  "/_nuxt/error-500.CZqNkBuR.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"75c-Ri+jM1T7rkunCBcNyJ0rTLFEHks\"",
    "mtime": "2025-09-28T19:30:26.733Z",
    "size": 1884,
    "path": "../public/_nuxt/error-500.CZqNkBuR.css"
  },
  "/_nuxt/error.C7ZbH1rl.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"40-vpcX0CnB3zVhYZuvE3Cc6e556yk\"",
    "mtime": "2025-09-28T19:30:26.733Z",
    "size": 64,
    "path": "../public/_nuxt/error.C7ZbH1rl.css"
  },
  "/_nuxt/GM_MsICi.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"459d-j4v0zfWzr1muzTXlKOv9akSuhEY\"",
    "mtime": "2025-09-28T19:30:26.733Z",
    "size": 17821,
    "path": "../public/_nuxt/GM_MsICi.js"
  },
  "/_nuxt/IxWs0Rf8.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"ee8-NnoltToWzyiWGM6G/fTqLs+GM2Y\"",
    "mtime": "2025-09-28T19:30:26.733Z",
    "size": 3816,
    "path": "../public/_nuxt/IxWs0Rf8.js"
  },
  "/_nuxt/P0ygnNMB.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"3c4af-64MG6CIhzwVEU9VYZS5PECr3bqk\"",
    "mtime": "2025-09-28T19:30:26.733Z",
    "size": 246959,
    "path": "../public/_nuxt/P0ygnNMB.js"
  },
  "/assets/scss/style.scss": {
    "type": "text/x-scss; charset=utf-8",
    "etag": "\"655-owYqnNGTuqUJUUuwpr2X7EkLtg4\"",
    "mtime": "2025-08-21T10:20:43.968Z",
    "size": 1621,
    "path": "../public/assets/scss/style.scss"
  },
  "/assets/vid/vid-startup.mp4": {
    "type": "video/mp4",
    "etag": "\"1775635-/VJJfqJE0ZQIprIxjwsbAqruhPg\"",
    "mtime": "2025-08-21T10:20:44.396Z",
    "size": 24598069,
    "path": "../public/assets/vid/vid-startup.mp4"
  },
  "/css/components/_cursor.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"174b-1RQGpa6btJGK/fO9iLTpZDdlFyo\"",
    "mtime": "2025-09-27T20:41:38.046Z",
    "size": 5963,
    "path": "../public/css/components/_cursor.css"
  },
  "/css/components/_helper.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"4f4a-jNDNb6soGKhdfsWyE9lwSVuJ2zU\"",
    "mtime": "2025-09-27T20:41:38.046Z",
    "size": 20298,
    "path": "../public/css/components/_helper.css"
  },
  "/css/components/_overlay.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"86d-LyOkIH8AKm43UFNBwKvDMaJyUWU\"",
    "mtime": "2025-09-27T20:41:38.046Z",
    "size": 2157,
    "path": "../public/css/components/_overlay.css"
  },
  "/css/layout/_awards.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"3cc-mxXgnVQJ4u3dEVHVstDOnBCpvfQ\"",
    "mtime": "2025-09-27T20:41:38.046Z",
    "size": 972,
    "path": "../public/css/layout/_awards.css"
  },
  "/css/layout/_brand.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"b97-qtaFw6J+/c7mJO/JUm9YyYY7tsQ\"",
    "mtime": "2025-09-27T20:41:38.046Z",
    "size": 2967,
    "path": "../public/css/layout/_brand.css"
  },
  "/css/layout/_footer.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"3c6-cULNPFYyo62ddNWJq95nkbtetmY\"",
    "mtime": "2025-09-27T20:41:38.046Z",
    "size": 966,
    "path": "../public/css/layout/_footer.css"
  },
  "/css/layout/_header.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"8a4-18MoeaqHW8WSDGoObH1xcqhYbGs\"",
    "mtime": "2025-09-27T20:41:38.046Z",
    "size": 2212,
    "path": "../public/css/layout/_header.css"
  },
  "/css/layout/_price.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"b2-EF7wnu7O81VPAplmY09qUxFYYrM\"",
    "mtime": "2025-09-27T20:41:38.062Z",
    "size": 178,
    "path": "../public/css/layout/_price.css"
  },
  "/css/layout/_slider.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"51-+6ewflQivvlOpCjbo7dkyXypAFY\"",
    "mtime": "2025-09-27T20:41:38.062Z",
    "size": 81,
    "path": "../public/css/layout/_slider.css"
  },
  "/css/layout/_video.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"219-CyrX6elSQtRom6CYoeZhCAUq8SE\"",
    "mtime": "2025-09-27T20:41:38.062Z",
    "size": 537,
    "path": "../public/css/layout/_video.css"
  },
  "/css/plugins/animate.min.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"683d-B21tBUo1cSS4PiQ5kvA4vuRz8yM\"",
    "mtime": "2025-09-27T20:41:38.062Z",
    "size": 26685,
    "path": "../public/css/plugins/animate.min.css"
  },
  "/css/plugins/animsition.min.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"6b5c-up9cMS6StzeFN5L0Y+jyulNVGYM\"",
    "mtime": "2025-09-27T20:41:38.062Z",
    "size": 27484,
    "path": "../public/css/plugins/animsition.min.css"
  },
  "/css/plugins/bootstrap.min.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"27bd2-3dyXWyoggVItkIvVtwwl4Q+Heh0\"",
    "mtime": "2025-09-27T20:41:38.062Z",
    "size": 162770,
    "path": "../public/css/plugins/bootstrap.min.css"
  },
  "/css/plugins/flaticon.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"5f8-xNnzacuLi7sUX41+zSVsMyq9VR0\"",
    "mtime": "2025-09-27T20:41:38.062Z",
    "size": 1528,
    "path": "../public/css/plugins/flaticon.css"
  },
  "/css/plugins/fontawesome-all.min.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"e7ae-hZOVyxc4Ub1sFKrs24XS1Gy87Lk\"",
    "mtime": "2025-09-27T20:41:38.068Z",
    "size": 59310,
    "path": "../public/css/plugins/fontawesome-all.min.css"
  },
  "/css/plugins/ionicons.min.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"c86e-w6F91Xd6+fxgajjH41LYQqX4qGs\"",
    "mtime": "2025-09-27T20:41:38.068Z",
    "size": 51310,
    "path": "../public/css/plugins/ionicons.min.css"
  },
  "/css/plugins/justifiedGallery.min.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"b7e-H2yzLinC9cyvQmyglKyuNpUBrDE\"",
    "mtime": "2025-09-27T20:41:38.068Z",
    "size": 2942,
    "path": "../public/css/plugins/justifiedGallery.min.css"
  },
  "/css/plugins/magnific-popup.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"1c86-dKQTctgzGVt33Z4Wf4LKOVzEcC0\"",
    "mtime": "2025-09-27T20:41:38.068Z",
    "size": 7302,
    "path": "../public/css/plugins/magnific-popup.css"
  },
  "/css/plugins/pe-icon-7-stroke.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"2895-iY0GgUhQm7uMvONSMor9aVkHD3Q\"",
    "mtime": "2025-09-27T20:41:38.070Z",
    "size": 10389,
    "path": "../public/css/plugins/pe-icon-7-stroke.css"
  },
  "/css/plugins/slick-theme.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"b3e-1LISeFpU609H1nFA9rnCAOiOxfk\"",
    "mtime": "2025-09-27T20:41:38.070Z",
    "size": 2878,
    "path": "../public/css/plugins/slick-theme.css"
  },
  "/css/plugins/slick.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"767-ZObF/5nxTGV1LgMiI0Fg+Og/xsI\"",
    "mtime": "2025-09-27T20:41:38.070Z",
    "size": 1895,
    "path": "../public/css/plugins/slick.css"
  },
  "/css/plugins/swiper.min.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"356e-XA17g5scW6uVedYW7kI3cSJq43M\"",
    "mtime": "2025-09-27T20:41:38.070Z",
    "size": 13678,
    "path": "../public/css/plugins/swiper.min.css"
  },
  "/css/plugins/YouTubePopUp.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"c66-s0kjbNRPb62IfQL3QYPbDb78zbM\"",
    "mtime": "2025-09-27T20:41:38.062Z",
    "size": 3174,
    "path": "../public/css/plugins/YouTubePopUp.css"
  },
  "/css/utility/_variables.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"53-Oi+mr+U7pLYYSTOyW5RloUprT8c\"",
    "mtime": "2025-09-27T20:41:38.072Z",
    "size": 83,
    "path": "../public/css/utility/_variables.css"
  },
  "/imgs/serv-icons/0.png": {
    "type": "image/png",
    "etag": "\"4992-rjG7zC7HYcO32SHilCobi1UCiPc\"",
    "mtime": "2025-09-27T20:41:38.226Z",
    "size": 18834,
    "path": "../public/imgs/serv-icons/0.png"
  },
  "/imgs/serv-icons/01-dark.svg": {
    "type": "image/svg+xml",
    "etag": "\"718-OvDlr31sCLGPDROk7tOUGKu5PT8\"",
    "mtime": "2025-09-27T20:41:38.227Z",
    "size": 1816,
    "path": "../public/imgs/serv-icons/01-dark.svg"
  },
  "/imgs/serv-icons/02-dark.svg": {
    "type": "image/svg+xml",
    "etag": "\"509-zv4j32NoOIn8FKjayfZkmo/eUkY\"",
    "mtime": "2025-09-27T20:41:38.227Z",
    "size": 1289,
    "path": "../public/imgs/serv-icons/02-dark.svg"
  },
  "/imgs/serv-icons/03-dark.svg": {
    "type": "image/svg+xml",
    "etag": "\"a08-BpCXdgo6wX61vBp/DRfk87nfxzE\"",
    "mtime": "2025-09-27T20:41:38.228Z",
    "size": 2568,
    "path": "../public/imgs/serv-icons/03-dark.svg"
  },
  "/imgs/serv-icons/04-dark.svg": {
    "type": "image/svg+xml",
    "etag": "\"4af-s50pL/+gnFJaGqIcjv1i0u2C82A\"",
    "mtime": "2025-09-27T20:41:38.228Z",
    "size": 1199,
    "path": "../public/imgs/serv-icons/04-dark.svg"
  },
  "/imgs/serv-icons/05-dark.svg": {
    "type": "image/svg+xml",
    "etag": "\"a5f-nRBJ+zYCL+T76vCfVew7mP7rDxw\"",
    "mtime": "2025-09-27T20:41:38.228Z",
    "size": 2655,
    "path": "../public/imgs/serv-icons/05-dark.svg"
  },
  "/imgs/serv-icons/1.png": {
    "type": "image/png",
    "etag": "\"527d-hM0YDIG4q9Is+9j/J/uMetti4Lw\"",
    "mtime": "2025-09-27T20:41:38.229Z",
    "size": 21117,
    "path": "../public/imgs/serv-icons/1.png"
  },
  "/imgs/serv-icons/2.png": {
    "type": "image/png",
    "etag": "\"4085-f7p5Mp3Zexl48+CBLyR86W9DhUg\"",
    "mtime": "2025-09-27T20:41:38.229Z",
    "size": 16517,
    "path": "../public/imgs/serv-icons/2.png"
  },
  "/imgs/serv-icons/S1.png": {
    "type": "image/png",
    "etag": "\"1510-HQDlek2JfP9BRKxFOse3bd08de8\"",
    "mtime": "2025-09-27T20:41:38.230Z",
    "size": 5392,
    "path": "../public/imgs/serv-icons/S1.png"
  },
  "/imgs/serv-icons/S2.png": {
    "type": "image/png",
    "etag": "\"200e-m5zibVuGAY2TUs7Zta4HLwYpQ90\"",
    "mtime": "2025-09-27T20:41:38.230Z",
    "size": 8206,
    "path": "../public/imgs/serv-icons/S2.png"
  },
  "/imgs/serv-icons/S3.png": {
    "type": "image/png",
    "etag": "\"11be-zo6L+OvYTd5SB/0+Fg7lOBNdRk8\"",
    "mtime": "2025-09-27T20:41:38.230Z",
    "size": 4542,
    "path": "../public/imgs/serv-icons/S3.png"
  },
  "/imgs/serv-icons/S4.png": {
    "type": "image/png",
    "etag": "\"1a85-yPeza/zlRKy1KSczPGxE3lmRKrg\"",
    "mtime": "2025-09-27T20:41:38.232Z",
    "size": 6789,
    "path": "../public/imgs/serv-icons/S4.png"
  },
  "/imgs/services/Services_1.jpg": {
    "type": "image/jpeg",
    "etag": "\"a5e2-cLYHKBzHBxW9eCuvHOlLPC/Nz3g\"",
    "mtime": "2025-09-27T20:41:38.232Z",
    "size": 42466,
    "path": "../public/imgs/services/Services_1.jpg"
  },
  "/imgs/services/Services_2.jpg": {
    "type": "image/jpeg",
    "etag": "\"13457-9NlVrMmP3w5Cind1nVuc/xtd3gw\"",
    "mtime": "2025-09-27T20:41:38.233Z",
    "size": 78935,
    "path": "../public/imgs/services/Services_2.jpg"
  },
  "/imgs/services/Services_3.jpg": {
    "type": "image/jpeg",
    "etag": "\"8df8-kRmv6dSOTU+gQ6sSEFa0CxxAM04\"",
    "mtime": "2025-09-27T20:41:38.233Z",
    "size": 36344,
    "path": "../public/imgs/services/Services_3.jpg"
  },
  "/imgs/services/Services_4.jpg": {
    "type": "image/jpeg",
    "etag": "\"12a68-NppXUbphsPbWJDlcOFW2C7PVv0s\"",
    "mtime": "2025-09-27T20:41:38.233Z",
    "size": 76392,
    "path": "../public/imgs/services/Services_4.jpg"
  },
  "/imgs/svg-assets/arrow-right-top.svg": {
    "type": "image/svg+xml",
    "etag": "\"10f-oNY5V80gUP89ZLlbwyQfbPQhUVo\"",
    "mtime": "2025-09-27T20:41:38.233Z",
    "size": 271,
    "path": "../public/imgs/svg-assets/arrow-right-top.svg"
  },
  "/imgs/svg-assets/arrow-top-right.svg": {
    "type": "image/svg+xml",
    "etag": "\"319-ht1xSLjA+rAX8Tfj1D7lqQVo7UE\"",
    "mtime": "2025-09-27T20:41:38.233Z",
    "size": 793,
    "path": "../public/imgs/svg-assets/arrow-top-right.svg"
  },
  "/imgs/svg-assets/circle-star.svg": {
    "type": "image/svg+xml",
    "etag": "\"991-n4ITN738mTl1qrgStTk+lC2NCzk\"",
    "mtime": "2025-09-27T20:41:38.233Z",
    "size": 2449,
    "path": "../public/imgs/svg-assets/circle-star.svg"
  },
  "/imgs/svg-assets/claw.svg": {
    "type": "image/svg+xml",
    "etag": "\"7f6-O84zZ4hPRvNmA+EHkvv12JZIFuA\"",
    "mtime": "2025-09-27T20:41:38.233Z",
    "size": 2038,
    "path": "../public/imgs/svg-assets/claw.svg"
  },
  "/imgs/svg-assets/hi.png": {
    "type": "image/png",
    "etag": "\"5160-uWpFQIo+LyTgy0fEJIns2v4K5+0\"",
    "mtime": "2025-09-27T20:41:38.233Z",
    "size": 20832,
    "path": "../public/imgs/svg-assets/hi.png"
  },
  "/imgs/svg-assets/quote.png": {
    "type": "image/png",
    "etag": "\"12e4-he8tLzEo2Bojz75lszsBsz4Wcxo\"",
    "mtime": "2025-09-27T20:41:38.233Z",
    "size": 4836,
    "path": "../public/imgs/svg-assets/quote.png"
  },
  "/_nuxt/builds/latest.json": {
    "type": "application/json",
    "etag": "\"47-TQoONksE/AKELXSH+dyXjUn53gI\"",
    "mtime": "2025-09-28T19:30:28.903Z",
    "size": 71,
    "path": "../public/_nuxt/builds/latest.json"
  },
  "/fonts/mona-sans/MonaSans-Black.ttf": {
    "type": "font/ttf",
    "etag": "\"18b40-dffh4eBp9TlUekWEGImd9mUrHSo\"",
    "mtime": "2025-09-27T20:41:38.092Z",
    "size": 101184,
    "path": "../public/fonts/mona-sans/MonaSans-Black.ttf"
  },
  "/fonts/mona-sans/MonaSans-Black.woff": {
    "type": "font/woff",
    "etag": "\"d6ac-LpnzTdvoLB/10UGeBzShzulIErk\"",
    "mtime": "2025-09-28T18:27:31.117Z",
    "size": 54956,
    "path": "../public/fonts/mona-sans/MonaSans-Black.woff"
  },
  "/fonts/mona-sans/MonaSans-Black.woff2": {
    "type": "font/woff2",
    "etag": "\"a2fc-5P+BrUhfPhFLRFw4Xn+lkdiJOhU\"",
    "mtime": "2025-09-28T18:27:31.121Z",
    "size": 41724,
    "path": "../public/fonts/mona-sans/MonaSans-Black.woff2"
  },
  "/fonts/mona-sans/MonaSans-BlackItalic.ttf": {
    "type": "font/ttf",
    "etag": "\"19178-CjaEtfJpKZ68v5Bw6ZZTci6IV8M\"",
    "mtime": "2025-09-27T20:41:38.092Z",
    "size": 102776,
    "path": "../public/fonts/mona-sans/MonaSans-BlackItalic.ttf"
  },
  "/fonts/mona-sans/MonaSans-BlackItalic.woff": {
    "type": "font/woff",
    "etag": "\"df54-IsNOUzQtiRUdmAkzEuxoyjE/qyY\"",
    "mtime": "2025-09-28T18:27:31.137Z",
    "size": 57172,
    "path": "../public/fonts/mona-sans/MonaSans-BlackItalic.woff"
  },
  "/fonts/mona-sans/MonaSans-BlackItalic.woff2": {
    "type": "font/woff2",
    "etag": "\"a970-2r105XqgA/P/WYvAiKN489U6eYs\"",
    "mtime": "2025-09-28T18:27:31.140Z",
    "size": 43376,
    "path": "../public/fonts/mona-sans/MonaSans-BlackItalic.woff2"
  },
  "/fonts/mona-sans/MonaSans-Bold.ttf": {
    "type": "font/ttf",
    "etag": "\"18bf4-w7mALc9IrJq4ziu/AYeX+QpqBMA\"",
    "mtime": "2025-09-27T20:41:38.092Z",
    "size": 101364,
    "path": "../public/fonts/mona-sans/MonaSans-Bold.ttf"
  },
  "/fonts/mona-sans/MonaSans-Bold.woff": {
    "type": "font/woff",
    "etag": "\"dcb4-a9GkB9rz4HA6K+JSRnXuKHvTo7s\"",
    "mtime": "2025-09-28T18:27:31.147Z",
    "size": 56500,
    "path": "../public/fonts/mona-sans/MonaSans-Bold.woff"
  },
  "/fonts/mona-sans/MonaSans-Bold.woff2": {
    "type": "font/woff2",
    "etag": "\"a734-CqZXeoD38mDTh1RijvsgU1JHdBM\"",
    "mtime": "2025-09-28T18:27:31.153Z",
    "size": 42804,
    "path": "../public/fonts/mona-sans/MonaSans-Bold.woff2"
  },
  "/fonts/mona-sans/MonaSans-BoldItalic.ttf": {
    "type": "font/ttf",
    "etag": "\"19198-mZi9Ke510kRM6DPwEiQf5xkqSMM\"",
    "mtime": "2025-09-27T20:41:38.108Z",
    "size": 102808,
    "path": "../public/fonts/mona-sans/MonaSans-BoldItalic.ttf"
  },
  "/fonts/mona-sans/MonaSans-BoldItalic.woff": {
    "type": "font/woff",
    "etag": "\"e4f0-CclJFmxyRhSPYO93IIkYdJi9PFg\"",
    "mtime": "2025-09-28T18:27:31.159Z",
    "size": 58608,
    "path": "../public/fonts/mona-sans/MonaSans-BoldItalic.woff"
  },
  "/fonts/mona-sans/MonaSans-BoldItalic.woff2": {
    "type": "font/woff2",
    "etag": "\"ad60-JZAxr2aF8hXaSZqqayn6K3iLimI\"",
    "mtime": "2025-09-28T18:27:31.159Z",
    "size": 44384,
    "path": "../public/fonts/mona-sans/MonaSans-BoldItalic.woff2"
  },
  "/fonts/mona-sans/MonaSans-ExtraBold.ttf": {
    "type": "font/ttf",
    "etag": "\"18bd0-mImUXeVDEgR5dRjitH8/mUPgXrs\"",
    "mtime": "2025-09-27T20:41:38.108Z",
    "size": 101328,
    "path": "../public/fonts/mona-sans/MonaSans-ExtraBold.ttf"
  },
  "/fonts/mona-sans/MonaSans-ExtraBold.woff": {
    "type": "font/woff",
    "etag": "\"dc3c-jrfLYzfTKKT3EFa2D+SE7ISALpc\"",
    "mtime": "2025-09-28T18:27:31.168Z",
    "size": 56380,
    "path": "../public/fonts/mona-sans/MonaSans-ExtraBold.woff"
  },
  "/fonts/mona-sans/MonaSans-ExtraBold.woff2": {
    "type": "font/woff2",
    "etag": "\"a70c-bLRzut7Vwx6uDXHdqLvDjE+SZBQ\"",
    "mtime": "2025-09-28T18:27:31.168Z",
    "size": 42764,
    "path": "../public/fonts/mona-sans/MonaSans-ExtraBold.woff2"
  },
  "/fonts/mona-sans/MonaSans-ExtraBoldItalic.ttf": {
    "type": "font/ttf",
    "etag": "\"191e8-qGOkLwprjUAnoiW6pUWGdy75S7I\"",
    "mtime": "2025-09-27T20:41:38.108Z",
    "size": 102888,
    "path": "../public/fonts/mona-sans/MonaSans-ExtraBoldItalic.ttf"
  },
  "/fonts/mona-sans/MonaSans-ExtraBoldItalic.woff": {
    "type": "font/woff",
    "etag": "\"e434-mXSCsCHe2KJlT3VXYFJ1dT4/mXs\"",
    "mtime": "2025-09-28T18:27:31.168Z",
    "size": 58420,
    "path": "../public/fonts/mona-sans/MonaSans-ExtraBoldItalic.woff"
  },
  "/fonts/mona-sans/MonaSans-ExtraBoldItalic.woff2": {
    "type": "font/woff2",
    "etag": "\"ad58-F7a2zzasLWMt2CFyEwOVW8sM+sM\"",
    "mtime": "2025-09-28T18:27:31.190Z",
    "size": 44376,
    "path": "../public/fonts/mona-sans/MonaSans-ExtraBoldItalic.woff2"
  },
  "/fonts/mona-sans/MonaSans-ExtraLight.ttf": {
    "type": "font/ttf",
    "etag": "\"18c24-mZVKrRI40qMMkB0DfXN0AJfDIJY\"",
    "mtime": "2025-09-27T20:41:38.108Z",
    "size": 101412,
    "path": "../public/fonts/mona-sans/MonaSans-ExtraLight.ttf"
  },
  "/fonts/mona-sans/MonaSans-ExtraLight.woff": {
    "type": "font/woff",
    "etag": "\"d784-wHvi9JQNnxNfeJcynhID00rk4i8\"",
    "mtime": "2025-09-28T18:27:31.195Z",
    "size": 55172,
    "path": "../public/fonts/mona-sans/MonaSans-ExtraLight.woff"
  },
  "/fonts/mona-sans/MonaSans-ExtraLight.woff2": {
    "type": "font/woff2",
    "etag": "\"a2a0-NwEFX6n5tuzp47zJLsynwJ3r41A\"",
    "mtime": "2025-09-28T18:27:31.199Z",
    "size": 41632,
    "path": "../public/fonts/mona-sans/MonaSans-ExtraLight.woff2"
  },
  "/fonts/mona-sans/MonaSans-ExtraLightItalic.ttf": {
    "type": "font/ttf",
    "etag": "\"191d8-4e/2S+L0Z08j9YqcfYm5FTLZlb0\"",
    "mtime": "2025-09-27T20:41:38.108Z",
    "size": 102872,
    "path": "../public/fonts/mona-sans/MonaSans-ExtraLightItalic.ttf"
  },
  "/fonts/mona-sans/MonaSans-ExtraLightItalic.woff": {
    "type": "font/woff",
    "etag": "\"de3c-OaodXFb6mpL9aDNt/6Q4WgyNJfs\"",
    "mtime": "2025-09-28T18:27:31.205Z",
    "size": 56892,
    "path": "../public/fonts/mona-sans/MonaSans-ExtraLightItalic.woff"
  },
  "/fonts/mona-sans/MonaSans-ExtraLightItalic.woff2": {
    "type": "font/woff2",
    "etag": "\"a8a8-gW8g/780inF0dJfH+eZ7yqDUN6U\"",
    "mtime": "2025-09-28T18:27:31.205Z",
    "size": 43176,
    "path": "../public/fonts/mona-sans/MonaSans-ExtraLightItalic.woff2"
  },
  "/fonts/mona-sans/MonaSans-Italic.ttf": {
    "type": "font/ttf",
    "etag": "\"191c4-XUAgE1SLH0P+5WNJHDaeKXKl5zQ\"",
    "mtime": "2025-09-27T20:41:38.108Z",
    "size": 102852,
    "path": "../public/fonts/mona-sans/MonaSans-Italic.ttf"
  },
  "/fonts/mona-sans/MonaSans-Italic.woff": {
    "type": "font/woff",
    "etag": "\"e500-seNKz/GEMdVUHI9mTmxJkV7HOSw\"",
    "mtime": "2025-09-28T18:27:31.215Z",
    "size": 58624,
    "path": "../public/fonts/mona-sans/MonaSans-Italic.woff"
  },
  "/fonts/mona-sans/MonaSans-Italic.woff2": {
    "type": "font/woff2",
    "etag": "\"ae08-94orsIkJLFGdXlMI+34VQVCdeEY\"",
    "mtime": "2025-09-28T18:27:31.224Z",
    "size": 44552,
    "path": "../public/fonts/mona-sans/MonaSans-Italic.woff2"
  },
  "/fonts/mona-sans/MonaSans-Light.ttf": {
    "type": "font/ttf",
    "etag": "\"18c4c-O+5bqPlTQk5voROWC5BIc7MfTeM\"",
    "mtime": "2025-09-27T20:41:38.108Z",
    "size": 101452,
    "path": "../public/fonts/mona-sans/MonaSans-Light.ttf"
  },
  "/fonts/mona-sans/MonaSans-Light.woff": {
    "type": "font/woff",
    "etag": "\"dc90-Grm8b6DvHgM1p6Lp8EbUZ93i2oY\"",
    "mtime": "2025-09-28T18:27:31.231Z",
    "size": 56464,
    "path": "../public/fonts/mona-sans/MonaSans-Light.woff"
  },
  "/fonts/mona-sans/MonaSans-Light.woff2": {
    "type": "font/woff2",
    "etag": "\"a7c4-9nboF53lrlzF/dGc9C+5/s2LkI0\"",
    "mtime": "2025-09-28T18:27:31.231Z",
    "size": 42948,
    "path": "../public/fonts/mona-sans/MonaSans-Light.woff2"
  },
  "/fonts/mona-sans/MonaSans-LightItalic.ttf": {
    "type": "font/ttf",
    "etag": "\"191e4-mytyEpanZEHKwp+qQZp9Ux3rBlc\"",
    "mtime": "2025-09-27T20:41:38.108Z",
    "size": 102884,
    "path": "../public/fonts/mona-sans/MonaSans-LightItalic.ttf"
  },
  "/fonts/mona-sans/MonaSans-LightItalic.woff": {
    "type": "font/woff",
    "etag": "\"e424-i/mfDDvsa/KEcfvNndjjiIZNNY0\"",
    "mtime": "2025-09-28T18:27:31.242Z",
    "size": 58404,
    "path": "../public/fonts/mona-sans/MonaSans-LightItalic.woff"
  },
  "/fonts/mona-sans/MonaSans-LightItalic.woff2": {
    "type": "font/woff2",
    "etag": "\"acd4-/MUow7KtQ9SSK7woO5uLvhSh3LM\"",
    "mtime": "2025-09-28T18:27:31.247Z",
    "size": 44244,
    "path": "../public/fonts/mona-sans/MonaSans-LightItalic.woff2"
  },
  "/fonts/mona-sans/MonaSans-Medium.ttf": {
    "type": "font/ttf",
    "etag": "\"18c60-zNIJyh5CN5JfPkprDPNzkZWK3VQ\"",
    "mtime": "2025-09-27T20:41:38.108Z",
    "size": 101472,
    "path": "../public/fonts/mona-sans/MonaSans-Medium.ttf"
  },
  "/fonts/mona-sans/MonaSans-Medium.woff": {
    "type": "font/woff",
    "etag": "\"dde4-AOT5pnET2yEoLQhfi4CQ69vbZhY\"",
    "mtime": "2025-09-28T18:27:31.247Z",
    "size": 56804,
    "path": "../public/fonts/mona-sans/MonaSans-Medium.woff"
  },
  "/fonts/mona-sans/MonaSans-Medium.woff2": {
    "type": "font/woff2",
    "etag": "\"a804-kC+maqLnBwHTpzeKsuUFD4hDOSo\"",
    "mtime": "2025-09-28T18:27:31.247Z",
    "size": 43012,
    "path": "../public/fonts/mona-sans/MonaSans-Medium.woff2"
  },
  "/fonts/mona-sans/MonaSans-MediumItalic.ttf": {
    "type": "font/ttf",
    "etag": "\"19210-80LGcecOEYpOejEC5XR1HoBhupI\"",
    "mtime": "2025-09-27T20:41:38.108Z",
    "size": 102928,
    "path": "../public/fonts/mona-sans/MonaSans-MediumItalic.ttf"
  },
  "/fonts/mona-sans/MonaSans-MediumItalic.woff": {
    "type": "font/woff",
    "etag": "\"e538-w4kAKAYjgLxkzYnmnHUsRXjO1kY\"",
    "mtime": "2025-09-28T18:27:31.263Z",
    "size": 58680,
    "path": "../public/fonts/mona-sans/MonaSans-MediumItalic.woff"
  },
  "/fonts/mona-sans/MonaSans-MediumItalic.woff2": {
    "type": "font/woff2",
    "etag": "\"adb4-uZQBdcmjDDhxR4XIpOvOzvY0KsM\"",
    "mtime": "2025-09-28T18:27:31.263Z",
    "size": 44468,
    "path": "../public/fonts/mona-sans/MonaSans-MediumItalic.woff2"
  },
  "/fonts/mona-sans/MonaSans-Regular.ttf": {
    "type": "font/ttf",
    "etag": "\"18c18-X0+vCi+afetG9GvzOB+P8T90O2w\"",
    "mtime": "2025-09-27T20:41:38.108Z",
    "size": 101400,
    "path": "../public/fonts/mona-sans/MonaSans-Regular.ttf"
  },
  "/fonts/mona-sans/MonaSans-Regular.woff": {
    "type": "font/woff",
    "etag": "\"dd4c-+MfEoqLETfr0e7vvWaWA/TJ7Zk8\"",
    "mtime": "2025-09-28T18:27:31.263Z",
    "size": 56652,
    "path": "../public/fonts/mona-sans/MonaSans-Regular.woff"
  },
  "/fonts/mona-sans/MonaSans-Regular.woff2": {
    "type": "font/woff2",
    "etag": "\"a6b0-4bgklAts+OPJWeTv2/QLGRsCcOU\"",
    "mtime": "2025-09-28T18:27:31.279Z",
    "size": 42672,
    "path": "../public/fonts/mona-sans/MonaSans-Regular.woff2"
  },
  "/fonts/mona-sans/MonaSans-SemiBold.ttf": {
    "type": "font/ttf",
    "etag": "\"18c20-laW+YdIDFUgeqPpEKaMKi7xIses\"",
    "mtime": "2025-09-27T20:41:38.124Z",
    "size": 101408,
    "path": "../public/fonts/mona-sans/MonaSans-SemiBold.ttf"
  },
  "/fonts/mona-sans/MonaSans-SemiBold.woff": {
    "type": "font/woff",
    "etag": "\"dd68-oN7/2Ev94lYUFFgCic0k+rVfyRY\"",
    "mtime": "2025-09-28T18:27:31.279Z",
    "size": 56680,
    "path": "../public/fonts/mona-sans/MonaSans-SemiBold.woff"
  },
  "/fonts/mona-sans/MonaSans-SemiBold.woff2": {
    "type": "font/woff2",
    "etag": "\"a764-6KotgTDr/eN0GXxR/YKi3oQSxUQ\"",
    "mtime": "2025-09-28T18:27:31.295Z",
    "size": 42852,
    "path": "../public/fonts/mona-sans/MonaSans-SemiBold.woff2"
  },
  "/fonts/mona-sans/MonaSans-SemiBoldItalic.ttf": {
    "type": "font/ttf",
    "etag": "\"19228-+IvDHrH7FwZUrqk3XQXrmWy38IU\"",
    "mtime": "2025-09-27T20:41:38.124Z",
    "size": 102952,
    "path": "../public/fonts/mona-sans/MonaSans-SemiBoldItalic.ttf"
  },
  "/fonts/mona-sans/MonaSans-SemiBoldItalic.woff": {
    "type": "font/woff",
    "etag": "\"e548-stTNInPQHjWj16a8jHDHyrbx0x0\"",
    "mtime": "2025-09-28T18:27:31.300Z",
    "size": 58696,
    "path": "../public/fonts/mona-sans/MonaSans-SemiBoldItalic.woff"
  },
  "/fonts/mona-sans/MonaSans-SemiBoldItalic.woff2": {
    "type": "font/woff2",
    "etag": "\"adcc-+FF9zekV7jkDiAJ7BwUhmv8NwKo\"",
    "mtime": "2025-09-28T18:27:31.306Z",
    "size": 44492,
    "path": "../public/fonts/mona-sans/MonaSans-SemiBoldItalic.woff2"
  },
  "/fonts/mona-sans/MonaSansCondensed-Black.woff": {
    "type": "font/woff",
    "etag": "\"d3f4-cWECD4ldRLa2cuKoUl50XD1cIYU\"",
    "mtime": "2025-09-28T18:32:05.525Z",
    "size": 54260,
    "path": "../public/fonts/mona-sans/MonaSansCondensed-Black.woff"
  },
  "/fonts/mona-sans/MonaSansCondensed-Black.woff2": {
    "type": "font/woff2",
    "etag": "\"a0a0-3BlV6vsGND6mMSrzOHj4uXencC4\"",
    "mtime": "2025-09-28T18:32:05.537Z",
    "size": 41120,
    "path": "../public/fonts/mona-sans/MonaSansCondensed-Black.woff2"
  },
  "/fonts/mona-sans/MonaSansCondensed-BlackItalic.woff": {
    "type": "font/woff",
    "etag": "\"ddf0-lI//DRKrIhe+ywpX5AdcYVFRDJ0\"",
    "mtime": "2025-09-28T18:32:05.543Z",
    "size": 56816,
    "path": "../public/fonts/mona-sans/MonaSansCondensed-BlackItalic.woff"
  },
  "/fonts/mona-sans/MonaSansCondensed-BlackItalic.woff2": {
    "type": "font/woff2",
    "etag": "\"a728-3wwmjyRsvNVprTnL3UsCcnxhkK4\"",
    "mtime": "2025-09-28T18:32:05.550Z",
    "size": 42792,
    "path": "../public/fonts/mona-sans/MonaSansCondensed-BlackItalic.woff2"
  },
  "/fonts/mona-sans/MonaSansCondensed-Bold.woff": {
    "type": "font/woff",
    "etag": "\"d9fc-tZuyqAkpcSQ3Z8I7UFeRuQykgLE\"",
    "mtime": "2025-09-28T18:32:05.559Z",
    "size": 55804,
    "path": "../public/fonts/mona-sans/MonaSansCondensed-Bold.woff"
  },
  "/fonts/mona-sans/MonaSansCondensed-Bold.woff2": {
    "type": "font/woff2",
    "etag": "\"a510-erB9Ud3k35/nYvv2TnB5vW54Gls\"",
    "mtime": "2025-09-28T18:32:05.565Z",
    "size": 42256,
    "path": "../public/fonts/mona-sans/MonaSansCondensed-Bold.woff2"
  },
  "/fonts/mona-sans/MonaSansCondensed-BoldItalic.woff": {
    "type": "font/woff",
    "etag": "\"e404-+VuQtuUJ5kYNg+IcSKFvy7IDGvY\"",
    "mtime": "2025-09-28T18:32:05.571Z",
    "size": 58372,
    "path": "../public/fonts/mona-sans/MonaSansCondensed-BoldItalic.woff"
  },
  "/fonts/mona-sans/MonaSansCondensed-BoldItalic.woff2": {
    "type": "font/woff2",
    "etag": "\"abe0-iE/bhr2ReQSUkQSyRdaIRLuaGKk\"",
    "mtime": "2025-09-28T18:32:05.577Z",
    "size": 44000,
    "path": "../public/fonts/mona-sans/MonaSansCondensed-BoldItalic.woff2"
  },
  "/fonts/mona-sans/MonaSansCondensed-ExtraBold.woff": {
    "type": "font/woff",
    "etag": "\"d9e8-WYTZgCARWSoxvzftlSkusQFqzdg\"",
    "mtime": "2025-09-28T18:32:05.583Z",
    "size": 55784,
    "path": "../public/fonts/mona-sans/MonaSansCondensed-ExtraBold.woff"
  },
  "/fonts/mona-sans/MonaSansCondensed-ExtraBold.woff2": {
    "type": "font/woff2",
    "etag": "\"a470-IRpIVN84tURqkXsGQrkJKrQxUrE\"",
    "mtime": "2025-09-28T18:32:05.588Z",
    "size": 42096,
    "path": "../public/fonts/mona-sans/MonaSansCondensed-ExtraBold.woff2"
  },
  "/fonts/mona-sans/MonaSansCondensed-ExtraBoldItalic.woff": {
    "type": "font/woff",
    "etag": "\"e3e0-Fulm6P9sR6Pp+kStiV6tONPK9a4\"",
    "mtime": "2025-09-28T18:32:05.596Z",
    "size": 58336,
    "path": "../public/fonts/mona-sans/MonaSansCondensed-ExtraBoldItalic.woff"
  },
  "/fonts/mona-sans/MonaSansCondensed-ExtraBoldItalic.woff2": {
    "type": "font/woff2",
    "etag": "\"abf8-iLXU133qR3w6t1hKSwFt4remFmg\"",
    "mtime": "2025-09-28T18:32:05.602Z",
    "size": 44024,
    "path": "../public/fonts/mona-sans/MonaSansCondensed-ExtraBoldItalic.woff2"
  },
  "/fonts/mona-sans/MonaSansCondensed-ExtraLight.woff": {
    "type": "font/woff",
    "etag": "\"d13c-OJuIp37c+pn+I0D1cyEvTwYTuzk\"",
    "mtime": "2025-09-28T18:32:05.608Z",
    "size": 53564,
    "path": "../public/fonts/mona-sans/MonaSansCondensed-ExtraLight.woff"
  },
  "/fonts/mona-sans/MonaSansCondensed-ExtraLight.woff2": {
    "type": "font/woff2",
    "etag": "\"9e64-utqM3ZJYtl8H0iMdm9Eg0XjJqPw\"",
    "mtime": "2025-09-28T18:32:05.613Z",
    "size": 40548,
    "path": "../public/fonts/mona-sans/MonaSansCondensed-ExtraLight.woff2"
  },
  "/fonts/mona-sans/MonaSansCondensed-ExtraLightItalic.woff": {
    "type": "font/woff",
    "etag": "\"db74-/sBCw5zOtgPpLv6YqseSILAEpB0\"",
    "mtime": "2025-09-28T18:32:05.618Z",
    "size": 56180,
    "path": "../public/fonts/mona-sans/MonaSansCondensed-ExtraLightItalic.woff"
  },
  "/fonts/mona-sans/MonaSansCondensed-ExtraLightItalic.woff2": {
    "type": "font/woff2",
    "etag": "\"a4dc-YPKDCk08K58Y+NKH8a2T/uOMH3o\"",
    "mtime": "2025-09-28T18:32:05.625Z",
    "size": 42204,
    "path": "../public/fonts/mona-sans/MonaSansCondensed-ExtraLightItalic.woff2"
  },
  "/fonts/mona-sans/MonaSansCondensed-Italic.woff": {
    "type": "font/woff",
    "etag": "\"e370-mSeRx7G7qtkAbmpVHKyqAes0HF0\"",
    "mtime": "2025-09-28T18:32:05.631Z",
    "size": 58224,
    "path": "../public/fonts/mona-sans/MonaSansCondensed-Italic.woff"
  },
  "/fonts/mona-sans/MonaSansCondensed-Italic.woff2": {
    "type": "font/woff2",
    "etag": "\"ab70-3wbHF2gpTLxlZik6dtZDuxMipPQ\"",
    "mtime": "2025-09-28T18:32:05.638Z",
    "size": 43888,
    "path": "../public/fonts/mona-sans/MonaSansCondensed-Italic.woff2"
  },
  "/fonts/mona-sans/MonaSansCondensed-Light.woff": {
    "type": "font/woff",
    "etag": "\"d868-VgAQMLdXn4+Kv7LWjMaudrqzRNY\"",
    "mtime": "2025-09-28T18:32:05.644Z",
    "size": 55400,
    "path": "../public/fonts/mona-sans/MonaSansCondensed-Light.woff"
  },
  "/fonts/mona-sans/MonaSansCondensed-Light.woff2": {
    "type": "font/woff2",
    "etag": "\"a380-NWRlriaTKAozteoNbOOnuQOOl/0\"",
    "mtime": "2025-09-28T18:32:05.649Z",
    "size": 41856,
    "path": "../public/fonts/mona-sans/MonaSansCondensed-Light.woff2"
  },
  "/fonts/mona-sans/MonaSansCondensed-LightItalic.woff": {
    "type": "font/woff",
    "etag": "\"e25c-obTALIkyYMsuQGX4Q/iI77tBOj0\"",
    "mtime": "2025-09-28T18:32:05.655Z",
    "size": 57948,
    "path": "../public/fonts/mona-sans/MonaSansCondensed-LightItalic.woff"
  },
  "/fonts/mona-sans/MonaSansCondensed-LightItalic.woff2": {
    "type": "font/woff2",
    "etag": "\"aa98-+1jxh70B2uXr8PIK18K3wppt7t8\"",
    "mtime": "2025-09-28T18:32:05.661Z",
    "size": 43672,
    "path": "../public/fonts/mona-sans/MonaSansCondensed-LightItalic.woff2"
  },
  "/fonts/mona-sans/MonaSansCondensed-Medium.woff": {
    "type": "font/woff",
    "etag": "\"da50-UvoAp1GnxrGITTC8/VskqYHW7OU\"",
    "mtime": "2025-09-28T18:32:05.667Z",
    "size": 55888,
    "path": "../public/fonts/mona-sans/MonaSansCondensed-Medium.woff"
  },
  "/fonts/mona-sans/MonaSansCondensed-Medium.woff2": {
    "type": "font/woff2",
    "etag": "\"a598-shy3A9s6OrJJTk4pBLAK7hV1STk\"",
    "mtime": "2025-09-28T18:32:05.672Z",
    "size": 42392,
    "path": "../public/fonts/mona-sans/MonaSansCondensed-Medium.woff2"
  },
  "/fonts/mona-sans/MonaSansCondensed-MediumItalic.woff": {
    "type": "font/woff",
    "etag": "\"e4bc-zykjDYO5XW9F0XgZ/8ta8VPyNVs\"",
    "mtime": "2025-09-28T18:32:05.678Z",
    "size": 58556,
    "path": "../public/fonts/mona-sans/MonaSansCondensed-MediumItalic.woff"
  },
  "/fonts/mona-sans/MonaSansCondensed-MediumItalic.woff2": {
    "type": "font/woff2",
    "etag": "\"ac90-2kegZIMgap6XsCtjrkiU/zcAquI\"",
    "mtime": "2025-09-28T18:32:05.684Z",
    "size": 44176,
    "path": "../public/fonts/mona-sans/MonaSansCondensed-MediumItalic.woff2"
  },
  "/fonts/mona-sans/MonaSansCondensed-Regular.woff": {
    "type": "font/woff",
    "etag": "\"d978-xvZKFfUvEdYwDEDrk7vntR0oeh8\"",
    "mtime": "2025-09-28T18:32:05.690Z",
    "size": 55672,
    "path": "../public/fonts/mona-sans/MonaSansCondensed-Regular.woff"
  },
  "/fonts/mona-sans/MonaSansCondensed-Regular.woff2": {
    "type": "font/woff2",
    "etag": "\"a404-yT8PYf1N5zianiVqidRHh/1Tbjk\"",
    "mtime": "2025-09-28T18:32:05.695Z",
    "size": 41988,
    "path": "../public/fonts/mona-sans/MonaSansCondensed-Regular.woff2"
  },
  "/fonts/mona-sans/MonaSansCondensed-SemiBold.woff": {
    "type": "font/woff",
    "etag": "\"da68-0pIy5iXZt4rawdGk7C8ew4wKfjo\"",
    "mtime": "2025-09-28T18:32:05.701Z",
    "size": 55912,
    "path": "../public/fonts/mona-sans/MonaSansCondensed-SemiBold.woff"
  },
  "/fonts/mona-sans/MonaSansCondensed-SemiBold.woff2": {
    "type": "font/woff2",
    "etag": "\"a560-tglvQrQE4Gi4ibSuAAoxGcayRZ8\"",
    "mtime": "2025-09-28T18:32:05.707Z",
    "size": 42336,
    "path": "../public/fonts/mona-sans/MonaSansCondensed-SemiBold.woff2"
  },
  "/fonts/mona-sans/MonaSansCondensed-SemiBoldItalic.woff": {
    "type": "font/woff",
    "etag": "\"e558-1aAE4HgJYLUm0xgUIE1OcIWpDrU\"",
    "mtime": "2025-09-28T18:32:05.712Z",
    "size": 58712,
    "path": "../public/fonts/mona-sans/MonaSansCondensed-SemiBoldItalic.woff"
  },
  "/fonts/mona-sans/MonaSansCondensed-SemiBoldItalic.woff2": {
    "type": "font/woff2",
    "etag": "\"ad98-c4+PB6RfdJhs7tfD4ND+RMQ+AMU\"",
    "mtime": "2025-09-28T18:32:05.718Z",
    "size": 44440,
    "path": "../public/fonts/mona-sans/MonaSansCondensed-SemiBoldItalic.woff2"
  },
  "/fonts/mona-sans/MonaSansExpanded-Black.woff": {
    "type": "font/woff",
    "etag": "\"dab0-0K/MGSKpMHqvEoNpBIWQC+nlX5c\"",
    "mtime": "2025-09-28T18:31:23.198Z",
    "size": 55984,
    "path": "../public/fonts/mona-sans/MonaSansExpanded-Black.woff"
  },
  "/fonts/mona-sans/MonaSansExpanded-Black.woff2": {
    "type": "font/woff2",
    "etag": "\"a618-KWjzExUjDv8cv87/Vqs95QBCyuU\"",
    "mtime": "2025-09-28T18:31:23.205Z",
    "size": 42520,
    "path": "../public/fonts/mona-sans/MonaSansExpanded-Black.woff2"
  },
  "/fonts/mona-sans/MonaSansExpanded-BlackItalic.woff": {
    "type": "font/woff",
    "etag": "\"e258-sn2nNn9ZDJbg/+yXPNBFR+InAEQ\"",
    "mtime": "2025-09-28T18:31:23.210Z",
    "size": 57944,
    "path": "../public/fonts/mona-sans/MonaSansExpanded-BlackItalic.woff"
  },
  "/fonts/mona-sans/MonaSansExpanded-BlackItalic.woff2": {
    "type": "font/woff2",
    "etag": "\"aaf4-2+/Wf1vgbT46G/aeUWgsps5RUq0\"",
    "mtime": "2025-09-28T18:31:23.214Z",
    "size": 43764,
    "path": "../public/fonts/mona-sans/MonaSansExpanded-BlackItalic.woff2"
  },
  "/fonts/mona-sans/MonaSansExpanded-Bold.woff": {
    "type": "font/woff",
    "etag": "\"debc-sFdx4Yi6VYUQbz4sgtKCHPltnO4\"",
    "mtime": "2025-09-28T18:31:23.218Z",
    "size": 57020,
    "path": "../public/fonts/mona-sans/MonaSansExpanded-Bold.woff"
  },
  "/fonts/mona-sans/MonaSansExpanded-Bold.woff2": {
    "type": "font/woff2",
    "etag": "\"aa10-6OdvCdbwn1Y51+n6hYRj6LnPp7o\"",
    "mtime": "2025-09-28T18:31:23.218Z",
    "size": 43536,
    "path": "../public/fonts/mona-sans/MonaSansExpanded-Bold.woff2"
  },
  "/fonts/mona-sans/MonaSansExpanded-BoldItalic.woff": {
    "type": "font/woff",
    "etag": "\"e704-7kxcXFjyqaS6us97sDIS2I5tZAI\"",
    "mtime": "2025-09-28T18:31:23.233Z",
    "size": 59140,
    "path": "../public/fonts/mona-sans/MonaSansExpanded-BoldItalic.woff"
  },
  "/fonts/mona-sans/MonaSansExpanded-BoldItalic.woff2": {
    "type": "font/woff2",
    "etag": "\"afc0-81BeobfOiiHR51O0r0KiiTKQCuU\"",
    "mtime": "2025-09-28T18:31:23.239Z",
    "size": 44992,
    "path": "../public/fonts/mona-sans/MonaSansExpanded-BoldItalic.woff2"
  },
  "/fonts/mona-sans/MonaSansExpanded-ExtraBold.woff": {
    "type": "font/woff",
    "etag": "\"de9c-DQuMEREzl0UjOdUN3GFpIRCBn2w\"",
    "mtime": "2025-09-28T18:31:23.245Z",
    "size": 56988,
    "path": "../public/fonts/mona-sans/MonaSansExpanded-ExtraBold.woff"
  },
  "/fonts/mona-sans/MonaSansExpanded-ExtraBold.woff2": {
    "type": "font/woff2",
    "etag": "\"a8e4-AQbke9Hl5WyMIsEJPEquj4XzGVo\"",
    "mtime": "2025-09-28T18:31:23.250Z",
    "size": 43236,
    "path": "../public/fonts/mona-sans/MonaSansExpanded-ExtraBold.woff2"
  },
  "/fonts/mona-sans/MonaSansExpanded-ExtraBoldItalic.woff": {
    "type": "font/woff",
    "etag": "\"e6f0-jQnLY8zLSQJNUgdJtr7eXa4j5Ec\"",
    "mtime": "2025-09-28T18:31:23.061Z",
    "size": 59120,
    "path": "../public/fonts/mona-sans/MonaSansExpanded-ExtraBoldItalic.woff"
  },
  "/fonts/mona-sans/MonaSansExpanded-ExtraBoldItalic.woff2": {
    "type": "font/woff2",
    "etag": "\"af3c-bS5G8mIRYYXUyD9t2geKQ+OTHew\"",
    "mtime": "2025-09-28T18:31:23.073Z",
    "size": 44860,
    "path": "../public/fonts/mona-sans/MonaSansExpanded-ExtraBoldItalic.woff2"
  },
  "/fonts/mona-sans/MonaSansExpanded-ExtraLight.woff": {
    "type": "font/woff",
    "etag": "\"d8bc-dMUuTjneFx61/2WaH0joQqzKKa8\"",
    "mtime": "2025-09-28T18:31:23.079Z",
    "size": 55484,
    "path": "../public/fonts/mona-sans/MonaSansExpanded-ExtraLight.woff"
  },
  "/fonts/mona-sans/MonaSansExpanded-ExtraLight.woff2": {
    "type": "font/woff2",
    "etag": "\"a5a8-dHmnYEY0vOpWeTOs/apVU41Sacs\"",
    "mtime": "2025-09-28T18:31:23.085Z",
    "size": 42408,
    "path": "../public/fonts/mona-sans/MonaSansExpanded-ExtraLight.woff2"
  },
  "/fonts/mona-sans/MonaSansExpanded-ExtraLightItalic.woff": {
    "type": "font/woff",
    "etag": "\"e050-m0Wu3+CmNnqwg1GOz+3Awe3EsAc\"",
    "mtime": "2025-09-28T18:31:23.090Z",
    "size": 57424,
    "path": "../public/fonts/mona-sans/MonaSansExpanded-ExtraLightItalic.woff"
  },
  "/fonts/mona-sans/MonaSansExpanded-ExtraLightItalic.woff2": {
    "type": "font/woff2",
    "etag": "\"aa8c-ZCzscQbNljqUyVt80ik+B5irczk\"",
    "mtime": "2025-09-28T18:31:23.096Z",
    "size": 43660,
    "path": "../public/fonts/mona-sans/MonaSansExpanded-ExtraLightItalic.woff2"
  },
  "/fonts/mona-sans/MonaSansExpanded-Italic.woff": {
    "type": "font/woff",
    "etag": "\"e750-i8gatA1AUrhABZHwJRyDXVZKq/M\"",
    "mtime": "2025-09-28T18:31:23.102Z",
    "size": 59216,
    "path": "../public/fonts/mona-sans/MonaSansExpanded-Italic.woff"
  },
  "/fonts/mona-sans/MonaSansExpanded-Italic.woff2": {
    "type": "font/woff2",
    "etag": "\"b0c4-/BxfCP7ltj2eGqv08BM7OPn1axc\"",
    "mtime": "2025-09-28T18:31:23.108Z",
    "size": 45252,
    "path": "../public/fonts/mona-sans/MonaSansExpanded-Italic.woff2"
  },
  "/fonts/mona-sans/MonaSansExpanded-Light.woff": {
    "type": "font/woff",
    "etag": "\"de54-YRZQuDLTs+hSqdM1SJB7qFS7ZhE\"",
    "mtime": "2025-09-28T18:31:23.114Z",
    "size": 56916,
    "path": "../public/fonts/mona-sans/MonaSansExpanded-Light.woff"
  },
  "/fonts/mona-sans/MonaSansExpanded-Light.woff2": {
    "type": "font/woff2",
    "etag": "\"a97c-nbiPa++gPhvu4S03+I7sGmRHSAM\"",
    "mtime": "2025-09-28T18:31:23.119Z",
    "size": 43388,
    "path": "../public/fonts/mona-sans/MonaSansExpanded-Light.woff2"
  },
  "/fonts/mona-sans/MonaSansExpanded-LightItalic.woff": {
    "type": "font/woff",
    "etag": "\"e65c-0wSYRIk1JedCGROAnjHd2n5Ub2E\"",
    "mtime": "2025-09-28T18:31:23.127Z",
    "size": 58972,
    "path": "../public/fonts/mona-sans/MonaSansExpanded-LightItalic.woff"
  },
  "/fonts/mona-sans/MonaSansExpanded-LightItalic.woff2": {
    "type": "font/woff2",
    "etag": "\"ae40-Co+Y2CQoGI1CVNZj5xg8indOmeU\"",
    "mtime": "2025-09-28T18:31:23.132Z",
    "size": 44608,
    "path": "../public/fonts/mona-sans/MonaSansExpanded-LightItalic.woff2"
  },
  "/fonts/mona-sans/MonaSansExpanded-Medium.woff": {
    "type": "font/woff",
    "etag": "\"df9c-QfK/0hGNXQxtAvy/N1Td3p83lOA\"",
    "mtime": "2025-09-28T18:31:23.138Z",
    "size": 57244,
    "path": "../public/fonts/mona-sans/MonaSansExpanded-Medium.woff"
  },
  "/fonts/mona-sans/MonaSansExpanded-Medium.woff2": {
    "type": "font/woff2",
    "etag": "\"aa84-dOJ5hcSIGAVtBKs27114Fq9Apxg\"",
    "mtime": "2025-09-28T18:31:23.145Z",
    "size": 43652,
    "path": "../public/fonts/mona-sans/MonaSansExpanded-Medium.woff2"
  },
  "/fonts/mona-sans/MonaSansExpanded-MediumItalic.woff": {
    "type": "font/woff",
    "etag": "\"e79c-c+p9ho6dfFA+VL7wb3riU+ERSws\"",
    "mtime": "2025-09-28T18:31:23.152Z",
    "size": 59292,
    "path": "../public/fonts/mona-sans/MonaSansExpanded-MediumItalic.woff"
  },
  "/fonts/mona-sans/MonaSansExpanded-MediumItalic.woff2": {
    "type": "font/woff2",
    "etag": "\"afa8-urhr+s5+aqJwAF8AyZ6aWfnVYlg\"",
    "mtime": "2025-09-28T18:31:23.158Z",
    "size": 44968,
    "path": "../public/fonts/mona-sans/MonaSansExpanded-MediumItalic.woff2"
  },
  "/fonts/mona-sans/MonaSansExpanded-Regular.woff": {
    "type": "font/woff",
    "etag": "\"df90-70ZBz8cuBTypZu1jKSLxLEHBmZA\"",
    "mtime": "2025-09-28T18:31:23.164Z",
    "size": 57232,
    "path": "../public/fonts/mona-sans/MonaSansExpanded-Regular.woff"
  },
  "/fonts/mona-sans/MonaSansExpanded-Regular.woff2": {
    "type": "font/woff2",
    "etag": "\"aa18-/coecAEyYXxUEplWp2ax8FTSCHA\"",
    "mtime": "2025-09-28T18:31:23.170Z",
    "size": 43544,
    "path": "../public/fonts/mona-sans/MonaSansExpanded-Regular.woff2"
  },
  "/fonts/mona-sans/MonaSansExpanded-SemiBold.woff": {
    "type": "font/woff",
    "etag": "\"dfa0-ysvvybQ16JTJpKCmSzU9C3EFrJs\"",
    "mtime": "2025-09-28T18:31:23.175Z",
    "size": 57248,
    "path": "../public/fonts/mona-sans/MonaSansExpanded-SemiBold.woff"
  },
  "/fonts/mona-sans/MonaSansExpanded-SemiBold.woff2": {
    "type": "font/woff2",
    "etag": "\"a8e8-H2CU9gYqT/iZxFPiLjLQyvr7WuA\"",
    "mtime": "2025-09-28T18:31:23.181Z",
    "size": 43240,
    "path": "../public/fonts/mona-sans/MonaSansExpanded-SemiBold.woff2"
  },
  "/fonts/mona-sans/MonaSansExpanded-SemiBoldItalic.woff": {
    "type": "font/woff",
    "etag": "\"e7ac-3Sqeou2KynXg7X+ggiEKFgfi0Qo\"",
    "mtime": "2025-09-28T18:31:23.187Z",
    "size": 59308,
    "path": "../public/fonts/mona-sans/MonaSansExpanded-SemiBoldItalic.woff"
  },
  "/fonts/mona-sans/MonaSansExpanded-SemiBoldItalic.woff2": {
    "type": "font/woff2",
    "etag": "\"af38-gUqA4dXCSc/dZclj1weoW+7n3Us\"",
    "mtime": "2025-09-28T18:31:23.193Z",
    "size": 44856,
    "path": "../public/fonts/mona-sans/MonaSansExpanded-SemiBoldItalic.woff2"
  },
  "/fonts/mona-sans/MonaSansSemiCondensed-Italic.woff": {
    "type": "font/woff",
    "etag": "\"e67c-ZFhjeAYMAc3wCdv8gsMHnkjIAJw\"",
    "mtime": "2025-09-28T18:30:15.594Z",
    "size": 59004,
    "path": "../public/fonts/mona-sans/MonaSansSemiCondensed-Italic.woff"
  },
  "/fonts/mona-sans/MonaSansSemiCondensed-Italic.woff2": {
    "type": "font/woff2",
    "etag": "\"ae28-z3h2qvFFNh5APw16YjAqi0iGEUQ\"",
    "mtime": "2025-09-28T18:30:15.607Z",
    "size": 44584,
    "path": "../public/fonts/mona-sans/MonaSansSemiCondensed-Italic.woff2"
  },
  "/fonts/mona-sans/MonaSansSemiCondensed-Light.woff": {
    "type": "font/woff",
    "etag": "\"dc7c-TxNvp0EDg9mTMGj86WNks0dFXHM\"",
    "mtime": "2025-09-28T18:30:15.614Z",
    "size": 56444,
    "path": "../public/fonts/mona-sans/MonaSansSemiCondensed-Light.woff"
  },
  "/fonts/mona-sans/MonaSansSemiCondensed-Light.woff2": {
    "type": "font/woff2",
    "etag": "\"a700-qcIOa++9FcO+mVDfY/lwz//l0gU\"",
    "mtime": "2025-09-28T18:30:15.618Z",
    "size": 42752,
    "path": "../public/fonts/mona-sans/MonaSansSemiCondensed-Light.woff2"
  },
  "/fonts/mona-sans/MonaSansSemiCondensed-LightItalic.woff": {
    "type": "font/woff",
    "etag": "\"e640-W1zPHX7gWD1pk6bvC5LaiB5uejQ\"",
    "mtime": "2025-09-28T18:30:15.628Z",
    "size": 58944,
    "path": "../public/fonts/mona-sans/MonaSansSemiCondensed-LightItalic.woff"
  },
  "/fonts/mona-sans/MonaSansSemiCondensed-LightItalic.woff2": {
    "type": "font/woff2",
    "etag": "\"addc-9QRjKs5VAzKXVfD3nNEu6NHv+Us\"",
    "mtime": "2025-09-28T18:30:15.635Z",
    "size": 44508,
    "path": "../public/fonts/mona-sans/MonaSansSemiCondensed-LightItalic.woff2"
  },
  "/fonts/mona-sans/MonaSansSemiCondensed-Medium.woff": {
    "type": "font/woff",
    "etag": "\"de38-uKuW+3g+EAifRnjs7iFM0d15sKI\"",
    "mtime": "2025-09-28T18:30:15.642Z",
    "size": 56888,
    "path": "../public/fonts/mona-sans/MonaSansSemiCondensed-Medium.woff"
  },
  "/fonts/mona-sans/MonaSansSemiCondensed-Medium.woff2": {
    "type": "font/woff2",
    "etag": "\"a874-/8IWprKV5JuBqjjX3aENXZtoxRs\"",
    "mtime": "2025-09-28T18:30:15.649Z",
    "size": 43124,
    "path": "../public/fonts/mona-sans/MonaSansSemiCondensed-Medium.woff2"
  },
  "/fonts/mona-sans/MonaSansSemiCondensed-MediumItalic.woff": {
    "type": "font/woff",
    "etag": "\"e6d8-5ovXe/byQctaEkz6piVjuP0S1vY\"",
    "mtime": "2025-09-28T18:30:15.657Z",
    "size": 59096,
    "path": "../public/fonts/mona-sans/MonaSansSemiCondensed-MediumItalic.woff"
  },
  "/fonts/mona-sans/MonaSansSemiCondensed-MediumItalic.woff2": {
    "type": "font/woff2",
    "etag": "\"ade0-JdIIo0T0g1EyGEZd8gZR99ymshQ\"",
    "mtime": "2025-09-28T18:30:15.664Z",
    "size": 44512,
    "path": "../public/fonts/mona-sans/MonaSansSemiCondensed-MediumItalic.woff2"
  },
  "/fonts/mona-sans/MonaSansSemiCondensed-Regular.woff": {
    "type": "font/woff",
    "etag": "\"dd70-+WnAjOSvIE6oiIX/VK45s5/iTcQ\"",
    "mtime": "2025-09-28T18:30:15.670Z",
    "size": 56688,
    "path": "../public/fonts/mona-sans/MonaSansSemiCondensed-Regular.woff"
  },
  "/fonts/mona-sans/MonaSansSemiCondensed-Regular.woff2": {
    "type": "font/woff2",
    "etag": "\"a79c-m6BRJzT/m8e0hZRprYAyX6UB258\"",
    "mtime": "2025-09-28T18:30:15.677Z",
    "size": 42908,
    "path": "../public/fonts/mona-sans/MonaSansSemiCondensed-Regular.woff2"
  },
  "/fonts/mona-sans/MonaSansSemiCondensed-SemiBold.woff": {
    "type": "font/woff",
    "etag": "\"ddfc-/w6EbZmqzVnJ+w8g1oFn26RsfRE\"",
    "mtime": "2025-09-28T18:30:15.684Z",
    "size": 56828,
    "path": "../public/fonts/mona-sans/MonaSansSemiCondensed-SemiBold.woff"
  },
  "/fonts/mona-sans/MonaSansSemiCondensed-SemiBold.woff2": {
    "type": "font/woff2",
    "etag": "\"a6e4-r9SIwAT6vo5jv6HWTehmIluNYEY\"",
    "mtime": "2025-09-28T18:30:15.690Z",
    "size": 42724,
    "path": "../public/fonts/mona-sans/MonaSansSemiCondensed-SemiBold.woff2"
  },
  "/fonts/mona-sans/MonaSansSemiCondensed-SemiBoldItalic.woff": {
    "type": "font/woff",
    "etag": "\"e6f8-qyFnN5nj0JOgS/LFnC6UXrYx/wU\"",
    "mtime": "2025-09-28T18:30:15.698Z",
    "size": 59128,
    "path": "../public/fonts/mona-sans/MonaSansSemiCondensed-SemiBoldItalic.woff"
  },
  "/fonts/mona-sans/MonaSansSemiCondensed-SemiBoldItalic.woff2": {
    "type": "font/woff2",
    "etag": "\"ae2c-JxMkFi1AphxhJVIcT4zWegGVWVU\"",
    "mtime": "2025-09-28T18:30:15.705Z",
    "size": 44588,
    "path": "../public/fonts/mona-sans/MonaSansSemiCondensed-SemiBoldItalic.woff2"
  },
  "/fonts/mona-sans/MonaSansSemiExpanded-Black.woff": {
    "type": "font/woff",
    "etag": "\"ddb8-+4Gv2etdgqCI1xDqeE4nDTm9jcc\"",
    "mtime": "2025-09-28T18:30:15.711Z",
    "size": 56760,
    "path": "../public/fonts/mona-sans/MonaSansSemiExpanded-Black.woff"
  },
  "/fonts/mona-sans/MonaSansSemiExpanded-Black.woff2": {
    "type": "font/woff2",
    "etag": "\"a7c8-JrshmpVm1xiGd8eUp8fFlDRnST0\"",
    "mtime": "2025-09-28T18:30:15.718Z",
    "size": 42952,
    "path": "../public/fonts/mona-sans/MonaSansSemiExpanded-Black.woff2"
  },
  "/fonts/mona-sans/MonaSansSemiExpanded-BlackItalic.woff": {
    "type": "font/woff",
    "etag": "\"e59c-lsD4JjRWRWkecvth7V1mXR+HehY\"",
    "mtime": "2025-09-28T18:30:15.725Z",
    "size": 58780,
    "path": "../public/fonts/mona-sans/MonaSansSemiExpanded-BlackItalic.woff"
  },
  "/fonts/mona-sans/MonaSansSemiExpanded-BlackItalic.woff2": {
    "type": "font/woff2",
    "etag": "\"aea4-kfWFxGfvZuh32zuf7lX9H0AHSCc\"",
    "mtime": "2025-09-28T18:30:15.731Z",
    "size": 44708,
    "path": "../public/fonts/mona-sans/MonaSansSemiExpanded-BlackItalic.woff2"
  },
  "/fonts/mona-sans/MonaSansSemiExpanded-Bold.woff": {
    "type": "font/woff",
    "etag": "\"dfe8-5YcUTbg/VIKJgJrakhyfSGB1GLY\"",
    "mtime": "2025-09-28T18:30:15.735Z",
    "size": 57320,
    "path": "../public/fonts/mona-sans/MonaSansSemiExpanded-Bold.woff"
  },
  "/fonts/mona-sans/MonaSansSemiExpanded-Bold.woff2": {
    "type": "font/woff2",
    "etag": "\"aa24-y3IsngxA/IrbmAFsiaVa4c7kMEs\"",
    "mtime": "2025-09-28T18:30:15.738Z",
    "size": 43556,
    "path": "../public/fonts/mona-sans/MonaSansSemiExpanded-Bold.woff2"
  },
  "/fonts/mona-sans/MonaSansSemiExpanded-BoldItalic.woff": {
    "type": "font/woff",
    "etag": "\"e7bc-yaip6glImaNd6MjhHhHZsyAP+Rk\"",
    "mtime": "2025-09-28T18:30:15.751Z",
    "size": 59324,
    "path": "../public/fonts/mona-sans/MonaSansSemiExpanded-BoldItalic.woff"
  },
  "/fonts/mona-sans/MonaSansSemiExpanded-BoldItalic.woff2": {
    "type": "font/woff2",
    "etag": "\"ae38-zV/YR7nP9p9L/aScXZ8C5PrKk7c\"",
    "mtime": "2025-09-28T18:30:15.757Z",
    "size": 44600,
    "path": "../public/fonts/mona-sans/MonaSansSemiExpanded-BoldItalic.woff2"
  },
  "/fonts/mona-sans/MonaSansSemiExpanded-ExtraBold.woff": {
    "type": "font/woff",
    "etag": "\"df28-MgSRDsHLwbB9brAkAea5IqaN89w\"",
    "mtime": "2025-09-28T18:30:15.763Z",
    "size": 57128,
    "path": "../public/fonts/mona-sans/MonaSansSemiExpanded-ExtraBold.woff"
  },
  "/fonts/mona-sans/MonaSansSemiExpanded-ExtraBold.woff2": {
    "type": "font/woff2",
    "etag": "\"a8b0-+gVJDObMGvslyAltqEW8STThw6c\"",
    "mtime": "2025-09-28T18:30:15.768Z",
    "size": 43184,
    "path": "../public/fonts/mona-sans/MonaSansSemiExpanded-ExtraBold.woff2"
  },
  "/fonts/mona-sans/MonaSansSemiExpanded-ExtraBoldItalic.woff": {
    "type": "font/woff",
    "etag": "\"e780-NKfDnF+Y2igSdDhdhaHM5aDkdck\"",
    "mtime": "2025-09-28T18:30:15.774Z",
    "size": 59264,
    "path": "../public/fonts/mona-sans/MonaSansSemiExpanded-ExtraBoldItalic.woff"
  },
  "/fonts/mona-sans/MonaSansSemiExpanded-ExtraBoldItalic.woff2": {
    "type": "font/woff2",
    "etag": "\"af40-baUi4yLK7er6AQI8yqpockfw2Jc\"",
    "mtime": "2025-09-28T18:30:15.781Z",
    "size": 44864,
    "path": "../public/fonts/mona-sans/MonaSansSemiExpanded-ExtraBoldItalic.woff2"
  },
  "/fonts/mona-sans/MonaSansSemiExpanded-ExtraLight.woff": {
    "type": "font/woff",
    "etag": "\"dcdc-fcn3Iq5Aink47gM5PVxp9o+IZJk\"",
    "mtime": "2025-09-28T18:30:15.788Z",
    "size": 56540,
    "path": "../public/fonts/mona-sans/MonaSansSemiExpanded-ExtraLight.woff"
  },
  "/fonts/mona-sans/MonaSansSemiExpanded-ExtraLight.woff2": {
    "type": "font/woff2",
    "etag": "\"a7cc-EF8984b3LxhlbxRKjGrvl4WOcMo\"",
    "mtime": "2025-09-28T18:30:15.789Z",
    "size": 42956,
    "path": "../public/fonts/mona-sans/MonaSansSemiExpanded-ExtraLight.woff2"
  },
  "/fonts/mona-sans/MonaSansSemiExpanded-ExtraLightItalic.woff": {
    "type": "font/woff",
    "etag": "\"e394-FzJSpSmoc1lUZe28/XJ0Ipn5dWM\"",
    "mtime": "2025-09-28T18:30:15.798Z",
    "size": 58260,
    "path": "../public/fonts/mona-sans/MonaSansSemiExpanded-ExtraLightItalic.woff"
  },
  "/fonts/mona-sans/MonaSansSemiExpanded-ExtraLightItalic.woff2": {
    "type": "font/woff2",
    "etag": "\"acb8-V2+m1OH3K+OAH/M/sDL7BO6r7ew\"",
    "mtime": "2025-09-28T18:30:15.808Z",
    "size": 44216,
    "path": "../public/fonts/mona-sans/MonaSansSemiExpanded-ExtraLightItalic.woff2"
  },
  "/fonts/mona-sans/MonaSansSemiExpanded-Italic.woff": {
    "type": "font/woff",
    "etag": "\"e80c-nzgFo0yHGZCq4JMlPcztgtIXeM4\"",
    "mtime": "2025-09-28T18:30:15.813Z",
    "size": 59404,
    "path": "../public/fonts/mona-sans/MonaSansSemiExpanded-Italic.woff"
  },
  "/fonts/mona-sans/MonaSansSemiExpanded-Italic.woff2": {
    "type": "font/woff2",
    "etag": "\"af90-O6pEbT5RFqVD/lTNQA9sFO0kVn0\"",
    "mtime": "2025-09-28T18:30:15.819Z",
    "size": 44944,
    "path": "../public/fonts/mona-sans/MonaSansSemiExpanded-Italic.woff2"
  },
  "/fonts/mona-sans/MonaSansSemiExpanded-Light.woff": {
    "type": "font/woff",
    "etag": "\"dfcc-zFY9KacQ+VRgQ+HbSylyiEQJC4Y\"",
    "mtime": "2025-09-28T18:30:15.826Z",
    "size": 57292,
    "path": "../public/fonts/mona-sans/MonaSansSemiExpanded-Light.woff"
  },
  "/fonts/mona-sans/MonaSansSemiExpanded-Light.woff2": {
    "type": "font/woff2",
    "etag": "\"a940-fWLHAZbsrDSJqPf/P8X++uM1g+k\"",
    "mtime": "2025-09-28T18:30:15.831Z",
    "size": 43328,
    "path": "../public/fonts/mona-sans/MonaSansSemiExpanded-Light.woff2"
  },
  "/fonts/mona-sans/MonaSansSemiExpanded-LightItalic.woff": {
    "type": "font/woff",
    "etag": "\"e748-PILbPDHZLPnmJYxgPPVUONqZ3xI\"",
    "mtime": "2025-09-28T18:30:15.837Z",
    "size": 59208,
    "path": "../public/fonts/mona-sans/MonaSansSemiExpanded-LightItalic.woff"
  },
  "/fonts/mona-sans/MonaSansSemiExpanded-LightItalic.woff2": {
    "type": "font/woff2",
    "etag": "\"afbc-P3zdp3dpaRQvvbJ0GAY/QNaDQnc\"",
    "mtime": "2025-09-28T18:30:15.842Z",
    "size": 44988,
    "path": "../public/fonts/mona-sans/MonaSansSemiExpanded-LightItalic.woff2"
  },
  "/fonts/mona-sans/MonaSansSemiExpanded-Medium.woff": {
    "type": "font/woff",
    "etag": "\"e0cc-7bWxuwDF2LYt22uSEMEg3GhotZQ\"",
    "mtime": "2025-09-28T18:30:15.849Z",
    "size": 57548,
    "path": "../public/fonts/mona-sans/MonaSansSemiExpanded-Medium.woff"
  },
  "/fonts/mona-sans/MonaSansSemiExpanded-Medium.woff2": {
    "type": "font/woff2",
    "etag": "\"aaa8-dsGA+qtTvyhdE+BdodIn1pd344c\"",
    "mtime": "2025-09-28T18:30:15.855Z",
    "size": 43688,
    "path": "../public/fonts/mona-sans/MonaSansSemiExpanded-Medium.woff2"
  },
  "/fonts/mona-sans/MonaSansSemiExpanded-MediumItalic.woff": {
    "type": "font/woff",
    "etag": "\"e7bc-hgGjn00L0hpv96Qcxr/UdrVJwf4\"",
    "mtime": "2025-09-28T18:30:15.861Z",
    "size": 59324,
    "path": "../public/fonts/mona-sans/MonaSansSemiExpanded-MediumItalic.woff"
  },
  "/fonts/mona-sans/MonaSansSemiExpanded-MediumItalic.woff2": {
    "type": "font/woff2",
    "etag": "\"af44-0TzfB3w4X6g7Xyl5aHilfI0D05Y\"",
    "mtime": "2025-09-28T18:30:15.866Z",
    "size": 44868,
    "path": "../public/fonts/mona-sans/MonaSansSemiExpanded-MediumItalic.woff2"
  },
  "/fonts/mona-sans/MonaSansSemiExpanded-Regular.woff": {
    "type": "font/woff",
    "etag": "\"e008-BWWJyX4LRgegMIyfX2RhRzZLUpc\"",
    "mtime": "2025-09-28T18:30:15.872Z",
    "size": 57352,
    "path": "../public/fonts/mona-sans/MonaSansSemiExpanded-Regular.woff"
  },
  "/fonts/mona-sans/MonaSansSemiExpanded-Regular.woff2": {
    "type": "font/woff2",
    "etag": "\"aabc-AsrcgrtOwnaDqxG45aG4tKmYwCY\"",
    "mtime": "2025-09-28T18:30:15.877Z",
    "size": 43708,
    "path": "../public/fonts/mona-sans/MonaSansSemiExpanded-Regular.woff2"
  },
  "/fonts/mona-sans/MonaSansSemiExpanded-SemiBold.woff": {
    "type": "font/woff",
    "etag": "\"e088-2ZSNLpmsI4Y/PU7FMHq0ala3vm4\"",
    "mtime": "2025-09-28T18:30:15.884Z",
    "size": 57480,
    "path": "../public/fonts/mona-sans/MonaSansSemiExpanded-SemiBold.woff"
  },
  "/fonts/mona-sans/MonaSansSemiExpanded-SemiBold.woff2": {
    "type": "font/woff2",
    "etag": "\"aa54-Y0/AzmruzFdjbP/rvOwyxEG3HPE\"",
    "mtime": "2025-09-28T18:30:15.890Z",
    "size": 43604,
    "path": "../public/fonts/mona-sans/MonaSansSemiExpanded-SemiBold.woff2"
  },
  "/fonts/mona-sans/MonaSansSemiExpanded-SemiBoldItalic.woff": {
    "type": "font/woff",
    "etag": "\"e800-ktA2DB+KVyv3fCs/Wt7PjawP1/g\"",
    "mtime": "2025-09-28T18:30:15.895Z",
    "size": 59392,
    "path": "../public/fonts/mona-sans/MonaSansSemiExpanded-SemiBoldItalic.woff"
  },
  "/fonts/mona-sans/MonaSansSemiExpanded-SemiBoldItalic.woff2": {
    "type": "font/woff2",
    "etag": "\"aff0-ke89FckIWiE079rwFS3NsFUZnCk\"",
    "mtime": "2025-09-28T18:30:15.902Z",
    "size": 45040,
    "path": "../public/fonts/mona-sans/MonaSansSemiExpanded-SemiBoldItalic.woff2"
  },
  "/fonts/mona-sans/MonaSans_Condensed-Black.ttf": {
    "type": "font/ttf",
    "etag": "\"18b10-TSKQxm3DnqDQd+0RNy9CMctmZVU\"",
    "mtime": "2025-09-27T20:41:38.124Z",
    "size": 101136,
    "path": "../public/fonts/mona-sans/MonaSans_Condensed-Black.ttf"
  },
  "/fonts/mona-sans/MonaSans_Condensed-BlackItalic.ttf": {
    "type": "font/ttf",
    "etag": "\"192c0-8tX3hb4bWDkDhcAcqNI5XsLBYHE\"",
    "mtime": "2025-09-27T20:41:38.124Z",
    "size": 103104,
    "path": "../public/fonts/mona-sans/MonaSans_Condensed-BlackItalic.ttf"
  },
  "/fonts/mona-sans/MonaSans_Condensed-Bold.ttf": {
    "type": "font/ttf",
    "etag": "\"18b6c-odnLsCXu13hGfPsQebGG0MsWTAg\"",
    "mtime": "2025-09-27T20:41:38.124Z",
    "size": 101228,
    "path": "../public/fonts/mona-sans/MonaSans_Condensed-Bold.ttf"
  },
  "/fonts/mona-sans/MonaSans_Condensed-BoldItalic.ttf": {
    "type": "font/ttf",
    "etag": "\"192ec-5bPYIZk09eWO3k7gRRtzUg/2auk\"",
    "mtime": "2025-09-27T20:41:38.124Z",
    "size": 103148,
    "path": "../public/fonts/mona-sans/MonaSans_Condensed-BoldItalic.ttf"
  },
  "/fonts/mona-sans/MonaSans_Condensed-ExtraBold.ttf": {
    "type": "font/ttf",
    "etag": "\"18bbc-zVQ3MbjLhdNvx/IpnGeyHaNtVHM\"",
    "mtime": "2025-09-27T20:41:38.124Z",
    "size": 101308,
    "path": "../public/fonts/mona-sans/MonaSans_Condensed-ExtraBold.ttf"
  },
  "/fonts/mona-sans/MonaSans_Condensed-ExtraBoldItalic.ttf": {
    "type": "font/ttf",
    "etag": "\"192d8-DQHpXnFWu1VgoaB1J3XeDjTR3H8\"",
    "mtime": "2025-09-27T20:41:38.124Z",
    "size": 103128,
    "path": "../public/fonts/mona-sans/MonaSans_Condensed-ExtraBoldItalic.ttf"
  },
  "/fonts/mona-sans/MonaSans_Condensed-ExtraLight.ttf": {
    "type": "font/ttf",
    "etag": "\"18b0c-RFbXFZ6qzfF/XrIbCnhkslDfzhM\"",
    "mtime": "2025-09-27T20:41:38.124Z",
    "size": 101132,
    "path": "../public/fonts/mona-sans/MonaSans_Condensed-ExtraLight.ttf"
  },
  "/fonts/mona-sans/MonaSans_Condensed-ExtraLightItalic.ttf": {
    "type": "font/ttf",
    "etag": "\"192c8-RfatjzbJyYRUmTLVQbowQrUDUIg\"",
    "mtime": "2025-09-27T20:41:38.124Z",
    "size": 103112,
    "path": "../public/fonts/mona-sans/MonaSans_Condensed-ExtraLightItalic.ttf"
  },
  "/fonts/mona-sans/MonaSans_Condensed-Italic.ttf": {
    "type": "font/ttf",
    "etag": "\"192a4-R7iCCBfx97hStLLtxgh+ukRh2IU\"",
    "mtime": "2025-09-27T20:41:38.124Z",
    "size": 103076,
    "path": "../public/fonts/mona-sans/MonaSans_Condensed-Italic.ttf"
  },
  "/fonts/mona-sans/MonaSans_Condensed-Light.ttf": {
    "type": "font/ttf",
    "etag": "\"18b78-hv+4uGMd68orIzt3Zw0ERv20jv0\"",
    "mtime": "2025-09-27T20:41:38.124Z",
    "size": 101240,
    "path": "../public/fonts/mona-sans/MonaSans_Condensed-Light.ttf"
  },
  "/fonts/mona-sans/MonaSans_Condensed-LightItalic.ttf": {
    "type": "font/ttf",
    "etag": "\"19310-R75y1/XT91+UlDHorm03OtfxLNA\"",
    "mtime": "2025-09-27T20:41:38.139Z",
    "size": 103184,
    "path": "../public/fonts/mona-sans/MonaSans_Condensed-LightItalic.ttf"
  },
  "/fonts/mona-sans/MonaSans_Condensed-Medium.ttf": {
    "type": "font/ttf",
    "etag": "\"18b50-I6QWzL+caFfgeI/35SQKC8SaK5Q\"",
    "mtime": "2025-09-27T20:41:38.139Z",
    "size": 101200,
    "path": "../public/fonts/mona-sans/MonaSans_Condensed-Medium.ttf"
  },
  "/fonts/mona-sans/MonaSans_Condensed-MediumItalic.ttf": {
    "type": "font/ttf",
    "etag": "\"19360-wNno7cyl13DYxgFtlMNqsRy42WQ\"",
    "mtime": "2025-09-27T20:41:38.139Z",
    "size": 103264,
    "path": "../public/fonts/mona-sans/MonaSans_Condensed-MediumItalic.ttf"
  },
  "/fonts/mona-sans/MonaSans_Condensed-Regular.ttf": {
    "type": "font/ttf",
    "etag": "\"18b2c-e334JatlIGloFpwCw2MvM0h8MZM\"",
    "mtime": "2025-09-27T20:41:38.139Z",
    "size": 101164,
    "path": "../public/fonts/mona-sans/MonaSans_Condensed-Regular.ttf"
  },
  "/fonts/mona-sans/MonaSans_Condensed-SemiBold.ttf": {
    "type": "font/ttf",
    "etag": "\"18b84-Tzr+z4m1p/Ao+D1BDWKJMONg5OU\"",
    "mtime": "2025-09-27T20:41:38.139Z",
    "size": 101252,
    "path": "../public/fonts/mona-sans/MonaSans_Condensed-SemiBold.ttf"
  },
  "/fonts/mona-sans/MonaSans_Condensed-SemiBoldItalic.ttf": {
    "type": "font/ttf",
    "etag": "\"1934c-ANQtgQmYvpivJtnIc/khR6NJ/7M\"",
    "mtime": "2025-09-27T20:41:38.139Z",
    "size": 103244,
    "path": "../public/fonts/mona-sans/MonaSans_Condensed-SemiBoldItalic.ttf"
  },
  "/fonts/mona-sans/MonaSans_Expanded-Black.ttf": {
    "type": "font/ttf",
    "etag": "\"18b7c-7xa5HFP2bsDqTzyHF4ZMMsuyJCk\"",
    "mtime": "2025-09-27T20:41:38.139Z",
    "size": 101244,
    "path": "../public/fonts/mona-sans/MonaSans_Expanded-Black.ttf"
  },
  "/fonts/mona-sans/MonaSans_Expanded-BlackItalic.ttf": {
    "type": "font/ttf",
    "etag": "\"19198-zn81RlMibCmjzrbwT6nsGebqAec\"",
    "mtime": "2025-09-27T20:41:38.139Z",
    "size": 102808,
    "path": "../public/fonts/mona-sans/MonaSans_Expanded-BlackItalic.ttf"
  },
  "/fonts/mona-sans/MonaSans_Expanded-Bold.ttf": {
    "type": "font/ttf",
    "etag": "\"18be4-2bnobEfiDsp+YfCwga1Wdi6RK8A\"",
    "mtime": "2025-09-27T20:41:38.139Z",
    "size": 101348,
    "path": "../public/fonts/mona-sans/MonaSans_Expanded-Bold.ttf"
  },
  "/fonts/mona-sans/MonaSans_Expanded-BoldItalic.ttf": {
    "type": "font/ttf",
    "etag": "\"1924c-iAfshKhggRJtQDPujnHG0itku5Q\"",
    "mtime": "2025-09-27T20:41:38.139Z",
    "size": 102988,
    "path": "../public/fonts/mona-sans/MonaSans_Expanded-BoldItalic.ttf"
  },
  "/fonts/mona-sans/MonaSans_Expanded-ExtraBold.ttf": {
    "type": "font/ttf",
    "etag": "\"18be0-srt6MT9LrGq8ATELZ34VV7E956U\"",
    "mtime": "2025-09-27T20:41:38.139Z",
    "size": 101344,
    "path": "../public/fonts/mona-sans/MonaSans_Expanded-ExtraBold.ttf"
  },
  "/fonts/mona-sans/MonaSans_Expanded-ExtraBoldItalic.ttf": {
    "type": "font/ttf",
    "etag": "\"19270-5CLo8tRVR1I0Dt1dNs2k6HC93io\"",
    "mtime": "2025-09-27T20:41:38.139Z",
    "size": 103024,
    "path": "../public/fonts/mona-sans/MonaSans_Expanded-ExtraBoldItalic.ttf"
  },
  "/fonts/mona-sans/MonaSans_Expanded-ExtraLight.ttf": {
    "type": "font/ttf",
    "etag": "\"18c14-dIIJcFY8O7vkzcEOMDjL/I91hsc\"",
    "mtime": "2025-09-27T20:41:38.155Z",
    "size": 101396,
    "path": "../public/fonts/mona-sans/MonaSans_Expanded-ExtraLight.ttf"
  },
  "/fonts/mona-sans/MonaSans_Expanded-ExtraLightItalic.ttf": {
    "type": "font/ttf",
    "etag": "\"192bc-JMJ+JYRt+oRuU52bwDvJr0a2A7w\"",
    "mtime": "2025-09-27T20:41:38.155Z",
    "size": 103100,
    "path": "../public/fonts/mona-sans/MonaSans_Expanded-ExtraLightItalic.ttf"
  },
  "/fonts/mona-sans/MonaSans_Expanded-Italic.ttf": {
    "type": "font/ttf",
    "etag": "\"192c0-MeF/n244KtsJKNhjneTqrNGR6J8\"",
    "mtime": "2025-09-27T20:41:38.155Z",
    "size": 103104,
    "path": "../public/fonts/mona-sans/MonaSans_Expanded-Italic.ttf"
  },
  "/fonts/mona-sans/MonaSans_Expanded-Light.ttf": {
    "type": "font/ttf",
    "etag": "\"18c50-JyUrxlugeoiOVKUSncMGLJ7fqRI\"",
    "mtime": "2025-09-27T20:41:38.155Z",
    "size": 101456,
    "path": "../public/fonts/mona-sans/MonaSans_Expanded-Light.ttf"
  },
  "/fonts/mona-sans/MonaSans_Expanded-LightItalic.ttf": {
    "type": "font/ttf",
    "etag": "\"192b4-Wct5ZW5aTWj04BGzuRp7KCQs//g\"",
    "mtime": "2025-09-27T20:41:38.155Z",
    "size": 103092,
    "path": "../public/fonts/mona-sans/MonaSans_Expanded-LightItalic.ttf"
  },
  "/fonts/mona-sans/MonaSans_Expanded-Medium.ttf": {
    "type": "font/ttf",
    "etag": "\"18c3c-Q19gPBLeDfVIgyKOqk3Jst8WQeg\"",
    "mtime": "2025-09-27T20:41:38.155Z",
    "size": 101436,
    "path": "../public/fonts/mona-sans/MonaSans_Expanded-Medium.ttf"
  },
  "/fonts/mona-sans/MonaSans_Expanded-MediumItalic.ttf": {
    "type": "font/ttf",
    "etag": "\"19308-xVIILrWertE0k72THtH24bHEJ/Y\"",
    "mtime": "2025-09-27T20:41:38.155Z",
    "size": 103176,
    "path": "../public/fonts/mona-sans/MonaSans_Expanded-MediumItalic.ttf"
  },
  "/fonts/mona-sans/MonaSans_Expanded-Regular.ttf": {
    "type": "font/ttf",
    "etag": "\"18c3c-nGTodr7e1dGqQQwJEGKfi8VRWtQ\"",
    "mtime": "2025-09-27T20:41:38.155Z",
    "size": 101436,
    "path": "../public/fonts/mona-sans/MonaSans_Expanded-Regular.ttf"
  },
  "/fonts/mona-sans/MonaSans_Expanded-SemiBold.ttf": {
    "type": "font/ttf",
    "etag": "\"18c50-vvurVBGCT4CXlykvYUGU1OqrSOw\"",
    "mtime": "2025-09-27T20:41:38.155Z",
    "size": 101456,
    "path": "../public/fonts/mona-sans/MonaSans_Expanded-SemiBold.ttf"
  },
  "/fonts/mona-sans/MonaSans_Expanded-SemiBoldItalic.ttf": {
    "type": "font/ttf",
    "etag": "\"192a4-6nyWE7iphsjbqAe37vw657qKbNY\"",
    "mtime": "2025-09-27T20:41:38.155Z",
    "size": 103076,
    "path": "../public/fonts/mona-sans/MonaSans_Expanded-SemiBoldItalic.ttf"
  },
  "/fonts/mona-sans/MonaSans_SemiCondensed-Black.ttf": {
    "type": "font/ttf",
    "etag": "\"18bb0-ecDbaW1mMo64RNjRm7BqBaCegh8\"",
    "mtime": "2025-09-27T20:41:38.155Z",
    "size": 101296,
    "path": "../public/fonts/mona-sans/MonaSans_SemiCondensed-Black.ttf"
  },
  "/fonts/mona-sans/MonaSans_SemiCondensed-BlackItalic.ttf": {
    "type": "font/ttf",
    "etag": "\"19310-/m96/oBuKSzpCuCxPxXBPvSMVrU\"",
    "mtime": "2025-09-27T20:41:38.155Z",
    "size": 103184,
    "path": "../public/fonts/mona-sans/MonaSans_SemiCondensed-BlackItalic.ttf"
  },
  "/fonts/mona-sans/MonaSans_SemiCondensed-Bold.ttf": {
    "type": "font/ttf",
    "etag": "\"18c50-qhE3ZlASCS7OTcjH3FAmXsElzbg\"",
    "mtime": "2025-09-27T20:41:38.171Z",
    "size": 101456,
    "path": "../public/fonts/mona-sans/MonaSans_SemiCondensed-Bold.ttf"
  },
  "/fonts/mona-sans/MonaSans_SemiCondensed-BoldItalic.ttf": {
    "type": "font/ttf",
    "etag": "\"19338-8uV/eUAi91hdFi4NZ8vk5auQ1Ds\"",
    "mtime": "2025-09-27T20:41:38.171Z",
    "size": 103224,
    "path": "../public/fonts/mona-sans/MonaSans_SemiCondensed-BoldItalic.ttf"
  },
  "/fonts/mona-sans/MonaSans_SemiCondensed-ExtraBold.ttf": {
    "type": "font/ttf",
    "etag": "\"18c24-2rxooKNzrP1QTYJlp3SzT+84H1U\"",
    "mtime": "2025-09-27T20:41:38.171Z",
    "size": 101412,
    "path": "../public/fonts/mona-sans/MonaSans_SemiCondensed-ExtraBold.ttf"
  },
  "/fonts/mona-sans/MonaSans_SemiCondensed-ExtraBoldItalic.ttf": {
    "type": "font/ttf",
    "etag": "\"19368-+QPPDJiS4cDmrdX29EnaNiVtIis\"",
    "mtime": "2025-09-27T20:41:38.171Z",
    "size": 103272,
    "path": "../public/fonts/mona-sans/MonaSans_SemiCondensed-ExtraBoldItalic.ttf"
  },
  "/fonts/mona-sans/MonaSans_SemiCondensed-ExtraLight.ttf": {
    "type": "font/ttf",
    "etag": "\"18c18-PTC7so5ieM1AsEsKS7d93ZQ0JYA\"",
    "mtime": "2025-09-27T20:41:38.171Z",
    "size": 101400,
    "path": "../public/fonts/mona-sans/MonaSans_SemiCondensed-ExtraLight.ttf"
  },
  "/fonts/mona-sans/MonaSans_SemiCondensed-ExtraLightItalic.ttf": {
    "type": "font/ttf",
    "etag": "\"19340-a9rAZ4EQBDa9PZYWnBVQwFNHl4U\"",
    "mtime": "2025-09-27T20:41:38.171Z",
    "size": 103232,
    "path": "../public/fonts/mona-sans/MonaSans_SemiCondensed-ExtraLightItalic.ttf"
  },
  "/fonts/mona-sans/MonaSans_SemiCondensed-Italic.ttf": {
    "type": "font/ttf",
    "etag": "\"19324-4rmsrj5mlmr+KIwxrK9u7v7+7L0\"",
    "mtime": "2025-09-27T20:41:38.171Z",
    "size": 103204,
    "path": "../public/fonts/mona-sans/MonaSans_SemiCondensed-Italic.ttf"
  },
  "/fonts/mona-sans/MonaSans_SemiCondensed-Light.ttf": {
    "type": "font/ttf",
    "etag": "\"18c44-6e9oia2MQ8v1zy+75NDgMgc84QQ\"",
    "mtime": "2025-09-27T20:41:38.171Z",
    "size": 101444,
    "path": "../public/fonts/mona-sans/MonaSans_SemiCondensed-Light.ttf"
  },
  "/fonts/mona-sans/MonaSans_SemiCondensed-LightItalic.ttf": {
    "type": "font/ttf",
    "etag": "\"19378-Oqby+ibJyiJw5m8D/fQWzVnxIhw\"",
    "mtime": "2025-09-27T20:41:38.171Z",
    "size": 103288,
    "path": "../public/fonts/mona-sans/MonaSans_SemiCondensed-LightItalic.ttf"
  },
  "/fonts/mona-sans/MonaSans_SemiCondensed-Medium.ttf": {
    "type": "font/ttf",
    "etag": "\"18c6c-xxN5LqZDaxFk54ew8q2YXBhE5Yo\"",
    "mtime": "2025-09-27T20:41:38.171Z",
    "size": 101484,
    "path": "../public/fonts/mona-sans/MonaSans_SemiCondensed-Medium.ttf"
  },
  "/fonts/mona-sans/MonaSans_SemiCondensed-MediumItalic.ttf": {
    "type": "font/ttf",
    "etag": "\"193ac-RY7PKkxpDakAuN0Ir12a/6YWvHQ\"",
    "mtime": "2025-09-27T20:41:38.171Z",
    "size": 103340,
    "path": "../public/fonts/mona-sans/MonaSans_SemiCondensed-MediumItalic.ttf"
  },
  "/fonts/mona-sans/MonaSans_SemiCondensed-Regular.ttf": {
    "type": "font/ttf",
    "etag": "\"18bd8-IwC5uTjpYLVm7d7fa1BT2PSq7yM\"",
    "mtime": "2025-09-27T20:41:38.187Z",
    "size": 101336,
    "path": "../public/fonts/mona-sans/MonaSans_SemiCondensed-Regular.ttf"
  },
  "/fonts/mona-sans/MonaSans_SemiCondensed-SemiBold.ttf": {
    "type": "font/ttf",
    "etag": "\"18c58-eMKfD/Dnh2HJzPBgbPZ49fGm6Sw\"",
    "mtime": "2025-09-27T20:41:38.188Z",
    "size": 101464,
    "path": "../public/fonts/mona-sans/MonaSans_SemiCondensed-SemiBold.ttf"
  },
  "/fonts/mona-sans/MonaSans_SemiCondensed-SemiBoldItalic.ttf": {
    "type": "font/ttf",
    "etag": "\"193b0-/09nGnIiWA/+mxpw/8XV9SHZX0A\"",
    "mtime": "2025-09-27T20:41:38.189Z",
    "size": 103344,
    "path": "../public/fonts/mona-sans/MonaSans_SemiCondensed-SemiBoldItalic.ttf"
  },
  "/fonts/mona-sans/MonaSans_SemiExpanded-Black.ttf": {
    "type": "font/ttf",
    "etag": "\"18bcc-cOLrIr+/EQXRYCaIrlr/YXmcEHM\"",
    "mtime": "2025-09-27T20:41:38.191Z",
    "size": 101324,
    "path": "../public/fonts/mona-sans/MonaSans_SemiExpanded-Black.ttf"
  },
  "/fonts/mona-sans/MonaSans_SemiExpanded-BlackItalic.ttf": {
    "type": "font/ttf",
    "etag": "\"19248-8V2UYSjtmFPyytAZ5FizZO6v9OQ\"",
    "mtime": "2025-09-27T20:41:38.192Z",
    "size": 102984,
    "path": "../public/fonts/mona-sans/MonaSans_SemiExpanded-BlackItalic.ttf"
  },
  "/fonts/mona-sans/MonaSans_SemiExpanded-Bold.ttf": {
    "type": "font/ttf",
    "etag": "\"18c94-Co9FOgfMTreT1z7BMkCGhLWrPpk\"",
    "mtime": "2025-09-27T20:41:38.193Z",
    "size": 101524,
    "path": "../public/fonts/mona-sans/MonaSans_SemiExpanded-Bold.ttf"
  },
  "/fonts/mona-sans/MonaSans_SemiExpanded-BoldItalic.ttf": {
    "type": "font/ttf",
    "etag": "\"19298-5BJGFGJeUY6S5RE0cSO+svX607Q\"",
    "mtime": "2025-09-27T20:41:38.195Z",
    "size": 103064,
    "path": "../public/fonts/mona-sans/MonaSans_SemiExpanded-BoldItalic.ttf"
  },
  "/fonts/mona-sans/MonaSans_SemiExpanded-ExtraBold.ttf": {
    "type": "font/ttf",
    "etag": "\"18c38-jrerWt67GknHl8S2Y1KvKv7jSLs\"",
    "mtime": "2025-09-27T20:41:38.196Z",
    "size": 101432,
    "path": "../public/fonts/mona-sans/MonaSans_SemiExpanded-ExtraBold.ttf"
  },
  "/fonts/mona-sans/MonaSans_SemiExpanded-ExtraBoldItalic.ttf": {
    "type": "font/ttf",
    "etag": "\"19260-DDnZB9hL+M9FWNAWQS2ImZZ9Kg4\"",
    "mtime": "2025-09-27T20:41:38.197Z",
    "size": 103008,
    "path": "../public/fonts/mona-sans/MonaSans_SemiExpanded-ExtraBoldItalic.ttf"
  },
  "/fonts/mona-sans/MonaSans_SemiExpanded-ExtraLight.ttf": {
    "type": "font/ttf",
    "etag": "\"18ca4-zszDTZYund52TP60DXyefYLMhNI\"",
    "mtime": "2025-09-27T20:41:38.198Z",
    "size": 101540,
    "path": "../public/fonts/mona-sans/MonaSans_SemiExpanded-ExtraLight.ttf"
  },
  "/fonts/mona-sans/MonaSans_SemiExpanded-ExtraLightItalic.ttf": {
    "type": "font/ttf",
    "etag": "\"19330-TZFS9cQbHpcqwPmzkY/W56h1vY8\"",
    "mtime": "2025-09-27T20:41:38.201Z",
    "size": 103216,
    "path": "../public/fonts/mona-sans/MonaSans_SemiExpanded-ExtraLightItalic.ttf"
  },
  "/fonts/mona-sans/MonaSans_SemiExpanded-Italic.ttf": {
    "type": "font/ttf",
    "etag": "\"192f4-jN03+nrCSe48FWgt10d4PzOTpzg\"",
    "mtime": "2025-09-27T20:41:38.202Z",
    "size": 103156,
    "path": "../public/fonts/mona-sans/MonaSans_SemiExpanded-Italic.ttf"
  },
  "/fonts/mona-sans/MonaSans_SemiExpanded-Light.ttf": {
    "type": "font/ttf",
    "etag": "\"18cb4-YmxibpaDBt0GdKD/2s19a6+O6sg\"",
    "mtime": "2025-09-27T20:41:38.203Z",
    "size": 101556,
    "path": "../public/fonts/mona-sans/MonaSans_SemiExpanded-Light.ttf"
  },
  "/fonts/mona-sans/MonaSans_SemiExpanded-LightItalic.ttf": {
    "type": "font/ttf",
    "etag": "\"19368-8X78pZ0QedfH+4sOdY1PmQOFQOU\"",
    "mtime": "2025-09-27T20:41:38.204Z",
    "size": 103272,
    "path": "../public/fonts/mona-sans/MonaSans_SemiExpanded-LightItalic.ttf"
  },
  "/fonts/mona-sans/MonaSans_SemiExpanded-Medium.ttf": {
    "type": "font/ttf",
    "etag": "\"18cd4-4pVfbXslStZ0LqDTE7c7tx6dQv8\"",
    "mtime": "2025-09-27T20:41:38.206Z",
    "size": 101588,
    "path": "../public/fonts/mona-sans/MonaSans_SemiExpanded-Medium.ttf"
  },
  "/fonts/mona-sans/MonaSans_SemiExpanded-MediumItalic.ttf": {
    "type": "font/ttf",
    "etag": "\"19338-+Wad5MVugIV+NpuIDoU94rTA17g\"",
    "mtime": "2025-09-27T20:41:38.207Z",
    "size": 103224,
    "path": "../public/fonts/mona-sans/MonaSans_SemiExpanded-MediumItalic.ttf"
  },
  "/fonts/mona-sans/MonaSans_SemiExpanded-Regular.ttf": {
    "type": "font/ttf",
    "etag": "\"18cb4-Y7aLMkQiyZKe5nsaHT+Bl8XKby4\"",
    "mtime": "2025-09-27T20:41:38.208Z",
    "size": 101556,
    "path": "../public/fonts/mona-sans/MonaSans_SemiExpanded-Regular.ttf"
  },
  "/fonts/mona-sans/MonaSans_SemiExpanded-SemiBold.ttf": {
    "type": "font/ttf",
    "etag": "\"18c9c-Yt6i8ussoAxVVNYDC8jNnyQsFNo\"",
    "mtime": "2025-09-27T20:41:38.209Z",
    "size": 101532,
    "path": "../public/fonts/mona-sans/MonaSans_SemiExpanded-SemiBold.ttf"
  },
  "/fonts/mona-sans/MonaSans_SemiExpanded-SemiBoldItalic.ttf": {
    "type": "font/ttf",
    "etag": "\"19320-XRTxocBr7KCetluIJMEmkGxV/hs\"",
    "mtime": "2025-09-27T20:41:38.211Z",
    "size": 103200,
    "path": "../public/fonts/mona-sans/MonaSans_SemiExpanded-SemiBoldItalic.ttf"
  },
  "/fonts/mona-sans/style.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"4442-RxK21yBS/Vgrp+xuTp9Pgp4qrAM\"",
    "mtime": "2025-09-28T18:39:54.226Z",
    "size": 17474,
    "path": "../public/fonts/mona-sans/style.css"
  },
  "/landing-preview/css/preview-style.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"1cf1-rqhh2zxNSte9sBTny7NcBJQ6seE\"",
    "mtime": "2025-08-21T10:20:44.412Z",
    "size": 7409,
    "path": "../public/landing-preview/css/preview-style.css"
  },
  "/landing-preview/img/bg.png": {
    "type": "image/png",
    "etag": "\"211ee5-0sszQR8NmFUeR4EiwKJVr0NDM+c\"",
    "mtime": "2025-08-21T10:20:44.444Z",
    "size": 2170597,
    "path": "../public/landing-preview/img/bg.png"
  },
  "/landing-preview/img/star.svg": {
    "type": "image/svg+xml",
    "etag": "\"24e-LL5SLblgGRgqEs5xhswWYV1KBSc\"",
    "mtime": "2025-08-21T10:20:44.444Z",
    "size": 590,
    "path": "../public/landing-preview/img/star.svg"
  },
  "/landing-preview/js/demo.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"488-x1aWMngG6D62QGfisIGd6OFr84A\"",
    "mtime": "2025-08-21T10:20:44.634Z",
    "size": 1160,
    "path": "../public/landing-preview/js/demo.js"
  },
  "/landing-preview/js/parallax.min.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"2486-j84+ubRMUHHtxGcdkhMpcrcFv+o\"",
    "mtime": "2025-08-21T10:20:44.634Z",
    "size": 9350,
    "path": "../public/landing-preview/js/parallax.min.js"
  },
  "/landing-preview/scss/preview-style.scss": {
    "type": "text/x-scss; charset=utf-8",
    "etag": "\"14f5-DEvhpXy2rQmEozHLQTcfgcT8dug\"",
    "mtime": "2025-08-21T10:20:44.654Z",
    "size": 5365,
    "path": "../public/landing-preview/scss/preview-style.scss"
  },
  "/assets/scss/components/_buttons.scss": {
    "type": "text/x-scss; charset=utf-8",
    "etag": "\"f4a-ZR8UhJxS9z2u5XRdcmnX0x+6yAU\"",
    "mtime": "2025-08-21T10:20:43.984Z",
    "size": 3914,
    "path": "../public/assets/scss/components/_buttons.scss"
  },
  "/assets/scss/components/_cursor.scss": {
    "type": "text/x-scss; charset=utf-8",
    "etag": "\"cbe-fkMQsonMLPneTG/wH/wO/E5LL3g\"",
    "mtime": "2025-08-21T10:20:43.984Z",
    "size": 3262,
    "path": "../public/assets/scss/components/_cursor.scss"
  },
  "/assets/scss/components/_extra.scss": {
    "type": "text/x-scss; charset=utf-8",
    "etag": "\"1adb-DXs22x7OhFb6aDZIwC4qX5jTwDg\"",
    "mtime": "2025-08-21T10:20:43.984Z",
    "size": 6875,
    "path": "../public/assets/scss/components/_extra.scss"
  },
  "/assets/scss/components/_helper.scss": {
    "type": "text/x-scss; charset=utf-8",
    "etag": "\"4eed-2JRm0JtUIOzloENv2oFLsN6frlo\"",
    "mtime": "2025-08-21T10:20:44.000Z",
    "size": 20205,
    "path": "../public/assets/scss/components/_helper.scss"
  },
  "/assets/scss/components/_menu.scss": {
    "type": "text/x-scss; charset=utf-8",
    "etag": "\"2a87-AkMLxJm6AutRfoOpjuJQfYStPiU\"",
    "mtime": "2025-08-21T10:20:44.000Z",
    "size": 10887,
    "path": "../public/assets/scss/components/_menu.scss"
  },
  "/assets/scss/components/_modal.scss": {
    "type": "text/x-scss; charset=utf-8",
    "etag": "\"0-2jmj7l5rSw0yVb/vlWAYkK/YBwk\"",
    "mtime": "2025-08-21T10:20:44.000Z",
    "size": 0,
    "path": "../public/assets/scss/components/_modal.scss"
  },
  "/assets/scss/components/_overlay.scss": {
    "type": "text/x-scss; charset=utf-8",
    "etag": "\"866-lpx4ovXTKLkv78yyRMxrUXegOLY\"",
    "mtime": "2025-08-21T10:20:44.016Z",
    "size": 2150,
    "path": "../public/assets/scss/components/_overlay.scss"
  },
  "/assets/scss/components/_preloader.scss": {
    "type": "text/x-scss; charset=utf-8",
    "etag": "\"522-9sV7GWUjthxR4waTcijOCMOytfU\"",
    "mtime": "2025-08-21T10:20:44.016Z",
    "size": 1314,
    "path": "../public/assets/scss/components/_preloader.scss"
  },
  "/assets/scss/components/_title.scss": {
    "type": "text/x-scss; charset=utf-8",
    "etag": "\"570-2r0cE4xiP6Bs7IJyAk542ntkRdI\"",
    "mtime": "2025-08-21T10:20:44.016Z",
    "size": 1392,
    "path": "../public/assets/scss/components/_title.scss"
  },
  "/assets/scss/components/_typography.scss": {
    "type": "text/x-scss; charset=utf-8",
    "etag": "\"165d-CrB0k7AD+vffr+I53hgTRZL4Q7o\"",
    "mtime": "2025-08-21T10:20:44.016Z",
    "size": 5725,
    "path": "../public/assets/scss/components/_typography.scss"
  },
  "/assets/scss/layout/_about.scss": {
    "type": "text/x-scss; charset=utf-8",
    "etag": "\"56d-gE8BKMd5CJTbHnAecZKNQJcnKIE\"",
    "mtime": "2025-08-21T10:20:44.032Z",
    "size": 1389,
    "path": "../public/assets/scss/layout/_about.scss"
  },
  "/assets/scss/layout/_awards.scss": {
    "type": "text/x-scss; charset=utf-8",
    "etag": "\"492-C/0UpwMn+93okq2g9FysSIhfzZA\"",
    "mtime": "2025-08-21T10:20:44.032Z",
    "size": 1170,
    "path": "../public/assets/scss/layout/_awards.scss"
  },
  "/assets/scss/layout/_blog.scss": {
    "type": "text/x-scss; charset=utf-8",
    "etag": "\"1c36-3en0n1idgYqOZJnfCuzVLEf9s/8\"",
    "mtime": "2025-08-21T10:20:44.032Z",
    "size": 7222,
    "path": "../public/assets/scss/layout/_blog.scss"
  },
  "/assets/scss/layout/_brand.scss": {
    "type": "text/x-scss; charset=utf-8",
    "etag": "\"53a-86aPfJNqds8gLL2IiAMFy6mwNNg\"",
    "mtime": "2025-08-21T10:20:44.050Z",
    "size": 1338,
    "path": "../public/assets/scss/layout/_brand.scss"
  },
  "/assets/scss/layout/_career.scss": {
    "type": "text/x-scss; charset=utf-8",
    "etag": "\"0-2jmj7l5rSw0yVb/vlWAYkK/YBwk\"",
    "mtime": "2025-08-21T10:20:44.050Z",
    "size": 0,
    "path": "../public/assets/scss/layout/_career.scss"
  },
  "/assets/scss/layout/_clients.scss": {
    "type": "text/x-scss; charset=utf-8",
    "etag": "\"0-2jmj7l5rSw0yVb/vlWAYkK/YBwk\"",
    "mtime": "2025-08-21T10:20:44.050Z",
    "size": 0,
    "path": "../public/assets/scss/layout/_clients.scss"
  },
  "/assets/scss/layout/_contact.scss": {
    "type": "text/x-scss; charset=utf-8",
    "etag": "\"719-ucKMVe/Qgvy6JGwXmpgSdpFXgto\"",
    "mtime": "2025-08-21T10:20:44.050Z",
    "size": 1817,
    "path": "../public/assets/scss/layout/_contact.scss"
  },
  "/assets/scss/layout/_counter.scss": {
    "type": "text/x-scss; charset=utf-8",
    "etag": "\"a7-NuXM1qQZwM0F2bv8CILZ8uewMxo\"",
    "mtime": "2025-08-21T10:20:44.064Z",
    "size": 167,
    "path": "../public/assets/scss/layout/_counter.scss"
  },
  "/assets/scss/layout/_features.scss": {
    "type": "text/x-scss; charset=utf-8",
    "etag": "\"a17-5gRUrhZQMPjXJLv0rmQjpwCkyWQ\"",
    "mtime": "2025-08-21T10:20:44.064Z",
    "size": 2583,
    "path": "../public/assets/scss/layout/_features.scss"
  },
  "/assets/scss/layout/_footer.scss": {
    "type": "text/x-scss; charset=utf-8",
    "etag": "\"2ea-NfLetZPxCncAamaYJdBXPNsP+o8\"",
    "mtime": "2025-08-21T10:20:44.064Z",
    "size": 746,
    "path": "../public/assets/scss/layout/_footer.scss"
  },
  "/assets/scss/layout/_header.scss": {
    "type": "text/x-scss; charset=utf-8",
    "etag": "\"f98-FiK776MMJqY/Zv9THmkvRqQvInE\"",
    "mtime": "2025-08-21T10:20:44.080Z",
    "size": 3992,
    "path": "../public/assets/scss/layout/_header.scss"
  },
  "/assets/scss/layout/_hero.scss": {
    "type": "text/x-scss; charset=utf-8",
    "etag": "\"287-/0FLgOmekHLy6FaCYhqhf1Jd93s\"",
    "mtime": "2025-08-21T10:20:44.080Z",
    "size": 647,
    "path": "../public/assets/scss/layout/_hero.scss"
  },
  "/assets/scss/layout/_interactive.scss": {
    "type": "text/x-scss; charset=utf-8",
    "etag": "\"1e40-XTFLyIhz5lX1yuKUfjAaywwnbXI\"",
    "mtime": "2025-08-21T10:20:44.080Z",
    "size": 7744,
    "path": "../public/assets/scss/layout/_interactive.scss"
  },
  "/assets/scss/layout/_portfolio.scss": {
    "type": "text/x-scss; charset=utf-8",
    "etag": "\"14da-VgO6U5/GtOTKpt8c8l6RE8jp+n0\"",
    "mtime": "2025-08-21T10:20:44.080Z",
    "size": 5338,
    "path": "../public/assets/scss/layout/_portfolio.scss"
  },
  "/assets/scss/layout/_price.scss": {
    "type": "text/x-scss; charset=utf-8",
    "etag": "\"3d5-m44URTGDW3/NweUSsWMTCpHG/UY\"",
    "mtime": "2025-08-21T10:20:44.096Z",
    "size": 981,
    "path": "../public/assets/scss/layout/_price.scss"
  },
  "/assets/scss/layout/_process.scss": {
    "type": "text/x-scss; charset=utf-8",
    "etag": "\"53-yEzVD5q0JDNO3L/a+o0+TW6LKWU\"",
    "mtime": "2025-08-21T10:20:44.096Z",
    "size": 83,
    "path": "../public/assets/scss/layout/_process.scss"
  },
  "/assets/scss/layout/_services.scss": {
    "type": "text/x-scss; charset=utf-8",
    "etag": "\"74a-TKWthfvWLDIyraIso8e4n7qQhNs\"",
    "mtime": "2025-08-21T10:20:44.096Z",
    "size": 1866,
    "path": "../public/assets/scss/layout/_services.scss"
  },
  "/assets/scss/layout/_slider.scss": {
    "type": "text/x-scss; charset=utf-8",
    "etag": "\"25a1-JSHh7mcswksBwirWAqhdVsXJw1Y\"",
    "mtime": "2025-08-21T10:20:44.112Z",
    "size": 9633,
    "path": "../public/assets/scss/layout/_slider.scss"
  },
  "/assets/scss/layout/_team.scss": {
    "type": "text/x-scss; charset=utf-8",
    "etag": "\"309-7/2aVJESl1Z7B6J5GAcCRqyIB8o\"",
    "mtime": "2025-08-21T10:20:44.112Z",
    "size": 777,
    "path": "../public/assets/scss/layout/_team.scss"
  },
  "/assets/scss/layout/_testimonials.scss": {
    "type": "text/x-scss; charset=utf-8",
    "etag": "\"535-DyyyCjW9SVHkFceS07ioc/pR8ok\"",
    "mtime": "2025-08-21T10:20:44.112Z",
    "size": 1333,
    "path": "../public/assets/scss/layout/_testimonials.scss"
  },
  "/assets/scss/layout/_video.scss": {
    "type": "text/x-scss; charset=utf-8",
    "etag": "\"1c8-9GJWWndTvYjGFQ6HQ7GGclE515g\"",
    "mtime": "2025-08-21T10:20:44.123Z",
    "size": 456,
    "path": "../public/assets/scss/layout/_video.scss"
  },
  "/assets/scss/utility/_animation.scss": {
    "type": "text/x-scss; charset=utf-8",
    "etag": "\"0-2jmj7l5rSw0yVb/vlWAYkK/YBwk\"",
    "mtime": "2025-08-21T10:20:44.127Z",
    "size": 0,
    "path": "../public/assets/scss/utility/_animation.scss"
  },
  "/assets/scss/utility/_mixin.scss": {
    "type": "text/x-scss; charset=utf-8",
    "etag": "\"0-2jmj7l5rSw0yVb/vlWAYkK/YBwk\"",
    "mtime": "2025-08-21T10:20:44.127Z",
    "size": 0,
    "path": "../public/assets/scss/utility/_mixin.scss"
  },
  "/assets/scss/utility/_responsive.scss": {
    "type": "text/x-scss; charset=utf-8",
    "etag": "\"46c9-8uClvnRTU7jFfYp/sunZUYE8vz0\"",
    "mtime": "2025-08-21T10:20:44.143Z",
    "size": 18121,
    "path": "../public/assets/scss/utility/_responsive.scss"
  },
  "/assets/scss/utility/_theme-dark.scss": {
    "type": "text/x-scss; charset=utf-8",
    "etag": "\"0-2jmj7l5rSw0yVb/vlWAYkK/YBwk\"",
    "mtime": "2025-08-21T10:20:44.143Z",
    "size": 0,
    "path": "../public/assets/scss/utility/_theme-dark.scss"
  },
  "/assets/scss/utility/_variables.scss": {
    "type": "text/x-scss; charset=utf-8",
    "etag": "\"149-r48Sy1/rWSOtKC8qcG53Nwe3Fns\"",
    "mtime": "2025-08-21T10:20:44.143Z",
    "size": 329,
    "path": "../public/assets/scss/utility/_variables.scss"
  },
  "/imgs/works/full/Project3_2.jpg": {
    "type": "image/jpeg",
    "etag": "\"573c5-Tcw6vFDi8mOl51McELNWoSdCzRU\"",
    "mtime": "2025-09-27T20:41:38.233Z",
    "size": 357317,
    "path": "../public/imgs/works/full/Project3_2.jpg"
  },
  "/imgs/works/full/Project3_4.jpg": {
    "type": "image/jpeg",
    "etag": "\"289aa-HwtASGeOPJoh5SDkwTs3iTuup90\"",
    "mtime": "2025-09-27T20:41:38.233Z",
    "size": 166314,
    "path": "../public/imgs/works/full/Project3_4.jpg"
  },
  "/imgs/works/full/Project3_5.jpg": {
    "type": "image/jpeg",
    "etag": "\"2cde8-fkctu/fuDDu2rXBWXwgVOx5Un2o\"",
    "mtime": "2025-09-27T20:41:38.233Z",
    "size": 183784,
    "path": "../public/imgs/works/full/Project3_5.jpg"
  },
  "/imgs/works/full/Project3_6.jpg": {
    "type": "image/jpeg",
    "etag": "\"282f8-ig6aSi5Nh0Q+oYUY1+Hfqixj+Sw\"",
    "mtime": "2025-09-27T20:41:38.233Z",
    "size": 164600,
    "path": "../public/imgs/works/full/Project3_6.jpg"
  },
  "/imgs/works/full/Project3_7.jpg": {
    "type": "image/jpeg",
    "etag": "\"571a8-JRjlFZU5cVJSCiOd1shRZ/BOwKA\"",
    "mtime": "2025-09-27T20:41:38.233Z",
    "size": 356776,
    "path": "../public/imgs/works/full/Project3_7.jpg"
  },
  "/imgs/works/full/Project_1.jpg": {
    "type": "image/jpeg",
    "etag": "\"4040f-3EI+k6EO4rARoKUgqtOZsqiqEAw\"",
    "mtime": "2025-09-27T20:41:38.249Z",
    "size": 263183,
    "path": "../public/imgs/works/full/Project_1.jpg"
  },
  "/imgs/works/full/Project_1_2.jpg": {
    "type": "image/jpeg",
    "etag": "\"2fa58-Ly8erkiOLRiXzbEq0daQrjzag7E\"",
    "mtime": "2025-09-27T20:41:38.249Z",
    "size": 195160,
    "path": "../public/imgs/works/full/Project_1_2.jpg"
  },
  "/imgs/works/full/Project_1_3.jpg": {
    "type": "image/jpeg",
    "etag": "\"ddde-GTpUYkH9k7yyHXmlycih1y954ig\"",
    "mtime": "2025-09-27T20:41:38.252Z",
    "size": 56798,
    "path": "../public/imgs/works/full/Project_1_3.jpg"
  },
  "/imgs/works/full/Project_1_4.jpg": {
    "type": "image/jpeg",
    "etag": "\"1f575-pRei04DBGSLk0tfgM/fVdFddgeA\"",
    "mtime": "2025-09-27T20:41:38.252Z",
    "size": 128373,
    "path": "../public/imgs/works/full/Project_1_4.jpg"
  },
  "/imgs/works/full/Project_2.jpg": {
    "type": "image/jpeg",
    "etag": "\"c4af6-cdwEgz5cS14LQ3c76V/JeLGhfCQ\"",
    "mtime": "2025-09-27T20:41:38.254Z",
    "size": 805622,
    "path": "../public/imgs/works/full/Project_2.jpg"
  },
  "/imgs/works/full/Project_2_1.jpg": {
    "type": "image/jpeg",
    "etag": "\"2569c-ViWZaNXZwoyfkhNPGJRdeHxuXyE\"",
    "mtime": "2025-09-27T20:41:38.254Z",
    "size": 153244,
    "path": "../public/imgs/works/full/Project_2_1.jpg"
  },
  "/imgs/works/full/Project_2_2.jpg": {
    "type": "image/jpeg",
    "etag": "\"48403-4b3xvTGoSN/0HtluYOMqvAe5PDY\"",
    "mtime": "2025-09-27T20:41:38.264Z",
    "size": 295939,
    "path": "../public/imgs/works/full/Project_2_2.jpg"
  },
  "/imgs/works/full/Project_2_3.jpg": {
    "type": "image/jpeg",
    "etag": "\"173f1-XhQSH9r0Nx+xCHLOMapJyNUayjM\"",
    "mtime": "2025-09-27T20:41:38.266Z",
    "size": 95217,
    "path": "../public/imgs/works/full/Project_2_3.jpg"
  },
  "/imgs/works/full/Project_2_4.jpg": {
    "type": "image/jpeg",
    "etag": "\"1eef6-7lZyvXKKz8lRt1yc8LOgmBqKIYo\"",
    "mtime": "2025-09-27T20:41:38.268Z",
    "size": 126710,
    "path": "../public/imgs/works/full/Project_2_4.jpg"
  },
  "/imgs/works/full/Project_3.jpg": {
    "type": "image/jpeg",
    "etag": "\"573c5-Tcw6vFDi8mOl51McELNWoSdCzRU\"",
    "mtime": "2025-09-27T20:41:38.268Z",
    "size": 357317,
    "path": "../public/imgs/works/full/Project_3.jpg"
  },
  "/imgs/works/full/Project_3_1.jpg": {
    "type": "image/jpeg",
    "etag": "\"36e2a-OhNtvJOXysQ748vt2YPEGgHNDy4\"",
    "mtime": "2025-09-27T20:41:38.273Z",
    "size": 224810,
    "path": "../public/imgs/works/full/Project_3_1.jpg"
  },
  "/imgs/works/full/Project_3_2.jpg": {
    "type": "image/jpeg",
    "etag": "\"1cd56-+7tZiijvUH8y2Mf8to5kekwd4cQ\"",
    "mtime": "2025-09-27T20:41:38.273Z",
    "size": 118102,
    "path": "../public/imgs/works/full/Project_3_2.jpg"
  },
  "/imgs/works/full/Project_3_3.jpg": {
    "type": "image/jpeg",
    "etag": "\"1dc55-AGHSZyerCnE4vR+wkgYUAWFF6r0\"",
    "mtime": "2025-09-27T20:41:38.275Z",
    "size": 121941,
    "path": "../public/imgs/works/full/Project_3_3.jpg"
  },
  "/imgs/works/full/Project_4.jpg": {
    "type": "image/jpeg",
    "etag": "\"12468-+JtXnQV7DXl7Tmjhjonuha6XARg\"",
    "mtime": "2025-09-27T20:41:38.275Z",
    "size": 74856,
    "path": "../public/imgs/works/full/Project_4.jpg"
  },
  "/imgs/works/full/Project_4_1.jpg": {
    "type": "image/jpeg",
    "etag": "\"22fa8-JfgwtMq/y+RypSO0LWTYxDs7Lvk\"",
    "mtime": "2025-09-27T20:41:38.278Z",
    "size": 143272,
    "path": "../public/imgs/works/full/Project_4_1.jpg"
  },
  "/imgs/works/full/Project_4_2.jpg": {
    "type": "image/jpeg",
    "etag": "\"46d9f-EXYzAq7KRXFb285U9pSfDUsSfTg\"",
    "mtime": "2025-09-27T20:41:38.281Z",
    "size": 290207,
    "path": "../public/imgs/works/full/Project_4_2.jpg"
  },
  "/imgs/works/full/Project_4_3.jpg": {
    "type": "image/jpeg",
    "etag": "\"19119-kA6bFO/KcwT1geNbCZcu2M/b0ic\"",
    "mtime": "2025-09-27T20:41:38.283Z",
    "size": 102681,
    "path": "../public/imgs/works/full/Project_4_3.jpg"
  },
  "/imgs/works/full/Project_4_4.jpg": {
    "type": "image/jpeg",
    "etag": "\"23eab-rO8XJl1KbxU46eUP3BCg11igxos\"",
    "mtime": "2025-09-27T20:41:38.284Z",
    "size": 147115,
    "path": "../public/imgs/works/full/Project_4_4.jpg"
  },
  "/imgs/works/full/Project_5.jpg": {
    "type": "image/jpeg",
    "etag": "\"8d128-3UDSVN74vqzbY6pSqM+43UxLvKQ\"",
    "mtime": "2025-09-27T20:41:38.288Z",
    "size": 577832,
    "path": "../public/imgs/works/full/Project_5.jpg"
  },
  "/imgs/works/full/Project_5_1.jpg": {
    "type": "image/jpeg",
    "etag": "\"388b3-wcOfXDM90ycpImTVYg01aj5GSbs\"",
    "mtime": "2025-09-27T20:41:38.290Z",
    "size": 231603,
    "path": "../public/imgs/works/full/Project_5_1.jpg"
  },
  "/imgs/works/full/Project_5_2.jpg": {
    "type": "image/jpeg",
    "etag": "\"41510-uwSchByiwlQBUTtdbhRQsz3jYAk\"",
    "mtime": "2025-09-27T20:41:38.291Z",
    "size": 267536,
    "path": "../public/imgs/works/full/Project_5_2.jpg"
  },
  "/imgs/works/full/Project_5_3.jpg": {
    "type": "image/jpeg",
    "etag": "\"31b3f-i6ns+tAsbpQjBv0e7m9US3+Bes4\"",
    "mtime": "2025-09-27T20:41:38.293Z",
    "size": 203583,
    "path": "../public/imgs/works/full/Project_5_3.jpg"
  },
  "/imgs/works/full/Project_5_4.jpg": {
    "type": "image/jpeg",
    "etag": "\"5e5b4-Bpx2OfIrR4BcrrhCTJ4IxWg/uKE\"",
    "mtime": "2025-09-27T20:41:38.302Z",
    "size": 386484,
    "path": "../public/imgs/works/full/Project_5_4.jpg"
  },
  "/imgs/works/full/Project_5_5.jpg": {
    "type": "image/jpeg",
    "etag": "\"6f77f-oK8MMfo632c8HC+Rpn6JRuxU9Wg\"",
    "mtime": "2025-09-27T20:41:38.305Z",
    "size": 456575,
    "path": "../public/imgs/works/full/Project_5_5.jpg"
  },
  "/imgs/works/full/Project_6.jpg": {
    "type": "image/jpeg",
    "etag": "\"1964e-hJX6sJpGIc/JpIt3k++qQI6PlxM\"",
    "mtime": "2025-09-27T20:41:38.307Z",
    "size": 104014,
    "path": "../public/imgs/works/full/Project_6.jpg"
  },
  "/imgs/works/full/Project_6_1.jpg": {
    "type": "image/jpeg",
    "etag": "\"fce33-b67gSWpCGk5c5OSKowu9sD0kiPc\"",
    "mtime": "2025-09-27T20:41:38.311Z",
    "size": 1035827,
    "path": "../public/imgs/works/full/Project_6_1.jpg"
  },
  "/imgs/works/full/Project_6_2.jpg": {
    "type": "image/jpeg",
    "etag": "\"4b0f8-x1+bPt8K0M4TwNibdgCJMPNsGhc\"",
    "mtime": "2025-09-27T20:41:38.311Z",
    "size": 307448,
    "path": "../public/imgs/works/full/Project_6_2.jpg"
  },
  "/imgs/works/full/Project_6_3.jpg": {
    "type": "image/jpeg",
    "etag": "\"1ad5b-RosjqvYUPGrIsWH16aVVG+b39gU\"",
    "mtime": "2025-09-27T20:41:38.311Z",
    "size": 109915,
    "path": "../public/imgs/works/full/Project_6_3.jpg"
  },
  "/imgs/works/full/vid.mp4": {
    "type": "video/mp4",
    "etag": "\"43c7130-MIVebWPAcgYxWU9kirEleZd/RAI\"",
    "mtime": "2025-09-27T20:41:38.594Z",
    "size": 71070000,
    "path": "../public/imgs/works/full/vid.mp4"
  },
  "/imgs/works/full/vid.png": {
    "type": "image/png",
    "etag": "\"92ee0-FEKIcd3hvxDq+Dpfk9dFBPayE64\"",
    "mtime": "2025-09-27T20:41:38.594Z",
    "size": 601824,
    "path": "../public/imgs/works/full/vid.png"
  },
  "/_nuxt/builds/meta/fd4cda3b-4973-41b5-b98f-c9e6d8e6d376.json": {
    "type": "application/json",
    "etag": "\"8b-lVBnxNUHzTgkGgUBknlyXX5rsJo\"",
    "mtime": "2025-09-28T19:30:28.903Z",
    "size": 139,
    "path": "../public/_nuxt/builds/meta/fd4cda3b-4973-41b5-b98f-c9e6d8e6d376.json"
  },
  "/landing-preview/img/header/1.jpg": {
    "type": "image/jpeg",
    "etag": "\"edce-uqmG5sLpL7jqJHVy6OMnBkLGe4E\"",
    "mtime": "2025-08-21T10:20:44.538Z",
    "size": 60878,
    "path": "../public/landing-preview/img/header/1.jpg"
  },
  "/landing-preview/img/header/10.jpg": {
    "type": "image/jpeg",
    "etag": "\"cd29-o426R7zX/sqa2xLzGoynkYVq7OU\"",
    "mtime": "2025-08-21T10:20:44.538Z",
    "size": 52521,
    "path": "../public/landing-preview/img/header/10.jpg"
  },
  "/landing-preview/img/header/11.jpg": {
    "type": "image/jpeg",
    "etag": "\"13f80-kwJDW+xSsHpiQoWbYjdV9RifsdI\"",
    "mtime": "2025-08-21T10:20:44.554Z",
    "size": 81792,
    "path": "../public/landing-preview/img/header/11.jpg"
  },
  "/landing-preview/img/header/12.jpg": {
    "type": "image/jpeg",
    "etag": "\"60bf-QHOYJmxWT3X0iwYxhtJfZgKz5lk\"",
    "mtime": "2025-08-21T10:20:44.554Z",
    "size": 24767,
    "path": "../public/landing-preview/img/header/12.jpg"
  },
  "/landing-preview/img/header/13.jpg": {
    "type": "image/jpeg",
    "etag": "\"646b-cw8lMGyEGBOUousTx+qmSauJr1k\"",
    "mtime": "2025-08-21T10:20:44.554Z",
    "size": 25707,
    "path": "../public/landing-preview/img/header/13.jpg"
  },
  "/landing-preview/img/header/14.jpg": {
    "type": "image/jpeg",
    "etag": "\"5295-+r9Q3Kg4GjVzJT2KvwVD+dIvoNw\"",
    "mtime": "2025-08-21T10:20:44.554Z",
    "size": 21141,
    "path": "../public/landing-preview/img/header/14.jpg"
  },
  "/landing-preview/img/header/15.jpg": {
    "type": "image/jpeg",
    "etag": "\"c465-/SRRhel6o9nutvZkIYgv6kbFgcY\"",
    "mtime": "2025-08-21T10:20:44.570Z",
    "size": 50277,
    "path": "../public/landing-preview/img/header/15.jpg"
  },
  "/landing-preview/img/header/16.jpg": {
    "type": "image/jpeg",
    "etag": "\"10550-n1xvcm/2fMQjAJQx2W1zakDIlbk\"",
    "mtime": "2025-08-21T10:20:44.570Z",
    "size": 66896,
    "path": "../public/landing-preview/img/header/16.jpg"
  },
  "/landing-preview/img/header/17.jpg": {
    "type": "image/jpeg",
    "etag": "\"533a-S2ZJGZvSLO5nSYSNiTbwzbmS4wE\"",
    "mtime": "2025-08-21T10:20:44.570Z",
    "size": 21306,
    "path": "../public/landing-preview/img/header/17.jpg"
  },
  "/landing-preview/img/header/2.jpg": {
    "type": "image/jpeg",
    "etag": "\"120f4-30HrMVcOQaChspDeBt88GUWy+/0\"",
    "mtime": "2025-08-21T10:20:44.586Z",
    "size": 73972,
    "path": "../public/landing-preview/img/header/2.jpg"
  },
  "/landing-preview/img/header/3.jpg": {
    "type": "image/jpeg",
    "etag": "\"c8fe-sRn/puiKaOBM/XXuQtqMSlawodQ\"",
    "mtime": "2025-08-21T10:20:44.586Z",
    "size": 51454,
    "path": "../public/landing-preview/img/header/3.jpg"
  },
  "/landing-preview/img/header/4.jpg": {
    "type": "image/jpeg",
    "etag": "\"e772-g3qsGy/8VPsfVSJ1c2r/cuJDhpk\"",
    "mtime": "2025-08-21T10:20:44.586Z",
    "size": 59250,
    "path": "../public/landing-preview/img/header/4.jpg"
  },
  "/landing-preview/img/header/5.jpg": {
    "type": "image/jpeg",
    "etag": "\"18416-0IcQxjR3oxQnwgTY1KWDRvmIe0A\"",
    "mtime": "2025-08-21T10:20:44.602Z",
    "size": 99350,
    "path": "../public/landing-preview/img/header/5.jpg"
  },
  "/landing-preview/img/header/6.jpg": {
    "type": "image/jpeg",
    "etag": "\"10d5c-Q+yzweGkHGvaoFg9NtjoD/D3OFs\"",
    "mtime": "2025-08-21T10:20:44.608Z",
    "size": 68956,
    "path": "../public/landing-preview/img/header/6.jpg"
  },
  "/landing-preview/img/header/7.jpg": {
    "type": "image/jpeg",
    "etag": "\"1132c-O33d1uSdbt3RT+rP/LlQspYrUmA\"",
    "mtime": "2025-08-21T10:20:44.608Z",
    "size": 70444,
    "path": "../public/landing-preview/img/header/7.jpg"
  },
  "/landing-preview/img/header/8.jpg": {
    "type": "image/jpeg",
    "etag": "\"166df-6mHRmdOuG5WEVTqE5WJbpVF/dos\"",
    "mtime": "2025-08-21T10:20:44.608Z",
    "size": 91871,
    "path": "../public/landing-preview/img/header/8.jpg"
  },
  "/landing-preview/img/header/9.jpg": {
    "type": "image/jpeg",
    "etag": "\"177ab-pwM9a3dCQrEI+AJgV8VMXCUnTA4\"",
    "mtime": "2025-08-21T10:20:44.618Z",
    "size": 96171,
    "path": "../public/landing-preview/img/header/9.jpg"
  },
  "/landing-preview/img/header/overlay.webp": {
    "type": "image/webp",
    "etag": "\"3a50-jjRkfvEKV+/nr3DIUC870zwe8NA\"",
    "mtime": "2025-08-21T10:20:44.618Z",
    "size": 14928,
    "path": "../public/landing-preview/img/header/overlay.webp"
  },
  "/landing-preview/img/demos/1.jpg": {
    "type": "image/jpeg",
    "etag": "\"b3cc-+wyFurka0XVOpRPebiD5lUW4YaM\"",
    "mtime": "2025-08-21T10:20:44.460Z",
    "size": 46028,
    "path": "../public/landing-preview/img/demos/1.jpg"
  },
  "/landing-preview/img/demos/10.jpg": {
    "type": "image/jpeg",
    "etag": "\"cf54-T5Tmn3e6ssLaIQX+sK2KCzYjYfM\"",
    "mtime": "2025-08-21T10:20:44.460Z",
    "size": 53076,
    "path": "../public/landing-preview/img/demos/10.jpg"
  },
  "/landing-preview/img/demos/11.jpg": {
    "type": "image/jpeg",
    "etag": "\"5769-ixsRfysiE9xfL6lxqXoelAkDCkc\"",
    "mtime": "2025-08-21T10:20:44.460Z",
    "size": 22377,
    "path": "../public/landing-preview/img/demos/11.jpg"
  },
  "/landing-preview/img/demos/12.jpg": {
    "type": "image/jpeg",
    "etag": "\"c3cc-RmAw+BugRY5L5s6lBCbcE/OFn28\"",
    "mtime": "2025-08-21T10:20:44.460Z",
    "size": 50124,
    "path": "../public/landing-preview/img/demos/12.jpg"
  },
  "/landing-preview/img/demos/13.jpg": {
    "type": "image/jpeg",
    "etag": "\"8ee0-JjjQgysysUIfzO7rxZdpSaTIddA\"",
    "mtime": "2025-08-21T10:20:44.476Z",
    "size": 36576,
    "path": "../public/landing-preview/img/demos/13.jpg"
  },
  "/landing-preview/img/demos/2.jpg": {
    "type": "image/jpeg",
    "etag": "\"120f4-30HrMVcOQaChspDeBt88GUWy+/0\"",
    "mtime": "2025-08-21T10:20:44.476Z",
    "size": 73972,
    "path": "../public/landing-preview/img/demos/2.jpg"
  },
  "/landing-preview/img/demos/3.jpg": {
    "type": "image/jpeg",
    "etag": "\"c8fe-sRn/puiKaOBM/XXuQtqMSlawodQ\"",
    "mtime": "2025-08-21T10:20:44.476Z",
    "size": 51454,
    "path": "../public/landing-preview/img/demos/3.jpg"
  },
  "/landing-preview/img/demos/4.jpg": {
    "type": "image/jpeg",
    "etag": "\"e772-g3qsGy/8VPsfVSJ1c2r/cuJDhpk\"",
    "mtime": "2025-08-21T10:20:44.491Z",
    "size": 59250,
    "path": "../public/landing-preview/img/demos/4.jpg"
  },
  "/landing-preview/img/demos/5.jpg": {
    "type": "image/jpeg",
    "etag": "\"18416-0IcQxjR3oxQnwgTY1KWDRvmIe0A\"",
    "mtime": "2025-08-21T10:20:44.499Z",
    "size": 99350,
    "path": "../public/landing-preview/img/demos/5.jpg"
  },
  "/landing-preview/img/demos/6.jpg": {
    "type": "image/jpeg",
    "etag": "\"10d5c-Q+yzweGkHGvaoFg9NtjoD/D3OFs\"",
    "mtime": "2025-08-21T10:20:44.499Z",
    "size": 68956,
    "path": "../public/landing-preview/img/demos/6.jpg"
  },
  "/landing-preview/img/demos/7.jpg": {
    "type": "image/jpeg",
    "etag": "\"1132c-O33d1uSdbt3RT+rP/LlQspYrUmA\"",
    "mtime": "2025-08-21T10:20:44.509Z",
    "size": 70444,
    "path": "../public/landing-preview/img/demos/7.jpg"
  },
  "/landing-preview/img/demos/8.jpg": {
    "type": "image/jpeg",
    "etag": "\"166df-6mHRmdOuG5WEVTqE5WJbpVF/dos\"",
    "mtime": "2025-08-21T10:20:44.516Z",
    "size": 91871,
    "path": "../public/landing-preview/img/demos/8.jpg"
  },
  "/landing-preview/img/demos/9.jpg": {
    "type": "image/jpeg",
    "etag": "\"7646-YEoCuKZA3ujMYbpgcqgG41tMQN4\"",
    "mtime": "2025-08-21T10:20:44.520Z",
    "size": 30278,
    "path": "../public/landing-preview/img/demos/9.jpg"
  },
  "/landing-preview/img/demos/h1.jpg": {
    "type": "image/jpeg",
    "etag": "\"13d1c-/3rHMN7jj9832Sys8kyVrU0/Dg0\"",
    "mtime": "2025-08-21T10:20:44.522Z",
    "size": 81180,
    "path": "../public/landing-preview/img/demos/h1.jpg"
  },
  "/landing-preview/img/demos/h2.jpg": {
    "type": "image/jpeg",
    "etag": "\"eac1-LeC9OWfHh8+kvoja1k2koSWipio\"",
    "mtime": "2025-08-21T10:20:44.522Z",
    "size": 60097,
    "path": "../public/landing-preview/img/demos/h2.jpg"
  },
  "/landing-preview/img/demos/h3.jpg": {
    "type": "image/jpeg",
    "etag": "\"ad54-racGGgiluFCDy+CGR/cx97Zpk8M\"",
    "mtime": "2025-08-21T10:20:44.522Z",
    "size": 44372,
    "path": "../public/landing-preview/img/demos/h3.jpg"
  }
};

const _DRIVE_LETTER_START_RE = /^[A-Za-z]:\//;
function normalizeWindowsPath(input = "") {
  if (!input) {
    return input;
  }
  return input.replace(/\\/g, "/").replace(_DRIVE_LETTER_START_RE, (r) => r.toUpperCase());
}
const _IS_ABSOLUTE_RE = /^[/\\](?![/\\])|^[/\\]{2}(?!\.)|^[A-Za-z]:[/\\]/;
const _DRIVE_LETTER_RE = /^[A-Za-z]:$/;
const _ROOT_FOLDER_RE = /^\/([A-Za-z]:)?$/;
function cwd() {
  if (typeof process !== "undefined" && typeof process.cwd === "function") {
    return process.cwd().replace(/\\/g, "/");
  }
  return "/";
}
const resolve = function(...arguments_) {
  arguments_ = arguments_.map((argument) => normalizeWindowsPath(argument));
  let resolvedPath = "";
  let resolvedAbsolute = false;
  for (let index = arguments_.length - 1; index >= -1 && !resolvedAbsolute; index--) {
    const path = index >= 0 ? arguments_[index] : cwd();
    if (!path || path.length === 0) {
      continue;
    }
    resolvedPath = `${path}/${resolvedPath}`;
    resolvedAbsolute = isAbsolute(path);
  }
  resolvedPath = normalizeString(resolvedPath, !resolvedAbsolute);
  if (resolvedAbsolute && !isAbsolute(resolvedPath)) {
    return `/${resolvedPath}`;
  }
  return resolvedPath.length > 0 ? resolvedPath : ".";
};
function normalizeString(path, allowAboveRoot) {
  let res = "";
  let lastSegmentLength = 0;
  let lastSlash = -1;
  let dots = 0;
  let char = null;
  for (let index = 0; index <= path.length; ++index) {
    if (index < path.length) {
      char = path[index];
    } else if (char === "/") {
      break;
    } else {
      char = "/";
    }
    if (char === "/") {
      if (lastSlash === index - 1 || dots === 1) ; else if (dots === 2) {
        if (res.length < 2 || lastSegmentLength !== 2 || res[res.length - 1] !== "." || res[res.length - 2] !== ".") {
          if (res.length > 2) {
            const lastSlashIndex = res.lastIndexOf("/");
            if (lastSlashIndex === -1) {
              res = "";
              lastSegmentLength = 0;
            } else {
              res = res.slice(0, lastSlashIndex);
              lastSegmentLength = res.length - 1 - res.lastIndexOf("/");
            }
            lastSlash = index;
            dots = 0;
            continue;
          } else if (res.length > 0) {
            res = "";
            lastSegmentLength = 0;
            lastSlash = index;
            dots = 0;
            continue;
          }
        }
        if (allowAboveRoot) {
          res += res.length > 0 ? "/.." : "..";
          lastSegmentLength = 2;
        }
      } else {
        if (res.length > 0) {
          res += `/${path.slice(lastSlash + 1, index)}`;
        } else {
          res = path.slice(lastSlash + 1, index);
        }
        lastSegmentLength = index - lastSlash - 1;
      }
      lastSlash = index;
      dots = 0;
    } else if (char === "." && dots !== -1) {
      ++dots;
    } else {
      dots = -1;
    }
  }
  return res;
}
const isAbsolute = function(p) {
  return _IS_ABSOLUTE_RE.test(p);
};
const relative = function(from, to) {
  const _from = resolve(from).replace(_ROOT_FOLDER_RE, "$1").split("/");
  const _to = resolve(to).replace(_ROOT_FOLDER_RE, "$1").split("/");
  if (_to[0][1] === ":" && _from[0][1] === ":" && _from[0] !== _to[0]) {
    return _to.join("/");
  }
  const _fromCopy = [..._from];
  for (const segment of _fromCopy) {
    if (_to[0] !== segment) {
      break;
    }
    _from.shift();
    _to.shift();
  }
  return [..._from.map(() => ".."), ..._to].join("/");
};
const dirname = function(p) {
  const segments = normalizeWindowsPath(p).replace(/\/$/, "").split("/").slice(0, -1);
  if (segments.length === 1 && _DRIVE_LETTER_RE.test(segments[0])) {
    segments[0] += "/";
  }
  return segments.join("/") || (isAbsolute(p) ? "/" : ".");
};

function readAsset (id) {
  const serverDir = dirname(fileURLToPath(globalThis._importMeta_.url));
  return promises.readFile(resolve(serverDir, assets[id].path))
}

const publicAssetBases = {"/_nuxt/builds/meta/":{"maxAge":31536000},"/_nuxt/builds/":{"maxAge":1},"/_nuxt/":{"maxAge":31536000}};

function isPublicAssetURL(id = '') {
  if (assets[id]) {
    return true
  }
  for (const base in publicAssetBases) {
    if (id.startsWith(base)) { return true }
  }
  return false
}

function getAsset (id) {
  return assets[id]
}

const METHODS = /* @__PURE__ */ new Set(["HEAD", "GET"]);
const EncodingMap = { gzip: ".gz", br: ".br" };
const _xBw17m = eventHandler((event) => {
  if (event.method && !METHODS.has(event.method)) {
    return;
  }
  let id = decodePath(
    withLeadingSlash(withoutTrailingSlash(parseURL(event.path).pathname))
  );
  let asset;
  const encodingHeader = String(
    getRequestHeader(event, "accept-encoding") || ""
  );
  const encodings = [
    ...encodingHeader.split(",").map((e) => EncodingMap[e.trim()]).filter(Boolean).sort(),
    ""
  ];
  if (encodings.length > 1) {
    appendResponseHeader(event, "Vary", "Accept-Encoding");
  }
  for (const encoding of encodings) {
    for (const _id of [id + encoding, joinURL(id, "index.html" + encoding)]) {
      const _asset = getAsset(_id);
      if (_asset) {
        asset = _asset;
        id = _id;
        break;
      }
    }
  }
  if (!asset) {
    if (isPublicAssetURL(id)) {
      removeResponseHeader(event, "Cache-Control");
      throw createError$1({ statusCode: 404 });
    }
    return;
  }
  const ifNotMatch = getRequestHeader(event, "if-none-match") === asset.etag;
  if (ifNotMatch) {
    setResponseStatus(event, 304, "Not Modified");
    return "";
  }
  const ifModifiedSinceH = getRequestHeader(event, "if-modified-since");
  const mtimeDate = new Date(asset.mtime);
  if (ifModifiedSinceH && asset.mtime && new Date(ifModifiedSinceH) >= mtimeDate) {
    setResponseStatus(event, 304, "Not Modified");
    return "";
  }
  if (asset.type && !getResponseHeader(event, "Content-Type")) {
    setResponseHeader(event, "Content-Type", asset.type);
  }
  if (asset.etag && !getResponseHeader(event, "ETag")) {
    setResponseHeader(event, "ETag", asset.etag);
  }
  if (asset.mtime && !getResponseHeader(event, "Last-Modified")) {
    setResponseHeader(event, "Last-Modified", mtimeDate.toUTCString());
  }
  if (asset.encoding && !getResponseHeader(event, "Content-Encoding")) {
    setResponseHeader(event, "Content-Encoding", asset.encoding);
  }
  if (asset.size > 0 && !getResponseHeader(event, "Content-Length")) {
    setResponseHeader(event, "Content-Length", asset.size);
  }
  return readAsset(id);
});

const storage = prefixStorage(useStorage(), "i18n");
function cachedFunctionI18n(fn, opts) {
  opts = { maxAge: 1, ...opts };
  const pending = {};
  async function get(key, resolver) {
    const isPending = pending[key];
    if (!isPending) {
      pending[key] = Promise.resolve(resolver());
    }
    try {
      return await pending[key];
    } finally {
      delete pending[key];
    }
  }
  return async (...args) => {
    const key = [opts.name, opts.getKey(...args)].join(":").replace(/:\/$/, ":index");
    const maxAge = opts.maxAge ?? 1;
    const isCacheable = !opts.shouldBypassCache(...args) && maxAge >= 0;
    const cache = isCacheable && await storage.getItemRaw(key);
    if (!cache || cache.ttl < Date.now()) {
      pending[key] = Promise.resolve(fn(...args));
      const value = await get(key, () => fn(...args));
      if (isCacheable) {
        await storage.setItemRaw(key, { ttl: Date.now() + maxAge * 1e3, value, mtime: Date.now() });
      }
      return value;
    }
    return cache.value;
  };
}

const _getMessages = async (locale) => {
  return { [locale]: await getLocaleMessagesMerged(locale, localeLoaders[locale]) };
};
const _getMessagesCached = cachedFunctionI18n(_getMessages, {
  name: "messages",
  maxAge: 60 * 60 * 24,
  getKey: (locale) => locale,
  shouldBypassCache: (locale) => !isLocaleCacheable(locale)
});
const getMessages = _getMessagesCached;
const _getMergedMessages = async (locale, fallbackLocales) => {
  const merged = {};
  try {
    if (fallbackLocales.length > 0) {
      const messages = await Promise.all(fallbackLocales.map(getMessages));
      for (const message2 of messages) {
        deepCopy(message2, merged);
      }
    }
    const message = await getMessages(locale);
    deepCopy(message, merged);
    return merged;
  } catch (e) {
    throw new Error("Failed to merge messages: " + e.message);
  }
};
const getMergedMessages = cachedFunctionI18n(_getMergedMessages, {
  name: "merged-single",
  maxAge: 60 * 60 * 24,
  getKey: (locale, fallbackLocales) => `${locale}-[${[...new Set(fallbackLocales)].sort().join("-")}]`,
  shouldBypassCache: (locale, fallbackLocales) => !isLocaleWithFallbacksCacheable(locale, fallbackLocales)
});
const _getAllMergedMessages = async (locales) => {
  const merged = {};
  try {
    const messages = await Promise.all(locales.map(getMessages));
    for (const message of messages) {
      deepCopy(message, merged);
    }
    return merged;
  } catch (e) {
    throw new Error("Failed to merge messages: " + e.message);
  }
};
cachedFunctionI18n(_getAllMergedMessages, {
  name: "merged-all",
  maxAge: 60 * 60 * 24,
  getKey: (locales) => locales.join("-"),
  shouldBypassCache: (locales) => !locales.every((locale) => isLocaleCacheable(locale))
});

const _messagesHandler = defineEventHandler(async (event) => {
  const locale = getRouterParam(event, "locale");
  if (!locale) {
    throw createError$1({ status: 400, message: "Locale not specified." });
  }
  const ctx = useI18nContext(event);
  if (ctx.localeConfigs && locale in ctx.localeConfigs === false) {
    throw createError$1({ status: 404, message: `Locale '${locale}' not found.` });
  }
  const messages = await getMergedMessages(locale, ctx.localeConfigs?.[locale]?.fallbacks ?? []);
  deepCopy(messages, ctx.messages);
  return ctx.messages;
});
const _cachedMessageLoader = defineCachedFunction(_messagesHandler, {
  name: "i18n:messages-internal",
  maxAge: 60 * 60 * 24,
  getKey: (event) => [getRouterParam(event, "locale") ?? "null", getRouterParam(event, "hash") ?? "null"].join("-"),
  shouldBypassCache(event) {
    const locale = getRouterParam(event, "locale");
    if (locale == null) return false;
    return !useI18nContext(event).localeConfigs?.[locale]?.cacheable;
  }
});
const _messagesHandlerCached = defineCachedEventHandler(_cachedMessageLoader, {
  name: "i18n:messages",
  maxAge: 10,
  swr: false,
  getKey: (event) => [getRouterParam(event, "locale") ?? "null", getRouterParam(event, "hash") ?? "null"].join("-")
});
const _v_ymJL = _messagesHandlerCached;

const _SxA8c9 = defineEventHandler(() => {});

const _lazy_oVBJ0n = () => import('../routes/renderer.mjs').then(function (n) { return n.r; });

const handlers = [
  { route: '', handler: _xBw17m, lazy: false, middleware: true, method: undefined },
  { route: '/__nuxt_error', handler: _lazy_oVBJ0n, lazy: true, middleware: false, method: undefined },
  { route: '/_i18n/:hash/:locale/messages.json', handler: _v_ymJL, lazy: false, middleware: false, method: undefined },
  { route: '/__nuxt_island/**', handler: _SxA8c9, lazy: false, middleware: false, method: undefined },
  { route: '/**', handler: _lazy_oVBJ0n, lazy: true, middleware: false, method: undefined }
];

function createNitroApp() {
  const config = useRuntimeConfig();
  const hooks = createHooks();
  const captureError = (error, context = {}) => {
    const promise = hooks.callHookParallel("error", error, context).catch((error_) => {
      console.error("Error while capturing another error", error_);
    });
    if (context.event && isEvent(context.event)) {
      const errors = context.event.context.nitro?.errors;
      if (errors) {
        errors.push({ error, context });
      }
      if (context.event.waitUntil) {
        context.event.waitUntil(promise);
      }
    }
  };
  const h3App = createApp({
    debug: destr(false),
    onError: (error, event) => {
      captureError(error, { event, tags: ["request"] });
      return errorHandler(error, event);
    },
    onRequest: async (event) => {
      event.context.nitro = event.context.nitro || { errors: [] };
      const fetchContext = event.node.req?.__unenv__;
      if (fetchContext?._platform) {
        event.context = {
          _platform: fetchContext?._platform,
          // #3335
          ...fetchContext._platform,
          ...event.context
        };
      }
      if (!event.context.waitUntil && fetchContext?.waitUntil) {
        event.context.waitUntil = fetchContext.waitUntil;
      }
      event.fetch = (req, init) => fetchWithEvent(event, req, init, { fetch: localFetch });
      event.$fetch = (req, init) => fetchWithEvent(event, req, init, {
        fetch: $fetch
      });
      event.waitUntil = (promise) => {
        if (!event.context.nitro._waitUntilPromises) {
          event.context.nitro._waitUntilPromises = [];
        }
        event.context.nitro._waitUntilPromises.push(promise);
        if (event.context.waitUntil) {
          event.context.waitUntil(promise);
        }
      };
      event.captureError = (error, context) => {
        captureError(error, { event, ...context });
      };
      await nitroApp.hooks.callHook("request", event).catch((error) => {
        captureError(error, { event, tags: ["request"] });
      });
    },
    onBeforeResponse: async (event, response) => {
      await nitroApp.hooks.callHook("beforeResponse", event, response).catch((error) => {
        captureError(error, { event, tags: ["request", "response"] });
      });
    },
    onAfterResponse: async (event, response) => {
      await nitroApp.hooks.callHook("afterResponse", event, response).catch((error) => {
        captureError(error, { event, tags: ["request", "response"] });
      });
    }
  });
  const router = createRouter({
    preemptive: true
  });
  const nodeHandler = toNodeListener(h3App);
  const localCall = (aRequest) => b(
    nodeHandler,
    aRequest
  );
  const localFetch = (input, init) => {
    if (!input.toString().startsWith("/")) {
      return globalThis.fetch(input, init);
    }
    return C(
      nodeHandler,
      input,
      init
    ).then((response) => normalizeFetchResponse(response));
  };
  const $fetch = createFetch({
    fetch: localFetch,
    Headers: Headers$1,
    defaults: { baseURL: config.app.baseURL }
  });
  globalThis.$fetch = $fetch;
  h3App.use(createRouteRulesHandler({ localFetch }));
  for (const h of handlers) {
    let handler = h.lazy ? lazyEventHandler(h.handler) : h.handler;
    if (h.middleware || !h.route) {
      const middlewareBase = (config.app.baseURL + (h.route || "/")).replace(
        /\/+/g,
        "/"
      );
      h3App.use(middlewareBase, handler);
    } else {
      const routeRules = getRouteRulesForPath(
        h.route.replace(/:\w+|\*\*/g, "_")
      );
      if (routeRules.cache) {
        handler = cachedEventHandler(handler, {
          group: "nitro/routes",
          ...routeRules.cache
        });
      }
      router.use(h.route, handler, h.method);
    }
  }
  h3App.use(config.app.baseURL, router.handler);
  const app = {
    hooks,
    h3App,
    router,
    localCall,
    localFetch,
    captureError
  };
  return app;
}
function runNitroPlugins(nitroApp2) {
  for (const plugin of plugins) {
    try {
      plugin(nitroApp2);
    } catch (error) {
      nitroApp2.captureError(error, { tags: ["plugin"] });
      throw error;
    }
  }
}
const nitroApp = createNitroApp();
function useNitroApp() {
  return nitroApp;
}
runNitroPlugins(nitroApp);

function defineNitroPlugin(def) {
  return def;
}

function defineRenderHandler(render) {
  const runtimeConfig = useRuntimeConfig();
  return eventHandler(async (event) => {
    const nitroApp = useNitroApp();
    const ctx = { event, render, response: void 0 };
    await nitroApp.hooks.callHook("render:before", ctx);
    if (!ctx.response) {
      if (event.path === `${runtimeConfig.app.baseURL}favicon.ico`) {
        setResponseHeader(event, "Content-Type", "image/x-icon");
        return send(
          event,
          "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"
        );
      }
      ctx.response = await ctx.render(event);
      if (!ctx.response) {
        const _currentStatus = getResponseStatus(event);
        setResponseStatus(event, _currentStatus === 200 ? 500 : _currentStatus);
        return send(
          event,
          "No response returned from render handler: " + event.path
        );
      }
    }
    await nitroApp.hooks.callHook("render:response", ctx.response, ctx);
    if (ctx.response.headers) {
      setResponseHeaders(event, ctx.response.headers);
    }
    if (ctx.response.statusCode || ctx.response.statusMessage) {
      setResponseStatus(
        event,
        ctx.response.statusCode,
        ctx.response.statusMessage
      );
    }
    return ctx.response.body;
  });
}

const debug = (...args) => {
};
function GracefulShutdown(server, opts) {
  opts = opts || {};
  const options = Object.assign(
    {
      signals: "SIGINT SIGTERM",
      timeout: 3e4,
      development: false,
      forceExit: true,
      onShutdown: (signal) => Promise.resolve(signal),
      preShutdown: (signal) => Promise.resolve(signal)
    },
    opts
  );
  let isShuttingDown = false;
  const connections = {};
  let connectionCounter = 0;
  const secureConnections = {};
  let secureConnectionCounter = 0;
  let failed = false;
  let finalRun = false;
  function onceFactory() {
    let called = false;
    return (emitter, events, callback) => {
      function call() {
        if (!called) {
          called = true;
          return Reflect.apply(callback, this, arguments);
        }
      }
      for (const e of events) {
        emitter.on(e, call);
      }
    };
  }
  const signals = options.signals.split(" ").map((s) => s.trim()).filter((s) => s.length > 0);
  const once = onceFactory();
  once(process, signals, (signal) => {
    debug("received shut down signal", signal);
    shutdown(signal).then(() => {
      if (options.forceExit) {
        process.exit(failed ? 1 : 0);
      }
    }).catch((error) => {
      debug("server shut down error occurred", error);
      process.exit(1);
    });
  });
  function isFunction(functionToCheck) {
    const getType = Object.prototype.toString.call(functionToCheck);
    return /^\[object\s([A-Za-z]+)?Function]$/.test(getType);
  }
  function destroy(socket, force = false) {
    if (socket._isIdle && isShuttingDown || force) {
      socket.destroy();
      if (socket.server instanceof http.Server) {
        delete connections[socket._connectionId];
      } else {
        delete secureConnections[socket._connectionId];
      }
    }
  }
  function destroyAllConnections(force = false) {
    debug("Destroy Connections : " + (force ? "forced close" : "close"));
    let counter = 0;
    let secureCounter = 0;
    for (const key of Object.keys(connections)) {
      const socket = connections[key];
      const serverResponse = socket._httpMessage;
      if (serverResponse && !force) {
        if (!serverResponse.headersSent) {
          serverResponse.setHeader("connection", "close");
        }
      } else {
        counter++;
        destroy(socket);
      }
    }
    debug("Connections destroyed : " + counter);
    debug("Connection Counter    : " + connectionCounter);
    for (const key of Object.keys(secureConnections)) {
      const socket = secureConnections[key];
      const serverResponse = socket._httpMessage;
      if (serverResponse && !force) {
        if (!serverResponse.headersSent) {
          serverResponse.setHeader("connection", "close");
        }
      } else {
        secureCounter++;
        destroy(socket);
      }
    }
    debug("Secure Connections destroyed : " + secureCounter);
    debug("Secure Connection Counter    : " + secureConnectionCounter);
  }
  server.on("request", (req, res) => {
    req.socket._isIdle = false;
    if (isShuttingDown && !res.headersSent) {
      res.setHeader("connection", "close");
    }
    res.on("finish", () => {
      req.socket._isIdle = true;
      destroy(req.socket);
    });
  });
  server.on("connection", (socket) => {
    if (isShuttingDown) {
      socket.destroy();
    } else {
      const id = connectionCounter++;
      socket._isIdle = true;
      socket._connectionId = id;
      connections[id] = socket;
      socket.once("close", () => {
        delete connections[socket._connectionId];
      });
    }
  });
  server.on("secureConnection", (socket) => {
    if (isShuttingDown) {
      socket.destroy();
    } else {
      const id = secureConnectionCounter++;
      socket._isIdle = true;
      socket._connectionId = id;
      secureConnections[id] = socket;
      socket.once("close", () => {
        delete secureConnections[socket._connectionId];
      });
    }
  });
  process.on("close", () => {
    debug("closed");
  });
  function shutdown(sig) {
    function cleanupHttp() {
      destroyAllConnections();
      debug("Close http server");
      return new Promise((resolve, reject) => {
        server.close((err) => {
          if (err) {
            return reject(err);
          }
          return resolve(true);
        });
      });
    }
    debug("shutdown signal - " + sig);
    if (options.development) {
      debug("DEV-Mode - immediate forceful shutdown");
      return process.exit(0);
    }
    function finalHandler() {
      if (!finalRun) {
        finalRun = true;
        if (options.finally && isFunction(options.finally)) {
          debug("executing finally()");
          options.finally();
        }
      }
      return Promise.resolve();
    }
    function waitForReadyToShutDown(totalNumInterval) {
      debug(`waitForReadyToShutDown... ${totalNumInterval}`);
      if (totalNumInterval === 0) {
        debug(
          `Could not close connections in time (${options.timeout}ms), will forcefully shut down`
        );
        return Promise.resolve(true);
      }
      const allConnectionsClosed = Object.keys(connections).length === 0 && Object.keys(secureConnections).length === 0;
      if (allConnectionsClosed) {
        debug("All connections closed. Continue to shutting down");
        return Promise.resolve(false);
      }
      debug("Schedule the next waitForReadyToShutdown");
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(waitForReadyToShutDown(totalNumInterval - 1));
        }, 250);
      });
    }
    if (isShuttingDown) {
      return Promise.resolve();
    }
    debug("shutting down");
    return options.preShutdown(sig).then(() => {
      isShuttingDown = true;
      cleanupHttp();
    }).then(() => {
      const pollIterations = options.timeout ? Math.round(options.timeout / 250) : 0;
      return waitForReadyToShutDown(pollIterations);
    }).then((force) => {
      debug("Do onShutdown now");
      if (force) {
        destroyAllConnections(force);
      }
      return options.onShutdown(sig);
    }).then(finalHandler).catch((error) => {
      const errString = typeof error === "string" ? error : JSON.stringify(error);
      debug(errString);
      failed = true;
      throw errString;
    });
  }
  function shutdownManual() {
    return shutdown("manual");
  }
  return shutdownManual;
}

function getGracefulShutdownConfig() {
  return {
    disabled: !!process.env.NITRO_SHUTDOWN_DISABLED,
    signals: (process.env.NITRO_SHUTDOWN_SIGNALS || "SIGTERM SIGINT").split(" ").map((s) => s.trim()),
    timeout: Number.parseInt(process.env.NITRO_SHUTDOWN_TIMEOUT || "", 10) || 3e4,
    forceExit: !process.env.NITRO_SHUTDOWN_NO_FORCE_EXIT
  };
}
function setupGracefulShutdown(listener, nitroApp) {
  const shutdownConfig = getGracefulShutdownConfig();
  if (shutdownConfig.disabled) {
    return;
  }
  GracefulShutdown(listener, {
    signals: shutdownConfig.signals.join(" "),
    timeout: shutdownConfig.timeout,
    forceExit: shutdownConfig.forceExit,
    onShutdown: async () => {
      await new Promise((resolve) => {
        const timeout = setTimeout(() => {
          console.warn("Graceful shutdown timeout, force exiting...");
          resolve();
        }, shutdownConfig.timeout);
        nitroApp.hooks.callHook("close").catch((error) => {
          console.error(error);
        }).finally(() => {
          clearTimeout(timeout);
          resolve();
        });
      });
    }
  });
}

export { $fetch$1 as $, toRouteMatcher as A, createRouter$1 as B, defu as C, getRequestURL as D, getRequestHeader as E, parse as F, klona as G, createDefu as H, isEqual as I, setCookie as J, getCookie as K, deleteCookie as L, trapUnhandledNodeErrors as a, useNitroApp as b, appRootTag as c, destr as d, appRootAttrs as e, getResponseStatus as f, getResponseStatusText as g, appId as h, defineRenderHandler as i, joinRelativeURL as j, appTeleportTag as k, appTeleportAttrs as l, getQuery as m, createError$1 as n, appHead as o, getRouteRules as p, hasProtocol as q, relative as r, setupGracefulShutdown as s, toNodeListener as t, useRuntimeConfig as u, joinURL as v, sanitizeStatusCode as w, getContext as x, createHooks as y, executeAsync as z };
//# sourceMappingURL=nitro.mjs.map
