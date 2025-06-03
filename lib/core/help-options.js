const { program } = require("commander");

function helpOptions() {
  //2.增加其他的options的操作,可以使用--help查看
  program.option("-z --chz", "a mini-cli program");
  program.option(
    "-d --dest <dest>",
    "a destination folder, for example: -d src/components"
  );

  // 监听--help操作，输出其他内容
  program.on("--help", function () {
    console.log("");
    console.log("Other:");
    console.log("coded by zhaichanghao");
  });
}

module.exports = helpOptions;
