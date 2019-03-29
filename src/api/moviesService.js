const SERVER_IP = '192.168.211.44';
const PORT = 4000;

class MoviesService {
  getMoviesList(page = 1) {
    return fetch(`https://api.themoviedb.org/3/discover/movie?api_key=9e72f98ad9d5c68503cf7a2b857f2b8e&language=en-US&page=${page}`)
      .then(res => res.json())
      .then(res => {
        console.log(res);
        return res.results;
      });
  }
  getGenresList() {
    return fetch('https://api.themoviedb.org/3/genre/movie/list?api_key=9e72f98ad9d5c68503cf7a2b857f2b8e&language=en-US').then(res => res.json());
  }
  search(query, page = 1, limit = 20) {
    const readyQuery = encodeURI(query);
    return fetch(`http://${SERVER_IP}:${PORT}/search?page=${page}&limit=${limit}&query=${readyQuery}`).then(res => res.json());
  }
  getMovieData(id) {
    const movieData = {};
    const fetchs = [
      fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=9e72f98ad9d5c68503cf7a2b857f2b8e&language=en-US`)
        .then(res => res.json())
        .then(res => (movieData.general = res)),
      fetch(`https://api.themoviedb.org/3/movie/${id}/credits?api_key=9e72f98ad9d5c68503cf7a2b857f2b8e&language=en-US`)
        .then(res => res.json())
        .then(res => (movieData.credits = res))
    ];
    return Promise.all(fetchs).then(() => {
      return movieData;
    });
  }
}
export default new MoviesService();
