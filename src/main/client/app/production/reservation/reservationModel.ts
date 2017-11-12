export interface Reservation {
  id: string
  firstName: string
  lastName: string
  email: string
  city: string
  comment: string
  seats: Array<string>
  prices: Array<ReservationPrice>
}

export interface ReservationPrice {
  price: string
  count: number
}

export interface ReservationCreation {
  firstName: string
  lastName: string
  email: string
  city: string
  comment: string
  seats: Array<string>
  prices: Array<ReservationPrice>
}