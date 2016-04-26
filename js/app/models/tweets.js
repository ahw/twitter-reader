define([
    'logger',
    'backbone',
    'underscore',
    'qs'
], function(
    Logger,
    Backbone,
    _,
    qs
) {

    var LOG = new Logger({
        module: 'model',
        prefix: 'TWEETS'
    });

    var TweetCollection = Backbone.Collection.extend({

        initialize: function(models, options) {
            var instance = this;
            // Register with the event bus. All events will be caught by the
            // bus and re-triggered for any listeners that care.
            options.eventbus.register('tweets', instance);
            instance.listenTo(options.eventbus, 'auth:success', function() {
                instance.fetch({count: 200});
            });
        },

        comparator: function(model) {
            return -1 * model.get('id');
        },

        fetch: function(options) {
            var collection = this;
            LOG.log('Fetching more models for tweets collection...');
            var method = 'get';
            var resource = 'statuses/home_timeline.json';
            if (options) {
                resource += '?' + qs.format(_.pick(options, 'count', 'since_id', 'max_id'));
            }
            LOG.log('resource', resource);

            // TODO: Place explicit dependency on TwitterAPI
            if (_.isUndefined(window.TwitterAPI)) {
                LOG.error('Could not fetch new Twitter data because window.TwitterAPI is not defined.');
                return;
            }

            var params = qs.parse(window.location.search);
            if (params.mock) {
                return require(['text!samples/response-' + params.mock + '.json'], function(mockData) {
                    LOG.warn('Using mock data');
                    var models = JSON.parse(mockData);
                    LOG.log('Fake request results', models);
                    _.each(models, function(model) {
                        // Format links
                        model.textHtml = model.text.replace(/(https?:\/\/[\S]+)\b/g, '<a href="$1" target="_blank">$1</a>');

                        // Format the date
                        model.createdAtFormatted = Date.create(model.created_at).format('{Dow} {Mon} {ord}, {h}:{mm} {tt}');

                        // Set top favorite
                        if (model.favorite_count > 100) {
                            model.isTopFavorite = true;
                        }

                        // Set top retweet
                        if (model.retweet_count > 20) {
                            model.isTopRetweet = true;
                        }

                        collection.add(model);

                        var id = model.id;
                        if (_.isUndefined(collection.minId) || id < collection.minId) {
                            collection.minId = id;
                        }

                        if (_.isUndefined(collection.maxId) || id > collection.maxId) {
                            collection.maxId = id;
                        }
                    });
                    LOG.log('min id', collection.minId);
                    LOG.log('max id', collection.maxId);
                    collection.trigger('fetched');
                });
            }

            LOG.debug('Requesting real data');
            window.TwitterAPI[method]('https://api.twitter.com/1.1/' + resource).done(function(models) {
                LOG.log('TwitterAPI request results', models);
                _.each(models, function(model) {
                    // Format links
                    model.textHtml = model.text.replace(/(https?:\/\/[\S]+)\b/g, '<a href="$1" target="_blank">$1</a>');

                    // Format the date
                    model.createdAtFormatted = Date.create(model.created_at).format('{Dow} {Mon} {ord}, {h}:{mm} {tt}');

                    // Set top favorite
                    if (model.favorite_count > 100) {
                        model.isTopFavorite = true;
                    }

                    // Set top retweet
                    if (model.retweet_count > 100) {
                        model.isTopRetweet = true;
                    }

                    collection.add(model);

                    var id = model.id;
                    if (_.isUndefined(collection.minId) || id < collection.minId) {
                        collection.minId = id;
                    }

                    if (_.isUndefined(collection.maxId) || id > collection.maxId) {
                        collection.maxId = id;
                    }
                });
                LOG.log('min id', collection.minId);
                LOG.log('max id', collection.maxId);
                collection.trigger('fetched');
            });
        }
    });
    return TweetCollection;
});
