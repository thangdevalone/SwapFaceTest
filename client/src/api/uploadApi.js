
import axiosClient from "./axiosClient"

const uploadApi = {
    upload(formData) {
        const url = `/upload`
        return axiosClient.post(url, formData, {
            headers: {
              // Authorization: `Bearer ${getLocalStorageToken()}`,
              "Content-Type": 'multipart/form-data',
            },
          })
    },

}
export default uploadApi;