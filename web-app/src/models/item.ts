type ItemId = String;
type PlaceId = String;
type OrganizerId = String;
type ParticipantId = String;

enum ERepeat {
  no,
  everyday,
  weekdays,
  weekends,
  // etc
}

export interface IItem {
    id: ItemId,
    title: String,
    description?: String,

    createTime: Date;
    modifyTime: Date;

    from: Date,
    duration: Number,

    done: Boolean,
    public: Boolean,
    repeat: ERepeat,

    place?: PlaceId,
    organizers?: OrganizerId[],
    spots: Number,
    participants: ParticipantId[],
}
