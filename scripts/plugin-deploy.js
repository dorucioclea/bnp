'use strict';

let config = require('../package.json');
let util = require('./common');
let through = require('through2');
let gutil = require('gulp-util');
let path = require('path');

// checks configuration
if (!config.maven) {
  throw new gutil.PluginError('plugin-deploy', 'Maven section not found in package.json!');
}

if (config.maven.groupId === undefined) {
  throw new gutil.PluginError('mvn-deploy', 'Undefined maven [groupId] in configuration')
}

if (config.maven.artefactId === undefined) {
  throw new gutil.PluginError('mvn-deploy', 'Undefined maven [artefactId] in configuration')
}

module.exports = function (gulp) {

  /**
   * The task deploying grails plugin to remote repository
   */
  gulp.task('plugin-deploy', function () {
    let release = (process.argv.indexOf("--release") > -1);

    let deploy = function (groupId, artefactId, version) {
      let stream = this;
      let releasedVersion = version.indexOf('-SNAPSHOT') == -1;
      let repositoryId = releasedVersion ? config.maven.repositories.releases.id : config.maven.repositories.snapshots.id;
      let repositoryUrl = releasedVersion ? config.maven.repositories.releases.url : config.maven.repositories.snapshots.url;

      if (repositoryUrl === undefined) {
        throw new gutil.PluginError('mvn-deploy', 'Undefined maven repository URL in configuration')
      }
      if (repositoryId === undefined) {
        throw new gutil.PluginError('mvn-deploy', 'Undefined maven repository ID in configuration')
      }

      let packaging = config.maven.packaging !== undefined ? config.maven.packaging : 'zip';
      return through.obj(function (file, enc, cb) {
        util.command('mvn -B deploy:deploy-file -Dfile=' + file.path + ' -Durl=' + repositoryUrl + ' -DrepositoryId=' + repositoryId + ' -DgroupId=' + groupId + ' -DartifactId=' + artefactId
          + ' -Dversion=' + version + ' -Dpackaging=' + packaging, function (err, stdout, stderr) {
          if (err) {
            stream.emit('error', new gutil.PluginError('mvn-deploy', err));
          } else {
            cb();
          }
        });
      });
    };

    let version = util.getMavenArtefactVersion(release);
    let filepath = path.join('./build', util.getMavenArtefactName(version));

    gulp.src(filepath)
      .pipe(deploy(config.maven.groupId, config.maven.artefactId, version))
  });
};
