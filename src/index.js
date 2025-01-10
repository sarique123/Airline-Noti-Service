const express = require('express');

const {EmailService} = require('./services')
const amqplib = require('amqplib');

let channel,connection;

async function connectQueue() {
    try {
        connection = await amqplib.connect('amqp://localhost'); 
        channel = await connection.createChannel();
        await channel.assertQueue('noti-queue');
        channel.consume('noti-queue',async (data) => {
            const dataObject = JSON.parse(`${Buffer.from(data.content)}`);
            await EmailService.sendEmail('sarique1970@gmail.com',dataObject.recepientEmail,dataObject.subject,dataObject.content);
            channel.ack(data);
            
        })
    } catch (error) {
        console.log(error);
        throw error;
    }
}

const { ServerConfig } = require('./config');

const {mailSender} = require('./config/email-config');

const apiRoutes = require('./routes');


const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));


app.use('/api', apiRoutes);

app.listen(ServerConfig.PORT, async ()=>{
    console.log(`Successfully started the server on the PORT : ${ServerConfig.PORT}`);
    await connectQueue();
    console.log('queue is up');
})