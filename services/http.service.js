import axios from "axios";

class APIService {
  constructor(baseUrl = "http://localhost:5000/api/") {
    this.baseUrl = baseUrl;
  }

  async getAccount() {
    const endpoint = "user/account";
    return await axios.get(this.baseUrl + endpoint, { withCredentials: true });
  }

  async getRefreshToken() {
    const endpoint = "user/refresh";
    return axios.get(this.baseUrl + endpoint, { withCredentials: true });
  }

  async getRefreshAccessToken() {
    const endpoint = "user/refresh-access";
    return axios.get(this.baseUrl + endpoint, { withCredentials: true });
  }

  async verifyUser(data) {
    const endpoint = "user/verify";
    return await axios.post(this.baseUrl + endpoint, data, {
      withCredentials: true,
    });
  }

  async setSignMessage(account) {
    const endpoint = "user/connect";
    return await axios.post(this.baseUrl + endpoint, account);
  }

  async updateToPremium(data) {
    const endpoint = "user/update-subscription";
    return axios.post(this.baseUrl + endpoint, data, { withCredentials: true });
  }

  async checkSubscription(account) {
    const endpoint = "user/check-subscription";
    return await axios.post(this.baseUrl + endpoint, account);
  }
}

export default new APIService();
