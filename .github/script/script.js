class StockExchangeCompaniesSearchResult {
    constructor(searchResult){
        this.company = searchResult.name;  
        this.symbol = searchResult.symbol;
    }
    
    createResult(){
        const resultDiv = document.createElement('li'); 
        resultDiv.classList = 'search-result';


        const resultLink = document.createElement('a'); 

        resultLink.href = `/company.html?symbol=${this.symbol}`; 

        resultLink.innerHTML = `${this.company} (${this.symbol})`; 


        resultDiv.appendChild(resultLink)

        
        return resultsContainer.appendChild(resultDiv)
    }
    
}


async function getStockExchangeSearch (url){
    try {

        const response = await fetch(url); 
        const results = await response.json(); 
    
    
        results.forEach((item) => {
            const searchResult = new StockExchangeCompaniesSearchResult(item); 
            searchResult.createResult(); 
        });
    
        hideLoader();

    } catch (e) {
        console.error(e)
    }


}







const searchButton = document.getElementById('submit-button'); 
const searchInput = document.getElementById('search-input');
const resultsContainer = document.getElementById('results-box'); 

searchButton.addEventListener('click', stockExchangeResults); 



function stockExchangeResults(){

    clearPreviousResults();

    showLoader();


    getStockExchangeSearch(`https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/search?query=${searchInput.value}&amp;limit=10&amp;exchange=NASDAQ`);

    
}


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




