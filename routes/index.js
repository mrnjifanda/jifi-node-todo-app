var express = require('express');
var router = express.Router();
var Tasks = require('../models/Task');

/* GET home page. */
router.get('/', async (req, res, next) => {
  await Tasks.find()
    .sort({created_at: -1})
    .then((tasks) => {
      res.render('index',  { tasks });
    })
    .catch((e) => console.error(e));
});

/* GET Edit page. */
router.get('/edit/:id', async (req, res, next) => {
  await Tasks.findOne({_id: req.params.id})
    .then((task) => {
      res.render('edit',  { task });
    })
    .catch((e) => console.error(e));
});

/* GET Mark done. */
router.get('/done/:id', async (req, res, next) => {
  await Tasks.findOne({_id: req.params.id})
  .then(async (task) => {
    await Tasks.updateOne({_id: req.params.id}, {status: task.status ? false : true, _id: req.params.id})
    .then(() =>  res.redirect('/'))
  })
  .catch((e) => console.error(e));
});

/* Add task. */
router.post('/add', (req, res, next) => {
  const newTask = {
    title: req.body.title,
    date: req.body.date,
    description: req.body.description,
  };

  new Tasks(newTask).save().then((task) => res.redirect('/'));
});

/* Edit task. */
router.post('/edit/:id', (req, res, next) => {
  Tasks.updateOne({_id: req.params.id}, {...req.body, _id: req.params.id})
  .then(() => res.redirect('/'))
  .catch((e) => console.error(e));
});

/* delete. */
router.post('/delete/:id', (req, res, next) => {
  Tasks.remove({_id: req.params.id})
    .then(() => res.redirect('/'))
    .catch((e) => console.error(e));
});

module.exports = router;