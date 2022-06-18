<template>
  <table-lite
    :is-slot-mode="true"
    :is-static-mode="true"
    :is-loading="table.isLoading"
    :columns="table.columns"
    :rows="table.rows"
    :total="table.totalRecordCount"
    :sortable="table.sortable"
    @VnodeMounted="initTable"
  >
    <template v-slot:id="data">
      <div v-if="data.value.id == 0">
        <input v-model="searchTerm" />
      </div>
      <div v-else v-html="data.value.id"></div>
    </template>
    <template v-slot:name="data">
      <Test>
        {{ data.value.name }}
      </Test>
    </template>
  </table-lite>
</template>

<script>
import { defineComponent, reactive, ref, computed, createApp, h } from "vue";
import TableLite from "../components/TableLite.vue";
import Test from "../components/Test.vue";

const searchTerm = ref(""); // Search text

// Fake data
const data = reactive([]);

for (let i = 1; i < 126; i++) {
  data.push({
    id: i,
    name: "TEST" + i,
    email: "test" + i + "@example.com",
  });
}

export default defineComponent({
  name: "App",
  components: { TableLite, Test },
  setup() {
    // Table config
    const table = reactive({
      isLoading: false,
      columns: [
        {
          label: "ID",
          field: "id",
          width: "3%",
          sortable: true,
          isKey: true,
        },
        {
          label: "Name",
          field: "name",
          width: "10%",
          sortable: true,
        },
        {
          label: "Email",
          field: "email",
          width: "15%",
          sortable: true,
        },
      ],
      rows: computed(() => {
        return data.filter(
          (x) =>
            x.email.toLowerCase().includes(searchTerm.value.toLowerCase()) ||
            x.name.toLowerCase().includes(searchTerm.value.toLowerCase())
        );
      }),
      totalRecordCount: computed(() => {
        return table.rows.length;
      }),
      sortable: {
        order: "id",
        sort: "asc",
      },
    });

    /**
     * Trigger after initail component
     */
    const initTable = ({ el: tableComponent }) => {
      let headerTr = tableComponent.getElementsByClassName("vtl-thead-tr");
      if (! headerTr[0]) {
        return;
      }
      let cloneTr = headerTr[0].cloneNode(true); // Clone first <tr>
      let childTh = cloneTr.getElementsByClassName("vtl-thead-th");
      for(let i = 0; i < childTh.length; i++) {
        // Clear <th>'s HTML
        childTh[i].innerHTML = "";
      }

      // Create a input element and append to first <th>
      createApp(
        defineComponent({
          setup() {
            return () =>
              h("input", {
                value: searchTerm.value,
                onInput: (e) => {
                  searchTerm.value = e.target.value;
                },
              });
          },
        })
      ).mount(childTh[0]);

      // append cloned element to the header after first <tr>
      headerTr[0].after(cloneTr)
    };

    return {
      searchTerm,
      table,
      initTable,
    };
  },
});
</script>
