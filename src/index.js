import * as firebase from "firebase/app";
// Add the Firebase products that you want to use
import "firebase/auth";
import "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyB5vZ8duvVnJowTvmiSSvyLyY2TOMtc-6g",
  authDomain: "chat-292208.firebaseapp.com",
  databaseURL: "https://chat-292208.firebaseio.com",
  //projectId: "chat-292208",
  storageBucket: "chat-292208.appspot.com",
  //messagingSenderId: "344268651055",
  //appId: "1:344268651055:web:dfd0bdd9f0e3b70f45a4da",
  //measurementId: "G-5V70GE0KE1",
};
firebase.initializeApp(firebaseConfig);
//firebase.analytics();
const userName = document.getElementById("userName");
const userImg = document.getElementById("userImg");
const btnSignIn = document.getElementById("btnSignIn");
const btnDisconnect = document.getElementById("btnDisconnect");
const content = document.getElementById("content");
userName.style.display = "none";
userImg.style.display = "none";
btnSignIn.style.display = "none";
btnDisconnect.style.display = "none";
const googleClientInit = () => {
  const getPeopleData = () => {
    return gapi.client.people.people
      .get({
        resourceName: "people/me",
        personFields: "names,emailAddresses,genders,birthdays",
      })
      .then((res) => {
        const data = res.result;
        const name = data.names[0].displayName;
        const date = data.birthdays[1].date;
        return { data, name, date };
      });
  };
  gapi.load("client", () => {
    gapi.client
      .init({
        clientId: "344268651055-m4ljngds85vblb87lgd4lbtl9rpge7v1.apps.googleusercontent.com",
        scope: "profile https://www.googleapis.com/auth/user.birthday.read",
        discoveryDocs: ["https://www.googleapis.com/discovery/v1/apis/people/v1/rest"],
      })
      .then(() => {
        const googleAuth = gapi.auth2.getAuthInstance();
        const signinChanged = (val) => {
          if (val) {
            userName.style.display = "";
            userImg.style.display = "";
            btnSignIn.style.display = "none";
            btnDisconnect.style.display = "";
            const basicProfile = googleAuth.currentUser.get().getBasicProfile();
            userName.innerHTML = basicProfile.getName();
            userImg.style.backgroundImage = `url(${basicProfile.getImageUrl()})`;
            getPeopleData().then((res) => {
              const date = res.date;
              content.innerHTML = `${date.year} ${date.month} ${date.day}`;
            });
          } else {
            userName.style.display = "none";
            userImg.style.display = "none";
            btnSignIn.style.display = "";
            btnDisconnect.style.display = "none";
            content.innerHTML = "";
          }
        };
        signinChanged(googleAuth.isSignedIn.get());
        /*const userChanged = (val) => {
          console.log("aaaaaaaaaa", val);
        };*/
        googleAuth.isSignedIn.listen(signinChanged);
        //googleAuth.currentUser.listen(userChanged);
      });
  });
};
const googleLogin = () => {
  const auth2 = gapi.auth2.getAuthInstance();
  auth2.signIn().then(
    (googleUser) => {
      console.log("Google登入成功");
    },
    (error) => {
      console.log("Google登入失敗");
      console.log(error);
    }
  );
};

const googleDisconnect = () => {
  const auth2 = gapi.auth2.getAuthInstance();
  auth2.disconnect().then(() => {
    console.log("Google登出");
  });
};
btnSignIn.addEventListener("click", () => {
  googleLogin();
});
btnDisconnect.addEventListener("click", () => {
  googleDisconnect();
});
googleClientInit();

const firebase_userName = document.getElementById("firebase_userName");
const firebase_userImg = document.getElementById("firebase_userImg");
const firebase_btnSignIn = document.getElementById("firebase_btnSignIn");
const firebase_btnSignOut = document.getElementById("firebase_btnSignOut");

firebase_userName.style.display = "none";
firebase_userImg.style.display = "none";
firebase_btnSignIn.style.display = "none";
firebase_btnSignOut.style.display = "none";

const firebase_signIn = (user) => {
  //console.log(user);
  firebase_userName.innerHTML = user.displayName;
  firebase_userImg.style.backgroundImage = `url(${user.photoURL})`;

  firebase_userName.style.display = "";
  firebase_userImg.style.display = "";
  firebase_btnSignIn.style.display = "none";
  firebase_btnSignOut.style.display = "";
};
const firebase_signOut = () => {
  //console.log(user);
  firebase_userName.innerHTML = "";
  firebase_userImg.style.backgroundImage = "";

  firebase_userName.style.display = "none";
  firebase_userImg.style.display = "none";
  firebase_btnSignIn.style.display = "";
  firebase_btnSignOut.style.display = "none";
};
firebase.auth().onAuthStateChanged(function (user) {
  if (user) {
    firebase_signIn(user);
  } else {
    firebase_signOut();
  }
});
firebase_btnSignIn.addEventListener("click", () => {
  var provider = new firebase.auth.GoogleAuthProvider();
  provider.addScope("profile");
  provider.addScope("email");
  provider.addScope("https://www.googleapis.com/auth/user.birthday.read");
  firebase
    .auth()
    .signInWithPopup(provider)
    .then(function (result) {
      var token = result.credential.accessToken;
      console.log(result.credential);
    });
});

firebase_btnSignOut.addEventListener("click", () => {
  firebase.auth().signOut();
  /*.then(function () {
      alert("登出");
    });*/
});
