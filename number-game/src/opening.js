import React from 'react'
import { useContext} from 'react';
import DataContext from './dataContext/dataContext';


const Opening = () => {
   const {data, username, setUsername, handleSubmit} = useContext(DataContext);

  return (
    <div className=' '>
        <h1 className='font-poppins text-2xl text-center text-capitalize text-white bg-secondary p-4 font-bold '>
            Guess Game
        </h1>
        <div className='w-full py-8  md:py-12'>
            <p className='text-center text-primary px-4 md:px-0 text-base md:text-lg font-poppins w-full md:w-1/2 mx-auto '>Welcome to Number Game, you will be given 4 numbers to select from, decide which of the number was guessed by the computer.</p>
            <p className='text-green-600 text-xl md:text-2xl text-capitalize font-bold font-PT py-4 text-center underline'>Instructions:</p>
            <ol className=''>
                <li className='font-poppins text-primary text-base md:text-lg py-2 text-center'>1. Input your username</li>
                <li  className='font-poppins text-primary text-base md:text-lg py-2 text-center'>2. Click on Start</li>
                <li  className='font-poppins text-primary text-base md:text-lg py-2 text-center'>3. Keep Playing till you top the highscore ladder</li>
            </ol>
        </div>

    <div className='lg:flex justify-center items-center py-4 space-y-4 lg:space-x-2 px-4 md:px-12 lg:px-0' >
        <input type="text" placeholder="input your username" className='py-4 rounded-xl focus:outline-none drop-shadow-lg lg:w-1/4 w-full px-4 placeholder:font-poppins border-2 border-secondary' required  value={username} onChange={(e) => setUsername(e.target.value)}/>
        <button to="/game" onClick = {(e) => handleSubmit(e)} className="bg-green-600 w-full lg:w-1/4  px-8 font-poppins text-white text-lg text-tertiary rounded-xl  py-4"> Submit</button>
    </div>
    <div className='py-4'>
        <p className='font-poppins text-xl text-center'>Scores Leaderboard</p>
        {data.slice(0, 10).map((a, i) => {
            return (
                <ol key={i}>
                <li className='font-poppins text-lg py-2 text-center'>{`${i + 1}. ${a.username}`} <span className='mx-8'>{a.score}</span></li>
                </ol>
            )
        })}
    </div>
    </div>
  )
}

export default Opening
