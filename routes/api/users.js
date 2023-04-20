const express = require('express');
const router = express()
const usersCtrl = require('../../controllers/api/users')
const ensureLoggedIn = require('../../config/enusreLoggedIn');



// POST /api/users
router.post('/',usersCtrl.create);
// POST /api/users/login
router.post('/login',usersCtrl.login);
// GET /api/users/check-token
router.get('/check-token', ensureLoggedIn, usersCtrl.checkToken)



module.exports = router;

