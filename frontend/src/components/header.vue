<template>
  <section class="header-container">
    <el-menu
      :default-active="activeIndex2"
      class="el-menu-demo"
      mode="horizontal"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
    >
      <el-menu-item index="1">
        <router-link to="/">Home</router-link></el-menu-item
      >
      <el-menu-item index="4" v-if="loggedinUser">
        <router-link to="/toy">Toys</router-link>
      </el-menu-item>
      <el-submenu index="2" v-if="loggedinUser">
        <template slot="title">Dashboard</template>
        <el-menu-item index="2-1" @click="movePage('/dashboard')"
          >Doughnut Chart
        </el-menu-item>
        <el-menu-item disabled index="2-2">In progress</el-menu-item>
      </el-submenu>
    <div class="logout-container" v-if ="loggedinUser"> 
           <span class="greet-msg"> Hello {{fullname}} </span>
               <el-button class="logout-btn" size="mini" @click="logout" type="primary" plain >Log Out</el-button
    >
            <!-- <button class="log-btn" @click="logout">Logout</button> -->
        </div> 
    </el-menu>
  </section>
</template>

<script>
export default {
  data() {
    return {
      activeIndex: "1",
      activeIndex2: "1",
    };
  },
  methods: {
    movePage(path) {
      this.$router.push(path);
    },
    async logout(){
        try{
            const user = this.$store.getters.loggedinUser
            await this.$store.dispatch({type:"logout", user })
            if(this.$route.path!=='/') this.$router.push('/')
            

          }
        catch(err){
              console.log(err)
          }
    }
  },

  computed:{
      loggedinUser(){
        return this.$store.getters.loggedinUser;
      },
      fullname(){
        const user =  this.$store.getters.loggedinUser
        return user.fullname
      }
    }
  
};
</script>

<style>
</style>