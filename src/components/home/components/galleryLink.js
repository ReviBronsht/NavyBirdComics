import {HashLink as Link } from "react-router-hash-link";

// sets gallery link component via mapping all preview images
export default function GalleryLink({images}) {
  return (
      <div>
        <h2>Illustrations</h2>
        <Link to="/gallery">
    <div className="galleryLink">
       {images.map((image, index) => 
        <img key={index} className="galleryLinkImg" alt={index} src={"https://drive.google.com/uc?export=view&id="+image} />)}
    </div>
</Link>
    </div>
  )
}
