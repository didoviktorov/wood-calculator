export default {
  install(Vue) {
    function translate(literal) {
      return this.$store.state.languages.languages[
        this.$store.state.selectedLang
      ][literal];
    }

    function getCabinetProps(cabinet) {
      let propsObject = JSON.parse(JSON.stringify(cabinet));
      delete propsObject.showCabinetElements;
      delete propsObject.isEdited;
      delete propsObject.isValid;
      delete propsObject.innerWidth;

      return propsObject;
    }

    function isValidNumber(number) {
      let isValid = true;
      for (let func of this.$getnumberValidationRules()) {
        if (typeof func(number) == "string") {
          return false;
        }
      }

      return isValid;
    }

    function changeWidthCabinet(cabinet, isLowerCabinet) {
      let newWidth = Number(cabinet.outerWidth);
      if (this.$isValidNumber(newWidth)) {
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
            width: isLowerCabinet
              ? newWidth
              : newWidth - this.$store.state.staticOuterSideWidth * 2,
            height: cabinet.bottom.height,
            depth: cabinet.bottom.depth,
          },
          back: {
            width: newWidth - this.$store.state.cabinetBackDiff,
            height: cabinet.back.height,
          },
          sides: cabinet.sides,
          shelfs: [],
          doors: [],
          dividers: cabinet.dividers,
        };

        if (!isLowerCabinet) {
          cabinetToChange.ceil = {
            width: newWidth - this.$store.state.staticOuterSideWidth * 2,
            height: this.$store.state.staticOuterSideWidth,
            depth: this.$store.state.upperShelf.depth,
          };
        } else {
          cabinetToChange.upperHolders = [
            {
              width: newInnerWidth,
              height: this.$store.state.staticOuterSideWidth,
              depth: this.$store.state.standardFeetHeightOfCabinet,
            },
            {
              width: newInnerWidth,
              height: this.$store.state.staticOuterSideWidth,
              depth: this.$store.state.standardFeetHeightOfCabinet,
            },
          ];
        }

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

        return cabinetToChange;
      }
    }

    function changeHeightCabinet(cabinet, isLowerCabinet) {
      let newHeight = Number(cabinet.height);
      if (this.$isValidNumber(newHeight)) {
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
          back: {
            width: cabinet.back.width,
            height: newHeight - this.$store.state.cabinetBackDiff,
          },
          sides: [],
          shelfs: cabinet.shelfs,
          doors: [],
          dividers: [],
        };

        if (!isLowerCabinet) {
          cabinetToChange.ceil = cabinet.ceil;
        } else {
          cabinetToChange.upperHolders = cabinet.upperHolders;
        }

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
            height: isLowerCabinet
              ? newHeight - this.$store.state.staticOuterSideWidth
              : newHeight,
            depth: isLowerCabinet
              ? this.$store.state.lowerShelf.depth
              : this.$store.state.upperShelf.depth,
          };

          cabinetToChange.sides.push(newSide);
        }

        return cabinetToChange;
      }
    }

    function changeDepthCabinet(cabinet, isLowerCabinet) {
      let newDepth = Number(cabinet.depth);
      if (this.$isValidNumber(newDepth)) {
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

          shelfs: [],
          dividers: [],
          doors: cabinet.doors,
        };

        if (!isLowerCabinet) {
          cabinetToChange.ceil = {
            width: cabinet.ceil.width,
            height: this.$store.state.staticOuterSideWidth,
            depth: newDepth,
          };
        } else {
          cabinetToChange.upperHolders = cabinet.upperHolders;
        }

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

        return cabinetToChange;
      }
    }

    Vue.prototype.$translate = translate;
    Vue.prototype.$getCabinetProps = getCabinetProps;
    Vue.prototype.$isValidNumber = isValidNumber;
    Vue.prototype.$changeWidthCabinet = changeWidthCabinet;
    Vue.prototype.$changeHeightCabinet = changeHeightCabinet;
    Vue.prototype.$changeDepthCabinet = changeDepthCabinet;
  },
};
