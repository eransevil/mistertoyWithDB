<template>
  <div class="home">
    <sign-in/>
    <hello-world msg="You got a friend in Vue... " />
    <img class="toy-logo" src="../assets/img/logo.png" />
  </div>
</template>

<script>
// @ is an alias to /src
import helloWorld from "@/components/helloWorld.vue";
import signIn from '@/components/signin.vue'

export default {
  name: "home",
  components: {
    helloWorld,
    signIn
  },

};
</script>
