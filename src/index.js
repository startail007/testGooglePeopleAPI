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

  const signin = () => {
    return getPeopleData().then((res) => {
      userName.innerHTML = res.name;
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
