<template>
    <div class="box">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
    </div>
</template>

<script>
export default {
    
}
</script>

<style scoped>
.box{width: 140px;height: 40px;margin: 30px auto;display: flex;justify-content: space-between;}
.box div{height:40px;width: 40px;background:  #ef4238;opacity: 0.5;margin-left: -25px;border-radius: 50%;animation: box 1s infinite;}
@keyframes box{
    0%{transform: scale(.4);}
    30%{transform:scale(1);}
    100%{transform: scale(.4);}
}
.box div:nth-child(5){animation-delay: -0.5s;}
.box div:nth-child(4){animation-delay: -0.6s;}
.box div:nth-child(3){animation-delay: -0.7s;}
.box div:nth-child(2){animation-delay: -0.8s;}
.box div:nth-child(1){animation-delay: -0.9s;margin-left: 0;}
</style>