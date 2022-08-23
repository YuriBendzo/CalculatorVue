import { createStore } from "vuex";

const store = createStore({
  state: {
    calculations: [
      { firstNumber: 0, operator: "+", secondNumber: 0, answer: 0 },
    ],
    calcHistory: [0],
  },
  getters: {
    lastAnswer: (state) => {
      return state.calculations[state.calculations.length - 1].answer;
    },
    calcHistory: (state) => {
      return state.calcHistory;
    },
  },
  mutations: {
    PUSH_TO_LOG(state, calculation) {
      state.calculations.push(calculation);
      state.calcHistory.push(calculation.answer);
      console.log(state.calcHistory);
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
        answer: answer,
      };

      console.log(calc);

      commit("PUSH_TO_LOG", calc);
    },
  },
});

export default store;
