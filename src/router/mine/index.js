export default{
    path: '/mine',
    component: ()=> import('@/views/mine'),
    children: [
        {
            path: 'login',
            component: ()=>import('@/components/login')
        },
        {
            path: 'center',
            component: ()=>import('@/views/mine/center.vue')
        },
        {
            path: 'register',
            component: ()=>import('@/components/register')
        },
        {
            path: 'findPassword',
            component: ()=>import('@/components/findPassword')
        },
        {
            path: '',
            redirect: 'center'
        }
        
    ]
}