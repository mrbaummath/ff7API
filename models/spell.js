const mongoose = require('./connection')

const { Schema } = mongoose

const spellSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    mpCost: {
        type: Number,
        required: true
    },
    apReq: {
        type: Number,
        required: true
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
})

module.exports = spellSchema