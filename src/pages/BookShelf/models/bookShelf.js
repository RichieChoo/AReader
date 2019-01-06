// import { getItem} from '@/services/bookShelf';
import { getMapAndOptionsFromList } from './../../../utils/lang';
import { getMap } from '@/services/map';
import { routerRedux } from 'dva/router';
import { message } from 'antd';
import { getStorage } from '../../../utils/storage';

export default {
    namespace: 'bookShelf',

    state: {
        data: [],
    },

    effects: {
        *fetch({ payload, callback }, { call, put }) {
            // const response = yield call(getItem);
            const bookShelf = getStorage("bookShelf");
            if(Array.isArray(bookShelf)&& bookShelf.length>0){
                yield put({
                    type: 'save',
                    payload: bookShelf,
                });
                if(callback) callback();
            }
        }
    },

    reducers: {
        save(state, action) {
            return {
                ...state,
                data: action.payload,
            };
        }
    },
};
