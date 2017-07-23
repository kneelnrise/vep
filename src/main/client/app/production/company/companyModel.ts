export interface Company {
  id: string
  name: string
  address: string
  isVep: boolean
  content: string
}

export interface CompanyCreation {
  name: string
  address: string
  isVep: boolean
  content: string
}

export interface Show {
  id: string
  title: string
  author: string
  director: string
  content: string
}

export interface ShowCreation {
  title: string
  author: string
  director: string
  content: string
}

export interface PlayCreation {
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