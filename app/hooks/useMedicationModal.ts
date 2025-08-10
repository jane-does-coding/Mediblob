import { create } from "zustand";

interface MedicationsModalStore {
	isOpen: boolean;
	userId: string | null;
	onOpen: (userId: string) => void;
	onClose: () => void;
}

const useMedicationsModal = create<MedicationsModalStore>((set) => ({
	isOpen: false,
	userId: null,
	onOpen: (userId) => set({ isOpen: true, userId }),
	onClose: () => set({ isOpen: false, userId: null }),
}));

export default useMedicationsModal;
