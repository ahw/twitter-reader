define([
    'logger',
    'backbone'
], function(Logger, Backbone) {
    var LOG = new Logger({
        module: 'model',
        prefix: 'HASHTAGS'
    });

    var Hashtags = Backbone.Collection.extend({
        initialize: function(models, options) {
            var instance = this;

            if (options && options.eventbus) {
                options.eventbus.register('hashtags', instance);

                instance.listenTo(options.eventbus, 'tweets:add', function(model, collection, options) {
                    // Only get the "text" property.
                    _.each(model.attributes.entities.hashtags, function(hashtag) {
                        LOG.debug('Adding hashtag:', hashtag);
                        if (instance.get(hashtag.text)) {
                            instance.get(hashtag.text).get('tweet_ids').push(model.get('id'));
                        } else {
                            instance.add({
                                id: hashtag.text,
                                text: hashtag.text,
                                tweet_ids: [model.get('id')]
                            });
                        }
                    });
                });
            }
        }
    });
    return Hashtags;
});
