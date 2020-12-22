'use strict';

// Deps
var activity = require('./activity');

/*
 * GET home page.
 */
exports.index = function(req, res){
    if( !req.session.token ) {
        res.render( 'index', {
            title: 'Unauthenticated',
            errorMessage: 'This app may only be loaded via Salesforce Marketing Cloud',
        });
    } else {
        alert("Working Fine ");
  
    // Takes stdout data from script which executed 
    // with arguments and send this data to res object 
    // process.stdout.on('data', function(data) { 
    //     res.send(data.toString()); 

        res.render( 'index', {
            title: 'Journey Builder Activity',
            results: activity.logExecuteData,

        });
    }
};

exports.login = function( req, res ) {
    console.log( 'req.body: ', req.body );
    res.redirect( '/' );
};

exports.logout = function( req, res ) {
    req.session.token = '';
};