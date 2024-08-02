import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SigninDto, SignupDto } from './dto/auth.dto';

@Controller('api/auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post('signup')
  @HttpCode(201)
  signup(@Body() data: SignupDto) {
    return this.authService.signup(data);
  }

  @Post('signin')
  @HttpCode(200)
  signin(@Body() data: SigninDto) {
    return this.authService.signin(data);
  }
}
