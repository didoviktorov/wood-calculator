<template>
  <div class="my-2">
    <v-btn color="primary" @click="generateData">запази проект</v-btn>
  </div>
</template>

<script>
export default {
  name: "SaveProject",
  components: {},
  data: () => ({}),
  computed: {},
  methods: {
    saveCurrentProject() {
      let filePath = "././assets/projects.json";
      let data = JSON.stringify(this.$store.state);
      let blob = new Blob([data], { type: "text/plain;charset=utf-8;" });

      if (navigator.msSaveBlob) {
        // IE 10+
        navigator.msSaveBlob(blob, filePath);
      } else {
        let link = document.createElement("a");
        if (link.download !== undefined) {
          // feature detection
          // Browsers that support HTML5 download attribute
          let url = URL.createObjectURL(blob);
          link.setAttribute("href", url);
          link.setAttribute("download", filePath);
          link.style.visibility = "hidden";
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        }
      }
    },
    generateData() {
      let lowerShelf = this.$store.state.lowerShelf;
      let strResult = "";
      if (lowerShelf.cabinets.length) {
        strResult += "Долни шкафове\r\n";
        strResult +=
          "Брой долни шкафове " + lowerShelf.cabinets.length + "\r\n";
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
          let currentDimension = side.depth + "/" + side.height;
          if (!sidesDictionary[currentDimension]) {
            sidesDictionary[currentDimension] = 0;
          }

          sidesDictionary[currentDimension] += 1;
        }

        /* bottoms */
        let currentBottomDimension =
          cabinet.bottom.width + "/" + cabinet.bottom.depth;
        if (!bottomsDictionary[currentBottomDimension]) {
          bottomsDictionary[currentBottomDimension] = 0;
        }

        bottomsDictionary[currentBottomDimension] += 1;

        /* upper holders */
        for (let holder of cabinet.upperHolders) {
          let currentDimension = holder.width + "/" + holder.depth;
          if (!holdersDictionary[currentDimension]) {
            holdersDictionary[currentDimension] = 0;
          }

          holdersDictionary[currentDimension] += 1;
        }

        /* shelfs */
        for (let shelf of cabinet.shelfs) {
          let currentDimension = shelf.width + "/" + shelf.depth;
          if (!shelfsDictionary[currentDimension]) {
            shelfsDictionary[currentDimension] = 0;
          }

          shelfsDictionary[currentDimension] += 1;
        }

        /* doors */
        for (let door of cabinet.doors) {
          let currentDimension = door.width + "/" + door.height;
          if (!doorsDictionary[currentDimension]) {
            doorsDictionary[currentDimension] = 0;
          }

          doorsDictionary[currentDimension] += 1;
        }

        /* backs */
        let currentBackDimension =
          cabinet.back.width + "/" + cabinet.back.height;
        if (!backsDictionary[currentBackDimension]) {
          backsDictionary[currentBackDimension] = 0;
        }

        backsDictionary[currentBackDimension] += 1;
      }

      let indentation = "  ";
      for (let prop in sidesDictionary) {
        strResult +=
          indentation + sidesDictionary[prop] + " X " + prop + " страници\r\n";
      }

      for (let prop in bottomsDictionary) {
        strResult +=
          indentation + bottomsDictionary[prop] + " X " + prop + " дъна\r\n";
      }

      for (let prop in holdersDictionary) {
        strResult +=
          indentation +
          holdersDictionary[prop] +
          " X " +
          prop +
          " подплотници\r\n";
      }

      for (let prop in shelfsDictionary) {
        strResult +=
          indentation + shelfsDictionary[prop] + " X " + prop + " рафтове\r\n";
      }

      for (let prop in doorsDictionary) {
        strResult +=
          indentation + doorsDictionary[prop] + " X " + prop + " врати\r\n";
      }

      for (let prop in backsDictionary) {
        strResult +=
          indentation + backsDictionary[prop] + " X " + prop + " гръб\r\n";
      }

      let upperShelf = this.$store.state.upperShelf;
      if (upperShelf.cabinets.length) {
        strResult += "\r\nГорни шкафове\r\n";
        strResult +=
          "Брой горни шкафове " + upperShelf.cabinets.length + "\r\n";
      }

      let ceilsDictionary = {};
      sidesDictionary = {};
      bottomsDictionary = {};
      shelfsDictionary = {};
      doorsDictionary = {};
      backsDictionary = {};

      for (let cabinet of upperShelf.cabinets) {
        /* sides */
        for (let side of cabinet.sides) {
          let currentDimension = side.depth + "/" + side.height;
          if (!sidesDictionary[currentDimension]) {
            sidesDictionary[currentDimension] = 0;
          }

          sidesDictionary[currentDimension] += 1;
        }

        /* bottoms */
        let currentBottomDimension =
          cabinet.bottom.width + "/" + cabinet.bottom.depth;
        if (!bottomsDictionary[currentBottomDimension]) {
          bottomsDictionary[currentBottomDimension] = 0;
        }

        bottomsDictionary[currentBottomDimension] += 1;

        /* ceils */
        let currentCeilDimension =
          cabinet.ceil.width + "/" + cabinet.ceil.depth;
        if (!ceilsDictionary[currentCeilDimension]) {
          ceilsDictionary[currentCeilDimension] = 0;
        }

        ceilsDictionary[currentCeilDimension] += 1;

        /* shelfs */
        for (let shelf of cabinet.shelfs) {
          let currentDimension = shelf.width + "/" + shelf.depth;
          if (!shelfsDictionary[currentDimension]) {
            shelfsDictionary[currentDimension] = 0;
          }

          shelfsDictionary[currentDimension] += 1;
        }

        /* doors */
        for (let door of cabinet.doors) {
          let currentDimension = door.width + "/" + door.height;
          if (!doorsDictionary[currentDimension]) {
            doorsDictionary[currentDimension] = 0;
          }

          doorsDictionary[currentDimension] += 1;
        }

        /* backs */
        let currentBackDimension =
          cabinet.back.width + "/" + cabinet.back.height;
        if (!backsDictionary[currentBackDimension]) {
          backsDictionary[currentBackDimension] = 0;
        }

        backsDictionary[currentBackDimension] += 1;
      }

      for (let prop in sidesDictionary) {
        strResult +=
          indentation + sidesDictionary[prop] + " X " + prop + " страници\r\n";
      }

      for (let prop in bottomsDictionary) {
        strResult +=
          indentation + bottomsDictionary[prop] + " X " + prop + " дъна\r\n";
      }

      for (let prop in ceilsDictionary) {
        strResult +=
          indentation +
          ceilsDictionary[prop] +
          " X " +
          prop +
          " горни страни\r\n";
      }

      for (let prop in shelfsDictionary) {
        strResult +=
          indentation + shelfsDictionary[prop] + " X " + prop + " рафтове\r\n";
      }

      for (let prop in doorsDictionary) {
        strResult +=
          indentation + doorsDictionary[prop] + " X " + prop + " врати\r\n";
      }

      for (let prop in backsDictionary) {
        strResult +=
          indentation + backsDictionary[prop] + " X " + prop + " гръб\r\n";
      }

      console.log(strResult);
    }
  }
};
</script>

<style scoped></style>
