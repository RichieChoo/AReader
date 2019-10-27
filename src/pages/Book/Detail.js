import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';
import moment from 'moment';
import { Row, Col, Card, Upload, Button, message, Modal, Spin, Tabs, Rate, Tooltip } from 'antd';
import { filterFalse } from '../../utils/utils';
import styles from './index.less';
const namespace = 'book';
@connect(({ book, loading }) => ({
	book,
	loading: loading.models.book
}))
class AppComponent extends PureComponent {
	constructor(props) {
		super(props);
	}
	componentDidMount() {
		this.fetchList();
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
	handleToReader = (item) => {
		const { _id } = item;
		const { dispatch } = this.props;
		dispatch(
			routerRedux.push({
				pathname: '/book/reader',
				query: { id: _id }
			})
		);
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

	handleShowIndex = (key) => {};

	render() {
		const { book = {}, loading } = this.props;
		const { data = {} } = book;
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
						<Fragment>
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
										{data.author}
										&nbsp;&nbsp;|&nbsp;&nbsp;
										{data.majorCate}
									</p>
									<p>
										<span>{data.latelyFollower}</span>
										&nbsp;&nbsp;人气&nbsp;&nbsp;|&nbsp;&nbsp;
										<span>
											{data.retentionRatio}
											&nbsp;%&nbsp;&nbsp;
										</span>
										留存率
									</p>
									<div>
										<Button type="primary" onClick={() => this.handleToReader(data)}>
											点击阅读
										</Button>
										<Button type="default" onClick={() => this.handleAddToShelf(data)}>
											加入书架
										</Button>
									</div>
								</div>
							</div>

							<div className={styles.bottomWrapper}>
								<Tabs defaultActiveKey="1" onChange={this.handleShowIndex}>
									<Tabs.TabPane tab="详情" key="1">
										<p>{data.longIntro}</p>
										<p>
											<span>{moment(data.updated).fromNow()}更新:</span>
											{data.lastChapter}
										</p>
									</Tabs.TabPane>
									<Tabs.TabPane tab={`目录（${data.chaptersCount}）`} key="2" />
								</Tabs>
							</div>
						</Fragment>
					)}
				</div>
			</Fragment>
		);
	}
}

export default AppComponent;
