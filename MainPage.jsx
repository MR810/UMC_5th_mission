import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_key = "api_key=c3582d12294b042387849823b312b1ba";
const base_url = "https://api.themoviedb.org/3/";

export default function MainPage({ username }) {
    const [search, setSearch] = useState('');
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            if (search.trim() === '') {
                setMovies([]);
                return;
            }
            try {
                const response = await axios.get(`${base_url}/search/movie?query=${search}&${API_key}`);
                setMovies(response.data.results);
            } catch (error) {
                console.error("영화 검색 중 오류 발생:", error);
            }
        };

        fetchData();
    }, [search]); 

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
                            <div key={movie.id} className="movie-card">
                                <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
                                <div>{movie.title}</div>
                            </div>
                        ))
                    ) : (
                        <div>영화를 찾을 수 없습니다</div>
                    )}
                </div>
            )}
        </div>
    );
}
