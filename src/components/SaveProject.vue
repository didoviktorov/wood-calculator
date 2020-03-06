<template>
  <div class="my-2">
    <v-btn color="primary" @click="saveCurrentProject">запази проект</v-btn>
  </div>
</template>

<script>
export default {
  name: "SaveProject",
  components: {},
  data: () => ({}),
  computed: {},
  methods: {
    saveCurrentProject() {
      let filePath = "././assets/projects.json";
      let data = JSON.stringify(this.$store.state);
      let blob = new Blob([data], { type: "text/plain;charset=utf-8;" });

      if (navigator.msSaveBlob) {
        // IE 10+
        navigator.msSaveBlob(blob, filePath);
      } else {
        let link = document.createElement("a");
        if (link.download !== undefined) {
          // feature detection
          // Browsers that support HTML5 download attribute
          let url = URL.createObjectURL(blob);
          link.setAttribute("href", url);
          link.setAttribute("download", filePath);
          link.style.visibility = "hidden";
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        }
      }
    }
  }
};
</script>

<style scoped></style>
