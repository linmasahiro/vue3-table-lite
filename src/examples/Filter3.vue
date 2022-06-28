<template>
  <table-lite
    :is-static-mode="true"
    :columns="table.columns"
    :rows="table.rows"
    :total="table.totalRecordCount"
    :sortable="table.sortable"
    @VnodeMounted="initTable"
  ></table-lite>
</template>

<script>
import { defineComponent, reactive, ref, computed, createApp, h } from "vue";
import TableLite from "../components/TableLite.vue";

const searchTerm = ref(""); // Search text
const searchTerm2 = ref(""); // Search text

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
  components: { TableLite },
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
            x.email.toLowerCase().includes(searchTerm2.value.toLowerCase()) &&
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
      ).mount(childTh[1]);
      createApp(
        defineComponent({
          setup() {
            return () =>
              h("input", {
                value: searchTerm2.value,
                onInput: (e) => {
                  searchTerm2.value = e.target.value;
                },
              });
          },
        })
      ).mount(childTh[2]);

      // append cloned element to the header after first <tr>
      headerTr[0].after(cloneTr)
    };

    return {
      searchTerm,
      searchTerm2,
      table,
      initTable,
    };
  },
});
</script>
