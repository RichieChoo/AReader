import { getItem } from '@/services/book';
import { getMapAndOptionsFromList } from './../../../utils/lang';
import { routerRedux } from 'dva/router';
import { message } from 'antd';
import { getStorage } from '../../../utils/storage';
export default {
	namespace: 'book',

	state: {
		data: {}
	},

	effects: {
		*fetch({ payload, callback }, { call, put }) {
			const { id } = payload;
      const res = yield call(getItem, id);
			yield put({
        type: 'save',
        payload: res
      });
      if (callback) callback();
		}
	},

	reducers: {
		save(state, action) {
			return {
				...state,
				data: action.payload
			};
		}
	}
};
