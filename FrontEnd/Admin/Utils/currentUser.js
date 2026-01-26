import api from "../Utils/axios.js";

async function currentUser(params) {
  try {
    const response = await api.get("/currentUser", { withCredentials: true });
    return response.data;
  } catch (error) {
    console.log("Error fetching current user:", error);
  }
}
export default currentUser;
