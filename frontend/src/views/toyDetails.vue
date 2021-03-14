<template >
  <section v-if="toy" class=" toy-details-container">
    <p class="toy-details">name: {{ toy.name }}</p>
    <p class="toy-details">price: {{ toy.price }}</p>
    <p class="toy-details">type: {{ toy.type }}</p>
    <p class="toy-details">in Stock: {{ toy.inStock }}</p>
      <h3 > reviews: </h3>
      <h4 v-if="!reviews"> This toy doesnt have review yet </h4>
      <p v-else v-for="(review) in reviews" :key="review._id" >{{review.content}} </p>
          <el-button v-if="isUserLogged" title="add review"
        class="info-btn"
        type="success"
        @click="addReview(toy)"
        icon="el-icon-edit"
      ></el-button>
          <img-upload v-if="isUserLogged && isAdmin"   @save="saveImg" />

          <img class="toy-img" v-if="toy.url" src="http://res.cloudinary.com/sevilcloud/image/upload/v1615735992/1464135849939_nm1dfa.jpg">

  </section>
</template>

<script>
import imgUpload from '../components/img-upload';
import Swal from 'sweetalert2'
import { toyService } from "../services/toy.service.js";
export default {
  name: "toyDetails",
  data() {
    return {
      toy: null,
      reviews: null
    };
  },
  methods:{
      addReview(toy){
          Swal.fire({
      title: 'Add your Review',
      input: 'text',
      showCancelButton: true,
      confirmButtonText: 'Add',
      showLoaderOnConfirm: true,
      preConfirm: (msg) => {
        console.log(msg)
      },
      allowOutsideClick: () => !Swal.isLoading()
    })
    .then((result) => {
      if (result.isConfirmed) {
        Swal.fire({ 
          title: `Done, Thanks for the review`,
          imageUrl: result.value.avatar_url
        })
        this.$store.dispatch({type:"addReview", toy, content: result.value })
        .then((res)=> {
         this.reviews =  this.$store.getters.reviews
        })
        
      }
    })
            // this.$router.push(`/toy/${toyId}/review`);

    },
      saveImg(imgUrl) {
        this.toy.url = imgUrl
        try{
          this.$store.dispatch({ type: "addToy" ,toy: this.toy});
        }
        catch(err){
          console.log(err)
        }

    },
  },
       computed:{
      isUserLogged(){
        return this.$store.getters.isUserLogged;
      },
      isAdmin(){
        return this.$store.getters.isAdmin
      },
      
  
   
},

  created() {
    const _id = this.$route.params.toyId;
    toyService.getById(_id).then((toy) => {
      this.toy = toy;
    });
    this.$store.dispatch({type:"getReviews", filterBy:_id }).then((reviews)=>{
      this.reviews = reviews

    })

    

  },
    components: {
    imgUpload,
  }
};
</script>

