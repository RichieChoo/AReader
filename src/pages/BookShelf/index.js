import React, {PureComponent, Fragment} from 'react';
import {connect} from 'dva';
import { Card, Form, Table,Upload, Button, message, Modal } from 'antd';
import { filterFalse } from '../../utils/utils';


const namespace = 'bookShelf';

const FormItem = Form.Item;




@connect(({bookShelf,loading}) => ({
    bookShelf,
    loading:loading.models.bookShelf,
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
        const { bookShelf, loading } = this.props;
        return <div>
          <Card>
            书架
          </Card>
        </div>;
    }
}

export default AppComponent;
