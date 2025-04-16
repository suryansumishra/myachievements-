const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/certificates', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.log(err));

// Certificate Schema
const certificateSchema = new mongoose.Schema({
    name: String,
    data: String,
    thumbnail: String,
    isPdf: Boolean,
    section: String,
});

const Certificate = mongoose.model('Certificate', certificateSchema);

// API Endpoints
app.post('/api/certificates', async (req, res) => {
    const { name, data, thumbnail, isPdf, section } = req.body;
    const newCertificate = new Certificate({ name, data, thumbnail, isPdf, section });
    await newCertificate.save();
    res.status(201).json(newCertificate);
});

app.get('/api/certificates', async (req, res) => {
    const certificates = await Certificate.find();
    res.json(certificates);
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
