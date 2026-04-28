// Global API Endpoint
const globalApiUrl = 'https://disease.sh/v3/covid-19/all';
// Country API Endpoint base
const countryApiUrl = 'https://disease.sh/v3/covid-19/countries/';

// Fetch Global Data on Load
async function getGlobalData() {
    try {
        const response = await fetch(globalApiUrl);
        const data = await response.json();
        
        // Format numbers with commas
        document.getElementById('global-cases').innerText = data.cases.toLocaleString();
        document.getElementById('global-deaths').innerText = data.deaths.toLocaleString();
        document.getElementById('global-recovered').innerText = data.recovered.toLocaleString();
    } catch (error) {
        console.error("Error fetching global data:", error);
        document.getElementById('global-cases').innerText = "Error";
    }
}

// Fetch Specific Country Data
async function getCountryData(countryName) {
    try {
        const response = await fetch(countryApiUrl + countryName);
        
        if (!response.ok) {
            alert("Country not found. Please check your spelling.");
            return;
        }

        const data = await response.json();

        // Update the UI
        document.getElementById('country-name').innerText = data.country;
        document.getElementById('country-cases').innerText = data.cases.toLocaleString();
        document.getElementById('country-deaths').innerText = data.deaths.toLocaleString();
        document.getElementById('country-recovered').innerText = data.recovered.toLocaleString();

        // Show the result div
        document.getElementById('country-result').classList.remove('hidden');

    } catch (error) {
        console.error("Error fetching country data:", error);
    }
}

// Event Listeners
document.getElementById('search-btn').addEventListener('click', () => {
    const countryInput = document.getElementById('country-input').value.trim();
    if (countryInput) {
        getCountryData(countryInput);
    } else {
        alert("Please enter a country name.");
    }
});

// Allow hitting "Enter" to search
document.getElementById('country-input').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        document.getElementById('search-btn').click();
    }
});

// Initialize the app by fetching global data
getGlobalData();