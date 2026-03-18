import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';

// 这里定义了首页头部的样式
function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className="hero hero--primary" style={{padding: '4rem 0', textAlign: 'center', background: 'var(--ifm-color-primary)'}}>
      <div className="container">
        <h1 className="hero__title" style={{color: 'white', fontSize: '3rem', fontWeight: '800'}}>{siteConfig.title}</h1>
        <p className="hero__subtitle" style={{color: 'rgba(255,255,255,0.9)', marginBottom: '2rem'}}>{siteConfig.tagline}</p>
        
        {/* 7 大分类区块矩阵 */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
          gap: '15px',
          maxWidth: '1000px',
          margin: '0 auto'
        }}>
          {[
            { title: '💎 核心信仰', link: '/docs/lth', desc: 'HODL与底色' },
            { title: '📈 市场交易', link: '/docs/fud', desc: '博弈与心理' },
            { title: '🌍 宏观政策', link: '/docs/etf', desc: 'ETF与监管' }, // 改为指向具体词条
            { title: '🛡️ 资产安全', link: '/docs/cold-wallet', desc: '私钥与钱包' },
            { title: '📊 链上分析', link: '/docs/hashrate', desc: '数据与算力' },
            { title: '🎭 社区文化', link: '/docs/pizza-day', desc: '黑话与老梗' },
            { title: '⚡ 技术进阶', link: '/docs/lightning-network', desc: '闪电网络等' }, // 改为指向具体词条
          ].map((item, idx) => (
            // ... 后面的代码保持不变 ...
            <Link
              key={idx}
              className="button button--secondary"
              to={item.link}
              style={{
                display: 'flex',
                flexDirection: 'column',
                padding: '20px',
                borderRadius: '12px',
                border: 'none',
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                transition: 'transform 0.2s',
                textDecoration: 'none'
              }}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
            >
              <b style={{fontSize: '1.1rem', marginBottom: '5px'}}>{item.title}</b>
              <span style={{fontSize: '0.8rem', opacity: 0.7, fontWeight: 'normal'}}>{item.desc}</span>
            </Link>
          ))}
        </div>
      </div>
    </header>
  );
}

export default function Home() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={`首页 - ${siteConfig.title}`}
      description="一秒看懂比特币圈子里的行话与暗语">
      <HomepageHeader />
      <main>
        <div style={{ textAlign: 'center', padding: '4rem 2rem', fontSize: '1.2rem', color: 'var(--ifm-color-emphasis-700)' }}>
          <p>这里是由 <b>比特囤币</b> 整理维护的比特币专属知识库。</p>
          <p>无论是老韭菜还是新入局的 Hodler，都能在这里找到最接地气的解释。</p>
        </div>
      </main>
    </Layout>
  );
}