import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Loader from './Loader';
import PropTypes from 'prop-types'


export class News extends Component {
  static defaultProps={
    country:"in",
    category:"general",
    pageSize:6
  }
  static propTypes={
    country:PropTypes.string,
    category:PropTypes.string,
    pageSize:PropTypes.number
  }
    constructor(props){
        super(props);
        console.log("Hello I am a constructor!");
        this.state={
            articles:[],
            loading:false,
            page:1
        }
        document.title=`${this.capitalizeFirstLetter(this.props.category)} News`
    };

    async componentDidMount(){
      this.updatePage();
    }

    capitalizeFirstLetter=(string)=>{
      return string.charAt(0).toUpperCase() + string.slice(1);
    }

    updatePage=async()=>{
      let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=02a4034460ae449188b5c73e500fe65d&page=${this.state.page-1}&pageSize=${this.props.pageSize}`;
      this.setState({loading:true})
      let data = await fetch(url);
      let parsedData= await data.json();
      this.setState({
      articles: parsedData.articles,
      
      loading:false
      })
    }
  handlePrevClick=async()=>{
    this.setState({page: this.state.page-1})
    this.updatePage();
  }


  handleNextClick=async()=>{
     this.setState({page: this.state.page+1})
    this.updatePage();
  }

  render() {
    return (
      <div className="container my-2">
        <p className='text-center'>{this.state.loading && <Loader/>}</p>
      <h1 className='text-center'> Top Headlines</h1>
      <div className="row">
      {!this.state.loading && this.state.articles.map((element)=>{
        return <div className="col-md-4"  key={element.url}><NewsItem
         title={element.title}
          description={element.description} imageUrl={element.urlToImage}
           newsUrl={element.url}  author={element.author}  date={element.publishedAt} source={element.source.name}/>
        
           </div>
       })}
       </div>
       <div className='d-flex justify-content-between'>
        <button type="button" className="btn btn-dark" onClick={this.handlePrevClick} disabled={this.state.page<=1}>&larr; Previous</button>
            <button type="button" className="btn btn-dark" onClick={this.handleNextClick} disabled={this.state.page+1>Math.ceil(this.state.totalResults/this.props.pageSize)}>Next &rarr;</button></div>
      </div>
    )
  }
}

export default News
