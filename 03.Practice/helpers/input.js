// input.js
const readline = require('readline');

function ask(questionText) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  return new Promise((resolve) => {
    rl.question(questionText, (answer) => {
      rl.close();
      resolve(answer);
    });
  });
}

module.exports = {
  ask,
};