let logFilePath = require('../../../logging.config.json').filePath;
let fs = require('fs');
require('express-zip');

function downloadLogs(req, res) {
  let fileName = req.url.substring(1).substr(0, req.url.substring(1).indexOf('.'));
  let dirPath = logFilePath.substring(0, logFilePath.lastIndexOf('/'));
  let logFilesToPack = [];
  fs.readdirSync(dirPath).reduce(function(list, file) {
    if (file.indexOf('.log') >= 0) {
      logFilesToPack.push({
        path: `${dirPath}/${file}`,
        name: file
      });
    }
  }, []);
  res.zip(logFilesToPack, `${fileName}.zip`);
}

module.exports = {
  downloadLogs: downloadLogs
};
