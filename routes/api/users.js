const router = require('express').Router();
const userController = require('../../controllers/userController');
const passport = require('../../scripts/passport');

// should match /api/users/
router
  .route('/')
  .get(userController.findAll)
  .post(userController.addUser);

// Matches /api/users/:id
router
  .route('/:id')
  .get(userController.findById)
  .delete(userController.removeById);

// matches /api/users/login
router
  .route('/login')
  .post(passport.authenticate('local'), (req, res) => {
    if (req.user) {return res.json(req.user)}
    return res.json(null);
  });

// matches /api/users/login
router
  .route('/logout')
  .post((req, res) => {
    req.logout();
    res.redirect('/');
  });

module.exports = router;