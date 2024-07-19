const jwt = require('jsonwebtoken');

module.exports.login = (req, res, next) => {
    if (!req.body.email || !req.body.password) {
        return res.status(400).json({ error: 'missing parameters' });
    }

    if (req.body.email === '' || req.body.password === '') { 
        return res.status(400).json({ error: 'empty parameters' });
    }

  // Accept all account with password 'pass' + the number in the email
  const email = req.body.email;
  const password = req.body.password;
  if(/member[0-9]@test.com/.test(email) && password === 'pass' + email.match(/[0-9]/)) {
    const id = email.match(/member[0-9]/)[0];
        return res.status(200).json({
          userId: id,
          token: jwt.sign(
            {
              userId: id,
              userEmail: email,
            },
            "RANDOM_TOKEN_SECRET",
            { expiresIn: "1min" }
          ),
        });
    }
    return res.status(401).json({ error: "wrong credentials" });
};
