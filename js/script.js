window.onload = function () {
  const fullNameInput = document.getElementById("fullname-input");
  const userNameInput = document.getElementById("username-input");
  const checkBox = document.getElementById("checkbox");
  const registrationBtn = document.querySelector(".registration__btn");
  const modal = document.querySelector(".modal");
  const modalClose = modal.querySelector(".modal__btn");
  const passwordInput = document.getElementById("password-input");
  const baseInput = document.querySelectorAll('.base__input');
  const errorInput = document.querySelectorAll('.input-error');

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
    const emailInput = document.getElementById("email-input");
    const passwordInput = document.getElementById("password-input");
    const repeatPasswordInput = document.getElementById(
      "repeat-password-input"
    );

    let inputFilled = false;

    const errors = () => {
      errorInput.forEach(item => {
        item.style.display = 'flex';
      })
      baseInput.forEach(item => {
        item.style.borderBottom = '1px solid rgb(230, 0, 122)';
      });
    }

    // Проверка имени
    if (!fullNameInput.value.match(/^[A-Za-z\s]+$/)) {
      errors();
      inputFilled = true;
    } else {
      fullNameInput.style.borderBottom = '1px solid green';
      
    }

    // Проверка ника
    if (!userNameInput.value.match(/^[A-Za-z0-9_-]+$/)) {
        inputFilled = true;
    }

    // Проверка электронной почты
    if (typeof emailInput.value !== 'string' || !emailInput.value.includes('@')) {
        inputFilled = true;
    }

    // Проверка пароля
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[a-zA-Z\d!@#$%^&*]{8,}$/;
    if (typeof passwordInput.value !== 'string' || !passwordRegex.test(passwordInput.value)) {
        inputFilled = true;
    }

    // Проверка повторного ввода пароля
    if (passwordInput.value !== repeatPasswordInput.value) {
        inputFilled = true;
    }

    // Проверка соглашения с условиями
    if (!checkBox.checked) {
        inputFilled = true;
    }

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
        /* if (!baseInput) {
          item.style.borderBottom = '1px solid rgb(230, 0, 122)';
        } else {
          item.style.borderBottom = '1px solid green';
        }*/
      });
      modal.classList.remove("hidden");
    }
  });

  modalClose.addEventListener("click", (e) => {
    const registrationTitle = document.querySelector(".registration__title");
    const fullName = document.querySelector(".fullname");
    const email = document.querySelector(".email");
    const repeatPassword = document.querySelector(".repeat-password");
    const registrationTerms = document.querySelector(".registration__terms");
    const registrationAction = document.querySelector(".registration__action");
    const registrationSign = document.querySelector(".registration__sign");
    const signAction = document.querySelector(".sign__action");

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
  });
};
