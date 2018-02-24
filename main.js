document.addEventListener('DOMContentLoaded', function () {
	//Login buttons
	let githubLogin = document.getElementById('githubLogin'),
		googleLogin = document.getElementById('googleLogin'),
		loggedIn = document.getElementById('logged-in');
	//user info card
	let card = document.getElementById('card'),
		online = document.getElementById('online'),
		buttonWrapper = document.getElementById('buttonWrapper'),
		popup = document.getElementById('popup'),
		logout;
	//firebase AuthorProviders
	let githubProvider = new firebase.auth.GithubAuthProvider(),
		googleProvider = new firebase.auth.GoogleAuthProvider(),
		twitterProvider = new firebase.auth.TwitterAuthProvider();
	//Button eventlisteners
	githubLogin.addEventListener('click', function (event) {
		github();
	})
	googleLogin.addEventListener('click', function (event) {
		google();
	})
	twitterLogin.addEventListener('click', function (event) {
		twitter();
	})
	/***************************GITHUB***************************/
	function github() {
		firebase.auth().signInWithPopup(githubProvider).then(function (result) {
			let user = result.user;
			//userinfo
			let name = user.displayName;
			let email = user.email;
			let photo = user.photoURL;
			createUserInfo(name, email, photo);
		}).catch(function (error) {
			//Inlogg misslyckades!
			let failed = error.message;
			handleError(failed);
		})
	}
	/***************************GITHUB ENDS***************************/
	/***************************GOOGLE***************************/
	function google() {
		firebase.auth().signInWithPopup(googleProvider).then(function (result) {
			let user = result.user;
			let name = user.displayName;
			let email = user.email;
			let photo = user.photoURL;
			createUserInfo(name, email, photo);
		}).catch(function (error) {
			let failed = error.message;
			handleError(failed);
		})
	}
	/***************************GOOGLE ENDS***************************/
	/***************************TWITTER***************************/
	function twitter() {
		firebase.auth().signInWithPopup(twitterProvider).then(function (result) {
			let user = result.user;
			let name = user.displayName;
			let photo = user.photoURL;
			let newPhoto = photo.replace("_normal", "");
			//check if email is null
			if (user.email == null) {
				email = 'email is not verified'
			} else {
				let email = user.email;
			}
			createUserInfo(name, email, newPhoto);
		}).catch(function (error) {
			let failed = error.message;
			handleError(failed);
		})
	}
	/***************************TWITTER ENDS***************************/
	/***************************CREATE USER CARD***************************/
	function createUserInfo(name, email, photo, newPhoto) {
		//hide githubLogin
		buttonWrapper.style.display = 'none';
		online.style.display = 'none';
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
		logout.onclick = LogOut;
	}
	/***************************CREATE USER CARD END***************************/
	/***************************ERRORMESSAGE HANDLER***************************/
	//popup for error messages
	function handleError(failed) {
		let failedMsg = document.createElement('p');
		popup.style.display = 'block';
		failedMsg.innerText = failed;
		popup.appendChild(failedMsg);
	}
	/***************************ERRORMESSAGE HANDLER END***************************/
	/***************************LOGOUT FUNCTION***************************/
	//Logout function
	function LogOut() {
		// Logga ut den autentiserade användaren
		firebase.auth().signOut().then(function () {
			// Utloggning lyckades
			githubLogin.style.display = 'block';
			card.style.display = 'none';
			window.location.reload();
		}).catch(function (error) {
			// Utloggning misslyckades
			let failed = error.message;
			handleError(failed);
		});
	}
	/***************************LOGOUT FUNCTION END***************************/
});
