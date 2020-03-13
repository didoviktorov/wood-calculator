<template>
  <v-app>
    <v-app-bar class="toolbar-container" dense fixed clipped-left app>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>Меню</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-menu offset-y>
        <template v-slot:activator="{ on }">
          <v-btn color="primary" dark v-on="on">
            език
          </v-btn>
        </template>
        <v-list>
          <v-list-item v-for="(item, index) in languages" :key="index">
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>
    <v-navigation-drawer v-model="drawer" fixed clipped app>
      <v-list dense>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title>
              <router-link class="navigation-link" to="/"
                >Долни Шкафове</router-link
              >
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title>
              <router-link class="navigation-link" to="/upper"
                >Горни Шкафове</router-link
              >
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title>
              <router-link class="navigation-link" to="/other"
                >Други Детайли</router-link
              >
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <SaveProject />
    <v-content>
      <router-view />
    </v-content>
  </v-app>
</template>

<script>
// import Home from "./views/Home";
import SaveProject from "./components/SaveProject";

export default {
  name: "App",

  components: { SaveProject },

  data: () => ({
    drawer: false,
    languages: [{ title: "BG" }, { title: "EN" }]
  })
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
</style>
