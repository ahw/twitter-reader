requirejs.config({
    // By default load any module ids from js/lib
    baseUrl: 'js/lib',

    // Except, if the module id starts with "app", load it from the js/app
    // directory. The paths config is relative to the baseUrl, and never
    // includes a ".js" extension since the paths config could be for a
    // directory.
    paths: {
        app: '../app',
        templates: '../../templates',
        Handlebars: 'Handlebars',
        samples: '../../samples'
    },

    shim: {
        Handlebars: { exports: 'Handlebars' }
    }
});

// Start the main app logic
requirejs(['app/twitter-reader'], function(reader) {
    console.log('app has started');
});
