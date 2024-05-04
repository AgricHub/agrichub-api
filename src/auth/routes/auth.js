// routes.js

const express = require('express');
const router = express.Router();

// Import controllers
const {
  registerUser,
  loginUser,
  fetchUser,
  updateUser,
  deleteUser
} = require('../controllers/authController');

const {
  createGroup,
  getGroup
} = require('../controllers/groupController');

const {
  createRole,
  getRole,
  updateRole,
  deleteRole
} = require('../controllers/roleController');

const {
  createOnboardingData
} = require('../controllers/onboardingController');

// Authentication routes
router.post('/auth/register', registerUser);
router.post('/auth/login', loginUser);

// User routes
router.get('/users/:id', fetchUser);
router.put('/users/:id', updateUser);
router.delete('/users/:id', deleteUser);

// Group routes
router.post('/groups', createGroup);
router.get('/groups/:id', getGroup);

// Role routes
router.post('/roles', createRole);
router.get('/roles/:id', getRole);
router.put('/roles/:id', updateRole);
router.delete('/roles/:id', deleteRole);

// Onboarding route
router.post('/onboarding', createOnboardingData);

module.exports = router;
