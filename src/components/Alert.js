import React from 'react'

const Alert = (props) => {
  // if(props.alert)console.log(props.alert.success);
  let success;
  if(props.alert)success=props.alert.success;
  return (
    <div className='d-flex flex-row-reverse alert-parent'  >      
      {props.alert && <div className="alert-container d-flex" style={{color:success?"rgb(186, 234, 186)":"rgb(250, 67, 113)",border:success?"2px solid rgb(186, 234, 186)":"2px solid rgb(250, 67, 113)"}}>
        <div className='mx-2'>{`${props.alert.success}`===true?<i className="fa-regular fa-circle-check"></i>:<i className="fa-solid fa-triangle-exclamation"></i>}</div>
        <div className='mx-2'>{`${props.alert.message}`}</div>
      </div>}
    </div>
  )
}

export default Alert