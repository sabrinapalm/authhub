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
    console.log('Popup result: logged in with Facebook as ', user.displayName);
  })
  .catch(function(error){
    let errorCode = error.code;
    let errorMessage = error.message;
    let email = error.email;   // The email of the user's account used.
    let credential = error.credential;  // The firebase.auth.AuthCredential type that was used.
  })
}

// This is called with the results from from FB.getLoginStatus().
  function statusChangeCallback(response) {
    console.log('statusChangeCallback');
    console.log(response);
    // The response object is returned with a status field that lets the
    // app know the current login status of the person.
    // Full docs on the response object can be found in the documentation
    // for FB.getLoginStatus().
    if (response.status === 'connected') {
      // Logged into your app and Facebook.

      testAPI();
    } else {
      // The person is not logged into your app or we are unable to tell.
      console.log("not authenticated");
    }
  }

  // This function is called when someone finishes with the Login
  // Button.  See the onlogin handler attached to it in the sample
  // code below.
  function checkLoginState() {
    FB.getLoginStatus(function(response) {
      statusChangeCallback(response);
    });
  }

  window.fbAsyncInit = function() {
    FB.init({
      appId      : '1980065445565249',
      cookie     : true,  // enable cookies to allow the server to access
                          // the session
      xfbml      : true,  // parse social plugins on this page
      version    : 'v2.8' // use graph api version 2.8
    });

    // Now that we've initialized the JavaScript SDK, we call
    // FB.getLoginStatus().  This function gets the state of the
    // person visiting this page and can return one of three states to
    // the callback you provide.  They can be:
    //
    // 1. Logged into your app ('connected')
    // 2. Logged into Facebook, but not your app ('not_authorized')
    // 3. Not logged into Facebook and can't tell if they are logged into
    //    your app or not.
    //
    // These three cases are handled in the callback function.

    FB.getLoginStatus(function(response) {
      statusChangeCallback(response);
    });

  };

  // Load the SDK asynchronously
  (function(d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return;
    js = d.createElement(s); js.id = id;
    js.src = "https://connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
  }(document, 'script', 'facebook-jssdk'));

  // Here we run a very simple test of the Graph API after login is
  // successful.  See statusChangeCallback() for when this call is made.
  function testAPI() {
    console.log('Welcome!  Fetching your information.... ');
    FB.api('/me', function(response) {
      console.log('Successful login for: ' + response.name);
      document.getElementById('status').innerHTML =
        'Thanks for logging in, ' + response.name + '!';
    });
  }





















});
