Meteor.publish("chatrooms",function(){
    return ChatRooms.find({});
});

Meteor.publish("messages", function () {
return Messages.find({}, {sort: {ts: -1}});
});