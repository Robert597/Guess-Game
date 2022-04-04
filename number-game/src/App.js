import {Routes, Route} from "react-router-dom";
import Create from "./create";
import Game from "./game";
import Opening from "./opening";
function App() {
  return (
    <div className="App ">
     <Routes>
       <Route exact path="/" element={<Create/>}/>
       <Route exact path="/splash" element={<Opening/>}/>
       <Route  path="/game/:id" element={<Game/>}/>
     </Routes>
    </div>
  );
}

export default App;
