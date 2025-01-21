import { cardData } from "../../../../data/MemorialSectionData/LifeData";


const Life: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Life</h1>
      <div className="space-y-6">
        {cardData.map((item, index) => (
          <div
            key={index}
            className="bg-orange-100 p-6 rounded-lg shadow-md"
          >
            <h2 className="text-2xl font-bold text-primary mb-2">
              {item.title}
            </h2>
            <p className="text-sm text-gray-500 mb-4">
              {item.date} • by {item.author}
            </p>
            <p className="text-gray-700 mb-4">{item.content}</p>
            <div className="flex justify-between items-center">
              <a
                href="#"
                className="text-blue-500 hover:underline"
              >
                Read more
              </a>
              <button
                className="text-gray-500 hover:text-gray-700 flex items-center"
              >
                <svg
                  className="h-5 w-5 mr-1"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <path d="M14 8.59L16.3 10.88C16.11 12.92 15 14 12 14C9.36 14 8 12.64 8 10C8 7.92 8.82 6.26 10.88 5.7L13.17 8H14V8.59ZM20 3H4C2.9 3 2 3.9 2 5V19C2 20.1 2.9 21 4 21H20C21.1 21 22 20.1 22 19V5C22 3.9 21.1 3 20 3ZM20 19H4V5H20V19Z" />
                </svg>
                Share
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Life;
