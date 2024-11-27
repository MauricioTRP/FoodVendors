import mongoose, { Schema, Document, Model } from 'mongoose'

interface VendorDoc extends Document {
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

const VendorSchema = new Schema(
  {
    name: { type: String, required: true },
    ownerName: { type: String },
    foodType: { type: [String] },
    pincode: { type: String },
    address: { type: String },
    phone: { type: String },
    email: { type: String },
    password: { type: String },
    salt: { type: String },
    serviceAvailable: { type: Boolean },
    coverImage: { type: [String] },
    rating: { type: Number },
    foods: [
      {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'food'
      }
    ]
  },
  {
    toJSON: {
      transform(doc, ret) {
        delete ret.password
        delete ret.salt
        delete ret.__v
        delete ret.createdAt
        delete ret.updatedAt
      }
    },
    timestamps: true
  }
)

const Vendor = mongoose.model<VendorDoc>('vendor', VendorSchema)

export { Vendor }
