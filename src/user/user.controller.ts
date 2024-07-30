import { Controller, Delete, Get, Request, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('api/users')
export class UserController {
  constructor(private userService: UserService) {}

  @UseGuards(AuthGuard)
  @Get('me')
  getUser(@Request() req) {
    return this.userService.getUser(req.user);
  }

  @UseGuards(AuthGuard)
  @Delete('me')
  deleteMe(@Request() req) {
    console.log('delete route');
    return this.userService.deleteMe(req.user.id);
  }
}
