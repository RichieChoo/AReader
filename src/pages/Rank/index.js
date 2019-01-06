import React, {PureComponent, Fragment} from 'react';
import {connect} from 'dva';
import { Card, Form, Table,Upload, Button, message, Modal } from 'antd';
import { filterFalse } from '../../utils/utils';


const namespace = 'rank';

const FormItem = Form.Item;




@connect(({rank,loading}) => ({
    rank,
    loading:loading.models.rank,
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
        const { rank, loading } = this.props;
        return <div>
          <Card>
            rank
          </Card>
        </div>;
    }
}

export default AppComponent;
