import { Pipe, PipeTransform } from '@angular/core';
import { MemberModel } from '../../core/models/member.model';

@Pipe({
  name: 'findAvatar',
  standalone: true
})
export class FindAvatarPipe implements PipeTransform {

  transform(members: MemberModel[] | null, senderId: string): string {
    const avatarUrl = members?.find(m => m.id === senderId)?.avatarUrl;
    return avatarUrl ?? '';
  }

}
