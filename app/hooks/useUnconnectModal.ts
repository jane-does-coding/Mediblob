import { create } from "zustand";

interface UnconnectModalStore {
	isOpen: boolean;
	selectedUser: { name: string; code: string } | null;
	onOpen: (user: { name: string; code: string }) => void;
	onClose: () => void;
}

const useUnconnectModal = create<UnconnectModalStore>((set) => ({
	isOpen: false,
	selectedUser: null,
	onOpen: (user) => set({ isOpen: true, selectedUser: user }),
	onClose: () => set({ isOpen: false, selectedUser: null }),
}));

export default useUnconnectModal;
