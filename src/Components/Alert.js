import React, { useContext } from 'react'
import alertContext from '../contexts/alert/alertContext';

const Alert = () => {
    const context = useContext(alertContext);
    let {alert} = context;
    
    // if (!alert) {
    //     alert = {type:'success', message:"testing"};
    // }
    return (
        alert &&
            <div  className={`alert alert-${alert.type} alert-dismissible fade show`} role="alert" >
                <strong>{alert.type}!</strong> {alert.message}
                {/* <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button> */}
            </div>
    )
}

export default Alert
