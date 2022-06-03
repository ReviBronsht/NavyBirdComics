import './gallery.css';
import { useState, useEffect } from "react"
import CloseIcon from '@mui/icons-material/Close';
import DotLoader from "react-spinners/DotLoader";
import axios from 'axios';

// sets up gallery with preview of all gallery images, can go into full image by full image block's display status, with loading icon until the last image loads
// gets data for gallery by axios get request
export default function Gallery() {
  const [images, setImages] = useState([]);
  const [isImgDisplayed, setIsImgDisplayed] = useState(false);
  const [currImage, setCurrImage] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios.get('/gallery')
        .then(response => {
          var data = JSON.parse(response.headers.response)
          setImages(data.images);
        })
        .catch(error => {
            console.log(error)
        });
      },[])

  function handleLoad(index) {
    if (index === images.length -1) {
      setIsLoading(false);
    }
  }

  function displayImage(image) {
    setCurrImage(image);
    setIsImgDisplayed(true);
  }

  function closeImage(){
    setIsImgDisplayed(false);
    setCurrImage("");
  }
  return (
    <div>
      <h2>Illustration Gallery</h2>
      <br/>
      <div className={isImgDisplayed ? "display open" : "display"}>
      <img  alt="current image" src={currImage !== "" ? "https://drive.google.com/uc?export=view&id="+currImage : ""} />
      <CloseIcon onClick={() => closeImage()}/>
      </div>
      <div className="imageLoading" style={{display: isLoading ? "block" : "none",top:"5%"}}><DotLoader color={"rgb(146, 174, 230)"}/></div>
      <div className="gallery">
      {images.map((image, index) => <div className="images" key={index}  onLoad={()=> handleLoad(index)} onClick={()=> displayImage(image)}>
        <img  alt="Illustration gallery digital art image" style={{width:"100%"}} src={"https://drive.google.com/uc?export=view&id="+image} />
        </div>)}
      </div>
    </div>
  )
}
