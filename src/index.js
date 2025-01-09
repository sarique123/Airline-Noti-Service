const express = require('express');

const { ServerConfig } = require('./config');

const {mailSender} = require('./config/email-config');

const apiRoutes = require('./routes');


const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));


app.use('/api', apiRoutes);

app.listen(ServerConfig.PORT, async ()=>{
    console.log(`Successfully started the server on the PORT : ${ServerConfig.PORT}`);
    try {
        const response = await mailSender.sendMail({
            from: ServerConfig.GMAIL_EMAIL,
            to : "abc@gmail.com",
            subject: 'Airplane Booked',
            text: 'The airplane 1 has been booked'
        });
        console.log(response);
    } catch (error) {
        throw error;
    }
})