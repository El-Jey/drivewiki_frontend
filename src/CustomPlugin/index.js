import helpers from './helpers'

const CustomPlugin = {
    install(Vue) {
        Vue.prototype.$helpers = helpers;
    }
}

export default CustomPlugin;