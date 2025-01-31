# vue3-table-lite

[![Lincense](https://img.shields.io/github/license/linmasahiro/vue3-table-lite)](https://github.com/linmasahiro/vue3-table-lite/blob/master/LICENSE) 
[![NPM](https://img.shields.io/npm/v/vue3-table-lite)](https://www.npmjs.com/package/vue3-table-lite)
[![GitHub release (latest by date)](https://img.shields.io/github/v/release/linmasahiro/vue3-table-lite)](https://github.com/linmasahiro/vue3-table-lite)
[![Website](https://img.shields.io/website?url=https%3A%2F%2Flinmasahiro.github.io%2Fvue3-table-lite%2Fdist%2F)](https://linmasahiro.github.io/vue3-table-lite/dist/)
[![npm](https://img.shields.io/npm/dm/vue3-table-lite)](https://www.npmjs.com/package/vue3-table-lite)

![GitHub Repo stars](https://img.shields.io/github/stars/linmasahiro/vue3-table-lite?style=social)
![GitHub forks](https://img.shields.io/github/forks/linmasahiro/vue3-table-lite?style=social)

![SampleGif](https://linmasahiro.github.io/vue3-table-lite/sample.gif)

A simple and lightweight data table component for Vue.js 3. Features sorting, paging, row check, dynamic data rendering, supported TypeScript, and more.

## Document and demo

[Document](https://vue3-lite-table.vercel.app/)

[Online Demo](https://vue3-lite-table.vercel.app/simple-examples.html)

## Support

+ Row check event Support
+ Custom data display Support
+ Pagging Support
+ Sorting Support
+ Custom message Support
+ V-slot Support
+ TypeScript Support
+ Grouping Support

## SampleCode

### import
    import VueTableLite from "vue3-table-lite";
    import VueTableLite from "vue3-table-lite/ts"; // TypeScript

## QuickStart
### component
    <VueTableLite
    :is-loading="table.isLoading"
    :columns="table.columns"
    :rows="table.rows"
    :total="table.totalRecordCount"
    :sortable="table.sortable"
    :messages="table.messages"
    @do-search="doSearch"
    @is-finished="table.isLoading = false"
    />
  >

### data
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
      rows: [],
      totalRecordCount: 0,
      sortable: {
        order: "id",
        sort: "asc",
      },
    });

### Event
    const doSearch = (offset, limit, order, sort) => {
      table.isLoading = true;

      // Start use axios to get data from Server
      let url = 'https://www.example.com/api/some_endpoint?offset=' + offset + '&limit=' + limit + '&order=' + order + '&sort=' + sort;
      axios.get(url)
      .then((response) => {
        // Point: your response is like it on this example.
        //   {
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
        
        // refresh table rows
        table.rows = response.rows;
        table.totalRecordCount = response.count;
        table.sortable.order = order;
        table.sortable.sort = sort;
      });
      // End use axios to get data from Server
    };

## More...
[Go to Check!!](https://vue3-lite-table.vercel.app/usage/default-mode.html)

### release
    ver 1.4.3 : Added skeletonScreen option. `#121`
    ver 1.4.2 : Added Header's slot. `#120`
    ver 1.4.1 : Fixed `#118`.
    ver 1.4.0 : Added checkbox indeterminate state.
    ver 1.3.9 : Added Vertical highlight option. `#93`
    ver 1.3.8 : Allow HTML in header's label `#91`.
    ver 1.3.7 : Fixed `#85`.
    ver 1.3.6 : Fixed `#81`.
    ver 1.3.5 : Fixed `#79`.
    ver 1.3.4 : Fixed `#78`.
    ver 1.3.3 : Fixed `#77`.
    ver 1.3.2 : Fixed `#75`.
    ver 1.3.1 : Fixed `#73`.
    ver 1.3.0 : Fixed `#69`.
    ver 1.2.9 : Added keep collapsed status option.
    ver 1.2.8 : Added grouping collapse features. `#67`
    ver 1.2.7 : Fixed `#63`.
    ver 1.2.6 : Fixed `#61`.
    ver 1.2.5 : Added table max-height prop and `#59` bugs.
    ver 1.2.4 : Added grouping features. `#53`
    ver 1.2.3 : Added option for fixed first column on horizontal scrolling.
    ver 1.2.2 : Fixed result of sorting number as string was wrong on "static-mode" `#47`
    ver 1.2.1 : Fixed "setting.pageSize" property is not accessible from outside and is not in sync with the "props.pageSize" property
    ver 1.2.0 : Added Row click event `#41`
    ver 1.1.9 : New Features `#35` `#36`
    ver 1.1.8-1 : Removed unnecessary style-class and changed something class-name `#33`
    ver 1.1.8 : Add option to set header/column class and style(in-line) `#32`
    ver 1.1.7 : Add option to set custom values in page size dropdown `#29`
    ver 1.1.6 : fixed bug. `#28`
    ver 1.1.5 : Added classes to element for easier Styling. `#25`
    ver 1.1.3 : fixed cannot get localTabel refs bugs.
    ver 1.1.2 : changed import file on TypeScript.
    ver 1.1.1 : added hide-paging and page number attribute and fixed `#23`.
    ver 1.1.0 : remove Vue Dependency at bundle
    ver 1.0.9 : column v-slot is not to be required on v-slot mode
    ver 1.0.8 : fixed can't rendering customized display data on static mode bus.
    ver 1.0.7 : support v-slot.
    ver 1.0.6 : support static mode.
    ver 1.0.5 : fixed Safari loading-mask is not overlapping the table.
    ver 1.0.4 : support TypeScript.
