import axios from 'axios';
import Swal from "sweetalert2";

export function verifyPasswordRequest(id, oldPassword) {
    console.log("old_password", oldPassword);
    console.log("id", id);
    return axios.post(
      `http://localhost:8000/users/verify_password/${id}`,
      { old_password: oldPassword },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
  }

  export function changePasswordRequest(id, newPassword) {
    return axios.put(
      `http://localhost:8000/users/change_password/${id}`,
      { new_password: newPassword },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
  }

  export function updateProfileRequest(id, data) {
  return axios.put(
    `http://localhost:8000/users/update-profile/${id}`,
    data,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  );
}
