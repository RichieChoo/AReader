import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';
import moment from 'moment';
import { Row, Col, Card, Upload, Button, message, Modal, Spin, Tabs, Rate, Tooltip, List } from 'antd';
import { filterFalse } from '../../utils/utils';
import styles from './index.less';
import list from '@/models/list';
const namespace = 'book';
@connect(({ book, loading }) => ({
	book,
	loading: loading.effects[`${namespace}/fetch`]
}))
class AppComponent extends PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			list: [],
			isloadMore: false,
			chapterPage: 0
		};
	}
	componentDidMount() {
		this.fetchList();
		this.fetchChapters();
	}

	fetchList = () => {
		const { dispatch, location } = this.props;
		const { id } = location.query;
		if (id) {
			dispatch({
				type: `${namespace}/fetch`,
				payload: {
					id
				}
			});
		}
	};
	handleToReader = (param) => {
		const { book, chapter } = param;
		// const { _id } = item;
		// const { dispatch } = this.props;
		// dispatch(
		// 	routerRedux.push({
		// 		pathname: '/book/reader',
		// 		query: { id: _id }
		// 	})
		// );
	};
	handleAddToShelf = (item) => {
		const { _id } = item;
		const { dispatch } = this.props;
		message.success('已加入书架');
		// dispatch({
		// 	type: `${namespace}/addShelf`,
		// 	payload: {
		// 		id:_id
		// 	}
		// });
	};
	fetchChapters = () => {
		const { dispatch, location } = this.props;
		const { id } = location.query;
		if (id) {
			dispatch({
				type: `${namespace}/fetchChapters`,
				payload: {
					id
				}
			});
		}
	};
	onLoadMore = () => {
		this.setState({
			isloadMore: true
		});
		const { book = {} } = this.props;
		const { chapters = [] } = book;
		const { list, chapterPage } = this.state;
		const newList = list.concat(
			chapterPage === 0
				? chapters.slice(10, 100)
				: chapters.slice((chapterPage + 1) * 100, (chapterPage + 2) * 100)
		);
		setTimeout(() => {
			this.setState({
				chapterPage: chapterPage + 1,
				list: newList,
				isloadMore: false
			});
		}, 500);
	};
	handleShowIndex = (key) => {
		if (key === '2') {
			const { book = {} } = this.props;
			const { chapters = [] } = book;
			this.setState({
				list: chapters.slice(0, 10),
				chapterPage: 0
			});
		}
	};

	render() {
		const { book = {}, loading } = this.props;
		const { data = {} } = book;
		const { list = [], isloadMore } = this.state;
		const loadMore = !loading ? (
			<p className={styles.loadMore} onClick={this.onLoadMore}>
				加载更多
			</p>
		) : null;

		const cover =
			data.cover && data.cover.includes('/agent/')
				? decodeURIComponent(data.cover.replace(/\/agent\//, ''))
				: decodeURIComponent(data.cover);
		return (
			<Fragment>
				<div gutter={16} className={styles.content}>
					{loading ? (
						<Spin />
					) : (
						[
							<div className={styles.detailWrapper}>
								<div className={styles.left}>
									<img alt={data.title} src={cover} />
								</div>
								<div className={styles.right}>
									<p>{data.title}</p>
									<Rate
										disabled
										allowHalf
										defaultValue={
											data.rating && data.rating.score ? (
												data.rating.score / 2 - (data.rating.score / 2) % 0.5
											) : (
												0
											)
										}
									/>
									<p>
										<span className={styles.author}>{data.author}</span>
										&nbsp;&nbsp;|&nbsp;&nbsp;{moment(data.updated).fromNow()}更新
									</p>
									<p>
										<span>{(data.totalFollower / 10000).toFixed(0)}万</span>
										&nbsp;&nbsp;人气&nbsp;&nbsp;|&nbsp;&nbsp;
										<span>
											{data.retentionRatio}
											&nbsp;%&nbsp;&nbsp;
										</span>
										留存率
									</p>
									<div>
										<Button type="primary" onClick={() => this.handleToReader({ book: data })}>
											阅读
										</Button>
										<Button type="default" onClick={() => this.handleAddToShelf(data)}>
											加入书架
										</Button>
									</div>
								</div>
							</div>,
							<div className={styles.bottomWrapper}>
								<Tabs defaultActiveKey="1" onChange={this.handleShowIndex}>
									<Tabs.TabPane tab="详情" key="1">
										<p>{data.longIntro}</p>
										{/* <List
											className={styles.chapterlist}
											itemLayout="horizontal"
											dataSource={commentList}
											renderItem={(item) => (
												<List.Item
													className={styles.chapterItem}
													onClick={() => this.handleToReader({ chapter: item })}
												>
													{item.title}
												</List.Item>
											)}
										/> */}
									</Tabs.TabPane>
									<Tabs.TabPane tab={`目录（${data.chaptersCount}）`} key="2">
										<List
											className={styles.chapterlist}
											itemLayout="horizontal"
											loadMore={loadMore}
											loading={isloadMore}
											dataSource={list}
											renderItem={(item) => (
												<List.Item
													className={styles.chapterItem}
													onClick={() => this.handleToReader({ chapter: item })}
												>
													{item.title}
												</List.Item>
											)}
										/>
									</Tabs.TabPane>
								</Tabs>
							</div>
						]
					)}
				</div>
			</Fragment>
		);
	}
}

export default AppComponent;
