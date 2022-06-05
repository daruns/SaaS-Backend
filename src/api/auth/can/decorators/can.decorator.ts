// import { SetMetadata } from '@nestjs/common';

// export const Roles = (...roles: string[]) => SetMetadata('roles', roles);

import { SetMetadata } from '@nestjs/common';

export const Can = (subject:string,action:string) => SetMetadata('can-attributes', {subject: subject, action: action});
