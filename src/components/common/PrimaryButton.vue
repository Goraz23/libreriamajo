<template>
    <button
      :class="buttonClasses"
      @click="$emit('click')"
    >
      <slot></slot>
    </button>
  </template>
  
  <script lang="ts">
  export default {
    name: 'PrimaryButton',
    props: {
      type: {
        type: String,
        default: 'button'
      },
      color: {
        type: String,
        default: 'bg-blue-500' // Color predeterminado
      }
    },
    computed: {
      buttonClasses(): string {
        return `px-4 py-2 rounded text-white ${this.color} hover:opacity-80 focus:outline-none`;
      }
    }
  }
  </script>
  