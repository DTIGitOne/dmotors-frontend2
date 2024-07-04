import { elastic } from "react-burger-menu";
import axiosInstance from "./axios"

export const findCars = async (searchVehicle) => {
  try {
     const lowerCaseSearchVehicle = Object.fromEntries(
        Object.entries(searchVehicle).map(([key, value]) => [key, typeof value === 'string' ? value.toLowerCase() : value])
     );

     const queryString = Object.keys(lowerCaseSearchVehicle)
        .map(key => `${key}=${encodeURIComponent(lowerCaseSearchVehicle[key])}`)
        .join('&');

     const response = await axiosInstance.get(`/cars/search?${queryString}`);
     console.log('Cars found:', response.data);
     return response.data.cars; 
  } catch (error) {
     console.error('Error finding cars:', error.response ? error.response.data : error.message);
     throw error; 
  }
};

export const sendImage = async (formData , token , id) => {
   try {
      const response = await axiosInstance.patch(`/users/profile/update/${id}`, formData, {headers: {
         'Content-Type': 'multipart/form-data',
         'authorization': `Bearer ${token}`, 
      },});
      return response.data;
   } catch (e) {
      console.log('Error uploading image:', e);
   }
};

export const getChats = async (id , token) => {
   try {
      const response = await axiosInstance.get(`/messages/getchat/${id}`, {headers: {
         'authorization': `Bearer ${token}`, 
      },});
      return response;
   } catch (e) {
      console.log('Error uploading image:', e);
   }
};

export const getRecommended = async (token) => {
   try {
      const config = token ? { 
         headers: {
            'authorization': `Bearer ${token}`,
         } 
      } : {};

      const response = await axiosInstance.get("/cars/get/recommended", config);
      return response.data.recommendedCars;
   } catch (e) {
      console.log("error getting recommended", e);
   }
}

export const createChat = async (id , token) => {
   try {
      const response = await axiosInstance.post(
         `/messages/createchat/${id}`,
         {},
         {
            headers: {
               'authorization': `Bearer ${token}`
            }
         }
      );

      return response;

   } catch (e) {
      console.log(e);
   }
}

export const AdminUsers = async (page, token) => {
   try {
      const response = await axiosInstance.get(`/admin/users?page=${page}&limit=10`, {
         headers: {
            Authorization: `Bearer ${token}`
         }
      });

      return response;
   } catch(e) {
      return e.response
   }
}

export const getUser = async (id) => {
   try {
      const response = await axiosInstance.get(`/users/${id}`)

      return response
   } catch(e) {
      console.log(e.response);
      return  e.resonse
   }
}

export const createReviewCall = async (id, inputReview, rating, token) => {
   try {
      const data = {
         ReviewMessage: inputReview,
         rating: rating,
      }
      const response = await axiosInstance.post(`/users/create-review/${id}`, data, {
         headers: {
            'authorization': `Bearer ${token}`, 
         },
      });

      return response;
   } catch(e) {
      console.log(e);
      return e.response;
   }
}

export const forgotpassword = async (email) => {
   try {
      const response = await axiosInstance.post('/users/forgot-password' , {
         email: email,
      });

      return response
   } catch(e) {
      console.log(e.response);
      return e.response
   }
}

export const updateUser = async (id, username, newPassword, password , token) => {
   try {
      const data = {};
      if (username) data.username = username;
      if (password) data.password = password;
      if (newPassword) data.newPassword = newPassword;

      const response = await axiosInstance.patch(`/users/update/${id}`, data, {
         headers: {
            'authorization': `Bearer ${token}`, 
         },
      });

      return response;
   } catch (e) {
      console.log(e);
      return e.response
   }
};

export const deleteUser = async (id , token) => {
   try {
      const response = await axiosInstance.delete(`/users/delete/${id}`, {headers: {
         'authorization': `Bearer ${token}`, 
      },});
      return response;
   } catch (e) {
      return e.response;
      console.log('Error getting user:', e.response);
   }
};

export const loginUser = async (username , email , password) => {
   try {
      const response = await axiosInstance.post('/users/login', {
         username: username,
         email: email,
         password: password
      });

      return response;
   } catch(e) {
      console.log('Error logging user:', e.response);
      return e.response;
   }
}

export const signupUser = async (name, surname, username, email, password) => {
   try {
      const response = await axiosInstance.post('/users/signup', {
         name: name,
         surname: surname,
         username: username,
         email: email,
         password: password
      });

      return response;
   } catch (e) {
      console.log('Error creating user:', e.response);
      return e.response;
   }
};

export const resendCode = async (id) => {
   try {
      const response = await axiosInstance.get(`/users/resend-verify-code/${id}`);

      return response;
   } catch(e) {
      console.log(e.response);
      return e.response;
   } 
}

export const verifyGmail = async (id , code) => {
   try {
      const response = await axiosInstance.post(`/users/verify-gmail/${id}`, {
         code: code,
      });

      return response;
   } catch(e) {
      console.log(e.response);
      return e.response;
   } 
}

export const getReviews = async () => {
   try {
      const response = await axiosInstance.get(`users/reviews`);

      return response;
   } catch(e) {
      console.log(e.resonse);
      return e.response;
   }
}

export const checkToken = async (id , token) => {
   try {
      const response = await axiosInstance.get(`/users/${id}`, {headers: {
         'authorization': `Bearer ${token}`, 
      },});
      return response.data;
   } catch (e) {
      console.log('Error getting user:', e.response.data);
   }
};

export const sendCarData = async (formData, token) => {
   try {
      const response = await axiosInstance.post("/cars/create", formData, {
         headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${token}`, 
         }
      });
      return response;
   } catch (error) {
      console.log(error.response.data);
   }
};