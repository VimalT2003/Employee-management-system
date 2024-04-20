
// import './App.css';
import Header from "./header/Header";
import Dashboard from "./Dashboard/Dashboard";
import NoMatch from "./Nomatch/NoMatch";
import { Routes,Route } from "react-router-dom";
import PostEmployee from "./employee/PostEmployee";
import UpdateUser from "./employee/UpdateUser";

function App() {
  return (
   <>
   <Header/>
   <Routes>
    <Route path='/' element={<Dashboard/>} />
    <Route path='/employee' element={<PostEmployee/>} />
    <Route path='/employee/:id' element={<UpdateUser/>} />
    <Route path='*' element={<NoMatch/>} />
   </Routes>

   </>
  );
}

export default App;
