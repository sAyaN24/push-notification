const express = require('express');
const webpush = require('web-push');
const bodyParser = require('body-parser');
const path = require('path')

const app = express();
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname,"client")));


const vapidKeys = webpush.generateVAPIDKeys();

const publicVapidKey = "BCEJnPIKMtCPefKgrRzy5eStQyxpCKfU-aw2MmlYBZojG-pKUrDHoNkRuWWW1jZ55zBFJL5ifxBi7tWxlLKtZQE"; // vapidKeys.publicKey;
const privateVapidKey = "NKVzc4uQndgAFCATqeOXfVSf0ZlpOPZtv4qkV4yZMIg"; // vapidKeys.privateKey;

console.log(publicVapidKey);


webpush.setVapidDetails(
    "mailto:test@yopmail.com",
    publicVapidKey,
    privateVapidKey
);

//Subscribe route

app.post('/subscribe',(req,res) => {
    const subscription = req.body;

    res.status(201).json({});

    const payload = JSON.stringify({
        title: "PUSH TEST"
    })

    webpush.sendNotification(subscription,payload).catch((err) => {
        console.log(err);
    })
})


const port = 5000;

app.listen(port,() => {
    console.log(`Server started on port ${port}`)
})