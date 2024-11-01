import { Command, CommandRunner } from 'nest-commander';
import { UserService } from '../services/user.service';

@Command({ name: 'user:encodePassword' })
export class UserEncodePasswordCommand extends CommandRunner {
    constructor(private userService: UserService) {
        super();
    }

    async run(passedParam: string[]): Promise<void> {
        const username = passedParam[0];
        const plainPassword = passedParam[1];
        const encodedPassword = await this.userService.encodePassword(plainPassword);

        this.userService
            .update(username, { password: encodedPassword })
            .then((user) => {
                console.log('User password updated: ', user);
            })
            .catch(() => {
                console.error('Error creating user: user does not exist');
            });
    }
}
