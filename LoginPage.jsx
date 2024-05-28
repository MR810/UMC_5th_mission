import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function LoginPage({ setIsLoggedIn, setUsername }) {
  const [username, setUsernameLocal] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    // Add your login validation logic here
    if (username && password) {
      setIsLoggedIn(true);
      setUsername(username);
      navigate('/');
    }
  };

  return (
    <div className="pageAll">
      <div className="page">
        <div className="titleWrap">
          로그인 페이지
        </div>
        <div className="contentWrap">
          <div className="inputTitle"></div>
          <div className="inputWrap">
            <input
              className="input"
              placeholder='아이디를 입력해주세요'
              value={username}
              onChange={(e) => setUsernameLocal(e.target.value)}
            />
          </div>

          <div className="inputTitle"></div>
          <div className="inputWrap">
            <input
              className="input"
              placeholder='비밀번호를 입력해주세요'
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>

        <div>
          <button className='bottomButton' onClick={handleLogin}>
            로그인
          </button>
        </div>
      </div>
    </div>
  );
}
