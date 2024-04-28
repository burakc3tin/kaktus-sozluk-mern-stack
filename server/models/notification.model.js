
const mongoose = require('mongoose');


const NotificationSchema = mongoose.Schema({
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users',
        required: true
    },
    content: {
        type: String,
        required: true
    },
    sendUsername: {
        type: String,
     },
    relatedEntry: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Entry',
        required: true
    },
    read: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});

const Notification = mongoose.model('Notification', NotificationSchema);
module.exports = Notification;
