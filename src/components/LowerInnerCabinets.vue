<template>
  <v-app>
    <v-content class="wrapper">
      <v-container fluid>
        <div
          id="pure-width-left"
          :class="{
            positive: getPureWidthLeft >= 0,
            negative: isNaN(getPureWidthLeft) || getPureWidthLeft < 0,
          }"
        >
          <span>
            {{
              isNaN(getPureWidthLeft)
                ? $translate("enterWidth")
                : $translate("mmLeft") +
                  " " +
                  getPureWidthLeft +
                  " " +
                  $translate(this.$store.state.calculationUnit)
            }}
          </span>
        </div>
        <v-row align="center" justify="center">
          <v-col cols="12">
            <v-divider />
            <h2>{{ $translate("lowerCabinets") }}</h2>
            <v-divider />
          </v-col>
          <v-col cols="12" class="col-no-top-padding">
            <div>
              <h3>{{ $translate("changeStandartHeightOfLegs") }}</h3>
            </div>
          </v-col>
          <v-form v-model="validStandardFeetHeight" @submit.prevent>
            <v-row align="center" justify="center">
              <v-col cols="12" class="col-no-top-padding col-no-bottom-padding">
                <v-text-field
                  v-model="standardFeetHeight"
                  :label="
                    $translate('standartHeightOfLegs') +
                      $translate(calculationUnit)
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
                  :disabled="!validStandardFeetHeight"
                  color="success"
                  @click="changeFeetsHeight"
                >
                  {{ $translate("save") }}
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
              <h3>{{ $translate("enterCountOfCabinets") }}</h3>
            </div>
          </v-col>
        </v-row>
        <div
          v-if="this.$store.state.lowerShelf.cabinets.length > 0"
          class="cabinets-added"
        >
          {{
            this.$store.state.lowerShelf.cabinets.length == 1
              ? $translate("cabinetAddedMessage").replace(
                  "%count%",
                  this.$store.state.lowerShelf.cabinets.length
                )
              : $translate("cabinetsAddedMessage").replace(
                  "%count%",
                  this.$store.state.lowerShelf.cabinets.length
                )
          }}
        </div>
        <v-form v-model="validNumberOfCabinets" @submit.prevent>
          <v-row align="center" justify="center">
            <v-col cols="12" class="col-no-top-padding col-no-bottom-padding">
              <v-text-field
                v-model="numberOfCabinets"
                :label="$translate('countShelfs')"
                :rules="numberRules"
                outlined
                dense
                required
                type="number"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row align="center" justify="center">
            <v-col cols="12" sm="6" md="3" class="col-no-top-padding">
              <v-btn :disabled="validateAddButton" @click="addInnerCabinets">
                {{ $translate("add") }}
              </v-btn>
            </v-col>
            <v-col cols="12" sm="6" md="3" class="col-no-top-padding">
              <v-btn
                :disabled="cabinets.length == 0"
                @click="openForEditHandler"
              >
                {{ openForEdit ? $translate("hide") : $translate("review") }}
              </v-btn>
            </v-col>
            <v-col cols="12" sm="6" md="3" class="col-no-top-padding">
              <v-btn
                :disabled="
                  !isAllCabinetsValid ||
                    cabinets.length == 0 ||
                    !validateCabinets
                "
                @click="addInnerCabinetsToStore"
                color="success"
              >
                {{ $translate("save") }}
              </v-btn>
            </v-col>
            <v-col cols="12" sm="6" md="3" class="col-no-top-padding">
              <v-btn
                :disabled="cabinets.length == 0"
                color="error"
                @click="removeAllCabinets"
              >
                {{ $translate("deleteAll") }}
              </v-btn>
            </v-col>
          </v-row>
          <v-row align="center" justify="center">
            <v-col class="verify-button">
              <v-btn
                v-if="cabinets.length > 0"
                :disabled="errorRefIndex === null"
                color="success"
                @click="goToErrorField"
              >
                {{ $translate("verify") }}
              </v-btn>
            </v-col>
          </v-row>
        </v-form>
        <div v-if="openForEdit">
          <v-form ref="cabinetForm" @submit.prevent class="cabinet-wrapper">
            <v-row
              align="center"
              justify="center"
              v-for="(cabinet, index) in cabinets"
              :key="index"
            >
              <v-col cols="12">
                <v-divider />
              </v-col>
              <LowerCabinet
                :cabinet="cabinet"
                :index="index"
                @changeCabinet="replaceCabinet($event, index)"
                @edited="editCabinet($event)"
              />
            </v-row>
          </v-form>
        </div>
      </v-container>
    </v-content>
    <v-overlay :value="isLoading">
      <div class="lds-spinner">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </v-overlay>
  </v-app>
