function logout(req, res, next) {
    // Burada herhangi bir şey yapmamıza gerek yok, client-side'da token'in silinmesi yeterli olacaktır.
    res.sendStatus(204);
  }
  
  module.exports = logout;
  