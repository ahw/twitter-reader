define([
    'logger',
    'backbone',
    'underscore',
    'hbars!templates/grid'
], function(Logger, Backbone, _, template) {
    var LOG = new Logger({
        module: 'view',
        prefix: 'GRID VIEW'
    });

    var GridView = Backbone.View.extend({
        el: "#grid",
        template: template,

        events: {
            'click .tweet-img': 'viewTweetText'
        },

        initialize: function(options) {
            var view = this;
            view.listenTo(options.eventbus, 'tweets:fetched', view.render);
            view.listenTo(view.collection, 'remove', view.render);
            options.eventbus.register('grid', view);
        },

        render: function() {
            LOG.debug('rendering grid view');
            var context = {
                tweets: this.collection.models
            };

            var html = this.template(context);
            this.$el.html(html);
        },

        viewTweetText: function(e) {
            e.preventDefault();
            var view = this;
            var container = $(e.currentTarget).closest('.tweet-square');
            if (!_.isUndefined(view.lastClicked)) {
                view.lastClicked.removeClass('hero');
            }
            view.lastClicked = container;
            view.lastClicked.addClass('hero');

            var id = container.data('id');
            LOG.debug('Adding tweet with id ' + id + ' to hero tweets collection', view.collection.get(id));
            view.trigger('click', view.collection.get(id));
        }
    });

    return GridView;
});
