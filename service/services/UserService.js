var UserService = (function(){
    var users = [];

    function getAll(){
        return users;
    }

    function register(username) {
        users.push(username);
    }

    function remove(username) {
        for(var i = users.length - 1; i >= 0; i--) {
            if(users[i] === username) {
                users.splice(i, 1);
            }
        }
    }

    return {
        getAll: getAll,
        register: register,
        remove: remove
    };
}());

module.exports = UserService;