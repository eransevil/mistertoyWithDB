import { reviewService } from '../services/review.service.js';


export const reviewStore = {
    state: {
        reviews:[]

     
    },
    getters: {
      reviews(state){
        return state.reviews
      }
      },
 
    mutations: {
      setReviews(state, {reviews}){
        state.review = reviews
      },
      addReviews(state, {reviewToAdd}){
        state.reviews.push(reviewToAdd)

      }
     
    },
    actions: {

     async getReviews({commit} , {filterBy} ){
       try{
         const reviews = await reviewService.query(filterBy)
         commit({type: 'setReviews',reviews,});
         return reviews
       }
       catch(err){
        console.log('Store: Cannot get reviews', err);

       }
      
     },

      async addReview ({commit} , {toy , content}){
        try {
          const reviewobj = {content, toyId:toy._id}
          const reviewToAdd = await reviewService.addReview(reviewobj)
          commit({type: 'addReviews' ,reviewToAdd});
              return reviewToAdd;
        }
        catch(err){
          console.log('Store: Cannot add review', err);
        }
 
     }



}
}