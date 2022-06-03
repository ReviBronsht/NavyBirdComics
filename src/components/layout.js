import { Outlet} from "react-router-dom";
import Header from "./head";
import Footer from "./foot";
import { useEffect, useRef} from "react";
import { height } from "@mui/system";

// create layout with header and footer and outlet in between 
export default function Layout() {
  const contentNoFooter = useRef(null);
  
   useEffect( () => {

      if(contentNoFooter.current){
          let height = contentNoFooter.current.offsetHeight;
      }

  }, [contentNoFooter]);
  return (
    <div className="pageContainer">
      <div className="contentNoFooter" style={{minHeight:"100vh"}} ref = {contentNoFooter}>
        <Header />
        <br/>
        <br/>
        <br/>
            <Outlet />
      <br/>
      </div>
      <div style={{position:"absolute",width:"100%",bottom:height}}><Footer/></div>
    </div>
  )
}
