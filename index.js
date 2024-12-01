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
