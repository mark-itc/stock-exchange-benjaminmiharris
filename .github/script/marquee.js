class MarqueeItem {
    constructor(data){
        this.companySymbol = data.symbol;
        this.companyStockPrice = data.price;
    }

    createMarqueeItemInDOM(){

        const marquee = document.getElementById('marquee-container');


        const marqueText = document.createElement('div'); 
        marqueText.className = 'marquee-results';
        
        marqueText.innerHTML = `${this.companySymbol} <span style="color:green;"> $${this.companyStockPrice}</span>`;

        marquee.appendChild(marqueText);
        
    }
}


const marqueeData = await GETMarqueeResultsNew("https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/stock-screener?exchange=NASDAQ&limit=${100}"); 

marqueeData.forEach((item) => {
    const newTester = new MarqueeItem(item);
    newTester.createMarqueeItemInDOM();
});


async function GETMarqueeResultsNew(url){

    try{
        const response = await fetch (url); 
        const results = await response.json();

        return results;

    } catch (e) {
        console.log(e);
    }
}