#!/usr/bin/env node
const program = require("commander");
const create = require("./create");

// 绑定版本信息以及描述信息
program
  .version(`version is ${require("../package.json").version}`)
  .description("kryst4l cli to build some project");

/**
 * @此命令用于创建各种项目初始化模板
 * @command create
 * @option -r --react 用于创建react-ts模板
 */
program
  .command("create <project name>")
  .option("-r, --react", "create a react-ts project")
  .option("-e, --express", "create a express-ts project")
  .action((dir, cmdObj) => {
    // 因为文件名是必传，所以不需要判空
    // 根据选项来构建不同的模板项目
    if (cmdObj.react) {
      // react模板
      create(dir, "react");
      return;
    } else if (cmdObj.express) {
      // express模板
      create(dir, "express");
      return;
    }
    console.log("you should select a option to choose project");
    console.log("please use KCLI -h");
  });

program.parse(process.argv);
