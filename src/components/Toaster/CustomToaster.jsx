import React from 'react'
import toast, { Toaster } from 'react-hot-toast'

const notify = () => toast('Here is your toast.');

function CustomToaster() {

    return (
        <div>
            {/* <button onClick={notify}></button> */}
            {/* {toast.success("Successfully Created")} */}
            <Toaster />
            
        </div>
    )
}

export default CustomToaster