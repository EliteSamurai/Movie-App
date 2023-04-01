const submit = document.getElementById('submit')
const searchTitle = document.getElementById('search')
const moviesHtml = document.getElementById('movies')
const innerMovies = document.getElementById('start')
const error = document.getElementById('hidden')
let final = []
let watchListArr = []

window.listSearch = listSearch
function listSearch(){
    moviesHtml.innerHTML = ''

    fetch(`http://www.omdbapi.com/?apikey=3316351c&s=${searchTitle.value}`)
        .then(req => req.json())
        .then(data => {
            if(data.Response === 'False'){
                moviesHtml.style.display = 'none'
                error.style.display = 'flex'
            } else {
                error.style.display = 'none'
                moviesHtml.style.display = ''

                for (let movie of data.Search){
                    final.push(movie.imdbID)
                }

                for (let i = 0; i < final.length; i++){
                    fetch(`http://www.omdbapi.com/?apikey=3316351c&i=${final[i]}`)
                        .then(req => req.json())
                        .then(data =>  {
                            const movieData = {
                            Image: data.Poster,
                            Title: data.Title,
                            Rating: data.imdbRating,
                            Runtime: data.Runtime,
                            Genre: data.Genre,
                            Plot: data.Plot
                        }
                        watchListArr.push(movieData);
                        renderResults(movieData);
                            })
                     }
             }
        final = []
    })
        searchTitle.value = ''
 } 


function renderResults(arr){
    moviesHtml.innerHTML += `<section class="container">
                                        <img id="poster" src=${arr.Image}>

                                    <section class="mini-con">
                                        <div class="title">
                                        <h4 class="name">${arr.Title}</h4>
                                        <span><i class="fa-solid fa-star"></i>${arr.Rating}</span>
                                        </div>

                                    <div class="sec-row">
                                        <p>${arr.Runtime}</p>
                                        <p>${arr.Genre}</p>
                                        <span class="add">
                                        <i class="fa-solid fa-plus" onclick="addToWatchList(event)"></i>
                                        <p>Watchlist</p>
                                        </span>
                                    </div>

                                    <p class="plot">
                                    ${arr.Plot}
                                    </p>
                                   </section>
                                </section>` 
}

const localMovies = []
window.addToWatchList = addToWatchList
function addToWatchList(event) {
    const card = event.target.closest('.container');
    const icon = event.target.closest('.fa-plus')
    const title = card.querySelector('.name').textContent;

    // Get existing movies from local storage or create an empty array
    let localMovies = JSON.parse(localStorage.getItem('movies')) || [];

    // Find the movie to add from the watchListArr array
    const movieToAdd = watchListArr.find(movie => movie.Title === title);

    // Add the movie to the localMovies array if it exists
    if (movieToAdd) {
        localMovies.push(movieToAdd)
    }
   
    // Store the updated localMovies array in local storage
    localStorage.setItem('movies', JSON.stringify(localMovies))

    //change add icon on movie card
    icon.classList.remove('fa-plus');
    icon.classList.add('fa-check');
}

export { renderResults, addToWatchList, localMovies }









