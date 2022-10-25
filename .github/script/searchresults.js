class SearchResults {

    renderSearchResults(array){
        array.forEach((item) => {
            this.GETCompanyResultsNew(item)
        })
    }


    async GETCompanyResultsNew(company){

        try {
            const response = await fetch (`https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/company/profile/${company.symbol}`)
            const result = await response.json(); 
    
            this.renderResults(result)
    
        } catch (err) {

            console.error(err)

        }

    }
    
    renderResults(companyDetails){
        const resultsContainer = document.getElementById('results-box'); 

        
        const resultDiv = document.createElement('li'); 
        resultDiv.classList = 'search-result';
    

        const resultLink = document.createElement('a'); 

        resultLink.href = `http://127.0.0.1:5500/.github/company.html?symbol=${companyDetails.symbol}`; 


        const companyPriceChange = companyDetails.profile.changes; 

        if (companyPriceChange >= 0) {
            resultLink.innerHTML = `<img src="${companyDetails.profile.image}" alt="company-logo" height="25">${companyDetails.profile.companyName}<span style="color:grey; font-size: 10px;">(${companyDetails.profile.exchangeShortName})</span><span style="color:green; font-size: 10px;">(${companyPriceChange})</span>`;
        } else {
            resultLink.innerHTML = `<img src="${companyDetails.profile.image}" alt="company-logo" height="25">${companyDetails.profile.companyName}<span style="color:grey; font-size: 10px;">(${companyDetails.profile.exchangeShortName})</span> <span style="color:red; font-size: 10px;">(${companyPriceChange})</span> `;
        }


        resultDiv.appendChild(resultLink);


        if (companyPriceChange >= 0) {
            resultLink.classList = "postive-price";
        } else {
            resultLink.classList = "negative-price";
        }


        
        resultsContainer.appendChild(resultDiv); 

        this.searchHighlighter();

    }

    searchHighlighter() {
        let searchResults = document.querySelectorAll('li')
    }

    
}

