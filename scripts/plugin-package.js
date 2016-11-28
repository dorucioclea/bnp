'use strict';

let config = require('../package.json');
let util = require('./common');
let through = require('through2');
let gutil = require('gulp-util');
let File = gutil.File;
let handlebars = require('handlebars');
let zip = require('gulp-zip');
let fs = require('fs');
let globule = require('globule');
let path = require('path');

if (!config.grails || !config.maven) {
  throw new gutil.PluginError('plugin-package', 'Grails and Maven sections not found in package.json!');
}

function createFile(path, text) {
  let buffer = new Buffer(text, 'utf8');
  return new File({
    path: path,
    contents: buffer
  });
}

function capitalize(string) {
  return string.charAt(0).toUpperCase() + string.substring(1);
}

function pluginName(artefactId) {
  let parts = artefactId.split('-');

  let result = [parts[0]];

  for (let i = 1; i < parts.length; i++) {
    let part = parts[i];

    result.push(capitalize(part));
  }

  return result.join('');
}

function addFiles(files) {
  return through.obj(function (file, enc, cb) {
    this.push(file);
    cb();
  }, function (cb) {
    for (let i = 0; i < files.length; i++) {
      this.push(files[i]);
    }
    cb();
  });
}

/**
 * Exports grails tasks
 *
 * @param gulp - gulp instance
 */
module.exports = function (gulp) {

  gulp.task('plugin-package', function () {
    let release = (process.argv.indexOf("--release") > -1);
    let name = pluginName(config.maven.artefactId);

    let pluginPrefix = capitalize(name);
    let mavenArtefactVersion = util.getMavenArtefactVersion(release);

    let pluginFiles = [];

    pluginFiles.push(
      createFile('application.properties',
        handlebars.compile(fs.readFileSync(__dirname + '/templates/application.hbs').toString())({
          grailsVersion: config.grails.version || '',
          app: {
            name: config.maven.artefactId || '',
            version: mavenArtefactVersion || ''
          }
        })
      )
    );

    pluginFiles.push(
      createFile('plugin.xml',
        handlebars.compile(fs.readFileSync(__dirname + '/templates/plugin.hbs').toString())({
          pluginName: config.maven.artefactId,
          pluginPrefix: pluginPrefix,
          author: config.author.name || '',
          email: config.author.email || '',
          title: `Auto-generated for ${config.name }`,
          description: config.description || '',
          version: mavenArtefactVersion || '',
          artefactId: config.maven.artefactId || ''
        })
      )
    );

    pluginFiles.push(
      createFile(pluginPrefix + 'GrailsPlugin.groovy',
        handlebars.compile(fs.readFileSync(__dirname + '/templates/descriptor.hbs').toString())({
          pluginPrefix: pluginPrefix,
          author: config.author.name || '',
          email: config.author.email || '',
          title: `Auto-generated for ${config.name}`,
          description: config.description || '',
          version: mavenArtefactVersion || '',
          groupId: config.maven.groupId || ''
        })
      )
    );

    pluginFiles.push(
      createFile('grails-app/conf/' + pluginPrefix + 'Resources.groovy',
        handlebars.compile(fs.readFileSync(__dirname + '/templates/modules.hbs').toString())({
          resources: config.grails.resources,
          pluginName: config.maven.artefactId
        })
      )
    );

    for (let resId in config.grails.resources) {
      let resource = config.grails.resources[resId];
      for (let i = 0; i < resource.length; i++) {
        let content = fs.readFileSync('./dist/' + resource[i].file.name).toString();
        pluginFiles.push(
          createFile('web-app/js/' + resource[i].file.name, content)
        )
      }
    }

    let javaSrcs = globule.find(config.grails.javaSrc + '/**/*.js');
    for (let i = 0; i < javaSrcs.length; i++) {
      let file = javaSrcs[i];
      pluginFiles.push(
        createFile('src/java/' + path.relative(config.grails.javaSrc, file), fs.readFileSync(file).toString())
      )
    }

    let doc = globule.find('./esdoc/**/*.*');
    for (let i = 0; i < doc.length; i++) {
      let file = doc[i];
      pluginFiles.push(
        createFile('web-app/docs/' + path.relative('./esdoc', file), fs.readFileSync(file).toString())
      )
    }

    return gulp.src([])
      .pipe(addFiles(pluginFiles))
      .pipe(zip(util.getMavenArtefactName(mavenArtefactVersion)))
      .pipe(gulp.dest('./build'))
  });
};
