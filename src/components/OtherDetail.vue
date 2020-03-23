<template>
  <v-app>
    <v-content>
      <v-container class="wrapper" fluid
        ><v-row align="center" justify="center">
          <v-col cols="12">
            <div>
              <h1>{{ translate("otherDetailsTitle") }}</h1>
            </div>
          </v-col>
        </v-row>
        <v-divider />
        <v-row align="center" justify="center">
          <v-col cols="12">
            <v-btn class="left-button" @click="addOuterDetails">
              {{ translate("addDetail") }}
            </v-btn>
            <v-btn
              :disabled="otherDetails.length == 0"
              class="right-button left-button"
              @click="showOtherDetailsForEdit = !showOtherDetailsForEdit"
            >
              {{
                showOtherDetailsForEdit
                  ? translate("hideDetails")
                  : translate("editDetails")
              }}
            </v-btn>
            <v-btn
              v-if="otherDetails.length > 0"
              :disabled="!isAllDetailsValid"
              color="success"
              class="mr-4 right-button"
              @click="addDetailsToStore"
            >
              {{ translate("save") }}
            </v-btn>
          </v-col>
        </v-row>
        <div v-if="showOtherDetailsForEdit">
          <v-row
            v-for="(detail, index) in otherDetails"
            :key="index"
            align="center"
            justify="center"
          >
            <v-form v-model="detail.isValid" @submit.prevent>
              <v-container>
                <v-row justify="space-around">
                  <v-col cols="4" md="1">
                    <v-text-field
                      v-model="detail.count"
                      :rules="numberRules"
                      :label="translate('count')"
                      outlined
                      dense
                      required
                      type="number"
                    ></v-text-field>
                  </v-col>

                  <v-col cols="12" md="2">
                    <v-text-field
                      v-model="detail.width"
                      :rules="numberRules"
                      :label="translate('thickness')"
                      outlined
                      dense
                      required
                      type="number"
                    ></v-text-field>
                  </v-col>

                  <v-col cols="12" md="2">
                    <v-text-field
                      v-model="detail.height.value"
                      :rules="numberRules"
                      :label="translate('length')"
                      outlined
                      dense
                      required
                      type="number"
                    ></v-text-field>
                  </v-col>

                  <v-checkbox
                    v-model="detail.height.hasEdging"
                    :label="translate('edge')"
                    hide-details
                  ></v-checkbox>

                  <v-checkbox
                    v-model="detail.height.hasDoubleEdging"
                    :label="translate('doubleSided')"
                  ></v-checkbox>

                  <v-col cols="12" md="2">
                    <v-text-field
                      v-model="detail.length.value"
                      :rules="numberRules"
                      :label="translate('width')"
                      outlined
                      dense
                      required
                      type="number"
                    ></v-text-field>
                  </v-col>

                  <v-checkbox
                    v-model="detail.length.hasEdging"
                    :label="translate('edge')"
                  ></v-checkbox>

                  <v-checkbox
                    v-model="detail.length.hasDoubleEdging"
                    :label="translate('doubleSided')"
                  ></v-checkbox>

                  <v-col cols="12" md="1" justify-content>
                    <div>
                      <v-btn
                        :disabled="!detail.isValid"
                        color="error"
                        class="mx-2 delete-outer-side"
                        fab
                        small
                        @click="removeDetail(index)"
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
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
export default {
  name: "OtherDetail",
  components: {},
  data: () => ({
    otherDetails: [],
    showOtherDetailsForEdit: false
  }),
  computed: {
    isAllDetailsValid() {
      for (let detail of this.otherDetails) {
        let width = parseInt(detail.width);
        let height = parseInt(detail.height.value);
        let length = parseInt(detail.length.value);
        if (isNaN(width) || isNaN(height) || isNaN(length)) {
          return false;
        }

        if (width <= 0 || height <= 0 || length <= 0) {
          return false;
        }
      }
      return true;
    },
    numberRules() {
      return this.$getnumberValidationRules(
        this.$store.state.languages.languages[this.$store.state.selectedLang],
        this.$store.state.validatoinRulesLiterals
      );
    }
  },
  methods: {
    translate(literal) {
      return this.$store.state.languages.languages[
        this.$store.state.selectedLang
      ][literal];
    },
    addOuterDetails() {
      let detail = {
        count: 1,
        width: this.$store.state.staticOuterSideWidth,
        height: {
          hasEdging: false,
          hasDoubleEdging: false,
          value: 0
        },
        length: {
          hasEdging: false,
          hasDoubleEdging: false,
          value: 0
        },
        isValid: false
      };

      this.otherDetails.push(detail);
    },
    addDetailsToStore() {
      if (this.otherDetails.length != this.$store.state.otherDetails.length) {
        this.$toasted.success(this.translate("successfullyAddedOtherDetails"), {
          action: {
            text: this.translate("close"),
            class: "notification-close",
            onClick: (e, toastObject) => {
              toastObject.goAway(0);
            }
          }
        });
      } else if (this.isDetailsChanged()) {
        this.$toasted.success(this.translate("successfullyChangedValues"), {
          action: {
            text: this.translate("close"),
            class: "notification-close",
            onClick: (e, toastObject) => {
              toastObject.goAway(0);
            }
          }
        });
      }
      this.$store.dispatch("addOtherDetails", this.otherDetails);
    },
    removeDetail(index) {
      if (index >= 0 && index < this.otherDetails.length) {
        this.$toasted.error(this.translate("successfullyRemovedOtherDetails"), {
          action: {
            text: this.translate("close"),
            class: "notification-close",
            onClick: (e, toastObject) => {
              toastObject.goAway(0);
            }
          }
        });
        this.otherDetails.splice(index, 1);
        this.$store.dispatch("removeOtherDetail", index);
      }

      if (this.otherDetails.length <= 0) {
        this.showOtherDetailsForEdit = false;
      }
    },
    isDetailsChanged() {
      for (
        let detailIndex = 0;
        detailIndex < this.otherDetails.length;
        detailIndex++
      ) {
        let currentDetail = this.otherDetails[detailIndex];
        let storeDetail = this.$store.state.otherDetails[detailIndex];
        if (
          currentDetail.height.value != storeDetail.height.value ||
          currentDetail.length.value != storeDetail.length.value ||
          currentDetail.width != storeDetail.width
        ) {
          return true;
        }

        if (
          currentDetail.height.hasEdging != storeDetail.height.hasEdging ||
          currentDetail.length.hasEdging != storeDetail.length.hasEdging
        ) {
          return true;
        }

        if (
          currentDetail.height.hasEdging &&
          storeDetail.height.hasEdging &&
          currentDetail.height.hasDoubleEdging !=
            storeDetail.height.hasDoubleEdging
        ) {
          return true;
        }

        if (
          currentDetail.length.hasEdging &&
          storeDetail.length.hasEdging &&
          currentDetail.length.hasDoubleEdging !=
            storeDetail.length.hasDoubleEdging
        ) {
          return true;
        }
      }
      return false;
    }
  },
  mounted() {
    for (let detail of this.$store.state.otherDetails) {
      this.otherDetails.push(detail);
    }
  }
};
</script>

<style scoped></style>
