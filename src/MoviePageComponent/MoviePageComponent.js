import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import MoviesService from '../api/moviesService';

const movieSrc = imagePath => `https://image.tmdb.org/t/p/w500/${imagePath}`;

class MoviePage extends Component {
  constructor() {
    super();
    this.state = { data: null, hasError: false };
  }
  componentDidMount() {
    const { id } = this.props.match.params;
    MoviesService.getMovieData(id)
      .then(res => this.setState({ data: res }))
      .catch(() => this.setState({ hasError: true }));
  }
  render() {
    if (this.state.hasError) return <div>we found an error</div>;
    if (!this.state.data) return <div>still loading post</div>;
    console.log(this.props);
    const { title, overview } = this.state.data;
    console.log(this.state.data);
    return (
      <div className="row" style={{ padding: 30, paddingTop: 0 }}>
        <div className="col five">
          <div>
            <img src={movieSrc(this.state.data.poster_path)} style={{ width: '100%' }} />
          </div>
        </div>
        <div className="col grow">
          <div className="card">
            <div className="card-head">
              <button onClick={this.props.history.goBack}>⟨ Go back</button>
              <h2>{title}</h2>
            </div>
            <div className="card-body">{overview}</div>
          </div>
        </div>
      </div>
    );
  }
}
export default withRouter(MoviePage);
