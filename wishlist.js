import { renderResults, addToWatchList, localMovies } from './index.js'

const innerMovies = document.getElementById('start')
const mov = JSON.parse(localStorage.getItem('movies'))

function update(){
if(mov.length){
    innerMovies.style.display = 'none'

    for (let movie of mov){
        document.getElementById('movies').innerHTML += `<section class="container">
                                        <img id="poster" src=${movie.Image}>

                                    <section class="mini-con">
                                        <div class="title">
                                        <h4 class="name">${movie.Title}</h4>
                                        <span><i class="fa-solid fa-star"></i>${movie.Rating}</span>
                                        </div>

                                    <div class="sec-row">
                                        <p>${movie.Runtime}</p>
                                        <p>${movie.Genre}</p>
                                        <span class="add">
                                        <i onclick="remove(event)" class="fa-solid fa-xmark"></i>
                                        <p>Watchlist</p>
                                        </span>
                                    </div>

                                    <p class="plot">
                                    ${movie.Plot}
                                    </p>
                            </section>
                                </section>`
    }
} 
}
update()

window.remove = remove
function remove(event) {
    const card = event.target.closest('.container');
    const title = card.querySelector('.name').textContent;
    const del = mov.find (el => el.Title === title) 
    mov.splice(del, 1)

    localStorage.setItem('movies', JSON.stringify(mov))
    card.remove()
    }






