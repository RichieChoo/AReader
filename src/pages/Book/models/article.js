// import { getItem} from '@/services/book';
import { getMapAndOptionsFromList } from "./../../../utils/lang";
import { getMap } from "@/services/map";
import { routerRedux } from "dva/router";
import { message } from "antd";
import { getStorage } from "../../../utils/storage";

export default {
  namespace: "book",

  state: {
    data: []
  },

  effects: {
    *fetch({ payload, callback }, { call, put }) {
      // const response = yield call(getItem);
      const book = getStorage("book");
      if (Array.isArray(book) && book.length > 0) {
        yield put({
          type: "save",
          payload: book
        });
        if (callback) callback();
      }
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
