function initSignInPage() {
  showLoader();
  document.body.style.overflow = "auto";
  const toggleButton = document.getElementById("togglePassword");
  const passwordInput = document.getElementById("passwordInput");
  const icon = toggleButton.querySelector("i");
  toggleButton.addEventListener("click", function () {
    if (passwordInput.type === "password") {
      passwordInput.type = "text";
      icon.className = "ri-eye-line text-gray-400 text-lg";
    } else {
      passwordInput.type = "password";
      icon.className = "ri-eye-off-line text-gray-400 text-lg";
    }
  });

  // authentication

  const signInBtn = document.getElementById("signIn");
  const username = document.getElementById("username");
  const usernameError = document.getElementById("usernameError");
  const passwordError = document.getElementById("passwordError");
  const loginErrorMsg = document.getElementById("loginErrorMsg");
  let isValid = false;
  passwordInput;

  signInBtn.addEventListener("click", function () {
    loginErrorMsg.classList.add("hidden");
    isValid = validateSignForm();
    if (isValid) {
      loginUser();
    }
  });

  function validateSignForm() {
    isValid = true;
    if (username.value.trim() === "") {
      usernameError.classList.remove("hidden");
      isValid = false;
    } else {
      usernameError.classList.add("hidden");
    }

    if (passwordInput.value.trim() === "") {
      passwordError.classList.remove("hidden");
      isValid = false;
    } else {
      passwordError.classList.add("hidden");
    }

    return isValid;
  }

  async function loginUser() {
    showLoader();
    try {
      const response = await fetch(
        "/api/user/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: username.value,
            pass: passwordInput.value,
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
        window.app.isLoggedIn = true;
        window.app.page = "add-transaction";
        loginErrorMsg.classList.add("hidden");
      } else {
        loginErrorMsg.classList.remove("hidden");
      }
    } catch (error) {
      console.error("Une erreur est survenu: ", error);
      loginErrorMsg.classList.remove("hidden"); 
    } finally {
      // 🔹 notifier l'app Vue
      hideLoader();
    }
  }

  function showLoader() {
    document.getElementById("page-loader").classList.remove("hidden");
  }

  function hideLoader() {
    document.getElementById("page-loader").classList.add("hidden");
  }
  hideLoader();
}
