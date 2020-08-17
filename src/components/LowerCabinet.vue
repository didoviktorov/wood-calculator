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
        <!-- cabinet upper holders dimensions -->
        <h5>
          {{
            $translate("aperturesCabinetIndex").replace("%index%", index + 1)
          }}
        </h5>
        <v-row
          v-for="(holder, holderIndex) in cabinet.upperHolders"
          :key="holderIndex + 'h'"
        >
          <v-col cols="12" md="4">
            <v-text-field
              v-model="holder.width"
              :rules="numberRules"
              :label="
                $translate('apertureWidthIndex').replace(
                  '%index%',
                  holderIndex + 1
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
              v-model="holder.height"
              :rules="numberRules"
              :label="
                $translate('apertureHeightIndex').replace(
                  '%index%',
                  holderIndex + 1
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
              v-model="holder.depth"
              :rules="numberRules"
              :label="
                $translate('apertureDepthIndex').replace(
                  '%index%',
                  holderIndex + 1
                )
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
      return this.$getnumberValidationRules();
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
    changeWidthCabinet(cabinet) {
      let cabinetToChange = this.$changeWidthCabinet(cabinet, true);
      if (cabinetToChange) {
        this.$emit("changeCabinet", cabinetToChange);
      }
    },
    changeHeightCabinet(cabinet) {
      let cabinetToChange = this.$changeHeightCabinet(cabinet, true);
      if (cabinetToChange) {
        this.$emit("changeCabinet", cabinetToChange);
      }
    },
    changeDepthCabinet(cabinet) {
      let cabinetToChange = this.$changeDepthCabinet(cabinet, true);
      if (cabinetToChange) {
        this.$emit("changeCabinet", cabinetToChange);
      }
    },
  },
};
</script>

<style></style>
