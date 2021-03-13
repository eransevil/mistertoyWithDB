<template>
  <section class="toy-app-container">
    <toy-filter />

    <el-button @click="toAdd" type="primary" plain > Add </el-button
    >
    <toy-list
      v-if="toysToShow && toysToShow.length"
      :toys="toysToShow"
      @removeToy="removeToy"
    />
    <div v-else-if="toysToShow && !toysToShow.length" class="no-toys">
      No toys to show
    </div>
    <!-- <img  src="../assets/img/loading.gif" /> -->
    <el-table v-else class="loading" v-loading="loading" style="width: 100%">
      dsd</el-table
    >

      <button class="open-chat-btn" @click="chatModal">Chat</button>
    <pop-up> 
      <chat-app slot='main' v-if="onChat" />
    </pop-up>
    <div class="block">
      <el-pagination
        @current-change="setPage"
        class="test"
        layout="prev, pager, next"
        :total="50"
      >
      </el-pagination>
    </div>

  </section>
</template>

<script>
import toyList from "../components/toyList.vue";
import toyFilter from "../components/toyFilter.vue";
import popUp from '../components/popUp.vue';
import chatApp from '../components/chatApp.vue';
export default {
  name: "toyApp",
  data() {
    return {
      loading: true,
      onChat: false,

    };
  },
  computed: {
    toysToShow() {
      return this.$store.getters.toysForDisplay;
    },
  },
  methods: {
    setPage(pageIdx) {
      console.log(pageIdx);
      this.$store.commit({ type: "setPage", pageIdx });
    },

    removeToy(toyId) {
      this.$store
        .dispatch({ type: "removeToy", toyId })
        .then(() => {
          // showMsg('toy removed')
        })
        .catch((err) => {
          // showMsg('Cannot remove toy', 'danger')
        });
    },
    toAdd(){
      this.$router.push('/addtoy')
    },
        chatModal() {
      this.onChat = !this.onChat;
    },
        escapekeylistener: function(evt) {
      if (evt.keyCode === 27 && this.onChat) {
        this.onChat = false;
      }
    }
  },
  created() {
      window.addEventListener('keyup',this.escapekeylistener);
  },
   destroyed: function() {
    window.removeEventListener('keyup', this.escapekeylistener);
  },

  components: {
    toyList,
    toyFilter,
    popUp,
    chatApp
  },
};
</script>

<style>
</style>

