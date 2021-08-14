import React, { Component } from 'react';
import { IMAGE_URL, API_URL, API_KEY } from '../../../API/secrets.js';
import YouTube from 'react-youtube';
import axios from 'axios';
import './MoviePage.css'
class MoviePage extends Component {
    state = {
        videoObject: null
    }

    async componentDidMount() {
        // https://api.themoviedb.org/3/movie/108/videos?api_key=5c036616644a5b5705b76c96c0a20727&language=en-US
        if(this.props.location.data){
            let response = await axios.get(`${API_URL}/movie/${this.props.location.data.id}/videos?api_key=${API_KEY}`);
        console.log(response);
        let videoObjs = response.data.results.filter(function (video) {
            if (video.site == "YouTube" && video.type == "Trailer")
                return true;
            else
                return false;
        });

        this.setState({
            videoObject: videoObjs[0],
        })
        console.log(this.state.videoObject)
        }
    }


    render() {
        const opts = {
            height: '390',
            width: '640',
            playerVars: {
                // https://developers.google.com/youtube/player_parameters
                autoplay: 0
            }
        }

        // let { title, tagline, vote_average, overview, poster_path } = this.props.location.data;
        return (

            <>
                {
                    (this.state.videoObject == null || this.state.videoObject == undefined)   ?
                        <h1 className = "error"> No information available ! </h1>
                        :
                        (<div className="movie-page">
                            <div className="movie-page-poster">
                                <img src={`${IMAGE_URL}/${this.props.location.data.poster_path}`} alt="" />
                            </div>
                            <div className="movie-info-page">
                                <h1 className="movie-title"> {this.props.location.data.title} &nbsp;  IMDB {this.props.location.data.vote_average}</h1>
                                <h5 className="movie-tagline">{this.props.location.data.tagline}</h5>
                                <p className="movie-overview">{this.props.location.data.overview}</p>

                                <div className="trailer">
                                    <YouTube videoId={this.state.videoObject.key} opts={opts} ></YouTube>
                                </div>
                            </div>
                        </div>)
                }
            </>


        );
    }
}

export default MoviePage;