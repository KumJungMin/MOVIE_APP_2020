import React from "react";
import "./About.css";

function About(props) {
  console.log(props);  //다른 컴포넌트에서 전송한 값을 받음
  return (
    <div className="about__container">
      <span>
        “Freedom is the freedom to say that two plus two make four. If that is
        granted, all else follows.”
      </span>
      <span>− George Orwell, 1984</span>
    </div>
  );
}

export default About;
