export type HotelType = {
  _id: string;
  name: string;
  userId?: string;
  city: string;
  country: string;
  description: string;
  type: string;
  adultCount: number;
  childCount: number;
  facilities: string[];
  pricePerNight: number;
  starRating: number;
  imageUrls: string[];
  lastUpdated: Date;
  bookings: BookingType[];
};

export type HotelSearchResponse = {
  data: HotelType[];
  pagination: {
    total: number;
    page: number;
    pages: number;
  };
};

export type BookingType = {
  _id: string;
  userId: string;
  firstName: string;
  lastName: string;
  adultCount: number;
  childCount: number;
  email: string;
  checkIn: Date;
  checkOut: Date;
  totalCost: number;
};

export type UserType = {
  _id: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
};

export type PaymentIntentResponse = {
  clientSecret: string;
  paymentIntentId: string;
  totalCost: number;
};
