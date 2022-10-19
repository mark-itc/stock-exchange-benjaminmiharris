
class CompanySearcher{
    constructor(){

       this.searchQuery = ''; 

       const searchButton = document.getElementById('submit-button'); 
       searchButton.addEventListener("click",this.runSearch)

    }

    

    async getCompanies(){

       try {
           const response = await fetch(`https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/search?query=${this.searchQuery}&amp;limit=10&amp;exchange=NASDAQ`); 

           
           
           console.log(response)


       } catch (e){
           console.log(e)
       }
}


async runSearch(){
    this.searchQuery = document.getElementById('search-input').value;

    const results = await this.getCompanies(); 

    console.log(results)

}

}






let companySearcherInstance = null;

 window.onload = () => {
    companySearcherInstance = new CompanySearcher();
    console.log(companySearcherInstance)
 }