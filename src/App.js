import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from './components/layout';
import Home from './components/home/home';
import Gallery from './components/gallery/gallery';
import Comic from './components/comic/comic';
import About from './components/about/about';
import Contact from './components/contact/contact';
import NotFound from './components/404/404';

// sets up browser router with layout and home component as default
function App() {
  return (
    <>
        <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="comic/:name/:chapter" element={<Comic />} />
            <Route path="gallery" element={<Gallery />} />
            <Route path="about" element={<About />} />
            <Route path="contact" element={<Contact />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
