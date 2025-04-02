<template>
    <div v-if="show" class="modal fade show" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" style="display: block;">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Edit Patient</h5>
            <button type="button" class="btn-close" @click="closeModal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="savePatient">
              <div class="mb-3">
                <label for="name" class="form-label">Name</label>
                <input v-model="name" id="name" class="form-control" type="text" required />
              </div>
              <div class="mb-3">
                <label for="age" class="form-label">Age</label>
                <input v-model="age" id="age" class="form-control" type="number" required />
              </div>
              <div class="mb-3">
                <label for="gender" class="form-label">Gender</label>
                <input v-model="gender" id="gender" class="form-control" type="text" required />
              </div>
              <div class="mb-3">
                <label for="contact" class="form-label">Contact</label>
                <input v-model="contact" id="contact" class="form-control" type="text" required />
              </div>
              <button type="submit" class="btn btn-primary">Save Changes</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
export default {
  props: {
    show: {
      type: Boolean,
      required: true,
    },
    patientToEdit: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      id:'',
      name: '',
      age: '',
      gender: '',
      contact: '',
    };
  },
  watch: {
    patientToEdit: {
      handler(newPatient) {
        if (newPatient) {
          this.id = newPatient.id;
          this.name = newPatient.name;
          this.age = newPatient.age;
          this.gender = newPatient.gender;
          this.contact = newPatient.contact;
        }
      },
      immediate: true,
      deep: true,
    },
  },
  methods: {
    closeModal() {
      this.$emit('update:show', false);
    },
    savePatient() {
      const updatedPatient = {
        id: this.id,
        name: this.name,
        age: this.age,
        gender: this.gender,
        contact: this.contact,
      };

      this.$emit('save', updatedPatient);
      this.closeModal();
    },
  },
};
</script>

  
  <style scoped>
  .modal {
    display: block;
    background-color: rgba(0, 0, 0, 0.5);
  }
  </style>
  