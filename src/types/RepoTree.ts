export interface RepoTreeNode {
  path: string;
  type: 'blob' | 'tree';
  sha: string;
}

export interface RepoTreeResponse {
  message: string;
  data: {
    sha: string;
    tree: RepoTreeNode[];
  };
  statusCode: number;
}

export interface BlobResponse {
  message: string;
  data: {
    content: string;
    encoding: string;
  };
  statusCode: number;
}
