<template>
  <v-app>
    <v-content>
      <v-container class="wrapper" fluid>
        <v-row align="center" justify="center">
          <v-col cols="12">
            <h1>{{ translate("upperShelfs").toUpperCase() }}</h1>
          </v-col>
        </v-row>
        <v-divider />
        <div class="header-section">
          <h3>{{ translate("allUpperCabinetsValues") }}</h3>
        </div>
        <v-form v-model="validWholeShelf" @submit.prevent>
          <v-row align="center" justify="center">
            <!-- Whole width region -->
            <v-col cols="12" sm="8" md="4">
              <v-text-field
                v-model="shelfWidth"
                :label="
                  translate('totalWidthOfTopRow') +
                    ' ' +
                    translate(calculationUnit)
                "
                :rules="numberRules"
                outlined
                dense
                required
                type="number"
              ></v-text-field>
            </v-col>
            <!-- Whole height region -->
            <v-col cols="12" sm="8" md="4">
              <v-text-field
                v-model="shelfHeight"
                :label="
                  translate('totalHeightOfTopRow') +
                    ' ' +
                    translate(calculationUnit)
                "
                :rules="numberRules"
                outlined
                dense
                required
                type="number"
              ></v-text-field>
            </v-col>
            <!-- Whole depth region -->
            <v-col cols="12" sm="8" md="4">
              <v-text-field
                v-model="shelfDepth"
                :label="
                  translate('totalDepthOfTopRow') +
                    ' ' +
                    translate(calculationUnit)
                "
                :rules="numberRules"
                outlined
                dense
                required
                type="number"
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="8" md="4" class="col-no-top-padding">
              <v-btn
                :disabled="!validWholeShelf"
                color="success"
                @click="changeTheWholeShelfProperties"
              >
                {{ translate("save") }}
              </v-btn>
            </v-col>
          </v-row>
        </v-form>
        <!-- Shelf outer sides region -->
        <v-divider />
        <div class="header-section">
          <h3>{{ translate("outherSidesUpperRowCabinets") }}</h3>
        </div>
        <div
          v-if="
            !showOuterShelfSidesForEdit && isVisibleShelfOuterSidesAddedMessage
          "
          class="sides-added"
        >
          {{ getShelfOuterSidesAddedMessage() }}
        </div>
        <v-row
          v-if="isAddingShelfOutherSidesActive"
          align="center"
          justify="center"
        >
          <v-col cols="12">
            <v-btn
              :disabled="shelfOuterSides.length > 9"
              class="left-button"
              @click="addShelfOuterSides"
            >
              {{ translate("addSides") }}
            </v-btn>
            <v-btn
              :disabled="shelfOuterSides.length == 0"
              class="right-button left-button"
              @click="renderOuterShelfSides"
            >
              {{
                showOuterShelfSidesForEdit
                  ? translate("hideSides")
                  : translate("editSides")
              }}
            </v-btn>
            <v-btn
              v-if="shelfOuterSides.length > 0"
              :disabled="!validWholeShelf"
              color="success"
              class="mr-4 right-button"
              @click="addShelfOuterSidesToStore"
            >
              {{ translate("save") }}
            </v-btn>
          </v-col>
        </v-row>
        <div v-if="showOuterShelfSidesForEdit">
          <v-row
            v-for="(side, index) in shelfOuterSides"
            :key="index"
            align="center"
            justify="center"
          >
            <v-form v-model="side.isValid" @submit.prevent>
              <v-container>
                <v-row>
                  <v-col cols="12" md="3">
                    <v-text-field
                      v-model="side.width"
                      :rules="numberRules"
                      :label="translate('width')"
                      outlined
                      dense
                      required
                      type="number"
                    ></v-text-field>
                  </v-col>

                  <v-col cols="12" md="3">
                    <v-text-field
                      v-model="side.height"
                      :rules="numberRules"
                      :label="translate('height')"
                      outlined
                      dense
                      required
                      type="number"
                    ></v-text-field>
                  </v-col>

                  <v-col cols="12" md="3">
                    <v-text-field
                      v-model="side.depth"
                      :rules="numberRules"
                      :label="translate('depth')"
                      outlined
                      dense
                      required
                      type="number"
                    ></v-text-field>
                  </v-col>

                  <v-col cols="12" md="3" justify-content>
                    <div>
                      <v-btn
                        :disabled="!side.isValid"
                        color="error"
                        class="mx-2 delete-outer-side"
                        fab
                        small
                        @click="removeShelfOuterSide(index)"
                      >
                        <v-icon>mdi-delete</v-icon>
                      </v-btn>
                    </div>
                  </v-col>
                </v-row>
              </v-container>
            </v-form>
          </v-row>
        </div>
        <UpperCabinets v-if="showCabinetsCabinets" />
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import UpperCabinets from "@/components/UpperCabinets.vue";

