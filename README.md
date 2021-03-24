## Google Assistant Relay Module

This module allows Companion to execute Google Assistant Commands.  
The user is able to type free-text commands to be executed by google assistant. This enables companion to control ANY device that can be controle by google assistant.

## Requirements
This module does not interact directly with the google API. Instead, it only sends command to an assistant relay.  
**It is required that the user has already setup an instance of assistant relay.**

## What is Assistant Relay ?
[Google Assistant Relay](https://github.com/greghesp/assistant-relay) is an awesome open-source project that allows commands to be sent to google assistant via a simple REST API.
For more information about Assistant Relay, including How To Install, and troubleshoot, please reffer to their [github](https://github.com/greghesp/assistant-relay).

## Examples
* Executing Commands: User can simply set a companion button to "Turn on the kitchen lights", and this will be sent to AR, which will execute the action.
* Broadcasting a message: If the user selects the "Broadcast" checkbox, any other Google Assistants connected to the same account will broadcast the message. Example: "Hello family, it is dinner time!"

## Response
AR stores all the responses as .wav files in a folder. Currently, it does not support text responses, so no feedbacks can be configured in companion (yet).