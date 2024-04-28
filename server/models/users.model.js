const mongoose = require('mongoose');

const UsersSchema = mongoose.Schema({

    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    image:{
        type: String,
        required:false
        // default:'https://avatars.mds.yandex.net/i?id=fb77772430782856b635c729d72fa3c79ec13983-12980679-images-thumbs&n=13'
    },
    likes: {
        type: [String], // String array olarak tanımlıyoruz
        default: ['000'] // Boş dizi olarak başlatıyoruz
    },
    dislikes: {
        type: [String], // String array olarak tanımlıyoruz
        default: ['FFF'] // Boş dizi olarak başlatıyoruz
    },
    notifications: {
        type: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Notification'
        }],
        default: []
    },
    notificationCount: {
        type: Number,
        default: 0
    }

}, {
    timestamps: true
});

const Users = mongoose.model('Users', UsersSchema);
module.exports = Users;