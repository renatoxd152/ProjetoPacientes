module.exports = {

  friendlyName: 'List',
  description: 'List all patients.',

  exits: {
    success: {
      description: 'Patients listed successfully.'
    },
    serverError: {
      description: 'Unexpected error occurred.',
    },
  },

  fn: async function (inputs, exits) {

    try {
      const patients = await Patient.find();
      return exits.success({ patients });
    } catch (err) {
      return exits.serverError({ error: err.message });
    }

  }

};
