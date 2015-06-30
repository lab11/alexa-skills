// Alexa SDK for JavaScript v1.0.00
// Copyright (c) 2014-2015 Amazon.com, Inc. or its affiliates. All Rights Reserved. Use is subject to license terms.

/**
 * This simple sample has no external dependencies or session management, and shows the most basic
 * example of how to create a Lambda function for handling Alexa Skill requests.
 *
 * Examples:
 * One-shot model:
 *  User: "Alexa, tell Greeter to say hello"
 *  Alexa: "Hello World!"
 */

/**
 * App ID for the skill
 */
var APP_ID = undefined; //replace with "amzn1.door-sdk-ams.app.[your-unique-value-here]";

/**
 * The AlexaSkill prototype and helper functions
 */
var AlexaSkill = require('./AlexaSkill');

var request = require('request');
var config = require('config');

/**
 * Door is a child of AlexaSkill.
 * To read more about inheritance in JavaScript, see the link below.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Introduction_to_Object-Oriented_JavaScript#Inheritance
 */
var Door = function () {
    AlexaSkill.call(this, APP_ID);
};

// Extend AlexaSkill
Door.prototype = Object.create(AlexaSkill.prototype);
Door.prototype.constructor = Door;

Door.prototype.eventHandlers.onSessionStarted = function (sessionStartedRequest, session) {
    //console.log("Door onSessionStarted requestId: " + sessionStartedRequest.requestId
    //    + ", sessionId: " + session.sessionId);
    console.log("***Door session started***");
    // any initialization logic goes here
};

Door.prototype.eventHandlers.onLaunch = function (launchRequest, session, response) {
    //console.log("Door onLaunch requestId: " + launchRequest.requestId + ", sessionId: " + session.sessionId);
    console.log("***Door launched***");

    // control the door
    /*
    var DOOR4908_IPV6 = '2607:f018:800:10f:c298:e552:5048:d86e';
    var DOOR4908_PORT = 4999;
    var message = new Buffer('unlock4908');
    var client = dgram.createSocket('udp6');
    client.send(message, 0, message.length, DOOR4908_PORT, DOOR4908_IPV6, function(err, bytes) {
        if (err){
            console.log("***Error: %j***");
            throw err;
        }
        client.close();
    });
    */
    console.log(request);
    request.post(config.accessors_address, function(error, http_resp, body) {
        if (!error && http_resp.statusCode == 200) {
            response.tell("");
        } else {
            if (error) console.log("***ERROR: " + error);
            console.log("***Response: %j", http_resp);
            console.log("***Body: " + body);
            response.tell("Error!");
        }
    });
};

Door.prototype.eventHandlers.onSessionEnded = function (sessionEndedRequest, session) {
    //console.log("Door onSessionEnded requestId: " + sessionEndedRequest.requestId
    //    + ", sessionId: " + session.sessionId);
    console.log("***Door session ended***");
    // any cleanup logic goes here
};

Door.prototype.intentHandlers = {
    // register custom intent handlers
    /*
    DoorIntent: function (intent, session, response) {
        console.log("***DoorIntent***");
        console.log("***%j***", intent);
        var words = intent.slots.words.value;
        response.tellWithCard(words, "Door", words);
    },
    HelpIntent: function (intent, session, response) {
        console.log("***HelpIntent***");
        response.ask("Shut up Josh!");
    }
    */
};

// Create the handler that responds to the Alexa Request.
exports.handler = function (event, context) {
    // Create an instance of the Door skill.
    var door = new Door();
    door.execute(event, context);
};

