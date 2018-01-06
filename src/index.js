import 'colors';

const log = console.log; // eslint-disable-line
const times = (num, cb) => {
  const arr = [];
  for (let i = 0; i < num; i += 1) {
    arr.push(cb(i));
  }
  return arr;
};

const COLORS = {
  INFO: 'blue',
  WARN: 'yellow',
  SUCCESS: 'green',
  ERROR: 'red',
};
const typeLog = (type, ...args) => log.apply(this, args.map(str => str[COLORS[type]]));
class Log {
  info = (...args) => typeLog('INFO', ...args)
  warn = (...args) => typeLog('WARN', ...args)
  success = (...args) => typeLog('SUCCESS', ...args)
  error = (...args) => typeLog('ERROR', ...args)

  table(data) {
    let columns = 0;
    let cellLen = 10;
    if (!data.length) {
      log('\n');
      return;
    }
    data.forEach((arr) => {
      if (!Array.isArray(arr)) throw new Error('参数都传错了，不会看文档么？？');
      columns = Math.max(arr.length, columns);
      arr.forEach((str) => {
        cellLen = Math.max(str.length + 2, cellLen);
      });
    });
    const logLine = `+${times(columns, () => times(cellLen, () => '-').join('')).join('+')}+\n`.cyan;
    log(logLine);
    data.forEach((arr) => {
      const newArr = arr.map((str) => {
        const space = Math.floor((cellLen - str.length) / 2);
        const blank = times(space, () => ' ').join('');
        return `${blank + str + blank}`;
      });
      log(`${'|'.cyan}${newArr.join('|'.cyan)}${'|'.cyan}\n`);
      log(logLine);
    });
  }

  stream() {
    const stream = process.stderr;
    const res = {
      put(...args) {
        stream.write(args.join(' '));
      },
      log(...args) {
        res.put(...args);
      },
    };
    return res;
  }

  progress({ init = 0, format } = {}) {
    const stream = process.stderr;
    const len = 60;
    const update = (p) => {
      const percent = Math.max(0, Math.min(p, 100));
      stream.clearLine();
      stream.cursorTo(0);
      let progressStr = times(len, i => (i > ((percent / 100) * len) ? ' ' : '=')).join('');
      progressStr = typeof format === 'function' ? format(percent, progressStr) :
        `[${progressStr}] ${percent}%`;
      stream.write(progressStr);
    };
    update(init);
    const id = setInterval(() => { }, 1000);
    return {
      update,
      done: () => {
        update(100);
        clearInterval(id);
      },
    };
  }

  loading(text = '加载中', duration = 500) {
    const stream = process.stderr;
    let num = 0;
    const spirit = ['.', '..', '...'];
    const id = setInterval(() => {
      stream.clearLine();
      stream.cursorTo(0);
      stream.write(`${text}${spirit[num % spirit.length]}`);
      num += 1;
    }, duration);
    return {
      done: () => {
        stream.clearLine();
        stream.cursorTo(0);
        clearInterval(id);
      },
    };
  }
}

export default new Log();
