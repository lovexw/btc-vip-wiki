import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';

// 这里定义了首页头部的样式
function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className={clsx('hero hero--primary')} style={{ padding: '4rem 0', textAlign: 'center' }}>
      <div className="container">
        <h1 className="hero__title">{siteConfig.title}</h1>
        <p className="hero__subtitle">{siteConfig.tagline}</p>
        <div style={{ marginTop: '2rem' }}>
          <Link
            className="button button--secondary button--lg"
            to="/docs/hodl">
            开始查阅词典 📖
          </Link>
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