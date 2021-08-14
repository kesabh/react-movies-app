import React, { Component } from 'react';
import { Movie } from '../Movie/Movie';
import './Movies.css'
class Movies extends Component {
    state = {}
    render() {

        return (
            <div className="movies-container">
                {
                    this.props.allMovies.map(function (movieObject) {
                        return (
                            <Movie key= {movieObject.id} movie={movieObject} />
                        )
                    })
                }
            </div>
        );
    }
}

export { Movies };