
import { hymnsData } from "@/data/MemorialSectionData/HymnData";

const Hymns: React.FC = () => {
  return (
    <div className="mx-auto px-10 py-8   bg-primary-light rounded-lg shadow-md">
      <h1 className="text-4xl font-bold text-center text-[#774936]">
        Hymns Collection
      </h1>
      <h2 className="text-lg text-gray-700 text-center mt-2">
        A Selection of Hymns
      </h2>
      <div className="space-y-6 mx-auto">
        {hymnsData.map((hymn) => (
          <div
            key={hymn.number}
            className="bg-white rounded-md shadow-md p-6 border border-[#FBEAE0] hover:bg-[#F7D9C7] transition duration-300"
          >
            <h3 className="text-2xl font-bold text-[#774936] mb-2">
              {hymn.number}. {hymn.title}
            </h3>
            <p className="whitespace-pre-line text-gray-800 text-lg">
              {hymn.content}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Hymns;
