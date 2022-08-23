<template>
  <div class="container">
    <div class="calculator__container">
      <p class="display">{{ this.displayValue }}</p>
      <div class="button__grid">
        <!-- first row -->
        <button
          class="calculator__btn function-button"
          @click="this.clearCalculator"
        >
          C
        </button>
        <button
          class="calculator__btn function-button"
          @click="this.useLastAnswer"
        >
          undo
        </button>
        <button class="calculator__btn function-button" @click="backspace">
          back
        </button>
        <button
          class="calculator__btn operation-button"
          :class="{ 'operation-button-selected': operator === '+' }"
          @click="applyOperator('+')"
        >
          +
        </button>
        <!-- second row -->
        <button class="calculator__btn" @click="this.appendToDisplay('1')">
          1
        </button>
        <button class="calculator__btn" @click="this.appendToDisplay('2')">
          2
        </button>
        <button class="calculator__btn" @click="this.appendToDisplay('3')">
          3
        </button>
        <button
          class="calculator__btn operation-button"
          :class="{ 'operation-button-selected': operator === '-' }"
          @click="applyOperator('-')"
        >
          -
        </button>
        <!-- third row -->
        <button class="calculator__btn" @click="this.appendToDisplay('4')">
          4
        </button>
        <button class="calculator__btn" @click="this.appendToDisplay('5')">
          5
        </button>
        <button class="calculator__btn" @click="this.appendToDisplay('6')">
          6
        </button>
        <button
          class="calculator__btn operation-button"
          :class="{ 'operation-button-selected': operator === 'x' }"
          @click="applyOperator('x')"
        >
          *
        </button>
        <!-- fourth row -->
        <button class="calculator__btn" @click="this.appendToDisplay('7')">
          7
        </button>
        <button class="calculator__btn" @click="this.appendToDisplay('8')">
          8
        </button>
        <button class="calculator__btn" @click="this.appendToDisplay('9')">
          9
        </button>
        <button
          class="calculator__btn operation-button"
          :class="{ 'operation-button-selected': operator === '/' }"
          @click="applyOperator('/')"
        >
          /
        </button>
        <!-- fifth row -->
        <button class="calculator__btn" @click="this.invertDisplayValue">
          +/-
        </button>
        <button class="calculator__btn" @click="this.appendToDisplay('0')">
          0
        </button>
        <button class="calculator__btn" @click="this.appendToDisplay('.')">
          ,
        </button>
        <button
          class="calculator__btn operation-button"
          @click="this.equalsButton"
        >
          =
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "CalculatorComp",
  data() {
    return {
      displayValue: 0,
      operator: null,
      firstNumber: 0,
      secondNumber: 0,
      clearDisplayNext: false,
    };
  },
  computed: {
    ...mapGetters(["calcHistory"]),

    calculations() {
      return this.$store.state.calculations;
    },
    lastAnswer() {
      return this.$store.getters.lastAnswer;
    },
  },
  methods: {
    appendToDisplay(char) {
      if (this.clearDisplayNext) {
        this.clearDisplay();
      }

      if (char == "." && this.displayValue.includes(".")) {
        return;
      }

      if (this.displayValue == "0" && char != ".") {
        this.displayValue = char;
      } else {
        this.displayValue += char;
      }
    },
    backspace() {
      if (this.clearDisplayNext) {
        this.clearDisplay();
      }

      this.displayValue = (this.displayValue + "").slice(0, -1);

      if ((this.displayValue + "").length === 0 || this.displayValue == "-") {
        this.clearDisplay();
      }
    },
    clearDisplay() {
      this.displayValue = 0;
      this.clearDisplayNext = false;
    },
    clearCalculator() {
      this.clearDisplay();
      this.clearCalculation();
    },
    clearCalculation() {
      this.operator = null;
      this.firstNumber = 0;
      this.secondNumber = 0;
    },
    invertDisplayValue() {
      if (this.clearDisplayNext) {
        this.clearDisplay();
      }

      if (this.displayValue.startsWith("-")) {
        this.displayValue = this.displayValue.slice(
          1,
          this.displayValue.length
        );
      } else {
        this.displayValue = "-" + this.displayValue;
      }
    },
    applyOperator(operator) {
      const operatorExist = this.operator !== null;
      const currentNumber = parseFloat(this.displayValue);

      if (!operatorExist) {
        this.clearDisplay();
        this.firstNumber = currentNumber;
        this.operator = operator;
      } else {
        this.secondNumber = currentNumber;
        this.calculate();
        this.firstNumber = this.lastAnswer;
        this.operator = operator;
        this.clearDisplayNext = true;
      }
    },
    equalsButton() {
      this.secondNumber = parseFloat(this.displayValue);
      this.calculate();
      this.clearCalculation();
      this.clearDisplayNext = true;
    },
    calculate() {
      this.$store
        .dispatch("calculate", {
          firstNumber: this.firstNumber,
          secondNumber: this.secondNumber,
          operator: this.operator,
        })
        .then(() => {
          this.displayValue = this.lastAnswer;
        })
        .catch((error) => {
          this.displayValue = error;
          this.clearDisplayNext = true;
        });
    },
    useLastAnswer() {
      console.log(this.calcHistory);
      this.displayValue = this.calcHistory.slice(-1);
    },
  },
};
</script>

<style lang="scss" scoped>
.calculator {
  &__container {
    padding: 8px;
    margin: auto;
    width: 340px;
  }
  &__btn {
    height: 75px;
    background-color: #34495e;
    border: none;
    color: #fff;
    font-family: Avenir, Helvetica, Arial, sans-serif;
    font-size: 18px;
    -webkit-font-smoothing: antialiased;
    border-radius: 100%;
    margin: 5px;
    font-weight: bold;
    &:hover {
      filter: brightness(85%);
      cursor: pointer;
    }
    &:active {
      filter: brightness(55%);
      cursor: pointer;
    }
  }
}
.display {
  resize: none;
  border: none;
  text-align: right;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  font-size: 48px;
  margin: 16px 16px 10px 10px;
  max-width: 100%;
  overflow-x: scroll;
}
.display::-webkit-scrollbar {
  display: none;
}
.button__grid {
  display: grid;
  grid-template-columns: 25% 25% 25% 25%;
}
.operation-button {
  background-color: #43b985;
  font-size: 24px;
  &-selected {
    background-color: #73d9ab;
    font-size: 24px;
  }
}
.function-button {
  background-color: #4acc93;
  font-weight: normal;
}
</style>
