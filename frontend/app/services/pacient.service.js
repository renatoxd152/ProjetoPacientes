import { httpClient } from '../http';
const apiResource = "/api/v1/patient";
export const usePatienteService = () =>
{
    const save = async(patientToSave)=>
    {
        try {
            const response = await httpClient.post(`${apiResource}/create`, { patient: patientToSave });
            return response.data;
        } catch (error) {
          console.error("Erro ao salvar paciente:", error);
        }
    }
    const deletePatiente = async(id) =>
    {
      try {
        await httpClient.delete(`${apiResource}/delete`, {
          data: { id:id } 
        });
        return true;

        
      } catch (error) {
        console.error("Erro ao deletar paciente:", error);
      }
    }

    const listPatients = async() =>
    {
      try {
        const response = await httpClient.get(`${apiResource}/read`);
        return response.data;
      } catch (error) {
        console.error("Erro ao deletar paciente:", error);
      }
    }
    const importcsv = async(newPatients) =>
    {
      try {
        const response = await httpClient.post(`${apiResource}/import`, {patients:newPatients});
        return response.data;
      } catch (error) {
        console.error("Erro ao importar pacientes:", error);
      }
    }
    const update = async(patientToEdit) =>
    {
      try {
        const response = await httpClient.put(`${apiResource}/update`,patientToEdit);
        return response.data;
      } catch (error) {
        console.error("Erro ao atualizar paciente:", error);
      }
    }

    const downloadCSV = async() =>
    {
      try {
        const response = await httpClient.get(`${apiResource}/csvdownload`);
        return response.data;
      } catch (error) {
        console.error("Erro ao baixar o CSV:", error);
      }
    }

    
    return{
      deletePatiente,
      listPatients,
      update,
      importcsv,
      save,
      downloadCSV
    }
}