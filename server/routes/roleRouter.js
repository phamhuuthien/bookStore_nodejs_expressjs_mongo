const router = require('express').Router();
const controller = require('../controller/roleController')
const {verifyToken,isAdmin} = require('../middlewares/verifyToken')

router.post('/',verifyToken,isAdmin,controller.createRole)
router.delete('/:rid',verifyToken,isAdmin,controller.deleteRole)


module.exports = router