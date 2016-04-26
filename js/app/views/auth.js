define([
    'logger',
    'backbone',
    'oauth',
    'hbars!templates/auth'
], function(Logger, Backbone, OAuth, template) {
    var LOG = new Logger({
        module: 'auth',
        prefix: 'AUTH VIEW'
    });

    var AuthView = Backbone.View.extend({
        el: "#auth",
        template: template,

        events: {
            'click #popup': 'twitterPopup',
            'click #redirect': 'twitterRedirect'
        },

        initialize: function() {
            this.listenTo(this.model, 'not_authorized', this.render);
            this.listenTo(this.model, 'success', this.hide);
        },

        render: function() {
            var view = this;
            LOG.log('rendering auth view');
            view.$el.html(view.template());
        },

        hide: function() {
            var view = this;
            LOG.log('hiding auth view');
            view.$el.hide();
        },

        twitterRedirect: function(e) {
            var view = this;
            LOG.log('clicked on redirect');
            e.preventDefault();
            view.model.authorize('redirect');
        },

        twitterPopup: function(e) {
            var view = this;
            LOG.log('clicked on popup');
            e.preventDefault();
            view.model.authorize('popup');
        }
    });

    return AuthView;
});
