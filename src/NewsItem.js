import React, { Component } from 'react'
export class NewsItem extends Component {
  render() {
    let {title,description,imageUrl,newsUrl,author,date,source}=this.props;
    return (
      <div>

<div className="card" style={{ width: '18rem' }}>
  <img className="card-img-top" src={!imageUrl?"https://i.seadn.io/gae/7h71v6-9YN9eQBeo74sA7JH9_GbInGT2LpzQ1fM_OTzQKaJu-RyhU62LgTtTnhO44tolNbLnGL4MV7DHt0ltTIOqZHb33DAoJ5uWBQ?auto=format&dpr=1&w=1000":imageUrl} alt=""/>
  <div className="card-body">
  <span className="position-absolute top-0  translate-middle badge rounded-pill bg-success" style={{left:'51%', zIndex:'1'}}>
  {source}</span>  {/* bootstrap classes were overriding my style tag: removed start-100*/}
    <h5 className="card-title">{title}</h5>
    <p className="card-text">{description}</p>
    <p className="card-text"><small className="text-muted">By {!author?"unknown":author} on {new Date(date).toGMTString()}</small></p>
  
    <a href={newsUrl} target="_blank" rel="noopener noreferrer" className="btn btn-dark">Read More</a>
  </div>
</div>

      </div>
    )
  }
}

export default NewsItem
