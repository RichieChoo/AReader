import request from '@/utils/request';

export async function getItem(params,namespace) {
    return request(`/api/${namespace}/get`,{
        method:'POST',
        body:params,
    });
}


