# 1. REACT Fandamental method

## 1) props의 사용

### (1) 재사용가능한 문법

- `html`을 리턴하는 `Food` 함수를 정의한다.

- `Food` 컴포넌트는 `fav` 값을 받아 원하는 값을 리턴한다.

- `fav` 속성값에 따라, 다른 결과값이 나오므로 재사용 가능한 문법이다. 

``` JS 

import React from 'react';

function Food( {fav} ){
  return <h1> I like {fav} </h1>
}

function App(){
  return(
    <div>
      <Food fav="raman" />
    </div>
  );
}

```

<br/>

### (2) map 함수

- `REACT`에서 `{}`를 사용하여 `JS` 문법 사용이 가능하다.

- 만약, 반복적인 작업을 하는 경우, `map`함수를 사용하는 게 좋다.

- 아래 코드는 `map` 함수의 사용법이다.


```JS

animals = ["cat", "dog", "lion"];

animals.map((animal)=>{
  return animal + "'s";
})

// ["cat's", "dog's", "lion's"]

```

- `map`함수를 사용하여 여러 컴포넌트를 만들 수 있다.

- 이때, 각각의 컴포넌트에 고유한 값이 필요하다.(`key`값 지정 필수)

>Each child in a list should have a unique "key" prop.

```JS

const FoodLike = [
  {id:1, name:'dd', age:'12', rating : 4},
  {id:2, name:'daad', age:'1aa2', rating : 3.3}];
// 배열안들의 값들에 유일성을 유지하기 위해 id값을 부여
// food컴포넌트에 key속성값에 해당 id값을 부여해야함


function App() {
  return (
    <div className="App">
      {FoodLike.map(food => 
        <Food key={food.id} name={food.name} age={food.age} rating={food.rating}/>
      )}
    </div>
  );
}

```


<br/>

### (3) prop-types의 사용

- prop-types는 전달받은 `props`가, 내가 원하는 `props`인지 확인해주는 역할을 한다.

- 만약 잘못된 `props`값을 넘겼을 때, 해당 부분에 대한 경고를 띄워준다.

- 설치 : `npm i prop-types`

- `prop-types`를 불러올 때는 무조건 `propTypes`라고 명명해야한다. (아니면 에러 생김)

```JS

import React from 'react';
import propTypes from 'prop-types';   

function Food(props){
return <h1>I like {props.name}, {props.age}, {props.rating}</h1>
}

// 내가 불러오고자 하는 props에 대한 설명을 적음(props check)
// 만약 여기서 적은 타입과, 내가 입력한 값의 타입이 다르면 console에서 알려줌
Food.propTypes = {  //무조건 propTypes라고 명명
  name : propTypes.string.isRequired,
  age : propTypes.string.isRequired,
  rating : propTypes.number.isRequired
};

 function Food({name, age}){
   return <h1>I like {name}, {age}</h1>
   }
// img태그에서는 alt를 꼭 부여해야함 -> 시각장애인을 위한 것
```

<br/><br/>

## 2) state의 사용

### (1) state를 다루는 법

- `state`는 우리가 동적데이터를 작업할 때 만들어지는, 변하는, 실제로 존재하지 않는 데이터이다.

- `react`에서는 `props`값에 직접 접근하여 값에 변화를 주지 못하게 한다.

- 그러므로 우리는 `state`에 바꾸고 싶은 data를 넣어서 사용한다. 

>Do not mutate state directly. Use setState().

<br/>

- 아래 코드는 `state`를 쓰기 위해 `class component`를 사용한 예시이다.

>`function component`는 뭔가를 `return`하여 화면에 띄운다. <br/> `class component`는 `react component`로부터 확장되어서 화면에 표시된다. <br/> 그래서 `react`는 `class component`의 `render method`를 자동실행한다.


```js

import React from 'react';

class App extends React.Component{  //많은 특성을 가진 리액트 컴포넌트를 상속해서 사용하는 클래스 컴포넌트
  state = {
    count : 0  
  };
  
  
  //객체|컴포넌트의 데이터를 넣을 공간|가변적 데이터
  // state를 set할 때, react에서 외부의 상태에 의존하지 않는 좋은 방법
  //current라고 하면 state안에 있는 count값이라고 유추해서 가져와줌
  add = () => {
    this.setState(current=>({count : current.count+1}));
  }

  // 외부의 상태에 의존하는 좋지 않은 방법
  minus =()=> {
    this.setState({count : this.state.count-1});
  }


  render(){
  return <div>
    <h1>The number is {this.state.count}</h1>
    <button onClick={this.add}>ADD</button>
    <button onClick={this.minus}>MINUS</button>
    //onClick에 함수를 넣을 때, this.add()를 하면 즉시 나타나게 하는 것
    //onClick에 함수를 넣을 때, this.add을 하면 click했을 때만 일어나게 하는 것
  </div>;
  }
}

export default App;

```

<br/>


## 3) life cycle method

