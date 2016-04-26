define([
    'logger',
    'backbone',
    'underscore',
    'hbars!templates/heroes',
    'sugar'
], function(Logger, Backbone, _, template) {
    var LOG = new Logger({
        module: 'view',
        prefix: 'HEROES VIEW'
    });

    var HeroesView = Backbone.View.extend({
        el: "#hero-list",
        template: template,
        renderedOnce: false,
        events: {
        },

        initialize: function(options) {
            var view = this;
            // Note: 'fetched' is a custom-named event.
            this.listenTo(this.collection, 'add', this.render);
            this.listenTo(this.collection, 'remove', this.render);
        },

        render: function(model, collection, options) {
            LOG.debug('rendering hero list view');
            var view = this;

            // Kind of hack. This will often just be a one-element array.
            // Allows us to still use the #each iterator in the template.
            var context = {
                tweets: [model]
            };
            var html = this.template(context);

            if (view.renderedOnce) {
                LOG.debug('just prepending html onto existing hero list view', html);
                view.$el.prepend(html);
            } else {
                LOG.debug('rendering hero list view for first time');
                view.$el.html(html);
            }
            view.renderedOnce = true;
        }
    });

    return HeroesView;
});
