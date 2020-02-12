<template>
  <v-app>
    <v-content>
      <v-container class="" fluid>
        <v-row align="center" justify="center">
          <v-col cols="12" sm="8" md="4">
            <div class="LowerShelf">
              <h1>{{ shelfObject.title }}</h1>
              <v-row align="center" justify="center">
                <v-col cols="12">
                  <h3>Мерна единица в {{ calculationUnit }}</h3>
                  <div class="flex-center">
                    <v-radio-group
                      :value="calculationUnit"
                      @change="changeMetricUnit"
                      row
                    >
                      <template v-slot:label>
                        <div>Промени мерна единица</div>
                      </template>
                      <v-radio value="мм">
                        <template v-slot:label>
                          <div><strong class="primary--text">ММ</strong></div>
                        </template>
                      </v-radio>
                      <v-radio value="см">
                        <template v-slot:label>
                          <div><strong class="primary--text">СМ</strong></div>
                        </template>
                      </v-radio>
                    </v-radio-group>
                  </div>
                </v-col>
              </v-row>
            </div>
          </v-col>
        </v-row>
        <v-divider />
        <v-row align="center" justify="center">
          <v-col cols="12" sm="8" md="4">
            <v-form v-model="validWholeLenght">
              <v-text-field
                v-model="shelfLenght"
                :label="'Обща дължина на долната част в ' + calculationUnit"
                :rules="wholeLenghtRules"
                ref="wholeLenght"
                required
              ></v-text-field>
              <v-btn
                :disabled="!validWholeLenght"
                color="success"
                class="mr-4"
                @click="changeTheWholeLenght"
              >
                Запиши
              </v-btn>
            </v-form>
          </v-col>
        </v-row>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
export default {
  name: "LowerShelf",
  data: () => ({
    validWholeLenght: false,
    shelfLenght: 0
  }),
  computed: {
    shelfObject() {
      return this.$store.state.lowerShelf;
    },
    calculationUnit() {
      return this.$store.state.calculationUnit;
    },
    wholeLenghtRules() {
      return [
        v => !!v || "Общата дължина е задължителна",
        v => !isNaN(v) || "Дължината трябва да бъде число",
        v =>
          Number.isInteger(Number(v)) ||
          "Дължината трябва да бъде целочислено число"
      ];
    },
    wholeLenght() {
      return 0;
    }
  },
  methods: {
    changeMetricUnit(unit) {
      this.$store.dispatch("chnageMetricUnit", unit);
    },
    changeTheWholeLenght() {
      let formLenght = parseInt(this.shelfLenght, 10);
      if (formLenght != this.shelfObject.lenght) {
        this.$store.dispatch("chnageShelfLenght", formLenght);
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.flex-center {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
