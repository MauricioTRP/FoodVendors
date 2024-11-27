import { Request, Response, NextFunction } from 'express'
import { CreateVendorInput } from '../dto'
import { Vendor } from '../models'
import { GeneratePassword, GenerateSalt } from '../utils'

export const FindVendor = async (id: string | undefined, email?: string) => {
  if (email) {
    return await Vendor.findOne({ email })
  } else {
    return await Vendor.findById(id)
  }
}

export const CreateVendor = async (req: Request, res: Response, next: NextFunction) => {
  const { name, address, pincode, foodType, email, password, ownerName, phone, foods } = <
    CreateVendorInput
  >req.body

  const existingVendor = await FindVendor(undefined, email)

  if (existingVendor !== null) {
    return res.json({ message: `User with email ${email} already exists` })
  }

  // generate a salt
  // encrypt password using salt

  const salt = await GenerateSalt()
  const userPassword = await GeneratePassword(password, salt)

  const createdVendor = await Vendor.create({
    name,
    address,
    pincode,
    foodType,
    // foods,
    email,
    password: userPassword,
    ownerName,
    salt,
    phone,
    rating: 0,
    serviceAvailable: false,
    coverImage: []
  })

  res.json({ ...createdVendor.toJSON(), ...{ status: 'Created' } })
}

export const GetVendors = async (req: Request, res: Response, next: NextFunction) => {
  const vendor = await Vendor.find()

  if (vendor !== null) {
    return res.json(vendor)
  } else {
    return res.json({ message: 'No vendors found' })
  }
}

export const GetVendorById = async (req: Request, res: Response, next: NextFunction) => {
  const vendorId = req.params.id

  const vendor = await FindVendor(vendorId)

  if (vendor !== null) {
    return res.json(vendor)
  } else {
    return res.json({ message: 'Vendors data not available' })
  }
}
