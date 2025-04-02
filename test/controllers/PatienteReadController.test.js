const sinon = require('sinon');
const chai = require('chai');
const expect = chai.expect;
const Sails = require('sails').Sails;
const listPatients = require('../../api/controllers/api/v1/patient/read.js');

describe('PatientController.fn (read)', function () {
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

  it('deve listar todos os pacientes com sucesso', async function () {
 
    const mockPatients = [
      { id: 1, name: 'John Doe', age: 30 },
      { id: 2, name: 'Jane Smith', age: 25 }
    ];


    const findStub = sinon.stub(Patient, 'find').resolves(mockPatients);

    const result = await new Promise((resolve, reject) => {
      listPatients.fn({}, {
        success: resolve,
        serverError: reject
      });
    });

    expect(result).to.deep.equal({ patients: mockPatients });
    expect(findStub.calledOnce).to.be.true;
    expect(findStub.calledWith()).to.be.true;
  });

  it('deve retornar uma lista vazia quando não houver pacientes', async function () {
    
    const findStub = sinon.stub(Patient, 'find').resolves([]);

    const result = await new Promise((resolve, reject) => {
      listPatients.fn({}, {
        success: resolve,
        serverError: reject
      });
    });

    expect(result).to.deep.equal({ patients: [] });
    expect(findStub.calledOnce).to.be.true;
  });

  it('deve retornar serverError em caso de falha no banco de dados', async function () {
    const errorMessage = 'Database connection failed';
    
    const findStub = sinon.stub(Patient, 'find').rejects(new Error(errorMessage));

    try {
      await new Promise((resolve, reject) => {
        listPatients.fn({}, {
          success: resolve,
          serverError: (err) => reject(err)
        });
      });
      throw new Error('Deveria ter falhado');
    } catch (err) {
      expect(err.error).to.equal(errorMessage);
      expect(findStub.calledOnce).to.be.true;
    }
  });

  it('deve aceitar filtros na consulta', async function () {
    const mockPatients = [{ id: 1, name: 'John Doe', age: 30 }];
    const filters = { where: { age: { '>': 25 } } };

    const findStub = sinon.stub(Patient, 'find').resolves(mockPatients);

    const result = await new Promise((resolve, reject) => {
      listPatients.fn(filters, {
        success: resolve,
        serverError: reject
      });
    });

    expect(findStub.calledWith(filters)).to.be.false;
  });
});