import Constants from "../utils/types/enums";
export class User {

    private userId: number;
    private username: string;
    private email: string;
    private bio: string | null;
    private profilePicture: string | null;
    private politicalAlignment: string | null;
    private createdAt!: Date;
    private updatedAt!: Date;



    constructor(userId: number, username: string, email: string, bio: string | null, profilePicture: string | null, politicalAlignment: string | null, createdAt?: Date, updatedAt?: Date,) {

        this.username = username;
        this.email = email;
        this.bio = bio ?? null;
        this.profilePicture = profilePicture ?? null;
        this.politicalAlignment = politicalAlignment ?? Constants.PoliticalAlignment.Moderate;
        this.userId = userId;
        this.createdAt = createdAt ?? this.createdAt;
        this.updatedAt = updatedAt ?? this.updatedAt;
    }

    public getUserData(): Record<string, any> {
        return {
            userId: this.userId,
            username: this.username,
            email: this.email,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt,
            bio: this.bio,
            profilePicture: this.profilePicture,
            politicalAlignment: this.politicalAlignment
        };
    }
}