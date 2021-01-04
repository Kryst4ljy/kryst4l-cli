const download = require("../libs/download");
const config = require("../config");

module.exports = (name, option) => {
  const URL = config[option];
  download(name, URL);
};
