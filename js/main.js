

$(document).ready(() => {
   $('#searchForm').on('submit', (e) => {
     let searchText =  $('#searchText').val();
     getShows(searchText);
       e.preventDefault();
   });
});

function getShows(searchText) {
    axios.get("https://api.themoviedb.org/3/search/tv?api_key=84e5f60bf1e80417245508379f78d7a0&language=en-US&page=1&query=" + searchText)
    .then((res) => {
        console.log(res);
        let shows = res.data.results;
       let output = '';
       $.each(shows, (index, show) => {
        output += `
        <div class="col-md-3">
        <div class="well text-center">
        <img src="https://image.tmdb.org/t/p/w500${show.poster_path}">
       <h5>${show.original_name}</h5>
      <a onClick="showSelected('${show.id}')" class=" btn btn-primary" href="#">Show Details</a>
        </div>
        </div>
        `;
        })
        $('#shows').html(output);
    })
    .catch((err) => {
        console.log(err);
    })
}

function showSelected(id){
    sessionStorage.setItem('showId', id);
    window.location = 'show.html';
    return false;
}

function getShow(){
    let showId = sessionStorage.getItem('showId');

     axios.get("https://api.themoviedb.org/3/tv/" + `${showId}` + "?api_key=84e5f60bf1e80417245508379f78d7a0&language=en-US")
    .then((res) => {
        console.log(res);
        let show = res.data;

        let output = `
        <div class="row ">
        <div class="col-md-4">
        <img class="thumbnail" src="https://image.tmdb.org/t/p/w500${show.poster_path}">
        </div>
        <div class="col-md-8">
        <h2>${show.name}</h2>
        <ul class="list-group">
        <li class="list-group-item"><strong>Genre:</strong> ${show.genres[0].name}</li>
        <li class="list-group-item"><strong>First Air Date:</strong> ${show.first_air_date}</li>
        <li class="list-group-item"><strong>Network:</strong> 
        
        <h6>${show.networks[0].name}</h6></li>
        <li class="list-group-item"><strong>Overview:</strong> ${show.overview}</li>
         <li class="list-group-item"><strong>
         Number of Seasons:</strong> ${show.number_of_seasons}</li>
        if(${show.next_episode_to_air.air_date}) {
        <li class="list-group-item"><strong>Next Episode to Air:</strong> ${show.next_episode_to_air.air_date}</li>
        }
        else(err => console.log(err))
        </ul>
        </div>
        </div>
        <hr>
        <a href="https://thetvdb.com/search?query=${show.name}" target="_blank" class="btn btn-primary">More Info</a>
        <a href="index.html" class="btn btn-light">Go Back To Search</a>
        `;
        $('#show').html(output);
    })
    .catch((err) => {
        console.log(err);
    })


}