document.addEventListener('DOMContentLoaded', function () {

let githubLogin = document.getElementById('githubLogin');
let facebookLogin = document.getElementById('facebookLogin');
let loggedIn = document.getElementById('logged-in');
let card = document.getElementById('card');
let buttonWrapper = document.getElementById('buttonWrapper');
let logout;

let ghProvider = new firebase.auth.GithubAuthProvider();
let fbProvider = new firebase.auth.FacebookAuthProvider();



// Logga in den autentiserade användaren
githubLogin.addEventListener('click', function(event){
    github();
})

facebookLogin.addEventListener('click', function(event){
  facebook();
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


/***************************FACEBOOK***************************/

function facebook() {
  firebase.auth().signInWithPopup(fbProvider)
  .then(function(result) {
    let token = result.credential.accessToken;
    let fbuser = result.user;  // The signed-in user info.
    console.log(fbuser);
  })
  .catch(function(error){

  })
}


window.fbAsyncInit = function() {
  FB.init({
    appId      : '1980065445565249',
    cookie     : true,
    xfbml      : true,
    version    : 'v2.12'
  });

  FB.AppEvents.logPageView();

};

(function(d, s, id){
   var js, fjs = d.getElementsByTagName(s)[0];
   if (d.getElementById(id)) {return;}
   js = d.createElement(s); js.id = id;
   js.src = "https://connect.facebook.net/en_US/sdk.js";
   fjs.parentNode.insertBefore(js, fjs);
 }(document, 'script', 'facebook-jssdk'));


 function checkLoginState() {
   FB.getLoginStatus(function(response) {
     statusChangeCallback(response);
   });
 }
























});
