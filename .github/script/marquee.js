class Marquee {    

    constructor(param){
        this.container = param;
    }

    async load(){

        try {
            const response = await fetch('https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/stock-screener?exchange=NASDAQ&limit=${100}')

        const marquee = this.container;

        const results = await response.json(); 

        results.forEach((item) => {
            const marqueText = document.createElement('div'); 
        marqueText.className = 'marquee-results';
        
        marqueText.innerHTML = `${item.symbol} <span style="color:green;"> $${item.price}</span>`;

        marquee.appendChild(marqueText);
        })

        } catch (error) {
            console.log(error)
            
        }
      
        
    }
   
}
