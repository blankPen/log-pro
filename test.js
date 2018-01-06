const Log = require('./src/index.js');

// const times = (num, cb) => {
//   const arr = [];
//   for (let i = 0; i < num; i += 1) {
//     arr.push(cb(i));
//   }
//   return arr;
// };

Log.info('info', 'test');
Log.warn('warn', 'test');
Log.success('success', 'test');
Log.error('error', 'test');

Log.table([
  ['column', 'column', 'column', 'column', 'column'],
  ['cell', 'cell232323232323', 'cell', 'cell', 'cell'],
  ['cell', 'cell', 'cell', 'cell', 'cell'],
  ['cell', 'cell', 'cell', 'cell', 'cell'],
  ['cell', 'cell', 'cell', 'cell', 'cell'],
]);

const inquirer = require('inquirer');

(async () => {
  // const res = await Log.ask([
  //   { name: 'name', required: true, description: 'hhhhhhh?'.green },
  //   { name: 'password', hidden: true, required: true },
  // ]);
  // console.dir(JSON.stringify(res, null, 2));

  const res = await inquirer.prompt([
    { name: 'name', message: 'hhhhhhh?'.green },
    { name: 'password', message: 'hhhhhhh?'.green },
    {
      name: 'type', type: 'confirm', message: '123', choices: ['Choice A', new inquirer.Separator(), 'choice B'],
    },
  ]);
  console.dir(res);
})();

