import { defineStore } from 'pinia'

// Import the User interface
import { User } from './user.store'

// Socket.io
import { io } from 'socket.io-client'

// Axios
import axios from 'axios'

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
        // Create a room
        createRoom(username: string) {
            // Create a room
            axios.post('/room/create', {
                username: username
            }).then((response) => {
                console.log(response.data)
                // Join the room
                this.joinRoom(response.data.room_id, response.data.user._id)
            })
        },
        // Join a room
        joinRoom(room_id: string, user_id: string) {
            this.socket.emit('join_room', {
                room_id: room_id,
                user_id: user_id
            })
        },
        // Start the game
        startGame(room_id: string, user_id: string) {
            this.socket.emit('start_game', {
                room_id: room_id,
                user_id: user_id
            })
        },
        // Answer a round
        answerRound(room_id: string, user_id: string, answer: string) {
            this.socket.emit('answer_round', {
                room_id: room_id,
                user_id: user_id,
                answer: answer
            })
        },
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

