import React, { useEffect, useState } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

const News = (props) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const sleep = (ms) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
  };

  const updateNews = async (retries = 3, delay = 1000) => {
    props.setProgress(10);
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${process.env.REACT_APP_NEWS_API_KEY}&page=${page}&pageSize=${props.pageSize}`;
    setLoading(true);
    try {
      let data = await fetch(url);
      if (!data.ok) {
        if (data.status === 429 && retries > 0) {
          console.log(`Retrying... attempts left: ${retries}`);
          await sleep(delay);
          return updateNews(retries - 1, delay * 2); // Exponential backoff
        }
        throw new Error(`Error: ${data.status}`);
      }
      props.setProgress(30);
      let parsedData = await data.json();
      props.setProgress(70);
      setArticles(parsedData.articles);
      setTotalResults(parsedData.totalResults);
      setLoading(false);
      console.log(parsedData); // Check the response data
    } catch (error) {
      console.error("Failed to fetch articles", error);
      setLoading(false);
    }
    props.setProgress(100);
  };

  useEffect(() => {
    updateNews();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchMoreData = async (retries = 3, delay = 1000) => {
    setPage(page + 1);
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${process.env.REACT_APP_NEWS_API_KEY}&page=${page + 1}&pageSize=${props.pageSize}`;
    try {
      let data = await fetch(url);
      if (!data.ok) {
        if (data.status === 429 && retries > 0) {
          console.log(`Retrying... attempts left: ${retries}`);
          await sleep(delay);
          return updateNews(retries - 1, delay * 2); // Exponential backoff
        }
        throw new Error(`Error: ${data.status}`);
      }
      let parsedData = await data.json();
      setArticles(articles.concat(parsedData.articles));
      setTotalResults(parsedData.totalResults);
    } catch (error) {
      console.error("Failed to fetch articles", error);
    }
  };

  return (
    <div className="container my-3">
        <h1 className="text-center" style={{ margin: "35px 0px" ,marginTop:'90px'}}>
        NewsMonkey - Top {capitalizeFirstLetter(props.category)} Headlines
      </h1>
      {loading && <Spinner />}
      <InfiniteScroll
        dataLength={articles.length}
        next={fetchMoreData}
        hasMore={articles.length !== totalResults} // Correctly reference totalResults
        loader={<Spinner />}
      >
        <div className="container">
          <div className="container">
            <div className="row">
              {!loading && articles && articles.length > 0
                ? articles.map((element) => (
                    <div className="col-md-4" key={element.url}>
                      <NewsItem
                        title={element.title ? element.title : ""}
                        description={
                          element.description ? element.description : ""
                        }
                        imageUrl={element.urlToImage}
                        newsUrl={element.url}
                        author={element.author}
                        date={element.publishedAt}
                        source={element.source.name}
                      />
                    </div>
                  ))
                : !loading && <div>No articles found</div>}
            </div>
          </div>
        </div>
      </InfiniteScroll>
    </div>
  );
};

News.defaultProps = {
  country: "in",
  pageSize: 8,
  category: "general",
};

News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string,
  setProgress: PropTypes.func.isRequired,
};

export default News;









// import React, { Component } from "react";
// import NewsItem from "./NewsItem";
// import Spinner from "./Spinner";
// import PropTypes from "prop-types";
// import InfiniteScroll from "react-infinite-scroll-component";

// export class News extends Component {
//   static defaultProps = {
//     country: "in",
//     pageSize: 8,
//     category: "general",
//   };

//   static propTypes = {
//     country: PropTypes.string,
//     pageSize: PropTypes.number,
//     category: PropTypes.string,
//   };

//   capitalizeFirstLetter = (string) => {
//     return string.charAt(0).toUpperCase() + string.slice(1);
//   };

//   constructor(props) {
//     super(props);
//     this.state = {
//       articles: [],
//       loading: true,
//       page: 1,
//       error: null,
//       totalResults: 0,
//     };
//     document.title = `${this.capitalizeFirstLetter(
//       props.category
//     )} - NewsMonkey`;
//   }

