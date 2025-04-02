module.exports = {


  friendlyName: 'Hi from api',
  description: 'Hello from api',

  inputs: {

  },

  exits: {
    success: {},
  },


  fn: async function (inputs, exits) {
    return exits.success({msg: "Hello!!!"});

  }


};
