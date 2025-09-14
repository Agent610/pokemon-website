import { baseUrl } from "./api";
import { handleServerResponse } from "./api";

const token = "jwt";

// export const login = ({ email, password }) => {
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       const storedUsers = JSON.parse(localStorage.getItem("mockUsers")) || [];

//       let existingUser = storedUsers.find(
//         (user) => user.email === email && user.password === password
//       );

//       if (!existingUser) {
//         return reject({
//           success: false,
//           message: "Error invalid email or password try again.",
//         });
//       }

//       if (!existingUser._id) {
//         existingUser._id = crypto.randomUUID();
//         localStorage.setItem("mockUsers", JSON.stringify(storedUsers));
//       }

//       resolve({
//         success: true,
//         message: "Login successful",
//         user: {
//           _id: existingUser._id || crypto.randomUUID(),
//           name: existingUser.userName,
//           email: existingUser.email,
//         },
//         token: "mock-jwt-token-" + Math.random().toString(36).substring(2),
//       });
//     }, 1000);
//   });
// };

export const login = ({ email, password }) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const storedUsers = JSON.parse(localStorage.getItem("mockUsers")) || [];

      let existingUser = storedUsers.find(
        (user) => user.email === email && user.password === password
      );

      if (!existingUser) {
        return reject({ message: "Invalid email or password" });
      }

      // ensure _id exists
      if (!existingUser._id) {
        existingUser._id = crypto.randomUUID();
        localStorage.setItem("mockUsers", JSON.stringify(storedUsers));
      }

      resolve({
        user: {
          _id: existingUser._id,
          name: existingUser.userName,
          email: existingUser.email,
        },
        token: "mock-jwt-token",
      });
    }, 500);
  });
};

export const register = ({ email, password, userName }) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const storedUsers = JSON.parse(localStorage.getItem("mockUsers")) || [];

      if (storedUsers.find((user) => user.email === email)) {
        return reject({ message: "User already exists" });
      }

      const newUser = {
        _id: crypto.randomUUID(), // stable id
        email,
        password,
        userName,
      };

      storedUsers.push(newUser);
      localStorage.setItem("mockUsers", JSON.stringify(storedUsers));

      resolve({
        user: {
          _id: newUser._id,
          name: newUser.userName,
          email: newUser.email,
        },
        token: "mock-jwt-token",
      });
    }, 500);
  });
};
// export const register = ({ email, password, userName }) => {
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       if (!email || !password || !userName) {
//         return reject({
//           success: false,
//           message: "All fields are required.",
//         });
//       }

//       const storedUsers = JSON.parse(localStorage.getItem("mockUsers")) || [];

//       const existingUser = storedUsers.find((user) => user.email === email);
//       if (existingUser) {
//         return reject({
//           success: false,
//           message: "User already exists with this email.",
//         });
//       }

//       const newUser = {
//         _id: crypto.randomUUID(),
//         email,
//         password,
//         userName,
//         token: `mock-token-${Date.now()}`,
//       };
//       storedUsers.push(newUser);
//       localStorage.setItem("mockUsers", JSON.stringify(storedUsers));

//       resolve({
//         success: true,
//         message: "Registration successful.",
//         user: {
//           _id: newUser._id,
//           email: newUser.email,
//           userName: newUser.userName,
//         },
//         token: newUser.token,
//       });
//     }, 1000);
//   });
// };

//Token
export const checkToken = (token) => {
  return new Promise((resolve, reject) => {
    if (token === "token") {
      resolve({
        data: { name: "User", email: "noEmail@yahoo.com", _id: "12345" },
      });
    } else {
      reject("Invalid token");
    }
  });
};

export const setToken = (token) => {
  localStorage.setItem("token", token);
};

export const getToken = () => {
  localStorage.getItem("token");
};

export const removeToken = () => {
  localStorage.removeItem("token");
};
