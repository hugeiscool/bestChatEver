Accounts.ui.config({
   passwordSignupFields: 'USERNAME_ONLY'
});

Deps.autorun(function(){
    Meteor.subscribe("rooms");
    Meteor.subscribe("messages");
    Session.setDefault("roomname", "Meteor");
});

if(Meteor.isClient){
  Template.input.events({
    'click .sendMsg': function(e) {
       _sendMessage();
    },
    'keyup #msg': function(e) {
      if (e.type == "keyup" && e.which == 13) {
        _sendMessage();
      }
    }
  });

  _sendMessage = function() {
    var message = document.getElementById("msg");
    Messages.insert({user: Meteor.user().username, text: message.value, room: Session.get("roomname")});
    message.value = "";
    message.focus();
  };
}

Template.rooms.events({
    'click li': function(e) {
      Session.set("roomname", e.target.innerText);
    }
  });

Template.messages.helpers({
    messages: function() {
      return Messages.find({room: Session.get("roomname")}, {sort: {ts: -1}});
    },
  roomname: function() {
      return Session.get("roomname");
    }
  });

  
  Template.rooms.helpers({
    rooms: function() {
      return Rooms.find();
    }
  });
  
  Template.room.helpers({
  roomstyle: function() {
      return Session.equals("roomname", this.roomname) ? "font-weight: bold" : "";
    }
  });

  Template.chat.helpers({
    release: function() {
      return Meteor.release;
    }
  });
  