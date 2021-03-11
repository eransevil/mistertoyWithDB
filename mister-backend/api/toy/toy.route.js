const express = require('express')
const {log} = require('../../middlewares/logger.middleware')
const {requireAuth, requireAdmin} =  require('../../middlewares/requireAuth.middleware')
const router = express.Router()
const { getToys, getToyById, addToy,updateToy,removeToy} = require('./toy.controlller')

router.get('/', log,  getToys)
router.get('/:toyId', log, getToyById)
router.post('/', log, requireAuth, requireAdmin, addToy)
router.put('/:toyId', log, requireAuth, requireAdmin, updateToy)
router.delete('/:toyId', log, requireAuth, requireAdmin, removeToy)


module.exports = router