-`life cycle method`는 `react`가 컴포넌트를 생성하고 없애는 방법이다.

-기본 순서: `constructor 호출` -> `render 호출`->`ComponentDidMount 호출` 

-업데이트시 : `해당 component호출`->`render호출`->`componentDidUpdate 호출`



### (1) componentDidMount()

- mount는 발생,생성,진행을 말한다.


### (2) componentDidUpdate()

- 값이 변경될 때 호출하는 함수이다.

```js
import React from 'react';

class App extends React.Component{
  state = {
    isLoading : true
    // application이 mount하자마자 isLoading은 true임
  }
  
  componentDidMount(){
    // setTimeout은 딜레이 함수
    setTimeout(()=>{
      this.setState({isLoading : false});
    }, 6000);     //마운트후 -> 6초뒤에 isLoading값을 false로 변경
  }

  render(){
    // 매번 state을 불러올때, this.state을 해야하는데 이 반복을 줄이기위해 아래와 같은 코드 사용
    const {isLoading} = this.state;
  return <div>
    {isLoading ? "Loading" : "We are ready"}
  </div>;
  }
}

export default App;

```

<br/>

## 4) axios 

### (1) axios란

- fetch는 데이터를 가져오는 것으로 axios는 그런 fetch의 일부이다.

- 설치 : `npm i axios`


### (2) axios 사용법

- `axios`를 `import`한다.

- `isLoading`은 `true`이지만, 특정값이 완전 로딩되면 `false`가 되는 역할을 한다.

- `movies`는 `api`에서 가져온 값을 저장하는 객체이다.

```js
import React from 'react';
import axios from 'axios';
import Movies from './components/Movie';
import "./App.css";

// isLoading은 처음에는 true임
class App extends React.Component{
  state = {
    isLoading : true,
    movies : []
  }

```

- `axios.get("URL")`을 해서 `json api`를 가져온다.

- `api`의 `URL`은 `주소?파라미터(순차정렬파라미터)`이므로, `영화api`를 평점별(`rating`)로 가져올 때는 `주소?sort_by=rating`을 사용한다.

- `axios`에서 데이터를 가져오는데 시간이 걸릴 수 있으므로 비동기 작업을 한다. (비순차적으로 일이 진행 & 무슨 일이 끝나기를 기다리렴!)

>`axios`를 `getMoives`함수에 넣는다. <br/> 컴포넌트가 `mount`됐을 때, `getMoives`를 호출한다. <br/> `js`에게 `getMoives`가 호출될 때까지 기다려야함을 `async`와 `await`로 알려줌



```js

  getMoives=async()=>{  //getMoives함수는 무언갈 기다리고 실행되어야해! 근데, 함수 내부에서 기다리기 무언가는 await로 알림
    //moives.data.data.movies == {data : {data : {movies}}}
    const {
      data : {
        data : {movies}
      }
    } = await axios.get("https://yts-proxy.now.sh/list_movies.json?sort_by=rating");
    
    
    // moives배열에 해당 데이터를 넣기{setState의 movies : axios의 movies}
    this.setState({movies : movies, isLoading : false})  
    //다 로딩되면 -> isLoading이 false이므로 we are ready가 뜸
  }

// components가 마운트될 때마다 실행  
  componentDidMount(){
    this.getMoives();   //컴포넌트가 mount됐을 때, 이 getMoive를 호출
  }

```



```js

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

```











<br/><br/>

# 2. Make Movie-api react-App  

- App.js
- src
  - components    
    - Movie.js
    - Navigation.js

  - routes
    - About.js
    - Detail.js
    - Home.js


## 1) App.js

- `HashRouter`는 `raect-router-dom`의 기능으로, 라우터 기능을 한다.

- `HashRouter`안에는 `Route`가 있어야 한다.

- `HashRouter`는 깃업 페이지 업로드할 때 더 편하다.

- `Router`밖에서는 `link`를 쓸 수 없다.

- `Route`컴포넌트에서 `exact={true}`를 한다.
>exact를 하지 않으면 /가 포함되는 모든 주소의 것들이 로드됨 그래서 exact을 해야함

```js
import React from "react";
import { HashRouter, Route } from "react-router-dom";
import Home from "./routes/Home";
import About from "./routes/About";
import Detail from "./routes/Detail";
import Navigation from "./components/Navigation";
import "./App.css";

function App() {
  return (
    <HashRouter>     
      <Navigation />  
      <Route path="/" exact={true} component={Home} />  
      <Route path="/about" component={About} />
      {/* path는 url   컴포넌트= 경로*/}
      {/* path는 about과 같을 필요가 없음. 그냥 주소에서 나타나는 url일 뿐 */}
      <Route path="/movie/:id" component={Detail} />
    </HashRouter>
  );
}

export default App;

```

<br/>

## 2) src

### (1) component > Movie.js

- api에서 가져온 `Movie`값을 `props`로 받아, `render`하는 역할을 한다.(화면에 띄워줌)

