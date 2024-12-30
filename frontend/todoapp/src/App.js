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

  //Method Adds a new task
  async addNote()
  {
    var newNotes = document.getElementById("newNotes").value;

    const data = new FormData();

    data.append("newNotes", newNotes);

    fetch(this.API_URL+`api/ToDoApp/AddNotes`,
      {
        method: 'POST',  
        body: data
      }
    ).then(response => response.json())
    .then((result) => {
      console.log(result);
      this.refreshNotes();
    })

    document.getElementById(`newNotes`).value = ""
  } // End of addNote function

  async editNote(id)
  {
    var editNotes = document.getElementById(`editNotes_${id}`).value;

    const data = new FormData();

    data.append("editNotes", editNotes);

    fetch(this.API_URL+`api/ToDoApp/EditNotes?id=${id}`,
      {
        method: 'POST',  
        body: data
      }
    ).then(response => response.json())
    .then((result) => {
      console.log(result);
      this.refreshNotes();
    })

    document.getElementById(`editNotes_${id}`).value = ""
  } // End of editNote function

  //Method will delete a note entry
  async deleteNote(id) {
    fetch(this.API_URL+`api/ToDoApp/DeleteNotes?id=${id}`,
      {
        method: 'Delete', //HTTP method for deletion
        headers: {
          'Content-Type': 'application/json', 
        }
      }
    )
    .then(()=>this.refreshNotes());
  }

  async clearAll()
  {
    fetch(this.API_URL+`api/ToDoApp/ClearAll`,
      {
        method: 'Delete',
        headers: {
          'Content-Type': 'application/json'
        }
      }
    ).then(()=>this.refreshNotes());
  }



  render()
  {
    const {notes} = this.state;
    return (
      <div className="App">
        <h2>Todo App</h2>
        <div className='flex-container'>
            {notes.map(
              note =>
                <>
                  <p className="flex-column">
                    {note.id}
                    <b>* {note.description}</b>
                  </p>
                  <input className="flex-column" type="text" id={`editNotes_${note.id}`} name="editNotes" />
                  <button className="flex-column" onClick={()=>this.editNote(note.id)}>Edit</button>
                  <button className="flex-column" onClick={()=>this.deleteNote(note.id)}>Delete</button>
                </>
            )}
        </div>
        <div style={{margin: "auto", marginTop: "1rem", borderStyle: "solid", maxWidth: "20%"}}>
          <h3>Add new Task</h3>
          <input type="text" id="newNotes" name="newNotes" />
          <button style={{marginBottom: "1rem"}} onClick={()=>this.addNote()}>Add Notes</button>
          <button onClick={()=>this.clearAll()}>Clear All</button>
        </div>
      </div>
    );
  }
}

export default App;
