const https = require('https');
const nodemailer = require('nodemailer');
const sendgridTransport = require('nodemailer-sendgrid-transport');

const { getMaxListeners } = require('process');

const URI = 'https://api.coinranking.com/v2/coins/?x-access-token=' + process.env.ACCESS_TOKEN;

exports.getHome = (req, res, next) => {
    let completeData;
    https.get(URI, (response) =>
    {
         const apiData = [];
         response.on('data', (chunk) =>
         {
             apiData.push(chunk);
        });
        response.on('end', () =>
        {
             completeData = JSON.parse(Buffer.concat(apiData));
             res.render('home' ,{coins: completeData.data.coins});
     })
   
   })
}

exports.getContact = (req, res, next) => {
    res.render('contact');
}

exports.postContact = (req, res, next) => {

    const name = req.body.name;
    const email = req.body.email;
    const contact = req.body.number;
    const message = req.body.message;
    const transporter = nodemailer.createTransport(sendgridTransport({
        auth: {
            api_key: process.env.NODEMAILER_KEY
        }
    }));
    const info = transporter.sendMail({
        from: "aroravaibhav817@gmail.com",
        to: email,
        subject: "Thanks For Checking Out Our App!! ✔",
        text: "Hello Traders, Thanks for trying out our Demo Project and reaching out to us, obviously it is a prototype but sending us a mail means a lot to us. We will send a Response to your message as soon as possible. Thanks for showing your suppoort!!!!"
    });
    const check = transporter.sendMail({
        from: "aroravaibhav817@gmail.com",
        to: "kingkratos767@gmail.com",
        subject: "Thanks For Checking Out Our App!! ✔",
        text: `Message is ${message} and email is ${email} and name is ${name}`
    })
    res.redirect('/');

}