<template>
  <div class="chat">
    <table v-if="massages">
      <tr v-for="(massage, idx) in massages" :key="idx">
        <td>{{ massage }}</td>
      </tr>
    </table>
    <div class="user-chat">
      <input ref="input" type="text" v-model="userMsg" />
      <button @click="sendMsg">Send</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userMsg: "",
      massages: [],
      autoMsg: "Sure thing, Honey",
    };
  },
  methods: {
    sendMsg() {
        if(!this.userMsg) return
      this.massages.push(this.userMsg);
      setTimeout(() => {
        this.massages.push(this.autoMsg);
        this.userMsg = "";
      },1000);
    },
    focusInput() {
      this.$refs.input.focus();
    }
  },
   mounted() {
    this.focusInput();
  },
};
</script>

<style>
</style>