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
            <v-form v-model="validWholeWidth">
              <v-text-field
                v-model="shelfWidth"
                :label="'Обща ширина на долната част в ' + calculationUnit"
                :rules="wholeWidthRules"
                ref="wholeLength"
                required
              ></v-text-field>
              <v-btn
                :disabled="!validWholeWidth"
                color="success"
                class="mr-4"
                @click="changeTheWholeLenght"
              >
                Запиши
              </v-btn>
            </v-form>
          </v-col>
        </v-row>
        <v-row align="center" justify="center">
          <v-col cols="12">
            Статични размери брой {{ allStaticWidths.length }}
          </v-col>
          <v-col
            cols="12"
            v-if="allStaticWidths.length == maxNumberOfStaticCabinets"
          >
            <span class="error-holder">
              Достигнат е максималния брой на шкафове
              {{ maxNumberOfStaticCabinets }}
            </span>
          </v-col>
        </v-row>
        <v-row align="center" justify="center">
          <v-col cols="12">
            <v-btn
              :disabled="allStaticWidths.length == maxNumberOfStaticCabinets"
              @click="addStaticCabintes"
            >
              добави
            </v-btn>
            <v-btn
              :disabled="allStaticWidths.length == 0"
              @click="removeStaticcabintes"
            >
              премахни
            </v-btn>
          </v-col>
        </v-row>
        <v-row align="center" justify="center">
          <v-col cols="12" sm="8" md="4">
            <v-form
              v-if="allStaticWidths.length > 0"
              v-model="validStaticWidth"
            >
              <div>
                <v-text-field
                  v-for="(item, index) in allStaticWidths"
                  :key="index"
                  v-model="item.width"
                  :label="
                    'Ширина на статичен шкаф ' +
                      (index + 1) +
                      ' в ' +
                      calculationUnit
                  "
                  :rules="staticWidthRules"
                  ref="wholeLength"
                  required
                ></v-text-field>
              </div>
              <v-btn
                :disabled="!validStaticWidth"
                color="success"
                class="mr-4"
                @click="addStaticWidth"
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
    validWholeWidth: false,
    validStaticWidth: false,
    shelfWidth: 0,
    allStaticWidths: [],
    maxNumberOfStaticCabinets: 5
  }),
  computed: {
    shelfObject() {
      return this.$store.state.lowerShelf;
    },
    calculationUnit() {
      return this.$store.state.calculationUnit;
    },
    wholeWidthRules() {
      return [
        v => !!v || "Общата ширина е задължителна",
        v => !isNaN(v) || "Ширината трябва да бъде число",
        v =>
          Number.isInteger(Number(v)) ||
          "Ширината трябва да бъде целочислено число"
      ];
    },
    staticWidthRules() {
      return [
        v => !!v || "Общата ширина е задължителна",
        v => !isNaN(v) || "Ширината трябва да бъде число",
        v =>
          Number.isInteger(Number(v)) ||
          "Ширината трябва да бъде целочислено число"
      ];
    },
    wholeWidth() {
      return 0;
    }
  },
  methods: {
    changeMetricUnit(unit) {
      this.$store.dispatch("cnangeMetricUnit", unit);
    },
    changeTheWholeLenght() {
      let formLenght = parseInt(this.shelfWidth, 10);
      if (formLenght != this.shelfObject.width) {
        this.$store.dispatch("changeShelfWidth", formLenght);
      }
    },
    addStaticCabintes() {
      if (this.allStaticWidths.length < this.maxNumberOfStaticCabinets) {
        let currentCabinet = {
          width: 0
        };
        this.allStaticWidths.push(currentCabinet);
      }
    },
    removeStaticcabintes() {
      if (this.allStaticWidths.length > 0) {
        if (
          this.allStaticWidths.length ==
          this.$store.state.lowerShelf.staticCabinets.length
        ) {
          this.$store.dispatch("removeStaticCabinet");
        }
        this.allStaticWidths.splice(this.allStaticWidths.length - 1);
      }
    },
    addStaticWidth() {
      this.$store.dispatch("addStaticFieldsWidth", this.allStaticWidths);
    }
  },
  mounted() {
    for (let cabinet of this.$store.state.lowerShelf.staticCabinets) {
      let currentCabinet = {
        width: cabinet.width
      };
      this.allStaticWidths.push(currentCabinet);
    }

    if (this.$store.state.lowerShelf.width > 0) {
      this.shelfWidth = this.$store.state.lowerShelf.width;
      this.validWholeWidth = true;
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
.error-holder {
  color: red;
}
</style>
