<template>
  <v-app>
    <v-content>
      <v-container class="wrapper" fluid>
        <v-row align="center" justify="center">
          <v-col cols="12">
            <div>
              <h1>{{ translate("lowerCabinets").toUpperCase() }}</h1>
            </div>
          </v-col>
        </v-row>
        <v-divider />
        <div class="header-section">
          <h3>{{ translate("changeStandartWidthOfSides") }}</h3>
        </div>
        <v-form v-model="validStaticSideWidth" @submit.prevent>
          <v-row align="center" justify="center">
            <!-- Whole width region -->
            <v-col
              cols="12"
              sm="8"
              md="6"
              class="col-no-top-padding col-no-bottom-padding"
            >
              <v-text-field
                v-model="staticSidewidth"
                :label="
                  translate('standartWidthOfSidesIn') +
                    translate(calculationUnit)
                "
                :rules="numberRules"
                outlined
                dense
                required
                type="number"
              ></v-text-field>
            </v-col>
            <v-col cols="12" class="col-no-top-padding">
              <v-btn
                :disabled="!validStaticSideWidth"
                color="success"
                @click="changeStaticSidewidth"
              >
                {{ translate("save") }}
              </v-btn>
            </v-col>
          </v-row>
        </v-form>
        <v-divider />
        <div class="header-section">
          <h3>{{ translate("valueOfLowerRowOfCabinets") }}</h3>
        </div>
        <v-form v-model="validWholeShelf" @submit.prevent>
          <v-row align="center" justify="center">
            <!-- Whole width region -->
            <v-col cols="12" sm="8" md="4">
              <v-text-field
                v-model="shelfWidth"
                :label="
                  translate('totalWidthOfLowerRow') +
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
                  translate('totalHeightOfLowerRow') +
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
                  translate('totalDepthOfLowerRow') +
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
          <h3>{{ translate("valuesOfLowerRowOuterSides") }}</h3>
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
              :disabled="!isAllShelfOuterSidesValid()"
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
        <v-divider />
        <div class="header-section">
          <h3>{{ translate("nicheAppliancesValues") }}</h3>
        </div>
        <!-- Static cabinets region -->
        <v-row align="center" justify="center">
          <v-col cols="12">
            {{
              translate("countOfNiches").replace(
                "%count%",
                allStaticWidths.length
              )
            }}
          </v-col>
          <v-col
            cols="12"
            v-if="allStaticWidths.length == maxNumberOfStaticCabinets"
          >
            <span class="error-holder">
              {{ translate("maxNumberOfNiches") }}
              {{ maxNumberOfStaticCabinets }}
            </span>
          </v-col>
        </v-row>
        <v-row align="center" justify="center">
          <v-col cols="12">
            <v-btn
              :disabled="
                !isAddingShelfOutherSidesActive ||
                  allStaticWidths.length == maxNumberOfStaticCabinets
              "
              class="left-button"
              @click="addStaticCabintes"
            >
              {{ translate("add") }}
            </v-btn>
            <v-btn
              :disabled="allStaticWidths.length == 0"
              class="right-button"
              @click="removeStaticCabintes"
            >
              {{ translate("remove") }}
            </v-btn>
          </v-col>
        </v-row>
        <v-row align="center" justify="center">
          <v-col cols="12" sm="8" md="4">
            <v-form
              v-if="allStaticWidths.length > 0"
              v-model="validStaticWidth"
              @submit.prevent
            >
              <div>
                <v-text-field
                  v-for="(item, index) in allStaticWidths"
                  :key="index"
                  v-model="item.width"
                  :label="
                    translate('nicheWidthIn').replace('%index%', index + 1) +
                      translate(calculationUnit)
                  "
                  outlined
                  dense
                  :rules="numberRules"
                  required
                  type="number"
                ></v-text-field>
              </div>
              <v-btn
                :disabled="!validStaticWidth"
                color="success"
                class="mr-4"
                @click="addStaticWidth"
              >
                {{ translate("save") }}
              </v-btn>
            </v-form>
          </v-col>
        </v-row>
        <LowerInnerCabinets v-if="showInnerCabinets" />
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import LowerInnerCabinets from "@/components/LowerInnerCabinets.vue";

