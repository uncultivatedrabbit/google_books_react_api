import React, { Component } from "react";

export default class Results extends Component {
  renderResults = () => {
    const book = this.props.books.map((book) => (
      <React.Fragment key={book.id}>
      <div  className="book-container">
        <div className="image-container">
          <img src={`${book.imageThumbnail}`} alt={`${book.description}`} />
        </div>
        <div className="book-content-container">
          {book.title}<br/>
          Published Date: {book.publishedDate} <br/>
          {book.author ? `Author: ${book.author[0]}` : "Author unavailable"}<br/>
          {book.price ? `Price: ${book.price.amount}` : "Price unavailable"}<br/>
          {book.description}<br/>
        </div>
      </div>
      <hr/>
      </React.Fragment>
    ));
    return book;
  };
  render() {
    return (
      <div>
        <h2>Results</h2>
        <section>{this.renderResults()}</section>
      </div>
    );
  }
}
