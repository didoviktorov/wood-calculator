<template>
  <v-menu bottom right rounded="lg" transition="slide-x-transition">
    <template v-slot:activator="{ on }">
      <v-btn
        id="side-menu-btn"
        fab
        dark
        fixed
        left
        bottom
        color="primary"
        v-on="on"
      >
        <v-icon>mdi-arrow-right-bold</v-icon>
      </v-btn>
    </template>

    <v-list id="side-menu-list">
      <v-list-item v-for="(item, i) in items" :key="i" class="scroll-list-item">
        <v-list-item-title @click="goToCabinet(i)">
          <v-avatar class="btn-icon">{{ i + 1 }}</v-avatar>
        </v-list-item-title>
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script>
export default {
  data: () => ({
    items: 0,
  }),
  methods: {
    goToCabinet(index) {
      this.$vuetify.goTo("#" + "cabinet" + index, { offset: 30 });
    },
  },
  mounted() {
    this.items = this.$store.state.sideMenuNumberOfCabinetsToShow;
  },
};
</script>

<style scoped>
#side-menu-list {
  background: transparent !important;
}
#side-menu-btn {
  margin-left: -2.75rem;
}
.v-menu__content {
  max-height: 90%;
  left: 0 !important;
  min-width: 0 !important;
  max-width: 2.5rem !important;
}
.btn-icon {
  color: #fff;
  background-color: #b1b6bd;
  border-radius: 0.3rem !important;
  min-width: 2rem !important;
  width: 2rem !important;
  height: 2rem !important;
}
.scroll-list-item {
  padding: 2px 2px !important;
  min-height: 0 !important;
}
</style>
