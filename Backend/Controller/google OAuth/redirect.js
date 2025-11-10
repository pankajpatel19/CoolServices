// import dotenv from "dotenv";
// dotenv.config();
// import jwt from "jsonwebtoken";
// import User from "../../Models/User.model.js";
// import axios from "axios";

// const google_client_id = process.env.GOOGLE_CLIENT_ID;
// const google_client_secret = process.env.GOOGLE_CLIENT_SECRET;

// export const redirect = (req, res) => {
//   const authurl = "https://accounts.google.com/o/oauth2/v2/auth";

//   const params = {
//     redirect_uri: "http://localhost:10000/auth/google/callback",
//     client_id: google_client_id,
//     response_type: "code",
//     scope: [
//       "https://www.googleapis.com/auth/userinfo.profile", // Basic profile info
//       "https://www.googleapis.com/auth/userinfo.email", // User's email
//     ].join(" "),
//     prompt: "consent",
//   };

//   const queryString = new URLSearchParams(params).toString();

//   res.redirect(`${authurl}?${queryString}`);
// };

// export const authcheck = async (req, res) => {
//   const code = req.query.code;
//   if (!code) {
//     res.redirect(`http://localhost:5173/login`);
//   }

//   try {
//     // --- Step 1: Temporary 'code' ko 'token' ke liye exchange karna ---
//     const tokenUrl = "https://oauth2.googleapis.com/token";
//     const tokenParams = {
//       code: code,
//       client_id: google_client_id,
//       client_secret: google_client_secret,
//       redirect_uri: `http://localhost:10000/auth/google/callback`,
//       grant_type: "authorization_code",
//     };

//     const tokenResponse = await axios.post(
//       tokenUrl,
//       new URLSearchParams(tokenParams).toString(),
//       {
//         headers: {
//           "Content-Type": "application/x-www-form-urlencoded",
//         },
//       }
//     );

//     const id_token = tokenResponse.data.id_token;

//     const profile = jwt.decode(id_token);

//     if (!profile || !profile.email) {
//       throw new Error("could not fetch profile from the google");
//     }

//     const userEmail = profile.email;

//     let user = await User.findOne({ email: userEmail });

//     if (!user) {
//       user = new User({
//         email: userEmail,
//         userName: profile.name,
//         google_id: profile.sub,
//       });
//       await user.save();
//     } else {
//       throw new Error("User ALready Exists");
//     }

//     const localToken = {
//       id: user._id,
//       email: user.email,
//     };

//     const token = jwt.sign(localToken, process.env.JWT_SECRET, {
//       expiresIn: "1h",
//     });

//     res.redirect(`http://localhost:5173/auth-success?token=${token}`);
//   } catch (error) {
//     console.error("Error during Google OAuth callback:", error.message);
//     res.redirect(`http://localhost:5173/login?error=true`);
//   }
// };
