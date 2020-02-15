export default {
    install(Vue) {  
      function validationRules(objToTest) {
          console.log(objToTest);
        return [
            v => !!v || "Тази стойност е задължителна",
            v => !isNaN(v) || "Стойността трябва да бъде число",
            v => v > 0 || "Стойността трябва да по-голяма от 0",
            v =>
              Number.isInteger(Number(v)) ||
              "Стойността трябва да бъде целочислено число"
          ];
      }
  
      Vue.prototype.$getnumberValidationRules = validationRules;
    }
  };