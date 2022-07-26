let users = [];

function addUser(socketID, userName, roomName) {
	const user = {
		socketID,
		userName,
		roomName,
	};
	users.push(user);
	return user;
}

function removeUser(id) {
	const getID = (users) => users.socketID === id;
	const index = users.findIndex(getID);

	if (index !== -1) {
		return users.splice(index, 1)[0];
	}
}

module.exports = {
	addUser,
	removeUser,
};
