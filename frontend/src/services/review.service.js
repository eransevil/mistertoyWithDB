import {httpService} from './http.service.js'

function addReview(reviewobj) {
    return httpService.post('review',reviewobj)
  }


  function query(filterBy = {}) {
    return httpService.get(`review?toyId=${filterBy}` ,filterBy )
  }


  
export const reviewService = {
    addReview,
    query
  }; 