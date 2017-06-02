var express = require('express');
var Task = require('../models/task');
var User = require('../models/user');
var router = express.Router();

router.route('/')
    .get(function(req, res) {
        console.log('fnc reached');
        Task.find(function(err, tasks) {
            if (err) return res.status(500).send(err);
            return res.send(tasks);
        });
    })
    .post(function(req, res) {
        Task.create(req.body, function(err, task) {
            if (err) return res.status(500).send(err);
            return res.send(task);
        }, function(err,task){
            if (err) return res.status(500).send(err);
            User.findByIdAndUpdate(req.body.userId, { $push: { completedTask: req.body.id } },
                function(err, user) {
                    if (err) {
                        console.log('user not updated', err);
                    } else {
                        console.log('user was updated', user);
                    }
                    return res.send({ task: task });
                });

        });
    })
    .put(function(req, res) {
        Task.findByIdAndUpdate(req.body.id, {
            completed: true,
            completedDate: Date.now()
        }, function(err, task) {
            if (err) return res.status(500).send(err);
            //User table add taskId to completed

            // console.log('user is', req.body.userId);
            User.findByIdAndUpdate(req.body.userId, { $push: { completedTask: req.body.id } },
                function(err, user) {
                    if (err) {
                        console.log('user not updated', err);
                    } else {
                        console.log('user was updated', user);
                    }
                    return res.send({ task: task });
                });
        });
    });

router.route('/:id')
    .get(function(req, res) {
      console.log('get id')
        Task.findById(req.params.id, function(err, task) {
            if (err) return res.status(500).send(err);
            return res.send(task);
        });
    })
    .delete(function(req, res) {
        Task.findByIdAndRemove(req.params.id, function(err) {
            if (err) return res.status(500).send(err);

            return res.send({ message: 'success' });
        });
    });


router.get('/usertasks/:id', function(req, res) {
    console.log('in /usertasks/:id', 'ID is', req.params.id);
    console.log(res);
    User.findOne({ _id: req.params.id })
        .populate('completedTask')
        .exec(function(err, user) {
            console.log('user with populated tasks:', user);
            res.send({ user: user });
        })
        .catch(function(err) {
            console.log('something wrong', err);
            res.send({ error: err });
        });
});


module.exports = router;
