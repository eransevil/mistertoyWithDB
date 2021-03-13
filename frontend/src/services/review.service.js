import {httpService} from './http.service.js'

function addReview(review) {
    return httpService.post('review',review)
  }


  
export const reviewService = {
    addReview,
  };