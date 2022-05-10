const {Router} = require("express")
const {pruebaControllerGet,pruebaControllerPost,pruebaControllerPut,pruebaControllerDelete} = require("../controllers/prueba-controller")
const router = Router();

router.get("/",[],pruebaControllerGet)

router.post("/",[],pruebaControllerPost)

router.put("/",[],pruebaControllerPut)

router.delete("/",[],pruebaControllerDelete)



module.exports = router;