import React, { useContext, useEffect, useRef, useState } from 'react'
import noteContext from '../contexts/notes/noteContext'
import NoteItem from './NoteItem';

const Notes = () => {
    const context = useContext(noteContext);
    const {note, fetchNote, updateNote } = context;
    const ref = useRef(null);

    const [enote, setENote] = useState({_id:"", user:"", etitle:"", edescription:"", etag:""})

    useEffect(() => {
        fetchNote();
        // eslint-disable-next-line
    }, [])

    const changeNote = (note) => {
        setENote({_id:note._id, user:note.user, etitle:note.title, edescription: note.description, etag: note.tag});
        ref.current.click();
        console.log("recieved note: ",note,"\nsaved note: ", enote);
    }

    const handleClick = (e)=>{
        e.preventDefault();
        // addNote(enote.title, enote.description, enote.tag);
        console.log("updating note...", enote)
        updateNote({_id:enote._id, user:enote.user, title:enote.etitle, description:enote.edescription, tag: enote.etag})
    }

    const onchange = (e) =>{
        setENote({...enote, [e.target.name]: e.target.value})
    }

    return (
        <>
            <button type="button" className="btn btn-primary d-none" data-bs-toggle="modal" ref={ref} data-bs-target="#exampleModal">
                Launch demo modal
            </button>


            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Upadte Note</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">

                            <form>
                                <div className="mb-3">
                                    <label htmlFor="etitle" className="form-label">Title</label>
                                    <input type="text" className="form-control" id="etitle" name="etitle" aria-describedby="emailHelp" onChange={onchange} value={enote.etitle}/>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="edescription" className="form-label">Description</label>
                                    <textarea type="text" className="form-control" rows="3" id="edescription" name="edescription" onChange={onchange} value={enote.edescription} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="etag" className="form-label">Tag</label>
                                    <input type="text" className="form-control" id="etag" name="etag" onChange={onchange} value={enote.etag} />
                                </div>
                                
                                {/* <button type="submit" className="btn btn-primary" onClick={handleClick}>Save</button> */}
                            </form>

                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary" onClick={handleClick}>Update</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className='row my-3'>
                <h2>Your Notes</h2>
                {note && note.map((val) => {
                    return <NoteItem key={val._id} note={val} changeNote={changeNote} />
                })}
            </div></>
    )
}

export default Notes
