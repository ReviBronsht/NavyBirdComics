import DotLoader from "react-spinners/DotLoader";
import Comments from "./comments";

// slideshow comic view with pages, toggle view, loading icon until last image loads, and comments
export default function Slideshow({isLoading, setIsLoading,currPage, changePage, pages,changeView, currChapter, chapters, changeChapter ,comments, addComment, showComments, setShowComments,backChapter}) {
  
  
  return (
    <div>
      {showComments ? <Comments comments={comments} addComment={addComment} center={true} currChapter={currChapter} chapters={chapters}/> : <img className="comicPage" onLoad={() => setIsLoading(false)} alt="comic graphic novel page" src={"https://drive.google.com/uc?export=view&id="+pages[currPage]} />}
      <div className="imageLoading" style={{display: isLoading ? "block" : "none"}}><DotLoader color={"rgb(146, 174, 230)"}/></div>
      {currPage !== 0 ? <button className="back backnext" onClick={() => changePage(currPage-1)}>🞀</button> : ""}
      <button className="back backnext" style={{bottom:"40%"}}onClick={() => changeView()}>⭥</button>
      {currPage !== pages.length -1 ? <button className="next backnext" onClick={() => changePage(currPage+1)}>🞂</button> : ""}
      {currPage === pages.length -1 && !showComments ? <button className="next backnext" onClick={() => setShowComments(true) }>🞂</button> : ""}
      {currPage === pages.length -1 && showComments && currChapter !== chapters.length - 1 ? <button className="next backnext" onClick={() => changeChapter(currChapter+1,0)}>🞂🞂</button> : ""}
      {currPage === 0 && currChapter !== 0 ? <button className="back backnext" onClick={() => backChapter()}>🞀🞀</button> : ""}
    </div>
  )
}
