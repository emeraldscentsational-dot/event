interface Author {
  avatar: string; // Assuming User2 is a string representing the path to the avatar
  name: string;
  role: string;
}

// Define the Content interface
export interface Content {
  content: string;
  author: Author;
}
interface ImageDetails {
  id: string;
  imageDataBase64: string;
  imageOwner: string;
}

export interface Testimonial {
  id: string;
  authorName: string;
  imageId: string;
  text: string;
  approvalStatus: string;
  avatarUrl: string;
  userType: string;
  imageDetails: ImageDetails;
}
