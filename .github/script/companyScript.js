import {GETCompanyDetails} from './helperfunctions.js'

export class StockExchangeCompanyDetails {
    constructor(company){
        this.image = company.image; 
        this.name = company.companyName; 
        this.description = company.description; 
        this.website = company.website;
        this.currency = company.currency;
        this.price = company.price;
        this.changesPercentage = company.changesPercentage;
    }


    createSubpageLogo(){
        const companyLogoContainer = document.getElementById('companyLogo'); 
        const companyLogo = document.createElement('img'); 
        companyLogo.src = this.image; 

        companyLogoContainer.appendChild(companyLogo);

    }

    createSubpageHeader(){
        const companyNameContainer = document.getElementById('companyName');
        const companyName = document.createElement('div'); 
        companyName.className = 'h1 mt-3';
        companyName.innerText = this.name;

        companyNameContainer.appendChild(companyName); 

    }

    createSubpageStockPrice(){
        const companyStockPriceContainer = document.getElementById('companyStockPrice');

        const companyStockPrice = document.createElement('div'); 
        companyStockPrice.className = 'h5 mt-4 ms-2';
        companyStockPrice.innerText = this.price + " " + this.currency;


        const companyStockPricePercentageChange = document.createElement('div'); 
      

        if (this.changesPercentage>0) {
            companyStockPricePercentageChange.className = 'h5 mt-4 ms-2 text-success'; 
            companyStockPricePercentageChange.innerText = `(+${this.changesPercentage})`;
        } else {
            companyStockPricePercentageChange.className = 'h5 mt-4 ms-2 text-danger'; 
            companyStockPricePercentageChange.innerText = `(-${this.changesPercentage})`;
        }

    

        companyStockPriceContainer.appendChild(companyStockPrice);
        companyStockPriceContainer.appendChild(companyStockPricePercentageChange);

    }


    createSubpageCompanyDescription(){

        const companyDescriptionContainer = document.getElementById('companyDescriptionContainer');

        const companyDescription = document.createElement('div'); 
        companyDescription.className = 'col-6 mt-3';
        companyDescription.innerHTML = this.description;

        const companyWebsite = document.createElement('a'); 
        companyWebsite.className = 'company-website-link';
        companyWebsite.href = this.website;
        companyWebsite.innerHTML = "Find out more..."
       
        companyDescriptionContainer.appendChild(companyDescription);
        companyDescriptionContainer.appendChild(companyWebsite);
       

    }

     

}


const myKeysValues = window.location.search; 

const urlParams = new URLSearchParams(myKeysValues); 

const paramSymbol = urlParams.get('symbol'); 


GETCompanyDetails(`https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/company/profile/${paramSymbol}`).then((response) => {
    const companyDetails = new StockExchangeCompanyDetails(response);

    companyDetails.createSubpageLogo();
    companyDetails.createSubpageHeader();
    companyDetails.createSubpageStockPrice();
    companyDetails.createSubpageCompanyDescription();
});







GETCompanyStockpriceHistory(`https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/historical-price-full/${paramSymbol}?serietype=line`)

async function GETCompanyStockpriceHistory(url){

    // showStocksLoader();


    const dates = []; 
    const close = [];



    try{
        const response = await fetch (url); 
        const results = await response.json();

        const companyData = await results.historical;

        
        companyData.forEach((item) => {
            dates.push(item.date);
        }); 

        
        companyData.forEach((item) => {
            close.push(item.close);
        });  
        
        


    
    } catch (e) {
        console.log(e);
    }

    // hideStocksLoader();


    let myChart = document.getElementById('myChart').getContext('2d');
    
    let massPopChart = new Chart(myChart, {
    type: 'line', 
    data:{
        labels: dates,
        datasets:[{
            label: 'Stock Price History', 
            data: close, 
            fill: true,
            borderColor: 'rgb(75, 192, 192)',
            tension: 0.1, 
      
        }]
    }
});

}

    

function showStocksLoader() {
    const stockLoader = document.getElementById('stockprice-loader'); 
    stockLoader.id = 'stockprice-loader:active';
}

function hideStocksLoader() {
    const stockLoader = document.getElementById('stockprice-loader:active'); 
    stockLoader.id = 'stockprice-loader';
}




