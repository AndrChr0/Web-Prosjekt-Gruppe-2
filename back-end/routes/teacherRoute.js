//  teacherRoute.js
const express = require('express');
const { verifyToken, requireRole } = require('../middlewares/authMiddleware');
const router = express.Router();

router.get('/teacher-data', verifyToken, requireRole('teacher'), (req, res) => {
    // Fetch or compute data for teachers
    res.json({ data: 'Secret data only for teachers' });
});

module.exports = router;
