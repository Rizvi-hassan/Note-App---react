import { useContext, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import noteContext from "../contexts/notes/noteContext"
import AddNote from "./AddNote"
import Notes from "./Notes"



export const Home = () => {
    const context = useContext(noteContext);
    const {token} = context;
    const navigate = useNavigate();
    useEffect(()=>{
        if (!token){
            navigate('/login');
            // eslint-disable-next-line
        }
    }, [])

    return (
        <>
            <AddNote/>
            <Notes/>
        </>
    )
}
