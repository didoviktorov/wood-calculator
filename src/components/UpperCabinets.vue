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
        <v-row>
          <v-col cols="12">
            <v-divider />
            <h2>{{ $translate("upperCabinets") }}</h2>
            <v-divider />
          </v-col>
        </v-row>
        <!-- inner cabinets region -->
        <v-row align="center" justify="center">
          <v-col cols="12" class="col-no-top-padding">
            <div>
              <h3>{{ $translate("enterCountOfCabinets") }}</h3>
            </div>
          </v-col>
        </v-row>
        <div
          v-if="this.$store.state.upperShelf.cabinets.length > 0"
          class="cabinets-added"
        >
          {{
            this.$store.state.upperShelf.cabinets.length == 1
              ? $translate("cabinetAddedMessage").replace(
                  "%count%",
                  this.$store.state.upperShelf.cabinets.length
                )
              : $translate("cabinetsAddedMessage").replace(
                  "%count%",
                  this.$store.state.upperShelf.cabinets.length
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
              <v-btn :disabled="validateAddButton" @click="addCabinets">
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
                    !validateCabinets ||
                    errorRefIndex !== null
                "
                @click="addCabinetsToStore"
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

              <UpperCabinet
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
import UpperCabinet from "@/components/UpperCabinet.vue";

export default {
  components: {
    UpperCabinet,
  },
  data: () => ({
    validNumberOfCabinets: false,
    numberOfCabinets: 0,
    cabinets: [],
    openForEdit: false,
    errorRefIndex: null,
    isLoading: false,
  }),
  computed: {
    getPureWidthLeft() {
      let remainingWidth = this.$store.getters.getUpperShelfPureWidth;
      for (let cabinetIndex in this.cabinets) {
        if (this.$store.state.upperShelf.cabinets[cabinetIndex]) {
          remainingWidth += this.$store.state.upperShelf.cabinets[cabinetIndex]
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
    addCabinetsToStore() {
      let args = {
        cabinets: this.cabinets,
        copyCabinet: this.$getCabinetInstance,
      };

      let hasChanged = this.$isCabinetsChanged(
        this.cabinets,
        this.$store.state.upperShelf.cabinets,
        true
      );

      if (
        this.cabinets.length != this.$store.state.upperShelf.cabinets.length
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
      this.$store.dispatch("addUpperShelfCabinets", args);
    },
    editCabinet(index) {
      let cabinetToEdit = this.$getCabinetInstance(this.cabinets[index]);
      let hasChanged = this.$isCabinetsChanged(
        this.cabinets,
        this.$store.state.upperShelf.cabinets,
        true
      );
      if (
        this.cabinets.length != this.$store.state.upperShelf.cabinets.length
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
      cabinetToEdit.isEdited = true;
      let params = {
        editedCabinet: cabinetToEdit,
        cabinetIndex: index,
      };
      this.$store.dispatch("saveCabinetUpperShelfCabinets", params);
    },
    addCabinets() {
      if (this.openForEdit) {
        this.openForEdit = false;
      }
      this.cabinets = [];

      let currentNumerOfCabinets = parseInt(this.numberOfCabinets);

      let heightOfCabinets = this.$store.state.upperShelf.height;

      let cabinetsSidesHeight = heightOfCabinets;

      const backDiff = this.$store.state.cabinetBackDiff;
      for (let i = 0; i < currentNumerOfCabinets; i++) {
        let currentCabinetToAdd = {
          outerWidth: "",
          innerWidth: 0,
          height: heightOfCabinets,
          depth: this.$store.state.upperShelf.depth,
          showCabinetElements: false,
          bottom: {
            width: "",
            height: this.$store.state.staticOuterSideWidth,
            depth: this.$store.state.upperShelf.depth,
          },
          back: {
            width: "",
            height: heightOfCabinets - backDiff,
          },
          ceil: {
            width: "",
            height: this.$store.state.staticOuterSideWidth,
            depth: this.$store.state.upperShelf.depth,
          },
          sides: [
            {
              width: this.$store.state.staticOuterSideWidth,
              height: cabinetsSidesHeight,
              depth: this.$store.state.upperShelf.depth,
            },
            {
              width: this.$store.state.staticOuterSideWidth,
              height: cabinetsSidesHeight,
              depth: this.$store.state.upperShelf.depth,
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
        this.$toasted.error(this.$translate("successfullyDeletedCabinets"), {
          action: {
            text: this.$translate("close"),
            class: "notification-close",
            onClick: (e, toastObject) => {
              toastObject.goAway(0);
            },
          },
        });
        this.cabinets = [];
        this.numberOfCabinets = 0;
        this.$store.dispatch("removeAllUpperInnerCabinets");
      }
    },
    isAllDetailsValid() {
      return this.isAllCabinetsValid;
    },
    addElementsToStore() {
      let args = {
        cabinets: this.cabinets,
        copyCabinet: this.$getCabinetInstance,
      };
      this.$store.dispatch("addUpperShelfCabinets", args);
    },
    isChanged() {
      let cabinetsChanged = this.$isCabinetsChanged(
        this.cabinets,
        this.$store.state.upperShelf.cabinets,
        true
      );

      return cabinetsChanged;
    },
  },
  updated() {
    if (this.openForEdit && this.isLoading) {
      this.isLoading = false;
    }
  },
  mounted() {
    for (let cabinet of this.$store.state.upperShelf.cabinets) {
      this.cabinets.push(this.$getCabinetInstance(cabinet));
    }

    this.numberOfCabinets = this.cabinets.length;
    this.$store.dispatch("setChildRenderedComponent", this);
  },
};
</script>

<style scoped></style>