export default {
  name: "LowerShelf",
  components: {
    LowerInnerCabinets,
  },
  data: () => ({
    validWholeShelf: false,
    validStaticWidth: true,
    validStaticSideWidth: false,
    staticSidewidth: "",
    shelfWidth: "",
    shelfHeight: "",
    shelfDepth: "",
    shelfOuterSides: [],
    allStaticWidths: [],
    maxNumberOfStaticCabinets: 5,
    showOuterShelfSidesForEdit: false,
  }),
  computed: {
    shelfObject() {
      return this.$store.state.lowerShelf;
    },
    getStaticOuterSideWidth() {
      return this.$store.state.staticOuterSideWidth;
    },
    showInnerCabinets() {
      return (
        this.$store.state.lowerShelf.width > 0 &&
        this.$store.state.lowerShelf.height > 0 &&
        this.$store.state.lowerShelf.depth > 0
      );
    },
    calculationUnit() {
      return this.$store.state.calculationUnit;
    },
    numberRules() {
      return this.$getnumberValidationRules(
        this.$store.state.languages.languages[this.$store.state.selectedLang],
        this.$store.state.validationRulesLiterals
      );
    },
    isAddingShelfOutherSidesActive() {
      return (
        this.$store.state.lowerShelf.width > 0 &&
        this.$store.state.lowerShelf.height > 0 &&
        this.$store.state.lowerShelf.depth > 0
      );
    },
    isVisibleShelfOuterSidesAddedMessage() {
      if (this.$store.state.lowerShelf.outerSides.length == 0) {
        return this.shelfOuterSides.length > 0;
      }
      return false;
    },
  },
  methods: {
    isAllDetailsValid() {
      let childComponentValid = true;
      if (this.$store.state.currentChildOfChildRenderedCompnent) {
        childComponentValid = this.$store.state.currentChildOfChildRenderedCompnent.isAllDetailsValid();
      }
      return (
        this.validWholeShelf &&
        this.validStaticWidth &&
        this.validStaticSideWidth &&
        this.isAllShelfOuterSidesValid() &&
        childComponentValid
      );
    },
    translate(literal) {
      return this.$store.state.languages.languages[
        this.$store.state.selectedLang
      ][literal];
    },
    changeStaticSidewidth() {
      let newWidth = parseInt(this.staticSidewidth);
      if (newWidth != this.$store.state.staticOuterSideWidth) {
        this.$store.dispatch("changeStaticsidewidth", newWidth);

        this.$toasted.success(this.translate("successfullSideWidthChange"), {
          action: {
            text: this.translate("close"),
            class: "notification-close",
            onClick: (e, toastObject) => {
              toastObject.goAway(0);
            },
          },
        });
      }
    },
    changeTheWholeShelfProperties() {
      let formWidth = parseInt(this.shelfWidth, 10);
      let riseNotification = false;
      if (formWidth != this.shelfObject.width) {
        this.$store.dispatch("changeShelfWidth", formWidth);
        riseNotification = true;
      }

      let formHeight = parseInt(this.shelfHeight, 10);
      if (formHeight != this.shelfObject.height) {
        this.$store.dispatch("changeShelfHeight", formHeight);
        riseNotification = true;
      }

      let formDepth = parseInt(this.shelfDepth, 10);
      if (formDepth != this.shelfObject.depth) {
        this.$store.dispatch("changeShelfDepth", formDepth);
        riseNotification = true;
      }

      if (riseNotification) {
        this.$toasted.success(this.translate("successfullyStoredValues"), {
          action: {
            text: this.translate("close"),
            class: "notification-close",
            onClick: (e, toastObject) => {
              toastObject.goAway(0);
            },
          },
        });
      }
    },
    addShelfOuterSides() {
      let outerSideToAdd = {
        width: parseInt(this.getStaticOuterSideWidth),
        height: this.shelfHeight,
        depth: this.shelfDepth,
        isValid: true,
      };

      this.shelfOuterSides.push(outerSideToAdd);
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
        if (
          this.shelfOuterSides.length !=
          this.$store.state.lowerShelf.outerSides.length
        ) {
          this.$toasted.success(this.translate("successfullyAddedOuterSides"), {
            action: {
              text: this.translate("close"),
              class: "notification-close",
              onClick: (e, toastObject) => {
                toastObject.goAway(0);
              },
            },
          });
        } else {
          for (let i = 0; i < this.shelfOuterSides.length; i++) {
            if (
              this.shelfOuterSides[i].width !=
                this.$store.state.lowerShelf.outerSides[i].width ||
              this.shelfOuterSides[i].height !=
                this.$store.state.lowerShelf.outerSides[i].height ||
              this.shelfOuterSides[i].depth !=
                this.$store.state.lowerShelf.outerSides[i].depth
            ) {
              this.$toasted.success(
                this.translate("successfullyChangedValues"),
                {
                  action: {
                    text: this.translate("close"),
                    class: "notification-close",
                    onClick: (e, toastObject) => {
                      toastObject.goAway(0);
                    },
                  },
                }
              );
              break;
            }
          }
        }
        this.$store.dispatch("clearShelfOuterSides");
        for (let side of this.shelfOuterSides) {
          this.$store.dispatch("addShelfOuterSide", side);
        }
      }
    },
    removeShelfOuterSide(index) {
      if (index >= 0 && index < this.shelfOuterSides.length) {
        this.shelfOuterSides.splice(index, 1);
        this.$store.dispatch("removeShelfOuterSide", index);
        this.$toasted.error(this.translate("successfullyDeletedOuterSide"), {
          action: {
            text: this.translate("close"),
            class: "notification-close",
            onClick: (e, toastObject) => {
              toastObject.goAway(0);
            },
          },
        });
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
    addStaticCabintes() {
      if (this.allStaticWidths.length < this.maxNumberOfStaticCabinets) {
        let currentCabinet = {
          width: "",
        };
        this.allStaticWidths.push(currentCabinet);
      }
    },
    removeStaticCabintes() {
      if (this.allStaticWidths.length > 0) {
        if (
          this.allStaticWidths.length ==
          this.$store.state.lowerShelf.staticCabinets.length
        ) {
          this.$toasted.error(this.translate("successfullyDeletedNiche"), {
            action: {
              text: this.translate("close"),
              class: "notification-close",
              onClick: (e, toastObject) => {
                toastObject.goAway(0);
              },
            },
          });
          this.$store.dispatch("removeStaticCabinet");
        }
        this.allStaticWidths.splice(this.allStaticWidths.length - 1);
      }
    },
    addStaticWidth() {
      if (
        this.allStaticWidths.length !=
        this.$store.state.lowerShelf.staticCabinets.length
      ) {
        this.$toasted.success(this.translate("successfullyAddedStaticWidths"), {
          action: {
            text: this.translate("close"),
            class: "notification-close",
            onClick: (e, toastObject) => {
              toastObject.goAway(0);
            },
          },
        });
      } else {
        for (let i = 0; i < this.allStaticWidths.length; i++) {
          if (
            parseInt(this.allStaticWidths[i].width) !=
            this.$store.state.lowerShelf.staticCabinets[i].width
          ) {
            this.$toasted.success(this.translate("successfullyChangedValues"), {
              action: {
                text: this.translate("close"),
                class: "notification-close",
                onClick: (e, toastObject) => {
                  toastObject.goAway(0);
                },
              },
            });
            break;
          }
        }
      }
      this.$store.dispatch("addStaticFieldsWidth", this.allStaticWidths);
    },
    addElementsToStore() {
      this.$store.dispatch(
        "changeStaticsidewidth",
        parseInt(this.staticSidewidth)
      );

      this.$store.dispatch("changeShelfWidth", parseInt(this.shelfWidth, 10));
      this.$store.dispatch("changeShelfHeight", parseInt(this.shelfHeight, 10));
      this.$store.dispatch("changeShelfDepth", parseInt(this.shelfDepth, 10));

      this.$store.dispatch("addStaticFieldsWidth", this.allStaticWidths);
      this.$store.dispatch("clearShelfOuterSides");
      for (let side of this.shelfOuterSides) {
        this.$store.dispatch("addShelfOuterSide", side);
      }
      this.$toasted.success(this.translate("successfullyStoredValues"), {
        action: {
          text: this.translate("close"),
          class: "notification-close",
          onClick: (e, toastObject) => {
            toastObject.goAway(0);
          },
        },
      });

      if (this.$store.state.currentChildOfChildRenderedCompnent) {
        this.$store.state.currentChildOfChildRenderedCompnent.addElementsToStore();
      }
    },
    isChanged() {
      if (
        this.shelfWidth != this.$store.state.lowerShelf.width ||
        this.shelfHeight != this.$store.state.lowerShelf.height ||
        this.shelfDepth != this.$store.state.lowerShelf.depth ||
        this.staticSidewidth != this.$store.state.staticOuterSideWidth
      ) {
        return true;
      }

      if (
        this.shelfOuterSides.length !=
        this.$store.state.lowerShelf.outerSides.length
      ) {
        return true;
      }

      if (
        this.allStaticWidths.length !=
        this.$store.state.lowerShelf.staticCabinets.length
      ) {
        return true;
      }

      for (
        let staticIndex = 0;
        staticIndex < this.allStaticWidths.length;
        staticIndex++
      ) {
        let staticWidth = this.allStaticWidths[staticIndex];
        let storeStaticWidth = this.$store.state.lowerShelf.staticCabinets[
          staticIndex
        ];
        if (staticWidth.width != storeStaticWidth.width) {
          return true;
        }
      }

      for (
        let outerSideIndex = 0;
        outerSideIndex < this.shelfOuterSides.length;
        outerSideIndex++
      ) {
        let outerSide = this.shelfOuterSides[outerSideIndex];
        let storeOuterSide = this.$store.state.lowerShelf.outerSides[
          outerSideIndex
        ];
        if (
          outerSide.depth != storeOuterSide.depth ||
          outerSide.height != storeOuterSide.height ||
          outerSide.width != storeOuterSide.width
        ) {
          return true;
        }
      }

      if (this.$store.state.currentChildOfChildRenderedCompnent) {
        if (this.$store.state.currentChildOfChildRenderedCompnent.isChanged()) {
          return true;
        }
      }

      return false;
    },
  },
  mounted() {
    for (let cabinet of this.$store.state.lowerShelf.staticCabinets) {
      let currentCabinet = {
        width: cabinet.width,
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

    for (let side of this.$store.state.lowerShelf.outerSides) {
      let currentSide = {
        width: side.width,
        height: side.height,
        depth: side.depth,
        isValid: true,
      };
      this.shelfOuterSides.push(currentSide);
    }

    this.staticSidewidth = this.$store.state.staticOuterSideWidth;
    this.$store.dispatch("setRenderedComponent", this);
  },
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
</style>
