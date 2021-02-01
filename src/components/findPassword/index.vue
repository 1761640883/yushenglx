<template>
    <div class="login_body">
        <div class="email">
            <input class="login_text" type="text" placeHolder="请输入邮箱" v-model="email"><button :disabled="disabled" @click="handleToVerify">{{verifyInfo}}</button>
        </div>
        <div>
            <input class="login_text" type="password" placeHolder="请输入新密码" v-model="password">
        </div>
        <div>
            <input class="login_text" type="password" placeHolder="确认密码" v-model="passwordOk">
        </div>
        <div>
            <input class="login_text" type="text" placeHolder="请输入验证码" v-model="verify">
        </div>
        <div class="login_btn">
            <input type="submit" value="修改" @click="handleToFindPassword">
        </div>
        <div class="login_link">
            <router-link to="/mine/login" href="#">立即登录</router-link>
            <router-link to="/mine/register" href="#">立即注册</router-link >
        </div>
    </div>
</template>

<script>
import {messageBox} from '@/components/JS';

export default {
    name: 'findPassword',
    data(){
        return {
            email: '',
            password: '',
            passwordOk: '',
            verify: '',
            disabled: false,
            verifyInfo: '获取验证码'
        }
    },
    methods: {
        handleToVerify(){
            if(this.disabled){
                return;
            }
            this.axios.get('/api2/users/verify?email=' + this.email).then(res=>{
                if(res.data.status === 0){
                    this.disabled = true;
                    this.countDown();
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
            var timer = setInterval(()=>{
                count--;
                this.verifyInfo = `还剩${count}秒`;
                if(count === 0){
                    this.verifyInfo = '获取验证码';
                    this.disabled = false;
                    clearInterval(timer);
                }
            }, 1000)
        },
        handleToFindPassword(){
            if(this.passwordOk !== this.password){
                messageBox({
                    title: '修改密码',
                    content: '两次密码不同',
                    ok: '确定'
                });
                return;
            }
            var _this = this;
            this.axios.post('/api2/users/findPassword', {
                email: this.email,
                password: this.password,
                verify: this.verify
            }).then(res=>{
                if(res.data.status === 0){
                    messageBox({
                        title: '修改密码',
                        content: res.data.msg,
                        ok: '确定',
                        handleOk(){
                            _this.$router.push('/mine/login')
                        }
                    })
                }else{
                    messageBox({
                        title: '修改密码',
                        content: res.data.msg + ',请重新修改',
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