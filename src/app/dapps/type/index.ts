export interface Dapp {
  id: string;
  createdAt: string;
  updatedAt: string;
  name: string;
  shortDescription: string;
  description: string;
  url: string;
  videoThumbnail: any;
  icon: string;
  screenshots: any[];
  rate: any;
  usage: number;
  publishedAt: any;
  verifiedAt: any;
  deleteAt: any;
  status: string;
  category: Category;
}

export interface Category {
  id: string;
  name: string;
}
