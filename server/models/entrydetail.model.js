const mongoose = require('mongoose');

const EntryDetailSchema = mongoose.Schema({

    text: {
        type: String,
        required: true,
    },
    entryid: {
        type: String,
        required: true
    },
    authorid: {
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
    }
},
    {
        timestamps: true
    });

const EntryDetail = mongoose.model("EntryDetail", EntryDetailSchema);
module.exports = EntryDetail;