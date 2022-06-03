import './home.css';
import { useState, useEffect } from "react"
import axios from 'axios'
import {Link } from "react-router-dom";
import Mailing from './components/mailing';
import Comics from './components/comics';
import GalleryLink from './components/galleryLink';


// sets up homepage with box to read the latest comic, mailing, comics, and gallery link component
// gets data for homepage by axios get request
export default function Home() {
  const [latestComic, setLatestComic] = useState("");
  const [latestText, setLatestText] = useState("");
  const [latestImg, setLatestImg] = useState("");
  const [latestOverlay, setLatestOverlay] = useState("");
  const [mTitle, setMTitle] = useState("");
  const [mText, setMText] = useState("");
  const [mImg, setMImg] = useState("");
  const [comics, setComics] = useState([]);
  const [images, setImages] = useState([]);

  useEffect(() => {
    axios.get('/homepage')
        .then(response => {
            setLatestComic(response.data.latest_name);
            setLatestText(response.data.latest_text);
            setLatestImg(response.data.latest_img);
            setLatestOverlay(response.data.latest_overlay);
            setMTitle(response.data.mail_title);
            setMText(response.data.mail_text);
            setMImg(response.data.mail_img);
            var comicsTempArr = []
            for (let i = 0; i < response.data.comics_names.length; i++) {
              comicsTempArr.push({title:response.data.comics_names[i],cover:response.data.comics_covers[i],description:response.data.comics_descriptions[i]})
            }
            setComics(comicsTempArr);
            setImages(response.data.gallery_imgs);
            var hash = window.location.hash;
            if (hash) {
              var element = document.querySelector(hash);
              if (element) {
                element.scrollIntoView();
              }
            }
        })
        .catch(error => {
            console.log(error)
        });
  },[])


  return (
    <div className='comicContainer'>
      <h1 style={{margin:"0px"}}>Navy Bird • Art & Comics</h1>
      <h4>⭐Welcome to my Wonderland⭐</h4>
      <div  className="latestImg" style={{
        backgroundImage: `url("https://drive.google.com/uc?export=view&id=`+latestImg+`")`,
        backgroundPosition: "center",
        backgroundSize: "cover",
        boxShadow:`inset 0 0 0 2000px rgba(`+latestOverlay+`, 0.3)`
        }}>
          <Link to={"/comic/"+latestComic+"/1"}><div className='latestbtn'>{latestText} ⇢</div></Link>
      </div>
      <hr className="homeHr" id="mailing"/>
      <Mailing mTitle={mTitle} mText={mText} mImg={mImg}/>
      <hr className="homeHr" id="comics"/>
      <Comics comics={comics}/>
      <hr className="homeHr"/>
      <GalleryLink images={images} />
    </div>
  )
}
