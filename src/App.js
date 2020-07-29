import React from "react";
import { HashRouter, Route } from "react-router-dom";
import Home from "./routes/Home";
import About from "./routes/About";
import Detail from "./routes/Detail";
import Navigation from "./components/Navigation";
import "./App.css";

function App() {
  return (
    // HashRouter안에는 Route가 있어야함
    <HashRouter>     
      {/* 깃업 페이지에 업로드할 때는 해쉬라우터가 더 편함 */}
      <Navigation />  
      {/* 라우터밖에서는 link를 쓸 수 없음 */}
      <Route path="/" exact={true} component={Home} />  
      {/* exact를 하지 않으면 /가 포함되는 모든 주소의 것들이 로드됨 그래서 exact을 해야함 */}
      <Route path="/about" component={About} />
      {/* path는 url   컴포넌트= 경로*/}
      {/* path는 about과 같을 필요가 없음. 그냥 주소에서 나타나는 url일 뿐 */}
      <Route path="/movie/:id" component={Detail} />
    </HashRouter>
  );
}

export default App;
