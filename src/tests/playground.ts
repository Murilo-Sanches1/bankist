// ! PLAYGROUND
// + PLAYGROUND
// * PLAYGROUND
// . PLAYGROUND
// - PLAYGROUND

// const usdToBrl: number = 5.5;
// console.log(movements.map((val: number) => val * usdToBrl));

// const name: string = 'Murilo Sanches';
// console.log(createUsername({ name }));
// console.table(accounts);

// const deposits = movements.filter((val: number) => val > 0);
// const withdrawals = movements.filter((val: number) => val < 0);
// console.log(deposits);
// console.log(withdrawals);

// const balance = movements.reduce((acc: number, cur: number) => acc + cur, 0);
// console.log(balance);

// console.log(
// movements.reduce((acc: number, cur: number) => (acc > cur ? acc : cur), movements[0])
// );

// console.log(movements.find((val) => val < 0));

// const sarah = accounts.find((account) => account.owner === 'Sarah Smith');
// console.log(sarah);

// // + equality
// console.log(movements);
// console.log(movements.includes(-130));

// // + condition
// console.log(movements.some((value) => value > 0));
// console.log(movements.some((value) => value > 5000));

// + equality every
// console.log(movements.every((val) => val > 0));
// console.log(account4.movements.every((val) => val > 0));

// const chainedArray = [1, 2, 3, [4, 5, 6, [7, 8, 9]], 10, 11, 12, [13, 14, 15]];
// console.log(chainedArray);
// // + apenas um nível da corrente
// console.log(chainedArray.flat());
// console.log(chainedArray.flat(1));
// console.log(chainedArray.flat(2));

// console.log(movements.at(1));
// console.log(movements.at(-1));

// const allMovementsFromAllAccounts = accounts.map((account: Account) => account.movements);
// console.log(allMovementsFromAllAccounts);
// console.log(allMovementsFromAllAccounts.flat());
// const balanceFromAllAccounts = allMovementsFromAllAccounts
//   .flat()
//   .reduce((acc, val) => acc + val, 0);
// console.log(balanceFromAllAccounts);

// // + map + flat combinados, não da pra modificar a depth
// const balanceFromAllAccountsWithMapFlat = accounts
//   .flatMap((account: Account) => account.movements)
//   .reduce((acc, val) => acc + val, 0);
// console.log(balanceFromAllAccountsWithMapFlat);

// // + sort - string em ordem alfabética - MODIFICA O ARRAY
// console.log(['Murilo', 'Alice', 'Nicolly', 'Sanches'].sort());
// // + funciona com strings, se for números, a ordenação acontecerá por ordem crescente [0]
// console.log(movements.sort());

// // + return < 0 - A, B (manter ordem)
// // + return > 0 - B, A (mudar ordem)
// console.log(
//   movements.sort((a, b) => {
//     if (a > b) return 1;
//     if (a < b) return -1;
//     return 0;
//   })
// );
// console.log(
//   movements.sort((a, b) => {
//     if (a > b) return -1;
//     if (a < b) return 1;
//     return 0;
//   })
// );
// console.log('====================');
// console.log(movements.sort((a, b) => a - b));
// console.log(movements.sort((a, b) => b - a));

// console.log([1, 2, 3, 4, 5]);
// console.log(new Array([1, 2, 3, 4, 5]));
// const constructorArray = new Array(5);
// constructorArray.forEach((val) => val * 2);
// console.log(constructorArray);
// constructorArray.fill(5);
// console.log(constructorArray);
// constructorArray.fill(0);
// console.log(constructorArray);
// constructorArray.fill(1, 3);
// console.log(constructorArray);

// console.log(Array.from({ length: 7 }, (_, i) => i + 1));

// const hundredDices = Array.from({ length: 10 }, () => Math.random());
// console.log(hundredDices);

// console.log(Array.from('Murilo'));

// const movementsFromUI = Array.from(
//   document.querySelectorAll<HTMLDivElement>('.movements__value'),
//   (el: HTMLDivElement) => {
//     Number(el.textContent?.replace('€', ''));
//   }
// );
// console.log(movementsFromUI);

// let a = 10;
// console.log(a++); // + imcrementa 1 e retorna o valor antigo
// a = 10;
// console.log(++a); // + imcrementa 1 e retorna o valor atualizado

// const sumsS = accounts
//   .flatMap((account) => account.movements)
//   .reduce(
//     (sums, cur) => {
//       cur > 0 ? (sums.deposits += cur) : (sums.withdrawals += cur);
//       return sums;
//     },
//     { deposits: 0, withdrawals: 0 }
//   );
// console.log(sumsS);

