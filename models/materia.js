//import dependencies
const mongoose = require('./connection') 
const User = require('./user')
const spellSchema = require('./spell')

//create materia model schema
const { Schema, model } = mongoose

const materiasSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    color: {
        type: String,
        required: true,
        enum: ['green', 'red', 'yellow', 'purple', 'blue'],
        required: true,
    },
    maxAP: {
        type: Number,
        required: true
    },
    common: {
        type: Boolean,
        required: true
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    spells: [spellSchema]
})

//create model
const Materia = model("Materia", materiasSchema)
module.exports = Materia
