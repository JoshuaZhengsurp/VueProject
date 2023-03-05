Vue中得使用结构
<tabs defaultActiveKey="1" callback="">
    <tab label="tab1" key="1">
        <div>内容1</div>
    </tab>
    <tab label="tab2" key="2">
        <div>内容2</div>
    </tab>
    <tab label="tab3" key="3">
        <div>内容3</div>
    </tab>
</tabs>

// 插槽

浏览器的渲染结构
<div>
    <ul>
        <li>tab1</li>
        <li>tab2</li>
        <li>tab3</li>
    </ul>
    <div>内容1</div>
    <div>内容2</div>
    <div>内容3</div>
</div>

全局组件调用