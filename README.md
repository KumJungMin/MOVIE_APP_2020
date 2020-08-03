# ReactJS Code Description


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







