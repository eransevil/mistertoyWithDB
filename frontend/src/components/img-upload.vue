  <template>
  <div class="img-upload-container">
    <h1>Add toy image</h1>
    <template v-if="!isLoading">
      <!-- UPLOAD IMG --> 
      <label
        for="imgUploader"
        @drop.prevent="handleFile"
        @dragover.prevent="dragOver"
        @dragleave="isDragOver = false"
        :class="{ drag: isDragOver }"
      >
        <img class="upload-img"
          v-if="!isDragOver"
          src="../assets/img/upload.png"
          alt=""
        />

        <h3 v-else>Drop image here</h3>
      </label>
      <!-- HIDDEN INPUT -->
      <input  class="img-upload-input"
        type="file"
        name="img-uploader"
        id="imgUploader"
        @change="handleFile"
      />
    </template>
    <!-- LOADER -->
    <img
      class="loader"
      v-else
      src="https://i.pinimg.com/originals/65/ba/48/65ba488626025cff82f091336fbf94bb.gif"
      alt=""
    />
  </div>
</template>

<script>
import { uploadImg } from "@/services/img-upload.service.js";
export default {
  data() {
    return {
      isLoading: false,
      isDragOver: false,
    };
  },
  methods: {
    dragOver(ev) {
      this.isDragOver = true;
    },
    handleFile(ev) {
      let file;
      if (ev.type === "change") file = ev.target.files[0];
      else if (ev.type === "drop") file = ev.dataTransfer.files[0];
      this.onUploadImg(file);
    },

    async onUploadImg(file) {
      this.isLoading = true;
      this.isDragOver = false;
      const res = await uploadImg(file);
      this.$emit("save", res.url);
      this.isLoading = false;
    },
  },
};
</script>

