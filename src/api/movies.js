export default class MoviesApi {
  getMoviesList(page = 1, limit = 40, filter = '') {
    return fetch(`http://192.168.211.44:3000/?page=${page}&limit=${limit}&category=${filter}`).then(res => res.json());
  }
  getGenresList() {
    return fetch('https://api.themoviedb.org/3/genre/movie/list?api_key=9e72f98ad9d5c68503cf7a2b857f2b8e&language=en-US').then(res => res.json());
  }
}
