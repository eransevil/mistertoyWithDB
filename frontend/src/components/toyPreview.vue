<template>
  <li class="toy-preview-container">
    <span> Name: {{ toy.name }} </span>
    <span> Price: {{ toy.price }} </span>
    <span> In Stock: {{ toy.inStock }} </span>
    <span> Type: {{ toy.type }} </span>

    <el-button-group  class="btn-container">
      <el-button v-if="isUserAdmin"
        class="info-btn"
        type="primary"
        @click="editToy(toy._id)"
        icon="el-icon-edit"
      ></el-button>
      <el-button
        class="info-btn"
        type="info"
        @click="showDetails(toy._id)"
        icon="el-icon"
        >ℹ</el-button
      >
      <el-button v-if="isUserAdmin"
        type="danger"
        @click="removeToy(toy._id)"
        icon="el-icon-delete"
      ></el-button>
    </el-button-group>
  </li>
</template>

<script>
import Swal from 'sweetalert2'
export default {
  name: "toyPreview",
  props: {
    toy: Object,
  },

  data(){
    return{
      isUserAdmin:this.$store.getters.isAdmin

    }
  },

  methods: {
    showDetails(toyId) {
      this.$router.push(`/toy/${toyId}`);
    },
    removeToy(toyId) {
      Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
      Swal.fire(
      'Deleted!',
      'Your file has been deleted.',
      'success'
    )
       this.$emit("removeToy", toyId);

  }
})

    },
    editToy(toyId) {
      this.$router.push(`/toy/edit/${toyId}`);
    },
  },
};
</script>

<style>
</style>