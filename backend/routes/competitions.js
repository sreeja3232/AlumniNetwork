const express = require('express');
const Competition = require('../models/Competition'); // Adjust the path as necessary
const auth = require('../middleware/auth'); // Adjust the path as necessary
const adminAuth = require('../middleware/adminAuth'); // Adjust the path as necessary
const router = express.Router();

// Create a new competition (Admin only)
router.post('/', auth, adminAuth, async (req, res) => {
    const competition = new Competition({
        ...req.body
    });

    try {
        await competition.save();
        res.status(201).send(competition);
    } catch (error) {
        res.status(400).send(error);
    }
});

// Get all competitions
router.get('/', async (req, res) => {
    try {
        const competitions = await Competition.find({});
        res.send(competitions);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Get a single competition by id
router.get('/:id', async (req, res) => {
    try {
        const competition = await Competition.findById(req.params.id);

        if (!competition) {
            return res.status(404).send();
        }

        res.send(competition);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Update a competition by id (Admin only)
router.patch('/:id', auth, adminAuth, async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['name', 'date', 'venue', 'isActive']; // Adjust based on your Competition model
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update));

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' });
    }

    try {
        const competition = await Competition.findById(req.params.id);

        if (!competition) {
            return res.status(404).send();
        }

        updates.forEach((update) => competition[update] = req.body[update]);
        await competition.save();

        res.send(competition);
    } catch (error) {
        res.status(400).send(error);
    }
});

// Delete a competition by id (Admin only)
router.delete('/:id', auth, adminAuth, async (req, res) => {
    try {
        const competition = await Competition.findByIdAndDelete(req.params.id);

        if (!competition) {
            return res.status(404).send();
        }

        res.send(competition);
    } catch (error) {
        res.status(500).send(error);
    }
});

module.exports = router;
