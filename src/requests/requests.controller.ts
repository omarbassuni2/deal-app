import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import {
  AuthorizationGuard,
  Roles,
} from 'src/authorization/authorization.guard';
import { RequestsService } from './requests.service';
import { RoleEnum } from 'src/users/dto/user.dto';
import { Types } from 'mongoose';
import { RequestCreationDto, RequestUpdateDto } from './dto/requests.dto';
import { getQueryWithRespectToAdmin } from 'src/lib/utility';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('requests')
@ApiBearerAuth()
export class RequestsController {
  constructor(private requestsService: RequestsService) {}
  @Post()
  @UseGuards(AuthorizationGuard)
  @Roles(RoleEnum.CLIENT)
  createRequest(@Body() body: RequestCreationDto, @Req() req: any) {
    // - Implement an endpoint for creating property requests used by clients only.
    return this.requestsService.createRequest(
      body,
      new Types.ObjectId(req.user._id),
    );
  }

  @Put(':_id')
  updateRequest(
    @Body() body: RequestUpdateDto,
    @Param('_id') _id: string,
    @Req() req: any,
  ) {
    const query = { _id };
    if (req.user.role !== RoleEnum.ADMIN) {
      query['userId'] = new Types.ObjectId(req.user._id);
    }
    return this.requestsService.updateRequest(body, query);
  }

  @Get()
  getRequests() {
    return this.requestsService.getRequests();
  }

  @Get(':_id')
  getSingleRequest(@Param('_id') _id: string) {
    return this.requestsService.getSingleRequest({ _id });
  }
}
