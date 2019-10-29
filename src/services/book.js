import request from '@/utils/request';
import api from "../utils/api";
export async function getItem(id) {
    return request(api.book.bookInfo(id));
}
export async function getItemChapters(id) {
    return request(api.book.bookChapters(id));
}


