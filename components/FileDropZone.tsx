
import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';

interface FileDropZoneProps {
    onFileContent: (content: string, fileName: string) => void;
    label?: string;
    acceptedFileTypes?: Record<string, string[]>;
    placeholder?: string;
}

const FileDropZone: React.FC<FileDropZoneProps> = ({
    onFileContent,
    label = 'Drop file here',
    acceptedFileTypes = {
        'text/plain': ['.txt', '.csv', '.tsv'],
        'application/vnd.ms-excel': ['.xls', '.xlsx'] // Note: raw browser file reader might mostly just read text unless we use excel parser lib
        // For this improvement, let's assume text/csv/tsv content first, or add xlsx parser if needed.
        // Reading binary xlsx in browser requires 'xlsx' library.
    },
    placeholder = 'Drag & drop a file here, or click to select'
}) => {
    const [fileName, setFileName] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    const onDrop = useCallback((acceptedFiles: File[]) => {
        const file = acceptedFiles[0];
        if (!file) return;

        setFileName(file.name);
        setError(null);

        const reader = new FileReader();
        reader.onabort = () => setError('File reading was aborted');
        reader.onerror = () => setError('File reading has failed');
        reader.onload = () => {
            const binaryStr = reader.result;
            if (typeof binaryStr === 'string') {
                onFileContent(binaryStr, file.name);
            }
        };

        // Simple text read for now. If user wants Excel, we'd need xlsx lib.
        // Assuming user exports to CSV or copy-pastes usually implies text data availability.
        reader.readAsText(file);
    }, [onFileContent]);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop, accept: acceptedFileTypes });

    return (
        <div
            {...getRootProps()}
            className={`
                border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors
                ${isDragActive ? 'border-cinch-500 bg-cinch-50' : 'border-gray-300 hover:border-cinch-400 hover:bg-gray-50'}
                ${fileName ? 'bg-green-50 border-green-300' : ''}
            `}
        >
            <input {...getInputProps()} />

            {fileName ? (
                <div className="flex flex-col items-center text-green-700">
                    <svg className="w-8 h-8 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                    <p className="font-semibold text-sm">{fileName}</p>
                    <p className="text-xs mt-1">Ready to process</p>
                </div>
            ) : (
                <div className="flex flex-col items-center text-gray-500">
                    <svg className="w-8 h-8 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path></svg>
                    <p className="font-medium text-sm">{label}</p>
                    <p className="text-xs mt-1 text-gray-400">{placeholder}</p>
                </div>
            )}

            {error && (
                <p className="text-red-500 text-xs mt-2">{error}</p>
            )}
        </div>
    );
};

export default FileDropZone;
