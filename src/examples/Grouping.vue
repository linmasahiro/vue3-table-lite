<template>
  <table-lite
    :has-checkbox="true"
    :is-loading="table.isLoading"
    :is-re-search="table.isReSearch"
    :grouping-key="table.groupingKey"
    :has-group-toggle="table.hasGroupToggle"
    :grouping-display="table.groupingDisplay"
    :columns="table.columns"
    :rows="table.rows"
    :rowClasses="table.rowClasses"
    :total="table.totalRecordCount"
    :sortable="table.sortable"
    :messages="table.messages"
    @do-search="doSearch"
    @is-finished="tableLoadingFinish"
    @return-checked-rows="updateCheckedRows"
    @row-clicked="rowClicked"
  ></table-lite>
</template>

<script>
import { defineComponent, reactive } from "vue";
import TableLite from "../components/TableLite.vue";

// Fake Data for 'asc' sortable
const sampleData1 = (offst, limit) => {
  offst = offst + 1;
  let data = [];
  for (let i = offst; i <= limit; i++) {
    data.push({
      id: i,
      name: "TEST" + i,
      email: "test" + i + "@example.com",
    });
  }
  data.push({
    id: 22,
    name: "TEST2",
    email: "testGGG@example.com",
  });
  return data;
};

// Fake Data for 'desc' sortable
const sampleData2 = (offst, limit) => {
  let data = [];
  for (let i = limit; i > offst; i--) {
    data.push({
      id: i,
      name: "TEST" + i,
      email: "test" + i + "@example.com",
    });
  }
  data.push({
    id: 22,
    name: "TEST2",
    email: "testGGG@example.com",
  });
  return data;
};

export default defineComponent({
  name: "App",
  components: { TableLite },
  setup() {
    // Table config
    const table = reactive({
      isLoading: false,
      isReSearch: false,
      rowClasses: (row) => {
        if (row.id == 1) {
          return ["aaa", "is-id-one"];
        }
        return ["bbb", "other"];
      },
      groupingKey: "name",
      hasGroupToggle: true,
      groupingDisplay: function (key) {
        return (
          '<span style="background: darkgray; padding: 5px; border-radius: 5px;">' +
          key +
          "</span>"
        );
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
          display: function (row) {
            return (
              '<a href="javascript:void(0)" data-id="' +
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
          display: function (row) {
            return (
              '<button type="button" data-id="' +
              row.id +
              '" class="is-rows-el quick-btn">Button</button>'
            );
          },
        },
      ],
      rows: [],
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
    });

    /**
     * Search Event
     */
    const doSearch = (offset, limit, order, sort) => {
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
     * Loading finish event
     */
    const tableLoadingFinish = (elements) => {
      table.isLoading = false;
      Array.prototype.forEach.call(elements, function (element) {
        if (element.classList.contains("name-btn")) {
          element.addEventListener("click", function (event) {
            event.stopPropagation(); // prevents further propagation of the current event in the capturing and bubbling phases.
            console.log(this.dataset.id + " name-btn click!!");
          });
        }
        if (element.classList.contains("quick-btn")) {
          element.addEventListener("click", function (event) {
            event.stopPropagation(); // prevents further propagation of the current event in the capturing and bubbling phases.
            console.log(this.dataset.id + " quick-btn click!!");
          });
        }
      });
    };

    /**
     * Row checked event
     */
    const updateCheckedRows = (rowsKey) => {
      console.log(rowsKey);
    };

    // First get data
    doSearch(0, 10, "id", "asc");

    /**
     * Row clicked event
     */
    const rowClicked = (row) => {
      console.log("Row clicked!", row);
    };

    return {
      table,
      doSearch,
      tableLoadingFinish,
      updateCheckedRows,
      rowClicked,
    };
  },
});
</script>
