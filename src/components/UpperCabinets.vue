<template>
  <v-app>
    <v-content>
      <v-container>
        <div
          id="pure-width-left"
          :class="{
            positive: getPureWidthLeft >= 0,
            negative: getPureWidthLeft < 0
          }"
        >
          <span>
            {{
              "оставащи " +
                getPureWidthLeft +
                " " +
                this.$store.state.calculationUnit
            }}
          </span>
        </div>
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
                type="number"
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
                :disabled="
                  !isAllCabinetsValid ||
                    cabinets.length == 0 ||
                    !validateCabinets
                "
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
                      type="number"
                      @keyup="changeWidthCabinet(cabinet, index)"
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
                      type="number"
                      @keyup="changeHeightCabinet(cabinet, index)"
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
                      type="number"
                      @keyup="changeDepthCabinet(cabinet, index)"
                    ></v-text-field>
                  </v-col>
                </v-row>
                <div v-if="cabinet.showCabinetElements">
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
                        type="number"
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
                        type="number"
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
                        type="number"
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
                        type="number"
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
                        type="number"
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
                        type="number"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                  <h5>Гръб горен шкаф {{ index + 1 }}</h5>
                  <!-- cabinet back dimensions -->
                  <v-row>
                    <v-col cols="12" md="6">
                      <v-text-field
                        v-model="cabinet.back.width"
                        :rules="numberRules"
                        label="Ширина гръб"
                        outlined
                        dense
                        required
                        type="number"
                      ></v-text-field>
                    </v-col>

                    <v-col cols="12" md="6">
                      <v-text-field
                        v-model="cabinet.back.height"
                        :rules="numberRules"
                        label="Височина гръб"
                        outlined
                        dense
                        required
                        type="number"
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
                        type="number"
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
                        type="number"
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
                        type="number"
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
                        type="number"
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
                        type="number"
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
                        type="number"
                      ></v-text-field>
                    </v-col>
                  </v-row>
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
                        :disabled="
                          cabinet.shelfs.length == 0 || !cabinet.isValid
                        "
                        color="error"
                        @click="removeShelf(cabinet)"
                      >
                        изтрий рафт
                      </v-btn>
                    </v-col> </v-row
                  ><!-- cabinet doors dimensions -->
                  <h5>Врати за шкаф {{ index + 1 }}</h5>
                  <v-row
                    v-for="(door, doorIndex) in cabinet.doors"
                    :key="doorIndex + 'd'"
                  >
                    <v-col cols="12" md="4">
                      <v-text-field
                        v-model="door.width"
                        :rules="numberRules"
                        :label="'Ширина врата ' + (doorIndex + 1)"
                        outlined
                        dense
                        required
                        type="number"
                      ></v-text-field>
                    </v-col>

                    <v-col cols="12" md="4">
                      <v-text-field
                        v-model="door.height"
                        :rules="numberRules"
                        :label="'Височина врата ' + (doorIndex + 1)"
                        outlined
                        dense
                        required
                        type="number"
                      ></v-text-field>
                    </v-col>

                    <v-col cols="12" md="4">
                      <v-text-field
                        v-model="door.depth"
                        :rules="numberRules"
                        :label="'Дълбочина врата ' + (doorIndex + 1)"
                        outlined
                        dense
                        required
                        type="number"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                  <v-row align="center" justify="center">
                    <v-col cols="6">
                      <v-btn
                        :disabled="
                          !cabinet.isValid ||
                            cabinet.doors.length ==
                              $store.state.maxNumberOfDoors
                        "
                        color="info"
                        @click="addDoor(cabinet)"
                      >
                        добави врата
                      </v-btn>
                    </v-col>
                    <v-col cols="6">
                      <v-btn
                        :disabled="
                          cabinet.doors.length == 0 || !cabinet.isValid
                        "
                        color="error"
                        @click="removeDoor(cabinet)"
                      >
                        изтрий врата
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
                </div>
                <v-row align="center" justify="center">
                  <v-col
                    cols="12"
                    md="3"
                    justify-content
                    class="col-no-padding"
                  >
                    <div>
                      <v-btn
                        color="info"
                        class="mx-2"
                        fab
                        dark
                        small
                        @click="showHideCabinetElements(index)"
                      >
                        <v-icon>{{
                          cabinet.showCabinetElements
                            ? "mdi-menu-up"
                            : "mdi-menu-down"
                        }}</v-icon>
                      </v-btn>
                    </div>
                  </v-col>
                </v-row>
              </v-container>
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
    getPureWidthLeft() {
      let remainingWidth = this.$store.getters.getUpperShelfPureWidth;
      for (let cabinetIndex in this.cabinets) {
        if (this.cabinets[cabinetIndex].isValid) {
          if (this.$store.state.upperShelf.cabinets[cabinetIndex]) {
            remainingWidth += this.$store.state.upperShelf.cabinets[
              cabinetIndex
            ].outerWidth;
          }
          remainingWidth -= parseInt(this.cabinets[cabinetIndex].outerWidth);
        }
      }

      return remainingWidth;
    },
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
    },
    validateCabinets() {
      return this.$validateCabinets(this.cabinets);
    }
  },
  methods: {
    isValidNumber(number) {
      let isValid = true;
      for (let func of this.$getnumberValidationRules) {
        if (typeof func(number) == "string") {
          return false;
        }
      }

      return isValid;
    },
    showHideCabinetElements(index) {
      this.cabinets[index].showCabinetElements = !this.cabinets[index]
        .showCabinetElements;
    },
    openForEditHandler() {
      this.openForEdit = !this.openForEdit;
    },
    changeWidthCabinet(cabinet, index) {
      let newWidth = parseInt(cabinet.outerWidth);
      if (this.isValidNumber(newWidth)) {
        let newInnerWidth =
          newWidth - 2 * this.$store.state.staticOuterSideWidth;
        let cabinetToChange = {
          outerWidth: newWidth,
          innerWidth: newInnerWidth,
          height: cabinet.height,
          isValid: cabinet.isValid,
          isEdited: cabinet.isEdited,
          depth: cabinet.depth,
          showCabinetElements: cabinet.showCabinetElements,
          bottom: {
            width: newWidth - this.$store.state.staticOuterSideWidth * 2,
            height: cabinet.bottom.height,
            depth: cabinet.bottom.depth
          },
          back: {
            width: newWidth - this.$store.state.cabinetBackDiff,
            height: cabinet.back.height
          },
          sides: cabinet.sides,
          ceil: {
            width: newWidth - this.$store.state.staticOuterSideWidth * 2,
            height: this.$store.state.staticOuterSideWidth,
            depth: this.$store.state.upperShelf.depth
          },
          shelfs: [],
          doors: []
        };

        if (cabinet.doors.length > 0) {
          for (let i = 0; i < cabinet.doors.length; i++) {
            this.addDoor(cabinetToChange);
          }
        }

        if (cabinet.shelfs.length > 0) {
          for (let i = 0; i < cabinet.shelfs.length; i++) {
            this.addShelf(cabinetToChange);
          }
        }

        this.cabinets.splice(index, 1, cabinetToChange);
      }
    },
    changeHeightCabinet(cabinet, index) {
      let newHeight = parseInt(cabinet.height);
      if (this.isValidNumber(newHeight)) {
        let cabinetToChange = {
          outerWidth: cabinet.outerWidth,
          innerWidth: cabinet.innerWidth,
          height: newHeight,
          isValid: cabinet.isValid,
          isEdited: cabinet.isEdited,
          depth: cabinet.depth,
          showCabinetElements: cabinet.showCabinetElements,
          bottom: {
            width: cabinet.outerWidth,
            height: cabinet.bottom.height,
            depth: cabinet.bottom.depth
          },
          ceil: cabinet.ceil,
          back: {
            width: cabinet.back.width,
            height: newHeight - this.$store.state.cabinetBackDiff
          },
          sides: [],
          shelfs: cabinet.shelfs,
          doors: []
        };

        if (cabinet.doors.length > 0) {
          for (let i = 0; i < cabinet.doors.length; i++) {
            this.addDoor(cabinetToChange);
          }
        }

        for (let i = 0; i < cabinet.sides.length; i++) {
          let newSide = {
            width: this.$store.state.staticOuterSideWidth,
            height: newHeight,
            depth: this.$store.state.upperShelf.depth
          };

          cabinetToChange.sides.push(newSide);
        }

        this.cabinets.splice(index, 1, cabinetToChange);
      }
    },
    changeDepthCabinet(cabinet, index) {
      let newDepth = parseInt(cabinet.depth);
      if (this.isValidNumber(newDepth)) {
        let cabinetToChange = {
          outerWidth: cabinet.outerWidth,
          innerWidth: cabinet.innerWidth,
          height: cabinet.height,
          isValid: cabinet.isValid,
          isEdited: cabinet.isEdited,
          depth: newDepth,
          showCabinetElements: cabinet.showCabinetElements,
          bottom: {
            width: cabinet.outerWidth,
            height: cabinet.bottom.height,
            depth: newDepth
          },
          back: {
            width: cabinet.back.width,
            height: cabinet.back.height
          },
          sides: [],
          ceil: {
            width: cabinet.ceil.width,
            height: this.$store.state.staticOuterSideWidth,
            depth: newDepth
          },
          shelfs: [],
          doors: cabinet.doors
        };

        if (cabinet.shelfs.length > 0) {
          for (let i = 0; i < cabinet.shelfs.length; i++) {
            this.addShelf(cabinetToChange);
          }
        }

        for (let i = 0; i < cabinet.sides.length; i++) {
          let newSide = {
            width: this.$store.state.staticOuterSideWidth,
            height: cabinet.sides[i].height,
            depth: newDepth
          };

          cabinetToChange.sides.push(newSide);
        }

        this.cabinets.splice(index, 1, cabinetToChange);
      }
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

      let currentNumerOfCabinets = parseInt(this.numberOfCabinets);

      let heightOfCabinets = this.$store.state.upperShelf.height;

      let cabinetsSidesHeight = heightOfCabinets;

      const backDiff = this.$store.state.cabinetBackDiff;
      for (let i = 0; i < currentNumerOfCabinets; i++) {
        let currentCabinetToAdd = {
          outerWidth: 0,
          innerWidth: 0,
          height: heightOfCabinets,
          depth: this.$store.state.upperShelf.depth,
          showCabinetElements: false,
          bottom: {
            width: 0,
            height: this.$store.state.staticOuterSideWidth,
            depth: this.$store.state.upperShelf.depth
          },
          back: {
            width: 0,
            height: heightOfCabinets - backDiff
          },
          ceil: {
            width: 0,
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

        this.cabinets.push(currentCabinetToAdd);
      }
    },
    removeAllCabinets() {
      if (this.cabinets.length > 0) {
        this.cabinets = [];
        this.numberOfCabinets = 0;
        this.$store.dispatch("removeAllUpperInnerCabinets");
      }
    },
    addDoor(cabinet) {
      let numberOfDoors = cabinet.doors.length + 1;
      let availableWidth = Math.round(
        parseInt(cabinet.outerWidth) / numberOfDoors
      );

      const diff = 7;
      for (let door of cabinet.doors) {
        door.width = availableWidth - diff;
      }

      let doorToAdd = {
        width: availableWidth - diff,
        height: cabinet.height - diff,
        depth: this.$store.state.staticOuterSideWidth
      };

      cabinet.doors.push(doorToAdd);
    },
    removeDoor(cabinet) {
      cabinet.doors.splice(cabinet.doors.length - 1, 1);
      if (cabinet.doors.length > 0) {
        const diff = 7;
        let availableWidth = Math.round(
          parseInt(cabinet.outerWidth) / cabinet.doors.length
        );
        for (let door of cabinet.doors) {
          door.width = availableWidth - diff;
        }
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
