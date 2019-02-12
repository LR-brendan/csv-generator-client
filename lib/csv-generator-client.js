(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("lodash/fp"));
	else if(typeof define === 'function' && define.amd)
		define(["lodash/fp"], factory);
	else if(typeof exports === 'object')
		exports["csv-generator-client"] = factory(require("lodash/fp"));
	else
		root["csv-generator-client"] = factory(root["lodash/fp"]);
})(typeof self !== 'undefined' ? self : this, function(__WEBPACK_EXTERNAL_MODULE_2__) {
return /******/ (function(modules) { // webpackBootstrap
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
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });var _csvGeneratorClient = __webpack_require__(1);Object.keys(_csvGeneratorClient).forEach(function (key) {if (key === "default" || key === "__esModule") return;Object.defineProperty(exports, key, { enumerable: true, get: function get() {return _csvGeneratorClient[key];} });});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9pbmRleC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoidUlBQUEiLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiL2hvbWUvY2lyY2xlY2kvcHJvamVjdCIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCAqIGZyb20gJy4vY3N2LWdlbmVyYXRvci1jbGllbnQnXG4iXX0=

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.__internals__ = exports.download = exports.getLinkElement = undefined;var _fp = __webpack_require__(2);var _fp2 = _interopRequireDefault(_fp);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

// Escape quotes and quote cell
var quote = _fp2.default.flow(
_fp2.default.replace(/"/g, '""'),
function (x) {return '"' + x + '"';});


// Quote if needed
var transformCell = function transformCell(addQuotes) {return addQuotes ? quote : _fp2.default.identity;};

// Takes settings object and an array of arrays
var getData = function getData(_ref, dataArray) {var separator = _ref.separator,addQuotes = _ref.addQuotes;
  var transformRow = _fp2.default.flow(
  _fp2.default.map(transformCell(addQuotes)),
  _fp2.default.join(separator));


  return _fp2.default.flow(
  _fp2.default.map(transformRow),
  function (data) {return data.join('\r\n');},
  function (data) {return (
      typeof window !== 'undefined' && window.navigator.msSaveBlob ?
      data :
      btoa(unescape(encodeURIComponent(data))));})(
  dataArray);
};

// Convert array of objects to array of arrays and add columns
var convertData = function convertData(data, columnKeys) {
  // Column names
  var columns = _fp2.default.map(_fp2.default.startCase, columnKeys);
  // Extract data from object
  var transformRow = function transformRow(row) {return _fp2.default.map(function (key) {return _fp2.default.get(key, row);}, columnKeys);};
  var rows = _fp2.default.map(transformRow, data);
  // Concatenate columns and rows
  return _fp2.default.concat([columns], rows);
};

// Extract keys from first row
var extractKeysFromFirstRow = _fp2.default.flow(
_fp2.default.first,
_fp2.default.keys);


var checkInputs = function checkInputs(_ref2, fileName, dataArray) {var autoDetectColumns = _ref2.autoDetectColumns;
  // Check filename
  if (_fp2.default.isNil(fileName)) {
    throw 'A file name is required';
  }

  // Check shape of data
  if (autoDetectColumns) {
    if (!_fp2.default.isArray(dataArray) || !_fp2.default.every(_fp2.default.isPlainObject, dataArray))
    throw 'An array of objects is required.';
  } else if (!_fp2.default.isArray(dataArray) || !_fp2.default.every(_fp2.default.isArray, dataArray)) {
    throw 'An array of arrays is required.';
  }
};

var initSettings = _fp2.default.defaults({
  separator: ',',
  addQuotes: false,
  autoDetectColumns: false });


var initData = function initData(settings, dataArray) {var
  autoDetectColumns = settings.autoDetectColumns,columnKeys = settings.columnKeys;

  if (autoDetectColumns) {
    // Extract column keys from first row if not passed explicitly
    if (!_fp2.default.isArray(columnKeys)) columnKeys = extractKeysFromFirstRow(dataArray);

    // Convert array of objects to array of arrays and add columns
    dataArray = convertData(dataArray, columnKeys);
  }

  return dataArray;
};

var getDownloadLink = function getDownloadLink(settings, dataArray) {
  var _dataArray = initData(settings, dataArray);
  var type = 'data:text/csv;charset=utf-8';
  if (typeof btoa === 'function') {
    type += ';base64';
  }
  return type + ',' + getData(settings, _dataArray);
};

var ieDownload = function ieDownload(settings, fileName, dataArray) {
  var _dataArray = initData(settings, dataArray);
  var blob = new Blob(
  [decodeURIComponent(encodeURI(getData(settings, _dataArray)))],
  {
    type: 'text/csv;charset=utf-8;' });


  window.navigator.msSaveBlob(blob, fileName);
};

var getLinkElementInternal = function getLinkElementInternal(settings, fileName, dataArray) {
  var linkElement = document.createElement('a');
  linkElement.target = '_blank';

  // IE
  if (window.navigator.msSaveBlob) {
    linkElement.href = '#';
    linkElement.onclick = function () {
      ieDownload(settings, fileName, dataArray);
    };
  } else {
    linkElement.href = getDownloadLink(settings, dataArray);
    linkElement.download = fileName;
  }
  return linkElement;
};

var getLinkElement = exports.getLinkElement = function getLinkElement(_ref3) {var settings = _ref3.settings,fileName = _ref3.fileName,dataArray = _ref3.dataArray;
  // Initialize settings
  var _settings = initSettings(settings);
  // Check inputs
  checkInputs(_settings, fileName, dataArray);

  return getLinkElementInternal(_settings, fileName, dataArray);
};

var download = exports.download = function download(_ref4) {var settings = _ref4.settings,fileName = _ref4.fileName,dataArray = _ref4.dataArray;
  // Initialize settings
  var _settings = initSettings(settings);
  // Check inputs
  checkInputs(_settings, fileName, dataArray);

  // IE
  if (window.navigator.msSaveBlob) {
    ieDownload(_settings, fileName, dataArray);
  } else {
    var linkElement = getLinkElementInternal(_settings, fileName, dataArray);
    linkElement.style.display = 'none';
    document.body.appendChild(linkElement);
    linkElement.click();
    document.body.removeChild(linkElement);
  }
};

// Exporting internals for unit testing.
var __internals__ = exports.__internals__ = {
  checkInputs: checkInputs,
  convertData: convertData,
  extractKeysFromFirstRow: extractKeysFromFirstRow,
  getData: getData,
  getDownloadLink: getDownloadLink,
  ieDownload: ieDownload,
  initData: initData,
  initSettings: initSettings,
  quote: quote,
  transformCell: transformCell };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9jc3YtZ2VuZXJhdG9yLWNsaWVudC5qcyJdLCJuYW1lcyI6WyJxdW90ZSIsIl8iLCJmbG93IiwicmVwbGFjZSIsIngiLCJ0cmFuc2Zvcm1DZWxsIiwiYWRkUXVvdGVzIiwiaWRlbnRpdHkiLCJnZXREYXRhIiwiZGF0YUFycmF5Iiwic2VwYXJhdG9yIiwidHJhbnNmb3JtUm93IiwibWFwIiwiam9pbiIsImRhdGEiLCJ3aW5kb3ciLCJuYXZpZ2F0b3IiLCJtc1NhdmVCbG9iIiwiYnRvYSIsInVuZXNjYXBlIiwiZW5jb2RlVVJJQ29tcG9uZW50IiwiY29udmVydERhdGEiLCJjb2x1bW5LZXlzIiwiY29sdW1ucyIsInN0YXJ0Q2FzZSIsImdldCIsImtleSIsInJvdyIsInJvd3MiLCJjb25jYXQiLCJleHRyYWN0S2V5c0Zyb21GaXJzdFJvdyIsImZpcnN0Iiwia2V5cyIsImNoZWNrSW5wdXRzIiwiZmlsZU5hbWUiLCJhdXRvRGV0ZWN0Q29sdW1ucyIsImlzTmlsIiwiaXNBcnJheSIsImV2ZXJ5IiwiaXNQbGFpbk9iamVjdCIsImluaXRTZXR0aW5ncyIsImRlZmF1bHRzIiwiaW5pdERhdGEiLCJzZXR0aW5ncyIsImdldERvd25sb2FkTGluayIsIl9kYXRhQXJyYXkiLCJ0eXBlIiwiaWVEb3dubG9hZCIsImJsb2IiLCJCbG9iIiwiZGVjb2RlVVJJQ29tcG9uZW50IiwiZW5jb2RlVVJJIiwiZ2V0TGlua0VsZW1lbnRJbnRlcm5hbCIsImxpbmtFbGVtZW50IiwiZG9jdW1lbnQiLCJjcmVhdGVFbGVtZW50IiwidGFyZ2V0IiwiaHJlZiIsIm9uY2xpY2siLCJkb3dubG9hZCIsImdldExpbmtFbGVtZW50IiwiX3NldHRpbmdzIiwic3R5bGUiLCJkaXNwbGF5IiwiYm9keSIsImFwcGVuZENoaWxkIiwiY2xpY2siLCJyZW1vdmVDaGlsZCIsIl9faW50ZXJuYWxzX18iXSwibWFwcGluZ3MiOiJ5SkFBQSwrQjs7QUFFQTtBQUNBLElBQUlBLFFBQVFDLGFBQUVDLElBQUY7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QUFXYyxTQUFYLEVBQXNCM0IsUUFBdEIsRUFBZ0N6QixTQUFoQztBQUNELEdBRkQsTUFFTztBQUNMLFFBQUk0QyxjQUFjRCx1QkFBdUJTLFNBQXZCLEVBQWtDM0IsUUFBbEMsRUFBNEN6QixTQUE1QyxDQUFsQjtBQUNBNEMsZ0JBQVlTLEtBQVosQ0FBa0JDLE9BQWxCLEdBQTRCLE1BQTVCO0FBQ0FULGFBQVNVLElBQVQsQ0FBY0MsV0FBZCxDQUEwQlosV0FBMUI7QUFDQUEsZ0JBQVlhLEtBQVo7QUFDQVosYUFBU1UsSUFBVCxDQUFjRyxXQUFkLENBQTBCZCxXQUExQjtBQUNEO0FBQ0YsQ0FoQk07O0FBa0JQO0FBQ08sSUFBTWUsd0NBQWdCO0FBQzNCbkMsMEJBRDJCO0FBRTNCWiwwQkFGMkI7QUFHM0JTLGtEQUgyQjtBQUkzQnRCLGtCQUoyQjtBQUszQm9DLGtDQUwyQjtBQU0zQkcsd0JBTjJCO0FBTzNCTCxvQkFQMkI7QUFRM0JGLDRCQVIyQjtBQVMzQnhDLGNBVDJCO0FBVTNCSyw4QkFWMkIsRUFBdEIiLCJmaWxlIjoiY3N2LWdlbmVyYXRvci1jbGllbnQuanMiLCJzb3VyY2VSb290IjoiL2hvbWUvY2lyY2xlY2kvcHJvamVjdCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBfIGZyb20gJ2xvZGFzaC9mcCdcblxuLy8gRXNjYXBlIHF1b3RlcyBhbmQgcXVvdGUgY2VsbFxubGV0IHF1b3RlID0gXy5mbG93KFxuICBfLnJlcGxhY2UoL1wiL2csICdcIlwiJyksXG4gIHggPT4gYFwiJHt4fVwiYFxuKVxuXG4vLyBRdW90ZSBpZiBuZWVkZWRcbmxldCB0cmFuc2Zvcm1DZWxsID0gYWRkUXVvdGVzID0+IChhZGRRdW90ZXMgPyBxdW90ZSA6IF8uaWRlbnRpdHkpXG5cbi8vIFRha2VzIHNldHRpbmdzIG9iamVjdCBhbmQgYW4gYXJyYXkgb2YgYXJyYXlzXG5sZXQgZ2V0RGF0YSA9ICh7IHNlcGFyYXRvciwgYWRkUXVvdGVzIH0sIGRhdGFBcnJheSkgPT4ge1xuICBsZXQgdHJhbnNmb3JtUm93ID0gXy5mbG93KFxuICAgIF8ubWFwKHRyYW5zZm9ybUNlbGwoYWRkUXVvdGVzKSksXG4gICAgXy5qb2luKHNlcGFyYXRvcilcbiAgKVxuXG4gIHJldHVybiBfLmZsb3coXG4gICAgXy5tYXAodHJhbnNmb3JtUm93KSxcbiAgICBkYXRhID0+IGRhdGEuam9pbignXFxyXFxuJyksXG4gICAgZGF0YSA9PlxuICAgICAgdHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcgJiYgd2luZG93Lm5hdmlnYXRvci5tc1NhdmVCbG9iXG4gICAgICAgID8gZGF0YVxuICAgICAgICA6IGJ0b2EodW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KGRhdGEpKSlcbiAgKShkYXRhQXJyYXkpXG59XG5cbi8vIENvbnZlcnQgYXJyYXkgb2Ygb2JqZWN0cyB0byBhcnJheSBvZiBhcnJheXMgYW5kIGFkZCBjb2x1bW5zXG5sZXQgY29udmVydERhdGEgPSAoZGF0YSwgY29sdW1uS2V5cykgPT4ge1xuICAvLyBDb2x1bW4gbmFtZXNcbiAgbGV0IGNvbHVtbnMgPSBfLm1hcChfLnN0YXJ0Q2FzZSwgY29sdW1uS2V5cylcbiAgLy8gRXh0cmFjdCBkYXRhIGZyb20gb2JqZWN0XG4gIGxldCB0cmFuc2Zvcm1Sb3cgPSByb3cgPT4gXy5tYXAoa2V5ID0+IF8uZ2V0KGtleSwgcm93KSwgY29sdW1uS2V5cylcbiAgbGV0IHJvd3MgPSBfLm1hcCh0cmFuc2Zvcm1Sb3csIGRhdGEpXG4gIC8vIENvbmNhdGVuYXRlIGNvbHVtbnMgYW5kIHJvd3NcbiAgcmV0dXJuIF8uY29uY2F0KFtjb2x1bW5zXSwgcm93cylcbn1cblxuLy8gRXh0cmFjdCBrZXlzIGZyb20gZmlyc3Qgcm93XG5sZXQgZXh0cmFjdEtleXNGcm9tRmlyc3RSb3cgPSBfLmZsb3coXG4gIF8uZmlyc3QsXG4gIF8ua2V5c1xuKVxuXG5sZXQgY2hlY2tJbnB1dHMgPSAoeyBhdXRvRGV0ZWN0Q29sdW1ucyB9LCBmaWxlTmFtZSwgZGF0YUFycmF5KSA9PiB7XG4gIC8vIENoZWNrIGZpbGVuYW1lXG4gIGlmIChfLmlzTmlsKGZpbGVOYW1lKSkge1xuICAgIHRocm93ICdBIGZpbGUgbmFtZSBpcyByZXF1aXJlZCdcbiAgfVxuXG4gIC8vIENoZWNrIHNoYXBlIG9mIGRhdGFcbiAgaWYgKGF1dG9EZXRlY3RDb2x1bW5zKSB7XG4gICAgaWYgKCFfLmlzQXJyYXkoZGF0YUFycmF5KSB8fCAhXy5ldmVyeShfLmlzUGxhaW5PYmplY3QsIGRhdGFBcnJheSkpXG4gICAgICB0aHJvdyAnQW4gYXJyYXkgb2Ygb2JqZWN0cyBpcyByZXF1aXJlZC4nXG4gIH0gZWxzZSBpZiAoIV8uaXNBcnJheShkYXRhQXJyYXkpIHx8ICFfLmV2ZXJ5KF8uaXNBcnJheSwgZGF0YUFycmF5KSkge1xuICAgIHRocm93ICdBbiBhcnJheSBvZiBhcnJheXMgaXMgcmVxdWlyZWQuJ1xuICB9XG59XG5cbmxldCBpbml0U2V0dGluZ3MgPSBfLmRlZmF1bHRzKHtcbiAgc2VwYXJhdG9yOiAnLCcsXG4gIGFkZFF1b3RlczogZmFsc2UsXG4gIGF1dG9EZXRlY3RDb2x1bW5zOiBmYWxzZSxcbn0pXG5cbmxldCBpbml0RGF0YSA9IChzZXR0aW5ncywgZGF0YUFycmF5KSA9PiB7XG4gIGxldCB7IGF1dG9EZXRlY3RDb2x1bW5zLCBjb2x1bW5LZXlzIH0gPSBzZXR0aW5nc1xuXG4gIGlmIChhdXRvRGV0ZWN0Q29sdW1ucykge1xuICAgIC8vIEV4dHJhY3QgY29sdW1uIGtleXMgZnJvbSBmaXJzdCByb3cgaWYgbm90IHBhc3NlZCBleHBsaWNpdGx5XG4gICAgaWYgKCFfLmlzQXJyYXkoY29sdW1uS2V5cykpIGNvbHVtbktleXMgPSBleHRyYWN0S2V5c0Zyb21GaXJzdFJvdyhkYXRhQXJyYXkpXG5cbiAgICAvLyBDb252ZXJ0IGFycmF5IG9mIG9iamVjdHMgdG8gYXJyYXkgb2YgYXJyYXlzIGFuZCBhZGQgY29sdW1uc1xuICAgIGRhdGFBcnJheSA9IGNvbnZlcnREYXRhKGRhdGFBcnJheSwgY29sdW1uS2V5cylcbiAgfVxuXG4gIHJldHVybiBkYXRhQXJyYXlcbn1cblxubGV0IGdldERvd25sb2FkTGluayA9IChzZXR0aW5ncywgZGF0YUFycmF5KSA9PiB7XG4gIGxldCBfZGF0YUFycmF5ID0gaW5pdERhdGEoc2V0dGluZ3MsIGRhdGFBcnJheSlcbiAgbGV0IHR5cGUgPSAnZGF0YTp0ZXh0L2NzdjtjaGFyc2V0PXV0Zi04J1xuICBpZiAodHlwZW9mIGJ0b2EgPT09ICdmdW5jdGlvbicpIHtcbiAgICB0eXBlICs9ICc7YmFzZTY0J1xuICB9XG4gIHJldHVybiBgJHt0eXBlfSwke2dldERhdGEoc2V0dGluZ3MsIF9kYXRhQXJyYXkpfWBcbn1cblxubGV0IGllRG93bmxvYWQgPSAoc2V0dGluZ3MsIGZpbGVOYW1lLCBkYXRhQXJyYXkpID0+IHtcbiAgbGV0IF9kYXRhQXJyYXkgPSBpbml0RGF0YShzZXR0aW5ncywgZGF0YUFycmF5KVxuICBsZXQgYmxvYiA9IG5ldyBCbG9iKFxuICAgIFtkZWNvZGVVUklDb21wb25lbnQoZW5jb2RlVVJJKGdldERhdGEoc2V0dGluZ3MsIF9kYXRhQXJyYXkpKSldLFxuICAgIHtcbiAgICAgIHR5cGU6ICd0ZXh0L2NzdjtjaGFyc2V0PXV0Zi04OycsXG4gICAgfVxuICApXG4gIHdpbmRvdy5uYXZpZ2F0b3IubXNTYXZlQmxvYihibG9iLCBmaWxlTmFtZSlcbn1cblxubGV0IGdldExpbmtFbGVtZW50SW50ZXJuYWwgPSAoc2V0dGluZ3MsIGZpbGVOYW1lLCBkYXRhQXJyYXkpID0+IHtcbiAgbGV0IGxpbmtFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYScpXG4gIGxpbmtFbGVtZW50LnRhcmdldCA9ICdfYmxhbmsnXG5cbiAgLy8gSUVcbiAgaWYgKHdpbmRvdy5uYXZpZ2F0b3IubXNTYXZlQmxvYikge1xuICAgIGxpbmtFbGVtZW50LmhyZWYgPSAnIydcbiAgICBsaW5rRWxlbWVudC5vbmNsaWNrID0gKCkgPT4ge1xuICAgICAgaWVEb3dubG9hZChzZXR0aW5ncywgZmlsZU5hbWUsIGRhdGFBcnJheSlcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgbGlua0VsZW1lbnQuaHJlZiA9IGdldERvd25sb2FkTGluayhzZXR0aW5ncywgZGF0YUFycmF5KVxuICAgIGxpbmtFbGVtZW50LmRvd25sb2FkID0gZmlsZU5hbWVcbiAgfVxuICByZXR1cm4gbGlua0VsZW1lbnRcbn1cblxuZXhwb3J0IGNvbnN0IGdldExpbmtFbGVtZW50ID0gKHsgc2V0dGluZ3MsIGZpbGVOYW1lLCBkYXRhQXJyYXkgfSkgPT4ge1xuICAvLyBJbml0aWFsaXplIHNldHRpbmdzXG4gIGxldCBfc2V0dGluZ3MgPSBpbml0U2V0dGluZ3Moc2V0dGluZ3MpXG4gIC8vIENoZWNrIGlucHV0c1xuICBjaGVja0lucHV0cyhfc2V0dGluZ3MsIGZpbGVOYW1lLCBkYXRhQXJyYXkpXG5cbiAgcmV0dXJuIGdldExpbmtFbGVtZW50SW50ZXJuYWwoX3NldHRpbmdzLCBmaWxlTmFtZSwgZGF0YUFycmF5KVxufVxuXG5leHBvcnQgY29uc3QgZG93bmxvYWQgPSAoeyBzZXR0aW5ncywgZmlsZU5hbWUsIGRhdGFBcnJheSB9KSA9PiB7XG4gIC8vIEluaXRpYWxpemUgc2V0dGluZ3NcbiAgbGV0IF9zZXR0aW5ncyA9IGluaXRTZXR0aW5ncyhzZXR0aW5ncylcbiAgLy8gQ2hlY2sgaW5wdXRzXG4gIGNoZWNrSW5wdXRzKF9zZXR0aW5ncywgZmlsZU5hbWUsIGRhdGFBcnJheSlcblxuICAvLyBJRVxuICBpZiAod2luZG93Lm5hdmlnYXRvci5tc1NhdmVCbG9iKSB7XG4gICAgaWVEb3dubG9hZChfc2V0dGluZ3MsIGZpbGVOYW1lLCBkYXRhQXJyYXkpXG4gIH0gZWxzZSB7XG4gICAgbGV0IGxpbmtFbGVtZW50ID0gZ2V0TGlua0VsZW1lbnRJbnRlcm5hbChfc2V0dGluZ3MsIGZpbGVOYW1lLCBkYXRhQXJyYXkpXG4gICAgbGlua0VsZW1lbnQuc3R5bGUuZGlzcGxheSA9ICdub25lJ1xuICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQobGlua0VsZW1lbnQpXG4gICAgbGlua0VsZW1lbnQuY2xpY2soKVxuICAgIGRvY3VtZW50LmJvZHkucmVtb3ZlQ2hpbGQobGlua0VsZW1lbnQpXG4gIH1cbn1cblxuLy8gRXhwb3J0aW5nIGludGVybmFscyBmb3IgdW5pdCB0ZXN0aW5nLlxuZXhwb3J0IGNvbnN0IF9faW50ZXJuYWxzX18gPSB7XG4gIGNoZWNrSW5wdXRzLFxuICBjb252ZXJ0RGF0YSxcbiAgZXh0cmFjdEtleXNGcm9tRmlyc3RSb3csXG4gIGdldERhdGEsXG4gIGdldERvd25sb2FkTGluayxcbiAgaWVEb3dubG9hZCxcbiAgaW5pdERhdGEsXG4gIGluaXRTZXR0aW5ncyxcbiAgcXVvdGUsXG4gIHRyYW5zZm9ybUNlbGwsXG59XG4iXX0=

/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_2__;

/***/ })
/******/ ]);
});
//# sourceMappingURL=csv-generator-client.js.map