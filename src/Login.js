var email = document.getElementById("email");
var password = document.getElementById("password");
var login = document.getElementById("login");
var emailError = document.getElementById("emailError");
var passwordError = document.getElementById("passwordError");
var loginIssue = document.getElementById("loginIssue");
var successMessage = document.getElementById("successMessage");

const errorMessages = {
  emptyEmail: "Email Cannot be EMPTY!",
  emptyPassword: "Password Cannot be EMPTY!",
  auth: "Incorrect Password or Email",
};
function validateEmail() {
  if (!email.value) {
    emailError.innerHTML = errorMessages.emptyEmail;
    return false;
  } else {
    emailError.innerHTML = "";
    return true;
  }
}

function validatePassword() {
  if (!password.value) {
    passwordError.innerHTML = errorMessages.emptyPassword;
    return false;
  } else {
    passwordError.innerHTML = "";
    return true;
  }
}
email.addEventListener("input", validateEmail);
password.addEventListener("input", validatePassword);
login.addEventListener("click", (event) => {
  const isFormValid = validateEmail() && validatePassword();
  if (!isFormValid) {
    event.preventDefault();
  } else {
    event.preventDefault();
    const url = `http://localhost:3000/users?email=${email.value}&&password=${password.value}`;
    const httpReq = new XMLHttpRequest();
    httpReq.open("GET", url);
    httpReq.send();
    var users = [];
    httpReq.addEventListener("readystatechange", function () {
      if (httpReq.readyState == 4) {
        users = JSON.parse(httpReq.response);
        if (users.length >= 1) {
          loginIssue.innerHTML = "";
          console.log("redirect to home");
          successMessage.classList.remove("hidden");
          successMessage.classList.add("visible");
          setTimeout(function () {
            window.location.href = "./Login.html";
          }, 2000);
        } else {
          loginIssue.innerHTML = errorMessages.auth;
        }
      }
    });
  }
});
