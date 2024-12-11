const path = require('path')
const ejs = require('ejs')

function compileEjs (tempName, data) {
  return new Promise((resolve, reject) => {
    // 1.获取当前模板的路径
    const templatePath = `../template/${tempName}`
    const absolutePath = path.resolve(__dirname, templatePath)
    //2.使用ejs渲染模板
    ejs.renderFile(absolutePath, data, (err, result) => {
      if (err) {
        reject(err)
        return
      }
      resolve(result)
    })
  })
}



module.exports = compileEjs