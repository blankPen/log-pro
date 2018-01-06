'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

require('colors');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var log = console.log; // eslint-disable-line
var times = function times(num, cb) {
  var arr = [];
  for (var i = 0; i < num; i += 1) {
    arr.push(cb(i));
  }
  return arr;
};

var COLORS = {
  INFO: 'blue',
  WARN: 'yellow',
  SUCCESS: 'green',
  ERROR: 'red'
};
var typeLog = function typeLog(type) {
  for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    args[_key - 1] = arguments[_key];
  }

  return log.apply(undefined, args.map(function (str) {
    return str[COLORS[type]];
  }));
};

var Log = function () {
  function Log() {
    (0, _classCallCheck3.default)(this, Log);

    this.info = function () {
      for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        args[_key2] = arguments[_key2];
      }

      return typeLog.apply(undefined, ['INFO'].concat(args));
    };

    this.warn = function () {
      for (var _len3 = arguments.length, args = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
        args[_key3] = arguments[_key3];
      }

      return typeLog.apply(undefined, ['WARN'].concat(args));
    };

    this.success = function () {
      for (var _len4 = arguments.length, args = Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
        args[_key4] = arguments[_key4];
      }

      return typeLog.apply(undefined, ['SUCCESS'].concat(args));
    };

    this.error = function () {
      for (var _len5 = arguments.length, args = Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
        args[_key5] = arguments[_key5];
      }

      return typeLog.apply(undefined, ['ERROR'].concat(args));
    };
  }

  (0, _createClass3.default)(Log, [{
    key: 'table',
    value: function table(data) {
      var columns = 0;
      var cellLen = 10;
      if (!data.length) {
        log('\n');
        return;
      }
      data.forEach(function (arr) {
        if (!Array.isArray(arr)) throw new Error('参数都传错了，不会看文档么？？');
        columns = Math.max(arr.length, columns);
        arr.forEach(function (str) {
          cellLen = Math.max(str.length + 2, cellLen);
        });
      });
      var logLine = ('+' + times(columns, function () {
        return times(cellLen, function () {
          return '-';
        }).join('');
      }).join('+') + '+\n').cyan;
      log(logLine);
      data.forEach(function (arr) {
        var newArr = arr.map(function (str) {
          var space = Math.floor((cellLen - str.length) / 2);
          var blank = times(space, function () {
            return ' ';
          }).join('');
          return '' + (blank + str + blank);
        });
        log('' + '|'.cyan + newArr.join('|'.cyan) + '|'.cyan + '\n');
        log(logLine);
      });
    }
  }, {
    key: 'stream',
    value: function stream() {
      var stream = process.stderr;
      var res = {
        put: function put() {
          for (var _len6 = arguments.length, args = Array(_len6), _key6 = 0; _key6 < _len6; _key6++) {
            args[_key6] = arguments[_key6];
          }

          stream.write(args.join(' '));
        },
        log: function log() {
          res.put.apply(res, arguments);
        }
      };
      return res;
    }
  }, {
    key: 'progress',
    value: function progress() {
      var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
          _ref$init = _ref.init,
          init = _ref$init === undefined ? 0 : _ref$init,
          format = _ref.format;

      var stream = process.stderr;
      var len = 60;
      var update = function update(p) {
        var percent = Math.max(0, Math.min(p, 100));
        stream.clearLine();
        stream.cursorTo(0);
        var progressStr = times(len, function (i) {
          return i > percent / 100 * len ? ' ' : '=';
        }).join('');
        progressStr = typeof format === 'function' ? format(percent, progressStr) : '[' + progressStr + '] ' + percent + '%';
        stream.write(progressStr);
      };
      update(init);
      var id = setInterval(function () {}, 1000);
      return {
        update: update,
        done: function done() {
          update(100);
          clearInterval(id);
        }
      };
    }
  }, {
    key: 'loading',
    value: function loading() {
      var text = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '加载中';
      var duration = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 500;

      var stream = process.stderr;
      var num = 0;
      var spirit = ['.', '..', '...'];
      var id = setInterval(function () {
        stream.clearLine();
        stream.cursorTo(0);
        stream.write('' + text + spirit[num % spirit.length]);
        num += 1;
      }, duration);
      return {
        done: function done() {
          stream.clearLine();
          stream.cursorTo(0);
          clearInterval(id);
        }
      };
    }
  }]);
  return Log;
}();

exports.default = new Log();
module.exports = exports['default'];