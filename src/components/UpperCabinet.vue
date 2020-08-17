<template>
  <div>
    <h4>
      {{ $translate("cabinetIndex").replace("%index%", index + 1) }}
    </h4>
    <v-container>
      <!-- cabinet dimensions -->
      <v-row>
        <v-col cols="12" md="4">
          <v-text-field
            v-model.lazy="cabinet.outerWidth"
            :rules="numberRules"
            :label="$translate('width')"
            outlined
            dense
            required
            @keyup="changeWidthCabinet(cabinet)"
            type="number"
          ></v-text-field>
        </v-col>

        <v-col cols="12" md="4">
          <v-text-field
            v-model.lazy="cabinet.height"
            :rules="numberRules"
            :label="$translate('height')"
            outlined
            dense
            required
            type="number"
            @keyup="changeHeightCabinet(cabinet)"
          ></v-text-field>
        </v-col>

        <v-col cols="12" md="4">
          <v-text-field
            v-model.lazy="cabinet.depth"
            :rules="numberRules"
            :label="$translate('depth')"
            outlined
            dense
            required
            type="number"
            @keyup="changeDepthCabinet(cabinet)"
          ></v-text-field>
        </v-col>
      </v-row>
      <div v-if="cabinet.showCabinetElements">
        <h5>
          {{ $translate("bottomCabinetIndex").replace("%index%", index + 1) }}
        </h5>
        <!-- cabinet bottom dimensions -->
        <v-row>
          <v-col cols="12" md="4">
            <v-text-field
              v-model="cabinet.bottom.width"
              :rules="numberRules"
              :label="$translate('bottomWidth')"
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
              :label="$translate('bottomHeight')"
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
              :label="$translate('bottomDepth')"
              outlined
              dense
              required
              type="number"
            ></v-text-field>
          </v-col>
        </v-row>
        <h5>
          {{
            $translate("upperCabinetCeilIndex").replace("%index%", index + 1)
          }}
        </h5>
        <!-- cabinet ceil dimensions -->
        <v-row>
          <v-col cols="12" md="4">
            <v-text-field
              v-model="cabinet.ceil.width"
              :rules="numberRules"
              :label="$translate('upperCabinetCeilWidth')"
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
              :label="$translate('upperCabinetCeilHeight')"
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
              :label="$translate('upperCabinetCeilDepth')"
              outlined
              dense
              required
              type="number"
            ></v-text-field>
          </v-col>
        </v-row>
        <h5>
          {{ $translate("cabinetBackIndex").replace("%index%", index + 1) }}
        </h5>
        <!-- cabinet back dimensions -->
        <v-row>
          <v-col cols="12" md="6">
            <v-text-field
              v-model="cabinet.back.width"
              :rules="numberRules"
              :label="$translate('cabinetBackWidth')"
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
              :label="$translate('cabinetBackHeight')"
              outlined
              dense
              required
              type="number"
            ></v-text-field>
          </v-col>
        </v-row>
        <!-- cabinet sides dimensions -->
        <h5>
          {{ $translate("cabinetSidesIndex").replace("%index%", index + 1) }}
        </h5>
        <v-row
          v-for="(side, sideIndex) in cabinet.sides"
          :key="sideIndex + 's'"
        >
          <v-col cols="12" md="4">
            <v-text-field
              v-model="side.width"
              :rules="numberRules"
              :label="
                $translate('sideWidthIndex').replace('%index%', sideIndex + 1)
              "
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
              :label="
                $translate('sideHeightIndex').replace('%index%', sideIndex + 1)
              "
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
              :label="
                $translate('sideDepthIndex').replace('%index%', sideIndex + 1)
              "
              outlined
              dense
              required
              type="number"
            ></v-text-field>
          </v-col>
        </v-row>

        <!-- cabinet shelfs dimensions -->
        <h5>
          {{ $translate("shelfOfCabinetIndex").replace("%index%", index + 1) }}
        </h5>
        <v-row
          v-for="(shelf, shelfIndex) in cabinet.shelfs"
          :key="shelfIndex + 'q'"
        >
          <v-col cols="12" md="4">
            <v-text-field
              v-model="shelf.width"
              :rules="numberRules"
              :label="
                $translate('shelfWidthIndex').replace('%index%', shelfIndex + 1)
              "
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
              :label="
                $translate('shelfHeightIndex').replace(
                  '%index%',
                  shelfIndex + 1
                )
              "
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
              :label="
                $translate('shelfDepthIndex').replace('%index%', shelfIndex + 1)
              "
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
              @click="$addShelf(cabinet)"
            >
              {{ $translate("addShelf") }}
            </v-btn>
          </v-col>
          <v-col cols="6">
            <v-btn
              :disabled="cabinet.shelfs.length == 0 || !cabinet.isValid"
              color="error"
              @click="$removeShelf(cabinet)"
            >
              {{ $translate("deleteShelf") }}
            </v-btn>
          </v-col>
        </v-row>
        <!-- cabinet dividers dimensions -->
        <h5>
          {{
            $translate("dividerOfCabinetIndex").replace("%index%", index + 1)
          }}
        </h5>
        <v-row
          v-for="(divider, dividerIndex) in cabinet.dividers"
          :key="dividerIndex + 'div'"
        >
          <v-col cols="12" md="4">
            <v-text-field
              v-model="divider.width"
              :rules="numberRules"
              :label="
                $translate('dividerWidthIndex').replace(
                  '%index%',
                  dividerIndex + 1
                )
              "
              outlined
              dense
              required
              type="number"
            ></v-text-field>
          </v-col>

          <v-col cols="12" md="4">
            <v-text-field
              v-model="divider.height"
              :rules="numberRules"
              :label="
                $translate('dividerHeightIndex').replace(
                  '%index%',
                  dividerIndex + 1
                )
              "
              outlined
              dense
              required
              type="number"
            ></v-text-field>
          </v-col>

          <v-col cols="12" md="4">
            <v-text-field
              v-model="divider.depth"
              :rules="numberRules"
              :label="
                $translate('dividerDepthIndex').replace(
                  '%index%',
                  dividerIndex + 1
                )
              "
              outlined
              dense
              required
              type="number"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row align="center" justify="center">
          <v-col cols="12" md="6">
            <v-btn
              :disabled="!cabinet.isValid"
              color="info"
              @click="$addDivider(cabinet)"
            >
              {{ $translate("addDivider") }}
            </v-btn>
          </v-col>
          <v-col cols="12" md="6">
            <v-btn
              :disabled="cabinet.dividers.length == 0 || !cabinet.isValid"
              color="error"
              @click="$removeDivider(cabinet)"
            >
              {{ $translate("deleteDivider") }}
            </v-btn>
          </v-col>
        </v-row>
        <!-- cabinet doors dimensions -->
        <h5>
          {{ $translate("doorsCabinetIndex").replace("%index%", index + 1) }}
        </h5>
        <v-row
          v-for="(door, doorIndex) in cabinet.doors"
          :key="doorIndex + 'd'"
        >
          <v-col cols="12" md="4">
            <v-text-field
              v-model="door.width"
              :rules="numberRules"
              :label="
                $translate('doorWidthIndex').replace('%index%', doorIndex + 1)
              "
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
              :label="
                $translate('doorHeightIndex').replace('%index%', doorIndex + 1)
              "
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
              :label="
                $translate('doorDepthIndex').replace('%index%', doorIndex + 1)
              "
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
                  cabinet.doors.length == $store.state.maxNumberOfDoors
              "
              color="info"
              @click="$addDoor(cabinet)"
            >
              {{ $translate("addDoor") }}
            </v-btn>
          </v-col>
          <v-col cols="6">
            <v-btn
              :disabled="cabinet.doors.length == 0 || !cabinet.isValid"
              color="error"
              @click="$removeDoor(cabinet)"
            >
              {{ $translate("deleteDoor") }}
            </v-btn>
          </v-col>
        </v-row>
        <v-row align="center" justify="center">
          <v-col cols="12" class="col-no-top-padding">
            <v-btn
              :disabled="!cabinet.isValid"
              color="success"
              @click="editCabinet"
            >
              {{ $translate("saveCabinet") }}
            </v-btn>
          </v-col>
        </v-row>
      </div>
      <v-row align="center" justify="center">
        <v-col cols="12" md="3" justify-content class="col-no-padding">
          <div>
            <v-btn
              color="info"
              class="mx-2"
              fab
              dark
              small
              @click="
                cabinet.showCabinetElements = !cabinet.showCabinetElements
              "
            >
              <v-icon>{{
                cabinet.showCabinetElements ? "mdi-menu-up" : "mdi-menu-down"
              }}</v-icon>
            </v-btn>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  props: {
    cabinet: {
      type: Object,
      required: true,
      default() {
        return {};
      },
    },
    index: {
      type: Number,
      required: true,
      default() {
        return 0;
      },
    },
  },
  computed: {
    numberRules() {
      return this.$getnumberValidationRules(
        this.$store.state.languages.languages[this.$store.state.selectedLang],
        this.$store.state.validationRulesLiterals
      );
    },
    getCabinetProps() {
      return this.$getCabinetProps(this.cabinet);
    },
  },
  watch: {
    getCabinetProps: {
      deep: true,
      handler(newVal) {
        let isValidCabinet = this.$checkIsCabinetValid(newVal);
        this.cabinet.isValid = isValidCabinet;
      },
    },
  },
  methods: {
    editCabinet() {
      this.$emit("edited", this.index);
    },
    isValidNumber(number) {
      let isValid = true;
      for (let func of this.numberRules) {
        if (typeof func(number) == "string") {
          return false;
        }
      }

      return isValid;
    },
    changeWidthCabinet(cabinet) {
      let newWidth = Number(cabinet.outerWidth);
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
            depth: cabinet.bottom.depth,
          },
          back: {
            width: newWidth - this.$store.state.cabinetBackDiff,
            height: cabinet.back.height,
          },
          sides: cabinet.sides,
          ceil: {
            width: newWidth - this.$store.state.staticOuterSideWidth * 2,
            height: this.$store.state.staticOuterSideWidth,
            depth: this.$store.state.upperShelf.depth,
          },
          shelfs: [],
          doors: [],
          dividers: cabinet.dividers,
        };

        if (cabinet.doors.length > 0) {
          for (let i = 0; i < cabinet.doors.length; i++) {
            this.$addDoor(cabinetToChange);
          }
        }

        if (cabinet.shelfs.length > 0) {
          for (let i = 0; i < cabinet.shelfs.length; i++) {
            this.$addShelf(cabinetToChange);
          }
        }

        this.$emit("changeCabinet", cabinetToChange);
      }
    },
    changeHeightCabinet(cabinet) {
      let newHeight = Number(cabinet.height);
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
            depth: cabinet.bottom.depth,
          },
          ceil: cabinet.ceil,
          back: {
            width: cabinet.back.width,
            height: newHeight - this.$store.state.cabinetBackDiff,
          },
          sides: [],
          shelfs: cabinet.shelfs,
          doors: [],
          dividers: [],
        };

        if (cabinet.dividers.length > 0) {
          for (let i = 0; i < cabinet.dividers.length; i++) {
            this.$addDivider(cabinetToChange);
          }
        }

        if (cabinet.doors.length > 0) {
          for (let i = 0; i < cabinet.doors.length; i++) {
            this.$addDoor(cabinetToChange);
          }
        }

        for (let i = 0; i < cabinet.sides.length; i++) {
          let newSide = {
            width: this.$store.state.staticOuterSideWidth,
            height: newHeight,
            depth: this.$store.state.upperShelf.depth,
          };

          cabinetToChange.sides.push(newSide);
        }

        this.$emit("changeCabinet", cabinetToChange);
      }
    },
    changeDepthCabinet(cabinet) {
      let newDepth = Number(cabinet.depth);
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
            depth: newDepth,
          },
          back: {
            width: cabinet.back.width,
            height: cabinet.back.height,
          },
          sides: [],
          ceil: {
            width: cabinet.ceil.width,
            height: this.$store.state.staticOuterSideWidth,
            depth: newDepth,
          },
          shelfs: [],
          dividers: [],
          doors: cabinet.doors,
        };

        if (cabinet.dividers.length > 0) {
          for (let i = 0; i < cabinet.dividers.length; i++) {
            this.$addDivider(cabinetToChange);
          }
        }

        if (cabinet.shelfs.length > 0) {
          for (let i = 0; i < cabinet.shelfs.length; i++) {
            this.$addShelf(cabinetToChange);
          }
        }

        for (let i = 0; i < cabinet.sides.length; i++) {
          let newSide = {
            width: this.$store.state.staticOuterSideWidth,
            height: cabinet.sides[i].height,
            depth: newDepth,
          };

          cabinetToChange.sides.push(newSide);
        }

        this.$emit("changeCabinet", cabinetToChange);
      }
    },
  },
};
</script>

<style></style>
