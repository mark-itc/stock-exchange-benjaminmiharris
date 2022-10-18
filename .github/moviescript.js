class Movie {
    constructor(movieObject) {
      this.apiKey = "87dd0709";
      this.title = movieObject.Title;
      this.poster = movieObject.Poster;
      this.id = movieObject.imdbID;
    }
  
    createMovieCard() {
      const cardDiv = document.createElement("div");
      cardDiv.classList.add("card");
      cardDiv.classList.add("custom-card");
  
      const cardImg = document.createElement("img");
      cardImg.setAttribute("src", this.poster);
      cardImg.classList.add("card-img-top");
  
      const bodyDiv = document.createElement("div");
      bodyDiv.classList.add("card-body");
  
      const h5Title = document.createElement("h5");
      h5Title.classList.add("card-title");
      h5Title.innerHTML = this.title;
  
      cardDiv.appendChild(cardImg);
      bodyDiv.appendChild(h5Title);
      cardDiv.appendChild(bodyDiv);
  
      cardDiv.addEventListener("click", () => {
        this.cardClicked();
      });
  
      return cardDiv;
    }
  
    async cardClicked() {
      console.log("cardClicked", this.title);
  
  
      if (!this.data) {
        console.log("Send request");
        this.data = await this.getMovieData();
      }
  
      const modal = document.getElementById("modal-container");
      modal.style.display = "block";
      console.log(this.data)
  
      document.getElementById('movieTitle').innerHTML    = this.data.Title;
      document.getElementById('releaseYear').innerText   = this.data.Released;
      document.getElementById('movieDirector').innerHTML = this.data.Director;
      document.getElementById('moviePlot').innerHTML     = this.data.Plot;
  
      const posterDiv = document.getElementById('img');
      posterDiv.style.backgroundImage = `url('${this.poster}')`;
      posterDiv.style.backgroundRepeat = `no-repeat`;
      // const cardImg = document.createElement("img");
      // cardImg.setAttribute("src", this.poster);
      // posterDiv.appendChild(cardImg)
  
  
      const ratingList = document.getElementById('ratings-list');
      this.data.Ratings.forEach(element => {
        const rating = document.createElement("h6");
        rating.innerHTML = element.Source + ": " + element.Value;
        ratingList.appendChild(rating);
      });
  
    }
  
    async getMovieData() {
      try {
        const url =
          "https://www.omdbapi.com/?apikey=" + this.apiKey + "&i=" + this.id;
  
        console.log("URL:", url);
  
        const response = await fetch(url);
        const result = await response.json();
  
        return result;
      } catch (error) {
        return false;
      }
    }
  }
  
  class MovieSearcher {
    constructor() {
      this.page = 1;
      this.apiKey = "87dd0709";
      this.searchType = "movie";
      this.searchQuery = "";
  
      const searchForm = document.getElementById("search-form");
      searchForm.addEventListener("submit", (e) => {
        e.preventDefault();
  
        this.runSearch();
      });
    }
  
    async getMovies() {
      try {
        const url =
          "https://www.omdbapi.com/?apikey=" +
          this.apiKey +
          "&type=" +
          this.searchType +
          "&s=" +
          encodeURIComponent(this.searchQuery) +
          "&page=" +
          this.page;
  
        console.log("URL:", url);
  
        const response = await fetch(url);
        const results = await response.json();
  
        return results.Search;
      } catch (error) {
        return [];
      }
    }
  
    async runSearch(e) {
      this.searchQuery = document.getElementById("search-input").value;
  
      const results = await this.getMovies();
  
      if(!results) return;
  
      const container = document.getElementById("movies-container");
  
      const movieObjects = [];
      results.forEach((item) => {
        const movie = new Movie(item);
        movieObjects.push(movie);
        const card = movie.createMovieCard();
  
        container.appendChild(card);
      });
    }
  }
  
  let movieSearcherInstance = null;
  window.onload = () => {
    movieSearcherInstance = new MovieSearcher();
    const closeButton = document.getElementById("closeButton")
    closeButton.addEventListener("click", (e) => {
      const modal = document.getElementById("modal-container")
      modal.style.display = "none"
    })
  };