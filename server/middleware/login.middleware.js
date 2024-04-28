const jwt = require('jsonwebtoken');
const Users = require('../models/users.model.js'); // Kullanıcı veritabanı
require('dotenv').config();

async function login(req, res, next) {
  const { username, password } = req.body;

  try {
    // Kullanıcıyı veritabanında bul
    const user = await Users.findOne({ username, password });
    
    if (!user) {
      return res.status(401).json({ message: 'Kullanıcı adı veya şifre hatalı' });
    }

    const token = jwt.sign({ id: user._id, username: user.username }, process.env.JWT);
    req.token = token;
    next();
  } catch (error) {
    console.error('Kullanıcı doğrulama hatası:', error);
    res.status(500).json({ message: 'Sunucu hatası, lütfen daha sonra tekrar deneyin' });
  }
}

module.exports = login;
