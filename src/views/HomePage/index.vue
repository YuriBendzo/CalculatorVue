<template>
  <div>
    <h1>Calculator</h1>
    <calculator-comp />
  </div>
</template>

<script>
import CalculatorComp from "@/components/CalculatorComp.vue";
export default {
  name: "HomePage",
  components: {
    CalculatorComp,
  },
};
</script>

<style lang="scss" scoped></style>
