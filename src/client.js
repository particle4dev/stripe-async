if(Meteor.isClient){
    // @reference:
    //      http://stackoverflow.com/questions/12820953/asynchronous-script-loading-callback
    //      http://www.jspatterns.com/the-ridiculous-case-of-adding-a-script-element/
    //      http://stackoverflow.com/questions/12113412/dynamically-inject-javascript-file-why-do-most-examples-append-to-head
    var isStripeReady = false;
    var _stripeReadyCallbacks = [];
    var callback = function(){};
    var loadLength = 0;
    function async() {
        // if it's a function, the last argument is the result callback,
        var args = Array.prototype.slice.call(arguments, 0);
        if (args.length && typeof args[args.length - 1] === "function")
            callback = args.pop();

        var html = document.getElementsByTagName('head')[0];
        var s = html.lastChild;

        _.each(args, function(src){
            if(!_.isString(src))
                throw new Error('script src must be a string');

            var o = document.createElement('script');
            o.src = '//' + src;
            if (callback) { o.addEventListener('load', function (e) {
                loadLength++;
                if(loadLength == args.length)
                    callback();
            }, false); }
            html.insertBefore(o, s);
        });
    }
    withStripe = function(callback){
        var self = this;
        if (isStripeReady) {
            callback(Stripe);
        } else {
            _stripeReadyCallbacks.push(callback);
        }
    };

    async('js.stripe.com/v1/', 'checkout.stripe.com/checkout.js', function() {
        isStripeReady = true;
        // drain queue of pending callbacks
        _.each(_stripeReadyCallbacks, function (c) {
            c(Stripe);
        });
    });
    /**
    withStripe(function (Stripe) {
        Stripe.card.createToken({
            number: '4242424242424242',
            cvc: '123',
            exp_month: 12,
            exp_year: 2015
        }, function(err, res){
            if (err) {
                console.log(err, 'Stripe.card.createToken');
                console.log(res);
                Meteor.call('stripeCreateCharges', res, function(err, res){
                    console.log(err, res);
                });
                return;
            }
        });
    });
    
    Meteor.startup(function () {
    });
    */
    //var loader = document.createElement('script');
    //loader.src = "https://js.stripe.com/v1/";
    //var head = document.getElementsByTagName('head')[0];
    //head.insertBefore(loader, head.firstChild);
    //Meteor.startup(function () {
        //setPublishableKey();
    //});
    //var setPublishableKey = function(){
        //if(_.isUndefined(Stripe) || !Stripe)
            //Meteor.setTimeout(setPublishableKey, 50);
        //else {
            //console.log(Stripe.card);
            //Stripe.setPublishableKey('pk_test_j8agRwQNiD20ZW3embUYE4X9');
        //}
    //}
}