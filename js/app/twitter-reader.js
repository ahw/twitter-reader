requirejs([
    'app/models/hero-tweets',
    'app/models/event-bus',
    'app/models/hashtags',
    'app/models/tweets',
    'app/models/tweets-index-favorite-count',
    'app/models/auth',
    'app/views/more',
    'app/views/grid',
    'app/views/heroes',
    'app/views/favorites',
    'app/views/hashtags',
    'app/views/auth'
], function(
    HeroTweets,
    EventBus,
    HashtagsCollection,
    TweetsCollection,
    FavoriteCountIndex,
    Auth,
    MoreView,
    GridView,
    HeroesView,
    FavoritesView,
    HashtagsView,
    AuthView
) {
    console.log('twitter-reader has started');
    window.smplr = {};
    smplr.auth = new Auth({eventbus: EventBus});
    smplr.tweets = new TweetsCollection([], {eventbus: EventBus});
    smplr.hashtags = new HashtagsCollection([], {eventbus: EventBus});
    smplr.heroTweets = new HeroTweets([], {eventbus: EventBus});
    smplr.favoriteCountIndex = new FavoriteCountIndex([], {eventbus: EventBus});

    var moreView = new MoreView({collection: smplr.tweets, eventbus: EventBus});
    var gridView = new GridView({collection: smplr.tweets, eventbus: EventBus});
    var heroesView = new HeroesView({collection: smplr.heroTweets, evenbus: EventBus});
    var hashtagsView = new HashtagsView({collection: smplr.hashtags, eventbus: EventBus});
    var favoritesView = new FavoritesView({collection: smplr.favoriteCountIndex, eventbus: EventBus});

    var authView = new AuthView({model: smplr.auth});
    smplr.auth.getTwitterAPI(); // Try to get the TwitterAPI object.

    document.body.style.backgroundColor = "white";
});
