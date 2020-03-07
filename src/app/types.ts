

interface User {
  i_user: number;
  name: string;
  carma: number;
  password?: string;
}
interface Post {
  i_post: number;
  title: string;
  body: string;
  comments?: Comment[];
}

interface Comment {
  i_comment: number;
  comment: string;
  i_owner: number;
}
