<template>
  <v-app>
    <v-content>
      <v-container class="wrapper" fluid>
        <SaveProject />
        <v-row align="center" justify="center">
          <v-col cols="12">
            <div class="LowerShelf">
              <h1>{{ shelfObject.title }}</h1>
              <!-- Metric unit region -->
              <v-row align="center" justify="center">
                <v-col cols="12">
                  <h3>Мерна единица в {{ calculationUnit }}</h3>
                  <div class="flex-center">
                    <v-radio-group
                      :value="calculationUnit"
                      @change="changeMetricUnit"
                      row
                    >
                      <template v-slot:label>
                        <div>Промени мерна единица</div>
                      </template>
                      <v-radio value="мм">
                        <template v-slot:label>
                          <div><strong class="primary--text">ММ</strong></div>
                        </template>
                      </v-radio>
                      <v-radio value="см">
                        <template v-slot:label>
                          <div><strong class="primary--text">СМ</strong></div>
                        </template>
                      </v-radio>
                    </v-radio-group>
                  </div>
                </v-col>
              </v-row>
            </div>
          </v-col>
        </v-row>
        <v-divider />
        <div class="header-section">
          <h3>Промени стандартна дебелина на страници</h3>
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
                :label="'Стандартна дебелина на страници в ' + calculationUnit"
                :rules="numberRules"
                outlined
                dense
                required
              ></v-text-field>
            </v-col>
            <v-col cols="12" class="col-no-top-padding">
              <v-btn
                :disabled="!validStaticSideWidth"
                color="success"
                @click="changeStaticSidewidth"
              >
                запази
              </v-btn>
            </v-col>
          </v-row>
        </v-form>
        <v-divider />
        <div class="header-section">
          <h3>Стойности за целия долен шкаф</h3>
        </div>
        <v-form v-model="validWholeShelf" @submit.prevent>
          <v-row align="center" justify="center">
            <!-- Whole width region -->
            <v-col cols="12" sm="8" md="4">
              <v-text-field
                v-model="shelfWidth"
                :label="'Обща ширина на долната част в ' + calculationUnit"
                :rules="numberRules"
                outlined
                dense
                required
              ></v-text-field>
            </v-col>
            <!-- Whole height region -->
            <v-col cols="12" sm="8" md="4">
              <v-text-field
                v-model="shelfHeight"
                :label="'Обща височина на долната част в ' + calculationUnit"
                :rules="numberRules"
                outlined
                dense
                required
              ></v-text-field>
            </v-col>
            <!-- Whole depth region -->
            <v-col cols="12" sm="8" md="4">
              <v-text-field
                v-model="shelfDepth"
                :label="'Обща дълбочина на долната част в ' + calculationUnit"
                :rules="numberRules"
                outlined
                dense
                required
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="8" md="4" class="col-no-top-padding">
              <v-btn
                :disabled="!validWholeShelf"
                color="success"
                @click="changeTheWholeShelfProperties"
              >
                запази
              </v-btn>
            </v-col>
          </v-row>
        </v-form>
        <!-- Shelf outer sides region -->
        <v-divider />
        <div class="header-section">
          <h3>Стойности за страници на долния шкаф</h3>
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
              добави страници
            </v-btn>
            <v-btn
              :disabled="shelfOuterSides.length == 0"
              class="right-button left-button"
              @click="renderOuterShelfSides"
            >
              {{
                showOuterShelfSidesForEdit
                  ? "скрий страници"
                  : "редактирай страници"
              }}
            </v-btn>
            <v-btn
              v-if="shelfOuterSides.length > 0"
              :disabled="!validWholeShelf"
              color="success"
              class="mr-4 right-button"
              @click="addShelfOuterSidesToStore"
            >
              запази
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
                      label="Ширина"
                      outlined
                      dense
                      required
                    ></v-text-field>
                  </v-col>

                  <v-col cols="12" md="3">
                    <v-text-field
                      v-model="side.height"
                      :rules="numberRules"
                      label="Височина"
                      outlined
                      dense
                      required
                    ></v-text-field>
                  </v-col>

                  <v-col cols="12" md="3">
                    <v-text-field
                      v-model="side.depth"
                      :rules="numberRules"
                      label="Дълбочина"
                      outlined
                      dense
                      required
                    ></v-text-field>
                  </v-col>

                  <v-col cols="12" md="3" justify-content>
                    <div>
                      <v-btn
                        :disabled="!side.isValid"
                        color="error"
                        class="mx-2 delete-outer-side"
                        fab
                        dark
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
          <h3>Стойности за ниши за уреди</h3>
        </div>
        <!-- Static cabinets region -->
        <v-row align="center" justify="center">
          <v-col cols="12">
            Статични размери брой {{ allStaticWidths.length }}
          </v-col>
          <v-col
            cols="12"
            v-if="allStaticWidths.length == maxNumberOfStaticCabinets"
          >
            <span class="error-holder">
              Достигнат е максималния брой на шкафове
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
              добави
            </v-btn>
            <v-btn
              :disabled="allStaticWidths.length == 0"
              class="right-button"
              @click="removeStaticcabintes"
            >
              премахни
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
                    'Ширина на статичен шкаф ' +
                      (index + 1) +
                      ' в ' +
                      calculationUnit
                  "
                  outlined
                  dense
                  :rules="numberRules"
                  required
                ></v-text-field>
              </div>
              <v-btn
                :disabled="!validStaticWidth"
                color="success"
                class="mr-4"
                @click="addStaticWidth"
              >
                запази
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
import SaveProject from "@/components/SaveProject.vue";

