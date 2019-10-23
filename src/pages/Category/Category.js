import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import { Row, Col, Radio, Tabs, message, List } from 'antd';
import { filterFalse } from '../../utils/utils';
import styles from './index.less';
import unShow from './../../assets/unShow.jpg';
const namespace = 'category';

@connect(({ category, loading }) => ({
	category,
	loading: loading.effects[`${namespace}/fetch`]
}))
class AppComponent extends PureComponent {
	constructor(props) {
		super(props);
		// this.imgRef = React.createRef();
		let { gender = 'male' } = props;
		this.state = {
			pageNum: 1,
			pageSize: 10,
			major: false,
			minor: false,
			type: 'hot',
			gender,
			minArr: []
		};
	}

	static getDerivedStateFromProps(nextProps, prevState) {
		const { category: { data = {} } } = nextProps;
		const { minors = [] } = data;
		const { major, minArr } = prevState;
		if (!major && !!minors[0] && minors[0].mins !== minArr) {
			return {
				minArr: minors[0].mins
			};
		}
		return null;
	}

	componentDidMount() {
		this.fetchList();
	}

	fetchList = () => {
		const { dispatch } = this.props;
		const { gender, type, major, minor, pageNum, pageSize } = this.state;
		dispatch({
			type: `${namespace}/fetch`,
			payload: { gender, type, major, minor, pageNum, pageSize }
		});
	};

	onShowSizeChange = (pageNum, pageSize) => {
		console.warn('pageNum, pageSize', pageNum, pageSize);
		this.setState(
			{
				pageNum,
				pageSize
			},
			() => this.fetchList()
		);
	};

	handleChangePage = (pageNum) => {
		this.setState(
			{
				pageNum
			},
			() => this.fetchList()
		);
	};

	handleChangeRadio = (e, item) => {
		let minor = item.mins[0] ? item.mins[0] : 'NoMinor';
		this.setState(
			{
				major: e.target.value,
				minArr: item.mins,
				minor
			},
			() => this.fetchList()
		);
	};

	handleChangeRadioMin = (e) => {
		this.setState(
			{
				minor: e.target.value
			},
			() => this.fetchList()
		);
	};

	handleChangeRadioType = (e) => {
		console.warn(' e.target.value', e.target.value);
		this.setState(
			{
				type: e.target.value
			},
			() => this.fetchList()
		);
	};

	handleGoToDetail = (item) => {
		const { _id } = item;
		const { dispatch } = this.props;
		dispatch(
			routerRedux.push({
				pathname: '/book/detail',
				query: { id: _id }
			})
		);
	};
	// handleResolveImg=()=>{
	//   console.warn("this.imgRef.current", this.imgRef.current);
	//   // this.imgRef.current.style.display="none";
	//
	// };

	render() {
		const { category: { data = {} }, loading } = this.props;
		const { minors = [], books = {} } = data;
		const { pageNum, pageSize, gender, major, minor, minArr, type } = this.state;

		const mins = minArr ? minArr : minors[0] ? minors[0].mins[0] : [];
		const pagination = {
			showSizeChanger: true,
			onChange: this.handleChangePage,
			onShowSizeChange: this.onShowSizeChange,
			current: pageNum,

			total: books.total
		};
		return (
			<div className={styles.listWrapper}>
				<Row className={styles.rowWrapper}>
					作品类型：
					<Radio.Group value={major ? major : minors[0] && minors[0].major} buttonStyle="solid">
						{minors.map((v) => {
							return (
								<Radio.Button
									key={v.major}
									onClick={(e) => this.handleChangeRadio(e, v)}
									value={v.major}
								>
									{v.major}
								</Radio.Button>
							);
						})}
					</Radio.Group>
				</Row>

				{mins.length !== 0 ? (
					<Row className={styles.rowWrapper}>
						具体类型：
						<Radio.Group value={minor ? minor : mins[0]} buttonStyle="solid">
							{mins.map((v) => {
								return (
									<Radio.Button key={v} onClick={this.handleChangeRadioMin} value={v}>
										{v}
									</Radio.Button>
								);
							})}
						</Radio.Group>
					</Row>
				) : null}
				<Row className={styles.rowWrapper}>
					更多类型：
					<Radio.Group value={type} onChange={this.handleChangeRadioType} buttonStyle="solid">
						<Radio.Button value="hot">热门</Radio.Button>
						<Radio.Button value="new">新书</Radio.Button>
						<Radio.Button value="reputation">好评</Radio.Button>
						<Radio.Button value="over">完结</Radio.Button>
					</Radio.Group>
				</Row>

				{books.books ? (
					<List
						rowKey="_id"
						itemLayout="vertical"
						grid={{ gutter: 24, xl: 2, lg: 2, md: 1, sm: 1, xs: 1 }}
						size="large"
						loading={loading}
						pagination={books.total ? pagination : false}
						dataSource={books.books}
						renderItem={(item) => {
							const cover = item.cover.includes('/agent/')
								? decodeURIComponent(item.cover.replace(/\/agent\//, ''))
								: decodeURIComponent(item.cover);
							return (
								<List.Item className={styles.listItem} onClick={() => this.handleGoToDetail(item)}>
									<Row gutter={16}>
										<Col span={6} className={styles.left}>
											<img
												alt={item.title}
												src={cover}
												ref={this.imgRef}
												onError={this.handleResolveImg}
											/>
										</Col>
										<Col span={18} className={styles.right}>
											<p>{item.title}</p>
											<p>
												{item.author}
												&nbsp;&nbsp;|&nbsp;&nbsp;
												{item.majorCate}
											</p>
											<p>
												{item.shortIntro.length > 88 ? (
													item.shortIntro.substring(0, 88) + '...'
												) : (
													item.shortIntro
												)}
											</p>
											<p>
												<span>{item.latelyFollower}</span>
												&nbsp;&nbsp;人气&nbsp;&nbsp;|&nbsp;&nbsp;
												<span>
													{item.retentionRatio}
													&nbsp;%&nbsp;&nbsp;
												</span>
												留存率
											</p>
										</Col>
									</Row>
								</List.Item>
							);
						}}
					/>
				) : null}
			</div>
		);
	}
}

export default AppComponent;
