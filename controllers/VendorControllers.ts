import { Request, Response, NextFunction } from 'express'
import { EditVendorInput, VendorLoginInput } from '../dto'
import { FindVendor } from './AdminController'
import { CreateSignature, ValidatePassword } from '../utils'

export const VendorLogin = async (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = <VendorLoginInput>req.body

  const existingVendor = await FindVendor(undefined, email)

  if (existingVendor !== null) {
    const isValidPassword = await ValidatePassword(
      password,
      existingVendor.password,
      existingVendor.salt
    )

    if (isValidPassword) {
      const signature = CreateSignature({
        _id: existingVendor._id as string,
        email: existingVendor.email,
        name: existingVendor.name
      })

      return res.json(signature)
    } else {
      return res.json({ message: 'password not valid' })
    }
  }

  return res.json({ message: 'Login credential not valid' })
}

export const GetVendorProfile = async (req: Request, res: Response, next: NextFunction) => {
  const user = req.user

  if (user) {
    const existingVendor = await FindVendor(user._id)

    return res.json(existingVendor)
  }

  return res.json({ message: 'Vendor information not found' })
}
export const UpdateVendorProfile = async (req: Request, res: Response, next: NextFunction) => {
  const { foodType, address, name, phone } = <EditVendorInput>req.body

  const user = req.user // user data from JWT

  if (user) {
    const existingVendor = await FindVendor(user._id)

    if (!!existingVendor) {
      existingVendor.name = name
      existingVendor.foodType = foodType
      existingVendor.address = address
      existingVendor.phone = phone

      const savedResult = await existingVendor.save()
      return res.json(savedResult)
    }

    return res.json(existingVendor)
  }

  return res.json({ message: 'Vendor information not found' })
}
export const UpdateVendorService = async (req: Request, res: Response, next: NextFunction) => {
  const user = req.user

  if (user) {
    const existingVendor = await FindVendor(user._id)

    if (!!existingVendor) {
      existingVendor.serviceAvailable = !existingVendor.serviceAvailable

      const savedResult = await existingVendor.save()
      return res.json(savedResult)
    }

    return res.json(existingVendor)
  }

  return res.json({ message: 'Vendor information not found' })
}

export const AddFood = async (req: Request, res: Response, next: NextFunction) => {
  const user = req.user

  if (user) {
  }

  return res.json({ message: 'Something went wrong adding a food' })
}

export const GetFoods = async (req: Request, res: Response, next: NextFunction) => {
  const user = req.user

  if (user) {
  }

  return res.json({ message: 'Foods information not found' })
}
