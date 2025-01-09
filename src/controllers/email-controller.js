const { EmailService } = require('../services');
const { SuccessResponse, ErrorResponse} = require('../utils/common');
const { StatusCodes } = require('http-status-codes');
/*
POST : /signup
req-body : {name: 'user@mail.com',password : 'Sarique&123'}
*/

async function createTicket(req,res) {
    try {
        const ticket = await EmailService.createTicket({
            subject: req.body.subject,
            content: req.body.content,
            recepientEmail: req.body.recepientEmail
        });
        SuccessResponse.data = ticket;
        SuccessResponse.message = 'Successfully created a ticket';
        return res
        .status(StatusCodes.CREATED)
        .json(SuccessResponse);
    } catch (error) {
        ErrorResponse.error = error;
        return res
        .status(error.statusCode)
        .json(ErrorResponse);
    }
}


module.exports = {
    createTicket
}