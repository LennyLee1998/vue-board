export type PlayerType = 'X' | 'O' | null
export type Player = Exclude<PlayerType, null>
export type BoardType = PlayerType[]
export type GameHistory = BoardType[]
