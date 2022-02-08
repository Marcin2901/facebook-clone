import Post from "../classes/Post";
import User from "../classes/User";
import getData from "./postsDemoDatabase/postDatabase";

    let users;

// Zestaw początkowych użytkowników którzy zostaną dodani do localStorage

if(!JSON.parse(localStorage.getItem("users"))) {
     users = [
        new User("Sara", "King", 2000, false, "sara@gmail.com", "sara", "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80" ,true, true),
        new User("Jacek", "Placek", 1990, true, "jacek@gmail.com", "jacek", "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=580&q=80" ,true, true),
        new User("Kacper", "Piotrowski", 1995, true, "kacper@gmail.com", "kacper", "https://images.unsplash.com/photo-1517070208541-6ddc4d3efbcb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80", true, true),
        new User("Michał", "Pytko", 2000, true, "michal@gmail.com", "michal", "https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=580&q=80", false, false),
        new User("Adam", "Niezgudka", 1990, true, "adam@gmail.com", "adam"),
        new User("Kasia", "Mac", 1990, false, "kasia@gmail.com", "kasia", "https://images.unsplash.com/photo-1557555187-23d685287bc3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=464&q=80", false, false),
        new User("Maciek", "Konus", 1995, true, "maciek@gmail.com", "maciek", "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=580&q=80", false, false),
        new User("Agnieszka", "Rak", 2000, false, "aga@gmail.com", "aga", "https://images.unsplash.com/photo-1605406575497-015ab0d21b9b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80", false, false),
        new User("Miłosz", "Ptak", 1990, true, "milosz@gmail.com", "milosz", "https://images.unsplash.com/photo-1480429370139-e0132c086e2a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=388&q=80", false, false),
        new User("Michał", "Kowalski", 1995, true, "michael@gmail.com", "michael", "https://images.unsplash.com/photo-1581803118522-7b72a50f7e9f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80", false, false),
        new User("Gabrysia", "Burzawa", 2000, false, "gabi@gmail.com", "gabi", "https://images.unsplash.com/photo-1491349174775-aaafddd81942?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80", false, false),
        new User("Rafał", "Nowak", 1995, true, "rafal@gmail.com", "rafal"),
        new User("Anita", "Dąbrowska", 2000, false, "anita@gmail.com", "anita")
]
    //dodawanie znajomych i testu wiadomości
    for(let user1 of users) {
        // wybrany urzytkownik
        const sara = users[0];
        for(let user2 of users) {
            if(user1 === user2) continue
            user1.friends.push(user2.id);
            //sara wysyła do wszystkich wiadomość
            user1.name==="Sara" && user1.messages.push({userId: user2.id, ourMessages: [{fromUserId: user1.id, text: "sprawdzam tylko czy wiadomości się wysyłają"},
                                                                 {fromUserId: user2.id, text: "Jak tam?"},
                                                                 {fromUserId: user2.id, text: "Hej"},
                                                                 {fromUserId: user1.id, text: "Cześć"}]})
            //wszyscy dostają wiadomość od sary                                                     
            user1.name!=="Sara" && user1.messages.length < 1 && user1.messages.push({userId: sara.id, ourMessages: [{fromUserId: sara.id, text: "sprawdzam tylko czy wiadomości się wysyłają"},
                                                                {fromUserId: user1.id, text: "Jak tam?"},
                                                                {fromUserId: user1.id, text: "Hej"},
                                                                {fromUserId: sara.id, text: "Cześć"}]})

        }
    }
    
    //dodawanie przykładowych postów dla urzytkowników z postDemoDatabase
   const postDatabase = getData();
    postDatabase.then(data => {
        for(let user of users) {
            for(let i=0; i<5; i++) {
                const post = data.pop();
                user.addPost(post.body, post.img, post.date)
            }
        }
        localStorage.setItem("users", JSON.stringify(users));
    })
 
} else {
   users = JSON.parse(localStorage.getItem("users"))
   //konwersja pobranych z localStorage użytkowników na obiekty żeby mieć dostęp do metod klasy User
   users = users.map(user => ( new User(user.name, user.lastname, user.dateOfBirth, user.sex, user.email,
                                        user.password, user.profileImg, user.wasLoged, user.hasAccess,
                                        user.posts.map(post => new Post(post.author, post.body, post.userId,
                                                                        post.dateOfPublic, post.img, post.likes,
                                                                        post.comments, post.id )),
                                         user.id, user.friends, user.notifications, user.messages)));
}

export default users;
