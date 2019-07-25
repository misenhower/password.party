<template>
  <input
    class="slider"
    type="range"
    :min="min"
    :max="max"
    :step="step"
    :value="value"
    :style="style"
    @input="$emit('input', $event.target.value)"
    />
</template>

<script>
export default {
  props: {
    value: null,
    min: { type: Number, default: 0 },
    max: { type: Number, default: 100 },
    step: { type: Number, default: 1 },
  },
  computed: {
    low() {
      return '0%';
    },
    high() {
      return (this.value - this.min) / (this.max - this.min) * 100 + '%';
    },
    style() {
      return {
        '--low': this.low,
        '--high': this.high,
      };
    },
  },
}
</script>
