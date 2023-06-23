const mongoose = require("mongoose");

const userSchema = mongoose.Schema({

    name: {
        required: true,
        type: String,

    },
    email: {
        required: true,
        type: String,
        trim: true,
        validate: {
            validator: (val) => {
                const resValid = "([!#-'*+/-9=?A-Z^-~-]+(\.[!#-'*+/-9=?A-Z^-~-]+)*|\"\(\[\]!#-[^-~ \t]|(\\[\t -~]))+\")@([!#-'*+/-9=?A-Z^-~-]+(\.[!#-'*+/-9=?A-Z^-~-]+)*|\[[\t -Z^-~]*])";

                return val.match(resValid);


            },
            message: "Please enter a valid email address"
        }


    },
    password: {
        required: true,
        type: String,

    },
    address: {

        type: String,
        default: ''

    },
    type: {

        type: String,
        default: 'user'

    },

});

const User = mongoose.model("User", userSchema);

module.exports = User;

