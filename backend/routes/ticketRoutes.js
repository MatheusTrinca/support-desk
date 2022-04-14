const express = require('express');
const router = express.Router();
const { protect } = require('../middlewares/authMiddleware');
const {
  getTickets,
  createTicket,
  getTicket,
  updateTicket,
  deleteTicket,
} = require('../controllers/ticketController');

// Redirect to Note Router
const noteRouter = require('./noteRoutes');
router.use('/:ticketId/notes', noteRouter);

router.use(protect);
router.route('/').get(getTickets).post(createTicket);
router.route('/:id').get(getTicket).put(updateTicket).delete(deleteTicket);

module.exports = router;
