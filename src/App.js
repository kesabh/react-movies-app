import React, { Component } from 'react';
import { Header } from './Movies/components/Header/Header.jsx';
import { Movies } from './Movies/components/Movies/Movies.jsx';
import Favorites from './Movies/components/Favorites/Favorites.jsx' ; 
import MoviePage from './Movies/components/MoviePage/MoviePage.jsx'

import Pagination from './Movies/components/Pagination/Pagination.jsx';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';


import { API_URL, API_KEY } from './API/secrets.js'
import axios from 'axios';
import './App.css'
class App extends Component {
    state = {
        moviesData: [],
        movieName: "avengers",
        currentPage: 1,
        totalPages: 1
    }

    componentDidUpdate() {
        // console.log(this.state) ; 
    }

    async componentDidMount() {
        // https://api.themoviedb.org/3/search/movie?api_key=5c036616644a5b5705b76c96c0a20727&language=en-US&query=avengers&page=1&include_adult=false
        let data = await axios.get(API_URL + "search/movie",
            { params: { api_key: API_KEY, language: "en-US", query: this.state.movieName, page: 1, include_adult: true } });
        // console.log(data);
        this.setState({
            moviesData: data.data.results.slice(0, 15),
            currentPage: data.data.page,
            totalPages: data.data.total_pages
        })
        // console.log(this.state) ;
    }

    searchMovie = async (movieName) => {
        let data = await axios.get(API_URL + "search/movie",
            { params: { api_key: API_KEY, language: "en-US", query: movieName, page: 1 } });

        this.setState({
            moviesData: data.data.results,
            movieName: movieName,
            currentPage: data.data.page,
            totalPages: data.data.total_pages
        });
        // console.log(this.state) ;
    }

    next = async () => {
        let data = await axios.get(API_URL + "search/movie",
            { params: { api_key: API_KEY, language: "en-US", query: this.state.movieName, page: this.state.currentPage + 1 } });
        this.setState({
            moviesData: data.data.results,
            currentPage: data.data.page,
        });
    }
    previous = async () => {
        let data = await axios.get(API_URL + "search/movie",
            { params: { api_key: API_KEY, language: "en-US", query: this.state.movieName, page: this.state.currentPage - 1 } });
        this.setState({
            moviesData: data.data.results,
            currentPage: data.data.page,
        });
    }

    fromPage = async (page) => {
        let data = await axios.get(API_URL + "search/movie",
            { params: { api_key: API_KEY, language: "en-US", query: this.state.movieName, page: page } });
        this.setState({
            moviesData: data.data.results,
            currentPage: data.data.page,
        });
    }


    render() {
        return (
            <Router>
                <div className="App">
                    <Header search={this.searchMovie} />

                    <Route path="/" exact >
                        {this.state.moviesData.length == 0 ? (
                            <h1 className="error" > Oops ! No movies found  </h1>
                        ) : (
                            <>
                                <Movies allMovies={this.state.moviesData} />
                                <Pagination currentPage={this.state.currentPage}
                                    totalPages={this.state.totalPages}
                                    next={this.next}
                                    previous={this.previous}
                                    fromPage={this.fromPage}
                                ></Pagination>
                            </>
                        )}
                    </Route>
                    
                    <Route path="/fav"  exact >
                        <Favorites></Favorites>
                    </Route>

                    <Route path="/movie-page" exact component = {MoviePage}>
                        
                    </Route>

                </div>
            </Router>
        );
    }
}

export { App };