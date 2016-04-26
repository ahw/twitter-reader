define([
    'logger',
    'backbone',
    'underscore'
], function(
    Logger,
    Backbone,
    _
) {
    var LOG = new Logger({
        module: 'model',
        prefix: 'FAVORITE INDEX'
    });

    var FavoriteCountIndex = Backbone.Collection.extend({
        comparator: function(model) {
            return -1 * model.get('favorite_count');
        },

        toString: function() {
            var instance = this;
            var s = "";
            instance.models.each(function(model) {
                s += [
                    model.get('favorite_count'),
                    model.get('id'),
                    model.get('user').screen_name,
                    model.get('text').substring(0, 20) + '...'
                ].join('\t') + '\n';
            });
            return s;
        },

        initialize: function(models, options) {
            var instance = this;

            var blacklistedUsers = ['HereBeHuskies', 'thereaIbanksy'];
            if (options && options.eventbus) {
                instance.listenTo(options.eventbus, 'tweets:add', function(model, collection, opts) {
                    if (!_.contains(blacklistedUsers, model.attributes.user.screen_name)) {
                        instance.add(model);
                    } else {
                        LOG.warn('Ignoring blacklisted user', model.attributes.user.screen_name);
                    }
                });
            }
        }
    });
    return FavoriteCountIndex;
});
