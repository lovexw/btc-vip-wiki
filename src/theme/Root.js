// 文件路径：src/theme/Root.js
import React, { useState, useEffect } from 'react';

export default function Root({ children }) {
  const [isOpen, setIsOpen] = useState(false);
  const [term, setTerm] = useState('');
  const [num1, setNum1] = useState(1);
  const [num2, setNum2] = useState(1);
  const [captchaAns, setCaptchaAns] = useState('');
  const [status, setStatus] = useState(''); // 'sending', 'success', 'error'

  // 每次打开弹窗，生成新的简单算术题
  useEffect(() => {
    if (isOpen) {
      setNum1(Math.floor(Math.random() * 10) + 1);
      setNum2(Math.floor(Math.random() * 10) + 1);
      setCaptchaAns('');
      setStatus('');
    }
  }, [isOpen]);

  const handleSubmit = async () => {
    // 1. 验证算术题（防止简单的脚本机器人刷屏）
    if (parseInt(captchaAns) !== num1 + num2) {
      alert('数学题算错啦，证明你是人类哦！');
      return;
    }
    if (!term.trim()) {
      alert('词条不能为空！');
      return;
    }

    // 2. 验证是否今天已经提交过（防白嫖党重复发）
    const today = new Date().toDateString();
    if (localStorage.getItem('wiki_submitted_date') === today) {
      alert('您今天已经提交过啦，给站长留点时间写文章吧，明天再来！');
      setIsOpen(false);
      return;
    }

    setStatus('sending');
    try {
      // 请求我们刚才写的 CF 后端代理接口
      const res = await fetch('/submit', { // 别加 api 了， Cloudflare 认不出
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ term: term.trim() })
      });

      if (res.ok) {
        setStatus('success');
        // 记录在本地浏览器，今天不准再发了
        localStorage.setItem('wiki_submitted_date', today);
        setTimeout(() => setIsOpen(false), 2000); // 2秒后自动关掉窗口
      } else {
        setStatus('error');
        alert('提交失败，请稍后再试。');
      }
    } catch (e) {
      setStatus('error');
      alert('网络好像有问题哦。');
    }
  };

  return (
    <>
      {children}
      
      {/* 左下角悬浮按钮 */}
      <div style={{ position: 'fixed', bottom: '30px', left: '30px', zIndex: 9999 }}>
        <button 
          onClick={() => setIsOpen(true)}
          style={{
            backgroundColor: '#f7931a', color: 'white', border: 'none', borderRadius: '50px',
            padding: '12px 20px', fontSize: '14px', fontWeight: 'bold', cursor: 'pointer',
            boxShadow: '0 4px 12px rgba(247,147,26,0.4)', display: 'flex', alignItems: 'center', gap: '8px'
          }}
        >
          💡 提交你想懂的黑话
        </button>
      </div>

      {/* 弹窗界面 */}
      {isOpen && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.85)', // 背景更深，把网页内容彻底盖住
          zIndex: 10000, display: 'flex', justifyContent: 'center', alignItems: 'center',
          backdropFilter: 'blur(5px)' // 加个毛玻璃效果，更专业
        }}>
          <div style={{
            backgroundColor: '#ffffff', // 强制纯白背景，不受主题影响
            padding: '30px', borderRadius: '12px',
            width: '90%', maxWidth: '400px', boxShadow: '0 10px 40px rgba(0,0,0,0.6)', // 阴影更重，立体感更强
            position: 'relative', border: '1px solid #eaeaea' // 加个淡灰色边框，区分边界
          }}>
            <button 
              onClick={() => setIsOpen(false)}
              style={{ position: 'absolute', top: '15px', right: '15px', background: 'none', border: 'none', fontSize: '24px', cursor: 'pointer', color: '#333333' }}
            >
              ✖
            </button>
            <h3 style={{ marginTop: 0, marginBottom: '20px', color: '#1a1a1a', textAlign: 'center' }}>有什么不懂的词条？</h3>
            
            <input 
              type="text" 
              placeholder="例如：打铭文、科学家..." 
              value={term} onChange={(e) => setTerm(e.target.value)}
              style={{ width: '100%', padding: '12px', marginBottom: '15px', borderRadius: '6px', border: '2px solid #eaeaea', backgroundColor: '#f9f9f9', color: '#333333', fontSize: '16px' }}
            />
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px', justifyContent: 'center', color: '#1a1a1a' }}>
              <span style={{ fontSize: '16px' }}>防机器人: <b style={{ fontSize: '18px', color: '#f7931a' }}>{num1} + {num2} =</b></span>
              <input 
                type="number" 
                value={captchaAns} onChange={(e) => setCaptchaAns(e.target.value)}
                style={{ width: '70px', padding: '10px', borderRadius: '6px', border: '2px solid #eaeaea', backgroundColor: '#f9f9f9', color: '#333333', fontSize: '16px', textAlign: 'center' }}
              />
            </div>

            <button 
              onClick={handleSubmit} 
              disabled={status === 'sending' || status === 'success'}
              style={{
                width: '100%', padding: '14px', backgroundColor: status === 'success' ? '#4caf50' : '#f7931a', 
                color: 'white', border: 'none', borderRadius: '6px', fontSize: '18px', fontWeight: 'bold', cursor: status === 'sending' ? 'not-allowed' : 'pointer',
                boxShadow: '0 4px 12px rgba(247,147,26,0.3)'
              }}
            >
              {status === 'sending' ? '🚀 发送中...' : status === 'success' ? '✅ 站长已收到！' : '马上提交'}
            </button>
          </div>
        </div>
      )}
    </>
  );
}