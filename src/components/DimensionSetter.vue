<template>
  <v-app>
    <v-main>
      <v-container class="wrapper" fluid>
        <div class="header-section">
          <h3>{{ $translate("changeStandartWidthOfSides") }}</h3>
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
                  $translate('standartWidthOfSidesIn') +
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
                :disabled="!validStaticSideWidth"
                color="success"
                @click="changeStaticSidewidth"
              >
                {{ $translate("save") }}
              </v-btn>
            </v-col>
          </v-row>
        </v-form>
        <v-divider />
        <div class="header-section">
          <h3>{{ $translate("changeStandartHeightOfLegs") }}</h3>
        </div>
        <v-form v-model="validStandardFeetHeight" @submit.prevent>
          <v-row align="center" justify="center">
            <v-col cols="12" sm="8" md="6" class="col-no-bottom-padding">
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
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "DimensionSetter",
  data: () => ({
    validStaticSideWidth: false,
    staticSidewidth: "",
    validStandardFeetHeight: false,
    standardFeetHeight: 0,
  }),
  computed: {
    calculationUnit() {
      return this.$store.state.calculationUnit;
    },
    numberRules() {
      return this.$getnumberValidationRules();
    },
  },
  methods: {
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
    addElementsToStore() {
      this.$store.dispatch(
        "changeStaticsidewidth",
        parseInt(this.staticSidewidth)
      );
      this.$store.dispatch(
        "changeInnerCabinetsFeetHeight",
        parseInt(this.standardFeetHeight)
      );
      this.$toasted.success(this.$translate("successfullyStoredValues"), {
        action: {
          text: this.$translate("close"),
          class: "notification-close",
          onClick: (e, toastObject) => {
            toastObject.goAway(0);
          },
        },
      });
    },
    isAllDetailsValid() {
      return this.validStaticSideWidth;
    },
    changeStaticSidewidth() {
      let newWidth = parseInt(this.staticSidewidth);
      if (newWidth != this.$store.state.staticOuterSideWidth) {
        this.$store.dispatch("changeStaticsidewidth", newWidth);

        this.$toasted.success(this.$translate("successfullSideWidthChange"), {
          action: {
            text: this.$translate("close"),
            class: "notification-close",
            onClick: (e, toastObject) => {
              toastObject.goAway(0);
            },
          },
        });
      }
    },
    isChanged() {
      let feetHeightChanged =
        this.standardFeetHeight !=
        this.$store.state.standardFeetHeightOfCabinet;
      if (
        this.staticSidewidth != this.$store.state.staticOuterSideWidth ||
        feetHeightChanged
      ) {
        return true;
      }
      return false;
    },
  },
  mounted() {
    this.staticSidewidth = this.$store.state.staticOuterSideWidth;
    this.standardFeetHeight = this.$store.state.standardFeetHeightOfCabinet;
    this.$store.dispatch("setRenderedComponent", this);
  },
};
</script>

<style scoped>
.v-main {
  padding: 0 !important;
}
.header-section {
  padding-top: 2.5rem;
}
</style>
