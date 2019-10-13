document.addEventListener('DOMContentLoaded', function () {

	const config = {
		apiKey: "AIzaSyDoVRo1XfbNCkUwCVkxr6Xk9bW1qU4Zu94",
		authDomain: "authhub-8d3ea.firebaseapp.com",
		databaseURL: "https://authhub-8d3ea.firebaseio.com",
		projectId: "authhub-8d3ea",
		storageBucket: "authhub-8d3ea.appspot.com",
		messagingSenderId: "186430138185"
	};
	firebase.initializeApp(config);

	//Login buttons
	let githubLogin = document.getElementById('githubLogin');
	let googleLogin = document.getElementById('googleLogin');
	let loggedIn = document.getElementById('logged-in');
	//user info card
	let card = document.getElementById('card');
	let online = document.getElementById('online');
	let buttonWrapper = document.getElementById('buttonWrapper');
	let popup = document.getElementById('popup');
	//firebase AuthorProviders
	let githubProvider = new firebase.auth.GithubAuthProvider();
	let googleProvider = new firebase.auth.GoogleAuthProvider();

	//Button eventlisteners
	githubLogin.addEventListener('click', function (event) {
		github();
	})
	googleLogin.addEventListener('click', function (event) {
		google();
	})

	/***************************GITHUB***************************/
	function github() {
		firebase.auth().signInWithPopup(githubProvider).then(function (res) {
			let user = {
				name: res.user.displayName,
				email: res.user.email,
				photo: res.user.photoURL
			};
			createUserInfo(user);
		}).catch(function (error) {
			//Inlogg misslyckades!
			let failed = error.message;
			handleError(failed);
		})
	}
	/***************************GITHUB ENDS***************************/
	/***************************GOOGLE***************************/
	function google() {
		firebase.auth().signInWithPopup(googleProvider).then(function (res) {
			let user = {
				name: res.user.displayName,
				email: res.user.email,
				photo: res.user.photoURL
			};
			createUserInfo(user);
		}).catch(function (error) {
			let failed = error.message;
			handleError(failed);
		})
	}
	/***************************GOOGLE ENDS***************************/

	/***************************CREATE USER CARD***************************/
	function createUserInfo(user) {
		//hide githubLogin
		buttonWrapper.style.display = 'none';
		online.style.display = 'none';
		//create elements
		let h1 = document.createElement('h1');
		let p = document.createElement('p');
		let logout = document.createElement('button');
		let img = document.createElement('img');
		//apply info to elements
		img.src = user.photo;
		img.alt = user.name;
		h1.innerText = user.name;
		p.innerText = user.email;
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