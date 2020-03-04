export default {
  install(Vue) {
    function getCabinet(cabinet) {
      let cabinetToAdd = {
        outerWidth: parseInt(cabinet.outerWidth),
        innerWidth: parseInt(cabinet.innerWidth),
        height: parseInt(cabinet.height),
        depth: parseInt(cabinet.depth),
        showCabinetElements: cabinet.showCabinetElements,
        bottom: {
          width: parseInt(cabinet.bottom.width),
          height: parseInt(cabinet.bottom.height),
          depth: parseInt(cabinet.bottom.depth)
        },
        back: {
          width: parseInt(cabinet.back.width),
          height: parseInt(cabinet.back.height)
        },
        sides: [],
        shelfs: [],
        doors: []
      };
      /* add sides of cabinet */
      for (let side of cabinet.sides) {
        let currentSide = {
          width: parseInt(side.width),
          height: parseInt(side.height),
          depth: parseInt(side.depth)
        };

        cabinetToAdd.sides.push(currentSide);
      }

      /* add shelfs of cabinet */
      for (let shelf of cabinet.shelfs) {
        let currentShelf = {
          width: parseInt(shelf.width),
          height: parseInt(shelf.height),
          depth: parseInt(shelf.depth)
        };

        cabinetToAdd.shelfs.push(currentShelf);
      }

      /* add doors of cabinet */
      for (let door of cabinet.doors) {
        let currentDoor = {
          width: parseInt(door.width),
          height: parseInt(door.height),
          depth: parseInt(door.depth)
        };

        cabinetToAdd.doors.push(currentDoor);
      }

      cabinetToAdd.isValid = cabinet.isValid;
      cabinetToAdd.isEdited = cabinet.isEdited;

      if (cabinet.ceil) {
        cabinetToAdd.ceil = {
          width: parseInt(cabinet.bottom.width),
          height: parseInt(cabinet.bottom.height),
          depth: parseInt(cabinet.bottom.depth)
        };
      }

      if (cabinet.upperHolders) {
        cabinetToAdd.upperHolders = [];
        /* add upper holders of cabinet */
        for (let holder of cabinet.upperHolders) {
          let currentHolder = {
            width: parseInt(holder.width),
            height: parseInt(holder.height),
            depth: parseInt(holder.depth)
          };

          cabinetToAdd.upperHolders.push(currentHolder);
        }
      }

      return cabinetToAdd;
    }

    Vue.prototype.$getCabinetInstance = getCabinet;
  }
};
