module.exports = {

    friendlyName: 'Update',
    description: 'Update a patient by ID.',
  
    inputs: {
      id: {
        type: 'string',
        required: true,
        description: 'The ID of the patient to update.'
      },
      name: {
        type: 'string',
        required: false,
        description: 'Updated name of the patient.'
      },
      age: {
        type: 'number',
        required: false,
        description: 'Updated age of the patient.'
      },
      contact: {
        type: 'string',
        required: false,
        description: 'Updated contact of the patient.'
      },
      gender: {
        type: 'string',
        required: false,
        description: 'Updated gender of the patient.'
      }
    },
  
    exits: {
      success: {
        description: 'Patient updated successfully.',
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
        const updatedPatient = await Patient.updateOne({ id: inputs.id })
          .set({
            name: inputs.name,
            age: inputs.age,
            contact: inputs.contact,
            gender:inputs.gender
          });
  
        if (!updatedPatient) {
          return exits.notFound({ error: 'Patient not found.' });
        }
  
        return exits.success({ message: 'Patient updated successfully.', patient: updatedPatient });
      } catch (err) {
        return exits.serverError({ error: err.message });
      }
    }
  };
  