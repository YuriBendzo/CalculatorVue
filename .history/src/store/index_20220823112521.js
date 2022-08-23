import { push } from "core-js/core/array";
import { createStore } from "vuex";

const store = createStore({
  state: {
    calculations: [
      { firstNumber: 0, operator: "+", secondNumber: 0, answer: [] },
    ],
  },
  getters: {
    lastAnswer: (state) => {
      console.log(state.calculations.answer);
      return state.calculations[state.calculations.length - 1].answer;
    },
  },
  mutations: {
    PUSH_TO_LOG(state, calculation) {
      state.calculations.push(calculation);
    },
  },
  actions: {
    calculate({ commit }, { firstNumber, operator, secondNumber }) {
      if (operator === null) {
        operator = "+";
      }

      let answer;
      switch (operator) {
        case "+":
          answer = firstNumber + secondNumber;
          break;
        case "-":
          answer = firstNumber - secondNumber;
          break;
        case "x":
          answer = firstNumber * secondNumber;
          break;
        case "/":
          answer = firstNumber / secondNumber;
          break;
      }

      if (answer !== 0 && !parseFloat(answer)) {
        console.log("Unable to calculate...");
        return Promise.reject(new Error("Not a number"));
      }

      const calc = {
        firstNumber: firstNumber,
        operator: operator,
        secondNumber: secondNumber,
        answer: push(answer),
      };

      console.log(calc);

      commit("PUSH_TO_LOG", calc);
    },
  },
});

export default store;
