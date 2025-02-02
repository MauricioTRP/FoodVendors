export interface CreateVendorInput {
  name: string
  ownerName: string
  foodType: [string]
  pincode: string
  address: string
  phone: string
  email: string
  password: string
  salt: string
  serviceAvailable: boolean
  coverImage: [string]
  rating: number
  foods: any
}

export interface VendorLoginInput {
  email: string
  password: string
}

export interface EditVendorInput {
  name: string
  address: string
  phone: string
  foodType: [string]
}

export interface VendorPayload {
  _id: string
  email: string
  name: string
}
