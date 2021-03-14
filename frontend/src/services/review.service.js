import {httpService} from './http.service.js'

function addReview(reviewobj) {
    return httpService.post('review',reviewobj)
  }


  function query(filterBy = {}) {
    console.log(filterBy)
    return httpService.get(`review?toyId=${filterBy}` ,filterBy )
  }


  
export const reviewService = {
    addReview,
    query
  }; 