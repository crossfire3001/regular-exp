window.onload = function () {
  const fullNameInput = document.getElementById("fullname-input");
  const userNameInput = document.getElementById("username-input");
  const emailInput = document.getElementById("email-input");
  const passwordInput = document.getElementById("password-input");
  const repeatPasswordInput = document.getElementById("repeat-password-input");

  const checkBox = document.getElementById("checkbox");
  const registrationBtn = document.querySelector(".registration__btn");
  const modal = document.querySelector(".modal");

  const modalClose = modal.querySelector(".modal__btn");
  const registrationSign = document.querySelector(".registration__sign");

  const registrationTitle = document.querySelector(".registration__title");
  const registrationTerms = document.querySelector(".registration__terms");
  const registrationAction = document.querySelector(".registration__action");
  const signAction = document.querySelector(".sign__action");

  const signBtn = document.querySelector(".sign__btn");
  const registrationText = document.querySelector(".registration__text");

  let clients = [];

  fullNameInput.onkeydown = (e) => {
    const letters = e.key;
    if (!isNaN(letters)) {
      e.preventDefault();
    }
  };

  userNameInput.onkeydown = (e) => {
    const dots = e.key;
    if (dots === "," || dots === ".") {
      e.preventDefault();
    }
  };

  checkBox.onchange = (e) => {
    const checked = e.target.checked;
    if (checked) {
      console.log("Согласен");
    } else {
      console.log("Не согласен");
    }
  };

  const registration = (e) => {
    e.preventDefault();

    let inputFilled = false;

    // Проверка имени
    if (!fullNameInput.value.match(/^[A-Za-z\s]+$/)) {
      fullNameInput.nextElementSibling.style.display = "flex";
      fullNameInput.classList.add("error");
      inputFilled = true;
    } else {
      fullNameInput.nextElementSibling.style.display = "none";
      fullNameInput.classList.remove("error");
    }

    // Проверка ника
    if (!userNameInput.value.match(/^[A-Za-z0-9_-]+$/)) {
      userNameInput.nextElementSibling.style.display = "flex";
      userNameInput.classList.add("error");
      inputFilled = true;
    } else {
      userNameInput.nextElementSibling.style.display = "none";
      userNameInput.classList.remove("error");
    }

    // Проверка электронной почты
    if (!emailInput.value.includes("@")) {
      emailInput.nextElementSibling.style.display = "flex";
      emailInput.classList.add("error");
      inputFilled = true;
    } else {
      emailInput.nextElementSibling.style.display = "none";
      emailInput.classList.remove("error");
    }

    // Проверка пароля
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[a-zA-Z\d!@#$%^&*]{8,}$/;
    if (!passwordRegex.test(passwordInput.value)) {
      passwordInput.nextElementSibling.style.display = "flex";
      passwordInput.classList.add("error");
      inputFilled = true;
    } else {
      passwordInput.nextElementSibling.style.display = "none";
      passwordInput.classList.remove("error");
    }

    // Проверка повторного ввода пароля
    if (
      passwordInput.value !== repeatPasswordInput.value ||
      repeatPasswordInput.value === ""
    ) {
      repeatPasswordInput.nextElementSibling.style.display = "flex";
      repeatPasswordInput.classList.add("error");
      inputFilled = true;
    } else {
      repeatPasswordInput.nextElementSibling.style.display = "none";
      repeatPasswordInput.classList.remove("error");
    }

    // Проверка соглашения с условиями
    if (!checkBox.checked) {
      checkBox.nextElementSibling.style.display = "flex";
      checkBox.classList.add("error");
      inputFilled = true;
    } else {
      checkBox.nextElementSibling.style.display = "none";
      checkBox.classList.remove("error");
    }

    let storageClients = localStorage.getItem("clients");

    if (storageClients) {
      clients = JSON.parse(storageClients);
    }

    clients.push({
      fullName: fullNameInput.value.trim() !== "" ? fullNameInput.value : null,
      userName: userNameInput.value.trim() !== "" ? userNameInput.value : null,
      password: passwordInput.value.trim() !== "" ? passwordInput.value : null,
    });
    localStorage.setItem("clients", JSON.stringify(clients));

    if (!inputFilled) {
      [
        fullNameInput,
        userNameInput,
        emailInput,
        passwordInput,
        repeatPasswordInput,
      ].forEach((item) => {
        item.value = "";
      });
      checkBox.checked = false;
      modal.classList.remove("hidden");
    }
  };

  registrationBtn.addEventListener("click", registration);

  const logIn = () => {
    registrationBtn.removeEventListener("click", registration);
    modal.classList.add("hidden");
    registrationTitle.innerText = "Log in to the system";
    fullNameInput.parentElement.remove();
    emailInput.parentElement.remove();
    repeatPasswordInput.parentElement.remove();
    registrationTerms.remove();
    registrationBtn.innerHTML = "Sign In";
    registrationSign.remove();

    const logInUser = (e) => {
      e.preventDefault();

      let signActionFilled = false;

      if (!userNameInput.value) {
        userNameInput.nextElementSibling.style.display = "flex";
        userNameInput.classList.add("error");
        signActionFilled = true;
      } else {
        userNameInput.nextElementSibling.style.display = "none";
        userNameInput.nextElementSibling.innerText =
          "Заполните ник пользователя";
        userNameInput.classList.remove("error");
        signActionFilled = false;

        let storedClients = JSON.parse(localStorage.getItem("clients"));
        let user = storedClients.find(
          (item) => item.userName === userNameInput.value
        );

        if (user) {
          if (!passwordInput.value) {
            passwordInput.nextElementSibling.style.display = "flex";
            passwordInput.classList.add("error");
            signActionFilled = true;
          } else {
            passwordInput.nextElementSibling.style.display = "none";
            passwordInput.classList.remove("error");
            signActionFilled = false;
          }
        } else {
          userNameInput.nextElementSibling.style.display = "flex";
          userNameInput.nextElementSibling.innerText =
            "Пользователь с таким ником не найден";
          userNameInput.classList.add("error");
          signActionFilled = true;
        }
      }

      if (!signActionFilled) {
        let storedClients = JSON.parse(localStorage.getItem("clients"));
        let user = storedClients.find(
          (item) => item.userName === userNameInput.value
        );
        registrationTitle.innerHTML = `Welcome, ${user.fullName}`;
        registrationText.remove();

        userNameInput.parentElement.remove();
        passwordInput.parentElement.remove();
        registrationBtn.innerHTML = "Exit";

        registrationBtn.removeEventListener("click", logInUser);
        registrationBtn.addEventListener("click", () => {
          location.reload();
        });
      }
    };

    registrationBtn.addEventListener("click", logInUser);
  };

  modalClose.addEventListener("click", logIn);
  registrationSign.addEventListener("click", logIn);
};