//   sleep = (ms) => {
//     return new Promise((resolve) => setTimeout(resolve, ms));
//   };

//   async componentDidMount() {
//     this.updateNews(); // Fetch initial articles when component mounts
//   }

//   async updateNews(retries = 3, delay = 1000) {
//     props.setProgress(10);
//     const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${process.env.REACT_APP_NEWS_API_KEY}&page=${this.state.page}&pageSize=${props.pageSize}`;
//     this.setState({ loading: true, error: null });
//     try {
//       let data = await fetch(url);
//       if (!data.ok) {
//         if (data.status === 429 && retries > 0) {
//           console.log(`Retrying... attempts left: ${retries}`);
//           await this.sleep(delay);
//           return this.updateNews(retries - 1, delay * 2); // Exponential backoff
//         }
//         throw new Error(`Error: ${data.status}`);
//       }
//       let parsedData = await data.json();
//       props.setProgress(30);
//       this.setState({
//         articles: parsedData.articles || [], // Ensure articles is always an array
//         totalResults: parsedData.totalResults,
//         loading: false,
//       });
//       console.log(parsedData); // Check the response data
//     } catch (error) {
//       console.error("Failed to fetch articles", error);
//       this.setState({ loading: false, error: error.message });
      
//     }
//     props.setProgress(100);
//   }

//   fetchMoreData = async (retries = 3, delay = 1000) => {
//     this.setState({ page: this.state.page + 1 });
//     const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${process.env.REACT_APP_NEWS_API_KEY}&page=${this.state.page + 1}&pageSize=${props.pageSize}`;
//     // this.setState({ loading: true, error: null });
//     try {
//       let data = await fetch(url);
//       if (!data.ok) {
//         if (data.status === 429 && retries > 0) {
//           console.log(`Retrying... attempts left: ${retries}`);
//           await this.sleep(delay);
//           return this.updateNews(retries - 1, delay * 2); // Exponential backoff
//         }
//         throw new Error(`Error: ${data.status}`);
//       }
//       let parsedData = await data.json();
//       this.setState({
//         articles: this.state.articles.concat(parsedData.articles), // Correct the typo
//         totalResults: parsedData.totalResults,
//         loading: false,
//       });
//       console.log(parsedData); // Check the response data
//     } catch (error) {
//       console.error("Failed to fetch articles", error);
//       this.setState({ loading: false, error: error.message });
//     }
//   };

//   render() {
//     const { articles, loading, error } = this.state;

//     return (
//       <div className="container my-3">
//         <h1 className="text-center" style={{ margin: "35px 0px" }}>
//           NewsMonkey - Top {this.capitalizeFirstLetter(props.category)}{" "}
//           Headlines
//         </h1>
//         {this.state.loading && <Spinner/>}
//         <InfiniteScroll
//           dataLength={this.state.articles.length}
//           next={this.fetchMoreData}
//           hasMore={this.state.articles.length !== this.state.totalResults} // Correctly reference totalResults
//           loader={<Spinner />}
//         ><div className="container">
//           <div className="container">
//             {error && <div>Error: {error}</div>}
//             <div className="row">
//               {!loading && articles && articles.length > 0
//                 ? articles.map((element) => (
//                     <div className="col-md-4" key={element.url}>
//                       <NewsItem
//                         title={element.title ? element.title : ""}
//                         description={
//                           element.description ? element.description : ""
//                         }
//                         imageUrl={element.urlToImage}
//                         newsUrl={element.url}
//                         author={element.author}
//                         date={element.publishedAt}
//                         source={element.source.name}
//                       />
//                     </div>
//                   ))
//                 : !loading && !error && <div>No articles found</div>}
//             </div>
//           </div>
//           </div>
//         </InfiniteScroll>
//       </div>
//     );
//   }
// }

// export default News;
