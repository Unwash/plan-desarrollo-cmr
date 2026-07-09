const {Router} = require("express")
const { postResponse } = require("../controllers/github-controller")
const router = Router();

router.post("/issue-review",[],postResponse)

module.exports = router;