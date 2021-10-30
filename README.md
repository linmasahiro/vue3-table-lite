# vue3-table-lite

![SampleGif](https://linmasahiro.github.io/vue3-table-lite/sample.gif)

A simple and lightweight data table component for Vue.js 3. Features sorting, paging, row check, dynamic data rendering, supported TypeScript, and more.

## Document and demo

[Document](https://linmasahiro.github.io/vue3-table-lite/dist/)

[Online Demo](https://linmasahiro.github.io/vue3-table-lite/dist/simple.html)

## Support

+ Row check event Support
+ Custom data display Support
+ Pagging Support
+ Sorting Support
+ Custom message Support
+ V-slot Support
+ TypeScript Support

## SampleCode

### import
    import TableLite from "vue3-table-lite";

## QuickStart
### component
    <table-lite
    :is-loading="table.isLoading"
    :columns="table.columns"
    :rows="table.rows"
    :total="table.totalRecordCount"
    :sortable="table.sortable"
    :messages="table.messages"
    @do-search="doSearch"
    @is-finished="table.isLoading = false"
  ></table-lite>

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
[Go to Check!!](https://linmasahiro.github.io/vue3-table-lite/dist/usage.html)

### release
    ver 1.0.8 : fixed can't rendering customized display data on static mode bus.
    ver 1.0.7 : supported v-slot.
    ver 1.0.6 : supported static mode.
    ver 1.0.5 : fixed Safari loading-mask is not overlapping the table.
    ver 1.0.4 : supported TypeScript.
    ver 1.0.3 : fixed wrong limit value.