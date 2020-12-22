define([
    'postmonger'
], function (
    Postmonger
) {
    'use strict';

    var connection = new Postmonger.Session();
    var authTokens = {};
    var payload = {};
    $(window).ready(onRender);
    

    connection.on('initActivity', initialize);
    connection.on('requestedTokens', onGetTokens);
    connection.on('requestedEndpoints', onGetEndpoints);

    connection.on('clickedNext', save);
   
    function onRender() {
        // JB will respond the first time 'ready' is called with 'initActivity'
        connection.trigger('ready');
        connection.trigger('requestTokens');
        connection.trigger('requestEndpoints');
        pyData();
    }

    function pyData() {
        console.log("Inside pyData Function...!!");
        
    }

    function initialize(data) {
        console.log(data);
        if (data) {
            payload = data;
        }
        
        var hasInArguments = Boolean(
            payload['arguments'] &&
            payload['arguments'].execute &&
            payload['arguments'].execute.inArguments &&
            payload['arguments'].execute.inArguments.length > 0
        );

        var inArguments = hasInArguments ? payload['arguments'].execute.inArguments : {};

        console.log(inArguments);

        $.each(inArguments, function (index, inArgument) {
            $.each(inArgument, function (key, val) {
                
              
            });
        });

        connection.trigger('updateButton', {
            button: 'next',
            text: 'done',
            visible: true
        });
    }

    function onGetTokens(tokens) {
        console.log(tokens);
        authTokens = tokens;
    }

    function onGetEndpoints(endpoints) {
        console.log(endpoints);
    }

    function save() {
        var postcardURLValue = $('#postcard-url').val();
        var postcardTextValue = $('#postcard-text').val();

        payload['arguments'].execute.inArguments = [{
            "tokens": authTokens,
            "emailAddress": "{{Contact.Attribute.PostcardJourney.EmailAddress}}"
        }];
        
        payload['metaData'].isConfigured = true;

        console.log(payload);
        connection.trigger('updateActivity', payload);
    }


});

// import express JS module into app 
// and creates its variable. 
var express = require('express'); 
var app = express(); 
  
// Creates a server which runs on port 3000 and  
// can be accessed through localhost:3000 
// app.listen(3000, function() { 
//     console.log('server running on port 3000'); 
// } ) 
  
// Function callName() is executed whenever  
// url is of the form localhost:3000/name 
app.get('/', callName); 
  
function callName(req, res) { 
      
    // Use child_process.spawn method from  
    // child_process module and assign it 
    // to variable spawn 
    var spawn = require("child_process").spawn; 
      
    // Parameters passed in spawn - 
    // 1. type_of_script 
    // 2. list containing Path of the script 
    //    and arguments for the script  
      
    // E.g : http://localhost:3000/name?firstname=Mike&lastname=Will 
    // so, first name = Mike and last name = Will 
    var process = spawn('python',["pylib/test.py"] ); 
  
    // Takes stdout data from script which executed 
    // with arguments and send this data to res object 
    process.stdout.on('data', function(data) { 
        res.send(data.toString()); 
    } ) 
} 