import {HashLink as Link } from "react-router-hash-link";
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';

// header with all links
export default function Header() {
  return (
    <div className="header">
      <Link to="/"><img className="headBird" src="/img/head_bird.jpg"/></Link>
      &nbsp;
      &nbsp;
      <Link className="headLink" to="/"> HOME </Link>
      &nbsp;
      &nbsp;
      <Link className="headLink" to="/#comics"> COMICS </Link>
      &nbsp;
      &nbsp;
      <Link className="headLink" to="/gallery"> ILLUSTRATIONS </Link>
      &nbsp;
      &nbsp;
      <Link className="headLink" to="/about"> ABOUT </Link>
      &nbsp;
      &nbsp;
      <Link className="headLink" to="/contact"> CONTACT </Link>
      &nbsp;
      &nbsp;
      <a className="headSocial" href = "https://www.instagram.com/navy.bird.art/" target="_blank"><InstagramIcon /></a>
      &nbsp;
      <a className="headSocial" href = "https://www.twitter.com/NavyBirdArt" target="_blank"><TwitterIcon /></a>
      &nbsp;
      <a className="headSocial" href = "https://www.inprnt.com/gallery/navybird/" target="_blank"><ShoppingBagIcon /></a>
    </div>
  )
}