</template>

<script>
import LowerCabinet from "@/components/LowerCabinet.vue";

export default {
  components: {
    LowerCabinet,
  },
  name: "LowerInnerCabinets",
  data: () => ({
    validStandardFeetHeight: false,
    standardFeetHeight: 0,
    validNumberOfCabinets: false,
    numberOfCabinets: 0,
    cabinets: [],
    openForEdit: false,
    errorRefIndex: null,
    isLoading: false,
  }),
  computed: {
    getPureWidthLeft() {
      let remainingWidth = this.$store.getters.getLowerShelfPureWidth;
      for (let cabinetIndex in this.cabinets) {
        if (this.$store.state.lowerShelf.cabinets[cabinetIndex]) {
          remainingWidth += this.$store.state.lowerShelf.cabinets[cabinetIndex]
            .outerWidth;
        }

        remainingWidth -= this.cabinets[cabinetIndex].outerWidth;
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
      return this.$getnumberValidationRules();
    },
    isAllCabinetsValid() {
      let index = -1;
      for (let cabinet of this.cabinets) {
        index++;
        if (!cabinet.isValid || !cabinet.outerWidth) {
          this.changeErrorIndex(index);
          return false;
        }
      }
      this.changeErrorIndex(null);
      return true;
    },
    validateCabinets() {
      if (this.getPureWidthLeft < 0) {
        return false;
      }
      return this.$validateCabinets(this.cabinets);
    },
  },
  methods: {
    replaceCabinet(cabinet, index) {
      this.cabinets.splice(index, 1, cabinet);
    },
    changeErrorIndex(index) {
      this.errorRefIndex = index;
    },
    goToErrorField() {
      if (!this.openForEdit) {
        this.openForEdit = true;
      }

      let that = this;
      this.$nextTick(() => {
        if (that.errorRefIndex !== null) {
          if (!that.cabinets[that.errorRefIndex].showCabinetElements) {
            that.cabinets[that.errorRefIndex].showCabinetElements = true;
          }

          that.$refs.cabinetForm.validate();
          setTimeout(() => {
            let errorField = document
              .getElementsByClassName("cabinet-wrapper")[0]
              .getElementsByClassName("error--text")[0];
            if (!errorField) {
              that.goToErrorField();
              return;
            }
            let detailPosition =
              window.pageYOffset + errorField.getBoundingClientRect().top - 50;
            that.$vuetify.goTo(detailPosition);
          }, 0);
        }
      });
    },
    isAllDetailsValid() {
      return this.isAllCabinetsValid && this.validStandardFeetHeight;
    },
    changeFeetsHeight() {
      let newHeight = parseInt(this.standardFeetHeight);
      if (newHeight != this.$store.state.standardFeetHeightOfCabinet) {
        this.$toasted.success(this.$translate("successfullyChangedValues"), {
          action: {
            text: this.$translate("close"),
            class: "notification-close",
            onClick: (e, toastObject) => {
              toastObject.goAway(0);
            },
          },
        });
      }
      this.$store.dispatch("changeInnerCabinetsFeetHeight", newHeight);
    },
    addInnerCabinets() {
      if (this.openForEdit) {
        this.openForEdit = false;
      }
      this.cabinets = [];
      let currentNumerOfCabinets = parseInt(this.numberOfCabinets);

      let heightOfCabinets =
        this.$store.state.lowerShelf.height -
        this.$store.state.standardFeetHeightOfCabinet;

      let cabinetsSidesHeight =
        heightOfCabinets - this.$store.state.staticOuterSideWidth;

      const backDiff = 5;
      for (let i = 0; i < currentNumerOfCabinets; i++) {
        let currentCabinetToAdd = {
          outerWidth: "",
          innerWidth: 0,
          height: heightOfCabinets,
          depth: this.$store.state.lowerShelf.depth,
          showCabinetElements: false,
          bottom: {
            width: "",
            height: this.$store.state.staticOuterSideWidth,
            depth: this.$store.state.lowerShelf.depth,
          },
          back: {
            width: "",
            height: heightOfCabinets - backDiff,
          },
          sides: [
            {
              width: this.$store.state.staticOuterSideWidth,
              height: cabinetsSidesHeight,
              depth: this.$store.state.lowerShelf.depth,
            },
            {
              width: this.$store.state.staticOuterSideWidth,
              height: cabinetsSidesHeight,
              depth: this.$store.state.lowerShelf.depth,
            },
          ],
          upperHolders: [
            {
              width: "",
              height: this.$store.state.staticOuterSideWidth,
              depth: this.$store.state.standardFeetHeightOfCabinet,
            },
            {
              width: "",
              height: this.$store.state.staticOuterSideWidth,
              depth: this.$store.state.standardFeetHeightOfCabinet,
            },
          ],
          shelfs: [],
          doors: [],
          dividers: [],
        };

        currentCabinetToAdd.isValid = false;
        currentCabinetToAdd.isEdited = false;

        this.cabinets.push(currentCabinetToAdd);
      }
    },
    removeAllCabinets() {
      if (this.openForEdit) {
        this.openForEdit = false;
      }
      if (this.cabinets.length > 0) {
        this.cabinets = [];
        this.numberOfCabinets = 0;
        this.$toasted.error(this.$translate("successfullyDeletedCabinets"), {
          action: {
            text: this.$translate("close"),
            class: "notification-close",
            onClick: (e, toastObject) => {
              toastObject.goAway(0);
            },
          },
        });

        this.$store.dispatch("removeAllLowerInnerCabinets");
        this.numberOfCabinets = 0;
      }
    },
    addInnerCabinetsToStore() {
      let args = {
        cabinets: this.cabinets,
        copyCabinet: this.$getCabinetInstance,
      };
      let hasChanged = this.$isCabinetsChanged(
        this.cabinets,
        this.$store.state.lowerShelf.cabinets,
        false
      );
      if (
        this.cabinets.length != this.$store.state.lowerShelf.cabinets.length
      ) {
        this.$toasted.success(this.$translate("successfullyStoredCabinets"), {
          action: {
            text: this.$translate("close"),
            class: "notification-close",
            onClick: (e, toastObject) => {
              toastObject.goAway(0);
            },
          },
        });
      } else if (hasChanged) {
        this.$toasted.success(this.$translate("successfullyChangedValues"), {
          action: {
            text: this.$translate("close"),
            class: "notification-close",
            onClick: (e, toastObject) => {
              toastObject.goAway(0);
            },
          },
        });
      }

      this.$store.dispatch("addLowerShelfCabinets", args);
    },
    editCabinet(index) {
      let cabinetToEdit = this.$getCabinetInstance(this.cabinets[index]);
      let hasChanged = this.$isCabinetsChanged(
        this.cabinets,
        this.$store.state.lowerShelf.cabinets,
        false
      );

      if (
        this.cabinets.length != this.$store.state.lowerShelf.cabinets.length
      ) {
        this.$toasted.success(this.$translate("successfullyStoredCabinets"), {
          action: {
            text: this.$translate("close"),
            class: "notification-close",
            onClick: (e, toastObject) => {
              toastObject.goAway(0);
            },
          },
        });
      } else if (hasChanged) {
        this.$toasted.success(this.$translate("successfullyChangedValues"), {
          action: {
            text: this.$translate("close"),
            class: "notification-close",
            onClick: (e, toastObject) => {
              toastObject.goAway(0);
            },
          },
        });
      }
      cabinetToEdit.isEdited = true;
      let params = {
        editedCabinet: cabinetToEdit,
        cabinetIndex: index,
      };

      this.$store.dispatch("saveCabinetLowerShelfCabinets", params);
    },
    openForEditHandler() {
      if (
        this.numberOfCabinets >= this.$store.state.minNumberOfCabinetsForLoading
      ) {
        if (!this.openForEdit) {
          this.isLoading = true;
          let that = this;
          setTimeout(() => {
            that.openForEdit = !that.openForEdit;
          }, 0);
        } else {
          this.openForEdit = false;
        }
      } else {
        this.openForEdit = !this.openForEdit;
      }
    },
    addElementsToStore() {
      let args = {
        cabinets: this.cabinets,
        copyCabinet: this.$getCabinetInstance,
      };
      this.$store.dispatch("addLowerShelfCabinets", args);
      this.$store.dispatch(
        "changeInnerCabinetsFeetHeight",
        parseInt(this.standardFeetHeight)
      );
    },
    isChanged() {
      let cabinetsChanged = this.$isCabinetsChanged(
        this.cabinets,
        this.$store.state.lowerShelf.cabinets,
        false
      );
      let feetHeightChanged =
        this.standardFeetHeight !=
        this.$store.state.standardFeetHeightOfCabinet;

      return cabinetsChanged || feetHeightChanged;
    },
  },
  updated() {
    if (this.openForEdit && this.isLoading) {
      this.isLoading = false;
    }
  },
  mounted() {
    this.standardFeetHeight = this.$store.state.standardFeetHeightOfCabinet;

    for (let cabinet of this.$store.state.lowerShelf.cabinets) {
      this.cabinets.push(this.$getCabinetInstance(cabinet));
    }

    this.numberOfCabinets = this.cabinets.length;
    this.$store.dispatch("setChildRenderedComponent", this);
  },
};
</script>

<style scoped></style>
