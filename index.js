const express = require('express');
const bodyParser = require('body-parser');
const _ = require('lodash');
const path = require("path")
const fs = require("fs")
const app = express();
const app2 = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app2.use(bodyParser.json());
app2.use(bodyParser.urlencoded({extended: true}));

let message;
console.log("the path: " + process.env.DATA_PATH);
const dataPath = path.join(process.env.DATA_PATH, process.env.DATA_FILE)


app.get('/ready', (req, res) => {
    console.log('switch is ready');
    res.status(200).send();
});



app.post('/command/checkEnvCommandWrite', (req, res) => {
    // get the data from the file
    let data = fs.readFileSync(dataPath)
    let mydata = JSON.parse(data.toString())
    // change the variable check
    mydata.check = "new check after editing in index 2"
    // write it back to the shared file
    fs.writeFileSync(dataPath, (JSON.stringify(mydata)));
    res.status(200).send(); 
});


app.listen(3000, () => {
    console.log('started to listen at 3000')
});

app2.listen(9002, () => {
    console.log('started to listen at 9002')
});