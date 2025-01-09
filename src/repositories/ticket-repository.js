const CrudRepository = require("./crud-repository");
const {Ticket}= require('../models');
const {Enums} = require('../utils/common')

class TicketRepository extends CrudRepository{
    constructor(){
        super(Ticket);
    }

    async getPendingTickets() {
        const tickets = await Ticket.findAll({
            where: {
                status: Enums.STATUS.PENDING
            }
        });
        return tickets;
    }
}

module.exports = TicketRepository;