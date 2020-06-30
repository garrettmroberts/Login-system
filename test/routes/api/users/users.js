const chai = require('chai');
const chaiHttp = require('chai-http');

const server = require('../../../../server');
const db= require('../../../../models');
const { User } = require('../../../../models');
const bcrypt = require('bcryptjs');

const assert = chai.assert;
chai.use(chaiHttp);

describe('API routes', () => {

  // Empty db between tests
  beforeEach((done) => {
    db.User.deleteMany({}, (err) => {
      done();
    });
  });

  describe('GET /api.users', () => {
    it('It should return an array of users in database', done => {
      chai
      .request(server)
      .get('/api/users')
      .end((err, res) => {
        assert.equal(res.status, 200);
        assert.isNull(err);
        assert.typeOf(res.body, 'array');
        done();
      });
    });
  });

  describe('POST /api/users', () => {
    it('It should create a new user instance in database', done => {
      chai
      .request(server)
      .post('/api/users')
      .send({
        "email": "geo@dude.com",
        "password": "sp0kaN3?",
        "firstName": "Angela",
        "lastName": "Perkins",
        "location": "San Diego, CA"
      })
      .end((err, res) => {
        assert.equal(res.status, 200);
        assert.isNull(err);
        assert.typeOf(res.body, 'object', 'Response should be an object.');
        assert.hasAllKeys(res.body, ['_id', 'email', 'password', 'firstName', 'lastName', 'location', 'createdAt', 'updatedAt', '__v', 'interests']);
        done();
      });
    });

    it('It should hash the password when saved.', done => {
      let user = new User({
        "email": "geo@dude.com",
        "password": "sp0kaN3?",
        "firstName": "Angela",
        "lastName": "Perkins",
        "location": "San Diego, CA"
      })
      chai
      .request(server)
      .post('/api/users')
      .send(user)
      .end((err, res) => {
        assert.equal(res.status, 200);
        assert.isNull(err);
        assert.isTrue(bcrypt.compareSync(user.password, res.body.password));
        done();
      });
    });

    it('It should not create a new instance with missing password', done => {
      chai
      .request(server)
      .post('/api/users')
      .send({
        "email": "geo@dude.com",
        "firstName": "Angela",
        "lastName": "Perkins",
        "location": "San Diego, CA"
      })
      .end((err, res) => {
        assert.equal(res.status, 422);
        assert.isNull(err);
        assert.typeOf(res.body, 'object', 'Response should be an object.');
        assert.property(res.body, 'errors');
        assert.propertyVal(res.body, 'message', 'User validation failed: password: Path `password` is required.');
        done();
      });
    });

    it('It should not create a new instance with missing firstName, lastName, or location', done => {
      chai
      .request(server)
      .post('/api/users')
      .send({
        "email": "geo@dude.com",
        "password": "sp0kaN3?"
      })
      .end((err, res) => {
        assert.equal(res.status, 422);
        assert.isNull(err);
        assert.typeOf(res.body, 'object', 'Response should be an object.');
        assert.property(res.body, 'errors');
        assert.propertyVal(res.body, 'message', 'User validation failed: location: Path `location` is required., lastName: Path `lastName` is required., firstName: Path `firstName` is required.');
        done();
      });
    });
  });

  describe('GET /api/users/id', () => {
    it('It should return the selected user by id', done => {
      let user = new User({
        "email": "geo@dude.com",
        "password": "sp0kaN3?",
        "firstName": "Angela",
        "lastName": "Perkins",
        "location": "San Diego, CA"
      });
      user.save((err, user) => {
        chai
        .request(server)
        .get(`/api/users/${user._id}`)
        .send(user)
        .end((err, res) => {
          assert.equal(res.status, 200);
          assert.isNull(err);
          assert.typeOf(res.body, 'object', 'Response should be an object.');
          assert.containsAllKeys(res.body, ['email', 'password', 'firstName', 'lastName', 'location', '_id']);
          assert.equal(res.body._id, user._id);
          done();
        });
      });
    });

    it('It should return null if given an id that does not exist in db', done => {
      chai
      .request(server)
        .get('/api/users/5ef666b0ce00a0125b51491c')
        .end((err, res) => {
          assert.equal(res.status, 200);
          assert.isNull(err);
          assert.isNull(res.body);
          done();
        })
    })
  });

  describe('POST /api/users/login', () => {
    it('It should log in a user when username and password are correct', done => {
      let user = new User({
        "email": "geo@dude.com",
        "password": "sp0kaN3?",
        "firstName": "Angela",
        "lastName": "Perkins",
        "location": "San Diego, CA"
      });

      chai
      .request(server)
      .post('/api/users')
      .send(user)
      .then(() => {
        chai
        .request(server)
        .post('/api/users/login')
        .send({
          "email": "geo@dude.com",
          "password": "sp0kaN3?",
        })
        .end((err, res) => {
          assert.equal(res.status, 200);
          assert.isNull(err);
          assert.typeOf(res.body, 'object', 'Response should be an object.');
          assert.equal(res.body.email, user.email);
           assert.isTrue(bcrypt.compareSync(user.password, res.body.password));
          done();
        });
      });
    });

    it('It should not login if password and email do not match', done => {
    let user = new User({
      "email": "geo@dude.com",
      "password": "sp0kaN3?",
      "firstName": "Angela",
      "lastName": "Perkins",
      "location": "San Diego, CA"
    });

    chai
    .request(server)
    .post('/api/users')
    .send(user)
    .then(() => {
      chai
      .request(server)
      .post('/api/users/login')
      .send({
        "email": "geo@dude.com",
        "password": "sp00kaN3?",
      })
      .end((err, res) => {
        assert.equal(res.status, 401);
        assert.isNull(err);
        assert.typeOf(res.body, 'object', 'Response should be an empty object.');
        done();
      });
    });
  });
  });

  
});