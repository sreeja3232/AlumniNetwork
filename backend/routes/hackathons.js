const express = require('express');
const Hackathon = require('../models/Hackathon'); // Adjust the path as necessary
const auth = require('../middleware/auth'); // Adjust the path as necessary
const adminAuth = require('../middleware/adminAuth'); // Adjust the path as necessary
const router = express.Router();

// Create a new hackathon (Admin only)
router.post('/', auth, adminAuth, async (req, res) => {
    const hackathon = new Hackathon({
        ...req.body
    });

    try {
        await hackathon.save();
        res.status(201).send(hackathon);
    } catch (error) {
        res.status(400).send(error);
    }
});

// Get all hackathons
router.get('/', async (req, res) => {
    try {
        const hackathons = await Hackathon.find({});
        res.send(hackathons);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Get a single hackathon by id
router.get('/:id', async (req, res) => {
    try {
        const hackathon = await Hackathon.findById(req.params.id);

        if (!hackathon) {
            return res.status(404).send();
        }

        res.send(hackathon);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Update a hackathon by id (Admin only)
router.patch('/:id', auth, adminAuth, async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['name', 'date', 'venue', 'isActive']; // Adjust based on your Hackathon model
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update));

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' });
    }

    try {
        const hackathon = await Hackathon.findById(req.params.id);

        if (!hackathon) {
            return res.status(404).send();
        }

        updates.forEach((update) => hackathon[update] = req.body[update]);
        await hackathon.save();

        res.send(hackathon);
    } catch (error) {
        res.status(400).send(error);
    }
});

// Delete a hackathon by id (Admin only)
router.delete('/:id', auth, adminAuth, async (req, res) => {
    try {
        const hackathon = await Hackathon.findByIdAndDelete(req.params.id);

        if (!hackathon) {
            return res.status(404).send();
        }

        res.send(hackathon);
    } catch (error) {
        res.status(500).send(error);
    }
});

module.exports = router;
