!function(e){var n={};function t(o){if(n[o])return n[o].exports;var r=n[o]={i:o,l:!1,exports:{}};return e[o].call(r.exports,r,r.exports,t),r.l=!0,r.exports}t.m=e,t.c=n,t.d=function(e,n,o){t.o(e,n)||Object.defineProperty(e,n,{enumerable:!0,get:o})},t.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},t.t=function(e,n){if(1&n&&(e=t(e)),8&n)return e;if(4&n&&"object"==typeof e&&e&&e.__esModule)return e;var o=Object.create(null);if(t.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:e}),2&n&&"string"!=typeof e)for(var r in e)t.d(o,r,function(n){return e[n]}.bind(null,r));return o},t.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(n,"a",n),n},t.o=function(e,n){return Object.prototype.hasOwnProperty.call(e,n)},t.p="",t(t.s=0)}([function(e,n){document.getElementById("btnSignIn").addEventListener("click",(function(){document.getElementById("content").innerHTML="",gapi.auth2.getAuthInstance().signIn().then((function(e){console.log("Google登入成功"),console.log(e.getBasicProfile().getImageUrl()),gapi.client.people.people.get({resourceName:"people/me",personFields:"names,phoneNumbers,emailAddresses,addresses,residences,genders,birthdays,occupations"}).then((function(e){var n=JSON.stringify(e.result);document.getElementById("content").innerHTML=n}))}),(function(e){console.log("Google登入失敗"),console.log(e)}))})),document.getElementById("btnDisconnect").addEventListener("click",(function(){gapi.auth2.getAuthInstance().disconnect().then((function(){console.log("User disconnect.")}))})),gapi.load("client",(function(){gapi.client.init({clientId:"283144508560-40ugpd9i0hj6gepplhrroihd5gaujqss.apps.googleusercontent.com",scope:"profile https://www.googleapis.com/auth/user.birthday.read",discoveryDocs:["https://www.googleapis.com/discovery/v1/apis/people/v1/rest"]})}))}]);