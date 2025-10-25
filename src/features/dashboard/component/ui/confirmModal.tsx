import { Loader2 } from 'lucide-react';
import React from 'react';

interface ConfirmModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    title: string;
    message: string;
    loading: boolean
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({ isOpen, loading, onClose, onConfirm, title, message }) => {
    if (!isOpen) return null;

    return (
        <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center"
            onClick={onClose} // Close modal on overlay click
        >
            <div 
                className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md mx-4"
                onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the modal
            >
                <h3 className="text-lg font-bold text-gray-900">{title}</h3>
                <p className="mt-2 text-sm text-gray-600">{message}</p>
                <div className="mt-6 flex justify-end gap-4">
                    <button onClick={onClose} className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200">
                        Cancel
                    </button>
                    <button disabled={loading} onClick={onConfirm} className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700">
                        {loading ? <Loader2 className="w-5 h-5 animate-spin " />:"Delete"}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmModal;