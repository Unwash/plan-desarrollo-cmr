const {Router} = require("express")
const {postEntries, getEntry, updateEntry, deleteEntry, getEnabledCategories} = require("../controllers/entry-controller")
const router = Router();

router.get("/",[],getEnabledCategories)

router.get("/:id",[],getEntry)

router.post("/",[],postEntries)

router.put("/:id",[],updateEntry)

router.delete("/:id",[],deleteEntry)



module.exports = router;