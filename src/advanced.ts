import { createApp } from 'vue'
import CustomizeDisplayData from './examples/CustomizeDisplayData.vue'
import Filter from './examples/Filter.vue'
import Filter2 from './examples/Filter2.vue'
import Filter3 from './examples/Filter3.vue'
import CustomizeStyle from './examples/CustomizeStyle.vue'
import CustomizeStyle2 from './examples/CustomizeStyle2.vue'
import CustomizeMessage from './examples/CustomizeMessage.vue'
import CustomizePageDropdown from './examples/CustomizePageDropdown.vue'
import RowClicked from './examples/RowClicked.vue'
import RowDoubleClicked from '@/examples/RowDoubleClicked.vue'
import FixedFirstColumn from './examples/FixedFirstColumn.vue'
import FixedHeaderAndFirstColumn from './examples/FixedHeaderAndFirstColumn.vue'
import ShowControls from './examples/ShowControls.vue'
import Grouping from './examples/Grouping.vue'
import Grouping2 from './examples/Grouping2.vue'

createApp(CustomizeDisplayData).mount('#customize-display-table')
createApp(Filter).mount('#filter-table')
createApp(Filter2).mount('#filter2-table')
createApp(Filter3).mount('#filter3-table')
createApp(CustomizeStyle).mount('#customize-style-table')
createApp(CustomizeStyle2).mount('#customize-style-table2')
createApp(CustomizeMessage).mount('#customize-message-table')
createApp(CustomizePageDropdown).mount('#customize-page-dropdown-table')
createApp(RowClicked).mount('#row-clicked-table')
createApp(RowDoubleClicked).mount('#row-dblclicked-table')
createApp(FixedFirstColumn).mount('#fixed-first-column-table')
createApp(FixedHeaderAndFirstColumn).mount('#fixed-header-and-first-column-table')
createApp(ShowControls).mount('#show-controls-table')
createApp(Grouping).mount('#grouping-table')
createApp(Grouping2).mount('#grouping2-table')