const sinon = require('sinon');
const chai = require('chai');
const expect = chai.expect;
const Sails = require('sails').Sails;
const createListPatients = require('../../api/controllers/api/v1/patient/import.js');

describe('PatientController.fn (create-list)', function () {
  let sails;
  let Patient;

  before(async function () {
    this.timeout(5000);
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

  it('deve criar múltiplos pacientes com sucesso', async function () {
    const mockPatients = [
      { name: 'John Doe', age: 30, gender: 'Male', contact: '111111111' },
      { name: 'Jane Smith', age: 25, gender: 'Female', contact: '222222222' }
    ];

    const createEachStub = sinon.stub(Patient, 'createEach').returns({
      fetch: sinon.stub().resolves(mockPatients)
    });

    const result = await new Promise((resolve, reject) => {
      createListPatients.fn({ patients: mockPatients }, {
        success: resolve,
        serverError: reject
      });
    });

    expect(result).to.deep.equal(mockPatients);
    expect(createEachStub.calledOnce).to.be.true;
    expect(createEachStub.calledWith(mockPatients)).to.be.true;
  });

  it('deve retornar erro quando o input não for um array', async function () {
    try {
      await new Promise((resolve, reject) => {
        createListPatients.fn({ patients: { name: 'Invalid' } }, {
          success: resolve,
          serverError: (err) => reject(err)
        });
      });
      throw new Error('Deveria ter falhado');
    } catch (err) {
      expect(err.error).to.equal('Input must be an array of patients');
    }
  });

  it('deve retornar serverError em caso de falha no banco de dados', async function () {
    const errorMessage = 'Database connection failed';
    const mockPatients = [
      { name: 'John Doe', age: 30 }
    ];

    const createEachStub = sinon.stub(Patient, 'createEach').returns({
      fetch: sinon.stub().rejects(new Error(errorMessage))
    });

    try {
      await new Promise((resolve, reject) => {
        createListPatients.fn({ patients: mockPatients }, {
          success: resolve,
          serverError: (err) => reject(err)
        });
      });
      throw new Error('Deveria ter falhado');
    } catch (err) {
      expect(err.error).to.equal(errorMessage);
      expect(createEachStub.calledOnce).to.be.true;
    }
  });

  it('deve lidar corretamente com array vazio', async function () {
    const createEachStub = sinon.stub(Patient, 'createEach').returns({
      fetch: sinon.stub().resolves([])
    });

    const result = await new Promise((resolve, reject) => {
      createListPatients.fn({ patients: [] }, {
        success: resolve,
        serverError: reject
      });
    });

    expect(result).to.deep.equal([]);
    expect(createEachStub.calledOnce).to.be.false;
  });
});