import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import "../App.css"
export class News extends Component {

    static defaultProps={
        country:"in",
        pageSize:'8',
        category:'general'

    }
    static propTypes={
        country: PropTypes.string,
        pageSize: PropTypes.number,
        category: PropTypes.string,

    }
      constructor(props){
        super(props);
        this.state={
            articles:[],
            loading:false,
            page:1
        }
        document.title=`${this.props.category} - MonkNews`
      }

      async componentDidMount(){
            this.props.setProgress(10)
            let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=90523bf5b2db4eb18da27ce65890b568&page=1&pageSize=${this.props.pageSize}`
            this.setState({loading:true})
            let data= await fetch(url)
            this.props.setProgress(30)
            let perseData= await data.json()
            this.props.setProgress(70)
            this.setState({articles : perseData.articles, totalResults: perseData.totalResults,loading:false })
            this.props.setProgress(100)
      }
      handelPrevClick=async ()=>{
        this.props.setProgress(10)
        let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=90523bf5b2db4eb18da27ce65890b568&page=${this.state.page-1}&pageSize=${this.props.pageSize}`
        this.setState({loading:true})
        let data= await fetch(url)
        let perseData= await data.json()
        
        this.setState({
            page:this.state.page-1,
            articles : perseData.articles,
            loading:false})
            this.props.setProgress(100)
      }
      handelNextClick=async ()=>{
         if(this.state.page+1 > Math.ceil(this.state.totalResults/this.props.pageSize)) {

         }
         else{
            this.props.setProgress(10) 
            let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=90523bf5b2db4eb18da27ce65890b568&page=${this.state.page+1}&pageSize=${this.props.pageSize}`
            this.setState({loading:true})
            let data= await fetch(url)
            let perseData= await data.json()
            
            this.setState({
                page:this.state.page+1,
                articles : perseData.articles,
                loading:false})
            this.props.setProgress(100)

         }

      }
    render() {
        return (
            <>
            <div className="container my-3 text-center" style={{background:"black",color:"White",fontWeight:100}}>
               <h1 className='Heading' style={{margin:'35px 0px',marginTop:'56px'}}><strong>Monk's Top-HeadLines from {this.props.category}</strong></h1>
                {this.state.loading && <Spinner/>}
                <div className="row">
                {this.state.articles.map((element)=>{
                   return <div className="col-md-4 my-2" key={element.url}>
                    <NewsItem title={element.title?element.title:" "} description={element.description? element.description:""} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name}/>
                    </div>  
                })}
                </div>
               
            </div>
            <div className="container d-flex justify-content-between">
            <button disabled={this.state.page<=1} type="button"  className="btn btn-dark" onClick={this.handelPrevClick}>&larr; Privious</button>
            <button disabled={this.state.page+1 > Math.ceil(this.state.totalResults/this.props.pageSize)} type="button" className="btn btn-dark" onClick={this.handelNextClick}>Next &rarr;</button>
            </div>
            </>
        )
    }
}

export default News
