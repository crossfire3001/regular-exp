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
      fullNameInput.nextElementSibling.style.display = 'flex';
      fullNameInput.classList.add('error');
      inputFilled = true;
    } else {
      fullNameInput.nextElementSibling.style.display = 'none';
      fullNameInput.classList.remove('error');
    }

    // Проверка ника
    if (!userNameInput.value.match(/^[A-Za-z0-9_-]+$/)) {
      userNameInput.nextElementSibling.style.display = 'flex';
      userNameInput.classList.add('error');
      inputFilled = true;
    } else {
      userNameInput.nextElementSibling.style.display = 'none';
      userNameInput.classList.remove('error');
    }

    // Проверка электронной почты
    if (emailInput.value !== '' || !emailInput.value.includes('@')) {
      emailInput.nextElementSibling.style.display = 'flex';
      emailInput.classList.add('error');
      inputFilled = true;
    } else {
      emailInput.nextElementSibling.style.display = 'none';
      emailInput.classList.remove('error');
    }

    // Проверка пароля
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[a-zA-Z\d!@#$%^&*]{8,}$/;
    if (passwordInput.value !== '' || !passwordRegex.test(passwordInput.value)) {
      passwordInput.nextElementSibling.style.display = 'flex';
      passwordInput.classList.add('error');
      inputFilled = true;
    } else {
      passwordInput.nextElementSibling.style.display = 'none';
      passwordInput.classList.remove('error');
    }

    // Проверка повторного ввода пароля
    if (passwordInput.value !== repeatPasswordInput.value || repeatPasswordInput.value === '') {
      repeatPasswordInput.nextElementSibling.style.display = 'flex';
      repeatPasswordInput.classList.add('error');
      inputFilled = true;
    } else {
      repeatPasswordInput.nextElementSibling.style.display = 'none';
      repeatPasswordInput.classList.remove('error');
    }

    // Проверка соглашения с условиями
    if (!checkBox.checked) {
      checkBox.nextElementSibling.style.display = 'flex';
      checkBox.classList.add('error');
      inputFilled = true;
    } else {
      checkBox.nextElementSibling.style.display = 'none';
      checkBox.classList.remove('error');
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

      let storedClients = JSON.parse(localStorage.getItem('clients'));

      if (userNameInput) {
        if (!userNameInput.value || userNameInput.value !== storedClients.userName) {
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
