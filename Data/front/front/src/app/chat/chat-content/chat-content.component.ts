import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ChatService } from '../chat.service';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/login/auth.service';

@Component({
  selector: 'app-chat-content',
  templateUrl: './chat-content.component.html',
  styleUrls: ['./chat-content.component.scss']
})
export class ChatContentComponent {
  @Input() toggle: boolean = false;
  id !: number;
  chatMsgs$ !: Observable<any>;
  chatMembers$ !: Observable<any>;
  UserNow$ !: Observable<any>;
  chatInfos$ !: Observable<any>;

  constructor(private readonly switchRoute: Router, private readonly route: ActivatedRoute, private readonly chatService: ChatService, private readonly authService: AuthService) {
    if (this.route.snapshot.params['id'] && !this.route.snapshot.params['id']?.match(/^[0-9]*$/))
      this.switchRoute.navigateByUrl('/chat')
    this.id = parseInt(this.route.snapshot.params['id']); // chatRoomId
    this.chatMsgs$ = this.chatService.getChatroomMessages(this.id);
    this.UserNow$ = this.authService.getCurrentUser();
    this.chatInfos$ = this.chatService.getThisChat(this.id);
    // chatMembers$ ??
  }


}
