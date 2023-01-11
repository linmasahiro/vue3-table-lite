<template>
  <transition name="modal">
    <div class="modal-mask text-left" @click.prevent="$emit('close-modal')">
      <div class="modal-wrapper">
        <div class="modal-container">
          <div
            class="bg-dark sm:p-5 text-white h-full min-h-120 overflow-scroll px-2 rounded"
          >
            <h1 class="text-center py-4 font-bold text-sm sm:text-xl uppercase">
              {{ App }}
            </h1>
            <main class="flex-cen flex-col">
              <div class="sm:min-w-sm min-w-full pt-10">
                <p class="text-xs py-2">Subject and marks</p>
                <main v-for="items in allSubs" :key="items">
                  <div class="flex-bet border-b border-[#e6e6e6] pb-1">
                    <h1 class="font-bold sm:text-xl">{{ items.name }}</h1>
                    <h1 class="font-bold sm:text-xl">
                      {{ items.percentage }}
                    </h1>
                  </div>
                </main>
              </div>

              <div class="sm:min-w-sm min-w-full pt-10">
                <p class="text-xs">Total Marks</p>
                <h1 class="font-bold sm:text-xl">{{ marks }}</h1>
              </div>
            </main>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>
<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "test-component",
  props: {
    App: String,
    allSubs: Array,
    marks: String,
  },
});
</script>

<style scoped>
.modal-mask {
  position: fixed;
  z-index: 9999999990;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.8);
  display: table;
  transition: opacity 0.3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  width: 80%;
  max-width: 700px;
  margin: 0px auto;
  border-radius: 2px;
  transition: all 0.3s ease;
  font-family: Helvetica, Arial, sans-serif;
}

.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>
