document.addEventListener('DOMContentLoaded', function () {
    
let githubLogin = document.getElementById('githubLogin');
let loggedIn = document..getElementById('logged-in');





let provider = new firebase.auth.GithubAuthProvider();


// Logga in den autentiserade användaren
githubLogin.addEventListener('click', function(event){
    github();
})


//Autentiserad login
function github() {
    firebase.auth().signInWithPopup(provider)
    .then(function(result) {
	let user = result.user;
        console.log(user);
    });
}








// Logga ut den autentiserade användaren
firebase.auth().signOut()
.then(function(result) {
	// Utloggning lyckades
})
.catch(function(error) {
	// Utloggning misslyckades
});

    



    





















    
    
    
});