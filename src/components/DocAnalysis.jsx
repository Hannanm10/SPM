import React, { useState } from 'react';
import { Upload, FileText, AlertTriangle, CheckCircle, XCircle } from 'lucide-react';

const RiskReport = () => {
    return (
        <div className="risk-report-container animate-slide-up">
            <div className="glass-panel risk-card">
                <div className="risk-header">
                    <div className="risk-title-group">
                        <h3 className="risk-title">
                            <AlertTriangle className="icon-md text-warning" />
                            Potential Copyright Risk Detected
                        </h3>
                        <p className="risk-subtitle">Analysis for: project_proposal_v2.pdf</p>
                    </div>
                    <span className="risk-badge">
                        Moderate Risk
                    </span>
                </div>

                <div className="risk-details">
                    <div className="risk-item">
                        <CheckCircle className="icon-sm text-original icon-success" />
                        <span className="risk-text">Originality check passed (85% unique)</span>
                    </div>
                    <div className="risk-item">
                        <XCircle className="icon-sm icon-danger" />
                        <span className="risk-text">Matches found in 3rd party databases (Images)</span>
                    </div>
                    <div className="risk-item">
                        <AlertTriangle className="icon-sm icon-warning" />
                        <span className="risk-text">License compatibility warning: MIT vs GPL v3</span>
                    </div>
                </div>

                <div className="risk-actions">
                    <button className="btn-link">
                        View Detailed Report
                    </button>
                    <button className="btn-link-secondary">
                        Download PDF
                    </button>
                </div>
            </div>
        </div>
    );
};

const DocAnalysis = () => {
    const [isDragging, setIsDragging] = useState(false);
    const [file, setFile] = useState(null);
    const [analyzing, setAnalyzing] = useState(false);
    const [result, setResult] = useState(false);

    const handleDragOver = (e) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = () => {
        setIsDragging(false);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setIsDragging(false);
        const droppedFile = e.dataTransfer.files[0];
        if (droppedFile) {
            setFile(droppedFile);
            simulateAnalysis();
        }
    };

    const fileInputRef = React.useRef(null);
    const handleFileClick = () => {
        fileInputRef.current?.click();
    }
    const handleFileChange = (e) => {
        if (e.target.files?.[0]) {
            setFile(e.target.files[0]);
            simulateAnalysis();
        }
    }

    const simulateAnalysis = () => {
        setAnalyzing(true);
        setResult(false);
        setTimeout(() => {
            setAnalyzing(false);
            setResult(true);
        }, 2000);
    };

    return (
        <div className="doc-analysis-container">
            <div className="analysis-header">
                <h2 className="analysis-title gradient-text">
                    Document Compliance Check
                </h2>
                <p className="analysis-subtitle">Upload contracts, codebases, or creative assets to scan for IP risks.</p>
            </div>

            <div
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={handleFileClick}
                className={`upload-zone ${isDragging ? 'dragging' : ''}`}
            >
                <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    className="hidden"
                />
                <div className="upload-content">
                    <div className={`upload-icon-wrapper ${isDragging ? 'active' : ''} ${analyzing ? 'is-analyzing' : ''}`}>
                        {analyzing ? (
                            <div className="spinner" />
                        ) : (
                            <Upload className="icon-lg" />
                        )}
                    </div>

                    <div className="upload-text">
                        <h3 className="upload-title">
                            {file ? file.name : "Drop your file here, or click to browse"}
                        </h3>
                        <p className="upload-hint">
                            Supports: PDF, DOCX, TXT, Source Code
                        </p>
                    </div>
                </div>
            </div>

            {result && <RiskReport />}
        </div>
    );
};

export default DocAnalysis;
