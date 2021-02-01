<template>
    <div class="login_body">
        <div class="email">
            <input class="login_text" type="email" placeHolder="请输入邮箱" v-model="email"><button :disabled="disabled" @click="handleToVerify">{{verifyInfo}}</button>
        </div>
        <div>
            <input class="login_text" type="text" placeHolder="请输入用户名" v-model="text">
        </div>
        <div>
            <input class="login_text" type="password" placeHolder="请输入密码" v-model="password">
        </div>
        <div>
            <input class="login_text" type="password" placeHolder="确认密码" v-model="passwordOk">
        </div>
        <div>
            <input class="login_text" type="text" placeHolder="请输入验证码" v-model="verify">
        </div>
        <div class="login_btn">
            <input type="submit" value="注册" @click="handleToRgister">
        </div>
        <div class="login_link">
            <router-link to="/mine/login" href="#">立即登录</router-link>
            <router-link to="/mine/findPassword" href="#">找回密码</router-link >
        </div>
    </div>
</template>

<script>
import {messageBox} from '@/components/JS'

export default {
    name: 'register',
    data(){
        return {
            email: '',
            text: '',
            password: '',
            passwordOk: '',
            verify: '',
            istime: false,
            verifyInfo: '获取验证码',
            disabled: false
        }
    },
    methods: {
        handleToVerify(){
            if(this.istime){
                return;
            }
            this.axios.get('/api2/users/verify?email=' + this.email).then(res=>{
                if(res.data.status === 0){
                    this.countDown()
                    messageBox({
                        title: '验证码',
                        content: res.data.msg,
                        ok: '确定'
                    })
                }else{
                    messageBox({
                        title: '验证码',
                        content: res.data.msg,
                        ok: '确定'
                    })
                }
                
            })
        },
        countDown(){
            var count = 60;
            this.disabled = true;
            var timer = setInterval(()=>{
                count--;
                this.verifyInfo = `剩余${count}秒`
                if(count === 0){
                    this.disabled = false;
                    this.verifyInfo = '获取验证码'
                    clearInterval(timer);
                }
            }, 1000)
        },
        handleToRgister(){
            var _this = this;
            if(this.passwordOk !== this.password){
                messageBox({
                    title: '密码',
                    content: '两次密码不一样',
                    ok: '确定'
                })
                return;
            }
            this.axios.post('/api2/users/register', {
                username: this.text,
                password: this.password,
                email: this.email,
                verify: this.verify
            }).then(res=>{
                if(res.data.status === 0){
                    messageBox({
                        title: '注册',
                        content: res.data.msg,
                        ok: '确定',
                        handleOk(){
                            _this.$router.push('/mine/login')
                        }
                    })
                }else{
                    messageBox({
                        title: '注册',
                        content: res.data.msg + ',请重新注册',
                        ok: '确定'
                    })
                }
            })
        }
    }
}
</script>

<style scoped>
#content .login_body{  width:100%;}
.login_body .email{position: relative;}
.login_body .email button{width: 80px;height: 30px;border-radius: 4px;border: none;outline: none;position: absolute;right: 10px;top: 5px;background: rgb(199, 199, 199);color: white;}
.login_body .login_text{ width:100%; height: 40px; border:none; border-bottom: 1px #ccc solid; margin-bottom: 5px; outline: none; text-indent: 10px;}
.login_body .login_btn{ height:50px; margin:10px;}
.login_body .login_btn input{ width:100%; height:100%; background:#e54847; border-radius: 3px; border:none; display: block; color:white; font-size: 20px;}
.login_body .login_link{ display: flex; justify-content:space-between;}
.login_body .login_link a{ text-decoration: none; margin:0 5px; font-size: 12px; color:#e54847;}
</style>