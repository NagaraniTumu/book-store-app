export interface Book {
  id: string;
  title: string;
  subtitle: string;
  publisher: string;
  description: string;
  authors: string[];
  pageCount: number;
  rating: number;
  thumbnail: string;
  language: string;
  price: number;
  currencyCode: string;
}

export interface BillingInfo {
  fullName: string;
  email: string;
  phoneNumber: string;
  address: string;
}

export interface Collection {
  bookInfo: Book;
  billingInfo: BillingInfo;
}
