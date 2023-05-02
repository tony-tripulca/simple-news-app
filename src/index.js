function getLatest() {
  let domain = "https://newsapi.org";
  let endpoint = "/v2/top-headlines";
  let query = "country=ph";
  let results = [];

  var xhttp = new XMLHttpRequest();

  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      results = JSON.parse(xhttp.responseText).articles;

      let newsRow = document.querySelector(".news-row");
      results.map((result, key) => {
        newsRow.appendChild(document.createElement("div.col")).innerHTML = `
        <div class="card mb-3">
          <div class="row g-0">
            <div class="col-md-4">
              <img src="${ result.urlToImage || "./src/assets/default_news.jpg"
              }" class="img-fluid rounded-start" alt="..." />
            </div>
            <div class="col-md-8">
              <div class="card-body">
                <h5 class="card-title">${result.title}</h5>
                <p class="card-text">${result.description || ""}</p>
                <p class="card-text">
                  <small class="text-body-secondary"
                    >${result.publishedAt.substring(0, 10)} - ${ result.author
                    }</small
                  >
                </p>
                <button
                  type="button"
                  class="btn btn-secondary mb-3"
                  data-bs-toggle="modal"
                  data-bs-target="#news-${key}"
                >
                  Contents
                </button>
                <p><a href="${result.url}" target="_blank">View source</a></p>
              </div>
            </div>
          </div>
        </div>
        <div class="modal fade" id="news-${key}" tabindex="-1">
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h1 class="modal-title fs-5">${result.title}</h1>
                <button
                  type="button"
                  class="btn-close"
                  data-bs-dismiss="modal"
                ></button>
              </div>
              <div class="modal-body">
                <p>${result.content || "No Contents"}</p>
                <p><a href="${result.url}" target="_blank">Read more...</a></p>
              </div>
              <div class="modal-footer">
                <button
                  type="button"
                  class="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
        `;
      });
    }
  };

  xhttp.open("GET", `${domain}/${endpoint}?${query}`, true);
  xhttp.setRequestHeader("X-Api-Key", app.apiKey);
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
  getLatest();
}

init();
