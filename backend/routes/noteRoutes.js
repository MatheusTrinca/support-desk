const express = require('express');
const router = express.Router({ mergeParams: true });
const { protect } = require('../middlewares/authMiddleware');
const { getNotes, addNote } = require('../controllers/noteController');

router.use(protect);
router.route('/').get(getNotes).post(addNote);

module.exports = router;
