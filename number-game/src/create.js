import React, {useContext} from 'react';
import DataContext from './dataContext/dataContext';
import {Link} from "react-router-dom";


const Create = () => {
    const {newUsername, setNewusername, createUser } = useContext(DataContext)
  return (
    <div className='h-screen w-screen flex justify-center align-center bg-tertiary flex-col items-center'>
        <p className='font-poppins text-2xl py-4 font-bold text-secondary'>Create Username</p>
        <div className='w-full md:w-3/4 lg:w-1/2 px-4 space-y-4'>
        <input type="text" placeholder="choose username" value={newUsername} onChange={(e) => setNewusername(e.target.value)} className='py-4 rounded-xl focus:outline-none drop-shadow-lg w-full px-4 font-poppins placeholder:font-poppins border-2 border-secondary'/>
        <button onClick={() => createUser()}  className="bg-green-600  px-4 font-poppins text-white text-lg text-tertiary w-full rounded-xl py-4">Submit</button>
        </div>
        <div className='py-4'>
          <p className='font-poppins text-base text-capitalize  text-primary'>If you have a username, <Link to = "/splash" className='text-bold text-blue-600 font-bold uppercase'>click here</Link></p>
        </div>
    </div>
  )
}

export default Create