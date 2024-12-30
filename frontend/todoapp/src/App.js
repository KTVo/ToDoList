import './App.css';

import { Component } from 'react';

class App extends Component {

  constructor(props)
  {
    super(props);
    this.state = {
      notes: []
    }
  }

  API_URL = "http://localhost:5009/";

  //Runs when page refreshes
  componentDidMount()
  {
    this.refreshNotes();
  }
  
  //Method below will get notes from the API for this component
  async refreshNotes() {

    fetch(this.API_URL+"api/ToDoApp/GetNotes")
      .then(response=>response.json())
      .then(data =>{
        this.setState({notes: data});
      })
  }

  render()
  {
    const {notes} = this.state;
    return (
      <div className="App">
        <h2>Todo App</h2>
        {notes.map(
          note =>
            <p>
              <b>* {note.description}</b>
            </p>
        )}
      </div>
    );
  }
}

export default App;
