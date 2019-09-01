// module.exports = function(app) {
//     app.use('/api/v1', require('./routes.unauth'));
//     app.use('/api/v1', [AuthStore.authenticate], require('./routes.auth'));
//     app.use('/api/v1/admin', [AuthStore.authenticate, AuthStore.isAdmin], require('./routes.admin'));
// };

const UserController = require("../controllers/UserController");

module.exports = function(app) {

    var userController = new UserController();
    app.get('/api/users', userController.users.bind(userController));
};