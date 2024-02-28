import {
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { AuthGuard, GoogleOAuthGuard } from './user.guard';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(GoogleOAuthGuard)
  @Get('google/login')
  async googleLogin() {
    return 'login';
  }

  @UseGuards(GoogleOAuthGuard)
  @Get('google/redirect')
  async googleRedirect() {
    return 'redirect';
  }

  @UseGuards(AuthGuard)
  @Get()
  async getUserProfile(@Req() req) {
    console.log(req.user);
    return await this.userService.getUserProfile();
  }

  @UseGuards(AuthGuard)
  @Post('like/:id')
  async likeMovie(@Param() params, @Req() req) {
    const user_id = req.user;
    const movie_id = params.id;

    return await this.userService.likeMovie(user_id, movie_id);
  }

  @UseGuards(AuthGuard)
  @Delete('dislike/:id')
  async dislikeMovie(@Param() params, @Req() req) {
    const user_id = req.user;
    const movie_id = params.id;
    return await this.userService.dislikeMovie(user_id, movie_id);
  }
}
