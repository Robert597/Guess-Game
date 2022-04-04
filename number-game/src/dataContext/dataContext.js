import { createContext, useState, useEffect } from "react";
import Axios from "axios";

const DataContext = createContext({});


export const DataProvider = ({children}) => {
    const[data, setData] = useState([]);
    const [newUsername, setNewusername] = useState("");
    const[username, setUsername] = useState("");
    const[resp, setResp] = useState("");

    const createUser = async () => {
            if(newUsername.length > 1){
            let check = data.map(a => {return a.username === newUsername ? true : false}).includes(true);
      if( check) return alert("username already taken") ;
      const response = await Axios.post('http://localhost:5500', {
               username: newUsername,
               score: 0
            });
         return  window.location.replace("http://localhost:3000/splash");
         } else{
            return alert("fill the input box");
        }
    }
    useEffect(() => {
        const getPost = async () => {
        try{
            const response = await Axios.get("http://localhost:5500");
            console.log(response.data);
           setData(response.data.sort((a,b) => { 
            return b.score - a.score}));
           console.log(data);
         }catch (err) {
            console.log(err.message);
        }
    }
    getPost();
    }, []);

   const handleSubmit = async(e) => {
       console.log(data);
let check = data.filter(a => a.username === username );
if(check.length > 0){
    return  window.location.href = `http://localhost:3000/game/${check[0]._id}`;
}else{
    return alert("username not found, register username");
}
   }
   return <DataContext.Provider value={{data, username, setUsername, handleSubmit, newUsername, setNewusername, createUser}}>
        {children}
    </DataContext.Provider>
}
export default DataContext;