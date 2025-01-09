    const {TicketRepository} = require("../repositories");
const {EmailConfig} = require('../config');

const { AppError } = require('../utils/errors/app-error');

const ticketRepository = new TicketRepository();

async function sendEmail(mailFrom,mailTo,subject,text) {
    try {
        const response = await EmailConfig.mailSender({
            from: mailFrom,
            to: mailTo,
            subject: subject,
            text: text
        });
        return response;
    } catch (error) {
        console.log(error);
        
        throw error;
    }
}

async function createTicket(data) {
    try {
        const response = ticketRepository.create(data);
        return response;
    } catch (error) {
        if(error.name == 'SequelizeValidationError'){
            let explanation = [];
            error.errors.forEach((e)=>{
                explanation.push(e.message);
            })
            throw new AppError(explanation,StatusCodes.BAD_REQUEST);
        }
        throw new AppError('Cannot create a new Ticket Object',StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function getPendingEmails(params) {
    try {
        const tickets = ticketRepository.getPendingTickets();
        return tickets;
    } catch (error) {
        console.log(error);
        
        throw error;
    }
}


module.exports = {
    createTicket,
    sendEmail ,
    getPendingEmails
}