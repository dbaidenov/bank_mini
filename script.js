"use strict";

const account1 = {
  userName: "Arctic Monkeys",
  transactions: [500, 250, -300, 5000, -850, -110, -170, 1100],
  interest: 1.5,
  transactionsDates: [
    "2020-10-02T14:43:31.074Z",
    "2020-10-29T11:24:19.761Z",
    "2020-11-15T10:45:23.907Z",
    "2021-01-22T12:17:46.255Z",
    "2021-02-12T15:14:06.486Z",
    "2021-03-09T11:42:26.371Z",
    "2021-05-21T07:43:59.331Z",
    "2021-06-22T15:21:20.814Z",
  ],
  pin: 1111,
  currency: "USD",
  locale: "en-US",
};

const account2 = {
  userName: "Kairat Nurtas",
  transactions: [2000, 6400.32, -1350, -70, -210.9999, -2000, 5500, -30],
  interest: 1.3,
  pin: 2222,
  transactionsDates: [
    "2020-10-02T14:43:31.074Z",
    "2020-10-29T11:24:19.761Z",
    "2020-11-15T10:45:23.907Z",
    "2021-01-22T12:17:46.255Z",
    "2021-02-12T15:14:06.486Z",
    "2021-03-09T11:42:26.371Z",
    "2021-05-21T07:43:59.331Z",
    "2021-06-22T15:21:20.814Z",
  ],
  currency: "UAH",
  locale: "uk-UA",
};

const account3 = {
  userName: "Damir Baidenov",
  transactions: [900, -200, 280, 300, -200, 150, 1400, -400],
  interest: 0.8,
  pin: 1234,
  transactionsDates: [
    "2020-10-02T14:43:31.074Z",
    "2020-10-29T11:24:19.761Z",
    "2020-11-15T10:45:23.907Z",
    "2021-01-22T12:17:46.255Z",
    "2021-02-12T15:14:06.486Z",
    "2021-03-09T11:42:26.371Z",
    "2021-05-21T07:43:59.331Z",
    "2021-06-22T15:21:20.814Z",
  ],
  currency: "KZT",
  locale: "kk-KZ",
};

const account4 = {
  userName: "Jesse Rutherford",
  transactions: [530, 1300, 500, 40, 190],
  interest: 1,
  pin: 4444,
  transactionsDates: [
    "2020-10-02T14:43:31.074Z",
    "2020-10-29T11:24:19.761Z",
    "2020-11-15T10:45:23.907Z",
    "2021-01-22T12:17:46.255Z",
    "2021-02-12T15:14:06.486Z",
  ],
  currency: "EUR",
  locale: "fr-CA",
};

const account5 = {
  userName: "Shawn Mendes",
  transactions: [630, 800, 300, 50, 120],
  interest: 1.1,
  pin: 5555,
  transactionsDates: [
    "2020-10-02T14:43:31.074Z",
    "2020-10-29T11:24:19.761Z",
    "2020-11-15T10:45:23.907Z",
    "2021-01-22T12:17:46.255Z",
    "2021-02-12T15:14:06.486Z",
  ],
  currency: "USD",
  locale: "en-US",
};

const accounts = [account1, account2, account3, account4, account5];

const hidden = document.querySelector(".hidden");
const labelWelcome = document.querySelector(".welcome");
const labelDate = document.querySelector(".date");
const labelBalance = document.querySelector(".balance__value");
const labelSumIn = document.querySelector(".total__value--in");
const labelSumOut = document.querySelector(".total__value--out");
const labelSumInterest = document.querySelector(".total__value--interest");
const labelTimer = document.querySelector(".timer");

const containerApp = document.querySelector(".app");
const containerTransactions = document.querySelector(".transactions");

const btnLogin = document.querySelector(".login__btn");
const btnTransfer = document.querySelector(".form__btn--transfer");
const btnLoan = document.querySelector(".form__btn--loan");
const btnClose = document.querySelector(".form__btn--close");
const btnSort = document.querySelector(".btn--sort");

