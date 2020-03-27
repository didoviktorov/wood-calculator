<template>
  <div class="my-2">
    <confirm ref="confirm"></confirm>
    <div class="text-center">
      <v-btn color="primary" @click="showOverlayInfo">
        {{ this.translate("generateProject") }}
      </v-btn>
      <v-row v-if="overlay" align="center" justify="center" id="project-title">
        <!-- Whole width region -->
        <v-col cols="12" sm="8" md="4">
          <v-text-field
            v-model="projectTitle"
            :label="translate('projectTitle')"
            outlined
            dense
            required
          ></v-text-field>
        </v-col>
      </v-row>
      <div v-if="overlay" id="overlay"></div>
      <span v-if="overlay" id="overlay-text" v-html="generateHtmlText()"></span>
      <div v-if="overlay" id="overlay-buttons">
        <div class="overlay-btn">
          <v-btn @click="showOverlayInfo" color="error" id="close-button">
            {{ this.translate("close") }}
          </v-btn>
        </div>
        <div class="overlay-btn">
          <v-btn color="primary" @click="downloadPdfFile">
            pdf
          </v-btn>
        </div>
        <div class="overlay-btn">
          <v-btn color="primary" @click="downloadWordFile">
            word
          </v-btn>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Document, Paragraph, Packer, HeadingLevel, TextRun } from "docx";
import * as jsPDF from "jspdf";
import { saveAs } from "file-saver";
import { font } from "../assets/constants";
import confirm from "@/components/Confirm.vue";

