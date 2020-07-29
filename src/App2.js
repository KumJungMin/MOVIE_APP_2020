import React from 'react';
import axios from 'axios';
import Movies from './components/Movie';
import "./App.css";

class App extends React.Component{
  state = {
    isLoading : true,
    movies : []
  }
 

// json api를 사용하는 법(1) : axios.get("URL")
  getMoives=async()=>{
    const {
      data : {
        data : {movies}
      }
    } = await axios.get("https://yts-proxy.now.sh/list_movies.json?sort_by=rating");
    // 주소?파라미터(순차정렬파라미터)
    //axios에서 데이터를 가져오는데 시간이 걸릴 수 있다. 그러므로, axios를 getMoives함수에 넣고
    //컴포넌트가 mount됐을 때, 이 getMoive를 호출하게 하면 됨
    //그 다음, 자바스크립트에게 getMoives가 호출될 때까지 기다려야함을 aync와 await로 알려줌
    //비동기적인 작업(비순차적으로 일이 진행)(무슨 일이 끝나기를 기다리렴!)

    //moives.data.data.movies == {data : {data : {movies}}}
    // moives배열에 해당 데이터를 넣기{setState의 movies : axios의 movies}
    this.setState({movies : movies, isLoading : false})  
    //다 로딩되면 -> isLoading이 false이므로 we are ready가 뜸
  }

// components가 마운트될 때마다 실행  
  componentDidMount(){
    this.getMoives();   //컴포넌트가 mount됐을 때, 이 getMoive를 호출
  }



// fetch는 데이터를 가져오는 것, axios는 그런 fetch의 일부임
  render(){
    
    const {isLoading, movies} = this.state;  //this.state안에 있는 변수를 가져와서 간단하게 사용하는 법
    return (
      <section className="container">
        {isLoading 
        ? (
          <div className="loader">
            <span className="loader__text">Loading...</span>
          </div>
        )
        : (
          <div className="movies">
            {
              movies.map(movie => (
                <Movies 
                key={movie.id}  
                id={movie.id} 
                year={movie.year} 
                title={movie.title} 
                summary={movie.summary} 
                poster={movie.medium_cover_image}
                genres={movie.genres}
                />
                ))
            }
          </div>
        )
      
  
      }
      </section>
    );
    }
}

export default App;
