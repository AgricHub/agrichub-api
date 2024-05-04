const Group = require('./path/to/GroupModel'); // Update the path to your GroupModel file
const { HttpError } = require('@utils/errors');

async function createGroup(req, res) {
  const { name, members } = req.body;

  try {
    // Check if the group name already exists
    const existingGroup = await Group.findOne({ name });
    if (existingGroup) {
      throw new HttpError('Group name already exists', 400);
    }

    // Create a new group instance
    const newGroup = new Group({
      name,
      members,
    });

    // Save the group to the database
    await newGroup.save();

    res.status(201).json({ group: newGroup });
  } catch (error) {
    // Handle errors
    res.status(error.statusCode || 500).json({ message: error.message });
  }
}

async function getGroup(req, res) {
  const groupId = req.params.id;

  try {
    // Find the group by ID
    const group = await Group.findById(groupId).populate('members');

    if (!group) {
      throw new HttpError('Group not found', 404);
    }

    res.status(200).json({ group });
  } catch (error) {
    // Handle errors
    res.status(error.statusCode || 500).json({ message: error.message });
  }
}

module.exports = { createGroup, getGroup };
