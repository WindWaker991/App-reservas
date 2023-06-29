import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { AuthService } from "./auth.service";
import { ExtractJwt, Strategy } from "passport-jwt";
import { Request } from 'express';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        private authService: AuthService
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromExtractors([
                JwtStrategy.extractJWTFromCookie,
            ]),
            ignoreExpiration: true,
            secretOrKey: process.env.JWT_SECRET
        })
    }

    private static extractJWTFromCookie(req: Request): string | null {
        if (req.cookies && req.cookies.access_token) {
            return req.cookies.access_token;
        }
        return null;
    }

    async validate(payload: any) {
        return await this.authService.validate(payload);
    }
}