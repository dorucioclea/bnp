'use strict';

let config = require('../package.json');
let util = require('./common');
let through = require('through2');
let gutil = require('gulp-util');
let path = require('path');

// checks configuration
if (!config.maven) {
  throw new gutil.PluginError('plugin-install', 'Maven section not found in package.json!');
}

if (config.maven.groupId === undefined) {
  throw new gutil.PluginError('mvn-install', 'Undefined maven [groupId] in configuration')
}

if (config.maven.artefactId === undefined) {
  throw new gutil.PluginError('mvn-install', 'Undefined maven [artefactId] in configuration')
}

module.exports = function (gulp) {

  /**
   * The task installing grails plugin to local repository.
   */
  gulp.task('plugin-install', function () {
    let install = function (groupId, artefactId, version) {
      let stream = this;
      let packaging = config.maven.packaging !== undefined ? config.maven.packaging : 'zip';
      return through.obj(function (file, enc, cb) {
        util.command('mvn -B install:install-file -Dfile=' + file.path + ' -DgroupId=' + groupId + ' -DartifactId=' + artefactId + ' -Dversion=' + version + ' -Dpackaging=' + packaging, function (err, stdout, stderr) {
          if (err) {
            stream.emit('error', new gutil.PluginError('mvn-install', err));
          } else {
            cb();
          }
        });
      });
    };

    let version = util.getMavenArtefactVersion();
    let filepath = path.join('./build', util.getMavenArtefactName(version));

    gulp.src(filepath)
      .pipe(install(config.maven.groupId, config.maven.artefactId, version));
  });
};
