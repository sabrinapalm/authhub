document.addEventListener('DOMContentLoaded', function () {

//Login buttons
let githubLogin = document.getElementById('githubLogin'),
    googleLogin = document.getElementById('googleLogin'),
    loggedIn = document.getElementById('logged-in');

//user info card
let card = document.getElementById('card'),
    buttonWrapper = document.getElementById('buttonWrapper'),
    popup = document.getElementById('popup'),
    logout;

//firebase AuthProviders
let githubProvider = new firebase.auth.GithubAuthProvider(),
    googleProvider = new firebase.auth.GoogleAuthProvider(),
    twitterProvider = new firebase.auth.TwitterAuthProvider();


//Eventlisteners
githubLogin.addEventListener('click', function(event){
    github();
})
googleLogin.addEventListener('click', function(event){
    google();
})
twitterLogin.addEventListener('click', function(event){
    twitter();
})

//create card function
function createUserInfo(name, email, photo){

  //hide githubLogin
  buttonWrapper.style.display = 'none';

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
}

//popup for error messages
function handleError(failed){
  let failedMsg = document.createElement('p');
  popup.style.display = 'block';
  failedMsg.innerText = failed;
  popup.appendChild(failedMsg);
}


/***************************GITHUB***************************/
//Autentiserad login
function github() {
    firebase.auth().signInWithPopup(githubProvider)
    .then(function(result) {
	     let user = result.user;

        //userinfo
        let name = user.displayName;
        let email = user.email;
        let photo = user.photoURL;

        createUserInfo(name, email, photo);
    })
    .catch(function(error){
      //Inlogg misslyckades!
      let failed = error.message;
      handleError(failed);

    })
}

function githubLogOut() {
  // Logga ut den autentiserade användaren
  firebase.auth().signOut()
  .then(function() {
  	// Utloggning lyckades

    githubLogin.style.display = 'block';
    card.style.display = 'none';

    window.location.reload();
  })
  .catch(function(error) {
    // Utloggning misslyckades
    let failed = error.message;
    handleError(failed);
  });
}
/***************************GITHUB ENDS***************************/



/***************************GOOGLE***************************/
function google() {
    firebase.auth().signInWithPopup(googleProvider)
    .then(function(result) {
      let user = result.user;

      let name = user.displayName;
      let email = user.email;
      let photo = user.photoURL;

      createUserInfo(name, email, photo);
    })
    .catch(function(error){
      let failed = error.message;
      handleError(failed);
    })
}
/***************************GOOGLE ENDS***************************/


/***************************TWITTER***************************/

function twitter() {
    firebase.auth().signInWithPopup(twitterProvider)
    .then(function(result) {
      let user = result.user;

      let name = user.displayName;
      let photo = user.photoURL;

      //check if email is null
      if (user.email == null) {
        email = 'email not verified'
      } else {
        let email = user.email;
      }

      createUserInfo(name, email, photo);
    })
    .catch(function(error){
      let failed = error.message;
      handleError(failed);
    })
}
/***************************TWITTER ENDS***************************/



















});
