function initSignUpPage() {
  document.body.style.overflow = "auto";
  // check box
  const termsCheckbox = document.getElementById("termsCheckbox");
  const termsCheck = document.getElementById("termsCheck");
  const termsInput = document.getElementById("terms");
  // password toggle variable
  const togglePassword = document.getElementById("togglePassword");
  const passwordInput = document.getElementById("password");
  const toggleConfirmPassword = document.getElementById(
    "toggleConfirmPassword"
  );
  const confirmPasswordInput = document.getElementById("confirmPassword");
  // form validation
  const form = document.getElementById("signupForm");
  const email = document.getElementById("email");
  const username = document.getElementById("username");
  const password = document.getElementById("password");
  const confirmPassword = document.getElementById("confirmPassword");
  const terms = document.getElementById("terms");
  const signUpErrorMsg = document.getElementById("signUpErrorMsg");

  // Password toggle
  togglePassword.addEventListener("click", function () {
    const icon = this.querySelector("i");
    if (passwordInput.type === "password") {
      passwordInput.type = "text";
      icon.className = "ri-eye-line text-gray-400 text-lg";
    } else {
      passwordInput.type = "password";
      icon.className = "ri-eye-off-line text-gray-400 text-lg";
    }
  });

  toggleConfirmPassword.addEventListener("click", function () {
    const icon = this.querySelector("i");
    if (confirmPasswordInput.type === "password") {
      confirmPasswordInput.type = "text";
      icon.className = "ri-eye-line text-gray-400 text-lg";
    } else {
      confirmPasswordInput.type = "password";
      icon.className = "ri-eye-off-line text-gray-400 text-lg";
    }
  });

  termsCheckbox.addEventListener("click", function () {
    if (termsInput.checked) {
      termsInput.checked = false;
      termsCheckbox.classList.remove("bg-primary", "border-primary");
      termsCheckbox.classList.add("border-gray-300");
      termsCheck.classList.add("hidden");
    } else {
      termsInput.checked = true;
      termsCheckbox.classList.add("bg-primary", "border-primary");
      termsCheckbox.classList.remove("border-gray-300");
      termsCheck.classList.remove("hidden");
    }
  });

  function showError(fieldId, message) {
    const errorElement = document.getElementById(fieldId + "Error");
    const inputElement = document.getElementById(fieldId);
    errorElement.textContent = message;
    errorElement.classList.remove("hidden");
    inputElement.classList.add("border-red-500");
  }

  function hideError(fieldId) {
    const errorElement = document.getElementById(fieldId + "Error");
    const inputElement = document.getElementById(fieldId);
    errorElement.classList.add("hidden");
    inputElement.classList.remove("border-red-500");
  }

  function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  email.addEventListener("blur", function () {
    if (this.value && !validateEmail(this.value)) {
      showError("email", "Please enter a valid email address");
    } else {
      hideError("email");
    }
  });

  username.addEventListener("blur", function () {
    if (this.value && this.value.length < 3) {
      showError("username", "Username must be at least 3 characters long");
    } else {
      hideError("username");
    }
  });

  password.addEventListener("blur", function () {
    if (this.value && this.value.length < 6) {
      showError("password", "Password must be at least 6 characters long");
    } else {
      hideError("password");
    }
  });

  confirmPassword.addEventListener("blur", function () {
    if (this.value && this.value !== password.value) {
      showError("confirmPassword", "Passwords do not match");
    } else {
      hideError("confirmPassword");
    }
  });

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    signUpErrorMsg.classList.add("hidden");
    let isValid = true;

    if (!email.value) {
      showError("email", "Email is required");
      isValid = false;
    } else if (!validateEmail(email.value)) {
      showError("email", "Please enter a valid email address");
      isValid = false;
    } else {
      hideError("email");
    }

    if (!username.value) {
      showError("username", "Username is required");
      isValid = false;
    } else if (username.value.length < 3) {
      showError("username", "Username must be at least 3 characters long");
      isValid = false;
    } else {
      hideError("username");
    }

    if (!password.value) {
      showError("password", "Password is required");
      isValid = false;
    } else if (password.value.length < 6) {
      showError("password", "Password must be at least 6 characters long");
      isValid = false;
    } else {
      hideError("password");
    }

    if (!confirmPassword.value) {
      showError("confirmPassword", "Please confirm your password");
      isValid = false;
    } else if (confirmPassword.value !== password.value) {
      showError("confirmPassword", "Passwords do not match");
      isValid = false;
    } else {
      hideError("confirmPassword");
    }

    if (!terms.checked) {
      showError("terms", "Please accept the terms and conditions");
      isValid = false;
    } else {
      hideError("terms");
    }

    if (isValid) {
      signUpUser();
    }
  });

  async function signUpUser() {
    showLoader();
    try {
      const response = await fetch(
        "https://miandrilala.online/api/user/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: username.value,
            pass: passwordInput.value,
            mail: email.value,
          }),
        }
      );

      const data = await response.json();
      if (data.status) {
        // Construire l'objet user
        const user = {
          id: data.id,
          username: data.name,
          email: data.mail,
          token: data.token,
        };
        // Stocker en session
        sessionStorage.setItem("user", JSON.stringify(user));
        // 🔹 notifier l'app Vue
        window.app.isLoggedIn = true;
        window.app.page = "add-transaction";
        signUpErrorMsg.classList.add("hidden");
        clearInput();
      } else {
        signUpErrorMsg.classList.remove("hidden");
      }
    } catch (error) {
      console.error("Une erreur est survenu: ", error);
      signUpErrorMsg.classList.remove("hidden");
    } finally {
      hideLoader();
    }
  }

  function clearInput() {
    username.value = "";
    passwordInput.value = "";
    email.value = "";
    confirmPasswordInput.value = "";
  }

  function showLoader() {
    document.getElementById("page-loader").classList.remove("hidden");
  }

  function hideLoader() {
    document.getElementById("page-loader").classList.add("hidden");
  }
  hideLoader();
}
