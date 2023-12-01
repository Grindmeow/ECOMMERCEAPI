const router = require("express").Router();

const { verifyToken, verifyTokenAndAuthorization } = require("./verifyToken");

//Update
router.put("/:id", verifyTokenAndAuthorization, (req, res) => {

})



module.exports = router