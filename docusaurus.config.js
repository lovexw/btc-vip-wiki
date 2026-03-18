import {themes as prismThemes} from 'prism-react-renderer';

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: '比特币江湖“黑话”',
  tagline: '一秒看懂比特币圈子里的行话与暗语',
  favicon: 'img/favicon.ico',

  // 站点的线上访问地址
  url: 'https://wiki.btchao.com', 
  baseUrl: '/',

  // GitHub 部署相关配置
  organizationName: 'lovexw', 
  projectName: 'btc-wiki', 

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  // 强制全站使用中文语言环境
  i18n: {
    defaultLocale: 'zh-Hans',
    locales: ['zh-Hans'],
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: './sidebars.js',
          // 指向你仓库的编辑链接，方便以后快速修改
          editUrl: 'https://github.com/lovexw/btc-wiki/tree/main/', 
        },
        // 咱们做纯Wiki，把多余的博客模块关掉，更清爽
        blog: false, 
        theme: {
          customCss: './src/css/custom.css',
        },
      }),
    ],
  ],
  themes: [
    [
      require.resolve("@easyops-cn/docusaurus-search-local"),
      {
        // 开启 hash 路由支持
        hashed: true,
        // 核心：设置语言为中文和英文，这样搜“死拿”和搜“HODL”都能出来
        language: ["zh", "en"],
        // 让高亮效果更明显
        highlightSearchTermsOnTargetPage: true,
        // 将搜索框放在导航栏右侧
        indexDocs: true,
      },
    ],
  ],
  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      navbar: {
        title: '比特币江湖“黑话”',
        logo: {
          alt: 'Logo',
          src: 'img/logo.svg', // 以后有了自己的 Logo 替换这里就行
        },
        items: [
          {
            type: 'docSidebar',
            sidebarId: 'tutorialSidebar',
            position: 'left',
            label: '查阅词典',
          },
          {
            href: 'https://github.com/lovexw/btc-wiki',
            label: 'GitHub',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        copyright: `Copyright © ${new Date().getFullYear()} 比特囤币. Built with Docusaurus.`,
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
      },
    }),
};

export default config;