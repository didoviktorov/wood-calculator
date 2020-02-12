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
            <v-form v-model="validWholeLength">
              <v-text-field
                v-model="shelfLenght"
                :label="'Обща ширина на долната част в ' + calculationUnit"
                :rules="wholeLengthRules"
                ref="wholeLength"
                required
              ></v-text-field>
              <v-btn
                :disabled="!validWholeLength"
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
            Статични размери брой {{ shelfObject.staticCabinets.length }}        
          </v-col>
        </v-row>
         <v-row align="center" justify="center">
          <v-col cols="12">
             <v-btn @click="addStaticCabintes">
              добави
            </v-btn>
            <v-btn
              :disabled="shelfObject.staticCabinets.length == 0"
              @click="removeStaticcabintes"
            >
              премахни
            </v-btn>
            <v-btn 
              v-if="shelfObject.staticCabinets.length > 0"
              :disabled="shelfObject.staticCabinets.length == 0"
              @click="addStaticWidth"
            >
              въведи размер
            </v-btn>
          </v-col>
         </v-row>
         <v-row align="center" justify="center">
           <v-col cols="12" sm="8" md="4">
             <v-form v-if="shelfObject.staticCabinets.length > 0" v-model="validStaticLength" ref="staticForm">
              <v-text-field
                v-model="allStaticWidth"
                :label="'Ширина на статичен шкаф ' + calculationUnit"
                :rules="staticLengthRules"
                ref="wholeLength"
                required
              ></v-text-field>
              <v-btn
                :disabled="!validStaticLength"
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
    validWholeLength: false,
    validStaticLength: false,
    shelfLenght: 0,
    allStaticWidth: 0
  }),
  computed: {
    shelfObject() {
      return this.$store.state.lowerShelf;
    },
    calculationUnit() {
      return this.$store.state.calculationUnit;
    },
    wholeLengthRules() {
      return [
        v => !!v || "Общата ширина е задължителна",
        v => !isNaN(v) || "Ширината трябва да бъде число",
        v =>
          Number.isInteger(Number(v)) ||
          "Ширината трябва да бъде целочислено число"
      ];
    },
    staticLengthRules() {
      return [
        v => !!v || "Общата ширина е задължителна",
        v => !isNaN(v) || "Ширината трябва да бъде число",
        v =>
          Number.isInteger(Number(v)) ||
          "Ширината трябва да бъде целочислено число"
      ];
    },
    wholeLength() {
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
    },
    addStaticCabintes() {
      let currentCabinet = {
        length: 0
      };
      this.$store.dispatch("addStaticCabinet", currentCabinet);
    },
    removeStaticcabintes() {
       this.$store.dispatch("removeStaticCabinet");
    },
    addStaticWidth() {
      this.$store.dispatch("addStaticFieldsWidth", this.allStaticWidth);
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
