import {StockExchangeCompanyDetails} from './companyScript.js'; 

import {GETCompanyDetails} from './helperfunctions.js'; 




const searchButton = document.getElementById('submit-button'); 
const searchInput = document.getElementById('search-input');
const resultsContainer = document.getElementById('results-box'); 



class StockExchangeCompaniesSearchResult {
    constructor(searchResult){
        this.company = searchResult.name;  
        this.symbol = searchResult.symbol;
        this.exchangeShortName = searchResult.exchangeShortName;
    }
    
    createResult(companyDetails){

        
        const resultDiv = document.createElement('li'); 
        resultDiv.classList = 'search-result';

        const resultLink = document.createElement('a'); 

        resultLink.href = `http://127.0.0.1:5500/.github/company.html?symbol=${this.symbol}`; 


        const companyPriceChange = companyDetails.changes; 

        if (companyPriceChange >= 0) {
            resultLink.innerHTML = `<img src="${companyDetails.image}" alt="company-logo" height="25">${this.company}<span style="color:grey; font-size: 10px;">(${this.exchangeShortName})</span><span style="color:green; font-size: 10px;">(${companyPriceChange})</span>`;
        } else {
            resultLink.innerHTML = `<img src="${companyDetails.image}" alt="company-logo" height="25">${this.company}<span style="color:grey; font-size: 10px;">(${this.exchangeShortName})</span> <span style="color:red; font-size: 10px;">(${companyPriceChange})</span> `;
        }


    

        resultDiv.appendChild(resultLink);


        if (companyPriceChange >= 0) {
            resultLink.classList = "postive-price";
        } else {
            resultLink.classList = "negative-price";
        }

        
        return resultsContainer.appendChild(resultDiv)
    }

    
}


searchButton.addEventListener('click', async (e) => {
    e.preventDefault(); 
    clearPreviousResults();
    showLoader();

    const url = `https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/search?query=${searchInput.value}&amp;limit=10&amp;exchange=NASDAQ`

    try {

        const response = await fetch(url); 
        const results = await response.json(); 

    
    
        results.forEach((item) => {
            const searchResult = new StockExchangeCompaniesSearchResult(item);
            GETCompanyDetails(`https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/company/profile/${item.symbol}`).then((response) => {
            
                searchResult.createResult(response);    
            });
            
        });
    
        hideLoader();

    } catch (e) {
        console.error("Type1 Error", e)
    }


}); 


function clearPreviousResults(){
    resultsContainer.innerHTML = ''; 
}


function showLoader() {
    const resultsLoader = document.getElementById('results-loader'); 
    resultsLoader.id = 'results-loader:active'
}

function hideLoader() {
    const resultsLoader = document.getElementById('results-loader:active'); 
    resultsLoader.id = 'results-loader'
}


