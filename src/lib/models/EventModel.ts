import mongoose from 'mongoose'
import { Product } from './ProductModel'

export type Event = {
    _id: string,
    name?: string,
    products: Array<Product>
    startDate: Date,
    endDate: Date
}

const EventSchema = new mongoose.Schema({
    name: {
        type: String,
        default: 'Flash Sales'
    },
    products: {
        type: Array<String>,
        required: true
    },
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date,
        required: true
    }
})

const EventModel = mongoose.models.Event || mongoose.model('Event', EventSchema)
export default EventModel
