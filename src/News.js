import React, { useEffect,useState} from 'react'
import NewsItem from './NewsItem'
import Loader from './Loader';
import PropTypes from 'prop-types'
import InfiniteScroll from 'react-infinite-scroll-component';


const News=(props)=> {
      const [articles,setArticles]=useState([]);
      const [loading,setLoading]=useState(false);
      const [page,setPage]=useState(1);
      const [totalResults,setTotalResults]=useState(0);
   
    useEffect(()=>{document.title=`${capitalizeFirstLetter(props.category)} News`
     // eslint-disable-next-line react-hooks/exhaustive-deps
     ;updatePage()},[] )

    const capitalizeFirstLetter=(string)=>{
      return string.charAt(0).toUpperCase() + string.slice(1);
    }

    const updatePage=async()=>{
      props.setProgress(20);
      let url=`https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
      setLoading(true);
      let data = await fetch(url);
      props.setProgress(50);
      let parsedData= await data.json();
      props.setProgress(70);
      setArticles(articles.concat(parsedData.articles));
      setLoading(false)
      setTotalResults(parsedData.totalResults)
      props.setProgress(100);
    }
  const handlePrevClick=async()=>{
     setPage(page-1);
    updatePage();
  }

  const handleNextClick=async()=>{
     setPage(page+1);
    updatePage();
  }

  const fetchMoreData=async()=>{
    setPage(page+1)
    let url=`https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
     
      let data = await fetch(url);
      let parsedData= await data.json();
     
      setArticles(articles.concat(parsedData.articles));
      setLoading(false);
  }
  

  
  
    return (
      <>
      
        <p className='text-center'>{loading && <Loader/>}</p>
      <h1 className='text-center'> Top Headlines</h1>
      <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={articles.length!==totalResults}
          loader={<Loader/>}>
            <div className='container'>
      <div className="row">
     {articles.map((element)=>{
        return <div className="col-md-4"  key={element.url}><NewsItem
         title={element.title}
          description={element.description} imageUrl={element.urlToImage}
           newsUrl={element.url}  author={element.author}  date={element.publishedAt} source={element.source.name}/>
           </div>
       })}
       </div>
       </div>
      </InfiniteScroll>
       <div className='d-flex justify-content-between'>
        <button type="button" className="btn btn-dark" onClick={handlePrevClick} disabled={page<=1}>&larr; Previous</button>
            <button type="button" className="btn btn-dark" onClick={handleNextClick} disabled={page+1>Math.ceil(totalResults/props.pageSize)}>Next &rarr;</button></div>
            </>

      )

    }
News.defaultProps={
  country:"in",               
  category:"general",
  pageSize:6
}
News.propTypes={
  country:PropTypes.string,
  category:PropTypes.string,
  pageSize:PropTypes.number,
  apiKey: PropTypes.string.isRequired
}
    
    export default News


