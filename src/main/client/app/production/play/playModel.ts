import {Theater} from "../theater/theaterModel";

export interface Play {
  id: string
  theater: Theater
  date: Date
  reservationEndDate: Date
  prices: Array<PlayPrice>
}

export interface PlayCreation {
  theater: string
  date: Date
  reservationEndDate: Date
  prices: Array<PlayPrice>
}

export interface PlayUpdate {
  id: string
  theater: string
  date: Date
  reservationEndDate: Date
  prices: Array<PlayPrice>
}

export interface PlayPrice {
  name: string
  value: number
  condition: string
}

export interface PlayMeta {
  id: string
  date: Date
  show: string
  showId: string
  company: string
}