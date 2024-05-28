import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const API_key = "api_key=c3582d12294b042387849823b312b1ba";
const base_url = "https://api.themoviedb.org/3/";
const IMG_BASE_URL = "https://image.tmdb.org/t/p/w500";

const MovieDetail = () => {
    const { id } = useParams();
    const [movie, setMovie] = useState(null);

    useEffect(() => {
        const fetchMovie = async () => {
            try {
                const response = await axios.get(`${base_url}/movie/${id}?${API_key}&language=ko`);
                setMovie(response.data);
            } catch (error) {
                console.error("영화 상세 정보 가져오기 중 오류 발생:", error);
            }
        };

        fetchMovie();
    }, [id]);

    if (!movie) return <div>Loading...</div>;

    const ratingStars = '⭐️'.repeat(Math.floor(movie.vote_average));

    return (
        <div className='movie-detail-container' style={{ backgroundImage: `url(${IMG_BASE_URL + movie.poster_path})` }}>
            <div className='movie-detail-overlay'></div>
            <div className='poster-container'>
                <img src={IMG_BASE_URL + movie.poster_path} alt={movie.title} />
            </div>
            <div className='movie-detail-content'>
                <h4>{movie.title}</h4>
                <p>평점 {ratingStars}</p>
                <p>개봉일 {movie.release_date}</p>
                <p>줄거리</p>
                {movie.overview ? 
                <p>{movie.overview}</p> : <p>TMDB에서 제공하는 API에 상세 줄거리 정보가 없습니다.</p>}
            </div>
        </div>
    );
};

export default MovieDetail;
