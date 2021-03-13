// NOTE: this is a synchronous service on purpose
// meant to simplify first intro to Vuex

import {httpService} from './http.service.js'

const TOY_URL = (process.env.NODE_ENV !== 'development') ?
  'api/toy/' :
  'http://localhost:3030/api/toy/'
  
const KEY = 'TOY_DB';

export const toyService = {
  query,
  getById,
  remove,
  save,
  getEmptyToy: getEmptyToy,
};

 function query(filterBy = {name: '',type: 'all',inStock: true}) {
  return httpService.get(`toy?name=${filterBy.name}&type=${filterBy.type}&inStock=${filterBy.inStock}`)
}

function getById(id){
  return httpService.get(`toy/${id}`)
}

function remove(id){
  return httpService.delete(`toy/${id}`)
}

function save(toy){
    if(toy._id){
      return httpService.put(`toy/${toy._id}`, toy)
    }  
    else{
      return httpService.post(`toy`, toy)
    }
}

function getEmptyToy() {
  return {
    _id: null,
    name: "",
    price: 0,
    type: "",
    createdAt: Date.now(),
    inStock: true
  };
}