function searchMovie() {
  let domain = "https://www.omdbapi.com";
  let results = [];

  let movieTitle = document.querySelector(".movie-title-input").value;
  let query = `apikey=${app.apiKey}&s=${movieTitle}`;

  var xhttp = new XMLHttpRequest();

  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      let results = JSON.parse(xhttp.responseText).Search;

      let moviesRow = document.querySelector(".movies-row");
      moviesRow.innerHTML = "";

      results.map((result, key) => {
        let element = document.createElement("div");
        element.classList.add("col-md-3");
        element.innerHTML = `
        <div class="card">
        <a href="./movie.html?id=${result.imdbID}" alt="${result.Title}">
          <img src="${result.Poster || "./src/assets/movies.jpg"}"
          class="img-fluid rounded" alt="${result.Title}" />
        </a>
        </div>
        `;
        moviesRow.appendChild(element);
      });
    }
  };

  xhttp.open("GET", `${domain}?${query}`, true);
  xhttp.send();
}

function getDate() {
  let today = new Date();
  let dd = String(today.getDate()).padStart(2, "0");
  let mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
  let yyyy = today.getFullYear();

  today = `${mm}/${dd}/${yyyy}`;
  document.querySelector(".date-today").innerHTML = today;
}

function init() {
  getDate();
}

init();
