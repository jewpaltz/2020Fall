
import 'bulma';
import './App.css';
import Nav from './components/Nav';

function App() {
  return (
    <div className="">
      
      <Nav />
      <div className="container">
          <notifications /> 
          <router-view/>
      </div>
    </div>
  );
}

export default App;
