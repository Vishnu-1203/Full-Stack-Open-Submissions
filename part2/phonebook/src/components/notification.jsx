import React from 'react'

const Notification = ({notification,cname}) => {
    if(notification==null){
        return null
    }

    return ( 
        <div className={cname}>
            {notification}
        </div>
    )
}

export default Notification