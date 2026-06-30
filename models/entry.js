const { Schema, model } = require("mongoose")

const entrySchema = new Schema({
    description: {type:String, required:true},
    createdAt:{type:Number},
    status:{
        type:String,
        enum:{
            values:['pending','in-progress','finished'],
            message:'{VALUE} no es un estado permitido'
        },
        default:"pending"
    }
});

module.exports = model("Entry",entrySchema)