module.exports = (app)=>{
    let views = `${__dirname}/views`;

    app.get("/", (req, res)=>res.render(`${views}/create.ejs`));

    app.post("/create", (req, res)=>{

    });
}