const config = require('./../../../app.config.json');
const nodemailer = require('nodemailer');
const path = require('path');
const { EmailTemplate } = require('email-templates');

let smtpTransport = nodemailer.createTransport(config.mail.options);

function sendMail(mailProps) {
  return new Promise((resolve, reject) => smtpTransport.sendMail(
    mailProps,
    err => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    }
  ));
}

module.exports = (locale, templateName, params) => new Promise((resolve, reject) => {
  if (! params.email) {
    return reject('no email provided');
  }

  let templateDir = path.resolve(__dirname, './../../../resources/jcatalog/mailer', templateName, locale);
  let template = new EmailTemplate(templateDir);
  let signatureTemplateDir = path.resolve(__dirname, './../../../resources/jcatalog/mailer/footer', locale);
  let signatureTemplate = new EmailTemplate(signatureTemplateDir);

  return Promise.all([
    template.render(params),
    signatureTemplate.render(params)
  ]).then(([templateResult, signatureResult]) => sendMail({
    from: config.mail.defaultFromAddress,
    to: params.email,
    cc: params.cc,
    subject: templateResult.subject,
    html: templateResult.html + signatureResult.html,
    text: templateResult.text,
    signature: signatureTemplate
  })).then(() => {
    console.info(`Email delivered to ${params.email}, template: ${templateName}`);
    resolve();
  }).catch(err => {
    console.warn(`Error sending email to ${params.email}, template: ${templateName}`);
    console.error(err);
    reject(err);
  });
});
