const express = require('express');
const Job = require('../models/Job'); // Ensure this path matches your project structure
const auth = require('../middleware/auth'); // Ensure this path matches your project structure
const adminAuth = require('../middleware/adminAuth'); // Ensure this path matches your project structure
const router = express.Router();

// Create a new job posting (Admin only)
router.post('/', auth, adminAuth, async (req, res) => {
    const job = new Job({
        ...req.body
    });

    try {
        await job.save();
        res.status(201).send(job);
    } catch (error) {
        res.status(400).send(error);
    }
});

// Get all job postings
router.get('/', async (req, res) => {
    try {
        const jobs = await Job.find({});
        res.send(jobs);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Get a single job posting by id
router.get('/:id', async (req, res) => {
    try {
        const job = await Job.findById(req.params.id);

        if (!job) {
            return res.status(404).send();
        }

        res.send(job);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Update a job posting by id (Admin only)
router.patch('/:id', auth, adminAuth, async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['title', 'description', 'company', 'location', 'isActive']; // Adjust based on your Job model
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update));

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' });
    }

    try {
        const job = await Job.findById(req.params.id);

        if (!job) {
            return res.status(404).send();
        }

        updates.forEach((update) => job[update] = req.body[update]);
        await job.save();

        res.send(job);
    } catch (error) {
        res.status(400).send(error);
    }
});

// Delete a job posting by id (Admin only)
router.delete('/:id', auth, adminAuth, async (req, res) => {
    try {
        const job = await Job.findByIdAndDelete(req.params.id);

        if (!job) {
            return res.status(404).send();
        }

        res.send(job);
    } catch (error) {
        res.status(500).send(error);
    }
});

module.exports = router;
