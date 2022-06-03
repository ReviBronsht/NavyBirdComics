import './comic.css';
import { useState, useEffect } from "react"
import axios from 'axios';
import Slideshow from "./components/slideshow";
import Vertical from "./components/vertical";

// sets up comic page with navigation menu, toggle view, and pages
// gets data for comic by axios get request, gets current path to send path variables to server
export default function Comic() {
    const [isLoading, setIsLoading] = useState(true);
    const [comicName, setComicName] = useState("");
    const [chapters,setChapters] = useState([]);
    const [currChapter, setCurrChapter] = useState(0);
    const [pages, setPages] = useState([]);
    const [currPage, setCurrPage] = useState(0);
    const [lastPagePrevChap, setLastPagePrevChap] = useState(0);
    const [slideshowView, setSlideshowView] = useState(true);
    const [comments, setComments] = useState([]);
    const [showComments, setShowComments] = useState(false);
  
    var currPath = window.location.href;
    useEffect(() => {
        axios.get(currPath)
            .then(response => {
              var data = JSON.parse(response.headers.response)
                setComicName(data.name);
                setPages(data.pages);
                setCurrChapter(data.chapter);
                setChapters(data.chapters);
                setLastPagePrevChap(data.last_page_prev_chapter);
                var commentsTempArr = []
            for (let i = 0; i < data.comments_users.length; i++) {
              commentsTempArr.push({name:data.comments_users[i],comment:data.comments_comments[i]})
            }
            setComments(commentsTempArr);
            })
            .catch(error => {
                console.log(error)
            });
      },[])

    function changeChapter (chapter,page) {
      setShowComments(false);
      setCurrPage(page);
      setCurrChapter(chapter);
    }

    function backChapter () {
      changeChapter(currChapter-1,lastPagePrevChap);
      setShowComments(true);
    }

    function changePage (page) {
      setIsLoading(true);
      if (showComments) {
        setShowComments(false);
      }
      else {
        setCurrPage((page));
      }
    }

    function changeView() {
      setShowComments(false);
      setIsLoading(true);
      setSlideshowView(!slideshowView);
    }

    function addComment(name, comment) {
      var newComment = {"name":name, "comment":comment};
      setComments([newComment, ...comments]);
    }


  return (
    <div>
      <div className="comicHeader" name="top">
        <span className="comicName">{comicName.toUpperCase()}</span>
          &nbsp;
          <br className="comicPageHeadBreak"/>
          CHAPTERS <select value={chapters[currChapter]} onChange={(e) => changeChapter(chapters.indexOf(e.target.value),0)}>{chapters.map((c, index) => <option key={c} value={c}>{index+1 + " - " +c}</option>)}</select>
          &nbsp;
          {slideshowView ? <>PAGES <select value={pages[currPage]} onChange={(e) => changePage(pages.indexOf(e.target.value))}>{pages.map((p, index) => <option key={p} value={p}>{index+1}</option>)}</select> 
          &nbsp;
          {currPage !== 0 ? <button onClick={()=>changePage(currPage -1)}>{"<<"} Prev</button> : ""}
          {currPage === 0 && currChapter !== 0 ? <button onClick={()=>backChapter()}>{"<<"} Prev</button> : ""}
          &nbsp;
          {currPage !== pages.length -1 ? <button onClick={()=>changePage(currPage +1)}>Next {">>"}</button> : ""}</>: ""}
          {currPage === pages.length -1 && !showComments ? <button  onClick={() => setShowComments(true)}>Next {">>"}</button> : ""}
          {currPage === pages.length -1 && showComments && currChapter !== chapters.length - 1 ? <button  onClick={() => changeChapter(currChapter+1,0)}>Next {">>"}</button> : ""}
          &nbsp;
          <button onClick={() => changeView()}>{slideshowView? "SCROLL" : "PAGES"} VIEW</button>
      </div>
      <br/>
        {slideshowView ? <Slideshow isLoading={isLoading} setIsLoading={setIsLoading} currPage={currPage} changePage={changePage} pages={pages} changeView={changeView} currChapter={currChapter} chapters={chapters} changeChapter={changeChapter} comments={comments} addComment={addComment} showComments={showComments} setShowComments={setShowComments} backChapter={backChapter}/>: <Vertical pages={pages} isLoading={isLoading} setIsLoading={setIsLoading} changeView={changeView} currChapter={currChapter} chapters={chapters} changeChapter={changeChapter} comments={comments} addComment={addComment} backChapter={backChapter}/>}
    </div>
  )
}
