const chai = require('chai');
const chaiHttp = require('chai-http');

let should = chai.should();
chai.use(chaiHttp);

function createObject(object, model) {
  return model.create(object);
}

function cloneObject(object) {
  let objectProperties = Object.keys(object);
  let clonedObject = {};
  objectProperties.forEach(property => {
    clonedObject[property] = object[property];
  });
  return clonedObject;
}

function doRequest(app, url, method, objectToSave) {
  return chai.request(app)[method](url).set({
    Accept: 'application/json'
  }).send(objectToSave);
}

function postWithoutNotNullableField(object, missingFieldName, app, url, done) {
  let objectToSave = cloneObject(object);
  delete(objectToSave[missingFieldName]);
  doRequest(app, url, 'post', objectToSave).end((err, res) => {
    let body = JSON.parse(res.text);
    res.should.have.status(400);
    body.should.be.a('object');
    body.should.have.property('errors');
    body.errors.should.be.a('array');
    body.errors.length.should.be.eql(1);
    body.errors[0].field.should.be.eql(missingFieldName);
    done();
  });
}

function postWithoutNullableField(object, missingFieldName, app, url, requiredFieldList, idFieldName, done) {
  let objectToSave = cloneObject(object);
  if (missingFieldName) {
    delete(objectToSave[missingFieldName]);
  }
  doRequest(app, url, 'post', objectToSave).end((err, res) => {
    let body = JSON.parse(res.text);
    res.should.have.status(201);
    body.should.be.a('object');
    body.should.have.property(idFieldName);
    requiredFieldList.forEach(requiredFieldName => {
      body.should.have.property(requiredFieldName);
      body[requiredFieldName].should.be.eql(objectToSave[requiredFieldName]);
    });
    if (missingFieldName) {
      should.not.exist(body[missingFieldName]);
    }
    done();
  });
}

export default {
  createObject: createObject,
  cloneObject: cloneObject,
  doRequest: doRequest,
  postWithoutNotNullableField: postWithoutNotNullableField,
  postWithoutNullableField: postWithoutNullableField
};
