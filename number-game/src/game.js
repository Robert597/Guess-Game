import React, {useState, useEffect, useContext} from 'react';
import { Link, useParams } from 'react-router-dom';
import DataContext from './dataContext/dataContext';
import Axios from "axios";

const Game = () => {
    const [answer, setAnswer] = useState("?");
   var [counter, setCounter] = useState(20);
    const [refresh, setRefresh] = useState(false);
    const [options, setOptions] = useState([]);
    const [score, setScore] = useState(0)
    const[show, setShow] = useState(false);
    const [correct, setCorrect] = useState(false);
    const [wrong, setWrong] = useState(false);
    const [total, setTotal] = useState(0);
    const [interval, setinterval] = useState(0);
    const { username, setUsername } = useContext(DataContext);
    const [loading, setLoading] = useState(false);
  const {id} = useParams();
  

  const goBack = async () => {
        try{
          await Axios.put('http://localhost:5500', {
                id,
                score
            })
            window.location.reload();
        }catch (err){
           return err.message
        }
    }
  

    useEffect(() => {
       let options =  [Math.floor(Math.random()*(100-1+1)+1),Math.floor(Math.random()*(100-1+1)+1),Math.floor(Math.random()*(100-1+1)+1),Math.floor(Math.random()*(100-1+1)+1)];
        setAnswer(options[Math.floor(Math.random() * 4)]);
        setOptions(options);
        setShow(false);
        
        let intervalId = setInterval(() => {
            setCounter(prevCount => {
              if(prevCount  === 1){
                  clearInterval(intervalId)
              }
          return prevCount - 1
          });
          }, 1000);
          setinterval(intervalId);
 }, [refresh]);

useEffect(() => {
    const getUsername = async () => {
        try{
            setLoading(true);
            const response = await Axios.get("http://localhost:5500");
            const selected = await response.data.filter(a => a._id === id);
            setUsername(selected[0].username);
        }  catch (err) {
            console.log(err.message);
        }finally{
            setLoading(false);
        }
    }
    getUsername();
}, [])



 
 

   const selectAnswer = (e) => {
    if(parseInt(e.target.innerText) === answer && correct !== true && wrong !== true && counter > 0){
        setScore(prevCount => prevCount + 1);
        setCorrect(true);
        setCounter(20)
        setShow(true);
        setTotal(prevNo => prevNo + 1);
    }else if (parseInt(e.target.innerText) !== answer && wrong !== true && correct !== true && counter > 0){
        setWrong(true);
        setCounter(20)
        setShow(true);
        setTotal(prevNo => prevNo + 1);
    }else{
        return "";
    }
    clearInterval(interval);
    setinterval(0);
    return;
   // restart === true ? setRestart(false) : setRestart(true);
   }
   
  return (
      
  <div className='flex flex-col justify-center items-center w-screen h-screen space-y-8 relative'>
       {loading && <p className='fonr-poppins text-xl '>loading...</p> }
       {!loading && <>
        <div className='font-poppins text-lg text-primary uppercase font-bold'>Welcome {username}</div>
        <div className={show ? ' h-44 w-40 sm:h-56 sm:w-56 bg-secondary flex justify-center items-center text-6xl font-poppins font-bold text-white mx-auto py-4 notShow' :  ' h-44 w-40 sm:h-56 sm:w-56 bg-secondary flex justify-center items-center text-6xl font-poppins font-bold text-white mx-auto py-4 card'}>
            {show ? answer : "?"}
        </div>
        <div className='objectives flex justify-center py-8 space-x-4 sm:space-x-8'>
            {options.map((a, i) => {
                return (
                    <button key={i} onClick={(e) => {selectAnswer(e)}} className='options h-16 w-16 sm:h-24 sm:w-24 font-poppins text-xl bg-secondary text-white px-8 py-8 flex justify-center items-center'>{a}</button>
                )
            })}
        </div>
        <div className={counter < 10 ? 'animate-pulse counter fixed h-12 w-12  sm:h-20 sm:w-20 top-0 right-8 flex justify-center items-center text-base sm:text-xl bg-red-600 options text-white' :'counter fixed h-12 w-12  sm:h-20 sm:w-20 top-0 right-8 flex justify-center items-center text-base sm:text-xl bg-secondary options text-white '}>
            {counter}
        </div>
    <div className={correct ? "block mx-auto w-60 sm:w-80 rounded-md bg-green-600 p-4 sm:p-8 flex flex-col items-center space-y-4 absolute top-80" : "hidden"}>
         <p className='text-white  text-base sm:text-lg font-poppins text-capitalize text-center'>You've guessed right</p>
         <p className='text-white text-sm sm:text-base font-poppins text-capitalize text-center'>You have {score} out of {total} points</p>
         {total < 10 ?  (<button className="px-4 py-2  w-36 bg-white font-PT text-base text-primary font-bold rounded-full" onClick={() => {refresh === false ? setRefresh(true) : setRefresh(false); setCorrect(false);}}>Next Guess</button>) : (<>
         <p className='text-white text-lg font-poppins text-capitalize text-center'>You've completed all questions</p><Link to="/splash"  className="px-4 py-2  w-36 bg-white font-poppins font-bold text-base text-primary rounded-full text-center" onClick={() => goBack()}>Go back</Link></>) }
    </div>
    <div className={wrong ? "block  mx-auto w-60 sm:w-80 rounded-md bg-red-600 p-4 sm:p-8 flex flex-col items-center space-y-4 absolute top-80" : "hidden"}>
         <p className='text-white text-base sm:text-lg font-poppins text-capitalize text-center'>OOps, Try again</p>
         <p className='text-white text-sm sm:text-base font-poppins text-capitalize text-center'>You have {score} out of {total} points</p>
         {total < 10 ?  (<button className="px-4 py-2  w-36 bg-white font-poppins font-bold text-base text-primary rounded-full" onClick={() => {refresh === false ? setRefresh(true) : setRefresh(false); setWrong(false);}}>Next Guess</button>) : (<>
         <p  className='text-white text-base font-poppins text-capitalize text-center'>You've completed all questions</p><Link to="/splash"  className="px-4 py-2  w-36 bg-white font-poppins text-base font-bold text-primary rounded-full text-center" onClick={() => goBack()}>Go back</Link></>) }
    </div>
    <div className={counter > 0 ? "hidden" : "block mx-auto w-60 sm:w-80 rounded-md p-4 bg-red-600 sm:p-8 flex flex-col items-center space-y-4 absolute top-80 " }>
    <p className='text-white text-base sm:text-lg font-poppins text-capitalize text-center'>OOps, you ran out of time</p>
    <p className='text-white text-sm sm:text-base font-poppins text-capitalize text-center'>You have {score} out of {total + 1} points</p>
    {total + 1 < 10 ?  (<button className="px-4 py-2  w-36 bg-white font-poppins font-bold text-base text-primary rounded-full" onClick={() => {refresh === false ? setRefresh(true) : setRefresh(false); setTotal(total + 1); setCounter(20)}}>Next Guess</button>) : (<>
         <p  className='text-white text-base font-poppins text-capitalize text-center'>You've completed all questions</p><Link className="px-4 py-2  w-36 bg-white font-poppins font-bold text-base text-primary rounded-full text-center" to="/splash" onClick={() => goBack()}>Go back</Link></>) }
    </div>
    </>
}
    </div>
    
  )
}

export default Game;