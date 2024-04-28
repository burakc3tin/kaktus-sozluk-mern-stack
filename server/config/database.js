const mongoose = require('mongoose');

const connectDB = async () => {
   await mongoose.connect("mongodb+srv://burakcetin9724:DZkWCD3Ec49gy840@tatlisozlukdb.fthevrv.mongodb.net/Node-API?retryWrites=true&w=majority&appName=tatlisozlukDB")
    .then(() => {
        console.log("Veritabanına bağlanıldı! ✅");
    })
    .catch((e) => {
        console.log("Bağlantı sırasında sorun oluştu ❌",e)
    })
}

module.exports = connectDB;