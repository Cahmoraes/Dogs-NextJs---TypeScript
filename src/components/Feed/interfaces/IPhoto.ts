export interface IPhoto {
  acessos: string
  author: string
  id: number
  idade: string
  peso: string
  src: string
  title: string
  total_comments: string
}

export interface IComment {
  user_id: string
  comment_type: string
  comment_post_ID: string
  comment_ID: string
  comment_approved: string
  comment_author_email: string
  comment_author_url: string
  comment_author: string
  comment_date: string
  comment_content: string
}
export interface IPhotoModal {
  photo: IPhoto
  comments: IComment[]
}
