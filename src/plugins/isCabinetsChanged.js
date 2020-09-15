export default {
  install(Vue) {
    function changedCabinets(cabinets, storeCabinets, isUpperRow) {
      if (cabinets.length != storeCabinets.length) {
        return true;
      }

      for (let i = 0; i < storeCabinets.length; i++) {
        let currentCabinet = cabinets[i];
        let storeCabinet = storeCabinets[i];
        if (
          currentCabinet.outerWidth != storeCabinet.outerWidth ||
          currentCabinet.height != storeCabinet.height ||
          currentCabinet.depth != storeCabinet.depth
        ) {
          return true;
        }

        if (
          currentCabinet.bottom.height != storeCabinet.bottom.height ||
          currentCabinet.bottom.width != storeCabinet.bottom.width ||
          currentCabinet.bottom.depth != storeCabinet.bottom.depth
        ) {
          return true;
        }

        if (
          currentCabinet.back.height != storeCabinet.back.height ||
          currentCabinet.back.width != storeCabinet.back.width
        ) {
          return true;
        }

        if (currentCabinet.doors.length != storeCabinet.doors.length) {
          return true;
        }

        for (
          let doorIndex = 0;
          doorIndex < currentCabinet.doors.length;
          doorIndex++
        ) {
          let currentDoor = currentCabinet.doors[doorIndex];
          let storeDoor = storeCabinet.doors[doorIndex];
          if (
            currentDoor.depth != storeDoor.depth ||
            currentDoor.width != storeDoor.width ||
            currentDoor.height != storeDoor.height
          ) {
            return true;
          }
        }

        if (currentCabinet.shelfs.length != storeCabinet.shelfs.length) {
          return true;
        }

        for (
          let shelfIndex = 0;
          shelfIndex < currentCabinet.shelfs.length;
          shelfIndex++
        ) {
          let currentShelf = currentCabinet.shelfs[shelfIndex];
          let storeShelf = storeCabinet.shelfs[shelfIndex];
          if (
            currentShelf.depth != storeShelf.depth ||
            currentShelf.width != storeShelf.width ||
            currentShelf.height != storeShelf.height
          ) {
            return true;
          }
        }

        if (currentCabinet.dividers.length != storeCabinet.dividers.length) {
          return true;
        }

        for (
          let dividerIndex = 0;
          dividerIndex < currentCabinet.dividers.length;
          dividerIndex++
        ) {
          let currentDivider = currentCabinet.dividers[dividerIndex];
          let storeDivider = storeCabinet.dividers[dividerIndex];
          if (
            currentDivider.depth != storeDivider.depth ||
            currentDivider.width != storeDivider.width ||
            currentDivider.height != storeDivider.height
          ) {
            return true;
          }
        }

        for (
          let sideIndex = 0;
          sideIndex < currentCabinet.sides.length;
          sideIndex++
        ) {
          let currentSide = currentCabinet.sides[sideIndex];
          let storeSide = storeCabinet.sides[sideIndex];
          if (
            currentSide.depth != storeSide.depth ||
            currentSide.width != storeSide.width ||
            currentSide.height != storeSide.height
          ) {
            return true;
          }
        }

        if (!isUpperRow) {
          for (
            let holderIndex = 0;
            holderIndex < currentCabinet.upperHolders.length;
            holderIndex++
          ) {
            let currentHolder = currentCabinet.upperHolders[holderIndex];
            let storeHolder = storeCabinet.upperHolders[holderIndex];
            if (
              currentHolder.depth != storeHolder.depth ||
              currentHolder.width != storeHolder.width ||
              currentHolder.height != storeHolder.height
            ) {
              return true;
            }
          }
        }

        if (isUpperRow) {
          let currentCeil = currentCabinet.ceil;
          let storeCeil = storeCabinet.ceil;
          if (
            currentCeil.depth != storeCeil.depth ||
            currentCeil.width != storeCeil.width ||
            currentCeil.height != storeCeil.height
          ) {
            return true;
          }
        }
      }

      return false;
    }

    Vue.prototype.$isCabinetsChanged = changedCabinets;
  }
};
