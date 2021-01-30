export default{
    path: '/mine',
    component: ()=> import('@/views/mine'),
    children: [
        {
            path: 'login',
            component: ()=>import('@/components/login')
        },
        {
            path: '',
            redirect: 'login'
        }
        
    ]
}