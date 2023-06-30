import { execSync } from 'child_process';

const diffCommand = 'git diff';
const diffOutput = execSync(diffCommand, { encoding: 'utf-8' });

if (diffOutput) {
  console.log(diffOutput);
} else {
  console.log('差分はありません。');
}