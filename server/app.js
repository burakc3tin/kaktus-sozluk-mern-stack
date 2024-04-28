const express = require('express');
const app = express();
const entryRoutes = require('./routes/entry.route');
const userRoutes = require('./routes/users.route');
const authRoutes = require('./routes/auth.route');
const connectDB = require('./config/database');
const middlewares = require('./middleware');
const ImageKit = require('imagekit');

require('dotenv').config();




//image upload
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", 
      "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
const imagekit = new ImageKit({
    urlEndpoint: 'https://ik.imagekit.io/wzxk6dynp',
    publicKey: 'public_XIyIxfaZPYSf8f+lSo7Lufcc9B0=',
    privateKey: 'private_HQCiOpztAoBDnmzXWwftLg0BTuU='
  });

  app.get('/api/imageauth', function (req, res) {
    var result = imagekit.getAuthenticationParameters();
    res.send(result);
  });
//Middleware
app.use(middlewares);

//Routes
app.use('/api/entries',entryRoutes);
app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);

// MongoDB Bağlantısı
connectDB();

app.listen(process.env.PORT, () => {
    console.log(`Sunucu ${process.env.PORT} portunda çalışıyor♾️`);
});