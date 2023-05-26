export interface Image {
  name: string;
  img: {
    data: Buffer;
    contentType: string;
  };
}
