import {
  Controller,
  Delete,
  Get,
  Param,
  Request,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('api/user')
export class UserController {
  constructor(private userService: UserService) {}

  @UseGuards(AuthGuard)
  @Get(':username')
  getUser(@Param() param: any, @Request() req) {
    if (param.username !== req.user_payload.username)
      throw new UnauthorizedException();
    return this.userService.getUser(param.username);
  }

  @UseGuards(AuthGuard)
  @Delete(':username')
  deleteUser(@Param() param: any, @Request() req) {
    if (param.username !== req.user_payload.username)
      throw new UnauthorizedException();
    return this.userService.deleteUser(req.user_payload.sub);
  }
}
