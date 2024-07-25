import React, { Component } from "react";

export default class NewsItem extends Component {
  render() {
    let {title,description,imageUrl,newsUrl }= this.props;
    return (
      <div>
        <div className="my-3">
        <div className="card" style={{ width: "18rem" }}>
          <img src={imageUrl?"https://c.ndtvimg.com/2024-07/pmfj4fd8_deepika-_625x300_23_July_24.jpeg":imageUrl} className="card-img-top" alt="..." />
          <div className="card-body">
            <h5 className="card-title">{title}</h5>
            <p className="card-text">
            {description}
            </p>
            <a rel="noreferrer" href={newsUrl} target="_blank" className="btno-dark">
              Go somewhere
            </a>
          </div>
        </div>
        </div>
      </div>
    );
  }
}