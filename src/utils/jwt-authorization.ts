import { sign, verify, decode } from "jsonwebtoken";
require("dotenv").config();

export abstract class JwtAuthorization {
  public static check(token: string): boolean {
    try {
      verify(token, process.env.CHALLENGE_JWT_SECRET || "secret");
      return true;
    } catch (e) {
      return false;
    }
  }

  public static generate(data: { id: string }, expiration?: number): string {
    return sign(
      { id: data.id },
      process.env.CHALLENGE_JWT_SECRET || "secret",
      expiration ? { expiresIn: expiration } : undefined
    );
  }

  public static extractClaims(token: string) {
    try {
      const tokenDecoded = decode(token, { complete: true }) as any;
      return tokenDecoded.payload;
    } catch (err) {
      return null;
    }
  }
}
