// createAdminUser.js

require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User'); // Adjust the path as necessary

mongoose.connect('mongodb+srv://saketharaveti11:Saketh123*@cluster0.ugct8br.mongodb.net/', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(async () => {
    const username = "admin"; // Change as needed
    const password = "admin123"; // Change as needed
    const hashedPassword = await bcrypt.hash(password, 10);

    const adminUser = new User({
      username,
      password: hashedPassword,
      isAdmin: true
    });

    await adminUser.save();
    console.log("Admin user created successfully");
    process.exit();
  })
  .catch(err => {
    console.error("Database connection error", err);
    process.exit(1);
  });
