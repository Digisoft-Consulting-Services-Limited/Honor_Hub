
const Tribute: React.FC = () => {
  return (
    <div className="w-2/3 p-4">
      {/* Description Section */}
      <section className="mb-6">
        <h2 className="text-2xl font-bold text-primary mb-4">About [Person's Name]</h2>
        <p className="text-gray-700">
          [Add a detailed description about the deceased person here. You can highlight their life achievements, personality, and legacy.]
        </p>
      </section>

      {/* Sample Tributes */}
      <section>
        <h2 className="text-xl font-semibold text-primary mb-4">Tributes</h2>
        <div className="space-y-4">
          {/* Replace this with mapped tributes */}
          <div className="p-4 bg-gray-100 rounded shadow">
            <p className="text-gray-700 italic">
              "This person was an inspiration to all of us. Their kindness and generosity will never be forgotten."
            </p>
            <p className="text-right text-sm text-gray-500">- John Doe</p>
          </div>
          <div className="p-4 bg-gray-100 rounded shadow">
            <p className="text-gray-700 italic">
              "Thank you for all the wonderful memories. You will always be in our hearts."
            </p>
            <p className="text-right text-sm text-gray-500">- Jane Smith</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Tribute;
