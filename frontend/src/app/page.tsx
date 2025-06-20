"use client";

import React, { useState, ChangeEvent } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Upload } from 'lucide-react';
import AnalysisDisplay from '@/components/AnalysisDisplay';
import { Analytics } from '@vercel/analytics/next';
import Footer from "@/components/Footer";
import Header from "@/components/Header";

interface AnalysisResponse {
  analysis: string;
}

const ResumeAnalyzer = () => {
  const [file, setFile] = useState<File | null>(null);
  const [jobDescription, setJobDescription] = useState('');
  const [analysis, setAnalysis] = useState('');
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  const handleAnalyze = async () => {
    if (!file || !jobDescription) {
      alert('Please upload a resume and provide a job description');
      return;
    }

    setLoading(true);

    const formData = new FormData();
    formData.append('resume', file);
    formData.append('jobDescription', jobDescription);

    // 
    try {
      const response = await fetch('https://resume-analyzer-kp39.onrender.com/analyze', {
        method: 'POST',
        body: formData,
      });

      const data: AnalysisResponse = await response.json();
      setAnalysis(data.analysis);
    } catch (error) {
      console.error('Error:', error);
      setAnalysis('Error analyzing resume. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-50 to-gray-100">
      <Header/>

      {/* Main Content */}
      <main className="flex-grow container mx-auto p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left Column - Input Sections */}
          <div className="space-y-8">
            {/* Resume Upload Section */}
            <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-xl font-light text-gray-800">Upload Resume</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-center w-full">
                  <label className="flex flex-col items-center justify-center w-full h-40 border border-dashed rounded-xl cursor-pointer bg-gray-50/50 hover:bg-gray-50 border-gray-200 hover:border-purple-200 transition-all duration-300">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <Upload className="w-8 h-8 mb-4 text-gray-400" />
                      <p className="mb-2 text-sm text-gray-500">
                        <span className="font-medium">Click to upload</span> or drag and drop
                      </p>
                      <p className="text-xs text-gray-400">PDF or DOCX (MAX. 10MB)</p>
                    </div>
                    <input
                      type="file"
                      className="hidden"
                      accept=".pdf,.docx"
                      onChange={handleFileChange}
                    />
                  </label>
                </div>
                {file && (
                  <p className="mt-4 text-sm text-gray-500 text-center">
                    Selected: {file.name}
                  </p>
                )}
              </CardContent>
            </Card>

            {/* Job Description Section */}
            <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-xl font-light text-gray-800">Job Description</CardTitle>
              </CardHeader>
              <CardContent>
                <Textarea
                  placeholder="Paste the job description here..."
                  className="min-h-[200px] border-gray-200 focus:border-purple-200 bg-white/60 placeholder:text-gray-400"
                  value={jobDescription}
                  onChange={(e) => setJobDescription(e.target.value)}
                />
              </CardContent>
            </Card>

            {/* Analyze Button */}
            <Button 
              onClick={handleAnalyze} 
              disabled={loading}
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-medium py-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50"
            >
              {loading ? 'Analyzing...' : 'Analyze Resume'}
            </Button>
          </div>

          {/* Right Column - Analysis Section */}
          <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-xl font-light text-gray-800">Analysis Results</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[600px] overflow-y-auto p-6 bg-white/60 rounded-xl">
                {analysis ? (
                  <AnalysisDisplay analysis={analysis} />
                ) : (
                  <p className="text-gray-400 text-center mt-8 font-light">
                    Your analysis results will appear here
                  </p>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      {/* Footer */}
      <Footer/>
      <Analytics/>
    </div>
  );
};

export default ResumeAnalyzer;