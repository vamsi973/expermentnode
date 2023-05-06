var bcrypt = require('bcrypt');
const config = require('../utilities/config');
var jwt = require('jwt-simple');

module.exports = {
    encryptPassword: function (password) {
        return new Promise(async (resolve, reject) => {
            bcrypt.genSalt(10, function (err, salt) {
                if (err) {
                    resolve(err);
                }
                bcrypt.hash(password, salt, function (err, hash) {
                    if (err) {
                        resolve(err);
                    } else {
                        resolve(hash);
                    }

                });
            });
        });
    },
    comparePassword: function (passw, hashpass) {
        return new Promise(async (resolve, reject) => {
            bcrypt.compare(passw, hashpass, function (err, isMatch) {
                if (err) {
                    resolve(err);
                }
                resolve(isMatch);
            });
        });

    },
    generatePassword: function (max = 4) {
        return new Promise(async (resolve, reject) => {
            let rand = "123456789";
            let pass = "";
            for (var x = 0; x < max; x++) {
                var i = Math.floor(Math.random() * rand.length);
                pass += rand.charAt(i);
            }
            resolve(pass);
        });
    },
    getToken: function (headers) {
        if (headers && headers.authorization) {
            var parted = headers.authorization.split(' ');
            if (parted.length === 2) {
                return parted[1];
            } else {
                return null;
            }
        } else {
            return null;
        }
    },
    decodeToken: function (headers) {
        return new Promise(async (resolve, reject) => {
            try {
                let token = this.getToken(headers);
                var decoded = jwt.decode(token, config.secret);
                resolve(decoded);
            } catch (error) {
                resolve(false);
            }
        });
    }
};