import { API } from "../../backend";
import { isAuthenticated } from '../../auth/helper/index'

const { token, user } = isAuthenticated();

export const createOrder = (_userId, _token, orderData) => {
    return fetch(`${API}order/create/${user._id}`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ order: orderData })
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
}
