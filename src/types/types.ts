export type DocResult = {
    id: string;
    title: string;
    url: string;
    publishedDate: string;
    author: string;
    score: number;
    text: string;
    summary?: string;
    image?: string;
    favicon?: string;
    extras?: {
      links?: string[];
    };
};
