const download = require("../libs/download");

const react = (name) => {
  const reactURL = "https://github.com/Kryst4ljy/react-ts.git";
  download(name, reactURL);
};

exports.react = react;
