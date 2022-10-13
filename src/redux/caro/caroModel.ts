
export interface CaroInitModel {
    player1: PlayerModel;
    player2: PlayerModel;
    loading?: boolean
}

export interface PlayerModel {
    name: string;
    result: boolean;
}