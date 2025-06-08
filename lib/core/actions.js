const { promisify } = require('util')
// promisify 将函数promise化，使得函数支持promise
const download = promisify(require('download-git-repo'))
const { VUE_REPO, REACT_REPO } = require('../config/repo')
// const { execCommand } = require('../utils/exec-command')
const compileEjs = require('../utils/compile-ejs')
const writeFile = require('../utils/write-file')
const {program} = require('commander')

async function createVueProjectActions (project) {
  try {
    //1. 将编写的项目模板clone下来
    await download(VUE_REPO, project, { clone: true })
    //2. 很多的脚手架，在这里给予提示
    console.log('项目创建成功~~')
    console.log('cd ' + project)
    console.log('npm install')
    console.log('npm run dev')


    // const commandName = process.platform === 'win32' ? 'npm.cmd' : 'npm'
    // 3.帮助执行npm install
    // execCommand(执行的命令，具体的命令，在哪个文件夹下执行 )
    // await execCommand(commandName, ['install'], { cwd: `./${project}` })
    // 4，帮助执行npm run dev
    // await execCommand(commandName, ['run', 'dev'], { cwd: `./${project}` })
  } catch (err) {
    console.log('项目创建失败', err)
  }
}


async function createReactProjectAction(project){
  await download(REACT_REPO, project, {clone:true})
  //创建成功提示
  console.log('项目创建成功~~')
  console.log('cd '+ project)
  console.log('npm install')
  console.log('npm run dev')
}

async function addVueComponentActions (cpnname) {
  // 1.创建一个组件,编写组件模板，根据内容进行渲染
  const result = await compileEjs('component.vue.ejs', {
    name: cpnname,
    lowername: cpnname.toLowerCase()
  })
  //2.将组件放到指定的文件夹下
  //program.opts()返回一个包含所有解析后的选项的对象
  // desk用来传递--desk选项的值 chzcli addcpn MyComponent --dest src/custom-components
  const dest = program.opts().dest || "src/components"
  await writeFile(`${dest}/${cpnname}.vue`, result)

  //3.提示用户创建成功
  console.log(`组件${cpnname}创建成功`)
}

async function addReactComponentActions(cpnname){
  const result = await compileEjs('component.tsreact.ejs',{
    name: cpnname,
    lowername: cpnname.toLowerCase()
  })

  const dest = program.opts().dest || "src/components"
  await writeFile(`${dest}/${cpnname}.tsx`, result)

  //提示用户
  console.log(`组件${cpnname}创建成功`)
}

module.exports = {
  createVueProjectActions,
  addVueComponentActions,
  addReactComponentActions,
  createReactProjectAction
}