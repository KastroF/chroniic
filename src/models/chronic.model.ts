export interface Chronic{

    id: string;
    title: string; 
    description: string; 
    user_fb_id: number; 
    user_email: string;
    c_id: number; 
    categorie: string;
    categories:Array<string>;
    adult: boolean ; 
    finished: boolean;
    chapter_count: number;
    rights: boolean; 
    buy: boolean
    price: number;
    photo_id: string; 
    cover_id: string;
    active: boolean;
    key: string;
    user_name: string;
    photo: string;
    already: boolean;
    covert: string;
    image_name: boolean;
    user_key: string;
    num: number;
    views: number;
    date: Date;
    howManyChapts: number;
    likes: number;

}