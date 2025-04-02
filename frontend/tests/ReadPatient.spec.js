import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { mount } from '@vue/test-utils';
import PatientModal from '../src/components/common/modal/PatientModal.vue';
import PatienteRead from '../src/components/Patient/PatienteRead.vue';

jest.mock('../app/services/pacient.service.js', () => {
  const mockService = {
    listPatients: jest.fn().mockResolvedValue({
      patients: [
        { id: 1, name: 'John Doe', age: 30, gender: 'Male', contact: '1234567890' },
        { id: 2, name: 'Jane Smith', age: 25, gender: 'Female', contact: '9876543210' }
      ]
    }),
    deletePatiente: jest.fn().mockResolvedValue({}),
    update: jest.fn().mockResolvedValue({}),
    downloadCSV: jest.fn().mockResolvedValue(""),
    importcsv: jest.fn().mockResolvedValue({})
  };
  
  return {
    usePatienteService: jest.fn(() => mockService)
  };
});

describe('PatientRead.vue', () => {
  let wrapper;
  let mockService;

  beforeEach(async () => {
    const { usePatienteService } = require('../app/services/pacient.service.js');
    mockService = usePatienteService();
    
    wrapper = mount(PatienteRead, {
      global: {
        components: {
          FontAwesomeIcon,
          PatientModal
        },
        provide: {
          service: mockService
        }
      }
    });
    
    await new Promise(resolve => setTimeout(resolve, 0));
    await wrapper.vm.$nextTick();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('fetches and displays patients list', async () => {
    expect(mockService.listPatients).toHaveBeenCalled();
    
    const rows = wrapper.findAll('tbody tr');
    expect(rows.length).toBe(2);
    
    expect(rows[0].text()).toContain('John Doe');
    expect(rows[1].text()).toContain('Jane Smith');
  });

  it('deletes a patient when delete button is clicked', async () => {
    await wrapper.vm.$nextTick();
    
    const deleteButtons = wrapper.findAll('.btn-danger');
    expect(deleteButtons.length).toBeGreaterThan(0);
    
    await deleteButtons[0].trigger('click');

    await wrapper.vm.$nextTick();
    
    expect(mockService.deletePatiente).toHaveBeenCalledWith(1);
  });

  it('opens edit modal when edit button is clicked', async () => {

    await wrapper.vm.$nextTick();
    
    const editButtons = wrapper.findAll('.btn-info');
    expect(editButtons.length).toBeGreaterThan(0);
    
    await editButtons[0].trigger('click');
    
    expect(wrapper.vm.showModal).toBe(true);
    expect(wrapper.vm.patientToEdit.id).toBe(1);
  });
});