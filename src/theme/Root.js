import React, { useState, useEffect } from 'react';

export default function Root({children}) {
  // 状态管理：是否已验证通过
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // 每次打开网页时，检查本地是否已经存了通行证（避免刷新后又要输入）
  useEffect(() => {
    const isPass = localStorage.getItem('wiki_access');
    if (isPass === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  // 提交密码调取 API 的逻辑
  const handleVerify = async () => {
    if (!password) {
      setErrorMsg('密码不能为空哦');
      return;
    }
    
    setIsLoading(true);
    setErrorMsg('');

    try {
      // 这里的 fetch 就是你未来要对接的真实 API 地址
      // const response = await fetch('https://你的api地址/verify', {
      //   method: 'POST',
      //   body: JSON.stringify({ code: password })
      // });
      // const data = await response.json();

      // 现在我们先做一个假的本地模拟：假设密码是 "8888"
      setTimeout(() => {
        if (password === '8888') {
          setIsAuthenticated(true);
          localStorage.setItem('wiki_access', 'true'); // 存入本地，下次免密
        } else {
          setErrorMsg('密码错误，请重新输入或联系管理员');
        }
        setIsLoading(false);
      }, 800); // 模拟网络延迟

    } catch (err) {
      setErrorMsg('API 请求失败，请检查网络');
      setIsLoading(false);
    }
  };

  // 游客临时访问逻辑
  const handleGuest = () => {
    setIsAuthenticated(true);
    // 游客访问不存 localStorage，刷新后还会看到密码门
  };

  // 1. 如果验证通过，直接渲染真正的 Wiki 网站内容 (children)
  if (isAuthenticated) {
    return <>{children}</>;
  }

  // 2. 如果没通过，渲染下面这个全屏的密码输入界面
  return (
    <div style={{
      display: 'flex', flexDirection: 'column', alignItems: 'center', 
      justifyContent: 'center', height: '100vh', backgroundColor: '#1b1b1d', color: '#fff'
    }}>
      <div style={{ textAlign: 'center', padding: '2rem', backgroundColor: '#242526', borderRadius: '10px', boxShadow: '0 4px 12px rgba(0,0,0,0.5)' }}>
        <h2>🔒 内部知识库</h2>
        <p style={{ color: '#aaa', marginBottom: '20px' }}>请输入访问凭证</p>
        
        <input 
          type="password" 
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="请输入密码"
          style={{
            padding: '10px', width: '200px', borderRadius: '5px', 
            border: '1px solid #444', backgroundColor: '#333', color: '#fff', marginBottom: '10px'
          }}
        />
        <br />
        
        <button 
          onClick={handleVerify} 
          disabled={isLoading}
          style={{
            padding: '10px 20px', cursor: 'pointer', backgroundColor: '#25c2a0', 
            color: '#fff', border: 'none', borderRadius: '5px', fontWeight: 'bold'
          }}>
          {isLoading ? '验证中...' : '提交验证'}
        </button>

        {errorMsg && <p style={{ color: '#ff7373', marginTop: '10px', fontSize: '0.9rem' }}>{errorMsg}</p>}

        <div style={{ marginTop: '30px', borderTop: '1px solid #444', paddingTop: '15px' }}>
          <button 
            onClick={handleGuest}
            style={{
              background: 'none', border: 'none', color: '#aaa', 
              textDecoration: 'underline', cursor: 'pointer', fontSize: '0.9rem'
            }}>
            游客临时访问 (跳过)
          </button>
        </div>
      </div>
    </div>
  );
}