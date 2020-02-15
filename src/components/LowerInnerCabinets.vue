<template>
  <v-app>
    <v-content>
      <v-container class="wrapper" fluid>
        <v-row align="center" justify="center">
          <h1>Hello lower inner cabinets</h1>
        </v-row>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
export default {
  name: "LowerInnerCabinets",
  data: () => ({
    validWholeShelf: false,

  }),
  computed: {
    
  },
  methods: {
    
  },
  mounted() {
  }
};
</script>

<style scoped>
.shelf-form {
  padding-top: 2rem;
}
.flex-center {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.error-holder {
  color: red;
}
.wrapper {
  max-width: 80%;
}
.left-button {
  margin-right: 1rem;
  margin-left: 1rem;
  margin-top: 2rem;
}
.right-button {
  margin-left: 1rem;
  margin-right: 1rem;
  margin-top: 2rem;
}
.sides-added {
  color: #1976d2;
  text-align: center;
  margin-top: 2rem;
}
.delete-outer-side {
  top: 1rem;
}
.header-section {
  padding-top: 2rem;
  padding-bottom: 1rem;
}
.col-no-top-padding {
  padding-top: 0 !important;
}
.col-no-bottom-padding {
  padding-bottom: 0 !important;
}
</style>
