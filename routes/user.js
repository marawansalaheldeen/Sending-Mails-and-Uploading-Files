const express = require('express');
const router = new express.Router();
const bodyparser = require('body-parser');
const sgMail = require('@sendgrid/mail');
const multer = require('multer')

const urlencodedparser = bodyparser.urlencoded({extended:true})
//sendgrid config
api_key = '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';
sgMail.setApiKey(api_key);

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '.pdf') //Appending .jpg
  }
})

var upload = multer({ storage: storage });
//routers
router.get('/',(req,res)=>{
        res.render('form')
});

router.get('/',(req,res)=>{
  res.render('formuploaded')
});

//submiting form

router.post('/send',urlencodedparser,upload.single('filing'),(req,res)=>{
      //const fileup = req.file.filename;
      const originalname = req.file.originalname
      
      
    const output = `
    <p>You have a new contact request</p>
    <h3>Contact Details</h3>
    <ul>  
      <li>Name: ${req.body.name}</li>
      <li>Country: ${req.body.Grade}</li>
      <li>Email: ${req.body.email}</li>
      <li>Phone: ${req.body.Subject}</li>
      <li>File:${originalname}.pdf</li>
    </ul>
    <h3>Message</h3>
    <p>${req.body.message}</p>
  `;
console.log(output)
    const msg = {
        to: 'marawansalahuldeen@gmail.com',
        from: 'marawansalahuldeen@gmail.com',
        subject: 'Sending with Twilio SendGrid is Fun',
        text: 'and easy to do anywhere, even with Node.js',
        html: output,
    };

    sgMail.send(msg).then(() => {
        console.log('Message sent')
        res.redirect('/form-uploaded')
    }).catch((error) => {
        console.log(error.response.body)
    });  
})
module.exports = router;