import { Pipe, PipeTransform } from '@angular/core';
import { MemberModel } from '../../core/models/member.model';

@Pipe({
  name: 'findName',
  standalone: true,
})
export class FindNamePipe implements PipeTransform {

  transform(members: MemberModel[] | null, senderId: string): string {
    const name = members?.find((m) => m.id === senderId)?.name;
    return name ?? '';
  }
}
