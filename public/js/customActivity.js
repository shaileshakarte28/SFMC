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
      const { spawn } = require('child_process');
      const temperatures = []; // Store readings
    
      const sensor = spawn('python', ['test.py']);
      sensor.stdout.on('data', function(data) {
    
        // convert Buffer object to Float
        temperatures.push(parseFloat(data));
        console.log(temperatures);
    });
        // const spawn = require(["child_process"]).spawn; 
        // const process = spawn('python',["./test.py"] ); 
        // console.log("Inside pyData Function...!!");
        
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


// const spawn = require(['child_process']).spawn;
 
// // const process = spawn('python', ['./test.py',]);
 
// // const { spawn } = require('child_process');
// const process = spawn('python',['--version']);
// process.stdout.on('data',data => {
//     console.log('Test1');
// });

// $(document).ready(function () {
//     $({
//         type: 'POST',
//         url: '/test.py',
//         data: { param: "1" },
//         success: 'true'
//     });
//     console.log('Test!')
//   });

// window.onload = function() {
//     console.log('Test!')
//   }

define(['pythondata'],
function(pythondata){
  'use strict'

  
  const { spawn } = require('child_process');
  const temperatures = []; // Store readings

  const sensor = spawn('python', ['sensor.py']);
  sensor.stdout.on('data', function(data) {

    // convert Buffer object to Float
    temperatures.push(parseFloat(data));
    console.log(temperatures);
});
}
)