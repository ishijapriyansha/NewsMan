import React, { useState} from 'react'
import Navbar from './Navbar';
import News from './News';
import {Routes,Route,BrowserRouter} from "react-router-dom"
import LoadingBar from 'react-top-loading-bar';
const App =(props)=> {
  const [progress,setProgress]=useState(0)
  const apiKey=process.env.REACT_APP_API_KEY;



    return (
      <BrowserRouter>
     
       <LoadingBar
        color='#f11946'
        height={4}
        progress={progress}
        onLoaderFinished={() => setProgress(0)
        }
      />
        <Navbar/> 
      <Routes>
       <Route exact path="/" element={<News apiKey={apiKey} setProgress={setProgress} key="general" pageSize={6} country={"us"} category={"general"}/>}></Route>
       <Route exact path="/business" element={<News apiKey={apiKey} setProgress={setProgress}  key="business" pageSize={6} country={"us"} category={"business"}/>}></Route>
       <Route exact path="/entertainment"  element={<News apiKey={apiKey} setProgress={setProgress} key="entertainment" pageSize={6} country={"us"} category={"entertainment"}/>}/>
       <Route exact path="/health"  element={<News apiKey={apiKey} setProgress={setProgress}  key="health" pageSize={6} country={"us"} category={"health"}/>}/>
       <Route exact path="/science"  element={<News apiKey={apiKey} setProgress={setProgress} key="science"pageSize={6} country={"us"} category={"science"}/>}/>
       <Route exact path="/sports"  element={<News apiKey={apiKey} setProgress={setProgress} key="sports"pageSize={6} country={"us"} category={"sports"}/>}/>
       <Route exact path="/technology"  element={<News apiKey={apiKey} setProgress={setProgress} key="technology"pageSize={6} country={"us"} category={"technology"}/>}/>
      </Routes>
  
      </BrowserRouter>
    )
  }

export default App;