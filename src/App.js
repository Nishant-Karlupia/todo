import Navbar from './components/Navbar';
import Home from './components/Home';
import Login from './components/Login';
import SignUp from './components/SignUp'
import Todos from './components/Todos';
import TodoState from './context/todo/TodoState';
import './App.css';
import Alert from './components/Alert';
import { useState } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

function App() {

  const [alert, setAlert] = useState(null);

  const showAlert=(success,message)=>{
    // console.log("Alert called");
    setAlert({
      success:success,
      message:message
    });

    setTimeout(()=>{setAlert(null)},5000);
  }

  return (
    <>
      <TodoState>
          <Router>
            <Navbar showAlert={showAlert}/>
            <Alert alert={alert}/>
            <div className="container">
              <Routes>
                <Route exact path='/' element={<Home showAlert={showAlert}/>} />
                <Route exact path="/todo" element={<Todos showAlert={showAlert}/>} />
                <Route exact path='/login' element={<Login showAlert={showAlert}/>} />
                <Route exact path="/signup" element={<SignUp showAlert={showAlert} />} />
              </Routes>
            </div>
          </Router>
      </TodoState>
    </>
  );
}

export default App;
