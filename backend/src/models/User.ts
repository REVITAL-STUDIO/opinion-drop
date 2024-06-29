import Constants from "../utils/enums";
export class User {

    private userId!: number;
    private username: string;
    private email: string;
    private passwordHash: string;
    private bio: string | null;
    private profilePicture: string | null;
    private politicalAlignment: string | null;
    private createdAt!: Date;
    private updatedAt!: Date;



    constructor(username: string, email: string, passwordHash: string, bio: string | null, profilePicture: string | null, politicalAlignment: string | null, userId?: number, createdAt?: Date, updatedAt?: Date,) {

        this.username = username;
        this.email = email;
        this.passwordHash = passwordHash;
        this.bio = bio ?? null;
        this.profilePicture = profilePicture ?? null;
        this.politicalAlignment = politicalAlignment ?? Constants.PoliticalAlignment.Moderate;
        this.userId = userId ?? this.userId;
        this.createdAt = createdAt ?? this.createdAt;
        this.updatedAt = updatedAt ?? this.updatedAt;
    }

    public getUserData(): Record<string, any> {
        return {
            userId: this.userId,
            username: this.username,
            email: this.email,
            passwordHash: this.passwordHash,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt,
            bio: this.bio,
            profilePicture: this.profilePicture,
            politicalAlignment: this.politicalAlignment
        };
    }
}