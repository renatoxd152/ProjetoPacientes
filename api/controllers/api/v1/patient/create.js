module.exports = {


  friendlyName: 'Create',
  description: 'Create patient.',

  inputs: {
    patient: {
			type: 'ref',
			required: true
		}
  },

  exits: {
    success: {},
    serverError:{}
  },


  fn: async function (inputs, exits) {

    try {
      const patient = inputs.patient;
      const newPatient = await Patient.create(patient).fetch();
      return exits.success(newPatient);
    } catch (err) {
      return exits.serverError({ error: err.message });
    }

  }


};
