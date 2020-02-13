<template>
  <v-app>
    <v-content>
      <v-container class="wrapper" fluid>
        <v-row align="center" justify="center">
          <v-col cols="12" sm="8" md="4">
            <div class="LowerShelf">
              <h1>{{ shelfObject.title }}</h1>
              <!-- Metric unit region -->
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
        <v-form v-model="validWholeShelf" class="shelf-form">
          <v-row align="center" justify="center">
            <!-- Whole width region -->
            <v-col cols="12" sm="8" md="4">
              <v-text-field
                v-model="shelfWidth"
                :label="'Обща ширина на долната част в ' + calculationUnit"
                :rules="numberRules"
                required
              ></v-text-field>
            </v-col>
            <!-- Whole height region -->
            <v-col cols="12" sm="8" md="4">
              <v-text-field
                v-model="shelfHeight"
                :label="'Обща височина на долната част в ' + calculationUnit"
                :rules="numberRules"
                required
              ></v-text-field>
            </v-col>
            <!-- Whole depth region -->
            <v-col cols="12" sm="8" md="4">
              <v-text-field
                v-model="shelfDepth"
                :label="'Обща дълбочина на долната част в ' + calculationUnit"
                :rules="numberRules"
                required
              ></v-text-field>
            </v-col>
            <v-btn
              :disabled="!validWholeShelf"
              color="success"
              class="mr-4"
              @click="changeTheWholeShelfProperties"
            >
              Запиши
            </v-btn>
          </v-row>
        </v-form>
        <!-- Static cabinets region -->
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
              class="left-button"
              @click="addStaticCabintes"
            >
              добави
            </v-btn>
            <v-btn
              :disabled="allStaticWidths.length == 0"
              class="right-button"
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
                  :rules="numberRules"
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
    validWholeShelf: false,
    validStaticWidth: false,
    shelfWidth: 0,
    shelfHeight: 0,
    shelfDepth: 0,
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
    numberRules() {
      return [
        v => !!v || "Тази стойност е задължителна",
        v => !isNaN(v) || "Стойността трябва да бъде число",
        v =>
          Number.isInteger(Number(v)) ||
          "Стойността трябва да бъде целочислено число"
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
    changeTheWholeShelfProperties() {
      let formWidth = parseInt(this.shelfWidth, 10);
      if (formWidth != this.shelfObject.width) {
        this.$store.dispatch("changeShelfWidth", formWidth);
      }

      let formHeight = parseInt(this.shelfHeight, 10);
      if (formHeight != this.shelfObject.height) {
        this.$store.dispatch("changeShelfHeight", formHeight);
      }

      let formDepth = parseInt(this.shelfDepth, 10);
      if (formDepth != this.shelfObject.depth) {
        this.$store.dispatch("changeShelfDepth", formDepth);
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
    }

    if (this.$store.state.lowerShelf.height > 0) {
      this.shelfHeight = this.$store.state.lowerShelf.height;
    }

    if (this.$store.state.lowerShelf.depth > 0) {
      this.shelfDepth = this.$store.state.lowerShelf.depth;
    }
  }
};
</script>

<style scoped>
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
}
.right-button {
  margin-left: 1rem;
}
</style>
