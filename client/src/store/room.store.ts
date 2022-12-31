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
        socket: io('ws://localhost:9001', {
            autoConnect: false
        }),
        // Room
        room: null as Room | null,
    }),
    actions: {
        // Create a room
        createRoom(username: string): Promise<any> {
            // Create a room
            return new Promise((resolve, reject) => {
                axios.post('/room/create', {
                    username: username
                }).then((response) => {
                    resolve(response.data)
                }).catch((error) => {
                    reject(error)
                })
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
        startGame(room_id: string, user_id: string, id_twitter_users: string[]) {
            this.socket.emit('start_game', {
                room_id: room_id,
                user_id: user_id,
                id_twitter_users: id_twitter_users,
                nb_max_round: 5,
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
        // Next Round
        nextRound(room_id: string, user_id: string) {
            this.socket.emit('next_round', {
                room_id: room_id,
                user_id: user_id
            })
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
    tweet: any
    id_twitter_user_response: string
    id_twitter_user_propositions: string[]
    twitter_users_profiles: Record<string, any>
    player_responses: Record<string, string>
}

