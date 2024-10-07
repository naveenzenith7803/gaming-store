export class Category {
    id: number;
    name: string;
    parentCategoryId: number | null; 
    childCategoryIds: number[];
}
