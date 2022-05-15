type EventId = String;
type PlaceId = String;
type OrganizerId = String;
type ParticipantId = String;

export interface Event {
    id: EventId,
    title: String,
    description?: String,
    from: Date,
    duration: Number,
    place?: PlaceId,
    organizer?: OrganizerId,
    spots: Number,
    participants: ParticipantId[],
}
