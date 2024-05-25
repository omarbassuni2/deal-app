import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import {
  AuthorizationGuard,
  Roles,
} from 'src/authorization/authorization.guard';
import { AdCreationDto } from './dto/ads.dto';
import { AdsService } from './ads.service';
import { RoleEnum } from 'src/users/dto/user.dto';
import { Types } from 'mongoose';
import { ApiBearerAuth } from '@nestjs/swagger';
import { PaginationQuery } from 'src/lib/dto/pagination.dto';

@Controller('ads')
@ApiBearerAuth()
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
  getSingleAd(@Param('_id') _id: string) {
    return this.adsService.getSingleAd({ _id });
  }
  @Get()
  getAds() {
    return this.adsService.getAds();
  }
  @Get('matching/:_id')
  async getMatchingProperties(
    @Param('_id') id: string,
    @Query() paginationQuery: PaginationQuery,
  ) {
    const { page, limit } = paginationQuery;
    return this.adsService.getMatchingProperties(id, page, limit);
  }
}
