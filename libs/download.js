const ora = require("ora");
const chalk = require("chalk");
const logSymbols = require("log-symbols");
const fs = require("fs");
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
const gitCloneFile = (target, downLoadURL) => {
  return new Promise(async (resolve, reject) => {
    const spinner = ora({
      text: `正在下载模板：${chalk.cyan(downLoadURL)}`,
    }).start();
    // 先检测文件名是否存在
    // 获取当前工作目录的路径
    const fsDefault = await new Promise((resolve, reject) => {
      fs.access(target, fs.constants.F_OK, (err) => {
        err ? resolve(true) : resolve(false);
      });
    }).catch((error) => {
      console.log("error：", error);
    });
    if (!fsDefault) {
      spinner.stop();
      reject("当前目录文件夹已经存在！");
      return;
    }
    // 下载模板
    const r = await shell(`git clone ${downLoadURL}  ${target}`);
    if (r !== "success") {
      reject();
      return;
    }
    spinner.succeed(chalk.green("模板下载完成！"));
    resolve("success");
  }).catch((error) => {
    console.log(`${chalk.red(error)}`);
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
    // 从git下载模板
    const r = await gitCloneFile(target, downLoadURL);
    if (r !== "success") {
      resolve("下载失败");
      return;
    }
    resolve("下载成功");
  });
};
