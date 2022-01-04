const Person = require("./person.js");

module.exports = (app)=>{
    let views = `${__dirname}/views`;

    app.get("/", (req, res)=>res.render(`${views}/create.ejs`));

    app.post("/create", (req, res)=>{
        let np = req.body.nationalPassport;
        let ip = req.body.internationalPassport;

        let person = new Person({
            firstName: req.body.fName,
            middleName: req.body.mName,
            lastName: req.body.lName,
            dob: "",
            nationalPassport: "",
            internationalPassport: "",
            displayNumber: ""
        });

        replaceAt = function(str, index, replacement) {
            return str.substr(0, index) + replacement + str.substr(index + replacement.length);
        }

        for(let i = 1; i < person.firstName.length; i++){
            person.firstName = replaceAt(person.firstName, i, "*");
        }

        for(let i = 1; i < person.middleName.length; i++){
            person.middleName = person.middleName = replaceAt(person.middleName, i, "*");
        }

        for(let i = 1; i < person.lastName.length; i++){
            person.lastName = person.lastName = replaceAt(person.lastName, i, "*");
        }

        let dob = new Date(req.body.dob);
        person.dob = `${dob.getDate()}.${dob.getMonth()+1}.${dob.getFullYear()}`;

        person.nationalPassport = `${np[0]}${np[1]}** ***${np[np.length-3]}${np[np.length-2]}${np[np.length-1]}`;
        if(ip){
            person.internationalPassport = `${ip[0]}* ****${ip[ip.length-3]}${ip[ip.length-2]}${ip[ip.length-1]}`;
        }

        for(let i = 0; i < 4; i++){
            if(i === 1){
                person.displayNumber += "0000 ";
                continue;
            }

            let rand = Math.floor(Math.random() * 9999);
            person.displayNumber += `${rand.toString()} `;
        }

        person.save()
            .then((person)=>{
                return res.redirect(`/code/${person.displayNumber}?lang=en&ck=${person._id}`);
            })
            .catch((err)=>{
                res.send(err);
            });
    });

    app.get("/code*", (req, res)=>res.render(`${views}/code.ejs`));

    app.get("/*", (req, res)=>{
        Person.findOne({_id: req.query.ck})
            .then((person)=>{
                return res.render(`${views}/person.ejs`, {
                    firstName: person.firstName,
                    middleName: person.middleName,
                    lastName: person.lastName,
                    dob: person.dob,
                    nationalPassport: person.nationalPassport,
                    internationalPassport: person.internationalPassport,
                    displayNumber: person.displayNumber
                });
            })
            .catch((err)=>{
                console.error(err);
                return res.redirect("https://gosuslugi.ru/incomp");
            });
    })
}