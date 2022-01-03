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
            internationalPassport: req.body.internationalPassport,
            displayNumber: ""
        });

        for(let i = 0; i < 4; i++){
            if(i === 1){
                person.displayNumber += "0000";
                continue;
            }

            let rand = Math.floor(Math.random() * 9999);
            person.displayNumber += rand.toString();
        }

        person.save()
            .then((person)=>{
                return res.redirect(`/${person.displayNumber}?lang=en&ck=${person._id}`);
            })
            .catch((err)=>{
                res.send(err);
            });
    });

    app.get("/*", (req, res)=>res.render(`${views}/code.ejs`));
}