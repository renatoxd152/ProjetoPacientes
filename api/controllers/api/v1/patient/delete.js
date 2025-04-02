module.exports = {

    friendlyName: 'Delete',
    description: 'Delete a patient by ID.',
  
    inputs: {
      id: {
        type: 'string',
        required: true,
        description: 'The ID of the patient to delete.'
      }
    },
  
    exits: {
      success: {
        description: 'Patient deleted successfully.',
      },
      notFound: {
        description: 'No patient found with the specified ID.',
      },
      serverError: {
        description: 'Unexpected error occurred.',
      },
    },
  
    fn: async function (inputs, exits) {
      try {
        const deletedPatient = await Patient.destroyOne({ id: inputs.id });
  
        if (!deletedPatient) {
          return exits.notFound({ error: 'Patient not found.' });
        }
  
        return exits.success({ message: 'Patient deleted successfully.' });
      } catch (err) {
        return exits.serverError({ error: err.message });
      }
    }
  
  };
  