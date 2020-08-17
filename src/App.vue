<template>
  <v-app>
    <v-navigation-drawer v-model="drawer" fixed clipped app>
      <v-list dense rounded>
        <v-list-item class="menu-item">
          <v-list-item-content>
            <v-list-item-title>
              <router-link class="navigation-link" to="/">{{
                $translate("lowerShelfs")
              }}</router-link>
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item class="menu-item">
          <v-list-item-content>
            <v-list-item-title>
              <router-link class="navigation-link" to="/upper">{{
                $translate("upperShelfs")
              }}</router-link>
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item class="menu-item">
          <v-list-item-content>
            <v-list-item-title>
              <router-link class="navigation-link" to="/other">{{
                $translate("otherDetails")
              }}</router-link>
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar dense fixed clipped-left app>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>{{ $translate("menu") }}</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-menu offset-y>
        <template v-slot:activator="{ on }">
          <v-btn v-on="on">
            <v-img
              v-if="selectedLang == 'BG'"
              src="./assets/bulgaria.png"
            ></v-img>
            <v-img v-else src="./assets/england.png"></v-img>
          </v-btn>
        </template>
        <v-list>
          <v-list-item-group v-model="selectedLangIndex" color="primary">
            <v-list-item @click="changeLang('BG')" dark>
              <v-list-item-title>
                <img src="./assets/bulgaria.png" />
              </v-list-item-title>
            </v-list-item>
            <v-list-item @click="changeLang('EN')">
              <v-list-item-title>
                <img src="./assets/england.png" />
              </v-list-item-title>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-menu>
    </v-app-bar>
    <SaveProject />
    <v-btn
      v-scroll="onScroll"
      v-show="fab"
      fab
      dark
      fixed
      bottom
      right
      color="primary"
      @click="toTop"
    >
      <v-icon>mdi-arrow-up-bold</v-icon>
    </v-btn>
    <v-content class="wrapper">
      <v-container fluid>
        <router-view />
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import SaveProject from "./components/SaveProject";

export default {
  name: "App",

  components: { SaveProject },

  data: () => ({
    drawer: false,
    selectedLang: "BG",
    selectedLangIndex: 0,
    fab: false,
  }),
  methods: {
    changeLang(lang) {
      if (lang != this.selectedLang) {
        this.selectedLang = lang;
        this.$store.dispatch("changeLanguage", lang);
      }
    },
    onScroll(e) {
      if (typeof window === "undefined") return;
      const top = window.pageYOffset || e.target.scrollTop || 0;
      this.fab = top > 20;
    },
    toTop() {
      this.$vuetify.goTo(0);
    },
  },
};
</script>

<style>
@import "./assets/site.css";

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.router-link-exact-active {
  color: #1976d2 !important;
}

.navigation-link {
  text-decoration: none;
  font-size: 1.2rem;
}

.v-application a:not(.router-link-exact-active) {
  color: #121412 !important;
}

.menu-item {
  text-align: left;
}
</style>
