import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Article from './components/Article';
import CreateArticle from './components/CreateArticle';


function App() {
  return (
    <div className='App'>
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<Article/>}></Route>
        <Route path='/create' element={<CreateArticle />}></Route>
      </Routes>
      </BrowserRouter>

    </div>
    
  );
}

export default App;
