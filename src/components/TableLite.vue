<template>
  <div class="card">
    <div class="card-header" v-if="title">{{ title }}</div>
    <div class="card-body">
      <p class="card-title"></p>
      <div
        id="dataTables-example_wrapper"
        class="dataTables_wrapper dt-bootstrap4 no-footer"
      >
        <div class="row"></div>
        <div class="row">
          <div class="col-sm-12">
            <table
              class="table table-hover table-bordered table-responsive-sm"
              id="dataTables-example"
              width="100%"
            >
              <div class="row"></div>
              <div v-if="isLoading" class="loading-mask">
                <div class="loading-content">
                  <span style="color: white">Loading...</span>
                </div>
              </div>
              <thead class="thead-dark">
                <tr>
                  <th v-if="hasCheckbox" class="checkbox-th">
                    <div>
                      <input type="checkbox" v-model="setting.isCheckAll" />
                    </div>
                  </th>
                  <th
                    v-for="(col, index) in columns"
                    :key="index"
                    :style="{ width: col.width ? col.width : 'auto' }"
                  >
                    <div
                      :class="{
                        sortable: col.sortable,
                        both: col.sortable,
                        asc:
                          sortable.order == col.field && sortable.sort == 'asc',
                        desc:
                          sortable.order == col.field &&
                          sortable.sort == 'desc',
                      }"
                      @click="col.sortable ? doSort(col.field) : false"
                    >
                      {{ col.label }}
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody v-if="rows.length > 0">
                <tr v-for="(row, i) in rows" :key="i">
                  <td v-if="hasCheckbox">
                    <div>
                      <input
                        type="checkbox"
                        :ref="(el) => {rowCheckbox[i] = el}"
                        :value="row[setting.keyColumn]"
                        @click="checked"
                      />
                    </div>
                  </td>
                  <td v-for="(col, j) in columns" :key="j">
                    <div v-if="col.display" v-html="col.display(row)"></div>
                    <span v-else>{{ row[col.field] }}</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div class="row" v-if="rows.length > 0">
          <div class="col-sm-12 col-md-4">
            <div role="status" aria-live="polite">
              {{
                messages.pagingInfo.format(setting.offset, setting.limit, total)
              }}
            </div>
          </div>
          <div class="col-sm-12 col-md-4">
            <span>{{ messages.pageSizeChangeLabel }}</span>
            <select v-model="setting.pageSize">
              <option value="10">10</option>
              <option value="25">25</option>
              <option value="50">50</option>
            </select>
            <span>{{ messages.gotoPageLabel }}</span>
            <select v-model="setting.page">
              <option v-for="n in setting.maxPage" :key="n">{{ n }}</option>
            </select>
          </div>
          <div class="col-sm-12 col-md-4">
            <div
              class="dataTables_paginate paging_simple_numbers"
              id="dataTables-example_paginate"
            >
              <ul class="pagination">
                <li class="page-item" :class="{ disabled: setting.page <= 1 }">
                  <a
                    class="page-link"
                    href="javascript:void(0)"
                    aria-label="Previous"
                    @click="setting.page = 1"
                  >
                    <span aria-hidden="true">&laquo;</span>
                    <span class="sr-only">First</span>
                  </a>
                </li>
                <li class="page-item" :class="{ disabled: setting.page <= 1 }">
                  <a
                    class="page-link"
                    href="javascript:void(0)"
                    aria-label="Previous"
                    @click="prevPage"
                  >
                    <span aria-hidden="true">&lt;</span>
                    <span class="sr-only">Prev</span>
                  </a>
                </li>
                <li
                  class="page-item"
                  v-for="n in setting.pagging"
                  :key="n"
                  :class="{ disabled: setting.page == n }"
                >
                  <a
                    class="page-link"
                    href="javascript:void(0)"
                    @click="movePage(n)"
                    >{{ n }}</a
                  >
                </li>
                <li
                  class="page-item"
                  :class="{ disabled: setting.page >= setting.maxPage }"
                >
                  <a
                    class="page-link"
                    href="javascript:void(0)"
                    aria-label="Next"
                    @click="nextPage"
                  >
                    <span aria-hidden="true">&gt;</span>
                    <span class="sr-only">Next</span>
                  </a>
                </li>
                <li
                  class="page-item"
                  :class="{ disabled: setting.page >= setting.maxPage }"
                >
                  <a
                    class="page-link"
                    href="javascript:void(0)"
                    aria-label="Next"
                    @click="setting.page = setting.maxPage"
                  >
                    <span aria-hidden="true">&raquo;</span>
                    <span class="sr-only">Last</span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div class="row" v-else>
          <div class="col-sm-12 text-center">
            {{ messages.noDataAvailable }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
String.prototype.format = function () {
  var args = arguments;
  return this.replace(/{([0-9]*)}/g, function (match, number) {
    return typeof args[number] != "undefined" ? args[number] : match;
  });
};

import {
  defineComponent,
  ref,
  reactive,
  computed,
  watch,
  onBeforeUpdate,
  nextTick,
} from "vue";

export default defineComponent({
  name: "my-table",
  props: {
    // 是否讀取中
    isLoading: {
      type: Boolean,
      require: true,
    },
    // 是否執行了重新查詢
    isReSearch: {
      type: Boolean,
      require: true,
    },
    // 有無Checkbox
    hasCheckbox: {
      type: Boolean,
      default: false,
    },
    // 標題
    title: {
      type: String,
      default: "",
    },
    // 欄位
    columns: {
      type: Array,
      default: () => {
        return [];
      },
    },
    // 資料
    rows: {
      type: Array,
      default: () => {
        return [];
      },
    },
    // 一頁顯示筆數
    pageSize: {
      type: Number,
      default: 10,
    },
    // 總筆數
    total: {
      type: Number,
      default: 100,
    },
    // 現在頁數
    page: {
      type: Number,
      default: 1,
    },
    // 排序條件
    sortable: {
      type: Object,
      default: () => {
        return {
          order: "id",
          sort: "asc",
        };
      },
    },
    // 顯示文字
    messages: {
      type: Object,
      default: () => {
        return {
          pagingInfo: "Showing {0}-{1} of {2}",
          pageSizeChangeLabel: "Row count:",
          gotoPageLabel: "Go to page:",
          noDataAvailable: "No data",
        };
      },
    },
  },
  setup(props, { emit }) {
    // 組件用內部設定值
    const setting = reactive({
      // 是否全選
      isCheckAll: false,
      // KEY欄位名稱
      keyColumn: computed(() => {
        let key = "";
        props.columns.forEach((col) => {
          if (col.isKey) {
            key = col.field;
          }
        });
        return key;
      }),
      // 當前頁數
      page: props.page,
      // 每頁顯示筆數
      pageSize: props.pageSize,
      // 最大頁數
      maxPage: computed(() => {
        if (props.total <= 0) {
          return 0;
        }
        let maxPage = Math.floor(props.total / setting.pageSize);
        let mod = props.total % setting.pageSize;
        if (mod > 0) {
          maxPage++;
        }
        return maxPage;
      }),
      // 該頁數起始值
      offset: computed(() => {
        return (setting.page - 1) * setting.pageSize + 1;
      }),
      // 該頁數最大值
      limit: computed(() => {
        let limit = setting.page * setting.pageSize;
        return props.total >= limit ? limit : props.total;
      }),
      // 換頁陣列
      pagging: computed(() => {
        let startPage = setting.page - 2 <= 0 ? 1 : setting.page - 2;
        if (setting.maxPage - setting.page <= 2) {
          startPage = setting.maxPage - 4;
        }
        startPage = startPage <= 0 ? 1 : startPage;
        let pages = [];
        for (let i = startPage; i <= setting.maxPage; i++) {
          if (pages.length < 5) {
            pages.push(i);
          }
        }
        return pages;
      }),
    });

    ////////////////////////////
    //
    //  Checkbox 相關操作
    //

    // 定義Checkbox參照
    const rowCheckbox = ref([]);
    if (props.hasCheckbox) {
      /**
       * 重新渲染前執行
       */
      onBeforeUpdate(() => {
        // 每次更新前都把值全部清空
        rowCheckbox.value = [];
      });

      /**
       * 監聽全勾選Checkbox
       */
      watch(
        () => setting.isCheckAll,
        (state) => {
          let isChecked = [];
          rowCheckbox.value.forEach((val) => {
            if (val) {
              val.checked = state;
              if (val.checked == true) {
                isChecked.push(val.value);
              }
            }
          });
          // 回傳畫面上選上的資料
          emit("return-checked-rows", isChecked);
        }
      );
    }

    /**
     * Checkbox點擊事件
     */
    const checked = () => {
      let isChecked = [];
      rowCheckbox.value.forEach((val) => {
        if (val && val.checked == true) {
          isChecked.push(val.value);
        }
      });
      // 回傳畫面上選上的資料
      emit("return-checked-rows", isChecked);
    };

    /**
     * 清空畫面上所有選擇資料
     */
    const clearChecked = () => {
      rowCheckbox.value.forEach((val) => {
        if (val && val.checked == true) {
          val.checked = false;
        }
      });
      // 回傳畫面上選上的資料
      emit("return-checked-rows", []);
    };

    ////////////////////////////
    //
    //  排序·換頁等 相關操作
    //

    /**
     * 呼叫執行排序
     */
    const doSort = (order) => {
      let sort = "asc";
      if (order == props.sortable.order) {
        // 排序中的項目時
        if (props.sortable.sort == "asc") {
          sort = "desc";
        }
      }
      let offset = (setting.page - 1) * setting.pageSize;
      let limit = setting.page * setting.pageSize;
      emit("do-search", offset, limit, order, sort);

      // 清空畫面上選擇的資料
      if (setting.isCheckAll) {
        // 取消全選時自然會清空
        setting.isCheckAll = false;
      } else {
        if (props.hasCheckbox) {
          clearChecked();
        }
      }
    };

    /**
     * 切換頁碼
     *
     * @param number page     新頁碼
     * @param number prevPage 現在頁碼
     */
    const changePage = (page, prevPage) => {
      setting.isCheckAll = false;
      let order = props.sortable.order;
      let sort = props.sortable.sort;
      let offset = (page - 1) * setting.pageSize;
      let limit = page * setting.pageSize;
      if (!props.isReSearch || page > 1 || page == prevPage) {
        // 非重新查詢發生的頁碼變動才執行呼叫查詢
        emit("do-search", offset, limit, order, sort);
      }
    };
    // 監聽頁碼切換
    watch(() => setting.page, changePage);

    /**
     * 切換顯示筆數
     */
    const changePageSize = () => {
      if (setting.page === 1) {
        // 沒自動觸發 changePage()，所以手動觸發
        changePage(setting.page, setting.page);
      } else {
        // 強制返回第一頁,並自動觸發 changePage()
        setting.page = 1;
        setting.isCheckAll = false;
      }
    };
    // 監聽顯示筆數切換
    watch(() => setting.pageSize, changePageSize);

    /**
     * 上一頁
     */
    const prevPage = () => {
      if (setting.page == 1) {
        // 如果是第一頁，不予執行
        return false;
      }
      setting.page--;
    };

    /**
     * 移動至指定頁數
     */
    const movePage = (page) => {
      setting.page = page;
    };

    /**
     * 下一頁
     */
    const nextPage = () => {
      if (setting.page >= setting.maxPage) {
        // 如果等於大於最大頁數，不與執行
        return false;
      }
      setting.page++;
    };

    // 監聽資料變更
    watch(
      () => props.rows,
      () => {
        if (props.isReSearch) {
          setting.page = 1;
        }
        nextTick(function () {
          // 資料完成渲染後回傳私有元件
          let localElement = document.getElementsByClassName("is-rows-el");
          emit("is-finished", localElement);
        });
      }
    );

    if (props.hasCheckbox) {
      // 需要 Checkbox 時
      return {
        setting,
        rowCheckbox,
        checked,
        doSort,
        prevPage,
        movePage,
        nextPage,
      };
    } else {
      return {
        setting,
        doSort,
        prevPage,
        movePage,
        nextPage,
      };
    }
  },
});
</script>

<style scoped>
.checkbox-th {
  width: 1%;
}

.both {
  background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABMAAAATCAQAAADYWf5HAAAAkElEQVQoz7X QMQ5AQBCF4dWQSJxC5wwax1Cq1e7BAdxD5SL+Tq/QCM1oNiJidwox0355mXnG/DrEtIQ6azioNZQxI0ykPhTQIwhCR+BmBYtlK7kLJYwWCcJA9M4qdrZrd8pPjZWPtOqdRQy320YSV17OatFC4euts6z39GYMKRPCTKY9UnPQ6P+GtMRfGtPnBCiqhAeJPmkqAAAAAElFTkSuQmCC");
}

.sortable {
  cursor: pointer;
  background-position: right;
  background-repeat: no-repeat;
  padding-right: 30px !important;
}

.asc {
  background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABMAAAATCAYAAAByUDbMAAAAZ0lEQVQ4y2NgGLKgquEuFxBPAGI2ahhWCsS/gDibUoO0gPgxEP8H4ttArEyuQYxAPBdqEAxPBImTY5gjEL9DM+wTENuQahAvEO9DMwiGdwAxOymGJQLxTyD+jgWDxCMZRsEoGAVoAADeemwtPcZI2wAAAABJRU5ErkJggg==);
}

