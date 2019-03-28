const SERVER_IP = '192.168.211.44';
const PORT = 4000;

class MoviesService {
  getMoviesList(page = 1, limit = 20, filter = '') {
    return fetch(`http://${SERVER_IP}:${PORT}/?page=${page}&limit=${limit}&category=${filter}`).then(res => res.json());
  }
  getGenresList() {
    return fetch('https://api.themoviedb.org/3/genre/movie/list?api_key=9e72f98ad9d5c68503cf7a2b857f2b8e&language=en-US').then(res => res.json());
  }
  search(query, page = 1, limit = 20) {
    const readyQuery = encodeURI(query);
    return fetch(`http://${SERVER_IP}:${PORT}/search?page=${page}&limit=${limit}&query=${readyQuery}`).then(res => res.json());
  }
  getMovieData(id) {
    return fetch(`http://${SERVER_IP}:${PORT}/movie/${id}`).then(res => res.json());
  }
}
export default new MoviesService();
