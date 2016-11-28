import fs from 'fs';
import path from 'path';
import intel from 'intel';
import loggingConfig from '../../../logging.config.json';
import mkdirp from 'mkdirp';
import rotating from 'logrotate-stream';

let originalLogfilePath = loggingConfig.filePath;
let rootPath = path.join(__dirname, '..', '..', '..');
let logsPath = path.resolve(
  originalLogfilePath.substring(0, originalLogfilePath.lastIndexOf('/'))
);
let configPath = path.join(rootPath, 'logging.config.json');

let config = {};

if (!fs.existsSync(logsPath)) {
  mkdirp.sync(logsPath);
}

if (fs.existsSync(configPath)) {
  config = require(configPath);
} else {
  config = require('../../../logging.config.json');
}

intel.config(config);
intel.console();
intel.addHandler(
  new intel.handlers.Stream({
    stream: rotating({
      file: originalLogfilePath,
      // each file size is 1 gb
      size: '1GB',
      // keep 20 log files (summary 1 gb), oldest log files will be deleted
      keep: 20
    }),
    level: intel.ALL,
    formatter: new intel.Formatter({
      format: '%(date)s (%(levelname)s) [%(name)s] %(message)s'
    })
  })
);
