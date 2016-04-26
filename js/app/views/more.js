define([
    'logger',
    'backbone',
    'underscore',
    'hbars!templates/more'
], function(Logger, Backbone, _, template) {
    var LOG = new Logger({
        module: 'view',
        prefix: 'MORE VIEW'
    });

    var MoreView = Backbone.View.extend({
        el: "#more",
        template: template,

        events: {
            'click #more-new': 'getNewerTweets',
            'click #more-old': 'getOlderTweets',
        },

        initialize: function(options) {
            LOG.debug('Initializing more view');
            var instance = this;
            instance.listenTo(options.eventbus, 'auth:success', instance.render);
        },

        render: function() {
            var view = this;
            LOG.debug('rendering more view');
            LOG.debug('view', view);
            view.$el.html(view.template({}));
        },

        getOlderTweets: function(e) {
            e.preventDefault();
            var view = this;
            console.log('clicked #more-old');
            this.collection.fetch({count: 200, max_id: view.collection.minId});
        },

        getNewerTweets: function(e) {
            e.preventDefault();
            var view = this;
            console.log('clicked #more-new');
            this.collection.fetch({count: 200, since_id: view.collection.maxId});
        }
    });

    return MoreView;
});
