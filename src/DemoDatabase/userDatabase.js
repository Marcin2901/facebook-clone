import User from "../classes/User"

    let users;

if(!JSON.parse(localStorage.getItem("users"))) {
     users = [
        new User("Sara", "King", 2000, false, "sara@gmail.com", "sara", "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80" ,true, true),
        new User("Jacek", "Placek", 1990, true, "jacek@gmail.com", "jacek", "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=580&q=80" ,true, true),
        new User("Kacper", "Piotrowski", 1995, true, "kacper@gmail.com", "kacper", "https://images.unsplash.com/photo-1517070208541-6ddc4d3efbcb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80", true, true)
]
    localStorage.setItem("users", JSON.stringify(users));
} else {
    users = JSON.parse(localStorage.getItem("users"))
    users = users.map(user => new User(user.name, user.lastname, user.dateOfBirth, user.sex, user.email, user.password, user.profileImg, user.wasLoged, user.hasAccess, user.id));
}

export default users;
