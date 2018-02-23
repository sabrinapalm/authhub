document.addEventListener('DOMContentLoaded', function () {

let githubLogin = document.getElementById('githubLogin');
let loggedIn = document.getElementById('logged-in');
let card = document.getElementById('card');
let buttonWrapper = document.getElementById('buttonWrapper');
let logout;

let ghProvider = new firebase.auth.GithubAuthProvider();

// Logga in den autentiserade användaren
githubLogin.addEventListener('click', function(event){
    github();
})


/***************************GITHUB***************************/
//Autentiserad login
function github() {
    firebase.auth().signInWithPopup(ghProvider)
    .then(function(result) {
	     let user = result.user;

       //hide githubLogin
       buttonWrapper.style.display = 'none';
        console.log(user);

        //userinfo
        let name = user.displayName;
        let email = user.email;
        let photo = user.photoURL;

        //create elements
        let h1 = document.createElement('h1');
        let p = document.createElement('p');
        let logout = document.createElement('button');
        let img = document.createElement('img');

        //apply info to elements
        img.src = photo;
        img.alt = name;
        h1.innerText = name;
        p.innerText = email;
        logout.innerText = 'Log out';

        //apply to card
        card.appendChild(img);
        card.appendChild(h1);
        card.appendChild(p);
        card.appendChild(logout);

        //apply eventlistener on logout button
        logout.onclick = githubLogOut;
    })
    .catch(function(error){
      //Inlogg misslyckades!
      console.log(error)

      console.log(err.message)
    })
}

function githubLogOut() {
  // Logga ut den autentiserade användaren
  firebase.auth().signOut()
  .then(function() {
  	// Utloggning lyckades
    console.log("User is logged out");

    githubLogin.style.display = 'block';
    card.style.display = 'none';

    window.location.reload();
  })
  .catch(function(error) {
    // Utloggning misslyckades
  	console.log('Error, utloggning misslyckades!')
  });
}

/***************************GITHUB ENDS***************************/


/***************************GOOGLE***************************/





/***************************GOOGLE ENDS***************************/

/***************************TWITTER***************************/





/***************************TWITTER ENDS***************************/



















});
