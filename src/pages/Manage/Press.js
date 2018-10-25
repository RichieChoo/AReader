import React, {PureComponent, Fragment} from 'react';
import {connect} from 'dva';
import { Card, Form, Table,Upload, Button, message, Modal } from 'antd';
import styles from '../List.less';
import { filterFalse } from '../../utils/utils';


const namespace = 'sort';

const FormItem = Form.Item;




@connect(({book,loading}) => ({
    book,
    loading:loading.models.book,
}))
@Form.create()

class AppComponent extends PureComponent {
    componentDidMount() {
        this.fetchList();
    }

    fetchList = () => {
        const {dispatch} = this.props;
        dispatch({
            type: `${namespace}/fetch`,
            payload: {
                type:"press",
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
