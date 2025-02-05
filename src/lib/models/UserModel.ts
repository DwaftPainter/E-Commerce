import mongoose from 'mongoose'
import { ROLES } from '@/utils/constants'
var validator = require('validator')

const UserSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            minLength: 5,
            maxLength: 50,
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
                message: 'Invalid email!'
            }
        },
        phone: {
            type: String,
            validate: {
                validator: function (v: any) {
                    return validator.isPhone(v)
                },
                message: 'Invalid phone number!'
            }
        },
        password: {
            type: String,
            minLength: 8,
            trim: true,
            validate: {
                validator: function (v: any) {
                    return v.match('^(?=.*[A-Za-z])(?=.*d)(?=.*[@$!%*#?&])[A-Za-zd@$!%*#?&]{8,}$')
                },
                message:
                    'Password should have 8 characters, at least 1 letter, 1 number and 1 special character!'
            }
        },
        cart: {},
        role: {
            type: String,
            enum: ROLES,
            default: ROLES.USER
        },
        deleted: {
            type: Boolean,
            default: false
        },
        deletedAt: {
            type: Date
        },
        DeletedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    },
    {
        timestamps: true
    }
)

const UserModel = mongoose.models.User || mongoose.model('User', UserSchema)
export default UserModel