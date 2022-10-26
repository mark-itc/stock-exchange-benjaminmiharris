// import { SearchResults} from "./searchresults.js";
// import { GETCompanyDetails } from "./helperfunctions.js";


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
        
      </form>
      
      <div id="results">
      <div class="container d-flex justify-content-center search-results">
        <div class="col-sm-10 results-box" id="results-box"></div>
      </div>

      <div class="container d-flex justify-content-center mt-5">
        <div class="spinner-border text-info" id="results-loader" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
      </div>
    </div>
    
      `

      this.addSearchEventListener();

    }


    addSearchEventListener(){

        const searchButton = document.getElementById('submit-button'); 


        searchButton.addEventListener('click', (e) => {
            e.preventDefault(); 
            this.clearlist()
            this.showLoader(); 
            const searchInput = document.getElementById('search-input').value;


            this.onSearchButtonHandler(searchInput);
        })


    }

    async onSearchButtonHandler(searchInput) {

      const results = await this.queryNasdaq(searchInput)
      this.onSearchCallback(results)
      this.hideLoader()

    }


    onSearch(onSearchCallback) {
      this.onSearchCallback = onSearchCallback; 
    }

    async queryNasdaq(query) {


        const url = `https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/search?query=${query}&limit=10&;exchange=NASDAQ`
        
        try {
    
            const response = await fetch(url); 
            const results = await response.json(); 


            return results
        
    
        } catch (e) {
            console.error(e)
        }
    
    };


    clearlist(){
      const resultsContainer = document.getElementById('results-box'); 
      resultsContainer.innerHTML = '';

    }

    showLoader() {
      const resultsLoader = document.getElementById('results-loader'); 
      resultsLoader.id = 'results-loader:active'
  }

    hideLoader() {
      const resultsLoader = document.getElementById('results-loader:active'); 
      resultsLoader.id = 'results-loader'
  }

    
     
}







