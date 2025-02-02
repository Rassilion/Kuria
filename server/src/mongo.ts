import mongoose from 'mongoose'
(mongoose as any).Promise = global.Promise

// your local database url
// 27017 is the default mongoDB port
const uri = 'mongodb://localhost:27017/kuria'
mongoose.set('useCreateIndex', true)
mongoose.connect(uri, { useNewUrlParser: true }).then(
    () => {
        /** ready to use. The `mongoose.connect()` promise resolves to undefined. */
        console.log('Connected to Mongo')
    },
    err => {
        /** handle initial connection error */
        console.log('error connecting to Mongo: ')
        console.log(err)
    }
)

export default mongoose
