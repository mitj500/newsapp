import React, { Component } from "react";
import NewsItem from "./NewsItem";

export default class News extends Component {

constructor(){
    super();
    console.log("Hello I am a constructor from News component");
    this.state = {
        articles: this.articles,
        loading: false
    }
}

 async componentDidMount(){
  let url= "https://newsapi.org/v2/top-headlines?country=In&apiKey=1a5fa164f12d4375a3d64fbc7ce952f7"
  let data =  await fetch(url);
  let parsedData = await data.json();
  console.log(parsedData);
this.setState({articles:parsedData.articles})
}
  render() {
    return (
      <div className="container my-3">
        <h2>Latest News</h2>
        <div className="row">
        {this.state.articles.map((element)=>{
              return <div className="col md-3"  key= {element.url}>
             <NewsItem title={element.title?element.title.slice(0,45):""} description={element.description?element.description.slice(0,88):""} imageUrl={element.urlToImage} newsUrl={element.url}/>
             </div>
        })}
          </div>
        </div>
      
    );
  }
}