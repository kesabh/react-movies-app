import React, { Component } from 'react';
import { IMAGE_URL , API_URL, API_KEY} from '../../../API/secrets.js'
import { Link } from 'react-router-dom';
import './Movie.css'
import axios from 'axios';
class Movie extends Component {
    state = {
        movieData : null 
    }
    async componentDidMount(){
        // https://api.themoviedb.org/3/movie/108?api_key=5c036616644a5b5705b76c96c0a20727
        let response = await axios.get( `${API_URL}/movie/${this.props.movie.id}?api_key=${API_KEY}` ) ; 
        // console.log(response.data) ; 
        this.setState({
            movieData : response.data
        })

    }

    render() {
        return (
            <div className="movie">
                <div className="movie-poster">
                    <Link   to={{ pathname : "/movie-page"  , data : this.state.movieData}}>
                        <img src={IMAGE_URL + this.props.movie.poster_path} />
                    </Link>
                </div>
                <div className="movie-info">
                    <div className="movie-title">{this.props.movie.title}</div>
                    {/* <div className="movie-overview">{this.props.movie.overview}</div> */}
                    <div className="movie-rating">IMDB - {this.props.movie.vote_average}</div>
                </div>
            </div>

        )
    }
}

export { Movie };