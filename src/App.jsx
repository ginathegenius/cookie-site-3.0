import './App.css'
import Routing from './Routing';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function App() {
  return (
    <div className="App">
      <nav className="navbar navbar-dark bg-dark custom-navbar">
        <div className="container-fluid">
          <a className="navbar-brand" href="/">Cookie Catalog</a>
        </div>
      </nav>
      <Routing />
    </div>
  );
}
