import express from 'express'
import{ addVehicle, assignDriver,getVehicle} from '../controllers/vehicle.controller'
import {checkRole} from '../middlewares/role.middleware'
import rateLimiter from '../middlewares/rateLimiter.middleware'

const router = express.Router()

router.post('/add',
      checkRole('owner'), rateLimiter,addVehicle)
      router.patch('assign-driver/:vehicleId',
            checkRole('owner'), assignDriver)
            router.get('/:vehicleId',getVehicle)

            export default router
      