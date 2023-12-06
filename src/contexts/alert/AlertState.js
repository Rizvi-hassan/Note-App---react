import {useState} from 'react'
import alertContext from './alertContext';


const AlertState = (props) =>{
    // const types = ['primary', 'secondary', 'success', 'danger', 'warning', 'info']
    // const [type, setType] = useState('primary');
    // const [message, setMessage] = useState('');
    const [alert, setAlert] = useState(null);



    const showAlert = (type, message)=>{
        setAlert({type, message});
        setTimeout(() => {
            setAlert(null);
        }, 3000);
    }

    return(
        <alertContext.Provider value={{showAlert, alert}}>
            {props.children}
        </alertContext.Provider>
    )
}

export default AlertState;