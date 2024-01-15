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

  async getAll(): Promise<UserEntity[]> {
    return this.userRepository.find();
  }

  async getCurrent(user: UserEntity): Promise<UserEntity> {
    return this.userRepository.findOneBy({ id: user.id });
  }

  async signUp(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    const { username, password } = authCredentialsDto;

    const salt = await bcrypt.genSalt(9);
    const hashedPass = await bcrypt.hash(password, salt);

    const user = this.userRepository.create({
      username,
      password: hashedPass,
    });

    try {
      await this.userRepository.save(user);
    } catch (error) {
      if (error.code == 23505)
        throw new ConflictException('Username is already taken');
      else throw new InternalServerErrorException();
    }
  }

  async signIn(authCredentialsDto: AuthCredentialsDto): Promise<AuthResultDto> {
    const { username, password } = authCredentialsDto;
    const user: UserEntity = await this.userRepository.findOneBy({ username });

    if (user && (await bcrypt.compare(password, user.password))) {
      const payload: JwtPayload = { username };
      const accessToken: string = await this.jwtService.sign(payload);

      return { message: 'success', accessToken };
    } else throw new UnauthorizedException('Wrong username or password');
  }

  async signOut(): Promise<void> {
    return;
  }
}
