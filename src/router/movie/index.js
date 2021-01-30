export default {
    path: '/movie',
    component: ()=>import('@/views/movie'),
    children: [
        {
            path: 'city',
            component: ()=>import('@/components/city')
        },
        {
            path: 'comingsson',
            component: ()=>import('@/components/comingsson')
        },
        {
            path: 'nowplaying',
            component: ()=>import('@/components/nowplaying')
        },
        {
            path: 'search',
            component: ()=>import('@/components/search')
        },
        {
            path: 'detail/1/:id',
            components: {
                default: ()=>import('@/components/nowplaying'),
                detail: ()=>import('@/views/movie/detail')
            },
            props: {
                detail: true
            }
        },
        {
            path: 'detail/2/:id',
            components: {
                default: ()=>import('@/components/comingsson'),
                detail: ()=>import('@/views/movie/detail')
            },
            props: {
                detail: true
            }
        },
        {
            path: '',
            redirect: 'nowplaying'
        }
    ]
}