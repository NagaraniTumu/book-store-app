export interface Book {
  kind: string;
  id: string;
  etag: string;
  selfLink: string;
  volumeInfo: VolumeInfo;
  saleInfo: SalesInfo;
  accessInfo: AccessInfo;
  searchInfo: SearchInfo;
}

interface VolumeInfo {
  title: string;
  subtitle: string;
  authors: string[];
  publisher: string;
  publishedDate: string;
  description: string;
  industryIdentifiers: IndustryIdentifiers[];
  readingModes: {
    text: boolean;
    image: boolean;
  };
  pageCount: number;
  printType: string;
  categories: string[];
  maturityRating: string;
  allowAnonLogging: boolean;
  contentVersion: string;
  panelizationSummary: {
    containsEpubBubbles: boolean;
    containsImageBubbles: boolean;
  };
  imageLinks: {
    smallThumbnail: string;
    thumbnail: string;
  };
  language: string;
  previewLink: string;
  infoLink: string;
  canonicalVolumeLink: string;
}

interface IndustryIdentifiers {
  type: string;
  identifier: string;
}

interface SalesInfo {
  country: string;
  saleability: string;
  isEbook: boolean;
  listPrice: {
    amount: number;
    currencyCode: string;
  };
  retailPrice: {
    amount: number;
    currencyCode: string;
  };
  buyLink: string;
  offers: Offers[];
}

interface Offers {
  finskyOfferType: number;
  listPrice: OfferPrice;
  retailPrice: OfferPrice;
}

interface OfferPrice {
  amountInMicros: number;
  currencyCode: string;
}

interface AccessInfo {
  country: string;
  viewability: string;
  embeddable: boolean;
  publicDomain: boolean;
  textToSpeechPermission: string;
  epub: {
    isAvailable: boolean;
    acsTokenLink: string;
  };
  pdf: {
    isAvailable: boolean;
    acsTokenLink: string;
  };
  webReaderLink: string;
  accessViewStatus: string;
  quoteSharingAllowed: boolean;
}

interface SearchInfo {
  textSnippet: string;
}
