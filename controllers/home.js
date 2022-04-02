const { name } = require('ejs');
const https = require('https');
const nodemailer = require('nodemailer');
const sendgridTransport = require('nodemailer-sendgrid-transport');
const _ = require('lodash');

const { getMaxListeners } = require('process');
const { rmSync } = require('fs');

const URI = 'https://api.coinranking.com/v2/coins/?timePeriod=24h&x-access-token=' + process.env.ACCESS_TOKEN;

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
             res.render('home' ,{coins: completeData.data.coins, bestCoins: completeData.data.stats.bestCoins});
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
        text: "Hello Traders, Thanks for trying out our Demo Project and reaching out to us, obviously it is a prototype but sending us a mail means a lot to us. We will send a Response to your message as soon as possible. Thanks for showing your support!!!!"
    });
    const check = transporter.sendMail({
        from: "aroravaibhav817@gmail.com",
        to: "kingkratos767@gmail.com",
        subject: "Thanks For Checking Out Our App!! ✔",
        text: `Message is ${message} and email is ${email} and name is ${name}`
    })
    res.redirect('/');

}

exports.getPrices = (req, res, next) => {
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
             res.render('prices',{coins: completeData.data.coins});
     });
   
   })
   
}

exports.getGraph = (req, res, next) => {
    const coinName = req.query.coin;
    res.render('chart', {coin:coinName});
}

exports.getGraphBySearch = (req, res, next) => {
    const coinName = _.capitalize(req.query.coin);
    res.render('chart', {coin:coinName})
}

exports.getChart =(req, res, next) => {
    const timeArray= [];
    let time = new Date().getHours();
    
    for(let i = 0; i<7; i++)
    {
        if(time == 12) {
            timeArray.push(12 + ':00 PM')
        }
         else if(time > 12 || time <0) {
            timeArray.push(Math.abs(time%12) + ':00 PM');
            time = time
        }
        else if (time < 12 && time > 0){
            timeArray.push(Math.abs(time)  + ':00 AM');
        }
        else if(time == 24 || time == 0) {
            timeArray.push(12 + ':00 AM');
        }
        time = time -4;
       
    } 
    const coinName = req.params.coinName;
    let data;
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
             coinData = completeData.data.coins;
             data = coinData.filter(coin => coin.name === coinName);
             res.json({getHours:timeArray, coin:data});
             
     });
   })

}

exports.getFailure = (req, res, next) => {
    res.render('failure');
}