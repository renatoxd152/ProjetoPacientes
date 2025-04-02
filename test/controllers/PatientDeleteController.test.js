const sinon = require('sinon');
const chai = require('chai');
const expect = chai.expect;
const Sails = require('sails').Sails;
const deletePatient = require('../../api/controllers/api/v1/patient/delete.js');

describe('PatientController.fn (delete)', function () {
  let sails;
  let Patient;

  before(async function () {
    sails = new Sails();
    await new Promise((resolve, reject) => {
      sails.lift({}, (err) => {
        if (err) return reject(err);
        Patient = sails.models.patient;
        resolve();
      });
    });
  });

  after(async function () {
    await new Promise((resolve) => sails.lower(resolve));
  });

  afterEach(() => {
    sinon.restore();
  });

  it('deve deletar um paciente com sucesso', async function () {
    const mockDeletedPatient = { id: '123', name: 'John Doe' };
    const stub = sinon.stub(Patient, 'destroyOne').resolves(mockDeletedPatient);

    const result = await new Promise((resolve, reject) => {
      deletePatient.fn(
        { id: '123' },
        { success: resolve, notFound: reject, serverError: reject }
      );
    });

    expect(result).to.deep.equal({ message: 'Patient deleted successfully.' });
    expect(stub.calledOnce).to.be.true;
  });

  it('deve retornar "notFound" se o paciente não existir', async function () {
    const stub = sinon.stub(Patient, 'destroyOne').resolves(null);

    try {
      await new Promise((resolve, reject) => {
        deletePatient.fn(
          { id: '999' },
          { success: resolve, notFound: (err) => reject(err), serverError: reject }
        );
      });
      throw new Error('Deveria ter falhado (paciente não existe)');
    } catch (err) {
      expect(err.error).to.equal('Patient not found.');
      expect(stub.calledOnce).to.be.true;
    }
  });

  it('deve retornar "serverError" em caso de falha no banco', async function () {
    const errorMessage = 'Database connection failed';
    const stub = sinon.stub(Patient, 'destroyOne').rejects(new Error(errorMessage));

    try {
      await new Promise((resolve, reject) => {
        deletePatient.fn(
          { id: '123' },
          { success: resolve, notFound: reject, serverError: (err) => reject(err) }
        );
      });
      throw new Error('Deveria ter falhado (erro no banco)');
    } catch (err) {
      expect(err.error).to.equal(errorMessage);
      expect(stub.calledOnce).to.be.true;
    }
  });
});