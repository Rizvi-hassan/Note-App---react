import React, { useContext } from 'react'
import noteContext from '../contexts/notes/noteContext'

const NoteItem = (props) => {
    const context = useContext(noteContext);
    const {deleteNote} = context
    const { note, changeNote} = props;
    const date = new Date(note.date);
    return (
        <div className="col-md-3 my-3">
            <div className="card" >
                <div className="card-body">
                    <h5 className="card-title">{note.title}</h5>
                    <p className="card-text">{note.description} </p>
                    <p className="card-text">Date: {date.getFullYear()}-{date.getMonth()}-{date.getDate()}</p>
                    <i className="fa-solid fa-pen-to-square" onClick={()=>{changeNote(note)}}></i>
                    <i className="fa-solid fa-trash mx-2" onClick={()=>{
                        deleteNote(note._id);
                    }}></i>
                </div>
            </div>
        </div>
    )
}

export default NoteItem
