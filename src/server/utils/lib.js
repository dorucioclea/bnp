'use strict';

let SHOW_HIDDEN = true;
const MAX_DEPTH = 9;

function _valueDeepSearch(input, value, prefix = '', depth = 0, isHidden = false) {
  if (input === value) {
    return [{
      prefix,
      isHidden,
      depth
    }];
  }

  if (
    depth === MAX_DEPTH ||
    typeof input !== 'object' ||
    input instanceof Date ||
    !input
  ) {
    return [];
  }

  if (Array.isArray(input)) {
    return input.reduce((rez, elem, index) => [
      ...rez,
      ..._valueDeepSearch(
        elem,
        value,
        prefix + '[' + index + ']',
        depth + 1,
        isHidden
      )
    ], []);
  }

  return Object.keys(input).
    reduce((rez, propName) => [
      ...rez,
      ..._valueDeepSearch(
        input[propName],
        value,
        prefix + '.' + propName,
        depth + 1,
        isHidden || propName.charAt(0) === '_'
      )
    ], []);
}

function _sortAndFilter(arr) {
  return arr.
    sort((a, b) => (a.isHidden === b.isHidden) ? (a.depth - b.depth) : (a.isHidden - b.isHidden)).
    filter(a => SHOW_HIDDEN || !a.isHidden).
    map(a => a.prefix);
}

function valueDeepSearch(input, value) {
  return _sortAndFilter(_valueDeepSearch(input, value));
}

function _propDeepSearch(input, value, prefix = '', depth = 0, isHidden = false) {
  if (
    depth === MAX_DEPTH ||
    typeof input !== 'object' ||
    input instanceof Date ||
    !input
  ) {
    return [];
  }


  if (Array.isArray(input)) {
    return input.reduce((rez, elem, index) => [
      ...rez,
      ..._propDeepSearch(
        elem,
        value,
        prefix + '[' + index + ']',
        depth + 1,
        isHidden
      )
    ], []);
  }


  return Object.keys(input).reduce((rez, propName) => [
    ...rez,
    ...(propName === value ?
    [{
      prefix,
      isHidden,
      depth
    }] :
    []
    ),
    ..._propDeepSearch(
      input[propName],
      value,
      prefix + '.' + propName,
      depth + 1,
      isHidden || propName.charAt(0) === '_'
    )
  ], []);
}

function propDeepSearch(input, value) {
  return _sortAndFilter(_propDeepSearch(input, value));
}

function getOriginalProtocolHostPort(req) {
  // The function analizes req (request object) and determines "<protocol>://<host>:<port>" used by a client
  // (like web browser, etc.) to access the server.

  // let externalHost = req.hostname;
  // The above line does not work regardless "Express behind proxies" documentation at
  // https://expressjs.com/en/guide/behind-proxies.html
  let externalHost = req.get('X-Forwarded-Host') || req.get('Host');

  return req.protocol + '://' + externalHost;  // URL used by web client.
}

function getCurrentServiceHost(req) {
  return getOriginalProtocolHostPort(req) + '/bnp';
}

module.exports = {
  propDeepSearch,
  valueDeepSearch,
  getOriginalProtocolHostPort,
  getCurrentServiceHost
}
