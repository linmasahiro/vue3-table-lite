import { createApp } from 'vue'
import CustomizeDisplayData from './examples/CustomizeDisplayData.vue'
import Filter from './examples/Filter.vue'
import Filter2 from './examples/Filter2.vue'
import CustomizeStyle from './examples/CustomizeStyle.vue'
import CustomizeStyle2 from './examples/CustomizeStyle2.vue'
import CustomizeMessage from './examples/CustomizeMessage.vue'
import CustomizePageDropdown from './examples/CustomizePageDropdown.vue'

createApp(CustomizeDisplayData).mount('#customize-display-table')
createApp(Filter).mount('#filter-table')
createApp(Filter2).mount('#filter2-table')
createApp(CustomizeStyle).mount('#customize-style-table')
createApp(CustomizeStyle2).mount('#customize-style-table2')
createApp(CustomizeMessage).mount('#customize-message-table')
createApp(CustomizePageDropdown).mount('#customize-page-dropdown-table')