.desc {
  background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABMAAAATCAYAAAByUDbMAAAAZUlEQVQ4y2NgGAWjYBSggaqGu5FA/BOIv2PBIPFEUgxjB+IdQPwfC94HxLykus4GiD+hGfQOiB3J8SojEE9EM2wuSJzcsFMG4ttQgx4DsRalkZENxL+AuJQaMcsGxBOAmGvopk8AVz1sLZgg0bsAAAAASUVORK5CYII=);
}

.loading-mask {
  position: absolute;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: table;
  transition: opacity 0.3s ease;
}

.loading-content {
  display: table-cell;
  vertical-align: middle;
}

.loading-icon {
  display: block;
  margin-left: auto;
  margin-right: auto;
}

.card {
  position: relative;
  display: -ms-flexbox;
  display: flex;
  -ms-flex-direction: column;
  flex-direction: column;
  min-width: 0;
  word-wrap: break-word;
  background-color: #fff;
  background-clip: border-box;
  padding: 20px;
}

select {
    width: auto;
    border: 1px solid #cccccc;
    background-color: #ffffff;
    height: auto;
    padding: 0px;
    margin-bottom: 0px;
}

table {
  width: 100%;
  margin-bottom: 1rem;
  color: #212529;
  border-collapse: collapse;
}

