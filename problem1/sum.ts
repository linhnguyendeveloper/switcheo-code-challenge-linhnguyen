// First way: I use the formula to calculate the sum of continuous array of number from a to b: sum = (a + b) * (a - b + 1) / 2
const sum_to_n_a = (n: number) => {
    return (n + 1) * (n) / 2
};

// Second way: Using for loop
const sum_to_n_b = (n: number) => {
    let result = 0;
    for (let i = 1; i <= n; i++) {
        result += i;
    }
    return result;
};

// Third way: Recursion
const sum_to_n_c = (n: number) => {
    if (n === 1) {
        return 1;
    }
    return n + sum_to_n_c(n - 1);
};

// TEST
console.log(sum_to_n_a(10), sum_to_n_b(10), sum_to_n_c(10))