import express, { NextFunction, Request, Response } from 'express'
import { CreateVendor, GetVendorById, GetVendors } from '../controllers'

const router = express.Router()

router.get('/vendors', GetVendors)
router.get('/vendors/:id', GetVendorById)
router.post('/vendors', CreateVendor)

router.get('/', (req: Request, res: Response, next: NextFunction) => {
  return res.json({ message: 'Wena Qlio from Admin' })
})

export { router as AdminRouter }
