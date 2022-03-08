import 'mocha';
import { expect } from 'chai';
import request from 'supertest';
import Server from '../../..';

describe('Health', () => {
  it('should be healthy', () =>
    request(Server)
      .get('/api/v1/health')
      .expect('Content-Type', /json/)
      .then((r) => {
        expect(r.body).to.be.an('object').has.property('message').equal('ok');
      }));
});