th {
  text-align: inherit;
}

tr {
  display: table-row;
  vertical-align: inherit;
  border-color: inherit;
}

.table .thead-dark th {
  color: #fff;
  background-color: #343a40;
  border-color: #454d55;
}

.table-bordered thead td,
.table-bordered thead th {
  border-bottom-width: 2px;
}

.table thead th {
  vertical-align: bottom;
  border-bottom: 2px solid #dee2e6;
}

.table-bordered td,
.table-bordered th {
  border: 1px solid #dee2e6;
}

.table td,
.table th {
  padding: 0.75rem;
  vertical-align: top;
  border-top: 1px solid #dee2e6;
}

.table-border {
  border: 1px solid #dee2e6;
}

.table td,
.table th {
  vertical-align: middle;
}
.table-bordered td,
.table-bordered th {
  border: 1px solid #dee2e6;
}
.table td,
.table th {
  padding: 0.75rem;
  vertical-align: top;
  border-top: 1px solid #dee2e6;
}
.row {
  display: -ms-flexbox;
  display: flex;
  -ms-flex-wrap: wrap;
  flex-wrap: wrap;
  margin-right: -15px;
  margin-left: -15px;
}

div.dataTables_wrapper div.dataTables_paginate {
  margin: 0;
  white-space: nowrap;
  text-align: right;
}

