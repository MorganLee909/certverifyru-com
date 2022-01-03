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
        type: Date,
        required: true
    },
    nationalPassport: {
        type: String,
        required: true
    },
    internationalPassport: {
        type: String,
        required: false
    }
});

module.exports = mongoose.model("person", PersonSchema);