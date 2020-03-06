<template>
  <v-app>
    <v-content>
      <v-container class="wrapper" fluid>
        <SaveProject />
        <v-row align="center" justify="center">
          <v-col cols="12">
            <h1>{{ shelfObject.title }}</h1>
          </v-col>
        </v-row>
        <v-divider />
        <div class="header-section">
          <h3>Стойности за целия горен шкаф</h3>
        </div>
        <v-form v-model="validWholeShelf" @submit.prevent>
          <v-row align="center" justify="center">
            <!-- Whole width region -->
            <v-col cols="12" sm="8" md="4">
              <v-text-field
                v-model="shelfWidth"
                :label="'Обща ширина на горната част в ' + calculationUnit"
                :rules="numberRules"
                outlined
                dense
                required
              ></v-text-field>
            </v-col>
            <!-- Whole height region -->
            <v-col cols="12" sm="8" md="4">
              <v-text-field
                v-model="shelfHeight"
                :label="'Обща височина на горната част в ' + calculationUnit"
                :rules="numberRules"
                outlined
                dense
                required
              ></v-text-field>
            </v-col>
            <!-- Whole depth region -->
            <v-col cols="12" sm="8" md="4">
              <v-text-field
                v-model="shelfDepth"
                :label="'Обща дълбочина на горната част в ' + calculationUnit"
                :rules="numberRules"
                outlined
                dense
                required
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="8" md="4" class="col-no-top-padding">
              <v-btn
                :disabled="!validWholeShelf"
                color="success"
                @click="changeTheWholeShelfProperties"
              >
                запази
              </v-btn>
            </v-col>
          </v-row>
        </v-form>
        <UpperCabinets v-if="showCabinetsCabinets" />
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import UpperCabinets from "@/components/UpperCabinets.vue";
import SaveProject from "@/components/SaveProject.vue";

export default {
  components: {
    UpperCabinets,
    SaveProject
  },
  data: () => ({
    validWholeShelf: false,
    shelfWidth: 0,
    shelfHeight: 0,
    shelfDepth: 0
  }),
  computed: {
    shelfObject() {
      return this.$store.state.upperShelf;
    },
    calculationUnit() {
      return this.$store.state.calculationUnit;
    },
    numberRules() {
      return this.$getnumberValidationRules;
    },
    showCabinetsCabinets() {
      return (
        this.$store.state.upperShelf.width > 0 &&
        this.$store.state.upperShelf.height > 0 &&
        this.$store.state.upperShelf.depth > 0
      );
    }
  },
  methods: {
    changeTheWholeShelfProperties() {
      let formWidth = parseInt(this.shelfWidth, 10);
      if (formWidth != this.shelfObject.width) {
        this.$store.dispatch("changeUpperShelfWidth", formWidth);
      }

      let formHeight = parseInt(this.shelfHeight, 10);
      if (formHeight != this.shelfObject.height) {
        this.$store.dispatch("changeUpperShelfHeight", formHeight);
      }

      let formDepth = parseInt(this.shelfDepth, 10);
      if (formDepth != this.shelfObject.depth) {
        this.$store.dispatch("changeUpperShelfDepth", formDepth);
      }
    }
  },
  mounted() {
    if (this.$store.state.upperShelf.width > 0) {
      this.shelfWidth = this.$store.state.upperShelf.width;
    }

    if (this.$store.state.upperShelf.height > 0) {
      this.shelfHeight = this.$store.state.upperShelf.height;
    }

    if (this.$store.state.upperShelf.depth > 0) {
      this.shelfDepth = this.$store.state.upperShelf.depth;
    }
  }
};
</script>

<style scoped></style>
