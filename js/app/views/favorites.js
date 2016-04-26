define([
    'logger',
    'backbone',
    'underscore',
    'hbars!templates/favorites'
], function(Logger, Backbone, _, template) {
    var LOG = new Logger({
        module: 'view',
        prefix: 'FAVORITES VIEW'
    });

    var FavoritesView = Backbone.View.extend({
        el: '#favorites',
        $absolutes: $('#favorites-absolute'),
        $relatives: $('#favorites-relative'),
        template: template,
        renderedOnce: false,

        initialize: function(options) {
            LOG.debug("Initializing favorites view");
            var view = this;
            view.listenTo(options.eventbus, 'tweets:fetched', view.render);
        },

        render: function() {
            var view = this;
            LOG.debug('rendering favorites view');
            var html = view.template({tweets: view.collection.models.slice(0, 10)});
            view.$absolutes.html(html);
        }

    });
    return FavoritesView;

});
