const API_URL = 'https://api.themoviedb.org/3';

class MoviesService {
  getMoviesList(page = 1, genres = '') {
    const url = `${API_URL}/discover/movie?api_key=9e72f98ad9d5c68503cf7a2b857f2b8e&language=en-US&page=${page}&with_genres=${genres}`;
    return fetch(url)
      .then(res => res.json())
      .then(res => res.results);
  }
  getGenresList() {
    const url = `${API_URL}/genre/movie/list?api_key=9e72f98ad9d5c68503cf7a2b857f2b8e&language=en-US`;
    return fetch(url).then(res => res.json());
  }
  search(query, page = 1, limit = 20) {
    const readyQuery = encodeURI(query);
    const url = `${API_URL}/search/movie?api_key=9e72f98ad9d5c68503cf7a2b857f2b8e&language=en-US&query=${readyQuery}&page=${page}`;
    return fetch(url)
      .then(res => res.json())
      .then(res => res.results.filter((movie, index) => index < limit));
  }
  getMovieData(id) {
    const urls = [
      `${API_URL}/movie/${id}?api_key=9e72f98ad9d5c68503cf7a2b857f2b8e&language=en-US`,
      `${API_URL}/movie/${id}/credits?api_key=9e72f98ad9d5c68503cf7a2b857f2b8e&language=en-US`
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
