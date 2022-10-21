import {StockExchangeCompanyDetails} from './companyScript.js'; 

import {GETCompanyDetails} from './helperfunctions.js'; 



const resultsContainer = document.getElementById('results-box'); 



class SearchResults {
    constructor(searchResult){
        this.company = searchResult.name;  
        this.symbol = searchResult.symbol;
        this.exchangeShortName = searchResult.exchangeShortName;
    }
    
    renderResults(companyDetails){

        
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


// const searchInputField = document.getElementById('search-input');

// change to 'input' https://dev.to/am20dipi/how-to-build-a-simple-search-bar-in-javascript-4onf



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


window.onload = () => {
    const form = new SearchForm (document.getElementById("form"));
    const results = new SearchResults (document.getElementById('search-results'));

}


class SearchForm {
    constructor(item){
        this.container = item;

        this.convertToHTML(this.container);
    }

    convertToHTML(){
        const container = this.container;

        container.innerHTML = `<form
        class="container d-flex justify-content-center search-container col-5"
      >
        <div class="input-group input-group-lg">
          <div class="input-group-prepend">
            <span class="input-group-text nasdaq-logo"
              ><img
                src="./images /Event Thumbnails 400x421 @ 1200x1263 (2).png"
                width="46"
            /></span>
          </div>
          <input
            type="text"
            class="form-control"
            id="search-input"
            placeholder="Search here"
          />
    
          <div class="input-group-append">
            <button type="submit" class="submit-button" id="submit-button">
              <span class="input-group-text search"
                ><i class="fa-solid fa-magnifying-glass search-background"></i
              ></span>
            </button>
          </div>
        </div>
      </form>`
      


      this.addSearchEventListener();

    }


    addSearchEventListener(){

        const searchButton = document.getElementById('submit-button'); 

        searchButton.addEventListener('click', (e) => {
            e.preventDefault(); 
            // showLoader(); 
            this.onSearch();
        })


    }


    async onSearch() {

        const searchInput = document.getElementById('search-input');

        const url = `https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/search?query=${searchInput.value}&amp;limit=10&amp;exchange=NASDAQ`
        
        try {
    
            const response = await fetch(url); 
            const results = await response.json(); 

        
            results.forEach((item) => {
                const searchResult = new SearchResults (item);
                GETCompanyDetails(`https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/company/profile/${item.symbol}`).then((response) => {
                
                    searchResult.renderResults(response);    
                });
                
            });
        
            hideLoader();
    
        } catch (e) {
            console.error("Type1 Error", e)
        }
    
    
    }; 

}



