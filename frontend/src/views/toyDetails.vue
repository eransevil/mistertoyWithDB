<template >
  <section v-if="toy" class="toy-details-container">
    <section class="toy-info"> 
    <p class="toy-details">name: {{ toy.name }}</p>
    <p class="toy-details">price: {{ toy.price }}</p>   
    <p class="toy-details">type: {{ toy.type }}</p> 
    <p class="toy-details">in Stock: {{ toy.inStock }}</p>
    </section>
    <h3>reviews:</h3>
    <h4 v-if="!reviews.length">This toy doesnt have review yet</h4>
    <p v-else v-for="review in reviews" :key="review._id">
      {{ review.content }}
    </p>
    <el-button
      v-if="loggedinUser"
      title="add review"
      class="info-btn"
      type="success"
      @click="addReview(toy)"
      icon="el-icon-edit"
    ></el-button>
    <img-upload v-if="loggedinUser && isAdmin" @save="saveImg" />

    <img
      class="toy-img"
      v-if="toy.url"
      :src="toy.url"
    />

    <button class="open-chat-btn" @click="chatModal">Chat</button>
    <pop-up >
      <chat-app @updateToy="updateToy" :toy="toy" slot="main" v-if="onChat" />
    </pop-up>
  </section>
</template>

<script>
import imgUpload from "../components/img-upload";
import Swal from "sweetalert2";
import { toyService } from "../services/toy.service.js";
import chatApp from "../components/chatApp.vue";
import popUp from "../components/popUp.vue";
export default {
  name: "toyDetails",
  data() {
    return {
      toy: null,
      onChat: false,
 
    };
  },
  methods: {
    addReview(toy) {
      Swal.fire({
        title: "Add your Review",
        input: "text",
        showCancelButton: true,
        confirmButtonText: "Add",
        showLoaderOnConfirm: true,
        preConfirm: (msg) => {
          console.log(msg);
        },
        allowOutsideClick: () => !Swal.isLoading(),
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire({
            title: `Done, Thanks for the review`,
            imageUrl: result.value.avatar_url,
          });
          this.$store.dispatch({
            type: "addReview",
            toy,
            content: result.value,
          });
        }
      });
    },
    saveImg(imgUrl) {
      this.toy.url = imgUrl;
      try {
        this.$store.dispatch({ type: "addToy", toy: this.toy })
        
      } catch (err) {
        console.log(err);
      }
    },
    chatModal() {
      this.onChat = !this.onChat;
    },
    escapekeylistener: function (evt) {
      if (evt.keyCode === 27 && this.onChat) {
        this.onChat = false;
      }
    },

    updateToy(massages){
      this.toy.massages = massages
      try{
        this.$store.dispatch({ type: "addToy", toy: this.toy });
      }
      catch(err){
        console.log(err)
      }

    }
  },
  computed: {
    loggedinUser() {
      return this.$store.getters.loggedinUser;
    },
    isAdmin() {
      return this.$store.getters.isAdmin;
    },

    reviews() {
      return this.$store.getters.reviews;
    },
  },

  created() {
    window.addEventListener("keyup", this.escapekeylistener);
    const _id = this.$route.params.toyId;
    toyService.getById(_id).then((toy) => {
      this.toy = toy;
    });
    this.$store.dispatch({ type: "getReviews", filterBy: _id });
  },

  destroyed: function () {
    // window.removeEventListener('keyup', this.escapekeylistener);
  },
  components: {
    imgUpload,
    chatApp,
    popUp,
  },
};
</script>

