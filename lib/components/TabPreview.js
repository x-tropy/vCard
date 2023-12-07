export default function TabPrevew(data) {
  const comp = Object.entries(data).map((entry, index) => (
    <div className="flex flex-row space-x-2 border-b" key={index}>
      <span className=" w-[200px] text-gray-600">{entry[0]}</span>
      <span className="text-gray-900">{entry[1]}</span>
    </div>
  ));
  return <div className="space-y-6">{comp}</div>;
}
