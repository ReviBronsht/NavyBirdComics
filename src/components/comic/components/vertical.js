import DotLoader from "react-spinners/DotLoader";
import Comments from "./comments";

// verticle comic view with pages, toggle view, loading icon until last image loads, and comments
export default function Vertical({pages, isLoading, setIsLoading, changeView, currChapter, chapters, changeChapter, comments, addComment, backChapter}) {

  function handleLoad(index) {
    if (index === pages.length -1) {
      setIsLoading(false);
    }
  }


  return (
    <div>
      {pages.map((p, index) => <div style={{marginBottom:"-4px"}} key={p}><img className="comicPage" alt="comic graphic novel page" src={"https://drive.google.com/uc?export=view&id="+p} onLoad={()=> handleLoad(index)}/></div>)}
      <button className="back backnext" style={{position: "fixed",marginBottom:"-10%"}}onClick={() => changeView()}>⮀</button>
      <button className="back backnext" style={{position: "fixed", marginBottom:"-18%"}}><a href="#top">🠹</a></button>
      {currChapter != chapters.length - 1 ? <button className="next backnext" style={{position: "fixed",marginLeft:"18.5%"}} onClick={() => changeChapter(currChapter+1,0)}>🞂🞂</button> : ""}
      {currChapter !== 0 ? <button className="back backnext" style={{position: "fixed",marginLeft:"18.5%"}} onClick={() => backChapter()}>🞀🞀</button> : ""}
      <div className="imageLoading" style={{display: isLoading ? "block" : "none",top:"0.7%"}}><DotLoader color={"rgb(146, 174, 230)"}/></div>
      <br/>
      <Comments comments={comments} addComment={addComment} center={false} chapters={chapters} currChapter={currChapter}/>
    </div>
  )
}
