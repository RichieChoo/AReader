import request from '@/utils/request';
import api from "../utils/api";

//获取大分类
export async function getCats() {
    return request(api.category.getCats);
}

//获取小类
export async function getMinor() {
  return request(api.category.getMinor);
}

/*
*获取分类书籍
*@param gender 性别排行（male）
*       type 排行类型（hot）
*       minor 小类
*       major 大类
*       start 分页开始
* */
//获取分类书籍  @param gender 性别排行（male）type 排行类型（hot）major 大类 minor 小类  start 分页开始
export async function getCatsBooks(gender, type, major, minor, pageNum,pageSize) {
  return request(api.category.getCatsBooks(gender, type, major, minor, pageNum,pageSize));
}

