<template>
  <div class="container mt-5">
    <div class="d-flex justify-content-between align-items-center mb-4">
      <div class="d-flex justify-content-center mb-4">
        <h2 class="text-center py-2 px-4 rounded" style="
            background: linear-gradient(135deg, #3498db, #2ecc71);
            color: white;
            font-size: 2rem;
            font-weight: 600;
            letter-spacing: 1px;
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
            text-transform: uppercase;
        ">
          <font-awesome-icon :icon="['fas', 'user-injured']" class="mr-2" />
          Patient List
        </h2>
      </div>
      <div class="container-mt4">
        <button class="btn btn-success"  @click="downloadCSV">Baixar CSV</button>
        <label for="csvFile" class="btn btn-primary ml-3 m-2">Importar CSV</label>
        <input
          type="file"
          id="csvFile"
          @change="importCSV"
          accept=".csv"
          style="display: none"
        />
      </div>
    </div>
    <table class="table table-bordered">
      <thead class="thead-dark">
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Age</th>
          <th>Gender</th>
          <th>Contact</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="patient in patients" :key="patient.id">
          <td>{{ patient.id }}</td>
          <td>{{ patient.name }}</td>
          <td>{{ patient.age }}</td>
          <td>{{ patient.gender }}</td>
          <td>{{ patient.contact }}</td>
          <td>
            <button @click="editPatient(patient)" class="btn btn-info btn-sm">
              <font-awesome-icon icon="edit" />
            </button>
            <button @click="deletePatient(patient.id)" class="btn btn-danger btn-sm m-3">
              <font-awesome-icon icon="trash" />
            </button>
          </td>
        </tr>
      </tbody>
    </table>

    <PatientModal 
      :show="showModal" 
      :patientToEdit="patientToEdit"
      @update:show="showModal = $event"
      @save="savePatient" 
    />
  </div>
</template>

<script>
import { library } from "@fortawesome/fontawesome-svg-core";
import { faEdit, faTrash, faUserInjured } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { usePatienteService } from "../../../app/services/pacient.service.js";
import PatientModal from "../common/modal/PatientModal.vue";
library.add(faUserInjured);
library.add(faEdit, faTrash);
const service = usePatienteService();
export default {
  components: {
    FontAwesomeIcon,
    PatientModal
  },
  data() {
    return {
      patients: [],
      showModal: false,
      patientToEdit: {}, 
    };
  },
  methods: {
    async fetchPatients() {
      await service.listPatients().then((result)=>
      {
          this.patients = result.patients;
      }).catch((error)=>
      {
        console.error("Error fetching patients:", error);
      })
    },
    editPatient(patient) {
      this.patientToEdit = { ...patient };
      this.showModal = true;
    },
    async deletePatient(id) {
        await service.deletePatiente(id).then(()=>
          {
            this.patients = this.patients.filter(patient => patient.id !== id);
            console.log("APOS DELETAR:",this.patients)
          }
        ).catch((error)=>
      {
        console.error("Erro ao deletar paciente:", error);
      })
    },
    async savePatient(updatedPatient) {
      service.update(updatedPatient).then((result)=>
      {
        const index = this.patients.findIndex(
          (patient) => patient.id === updatedPatient.id
        );
        if (index !== -1) {
          this.patients.splice(index, 1, result.patient);
        }
        console.log("Paciente atualizado:", result.data.patient);
      }).catch((error)=>
      {
        console.error("Erro ao atualizar paciente:", error);
      })
    },
    async downloadCSV() {
      service.downloadCSV().then((result)=>
      {
        console.log("APOS BAIXAR",result)
          const blob = new Blob([result], { type: 'text/csv' });
          const url = window.URL.createObjectURL(blob);

          const link = document.createElement('a');
          link.href = url;
          link.setAttribute('download', 'patients.csv'); 

          document.body.appendChild(link);
          link.click();

          document.body.removeChild(link);
          window.URL.revokeObjectURL(url);
      }).catch((error)=>
      {
        console.error("Erro ao baixar o CSV:", error);
      })
    },
    async importCSV(event) {
      const file = event.target.files[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = async (e) => {
        try {
          const text = e.target.result;
      
          const content = text.replace(/^\uFEFF/, '');
          
          const rows = content.split('\n').filter(row => row.trim() !== '');
          
          const dataRows = rows.slice(1);
          
          const newPatients = dataRows.map(row => {
        
            const cleanedRow = row.replace(/"/g, '');
            const [id, name, age, gender, contact] = cleanedRow.split(';');
            
            if (!id || !name || !age || !gender || !contact) {
              console.warn('Linha ignorada - dados incompletos:', row);
              return null;
            }
            
            return {
              id: id.trim(),
              name: name.trim(),
              age: age.trim(),
              gender: gender.trim(),
              contact: contact.trim()
            };
          }).filter(patient => patient !== null);

          if (newPatients.length === 0) {
            console.warn('Nenhum paciente válido encontrado no arquivo');
            return;
          }

          await service.importcsv(newPatients).then((result) => {
            this.patients = result.patients;
            alert('Pacientes importados com sucesso!');
          }).catch((error) => {
            console.error("Erro ao importar pacientes:", error);
            alert('Erro ao importar pacientes. Verifique o console para detalhes.');
          });
          
        } catch (error) {
          console.error("Erro ao processar o arquivo CSV:", error);
          alert('Erro ao processar o arquivo. Verifique o formato do CSV.');
        } finally {
          event.target.value = '';
    }
  };
  reader.readAsText(file, 'UTF-8');
}
  },
  
  
  mounted() {
    this.fetchPatients();
  },
};
</script>