// // + numbers - todos os números do javascript são internamente representados por floats
// // * representado em formato 64 - sempre armazenado em forma binária
// // * binary base = 0, 1
// // * base 10 = 0 - 9
// // * por isso ele não é usado para cálculos extremamente precisos e científicos
// console.log(23 === 23.0);
// console.log(0.1 + 0.2);
// console.log(0.1 + 0.2 === 0.3);
// console.log(+'20');
// console.log(Number.EPSILON);
// console.log(Number.MAX_SAFE_INTEGER);
// console.log(Number.MAX_VALUE);
// console.log(Number.MIN_SAFE_INTEGER);
// console.log(Number.MIN_VALUE);
// console.log(Number.NEGATIVE_INFINITY);
// console.log(Number.NaN);
// console.log(Number.POSITIVE_INFINITY);
// // + sempre específicar o radix com a base em que estamos usando no caso agora é base 10
// console.log(Number.parseInt('30px', 10));
// console.log(Number.parseInt('x9', 10));
// console.log(Number.parseFloat('             2.5rem          '));
// console.log(Number.isNaN(1));
// console.log(Number.isNaN(+'x1'));
// console.log(26 / 0);
// console.log(Number.isFinite(20));
// console.log(Number.isFinite('20'));
// console.log(Number.isFinite(+'20x'));
// console.log(Number.isFinite(1 / 0));
// console.log(Number.isInteger(1));
// console.log(Number.isInteger('1'));
// console.log(Number.isInteger(+'x'));
// console.log(Number.isInteger(1 / 0));

// console.log(Math.sqrt(4)); // + raiz quadrada
// console.log(4 ** (1 / 2)); // + raiz quadrada
// console.log(8 ** (1 / 3)); // + raiz cúbica

// console.log(Math.max(1, 2, 3, +'99', 5, 6));
// console.log(Math.min(1, 2, 3, +'99', 5, 6));
// console.log(Math.max(1, 2, 3, +'99px', 5, 6));

// // + calcular a área de um círculo por um valor do input do usuário
// console.log(Math.PI * Number.parseFloat('10px') ** 2);

// // + 0...1 => 0...(max - min) -> min...(max - min + min)
// const randomize = (rangeMin: number, rangeMax: number): number =>
//   Math.floor(Math.random() * (rangeMax - rangeMin) + 1) + rangeMin;
// console.log(randomize(50, 100));

// console.log(Math.round(5.4));
// console.log(Math.round(5.6));

// console.log(Math.ceil(5.4));
// console.log(Math.ceil(5.6));

// console.log(Math.floor(5.4));
// console.log(Math.floor(5.6));

// console.log(Math.trunc(-20.4));
// console.log(Math.floor(-20.4));

// console.log((1.9).toFixed(0));
// console.log((1.9).toFixed(1));
// console.log((1.9).toFixed(3));

// console.log(5 % 2); // + retorna o resto
// console.log(8 % 3); // + retorna o resto

// const isEven = (n: number) => n % 2 === 0;
// console.log(isEven(8));
// console.log(isEven(3));

// $labelBalance.addEventListener('click', () => {
//   Array.from(document.querySelectorAll<HTMLDivElement>('.movements__row'), (el, i) => {
//     if (i % 2 === 0) el.style.backgroundColor = 'green';
//   });
// });

// const diameter = 287_460_000_000; // + pode-se adicionar _ para separar os agrupamentos
// console.log(diameter);

// console.log(Number.MAX_SAFE_INTEGER);
// console.log(2 ** 53 - 1);

// console.log(new Date('December 24, 2016'));
// console.log(new Date('24, December, 2016'));

// console.log(new Date(2077, 10, 19, 15, 23, 5, 1000));
// console.log(new Date(2077, 10, 31));

// console.log(new Date(0));
// console.log(new Date(3 * 24 * 60 * 60 * 1000));

// const future = new Date(2024, 0, 2);
// console.log(future);
// console.log(future.getFullYear());
// console.log(future.getMonth());
// console.log(future.getDate()); // + o dia de fato
// console.log(future.getDay()); // + dia da semana
// console.log(future.toISOString());
// console.log(future.getTime()); // + em ms desde 1969 - Unix time
// console.log(new Date(future.getTime()));
// console.log(Date.now());
// console.log(new Date(Date.now()));

// console.log(daysPassed(new Date(2023, 3, 14), new Date(2023, 3, 24)));
// console.log(daysPassed(new Date(2023, 3, 14), new Date(2023, 3, 4)));

// const x = 1000000000;
// const o: Intl.NumberFormatOptions = {
//   style: 'unit',
//   unit: 'mile-per-hour',
// };
// console.log(new Intl.NumberFormat('en-US', o).format(x));
// console.log(new Intl.NumberFormat(navigator.language, o).format(x));

//   const ingredients = ['cebola', 'palmito'];

//   const pizzaTimer = setTimeout(
//     (ing1: string, ing2: string) => console.log(`Sua pizza com ${ing1} e ${ing2} está pronta`),
//     3000,
//     ...ingredients
//   );
//   if (ingredients.includes('palmito')) clearTimeout(pizzaTimer);