export default {
  components: {
    UpperCabinets
  },
  data: () => ({
    validWholeShelf: false,
    shelfWidth: 0,
    shelfHeight: 0,
    shelfDepth: 0,
    shelfOuterSides: [],
    showOuterShelfSidesForEdit: false
  }),
  computed: {
    shelfObject() {
      return this.$store.state.upperShelf;
    },
    calculationUnit() {
      return this.$store.state.calculationUnit;
    },
    numberRules() {
      return this.$getnumberValidationRules(
        this.$store.state.languages.languages[this.$store.state.selectedLang],
        this.$store.state.validatoinRulesLiterals
      );
    },
    showCabinetsCabinets() {
      return (
        this.$store.state.upperShelf.width > 0 &&
        this.$store.state.upperShelf.height > 0 &&
        this.$store.state.upperShelf.depth > 0
      );
    },
    isVisibleShelfOuterSidesAddedMessage() {
      if (this.$store.state.upperShelf.outerSides.length == 0) {
        return this.shelfOuterSides.length > 0;
      }
      return false;
    },
    isAddingShelfOutherSidesActive() {
      return (
        this.$store.state.upperShelf.width > 0 &&
        this.$store.state.upperShelf.height > 0 &&
        this.$store.state.upperShelf.depth > 0
      );
    },
    getStaticOuterSideWidth() {
      return this.$store.state.staticOuterSideWidth;
    }
  },
  methods: {
    translate(literal) {
      return this.$store.state.languages.languages[
        this.$store.state.selectedLang
      ][literal];
    },
    isAllShelfOuterSidesValid() {
      for (let side of this.shelfOuterSides) {
        if (!side.isValid) {
          return false;
        }
      }
      return true;
    },
    addShelfOuterSidesToStore() {
      if (this.isAllShelfOuterSidesValid()) {
        this.$store.dispatch("clearUpperShelfOuterSides");
        for (let side of this.shelfOuterSides) {
          this.$store.dispatch("addUpperShelfOuterSide", side);
        }
      }
    },
    removeShelfOuterSide(index) {
      if (index >= 0 && index < this.shelfOuterSides.length) {
        this.shelfOuterSides.splice(index, 1);
        this.$store.dispatch("removeUpperShelfOuterSide", index);
      }

      if (this.shelfOuterSides.length <= 0) {
        this.showOuterShelfSidesForEdit = false;
      }
    },
    getShelfOuterSidesAddedMessage() {
      let message =
        this.shelfOuterSides.length == 1
          ? this.translate("sideWillBeAdded")
          : this.translate("sidesWillBeAdded");

      message = message.replace("%count%", this.shelfOuterSides.length);
      message = message.replace(
        "%width%",
        this.translate("width").toLowerCase()
      );
      message = message.replace("%widthNumber%", this.getStaticOuterSideWidth);
      message = message.replace(
        "%height%",
        this.translate("height").toLowerCase()
      );
      message = message.replace("%heightNumber%", this.shelfHeight);
      message = message.replace(
        "%depth%",
        this.translate("depth").toLowerCase()
      );
      message = message.replace("%depthNumber%", this.shelfDepth);
      message = message.replace(
        /(%calculationUnit%)+/g,
        this.translate(this.calculationUnit)
      );

      return message;
    },
    renderOuterShelfSides() {
      this.showOuterShelfSidesForEdit = !this.showOuterShelfSidesForEdit;
    },
    addShelfOuterSides() {
      let outerSideToAdd = {
        width: parseInt(this.getStaticOuterSideWidth),
        height: this.shelfHeight,
        depth: this.shelfDepth,
        isValid: true
      };

      this.shelfOuterSides.push(outerSideToAdd);
    },
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

    for (let side of this.$store.state.upperShelf.outerSides) {
      let currentSide = {
        width: side.width,
        height: side.height,
        depth: side.depth,
        isValid: true
      };
      this.shelfOuterSides.push(currentSide);
    }
  }
};
</script>

<style scoped></style>
