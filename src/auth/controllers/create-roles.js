const Role = require('../models/Role'); // Update the path to your Role model
const { HttpError } = require('@utils/errors');

async function createRole(req, res) {
  const { name, description, permissions } = req.body;

  try {
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

async function getRole(req, res) {
  const roleId = req.params.id;

  try {
    // Find the role by ID
    const role = await Role.findById(roleId);

    if (!role) {
      throw new HttpError('Role not found', 404);
    }

    res.status(200).json({ role });
  } catch (error) {
    // Handle errors
    res.status(error.statusCode || 500).json({ message: error.message });
  }
}

async function updateRole(req, res) {
  const roleId = req.params.id;
  const updates = req.body;

  try {
    // Find the role by ID and update
    const role = await Role.findByIdAndUpdate(roleId, updates, { new: true });

    if (!role) {
      throw new HttpError('Role not found', 404);
    }

    res.status(200).json({ role });
  } catch (error) {
    // Handle errors
    res.status(error.statusCode || 500).json({ message: error.message });
  }
}

async function deleteRole(req, res) {
  const roleId = req.params.id;

  try {
    // Find the role by ID and delete
    const role = await Role.findByIdAndDelete(roleId);

    if (!role) {
      throw new HttpError('Role not found', 404);
    }

    res.status(200).json({ message: 'Role deleted successfully' });
  } catch (error) {
    // Handle errors
    res.status(error.statusCode || 500).json({ message: error.message });
  }
}

module.exports = { createRole, getRole, updateRole, deleteRole };