div.dataTables_wrapper div.dataTables_paginate ul.pagination {
  margin: 2px 0;
  white-space: nowrap;
  justify-content: flex-end;
}

.pagination {
  display: -ms-flexbox;
  display: flex;
  padding-left: 0;
  list-style: none;
  border-radius: 0.25rem;
}

.page-item.disabled .page-link {
  color: #6c757d;
  pointer-events: none;
  cursor: auto;
  background-color: #fff;
  border-color: #dee2e6;
}
.page-item:first-child .page-link {
  margin-left: 0;
  border-top-left-radius: 0.25rem;
  border-bottom-left-radius: 0.25rem;
}

.page-link {
  position: relative;
  display: block;
  padding: 0.5rem 0.75rem;
  margin-left: -1px;
  line-height: 1.25;
  color: #007bff;
  background-color: #fff;
  border: 1px solid #dee2e6;
}

.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

*,
::after,
::before {
  box-sizing: border-box;
}

@media (min-width: 576px) {
  .col-sm-12 {
    -ms-flex: 0 0 100%;
    flex: 0 0 100%;
    max-width: 100%;
  }
}

@media (min-width: 768px) {
  .col-md-4 {
    -ms-flex: 0 0 33.333333%;
    flex: 0 0 33.333333%;
    max-width: 33.333333%;
  }
}
</style>