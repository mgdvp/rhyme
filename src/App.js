import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './Home'
import Search from './Search'
import About from './About'
import Album from './Album'

function App() {
  return (
    <Routes>
        <Route path="/" element={<Home />} />
        <Route path="search" element={<Search />} />
        <Route path="about" element={<About />} />
        <Route path="album/:id" element={<Album />} />
    </Routes>
  );
}

export default App;
