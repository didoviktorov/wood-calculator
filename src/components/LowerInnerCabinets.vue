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
        <!-- inner cabinets region -->
        <v-row align="center" justify="center">
          <v-col cols="12" class="col-no-top-padding">
            <v-divider />
            <div>
              <h3>Добави брой вътрешни шкафове</h3>
            </div>
          </v-col>
        </v-row>
        <v-form v-model="validNumberOfCabinets" @submit.prevent>
          <v-row align="center" justify="center">
            <v-col cols="12" class="col-no-top-padding col-no-bottom-padding">
              <v-text-field
                v-model="numberOfCabinets"
                :label="'Брой вътрешни шкафове'"
                :rules="this.$getnumberValidationRules"
                outlined
                dense
                required
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row align="center" justify="center">
            <v-col cols="12" sm="6" md="3" class="col-no-top-padding">
              <v-btn :disabled="validateAddButton" @click="addInnerCabinets">
                добави
              </v-btn>
            </v-col>
            <v-col cols="12" sm="6" md="3" class="col-no-top-padding">
              <v-btn :disabled="!validateAddButton">
                прегледай
              </v-btn>
            </v-col>
            <v-col cols="12" sm="6" md="3" class="col-no-top-padding">
              <v-btn
                :disabled="!validateAddButton"
                @click="addInnerCabinetsToStore"
                color="success"
              >
                запази
              </v-btn>
            </v-col>
            <v-col cols="12" sm="6" md="3" class="col-no-top-padding">
              <v-btn
                :disabled="!validateAddButton"
                color="error"
                @click="removeAllCabinets"
              >
                изтрий всички
              </v-btn>
            </v-col>
          </v-row>
        </v-form>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
export default {
  name: "LowerInnerCabinets",
  data: () => ({
    validStandardFeetHeight: false,
    standardFeetHeight: 0,
    validNumberOfCabinets: false,
    numberOfCabinets: 0,
    cabinets: []
  }),
  computed: {
    calculationUnit() {
      return this.$store.state.calculationUnit;
    },
    validateAddButton() {
      if (this.cabinets.length > 0) {
        return true;
      }
      return !this.validNumberOfCabinets;
    }
  },
  methods: {
    changeFeetsHeight() {
      let newHeight = parseInt(this.standardFeetHeight);
      this.$store.dispatch("changeInnerCabinetsFeetHeight", newHeight);
    },
    addInnerCabinets() {
      this.cabinets = [];
      let pureLowerShelfWidth = this.$store.getters.getLowerShelfPureWidth;
      let currentNumerOfCabinets = parseInt(this.numberOfCabinets);

      let cabinetWidth = Math.round(
        pureLowerShelfWidth / currentNumerOfCabinets
      );

      let heightOfCabinets =
        this.$store.state.lowerShelf.height -
        this.$store.state.standardFeetHeightOfCabinet;

      let cabinetsSidesHeight =
        heightOfCabinets - this.$store.state.staticOuterSideWidth;

      let innerCabinetsWidth =
        cabinetWidth - 2 * this.$store.state.staticOuterSideWidth;

      for (let i = 0; i < currentNumerOfCabinets; i++) {
        let currentCabinetToAdd = {
          outerWidth: cabinetWidth,
          height: heightOfCabinets,
          depth: this.$store.state.lowerShelf.depth,
          bottom: {
            width: cabinetWidth,
            height: this.$store.state.staticOuterSideWidth,
            depth: this.$store.state.lowerShelf.depth
          },
          sides: [
            {
              width: this.$store.state.staticOuterSideWidth,
              height: cabinetsSidesHeight,
              depth: this.$store.state.lowerShelf.depth
            },
            {
              width: this.$store.state.staticOuterSideWidth,
              height: cabinetsSidesHeight,
              depth: this.$store.state.lowerShelf.depth
            }
          ],
          upperHolders: [
            {
              width: innerCabinetsWidth,
              height: this.$store.state.staticOuterSideWidth,
              depth: this.$store.state.standardFeetHeightOfCabinet
            },
            {
              width: innerCabinetsWidth,
              height: this.$store.state.staticOuterSideWidth,
              depth: this.$store.state.standardFeetHeightOfCabinet
            }
          ]
        };

        /* corerct width differences */
        if (i == currentNumerOfCabinets - 1) {
          let widthDiff =
            pureLowerShelfWidth - cabinetWidth * currentNumerOfCabinets;

          if (widthDiff != 0) {
            currentCabinetToAdd.outerWidth += widthDiff;
            currentCabinetToAdd.bottom.width += widthDiff;
            for (let holder of currentCabinetToAdd.upperHolders) {
              holder.width += widthDiff;
            }
          }
        }

        this.cabinets.push(currentCabinetToAdd);
      }
    },
    removeAllCabinets() {
      if (this.cabinets.length > 0) {
        this.cabinets = [];
        this.numberOfCabinets = 0;
        this.$store.dispatch("removeAllLowerInnerCabinets");
      }
    },
    addInnerCabinetsToStore() {
      let args = {
        cabinets: this.cabinets,
        copyCabinet: this.$getCabinetInstance
      };
      this.$store.dispatch("addLowerShelfCabinets", args);
    }
  },
  mounted() {
    this.standardFeetHeight = this.$store.state.standardFeetHeightOfCabinet;

    for (let cabinet of this.$store.state.lowerShelf.cabinets) {
      this.cabinets.push(this.$getCabinetInstance(cabinet));
    }

    this.numberOfCabinets = this.cabinets.length;
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
