import { defineStore } from 'pinia'

// Axios
import axios from 'axios'

// Store
export const useUser = defineStore('user', {
    state: () => ({
        // Actual User
        user: null as User | null,
    }),
    actions: {
        async createUser(username: string): Promise<User> {
            // Create a new user
            const user = await axios.post('/room/create-user', {
                username: username
            }).then((response) => {
                return response.data
            })

            // Return the user information
            return {
                _id: user._id,
                username: user.username,
                url_pp: user.url_pp,
                nb_won_game: 0,
            };
        }
    }
})

// Interface
export interface User {
    _id: string
    username: string
    url_pp: string
    nb_won_game: number
}
