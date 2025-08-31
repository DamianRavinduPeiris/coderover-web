import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { RepoTreeNode } from '../types/RepoTree';
import { ChevronDownIcon, ChevronRightIcon, FileIcon, FolderIcon } from 'lucide-react';

interface TreeNodeProps {
  node: RepoTreeNode;
  fullTree: RepoTreeNode[];
  owner: string;
  repo: string;
  level: number;
}

const getChildren = (node: RepoTreeNode, fullTree: RepoTreeNode[]) => {
  const prefix = node.path + '/';
  return fullTree.filter(
    n => n.path.startsWith(prefix) && n.path.replace(prefix, '').indexOf('/') === -1
  );
};

const TreeNode: React.FC<TreeNodeProps> = ({ node, fullTree, owner, repo, level }) => {
  const [expanded, setExpanded] = useState(false);
  const navigate = useNavigate();


  const handleClick = () => {
    if (node.type === 'tree') {
      setExpanded(e => !e);
    } else {
      navigate(`/repos/${owner}/${repo}/blob/${node.sha}`, { state: { fileName: node.path.split('/').pop(), repoMeta: { name: repo, /* fallback minimal meta */ } } });
    }
  };

  const children = node.type === 'tree' && expanded ? getChildren(node, fullTree) : [];

  let expandIcon;
  if (node.type === 'tree') {
    expandIcon = expanded ? <ChevronDownIcon className="mr-1" /> : <ChevronRightIcon className="mr-1" />;
  } else {
    expandIcon = <FileIcon className="mr-1" />;
  }

  return (
    <div className="relative">
      <button
        type="button"
        className={`flex items-center cursor-pointer hover:bg-gray-100 transition rounded px-2 py-1 ml-${level * 4}`}
        onClick={handleClick}
        style={{ marginLeft: level * 16 }}
      >
        {expandIcon}
        {node.type === 'tree' ? <FolderIcon className="mr-2 text-yellow-500" /> : <FileIcon className="mr-2 text-gray-500" />}
        <span className="truncate">{node.path.split('/').pop()}</span>
      </button>
      {children.length > 0 && (
        <div className="ml-4 border-l border-gray-200 pl-2 transition-all duration-200">
          {children.map(child => (
            <TreeNode
              key={child.sha}
              node={child}
              fullTree={fullTree}
              owner={owner}
              repo={repo}
              level={level + 1}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default TreeNode;
