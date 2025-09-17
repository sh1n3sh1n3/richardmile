export interface Friend {
  _id?: string;
  id?: string;
  name: string;
  image: string;
  description?: string;
  profession?: string;
  sport?: string;
  achievements?: string[];
  socialMedia?: {
    instagram?: string;
    twitter?: string;
    facebook?: string;
    website?: string;
  };
  isActive: boolean;
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateFriendRequest {
  name: string;
  image: string;
  description?: string;
  profession?: string;
  sport?: string;
  achievements?: string[];
  socialMedia?: {
    instagram?: string;
    twitter?: string;
    facebook?: string;
    website?: string;
  };
  isActive?: boolean;
  order?: number;
}

export interface UpdateFriendRequest extends Partial<CreateFriendRequest> {
  id: string;
}

export interface FriendsApiResponse {
  success: boolean;
  data?: Friend | Friend[];
  message?: string;
  error?: string;
}

export interface FriendsHeroContent {
  _id?: string;
  video: string;
  title: string;
  description: string;
  isActive?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface CreateFriendsHeroRequest {
  video: string;
  title: string;
  description: string;
  isActive?: boolean;
}

export interface UpdateFriendsHeroRequest extends Partial<CreateFriendsHeroRequest> {
  id: string;
}

export interface FriendsHeroApiResponse {
  success: boolean;
  data?: FriendsHeroContent | FriendsHeroContent[];
  message?: string;
  error?: string;
}

export interface FriendsPageDataResponse {
  friends: Friend[];
  heroContent: FriendsHeroContent | null;
}