const inputLoginUsername = document.querySelector(".login__input--user");
const inputLoginPin = document.querySelector(".login__input--pin");
const inputTransferTo = document.querySelector(".form__input--to");
const inputTransferAmount = document.querySelector(".form__input--amount");
const inputLoanAmount = document.querySelector(".form__input--loan-amount");
const inputCloseNickName = document.querySelector(".form__input--user");
const inputClosePin = document.querySelector(".form__input--pin");

/* Махинации с датами */
const formatTransactionDate = function (date) {
  const options = {
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    day: "numeric",
    month: "long",
    year: "numeric",
  };
  const localeDate = new Intl.DateTimeFormat(
    currentUser.locale,
    options
  ).format(date);
  const getDaysBetween2dates = (date1, date2) =>
    Math.round(Math.abs(date2 - date1) / (1000 * 60 * 60 * 24));
  const daysPassed = getDaysBetween2dates(date, new Date());
  if (daysPassed === 0) return "сегодня";
  if (daysPassed === 1) return "вчера";
  if (daysPassed < 7) return `${daysPassed} дней назад`;
  else {
    return `${localeDate}`;
  }
};

/* Вывод транзакции для определенного аккаунта
------------------------------------------------------------------ 
*/

const convertNumber = function (acc, value) {
  const options = {
    style: "currency",
    currency: acc.currency,
  };
  return new Intl.NumberFormat(acc.locale, options).format(value);
};

const displayTransactions = function (acc, sort = false) {
  const transacs = sort
    ? acc.transactions.slice().sort((a, b) => a - b)
    : acc.transactions;
  containerTransactions.innerHTML = "";
  transacs.forEach(function (value, keys) {
    const date = new Date(acc.transactionsDates[keys]);
    const transactionDate = formatTransactionDate(date);
    const convertedValue = convertNumber(currentUser, value);
    const transactionType = value > 0 ? "deposit" : "withdrawal";
    const transactionRow = `
    <div class="transactions__row">
          <div class="transactions__type transactions__type--${transactionType}">
            ${keys + 1} ${transactionType}
          </div>
          <div class="transactions__date">${transactionDate}</div>  
          <div class="transactions__value">${convertedValue}</div>
        </div>
    `;
    containerTransactions.insertAdjacentHTML("beforeend", transactionRow);
  });
};

/* Добавление для каждого аккаунта свойства НИКНЕЙМ 
------------------------------------------------------------------ 
*/

const createNickNames = function (accs) {
  accs.forEach(function (element) {
    element.nickName = element.userName
      .toLowerCase()
      .split(" ")
      .map((value) => value[0])
      .join("");
  });
};

createNickNames(accounts);

/* Общий баланс аккаунта 
------------------------------------------------------------------ 
*/

const allBalance = function (acc) {
  const balance = acc.transactions.reduce((acc, value) => acc + value, 0);
  acc.balance = balance;
  labelBalance.textContent = convertNumber(currentUser, balance);
};

/* Получение, Вывод, Процент
------------------------------------------------------------------ 
*/

const operationsBalance = function (acc) {
  const transactions = acc.transactions
    .filter(function (value) {
      return value > 0;
    })
    .reduce(function (acc, value) {
      return acc + value;
    }, 0);
  labelSumIn.textContent = convertNumber(currentUser, transactions);
  const withdrawals = acc.transactions
    .filter((value) => value < 0)
    .reduce((acc, value) => acc + value, 0);
  labelSumOut.textContent = convertNumber(currentUser, withdrawals);
  const interest = acc.transactions
    .filter(function (value) {
      return value > 0;
    })
    .map((value) => (value * acc.interest) / 100)
    .filter((value) => value > 5)
    .reduce((acc, value) => acc + value, 0);
  labelSumInterest.textContent = convertNumber(currentUser, interest);
};

/* Приветствие
------------------------------------------------------------------ 
*/

