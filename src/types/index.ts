import { WINNER_LINES } from '@/constants'
export type PlayerType = 'X' | 'O' | null
export type Player = Exclude<PlayerType, null>
export type BoardType = PlayerType[]
export type GameHistory = BoardType[]
type WinnerLines = typeof WINNER_LINES
// union type of all the tuple types
export type LocType = WinnerLines[number]
