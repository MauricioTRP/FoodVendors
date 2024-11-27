import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { VendorPayload } from '../dto'
import { JWT_SECRET } from '../config'
import { AuthPayload } from '../dto'
import { Request } from 'express'

export const GenerateSalt = async () => {
  return await bcrypt.genSalt()
}

export const GeneratePassword = async (password: string, salt: string) => {
  return await bcrypt.hash(password, salt)
}

export const ValidatePassword = async (
  providedPassword: string,
  storedPassword: string,
  salt: string
) => {
  return (await GeneratePassword(providedPassword, salt)) == storedPassword
}

export const CreateSignature = (payload: AuthPayload) => {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '1d' })
}

export const ValidateSignature = (req: Request) => {
  const signature = req.get('Authorization')

  if (signature) {
    const payload = jwt.verify(signature.split(' ')[1], JWT_SECRET) as AuthPayload
    req.user = payload
    return true
  }
  return false
}
