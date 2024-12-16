const User = require("../models/User");
const Team = require("../models/Team");

// Create a new team and add selected users to the team
exports.createTeam = async (req, res) => {
  const { teamName, selectedUserIds } = req.body;

  try {
    // Ensure the admin is the one making this request (you can implement auth check here)
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Only admins can create teams" });
    }

    // Create a new team
    const team = await Team.create({
      name: teamName,
      users: selectedUserIds,
    });

    // Update users' team field
    await User.updateMany(
      { _id: { $in: selectedUserIds } },
      { $set: { team: team._id } }
    );

    res.status(201).json(team);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// Get a list of users who are not yet assigned to a team (only users with the role 'user')
exports.getAssignedUsersForTeam = async (req, res) => {
  try {
    const users = await User.find({ role: "user"});
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// Get a list of users who are not yet assigned to a team (only users with the role 'user')
exports.getUnAssignedUsersForTeam = async (req, res) => {
    try {
      const users = await User.find({ role: "user", team: null });
      res.status(200).json(users);
    } catch (err) {
      res.status(500).json({ message: "Server error", error: err.message });
    }
  };

// Get all teams
exports.getAllTeams = async (req, res) => {
  try {
    const teams = await Team.find();
    res.status(200).json(teams);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// Add users to a team
exports.addUsersToTeam = async (req, res) => {
  const { userIds, teamId } = req.body;
  try {
    // Find the selected team
    const team = await Team.findById(teamId);
    if (!team) {
      return res.status(404).json({ message: "Team not found" });
    }
    // Add users to the team
    for (let userId of userIds) {
      const user = await User.findById(userId);
      if (!user) {
        continue; // If user not found, skip
      }
      // Check if the user is already part of the team
      if (!user.teams.includes(teamId)) {
        user.teams.push(teamId);
        await user.save();
      }
      // Add user to team if not already present
      if (!team.members.includes(userId)) {
        team.members.push(userId);
        await team.save();
      }
    }
    res.status(200).json({ message: "Users added to the team successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// Remove users from a team
exports.removeUsersFromTeam = async (req, res) => {
  const { userIds, teamId } = req.body;
  try {
    // Find the selected team
    const team = await Team.findById(teamId);
    if (!team) {
      return res.status(404).json({ message: "Team not found" });
    }
    // Remove users from the team
    for (let userId of userIds) {
      const user = await User.findById(userId);
      if (!user) {
        continue; // If user not found, skip
      }
      // Remove team reference from user
      user.teams = user.teams.filter((team) => team.toString() !== teamId);
      await user.save();
      // Remove user from team
      team.members = team.members.filter((member) => member.toString() !== userId);
      await team.save();
    }
    res.status(200).json({ message: "Users removed from the team successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};