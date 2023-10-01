export interface Book {
  id?: string;
  name: string;
  author: string;
  isbn: string;
  description?: string | undefined;
  photoUrl?: string;
  price?: number;
  amount?: number;
}
