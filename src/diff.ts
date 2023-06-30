import { execSync } from 'child_process';

const diffCommand = 'git diff --unified=0';

(() => {
  try {
    const diffOutput = execSync(diffCommand, { encoding: 'utf-8' });
    const modifiedLines = parseGitDiff(diffOutput);
    let odd_split_line = "";
    let aaa = [];
    for (var i = 0; i < modifiedLines.length; i++) {

      if (modifiedLines[i] == odd_split_line) {
        aaa.push(modifiedLines[i]);
        console.log(aaa);
        aaa = [];
        continue;
      }
      if (modifiedLines[i] == '==============================') {
        odd_split_line = modifiedLines[i];
        continue;
      }
      aaa.push(modifiedLines[i]);

      // 最後の行だった場合
      if ((modifiedLines[i].length - 1) == i) {
        console.log(aaa);
        break;
      }

    }
  } catch (error) {
    console.error('Git diffの実行中にエラーが発生しました:', error);
  }
})();

function parseGitDiff(diffOutput: string): string[] {
  const lines = diffOutput.split('\n');
  let modifiedLines: string[] = [];
  let new_point = "";
  let odd_point = "";

  for (const line of lines) {
    if (line.startsWith('+') || line.startsWith('-')) {
      new_point = line.substring(0, 1);

      if (odd_point == '') {
        odd_point = new_point;
      }

      if (new_point != odd_point) {
        const modifiedLine = line.substring(1).trim();
        modifiedLines.push('==============================');
        modifiedLines.push(modifiedLine);
        odd_point = new_point
        continue;
      }

      const modifiedLine = line.substring(1).trim();
      modifiedLines.push(modifiedLine);
    }
  }

  return modifiedLines;
}