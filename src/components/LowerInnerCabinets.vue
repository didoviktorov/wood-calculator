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
        <div
          v-if="this.$store.state.lowerShelf.cabinets.length > 0"
          class="cabinets-added"
        >
          Добавени са {{ this.$store.state.lowerShelf.cabinets.length }} шкафа
        </div>
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
              <v-btn
                :disabled="cabinets.length == 0"
                @click="openForEditHandler"
              >
                {{ openForEdit ? "скрий" : "прегледай" }}
              </v-btn>
            </v-col>
            <v-col cols="12" sm="6" md="3" class="col-no-top-padding">
              <v-btn
                :disabled="cabinets.length == 0"
                @click="addInnerCabinetsToStore"
                color="success"
              >
                запази
              </v-btn>
            </v-col>
            <v-col cols="12" sm="6" md="3" class="col-no-top-padding">
              <v-btn
                :disabled="cabinets.length == 0"
                color="error"
                @click="removeAllCabinets"
              >
                изтрий всички
              </v-btn>
            </v-col>
          </v-row>
        </v-form>
        <div v-if="openForEdit">
          <v-row
            align="center"
            justify="center"
            v-for="(cabinet, index) in cabinets"
            :key="index"
          >
            <v-form v-model="cabinet.isValid" @submit.prevent>
              <v-divider />
              <h4>Шкаф {{ index + 1 }}</h4>
              <v-container>
                <!-- cabinet dimensions -->
                <v-row>
                  <v-col cols="12" md="4">
                    <v-text-field
                      v-model="cabinet.outerWidth"
                      :rules="numberRules"
                      label="Ширина"
                      outlined
                      dense
                      required
                    ></v-text-field>
                  </v-col>

                  <v-col cols="12" md="4">
                    <v-text-field
                      v-model="cabinet.height"
                      :rules="numberRules"
                      label="Височина"
                      outlined
                      dense
                      required
                    ></v-text-field>
                  </v-col>

                  <v-col cols="12" md="4">
                    <v-text-field
                      v-model="cabinet.depth"
                      :rules="numberRules"
                      label="Дълбочина"
                      outlined
                      dense
                      required
                    ></v-text-field>
                  </v-col>
                </v-row>
                <h5>Дъно шкаф {{ index + 1 }}</h5>
                <!-- cabinet bottom dimensions -->
                <v-row>
                  <v-col cols="12" md="4">
                    <v-text-field
                      v-model="cabinet.bottom.width"
                      :rules="numberRules"
                      label="Ширина дъно"
                      outlined
                      dense
                      required
                    ></v-text-field>
                  </v-col>

                  <v-col cols="12" md="4">
                    <v-text-field
                      v-model="cabinet.bottom.height"
                      :rules="numberRules"
                      label="Височина дъно"
                      outlined
                      dense
                      required
                    ></v-text-field>
                  </v-col>

                  <v-col cols="12" md="4">
                    <v-text-field
                      v-model="cabinet.bottom.depth"
                      :rules="numberRules"
                      label="Дълбочина дъно"
                      outlined
                      dense
                      required
                    ></v-text-field>
                  </v-col>
                </v-row>
                <!-- cabinet sides dimensions -->
                <h5>Страници шкаф {{ index + 1 }}</h5>
                <v-row
                  v-for="(side, sideIndex) in cabinet.sides"
                  :key="sideIndex + 's'"
                >
                  <v-col cols="12" md="4">
                    <v-text-field
                      v-model="side.width"
                      :rules="numberRules"
                      :label="'Ширина страница ' + (sideIndex + 1)"
                      outlined
                      dense
                      required
                    ></v-text-field>
                  </v-col>

                  <v-col cols="12" md="4">
                    <v-text-field
                      v-model="side.height"
                      :rules="numberRules"
                      :label="'Височина страница ' + (sideIndex + 1)"
                      outlined
                      dense
                      required
                    ></v-text-field>
                  </v-col>

                  <v-col cols="12" md="4">
                    <v-text-field
                      v-model="side.depth"
                      :rules="numberRules"
                      :label="'Дълбочина страница ' + (sideIndex + 1)"
                      outlined
                      dense
                      required
                    ></v-text-field>
                  </v-col>
                </v-row>
                <!-- cabinet upper holders dimensions -->
                <h5>Горни стабилизатори шкаф {{ index + 1 }}</h5>
                <v-row
                  v-for="(holder, holderIndex) in cabinet.upperHolders"
                  :key="holderIndex + 'h'"
                >
                  <v-col cols="12" md="4">
                    <v-text-field
                      v-model="holder.width"
                      :rules="numberRules"
                      :label="'Ширина стабилизатор ' + (holderIndex + 1)"
                      outlined
                      dense
                      required
                    ></v-text-field>
                  </v-col>

                  <v-col cols="12" md="4">
                    <v-text-field
                      v-model="holder.height"
                      :rules="numberRules"
                      :label="'Височина стабилизатор ' + (holderIndex + 1)"
                      outlined
                      dense
                      required
                    ></v-text-field>
                  </v-col>

                  <v-col cols="12" md="4">
                    <v-text-field
                      v-model="holder.depth"
                      :rules="numberRules"
                      :label="'Дълбочина стабилизатор ' + (holderIndex + 1)"
                      outlined
                      dense
                      required
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
              <v-row align="center" justify="center">
                <v-col cols="12" class="col-no-top-padding">
                  <v-btn
                    :disabled="!cabinet.isValid"
                    color="success"
                    class="mr-4 right-button"
                  >
                    промени
                  </v-btn>
                </v-col>
              </v-row>
            </v-form>
          </v-row>
        </div>
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
    cabinets: [],
    openForEdit: false
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
    },
    numberRules() {
      return this.$getnumberValidationRules;
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

        currentCabinetToAdd.isValid = true;
        currentCabinetToAdd.isEdited = false;

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
    },
    openForEditHandler() {
      this.openForEdit = !this.openForEdit;
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
.cabinets-added {
  padding-bottom: 1rem;
  color: #1976d2;
}
</style>
