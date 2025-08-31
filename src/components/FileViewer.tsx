import React, { useEffect, useState } from 'react';
import { decodeBase64, parseReviewText } from '../util/FileUtils';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { analyzeCode } from '../util/Analyzer';
import { fetchBlob } from '../util/FetchRepoTrees';
import AppHeader from './AppHeader';
import AppFooter from './AppFooter';
import FileInfo from './FileInfo';
import AnalyzeButton from './AnalyzeButton';
import ModelDropdown from './ModelDropdown';
import ReviewModal from './ReviewModal';
import Loader from './Loader';
import { showError } from '../util/AlertUtil';
import ErrorMessage from './ErrorMessage';
import EmptyContent from './EmptyContent';
import FileContent from './FileContent';
import { detectLanguage } from '../util/DetectLanguage';
import AOS from 'aos';
import type { MLModel } from '../types/ModeTypes';

type ReviewCategory = 'Defects' | 'Performance' | 'Vulnerabilities';
interface ReviewMessage {
  category: ReviewCategory;
  text: string;
}

interface FileState {
  content: string;
  loading: boolean;
  error: string | null;
}

interface AnalysisState {
  analyzing: boolean;
  reviewResult: ReviewMessage[] | null;
  activeTab: ReviewCategory;
  showModal: boolean;
}

const FileViewer: React.FC = () => {
  const { owner, repo, '*': sha } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const fileName = location.state?.fileName as string | undefined;

  const [fileState, setFileState] = useState<FileState>({
    content: '',
    loading: true,
    error: null,
  });

  const [analysis, setAnalysis] = useState<AnalysisState>({
    analyzing: false,
    reviewResult: null,
    activeTab: 'Defects',
    showModal: false,
  });

  const [selectedModel, setSelectedModel] = useState<MLModel>({ id: 'gpt-5', name: 'GPT-5' });

  useEffect(() => {
    AOS.init();
  }, []);

  useEffect(() => {
    const fetchFileContent = async () => {
      if (!owner || !repo || !sha) return;
      setFileState(prev => ({ ...prev, loading: true, error: null }));

      try {
        const res = await fetchBlob(owner, repo, sha);
        if (res?.data?.content) {
          setFileState({ content: decodeBase64(res.data.content), loading: false, error: null });
        } else {
          setFileState({ content: '', loading: false, error: null });
        }
      } catch {
        setFileState({ content: '', loading: false, error: 'Failed to load file' });
      }
    };

    fetchFileContent();
  }, [owner, repo, sha]);

  useEffect(() => {
    if (fileState.error) {
      showError(fileState.error);
    }
  }, [fileState.error]);

  const isPng = fileName?.toLowerCase().endsWith('.png');
  const isClassFile = fileName?.toLowerCase().endsWith('.class');
  const isJavaFile = fileName?.toLowerCase().endsWith('.java');
  const language = detectLanguage(fileName);

  const handleAnalyze = async () => {
    setAnalysis({ analyzing: true, reviewResult: null, activeTab: 'Defects', showModal: false });

    try {
      const data = await analyzeCode({ code: fileState.content, model: selectedModel.id });
      setAnalysis({
        analyzing: false,
        reviewResult: parseReviewText(data.data.choices[0].message.content),
        activeTab: 'Defects',
        showModal: true,
      });
    } catch {
      showError("An error occurred while analyzing the code.");
      setAnalysis(prev => ({ ...prev, analyzing: false }));
    }
  };

  const goBackToRepoTree = () => navigate(`/repos/${owner}/${repo}/tree`);

  const handleReviewItemClick = (msg: ReviewMessage) => {
    const match = msg.text.match(/line\s*(\d+)/i);
    if (match) {
      const lineNum = parseInt(match[1], 10);
      const el = document.getElementById(`code-line-${lineNum}`);
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  if (fileState.loading) {
    return (
      <div className="min-h-screen flex flex-col bg-white">
        <AppHeader />
        <Loader text="Loading file..." />
        <AppFooter />
      </div>
    );
  }

  if (fileState.error) {
    return (
      <div className="flex flex-col min-h-screen bg-white">
        <AppHeader />
        <ErrorMessage message={fileState.error} />
        <AppFooter />
      </div>
    );
  }

  if (!fileState.content) {
    return (
      <div className="flex flex-col min-h-screen bg-white">
        <AppHeader />
        <EmptyContent message="File content is empty or not available." />
        <AppFooter />
      </div>
    );
  }

  const fileContent = (
    <FileContent
      isClassFile={!!isClassFile}
      isPng={!!isPng}
      content={fileState.content}
      fileName={fileName}
      language={language}
    />
  );

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <AppHeader />
      <main className="flex-1 w-full px-2 sm:px-4 md:px-8 py-6" style={{ maxWidth: '100vw' }}>
        <button
          className="mb-4 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded transition flex items-center gap-2"
          onClick={goBackToRepoTree}
        >
          <svg width="18" height="18" fill="none" viewBox="0 0 24 24">
            <path d="M15 19l-7-7 7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Back to Repo Tree
        </button>
        <FileInfo repo={repo!} fileName={fileName} sha={sha as string} />
        {isJavaFile && (
          <div className="flex items-center gap-2 mb-2">
            <ModelDropdown
              selectedModel={selectedModel.id}
              onChange={id => setSelectedModel({ id, name: id.toUpperCase() })}
              disabled={analysis.analyzing}
            />
            <AnalyzeButton analyzing={analysis.analyzing} onClick={handleAnalyze} />
          </div>
        )}
        <ReviewModal
          show={Boolean(isJavaFile && analysis.reviewResult && !analysis.analyzing && analysis.showModal)}
          onClose={() => setAnalysis(prev => ({ ...prev, showModal: false }))}
          reviewResult={analysis.reviewResult || []}
          activeTab={analysis.activeTab}
          setActiveTab={tab => setAnalysis(prev => ({ ...prev, activeTab: tab }))}
          selectedModelName={selectedModel.name}
          onReviewItemClick={handleReviewItemClick}
        />
        {fileContent}
      </main>
      <AppFooter />
    </div>
  );
};

export default FileViewer;
