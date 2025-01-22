
interface Hymn {
  number: number;
  title: string;
  content: string;
}

const hymnsData: Hymn[] = [
  {
    number: 1,
    title: "Amazing Grace",
    content:
      "Amazing grace! How sweet the sound\nThat saved a wretch like me.\nI once was lost, but now am found;\nWas blind, but now I see.",
  },
  {
    number: 2,
    title: "How Great Thou Art",
    content:
      "O Lord my God, when I in awesome wonder\nConsider all the works Thy hands have made,\nI see the stars, I hear the rolling thunder,\nThy power throughout the universe displayed.",
  },
  {
    number: 3,
    title: "It Is Well with My Soul",
    content:
      "When peace like a river attendeth my way,\nWhen sorrows like sea billows roll,\nWhatever my lot, Thou hast taught me to say,\nIt is well, it is well with my soul.",
  },
];

const Hymns: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto bg-[#FBEAE0] rounded-lg shadow-lg p-8 mt-10">
      <h1 className="text-4xl font-bold text-center text-[#774936]">
        Hymns Collection
      </h1>
      <h2 className="text-lg text-gray-700 text-center mt-2">
        A Selection of Favorite Hymns
      </h2>
      <div className="mt-8 space-y-8">
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
