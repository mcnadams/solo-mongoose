const { Router } = require('express');
const User = require('../models/User');

module.exports = Router()
  .post('/', (req, res, next) => {
    const {
      handle,
      name,
      email
    } = req.body;

    User
      .create({ handle, name, email })
      .then(newUser => res.send(newUser))
      .catch(next);
  })
  
  .get('/:id', (req, res, next) => {
    User
      .findById(req.params.id)
      .then(user => res.send(user))
      .catch(next);
  })
  
  .patch('/:id', (req, res, next) => {
    const { email } = req.body;
    User
      .findByIdAndUpdate(req.params.id, { email }, { new: true })
      .then(updatedUser => res.send(updatedUser))
      .catch(next);
  })

  .delete('/:id', (req, res, next) => {
    User
      .findByIdAndDelete(req.params.id)
      .then(response => res.send(response))
      .catch(next);
  })
  
  .get('/', (req, res, next) => {
    User
      .find()
      .then(users => res.send(users))
      .catch(next);
  });
