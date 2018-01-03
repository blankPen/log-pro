import { request } from 'http';


const Log = require('./src/index.js');

const times = (num, cb) => {
  const arr = [];
  for (let i = 0; i < num; i += 1) {
    arr.push(cb(i));
  }
  return arr;
};

const log = new Log();
log.info('info', 'test');
log.warn('warn', 'test');
log.success('success', 'test');
log.error('error', 'test');

log.table([
  ['column', 'column', 'column', 'column', 'column'],
  ['cell', 'cell232323232323', 'cell', 'cell', 'cell'],
  ['cell', 'cell', 'cell', 'cell', 'cell'],
  ['cell', 'cell', 'cell', 'cell', 'cell'],
  ['cell', 'cell', 'cell', 'cell', 'cell'],
]);

const p = log.progress({
  format: (num, pStr) => `download [${num}%]: 【${pStr}】`,
});

// times(10, (i) => {
//   setTimeout(() => {
//     p.update((i + 1) * 10);
//     if (i === 9) p.done();
//   }, i * 1000);
// });

const prompt = require('prompt');

const schema = {
  properties: {
    name: {
      pattern: /^[a-zA-Z\s\-]+$/,
      message: 'Name must be only letters, spaces, or dashes',
      required: true,
    },
    password: {
      hidden: true,
    },
  },
};

//
// Start the prompt
//
prompt.message = '';
// prompt.start({
//   message: '?',
// });

//
// Get two properties from the user: email, password
//
prompt.get(schema, (err, result) => {
  //
  // Log the results.
  //
  console.log('Command-line input received:');
  console.log(`  name: ${result.name}`);
  console.log(`  password: ${result.password}`);
});
