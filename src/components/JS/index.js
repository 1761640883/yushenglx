import Vue from 'vue';
import MessageBox from './messageBox'

export var messageBox = (function(){
    return function(opts){

        var MyComponent = Vue.extend(MessageBox);

        var vm = new MyComponent({
            el: document.createElement('div'),
            data: {
                title: opts.title,
                content: opts.content,
                ok: opts.ok,
                cancel: opts.cancel
            },
            methods: {
                handleOk(){
                    opts.handleOk && opts.handleOk.call(this);
                    document.body.removeChild(vm.$el);                   
                },
                handleCancel(){
                    opts.handleCancel && opts.handleCancel.call(this);
                    document.body.removeChild(vm.$el)
                }
            }
        })

        document.body.appendChild(vm.$el)
    }
})()