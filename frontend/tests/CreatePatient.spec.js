import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { mount } from '@vue/test-utils';
import PatientCreate from '../src/components/Patient/PatientCreate.vue';

jest.mock('../app/services/pacient.service', () => ({
  usePatienteService: () => ({
    save: jest.fn().mockResolvedValue({ id: 1 }) 
  })
}))

describe('PatientCreate.vue', () => {
  let wrapper
  let mockService

  beforeEach(() => {
    const { usePatienteService } = require('../app/services/pacient.service.js')
    mockService = usePatienteService()
    
    wrapper = mount(PatientCreate, {
      global: {
        components: {
          FontAwesomeIcon
        }
      }
    })
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

 
  it('renders correctly', () => {
    expect(wrapper.exists()).toBe(true)
    expect(wrapper.find('h2').text()).toContain('Create Patient')
    expect(wrapper.find('form').exists()).toBe(true)
  })

  it('has all required form fields', () => {
    const fields = ['name', 'age', 'gender', 'contact']
    fields.forEach(field => {
      expect(wrapper.find(`#${field}`).exists()).toBe(true)
    })
  })


  it('binds data to form fields', async () => {
    const testData = {
      name: 'John Doe',
      age: 30,
      gender: 'Male',
      contact: '1234567890'
    }

    await wrapper.setData({ patient: testData })

    expect(wrapper.find('#name').element.value).toBe(testData.name)
    expect(wrapper.find('#age').element.value).toBe(testData.age.toString())
    expect(wrapper.find('#gender').element.value).toBe(testData.gender)
    expect(wrapper.find('#contact').element.value).toBe(testData.contact)
  })

  it('mostra mensagem de sucesso quando paciente é criado', async () => {
  
    const testPatient = {
      name: 'João Silva',
      age: 30,
      gender: 'Male',
      contact: '11999999999'
    };
  

    await wrapper.find('#name').setValue(testPatient.name);
    await wrapper.find('#age').setValue(testPatient.age);
    await wrapper.find('#gender').setValue(testPatient.gender);
    await wrapper.find('#contact').setValue(testPatient.contact);
  
    await wrapper.find('form').trigger('submit.prevent');
  
    await wrapper.vm.$nextTick();
    
    expect(wrapper.vm.message).toContain('Patient created:');
    expect(wrapper.find('.alert-success').exists()).toBe(true);
  });


  it('requires all fields', async () => {
    await wrapper.find('form').trigger('submit.prevent')
    
    expect(mockService.save).not.toHaveBeenCalled()
  })
})