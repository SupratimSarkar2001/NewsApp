import React, { Component } from 'react'

export class NewsItem extends Component {
    render() {
        let  {title,description,imageUrl,newsUrl,date,author,source} = this.props;
        return (
            <div>
                <div className="card h" style={{height:'50rem',background:"#282c34",color:"White"}}>
                <span class="position-absolute top-0  translate-middle badge rounded-pill bg-danger" style={{left:'20%',zIndex:'1'}}>
                {source}
                </span>
                <img src={!imageUrl?"https://english.cdn.zeenews.com/sites/default/files/2021/08/27/965039-galaxyreuters.png":imageUrl} className="card-img-top" alt="Your browser isn't able to load this !"/>
                <div className="card-body">
                    <h5 className="card-title">{title}</h5>
                    <p className="card-text">{description}</p>
                    <p className="card-text"><small className="text-muted">~ {!author?"Unknown":author} on {new Date(date).toUTCString()} </small></p>
                    <a rel="noreferrer" href={newsUrl} target="_blank" className="btn btn-sm btn-success"><strong>Read more</strong></a>
                </div>
                </div>
            </div>
        )
    }
}

export default NewsItem
