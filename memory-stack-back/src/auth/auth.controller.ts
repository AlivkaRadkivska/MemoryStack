import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { AuthService } from './auth.service';
import { UserEntity } from './user.entity';
import { AuthResultDto } from './dto/auth-result.dto';
import { GetUser } from './get-user.decorator';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  // ? delete
  // @Get()
  // getAllUsers(): Promise<UserEntity[]> {
  //   return this.authService.getAll();
  // }

  @Get('/me')
  @UseGuards(AuthGuard())
  getCurrentUser(@GetUser() user: UserEntity): Promise<UserEntity> {
    return this.authService.getCurrent(user);
  }

  @Post('/signup')
  signUp(@Body() authCredentialsDto: AuthCredentialsDto): Promise<void> {
    return this.authService.signUp(authCredentialsDto);
  }

  @Post('/signin')
  signIn(
    @Body() authCredentialsDto: AuthCredentialsDto,
  ): Promise<AuthResultDto> {
    return this.authService.signIn(authCredentialsDto);
  }

  @Post('/signout')
  signOut(): Promise<void> {
    return this.authService.signOut();
  }
}