export default {
  name: "SaveProject",
  components: { confirm },
  data: () => ({
    overlay: false,
    textToExport: "",
    projectTitle: ""
  }),
  computed: {},
  methods: {
    translate(literal) {
      return this.$store.state.languages.languages[
        this.$store.state.selectedLang
      ][literal];
    },
    showOverlayInfo() {
      let currentRenderedComopnent = this.$store.state
        .currentChildRenderedCompnent;
      if (
        currentRenderedComopnent &&
        currentRenderedComopnent.isChanged() &&
        currentRenderedComopnent.isAllDetailsValid &&
        !this.overlay
      ) {
        this.$refs.confirm
          .open(
            this.translate("unsavedChanges"),
            this.translate("saveChanges"),
            {
              color: "#4caf50",
              cancelText: this.translate("continueWithoutSave"),
              confirmText: this.translate("save")
            }
          )
          .then(confirm => {
            if (confirm) {
              currentRenderedComopnent.addElementsToStore();
            }
            this.overlay = true;
            this.generateData();
          });
      } else {
        this.overlay = !this.overlay;
        if (this.overlay) {
          this.generateData();
        }
      }
    },
    generateHtmlText() {
      return this.textToExport.replace(/(?:\r\n|\r|\n)/g, "<br>");
    },
    downloadWordFile() {
      if (this.textToExport.length) {
        let doc = new Document({
          styles: {
            paragraphStyles: [
              {
                id: "InlineTexts",
                name: "Inline Format",
                basedOn: "Normal",
                next: "Normal",
                quickFormat: true,
                run: {
                  size: 28
                },
                paragraph: {
                  spacing: {
                    after: 120
                  }
                }
              }
            ]
          }
        });
        let lines = this.textToExport.split("\r\n");
        let paragraph = new Paragraph({ style: "InlineTexts" });
        for (let line of lines) {
          let text = new TextRun(line);
          paragraph.addChildElement(text.break());
        }

        doc.addSection({
          children: [
            new Paragraph({
              text: "Данни за шкафове",
              heading: HeadingLevel.HEADING_1
            }),
            paragraph
          ]
        });

        Packer.toBlob(doc).then(blob => {
          saveAs(
            blob,
            this.projectTitle ? this.projectTitle + ".docx" : "no_name..docx"
          );
        });
      }
    },
    downloadPdfFile() {
      if (this.textToExport.length) {
        let pdf = new jsPDF();

        pdf.addFileToVFS("Roboto-Regular-normal.ttf", font);
        pdf.addFont("Roboto-Regular-normal.ttf", "Roboto-Regular", "normal");
        pdf.setFont("Roboto-Regular");

        let textToArray = this.textToExport.split("\r\n");
        let startIndex = 0;
        let linesPerPage = 44;
        let pagesCount = Math.ceil(textToArray.length / linesPerPage);
        for (let i = 0; i < pagesCount; i++) {
          let textToAdd = textToArray
            .splice(startIndex, linesPerPage)
            .join("\r\n");
          pdf.text(textToAdd, 10, 10);
          if (textToArray.length > 0) {
            pdf.addPage();
          }
        }

        pdf.save(
          this.projectTitle ? this.projectTitle + ".pdf" : "no_name.pdf"
        );
      }
    },
    generateData() {
      let lowerShelf = this.$store.state.lowerShelf;
      let strResult = "";
      if (lowerShelf.cabinets.length) {
        strResult += this.translate("lowerCabinets") + "\r\n";
        strResult +=
          this.translate("countOfLowerCabinets") +
          " " +
          lowerShelf.cabinets.length +
          "\r\n\r\n";
      }

      let indentation = "  ";
      let boldEdge = 0;
      let lightEdge = 0;
      let totalDetailsCount = 0;
      let outerSidesDictionary = {};
      for (let outerSide of lowerShelf.outerSides) {
        lightEdge += outerSide.height;
        let currentDimension =
          (outerSide.height > outerSide.depth
            ? this.translate("longEdge")
            : this.translate("shortEdge")) +
          indentation +
          outerSide.height +
          "/" +
          outerSide.depth;
        if (!outerSidesDictionary[currentDimension]) {
          outerSidesDictionary[currentDimension] = 0;
        }

        outerSidesDictionary[currentDimension] += 1;
        totalDetailsCount += 1;
      }

      for (let prop in outerSidesDictionary) {
        strResult +=
          indentation +
          prop +
          " x " +
          outerSidesDictionary[prop] +
          " " +
          this.translate("outerSides") +
          "\r\n";
      }

      let sidesDictionary = {};
      let bottomsDictionary = {};
      let shelfsDictionary = {};
      let holdersDictionary = {};
      let doorsDictionary = {};
      let backsDictionary = {};
      for (let cabinet of lowerShelf.cabinets) {
        /* sides */
        for (let side of cabinet.sides) {
          lightEdge += side.height;
          let currentDimension =
            (side.height > side.depth
              ? this.translate("longEdge")
              : side.height == side.depth
              ? this.translate("longEdge")
              : this.translate("shortEdge")) +
            indentation +
            side.height +
            "/" +
            side.depth;
          if (!sidesDictionary[currentDimension]) {
            sidesDictionary[currentDimension] = 0;
          }

          sidesDictionary[currentDimension] += 1;
          totalDetailsCount += 1;
        }

        /* bottoms */
        lightEdge += cabinet.bottom.width;
        let currentBottomDimension =
          (cabinet.bottom.width > cabinet.bottom.depth
            ? this.translate("longEdge")
            : cabinet.bottom.width == cabinet.bottom.depth
            ? this.translate("longEdge")
            : this.translate("shortEdge")) +
          indentation +
          cabinet.bottom.width +
          "/" +
          cabinet.bottom.depth;
        if (!bottomsDictionary[currentBottomDimension]) {
          bottomsDictionary[currentBottomDimension] = 0;
        }

        bottomsDictionary[currentBottomDimension] += 1;
        totalDetailsCount += 1;

        /* upper holders */
        for (let holder of cabinet.upperHolders) {
          lightEdge += holder.width;
          let currentDimension =
            (holder.width > holder.depth
              ? this.translate("longEdge")
              : holder.width == holder.depth
              ? this.translate("longEdge")
              : this.translate("shortEdge")) +
            indentation +
            holder.width +
            "/" +
            holder.depth;
          if (!holdersDictionary[currentDimension]) {
            holdersDictionary[currentDimension] = 0;
          }

          holdersDictionary[currentDimension] += 1;
          totalDetailsCount += 1;
        }

        /* shelfs */
        for (let shelf of cabinet.shelfs) {
          lightEdge += shelf.width;
          let currentDimension =
            (shelf.width > shelf.depth
              ? this.translate("longEdge")
              : shelf.width == shelf.depth
              ? this.translate("longEdge")
              : this.translate("shortEdge")) +
            indentation +
            shelf.width +
            "/" +
            shelf.depth;
          if (!shelfsDictionary[currentDimension]) {
            shelfsDictionary[currentDimension] = 0;
          }

          shelfsDictionary[currentDimension] += 1;
          totalDetailsCount += 1;
        }

        /* doors */
        for (let door of cabinet.doors) {
          let currentDimension =
            this.translate("doubleShortLong") +
            indentation +
            door.height +
            "/" +
            door.width;
          if (!doorsDictionary[currentDimension]) {
            doorsDictionary[currentDimension] = 0;
          }
          boldEdge += 2 * (door.height + door.width);
          doorsDictionary[currentDimension] += 1;
          totalDetailsCount += 1;
        }

        /* backs */
        let currentBackDimension =
          cabinet.back.height + "/" + cabinet.back.width;
        if (!backsDictionary[currentBackDimension]) {
          backsDictionary[currentBackDimension] = 0;
        }

        backsDictionary[currentBackDimension] += 1;
        totalDetailsCount += 1;
      }

      for (let prop in sidesDictionary) {
        strResult +=
          indentation +
          prop +
          " x " +
          sidesDictionary[prop] +
          " " +
          this.translate("sides") +
          "\r\n";
      }

      for (let prop in bottomsDictionary) {
        strResult +=
          indentation +
          prop +
          " x " +
          bottomsDictionary[prop] +
          " " +
          this.translate("bottoms") +
          "\r\n";
      }

      for (let prop in holdersDictionary) {
        strResult +=
          indentation +
          prop +
          " x " +
          holdersDictionary[prop] +
          " " +
          this.translate("apertures") +
          "\r\n";
      }

      for (let prop in shelfsDictionary) {
        strResult +=
          indentation +
          prop +
          " x " +
          shelfsDictionary[prop] +
          " " +
          this.translate("shelfs") +
          "\r\n";
      }

      for (let prop in doorsDictionary) {
        strResult +=
          indentation +
          prop +
          " x " +
          doorsDictionary[prop] +
          " " +
          this.translate("doors") +
          "\r\n";
      }

      for (let prop in backsDictionary) {
        strResult +=
          indentation +
          prop +
          " x " +
          backsDictionary[prop] +
          " " +
          this.translate("backs") +
          "\r\n";
      }

      let upperShelf = this.$store.state.upperShelf;
      if (upperShelf.cabinets.length || upperShelf.outerSides.length) {
        strResult += "\r\n" + this.translate("upperCabinets") + "\r\n";
        strResult +=
          this.translate("upperCabinetsCount") +
          " " +
          upperShelf.cabinets.length +
          "\r\n\r\n";
      }

      outerSidesDictionary = {};
      for (let outerSide of upperShelf.outerSides) {
        lightEdge += outerSide.height;
        lightEdge += outerSide.depth;
        let currentDimension =
          this.translate("longAndShortEdge") +
          indentation +
          outerSide.height +
          "/" +
          outerSide.depth;
        if (!outerSidesDictionary[currentDimension]) {
          outerSidesDictionary[currentDimension] = 0;
        }

        outerSidesDictionary[currentDimension] += 1;
        totalDetailsCount += 1;
      }

      for (let prop in outerSidesDictionary) {
        strResult +=
          indentation +
          prop +
          " x " +
          outerSidesDictionary[prop] +
          " " +
          this.translate("outerSides") +
          "\r\n";
      }

      sidesDictionary = {};
      bottomsDictionary = {};
      shelfsDictionary = {};
      doorsDictionary = {};
      backsDictionary = {};

      for (let cabinet of upperShelf.cabinets) {
        /* sides */
        for (let side of cabinet.sides) {
          lightEdge += side.height;
          lightEdge += side.depth;
          let currentDimension =
            this.translate("longAndShortEdge") +
            indentation +
            side.height +
            "/" +
            side.depth;
          if (!sidesDictionary[currentDimension]) {
            sidesDictionary[currentDimension] = 0;
          }

          sidesDictionary[currentDimension] += 1;
          totalDetailsCount += 1;
        }

        /* bottoms */
        lightEdge += cabinet.bottom.width;
        let currentBottomDimension =
          (cabinet.bottom.width > cabinet.bottom.depth
            ? this.translate("longEdge")
            : cabinet.bottom.width == cabinet.bottom.depth
            ? this.translate("longEdge")
            : this.translate("shortEdge")) +
          indentation +
          cabinet.bottom.width +
          "/" +
          cabinet.bottom.depth;
        if (!bottomsDictionary[currentBottomDimension]) {
          bottomsDictionary[currentBottomDimension] = 0;
        }

        bottomsDictionary[currentBottomDimension] += 1;
        totalDetailsCount += 1;

        /* ceils */
        lightEdge += cabinet.ceil.width;
        let currentCeilDimension =
          (cabinet.ceil.width > cabinet.ceil.depth
            ? this.translate("longEdge")
            : cabinet.ceil.width == cabinet.ceil.depth
            ? this.translate("longEdge")
            : this.translate("shortEdge")) +
          indentation +
          cabinet.ceil.width +
          "/" +
          cabinet.ceil.depth;
        if (!bottomsDictionary[currentCeilDimension]) {
          bottomsDictionary[currentCeilDimension] = 0;
        }

        bottomsDictionary[currentCeilDimension] += 1;
        totalDetailsCount += 1;

        /* shelfs */
        for (let shelf of cabinet.shelfs) {
          lightEdge += shelf.width;
          let currentDimension =
            (shelf.width > shelf.depth
              ? this.translate("longEdge")
              : shelf.width == shelf.depth
              ? this.translate("longEdge")
              : this.translate("shortEdge")) +
            indentation +
            shelf.width +
            "/" +
            shelf.depth;
          if (!shelfsDictionary[currentDimension]) {
            shelfsDictionary[currentDimension] = 0;
          }

          shelfsDictionary[currentDimension] += 1;
          totalDetailsCount += 1;
        }

        /* doors */
        for (let door of cabinet.doors) {
          let currentDimension =
            this.translate("doubleShortLong") +
            indentation +
            door.height +
            "/" +
            door.width;
          if (!doorsDictionary[currentDimension]) {
            doorsDictionary[currentDimension] = 0;
          }

          boldEdge += 2 * (door.height + door.width);
          doorsDictionary[currentDimension] += 1;
          totalDetailsCount += 1;
        }

        /* backs */
        let currentBackDimension =
          cabinet.back.height + "/" + cabinet.back.width;
        if (!backsDictionary[currentBackDimension]) {
          backsDictionary[currentBackDimension] = 0;
        }

        backsDictionary[currentBackDimension] += 1;
        totalDetailsCount += 1;
      }

      for (let prop in sidesDictionary) {
        strResult +=
          indentation +
          prop +
          " x " +
          sidesDictionary[prop] +
          " " +
          this.translate("sides") +
          "\r\n";
      }

      for (let prop in bottomsDictionary) {
        strResult +=
          indentation +
          prop +
          " x " +
          bottomsDictionary[prop] +
          " " +
          this.translate("bottoms") +
          "\r\n";
      }

      for (let prop in shelfsDictionary) {
        strResult +=
          indentation +
          prop +
          " x " +
          shelfsDictionary[prop] +
          " " +
          this.translate("shelfs") +
          "\r\n";
      }

      for (let prop in doorsDictionary) {
        strResult +=
          indentation +
          prop +
          " x " +
          doorsDictionary[prop] +
          " " +
          this.translate("doors") +
          "\r\n";
      }

      for (let prop in backsDictionary) {
        strResult +=
          indentation +
          prop +
          " x " +
          backsDictionary[prop] +
          " " +
          this.translate("backs") +
          "\r\n";
      }

      if (this.$store.state.otherDetails.length) {
        strResult += "\r\n" + this.translate("otherDetails") + "\r\n";
        strResult +=
          this.translate("otherDetailsCount") +
          " " +
          this.$store.state.otherDetails.length +
          "\r\n\r\n";
      }

      let otherDetailsDictionary = {};
      /* other details */
      for (let detail of this.$store.state.otherDetails) {
        for (let i = 0; i < detail.count; i++) {
          let edge = "";
          if (detail.length.hasEdging && detail.height.hasEdging) {
            lightEdge += detail.length.hasDoubleEdging
              ? 2 * detail.length.value
              : detail.length.value;
            lightEdge += detail.height.hasDoubleEdging
              ? 2 * detail.height.value
              : detail.height.value;
            edge =
              detail.length.hasDoubleEdging && detail.height.hasDoubleEdging
                ? this.translate("doubleLongDoubleShort")
                : detail.length.hasDoubleEdging
                ? this.translate("longDoubleShort")
                : detail.height.hasDoubleEdging
                ? this.translate("doubleLongShort")
                : this.translate("longAndShortEdge");
          } else if (detail.length.hasEdging && !detail.height.hasEdging) {
            lightEdge += detail.length.hasDoubleEdging
              ? 2 * detail.length.value
              : detail.length.value;
            edge = detail.length.hasDoubleEdging
              ? this.translate("doubleShortEdge")
              : this.translate("shortEdge");
          } else if (!detail.length.hasEdging && detail.height.hasEdging) {
            lightEdge += detail.height.hasDoubleEdging
              ? 2 * detail.height.value
              : detail.height.value;
            edge = detail.height.hasDoubleEdging
              ? this.translate("doubleShortEdge")
              : this.translate("longEdge");
          }
          let currentDimension =
            edge +
            indentation +
            detail.height.value +
            "/" +
            detail.length.value +
            indentation +
            "%split%" +
            detail.title;
          if (!otherDetailsDictionary[currentDimension]) {
            otherDetailsDictionary[currentDimension] = 0;
          }

          otherDetailsDictionary[currentDimension] += 1;
          totalDetailsCount += 1;
        }
      }

      for (let prop in otherDetailsDictionary) {
        let dimension = prop.split("%split%")[0].trim();
        let title = prop.split("%split%")[1].trim();
        strResult +=
          indentation +
          dimension +
          " x " +
          otherDetailsDictionary[prop] +
          " " +
          this.translate("detail") +
          indentation +
          title +
          "\r\n";
      }

      if (boldEdge > 0 || lightEdge > 0) {
        strResult += "\r\n" + this.translate("edgesLength") + "\r\n";
      }

      if (boldEdge > 0) {
        strResult +=
          indentation + this.translate("thickEdge") + " " + boldEdge + "\r\n";
      }

      if (lightEdge > 0) {
        strResult += indentation + this.translate("thinEdge") + " " + lightEdge;
      }

      if (totalDetailsCount > 0) {
        strResult +=
          "\r\n\r\n" +
          indentation +
          this.translate("totalCountOfDetails") +
          " " +
          totalDetailsCount;
      }

      this.textToExport = strResult;
    }
  }
};
</script>

<style scoped>
.text-center {
  padding-top: 5rem;
}
.overlay-btn {
  padding-bottom: 1rem;
}
.project-info {
  position: absolute;
  width: 70%;
  top: 1rem;
}
#overlay {
  top: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  position: absolute;
  z-index: 7;
  background-color: rgb(33, 33, 33);
  opacity: 0.5;
}
#overlay-buttons {
  position: absolute;
  z-index: 8;
  top: 1rem;
  right: 1rem;
}
#overlay-text {
  position: absolute;
  z-index: 8;
  left: 10%;
  right: 10%;
  background-color: white;
  top: 5rem;
  text-align: left;
  font-weight: bold;
  padding: 1.5rem;
  overflow-y: scroll;
  max-height: 90%;
}
#project-title {
  z-index: 8;
  position: absolute;
  top: 0.5rem;
  bottom: 0;
  right: 25%;
  left: 25%;
  background: white;
  max-height: 4rem;
}
</style>
