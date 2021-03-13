<template >
  <section v-if="toy" class="toy-details-container">
    <p class="toy-details">name: {{ toy.name }}</p>
    <p class="toy-details">price: {{ toy.price }}</p>
    <p class="toy-details">type: {{ toy.type }}</p>
    <p class="toy-details">in Stock: {{ toy.inStock }}</p>
      <h3 > reviews: </h3>
      <h4 v-if="!toy.reviews"> This toy doesnt have review yet </h4>
      <p v-else v-for="(review, idx) in toy.reviews" :key="idx" >{{review}} </p>
          <el-button v-if="isUserLogged" title="add review"
        class="info-btn"
        type="success"
        @click="addReview(toy)"
        icon="el-icon-edit"
      ></el-button>
  </section>
</template>

<script>
import Swal from 'sweetalert2'
import { toyService } from "../services/toy.service.js";
export default {
  name: "toyDetails",
  data() {
    return {
      toy: null,
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
        this.$store.dispatch({type:"addReview", toy, review: result.value })
        .then((updateToy)=> {
          this.toy = updateToy;
        })
        
      }
    })
            // this.$router.push(`/toy/${toyId}/review`);

    }
  },
       computed:{
      isUserLogged(){
        return this.$store.getters.isUserLogged;
      },
 
},

  created() {
    const _id = this.$route.params.toyId;
    toyService.getById(_id).then((toy) => {
      this.toy = toy;
    });
  },
};
</script>

