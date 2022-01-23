import Vue from 'vue'
import Element from 'element-ui'
import locale from 'element-ui/lib/locale/lang/en'
// fade/zoom 等
import 'element-ui/lib/theme-chalk/base.css';
// collapse 展开折叠
import CollapseTransition from 'element-ui/lib/transitions/collapse-transition';
import VueCookies from 'vue-cookies'

Vue.use(VueCookies)
Vue.use(Element, { locale })
Vue.component(CollapseTransition.name, CollapseTransition)