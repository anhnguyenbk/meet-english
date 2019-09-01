const UserService = require("../services/UserService");

class UserController {
    constructor() {
    }

    users(req, res) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        res.json(UserService.getAll());
    }
}

module.exports = UserController;