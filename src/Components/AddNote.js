import React, {useState, useContext} from 'react'
import noteContext from '../contexts/notes/noteContext'

const AddNote = () => {

    const context = useContext(noteContext);
    const [note, setNote] = useState({title:"", description:"", tag:"public"})

    const { addNote } = context;
    
    const handleClick = (e)=>{
        e.preventDefault();
        addNote(note.title, note.description, note.tag);
        setNote({title:"", description:"", tag:"public"})
    }

    const onchange = (e) =>{
        setNote({...note, [e.target.name]: e.target.value})
    }
    return (
        <div className="container my-3">
            <h2>Add New Note</h2>
            <form>
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input type="text" className="form-control" id="title" name="title" aria-describedby="emailHelp" value={note.title} onChange={onchange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description</label>
                    <input type="text" className="form-control" id="description" name="description" value={note.description} onChange={onchange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="tag" className="form-label">Tag</label>
                    <input type="text" className="form-control" id="tag" name="tag" value={note.tag} onChange={onchange} />
                </div>
                
                <button type="submit" className="btn btn-primary"  onClick={handleClick}>Save</button>
            </form>
            <hr />
        </div>
    )
}

export default AddNote
