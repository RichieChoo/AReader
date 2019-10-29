import { getItem, getItemChapters } from '@/services/book';
import { getMapAndOptionsFromList } from './../../../utils/lang';
import { routerRedux } from 'dva/router';
import { message } from 'antd';
import { getStorage } from '../../../utils/storage';
export default {
	namespace: 'book',

	state: {
		data: {},
		chapters: {}
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
		},
		*fetchChapters({ payload, callback }, { call, put }) {
			const { id } = payload;
			const res = yield call(getItemChapters, id);
			yield put({
				type: 'saveChapters',
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
		},
		saveChapters(state, action) {
			return {
				...state,
				chapters: action.payload
			};
		}
	}
};
