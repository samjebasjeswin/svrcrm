"use client";
import { useState } from 'react';

export default function ImageUpload({ value, onChange }) {
    const [preview, setPreview] = useState(value || null);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const base64 = reader.result;
                setPreview(base64);
                onChange(base64);
            };
            reader.readAsDataURL(file);
        }
    };

    const clearImage = () => {
        setPreview(null);
        onChange('');
    };

    return (
        <div className="image-upload-container">
            {preview ? (
                <div className="image-preview-wrapper animate-fade-in">
                    <img src={preview} alt="Upload preview" className="image-preview" />
                    <button type="button" className="image-clear-btn" onClick={clearImage}>
                        ✕
                    </button>
                </div>
            ) : (
                <label className="image-upload-dropzone">
                    <input type="file" accept="image/*" onChange={handleFileChange} style={{ display: 'none' }} />
                    <div className="upload-icon">📸</div>
                    <span>Upload Image</span>
                </label>
            )}
        </div>
    );
}
