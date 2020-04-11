import React, { Component } from "react";
import Form from './components/Form'
import "./App.css";

class App extends Component {
  render() {
    return <div>
      <header>
        <h1>Google Book Search</h1>
      </header>
      <main>
        <Form/>
      </main>
    </div>;
  }
}

export default App;
