// ─── Raw API shape from HostelMate ───────────────────────────────────────────

export type LiveRoomDate = {
  date: string;
  price: number | false;
  available_beds: number;
};

export type LiveRoom = {
  room_id: string;
  room_name: string;
  room_description: string;
  date: LiveRoomDate[];
  image_fullpath: string[];
};

// ─── Normalised shape used in UI ─────────────────────────────────────────────

export type RoomToDisplay = {
  id: string;
  name: string;
  description: string;
  image: string | null;
  imageIsExternal: boolean;
  /** First available nightly price, in the API's currency units */
  price: number | null;
  /** ISO date string the price applies to */
  priceDate: string | null;
  currency: string;
  /** True when the room is available across the ENTIRE requested date range */
  availableForRange: boolean;
};