- `Link`컴포넌트에서 `pathname`을 사용하면, 이동시 `pathname`주소로 `state`값을 보낼 수 있다.

- `<link src="" />`를 하면, 페이지가 강제로 새로고침하고 리액트가 죽는다.

```js

// 실제 movies값을 render하자
import React from 'react';
import PropTypes from 'prop-types';
import "./Movie.css";
import { Link } from "react-router-dom";

function Movie({id, year, title, summary, poster, genres}){
return(
    <div className="movies__movie">
        <Link
        to={{
          pathname: `/movie/${id}`,    //이동할 때, pathname주소로 state값을 보낼 수 있음
          state: {
            year,
            title,
            summary,
            poster,
            genres
          }
        }}
      >
         <img src={poster} alt={title} title={title} />
        <div className="movie__data">
            <h3 className="movie__title">{title}</h3>
            <h5 className="movie__year">{year}</h5>
            <ul className="genres">
                {genres.map((genre, index) => (  
                <li key={index} className="genres__genre">{genre}</li> //map은 항상 키가 있어야 함
                ))}
            </ul>

            <p className="movie__summary">{summary.slice(0, 140)}</p>
            
        </div>
          

      </Link>
    </div>
    
);
}

// 우리가 가져올 props의 타입에 대한 알려줌-> 타입이 다르면 컴퓨터에서 경고문을 띄움
// api에서 제공하는 아래 속성들을 사용할 것
Movie.propTypes = {   //소문자 p
    id : PropTypes.number.isRequired,   //불러온 대문자 P
    year : PropTypes.number.isRequired,
    title : PropTypes.string.isRequired,
    summary : PropTypes.string.isRequired,
    poster : PropTypes.string.isRequired,
    genres : PropTypes.arrayOf(PropTypes.string).isRequired 
    //배열로 포함된 장르 속성  --> 장르 : {장르1, 장르2}
    
}

export default Movie;

```


<br/>

### (2) component > Navigation.js

- 화면에서 메뉴에 해당하는 컴포넌트이다.

```js
import React from "react";
import { Link } from "react-router-dom";
import "./Navigation.css";

function Navigation() {
  return (
    <div className="nav">
      {/* 리액트에서 쓰는 링크태그 형식 */}
      <Link to="/">Home</Link>
      <Link to="/about">About</Link>
    </div>
  );
}

export default Navigation;
```


<br/>

## 2) routes

### (1) route > Home.js

- `movie-api`를 가져와서 `component > Movie.js`에 데이터를 보내준다.

- 그러면 `Movie.js`에서는 해당 데이터를 받아서, 적절한 html으로 랜더링한다.

```js
import React from "react";
import axios from "axios";
import Movie from "../components/Movie";
import "./Home.css";

class Home extends React.Component {
  state = {
    isLoading: true,
    movies: []
  };
  getMovies = async () => {
    const {
      data: {
        data: { movies }
      }
    } = await axios.get(
      "https://yts-proxy.now.sh/list_movies.json?sort_by=rating"
    );
    this.setState({ movies, isLoading: false });
  };
  componentDidMount() {
    this.getMovies();
  }
  render() {
    const { isLoading, movies } = this.state;  //this.state안에 있는 변수를 가져와서 간단하게 사용하는 법
    return ( 
      <section className="container">
        {isLoading ? (
          <div className="loader">
            <span className="loader__text">Loading...</span>
          </div>
        ) : (
          <div className="movies">
            {movies.map(movie => (
              <Movie
                key={movie.id}
                id={movie.id}
                year={movie.year}
                title={movie.title}
                summary={movie.summary}
                poster={movie.medium_cover_image}
                genres={movie.genres}
              />
            ))}
          </div>
        )}
      </section>
    );
  }
}

export default Home;


```

<br/>

### (2) routes > Detail.js

- 라우터에 있는 모든 라우트들은 props값을 가진다.
>location <br/> history <br/> match <br/> staticContext
```js
<Link 
  to={{
    pathname : "/course",
    search : "?sort=name",
    hash : "#the-hash",
    state : {fromDashborad : true}
  }}
```

- `location` : 현재 경로 정보, URL 쿼리 (/about?foo=bar 형식) 정보

- `history` : `push`, `replace` 를 통해 다른 경로로 이동, 앞 뒤 페이지로 전환 

- `match` : 어떤 라우트에 매칭이 되었는지에 대한 정보, params (/about/:name 형식) 정보

```js
import React from "react";

class Detail extends React.Component {
  componentDidMount() {
    const { location, history } = this.props;
    if (location.state === undefined) {
      history.push("/");    //리다이렉션
    }
  }
  render() {
    const { location } = this.props;   //보내온 정보중에서 lication이 정의되 있다면~
    if (location.state) {
      return <span>{location.state.title}</span>;
    } else {
      return null;
    }
  }
}
export default Detail;

```

