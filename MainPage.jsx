import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Movie from './Movie/Movie';

const API_key = "api_key=c3582d12294b042387849823b312b1ba";
const base_url = "https://api.themoviedb.org/3/";

export default function MainPage({ username }) {
    const [search, setSearch] = useState('');
    const [movies, setMovies] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            if (search.trim() === '') {
                setMovies([]);
                return;
            }
            try {
                const response = await axios.get(`${base_url}/search/movie?query=${search}&${API_key}&language=ko`);
                setMovies(response.data.results);
            } catch (error) {
                console.error("영화 검색 중 오류 발생:", error);
            }
        };

        fetchData();
    }, [search]);

    const handleMovieClick = (id, poster_path) => {
        navigate(`/Movie/${id}`, { state: { poster_path } });
    };

    return (
        <div>
            <div className="mainPage-body">{username ? `${username} 환영합니다` : '환영합니다'}</div> 
            <div className="mainPage-inputSection">
                <span>📽️ Find Your Movie !</span>
                <input 
                    type="text" 
                    onChange={(e) => setSearch(e.target.value)} 
                    value={search} 
                />
            </div>
            {search.trim() !== '' && (
                <div className="movies-container">
                    {movies.length > 0 ? (
                        movies.map(movie => (
                            <Movie 
                                key={movie.id}
                                title={movie.title}
                                poster_path={movie.poster_path}
                                overview={movie.overview}
                                vote_average={movie.vote_average}
                                handleClick={() => handleMovieClick(movie.id, movie.poster_path)}
                            />
                        ))
                    ) : (
                        <div>영화를 찾을 수 없습니다</div>
                    )}
                </div>
            )}
        </div>
    );
}
