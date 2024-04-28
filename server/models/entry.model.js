const mongoose = require('mongoose');

const EntrySchema = mongoose.Schema({

    text: {
        type: String,
        required: [true, "Lütfen bir entry giriniz."]
    },
    content: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    like:{
        type:Number,
        default:0
    },
    dislike:{
        type:Number,
        default:0
    },
    
},
    {
        timestamps: true
    });

const Entry = mongoose.model("Entry", EntrySchema);
module.exports = Entry;