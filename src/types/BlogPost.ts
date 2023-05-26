import { BaseContent } from "./BaseContent ";
export interface BlogPost extends BaseContent {
  tags: string[];
  published: boolean;
}
