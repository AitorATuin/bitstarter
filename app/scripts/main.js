require.config({
    baseUrl: './js',
    paths: {
        jquery: 'components/jquery/jquery',
        'bootstrap-css': 'components/bootstrap-css/js/bootstrap',
        'jquery-knob': 'components/jquery-knob/js/jquery.knob'
    },
    shim: {
        'bootstrap-css': {
            deps: [
                'jquery'
            ],
            exports: 'jquery'
        },
        'jquery-knobs': {
            deps: ['jquery']
        }
    }
});

require(['app', 'jquery', 'bootstrap-css', 'jquery-knob'], function (app, $) {
    'use strict';
    // use app here
    console.log(app);
    console.log('Running jQuery %s', $().jquery);
});
