# vue3-table-lite

![SampleGif](https://linmasahiro.github.io/vue3-table-lite/sample.gif)

A simple table component support Vue3.0!!

## DEMO

[Online Demo](https://linmasahiro.github.io/vue3-table-lite/dist/)

## Support

+ Row check event Support
+ Custom data display Support
+ Pagging Support
+ Sorting Support
+ Custom message Support
+ v-slot Suppot

## SampleCode

### import
    import TableLite from "vue3-table-lite";

## Normal mode (No use v-slot)
### component
    <table-lite
        :has-checkbox="true"
        :is-loading="table.isLoading"
        :is-re-search="table.isReSearch"
        :columns="table.columns"
        :rows="table.rows"
        :total="table.totalRecordCount"
        :sortable="table.sortable"
        :messages="table.messages"
        @do-search="doSearch"
        @is-finished="tableLoadingFinish"
        @return-checked-rows="updateCheckedRows"
    ></table-lite>

### data
    const table = reactive({
      isLoading: false,
      isReSearch: false,
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
              '<a href="#" data-id="' + row.user_id + '" class="is-rows-el name-btn">' + row.name + "</button>"
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
              '<button type="button" data-id="' + row.user_id + '" class="is-rows-el quick-btn">Button</button>'
            );
          },
        },
      ],
      rows: [
          {
            id: 1,
            name: "TEST1"
          },
          {
            id: 2,
            name: "TEST2"
          }
      ],
      totalRecordCount: 2,
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

### Event
    const doSearch = (offset, limit, order, sort) => {
      table.isLoading = true;
      table.isReSearch = offset == undefined ? true : false;
      // do your search event to get newRows and new Total
      table.rows = newRows;
      table.totalRecordCount = newTotal;
      table.sortable.order = order;
      table.sortable.sort = sort;
    };

    const tableLoadingFinish = (elements) => {
      table.isLoading = false;
      Array.prototype.forEach.call(elements, function (element) {
        if (element.classList.contains("name-btn")) {
          element.addEventListener("click", function () {
            // do your click event
            console.log(this.dataset.id + " name-btn click!!");
          });
        }
        if (element.classList.contains("quick-btn")) {
          // do your click event
          element.addEventListener("click", function () {
            console.log(this.dataset.id + " quick-btn click!!");
          });
        }
      });
    };

    const updateCheckedRows = (rowsKey) => {
      // do your checkbox click event
      console.log(rowsKey);
    };
## Normal mode (Use v-slot)
### component
    <table-lite
        :is-slot-mode="true"
        :has-checkbox="true"
        :is-loading="table.isLoading"
        :is-re-search="table.isReSearch"
        :columns="table.columns"
        :rows="table.rows"
        :total="table.totalRecordCount"
        :sortable="table.sortable"
        :messages="table.messages"
        @do-search="doSearch"
        @is-finished="table.isLoading = false"
        @return-checked-rows="updateCheckedRows"
    >
      <template v-for="(col, i) of table3.columns" v-slot:[col.field]="data" :key="i">
        <div>
          {{ data.value[col.field] }}
        </div>
      </template>
      <!-- if you want customize column -->
      <!-- <template v-slot:name="data">
        <yourcomponent>
          {{ data.value.name }}
        </yourcomponent>
      </template> -->
    </table-lite>

### data
    const table = reactive({
      isLoading: false,
      isReSearch: false,
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
          sortable: true
        },
        {
          label: "Email",
          field: "email",
          width: "15%",
          sortable: true,
        }
      ],
      rows: [
          {
            id: 1,
            name: "TEST1"
          },
          {
            id: 2,
            name: "TEST2"
          }
      ],
      totalRecordCount: 2,
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

### Event
    const doSearch = (offset, limit, order, sort) => {
      table.isLoading = true;
      table.isReSearch = offset == undefined ? true : false;
      // do your search event to get newRows and new Total
      table.rows = newRows;
      table.totalRecordCount = newTotal;
      table.sortable.order = order;
      table.sortable.sort = sort;
    };

    const updateCheckedRows = (rowsKey) => {
      // do your checkbox click event
      console.log(rowsKey);
    };

## Static mode (Not need get data from Server-side)
### component
    <table-lite
        :is-static-mode="true"
        :has-checkbox="true"
        :columns="table.columns"
        :rows="table.rows"
        :total="table.totalRecordCount"
        :sortable="table.sortable"
        :messages="table.messages"
        @return-checked-rows="updateCheckedRows"
    ></table-lite>

### data
    const table = reactive({
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
              '<a href="#" data-id="' + row.user_id + '" class="is-rows-el name-btn">' + row.name + "</button>"
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
              '<button type="button" data-id="' + row.user_id + '" class="is-rows-el quick-btn">Button</button>'
            );
          },
        },
      ],
      rows: [
          {
            id: 1,
            name: "TEST1"
          },
          {
            id: 2,
            name: "TEST2"
          }
      ],
      totalRecordCount: 2,
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

### Event
    const updateCheckedRows = (rowsKey) => {
      // do your checkbox click event
      console.log(rowsKey);
    };

### release
    ver 1.0.7 : supported v-slot.
    ver 1.0.6 : supported static mode.
    ver 1.0.5 : fixed Safari loading-mask is not overlapping the table.
    ver 1.0.4 : supported TypeScript.
    ver 1.0.3 : fixed wrong limit value.