import React, { useState } from 'react';
import { Upload, FileText, AlertTriangle, CheckCircle, XCircle, Shield, FileCheck } from 'lucide-react';

const RiskReport = ({ analysisData }) => {
    const { filename, analysis } = analysisData;
    
    const getRiskColor = (level) => {
        switch(level?.toLowerCase()) {
            case 'low': return 'text-success';
            case 'medium': return 'text-warning';
            case 'high': return 'icon-danger';
            case 'critical': return 'icon-danger';
            default: return 'text-warning';
        }
    };

    const getRiskBadgeClass = (level) => {
        switch(level?.toLowerCase()) {
            case 'low': return 'risk-badge-low';
            case 'medium': return 'risk-badge-medium';
            case 'high': return 'risk-badge-high';
            case 'critical': return 'risk-badge-critical';
            default: return 'risk-badge';
        }
    };

    return (
        <div className="risk-report-container animate-slide-up">
            <div className="glass-panel risk-card">
                <div className="risk-header">
                    <div className="risk-title-group">
                        <h3 className="risk-title">
                            <Shield className={`icon-md ${getRiskColor(analysis.overall_risk_level)}`} />
                            Intellectual Property Analysis
                        </h3>
                        <p className="risk-subtitle">Analysis for: {filename}</p>
                    </div>
                    <span className={getRiskBadgeClass(analysis.overall_risk_level)}>
                        {analysis.overall_risk_level || 'Unknown'} Risk
                    </span>
                </div>

                <div className="risk-section">
                    <h4 className="risk-section-title">IP Classification</h4>
                    <p className="risk-text">{analysis.ip_classification}</p>
                </div>

                <div className="risk-section">
                    <h4 className="risk-section-title">Patentability Assessment</h4>
                    <p className="risk-text">{analysis.patentability_assessment}</p>
                </div>

                {analysis.novelty_indicators && analysis.novelty_indicators.length > 0 && (
                    <div className="risk-section">
                        <h4 className="risk-section-title">Novelty Indicators</h4>
                        <div className="risk-details">
                            {analysis.novelty_indicators.map((indicator, idx) => (
                                <div key={idx} className="risk-item">
                                    <CheckCircle className="icon-sm text-success" />
                                    <span className="risk-text">{indicator}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {analysis.infringement_risks && analysis.infringement_risks.length > 0 && (
                    <div className="risk-section">
                        <h4 className="risk-section-title">Infringement Risks</h4>
                        <div className="risk-details">
                            {analysis.infringement_risks.map((risk, idx) => (
                                <div key={idx} className="risk-item">
                                    <AlertTriangle className="icon-sm icon-warning" />
                                    <span className="risk-text">{risk}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {analysis.protection_recommendations && analysis.protection_recommendations.length > 0 && (
                    <div className="risk-section">
                        <h4 className="risk-section-title">Protection Recommendations</h4>
                        <div className="risk-details">
                            {analysis.protection_recommendations.map((rec, idx) => (
                                <div key={idx} className="risk-item">
                                    <FileCheck className="icon-sm text-primary" />
                                    <span className="risk-text">{rec}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {analysis.compliance_issues && (
                    <div className="risk-section">
                        <h4 className="risk-section-title">Compliance Issues</h4>
                        <p className="risk-text">{analysis.compliance_issues}</p>
                    </div>
                )}
            </div>
        </div>
    );
};

const DocAnalysis = () => {
    const [isDragging, setIsDragging] = useState(false);
    const [file, setFile] = useState(null);
    const [analyzing, setAnalyzing] = useState(false);
    const [result, setResult] = useState(null);
    const [error, setError] = useState(null);

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
            if (droppedFile.type === 'application/pdf') {
                setFile(droppedFile);
                analyzeDocument(droppedFile);
            } else {
                setError('Please upload a PDF file');
            }
        }
    };

    const fileInputRef = React.useRef(null);
    const handleFileClick = () => {
        fileInputRef.current?.click();
    }
    const handleFileChange = (e) => {
        if (e.target.files?.[0]) {
            const selectedFile = e.target.files[0];
            if (selectedFile.type === 'application/pdf') {
                setFile(selectedFile);
                analyzeDocument(selectedFile);
            } else {
                setError('Please upload a PDF file');
            }
        }
    }

    const analyzeDocument = async (fileToAnalyze) => {
        setAnalyzing(true);
        setResult(null);
        setError(null);

        try {
            const formData = new FormData();
            formData.append('file', fileToAnalyze);

            const response = await fetch('https://backend-for-spm-production.up.railway.app/api/analyze-document-ip', {
                method: 'POST',
                body: formData,
            });

            const data = await response.json();

            if (data.success) {
                setResult(data.data);
            } else {
                setError(data.message || 'Failed to analyze document');
            }
        } catch (err) {
            setError('Failed to connect to the server. Please ensure the backend is running.');
            console.error('Analysis error:', err);
        } finally {
            setAnalyzing(false);
        }
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
                    accept=".pdf"
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
                            {analyzing ? 'Analyzing document...' : file ? file.name : "Drop your PDF here, or click to browse"}
                        </h3>
                        <p className="upload-hint">
                            Supports: PDF files (max 10MB)
                        </p>
                    </div>
                </div>
            </div>

            {error && (
                <div className="error-message animate-slide-up">
                    <AlertTriangle className="icon-sm icon-danger" />
                    <span>{error}</span>
                </div>
            )}

            {result && <RiskReport analysisData={result} />}
        </div>
    );
};

export default DocAnalysis;
