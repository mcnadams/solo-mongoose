const mongoose = require('mongoose');
const request = require('supertest');
const app = require('../lib/app');
const Tweet = require('../lib/models/Tweet');
require('dotenv').config();

describe('tweet routes', () => {
  beforeAll(() => {
    mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true
    });
  });
  beforeEach(() => {
    return mongoose.connection.dropDatabase();
  });
  afterAll(() => {
    return mongoose.connection.close();
  });

  it('can create a new tweet', () => {
    return request(app)
      .post('/tweets')
      .send({
        handle: 'bonnie',
        body: 'my first tweet'
      })
      .then(res => {
        expect(res.body).toEqual({
          handle: 'bonnie',
          body: 'my first tweet',
          _id: expect.any(String),
          __v: 0
        });
      });
  });

  it('can get all tweets', () => {
    return Tweet
      .create({ handle: 'bonnie', body: 'tweet' })
      .then(() => {
        return request(app)
          .get('/tweets');
      })
      .then(res => {
        expect(res.body).toHaveLength(1);
      });
  });

  it('can get a tweet by id', () => {
    return Tweet
      .create({ handle: 'barry', body: 'meow' })
      .then(createdTweet => createdTweet._id)
      .then(id => {
        return request(app)
          .get(`/tweets/${id}`);
      })
      .then(res => {
        expect(res.body).toEqual({
          handle: 'barry',
          body: 'meow',
          _id: expect.any(String),
          __v: 0
        });
      });
  });

  it('can update an existing tweet', () => {
    return Tweet
      .create({ handle: 'barry', body: 'meow' })
      .then(createdTweet => createdTweet._id)
      .then(id => {
        return request(app)
          .patch(`/tweets/${id}`)
          .send({
            body: 'meow meow!'
          });
      })
      .then(res => {
        expect(res.body).toEqual({
          handle: 'barry',
          body: 'meow meow!',
          _id: expect.any(String),
          __v: 0
        });
      });
  });

});
