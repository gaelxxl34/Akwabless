import { useEffect, useState, useRef } from "react";

interface ModalProps {
  isOpen: boolean;
  currentValue: string;
  onClose: () => void;
  onSave: (newValue: string) => void;
  title: string;
  label: string;
  inputType: string;
  placeholder: string;
  validateFn?: (value: string) => string;
}

const FormModal: React.FC<ModalProps> = ({
  isOpen,
  currentValue,
  onClose,
  onSave,
  title,
  label,
  inputType,
  placeholder,
  validateFn,
}) => {
  const [value, setValue] = useState(currentValue);
  const [error, setError] = useState("");

  useEffect(() => {
    setValue(currentValue);
  }, [currentValue]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validateFn) {
      const errorMessage = validateFn(value);
      if (errorMessage) {
        setError(errorMessage);
        return;
      }
    }

    onSave(value);
    onClose();
  };
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">{title}</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="modalInput"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              {label}
            </label>
            <input
              type={inputType}
              id="modalInput"
              value={value}
              onChange={(e) => {
                setValue(e.target.value);
                setError("");
              }}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#D4AF37]"
              placeholder={placeholder}
            />
            {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
          </div>
          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 whitespace-nowrap !rounded-button"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-[#D4AF37] text-white rounded-md text-sm font-medium hover:bg-[#C4A027] whitespace-nowrap !rounded-button"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
const Settings = () => {
  const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);
  const [isNameModalOpen, setIsNameModalOpen] = useState(false);
  const [userEmail, setUserEmail] = useState("admin@gmail.com");
  const [userName, setUserName] = useState("Albert Katoto");

  const [showUploadModal, setShowUploadModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  return (
    <main
      className="p-6 xl:max-w-[calc(100vw-256px)]"
      style={{ width: "100vw" }}
    >
      {/* Avatar Card */}
      {/* <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <div className="h-16 w-16 rounded-full bg-[#228B22] flex items-center justify-center text-white text-xl mr-4">
              A
            </div>
            <div>
              <h2 className="text-sm font-medium text-gray-500">Avatar</h2>
              <p className="text-xs text-gray-500">
                Upload PNG or JPG up to 2MB
              </p>
            </div>
          </div>
          <button className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 cursor-pointer whitespace-nowrap !rounded-button">
            Upload
          </button>
        </div>
      </div> */}

      <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <div className="h-16 w-16 rounded-full bg-[#228B22] flex items-center justify-center text-white text-xl mr-4">
              A
            </div>
            <div>
              <h2 className="text-sm font-medium text-gray-500">Avatar</h2>
              <p className="text-xs text-gray-500">
                Upload PNG or JPG up to 2MB
              </p>
            </div>
          </div>
          <input
            type="file"
            id="avatarInput"
            ref={fileInputRef}
            className="hidden"
            accept=".jpg,.jpeg,.png"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) {
                if (file.size > 2 * 1024 * 1024) {
                  alert("File size must be less than 2MB");
                  return;
                }
                const reader = new FileReader();
                reader.onload = (e) => {
                  setSelectedImage(e.target?.result as string);
                  setShowUploadModal(true);
                };
                reader.readAsDataURL(file);
              }
            }}
          />
          <button
            onClick={() => fileInputRef.current?.click()}
            className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 cursor-pointer whitespace-nowrap !rounded-button"
          >
            Upload
          </button>

          {showUploadModal && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white rounded-lg p-6 w-[480px]">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">
                    Upload Avatar
                  </h3>
                  <button
                    onClick={() => {
                      setShowUploadModal(false);
                      setSelectedImage(null);
                    }}
                    className="text-gray-400 hover:text-gray-500"
                  >
                    <i className="fas fa-times"></i>
                  </button>
                </div>

                {selectedImage && (
                  <div className="mb-4">
                    <div className="relative w-full h-[320px] bg-gray-100 rounded-lg overflow-hidden">
                      <img
                        src={selectedImage}
                        alt="Preview"
                        className="w-full h-full object-contain"
                      />
                    </div>
                  </div>
                )}

                <div className="flex justify-end gap-3">
                  <button
                    onClick={() => {
                      setShowUploadModal(false);
                      setSelectedImage(null);
                    }}
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 whitespace-nowrap !rounded-button"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => {
                      // Here you would typically handle the actual upload
                      // For now, we'll just close the modal
                      setShowUploadModal(false);
                      setSelectedImage(null);
                    }}
                    className="px-4 py-2 text-sm font-medium text-white bg-[#D4AF37] rounded-md hover:bg-yellow-500 whitespace-nowrap !rounded-button"
                  >
                    Upload Image
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Name Card */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-sm font-medium text-gray-500">Name</h2>
            <p className="text-base text-gray-900">{userName}</p>
          </div>
          <button
            onClick={() => setIsNameModalOpen(true)}
            className="px-4 py-2 border border-[#D4AF37] rounded-md text-sm font-medium text-[#D4AF37] hover:bg-gray-50 cursor-pointer whitespace-nowrap !rounded-button"
          >
            Edit
          </button>
        </div>
      </div>

      {/* Email Card */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-sm font-medium text-gray-500">Email</h2>
            <p className="text-base text-gray-900">{userEmail}</p>
          </div>
          <button
            onClick={() => setIsEmailModalOpen(true)}
            className="px-4 py-2 border border-[#D4AF37] rounded-md text-sm font-medium text-[#D4AF37] hover:bg-gray-50 cursor-pointer whitespace-nowrap !rounded-button"
          >
            Edit
          </button>
        </div>
      </div>
      <FormModal
        isOpen={isEmailModalOpen}
        currentValue={userEmail}
        onClose={() => setIsEmailModalOpen(false)}
        onSave={(newEmail) => setUserEmail(newEmail)}
        title="Edit Email Address"
        label="Email Address"
        inputType="email"
        placeholder="Enter your email"
        validateFn={(value) => {
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          return !emailRegex.test(value)
            ? "Please enter a valid email address"
            : "";
        }}
      />

      <FormModal
        isOpen={isNameModalOpen}
        currentValue={userName}
        onClose={() => setIsNameModalOpen(false)}
        onSave={(newName) => setUserName(newName)}
        title="Edit Name"
        label="Name"
        inputType="text"
        placeholder="Enter your name"
        validateFn={(value) => {
          return !value.trim() ? "Please enter your name" : "";
        }}
      />

      {/* Action Buttons */}
      <div className="flex justify-end space-x-4 mt-8 mb-6">
        <button className="px-6 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 cursor-pointer whitespace-nowrap !rounded-button">
          Cancel
        </button>
        <button className="px-6 py-2 bg-[#D4AF37] rounded-md text-sm font-medium text-white hover:bg-[#C4A027] cursor-pointer whitespace-nowrap !rounded-button">
          Save Changes
        </button>
      </div>
    </main>
  );
};

export default Settings;
