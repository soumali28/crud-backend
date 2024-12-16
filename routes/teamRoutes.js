const express = require("express");
const { createTeam, getAssignedUsersForTeam, getUnAssignedUsersForTeam, getAllTeams, addUsersToTeam, removeUsersFromTeam  } = require("../controllers/teamController");
const router = express.Router();

// Route to get users who are in teams
router.get("/assignedusers", getAssignedUsersForTeam );
// Route to get users who are not in teams
router.get("/unassignedusers", getUnAssignedUsersForTeam );
// Route to create a team and add selected users
router.post("/create", createTeam);
// Route to get all teams
router.get("/allteams", getAllTeams );
// Route to add users to a team
router.get("/add-user-to-team", addUsersToTeam );
// Route to remove user from a team
router.post("/remove-user-from-team", removeUsersFromTeam);

module.exports = router;
