const API_ADRESS = 'https://api.themoviedb.org/3';

const SERVER_IP = '192.168.211.44';
const PORT = 4000;

class MoviesService {
  getMoviesList(page = 1) {
    const adress = `${API_ADRESS}/discover/movie?api_key=9e72f98ad9d5c68503cf7a2b857f2b8e&language=en-US&page=${page}`;
    return fetch(adress)
      .then(res => res.json())
      .then(res => res.results);
  }
  getGenresList() {
    const adress = 'https://api.themoviedb.org/3/genre/movie/list?api_key=9e72f98ad9d5c68503cf7a2b857f2b8e&language=en-US';
    return fetch(adress).then(res => res.json());
  }
  search(query, page = 1, limit = 20) {
    const readyQuery = encodeURI(query);
    const adress = `http://${SERVER_IP}:${PORT}/search?page=${page}&limit=${limit}&query=${readyQuery}`;
    return fetch(adress).then(res => res.json());
  }
  getMovieData(id) {
    const urls = [
      `https://api.themoviedb.org/3/movie/${id}?api_key=9e72f98ad9d5c68503cf7a2b857f2b8e&language=en-US`,
      `https://api.themoviedb.org/3/movie/${id}/credits?api_key=9e72f98ad9d5c68503cf7a2b857f2b8e&language=en-US`
    ];
    const movieData = {};
    const fetchs = [
      fetch(urls[0])
        .then(res => res.json())
        .then(res => (movieData.general = res)),
      fetch(urls[1])
        .then(res => res.json())
        .then(res => (movieData.credits = res))
    ];
    return Promise.all(fetchs).then(() => {
      return movieData;
    });
  }
}
export default new MoviesService();
