const {db} = require("./cnn")
const express = require("express")

const app = express()

app.set("port", process.env.PORT || 3000)

//middlewares
app.use(express.json())
app.use(express.urlencoded(true))
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});


//routes
app.use(require("./routes/index"))

//execution
app.listen(app.get("port"))
console.log("Server running on http://localhost:"+app.get("port"))