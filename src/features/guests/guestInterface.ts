export interface Guest {
  id: number;
  name: string;
  attend: string;
  gender: 'girl' | 'boy';
  createdAt: Date;
  updatedAt: Date;
}
