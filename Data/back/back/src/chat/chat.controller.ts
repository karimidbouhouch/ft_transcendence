import {
  Controller,
  Get,
  Param,
  Body,
  ParseIntPipe,
  Post,
  Put,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import { ChatService } from './chat.service';
import { createChatroomDTO } from './dto/createChatroom.dto';
import { createMemberDTO } from './dto/createMember.dto';
import { CreateBanDTO, createAdminDTO, invitesDTO } from './dto/createAdmin.dto';
import { SwapOwnerDTO } from './dto/SwapOwner.dto';
import { UpdateChatroomDTO } from './dto/updateChatroom.dto';
// import { ValidateUpdateDTO } from './chat.validators';
// import { Message } from 'src/message/message.entity';
// import { Punishment } from './punishment/punishment.entity';
// import { createPunishmentDTO } from './punishment/dto/createPunishment.dto';
import { CommandStartedEvent } from 'typeorm';
import { JwtAuthGuard } from 'src/authenticator/jwtauth.guard';
import { UserService } from 'src/user/user.service';
// import { MessageService } from 'src/message/message.service';


@UseGuards(JwtAuthGuard)
@Controller('chat')
export class ChatController {

  constructor(private readonly chatRoomSevice: ChatService) { }

  @Get('invites')
  async GetInvites(@Req() req: any) {
    return await this.chatRoomSevice.getInvites(req.new_user.sub);
  }

  @Post('invites')
  async SendInvites(@Req() req: any, @Body() invitesDTO: invitesDTO) {
    return await this.chatRoomSevice.sendAnInvite(invitesDTO.chatID, req.new_user.sub, invitesDTO.UserId);
  }

  @Post('AcceptInvite')
  async AcceptInvites(@Req() req: any, @Body() invitesDTO: invitesDTO) {
    return await this.chatRoomSevice.AcceptAnInvite(invitesDTO.chatID, req.new_user.sub);
  }


  @Post('RemoveInvite')
  async RemoveInvites(@Req() req: any, @Body() invitesDTO: invitesDTO) {
    return await this.chatRoomSevice.DeleteAnInvite(invitesDTO.chatID, req.new_user.sub);
  }


  @Get('find/:id')
  async getChatRoomByID(@Param('id', ParseIntPipe) id: number) {
    return this.chatRoomSevice.GetChatRoomByID_(id);
  }

  @Get('user')
  async getChatRoomsOfUser(@Req() req: any) {
    return this.chatRoomSevice.getChatRoomOfUsers(req.new_user.sub); // can return empty array !!
  }


  @Get('DM')
  async findDMChatrooms(
    @Req() req,
  ) {
    return this.chatRoomSevice.findDMChatrooms(req.new_user.sub);
  }

  @Get('DM/:secondUser')
  async findDMChatroom(
    @Req() req: any,
    @Param('secondUser', ParseIntPipe) user2: number,
  ) {
    return this.chatRoomSevice.findDMChatroom(req.new_user.sub, user2);
  }

  @Get('membersFor/:id')
  getMembers(@Req() req: any, @Param('id', ParseIntPipe) id: number) {
    return this.chatRoomSevice.getChatRoomMembers(req.new_user.sub, id);
  }


  @Get('myRole/:id')
  GetMyRole(@Req() req: any, @Param('id', ParseIntPipe) id: number) {
    return this.chatRoomSevice.MyOwnRole(req.new_user.sub, id);
  }
  @Get(':chatID/messages')
  async getMessagesByChatID(
    @Req() req: any,
    @Param('chatID', ParseIntPipe) chatID: number,
  ) {
    return this.chatRoomSevice.getMessagesByChatID(req.new_user.sub, chatID);
  }

  @Post('create')
  async createChatRoom(@Req() req: any, @Body() chatroom: createChatroomDTO) {
    return this.chatRoomSevice.createChatroom(req.new_user.sub, chatroom);
  }

  @Post('JoinRoom')
  async joinRoom(@Req() req, @Body() chatroom: createChatroomDTO) {
    return this.chatRoomSevice.JoinChatroom(req.new_user.sub, chatroom);
  }
  @Put('update/:chatID/admin')
  async updateChatroom_(
    @Param('chatID') chatID: number,
    @Req() req: any,
    @Body() updateChatDTO: UpdateChatroomDTO,
  ) {
    // ValidateUpdateDTO(updateChatDTO);
    return this.chatRoomSevice.updateChatroom(
      chatID,
      req.new_user.sub,
      updateChatDTO,
    );
  }
  @Delete('leave/:chatroomID')
  async leaveChat(
    @Param('chatroomID', ParseIntPipe) chatroomID: number,
    @Req() req: any
  ) {
    return this.chatRoomSevice.LeaveChannel(chatroomID, req.new_user.sub);
  }

  @Post('banUser')
  banChannelMemeber(@Req() req: any, @Body() CreateBan: CreateBanDTO) {
    return this.chatRoomSevice.banFromChannel(req.new_user.sub, CreateBan.chatID, CreateBan.UserId);
  }

  @Post('banUserRemoval')
  banChannelMemeberRemoval(@Req() req: any, @Body() RemoveBan: CreateBanDTO) {
    return this.chatRoomSevice.removeBanFromChannel(req.new_user.sub, RemoveBan.chatID, RemoveBan.UserId);
  }

  @Post('RemoveRole')
  RemoveRole(@Req() req: any, @Body() RemoveRole: CreateBanDTO) {
    return this.chatRoomSevice.removeAdminRole(req.new_user.sub, RemoveRole.chatID, RemoveRole.UserId);
  }

  @Post('CreateRole')
  CreateeRole(@Req() req: any, @Body() CreateRole: CreateBanDTO) {
    return this.chatRoomSevice.setAsAdmin(req.new_user.sub, CreateRole.chatID, CreateRole.UserId);
  }
  @Post('kickUser')
  kickingOut(@Req() req: any, @Body() KickOut: CreateBanDTO) {
    return this.chatRoomSevice.kickUser(KickOut.chatID, req.new_user.sub, KickOut.UserId)
  }
} // end of ChatController class
