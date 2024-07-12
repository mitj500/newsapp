import React, { Component } from "react";
import NewsItem from "./NewsItem";

export default class News extends Component {
  render() {
    return (
      <div className="container my-3">
        <h2>Latest News</h2>
        <div className="row">
          <div className="col md-3">
          <NewsItem title="hello" description="you are new here" />
          </div>
          <div className="col md-3">
          <NewsItem title="hello" description="you are new here" />
          </div>
          <div className="col md-3">
          <NewsItem title="hello" description="you are new here" />
          </div>
          <div className="col md-3">
          <NewsItem title="hello" description="you are new here" />
          </div>
 
       
        </div>
       
 
      </div>
    );
  }
}
