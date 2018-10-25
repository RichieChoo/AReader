export default [
    // user
    // {
    //     path: '/user',
    //     component: '../layouts/UserLayout',
    //     routes: [
    //         { path: '/user', redirect: '/user/login' },
    //         { path: '/user/login', component: './User/Login' },
    //         { path: '/user/register', component: './User/Register' },
    //         { path: '/user/register-result', component: './User/RegisterResult' },
    //     ],
    // },
    // app
    {
        path: '/',
        component: '../layouts/BasicLayout',
        Routes: ['src/pages/Authorized'],
        authority: ['admin', 'user'],
        routes: [
            { path: '/', redirect: '/book/list' },
            {
                path: '/book/list',
                name: 'book',
                icon: 'book',
                component:'./Book'
            },
            {
                path: '/manage',
                name: 'manage',
                icon: 'appstore',
                routes: [
                    {
                        path: '/manage/male',
                        icon: 'man',
                        name: 'male',
                        component: './Manage/Male',
                    },
                    {
                        path: '/manage/female',
                        name: 'female',
                        icon: 'woman',
                        component: './Manage/Female',
                    },
                    {
                        path: '/manage/picture',
                        name: 'picture',
                        icon: 'picture',
                        component: './Manage/Picture',
                    },
                    {
                        path: '/manage/press',
                        name: 'press',
                        icon: 'code',
                        component: './Manage/Press',
                    }
                ],
            },
            {
                name: 'exception',
                icon: 'warning',
                path: '/exception',
                hideInMenu: true,
                routes: [
                    // exception
                    {
                        path: '/exception/403',
                        name: 'not-permission',
                        hideInMenu: true,
                        component: './Exception/403',
                    },
                    {
                        path: '/exception/404',
                        name: 'not-find',
                        hideInMenu: true,
                        component: './Exception/404',
                    },
                    {
                        path: '/exception/500',
                        name: 'server-error',
                        hideInMenu: true,
                        component: './Exception/500',
                    },
                    {
                        path: '/exception/trigger',
                        name: 'trigger',
                        hideInMenu: true,
                        component: './Exception/TriggerException',
                    },
                ],
            },
        ],
    },
];
