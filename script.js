
/*Hide Navbar on Scroll Down from W3Schools*/

var prevScrollpos = window.pageYOffset;
window.onscroll = function () {
    var currentScrollPos = window.pageYOffset;
    if (prevScrollpos > currentScrollPos) {
        document.getElementById("navbar").style.top = "0";
    } else {
        document.getElementById("navbar").style.top = "-90px";
    }
    prevScrollpos = currentScrollPos;
}


const search = document.querySelector(".search");
const searchButton = document.querySelector(".btn");
const input = document.querySelector(".input");


searchButton.addEventListener("click", () => {
    search.classList.toggle("active");
    input.focus();


});



const main = document.getElementById("main");
const form = document.getElementById("form");
const overview = document.getElementById("overview");
const menuTop = document.getElementById("menuTop");
const nextButton = document.getElementById("next");

const API_URL = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=3fd2be6f0c70a2a598f084ddfb75487c&page=1'
const IMG_PATH = 'https://image.tmdb.org/t/p/w1280';
const SEARCH_API = 'https://api.themoviedb.org/3/search/movie?api_key=3fd2be6f0c70a2a598f084ddfb75487c&query="';


getMovies(API_URL);


async function getMovies(url) {
    const res = await fetch(url);
    console.log(res);
    const data = await res.json();

    showMovies(data.results);
}

function showMovies(movies) {



    main.innerHTML = "";

    movies.forEach((movie) => {


        const movieEL = document.createElement("div");
        movieEL.classList.add("movie");
        movieEL.addEventListener("mouseenter", () => movieEL.classList.add("active"));
        movieEL.addEventListener("mouseleave", () => movieEL.classList.remove("active"));


        if (movie.poster_path == null) {
            movieEL.classList.add("noImage");
        }

        movieEL.innerHTML = `
          
            <img src="${IMG_PATH + movie.poster_path}" alt="${movie.title}" onerror="this.src='noImage.jpg'">
            <div class="title">
                <h3>${movie.title}</h3>
            </div>
            <span class="released">Released: ${movie.release_date}</span>
            <span class="rating"><i class="fas fa-star"></i>${movie.vote_average}/10</span>
            <div class="overview id="overview">
                <h3>Overview:</h3>
                <p>${movie.overview}</p>
            </div>`;


        main.appendChild(movieEL);

        movieEL.addEventListener("click", () => {
            movieEL.classList.toggle("showOverview");
        });


    });



}

let currentPage = 1;
nextButton.addEventListener("click", () => {
    currentPage++;
    console.log(currentPage);
})




form.addEventListener("submit", (e) => {
    e.preventDefault();

    const searchedName = input.value;

    if (searchedName && searchedName != "") {
        getMovies(SEARCH_API + searchedName);
        input.value = "";
    } else {
        window.location.reload();
    }
});








