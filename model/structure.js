const mongoose = require('mongoose')

const gasSchema = mongoose.Schema({
    gas:{
        type:Number
    },
    smoke:{
        type:Number
    },
    flame:{
        type:Number
    },
    date:{
        type:String
    },
    time:{
        type:String
    }
})

mongoose.model("GAS",gasSchema)