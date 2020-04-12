import React, { Component } from "react";
import Results from "./Results";

const API_KEY = "AIzaSyCQchJlyVyhY2doysDlA3-fkYLhNvQa72w";

export default class Form extends Component {
  state = {
    currentQuery: "",
    showResults: false,
    url: "https://www.googleapis.com/books/v1/volumes?q=",
    books: [],
    printType: "all",
    filter: null,
  };

  handleKeywordChange(querySearch) {
    this.setState({
      ...this.state,
      currentQuery: querySearch,
    });
  }

  handlePrintTypeFilter(printType) {
    this.setState({
      ...this.state,
      printType: printType,
    });
  }

  handleMediumTypeFilter(mediumType) {
    this.setState({
      ...this.state,
      filter: mediumType,
    });
  }

  handleFormSubmit(e) {
    e.preventDefault();
    const { currentQuery, url, printType, filter } = this.state;
    let filterQuery;
    filter !== null ? (filterQuery = `&filter=${filter}`) : (filterQuery = "");
    console.log(`${url}${currentQuery}&printType=${printType}${filterQuery}&key=${API_KEY}`)
    fetch(
      `${url}${currentQuery}&printType=${printType}${filterQuery}&key=${API_KEY}`
    )
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error(res.statusText);
        }
      })
      .then((data) => {
        data.items.map((book) => {
          this.setState({
            ...this.state,
            showResults: true,
            books: [
              ...this.state.books,
              {
                id: book.id,
                title: book.volumeInfo.title,
                description: book.volumeInfo.description,
                categories: book.volumeInfo.categories,
                author: book.volumeInfo.authors,
                price: book.saleInfo.retailPrice,
                imageThumbnail: book.volumeInfo.imageLinks.thumbnail,
                pageCount: book.volumeInfo.pageCount,
                publishedDate: book.volumeInfo.publishedDate
              },
            ],
          });
        });
        console.log(this.state);
      })
      .catch((err) => console.log(err));
    this.setState({
      ...this.state,
      showResults: false,
      books: [],
    });
  }

  render() {
    return (
      <div>
        <form id="search-form" onSubmit={(e) => this.handleFormSubmit(e)}>
          <label htmlFor="keyword-search">Search by keyword:</label>
          <input
            type="text"
            id="author-search"
            className="author-search"
            onChange={(e) => this.handleKeywordChange(e.target.value)}></input>
          <label htmlFor="print-type">Medium Type Available:</label>
          <select
            id="print-type"
            onChange={(e) => this.handleMediumTypeFilter(e.target.value)}>
            <option value="">No Filter</option>
            <option value="partial">Partial Text</option>
            <option value="full">Full Text</option>
            <option value="free-ebooks">Free eBook</option>
            <option value="paid-ebooks">Paid eBook</option>
            <option value="ebooks">eBook</option>
          </select>
          <label htmlFor="book-type">Book Type:</label>
          <select
            id="book-type"
            onChange={(e) => this.handlePrintTypeFilter(e.target.value)}>
            <option value="all">All</option>
            <option value="books">Books</option>
            <option value="magazines">Magazines</option>
          </select>
          <button type="submit">Search!</button>
        </form>
        <section>
          {this.state.showResults ? <Results books={this.state.books} /> : ""}
        </section>
      </div>
    );
  }
}
