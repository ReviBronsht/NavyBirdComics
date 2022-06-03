import {Link } from "react-router-dom"
import Carousel from  'react-elastic-carousel';
import { useState } from "react";
// comics menu with carousel
export default function Comics({comics}) {
  var [width, setWidth] = useState(window.innerWidth);

  return (
    <div>
      <h2>Comics</h2>
         <div className="carouselWrapper">
      <Carousel itemsToShow={width < 480 ? 1: 2}>
        {comics.map(comic =>
            <div key={comic.title} className="carouselItem">
            <img alt={comic.title} src={"https://drive.google.com/uc?export=view&id="+comic.cover}/>
            <div className="comicTitle">{comic.title}
            </div>
            
            <div className="comicOver">
                <h3 className="insideTitle">{comic.title}</h3>
                {comic.description}
                <br/>
                <Link to={"/comic/"+comic.title+"/1"}><button>Read me</button></Link>
            </div>
            </div>)}
      </Carousel>
    </div>
    </div>
  )
}
