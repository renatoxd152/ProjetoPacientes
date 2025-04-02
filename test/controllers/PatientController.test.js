const sinon = require('sinon');
const chai = require('chai');
const expect = chai.expect;
const Sails = require('sails').Sails;
const createPatient = require('../../api/controllers/api/v1/patient/create.js');

describe('PatientController.fn', function () {
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

  it('deve criar um paciente com sucesso', async function () {
    const mockPatient = {
      name: 'John Doe',
      age: 30,
      gender: 'Male',
      contact: '1234567890'
    };

    const stub = sinon.stub(Patient, 'create').callsFake(() => ({
      fetch: sinon.stub().resolves(mockPatient)
    }));

    const result = await new Promise((resolve, reject) => {
      createPatient.fn({ patient: mockPatient }, {
        success: resolve,
        serverError: reject
      });
    });

    expect(result).to.deep.equal(mockPatient);
    expect(stub.calledOnce).to.be.true;
  });

  it('deve retornar erro ao tentar criar paciente', async function () {
    const errorMessage = 'Database error';
    const stub = sinon.stub(Patient, 'create').throws(new Error(errorMessage));

    try {
      await new Promise((resolve, reject) => {
        createPatient.fn({ patient: {} }, {
          success: resolve,
          serverError: (err) => reject(err)
        });
      });
      throw new Error('Deveria ter falhado');
    } catch (err) {
      expect(err.error).to.equal(errorMessage);
    }

    expect(stub.calledOnce).to.be.true;
  });
});