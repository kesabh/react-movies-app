import React, { Component } from 'react';
import './Pagination.css'
class Pagination extends Component {
    state = {}
    render() {

        let currentPage = this.props.currentPage;
        let totalPages = this.props.totalPages;
        let allPages = [];
        for (let i = 1; i <= totalPages; i++)
            allPages.push(i);
        console.log(allPages);

        let handleOnPageClick = (e) =>{
            this.props.fromPage(Number(e.target.childNodes[0].data)) ; 
        }
        return (
            <>
                <nav>
                    <ul className="pagination   justify-content-center"  >
                        {currentPage == 1 ? (
                            <li className="page-item disabled" >
                                <a className="page-link" aria-disabled="true">Previous</a>
                            </li>
                        ) : (
                            <li className="page-item " onClick={ this.props.previous } >
                                <a className="page-link" aria-disabled="true">Previous</a>
                            </li>
                        )}
                        {allPages.map(function (page) {
                            return page == currentPage ?
                                <li className="page-item active"><a class="page-link">{page}</a></li>
                                :
                                <li className="page-item"   onClick={ handleOnPageClick }><a class="page-link">{page}</a></li>

                        })}
                        {currentPage == allPages.length ? (
                            <li className="page-item disabled">
                                <a className="page-link" >Next</a>
                            </li>
                        ) : (
                            <li className="page-item"   onClick = {this.props.next}>
                                <a className="page-link" >Next</a>
                            </li>
                        )}
                    </ul>
                </nav>
            </>
        );
    }
}

export default Pagination;