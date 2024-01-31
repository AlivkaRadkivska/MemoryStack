export class AuthResultDto {
  user: {
    id: string;
    username: string;
  };
  accessToken: string;
}
