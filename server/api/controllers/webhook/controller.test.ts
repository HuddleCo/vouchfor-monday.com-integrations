import 'mocha';
import { expect } from 'chai';
import request from 'supertest';
import Server from '../../..';

describe('Webhook', () => {
  it('should respond successfully', () =>
    request(Server)
      .post('/api/v1/webhook')
      .send({
        event: {
          name: 'vouch.published',
          vouch: {
            externalid: 'EXTERNAL_ID',
            url: 'https://example.com',
          },
        },
      })
      .expect('Content-Type', /json/)
      .then((r) => {
        expect(r.body).to.be.an('object').has.property('message').equal('ok');
      }));

  context('when the body is empty', () => {
    it('should return validation errors', () =>
      request(Server)
        .post('/api/v1/webhook')
        .expect('Content-Type', /json/)
        .then((r) => {
          expect(r.body)
            .to.have.deep.property('errors')
            .that.is.an('array')
            .have.nested.property('[0]')
            .that.deep.equals({
              path: '/api/v1/webhook',
              message: 'unsupported media type undefined',
            });
        }));
  });
  context('when the event.name is missing', () => {
    it('should return validation errors', () =>
      request(Server)
        .post('/api/v1/webhook')
        .expect('Content-Type', /json/)
        .send({
          event: {
            vouch: {
              externalid: 'EXTERNAL_ID',
              url: 'https://example.com',
            },
          },
        })
        .then((r) => {
          expect(r.body)
            .to.have.deep.property('errors')
            .that.is.an('array')
            .have.nested.property('[0]')
            .that.deep.equals({
              errorCode: 'required.openapi.validation',
              message: "should have required property 'name'",
              path: '.body.event.name',
            });
        }));
  });
});
