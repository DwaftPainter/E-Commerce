import mongoose from 'mongoose'

const DBConnect = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL!)
        console.log('Connect to DB successfully!')
    } catch (error) {
        console.log(error)
        throw new Error('Could not connect to DB!')
    }
}

export default DBConnect
