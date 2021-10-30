import { createApp } from 'vue'
import DefaultMode from './examples/DefaultMode.vue'
import VSlotMode from './examples/VSlotMode.vue'
import StaticMode from './examples/StaticMode.vue'

createApp(DefaultMode).mount('#default-mode')
createApp(VSlotMode).mount('#v-slot-mode')
createApp(StaticMode).mount('#static-mode')
