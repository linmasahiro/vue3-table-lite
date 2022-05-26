<template>
  <table-lite
    :has-checkbox="true"
    :is-loading="table.isLoading"
    :is-re-search="table.isReSearch"
    :columns="table.columns"
    :rows="table.rows"
    :rowClasses="table.rowClasses"
    :total="table.totalRecordCount"
    :sortable="table.sortable"
    :messages="table.messages"
    :page-options="table.pageOptions"
    @do-search="doSearch"
    @is-finished="tableLoadingFinish"
    @return-checked-rows="updateCheckedRows"
  ></table-lite>
</template>

<script lang="ts">
import { defineComponent, reactive } from "vue";
import TableLite from "../components/TableLiteTs.vue";

// create fake data1
const sampleData1 = (offst: number, limit: number): Array<rowData> => {
  offst = offst + 1;
  let data = [];
  for (let i = offst; i <= limit; i++) {
    data.push({
      id: i,
      name: "TEST" + i,
      email: "test" + i + "@example.com",
    });
  }
  return data;
};

// create fake data2
const sampleData2 = (offst: number, limit: number): Array<rowData> => {
  let data = [];
  for (let i = limit; i > offst; i--) {
    data.push({
      id: i,
      name: "TEST" + i,
      email: "test" + i + "@example.com",
    });
  }
  return data;
};

// Define row data interface
interface rowData {
  id: number;
  name: string;
  email: string;
}

export default defineComponent({
  name: "App",
  components: { TableLite },
  setup() {
    // Init Your table settings
    const table = reactive({
      isLoading: false,
      isReSearch: false,
      rowClasses: (row: rowData) => {
        if (row.id == 1) {
          return ["aaa", "is-id-one"];
        }
        return ["bbb", "other"];
      },
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
          display: function (row: rowData) {
            return (
              '<a href="#" data-id="' +
              row.id +
              '" class="is-rows-el name-btn">' +
              row.name +
              "</a>"
            );
          },
        },
        {
          label: "Email",
          field: "email",
          width: "15%",
          sortable: true,
        },
        {
          label: "",
          field: "quick",
          width: "10%",
          display: function (row: rowData) {
            return (
              '<button type="button" data-id="' +
              row.id +
              '" class="is-rows-el quick-btn">Button</button>'
            );
          },
        },
      ],
      rows: [] as Array<rowData>,
      totalRecordCount: 0,
      sortable: {
        order: "id",
        sort: "asc",
      },
      messages: {
        pagingInfo: "Showing {0}-{1} of {2}",
        pageSizeChangeLabel: "Row count:",
        gotoPageLabel: "Go to page:",
        noDataAvailable: "No data",
      },
      pageOptions: [
        {
          value: 15,
          text: 15
        },
        {
          value: 30,
          text: 30
        }
      ]
    });

    /**
     * Table search event
     */
    const doSearch = (offset: number, limit: number, order: string, sort: string) => {
      table.isLoading = true;
      setTimeout(() => {
        table.isReSearch = offset == undefined ? true : false;
        if (offset >= 10 || limit >= 20) {
          limit = 20;
        }
        if (sort == "asc") {
          table.rows = sampleData1(offset, limit);
        } else {
          table.rows = sampleData2(offset, limit);
        }
        table.totalRecordCount = 20;
        table.sortable.order = order;
        table.sortable.sort = sort;
      }, 600);
    };

    /**
     * Table search finished event
     */
    const tableLoadingFinish = (elements: Array<HTMLElement>) => {
      table.isLoading = false;
      Array.prototype.forEach.call(elements, function (element: HTMLElement) {
        if (element.classList.contains("name-btn")) {
          element.addEventListener("click", function () {
            console.log(this.dataset.id + " name-btn click!!");
          });
        }
        if (element.classList.contains("quick-btn")) {
          element.addEventListener("click", function () {
            console.log(this.dataset.id + " quick-btn click!!");
          });
        }
      });
    };

    /**
     * Row checked event
     */
    const updateCheckedRows = (rowsKey: number) => {
      console.log(rowsKey);
    };

    doSearch(0, 15, 'id', 'asc');

    return {
      table,
      doSearch,
      tableLoadingFinish,
      updateCheckedRows,
    };
  },
});
</script>

