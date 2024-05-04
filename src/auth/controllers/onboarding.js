const Onboarding = require('../models/Onboarding'); // Update the path to your OnboardingModel file
const { HttpError } = require('@utils/errors');

async function createOnboardingData(req, res) {
  const { user, step, details } = req.body;

  try {
    // Create a new onboarding instance
    const newOnboarding = new Onboarding({
      user,
      step,
      details,
    });

    // Save the onboarding data to the database
    await newOnboarding.save();

    res.status(201).json({ onboarding: newOnboarding });
  } catch (error) {
    // Handle errors
    res.status(error.statusCode || 500).json({ message: error.message });
  }
}

module.exports = { createOnboardingData };