export default {
  name: "LowerShelf",
  components: {
    LowerInnerCabinets,
    SaveProject
  },
  data: () => ({
    validWholeShelf: false,
    validStaticWidth: false,
    validStaticSideWidth: false,
    staticSidewidth: 0,
    shelfWidth: 0,
    shelfHeight: 0,
    shelfDepth: 0,
    shelfOuterSides: [],
    allStaticWidths: [],
    maxNumberOfStaticCabinets: 5,
    showOuterShelfSidesForEdit: false
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
      return this.$getnumberValidationRules;
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
    }
  },
  methods: {
    changeMetricUnit(unit) {
      this.$store.dispatch("cnangeMetricUnit", unit);
    },
    changeStaticSidewidth() {
      let newWidth = parseInt(this.staticSidewidth);
      this.$store.dispatch("changeStaticsidewidth", newWidth);
    },
    changeTheWholeShelfProperties() {
      let formWidth = parseInt(this.shelfWidth, 10);
      if (formWidth != this.shelfObject.width) {
        this.$store.dispatch("changeShelfWidth", formWidth);
      }

      let formHeight = parseInt(this.shelfHeight, 10);
      if (formHeight != this.shelfObject.height) {
        this.$store.dispatch("changeShelfHeight", formHeight);
      }

      let formDepth = parseInt(this.shelfDepth, 10);
      if (formDepth != this.shelfObject.depth) {
        this.$store.dispatch("changeShelfDepth", formDepth);
      }
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
      }

      if (this.shelfOuterSides.length <= 0) {
        this.showOuterShelfSidesForEdit = false;
      }
    },
    getShelfOuterSidesAddedMessage() {
      let letStartMessage =
        this.shelfOuterSides.length == 1
          ? "Ще бъдe добавена " +
            this.$getnumberWord(this.shelfOuterSides.length - 1) +
            " страница"
          : "Ще бъдат добавени " +
            this.$getnumberWord(this.shelfOuterSides.length - 1) +
            " страници";

      let message =
        letStartMessage +
        " с дебелина: " +
        this.getStaticOuterSideWidth +
        " " +
        this.calculationUnit +
        " дълбочина: " +
        this.shelfDepth +
        " " +
        this.calculationUnit +
        " и височина: " +
        this.shelfHeight +
        " " +
        this.calculationUnit;

      return message;
    },
    renderOuterShelfSides() {
      this.showOuterShelfSidesForEdit = !this.showOuterShelfSidesForEdit;
    },
    addStaticCabintes() {
      if (this.allStaticWidths.length < this.maxNumberOfStaticCabinets) {
        let currentCabinet = {
          width: 0
        };
        this.allStaticWidths.push(currentCabinet);
      }
    },
    removeStaticcabintes() {
      if (this.allStaticWidths.length > 0) {
        if (
          this.allStaticWidths.length ==
          this.$store.state.lowerShelf.staticCabinets.length
        ) {
          this.$store.dispatch("removeStaticCabinet");
        }
        this.allStaticWidths.splice(this.allStaticWidths.length - 1);
      }
    },
    addStaticWidth() {
      this.$store.dispatch("addStaticFieldsWidth", this.allStaticWidths);
    }
  },
  mounted() {
    for (let cabinet of this.$store.state.lowerShelf.staticCabinets) {
      let currentCabinet = {
        width: cabinet.width
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
        isValid: true
      };
      this.shelfOuterSides.push(currentSide);
    }

    this.staticSidewidth = this.$store.state.staticOuterSideWidth;
  }
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
.left-button {
  margin-right: 1rem;
  margin-left: 1rem;
  margin-top: 2rem;
}
.right-button {
  margin-left: 1rem;
  margin-right: 1rem;
  margin-top: 2rem;
}
.sides-added {
  color: #1976d2;
  text-align: center;
  margin-top: 2rem;
}
.delete-outer-side {
  top: 1rem;
}
</style>
