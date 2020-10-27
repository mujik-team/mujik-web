import React, {useState} from 'react'

const customBadge = (props:Object) => {

  const [state, setState] = useState(false)
    return (
        <div>
            <span className="p-tag p-tag-rounded" 
              style={{paddingLeft: '20px',paddingRight: '20px',marginLeft:'5px',backgroundColor:'#21242a',color:"white"}}>
                {props}
                {state}
              </span>
        </div>
    )
}

export default customBadge
