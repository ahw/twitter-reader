define([
    'logger',
    'backbone',
    'underscore',
    'hbars!templates/hashtags'
], function(Logger, Backbone, _, template) {
    var LOG = new Logger({
        module: 'view',
        prefix: 'HASHTAGS VIEW'
    });

    var HashtagsView = Backbone.View.extend({
        el: '#hashtags',
        template: template,
        events: {
            // 'mouseover .hashtag': 'interact',
            'click .hashtag': 'interact'
        },

        initialize: function(options) {
            LOG.debug("Initializing hashtags view");
            var view = this;
            view.eventbus = options.eventbus;
            view.eventbus.register('hashtagsview', view);
            view.listenTo(view.eventbus, 'tweets:fetched', view.render);
        },

        render: function() {
            var view = this;
            LOG.debug('rendering hashtgs view');
            var html = view.template({hashtags: view.collection.models});
            view.$el.html(html);
            view.delegateEvents();
        },

        interact: function(e) {
           var view = this;
           console.log(e);
           var hashtagId = $(e.currentTarget).data('id');
           var tweetIds = view.collection.get(hashtagId).get('tweet_ids');
           view.trigger(e.type, hashtagId, tweetIds);
        }

    });
    return HashtagsView;

});
