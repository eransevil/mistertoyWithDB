<template>
  <section>
        <el-button size="small" class="back-btn" type="info" @click="back" icon="el-icon-arrow-left">Back</el-button>
      <h2>Add Toy</h2>
    <form id="addtoy" @submit.prevent="addToy" class="add-toy-form">
      <el-input placeholder="Name" v-model="toyToEdit.name"></el-input>
      <el-input placeholder="Price" v-model="toyToEdit.price"></el-input>
      <el-input placeholder="Type" v-model="toyToEdit.type"></el-input>
      <el-button @click="addToy"  icon="el-icon-check" circle></el-button>
    </form>
  </section>
</template>

<script>
import { toyService } from "../services/toy.service.js";
export default {
    name:'addToy',
    data(){
    return {
      toyToEdit: toyService.getEmptyToy(),
    };
    },
    methods:{
        addToy() {
      const toy = JSON.parse(JSON.stringify(this.toyToEdit));
      console.log(toy)
      this.$store
        .dispatch({ type: "addToy", toy })
        .then((toy) => {
            console.log(toy)
            this.$router.push(`/toy`)
          // showMsg('toy added')
        })
        .catch((err) => {
          // showMsg('Cannot add toy', 'danger')
        });
      this.toyToEdit = toyService.getEmptyToy();
    },
    back(){
          this.$router.push(`/toy/`);
    }
    },

}
</script>

<style>

</style>