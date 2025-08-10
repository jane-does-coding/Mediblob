import { create } from "zustand";

interface ConnectModalStore {
	isOpen: boolean;
	onOpen: () => void;
	onClose: () => void;
}

const useConnectModal = create<ConnectModalStore>((set) => ({
	isOpen: false,
	onOpen: () => set({ isOpen: true }),
	onClose: () => set({ isOpen: false }),
}));

export default useConnectModal;
