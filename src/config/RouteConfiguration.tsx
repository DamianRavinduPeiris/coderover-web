import { Routes, Route, useParams, useLocation } from "react-router-dom";
import LandingPage from "../main/LandingPage";
import DashBoard from "../dashboard/DashBoard";
import RepoTree from '../components/RepoTree';
import FileViewer from '../components/FileViewer';

export default function RouteConfiguration() {
    return (
        <div>
            <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/dashboard" element={<DashBoard />} />
                <Route path="/repos/:owner/:repo/tree" element={<RepoTreeWrapper />} />
                <Route path="/repos/:owner/:repo/blob/*" element={<FileViewer />} />
            </Routes>
        </div>
    );
}

function RepoTreeWrapper() {
    const { owner, repo } = useParams();
    const location = useLocation();
    if (!owner || !repo) return null;
    return <RepoTree owner={owner} repo={repo} repoMeta={location.state?.repoMeta} />;
}