const mongoose = require("mongoose");

let PersonSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    middleName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    dob: {
        type: String,
        required: true
    },
    nationalPassport: {
        type: String,
        required: true
    },
    internationalPassport: {
        type: String,
        required: false
    },
    displayNumber: {
        type: String,
        required: true
    },
    expiration: {
        type: Date,
        required: true
    }
});

module.exports = mongoose.model("person", PersonSchema);