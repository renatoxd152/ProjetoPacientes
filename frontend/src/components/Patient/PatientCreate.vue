<template>
  <div class="container mt-5">
    
      <div class="d-flex justify-content-center mb-4">
        <h2 class="text-center py-2 px-4 rounded" style="
            background: linear-gradient(135deg, #2ecc71, #3498db);
            color: white;
            font-size: 2rem;
            font-weight: 600;
            letter-spacing: 1px;
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
        ">
          <font-awesome-icon :icon="['fas', 'user-plus']" class="mr-2" />
          Create Patient
        </h2>
      </div>
   
    <form @submit.prevent="createPatient" class="form-group" style="
        max-width: 600px;
        margin: 0 auto;
        padding: 2rem;
        border-radius: 10px;
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
        background: white;
    ">
      <p v-if="message" class="mt-3 alert" :class="{'alert-success': message.includes('created'), 'alert-danger': message.includes('Error')}">{{ message }}</p>
      <div class="mb-3">
        <label for="name" class="form-label" style="
            font-weight: 600;
            color: #2c3e50;
            margin-bottom: 0.5rem;
        ">Name:</label>
        <input v-model="patient.name" id="name" class="form-control" type="text" required style="
            padding: 0.75rem;
            border: 1px solid #ddd;
            border-radius: 6px;
            transition: all 0.3s;
        "/>
      </div>
      <div class="mb-3">
        <label for="age" class="form-label" style="
            font-weight: 600;
            color: #2c3e50;
            margin-bottom: 0.5rem;
        ">Age:</label>
        <input v-model="patient.age" id="age" class="form-control" type="number" required style="
            padding: 0.75rem;
            border: 1px solid #ddd;
            border-radius: 6px;
            transition: all 0.3s;
        "/>
      </div>
      <div class="mb-3">
        <label for="gender" class="form-label" style="
            font-weight: 600;
            color: #2c3e50;
            margin-bottom: 0.5rem;
        ">Gender:</label>
        <input v-model="patient.gender" id="gender" class="form-control" type="text" required style="
            padding: 0.75rem;
            border: 1px solid #ddd;
            border-radius: 6px;
            transition: all 0.3s;
        "/>
      </div>
      <div class="mb-3">
        <label for="contact" class="form-label" style="
            font-weight: 600;
            color: #2c3e50;
            margin-bottom: 0.5rem;
        ">Contact:</label>
        <input v-model="patient.contact" id="contact" class="form-control" type="text" required style="
            padding: 0.75rem;
            border: 1px solid #ddd;
            border-radius: 6px;
            transition: all 0.3s;
        "/>
      </div>
      <button type="submit" class="btn btn-primary" style="
          padding: 0.75rem 2rem;
          font-weight: 600;
          letter-spacing: 0.5px;
          text-transform: uppercase;
          font-size: 0.9rem;
          background: linear-gradient(135deg, #2ecc71, #3498db);
          border: none;
          margin-top: 1rem;
          width: 100%;
      ">Create</button>
    </form>
  </div>
</template>

<script>
import { library } from "@fortawesome/fontawesome-svg-core";
import { faUserPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { usePatienteService } from "../../../app/services/pacient.service.js";
library.add(faUserPlus);
const service = usePatienteService();
export default {
  components: {
    FontAwesomeIcon
  },
  data() {
    return {
      patient: {
        name: '',
        age: null,
        gender: '',
        contact: '',
      },
      message: '',
    };
  },
  methods: {
    async createPatient() {
      service.save(this.patient).then((result)=>
      {
        console.log(result)
        this.message = `Patient created: ${result.name}`;
        this.$emit('patient-created');
      }).catch((error)=>
      {
        this.message = 'Error creating patient';
        console.error(error);
      })
    },
  },
};
</script>

<style scoped>
.form-control:hover {
    border-color: #3498db;
    box-shadow: 0 0 0 0.2rem rgba(52, 152, 219, 0.25);
}

.form-control:focus {
    border-color: #3498db;
    box-shadow: 0 0 0 0.2rem rgba(52, 152, 219, 0.25);
    outline: none;
}

.alert {
    border-radius: 6px;
    padding: 1rem;
    font-weight: 500;
}

.alert-success {
    background-color: #d4edda;
    color: #155724;
    border: 1px solid #c3e6cb;
}

.alert-danger {
    background-color: #f8d7da;
    color: #721c24;
    border: 1px solid #f5c6cb;
}
</style>