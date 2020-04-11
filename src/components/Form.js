import React, { Component } from "react";
import Results from "./Results";

const API_KEY = "AIzaSyCQchJlyVyhY2doysDlA3-fkYLhNvQa72w";

export default class Form extends Component {
  state = {
    forSale: "FOR_SALE",
    showResults: false,
    currentAuthor: "",
    url: "https://www.googleapis.com/books/v1/volumes?q=inauthor:",
    books: [],
  };
  handleAuthorChange(authorName) {
    authorName = authorName.trim().replace(" ", "+");
    this.setState({
      ...this.state,
      currentAuthor: authorName,
    });
  }

  handleFormSubmit(e) {
    e.preventDefault();
    const { currentAuthor, url } = this.state;

    this.setState({
      ...this.state,
      showResults: false,
      currentAuthor: '',
      books: []
    })
    fetch(`${url}${currentAuthor}&key=${API_KEY}`)
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error(res.statusText);
        }
      })
      .then((data) => {
        data.items.map((book) => {
          if (book.saleInfo.saleability === this.state.forSale) {
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
                  price: book.saleInfo.retailPrice.amount,
                  imageThumbnail: book.volumeInfo.imageLinks.thumbnail,
                },
              ],
            });
          }
        });
      })
      .catch((err) => console.log(err));
  }

  render() {
    return (
      <div>
        <form id="search-form" onSubmit={(e) => this.handleFormSubmit(e)}>
          <label htmlFor="author-search">Search by author:</label>
          <input
            type="text"
            id="author-search"
            className="author-search"
            onChange={(e) => this.handleAuthorChange(e.target.value)}></input>
          <button type="submit">Search!</button>
        </form>
        <section>
          {this.state.showResults ? <Results books={this.state.books} /> : ""}
        </section>
      </div>
    );
  }
}
