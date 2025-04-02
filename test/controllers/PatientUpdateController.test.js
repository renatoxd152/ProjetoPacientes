const sinon = require('sinon');
const chai = require('chai');
const expect = chai.expect;
const Sails = require('sails').Sails;
const updatePatient = require('../../api/controllers/api/v1/patient/update.js');

describe('PatientController.fn (update)', function () {
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

  it('deve atualizar um paciente com sucesso', async function () {
    const mockUpdatedPatient = {
      id: '123',
      name: 'John Doe Updated',
      age: 31,
      contact: 'new-phone',
      gender: 'Male'
    };

    const updateStub = sinon.stub(Patient, 'updateOne')
      .withArgs({ id: '123' })
      .returns({
        set: sinon.stub().resolves(mockUpdatedPatient)
      });

    const result = await new Promise((resolve, reject) => {
      updatePatient.fn({
        id: '123',
        name: 'John Doe Updated',
        age: 31,
        contact: 'new-phone',
        gender: 'Male'
      }, {
        success: resolve,
        notFound: reject,
        serverError: reject
      });
    });

    expect(result).to.deep.equal({
      message: 'Patient updated successfully.',
      patient: mockUpdatedPatient
    });
    expect(updateStub.calledOnce).to.be.true;
  });

  it('deve retornar notFound quando o paciente não existe', async function () {
    const updateStub = sinon.stub(Patient, 'updateOne')
      .withArgs({ id: '999' })
      .returns({
        set: sinon.stub().resolves(null)
      });

    try {
      await new Promise((resolve, reject) => {
        updatePatient.fn({
          id: '999',
          name: 'Non-existent Patient'
        }, {
          success: resolve,
          notFound: (err) => reject(err),
          serverError: reject
        });
      });
      throw new Error('Deveria ter falhado');
    } catch (err) {
      expect(err.error).to.equal('Patient not found.');
      expect(updateStub.calledOnce).to.be.true;
    }
  });

  it('deve retornar serverError em caso de falha no banco de dados', async function () {
    const errorMessage = 'Database connection failed';
    const updateStub = sinon.stub(Patient, 'updateOne')
      .withArgs({ id: '123' })
      .returns({
        set: sinon.stub().rejects(new Error(errorMessage))
      });

    try {
      await new Promise((resolve, reject) => {
        updatePatient.fn({
          id: '123',
          name: 'John Doe'
        }, {
          success: resolve,
          notFound: reject,
          serverError: (err) => reject(err)
        });
      });
      throw new Error('Deveria ter falhado');
    } catch (err) {
      expect(err.error).to.equal(errorMessage);
      expect(updateStub.calledOnce).to.be.true;
    }
  });

  it('deve atualizar apenas os campos fornecidos', async function () {
    const existingPatient = {
      id: '123',
      name: 'John Doe',
      age: 30,
      contact: 'old-phone',
      gender: 'Male'
    };
  
    const updateStub = sinon.stub(Patient, 'updateOne')
      .withArgs({ id: '123' })
      .returns({
        set: sinon.stub().callsFake((updates) => {
          const merged = { ...existingPatient };
          for (const key in updates) {
            if (updates[key] !== undefined) {
              merged[key] = updates[key];
            }
          }
          return Promise.resolve(merged);
        })
      });
  
    const result = await new Promise((resolve, reject) => {
      updatePatient.fn({
        id: '123',
        name: 'John Doe Updated'
      }, {
        success: resolve,
        notFound: reject,
        serverError: reject
      });
    });
  
    expect(result.patient).to.include({
      id: '123',
      name: 'John Doe Updated'
    });
    expect(result.patient.age).to.equal(30);
    expect(result.patient.contact).to.equal('old-phone');
    expect(result.patient.gender).to.equal('Male');
    expect(updateStub.calledOnce).to.be.true;
  });
});