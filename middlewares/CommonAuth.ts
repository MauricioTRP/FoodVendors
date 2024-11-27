import { AuthPayload } from '../dto'
import { ValidateSignature } from '../utils'
import { Request, Response, NextFunction } from 'express'

declare global {
  namespace Express {
    interface Request {
      user?: AuthPayload
    }
  }
}

export const Authenticate = (req: Request, res: Response, next: NextFunction) => {
  const signature = ValidateSignature(req)
  if (signature) {
    return next()
  } else {
    return res.json({ message: 'Unauthorized user' })
  }
}
