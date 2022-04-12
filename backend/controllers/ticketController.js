const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');
const Ticket = require('../models/ticketModel');

// @desc   Get Tickets
// @route  GET /api/tickets
// @access Private
const getTickets = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(401);
    throw new Error('Usuário não encontrado');
  }

  const tickets = await Ticket.find({ user: req.user.id });

  res.status(200).json(tickets);
});

// @desc   Create Tickets
// @route  POST /api/tickets
// @access Private
const createTicket = asyncHandler(async (req, res) => {
  const { description, product } = req.body;

  if (!description || !product) {
    res.status(400);
    throw new Error('Adicione uma descricão e um produto');
  }

  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(401);
    throw new Error('Usuário não encontrado');
  }

  const ticket = await Ticket.create({
    description,
    product,
    user: req.user.id,
    status: 'new',
  });

  res.status(201).json(ticket);
});

module.exports = { getTickets, createTicket };
