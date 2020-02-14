export default {
  install(Vue) {
    let numberToWordArray = [
      "една",
      "две",
      "три",
      "четири",
      "пет",
      "шест",
      "седем",
      "осем",
      "девет",
      "десет"
    ];

    function getnumberWord(index) {
      return numberToWordArray[index];
    }

    Vue.prototype.$getnumberWord = getnumberWord;
  }
};
