import { exportReviewToPDF } from '../util/ExportPDF';
import { sendReportEmail } from '../util/mailer';
import { showError, showSuccess } from '../util/AlertUtil';
import { useState } from 'react';
import React from 'react';

type ReviewCategory = 'Defects' | 'Performance' | 'Vulnerabilities';
interface ReviewMessage {
  category: ReviewCategory;
  text: string;
}

interface ReviewModalProps {
  show: boolean;
  onClose: () => void;
  reviewResult: ReviewMessage[];
  activeTab: ReviewCategory;
  setActiveTab: (tab: ReviewCategory) => void;
  selectedModelName: string;
  onReviewItemClick: (msg: ReviewMessage) => void;
}

const ReviewModal: React.FC<ReviewModalProps> = ({
  show,
  onClose,
  reviewResult,
  activeTab,
  setActiveTab,
  selectedModelName,
  onReviewItemClick,
}) => {
  const fileName = typeof window !== 'undefined' && (window as any).location?.state?.fileName ? (window as any).location.state.fileName : 'report';
  const [emailSending, setEmailSending] = useState(false);
  if (!show) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-white border border-gray-200 rounded p-6 my-4 animate-fade-in-up shadow-md max-w-lg w-full relative max-h-[80vh] overflow-y-auto">
        <button className="absolute top-2 right-2 text-gray-400 hover:text-black text-xl font-bold" onClick={onClose}>&times;</button>
        <div className="font-bold text-xl mb-4 text-gray-900">Review Result</div>
        <div className="flex gap-2 mb-4">
          {(['Defects', 'Performance', 'Vulnerabilities'] as ReviewCategory[]).map(tab => {
            const count = reviewResult.filter(msg => msg.category === tab).length;
            return (
              <button
                key={tab}
                className={`px-4 py-2 rounded-full text-sm font-semibold border transition-all flex items-center gap-2 ${activeTab === tab ? 'bg-black text-white border-black' : 'bg-gray-100 text-gray-700 border-gray-200 hover:bg-gray-200'}`}
                onClick={() => setActiveTab(tab)}
              >
                {tab} <span className={`ml-1 px-2 py-0.5 rounded-full text-xs font-bold ${activeTab === tab ? 'bg-white text-black' : 'bg-gray-300 text-gray-700'}`}>{count}</span>
              </button>
            );
          })}
        </div>
        <div className="space-y-3">
          {reviewResult.filter(msg => msg.category === activeTab).length === 0 && (
            <div className="text-gray-500 text-sm">No {activeTab.toLowerCase()} found.</div>
          )}
          {reviewResult.filter(msg => msg.category === activeTab).map((msg, idx) => (
            <div
              key={idx}
              className="bg-gray-50 border border-gray-200 rounded p-4 flex items-start gap-3 cursor-pointer hover:shadow-md transition group"
              onClick={() => onReviewItemClick(msg)}
            >
              <span className="mt-1 text-red-500 text-lg">●</span>
              <span className="text-gray-900 text-sm whitespace-pre-line">{msg.text}</span>
            </div>
          ))}
        </div>
        <div className="mt-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <button
              className="px-4 py-2 bg-gray-200 text-black rounded-full text-xs font-semibold"
              onClick={() => exportReviewToPDF({ reviewResult, fileName: 'report', modelName: selectedModelName })}
            >
              Download Report PDF
            </button>
            <button
              className={`px-4 py-2 ${emailSending ? 'bg-gray-300' : 'bg-indigo-600 hover:bg-indigo-700'} text-white rounded-full text-xs font-semibold`}
              onClick={async () => {
                if (emailSending) return;
                setEmailSending(true);
                const grouped = {
                  defects: reviewResult.filter(r => r.category === 'Defects').map(r => r.text),
                  performance: reviewResult.filter(r => r.category === 'Performance').map(r => r.text),
                  vulnerabilities: reviewResult.filter(r => r.category === 'Vulnerabilities').map(r => r.text),
                };
                try {
                  const res = await sendReportEmail(grouped);
                  if (res.status === 200) {
                    showSuccess('Report emailed successfully');
                  } else {
                    showError('Failed to send report');
                  }
                } catch (e) {
                  showError('Failed to send report');
                } finally {
                  setEmailSending(false);
                }
              }}
            >
              {emailSending ? 'Sending...' : 'Email Report'}
            </button>
          </div>
          <span className="text-xs text-right text-gray-500">Model: <span className="font-bold">{selectedModelName}</span></span>
        </div>
      </div>
    </div>
  );
};

export default ReviewModal;
