export interface ISheetResponse {
    id: number
    code: string
    name: string;
    description: string;
    uuid: string;
    front: string;
    back: string;
    pdf: string;
    isMostSeen: boolean;
    isRecommended: boolean;
    isHorizontal: boolean;
    summary: string;
    status: string;
    isActive: boolean;
    createdAt: string;
}

export interface IPopularSearch {
    id: number;
    name: string;
    isActive: boolean;
    createdAt: string;
}