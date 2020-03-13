<template>
  <v-app>
    <v-content>
      <v-container class="wrapper" fluid
        ><v-row align="center" justify="center">
          <v-col cols="12">
            <div>
              <h1>{{ title }}</h1>
            </div>
          </v-col>
        </v-row>
        <v-divider />
        <v-row align="center" justify="center">
          <v-col cols="12">
            <v-btn class="left-button" @click="addOuterDetails">
              добави детайл
            </v-btn>
            <v-btn
              :disabled="otherDetails.length == 0"
              class="right-button left-button"
              @click="showOtherDetailsForEdit = !showOtherDetailsForEdit"
            >
              {{
                showOtherDetailsForEdit ? "скрий детайли" : "редактирай детайли"
              }}
            </v-btn>
            <v-btn
              v-if="otherDetails.length > 0"
              :disabled="!isAllDetailsValid"
              color="success"
              class="mr-4 right-button"
              @click="addDetailsToStore"
            >
              запази
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
                  <v-col cols="12" md="3">
                    <v-text-field
                      v-model="detail.width"
                      :rules="numberRules"
                      label="Ширина"
                      outlined
                      dense
                      required
                      type="number"
                    ></v-text-field>
                  </v-col>

                  <v-col cols="12" md="3">
                    <v-text-field
                      v-model="detail.height.value"
                      :rules="numberRules"
                      label="Височина"
                      outlined
                      dense
                      required
                      type="number"
                    ></v-text-field>
                  </v-col>

                  <v-checkbox
                    v-model="detail.height.hasEdging"
                    :label="'кант'"
                    hide-details
                  ></v-checkbox>

                  <v-col cols="12" md="3">
                    <v-text-field
                      v-model="detail.length.value"
                      :rules="numberRules"
                      label="Дължина"
                      outlined
                      dense
                      required
                      type="number"
                    ></v-text-field>
                  </v-col>

                  <v-checkbox
                    v-model="detail.length.hasEdging"
                    :label="'кант'"
                  ></v-checkbox>

                  <v-col cols="12" md="1" justify-content>
                    <div>
                      <v-btn
                        :disabled="!detail.isValid"
                        color="error"
                        class="mx-2 delete-outer-side"
                        fab
                        dark
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
    title: "ДРУГИ ДЕТАЙЛИ",
    otherDetails: [],
    showOtherDetailsForEdit: false
  }),
  computed: {
    isAllDetailsValid() {
      for (let detail of this.otherDetails) {
        let width = parseInt(detail.width);
        let height = parseInt(detail.height.value);
        let length = parseInt(detail.length.value);
        if (width <= 0 || height <= 0 || length <= 0) {
          return false;
        }
      }
      return true;
    },
    numberRules() {
      return this.$getnumberValidationRules;
    }
  },
  methods: {
    addOuterDetails() {
      let detail = {
        width: this.$store.state.staticOuterSideWidth,
        height: {
          hasEdging: false,
          value: 0
        },
        length: {
          hasEdging: false,
          value: 0
        },
        isValid: false
      };

      this.otherDetails.push(detail);
    },
    addDetailsToStore() {
      this.$store.dispatch("addOtherDetails", this.otherDetails);
    },
    removeDetail(index) {
      if (index >= 0 && index < this.otherDetails.length) {
        this.otherDetails.splice(index, 1);
        this.$store.dispatch("removeOtherDetail", index);
      }

      if (this.otherDetails.length <= 0) {
        this.showOtherDetailsForEdit = false;
      }
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