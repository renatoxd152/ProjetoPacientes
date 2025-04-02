const { Parser } = require('json2csv');

module.exports = {
  friendlyName: 'Export CSV',
  description: 'Export patient data as CSV file.',
  inputs: {},
  exits: {
    success: {
      description: 'CSV file successfully generated.',
    },
    serverError: {
      description: 'Something went wrong on the server.',
    },
  },

  fn: async function (inputs, exits) {
    try {
      const patients = await Patient.find();

      if (!patients.length) {
        return exits.success({ message: 'Nenhum dado encontrado' });
      }

      const formattedPatients = patients.map(patient => {
        return {
          'ID': patient.id,
          'Nome': patient.name,
          'Idade': patient.age,
          'Gênero': patient.gender,
          'Contato': patient.contact,
        };
      });

      const fields = ['ID', 'Nome', 'Idade', 'Gênero', 'Contato'];
      
      const json2csvParser = new Parser({
        fields,
        delimiter: ';',
        quote: '"',
        withBOM: true,
        header: true,
        excelStrings: true
      });

      const csv = json2csvParser.parse(formattedPatients);

      this.res.set('Content-Type', 'text/csv; charset=utf-8');
      this.res.set('Content-Disposition', 'attachment; filename="patients.csv"');
      
      return this.res.send(csv);
      
    } catch (err) {
      return exits.serverError({ error: err.message });
    }
  }
};