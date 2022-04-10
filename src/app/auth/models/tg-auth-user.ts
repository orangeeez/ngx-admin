export class TgAuthUser {
    constructor(
        public auth_date?: number,
        public first_name?: string,
        public hash?: string,
        public id?: number,
        public last_name?: string,
        public photo_url?: string,
        public username?: string,
    ) {}
}
