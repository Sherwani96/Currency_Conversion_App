#! /usr/bin/env node

import inquirer from "inquirer";
import chalk from "chalk";
import chalkAnimation from "chalk-animation";
import { welcome } from "./welcome.js";

// welcome function
await welcome();

// Api link for currency exchange (If this api is not working it probably fulfilled 1500 api free request quota, you can replace the api link)
let apiLink = "https://v6.exchangerate-api.com/v6/52f480dd8a155c82d80610a6/latest/PKR";

// Api fetching function
async function api(params: any) {
    let fetchData = await fetch(params);
    let res = await fetchData.json();
    return res.conversion_rates;
}

// stored fetch data
let data = await api(apiLink);
let countries = Object.keys(data);

// selecting first currency
let firstCurrency = await inquirer.prompt([
    {
        name: "countryNames",
        type: "list",
        choices: countries,
        message: "Please Enter Currency you want to convert from: ",
    }
]);

// user input for first currency
let userMoney = await inquirer.prompt([
    {
        name: "userAmount",
        type: "input",
        message: `Please Enter Amount in ${chalk.green.bold(firstCurrency.countryNames)}: `,
    }
]);

// user input for second currency
let secondCurrency = await inquirer.prompt([
    {
        name: "countryNames",
        type: "list",
        choices: countries,
        message: "Please Enter Currency you want to convert from: ",
    }
]);

// conversion Api link
let conversion = `https://v6.exchangerate-api.com/v6/52f480dd8a155c82d80610a6/pair/${firstCurrency.countryNames}/${secondCurrency.countryNames}`;

// Api fetching function
async function apirate(params: any) {
    let conversionRates = await fetch(params);
    let res = await conversionRates.json();
    return res.conversion_rate;
};

// conversion rate
let rate = await apirate(conversion)
let convertedMoney = rate * userMoney.userAmount;
console.log(chalk.cyan.bold(`Your ${userMoney.userAmount} ${firstCurrency.countryNames} equals to ${convertedMoney} ${secondCurrency.countryNames}`));





