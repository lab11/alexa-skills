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
var APP_ID = undefined; //replace with "amzn1.talkback-sdk-ams.app.[your-unique-value-here]";

/**
 * The AlexaSkill prototype and helper functions
 */
var AlexaSkill = require('./AlexaSkill');

/**
 * Talkback is a child of AlexaSkill.
 * To read more about inheritance in JavaScript, see the link below.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Introduction_to_Object-Oriented_JavaScript#Inheritance
 */
var Talkback = function () {
    AlexaSkill.call(this, APP_ID);
};

// Extend AlexaSkill
Talkback.prototype = Object.create(AlexaSkill.prototype);
Talkback.prototype.constructor = Talkback;

Talkback.prototype.eventHandlers.onSessionStarted = function (sessionStartedRequest, session) {
    //console.log("Talkback onSessionStarted requestId: " + sessionStartedRequest.requestId
    //    + ", sessionId: " + session.sessionId);
    console.log("***Talkback session started***");
    // any initialization logic goes here
};

Talkback.prototype.eventHandlers.onLaunch = function (launchRequest, session, response) {
    //console.log("Talkback onLaunch requestId: " + launchRequest.requestId + ", sessionId: " + session.sessionId);
    console.log("***Talkback launched***");
    var speechOutput = "Ready";
    response.ask(speechOutput);
};

Talkback.prototype.eventHandlers.onSessionEnded = function (sessionEndedRequest, session) {
    //console.log("Talkback onSessionEnded requestId: " + sessionEndedRequest.requestId
    //    + ", sessionId: " + session.sessionId);
    console.log("***Talkback session ended***");
    // any cleanup logic goes here
};

Talkback.prototype.intentHandlers = {
    // register custom intent handlers
    TalkbackIntent: function (intent, session, response) {
        console.log("***TalkbackIntent***");
        console.log("***%j***", intent);
        var words = intent.slots.words.value;
        response.tellWithCard(words, "Talkback", words);
    },
    HelpIntent: function (intent, session, response) {
        console.log("***HelpIntent***");
        response.ask("Shut up Josh!");
    }
};

// Create the handler that responds to the Alexa Request.
exports.handler = function (event, context) {
    // Create an instance of the Talkback skill.
    var talkback = new Talkback();
    talkback.execute(event, context);
};

