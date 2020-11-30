
import 'bulma';
import './App.css';
import Nav from './components/Nav';

function App() {
  return (
    <div class="">
      
      <Nav />
      <div class="container">
          <notifications /> 
          <router-view/>
      </div>
    </div>
  );
}

export default App;
