define([
    'logger',
    'backbone',
    'underscore',
], function(Logger, Backbone, _) {
    var LOG = new Logger({
        module: 'model',
        prefix: 'HERO TWEETS'
    });

    var HeroTweetCollection = Backbone.Collection.extend({

        initialize: function(models, options) {
            var instance = this;
            options.eventbus.on('grid:click', function(model) {
                LOG.debug('Handling grid click event from event bus', model);
                instance.add(model, {at: 0, sort: false});
            });
        }

    });

    return HeroTweetCollection;
});
