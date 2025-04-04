const userName = document.getElementById("name");
const email = document.getElementById("email");
const password = document.getElementById("password");
const confirmPassword = document.getElementById("confirmPassword");
const register = document.getElementById("register");
const nameError = document.getElementById("nameError");
const passwordError = document.getElementById("passwordError");
const emailError = document.getElementById("emailError");
const confirmPasswordError = document.getElementById("confirmPasswordError");
const authError = document.getElementById("authError");
const successMessage = document.getElementById("successMessage");

const errorMessages = {
  emptyName: "Name cannot be empty!",
  invalidName: "Name must be between 3 and 20 characters.",
  emptyEmail: "Email cannot be empty!",
  invalidEmail: "Please enter a valid email address.",
  emptyPassword: "Password cannot be empty!",
  emptyConfirmPassword: "Confirm Password cannot be empty!",
  passwordMismatch: "Confirmed Password must match Password.",
  authError: "Email already exists!",
  patternError:
    "Password must be at least 8 characters, include uppercase, lowercase, a digit, and a special character.",
};

function validateName() {
  if (!userName.value) {
    nameError.textContent = errorMessages.emptyName;
    return false;
  } else if (userName.value.length < 3 || userName.value.length > 20) {
    nameError.textContent = errorMessages.invalidName;
    return false;
  }
  nameError.textContent = "";
  return true;
}

function validateEmail() {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email.value) {
    emailError.textContent = errorMessages.emptyEmail;
    return false;
  } else if (!emailPattern.test(email.value)) {
    emailError.textContent = errorMessages.invalidEmail;
    return false;
  }
  emailError.textContent = "";
  return true;
}

function validatePassword() {
  if (!password.value) {
    passwordError.textContent = errorMessages.emptyPassword;
    return false;
  }
  const passwordPattern =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
  if (!passwordPattern.test(password.value)) {
    passwordError.textContent = errorMessages.patternError;
    return false;
  }
  passwordError.textContent = "";
  return true;
}

function validateConfirmPassword() {
  if (!confirmPassword.value) {
    confirmPasswordError.textContent = errorMessages.emptyConfirmPassword;
    return false;
  } else if (confirmPassword.value !== password.value) {
    confirmPasswordError.textContent = errorMessages.passwordMismatch;
    return false;
  }
  confirmPasswordError.textContent = "";
  return true;
}

function clearErrors() {
  nameError.textContent = "";
  emailError.textContent = "";
  passwordError.textContent = "";
  confirmPasswordError.textContent = "";
  authError.textContent = "";
  successMessage.classList.add("hidden");
}

userName.addEventListener("input", validateName);
email.addEventListener("input", validateEmail);
password.addEventListener("input", validatePassword);
confirmPassword.addEventListener("input", validateConfirmPassword);

register.addEventListener("click", (event) => {
  event.preventDefault();

  const isFormValid =
    validateName() &&
    validateEmail() &&
    validatePassword() &&
    validateConfirmPassword();

  if (!isFormValid) return;

  const url = `http://localhost:3000/users`;
  const checkDuplicateRequest = new XMLHttpRequest();
  checkDuplicateRequest.open("GET", `${url}?email=${email.value}`, true);
  checkDuplicateRequest.onreadystatechange = () => {
    if (checkDuplicateRequest.readyState === XMLHttpRequest.DONE) {
      if (
        checkDuplicateRequest.status >= 200 &&
        checkDuplicateRequest.status < 300
      ) {
        const duplicate = JSON.parse(checkDuplicateRequest.responseText);
        if (duplicate.length > 0) {
          authError.textContent = errorMessages.authError;
        } else {
          Message();
        }
      } else {
        console.error(
          "Request failed with status:",
          checkDuplicateRequest.status
        );
      }
    }
  };
  checkDuplicateRequest.onerror = () => {
    console.error("Request failed");
  };
  checkDuplicateRequest.send();
});
function Message() {
  successMessage.classList.remove("hidden");
  successMessage.classList.add("visible");
  setTimeout(() => {
    window.location.href = "./Login.html";
  }, 3000);
  setTimeout(() => {
    registerUser();
  }, 3000);
}
function registerUser() {
  const url = `http://localhost:3000/users`;
  const registerRequest = new XMLHttpRequest();
  registerRequest.open("POST", url, true);
  registerRequest.setRequestHeader("Content-Type", "application/json");

  const data = JSON.stringify({
    name: userName.value,
    email: email.value,
    password: password.value,
  });
  registerRequest.send(data);

  registerRequest.onerror = () => {
    console.error("Request failed");
  };
}
