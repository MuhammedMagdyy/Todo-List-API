export interface IGoogleStrategy {
  uuid: string;
  provider: string;
  providerId: string;
  name: string;
  email?: string;
  picture?: string;
}
