import express, { Request, Response } from 'express'
import {
  GetVendorProfile,
  UpdateVendorProfile,
  UpdateVendorService,
  VendorLogin
} from '../controllers'
import { Authenticate } from '../middlewares'

const router = express.Router()

router.post('/login', VendorLogin)

router.use(Authenticate)
router.get('/profile', GetVendorProfile)
router.patch('/profile', UpdateVendorProfile)
router.patch('/service', UpdateVendorService)

export { router as VendorRouter }
