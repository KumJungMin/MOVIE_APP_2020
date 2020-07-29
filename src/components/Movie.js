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