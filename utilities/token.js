var jwt = require('jwt-simple');
var bcrypt = require('bcrypt');

module.exports = {

    encrypt: function (data) {
        return new Promise(async (resolve, reject) => {
            bcrypt.genSalt(12, function (err, salt) {
                if (err) {
                } else {
                    bcrypt.hash(data, salt, function (err, hash) {
                        if (err) {
                            resolve(err);
                        } else {
                            resolve(hash);
                        }

                    });
                }
            })
        })
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
}