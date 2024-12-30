import { FiCopy } from 'react-icons/fi';
import Swal from "sweetalert2";

export default function CopyButton({ textToCopy }) {
  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.onmouseenter = Swal.stopTimer;
      toast.onmouseleave = Swal.resumeTimer;
    },
  });

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(textToCopy);
      Toast.fire({
        icon: "success",
        title: "Copied to clipboard!",
      });
    } catch (error) {
      Toast.fire({
        icon: "error",
        title: "Failed to copy",
      });
    }
  };

  return (
    <button
      type="button"
      onClick={handleCopy}
      className="inline-flex items-center px-3 py-2 border border-gray-300 rounded-md text-sm text-gray-700 bg-white hover:bg-gray-50"
    >
      <FiCopy className="w-4 h-4 mr-1" />
      Copy
    </button>
  );
} 