let bnpUrl = require('../../../service.config.json').bnp.public;
let appConfig = require('../../../app.config.json');
let formatPatternsConfig = require('../../../formatPatterns.config.json');

function getUrl(req, res) {
  res.send(bnpUrl);
}

function getDefaultLocale(req, res) {
  console.info(`Trying to get default locale from the client request`);
  let locale = req.acceptsLanguages(appConfig.avaliableLocales);
  if (!locale) {
    locale = appConfig.defaultLocale;
    console.info(`Fetching default locale ${locale} from config file.`);
  }
  console.info(`Sending default locale ${locale} to the client.`);
  res.send(locale);
}

function getFormatPatterns(req, res) {
  res.send(formatPatternsConfig);
}

module.exports = {
  getUrl,
  getDefaultLocale,
  getFormatPatterns
};
