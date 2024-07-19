const membersMock = require("../mocks/members");

module.exports.getAllMembers = (req, res, next) => {
    res.status(200).json(membersMock.MEMBERS);
};