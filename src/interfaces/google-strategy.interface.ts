export interface IGoogleStrategy {
  uuid: string;
  provider: string;
  providerId: string;
  name: string;
  emails: { value: string }[];
  pictures: { value: string }[];
}
