export default [
    // user
    {
        path: '/user',
        component: '../layouts/UserLayout',
        routes: [
            {path: '/user', redirect: '/user/login'},
            {path: '/user/login', component: './User/Login'},
        ],
    },
    // app
    {
        path: '/',
        component: '../layouts/BasicLayout',
        Routes: ['src/pages/Authorized'],
        authority: ['admin', 'user'],
        routes: [
            // dashboard
            {path: '/', redirect: '/home'},
            {
                path: '/home',
                name: 'Home',
                icon: 'home',
                component: './Home/Home',
            },
            {
                component: '404',
            },
        ],
    },
];
