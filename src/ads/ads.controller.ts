import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import {
  AuthorizationGuard,
  Roles,
} from 'src/authorization/authorization.guard';
import { AdCreationDto } from './dto/ads.dto';
import { AdsService } from './ads.service';
import { RoleEnum, UserAuthInfoDto } from 'src/users/dto/user.dto';
import { Types } from 'mongoose';
import { getQueryWithRespectToAdmin } from 'src/lib/utility';

@Controller('ads')
export class AdsController {
  constructor(private adsService: AdsService) {}
  @Post()
  @UseGuards(AuthorizationGuard)
  @Roles(RoleEnum.AGENT)
  createAd(@Body() body: AdCreationDto, @Req() req: any) {
    // - Implement an endpoint for creating ads used by agents only.
    return this.adsService.createAd(body, new Types.ObjectId(req.user._id));
  }
  @Get(':_id')
  getSingleAdd(@Param('_id') _id: string) {
    return this.adsService.getSingleAdd({ _id });
  }
  @Get()
  getAds() {
    return this.adsService.getAds();
  }
}
