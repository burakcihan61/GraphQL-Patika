"use strict";var _data=require("../../data.json");var EventTR={events:function events(parent,args){return _data.events.filter(function(event){return event.id===parseInt(parent.id)})},// ! users
users:function users(parent,args){return _data.users.filter(function(user){return user.id===parseInt(parent.id)})},// ! participants
participants:function participants(parent,args){return _data.participants.filter(function(participant){return participant.id===parseInt(parent.id)})},// ! locations
locations:function locations(parent,args){return _data.locations.filter(function(location){return location.id===parseInt(parent.id)})}};module.exports=EventTR;