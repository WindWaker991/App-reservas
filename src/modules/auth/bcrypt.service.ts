import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class BcryptService {
  async encriptarContrasena(contrasena: string): Promise<string> {
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const contrasenaEncriptada = await bcrypt.hash(contrasena, salt);
    return contrasenaEncriptada;
  }

  async verificarContrasena(contrasena: string, contrasenaEncriptada: string): Promise<boolean> {
    return await bcrypt.compare(contrasena, contrasenaEncriptada);
  }
}
