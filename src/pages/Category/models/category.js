import { getCats, getMinor, getCatsBooks } from "@/services/category";
import { getMapAndOptionsFromList } from "./../../../utils/lang";
import { getMap } from "@/services/map";
import { routerRedux } from "dva/router";
import { message } from "antd";

export default {
  namespace: "category",

  state: {
    data: {}

  },

  effects: {
    * fetch({ payload, callback }, { call, put }) {
      let {gender, type, major, minor, pageNum,pageSize} =payload;
      const minorRes = yield call(getMinor);
      if(!major){
        major = minorRes[gender]&&minorRes[gender][0].major;
      }
      if(!minor){
        minor = minorRes[gender]&&minorRes[gender][0].mins[0]
      }
      let catsBooks;
      if(minor==="NoMinor"){
        catsBooks = yield call(getCatsBooks,gender,type,major,false,pageNum,pageSize);
      }else {
        catsBooks= yield call(getCatsBooks,gender,type,major,minor,pageNum,pageSize);
      }

      if(catsBooks.ok){
        message.destroy();
        message.success("已获取最新内容");
        yield put({
          type: 'save',
          payload: {
            minors:minorRes[gender],
            books:catsBooks
          },
        });
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
