export default function TabPrevew({ user_id, name, created_at }) {
  return (
    <div className="flex flex-col space-y-4">
      <div className="flex flex-col space-y-2">
        <div className="flex flex-row space-x-2">
          <div className="font-semibold text-gray-600">Name</div>
          <div className="underline text-gray-900">{name}</div>
        </div>
        <div className="flex flex-row space-x-2">
          <div className="font-semibold text-gray-600">User ID</div>
          <div className="underline text-gray-900">{user_id}</div>
        </div>
        <div className="flex flex-row space-x-2">
          <div className="font-semibold text-gray-600">Joined in</div>
          <div className="underline text-gray-900">{created_at}</div>
        </div>
      </div>
    </div>
  );
}