const welcomeForCurrentUser = function (user) {
  labelWelcome.innerHTML = `Добро пожаловать, ${user.userName.slice(
    0,
    user.userName.indexOf(" ")
  )} [${user.nickName.toUpperCase()}]!`;
};

/* Апгрейд UI
------------------------------------------------------------------ 
*/

const updateUI = function (account) {
  displayTransactions(account);
  operationsBalance(account);
  welcomeForCurrentUser(account);
  allBalance(account);
};

/* создание переменной которая записывает аккаунт */
let currentUser, currentLogOutTimer;

//таймер выхода
const startLogoutTimer = function () {
  const logOutSessionTimer = function () {
    const minutes = String(Math.trunc(time / 60)).padStart(2, "0");
    const seconds = String(time % 60).padStart(2, "0");
    labelTimer.textContent = `${minutes}:${seconds}`;
    if (time === 0) {
      clearInterval(timerInterval); //после вызова clearIntrval значение timeInterval становится undefined
      containerApp.classList.add("hidden");
      labelWelcome.textContent = "Войдите в свой аккаунт";
      findTimer.style.display = "none";
    }
    time--;
  };
  let time = 300;
  logOutSessionTimer();
  const timerInterval = setInterval(logOutSessionTimer, 1000);
  return timerInterval;
};

/* Скролл кнопка
------------------------------------------------------------------ 
*/
const findTimer = document.createElement("div");
const scrollToTimer = function () {
  document.body.insertAdjacentElement("afterbegin", findTimer);
  findTimer.classList.add("find-timer");
  findTimer.textContent = "Показать таймер";
  findTimer.addEventListener("click", function () {
    labelTimer.scrollIntoView({ behavior: "smooth" });
  });
  findTimer.style.display = "none";
};
scrollToTimer();

/* Логирование
------------------------------------------------------------------ 
*/

btnLogin.addEventListener("click", function (e) {
  e.preventDefault();
  currentUser = accounts.find(
    (acc) => acc.nickName === inputLoginUsername.value
  );
  if (currentUser?.pin == +inputLoginPin.value) {
    containerApp.classList.remove("hidden");
    findTimer.style.display = "flex";
    const date = new Date();
    const options = {
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
      day: "numeric",
      month: "long",
      year: "numeric",
      weakday: "long",
    };
    labelDate.textContent = new Intl.DateTimeFormat(
      currentUser.locale,
      options
    ).format(date);
    inputLoginPin.value = "";
    inputLoginUsername.value = "";
    inputLoginPin.blur();
    updateUI(currentUser);
    if (currentLogOutTimer) {
      clearInterval(currentLogOutTimer);
    }
    currentLogOutTimer = startLogoutTimer();
  } else {
    inputLoginPin.value = "";
    inputLoginUsername.value = "";
    inputLoginUsername.focus();
    alert("Incorrect values");
  }
});

/* Трансфер
------------------------------------------------------------------ 
*/
btnTransfer.addEventListener("click", function (e) {
  e.preventDefault();
  const transferAmount = +inputTransferAmount.value;
  const recipientNickname = inputTransferTo.value;
  const recipientAccount = accounts.find(
    (account) => account.nickName === recipientNickname
  );
  if (recipientAccount) {
    if (transferAmount) {
      if (currentUser.nickName !== recipientAccount.nickName) {
        if (currentUser.balance > 0 && currentUser.balance >= transferAmount) {
          recipientAccount.transactions.push(transferAmount);
          recipientAccount.transactionsDates.push(new Date().toISOString());
          currentUser.transactions.push(-transferAmount);
          currentUser.transactionsDates.push(new Date().toISOString());
          updateUI(currentUser);
          inputTransferTo.value = "";
          inputTransferAmount.value = "";
          inputTransferAmount.blur();
          clearInterval(currentLogOutTimer);
          currentLogOutTimer = startLogoutTimer();
        } else {
          alert("недостаточно средств!!!");
          inputTransferAmount.value = "";
        }
      } else {
        alert("нельзя переводить деньги себе!!!");
        inputTransferTo.value = "";
        inputTransferAmount.value = "";
        inputTransferTo.focus();
      }
    } else {
      alert("введите сумму!!!");
      inputTransferAmount.focus();
    }
  } else {
    alert("такого пользователя не существует!!!");
    inputTransferTo.value = "";
    inputTransferAmount.value = "";
    inputTransferTo.focus();
  }
});

