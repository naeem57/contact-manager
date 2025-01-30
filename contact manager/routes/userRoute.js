const express = require ("express");
const {signup, login} = require("../controllers/user");
const authenticator = require("../middlewares/validator.js");


const router = express.Router();

router.post('/signup', signup);
router.post("/login", login); 


module.exports = router;



