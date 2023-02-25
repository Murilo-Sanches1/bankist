const main = (): void => {
  type Account = {
    owner: string;
    username: string;
    movements: number[];
    interestRate: number;
    pin: number;
    balance: number;

    movementsDates: string[];
    currency: string;
    locale: string;
  };

  const HTMLFactory = <T>(selector: string): T => {
    return document.querySelector(selector)! as T;
  };

  const $labelWelcome: HTMLParagraphElement = HTMLFactory<HTMLParagraphElement>('.welcome');
  const $labelDate: HTMLSpanElement = HTMLFactory<HTMLSpanElement>('.date');
  const $labelBalance: HTMLParagraphElement = HTMLFactory<HTMLParagraphElement>('.balance__value');
  const $labelSumIn: HTMLParagraphElement =
    HTMLFactory<HTMLParagraphElement>('.summary__value--in');
  const $labelSumOut: HTMLParagraphElement =
    HTMLFactory<HTMLParagraphElement>('.summary__value--out');
  const $labelSumInterest: HTMLParagraphElement = HTMLFactory<HTMLParagraphElement>(
    '.summary__value--interest'
  );
  const $labelTimer: HTMLSpanElement = HTMLFactory<HTMLSpanElement>('.timer');

  const $containerApp: HTMLElement = HTMLFactory<HTMLElement>('.app');
  const $containerMovements: HTMLDivElement = HTMLFactory<HTMLDivElement>('.movements');

  const $btnLogin: HTMLButtonElement = HTMLFactory<HTMLButtonElement>('.login__btn');
  const $btnTransfer: HTMLButtonElement = HTMLFactory<HTMLButtonElement>('.form__btn--transfer');
  const $btnLoan: HTMLButtonElement = HTMLFactory<HTMLButtonElement>('.form__btn--loan');
  const $btnClose: HTMLButtonElement = HTMLFactory<HTMLButtonElement>('.form__btn--close');
  const $btnSort: HTMLButtonElement = HTMLFactory<HTMLButtonElement>('.btn--sort');

  const $inputLoginUsername: HTMLInputElement =
    HTMLFactory<HTMLInputElement>('.login__input--user');
  const $inputLoginPin: HTMLInputElement = HTMLFactory<HTMLInputElement>('.login__input--pin');
  const $inputTransferTo: HTMLInputElement = HTMLFactory<HTMLInputElement>('.form__input--to');
  const $inputTransferAmount: HTMLInputElement =
    HTMLFactory<HTMLInputElement>('.form__input--amount');
  const $inputLoanAmount: HTMLInputElement = HTMLFactory<HTMLInputElement>(
    '.form__input--loan-amount'
  );
  const $inputCloseUsername: HTMLInputElement = HTMLFactory<HTMLInputElement>('.form__input--user');
  const $inputClosePin: HTMLInputElement = HTMLFactory<HTMLInputElement>('.form__input--pin');

  const admin: Account = {
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

  const account1: Account = {
    owner: 'Pedro Garcia',
    movements: [-2500, 150, 800, 300],
    interestRate: 1.2, // %
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
    locale: 'pt-PT', // de-DE
  };

  const account2: Account = {
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

  const account3: Account = {
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

  const account4: Account = {
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

  const accounts: Account[] = [admin, account1, account2, account3, account4];

  const currencies: Map<string, string> = new Map([
    ['USD', 'United States dollar'],
    ['BRL', 'Brazilian Real'],
    ['EUR', 'Euro'],
    ['GBP', 'Pound sterling'],
  ]);

  const movements: number[] = [200, 450, -400, 3000, -650, -130, 70, 1300];

  const updateUI = (currentUser: Account): void => {
    displayMovements(currentUser);
    displayBalance(currentUser);
    displaySummary(currentUser);
  };

  const daysPassed = (date1: Date, date2: Date) =>
    Math.round(Math.abs((+date2 - +date1) / (1000 * 60 * 60 * 24)));

  const Internationalization = (value: string | number, locale: string, currency: string) =>
    new Intl.NumberFormat(locale, {
      style: 'currency',
      currency,
    }).format(+value);

  createUsername({ accounts });

  let currentUser: Account | undefined;
  let timer: number | undefined;

  const now: Date = new Date();
  // const day: string = `${now.getDate()}`.padStart(2, '0');
  // const month: string = `${now.getMonth() + 1}`.padStart(2, '0');
  // const year: number = now.getFullYear();
  // const hour: string = `${now.getHours()}`.padStart(2, '0');
  // const min: string = `${now.getMinutes()}`.padStart(2, '0');
  // $labelDate.textContent = `${day}/${month}/${year}, ${hour}:${min}`;
  console.log(navigator.language);
  const options: Intl.DateTimeFormatOptions = {
    hour: 'numeric',
    minute: 'numeric',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    weekday: 'long',
  };

  const startLogOutTimer = (): number => {
    let time: number = 60 * 5;
    const tick = (): void => {
      const min: string = (Math.trunc(time / 60) + '').padStart(2, '0');
      const sec: string = ((time % 60) + '').padStart(2, '0');

      $labelTimer.textContent = `${min}:${sec}`;

      if (time === 0) {
        clearInterval(timer);
        window.location.reload();
      }

      time--;
    };
    tick();
    const timer: number = setInterval(tick, 1000);
    return timer;
  };

  $btnLogin.addEventListener('click', (e: MouseEvent): void => {
    e.preventDefault();

    currentUser = accounts.find(
      (account: Account) => account.username === $inputLoginUsername.value
    );

    if (!currentUser) return alert('Usuário não encontrado');

    $labelDate.textContent = new Intl.DateTimeFormat(currentUser.locale, options).format(now);

    if (currentUser.pin !== +$inputLoginPin.value) {
      return alert('Senha incorreta');
    }

    $labelWelcome.textContent = `Bem-Vindo de volta ${currentUser.owner.split(' ')[0]}`;
    $inputLoginPin.value = $inputLoginUsername.value = '';
    $inputLoginPin.blur();
    if (timer) clearInterval(timer);
    timer = startLogOutTimer();
    $containerApp.style.opacity = '1';

    updateUI(currentUser);
  });

  $btnTransfer.addEventListener('click', (e: MouseEvent): void => {
    e.preventDefault();

    const amount: number = +$inputTransferAmount.value;
    const receiverAccount: Account | undefined = accounts.find(
      (account: Account) => account.username === $inputTransferTo.value
    );

    $inputTransferAmount.value = $inputTransferTo.value = '';

    if (
      amount > 0 &&
      receiverAccount &&
      currentUser &&
      currentUser.balance >= amount &&
      receiverAccount.username !== currentUser.username
    ) {
      const date: string = new Date().toISOString();
      currentUser.movements.push(-amount);
      receiverAccount.movements.push(amount);
      currentUser.movementsDates.push(date);
      receiverAccount.movementsDates.push(date);
      updateUI(currentUser);
      clearInterval(timer);
      timer = startLogOutTimer();
    }
  });

  $btnLoan.addEventListener('click', (e: MouseEvent) => {
    e.preventDefault();

    const amount: number = Math.floor(+$inputLoanAmount.value);

    if (amount > 0 && currentUser?.movements.some((val) => val >= amount * 0.1)) {
      setTimeout((): void => {
        currentUser!.movements.push(amount);
        currentUser!.movementsDates!.push(new Date().toISOString());
        updateUI(currentUser!);
        timer = startLogOutTimer();
      }, 5000);
    }

    $inputLoanAmount.value = '';
  });

  $btnClose.addEventListener('click', (e: MouseEvent) => {
    e.preventDefault();

    if (
      $inputCloseUsername.value === currentUser?.username &&
      +$inputClosePin.value === currentUser.pin
    ) {
      const index: number = accounts.findIndex(
        (account: Account) => account.username === currentUser?.username
      );
      accounts.splice(index, 1);
      $containerApp.style.opacity = '0';
    }

    $inputCloseUsername.value = $inputClosePin.value = '';
  });

  let sorted: boolean = false;
  $btnSort.addEventListener('click', (e: MouseEvent) => {
    e.preventDefault();
    displayMovements(currentUser!, !sorted);
    sorted = !sorted;
  });

  function displayMovements(account: Account, sort = false): void {
    $containerMovements.innerHTML = '';

    // + slice para criar uma cópia porque não queremos que o array original seja mudado pelo sort()
    const movementsSorted: number[] = sort
      ? account.movements.slice().sort((a: number, b: number) => a - b)
      : account.movements;

    movementsSorted.forEach((val: number, i: number) => {
      const type: 'deposit' | 'withdrawal' = val > 0 ? 'deposit' : 'withdrawal';
      const label: string = type === 'deposit' ? 'depósito' : 'saque';
      const formattedAmount = Internationalization(val, account.locale, account.currency);

      let date: string = '';
      const day = daysPassed(new Date(), new Date(account.movementsDates[i]));

      if (day === 0) date = 'Hoje';
      if (day === 1) date = 'Ontem';
      if (day <= 7 && day >= 2) date = `${day} dias atrás`;
      if (!date) {
        // account.movementsDates && (date = new Date(account.movementsDates[i]).toLocaleDateString());
        date = new Intl.DateTimeFormat(account.locale).format(new Date(account.movementsDates[i]));
      }

      // <div class="movements__value">${val.toFixed(2)} €</div>
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
  // displayMovements(movements);

  function displayBalance(account: Account): void {
    account.balance = account.movements.reduce((acc: number, cur: number) => acc + cur);
    // $labelBalance.textContent = `${account.balance.toFixed(2)} EUR`;
    $labelBalance.textContent = Internationalization(
      account.balance,
      account.locale!,
      account.currency!
    );
  }
  // displayBalance(account1.movements);

  function displaySummary({
    movements,
    interestRate,
  }: {
    movements: number[];
    interestRate: number;
  }): void {
    const incomes: number = movements
      .filter((val: number) => val > 0)
      .reduce((acc: number, cur: number) => acc + cur, 0);
    // $labelSumIn.textContent = `${incomes.toFixed(2)} €`;
    $labelSumIn.textContent = Internationalization(
      incomes,
      currentUser!.locale,
      currentUser!.currency
    );

    const out: number = movements
      .filter((val: number) => val < 0)
      .reduce((acc: number, cur: number) => acc + cur, 0);
    // $labelSumOut.textContent = `${Math.abs(out).toFixed()} €`;
    $labelSumOut.textContent = Internationalization(
      out,
      currentUser!.locale,
      currentUser!.currency
    );

    const interest: number = movements
      .filter((val: number) => val > 0)
      .map((deposit) => +((deposit * interestRate) / 100).toFixed(3))
      .filter((int) => int >= 1)
      .reduce((acc: number, int: number) => acc + int, 0);
    // $labelSumInterest.textContent = `${interest.toFixed(2)} €`;
    $labelSumInterest.textContent = Internationalization(
      interest,
      currentUser!.locale,
      currentUser!.currency
    );
  }
  // displaySummary(account1.movements);

  function createUsername({ name, accounts }: { name?: string; accounts?: Account[] }): string {
    const generate = (name: string): string =>
      name
        .toLowerCase()
        .split(' ')
        .map((word) => word[0])
        .join('');

    if (name) {
      return generate(name);
    }

    accounts?.forEach((acc: Account) => {
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
