const
    mongoose = require('mongoose')
    , bcrypt = require('bcrypt-nodejs')
    , { Game, User } = require('')
    ;


const connect = (url, username, password) => {

    // It's in no way recommended to not use login credentials, but for local debugging I'm not using a login, and have to account for this
    let finalUrl = "";
    if (username === false) {
        finalUrl = `mongodb://${url}/total-steam-price`;

    } else {
        finalUrl = `mongodb://${username}:${password}&${url}/total-steam-price`;
    }
    mongoose.connect(finalUrl, { useNewUrlParser: true, useUnifiedTopology: true })
}


const disconnect = () => {
    mongoose.connection.close();
}
