import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SigninDto, SignupDto } from './dto/auth.dto';

@Controller('api/auth')
export class AuthController {
  constructor(private service: AuthService) {}
  @Post('signup')
  signup(@Body() data: SignupDto) {
    return this.service.signup(data);
  }

  @Post('signin')
  signin(@Body() data: SigninDto) {
    return this.service.signin(data);
  }
}
