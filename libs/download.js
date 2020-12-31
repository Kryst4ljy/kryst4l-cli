const ora = require("ora");
const chalk = require("chalk");
const logSymbols = require("log-symbols");
const { spawnSync, exec } = require("child_process");

const shell = (cmdStr) => {
  return new Promise((resolve, reject) => {
    exec(cmdStr, (err, stdout, stderr) => {
      if (err) {
        reject("get weather api error:" + stderr);
      } else {
        resolve("success");
      }
    });
  });
};

// 从git下载模板方法
const gitCloneFile = async (target, downLoadURL) => {
  // 先检测文件名是否存在，此步骤未做
  // 下载模板
  const r = await shell(`git clone ${downLoadURL}  ${target}`);
  return new Promise((resolve, reject) => {
    if (r !== "success") {
      reject("error");
      return;
    }
    resolve("success");
  });
};

module.exports = function (target, downLoadURL) {
  let { error } = spawnSync("git", ["--version"]);
  if (error) {
    console.log(
      logSymbols.warning,
      chalk.yellow("未添加Git环境变量引起，添加Git与git管理库的环境变量即可；")
    );
    return Promise.reject(error);
  }

  return new Promise(async (resolve, reject) => {
    const spinner = ora(`正在下载模板`);
    spinner.start();
    console.log("\n", downLoadURL);
    // 从git下载模板
    const r = await gitCloneFile(target, downLoadURL);
    if (r !== "success") {
      reject();
    }
    spinner.succeed();
    resolve(target);
  });
};
