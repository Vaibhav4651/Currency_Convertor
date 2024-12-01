const exchangeRateAPIKey = "66a63b2e9e50771023157026";
const exchangeRateBaseURL = "https://v6.exchangerate-api.com/v6/";
const countryListAPI = "https://restcountries.com/v3.1/all?fields=name,currencies,flag";

const amountInput = document.getElementById('amount');
const fromCurrency = document.getElementById('fromCurrency');
const toCurrency = document.getElementById('toCurrency');
const convertButton = document.getElementById('convertButton');
const resultMessage = document.getElementById('result');
const errorMessage = document.getElementById('error');

async function populateCurrencies() {
    try {
        const response = await fetch(countryListAPI);
        const countries = await response.json();

        countries.forEach(country => {
            if (country.currencies) {
                const currencyCode = Object.keys(country.currencies)[0];
                const currencyName = country.currencies[currencyCode].name;
                const option = `<option value="${currencyCode}">${currencyCode} - ${currencyName}</option>`;

                fromCurrency.innerHTML += option;
                toCurrency.innerHTML += option;
            }
        });
    } catch (error) {
        errorMessage.innerText = "Failed to load currency list.";
        errorMessage.style.display = "block";
    }
}
async function convertCurrency() {
    const amount = amountInput.value;
    const from = fromCurrency.value;
    const to = toCurrency.value;

    resultMessage.style.display = "none";
    errorMessage.style.display = "none";

    if (!amount || !from || !to) {
        errorMessage.innerText = "Please fill in all fields.";
        errorMessage.style.display = "block";
        return;
    }

    try {
        const response = await fetch(`${exchangeRateBaseURL}${exchangeRateAPIKey}/pair/${from}/${to}`);
        const data = await response.json();

        if (data.result === "success") {
            const conversionRate = data.conversion_rate;
            const convertedAmount = (amount * conversionRate).toFixed(2);
            resultMessage.innerText = `${amount} ${from} = ${convertedAmount} ${to}`;
            resultMessage.style.display = "block";
        } else {
            throw new Error(data['error-type'] || "Conversion failed");
        }
    } catch (error) {
        errorMessage.innerText = `Error: ${error.message}`;
        errorMessage.style.display = "block";
    }
}
convertButton.addEventListener('click', convertCurrency);
populateCurrencies();
