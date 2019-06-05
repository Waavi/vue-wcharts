module.exports = {
    title: 'vue-wcharts | Waavi',
    description: 'Vue-wcharts is a library makes it easy to create your own charts. You can easily create reuseable chart components. Used a basic chart or customize the chart using props and slots of charts.',
    dest: 'dist',
    head: [
        ['link', { rel: 'icon', href: '/icons/favicon-32x32.png' }],
        ['link', { rel: 'manifest', href: '/manifest.json' }],
        ['meta', { name: 'theme-color', content: '#3fc4c7' }],
        ['meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }],
        ['meta', { name: 'apple-mobile-web-app-status-bar-style', content: 'black' }],
        ['link', { rel: 'apple-touch-icon', href: '/icons/apple-touch-icon-152x152.png' }],
        [
            'meta',
            { name: 'msapplication-TileImage', content: '/icons/msapplication-icon-144x144.png' }
        ],
        ['meta', { name: 'msapplication-TileColor', content: '#000000' }]
    ],
    themeConfig: {
        logo: '/logo.png',
        repo: 'waavi/vue-wcharts',
        nav: [
            { text: 'Home', link: '/' },
            { text: 'Guide', link: '/guide/' },
            { text: 'Api', link: '/api/charts' },
            { text: 'Examples', link: 'https://vue-wcharts.waavi.com/examples' },
        ],
        sidebar: {
            '/guide/': [
                ['', 'Introduction'],
                ['getting-started', 'Getting Started'],
                ['feedback', 'Feedback'],
                ['license', 'License'],
            ],
            '/api/': [
                ['charts', 'Charts'],
                ['components', 'Components'],
                ['widgets', 'Widgets'],
                ['transitions', 'Transitions'],
            ],
        },
    }
};
