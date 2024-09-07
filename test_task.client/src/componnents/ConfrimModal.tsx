interface ModalProps {
    isOpen: boolean;
    onConfirm: () => void;
    onCancel: () => void;
    message: string;
};

function ConfrimMoadl({ isOpen, message, onConfirm, onCancel }: ModalProps) {
    if (!isOpen) return null;
    return (
        <div className='overlay'>
            <div className='modal'>
                <h2>{message}</h2>
                <div className='modal-buttons'>
                    <button type='button' onClick={onConfirm}>Confirm</button>
                    <button type='button' onClick={onCancel}>Cancel</button>
                </div>
            </div>
        </div>
    );
};

export default ConfrimMoadl;