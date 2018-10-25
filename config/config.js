// https://umijs.org/config/
import os from 'os';
import pageRoutes from './router.config';
import webpackplugin from './plugin.config';
import defaultSettings from '../src/defaultSettings';

const devHost = "http://api.zhuishushenqi.com/";
export default {
    // add for transfer to umi
    plugins: [
        [
            'umi-plugin-react',
            {
                antd: true,
                dva: {
                    hmr: true,
                },
                locale: {
                    enable: true, // default false
                    default: 'zh-CN', // default zh-CN
                    baseNavigator: true, // default true, when it is true, will use `navigator.language` overwrite default
                },
                dynamicImport: {
                    loadingComponent: './components/PageLoading/index',
                },
                polyfills: ['ie11'],
                ...(!process.env.TEST && os.platform() === 'darwin'
                    ? {
                          dll: {
                              include: ['dva', 'dva/router', 'dva/saga', 'dva/fetch'],
                              exclude: ['@babel/runtime'],
                          },
                          hardSource: true,
                      }
                    : {}),
            },
        ],
        [
            'umi-plugin-ga',
            {
                code: 'UA-72788897-6',
            },
        ],
    ],
    define: {
        APP_TYPE: process.env.APP_TYPE || '',
    },
    // 路由配置
    routes: pageRoutes,
    // Theme for antd
    // https://ant.design/docs/react/customize-theme-cn
    theme: {
        'primary-color': defaultSettings.primaryColor,
    },
    proxy: {
        '/api': {
            target: "http://api.zhuishushenqi.com",
            changeOrigin: true,
            pathRewrite: { '^/api': '' },
        },
    },
    externals: {
        '@antv/data-set': 'DataSet',
    },
    ignoreMomentLocale: true,
    lessLoaderOptions: {
        javascriptEnabled: true,
    },
    cssLoaderOptions: {
        modules: true,
        getLocalIdent: (context, localIdentName, localName) => {
            if (
                context.resourcePath.includes('node_modules') ||
                context.resourcePath.includes('ant.design.pro.less') ||
                context.resourcePath.includes('global.less')
            ) {
                return localName;
            }
            const match = context.resourcePath.match(/src(.*)/);
            if (match && match[1]) {
                const antdProPath = match[1].replace('.less', '');
                const arr = antdProPath
                    .split('/')
                    .map(a => a.replace(/([A-Z])/g, '-$1'))
                    .map(a => a.toLowerCase());
                return `antd-pro${arr.join('-')}-${localName}`.replace(/--/g, '-');
            }
            return localName;
        },
    },
    manifest: {
        name: 'AReader',
        background_color: '#FFF',
        description:
            'AReader',
        display: 'standalone',
        start_url: '/index.html',
        icons: [
            {
                src: '/favicon.ico',
                sizes: '64x64',
                type: 'image/png',
            },
        ],
    },

    chainWebpack: webpackplugin,
    cssnano: {
        mergeRules: false,
    },
};
