<template>
  <div class="my-2">
    <div class="text-center">
      <v-btn color="primary" @click="showOverlayInfo">
        генерирай проект
      </v-btn>

      <div v-if="overlay" id="overlay"></div>
      <span v-if="overlay" id="overlay-text" v-html="generateHtmlText()"></span>
      <div v-if="overlay" id="overlay-buttons">
        <div class="overlay-btn">
          <v-btn @click="showOverlayInfo" color="error" id="close-button">
            затвори
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

export default {
  name: "SaveProject",
  components: {},
  data: () => ({
    overlay: false,
    textToExport: ""
  }),
  computed: {},
  methods: {
    showOverlayInfo() {
      this.overlay = !this.overlay;

      if (this.overlay) {
        this.generateData();
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
          saveAs(blob, "detailed_report.docx");
        });
      }
    },
    downloadPdfFile() {
      if (this.textToExport.length) {
        let pdf = new jsPDF();

        pdf.addFileToVFS("Roboto-Regular-normal.ttf", font);
        pdf.addFont("Roboto-Regular-normal.ttf", "Roboto-Regular", "normal");
        pdf.setFont("Roboto-Regular");
        pdf.text(this.textToExport, 10, 10);
        pdf.save("test.pdf");
      }
    },
    generateData() {
      let lowerShelf = this.$store.state.lowerShelf;
      let strResult = "";
      if (lowerShelf.cabinets.length) {
        strResult += "Долни шкафове\r\n";
        strResult +=
          "Брой долни шкафове " + lowerShelf.cabinets.length + "\r\n\r\n";
      }

      let indentation = "  ";

      let outerSidesDictionary = {};
      for (let outerSide of lowerShelf.outerSides) {
        let currentDimension =
          (outerSide.height > outerSide.depth ? "д" : "к") +
          indentation +
          outerSide.height +
          "/" +
          outerSide.depth;
        if (!outerSidesDictionary[currentDimension]) {
          outerSidesDictionary[currentDimension] = 0;
        }

        outerSidesDictionary[currentDimension] += 1;
      }

      for (let prop in outerSidesDictionary) {
        strResult +=
          indentation +
          prop +
          " X " +
          outerSidesDictionary[prop] +
          " външни страници\r\n";
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
          let currentDimension =
            (side.height > side.depth ? "д" : "к") +
            indentation +
            side.height +
            "/" +
            side.depth;
          if (!sidesDictionary[currentDimension]) {
            sidesDictionary[currentDimension] = 0;
          }

          sidesDictionary[currentDimension] += 1;
        }

        /* bottoms */
        let currentBottomDimension =
          (cabinet.bottom.width > cabinet.bottom.depth ? "д" : "к") +
          indentation +
          cabinet.bottom.width +
          "/" +
          cabinet.bottom.depth;
        if (!bottomsDictionary[currentBottomDimension]) {
          bottomsDictionary[currentBottomDimension] = 0;
        }

        bottomsDictionary[currentBottomDimension] += 1;

        /* upper holders */
        for (let holder of cabinet.upperHolders) {
          let currentDimension =
            (holder.width > holder.depth ? "д" : "к") +
            indentation +
            holder.width +
            "/" +
            holder.depth;
          if (!holdersDictionary[currentDimension]) {
            holdersDictionary[currentDimension] = 0;
          }

          holdersDictionary[currentDimension] += 1;
        }

        /* shelfs */
        for (let shelf of cabinet.shelfs) {
          let currentDimension =
            (shelf.width > shelf.depth ? "д" : "к") +
            indentation +
            shelf.width +
            "/" +
            shelf.depth;
          if (!shelfsDictionary[currentDimension]) {
            shelfsDictionary[currentDimension] = 0;
          }

          shelfsDictionary[currentDimension] += 1;
        }

        /* doors */
        for (let door of cabinet.doors) {
          let currentDimension =
            "к/д х 2" + indentation + door.height + "/" + door.width;
          if (!doorsDictionary[currentDimension]) {
            doorsDictionary[currentDimension] = 0;
          }

          doorsDictionary[currentDimension] += 1;
        }

        /* backs */
        let currentBackDimension =
          cabinet.back.height + "/" + cabinet.back.width;
        if (!backsDictionary[currentBackDimension]) {
          backsDictionary[currentBackDimension] = 0;
        }

        backsDictionary[currentBackDimension] += 1;
      }

      for (let prop in sidesDictionary) {
        strResult +=
          indentation + prop + " X " + sidesDictionary[prop] + " страници\r\n";
      }

      for (let prop in bottomsDictionary) {
        strResult +=
          indentation + prop + " X " + bottomsDictionary[prop] + " дъна\r\n";
      }

      for (let prop in holdersDictionary) {
        strResult +=
          indentation +
          prop +
          " X " +
          holdersDictionary[prop] +
          " подплотници\r\n";
      }

      for (let prop in shelfsDictionary) {
        strResult +=
          indentation + prop + " X " + shelfsDictionary[prop] + " рафтове\r\n";
      }

      for (let prop in doorsDictionary) {
        strResult +=
          indentation + prop + " X " + doorsDictionary[prop] + " врати\r\n";
      }

      for (let prop in backsDictionary) {
        strResult +=
          indentation + prop + " X " + backsDictionary[prop] + " гръб\r\n";
      }

      let upperShelf = this.$store.state.upperShelf;
      if (upperShelf.cabinets.length || upperShelf.outerSides.length) {
        strResult += "\r\nГорни шкафове\r\n";
        strResult +=
          "Брой горни шкафове " + upperShelf.cabinets.length + "\r\n\r\n";
      }

      outerSidesDictionary = {};
      for (let outerSide of upperShelf.outerSides) {
        let currentDimension =
          "д/к" + indentation + outerSide.height + "/" + outerSide.depth;
        if (!outerSidesDictionary[currentDimension]) {
          outerSidesDictionary[currentDimension] = 0;
        }

        outerSidesDictionary[currentDimension] += 1;
      }

      for (let prop in outerSidesDictionary) {
        strResult +=
          indentation +
          prop +
          " X " +
          outerSidesDictionary[prop] +
          " външни страници\r\n";
      }

      sidesDictionary = {};
      bottomsDictionary = {};
      shelfsDictionary = {};
      doorsDictionary = {};
      backsDictionary = {};

      for (let cabinet of upperShelf.cabinets) {
        /* sides */
        for (let side of cabinet.sides) {
          let currentDimension =
            (side.height > side.depth ? "д" : "к") +
            indentation +
            side.height +
            "/" +
            side.depth;
          if (!sidesDictionary[currentDimension]) {
            sidesDictionary[currentDimension] = 0;
          }

          sidesDictionary[currentDimension] += 1;
        }

        /* bottoms */
        let currentBottomDimension =
          (cabinet.bottom.width > cabinet.bottom.depth ? "д" : "к") +
          indentation +
          cabinet.bottom.width +
          "/" +
          cabinet.bottom.depth;
        if (!bottomsDictionary[currentBottomDimension]) {
          bottomsDictionary[currentBottomDimension] = 0;
        }

        bottomsDictionary[currentBottomDimension] += 1;

        /* ceils */
        let currentCeilDimension =
          (cabinet.ceil.width > cabinet.ceil.depth ? "д" : "к") +
          indentation +
          cabinet.ceil.width +
          "/" +
          cabinet.ceil.depth;
        if (!bottomsDictionary[currentCeilDimension]) {
          bottomsDictionary[currentCeilDimension] = 0;
        }

        bottomsDictionary[currentCeilDimension] += 1;

        /* shelfs */
        for (let shelf of cabinet.shelfs) {
          let currentDimension =
            (shelf.width > shelf.depth ? "д" : "к") +
            indentation +
            shelf.width +
            "/" +
            shelf.depth;
          if (!shelfsDictionary[currentDimension]) {
            shelfsDictionary[currentDimension] = 0;
          }

          shelfsDictionary[currentDimension] += 1;
        }

        /* doors */
        for (let door of cabinet.doors) {
          let currentDimension =
            "к/д х 2" + indentation + door.height + "/" + door.width;
          if (!doorsDictionary[currentDimension]) {
            doorsDictionary[currentDimension] = 0;
          }

          doorsDictionary[currentDimension] += 1;
        }

        /* backs */
        let currentBackDimension =
          cabinet.back.height + "/" + cabinet.back.width;
        if (!backsDictionary[currentBackDimension]) {
          backsDictionary[currentBackDimension] = 0;
        }

        backsDictionary[currentBackDimension] += 1;
      }

      for (let prop in sidesDictionary) {
        strResult +=
          indentation + prop + " X " + sidesDictionary[prop] + " страници\r\n";
      }

      for (let prop in bottomsDictionary) {
        strResult +=
          indentation + prop + " X " + bottomsDictionary[prop] + " дъна\r\n";
      }

      for (let prop in shelfsDictionary) {
        strResult +=
          indentation + prop + " X " + shelfsDictionary[prop] + " рафтове\r\n";
      }

      for (let prop in doorsDictionary) {
        strResult +=
          indentation + prop + " X " + doorsDictionary[prop] + " врати\r\n";
      }

      for (let prop in backsDictionary) {
        strResult +=
          indentation + prop + " X " + backsDictionary[prop] + " гръб\r\n";
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
}
</style>
