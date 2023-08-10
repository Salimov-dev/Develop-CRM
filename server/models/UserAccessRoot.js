import { Schema, model} from 'mongoose'

const schema = new Schema({
    name: {
        type: String,
        required: true
    },
    value: {
        type: String,
        required: true
    }
},
    {
    timestamps: true
})

export default model('UserAccessRoot', schema)