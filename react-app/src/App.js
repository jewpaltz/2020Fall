import logo from './logo.svg';
import 'bulma';
import './App.css';

function App() {
  return (
    <div class="">
      
      <nav />
      <div class="container">
          <img src={logo} className="App-logo" alt="logo" />
          <notifications /> 
          <router-view/>
      </div>
    </div>
  );
}

export default App;
