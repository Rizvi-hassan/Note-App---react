import { useState, useContext } from 'react'
import alertContext from '../alert/alertContext';
import noteContext from './noteContext';


const header = "http://localhost:5000/";



const NoteState = (props) => {

  const context = useContext( alertContext);
  const [token, setToken] = useState(localStorage.getItem('token'))
  const {showAlert} = context;

  const [note, setNote] = useState([]);


  //To set auth token of logged in or registered user
  const saveToken = ()=>{
    setToken(localStorage.getItem('token'));
  }

  // To fetch notes from api
  const fetchNote = async()=>{
    const response = await fetch(`${header}api/notes/sendallnotes`, {
      method: "GET", 

      headers: {
        "Content-Type": "application/json",
        "auth-token" : token
      },

      // body: JSON.stringify(data), // body data type must match "Content-Type" header
    });
    const json = await response.json();
    if (response.status === 200){
      console.log(json);
      setNote(json);
    }
    else if(response.status === 401){
      showAlert('danger', 'Unauthorised user! Login first..');
    }
    else{
      showAlert('danger', 'Could not fetch notes. Please check your internet connection');
    }
    
  }
  
  // To add new note
  const addNote = async(title, description, tag)=>{
    const response = await fetch(`${header}api/notes/getnotes`, {
      method: "POST", 
  
      headers: {
        "Content-Type": "application/json",
        "auth-token" : token
      },
  
      body: JSON.stringify({title, description, tag}), // body data type must match "Content-Type" header
    });
    const status = await response.status;
    if(status === 200){
      fetchNote();
      showAlert('success', 'Note added successfully');

    }
    else{
      showAlert('danger', 'Something went wrong. Please check your network')
    }
  }
  
  // To delete a note
  const deleteNote = async(id) =>{
    const response = await fetch(`${header}api/notes/deletenote/${id}`, {
      method: "DELETE", 
  
      headers: {
        "Content-Type": "application/json",
        "auth-token" : token
      },
  
      // body: JSON.stringify(data), // body data type must match "Content-Type" header
    });
    let status = await response.status;
    if(status === 200){
      const newnotes=note.filter((val)=> val._id !== id);
      setNote(newnotes)
      showAlert('warning', 'Note deleted successfully');
    }
    else{
      showAlert('danger', 'Something went wrong. Please check your network')
    }
  }


  // To Update a note
  const updateNote = async(note) =>{
    const response = await fetch(`${header}api/notes/updatenote/${note._id}`, {
      method: "PUT", 
  
      headers: {
        "Content-Type": "application/json",
        "auth-token" : token
      },
  
      body: JSON.stringify({title:note.title, description:note.description, tag:note.tag}), // body data type must match "Content-Type" header
    });
    const status = response.status;
    if(status === 200){
      fetchNote()
      showAlert('info', 'Note updated successfully');
    }
    else{
      showAlert('danger', 'Something went wrong. Please check your network')
    }
  }

  return (
    <noteContext.Provider value={{ note, setNote, addNote, deleteNote, fetchNote, updateNote, saveToken, token }} >
      {props.children}
    </noteContext.Provider>
  )
}

export default NoteState;