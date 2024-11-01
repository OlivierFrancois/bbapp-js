import { Command, CommandRunner, Option } from 'nest-commander';
import { Prisma, Role } from '@prisma/client';
import { UserService } from '../services/user.service';

interface UserCreateCommandOptions {
    asAdmin?: boolean;
}

@Command({ name: 'user:create' })
export class UserCreateCommand extends CommandRunner {
    constructor(private userService: UserService) {
        super();
    }

    async run(passedParam: string[], options?: UserCreateCommandOptions): Promise<void> {
        const userPayload: Prisma.UserCreateInput = {
            username: passedParam[0],
            email: passedParam[1],
            password: passedParam[2],
            role: options.asAdmin ? 'ADMIN' : ('USER' as Role),
        };

        this.userService
            .create(userPayload)
            .then((user) => {
                console.log('User created: ', user);
            })
            .catch(() => {
                console.error('Error creating user: username already exist');
            });
    }

    @Option({
        flags: '-a, --asAdmin [string]',
        description: 'As admin',
        defaultValue: false,
        name: 'asAdmin',
    })
    parseAsAdmin(val: string): boolean {
        return parseInt(val) === 1;
    }
}
