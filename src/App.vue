<template>
  <div style="text-align: left">
    <h3>Normal mode sample</h3>
  </div>
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
  <hr />
  <div style="text-align: left">
    <h3>Static mode sample</h3>
    <label>SearchBy:</label><input v-model="searchTerm" />
  </div>
  <table-lite
    :is-static-mode="true"
    :has-checkbox="true"
    :columns="table2.columns"
    :rows="table2.rows"
    :total="table2.totalRecordCount"
    :sortable="table2.sortable"
    @is-finished="tableLoadingFinish"
    @return-checked-rows="updateCheckedRows"
  ></table-lite>
  <hr />
  <div style="text-align: left">
    <h3>Slot mode sample</h3>
  </div>
  <table-lite
    :is-slot-mode="true"
    :has-checkbox="true"
    :is-loading="table3.isLoading"
    :is-re-search="table3.isReSearch"
    :columns="table3.columns"
    :rows="table3.rows"
    :total="table3.totalRecordCount"
    :sortable="table3.sortable"
    :messages="table3.messages"
    @do-search="doSearch3"
    @is-finished="table3.isLoading = false"
    @return-checked-rows="updateCheckedRows"
  >
    <template v-for="(col, i) of table3.columns" v-slot:[col.field]="data" :key="i">
      <Test>
        {{ data.value[col.field] }}
      </Test>
    </template>
    <!-- <template v-slot:name="data">
      <Test>
        {{ data.value.name }}
      </Test>
    </template> -->
  </table-lite>
</template>

<script>
import { defineComponent, reactive, ref, computed } from "vue";
import TableLite from "./components/TableLite.vue";
import Test from "./components/Test.vue";

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
  return data;
};

const sampleData2 = (offst, limit) => {
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

export default defineComponent({
  name: "App",
  components: {
    TableLite,
    Test,
  },
  setup() {
    ////////////////////////////
    //
    //  Table 相關
    //

    // {
    //   rows: [{
    //     id: 1,
    //     name: 'jack',
    //     email: 'example@example.com'
    //   },{
    //     id: 2,
    //     name: 'rose',
    //     email: 'example@example.com'
    //   }],
    //   count: 2,
    //   ...something
    // }

    // 用戶一覽表設定值
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
          display: function (row) {
            return (
              '<button type="button" data-id="' +
              row.id +
              '" class="is-rows-el quick-btn">Button</button>'
            );
          },
        },
      ],
      rows: sampleData1(0, 10),
      totalRecordCount: 20,
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
     * 資料讀取結束事件
     *
     * @param Collection elements 靜態元件
     */
    const tableLoadingFinish = (elements) => {
      table.isLoading = false;
      Array.prototype.forEach.call(elements, function (element) {
        if (element.classList.contains("name-btn")) {
          element.addEventListener("click", function () {
            console.log(this.dataset.id + " name-btn click!!");
          });
        }
        if (element.classList.contains("quick-btn")) {
          // 設定快捷按鈕點擊事件
          element.addEventListener("click", function () {
            console.log(this.dataset.id + " quick-btn click!!");
          });
        }
      });
    };

    /**
     * 更新目前選上的資料
     */
    const updateCheckedRows = (rowsKey) => {
      console.log(rowsKey);
    };

    ////////////////////////////
    //
    //  Table2 相關
    //

    const searchTerm = ref(""); // 查詢文字(Search text)
    const data = reactive([]); // 假資料(Fake data)
    for (let i = 0; i < 126; i++) {
      data.push({
        id: i,
        name: "TEST" + i,
        email: "test" + i + "@example.com",
      });
    }

    // 用戶一覽表2設定值
    const table2 = reactive({
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
          display: function (row) {
            return (
              '<button type="button" data-id="' +
              row.id +
              '" class="is-rows-el quick-btn">Button</button>'
            );
          },
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
        return table2.rows.length;
      }),
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

    ////////////////////////////
    //
    //  Table3 相關
    //

    // 用戶一覽表設定值
    const table3 = reactive({
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
        },
        {
          label: "Email",
          field: "email",
          width: "15%",
          sortable: true,
        }
      ],
      rows: sampleData1(0, 10),
      totalRecordCount: 20,
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

    const doSearch3 = (offset, limit, order, sort) => {
      table3.isLoading = true;
      setTimeout(() => {
        table3.isReSearch = offset == undefined ? true : false;
        if (offset >= 10 || limit >= 20) {
          limit = 20;
        }
        if (sort == "asc") {
          table3.rows = sampleData1(offset, limit);
        } else {
          table3.rows = sampleData2(offset, limit);
        }
        table3.totalRecordCount = 20;
        table3.sortable.order = order;
        table3.sortable.sort = sort;
      }, 600);
    };

    return {
      searchTerm,
      table,
      table2,
      table3,
      doSearch,
      doSearch3,
      tableLoadingFinish,
      updateCheckedRows,
    };
  },
});
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
