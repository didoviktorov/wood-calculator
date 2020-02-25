<template>
  <v-app>
    <v-content>
      <v-container>
        <v-row>
          <v-col cols="12">
            <v-divider />
            <h2>Горни шкафове</h2>
            <v-divider />
          </v-col>
        </v-row>
        <!-- inner cabinets region -->
        <v-row align="center" justify="center">
          <v-col cols="12" class="col-no-top-padding">
            <div>
              <h3>Добави брой шкафове</h3>
            </div>
          </v-col>
        </v-row>
        <div
          v-if="this.$store.state.upperShelf.cabinets.length > 0"
          class="cabinets-added"
        >
          Добавени са {{ this.$store.state.upperShelf.cabinets.length }} шкафа
        </div>
        <v-form v-model="validNumberOfCabinets" @submit.prevent>
          <v-row align="center" justify="center">
            <v-col cols="12" class="col-no-top-padding col-no-bottom-padding">
              <v-text-field
                v-model="numberOfCabinets"
                :label="'Брой шкафове'"
                :rules="this.$getnumberValidationRules"
                outlined
                dense
                required
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row align="center" justify="center">
            <v-col cols="12" sm="6" md="3" class="col-no-top-padding">
              <v-btn :disabled="validateAddButton" @click="addCabinets">
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
                :disabled="!isAllCabinetsValid || cabinets.length == 0"
                @click="addCabinetsToStore"
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
                <h5>Горна страна шкаф {{ index + 1 }}</h5>
                <!-- cabinet ceil dimensions -->
                <v-row>
                  <v-col cols="12" md="4">
                    <v-text-field
                      v-model="cabinet.ceil.width"
                      :rules="numberRules"
                      label="Ширина горна страна"
                      outlined
                      dense
                      required
                    ></v-text-field>
                  </v-col>

                  <v-col cols="12" md="4">
                    <v-text-field
                      v-model="cabinet.ceil.height"
                      :rules="numberRules"
                      label="Височина горна страна"
                      outlined
                      dense
                      required
                    ></v-text-field>
                  </v-col>

                  <v-col cols="12" md="4">
                    <v-text-field
                      v-model="cabinet.ceil.depth"
                      :rules="numberRules"
                      label="Дълбочина горна страна"
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

                <!-- cabinet shelfs dimensions -->
                <h5>Рафтове за шкаф {{ index + 1 }}</h5>
                <v-row
                  v-for="(shelf, shelfIndex) in cabinet.shelfs"
                  :key="shelfIndex + 'q'"
                >
                  <v-col cols="12" md="4">
                    <v-text-field
                      v-model="shelf.width"
                      :rules="numberRules"
                      :label="'Ширина рафт ' + (shelfIndex + 1)"
                      outlined
                      dense
                      required
                    ></v-text-field>
                  </v-col>

                  <v-col cols="12" md="4">
                    <v-text-field
                      v-model="shelf.height"
                      :rules="numberRules"
                      :label="'Височина рафт ' + (shelfIndex + 1)"
                      outlined
                      dense
                      required
                    ></v-text-field>
                  </v-col>

                  <v-col cols="12" md="4">
                    <v-text-field
                      v-model="shelf.depth"
                      :rules="numberRules"
                      :label="'Дълбочина рафт ' + (shelfIndex + 1)"
                      outlined
                      dense
                      required
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
              <v-row align="center" justify="center">
                <v-col cols="6">
                  <v-btn
                    :disabled="!cabinet.isValid"
                    color="info"
                    @click="addShelf(cabinet)"
                  >
                    добави рафт
                  </v-btn>
                </v-col>
                <v-col cols="6">
                  <v-btn
                    :disabled="cabinet.shelfs.length == 0 || !cabinet.isValid"
                    color="error"
                    @click="removeShelf(cabinet)"
                  >
                    изтрий рафт
                  </v-btn>
                </v-col>
              </v-row>
              <v-row align="center" justify="center">
                <v-col cols="12" class="col-no-top-padding">
                  <v-btn
                    :disabled="!cabinet.isValid"
                    color="success"
                    @click="editCabinet(index)"
                  >
                    запази шкаф
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
  data: () => ({
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
    },
    isAllCabinetsValid() {
      for (let cabinet of this.cabinets) {
        if (!cabinet.isValid) {
          return false;
        }
      }
      return true;
    }
  },
  methods: {
    openForEditHandler() {
      this.openForEdit = !this.openForEdit;
    },
    addCabinetsToStore() {
      let args = {
        cabinets: this.cabinets,
        copyCabinet: this.$getCabinetInstance
      };
      this.$store.dispatch("addUpperShelfCabinets", args);
    },
    addShelf(cabinet) {
      let shelfToAdd = {
        width: parseInt(cabinet.innerWidth),
        height: this.$store.state.staticOuterSideWidth,
        depth: parseInt(cabinet.depth)
      };
      cabinet.shelfs.push(shelfToAdd);
    },
    removeShelf(cabinet) {
      if (cabinet.shelfs.length > 0) {
        cabinet.shelfs.splice(cabinet.shelfs.lengt - 1, 1);
      }
    },
    editCabinet(index) {
      let cabinetToEdit = this.$getCabinetInstance(this.cabinets[index]);
      cabinetToEdit.isEdited = true;
      cabinetToEdit.isEdited = true;
      let params = {
        editedCabinet: cabinetToEdit,
        cabinetIndex: index
      };
      this.$store.dispatch("saveCabinetUpperShelfCabinets", params);
    },
    addCabinets() {
      this.cabinets = [];
      let pureShelfWidth = this.$store.getters.getUpperShelfPureWidth;
      let currentNumerOfCabinets = parseInt(this.numberOfCabinets);

      let cabinetWidth = Math.round(pureShelfWidth / currentNumerOfCabinets);

      let heightOfCabinets = this.$store.state.upperShelf.height;

      let cabinetsSidesHeight = heightOfCabinets;

      let innerCabinetsWidth =
        cabinetWidth - 2 * this.$store.state.staticOuterSideWidth;

      for (let i = 0; i < currentNumerOfCabinets; i++) {
        let currentCabinetToAdd = {
          outerWidth: cabinetWidth,
          innerWidth: innerCabinetsWidth,
          height: heightOfCabinets,
          depth: this.$store.state.upperShelf.depth,
          bottom: {
            width: innerCabinetsWidth,
            height: this.$store.state.staticOuterSideWidth,
            depth: this.$store.state.upperShelf.depth
          },
          ceil: {
            width: innerCabinetsWidth,
            height: this.$store.state.staticOuterSideWidth,
            depth: this.$store.state.upperShelf.depth
          },
          sides: [
            {
              width: this.$store.state.staticOuterSideWidth,
              height: cabinetsSidesHeight,
              depth: this.$store.state.upperShelf.depth
            },
            {
              width: this.$store.state.staticOuterSideWidth,
              height: cabinetsSidesHeight,
              depth: this.$store.state.upperShelf.depth
            }
          ],
          shelfs: [],
          doors: []
        };

        currentCabinetToAdd.isValid = true;
        currentCabinetToAdd.isEdited = false;

        /* corerct width differences */
        if (i == currentNumerOfCabinets - 1) {
          let widthDiff =
            pureShelfWidth - cabinetWidth * currentNumerOfCabinets;

          if (widthDiff != 0) {
            currentCabinetToAdd.outerWidth += widthDiff;
            currentCabinetToAdd.bottom.width += widthDiff;
          }
        }

        this.cabinets.push(currentCabinetToAdd);
      }
    },
    removeAllCabinets() {
      if (this.cabinets.length > 0) {
        this.cabinets = [];
        this.numberOfCabinets = 0;
        this.$store.dispatch("removeAllUpperInnerCabinets");
      }
    }
  },
  mounted() {
    for (let cabinet of this.$store.state.upperShelf.cabinets) {
      this.cabinets.push(this.$getCabinetInstance(cabinet));
    }

    this.numberOfCabinets = this.cabinets.length;
  }
};
</script>

<style scoped></style>
