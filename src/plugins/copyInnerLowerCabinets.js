export default {
  install(Vue) {
    function getCabinet(cabinet) {
      let cabinetToAdd = {
        outerWidth: parseInt(cabinet.outerWidth),
        height: parseInt(cabinet.height),
        depth: parseInt(cabinet.depth),
        bottom: {
          width: parseInt(cabinet.bottom.width),
          height: parseInt(cabinet.bottom.height),
          depth: parseInt(cabinet.bottom.depth)
        },
        sides: [],
        upperHolders: []
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
      /* add upper holders of cabinet */
      for (let holder of cabinet.upperHolders) {
        let currentHolder = {
          width: parseInt(holder.width),
          height: parseInt(holder.height),
          depth: parseInt(holder.depth)
        };

        cabinetToAdd.upperHolders.push(currentHolder);
      }
      return cabinetToAdd;
    }

    Vue.prototype.$getCabinetInstance = getCabinet;
  }
};
