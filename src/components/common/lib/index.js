import tree from './Tree';
const plug = {
    install(Vue){
        Vue.component(tree.name, tree)
    }
}
export default plug;