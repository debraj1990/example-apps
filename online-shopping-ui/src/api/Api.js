
import axios from 'axios'

const apiURl = "http://localhost:8080/api/products";

const Api = {
    addToCart(item, qty) {
        return Promise.resolve({ item, qty })
    },
    loadCart(user) {
        return Promise.resolve()
    },
    loadProducts(type, size) {
        return axios.get(apiURl,{headers:{'Authorization':'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1YzdlNWU0OGQwMWMyMTM1Nzk3OGM4MjMiLCJyb2xlIjoiQURNSU4iLCJpYXQiOjE1NTIwMjE1MzgsImV4cCI6MTU1MjEwNzkzOH0.0s389vRuEPHMONs3TCBXxjsNAptLUqNP6sDJaasSsrU'}})
    },
    loadReviews(productId, size) {
        return axios.get(apiURl + `/${productId}/reviews`)
    },
    postReview(productId, review) {
        return axios
            .post(apiURl + `/${productId}/reviews`, review)
    }

}

export default Api;