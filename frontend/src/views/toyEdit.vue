<template>
  <form @submit.prevent="saveToy" v-if="toy" class="toy-edit-container">
    <h2> Edit Section</h2>
    <input type="text" v-model="toy.name"/>
    <input type="text" v-model="toy.price"/>
    <input type="text" v-model="toy.type"/>
    <input type="text" v-model="toy.inStock"/>
    <input type="text" v-model="test"/>
    <button>SAVE</button>
  </form>
</template>

<script>
import { toyService } from "../services/toy.service.js";
export default {
  name: "toyEdit",
  data() {
    return {
      toy: {
        name:'',
        price:0,
        type:'',
        inStock:true
      },
      test: "fdsf",
    }
  },
  methods: {
    saveToy() {
      this.$store
        .dispatch({ type: "addToy", toy: this.toy })
        .then(() => this.$router.push(`/toy/${this.toy._id}`));
    },
  },

  created() {
    // to bring from store??
    const id = this.$route.params.toyId;
    toyService.getById(id).then((toy) => {
      this.toy = JSON.parse(JSON.stringify(toy));
    });
  },
};
</script>

<style>
</style>