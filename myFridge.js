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

  });
}