/* Закрытие счета
------------------------------------------------------------------ 
*/

btnClose.addEventListener("click", function (e) {
  e.preventDefault();
  console.log(accounts);
  if (
    currentUser.nickName === inputCloseNickName.value &&
    currentUser.pin === +inputClosePin.value
  ) {
    const confirmRemoveuser = confirm("Ты уверен?");
    if (confirmRemoveuser) {
      const currentAccountIndex = accounts.findIndex(
        (acc) => acc.nickName === currentUser.nickName
      );
      //так же можно через indexOf()
      // const currentAccountIndex1 = accounts.indexOf(
      //   accounts.find(acc => acc.nickName === currentUser.nickName)
      // );
      findTimer.style.display = "none";
      clearInterval(currentLogOutTimer);
      currentLogOutTimer = undefined;
      accounts.splice(currentAccountIndex, 1);
      inputCloseNickName.value = "";
      labelWelcome.textContent = "Войдите в свой аккаунт";
      inputClosePin.value = "";
      containerApp.classList.add("hidden");
    }
  } else {
    alert("Неверные данные или Нельзя удалить другого пользователя!!!");
    inputCloseNickName.value = "";
    inputClosePin.value = "";
    inputCloseNickName.focus();
  }
});

/* алерт при умпешном/неуспешном заиме */
const modalWindow = document.querySelector(".modal-window");
const overlay = document.querySelector(".overlay");
const btnCloseModalWindow = document.querySelector(".btn--close-modal-window");
const modalHeader = document.querySelector(".modal__header");

const openModalWindow = function () {
  modalWindow.classList.remove("hidden");
  overlay.classList.remove("hidden");
};

const closeModalWindow = function () {
  modalWindow.classList.add("hidden");
  overlay.classList.add("hidden");
};

btnCloseModalWindow.addEventListener("click", closeModalWindow);
overlay.addEventListener("click", closeModalWindow);

document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && !modalWindow.classList.contains("hidden")) {
    closeModalWindow();
  }
});

/* Займ */
btnLoan.addEventListener("click", function (e) {
  e.preventDefault();

  const loanAmount = Math.round(+inputLoanAmount.value);
  btnLoan.disabled = true;
  inputLoanAmount.disabled = true;
  setTimeout(() => {
    if (
      loanAmount > 0 &&
      currentUser.transactions.some((value) => value >= loanAmount * 0.1)
    ) {
      currentUser.transactions.push(loanAmount);
      currentUser.transactionsDates.push(new Date().toISOString());
      updateUI(currentUser);
      modalHeader.textContent = "Заим одобрен! Больше денег и счастья! 🎉";
      modalWindow.classList.remove("hidden");
      inputLoanAmount.value = "";
      inputLoanAmount.blur();
      inputLoanAmount.disabled = false;
      btnLoan.disabled = false;
      if (currentLogOutTimer) clearInterval(currentLogOutTimer);
      currentLogOutTimer = startLogoutTimer();
    } else {
      modalHeader.textContent = "Заим не ободрен(";
      modalWindow.classList.remove("hidden");
      btnLoan.disabled = false;
      if (currentLogOutTimer) clearInterval(currentLogOutTimer);
      currentLogOutTimer = startLogoutTimer();
      inputLoanAmount.value = "";
      inputLoanAmount.disabled = false;
    }
  }, 5000);
});

/* Сортировка */
let sorted = true;
btnSort.addEventListener("click", function () {
  displayTransactions(currentUser, sorted);
  sorted = !sorted;
});
