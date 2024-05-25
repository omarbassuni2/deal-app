import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { RoleEnum, UserLoginDto, UserSignUpDto } from './dto/user.dto';
import { Public } from 'src/authentication/authentication.guard';
import {
  AuthorizationGuard,
  Roles,
} from 'src/authorization/authorization.guard';
import { ApiBearerAuth } from '@nestjs/swagger';
import { PaginationQuery } from 'src/lib/dto/pagination.dto';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}
  @Public()
  @Post('/signup')
  signUp(@Body() body: UserSignUpDto) {
    return this.userService.signUp(body);
  }

  @Public()
  @Post('/signin')
  signIn(@Body() user: UserLoginDto) {
    // - Implement endpoint for login using phone and password `(password must be secured)`
    return this.userService.signIn(user.phone, user.password);
  }

  @UseGuards(AuthorizationGuard)
  @ApiBearerAuth()
  @Roles(RoleEnum.ADMIN)
  @Get('stats/')
  getUserStats(@Query() paginationQuery: PaginationQuery) {
    const { page, limit } = paginationQuery;
    return this.userService.getUserStats(page, limit);
  }
}
