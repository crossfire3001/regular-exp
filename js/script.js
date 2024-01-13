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

  const error = () => {
    errorInput.forEach(item => {
      item.style.display = 'flex';
    });
  }

  registrationBtn.addEventListener("click", (e) => {
    e.preventDefault();

    let inputFilled = false;

    // Проверка имени
    if (!fullNameInput.value.match(/^[A-Za-z\s]+$/)) {
      error();
      inputFilled = true;
      fullNameInput.classList.add('error');
    } else {
      fullNameInput.classList.remove('error');
      errorInput[0].style.display = 'none';
    }

    // Проверка ника
    if (!userNameInput.value.match(/^[A-Za-z0-9_-]+$/)) {
      inputFilled = true;
      userNameInput.classList.add('error');
    } else {
      userNameInput.classList.remove('error');
      errorInput[1].style.display = 'none';
    }

    // Проверка электронной почты
    if (typeof emailInput.value !== 'string' || !emailInput.value.includes('@')) {
      inputFilled = true;
      emailInput.classList.add('error');
    } else {
      emailInput.classList.remove('error');
      errorInput[2].style.display = 'none';
    }

    // Проверка пароля
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[a-zA-Z\d!@#$%^&*]{8,}$/;
    if (typeof passwordInput.value !== 'string' || !passwordRegex.test(passwordInput.value)) {
      inputFilled = true;
      passwordInput.classList.add('error');
    } else {
      passwordInput.classList.remove('error');
      errorInput[3].style.display = 'none';
    }

    // Проверка повторного ввода пароля
    if (passwordInput.value !== repeatPasswordInput.value || repeatPasswordInput.value === '') {
      inputFilled = true;
      repeatPasswordInput.classList.add('error');
    } else {
      repeatPasswordInput.classList.remove('error');
      errorInput[4].style.display = 'none';
    }

    // Проверка соглашения с условиями
    if (!checkBox.checked) {
      inputFilled = true;
      checkBox.classList.add('error');
    } else {
      checkBox.classList.remove('error');
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
    signAction.classList.remove("hidden");

    signAction.addEventListener("click", (e) => {
      let signActionFilled = false;

      if (userNameInput) {
        if (!userNameInput.value) {
          signActionFilled = true;
          userNameInput.classList.add('error');
        } else {
          signActionFilled = false;
          userNameInput.classList.remove('error');
        }
      }

      if (passwordInput) {
        if (!passwordInput.value) {
          signActionFilled = true;
          passwordInput.classList.add('error');
        } else {
          signActionFilled = false;
          passwordInput.classList.remove('error');
        }
      }

      if (!signActionFilled) {
        console.log("Добро пожаловать, " + userNameInput.value + "!");
        [userNameInput, passwordInput].forEach((item) => {
          item.value = "";
        });
      }
    });

    registrationSign.addEventListener('click', () => {
      registrationSign.innerHTML = 'Registration';
      window.location.href = '/index.html';
    })
  }

  modalClose.addEventListener('click', logIn);
  registrationSign.addEventListener('click', logIn);

};
