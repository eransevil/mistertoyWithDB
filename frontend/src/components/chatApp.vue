<template>
  <div class="chat">
    <table v-if="massages">
      <tr v-for="(massage, idx) in massages" :key="idx">
        <td> from: {{massage.from}} : {{ massage.txt }}</td>
      </tr>
    </table>
    <div class="user-chat">
      <span v-if="isTyping"> User is typing..</span>
      <input ref="input" type="text" v-model="msg.txt" />
      <button @click="sendMsg">Send</button>
    </div>
  </div>
</template> 

<script>
import {socketService} from '../services/socket.service.js';
export default {
  name:'chatApp',
    props: {
    toy: Object,
  },
  data() {
    return {
      massages: [],
      msg: {from: '', txt: ''},
      topic : '',
      isTyping:false
    };
  },
  methods: {
    sendMsg() {
      this.msg.from = this.$store.getters.loggedinUser.username
      socketService.emit('chat newMsg', this.msg)
      // this.massages.push(this.msg);
    },
    
    focusInput() {
      this.$refs.input.focus();
    },
       addMsg(msg) {
        this.massages.push(msg)
        this.$emit ('updateToy' , this.massages)
    },
    userTyping(istyping){
      this.isTyping = istyping
    }
  },
   mounted() {
    this.focusInput();
  },
  created() {
    this.massages = this.toy.massages || []
    const _id = this.$route.params.toyId;
    this.topic = _id
    socketService.setup();
    socketService.emit('chat topic', this.topic)
    socketService.on('user typing', this.userTyping)
    socketService.on('chat addMsg', this.addMsg)
  },
  destroyed() {
    socketService.off('chat addMsg', this.addMsg)
    socketService.off('user typing', this.userTyping)
    socketService.terminate();
  },

    watch: {
    msg:  {
       handler(val){
         console.log('watch?????')
            if(this.msg.txt.length >1) {
          socketService.emit('user is typing', true)
          }else{
            socketService.emit('user is typing', false)
          }
        // setTimeout(() => {
        //   socketService.emit('user is typing', false)

        // }, 1000);

     },
           deep: true
 

    },
    
}


};
</script>

<style>
</style>