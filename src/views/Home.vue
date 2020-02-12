<template>
  <div class="home">
    <div>{{ calculationUnit }}</div>
    <LowerShelf :shelf="shelfObject" />
  </div>
</template>

<script>
// @ is an alias to /src
import LowerShelf from "@/components/LowerShelf.vue";

export default {
  name: "Home",
  components: {
    LowerShelf
  },
  computed: {
    shelfObject() {
      return this.$store.state.lowerShelf;
    },
    calculationUnit() {
      return this.$store.state.calculationUnit;
    }
  }
};
</script>
