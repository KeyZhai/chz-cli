#!/usr/bin/env node
//声明当前的脚本环境是node

const { program } = require('commander')
const helpOptions = require('./core/help-options')
const { createVueProjectActions, addVueComponentActions,addReactComponentActions,createReactProjectAction } = require('./core/actions')

//1.处理--version的操作 解析-v和--version
const version = require("../package.json").version
program.version(version, '-v, --version')

//2.配置所有的options
helpOptions()

//3.创建一个项目模板
program
  .command('createv <project> [...others]')
  .description('create a vue project into a folder,such as chzcli create xxx')
  .action(createVueProjectActions)

//4.创建组件
program
  .command('addcpn <cpnname> [...others]')
  .description('add a vue component into a folder,such as chzcli addcpn xxx')
  .action(addVueComponentActions)

//5.创建react组件模板
program
 .command('addreactcpn <cpnname> [...others]')
 .description('add a react component into a folder,such as chzcli addreactcpn xxx')
 .action(addReactComponentActions)

//6.创建react项目模板
 program
  .command('creater <prject> [...others]')
  .description("create a react project into a folder,such as chzcli creater xxx")
  .action(createReactProjectAction)

// 让commander解析proccess.argv参数
program.parse(process.argv)

// 获取额外传递的参数
// console.log(program.opts().dest)
