const router = require('express').Router();
const apiRoutes = require('./api');

router.use('/api', apiRoutes);

// Connect to react app here

module.exports = router;