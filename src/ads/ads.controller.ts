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
@UseGuards(AuthorizationGuard)
@Roles(RoleEnum.AGENT)
export class AdsController {
  constructor(private adsService: AdsService) {}
  @Post()
  createAd(@Body() body: AdCreationDto, @Req() req: any) {
    // - Implement an endpoint for creating ads used by agents only.
    return this.adsService.createAd(body, new Types.ObjectId(req.user._id));
  }
  @Get(':_id')
  getSingleAdd(@Req() req: any, @Param('_id') _id: string) {
    return this.adsService.getSingleAdd({
      ...getQueryWithRespectToAdmin(req),
      _id,
    });
  }
  @Get()
  getAds(@Req() req: any) {
    return this.adsService.getAds(getQueryWithRespectToAdmin(req));
  }
}
