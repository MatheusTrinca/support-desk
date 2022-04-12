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

// @desc   Get Ticket
// @route  GET /api/tickets/:id
// @access Private
const getTicket = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(401);
    throw new Error('Usuário não encontrado');
  }
  const ticket = await Ticket.findById(req.params.id);

  if (!ticket) {
    res.status(401);
    throw new Error('Ticket não encontrado');
  }

  if (ticket.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error('Não autorizado');
  }

  res.status(200).json(ticket);
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

// @desc   Update Ticket
// @route  PUT /api/tickets/:id
// @access Private
const updateTicket = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(401);
    throw new Error('Usuário não encontrado');
  }
  const ticket = await Ticket.findById(req.params.id);

  if (!ticket) {
    res.status(401);
    throw new Error('Ticket não encontrado');
  }

  if (ticket.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error('Não autorizado');
  }

  const updatedTicket = await Ticket.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );

  res.status(200).json(updatedTicket);
});

// @desc   Delete Ticket
// @route  DELETE /api/tickets/:id
// @access Private
const deleteTicket = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(401);
    throw new Error('Usuário não encontrado');
  }
  const ticket = await Ticket.findById(req.params.id);

  if (!ticket) {
    res.status(401);
    throw new Error('Ticket não encontrado');
  }

  if (ticket.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error('Não autorizado');
  }

  await ticket.remove();

  res.status(200).json({ success: true });
});

module.exports = {
  getTickets,
  createTicket,
  getTicket,
  updateTicket,
  deleteTicket,
};
