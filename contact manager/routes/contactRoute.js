const express = require ("express");
const {createContact, getMyContact, updateMyContact} = require ("../controllers/contact.js");
const authenticator = require("../middlewares/validator.js");
const router = express.Router();

router.use(authenticator)
router.post("/contact", createContact);
router.get("/my-contact", getMyContact);
router.patch("/update/:id", updateMyContact);


module.exports = router;