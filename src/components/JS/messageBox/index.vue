<template>
    <div class="messageBox">
        <h3>{{title}}</h3>
        <p>{{content}}</p>
        <div>
            <div @click="handleOk">{{ok}}</div>
            <div @click="handleCancel" v-if="cancel">{{cancel}}</div>
        </div>
    </div>    
</template>

<script>
export default {
    name: 'messageBox'
}
</script>

<style scoped>
.messageBox{width: 200px;height: 140px;border-radius: 5px;border: 1px solid black;background: white;position: absolute;top: 50%;left: 50%;margin: -70px 0 0 -100px;z-index: 100;}
.messageBox h3{font-size: 18px;text-align: center;line-height: 50px;}
.messageBox p{text-align: center;}
.messageBox>div{width: 100%;height: 30px;border-top: 1px solid black;display: flex;position: absolute;bottom: 0;}
.messageBox>div div{flex: 1;text-align: center;line-height: 30px;}
.messageBox>div div:nth-child(2){border-left: 1px solid black;}
</style>