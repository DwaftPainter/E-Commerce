import mongoose from 'mongoose'
import { validate } from '@/config/message'
import { phoneRegex } from '@/config/regex'
var validator = require('validator')

const ContactSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            validate: {
                validator: function (v) {
                    return validator.isEmail(v)
                },
                message: validate.format.email
            }
        },
        phone: {
            type: String,
            validate: {
                validator: function (v: any) {
                    return phoneRegex.test(v.toString())
                },
                message: validate.format.phone
            }
        },
        message: {
            type: String,
            maxlength: 2000,
            required: true
        },
        image: {
            type: String,
            required: false
        },
        isReply: {
            type: Boolean,
            default: false
        },
        deleted: {
            type: Boolean,
            default: false
        },
        deletedAt: {
            type: Date
        },
        deletedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
    },
    {
        timestamps: true
    }
)

const ContactModel = mongoose.models.Contact || mongoose.model('Contact', ContactSchema)
export default ContactModel