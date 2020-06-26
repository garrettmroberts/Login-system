const router = require('express').Router();
const userController = require('../../controllers/userController');

// should match /api/users/
router
  .route('/')
  .get(userController.findAll)
  .post(userController.addUser);

router
  .route('/:id')
  .get(userController.findById)
  .delete(userController.removeById)

module.exports = router;