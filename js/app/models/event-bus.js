define(['backbone', 'underscore'], function(Backbone, _) {
    var EventBus = _.clone(Backbone.Events);

    EventBus.register = function(prefix, other) {
        EventBus.listenTo(other, 'all', function(eventName) {
            // Re-trigger the event for anyone that might be listening.
            var args = Array.prototype.slice.call(arguments);
            var modifiedArgs = [prefix + ':' + eventName].concat(args.slice(1));
            // console.log('%cEVENT BUS "%s:%s"', 'background-color: #DEF5FF; color:gray', prefix, eventName, modifiedArgs);
            EventBus.trigger.apply(EventBus, modifiedArgs);
        });
    };
    return EventBus;
});
