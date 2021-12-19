export interface OnlinePlayer {
	username: string;
	score: number;
}

export type RegisteredOnlinePlayers = Record<string, OnlinePlayer>;
