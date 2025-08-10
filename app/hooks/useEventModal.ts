import { create } from "zustand";

interface EventModalStore {
	isOpen: boolean;
	userId: string | null;
	onOpen: (userId: string) => void;
	onClose: () => void;
}

const useEventModal = create<EventModalStore>((set) => ({
	isOpen: false,
	userId: null,
	onOpen: (userId) => set({ isOpen: true, userId }),
	onClose: () => set({ isOpen: false, userId: null }),
}));

export default useEventModal;
