export default [
	// user
	{
		path: '/user',
		component: '../layouts/UserLayout',
		routes: [ { path: '/user', redirect: '/user/login' }, { path: '/user/login', component: './User/Login' } ]
	},
	// app
	{
		path: '/',
		component: '../layouts/BasicLayout',
		Routes: [ 'src/pages/Authorized' ],
		authority: [ 'admin', 'user' ],
		routes: [
			{ path: '/', redirect: '/category/male' },
			// {
			//   path: "/bookShelf/list",
			//   name: "书架",
			//   icon: "book",
			//   component: "./BookShelf"
			// },
			{
				path: '/category',
				name: '分类',
				icon: 'appstore',
				routes: [
					{
						path: '/category/male',
						icon: 'man',
						name: '男生',
						component: './Category/Male'
					},
					{
						path: '/category/female',
						name: '女生',
						icon: 'woman',
						component: './Category/Female'
					},
					{
						path: '/category/publish',
						name: '出版物',
						icon: 'code',
						component: './Category/Publish'
					}
				]
			},
			{
				path: '/book',
				name: '书籍详情',
				hideInMenu: true,
				routes: [
					{
						path: '/book/detail',
						hideInMenu: true,
						name: '书籍详情',
						component: './Book/Detail'
					},
					{
						path: '/book/reader',
						hideInMenu: true,
						name: '阅读器',
						component: './Book/Reader'
					}
				]
			},
			// {
			//   path: "/rank",
			//   name: "排行",
			//   icon: "like",
			//   component: "./Rank"
			// },
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
						component: './Exception/403'
					},
					{
						path: '/exception/404',
						name: 'not-find',
						hideInMenu: true,
						component: './Exception/404'
					},
					{
						path: '/exception/500',
						name: 'server-error',
						hideInMenu: true,
						component: './Exception/500'
					},
					{
						path: '/exception/trigger',
						name: 'trigger',
						hideInMenu: true,
						component: './Exception/TriggerException'
					}
				]
			}
		]
	}
];
