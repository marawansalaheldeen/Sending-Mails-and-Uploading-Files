const userform = require('../routes/user')
const fileupload = require('express-fileupload')

module.exports = (app)=>{
app.use(userform)
app.use(fileupload())
}