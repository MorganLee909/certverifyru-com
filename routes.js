const Person = require("./person.js");

module.exports = (app)=>{
    let views = `${__dirname}/views`;

    app.get("/", (req, res)=>res.render(`${views}/create.ejs`));

    app.post("/create", (req, res)=>{
        let person = new Person({
            firstName: req.body.fName,
            middleName: req.body.mName,
            lastName: req.body.lName,
            dob: new Date(req.body.dob),
            nationalPassport: req.body.nationalPassport,
            internationalPassport: req.body.internationalPassport
        });

        person.save()
            .then((person)=>{
                return res.redirect(`/${person._id}?lang=en&ck=d71e0754bab64830bec5a2421de14we3`);
            })
            .catch((err)=>{
                res.send(err);
            });
    });
}