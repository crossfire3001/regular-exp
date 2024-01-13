window.onload = function () {
  const fullNameInput = document.getElementById("fullname-input");
  const userNameInput = document.getElementById("username-input");
  const emailInput = document.getElementById("email-input");
  const passwordInput = document.getElementById("password-input");
  const repeatPasswordInput = document.getElementById(
      "repeat-password-input"
  );

  const checkBox = document.getElementById("checkbox");
  const registrationBtn = document.querySelector(".registration__btn");
  const modal = document.querySelector(".modal");

  const modalClose = modal.querySelector(".modal__btn");
  const registrationSign = document.querySelector('.registration__sign');

  const registrationTitle = document.querySelector(".registration__title");
  const fullName = document.querySelector(".fullname");
  const email = document.querySelector(".email");
  const repeatPassword = document.querySelector(".repeat-password");
  const registrationTerms = document.querySelector(".registration__terms");
  const registrationAction = document.querySelector(".registration__action");
  const signAction = document.querySelector(".sign__action");

  const baseInput = document.querySelectorAll('.base__input');
  const errorInput = document.querySelectorAll('.input-error');

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

  registrationBtn.addEventListener("click", (e) => {
    e.preventDefault();

    let inputFilled = false;

    const error = () => {
      baseInput.forEach(item => {
        item.style.borderBottom = '1px solid rgb(230, 0, 122)';
      });
      errorInput.forEach(item => {
        item.style.display = 'flex';
      });
    }

    // Проверка имени
    if (!fullNameInput.value.match(/^[A-Za-z\s]+$/)) {
      error();
      inputFilled = true;
    } else {
      fullNameInput.style.borderBottom = '1px solid green';
      errorInput[0].style.display = 'none';
    }

    // Проверка ника
    if (!userNameInput.value.match(/^[A-Za-z0-9_-]+$/)) {
      inputFilled = true;
    } else {
      fullNameInput.style.borderBottom = '1px solid green';
      errorInput[1].style.display = 'none';
    }

    // Проверка электронной почты
    if (typeof emailInput.value !== 'string' || !emailInput.value.includes('@')) {
      inputFilled = true;
    } else {
      fullNameInput.style.borderBottom = '1px solid green';
      errorInput[2].style.display = 'none';
    }

    // Проверка пароля
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[a-zA-Z\d!@#$%^&*]{8,}$/;
    if (typeof passwordInput.value !== 'string' || !passwordRegex.test(passwordInput.value)) {
      inputFilled = true;
    } else {
      fullNameInput.style.borderBottom = '1px solid green';
      errorInput[3].style.display = 'none';
    }

    // Проверка повторного ввода пароля
    if (passwordInput.value !== repeatPasswordInput.value) {
      inputFilled = true;
    } else {
      fullNameInput.style.borderBottom = '1px solid green';
      errorInput[4].style.display = 'none';
    }

    // Проверка соглашения с условиями
    if (!checkBox.checked) {
      inputFilled = true;
    } else {
      fullNameInput.style.borderBottom = '1px solid green';
      errorInput[5].style.display = 'none';
    }

    if (localStorage.getItem("clients")) {
      clients = JSON.parse(localStorage.getItem("clients"));
    }

    clients.push({
      userName: userNameInput.value,
      password: passwordInput.value,
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
        checkBox.checked = false;
        item.value = "";
      });
      modal.classList.remove("hidden");
    }
  });

  const logIn = () => {
    modal.classList.add("hidden");
    registrationTitle.innerText = "Log in to the system";
    fullName.remove();
    email.remove();
    repeatPassword.remove();
    registrationTerms.remove();
    registrationAction.remove();
    registrationSign.remove();
    signAction.classList.remove("hidden");

    signAction.addEventListener("click", (e) => {
      const signActionFilled = false;
      if (!userNameInput.value) {
        alert("Заполните заполните ник пользователя");
        return;
      }
      if (!passwordInput.value) {
        alert("Заполните пароль");
        return;
      }
      if (!signActionFilled) {
        alert("Добро пожаловать, " + userNameInput.value + "!");
        [userNameInput, passwordInput].forEach((item) => {
          item.value = "";
        });
      }
    });
  }

  modalClose.addEventListener('click', logIn);
  registrationSign.addEventListener('click', logIn);

};
