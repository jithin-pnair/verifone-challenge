export interface ImageModel {
    results: [
        {
            alt_description: string,
            categories: string[],
            color: string,
            created_at: string,
            current_user_collections: string[],
            description: null,
            height: number,
            id: string,
            liked_by_user: boolean,
            likes: number,
            links: {
                download: string,
                download_location: string,
                html: string,
                self: string
            },
            promoted_at: string,
            sponsorship: string,
            tags: [
                {
                    title: string,
                    type: string
                }
            ],
            updated_at: string,
            urls: {
                full: string,
                raw: string,
                regular: string,
                small: string,
                thumb: string
            },
            user: {
                accepted_tos: boolean,
                bio: string,
                first_name: string,
                id: string,
                instagram_username: string,
                last_name: string,
                links: {
                    followers: string,
                    following: string,
                    html: string,
                    likes: string,
                    photos: string,
                    portfolio: string,
                    self: string
                },
                location: string,
                name: string,
                portfolio_url: string,
                profile_image: {
                    large: string,
                    medium: string,
                    small: string
                },
                total_collections: number,
                total_likes: number,
                total_photos: number,
                twitter_username: string,
                updated_at: string,
                username: string
            },
            width: number
        }
    ]
}