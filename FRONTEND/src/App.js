import './App.css';
import {Routes, Route} from "react-router-dom"
import SignIn from './components/authentification/signIn';
import SignUp from './components/authentification/signUp';
import DashBoard from './components/dashboard.user/tables/dashboard';
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='signin' element= {<SignIn/>}/>
        <Route path='signup' element= {<SignUp/>}/>
        <Route path='dashboard/*' element= {<DashBoard/>}/>
      </Routes>

    </div>
  );
}

export default App;
