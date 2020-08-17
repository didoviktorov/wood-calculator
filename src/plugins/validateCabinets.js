export default {
  install(Vue) {
    function validate(cabinets) {
      for (let cabinet of cabinets) {
        let value = parseInt(cabinet.outerWidth);
        if (value == 0 || isNaN(value)) {
          return false;
        }
      }
      return true;
    }

    function checkIsCabinetValid(cabinet) {
      let isValid = true;
      for (let key in cabinet) {
        let currentValue = cabinet[key];
        if (typeof currentValue === "boolean") {
          continue;
        }

        if (Array.isArray(currentValue)) {
          for (let arrObj of currentValue) {
            for (let arrObjKey in arrObj) {
              let arrObjValue = parseInt(arrObj[arrObjKey]);
              if (arrObjValue == 0 || isNaN(arrObjValue) || arrObjValue < 0) {
                isValid = false;
                return isValid;
              }
            }
          }

          continue;
        }

        if (typeof currentValue === "object" && currentValue !== null) {
          for (let objKey in currentValue) {
            let objValue = parseInt(currentValue[objKey]);
            if (objValue == 0 || isNaN(objValue) || objValue < 0) {
              isValid = false;
              return isValid;
            }
          }

          continue;
        }

        let value = parseInt(currentValue);
        if (value == 0 || isNaN(value) || value < 0) {
          isValid = false;
          return isValid;
        }
      }

      return isValid;
    }

    Vue.prototype.$validateCabinets = validate;
    Vue.prototype.$checkIsCabinetValid = checkIsCabinetValid;
  },
};
