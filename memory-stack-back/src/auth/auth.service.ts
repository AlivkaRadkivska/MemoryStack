import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { UserEntity } from './user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './jwt-payload.interface';
import { AuthResultDto } from './dto/auth-result.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private jwtService: JwtService,
  ) {}

  async getCurrent(user: UserEntity): Promise<UserEntity> {
    return await this.userRepository.findOneBy({ id: user.id });
  }

  async getOneByUsername(username: string): Promise<UserEntity | null> {
    return await this.userRepository.findOneBy({ username });
  }

  async signUp(authCredentialsDto: AuthCredentialsDto): Promise<AuthResultDto> {
    const { username, password } = authCredentialsDto;

    const salt = await bcrypt.genSalt(9);
    const hashedPass = await bcrypt.hash(password, salt);

    const user = this.userRepository.create({
      username,
      password: hashedPass,
    });

    try {
      await this.userRepository.save(user);
      const accessToken: string = await this.generateToken(username);

      return {
        user: {
          id: user.id,
          username,
        },
        accessToken,
      };
    } catch (error) {
      if (error.code == 23505)
        throw new ConflictException(['Username is already taken']);
      else throw new InternalServerErrorException();
    }
  }

  async signIn(authCredentialsDto: AuthCredentialsDto): Promise<AuthResultDto> {
    const { username, password } = authCredentialsDto;
    const user: UserEntity = await this.getOneByUsername(username);

    if (user && (await bcrypt.compare(password, user.password))) {
      const accessToken: string = await this.generateToken(username);

      return {
        user: {
          id: user.id,
          username,
        },
        accessToken,
      };
    } else throw new UnauthorizedException(['Wrong username or password']);
  }

  async signOut(): Promise<void> {
    return;
  }

  async generateToken(username: string): Promise<string> {
    const payload: JwtPayload = { username };
    const accessToken: string = await this.jwtService.sign(payload);

    return accessToken;
  }
}
