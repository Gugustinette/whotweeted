import { defineStore } from 'pinia'

// Import the User interface
import { User } from './user.store'

// Socket.io
import { io } from 'socket.io-client'

// Store
export const useRoom = defineStore('room', {
    state: () => ({
        // Socket.io
        socket: io('ws://localhost:9001'),
        // Master of the room
        master: null as User | null,
        // Players in the room
        players: null as User[] | null
    }),
    actions: {
        // Set the master of the room
        setMaster(master: User) {
            this.master = master
        }
    },
})

// Interface
export interface Room {
    _id: string
    master: User
    players: User[]
    scores: Record<string, number>
    actual_round: Round
    rounds: Round[]
    id_twitter_users: string[]
    mode: string
    status: string
    nb_max_round: number
}
export interface Round {
    id_tweet: string
    id_twitter_user_response: string
    id_twitter_user_propositions: string[]
    player_responses: Record<string, string>
}

