<template>
  <v-app>
    <v-content>
      <v-container class="wrapper" fluid> </v-container>
      <v-row align="center" justify="center">
        <v-col cols="12">
          <h1>{{ shelfObject.title }}</h1>
          <span>{{ getPureWidth }}</span>
        </v-col>
      </v-row>
    </v-content>
  </v-app>
</template>

<script>
export default {
  computed: {
    shelfObject() {},
    getPureWidth() {
      return this.$store.getters.getUpperShelfPureWidth;
    }
  }
};
</script>

<style scoped></style>
