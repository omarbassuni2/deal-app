/* eslint-disable */
export default async () => {
    const t = {
        ["./users/dto/user.dto"]: await import("./users/dto/user.dto"),
        ["./lib/dto/property.dto"]: await import("./lib/dto/property.dto")
    };
    return { "@nestjs/swagger": { "models": [[import("./users/dto/user.dto"), { "UserDto": { name: { required: true, type: () => String }, phone: { required: true, type: () => String, minLength: 11, maxLength: 11 }, role: { required: true, enum: t["./users/dto/user.dto"].RoleEnum }, status: { required: true, enum: t["./users/dto/user.dto"].StatusEnum } }, "UserSignUpDto": { password: { required: true, type: () => String } }, "UserLoginDto": { phone: { required: true, type: () => String }, password: { required: true, type: () => String } }, "UserAuthInfoDto": { user: { required: true, type: () => Object }, access_token: { required: true, type: () => String } }, "StatsDataDto": { adsCount: { required: true, type: () => Number }, requestsCount: { required: true, type: () => Number } }, "UserStatsDto": { data: { required: true, type: () => [t["./users/dto/user.dto"].StatsDataDto] }, totalAdsAmount: { required: true, type: () => Number }, totalRequestsAmount: { required: true, type: () => Number }, page: { required: true, type: () => Number }, limit: { required: true, type: () => Number }, total: { required: true, type: () => Number }, hasNextPage: { required: true, type: () => Boolean }, hasPreviousPage: { required: true, type: () => Boolean } } }], [import("./lib/dto/property.dto"), { "PropertyBaseDto": { description: { required: true, type: () => String, minLength: 1, maxLength: 1024 }, area: { required: true, type: () => String, minLength: 1, maxLength: 64 }, price: { required: true, type: () => Number, minimum: 1 } }, "PropertyCreationDto": { propertyType: { required: true, enum: t["./lib/dto/property.dto"].PropertyTypeEnum }, city: { required: true, type: () => String, minLength: 1, maxLength: 64 }, district: { required: true, type: () => String, minLength: 1, maxLength: 64 } } }], [import("./ads/dto/ads.dto"), { "AdCreationDto": {} }], [import("./requests/dto/requests.dto"), { "RequestCreationDto": {}, "RequestUpdateDto": { description: { required: true, type: () => String, minLength: 1, maxLength: 1024 }, area: { required: true, type: () => String, minLength: 1, maxLength: 64 }, price: { required: true, type: () => Number, minimum: 1 } } }]], "controllers": [[import("./users/users.controller"), { "UsersController": { "signUp": { type: t["./users/dto/user.dto"].UserAuthInfoDto }, "signIn": { type: t["./users/dto/user.dto"].UserAuthInfoDto }, "getUserStats": { type: t["./users/dto/user.dto"].UserStatsDto } } }], [import("./ads/ads.controller"), { "AdsController": { "createAd": { type: Object }, "getSingleAd": {}, "getAds": {}, "getMatchingProperties": { type: [Object] } } }], [import("./requests/requests.controller"), { "RequestsController": { "createRequest": { type: Object }, "updateRequest": { type: Object }, "getRequests": { type: [Object] }, "getSingleRequest": { type: [Object] } } }]] } };
};