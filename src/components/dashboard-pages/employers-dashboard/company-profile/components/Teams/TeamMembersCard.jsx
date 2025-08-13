import React from "react";
import { Edit2, Trash2 } from "lucide-react";

const TeamMemberCard = ({ member, baseImageUrl, onEdit, onDelete, deleting }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-4">
      {member.media && (
        <img
          src={`${baseImageUrl}${member.media}`}
          alt={member.name}
          className="w-24 md:w-auto h-24 md:h-48 object-cover rounded mb-4"
        />
      )}
      <h2 className="text-xl font-semibold">{member.name}</h2>
      <div
        dangerouslySetInnerHTML={{ __html: member.description }}
        className="my-2 text-gray-600"
      />
      <div className="flex justify-end space-x-2 mt-2">
        <button onClick={onEdit} className="text-blue-500">
          <Edit2 className="w-5 h-5" />
        </button>
        <button
          onClick={onDelete}
          className="text-red-500"
          disabled={deleting}
        >
          {deleting ? "..." : <Trash2 className="w-5 h-5" />}
        </button>
      </div>
    </div>
  );
};

export default TeamMemberCard;
