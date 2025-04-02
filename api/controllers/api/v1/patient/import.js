module.exports = {

    friendlyName: 'Create List',
    description: 'Create multiple patients.',
  
    inputs: {
        patients: {
            type: 'ref',
            required: true
        }
    },
  
    exits: {
        success: {},
        serverError: {}
    },
  
    fn: async function (inputs, exits) {
        try {
            const patients = inputs.patients;
            
            if (!Array.isArray(patients)) {
                throw new Error('Input must be an array of patients');
            }
            if (patients.length === 0) {
                return exits.success([]);
            }
            const newPatients = await Patient.createEach(patients).fetch();
            return exits.success(newPatients);
        } catch (err) {
            return exits.serverError({ error: err.message });
        }
    }
  
};
