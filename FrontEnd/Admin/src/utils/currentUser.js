// import api from "../Utils/axios.js";

// const currentUser = async () => {
//   try {
//     const res = await api.get("/currentUser", {
//       withCredentials: true,
//     });

//     return res.data?.user || null;
//   } catch (error) {
//     // 401 = not logged in (normal case)
//     if (error?.response?.status !== 401) {
//       console.error("currentUser error:", error);
//     }
//     return null;
//   }
// };

// export default currentUser;
