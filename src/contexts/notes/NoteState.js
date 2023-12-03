import { useState } from 'react'
import noteContext from './noteContext';

const header = "http://localhost:5000/";

const NoteState = (props) => {

  const [note, setNote] = useState([{
    "_id": "656612b5bee6f3f218ee59e7",
    "user": "65636e798189d1093b9ced10",
    "title": "My first note",
    "description": "This is my first ever note send thorugh my own api",
    "tag": "personal",
    "date": "2023-11-28T16:17:57.888Z",
    "__v": 0
  }]);

  // To fetch notes from api
  const fetchNote = async()=>{
    const response = await fetch(`${header}api/notes/sendallnotes`, {
      method: "GET", 

      headers: {
        "Content-Type": "application/json",
        "auth-token" : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjU2MzZlNzk4MTg5ZDEwOTNiOWNlZDEwIn0sImlhdCI6MTcwMTAxNTg5NH0.R1FGYqVCQSUWogYytXa3iS4hUDaAkNty8KnMuMasIO4"
      },

      // body: JSON.stringify(data), // body data type must match "Content-Type" header
    });
    const json = await response.json();
    console.log(json);
    setNote(json);
  }
  
  // To add new note
  const addNote = async(title, description, tag)=>{
    const response = await fetch(`${header}api/notes/getnotes`, {
      method: "POST", 
  
      headers: {
        "Content-Type": "application/json",
        "auth-token" : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjU2MzZlNzk4MTg5ZDEwOTNiOWNlZDEwIn0sImlhdCI6MTcwMTAxNTg5NH0.R1FGYqVCQSUWogYytXa3iS4hUDaAkNty8KnMuMasIO4"
      },
  
      body: JSON.stringify({title, description, tag}), // body data type must match "Content-Type" header
    });
    const status = await response.status;
    console.log("Adding note status: ", status);
    fetchNote();
  }
  
  // To delete a note
  const deleteNote = async(id) =>{
    const response = await fetch(`${header}api/notes/deletenote/${id}`, {
      method: "DELETE", 
  
      headers: {
        "Content-Type": "application/json",
        "auth-token" : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjU2MzZlNzk4MTg5ZDEwOTNiOWNlZDEwIn0sImlhdCI6MTcwMTAxNTg5NH0.R1FGYqVCQSUWogYytXa3iS4hUDaAkNty8KnMuMasIO4"
      },
  
      // body: JSON.stringify(data), // body data type must match "Content-Type" header
    });
    let status = await response.status;
    console.log(status)
    const newnotes=note.filter((val)=> val._id !== id);
    setNote(newnotes)
  }


  // To Update a note
  const updateNote = async(note) =>{
    const response = await fetch(`${header}api/notes/updatenote/${note._id}`, {
      method: "PUT", 
  
      headers: {
        "Content-Type": "application/json",
        "auth-token" : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjU2MzZlNzk4MTg5ZDEwOTNiOWNlZDEwIn0sImlhdCI6MTcwMTAxNTg5NH0.R1FGYqVCQSUWogYytXa3iS4hUDaAkNty8KnMuMasIO4"
      },
  
      body: JSON.stringify({title:note.title, description:note.description, tag:note.tag}), // body data type must match "Content-Type" header
    });
    console.log("status: ",response.status);
    fetchNote()
  }

  return (
    <noteContext.Provider value={{ note, setNote, addNote, deleteNote, fetchNote, updateNote }} >
      {props.children}
    </noteContext.Provider>
  )
}

export default NoteState;