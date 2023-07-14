import { useOthers, useSelf } from "../liveblocks.config";

export const Participants = () => {
  const others = useOthers();
  const self = useSelf();

  return (
    <div className="participantsContainer">
      <h2>Participants</h2>
      <div className="participantInfo">
        {self?.info?.username} <span className="tag">You</span>
      </div>
      {others.map(({ info, connectionId, presence }) => {
        return (
          <div className="participantInfo" key={connectionId}>
            {info?.username!} {info?.bot && <span className="tag">bot</span>}{" "}
            {presence.isTyping && <span>typing...</span>}
          </div>
        );
      })}
    </div>
  );
};
