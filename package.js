Package.describe({
    summary: "A Meteorite package wrapper for Stripe"
});

// meteor test-packages ./
var both = ['client', 'server'];
var client = ['client'];
var server = ['server'];
Npm.depends({
    "stripe": "2.5.0"
});

Package.on_use(function (api) {
    api.use(['underscore'], both);

    //add files
    api.add_files([
        'src/boot.js',
        'src/helpers.js',
        'src/server.js'
    ], server);
    api.add_files([
        'src/client.js'
    ], client);
    api.add_files([
        'src/exports.js'
    ], both);
    //export
    if (typeof api.export !== 'undefined') {
        api.export('withStripe', client);
        api.export('Stripe', server);
    }
});

Package.on_test(function (api) {
    api.use(['stripe-async', 'tinytest', 'test-helpers'], both);
});