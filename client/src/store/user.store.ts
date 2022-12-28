import { defineStore } from 'pinia'

// Store
export const useUser = defineStore('user', {
    state: () => ({
        // Actual User
        user: null as User | null,
    })
})

// Interface
export interface User {
    _id: string
    username: string
    url_pp: string
    nb_won_game: number
}
