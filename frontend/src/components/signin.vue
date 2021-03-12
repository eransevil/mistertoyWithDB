<template>
  <section>
        <pre class="pre-txt">
            AdminUser:erans
            password:777
            
            regular:semis
            password:888
        </pre>
        <section v-if ="!isUserLogged ">
        <h2 >Login</h2>
        <form  @submit.prevent="login">
            <input class="sign-input" type="text" placeholder="userName" v-model="credentials.username" />
            <input class="sign-input" type="password" placeholder="password" v-model="credentials.password" />
            <el-button native-type="submit" class="logout-btn" size="medium " type="primary" plain >Login</el-button>
        </form>

        <div v-if="!isSignup">
            <h2>Doesnt have a user?</h2>
            <el-button v-if="!isSignup" @click="ToggleSignup" class="logout-btn" size="medium " type="primary" plain >Sign Up</el-button>
        </div>
        <form v-if="isSignup" @submit.prevent="signup">
                <input class="sign-input" type="text" placeholder="Your fullname" v-model="signupCredentials.fullname" />
                <input class="sign-input" type="text" placeholder="Your username" v-model="signupCredentials.username" />
                <input class="sign-input" type="password" v-model="signupCredentials.password" />
            <el-button native-type="submit" class="logout-btn" size="medium " type="primary" plain >Sign Up</el-button>
        </form>
    </section>

  </section>
</template>

<script>
export default {
  data() {
        return {
            loggedinUser: this.$store.getters.loggedinUser,
            credentials: {
                username: 'erans',
                password: '777'
            },
            signupCredentials: {
                username: 'erans',
                password: '777',
                fullname: 'eran sevil'
            },
            isSignup:false

        }
    },
    methods: {
      async login() {
          try{
          const user = JSON.parse(JSON.stringify(this.credentials));
          const loggedInUser =  await this.$store.dispatch({ type: "login", user });
          this.ToggleSignup()
          this.handleEntrance(loggedInUser)

          }
            catch(err){
                 alert('username/password incorrect')
            }
                
        },
        async logout() {
            try{
                const user = this.$store.getters.loggedinUser
                await this.$store.dispatch({type:"logout", user })
                this.loggedinUser = null
                this.ToggleSignup()

            }
            catch(err){
                console.log(err)
            }
        },
       async signup() {
            const user = JSON.parse(JSON.stringify(this.signupCredentials))
            try{
                const loggedInUser =  await this.$store.dispatch({ type: "signup", user });
                 this.ToggleSignup()
                this.handleEntrance(loggedInUser)
            }
             catch(err){
                 alert('username/password incorrect')
            }
        },
        handleEntrance(user) {
            this.loggedinUser = user
            // eventBus.$emit('show-msg', this.loggedinUser)
            this.$router.push(`/toy/`);
        },
        ToggleSignup(){
            this.isSignup = !this.isSignup;
        }
    },
    computed:{
        isUserLogged(){
            return this.$store.getters.isUserLogged
        }
    },
    created() {
        // this.loggedinUser =this.$store.getters.loggedinUser;
        // this.isUserLogged = this.$$store.getters.isUserLogged
    }
}
</script>

<style>

</style>