const Role = require('../models/Role'); // Update the path to your Role model
const { HttpError } = require('@utils/errors');

async function createRole(req, res) {
  const { name, description, permissions } = req.body;

  try {
    // Check if the role name already exists
    const existingRole = await Role.findOne({ name });
    if (existingRole) {
      throw new HttpError('Role name already exists', 400);
    }

    // Create a new role instance
    const newRole = new Role({
      name,
      description,
      permissions,
    });

    // Save the role to the database
    await newRole.save();

    res.status(201).json({ role: newRole });
  } catch (error) {
    // Handle errors
    res.status(error.statusCode || 500).json({ message: error.message });
  }
}

module.exports = { createRole };
