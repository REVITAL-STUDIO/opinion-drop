import Constants from "../utils/enums";
export class User {

    private userId!: number;
    private username: string;
    private email: string;
    private passwordHash: string;
    private bio: string | null;
    private profilePicture: string | null;
    private politicalAlignment: string;
    private createdAt: Date;




    constructor(username: string, email: string, passwordHash: string, createdAt: Date, bio?: string | null, profilePicture?: string | null, politicalAlignment?: string, userId?: number) {

        this.username = username;
        this.email = email;
        this.passwordHash = passwordHash;
        this.bio = bio ?? null;
        this.profilePicture = profilePicture ?? null;
        this.politicalAlignment = politicalAlignment ?? Constants.PoliticalAlignment.Moderate;
        this.createdAt = createdAt;
        this.userId = userId ?? this.userId;



    }

    public getUserData(): Record<string, any> {
        return {
            userId: this.userId,
            username: this.username,
            email: this.email,
            passwordHash: this.passwordHash,
            createdAt: this.createdAt,
            bio: this.bio,
            profilePicture: this.profilePicture,
            politicalAlignment: this.politicalAlignment
        };
    }
}