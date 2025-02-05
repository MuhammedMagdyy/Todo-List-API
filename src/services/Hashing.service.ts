import { hash, compare } from 'bcryptjs';
import { bcryptSaltRounds } from '../config';

export class HashingService {
  static hash(text: string): Promise<string> {
    return hash(text, Number(bcryptSaltRounds));
  }

  static compare(text: string, hashedText: string): Promise<boolean> {
    return compare(text, hashedText);
  }
}
