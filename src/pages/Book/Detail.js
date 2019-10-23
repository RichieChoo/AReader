import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';
import { Card, Form, Table, Upload, Button, message, Modal } from 'antd';
import { filterFalse } from '../../utils/utils';

const namespace = 'book';

const FormItem = Form.Item;

@connect(({ book, loading }) => ({
	book,
	loading: loading.models.book
}))
@Form.create()
class AppComponent extends PureComponent {
	constructor(props) {
		super(props);
	}
	componentDidMount() {
		const params = {};
		this.fetchList(params);
	}

	fetchList = (params) => {
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

	render() {
		const { book, loading } = this.props;
		return <div>书籍详情</div>;
	}
}

export default AppComponent;
