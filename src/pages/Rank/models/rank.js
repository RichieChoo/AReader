// import { getItem} from '@/services/Rank';
import { getMapAndOptionsFromList } from './../../../utils/lang';
import { getMap } from '@/services/map';
import { routerRedux } from 'dva/router';
import { message } from 'antd';
import { getStorage } from '../../../utils/storage';

export default {
    namespace: 'rank',

    state: {
        data: [],
    },

    effects: {
        *fetch({ payload, callback }, { call, put }) {
            // const response = yield call(getItem);
            const rank = getStorage("rank");
            if(Array.isArray(rank)&& rank.length>0){
                yield put({
                    type: 'save',
                    payload: rank,
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
