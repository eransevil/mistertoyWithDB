import Axios from 'axios'

const BASE_URL = process.env.NODE_ENV === 'production'
    ? '/api/'
    : '//localhost:3030/api/'


var axios = Axios.create({
    withCredentials: true
})

export const httpService = {
    get(endpoint, data) {
        return ajax(endpoint, 'GET', data)
    },
    post(endpoint, data) {
        console.log(data)
        return ajax(endpoint, 'POST', data)
    },
    put(endpoint, data) {
        return ajax(endpoint, 'PUT', data)
    },
    delete(endpoint, data) {
        return ajax(endpoint, 'DELETE', data)
    },
 


}

async function ajax(endpoint, method = 'get', data = null ) {
    try {
        const res = await axios({
            url: `${BASE_URL}${endpoint}`,
            method,
            data,
        })
        return res.data
    } catch (err) {
        console.log(`Had Issues ${method}ing to the backend, endpoint: ${endpoint}, with data: ${data}`)
        console.dir(err)
        if (err.response && err.response.status === 401) {
            
        }
        throw err
    }
}

// const url = `${BASE_URL}${endpoint}`;

// const res = await axios({
//     url,
//     method,
//     data,
//     params,
// });
// return res.data;




// async function ajax(endpoint, method = 'get', data = null, extraParams) {
//     try {
//         let request = {
//             url: `${BASE_URL}${endpoint}`,
//             method,
//             data,
//         }
//         if(extraParams)
//         request.params = data;