import React, {PureComponent, Fragment} from 'react';
import {connect} from 'dva';
import { Card, Form, Table,Upload, Button, message, Modal } from 'antd';
import styles from '../List.less';
import { filterFalse } from '../../utils/utils';


const namespace = 'book';

const FormItem = Form.Item;




@connect(({book,loading}) => ({
    book,
    loading:loading.models.book,
}))
@Form.create()

class AppComponent extends PureComponent {
    componentDidMount() {
        const params = {
            pageNum: 1,
            pageSize:10,
            query:{}
        };
        this.fetchList(params);
    }

    fetchList = params => {
        const {dispatch} = this.props;
        dispatch({
            type: `${namespace}/fetch`,
            payload: {
                namespace,
            },
        });
    };


    render() {
        const { book, loading } = this.props;
        return <div>
            <Card/>
        </div>;
    }
}

export default AppComponent;
