<template>
  <section>
    <table-lite
      :is-static-mode="true"
      :is-slot-mode="true"
      :is-loading="table.isLoading"
      :columns="table.columns"
      :rows="table.rows"
      :total="table.totalRecordCount"
      :sortable="table.sortable"
      @rowClicked="rowClicked"
    >
      <template v-slot:icon="data">
        <div>
          <div class="flex-cen right-0 w-3 relative">
            <div
              @click="data.value.showEdit = !data.value.showEdit"
              :class="[data.value.showEdit ? 'hidden' : 'block right-0']"
            >
              <a href="javascript:void(0)">...</a>
            </div>
            <div
              @click="data.value.showEdit = !data.value.showEdit"
              :class="[data.value.showEdit ? 'block' : 'hidden']"
            >
              <a href="javascript:void(0)">X</a>
            </div>
            <div
              :class="[data.value.showEdit ? 'block' : 'hidden']"
              class="w-240 bg-white py-5 px-8 z-50 absolute md:-left-72 -left-64 flex items-center uppercase font-semibold"
            >
              <i class="fa-solid fa-pen text-green"></i>
              <p @click="clickedRow = !clickedRow" class="ml-1 cursor-pointer">
                View Info
              </p>
              <i class="fa-solid fa-trash-can text-green ml-4"></i>

              <p @click="deleteCurrentRow(data.value)" class="ml-1 cursor-pointer">
                Delete
              </p>
            </div>
          </div>
        </div>
      </template>
    </table-lite>
    <section v-if="openModel">
      <div>
        <Model :App="App" :allSubs="allSubs" :marks="marks" @close-modal="onClickAway" />
      </div>
    </section>
  </section>
</template>

<script>
/**
 *
 *  Show controls example
 *
 *  @author  M Atif
 *  @email   atif@starzdev.com
 *  @website https://websengineer.me/
 *
 */
import { reactive, ref, defineComponent, computed } from "vue";
import TableLite from "../components/TableLite.vue";
import Model from "./Additional/Model.vue";

export default defineComponent({
  name: "App",
  components: { TableLite, Model },
  setup() {
    const data = reactive([
      {
        name: "M Atif",
        showEdit: false,
        DOB: "12/12/2020",
        subs: "42",
        courseType: "Bs SE",
        allData: {
          App: "M Atif - Bs Software Engineering",
          allSubjects: [
            {
              name: "Ai Learning",
              percentage: "82%",
            },
            {
              name: "ML",
              percentage: "45%",
            },
            {
              name: "JavaScript",
              percentage: "99%",
            },
          ],

          marks: "500",
        },
      },
      {
        name: "John Doe",
        showEdit: false,
        DOB: "12/12/2022",
        subs: "36",
        courseType: "BS CS",
        allData: {
          App: "John Doe - Bs Computer Science",
          allSubjects: [
            {
              name: "Theory of Automata",
              percentage: "82%",
            },
            {
              name: "Software Construction",
              percentage: "45%",
            },
          ],

          marks: "900",
        },
      },
    ]);
    const table = reactive({
      isLoading: false,
      columns: [
        {
          label: "Name",
          field: "name",
          width: "25%",
          sortable: true,
        },
        {
          label: "Study",
          field: "courseType",
          width: "25%",
          sortable: true,
        },
        {
          label: "DOB",
          field: "DOB",
          width: "25%",
          sortable: true,
        },
        {
          label: "Subjects",
          field: "subs",
          width: "25%",
          sortable: false,
        },
        {
          label: " ",
          field: "icon",
          sortable: false,
        },
      ],
      rows: data,
      totalRecordCount: computed(() => {
        return table.rows.length;
      }),
      sortable: {
        order: "name",
        sort: "asc",
      },
    });

    const onClickAway = () => {
      openModel.value = !openModel.value;
      clickedRow.value = !clickedRow.value;
    };

    let openModel = ref(false);
    let App = ref("");
    let allSubs = ref("");
    let extSubs = ref("");
    let marks = ref("");
    let clickedRow = ref("");
    const rowClicked = (row) => {
      if (clickedRow.value) {
        row.showEdit = !row.showEdit;
        openModel.value = !openModel.value;
        App.value = row.name;
        allSubs.value = row.allData.allSubjects;
        extSubs.value = row.allData.extSubs;
        marks.value = row.allData.marks;
      }
    };
    let deleteCurrentRow = (row) => {
      data.splice(data.indexOf(row), 1);
    };

    return {
      table,
      openModel,
      App,
      allSubs,
      extSubs,
      marks,
      onClickAway,
      clickedRow,
      rowClicked,
      deleteCurrentRow,
    };
  },
});
</script>
<style scoped>
.z-50 {
  z-index: 50;
}
.uppercase {
  text-transform: uppercase;
}
.-left-64 {
  left: -16rem;
}
.px-8 {
  padding-left: 2rem;
  padding-right: 2rem;
}
.py-5 {
  padding-top: 0.25rem !important;
  padding-bottom: 0.25rem !important;
}
.font-semibold {
  font-weight: 600;
}
.items-center {
  -webkit-box-align: center;
  -ms-flex-align: center;
  -webkit-align-items: center;
  align-items: center;
}

.block {
  display: block;
}
.flex {
  display: -webkit-box;
  display: -ms-flexbox;
  display: -webkit-flex;
  display: flex;
}

.hidden {
  display: none;
}

.w-3 {
  width: 1.75rem;
}
.right-0 {
  right: 0px;
}
.relative {
  position: relative;
}
.w-240 {
  width: 240px;
}
.flex-cen {
  display: -webkit-box;
  display: -ms-flexbox;
  display: -webkit-flex;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  -webkit-align-items: center;
  align-items: center;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  -webkit-justify-content: center;
  justify-content: center;
}
.absolute {
  position: absolute;
}
.cursor-pointer {
  cursor: pointer;
}
</style>
