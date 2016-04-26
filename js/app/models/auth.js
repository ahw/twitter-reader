define(['logger', 'backbone', 'oauth', 'cookies'], function(Logger, Backbone, OAuth, Cookies) {
    var LOG = new Logger({
        module: 'model',
        prefix: 'AUTH MODEL'
    });

    var Auth = Backbone.Model.extend({
        initialize: function(options) {
            var model = this;
            model.OAuth = OAuth; // For convenience

            OAuth.initialize('AlNaoL_6Ro5x3AjGitFWGS326eE');
            LOG.log('Initialized OAuth');
            // Assume eventbus is given in constructor
            options.eventbus.register('auth', model); 
        },

        getTwitterAPI: function() {
            var model = this;
            // Try to create the TwitterAPI object from existing tokens.
            window.TwitterAPI = OAuth.create('twitter');

            if (!window.TwitterAPI) {
                LOG.log('TwitterAPI creation failed; setting up callback.');
                // Fire the event so the view can respond.
                LOG.debug('Firing "not_authorized" event');
                model.trigger('not_authorized');

                // Try to run the callback function
                OAuth.callback('twitter', {cache: true}, function(error, result) {
                    if (error) {
                        LOG.error(error);
                    }
                    window.TwitterAPI = result; // TODO: window
                    LOG.log('Initialized window.TwitterAPI');
                    // Fire a success event so the view can respond
                    LOG.debug('Firing "success" event');
                    model.trigger('success');
                });
            } else {
                // Fire a success event so the view can respond
                LOG.log('window.TwitterAPI has been cached', window.TwitterAPI);
                LOG.debug('Firing "success" event');
                model.trigger('success');
            }

        },

        authorize: function(style) {
            var model = this;
            // Default style is redirect
            if (style === 'redirect') {
                OAuth.redirect('twitter', {cache: true}, window.location.toString()); // Back to this URL
            } else {
                OAuth.popup('twitter', function(error, result) {
                    LOG.log('Calling OAuth.popup "twitter"...');
                    if (error) {
                        LOG.error(error);
                    }
                    window.TwitterAPI = result; // TODO: window...
                    LOG.log('Initialized window.TwitterAPI', window.TwitterAPI);
                });
            }
        }
    });
    console.log('auth model has loaded');
    return Auth;
});
