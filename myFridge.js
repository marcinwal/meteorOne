Products = new Mongo.Collection('products');

if (Meteor.isClient) {
  // counter starts at 0
  // Session.setDefault('counter', 0);
  Template.fridge.helpers({
    products: function(){
      return Products.find({place: 'fridge'});
    }   
  });

  Template.productList.helpers({
    products: function(){
      return Products.find({place: 'supermarket'});
    }
  });  

  Template.fridge.rendered = function(){
    var templateInstance = this;

    templateInstance.$('#fridge').droppable({
      drop: function(evt,ui){
        var query = {_id: ui.draggable.data('id')};
        var changes = {$set: {place: 'fridge'} };
        Products.update(query,changes);
      }
    });
  };

  Template.productList.rendered = function(){
    var templateInstance = this;

    templateInstance.$('#supermarket').droppable({
      drop: function(evt,ui){
        var query = {_id: ui.draggable.data('id')};
        var changes = {$set: {place: 'supermarket'} };
        Products.update(query,changes);
      }
    });
  };

  Template.productListItem.rendered = function(){
    var templateInstance = this;

    templateInstance.$('.draggable').draggable({
      cursor: 'move',
      helper: 'clone'
    });
  };

}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  Products.remove({});
  Products.insert({
    name: 'Milk',
    img: '/milk.png',
    place: 'fridge'
  });  

  Products.insert({
    name: 'Bread',
    img: '/bread.png',
    place: 'supermarket'
  });

  Products.insert({
    name: 'Juice',
    img: '/juice.png',
    place: 'supermarket'
  });

  Products.insert({
    name: 'banana',
    img: '/banana.png',
    place: 'supermarket'
  });

  });
}
