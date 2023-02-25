"use strict";
const main = () => {
    const HTMLFactory = (selector) => {
        return document.querySelector(selector);
    };
    const $labelWelcome = HTMLFactory('.welcome');
    const $labelDate = HTMLFactory('.date');
    const $labelBalance = HTMLFactory('.balance__value');
    const $labelSumIn = HTMLFactory('.summary__value--in');
    const $labelSumOut = HTMLFactory('.summary__value--out');
    const $labelSumInterest = HTMLFactory('.summary__value--interest');
    const $labelTimer = HTMLFactory('.timer');
    const $containerApp = HTMLFactory('.app');
    const $containerMovements = HTMLFactory('.movements');
    const $btnLogin = HTMLFactory('.login__btn');
    const $btnTransfer = HTMLFactory('.form__btn--transfer');
    const $btnLoan = HTMLFactory('.form__btn--loan');
    const $btnClose = HTMLFactory('.form__btn--close');
    const $btnSort = HTMLFactory('.btn--sort');
    const $inputLoginUsername = HTMLFactory('.login__input--user');
    const $inputLoginPin = HTMLFactory('.login__input--pin');
    const $inputTransferTo = HTMLFactory('.form__input--to');
    const $inputTransferAmount = HTMLFactory('.form__input--amount');
    const $inputLoanAmount = HTMLFactory('.form__input--loan-amount');
    const $inputCloseUsername = HTMLFactory('.form__input--user');
    const $inputClosePin = HTMLFactory('.form__input--pin');
    const admin = {
        owner: 'Murilo Sanches',
        movements: [400, 400, -150, -200],
        interestRate: 2,
        pin: 9999,
        balance: 0,
        username: '',
        movementsDates: [
            new Date(2023, 0, 2).toISOString(),
            new Date(2023, 0, 3).toISOString(),
            new Date(2023, 1, 1).toISOString(),
            new Date(2023, 1, 20).toISOString(),
        ],
        currency: 'BRL',
        locale: 'pt-BR',
    };
    const account1 = {
        owner: 'Pedro Garcia',
        movements: [-2500, 150, 800, 300],
        interestRate: 1.2,
        pin: 1111,
        balance: 0,
        username: '',
        movementsDates: [
            new Date(2022, 11, 25).toISOString(),
            new Date(2023, 0, 3).toISOString(),
            new Date(2023, 0, 20).toISOString(),
            new Date(2023, 0, 21).toISOString(),
        ],
        currency: 'EUR',
        locale: 'pt-PT',
    };
    const account2 = {
        owner: 'Omar Ali',
        movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
        interestRate: 1.5,
        pin: 2222,
        balance: 0,
        username: '',
        movementsDates: [
            new Date(2023, 0, 25).toISOString(),
            new Date(2023, 0, 26).toISOString(),
            new Date(2023, 0, 26).toISOString(),
            new Date(2023, 0, 29).toISOString(),
            new Date(2023, 1, 5).toISOString(),
            new Date(2023, 1, 7).toISOString(),
            new Date(2023, 1, 22).toISOString(),
            new Date(2023, 1, 24).toISOString(),
        ],
        currency: 'USD',
        locale: 'ar-EG',
    };
    const account3 = {
        owner: 'Steven Thomas Williams',
        movements: [-200, -200, -460],
        interestRate: 0.7,
        pin: 3333,
        balance: 0,
        username: '',
        movementsDates: [
            new Date(2022, 11, 31).toISOString(),
            new Date(2023, 1, 20).toISOString(),
            new Date(2023, 1, 20).toISOString(),
        ],
        currency: 'GBP',
        locale: 'en-GB',
    };
    const account4 = {
        owner: 'Sarah Smith',
        movements: [430, 1000, 700, 50, 90],
        interestRate: 1,
        pin: 4444,
        balance: 0,
        username: '',
        movementsDates: [
            new Date(2023, 1, 1).toISOString(),
            new Date(2023, 1, 1).toISOString(),
            new Date(2023, 1, 1).toISOString(),
            new Date(2023, 1, 1).toISOString(),
            new Date(2023, 1, 1).toISOString(),
        ],
        currency: 'USD',
        locale: 'en-US',
    };
    const accounts = [admin, account1, account2, account3, account4];
    const currencies = new Map([
        ['USD', 'United States dollar'],
        ['BRL', 'Brazilian Real'],
        ['EUR', 'Euro'],
        ['GBP', 'Pound sterling'],
    ]);
    const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
    const updateUI = (currentUser) => {
        displayMovements(currentUser);
        displayBalance(currentUser);
        displaySummary(currentUser);
    };
    const daysPassed = (date1, date2) => Math.round(Math.abs((+date2 - +date1) / (1000 * 60 * 60 * 24)));
    const Internationalization = (value, locale, currency) => new Intl.NumberFormat(locale, {
        style: 'currency',
        currency,
    }).format(+value);
    createUsername({ accounts });
    let currentUser;
    let timer;
    const now = new Date();
    console.log(navigator.language);
    const options = {
        hour: 'numeric',
        minute: 'numeric',
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        weekday: 'long',
    };
    const startLogOutTimer = () => {
        let time = 60 * 5;
        const tick = () => {
            const min = (Math.trunc(time / 60) + '').padStart(2, '0');
            const sec = ((time % 60) + '').padStart(2, '0');
            $labelTimer.textContent = `${min}:${sec}`;
            if (time === 0) {
                clearInterval(timer);
                window.location.reload();
            }
            time--;
        };
        tick();
        const timer = setInterval(tick, 1000);
        return timer;
    };
    $btnLogin.addEventListener('click', (e) => {
        e.preventDefault();
        currentUser = accounts.find((account) => account.username === $inputLoginUsername.value);
        if (!currentUser)
            return alert('Usuário não encontrado');
        $labelDate.textContent = new Intl.DateTimeFormat(currentUser.locale, options).format(now);
        if (currentUser.pin !== +$inputLoginPin.value) {
            return alert('Senha incorreta');
        }
        $labelWelcome.textContent = `Bem-Vindo de volta ${currentUser.owner.split(' ')[0]}`;
        $inputLoginPin.value = $inputLoginUsername.value = '';
        $inputLoginPin.blur();
        if (timer)
            clearInterval(timer);
        timer = startLogOutTimer();
        $containerApp.style.opacity = '1';
        updateUI(currentUser);
    });
    $btnTransfer.addEventListener('click', (e) => {
        e.preventDefault();
        const amount = +$inputTransferAmount.value;
        const receiverAccount = accounts.find((account) => account.username === $inputTransferTo.value);
        $inputTransferAmount.value = $inputTransferTo.value = '';
        if (amount > 0 &&
            receiverAccount &&
            currentUser &&
            currentUser.balance >= amount &&
            receiverAccount.username !== currentUser.username) {
            const date = new Date().toISOString();
            currentUser.movements.push(-amount);
            receiverAccount.movements.push(amount);
            currentUser.movementsDates.push(date);
            receiverAccount.movementsDates.push(date);
            updateUI(currentUser);
            clearInterval(timer);
            timer = startLogOutTimer();
        }
    });
    $btnLoan.addEventListener('click', (e) => {
        e.preventDefault();
        const amount = Math.floor(+$inputLoanAmount.value);
        if (amount > 0 && (currentUser === null || currentUser === void 0 ? void 0 : currentUser.movements.some((val) => val >= amount * 0.1))) {
            setTimeout(() => {
                currentUser.movements.push(amount);
                currentUser.movementsDates.push(new Date().toISOString());
                updateUI(currentUser);
                timer = startLogOutTimer();
            }, 5000);
        }
        $inputLoanAmount.value = '';
    });
    $btnClose.addEventListener('click', (e) => {
        e.preventDefault();
        if ($inputCloseUsername.value === (currentUser === null || currentUser === void 0 ? void 0 : currentUser.username) &&
            +$inputClosePin.value === currentUser.pin) {
            const index = accounts.findIndex((account) => account.username === (currentUser === null || currentUser === void 0 ? void 0 : currentUser.username));
            accounts.splice(index, 1);
            $containerApp.style.opacity = '0';
        }
        $inputCloseUsername.value = $inputClosePin.value = '';
    });
    let sorted = false;
    $btnSort.addEventListener('click', (e) => {
        e.preventDefault();
        displayMovements(currentUser, !sorted);
        sorted = !sorted;
    });
    function displayMovements(account, sort = false) {
        $containerMovements.innerHTML = '';
        const movementsSorted = sort
            ? account.movements.slice().sort((a, b) => a - b)
            : account.movements;
        movementsSorted.forEach((val, i) => {
            const type = val > 0 ? 'deposit' : 'withdrawal';
            const label = type === 'deposit' ? 'depósito' : 'saque';
            const formattedAmount = Internationalization(val, account.locale, account.currency);
            let date = '';
            const day = daysPassed(new Date(), new Date(account.movementsDates[i]));
            if (day === 0)
                date = 'Hoje';
            if (day === 1)
                date = 'Ontem';
            if (day <= 7 && day >= 2)
                date = `${day} dias atrás`;
            if (!date) {
                date = new Intl.DateTimeFormat(account.locale).format(new Date(account.movementsDates[i]));
            }
            const html = `
        <div class="movements__row">
            <div class="movements__type movements__type--${type}">${i + 1}º ${label}</div>
            <div class="movements__date">${date}</div>
            <div class="movements__date"></div>
            <div class="movements__value">${formattedAmount}</div>
        </div>
        `;
            $containerMovements.insertAdjacentHTML('afterbegin', html);
        });
    }
    function displayBalance(account) {
        account.balance = account.movements.reduce((acc, cur) => acc + cur);
        $labelBalance.textContent = Internationalization(account.balance, account.locale, account.currency);
    }
    function displaySummary({ movements, interestRate, }) {
        const incomes = movements
            .filter((val) => val > 0)
            .reduce((acc, cur) => acc + cur, 0);
        $labelSumIn.textContent = Internationalization(incomes, currentUser.locale, currentUser.currency);
        const out = movements
            .filter((val) => val < 0)
            .reduce((acc, cur) => acc + cur, 0);
        $labelSumOut.textContent = Internationalization(out, currentUser.locale, currentUser.currency);
        const interest = movements
            .filter((val) => val > 0)
            .map((deposit) => +((deposit * interestRate) / 100).toFixed(3))
            .filter((int) => int >= 1)
            .reduce((acc, int) => acc + int, 0);
        $labelSumInterest.textContent = Internationalization(interest, currentUser.locale, currentUser.currency);
    }
    function createUsername({ name, accounts }) {
        const generate = (name) => name
            .toLowerCase()
            .split(' ')
            .map((word) => word[0])
            .join('');
        if (name) {
            return generate(name);
        }
        accounts === null || accounts === void 0 ? void 0 : accounts.forEach((acc) => {
            acc.username = generate(acc.owner);
        });
        return '';
    }
    setInterval(() => {
        const now = new Date();
        const hr = now.getHours();
        const min = now.getMinutes();
        const sec = now.getSeconds();
        console.log(`${hr}/${min}/${sec}`);
    }, 1000);
};
main();
