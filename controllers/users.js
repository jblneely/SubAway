var express = require('express');
var User = require('../models/user');
var router = express.Router();

router.route('/')
    .get(function(req, res) {
        User.find(function(err, users) {
            if (err) return res.status(500).send(err);

            return res.send(users);
        });
    })
    .post(function(req, res) {
        // find the user first in case the email already exists
        User.findOne({ email: req.body.email }, function(err, user) {
            if (user) return res.status(400).send({ message: 'This email is already in use' });

            User.create(req.body, function(err, user) {
                if (err) return res.status(500).send(err);

                return res.send(user);
            });
        });
    });

  router.post('/newusertask', function(req, res) {
    console.log('reached newusertask route');
    console.log(req.body);
    User.findByIdAndUpdate(req.body.userId, { $push: { subscriptions: {title: req.body.title, image: req.body.image, dueDate: req.body.dueDate, price: req.body.price, useScore: req.body.price, canceledDate: req.body.canceledDate, completed: false
 }}
},
      function(err, result) {
        if(err) {
          return res.send('error!', err);
        }
        res.send('success');
      });
  });

router.get('/:id', function(req, res) {
  console.log('sldfjdgukzjgdfj', req.params.id);
    User.findById(req.params.id, function(err, user) {
        console.log('sucess', err, user);
        if (err) return res.status(500).send(err);

        return res.send(user);
    });
});


module.exports = router;
