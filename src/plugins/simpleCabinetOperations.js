export default {
  install(Vue) {
    function addDoor(cabinet) {
      let numberOfDoors = cabinet.doors.length + 1;
      let availableWidth = Math.round(
        parseInt(cabinet.outerWidth) / numberOfDoors
      );

      const diff = this.$store.state.cabinetDoorDiff;
      for (let door of cabinet.doors) {
        door.width = availableWidth - diff;
      }

      let doorToAdd = {
        width: availableWidth - diff,
        height: cabinet.height - diff,
        depth: this.$store.state.staticOuterSideWidth,
      };

      cabinet.doors.push(doorToAdd);
    }

    function removeDoor(cabinet) {
      cabinet.doors.splice(cabinet.doors.length - 1, 1);
      if (cabinet.doors.length > 0) {
        const diff = 7;
        let availableWidth = Math.round(
          parseInt(cabinet.outerWidth) / cabinet.doors.length
        );
        for (let door of cabinet.doors) {
          door.width = availableWidth - diff;
        }
      }
    }

    function addDivider(cabinet) {
      let dividerToAdd = {
        width: this.$store.state.staticOuterSideWidth,
        height:
          parseInt(cabinet.height) - 2 * this.$store.state.staticOuterSideWidth,
        depth: parseInt(cabinet.depth),
      };
      cabinet.dividers.push(dividerToAdd);

      let shelfWidth =
        cabinet.innerWidth -
        cabinet.dividers.length * this.$store.state.staticOuterSideWidth;
      shelfWidth = Math.floor(shelfWidth / (cabinet.dividers.length + 1));

      for (let shelf of cabinet.shelfs) {
        shelf.width = shelfWidth;
      }
    }

    function removeDivider(cabinet) {
      if (cabinet.dividers.length > 0) {
        cabinet.dividers.splice(cabinet.dividers.length - 1, 1);
      }

      let shelfWidth =
        cabinet.innerWidth -
        cabinet.dividers.length * this.$store.state.staticOuterSideWidth;
      shelfWidth = Math.floor(shelfWidth / (cabinet.dividers.length + 1));

      for (let shelf of cabinet.shelfs) {
        shelf.width = shelfWidth;
      }
    }

    function addShelf(cabinet) {
      let shelfWidth =
        parseInt(cabinet.innerWidth) -
        cabinet.dividers.length * this.$store.state.staticOuterSideWidth;
      shelfWidth = Math.floor(shelfWidth / (cabinet.dividers.length + 1));

      let shelfToAdd = {
        width: shelfWidth,
        height: this.$store.state.staticOuterSideWidth,
        depth: parseInt(cabinet.depth),
      };
      cabinet.shelfs.push(shelfToAdd);
    }

    function removeShelf(cabinet) {
      if (cabinet.shelfs.length > 0) {
        cabinet.shelfs.splice(cabinet.shelfs.length - 1, 1);
      }
    }

    Vue.prototype.$addDoor = addDoor;
    Vue.prototype.$removeDoor = removeDoor;
    Vue.prototype.$addDivider = addDivider;
    Vue.prototype.$removeDivider = removeDivider;
    Vue.prototype.$addShelf = addShelf;
    Vue.prototype.$removeShelf = removeShelf;
  },
};
