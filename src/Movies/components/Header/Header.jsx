import React, { Component } from 'react';
import './Header.css'
import { Link } from 'react-router-dom';

class Header extends Component {
    state = {
        movieName: ""
    }
    handleOnChange = (e) => {
        let value = e.target.value;
        this.setState({
            movieName: value
        })
    }
    handleKeyPress = (e) => {
        if (e.key == "Enter") {
            this.props.search(this.state.movieName)
        }
    }
    render() {
        let image = "https://image.tmdb.org/t/p/original/wwemzKWzjKYJFfCeiB57q3r4Bcm.svg";
        return (
            <div className="header">
                <div className="logo">
                    <img className="logo-img" src={image} />
                </div>
                <div className="search-movie">
                    <input type="text"
                        className="search-input"
                        placeholder="Search"
                        value={this.state.movieName}
                        onChange={this.handleOnChange}
                        onKeyPress={this.handleKeyPress}
                    />
                </div>

                <div className="header-links">
                    <div className="link">
                        <Link to="/"> Home </Link>
                    </div>
                    <div className="link">
                        <Link to="/fav">Favorites</Link>
                    </div>
                </div>

            </div>
        );
    }
}

export { Header };