export interface IGoogleStrategy {
  id: string;
  provider: string;
  email: string;
  verified_email: boolean;
  name: string;
  picture?: string;
}
