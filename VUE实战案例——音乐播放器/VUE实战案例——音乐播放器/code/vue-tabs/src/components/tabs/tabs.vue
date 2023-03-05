<script>
import Content from "./content"
export default {
    name:"Tabs",
    data(){
        return{
            showContent:[]
        }
    },
    components:{
        Content
    },
    // props不可以直接被改变
    props:{
        defaultActiveKey:{
            type:String,
            default:"1"
        }
    },
    methods:{
        updateDefaultKey(index){
            this.$emit("callback",index)
        }
    },
    render(){
        return(
            <div>
                <ul class="tabs-header">{ this.$slots.default }</ul>
                <Content showContent={ this.showContent }/>
            </div>
        )
    }
}
</script>

<style scoped>

.tabs-header {
    display: flex;
    list-style: none;
    margin: 0;
    padding: 0;
    border-bottom: 2px solid #ededed;
}

</style>