document.cookie = "SameSite=Secure";
const googleClientInit = () => {
  gapi.load("auth2", () => {
    //console.log(gapi);
  });
  gapi.load("client", () => {
    //console.log(gapi);
    gapi.client.init({
      clientId: "283144508560-40ugpd9i0hj6gepplhrroihd5gaujqss.apps.googleusercontent.com",
      scope: "profile https://www.googleapis.com/auth/user.birthday.read",
      discoveryDocs: ["https://www.googleapis.com/discovery/v1/apis/people/v1/rest"],
      //scope: "https://www.googleapis.com/auth/contacts.readonly",
    });
    /*.then(() => {
      });*/
  });
};
const googleLogin = () => {
  const auth2 = gapi.auth2.getAuthInstance();
  auth2.signIn().then(
    (googleUser) => {
      //console.log(GoogleUser);
      console.log("Google登入成功");
      console.log(googleUser.getBasicProfile().getImageUrl());
      //const user_id = GoogleUser.getId();
      //console.log(`user_id:${user_id}`);
      //const AuthResponse = GoogleUser.getAuthResponse(true);
      //const id_token = AuthResponse.id_token;
      //console.log(`id_token:${id_token}`);
      /*gapi.client.people.people.connections
        .list({
          resourceName: "people/me",
          pageSize: 10,
          personFields: "names,phoneNumbers,emailAddresses,addresses,residences,genders,birthdays,occupations",
        })
        .then(function (res) {
          console.log(res);
        });*/
      gapi.client.people.people
        .get({
          resourceName: "people/me",
          personFields: "names,phoneNumbers,emailAddresses,addresses,residences,genders,birthdays,occupations",
        })
        .then((res) => {
          console.log(res, res.result);
          const data = res.result;
          console.log(data);
          /*const str = JSON.stringify(res.result);
          document.getElementById("content").innerHTML = str;*/
          document.getElementById("content").innerHTML = data.names[0].displayName;
        });
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
    console.log("User disconnect.");
  });
};
const btnSignIn = document.getElementById("btnSignIn");
btnSignIn.addEventListener("click", () => {
  document.getElementById("content").innerHTML = "";
  googleLogin();
});
const btnDisconnect = document.getElementById("btnDisconnect");
btnDisconnect.addEventListener("click", () => {
  googleDisconnect();
});
googleClientInit();
