<template>
  <v-app>
    <v-content>
      <v-container class="wrapper" fluid>
        <v-row align="center" justify="center">
          <v-col cols="12">
            <v-divider />
            <h2>Долни вътрешни шкафове</h2>
            <v-divider />
          </v-col>
          <v-col cols="12" class="col-no-top-padding">
            <div>
              <h3>Промени стандартна височина на крачета</h3>
            </div>
          </v-col>
          <v-form v-model="validStandardFeetHeight" @submit.prevent>
            <v-row align="center" justify="center">
              <v-col cols="12" class="col-no-top-padding col-no-bottom-padding">
                <v-text-field
                  v-model="standardFeetHeight"
                  :label="'Стандартна височина на крачета в ' + calculationUnit"
                  :rules="this.$getnumberValidationRules"
                  outlined
                  dense
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12" class="col-no-top-padding">
                <v-btn
                  :disabled="!validStandardFeetHeight"
                  color="success"
                  @click="changeFeetsHeight"
                >
                  запази
                </v-btn>
              </v-col>
            </v-row>
          </v-form>
        </v-row>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
export default {
  name: "LowerInnerCabinets",
  data: () => ({
    validStandardFeetHeight: false,
    standardFeetHeight: 0
  }),
  computed: {
    calculationUnit() {
      return this.$store.state.calculationUnit;
    }
  },
  methods: {
    changeFeetsHeight() {
      let newHeight = parseInt(this.standardFeetHeight);
      console.log(newHeight);
    }
  },
  mounted() {
    this.standardFeetHeight = this.$store.state.standardFeetHeightOfCabinet;
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
