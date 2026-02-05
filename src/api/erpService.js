import api from "./axios";

const erpService = {
    login(data){
        return api.post("/erp/login",data)
    },

    checkSession() {
        return api.get("/erp/check-session")
    },

    logout() {
        return api.post("/erp/logout")
    },

    getAllRequests(params={}){
        return api.get("/erp/requests",{params})
    },

    createAdmin(data){
        return api.post("/erp/create-admin",data)
    },

    getAdmins(params={}){
        return api.get("/erp/admins",{params})
    },

    deleteAdmin(adminId){
    return api.delete(`/erp/admins/${adminId}`)
    },

    getJobByJobId(jobId) {
  return api.get(`/erp/job/${jobId}`);
}



}


export default erpService