const express = require('express');


const econtrol = require('./controller/control')

const port = process.env.PORT || 3000;
const app = express();

app.set('view engine','ejs')

app.use('/js',express.static(__dirname + '/node_modules/bootstrap/dist/js'));
app.use('/js',express.static(__dirname + '/node_modules/jquery/dist/js'));
app.use('/css',express.static(__dirname + '/node_modules/bootstrap/dist/css'));

app.use(express.static('assets'))
app.use(express.static('views'))

app.use(express.json())
econtrol(app)

app.listen(port,()=>{
    console.log(`server is up on port : ${port}`)
});